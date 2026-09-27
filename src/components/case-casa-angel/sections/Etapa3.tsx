'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import Image from 'next/image';
import { Lightbox } from '@/components/portfolio/shared/Lightbox';
import { ChapterHead } from '../ChapterHead';
import { BIM_LAYERS, BIM_SIZE, E3, PLAN_VIEWS } from '../data';
import { pad, useAutoCycle, useInView } from '../hooks';
import s from '../CasaAngel.module.css';

const AXOS = [E3.images[3], E3.images[4]];

/** Etapa 3: plantas y corte en un conmutador, axonometrías y capas del modelo. */
export function Etapa3() {
  const [view, setView] = useState(0);
  const [lb, setLb] = useState<number | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const bimRef = useRef<HTMLDivElement>(null);
  const bimIn = useInView(bimRef, 0.3);
  const [paused, setPaused] = useState(false);
  const bim = useAutoCycle(BIM_LAYERS.length, 4000, bimIn && !paused);

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (view + (e.key === 'ArrowRight' ? 1 : -1) + PLAN_VIEWS.length) % PLAN_VIEWS.length;
    setView(next);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  const lbItems = PLAN_VIEWS.map((v) => v.image);

  return (
    <section id={E3.key} className={`${s.chapter} ${s.bgWhite}`} data-chapter="Etapa 3 — Diseño y desarrollo">
      <ChapterHead chapter={E3} n={3} />

      {/* Plantas y corte */}
      <div className={s.plans}>
        <div className={s.plansBar}>
          <div ref={tabsRef} className={s.tabs} role="tablist" aria-label="Documentación">
            {PLAN_VIEWS.map((v, i) => (
              <button
                key={v.key}
                type="button"
                role="tab"
                id={`ca-tab-${v.key}`}
                aria-selected={i === view}
                aria-controls="ca-plan-stage"
                tabIndex={i === view ? 0 : -1}
                className={`${s.tab} ${i === view ? s.tabOn : ''}`}
                onClick={() => setView(i)}
                onKeyDown={onTabKey}
              >
                {v.label}
              </button>
            ))}
          </div>
          <button type="button" className={s.expand} onClick={() => setLb(view)}>
            Ampliar
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M7 1h4v4M5 11H1V7M11 1L7 5M1 11l4-4" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
        </div>
        <div
          id="ca-plan-stage"
          className={s.planStage}
          role="tabpanel"
          aria-labelledby={`ca-tab-${PLAN_VIEWS[view].key}`}
        >
          {PLAN_VIEWS.map((v, i) => (
            <div key={v.key} className={`${s.planFrame} ${i === view ? s.planFrameOn : ''}`} aria-hidden={i !== view}>
              <Image
                src={v.image.src}
                alt={v.image.alt}
                width={v.image.w}
                height={v.image.h}
                sizes="(max-width: 1440px) calc(100vw - 80px), 1360px"
                className={s.planImg}
                loading="lazy"
              />
            </div>
          ))}
          <div className={s.planCounter} aria-hidden="true">
            <span>{pad(view + 1)}</span> / {pad(PLAN_VIEWS.length)}
          </div>
        </div>
      </div>

      {/* Axonometrías */}
      <div className={s.axos}>
        {AXOS.map((a, i) => (
          <figure key={a.src} className={`${s.axo} ${i === 0 ? s.axoWide : s.axoTall} reveal`}>
            <Image
              src={a.src}
              alt={a.alt}
              width={a.w}
              height={a.h}
              sizes={i === 0 ? '(max-width: 1440px) calc(100vw - 80px), 1360px' : '(max-width: 768px) 100vw, 60vw'}
              loading="lazy"
            />
            <figcaption className={s.figCap}>
              <span>Axonométrica</span>
              {a.alt.replace(/^Axonométrica:\s*/, '')}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Capas del modelo */}
      <div
        ref={bimRef}
        className={s.bim}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className={s.bimList}>
          <div className="sec-label reveal">Modelo BIM</div>
          <h3 className={`${s.subTitle} reveal rd1`}>
            Capa
            <br />
            <em>por capa</em>
          </h3>
          <ol className={s.bimItems}>
            {BIM_LAYERS.map((l, i) => (
              <li key={l.num}>
                <button
                  type="button"
                  className={`${s.bimItem} ${i === bim.index ? s.bimItemOn : ''}`}
                  aria-pressed={i === bim.index}
                  onClick={() => bim.select(i)}
                >
                  <span className={s.bimNum}>{l.num}</span>
                  <span className={s.bimBody}>
                    <span className={s.bimLabel}>{l.label}</span>
                    <span className={s.bimSub}><span>{l.sub}</span></span>
                  </span>
                  <span className={s.bimBar} aria-hidden="true">
                    <span style={{ transform: `scaleX(${i === bim.index ? bim.progress : 0})` }} />
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className={s.bimStage}>
          {BIM_LAYERS.map((l, i) => (
            <div key={l.num} className={`${s.bimFrame} ${i <= bim.index ? s.bimFrameOn : ''}`} aria-hidden={i !== bim.index}>
              <Image
                src={l.src}
                alt={`Modelo BIM, capa ${l.num}: ${l.label}`}
                width={BIM_SIZE.w}
                height={BIM_SIZE.h}
                sizes="(max-width: 1024px) 100vw, 58vw"
                loading="lazy"
              />
            </div>
          ))}
          <div className={s.planCounter} aria-hidden="true">
            <span>{BIM_LAYERS[bim.index].num}</span> / {pad(BIM_LAYERS.length)}
          </div>
        </div>
      </div>

      <Lightbox items={lbItems} index={lb} onChange={setLb} />
    </section>
  );
}
