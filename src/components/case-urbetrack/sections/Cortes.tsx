'use client';

import { useState } from 'react';
import Image from 'next/image';
import s from '../UrbetrackCase.module.css';
import { CORTES } from '../data';



/** Planta llave: silueta del edificio con las líneas de corte, como en la lámina. */
function KeyPlan({ active }: { active: string }) {
  const cls = (id: string) => `${s.cut} ${active === id ? s.cutOn : ''}`;
  return (
    <svg viewBox="0 0 200 230" className={s.keyPlan} aria-hidden="true">
      <path d="M20 60 H122 V14 H178 V48 H168 V66 H182 V214 H20 Z" className={s.keyShape} />
      <g className={cls('a')}>
        <line x1="8" y1="92" x2="194" y2="92" />
        <text x="4" y="84">A</text>
        <text x="188" y="84">A</text>
      </g>
      <g className={cls('b')}>
        <line x1="8" y1="170" x2="194" y2="170" />
        <text x="4" y="162">B</text>
        <text x="188" y="162">B</text>
      </g>
      <g className={cls('l')}>
        <line x1="146" y1="4" x2="146" y2="226" />
        <text x="152" y="12">L</text>
        <text x="152" y="224">L</text>
      </g>
    </svg>
  );
}

export function Cortes() {
  const [idx, setIdx] = useState(0);
  const corte = CORTES[idx];

  return (
    <section className={s.cortes} data-chapter="Cortes">
      <div className={s.cortesHead}>
        <div>
          <div className={`${s.kicker} reveal`}>01 / Arquitectura · Cortes fugados</div>
          <h2 className={`${s.splitTitle} reveal rd1`}>
            El edificio<br /><em>por dentro</em>
          </h2>
        </div>
        <div className={`${s.cortesCtl} reveal rd2`}>
          <KeyPlan active={corte.id} />
          <div>
            <div className={s.tabs}>
              {CORTES.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  className={`${s.tab} ${i === idx ? s.tabOn : ''}`}
                  aria-pressed={i === idx}
                  onClick={() => setIdx(i)}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <p className={s.cortesText} key={corte.id}>{corte.text}</p>
          </div>
        </div>
      </div>

      <div className={`${s.corteFrame} reveal`}>
        <div className={s.corteTrack} style={{ transform: `translateX(-${idx * 100}%)` }}>
          {CORTES.map((c, i) => (
            <div key={c.id} className={s.corteSlide} aria-hidden={i !== idx}>
              <div className={s.corteDrawing} style={{ aspectRatio: c.crop.width / c.crop.height }}>
                <Image src={c.img} alt={`Corte fugado ${c.label}`} width={c.crop.imageWidth} height={c.crop.imageHeight} sizes="100vw" className={s.corteImg}
                  style={{ width: `${c.crop.imageWidth / c.crop.width * 100}%`, height: `${c.crop.imageHeight / c.crop.height * 100}%`, left: `${-c.crop.x / c.crop.width * 100}%`, top: `${-c.crop.y / c.crop.height * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
        <button type="button" className={`${s.sheetArrow} ${s.sheetArrowPrev} ${s.cutArrow}`} aria-label="Corte anterior" onClick={() => setIdx((value) => (value + CORTES.length - 1) % CORTES.length)}>
          <Image src="/images/urbetrack/ui/arrow-left.png" alt="" width={24} height={24} />
        </button>
        <button type="button" className={`${s.sheetArrow} ${s.sheetArrowNext} ${s.cutArrow}`} aria-label="Corte siguiente" onClick={() => setIdx((value) => (value + 1) % CORTES.length)}>
          <Image src="/images/urbetrack/ui/arrow-right.png" alt="" width={24} height={24} />
        </button>
      </div>
    </section>
  );
}
