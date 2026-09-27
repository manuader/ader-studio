import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 2 });
await p.goto('file://' + process.cwd() + '/index.html'); await p.evaluate(() => window.ready);
await p.evaluate(t => window.renderAt(t), 9.3); await p.screenshot({ path: 'poster.png' });
await b.close();
