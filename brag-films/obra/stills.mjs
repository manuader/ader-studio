// Stills for QA: node stills.mjs <h|v> <outDir> <t1> <t2> ...
import { chromium } from 'playwright';
const [,, fmt, out, ...ts] = process.argv;
const V = fmt === 'v';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--force-color-profile=srgb'] });
const p = await b.newPage({ viewport: V ? { width: 1080, height: 1920 } : { width: 1920, height: 1080 }, deviceScaleFactor: 0.5 });
p.on('pageerror', (e) => console.log('ERR', e.message));
p.on('console', (m) => m.type() === 'error' && console.log('C', m.text()));
await p.goto('file://' + process.cwd() + '/index.html?f=' + fmt);
await p.evaluate(() => window.ready);
for (const t of ts.map(Number)) {
  await p.evaluate((t) => window.renderAt(t), t);
  await p.screenshot({ path: `${out}/${fmt}-${t.toFixed(2)}.jpg`, quality: 85, type: 'jpeg' });
}
await b.close();
