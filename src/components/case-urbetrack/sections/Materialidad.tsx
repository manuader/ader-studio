'use client';

import { useState } from 'react';
import Image from 'next/image';
import s from '../UrbetrackCase.module.css';
import { EQUIPAMIENTO, TERMINACIONES } from '../data';

// Composición del moodboard, en % del contenedor (como la lámina MAT / 01).
const LAYOUT: Record<string, { l: number; t: number; w: number; h: number }> = {
  piso: { l: 0, t: 4, w: 54, h: 40 },
  cherry: { l: 30, t: 14, w: 34, h: 46 },
  nogal: { l: 58, t: 18, w: 34, h: 36 },
  violeta: { l: 3, t: 55, w: 27, h: 30 },
  gris: { l: 25, t: 64, w: 24, h: 28 },
  porcelanato: { l: 52, t: 60, w: 26, h: 32 },
  granito: { l: 70, t: 52, w: 30, h: 22 },
};

export function Materialidad() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className={s.materiales} data-chapter="Materialidad">
      <div className={s.matGrid}>
        <div className={s.matText}>
          <div className={`${s.kicker} reveal`}>06 / Materialidad · Terminaciones</div>
          <h2 className={`${s.splitTitle} reveal rd1`}>
            Una paleta<br /><em>compartida</em>
          </h2>
          <p className={`${s.splitLead} reveal rd2`}>
            Los mismos materiales en los tres pisos: madera gris en el piso, maderas oscuras en
            servicios y un único color de marca que hace de hilo conductor.
          </p>
          <ol className={`${s.matList} reveal rd3`} onMouseLeave={() => setActive(null)}>
            {TERMINACIONES.map((m, i) => (
              <li key={m.id} className={active === i ? s.matOn : ''} onMouseEnter={() => setActive(i)}>
                <span className={s.matIdx}>{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className={s.matName}>{m.name}</span>
                  <span className={s.matSpec}>{m.spec} · {m.use}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className={`${s.board} reveal rd2`} onMouseLeave={() => setActive(null)}>
          {TERMINACIONES.map((m, i) => {
            const L = LAYOUT[m.id];
            return (
              <div
                key={m.id}
                className={`${s.chip} ${active === i ? s.chipOn : ''} ${active !== null && active !== i ? s.chipDim : ''}`}
                style={{
                  left: `${L.l}%`,
                  top: `${L.t}%`,
                  width: `${L.w}%`,
                  height: `${L.h}%`,
                  zIndex: active === i ? 20 : i + 1,
                  background: 'color' in m ? m.color : undefined,
                  ['--d' as string]: `${i * 90}ms`,
                }}
                onMouseEnter={() => setActive(i)}
              >
                {'img' in m && <Image src={m.img} alt={m.name} fill sizes="30vw" className={s.chipImg} />}
                <span className={s.chipNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={s.chipLabel}>{m.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={s.equip}>
        <div className={`${s.kicker} reveal`}>Mobiliario y equipamiento</div>
        <div className={s.equipRow}>
          {EQUIPAMIENTO.map((o, i) => (
            <figure key={o.name} className={`${s.equipItem} reveal rd${Math.min(4, i + 1)}`}>
              <div className={s.equipImg}>
                <Image src={o.img} alt={o.name} fill sizes="(max-width: 768px) 45vw, 16vw" />
              </div>
              <figcaption>
                <strong>{o.name}</strong>
                {o.spec}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
