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
  if (!page) {
    console.log('No page tab found');
    return;
  }

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

  // Navigate to http://localhost:4173/
  await send('Page.enable');
  await send('Page.navigate', { url: 'http://localhost:4173/' });
  await new Promise(r => setTimeout(r, 2000));

  // Evaluate scrollHeight
  const res = await send('Runtime.evaluate', {
    expression: 'document.documentElement.scrollHeight'
  });
  console.log('Total document scrollHeight:', res.result.value);

  // Scroll to #about and take screenshot
  await send('Runtime.evaluate', {
    expression: 'document.querySelector("#about").scrollIntoView();'
  });
  await new Promise(r => setTimeout(r, 1000));
  let shot = await send('Page.captureScreenshot');
  fs.writeFileSync('screenshots/scroll_about.png', Buffer.from(shot.data, 'base64'));
  console.log('Saved screenshots/scroll_about.png');

  // Scroll to #work and take screenshot
  await send('Runtime.evaluate', {
    expression: 'document.querySelector("#work").scrollIntoView();'
  });
  await new Promise(r => setTimeout(r, 1000));
  shot = await send('Page.captureScreenshot');
  fs.writeFileSync('screenshots/scroll_work.png', Buffer.from(shot.data, 'base64'));
  console.log('Saved screenshots/scroll_work.png');

  ws.close();
}

main().catch(console.error);
