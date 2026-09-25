'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import s from '../UrbetrackCase.module.css';
import { FLOORS } from '../data';
import { useInView } from '../hooks';

const WITH_DEMOLITION = FLOORS.filter((f) => f.demolition);

export function Demolicion() {
  const [floorIdx, setFloorIdx] = useState(0);
  const [x, setX] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const seen = useInView(viewerRef, 0.4, true);
  const floor = WITH_DEMOLITION[floorIdx];

  // Barrido de presentación la primera vez que se ve el comparador.
  useEffect(() => {
    if (!seen || touched) return;
    let raf = 0;
    const start = performance.now();
    const keys = [50, 82, 18, 50];
    const step = (t: number) => {
      const k = Math.min(1, (t - start) / 2600);
      const seg = Math.min(2, Math.floor(k * 3));
      const local = k * 3 - seg;
      const ease = local < 0.5 ? 2 * local * local : 1 - Math.pow(-2 * local + 2, 2) / 2;
      setX(keys[seg] + (keys[seg + 1] - keys[seg]) * ease);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, touched]);

  const setFromEvent = useCallback((clientX: number) => {
    const r = viewerRef.current?.getBoundingClientRect();
    if (!r) return;
    setX(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <section className={s.split} data-chapter="Demolición">
      <div className={s.splitText}>
        <div className={`${s.kicker} reveal`}>00 / Demolición · Escenario existente</div>
        <h2 className={`${s.splitTitle} reveal rd1`}>
          Lo que había,<br /><em>lo que quedó</em>
        </h2>
        <p className={`${s.splitLead} reveal rd2`}>
          La nueva organización se ajustó a las condiciones existentes: se liberaron las plantas
          compartimentadas y se conservaron estructura, núcleo y servicios. Arrastrá para comparar.
        </p>
        <div className={`${s.tabs} reveal rd2`}>
          {WITH_DEMOLITION.map((f, i) => (
            <button
              key={f.id}
              type="button"
              className={`${s.tab} ${i === floorIdx ? s.tabOn : ''}`}
              onClick={() => setFloorIdx(i)}
            >
              Piso {f.id}
            </button>
          ))}
        </div>
        <ul className={`${s.legend} reveal rd3`}>
          <li><span className={s.legendRed} />Muros a demoler</li>
          <li><span className={s.legendViolet} />Estructura y núcleo existentes</li>
        </ul>
      </div>

      <div
        ref={viewerRef}
        className={`${s.compare} ${dragging ? s.compareDragging : ''}`}
        style={{ ['--x' as string]: `${x}%` }}
        onPointerDown={(e) => {
          setTouched(true);
          setDragging(true);
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromEvent(e.clientX);
        }}
        onPointerMove={(e) => dragging && setFromEvent(e.clientX)}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        role="slider"
        tabIndex={0}
        aria-label="Comparar planta existente y proyecto"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(x)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') { setTouched(true); setX((v) => Math.max(0, v - 5)); }
          if (e.key === 'ArrowRight') { setTouched(true); setX((v) => Math.min(100, v + 5)); }
        }}
      >
        <Image
          key={`p${floor.id}`}
          src={floor.plan}
          alt={`Planta proyectada del piso ${floor.id}`}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className={s.compareImg}
          draggable={false}
        />
        <div className={s.compareBefore}>
          <Image
            key={`d${floor.id}`}
            src={floor.demolition!}
            alt={`Planta de demolición del piso ${floor.id}`}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className={s.compareImg}
            draggable={false}
          />
        </div>
        <span className={`${s.compareLabel} ${s.compareLabelL}`}>Existente</span>
        <span className={`${s.compareLabel} ${s.compareLabelR}`}>Proyecto</span>
        <div className={s.compareHandle}>
          <span className={s.compareKnob}>
            <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
              <polyline points="6,1 1,6 6,11" stroke="currentColor" strokeWidth="1.4" />
              <polyline points="16,1 21,6 16,11" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
