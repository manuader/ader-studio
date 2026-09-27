'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { ChapterHead } from '../ChapterHead';
import { E1, SITE_SEQUENCE } from '../data';
import { pad, usePinProgress } from '../hooks';
import s from '../CasaAngel.module.css';

/** Etapa 1: la lectura del sitio en una secuencia fijada que avanza con el scroll. */
export function Etapa1() {
  const seqRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = SITE_SEQUENCE.length;

  const onProgress = useCallback(
    (p: number) => setActive(Math.min(n - 1, Math.floor(p * n))),
    [n]
  );
  usePinProgress(seqRef, onProgress);

  const goTo = (i: number) => {
    const el = seqRef.current;
    if (!el) return;
    const range = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((i + 0.5) / n) * range, behavior: 'smooth' });
  };

  return (
    <section id={E1.key} className={`${s.chapter} ${s.bgWhite}`} data-chapter="Etapa 1 — Investigación y diagnóstico">
      <ChapterHead chapter={E1} n={1} />

      <div ref={seqRef} className={s.seq} style={{ ['--n' as string]: n }}>
        <div className={s.seqPin}>
          <div className={s.seqSide}>
            <div className={s.seqCounter} aria-hidden="true">
              <span key={active} className={s.seqCounterNow}>{pad(active + 1)}</span>
              <span className={s.seqCounterAll}>/ {pad(n)}</span>
            </div>
            <ol className={s.seqList}>
              {SITE_SEQUENCE.map((img, i) => (
                <li key={img.src}>
                  <button
                    type="button"
                    className={`${s.seqItem} ${i === active ? s.seqItemOn : ''}`}
                    aria-current={i === active ? 'step' : undefined}
                    onClick={() => goTo(i)}
                  >
                    <span className={s.seqItemNum}>{pad(i + 1)}</span>
                    <span>{img.alt}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className={s.seqBar} aria-hidden="true"><span /></div>
          </div>

          <div className={s.seqStage}>
            {SITE_SEQUENCE.map((img, i) => (
              <figure
                key={img.src}
                className={`${s.seqFrame} ${i === active ? s.seqFrameOn : ''} ${i < active ? s.seqFramePast : ''}`}
              >
                <div className={s.seqImgWrap}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.w}
                    height={img.h}
                    sizes="(max-width: 1023px) 100vw, 66vw"
                    className={s.seqImg}
                    loading="lazy"
                  />
                </div>
                <figcaption className={s.seqCaption}>
                  <span>{pad(i + 1)}</span>
                  {img.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
