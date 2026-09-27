#!/bin/sh
set -e
FF=/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2
cd "$(dirname "$0")"  # masters rendered here with render.mjs
$FF -y -hide_banner -loglevel error -i master-h.mkv -c:v libx264 -crf 22 -preset slow -pix_fmt yuv420p -movflags +faststart -an mirada-16x9.mp4
$FF -y -hide_banner -loglevel error -i master-h.mkv -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 -pix_fmt yuv420p -an mirada-16x9.webm
$FF -y -hide_banner -loglevel error -i master-v.mkv -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart -an mirada-9x16.mp4
$FF -y -hide_banner -loglevel error -i master-v.mkv -c:v libvpx-vp9 -crf 39 -b:v 0 -row-mt 1 -pix_fmt yuv420p -an mirada-9x16.webm
ls -l mirada-*
