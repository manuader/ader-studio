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

const TRAIL_DURATION = 600;

export function FachadaReveal({ projectHero = false }: { projectHero?: boolean }) {
  const journeyRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    maskCanvas: HTMLCanvasElement | null;
    maskCtx: CanvasRenderingContext2D | null;
    brushTexture: HTMLCanvasElement | null;
    colorImage: HTMLImageElement | null;
    colorLoaded: boolean;
    mousePos: { x: number; y: number } | null;
    lastPos: { x: number; y: number } | null;
    trail: { x: number; y: number; time: number }[];
    isActive: boolean;
    isClicking: boolean;
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
    mousePos: null,
    lastPos: null,
    trail: [],
    isActive: false,
    isClicking: false,
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

    const updateTitle = () => section.style.setProperty('--title-in', String(Math.min(1, Math.max(0, -(journeyRef.current ?? section).getBoundingClientRect().top / (innerHeight * .32)))));
    updateTitle();window.addEventListener('scroll', updateTitle, {passive:true});
    if (window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      section.dataset.static = '';
      return () => { window.removeEventListener('scroll', updateTitle); canvas.style.display = ''; delete section.dataset.static; };
    }
    const ctx = canvas.getContext('2d')!;
    const s = stateRef.current;

    s.brushTexture = createBrushTexture(128);

    function resize() {
      const rect = section!.getBoundingClientRect();
      const newW = Math.round(rect.width);
      const newH = Math.round(rect.height);
      if (newW === s.w && newH === s.h) return;

      s.w = newW;
      s.h = newH;
      canvas!.width = newW;
      canvas!.height = newH;

      const mc = document.createElement('canvas');
      mc.width = newW;
      mc.height = newH;
      s.maskCanvas = mc;
      s.maskCtx = mc.getContext('2d')!;
    }

    resize();

    const img = new window.Image();
    img.src = '/images/hero/fachada.webp';
    img.onload = () => {
      s.colorImage = img;
      s.colorLoaded = true;
    };

    function addTrailPoints(x: number, y: number) {
      const now = performance.now();
      const radius = s.currentBrushSize;
      if (radius < 1) return;

      if (!s.lastPos) {
        s.trail.push({ x, y, time: now });
        s.lastPos = { x, y };
        return;
      }

      const dx = x - s.lastPos.x;
      const dy = y - s.lastPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const spacing = radius * 0.3;
      const steps = Math.max(1, Math.ceil(dist / spacing));

      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        s.trail.push({
          x: s.lastPos.x + dx * t,
          y: s.lastPos.y + dy * t,
          time: now,
        });
      }

      s.lastPos = { x, y };
    }

    function renderFrame() {
      if (s.currentBrushSize < s.targetBrushSize) {
        s.currentBrushSize += (s.targetBrushSize - s.currentBrushSize) * 0.2;
        if (s.targetBrushSize - s.currentBrushSize < 0.5) {
          s.currentBrushSize = s.targetBrushSize;
        }
      }

      if (s.colorLoaded && s.maskCanvas && s.maskCtx && s.brushTexture) {
        const now = performance.now();

        // Remove expired trail points
        while (s.trail.length > 0 && now - s.trail[0].time > TRAIL_DURATION) {
          s.trail.shift();
        }

        // Clear mask completely each frame (no residual stain)
        s.maskCtx.clearRect(0, 0, s.w, s.h);

        const radius = s.currentBrushSize;
        if (radius > 1) {
          // Draw trail: oldest to newest, tapering size and opacity
          for (const point of s.trail) {
            const age = (now - point.time) / TRAIL_DURATION;
            const sizeFactor = 1 - age * 0.7;
            const r = radius * sizeFactor;
            const d = r * 2;
            s.maskCtx.globalAlpha = 1 - age;
            s.maskCtx.drawImage(s.brushTexture!, point.x - r, point.y - r, d, d);
          }

          // Keep cursor area fully bright while active
          if (s.isActive && s.mousePos) {
            s.maskCtx.globalAlpha = 1;
            const d = radius * 2;
            s.maskCtx.drawImage(s.brushTexture!, s.mousePos.x - radius, s.mousePos.y - radius, d, d);
          }

          s.maskCtx.globalAlpha = 1;
        }

        // Composite: color image (object-fit: cover)
        const imgW = s.colorImage!.naturalWidth;
        const imgH = s.colorImage!.naturalHeight;
        const scale = Math.max(s.w / imgW, s.h / imgH);
        const drawW = imgW * scale;
        const drawH = imgH * scale;
        const drawX = (s.w - drawW) / 2;
        const drawY = (s.h - drawH) / 2;

        ctx.clearRect(0, 0, s.w, s.h);
        ctx.drawImage(s.colorImage!, drawX, drawY, drawW, drawH);

        // If clicking, show full color; otherwise mask by trail
        if (!s.isClicking) {
          ctx.globalCompositeOperation = 'destination-in';
          ctx.drawImage(s.maskCanvas, 0, 0);
          ctx.globalCompositeOperation = 'source-over';
        }
      }

      s.rafId = requestAnimationFrame(renderFrame);
    }

    s.rafId = requestAnimationFrame(renderFrame);

    function onMouseMove(e: MouseEvent) {
      const rect = section!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      s.mousePos = { x, y };

      if (!s.isActive) {
        s.isActive = true;
        s.lastPos = { x, y };
        s.targetBrushSize = Math.min(s.w, s.h) * 0.2;
        s.currentBrushSize = s.targetBrushSize * 0.3;
      }

      addTrailPoints(x, y);
    }

    function onMouseDown() {
      s.isClicking = true;
    }

    function onMouseUp() {
      s.isClicking = false;
    }

    function onMouseLeave() {
      s.isActive = false;
      s.isClicking = false;
      s.lastPos = null;
      s.mousePos = null;
    }

    section.addEventListener('mousemove', onMouseMove);
    section.addEventListener('mousedown', onMouseDown);
    section.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseup', onMouseUp);

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 100);
    });
    ro.observe(section);

    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) {
      const showColor = () => {
        if (s.colorLoaded) {
          const imgW = s.colorImage!.naturalWidth;
          const imgH = s.colorImage!.naturalHeight;
          const scale = Math.max(s.w / imgW, s.h / imgH);
          const drawW = imgW * scale;
          const drawH = imgH * scale;
          const drawX = (s.w - drawW) / 2;
          const drawY = (s.h - drawH) / 2;
          ctx.clearRect(0, 0, s.w, s.h);
          ctx.globalAlpha = 0.6;
          ctx.drawImage(s.colorImage!, drawX, drawY, drawW, drawH);
          ctx.globalAlpha = 1;
        } else {
          setTimeout(showColor, 100);
        }
      };
      showColor();
    }

    return () => {
      window.removeEventListener('scroll', updateTitle);
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mousedown', onMouseDown);
      section.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseup', onMouseUp);
      if (s.rafId !== null) cancelAnimationFrame(s.rafId);
      ro.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div ref={journeyRef} className={projectHero ? styles.heroJourney : styles.noJourney}><section ref={sectionRef} className={`${styles.section} ${projectHero ? styles.projectHero : ""}`} aria-label={projectHero ? "Casa Ángel: explorar el render" : undefined}>
      <div className={styles.imageLayer}>
        <Image
          src="/images/hero/fachada byn.webp"
          alt="Casa Ángel: fachada y paisaje"
          fill
          className={styles.image}
          loading={projectHero ? "eager" : "lazy"}
          priority={projectHero}
        />
      </div>
      <canvas ref={canvasRef} className={styles.revealCanvas} />
      {projectHero && <div className={styles.projectIntro}><span>Casa Ángel / Proyecto</span><p>Un refugio elevado en el bosque.</p><span className={styles.exploreHint}>Explorá el render con el cursor</span></div>}
      <div className={styles.content}>
        {!projectHero && <div className={styles.label}>Proyecto Destacado</div>}
        {projectHero && <h1 className={styles.projectTitle}>Casa Ángel</h1>}
        {!projectHero && <div className={styles.hint}>Explorá el render con el cursor</div>}
        {projectHero && <a className={styles.continue} href="#proceso">Descubrir el proceso ↓</a>}
      </div>
    </section></div>
  );
}
