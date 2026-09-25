'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import s from '../UrbetrackCase.module.css';
import { CORTES } from '../data';

const ZOOM = 2;

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
  const [lens, setLens] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const corte = CORTES[idx];

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const r = frameRef.current!.getBoundingClientRect();
    setLens({ x: e.clientX - r.left, y: e.clientY - r.top, w: r.width, h: r.height });
  };

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

      <div
        ref={frameRef}
        className={`${s.corteFrame} reveal`}
        style={{ ['--r' as string]: corte.ratio }}
        onPointerMove={onMove}
        onPointerLeave={() => setLens(null)}
      >
        {CORTES.map((c, i) => (
          <Image
            key={c.id}
            src={c.img}
            alt={`Corte fugado ${c.label}`}
            fill
            sizes="100vw"
            className={`${s.corteImg} ${i === idx ? s.corteImgOn : ''}`}
          />
        ))}
        {lens && (
          <div
            className={s.lens}
            style={{
              left: lens.x,
              top: lens.y,
              backgroundImage: `url("${corte.img}")`,
              backgroundSize: `${lens.w * ZOOM}px ${lens.h * ZOOM}px`,
              backgroundPosition: `${-(lens.x * ZOOM - 110)}px ${-(lens.y * ZOOM - 110)}px`,
            }}
          />
        )}
        <span className={s.corteHint}>Pasá el cursor para ampliar</span>
      </div>
    </section>
  );
}
