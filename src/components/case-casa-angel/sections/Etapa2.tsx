'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Lightbox } from '@/components/portfolio/shared/Lightbox';
import { ChapterHead } from '../ChapterHead';
import { BOARD_QUOTE, E2, PROCESS_STEPS } from '../data';
import { pad, useInView } from '../hooks';
import s from '../CasaAngel.module.css';

const SKETCH = E2.images[0];
const DIAGRAMS = E2.images.slice(1);
/** Primer cuadro del proceso (terreno base), servido por el optimizador de imágenes. */
const POSTER = `/_next/image?url=${encodeURIComponent('/images/process/01. TERRENO BASE ANGEL.png')}&w=1920&q=75`;

/** Etapa 2: el croquis del refugio elevado, el proceso de forma y el ordenamiento del programa. */
export function Etapa2() {
  const sketchRef = useRef<HTMLElement>(null);
  const sketchIn = useInView(sketchRef, 0.3, true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoIn = useInView(videoWrapRef, 0.35);
  const [lb, setLb] = useState<number | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (videoIn && !reduce) v.play().catch(() => {});
    else v.pause();
  }, [videoIn]);

  return (
    <section id={E2.key} className={s.chapter} data-chapter="Etapa 2 — Definición conceptual">
      <ChapterHead chapter={E2} n={2} />

      <figure ref={sketchRef} className={`${s.sketch} ${sketchIn ? s.sketchOn : ''}`}>
        <div className={s.sketchImg}>
          <Image
            src={SKETCH.src}
            alt={SKETCH.alt}
            width={SKETCH.w}
            height={SKETCH.h}
            sizes="(max-width: 1440px) calc(100vw - 80px), 1360px"
            className={s.multiply}
            loading="lazy"
          />
        </div>
        <figcaption className={s.figCap}>
          <span>Idea</span>Croquis en corte del refugio elevado
        </figcaption>
      </figure>

      <blockquote className={s.boardQuote}>
        <p className="reveal">{BOARD_QUOTE.strong}</p>
        <p className="reveal rd1"><em>{BOARD_QUOTE.soft}</em></p>
        <cite className="reveal rd2">Lámina de la Etapa 2</cite>
      </blockquote>

      <div className={s.process}>
        <div className={s.processText}>
          <div className="sec-label reveal">Proceso de forma</div>
          <ol className={s.processSteps}>
            {PROCESS_STEPS.map((step, i) => (
              <li key={step} className={`reveal rd${Math.min(4, i + 1)}`}>
                <span>{pad(i + 1)}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
        <div ref={videoWrapRef} className={`${s.processVideo} reveal rd1`}>
          <video
            ref={videoRef}
            src="/videos/terereno-ai.mp4"
            muted
            loop
            playsInline
            preload="metadata"
            poster={POSTER}
            width={1696}
            height={1080}
            aria-label="Proceso de forma de Casa Angel: del terreno base a la planta baja"
          />
        </div>
      </div>

      <div className={s.diagrams}>
        {DIAGRAMS.map((d, i) => (
          <figure key={d.src} className={`${s.diagram} ${s[`diagram${i + 1}`]} reveal rd${(i % 2) + 1}`}>
            <button type="button" className={s.zoomBtn} onClick={() => setLb(i)} aria-label={`Ampliar: ${d.alt}`}>
              <Image
                src={d.src}
                alt={d.alt}
                width={d.w}
                height={d.h}
                sizes="(max-width: 768px) 100vw, 55vw"
                className={s.multiply}
                loading="lazy"
              />
            </button>
            <figcaption className={s.figCap}>
              <span>{pad(i + 2)}</span>
              {d.alt}
            </figcaption>
          </figure>
        ))}
      </div>

      <Lightbox items={DIAGRAMS} index={lb} onChange={setLb} />
    </section>
  );
}
