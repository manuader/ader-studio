'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Lightbox } from '@/components/portfolio/shared/Lightbox';
import { ChapterHead } from '../ChapterHead';
import { E4, RENDERS, TRIM_BOTTOM } from '../data';
import { pad } from '../hooks';
import s from '../CasaAngel.module.css';

/**
 * Etapa 4: galería cinematográfica horizontal.
 * En ≥1024 px se fija al scroll y avanza en horizontal; en pantallas chicas es un carrusel nativo con snap.
 */
export function Etapa4() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [lb, setLb] = useState<number | null>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;
    const mq = window.matchMedia('(min-width: 1024px)');
    let distance = 0;
    let raf = 0;

    const measure = () => {
      if (!mq.matches) {
        pin.style.height = '';
        track.style.transform = '';
        distance = 0;
        return;
      }
      distance = Math.max(0, track.scrollWidth - window.innerWidth);
      pin.style.height = `${distance + window.innerHeight}px`;
    };

    const update = () => {
      raf = 0;
      const items = track.children;
      if (mq.matches) {
        const r = pin.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, -r.top / Math.max(1, distance)));
        track.style.transform = `translate3d(${-p * distance}px,0,0)`;
        pin.style.setProperty('--p', p.toFixed(4));
      } else {
        const max = track.scrollWidth - track.clientWidth;
        pin.style.setProperty('--p', (max > 0 ? track.scrollLeft / max : 0).toFixed(4));
      }
      // Imagen activa = la más cercana al centro de la pantalla.
      const mid = window.innerWidth / 2;
      let best = 0;
      let bestD = Infinity;
      for (let i = 0; i < items.length; i++) {
        const b = items[i].getBoundingClientRect();
        const d = Math.abs(b.left + b.width / 2 - mid);
        if (d < bestD) { bestD = d; best = i; }
      }
      setActive(best);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const onResize = () => { measure(); onScroll(); };

    measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    track.addEventListener('scroll', onScroll, { passive: true });
    mq.addEventListener('change', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(track);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      track.removeEventListener('scroll', onScroll);
      mq.removeEventListener('change', onResize);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id={E4.key} className={`${s.chapter} ${s.bgInk}`} data-chapter="Etapa 4 — Representación final">
      <ChapterHead chapter={E4} n={4} tone="dark" />

      <div ref={pinRef} className={s.reel}>
        <div className={s.reelPin}>
          <div ref={trackRef} className={s.reelTrack}>
            {RENDERS.map((r, i) => (
              <figure
                key={r.src}
                className={`${s.reelItem} ${r.h > r.w ? s.reelItemTall : ''}`}
                style={{ ['--ar' as string]: `${r.w} / ${r.h - (TRIM_BOTTOM[r.src] ?? 0)}` }}
              >
                <button type="button" className={s.reelBtn} onClick={() => setLb(i)} aria-label={`Ver en grande: ${r.alt}`}>
                  <Image
                    src={r.src}
                    alt={r.alt}
                    width={r.w}
                    height={r.h}
                    sizes={r.h > r.w ? '(max-width: 1023px) 62vw, 40vh' : '(max-width: 1023px) 86vw, 82vh'}
                    className={s.reelImg}
                    loading="lazy"
                  />
                </button>
                <figcaption className={s.reelCap}>
                  <span>{pad(i + 1)}</span>
                  {r.alt.replace(/^Render( (interior|exterior))?:\s*/, '')}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className={s.reelMeta} aria-hidden="true">
            <span className={s.reelCount}>
              <b>{pad(active + 1)}</b> / {pad(RENDERS.length)}
            </span>
            <span className={s.reelBar}><span /></span>
            <span className={s.reelHint}>Click para ampliar</span>
          </div>
        </div>
      </div>

      <Lightbox items={RENDERS} index={lb} onChange={setLb} />
    </section>
  );
}
