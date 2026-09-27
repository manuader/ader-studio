'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import s from './BauhausCase.module.css';
import { FIGS } from './data';
import { useReducedMotion } from './hooks';

/** Banda panorámica: el render se recorre de izquierda a derecha mientras la banda cruza la pantalla. */
export function RenderPan() {
  const f = FIGS.render;
  const bandRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const band = bandRef.current;
      const img = imgRef.current;
      if (!band || !img) return;
      const r = band.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      const over = Math.max(0, img.offsetWidth - band.clientWidth);
      img.style.transform = `translate3d(${-p * over}px,0,0)`;
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <figure className={s.pan}>
      <div ref={bandRef} className={`${s.panBand} ${reduced ? s.panStatic : ''}`}>
        <div ref={imgRef} className={s.panImg} style={{ aspectRatio: `${f.w} / ${f.h}` }}>
          <Image src={f.src} alt={f.alt} fill sizes="(max-width: 768px) 300vw, 130vw" loading="lazy" />
        </div>
      </div>
      <figcaption className={`${s.cap} ${s.panCap}`}>
        <span className={s.capNum}>{f.fig}</span>
        <span>{f.alt}. RothNEUsiedl, Viena.</span>
      </figcaption>
    </figure>
  );
}
