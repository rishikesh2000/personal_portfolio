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
  await send('Page.enable');
  await send('Page.navigate', { url: 'http://localhost:4173/' });
  await new Promise(r => setTimeout(r, 2000));

  const workTop = await send('Runtime.evaluate', {
    expression: 'document.querySelector("#work").offsetTop'
  });
  console.log('Work offsetTop:', workTop.result.value);

  await send('Runtime.evaluate', {
    expression: `window.scrollTo(0, ${workTop.result.value + 600});`
  });
  await new Promise(r => setTimeout(r, 1000));

  const elInfo = await send('Runtime.evaluate', {
    returnByValue: true,
    expression: `
      (() => {
        const el = document.elementFromPoint(700, 450);
        return {
          tagName: el?.tagName,
          className: el?.className,
          id: el?.id,
          outerHTML: el?.outerHTML?.slice(0, 200),
          rect: el?.getBoundingClientRect(),
          scrollY: window.scrollY
        };
      })()
    `
  });
  console.log('Element at (700, 450):', elInfo.result.value);

  ws.close();
}

main().catch(console.error);

