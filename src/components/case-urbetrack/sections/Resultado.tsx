'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import s from '../UrbetrackCase.module.css';
import { RECORRIDO } from '../data';
import { useAutoCycle, useInView } from '../hooks';

export function Resultado() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, 0.25);
  const [paused, setPaused] = useState(false);
  const { index, progress, select } = useAutoCycle(RECORRIDO.length, 5000, inView && !paused);

  return (
    <section
      ref={ref}
      className={s.recorrido}
      data-chapter="Resultado"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={s.recList}>
        <div className={`${s.kicker} reveal`}>Resultado</div>
        <h2 className={`${s.splitTitle} reveal rd1`}>
          Los espacios,<br /><em>habitados</em>
        </h2>
        <ol className={s.recItems}>
          {RECORRIDO.map((r, i) => (
            <li key={r.num}>
              <button
                type="button"
                className={`${s.recItem} ${i === index ? s.recItemActive : ''}`}
                onClick={() => select(i)}
                onMouseEnter={() => select(i)}
                aria-pressed={i === index}
              >
                <span className={s.recNum}>{r.num}</span>
                <span className={s.recBody}>
                  <span className={s.recTitle}>{r.title}</span>
                  <span className={s.recText}><span>{r.text}</span></span>
                </span>
                <span className={s.recBar}>
                  <span
                    className={s.recBarFill}
                    style={{ transform: `scaleX(${i === index ? progress : 0})` }}
                  />
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className={s.recStage}>
        {RECORRIDO.map((r, i) => (
          <div
            key={r.num}
            className={`${s.recFrame} ${i === index ? s.recFrameActive : ''} ${r.drawing ? s.recFrameDrawing : ''}`}
            aria-hidden={i !== index}
          >
            <Image
              src={r.img}
              alt={r.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className={r.drawing ? s.recImgContain : s.recImg}
            />
          </div>
        ))}
        <div className={s.recCounter}>
          <span>{RECORRIDO[index].num}</span> / {String(RECORRIDO.length).padStart(2, '0')}
        </div>
      </div>
    </section>
  );
}
