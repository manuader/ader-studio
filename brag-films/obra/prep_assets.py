# Prepares assets/ for the OBRA film from the site's public/images.
# usage: python3 prep_assets.py <public/images dir> <out assets dir>
import sys, os, shutil
from PIL import Image
import numpy as np

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
files = {
    'plan-grilla.webp': 'portfolio/casa-angel/02-02.webp',
    'planta-alta.webp': 'portfolio/casa-angel/03-02.webp',
    'corte.webp': 'portfolio/casa-angel/03-03.webp',
    'render-patio.webp': 'portfolio/casa-angel/04-01.webp',
    'render-pasarela.webp': 'portfolio/casa-angel/04-03.webp',
    'axo-11.webp': 'urbetrack/axo-11.webp',
    'axo-12.webp': 'urbetrack/axo-12.webp',
    'axo-13.webp': 'urbetrack/axo-13.webp',
    'fadu-2020.webp': 'portfolio/fadu/01-01.webp',
    'fadu-2021.webp': 'portfolio/fadu/02-01.webp',
    'fadu-2022.webp': 'portfolio/fadu/03-01.webp',
    'fadu-2023.webp': 'portfolio/fadu/04-02.webp',
    'fadu-2024.webp': 'portfolio/fadu/05-01.webp',
    'weimar-splat.webp': 'portfolio/bauhaus-weimar/02-01.webp',
}
for k, v in files.items():
    shutil.copy(os.path.join(src, v), os.path.join(out, k))

# Ader mark: ink on transparent; circle outer radius = 500 px (1000 px across).
im = Image.open(os.path.join(src, 'logo-full.jpg')).convert('L')
a = np.array(im).astype(np.float32)
cx, cy, r = 2480, 1756, 1729
pad = 4
crop = a[cy - r - pad: cy + r + pad, cx - r - pad: cx + r + pad]
alpha = np.clip((235 - crop) / (235 - 40), 0, 1) * 255
rgba = np.zeros(crop.shape + (4,), np.uint8)
rgba[..., 0], rgba[..., 1], rgba[..., 2] = 0x1A, 0x19, 0x17
rgba[..., 3] = alpha.astype(np.uint8)
side = round(1000 * (r + pad) / r)
Image.fromarray(rgba, 'RGBA').resize((side, side), Image.LANCZOS).save(os.path.join(out, 'ader-mark.png'))
print('assets ready; mark', side, 'px')
