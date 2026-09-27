import { chromium } from 'playwright';
// node poster.mjs <h|v> <t> <out.png> — 2× capture of a settled frame (downsampled afterwards)
const [,, f, t, out] = process.argv;
const V = f === 'v';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--force-color-profile=srgb'] });
const p = await b.newPage({ viewport: V ? { width: 1080, height: 1920 } : { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
await p.goto(`file://${process.cwd()}/index.html?f=${f}&base=${process.env.BASE || '../../public/images/fotografia/'}`);
await p.evaluate(() => window.ready);
await p.evaluate(t => window.renderAt(t), +t); await p.screenshot({ path: out });
await b.close();
