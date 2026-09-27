# MIRADA — brag plan (polished, 16 s, silent loop)

Hero film for `/fotografia`. Storyboard: `prompts/brag-films-portfolio.md`, Film 2.

**Angle:** the studio also looks. Architecture photographed on the road — structure, light, matter.
**Hook:** three vertical windows open one after another on cream, with framing marks.
**Rule:** every photo is vertical 3:4, shown whole in 3:4 windows or as a slow vertical tilt inside a wide window; never a fixed crop, never a filter.

| # | Time | Shot | Text |
|---|---|---|---|
| 1 | 0.0–3.0 | Triptych (Alemania, España, Argentina — first three of `homeSequence`) opens with staggered masks; museum labels; 11-tick ruler starts counting | 01 ALEMANIA · 02 ESPAÑA · 03 ARGENTINA |
| 2 | 3.0–7.0 | Laterals close, `heroPhoto` wipes into the centre window, which grows to full frame (16:9: slow tilt up to the sky; 9:16: whole 3:4 with a slow push-in) | FOTOGRAFÍA / *mirada arquitectónica.* + alt caption |
| 3 | 7.0–12.0 | Centre window fixed, 8 hard cuts (0.54 s) through the eight remaining series; label rolls, counter 04→11, ruler fills | MÓNACO · ITALIA · DUBÁI · AUSTRIA · URUGUAY · TAILANDIA · REPÚBLICA CHECA · USA |
| 4 | 12.0–16.0 | The opening triptych returns; windows close upward into the empty framed wall = frame 0 | 11 SERIES / *un mismo lenguaje.* |

Across the film all 11 series appear exactly once, so the closing number is shown, not claimed.

**9:16:** same story; the triptych is hung as a zigzag (salon hang) at twice the size, and the grown window is a full-width 3:4 (1080×1440) — the photos near full bleed, uncropped.

## Build
- `index.html` / `styles.css` / `timeline.js` — every frame is `render(t)`; `?f=h|v`, `?base=` photo root (defaults to `../../public/images/fotografia/`). Fonts come from `brag-angel/work/fonts`.
- `node stills.mjs <h|v> <dir> <scale> t…` for QA stills; `python3 sheet.py` for contact sheets.
- `FF=<ffmpeg> node render.mjs <h|v> master.mkv` → 2× capture, lanczos down, near-lossless master; then encode:
  - 16:9 MP4: `-c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p -movflags +faststart -an`
  - 16:9 WebM: `-c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 -an`
  - 9:16 is detail-dense at full width, so it uses MP4 `-crf 28` and WebM `-crf 39` to stay under 4 MB
- `node poster.mjs <h|v> 5.9 out.png` → settled hero frame, downsampled to the posters.
