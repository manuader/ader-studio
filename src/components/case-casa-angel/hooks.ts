'use client';

import { useEffect, useState, type RefObject } from 'react';

/** True while the element is at least `threshold` visible (or once, if `once`). */
export function useInView(ref: RefObject<Element | null>, threshold = 0.25, once = false) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) io.disconnect();
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, once]);
  return inView;
}

/**
 * Progreso (0–1) de una sección alta mientras su hijo sticky está fijado.
 * Lo escribe en `--p` y lo reporta a `onProgress`.
 */
export function usePinProgress(ref: RefObject<HTMLElement | null>, onProgress?: (p: number) => void) {
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const range = Math.max(1, r.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -r.top / range));
      el.style.setProperty('--p', p.toFixed(4));
      onProgress?.(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, onProgress]);
}

/** Recorre 0..count-1 cada `ms` mientras `active`. */
export function useAutoCycle(count: number, ms: number, active: boolean) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!active) return;
    const tick = 50;
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + tick / ms;
        if (next >= 1) {
          setIndex((i) => (i + 1) % count);
          return 0;
        }
        return next;
      });
    }, tick);
    return () => clearInterval(id);
  }, [count, ms, active]);
  const select = (i: number) => {
    setIndex(i);
    setProgress(0);
  };
  return { index, progress, select };
}

export const pad = (n: number) => String(n).padStart(2, '0');
