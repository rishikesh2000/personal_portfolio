const fs = require('fs');
const http = require('http');

async function main() {
  const tabs = await new Promise((resolve, reject) => {
    http.get('http://localhost:9222/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const page = tabs.find(t => t.type === 'page');
  console.log('Connecting to:', page.webSocketDebuggerUrl);
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let id = 1;
  const send = (method, params = {}) => new Promise((resolve) => {
    const msgId = id++;
    const handler = (evt) => {
      const resp = JSON.parse(evt.data);
      if (resp.id === msgId) {
        ws.removeEventListener('message', handler);
        resolve(resp.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  await new Promise(r => ws.onopen = r);
  console.log('Connected to CDP!');

  await send('Page.enable');
  await send('Page.navigate', { url: 'http://localhost:4173/' });
  await new Promise(r => setTimeout(r, 2000));

  // Let's check sections and their offsetTops
  const offsets = await send('Runtime.evaluate', {
    returnByValue: true,
    expression: `
      ['#welcome', '#about', '#work', '#process', '#studio', '#contact'].map(id => {
        const el = document.querySelector(id);
        return {
          id,
          offsetTop: el ? el.offsetTop : null,
          offsetHeight: el ? el.offsetHeight : null
        };
      })
    `
  });
  console.log('Section offsets:', offsets.result.value);

  // Let's scroll to #work offsetTop directly and wait for ScrollTrigger
  const workTop = offsets.result.value.find(s => s.id === '#work').offsetTop;
  console.log('Scrolling window to workTop + 500:', workTop + 500);

  await send('Runtime.evaluate', {
    expression: `
      window.scrollTo(0, ${workTop + 600});
      if (window.ScrollTrigger) window.ScrollTrigger.update();
    `
  });
  await new Promise(r => setTimeout(r, 1200));

  // Check current scrollY and active classes
  const debugInfo = await send('Runtime.evaluate', {
    returnByValue: true,
    expression: `
      ({
        scrollY: window.scrollY,
        workClasses: document.querySelector('#work .scene__frame')?.className,
        activeLayers: Array.from(document.querySelectorAll('.is-in')).map(el => el.className)
      })
    `
  });
  console.log('Debug info after scroll to work:', debugInfo.result.value);

  const shot = await send('Page.captureScreenshot');
  fs.writeFileSync('screenshots/work_scrolled_real.png', Buffer.from(shot.data, 'base64'));
  console.log('Saved screenshots/work_scrolled_real.png');

  ws.close();
}

main().catch(console.error);

