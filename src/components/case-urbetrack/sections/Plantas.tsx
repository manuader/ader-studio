'use client';

import { useState } from 'react';
import Image from 'next/image';
import s from '../UrbetrackCase.module.css';
import { FLOORS } from '../data';

export function Plantas() {
  const [floorIdx, setFloorIdx] = useState(0);
  const [room, setRoom] = useState<number | null>(null);
  const floor = FLOORS[floorIdx];

  return (
    <section className={`${s.split} ${s.splitReverse}`} data-chapter="Plantas">
      <div className={s.splitText}>
        <div className={`${s.kicker} reveal`}>01 / Arquitectura · Planta con mobiliario</div>
        <h2 className={`${s.splitTitle} reveal rd1`}>
          Cada área,<br /><em>su lugar</em>
        </h2>
        <p className={`${s.splitLead} reveal rd2`}>
          Puestos operativos, oficinas, salas de trabajo y de reunión, resueltos según las
          necesidades de concentración, privacidad y colaboración de cada equipo.
        </p>
        <div className={`${s.tabs} reveal rd2`}>
          {FLOORS.map((f, i) => (
            <button
              key={f.id}
              type="button"
              className={`${s.tab} ${i === floorIdx ? s.tabOn : ''}`}
              onClick={() => { setFloorIdx(i); setRoom(null); }}
            >
              Piso {f.id}
            </button>
          ))}
        </div>
        <ul className={`${s.roomList} reveal rd3`} onMouseLeave={() => setRoom(null)} key={floor.id}>
          {floor.rooms.map((r, i) => (
            <li
              key={`${r.name}-${i}`}
              className={room === i ? s.roomOn : ''}
              onMouseEnter={() => setRoom(i)}
              style={{ ['--d' as string]: `${i * 40}ms` }}
            >
              <span className={s.roomIdx}>{String(i + 1).padStart(2, '0')}</span>
              <span className={s.roomName}>{r.name}</span>
              <span className={s.roomArea}>{r.area}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={s.planViewer}>
        <Image
          key={floor.plan}
          src={floor.plan}
          alt={`Planta con mobiliario del piso ${floor.id}`}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className={s.planImg}
        />
        <div className={s.planUse}>
          <span>{floor.id}</span>
          {floor.use}
        </div>
        {floor.rooms.map((r, i) => (
          <button
            key={`${floor.id}-${i}`}
            type="button"
            className={`${s.pin} ${room === i ? s.pinOn : ''} ${room !== null && room !== i ? s.pinDim : ''}`}
            style={{ left: `${r.x}%`, top: `${r.y - 3.2}%`, ['--d' as string]: `${i * 60}ms` }}
            onMouseEnter={() => setRoom(i)}
            onMouseLeave={() => setRoom(null)}
            onFocus={() => setRoom(i)}
            onBlur={() => setRoom(null)}
            aria-label={`${r.name}, ${r.area}`}
          >
            <svg viewBox="0 0 24 32" width="22" height="30" aria-hidden="true">
              <path d="M12 31 C7 22 2 17 2 11 A10 10 0 1 1 22 11 C22 17 17 22 12 31 Z" />
              <circle cx="12" cy="11" r="3.6" />
            </svg>
            <span className={s.pinTip}>
              <strong>{r.name}</strong>
              {r.area}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
