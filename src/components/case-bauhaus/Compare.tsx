'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import s from './BauhausCase.module.css';
import { COMPARE, FIGS } from './data';
import { useReducedMotion, useSeen, useViewer } from './hooks';

const clamp = (v: number) => Math.min(100, Math.max(0, v));

/** Comparador arrastrable: foto ↔ modelo digital del Gartenhaus de Goethe. */
export function Compare() {
  const f = FIGS.compare;
  const open = useViewer();
  const frameRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const touched = useRef(false);
  const seen = useSeen(frameRef, 0.5);
  const reduced = useReducedMotion();

  // Un solo gesto de presentación: la línea recorre la casa y vuelve al centro.
  useEffect(() => {
    if (!seen || reduced) return;
    let raf = 0;
    const t0 = performance.now();
    const D = 1200;
    const tick = (t: number) => {
      if (touched.current) return;
      const k = Math.min(1, (t - t0) / D);
      setPos(50 + Math.sin(k * Math.PI * 2) * 22 * (1 - k * 0.2));
      if (k < 1) raf = requestAnimationFrame(tick);
      else setPos(50);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, reduced]);

  const fromEvent = useCallback((clientX: number) => {
    const r = frameRef.current!.getBoundingClientRect();
    setPos(clamp(((clientX - r.left) / r.width) * 100));
  }, []);

  return (
    <figure className={s.compare}>
      <div
        ref={frameRef}
        className={`${s.compareFrame} ${dragging ? s.compareDragging : ''}`}
        style={{ aspectRatio: `${COMPARE.a.w} / ${COMPARE.a.h}` }}
        onPointerDown={(e) => {
          touched.current = true;
          setDragging(true);
          e.currentTarget.setPointerCapture(e.pointerId);
          fromEvent(e.clientX);
        }}
        onPointerMove={(e) => dragging && fromEvent(e.clientX)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
      >
        <Image
          src={COMPARE.b.src}
          alt={`${COMPARE.b.label}: ${COMPARE.place}`}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          loading="lazy"
          className={s.compareImg}
          draggable={false}
        />
        <div className={s.compareTop} style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image
            src={COMPARE.a.src}
            alt={`${COMPARE.a.label}: ${COMPARE.place}`}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            loading="lazy"
            className={s.compareImg}
            draggable={false}
          />
        </div>
        <span className={`${s.compareTag} ${s.compareTagL}`} style={{ opacity: pos < 14 ? 0 : 1 }}>{COMPARE.a.label}</span>
        <span className={`${s.compareTag} ${s.compareTagR}`} style={{ opacity: pos > 86 ? 0 : 1 }}>{COMPARE.b.label}</span>
        <div className={s.compareLine} style={{ transform: `translateX(${pos}%)` }}>
          <button
            type="button"
            role="slider"
            aria-label="Comparar foto y modelo digital"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${Math.round(pos)} % foto`}
            className={s.compareHandle}
            onKeyDown={(e) => {
              const step = e.shiftKey ? 10 : 4;
              if (e.key === 'ArrowLeft') { touched.current = true; setPos((p) => clamp(p - step)); e.preventDefault(); }
              if (e.key === 'ArrowRight') { touched.current = true; setPos((p) => clamp(p + step)); e.preventDefault(); }
              if (e.key === 'Home') { setPos(0); e.preventDefault(); }
              if (e.key === 'End') { setPos(100); e.preventDefault(); }
            }}
          >
            <svg width="22" height="10" viewBox="0 0 22 10" aria-hidden="true">
              <polyline points="5,1 1,5 5,9" stroke="currentColor" fill="none" strokeWidth="1.1" />
              <polyline points="17,1 21,5 17,9" stroke="currentColor" fill="none" strokeWidth="1.1" />
            </svg>
          </button>
        </div>
      </div>
      <figcaption className={s.cap}>
        <span className={s.capNum}>{f.fig}</span>
        <span>
          {f.alt}.{' '}
          <button type="button" className={s.capLink} onClick={() => open('compare')}>Ver lámina</button>
        </span>
      </figcaption>
    </figure>
  );
}
