#!/bin/sh
# Web deliverables from the lossless masters.
# usage: FF=/path/to/ffmpeg sh encode.sh <outDir> [crf264=22] [crfvp9=34]
set -e
OUT=$1; C1=${2:-22}; C2=${3:-34}
for f in h v; do
  case $f in h) name=obra-16x9 ;; v) name=obra-9x16 ;; esac
  "$FF" -y -hide_banner -loglevel error -i out/master-$f.mkv -an \
    -c:v libx264 -crf $C1 -preset slow -pix_fmt yuv420p -profile:v high -movflags +faststart "$OUT/$name.mp4"
  "$FF" -y -hide_banner -loglevel error -i out/master-$f.mkv -an \
    -c:v libvpx-vp9 -crf $C2 -b:v 0 -row-mt 1 -pix_fmt yuv420p -deadline good -cpu-used 1 "$OUT/$name.webm"
done
ls -la "$OUT"
