'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './FachadaReveal.module.css';

function createBrushTexture(size: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const center = size / 2;
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.5, 'rgba(255,255,255,0.95)');
  gradient.addColorStop(0.75, 'rgba(255,255,255,0.6)');
  gradient.addColorStop(0.9, 'rgba(255,255,255,0.2)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  return canvas;
}

export function FachadaReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    maskCanvas: HTMLCanvasElement | null;
    maskCtx: CanvasRenderingContext2D | null;
    brushTexture: HTMLCanvasElement | null;
    colorImage: HTMLImageElement | null;
    colorLoaded: boolean;
    lastPos: { x: number; y: number } | null;
    isActive: boolean;
    rafId: number | null;
    targetBrushSize: number;
    currentBrushSize: number;
    w: number;
    h: number;
  }>({
    maskCanvas: null,
    maskCtx: null,
    brushTexture: null,
    colorImage: null,
    colorLoaded: false,
    lastPos: null,
    isActive: false,
    rafId: null,
    targetBrushSize: 0,
    currentBrushSize: 0,
    w: 0,
    h: 0,
  });

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext('2d')!;
    const s = stateRef.current;

    // Create brush texture (once)
    s.brushTexture = createBrushTexture(128);

    // Setup canvas dimensions
    function resize() {
      const rect = section!.getBoundingClientRect();
      const newW = Math.round(rect.width);
      const newH = Math.round(rect.height);
      if (newW === s.w && newH === s.h) return;

      const oldMask = s.maskCanvas;
      const oldW = s.w;
      const oldH = s.h;

      s.w = newW;
      s.h = newH;
      canvas!.width = newW;
      canvas!.height = newH;

      // Create new mask canvas
      const mc = document.createElement('canvas');
      mc.width = newW;
      mc.height = newH;
      const mctx = mc.getContext('2d')!;

      // Preserve existing strokes (scaled)
      if (oldMask && oldW > 0 && oldH > 0) {
        mctx.drawImage(oldMask, 0, 0, oldW, oldH, 0, 0, newW, newH);
      }

      s.maskCanvas = mc;
      s.maskCtx = mctx;
    }

    resize();

    // Load color image
    const img = new window.Image();
    img.src = '/images/hero/fachada.png';
    img.onload = () => {
      s.colorImage = img;
      s.colorLoaded = true;
    };

    // Paint stroke on mask canvas
    function paintStroke(x: number, y: number) {
      const mctx = s.maskCtx;
      const brush = s.brushTexture;
      if (!mctx || !brush) return;

      const radius = s.currentBrushSize;
      if (radius < 1) return;

      const diameter = radius * 2;

      if (!s.lastPos) {
        // First point - just stamp
        mctx.drawImage(brush, x - radius, y - radius, diameter, diameter);
        s.lastPos = { x, y };
        return;
      }

      // Interpolate between last position and current
      const dx = x - s.lastPos.x;
      const dy = y - s.lastPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const spacing = radius * 0.25;
      const steps = Math.max(1, Math.ceil(dist / spacing));

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const px = s.lastPos.x + dx * t;
        const py = s.lastPos.y + dy * t;
        mctx.drawImage(brush, px - radius, py - radius, diameter, diameter);
      }

      s.lastPos = { x, y };
    }

    // Render loop
    function renderFrame() {
      // Animate brush size
      if (s.currentBrushSize < s.targetBrushSize) {
        s.currentBrushSize += (s.targetBrushSize - s.currentBrushSize) * 0.2;
        if (s.targetBrushSize - s.currentBrushSize < 0.5) {
          s.currentBrushSize = s.targetBrushSize;
        }
      }

      if (s.colorLoaded && s.maskCanvas && s.maskCtx) {
        // Fade the mask canvas each frame
        s.maskCtx.globalCompositeOperation = 'destination-out';
        s.maskCtx.fillStyle = 'rgba(0,0,0,0.035)';
        s.maskCtx.fillRect(0, 0, s.w, s.h);
        s.maskCtx.globalCompositeOperation = 'source-over';

        // Re-stamp at current mouse position to keep cursor area bright
        if (s.isActive && s.lastPos && s.brushTexture && s.currentBrushSize > 1) {
          const r = s.currentBrushSize;
          const d = r * 2;
          s.maskCtx.drawImage(s.brushTexture, s.lastPos.x - r, s.lastPos.y - r, d, d);
        }

        // Composite: color image masked by brush strokes
        // Replicate object-fit: cover to match the B&W layer
        const imgW = s.colorImage!.naturalWidth;
        const imgH = s.colorImage!.naturalHeight;
        const scale = Math.max(s.w / imgW, s.h / imgH);
        const drawW = imgW * scale;
        const drawH = imgH * scale;
        const drawX = (s.w - drawW) / 2;
        const drawY = (s.h - drawH) / 2;

        ctx.clearRect(0, 0, s.w, s.h);
        ctx.drawImage(s.colorImage!, drawX, drawY, drawW, drawH);
        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(s.maskCanvas, 0, 0);
        ctx.globalCompositeOperation = 'source-over';
      }

      s.rafId = requestAnimationFrame(renderFrame);
    }

    s.rafId = requestAnimationFrame(renderFrame);

    // Mouse handlers
    function onMouseMove(e: MouseEvent) {
      const rect = section!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (!s.isActive) {
        s.isActive = true;
        s.lastPos = { x, y };
        s.targetBrushSize = Math.min(s.w, s.h) * 0.09;
        s.currentBrushSize = s.targetBrushSize * 0.3;
      }

      paintStroke(x, y);
    }

    function onMouseLeave() {
      s.isActive = false;
      s.lastPos = null;
    }

    section.addEventListener('mousemove', onMouseMove);
    section.addEventListener('mouseleave', onMouseLeave);

    // Resize observer
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 100);
    });
    ro.observe(section);

    // Mobile: show color image directly via canvas
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) {
      const showColor = () => {
        if (s.colorLoaded) {
          ctx.clearRect(0, 0, s.w, s.h);
          ctx.globalAlpha = 0.6;
          ctx.drawImage(s.colorImage!, 0, 0, s.w, s.h);
          ctx.globalAlpha = 1;
        } else {
          setTimeout(showColor, 100);
        }
      };
      showColor();
    }

    return () => {
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);
      if (s.rafId !== null) cancelAnimationFrame(s.rafId);
      ro.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.imageLayer}>
        <Image
          src="/images/hero/fachada byn.png"
          alt="Plano arquitectónico"
          fill
          className={styles.image}
          loading="lazy"
        />
      </div>
      <canvas ref={canvasRef} className={styles.revealCanvas} />
      <div className={styles.content}>
        <div className={`${styles.label} reveal`}>Proyecto Destacado</div>
        <div className={`${styles.hint} reveal rd1`}>Explorá el render con el cursor</div>
      </div>
    </section>
  );
}
