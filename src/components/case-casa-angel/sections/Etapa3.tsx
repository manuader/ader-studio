'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import Image from 'next/image';
import { Lightbox } from '@/components/portfolio/shared/Lightbox';
import { ChapterHead } from '../ChapterHead';
import { E3, PLAN_VIEWS } from '../data';
import { pad } from '../hooks';
import s from '../CasaAngel.module.css';

const AXOS = [E3.images[3], E3.images[4]];

/** Etapa 3: plantas y corte en un conmutador, y axonometrías. */
export function Etapa3() {
  const [view, setView] = useState(0);
  const [lb, setLb] = useState<number | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

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


      <Lightbox items={lbItems} index={lb} onChange={setLb} />
    </section>
  );
}
