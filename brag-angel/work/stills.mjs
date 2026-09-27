import { chromium } from 'playwright';
const times = process.argv.slice(3).map(Number); const out = process.argv[2];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 0.5 });
p.on('pageerror', e => console.log('ERR', e.message)); p.on('console', m => m.type()==='error' && console.log('C', m.text()));
await p.goto('file://' + process.cwd() + '/index.html'); await p.evaluate(() => window.ready);
for (const t of times) { await p.evaluate(t => window.renderAt(t), t); await p.screenshot({ path: `${out}/t${t.toFixed(2)}.jpg`, quality: 80, type: 'jpeg' }); }
await b.close();
