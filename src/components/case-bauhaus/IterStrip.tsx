'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import s from './BauhausCase.module.css';
import { ITERATIONS } from './data';
import { usePinProgress, useReducedMotion } from './hooks';

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Secuencia image-to-image fijada al scroll: la tira avanza de la imagen base,
 * por las cuatro iteraciones, hasta la imagen final del mueble.
 */
export function IterStrip({ children }: { children?: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const axisRef = useRef<HTMLSpanElement>(null);
  const distRef = useRef(0);
  const [dist, setDist] = useState(0);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const n = ITERATIONS.length;

  useEffect(() => {
    if (reduced) return;
    const measure = () => {
      const t = trackRef.current;
      const v = viewRef.current;
      if (!t || !v) return;
      const d = Math.max(0, t.scrollWidth - v.clientWidth);
      distRef.current = d;
      setDist(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewRef.current) ro.observe(viewRef.current);
    return () => ro.disconnect();
  }, [reduced]);

  const onProgress = useCallback(
    (p: number) => {
      if (trackRef.current) trackRef.current.style.transform = `translate3d(${-p * distRef.current}px,0,0)`;
      if (axisRef.current) axisRef.current.style.transform = `scaleX(${p})`;
      setActive(Math.min(n - 1, Math.round(p * (n - 1))));
    },
    [n]
  );
  usePinProgress(outerRef, onProgress, !reduced);

  return (
    <div
      ref={outerRef}
      className={`${s.iter} ${reduced ? s.iterStatic : ''}`}
      style={reduced ? undefined : { height: `calc(100vh + ${Math.round(dist * 1.15)}px)` }}
    >
      <div className={s.iterSticky}>
        <div className={s.iterHead}>
          <div className={s.iterLabel}>Image to image</div>
          <div className={s.iterCount} aria-hidden="true">
            <span>{pad(active + 1)}</span> / {pad(n)}
          </div>
        </div>
        <div ref={viewRef} className={s.iterView}>
          <ol ref={trackRef} className={s.iterTrack}>
            {ITERATIONS.map((it, i) => (
              <li
                key={it.src}
                className={`${s.iterItem} ${it.big ? s.iterBig : ''} ${i <= active ? s.iterOn : ''}`}
              >
                <div className={s.iterImg}>
                  <Image
                    src={it.src}
                    alt={it.alt}
                    width={it.w}
                    height={it.h}
                    sizes={it.big ? '(max-width: 768px) 78vw, 460px' : '200px'}
                    loading="lazy"
                  />
                </div>
                <div className={s.iterCap}>
                  <span className={s.iterNum}>{pad(i + 1)}</span>
                  {it.label}
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className={s.iterAxis} aria-hidden="true">
          <span ref={axisRef} className={s.iterAxisFill} />
        </div>
        {children}
      </div>
    </div>
  );
}
