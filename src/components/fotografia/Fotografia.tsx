'use client';

import { Fragment, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { homeSequence, series } from '@/components/portfolio/data/fotografia';
import styles from './Fotografia.module.css';

/**
 * Composición de la galería fijada: alto, desfase vertical y separación de cada
 * retrato (en vh), en el orden de `homeSequence`. Los interludios se insertan
 * después del índice indicado.
 */
const LAYOUT = [
  { vh: 66, top: 15, gap: 0 },
  { vh: 50, top: 35, gap: 7 },
  { vh: 74, top: 9, gap: 6 },
  { vh: 56, top: 27, gap: 8 },
  { vh: 70, top: 12, gap: 5 },
  { vh: 48, top: 39, gap: 7 },
  { vh: 72, top: 13, gap: 9 },
  { vh: 58, top: 22, gap: 6 },
  { vh: 64, top: 19, gap: 8 },
  { vh: 52, top: 33, gap: 6 },
  { vh: 74, top: 9, gap: 7 },
  { vh: 54, top: 25, gap: 6 },
  { vh: 62, top: 17, gap: 8 },
];
const COUNT_AFTER = 2;
const INDEX_AFTER = 7;

const TOTAL_PHOTOS = series.reduce((n, s) => n + s.photos.length, 0);
const pad = (n: number) => String(n).padStart(2, '0');

const PHOTOS = homeSequence.map((p, i) => ({ ...p, ...LAYOUT[i], n: i + 1 }));

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1" />
    <polyline points="8,2 13,7 8,12" stroke="currentColor" strokeWidth="1" fill="none" />
  </svg>
);

export function Fotografia() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const nowRef = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!section || !pin || !track) return;

    let cancelled = false;
    let mm: { revert: () => void } | null = null;
    let onLoad: (() => void) | null = null;

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const media = gsap.matchMedia();
      mm = media;
      media.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
        const frames = Array.from(track.querySelectorAll<HTMLElement>('[data-frame]'));
        const indexItems = Array.from(indexRef.current?.querySelectorAll<HTMLElement>('li') ?? []);
        let boxes: { left: number; width: number }[] = [];
        let current = -1;

        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const measure = () => {
          boxes = frames.map((f) => ({ left: f.offsetLeft, width: f.offsetWidth }));
        };

        // Máscara por retrato (entra desde la derecha) + serie activa en el pie.
        const paint = () => {
          const x = Number(gsap.getProperty(track, 'x')) || 0;
          const vw = window.innerWidth;
          const mid = vw * 0.5;
          let nearest = 0;
          let best = Infinity;
          boxes.forEach((b, i) => {
            const left = b.left + x;
            const t = Math.min(1, Math.max(0, (vw - left) / (vw * 0.32)));
            frames[i].style.clipPath = `inset(0 0 0 ${((1 - t) * 100).toFixed(2)}%)`;
            const d = Math.abs(left + b.width / 2 - mid);
            if (d < best) { best = d; nearest = i; }
          });
          if (nearest !== current) {
            current = nearest;
            const photo = PHOTOS[nearest];
            if (nowRef.current) nowRef.current.textContent = photo.series;
            if (numRef.current) numRef.current.textContent = pad(photo.n);
            indexItems.forEach((li) => li.toggleAttribute('data-active', li.dataset.series === photo.series));
          }
        };

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            pin,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: () => { measure(); paint(); },
            onUpdate: (self) => {
              barRef.current?.style.setProperty('transform', `scaleX(${self.progress})`);
            },
          },
          onUpdate: paint,
        });

        measure();
        paint();

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(track, { clearProps: 'transform' });
          frames.forEach((f) => { f.style.clipPath = ''; });
          indexItems.forEach((li) => li.removeAttribute('data-active'));
        };
      });

      // La galería de renders (arriba) también fija su bloque: recalcular ambos
      // con el layout definitivo, en orden de documento.
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      onLoad = () => ScrollTrigger.refresh();
      if (document.readyState !== 'complete') window.addEventListener('load', onLoad, { once: true });
    })();

    return () => {
      cancelled = true;
      if (onLoad) window.removeEventListener('load', onLoad);
      mm?.revert();
    };
  }, []);

  const figure = (p: (typeof PHOTOS)[number]) => (
    <figure
      data-frame
      className={styles.item}
      style={{
        ['--h' as string]: `${p.vh}vh`,
        ['--w' as string]: `${((p.vh * p.w) / p.h).toFixed(2)}vh`,
        ['--top' as string]: `${p.top}vh`,
        ['--gap' as string]: `${p.gap}vh`,
        ['--ar' as string]: `${p.w} / ${p.h}`,
      }}
    >
      <div className={styles.frame}>
        <Image
          src={p.src}
          alt={p.alt}
          width={p.w}
          height={p.h}
          className={styles.img}
          sizes={`(max-width: 768px) 78vw, ${Math.round((p.vh * p.w) / p.h)}vh`}
          loading="lazy"
        />
      </div>
      <figcaption className={styles.caption}>
        <span className={styles.captionNum}>{pad(p.n)}</span>
        <span className={styles.captionSeries}>{p.series}</span>
      </figcaption>
    </figure>
  );

  return (
    <section id="fotografia" ref={sectionRef} className={styles.section}>
      <div ref={pinRef} className={styles.pin}>
        <header className={styles.staticHead}>
          <div className="sec-label reveal">Fotografía</div>
          <h2 className="sec-title reveal rd1">
            Fotografía<br /><em>mirada arquitectónica.</em>
          </h2>
          <p className={`${styles.introSub} reveal rd2`}>
            {TOTAL_PHOTOS} fotografías de arquitectura en {series.length} series, una por país.
          </p>
        </header>

        <div ref={trackRef} className={styles.track}>
          <header className={styles.intro}>
            <div className="sec-label">Fotografía</div>
            <h2 className="sec-title">
              Fotografía<br /><em>mirada arquitectónica.</em>
            </h2>
            <p className={styles.introSub}>
              {TOTAL_PHOTOS} fotografías de arquitectura en {series.length} series, una por país.
            </p>
          </header>

          {PHOTOS.map((p, i) => (
            <Fragment key={p.src}>
              {figure(p)}
              {i === COUNT_AFTER && (
                <div className={`${styles.interlude} ${styles.count}`} aria-hidden="true">
                  <span className={styles.countNum}>{series.length}</span>
                  <span className={styles.countLabel}>países</span>
                  <span className={styles.countSub}>{TOTAL_PHOTOS} fotografías</span>
                </div>
              )}
              {i === INDEX_AFTER && (
                <div className={`${styles.interlude} ${styles.index}`}>
                  <div className={styles.indexLabel}>Series</div>
                  <ol ref={indexRef} className={styles.indexList}>
                    {series.map((s) => (
                      <li key={s.key} data-series={s.title}>
                        <span>{s.title}</span>
                        <span className={styles.indexCount}>{pad(s.photos.length)}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </Fragment>
          ))}

          <div className={styles.outro}>
            <p className={styles.outroText}>
              Las {series.length} series<br /><em>completas.</em>
            </p>
            <Link href="/fotografia" className="btn-ghost">
              Ver fotografía
              <Arrow />
            </Link>
          </div>
        </div>

        <div className={styles.staticFoot}>
          <Link href="/fotografia" className="btn-ghost">
            Ver fotografía
            <Arrow />
          </Link>
        </div>

        <div className={styles.hud} aria-hidden="true">
          <span className={styles.hudSeries}>
            <span className={styles.hudLabel}>Serie</span>
            <span ref={nowRef} className={styles.hudNow}>{PHOTOS[0].series}</span>
          </span>
          <span className={styles.hudCount}>
            <span ref={numRef}>{pad(1)}</span> / {pad(PHOTOS.length)}
          </span>
          <div className={styles.hudLine}><div ref={barRef} className={styles.hudBar} /></div>
        </div>
      </div>
    </section>
  );
}
