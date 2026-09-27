'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import s from './BauhausCase.module.css';
import { FIGS, type FigKey } from './data';
import { useViewer } from './hooks';

const LENS = 260;

type Lens = { x: number; y: number; zoom: number; bw: number; bh: number };

/**
 * Póster con lupa: al pasar el cursor, un visor cuadrado muestra la lámina
 * a su resolución real (patrón `Cortes` de case-urbetrack, en clave Ader).
 */
export function Loupe({ k, sizes, caption }: { k: FigKey; sizes: string; caption?: React.ReactNode }) {
  const f = FIGS[k];
  const open = useViewer();
  const boxRef = useRef<HTMLButtonElement>(null);
  const [lens, setLens] = useState<Lens | null>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const r = boxRef.current!.getBoundingClientRect();
    const zoom = Math.max(1.8, f.w / r.width);
    setLens({ x: e.clientX - r.left, y: e.clientY - r.top, zoom, bw: r.width * zoom, bh: r.height * zoom });
  };

  return (
    <figure className={s.loupe}>
      <div className={s.loupeFrame}>
        <button
          ref={boxRef}
          type="button"
          className={s.loupeBox}
          style={{ aspectRatio: `${f.w} / ${f.h}` }}
          onPointerMove={onMove}
          onPointerLeave={() => setLens(null)}
          onClick={() => open(k)}
          aria-label={`Ver ${f.fig} completa: ${f.alt}`}
        >
          <Image src={f.src} alt={f.alt} fill sizes={sizes} loading="lazy" className={s.loupeImg} />
          {lens && (
            <span
              className={s.lens}
              aria-hidden="true"
              style={{
                width: LENS,
                height: LENS,
                transform: `translate3d(${lens.x - LENS / 2}px, ${lens.y - LENS / 2}px, 0)`,
                backgroundImage: `url("${f.src}")`,
                backgroundSize: `${lens.bw}px ${lens.bh}px`,
                backgroundPosition: `${-(lens.x * lens.zoom - LENS / 2)}px ${-(lens.y * lens.zoom - LENS / 2)}px`,
              }}
            >
              <span className={s.lensTag}>×{lens.zoom.toFixed(1)}</span>
            </span>
          )}
        </button>
      </div>
      <figcaption className={s.cap}>
        <span className={s.capNum}>{f.fig}</span>
        <span>{caption ?? f.alt}</span>
      </figcaption>
      <p className={s.loupeHint}>
        <span className={s.hintMouse}>Pasá el cursor para leer la lámina · clic para verla completa</span>
        <span className={s.hintTouch}>Tocá la lámina para verla completa</span>
      </p>
    </figure>
  );
}
