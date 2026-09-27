// OBRA render: Playwright (2× capture) → FFmpeg (lanczos down to 1×) → lossless master.
// usage: FF=/path/to/ffmpeg node render.mjs <h|v> <master.mkv> [fps=30]
import { chromium } from 'playwright';
import { spawn } from 'child_process';
const [,, fmt, out, fps = '30'] = process.argv;
const FPS = +fps, DSF = 2, V = fmt === 'v';
const W = V ? 1080 : 1920, H = V ? 1920 : 1080;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--force-color-profile=srgb', '--disable-gpu-vsync'] });
const p = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: DSF });
p.on('pageerror', (e) => console.log('ERR', e.message));
await p.goto('file://' + process.cwd() + '/index.html?f=' + fmt);
await p.evaluate(() => window.ready);
const dur = await p.evaluate(() => window.DUR);
const ff = spawn(process.env.FF, ['-y', '-hide_banner', '-loglevel', 'error',
  '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
  '-vf', `scale=${W}:${H}:flags=lanczos+accurate_rnd+full_chroma_int,format=yuv444p`,
  '-c:v', 'libx264', '-preset', 'ultrafast', '-qp', '0', '-r', String(FPS), out], { stdio: ['pipe', 'inherit', 'inherit'] });
const N = Math.round(dur * FPS);
const t0 = Date.now();
for (let i = 0; i < N; i++) {
  await p.evaluate((t) => window.renderAt(t), i / FPS);
  const buf = await p.screenshot({ type: 'jpeg', quality: 97 });
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
  if (i % 60 === 0) console.log(`${fmt} frame ${i}/${N}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
}
ff.stdin.end();
await new Promise((r) => ff.on('close', r));
await b.close();
console.log('done', ((Date.now() - t0) / 1000).toFixed(0), 's');
