import { chromium } from 'playwright';
import { spawn } from 'child_process';
// node render.mjs <h|v> <master.mkv>   (FF env = ffmpeg path, BASE env = photo root)
// Captures at deviceScaleFactor 2 and downsamples with lanczos into a near-lossless master.
const [,, f, out] = process.argv;
const V = f === 'v', FPS = 30, W = V ? 1080 : 1920, H = V ? 1920 : 1080;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--force-color-profile=srgb'] });
const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
p.on('pageerror', e => console.log('ERR', e.message));
await p.goto(`file://${process.cwd()}/index.html?f=${f}&base=${process.env.BASE || '../../public/images/fotografia/'}`);
await p.evaluate(() => window.ready);
const dur = await p.evaluate(() => window.DUR), N = Math.round(dur * FPS);
const ff = spawn(process.env.FF, ['-y', '-hide_banner', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-',
  '-vf', `scale=${W}:${H}:flags=lanczos`, '-c:v', 'libx264', '-preset', 'medium', '-crf', '6', '-pix_fmt', 'yuv444p', '-r', String(FPS), out], { stdio: ['pipe', 'inherit', 'inherit'] });
const t0 = Date.now();
for (let i = 0; i < N; i++) {
  await p.evaluate(t => window.renderAt(t), i / FPS);
  const buf = await p.screenshot({ type: 'png' });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  if (i % 60 === 0) console.log(`frame ${i}/${N} ${((Date.now() - t0) / 1000).toFixed(0)}s`);
}
ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close();
console.log('done', ((Date.now() - t0) / 1000).toFixed(0), 's');
