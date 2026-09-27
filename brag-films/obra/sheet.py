# Contact sheet: python3 sheet.py out.jpg <cols> files...
import sys, re
from PIL import Image, ImageDraw
out, cols = sys.argv[1], int(sys.argv[2])
files = sys.argv[3:]
ims = [Image.open(f).convert('RGB') for f in files]
w, h = ims[0].size
rows = (len(ims) + cols - 1) // cols
s = Image.new('RGB', (cols * w, rows * h), 'black')
d = ImageDraw.Draw(s)
for i, (f, im) in enumerate(zip(files, ims)):
    x, y = (i % cols) * w, (i // cols) * h
    s.paste(im, (x, y))
    lab = re.findall(r'([\d.]+)\.(?:jpg|png)$', f)
    d.rectangle((x, y, x + 64, y + 18), fill='black')
    d.text((x + 4, y + 3), lab[0] if lab else str(i), fill='yellow')
s.save(out, quality=88)
