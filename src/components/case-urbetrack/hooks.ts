'use client';

import { useEffect, useState, type RefObject } from 'react';

/** True while the element is at least `threshold` visible. */
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
 * Scroll progress (0–1) of a tall section while its sticky child is pinned.
 * Writes it to the `--p` CSS variable and reports it to `onProgress`.
 */
export function usePinProgress(ref: RefObject<HTMLElement | null>, onProgress?: (p: number) => void) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    let current = 0;
    let target = 0;
    let previousTime = 0;
    const measure = () => {
      const r = el.getBoundingClientRect();
      target = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
    };
    const paint = () => {
      el.style.setProperty('--p', current.toFixed(5));
      onProgress?.(current);
    };
    const update = (time: number) => {
      raf = 0;
      const dt = Math.min(64, Math.max(0, time - previousTime));
      previousTime = time;
      current = motion.matches ? target : current + (target - current) * (1 - Math.exp(-dt / 160));
      if (Math.abs(target - current) < 0.00005) current = target;
      paint();
      if (current !== target) raf = requestAnimationFrame(update);
    };
    const onScroll = () => {
      measure();
      if (!raf) {
        previousTime = performance.now();
        raf = requestAnimationFrame(update);
      }
    };
    measure();
    current = target;
    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    motion.addEventListener('change', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      motion.removeEventListener('change', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, onProgress]);
}
/** Cycles 0..count-1 every `ms` while `active`. */
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
