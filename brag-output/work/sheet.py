import sys,glob
from PIL import Image, ImageDraw
fs=sorted(glob.glob('stills/t*.jpg'),key=lambda f: float(f[8:-4]))
per=int(sys.argv[1]) if len(sys.argv)>1 else 12
for k in range(0,len(fs),per):
    ch=fs[k:k+per]; cols=6; rows=(len(ch)+cols-1)//cols
    s=Image.new('RGB',(cols*540,rows*960),'black'); d=ImageDraw.Draw(s)
    for i,f in enumerate(ch):
        im=Image.open(f); s.paste(im,((i%cols)*540,(i//cols)*960)); d.rectangle(((i%cols)*540,(i//cols)*960,(i%cols)*540+110,(i//cols)*960+40),fill='black'); d.text(((i%cols)*540+8,(i//cols)*960+10),f[8:-4],fill='yellow')
    s.save(f'stills/sheet{k//per}.png')
