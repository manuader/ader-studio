'use client';

import { createContext, useContext, useEffect, useState, type RefObject } from 'react';
import type { FigKey } from './data';

/** Abre el visor en la figura indicada. */
export const ViewerContext = createContext<(key: FigKey) => void>(() => {});
export const useViewer = () => useContext(ViewerContext);

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/** True la primera vez que el elemento entra en pantalla. */
export function useSeen(ref: RefObject<Element | null>, threshold = 0.35) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, seen]);
  return seen;
}

/** Progreso (0–1) de una sección alta mientras su hijo sticky está fijado. */
export function usePinProgress(ref: RefObject<HTMLElement | null>, onProgress: (p: number) => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const range = Math.max(1, r.height - window.innerHeight);
      onProgress(Math.min(1, Math.max(0, -r.top / range)));
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
  }, [ref, onProgress, enabled]);
}
