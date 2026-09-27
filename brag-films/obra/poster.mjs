// Poster: settled frame at 2× → lanczos → JPEG q≈85.
// usage: FF=/path/to/ffmpeg node poster.mjs <h|v> <t> <out.jpg>
import { chromium } from 'playwright';
import { execFileSync } from 'child_process';
const [,, fmt, t, out] = process.argv;
const V = fmt === 'v', W = V ? 1080 : 1920, H = V ? 1920 : 1080;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--force-color-profile=srgb'] });
const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
await p.goto('file://' + process.cwd() + '/index.html?f=' + fmt);
await p.evaluate(() => window.ready);
await p.evaluate((t) => window.renderAt(t), +t);
await p.screenshot({ path: `poster-${fmt}.png` });
await b.close();
execFileSync(process.env.FF, ['-y', '-hide_banner', '-loglevel', 'error', '-i', `poster-${fmt}.png`,
  '-vf', `scale=${W}:${H}:flags=lanczos`, '-q:v', '3', out]);
console.log('poster', out);
