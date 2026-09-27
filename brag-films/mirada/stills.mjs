import { chromium } from 'playwright';
// node stills.mjs <h|v> <outdir> <scale> t1 t2 ...
const [,, f, out, sc, ...ts] = process.argv;
const V = f === 'v';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: V ? { width: 1080, height: 1920 } : { width: 1920, height: 1080 }, deviceScaleFactor: +sc });
p.on('pageerror', e => console.log('ERR', e.message)); p.on('console', m => m.type() === 'error' && console.log('C', m.text()));
await p.goto(`file://${process.cwd()}/index.html?f=${f}&base=${process.env.BASE || '../../public/images/fotografia/'}`); await p.evaluate(() => window.ready);
for (const t of ts.map(Number)) { await p.evaluate(t => window.renderAt(t), t); await p.screenshot({ path: `${out}/${f}-t${t.toFixed(2).padStart(5, '0')}.jpg`, quality: 82, type: 'jpeg' }); }
await b.close();
