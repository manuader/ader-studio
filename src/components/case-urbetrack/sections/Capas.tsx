'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import s from '../UrbetrackCase.module.css';
import { CAPAS, technicalSheet } from '../data';
import { useInView } from '../hooks';

const SEQUENCE = CAPAS.flatMap((category, categoryIndex) => category.sheets.map((_, sheetIndex) => ({ categoryIndex, sheetIndex })));

export function Capas() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const visible = useInView(viewerRef, 0.4);
  const [manual, setManual] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [position, setPosition] = useState(0);
  const { categoryIndex: index, sheetIndex } = SEQUENCE[position];
  const [direction, setDirection] = useState(1);
  const category = CAPAS[index];
  const sheet = category.sheets[sheetIndex];
  useEffect(() => {
    if (!visible || manual) return;
    const timer = window.setInterval(() => {
      if (document.hidden || dialogRef.current?.open || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      setDirection(1);
      setPosition((value) => (value + 1) % SEQUENCE.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [visible, manual, position]);
  const select = (i: number) => {
    setManual(true);
    if (i === index) return;
    setDirection(i > index ? 1 : -1);
    setPosition(SEQUENCE.findIndex((entry) => entry.categoryIndex === i));
  };
  const move = (step: number) => {
    setManual(true);
    setDirection(step);
    setPosition((value) => (value + step + SEQUENCE.length) % SEQUENCE.length);
  };

  return (
    <section className={s.capas} data-chapter="Instalaciones">
      <div className={s.capasList}>
        <div className={`${s.kicker} ${s.kickerLight} reveal`}>02 / Instalación eléctrica</div>
        <h2 className={`${s.capasTitle} reveal rd1`}>Infraestructura<br /><em>para conectar</em></h2>
        <p className={`${s.capasLead} reveal rd2`}>
          Una empresa de software necesita mucho más que puestos de trabajo.
          Energía, conectividad, iluminación y confort se proyectaron juntos:
          la infraestructura que sostiene la actividad de los tres pisos.
        </p>
        <ol className={s.capasItems}>
          {CAPAS.map((c, i) => (
            <li key={c.title}>
              <button type="button" className={`${s.capa} ${i === index ? s.capaOn : ''}`} aria-pressed={i === index} onClick={() => select(i)}>
                <span className={s.capaNum}>{c.num}</span>
                <span className={s.capaBody}>
                  <span className={s.capaTitle}>{c.title}</span>
                  <span className={s.capaText}><span>{c.text}</span></span>
                </span>
                <span className={s.capaFact}>{c.fact}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div ref={viewerRef} className={s.electricalViewer} onFocusCapture={() => setManual(true)} role="region" aria-label="Planos de instalación eléctrica" aria-roledescription="carrusel">
        <div className={s.electricalFrame}>
          <div className={s.electricalFlow} style={{ transform: `translateX(-${position * 100}%)` }}>
            {SEQUENCE.map((entry, i) => {
              const c = CAPAS[entry.categoryIndex];
              const item = c.sheets[entry.sheetIndex];
              return <div className={s.electricalFlowPage} key={item.page} aria-hidden={i !== position}>
                <button type="button" tabIndex={i === position ? 0 : -1} className={s.sheetImageButton} aria-label={`Ampliar ${item.label}`} onClick={() => { setManual(true); dialogRef.current?.showModal(); }}>
                  <Image src={technicalSheet(item.page)} alt={`${c.title}: ${item.label}`} fill sizes="(max-width: 1024px) 100vw, 58vw" />
                </button>
              </div>;
            })}
          </div>
          <button type="button" className={`${s.sheetArrow} ${s.sheetArrowPrev}`} aria-label="Plano anterior" onClick={() => move(-1)}>
            <Image src="/images/urbetrack/ui/arrow-left.png" alt="" width={24} height={24} />
          </button>
          <button type="button" className={`${s.sheetArrow} ${s.sheetArrowNext}`} aria-label="Plano siguiente" onClick={() => move(1)}>
            <Image src="/images/urbetrack/ui/arrow-right.png" alt="" width={24} height={24} />
          </button>
        </div>
        <div className={s.sheetCaption} aria-live={manual ? "polite" : "off"} aria-atomic="true">
          <strong>{sheet.label}</strong>
          <span>{String(sheetIndex + 1).padStart(2, '0')} / {String(category.sheets.length).padStart(2, '0')}</span>
        </div>
        <dialog ref={dialogRef} className={s.sheetDialog} aria-label="Lámina ampliada" onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
          if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
        }}>
          <button type="button" className={s.sheetClose} aria-label="Cerrar lámina" onClick={() => dialogRef.current?.close()}>×</button>
          <nav className={s.sheetCategories} aria-label="Categorías de instalaciones">
            {CAPAS.map((c, i) => (
              <button type="button" key={c.num} className={s.sheetCategory} aria-pressed={index === i} onClick={() => select(i)}>
                <span>{c.num}</span> {c.title}
              </button>
            ))}
          </nav>
          <div key={position} className={`${s.sheetDialogImage} ${direction > 0 ? s.electricalSheetNext : s.electricalSheetPrev}`}>
            <Image src={technicalSheet(sheet.page)} alt={sheet.label} fill sizes="100vw" />
          </div>
          <button type="button" className={`${s.sheetArrow} ${s.sheetArrowPrev}`} aria-label="Lámina anterior" onClick={() => move(-1)}><Image src="/images/urbetrack/ui/arrow-left.png" alt="" width={24} height={24} /></button>
          <button type="button" className={`${s.sheetArrow} ${s.sheetArrowNext}`} aria-label="Lámina siguiente" onClick={() => move(1)}><Image src="/images/urbetrack/ui/arrow-right.png" alt="" width={24} height={24} /></button>
          <div className={s.sheetDialogCaption} aria-live="polite">{sheet.label} · {sheetIndex + 1} / {category.sheets.length}</div>
        </dialog>
      </div>
    </section>
  );
}
