'use client';

import { useEffect, useRef, useState } from 'react';
import s from '../UrbetrackCase.module.css';
import { FLOORS, type FloorId } from '../data';

export const FLOOR_EVENT = 'urbe-floor';

export function goToFloor(id: FloorId) {
  window.dispatchEvent(new CustomEvent(FLOOR_EVENT, { detail: id }));
}

/** Isotipo de Urbetrack: la U con el pin de localización. */
export function UrbeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      <circle cx="200" cy="200" r="200" className={s.markCircle} />
      <path d="M122 68 V206 A78 78 0 0 0 278 206 V68" className={s.markU} />
      <g className={s.markPin}>
        <path d="M200 252 C178 214 162 192 162 164 A38 38 0 1 1 238 164 C238 192 222 214 200 252 Z" />
        <circle cx="200" cy="162" r="12" />
      </g>
    </svg>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const order: FloorId[] = [11, 12, 13];

  // Resalta 11 → 12 → 13 en loop, como la tapa de la carpeta.
  useEffect(() => {
    if (hovered !== null) return;
    const id = setInterval(() => setActive((a) => (a + 1) % 3), 1600);
    return () => clearInterval(id);
  }, [hovered]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      el.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    };
    el.addEventListener('pointermove', onMove);
    return () => el.removeEventListener('pointermove', onMove);
  }, []);

  const current = hovered ?? active;

  return (
    <section ref={ref} className={s.hero} data-chapter="Oficinas Urbetrack">
      <div className={s.heroMark}>
        <UrbeMark className={s.heroMarkSvg} />
      </div>

      <div className={s.heroCopy}>
        <div className={s.kicker}>Studio Ader / Caso de estudio</div>
        <p className={s.heroPre}>Oficinas Urbetrack</p>
        <h1 className={s.heroTitle}>
          Reforma y<br /><span>ampliación</span>
        </h1>
        <p className={s.heroAddr}>Av. Rivadavia 4260 · Almagro, CABA</p>
        <p className={s.heroLead}>
          Tres pisos de oficinas reorganizados bajo una misma identidad: criterios comunes de
          distribución, materialidad y equipamiento.
        </p>
      </div>

      <div className={s.heroFloors} onMouseLeave={() => setHovered(null)}>
        {order.map((id, i) => {
          const floor = FLOORS.find((f) => f.id === id)!;
          return (
            <button
              key={id}
              type="button"
              className={`${s.heroFloor} ${current === i ? s.heroFloorOn : ''}`}
              onMouseEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              onClick={() => goToFloor(id)}
              aria-label={`Piso ${id}: ${floor.use}`}
            >
              <span className={s.heroFloorNum}>{id}</span>
              <span className={s.heroFloorUse}>{floor.use}</span>
            </button>
          );
        })}
      </div>

      <div className={s.heroScroll}>
        <span>Recorrer la obra</span>
        <div className={s.heroScrollLine} />
      </div>
    </section>
  );
}
