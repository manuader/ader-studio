'use client';

import Image from 'next/image';
import s from './BauhausCase.module.css';
import { FIGS, type FigKey } from './data';
import { useViewer } from './hooks';

type Props = {
  k: FigKey;
  sizes: string;
  className?: string;
  /** Pie alternativo; por defecto, el alt de la imagen. */
  caption?: React.ReactNode;
};

/** Lámina presentada como documento: marco fino, fondo blanco, pie numerado. */
export function Doc({ k, sizes, className = '', caption }: Props) {
  const f = FIGS[k];
  const open = useViewer();
  return (
    <figure className={`${s.doc} ${className}`}>
      <button
        type="button"
        className={s.docFrame}
        onClick={() => open(k)}
        aria-label={`Ampliar ${f.fig}: ${f.alt}`}
      >
        <Image
          src={f.src}
          alt={f.alt}
          width={f.w}
          height={f.h}
          sizes={sizes}
          loading="lazy"
          className={s.docImg}
        />
        <span className={s.docZoom} aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M1 4.5V1h3.5M11 7.5V11H7.5M7.5 1H11v3.5M4.5 11H1V7.5" stroke="currentColor" fill="none" strokeWidth="1.1" /></svg>
          Ampliar
        </span>
      </button>
      <figcaption className={s.cap}>
        <span className={s.capNum}>{f.fig}</span>
        <span>{caption ?? f.alt}</span>
      </figcaption>
    </figure>
  );
}
