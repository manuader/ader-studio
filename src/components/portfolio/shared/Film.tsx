'use client';

import { useEffect, useRef, useState } from 'react';
import s from './Film.module.css';

type Props = {
  /** Nombre base en /videos/portfolio (p. ej. "obra" → obra-16x9.mp4, obra-9x16.webm…). */
  name: string;
  label: string;
  className?: string;
};

/**
 * Film en loop mudo producido con brag. Sirve la versión 9:16 en mobile,
 * WebM antes que MP4, y respeta prefers-reduced-motion mostrando solo el poster.
 */
export function Film({ name, label, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const base = `/videos/portfolio/${name}`;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    // Pausa fuera de pantalla para no gastar batería.
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div className={`${s.film} ${className ?? ''}`}>
      <picture className={s.poster}>
        <source media="(max-width: 768px)" srcSet={`${base}-9x16-poster.jpg`} />
        <img src={`${base}-poster.jpg`} alt={label} />
      </picture>
      {!reduced && (
        <video ref={ref} className={s.video} autoPlay muted loop playsInline preload="metadata" aria-label={label}>
          <source media="(max-width: 768px)" src={`${base}-9x16.webm`} type="video/webm" />
          <source media="(max-width: 768px)" src={`${base}-9x16.mp4`} type="video/mp4" />
          <source src={`${base}-16x9.webm`} type="video/webm" />
          <source src={`${base}-16x9.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
