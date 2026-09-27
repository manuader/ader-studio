import { chromium } from 'playwright';
import { spawn } from 'child_process';
const [,, out, fps='60', dsf='2', t0s='0', t1s=''] = process.argv;
const FPS = +fps, DSF = +dsf;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--disable-gpu-vsync', '--force-color-profile=srgb'] });
const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: DSF });
p.on('pageerror', e => console.log('ERR', e.message));
await p.goto('file://' + process.cwd() + '/index.html'); await p.evaluate(() => window.ready);
const dur = await p.evaluate(() => window.DUR);
const t0 = +t0s, t1 = t1s ? +t1s : dur;
const FF = process.env.FF;
const ff = spawn(FF, ['-y', '-hide_banner', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
  '-c:v', 'libx264', '-preset', 'medium', '-crf', '14', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level', '5.2', '-r', String(FPS), out], { stdio: ['pipe', 'inherit', 'inherit'] });
const n0 = Math.round(t0 * FPS), n1 = Math.round(t1 * FPS);
const start = Date.now();
for (let i = n0; i < n1; i++) {
  await p.evaluate(t => window.renderAt(t), i / FPS);
  const buf = await p.screenshot({ type: 'jpeg', quality: 95 });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  if ((i - n0) % 120 === 0) console.log(`frame ${i - n0}/${n1 - n0}  ${((Date.now() - start) / 1000).toFixed(0)}s`);
}
ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close();
console.log('done', ((Date.now() - start) / 1000).toFixed(0), 's');
