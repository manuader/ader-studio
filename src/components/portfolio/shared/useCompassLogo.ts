'use client';

import { useEffect, type RefObject } from 'react';

/**
 * El logo apunta hacia el cursor, como una brújula hacia el norte
 * (mismo comportamiento que el Navbar de la home). La aguja de la
 * imagen apunta a la derecha en reposo.
 */
export function useCompassLogo(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const update = () => {
      raf = 0;
      const logo = ref.current;
      if (!logo) return;
      const r = logo.getBoundingClientRect();
      const angle = Math.atan2(y - (r.top + r.height / 2), x - (r.left + r.width / 2)) * (180 / Math.PI);
      logo.style.transform = `rotate(${angle}deg)`;
    };
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}
