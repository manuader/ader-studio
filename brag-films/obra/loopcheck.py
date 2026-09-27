# Loop seam check: compares frame 0 with the last frames of each deliverable.
import subprocess, numpy as np, imageio_ffmpeg
from PIL import Image
FF = imageio_ffmpeg.get_ffmpeg_exe()
for f in ['16x9', '9x16']:
    for ext in ['mp4', 'webm']:
        src = f'web/obra-{f}.{ext}'
        out = f'qa/loop-{f}-{ext}-%d.png'
        subprocess.run([FF, '-hide_banner', '-loglevel', 'error', '-y', '-i', src, '-vf',
                        "select='eq(n\\,0)+eq(n\\,597)+eq(n\\,599)'", '-vsync', '0', out], check=True)
        a = [np.array(Image.open(out % i)).astype(int) for i in (1, 2, 3)]
        n = int(subprocess.run([FF, '-hide_banner', '-i', src, '-map', '0:v', '-f', 'null', '-'], capture_output=True, text=True).stderr.split('frame=')[-1].split()[0])
        print(f, ext, 'frames', n, '| max|f0-f599|', np.abs(a[0] - a[2]).max(), 'mean', round(np.abs(a[0] - a[2]).mean(), 4), '| f597-f599 max', np.abs(a[1] - a[2]).max())
    Image.fromarray(np.concatenate([np.array(Image.open(f'qa/loop-{f}-mp4-3.png')), np.array(Image.open(f'qa/loop-{f}-mp4-1.png'))], axis=1 if f == '9x16' else 0).astype(np.uint8)).save(f'qa/loop-seam-{f}.png')
