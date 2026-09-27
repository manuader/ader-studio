'use client';

import { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import s from './Lightbox.module.css';

export type LightboxItem = { src: string; w: number; h: number; alt: string; caption?: string };

type Props = {
  items: LightboxItem[];
  index: number | null;
  onChange: (index: number | null) => void;
};

const pad = (n: number) => String(n).padStart(2, '0');

/** Visor a pantalla completa: flechas, teclado (← → Esc) y swipe. */
export function Lightbox({ items, index, onChange }: Props) {
  const touchX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;

  const go = useCallback(
    (d: number) => {
      if (index === null) return;
      onChange((index + d + items.length) % items.length);
    },
    [index, items.length, onChange]
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      prev?.focus?.();
    };
  }, [open, go, onChange]);

  if (index === null) return null;
  const item = items[index];

  return (
    <div
      className={s.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <button type="button" className={s.backdrop} aria-label="Cerrar" tabIndex={-1} onClick={() => onChange(null)} />
      <figure className={s.figure} key={item.src}>
        <Image
          src={item.src}
          alt={item.alt}
          width={item.w}
          height={item.h}
          sizes="100vw"
          className={s.img}
          style={{ aspectRatio: `${item.w} / ${item.h}` }}
          priority
        />
        {(item.caption || item.alt) && <figcaption className={s.caption}>{item.caption ?? item.alt}</figcaption>}
      </figure>
      <div className={s.counter}>{pad(index + 1)} / {pad(items.length)}</div>
      <button ref={closeRef} type="button" className={s.close} onClick={() => onChange(null)} aria-label="Cerrar visor">
        <svg width="18" height="18" viewBox="0 0 18 18"><path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.2" /></svg>
      </button>
      {items.length > 1 && (
        <>
          <button type="button" className={`${s.arrow} ${s.prev}`} onClick={() => go(-1)} aria-label="Anterior">
            <svg width="20" height="20" viewBox="0 0 14 14"><polyline points="9,2 4,7 9,12" stroke="currentColor" strokeWidth="1" fill="none" /></svg>
          </button>
          <button type="button" className={`${s.arrow} ${s.next}`} onClick={() => go(1)} aria-label="Siguiente">
            <svg width="20" height="20" viewBox="0 0 14 14"><polyline points="5,2 10,7 5,12" stroke="currentColor" strokeWidth="1" fill="none" /></svg>
          </button>
        </>
      )}
    </div>
  );
}
