'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import s from '../UrbetrackCase.module.css';
import { CAPAS } from '../data';
import { useAutoCycle, useInView } from '../hooks';

export function Capas() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, 0.25);
  const [paused, setPaused] = useState(false);
  const { index, progress, select } = useAutoCycle(CAPAS.length, 5000, inView && !paused);

  return (
    <section
      ref={ref}
      className={s.capas}
      data-chapter="Instalaciones"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={s.capasList}>
        <div className={`${s.kicker} ${s.kickerLight} reveal`}>02 — 05 / Documentación técnica</div>
        <h2 className={`${s.capasTitle} reveal rd1`}>
          Lo que no<br /><em>se ve</em>
        </h2>
        <p className={`${s.capasLead} reveal rd2`}>
          Cada puesto, cada equipo y cada frente vidriado fue documentado. Instalaciones proyectadas
          en función del uso real de cada espacio.
        </p>
        <ol className={s.capasItems}>
          {CAPAS.map((c, i) => (
            <li key={c.title}>
              <button
                type="button"
                className={`${s.capa} ${i === index ? s.capaOn : ''}`}
                onClick={() => select(i)}
                onMouseEnter={() => select(i)}
              >
                <span className={s.capaNum}>{c.num}</span>
                <span className={s.capaBody}>
                  <span className={s.capaTitle}>{c.title}</span>
                  <span className={s.capaText}><span>{c.text}</span></span>
                </span>
                <span className={s.capaFact}>{c.fact}</span>
                <span className={s.capaBar}>
                  <span style={{ transform: `scaleX(${i === index ? progress : 0})` }} />
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className={s.capasStage}>
        {CAPAS.map((c, i) => (
          <div key={c.title} className={`${s.capaFrame} ${i === index ? s.capaFrameOn : ''}`}>
            <Image src={c.img} alt={`Instalaciones: ${c.title}`} fill sizes="(max-width: 1024px) 100vw, 58vw" className={s.capaImg} />
          </div>
        ))}
        <div className={s.capaCounter}>
          <span>{String(index + 1).padStart(2, '0')}</span> / {String(CAPAS.length).padStart(2, '0')}
        </div>
      </div>
    </section>
  );
}
