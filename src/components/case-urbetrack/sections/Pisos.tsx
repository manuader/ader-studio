'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import s from '../UrbetrackCase.module.css';
import { FLOORS, type Floor, type FloorId } from '../data';
import { usePinProgress } from '../hooks';
import { FLOOR_EVENT } from './Hero';

// Tramos del scroll: primero se despieza el edificio, después se recorre cada piso.
const EXPLODE_END = 0.16;
const SEGMENTS = [
  [EXPLODE_END, 0.45],
  [0.45, 0.73],
  [0.73, 1],
] as const;

function FloorPanel({ floor }: { floor: Floor }) {
  return (
    <div className={s.floorPanel} key={floor.id}>
      <div className={s.floorHead}>
        <span className={s.floorNum}>{floor.id}</span>
        <Image src={floor.diagram} alt="" width={72} height={91} className={s.floorDiagram} />
      </div>
      <div className={s.floorUse}>Piso {floor.id} · {floor.use}</div>
      <p className={s.floorSummary}>{floor.summary}</p>
      <dl className={s.floorList}>
        {floor.highlights.map((h) => (
          <div key={h.label}>
            <dt>{h.label}</dt>
            <dd>{h.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Pisos() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const onProgress = useCallback((p: number) => {
    const i = p < SEGMENTS[1][0] ? 0 : p < SEGMENTS[2][0] ? 1 : 2;
    setActive((prev) => (prev === i ? prev : i));
  }, []);
  usePinProgress(ref, onProgress);

  const scrollToFloor = useCallback((i: number) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(max-width: 900px)').matches) {
      document.getElementById(`piso-${FLOORS[i].id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    const [a, b] = SEGMENTS[i];
    window.scrollTo({ top: top + range * (a + (b - a) * 0.3), behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const onFloor = (e: Event) => {
      const id = (e as CustomEvent<FloorId>).detail;
      scrollToFloor(FLOORS.findIndex((f) => f.id === id));
    };
    window.addEventListener(FLOOR_EVENT, onFloor);
    return () => window.removeEventListener(FLOOR_EVENT, onFloor);
  }, [scrollToFloor]);

  return (
    <section ref={ref} id="pisos" className={s.pisos} data-chapter="Tres pisos">
      <div className={s.pisosSticky}>
        <div className={s.pisosHeader}>
          <div className={s.kicker}>01 / Arquitectura · Axonométrica despiezada</div>
          <h2 className={s.pisosTitle}>Tres pisos,<br /><em>un sistema</em></h2>
        </div>

        <div className={s.axoStage} aria-hidden="true">
          <svg className={s.axoGuides} viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="2" y1="10" x2="2" y2="90" />
            <line x1="53" y1="18" x2="53" y2="96" />
            <line x1="98" y1="10" x2="98" y2="90" />
          </svg>
          {FLOORS.map((f, i) => (
            <div
              key={f.id}
              className={`${s.axoFloor} ${i === active ? s.axoFloorOn : ''}`}
              style={{ ['--i' as string]: i - 1, zIndex: 3 - i }}
              onClick={() => scrollToFloor(i)}
            >
              <Image src={f.axo} alt="" width={1100} height={690} sizes="(max-width: 900px) 90vw, 48vw" />
              <span className={s.axoTag}>P{f.id}</span>
            </div>
          ))}
        </div>

        <div className={s.pisosPanel}>
          <FloorPanel floor={FLOORS[active]} />
          <div className={s.floorTabs}>
            {FLOORS.map((f, i) => (
              <button
                key={f.id}
                type="button"
                className={`${s.floorTab} ${i === active ? s.floorTabOn : ''}`}
                onClick={() => scrollToFloor(i)}
              >
                <span>{f.id}</span>
                {f.use}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: los tres pisos apilados, sin scroll fijo */}
      <div className={s.pisosMobile}>
        {FLOORS.map((f) => (
          <div key={f.id} id={`piso-${f.id}`} className={`${s.pisosMobileItem} reveal`}>
            <Image src={f.axo} alt={`Axonometría del piso ${f.id}`} width={1100} height={690} sizes="92vw" />
            <FloorPanel floor={f} />
          </div>
        ))}
      </div>
    </section>
  );
}
