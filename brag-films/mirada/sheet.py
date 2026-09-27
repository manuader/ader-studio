import sys, glob, re
from PIL import Image, ImageDraw
# python3 sheet.py <glob> <out> <cols> <cellw>
pat, out, cols, cw = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4])
fs = sorted(glob.glob(pat))
im0 = Image.open(fs[0]); ch = round(cw * im0.height / im0.width)
rows = (len(fs) + cols - 1) // cols
s = Image.new('RGB', (cols * (cw + 8) + 8, rows * (ch + 8) + 8), (60, 60, 60)); d = ImageDraw.Draw(s)
for i, f in enumerate(fs):
    x = 8 + (i % cols) * (cw + 8); y = 8 + (i // cols) * (ch + 8)
    s.paste(Image.open(f).convert('RGB').resize((cw, ch), Image.LANCZOS), (x, y))
    lab = re.search(r't(\d+\.\d+)', f).group(1)
    d.rectangle((x, y, x + 64, y + 18), fill='black'); d.text((x + 4, y + 3), lab, fill='yellow')
s.save(out, quality=88)
