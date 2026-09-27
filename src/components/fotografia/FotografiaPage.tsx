'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { series } from '@/components/portfolio/data/fotografia';
import { Film } from '@/components/portfolio/shared/Film';
import { Lightbox, type LightboxItem } from '@/components/portfolio/shared/Lightbox';
import { compose } from './composition';
import s from './FotografiaPage.module.css';

const pad = (n: number) => String(n).padStart(2, '0');
const TOTAL = series.reduce((n, x) => n + x.photos.length, 0);

/** Cada serie con su composición y el índice global de cada foto. */
const CHAPTERS = (() => {
  let start = 0;
  return series.map((x, i) => {
    const rows = compose(x, start);
    start += x.photos.length;
    return { ...x, n: i + 1, rows };
  });
})();

const ITEMS: LightboxItem[] = series.flatMap((x) =>
  x.photos.map((p) => ({ src: p.src, w: p.w, h: p.h, alt: p.alt, caption: `${x.title}. ${p.alt}` }))
);

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.2" />
    <polyline points="8,2 13,7 8,12" stroke="currentColor" strokeWidth="1.2" fill="none" />
  </svg>
);

function HeroFilm() {
  return <Film name="mirada" label="Film de fotografía de arquitectura de Ader Studio" className={s.film} />;
}

export function FotografiaPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [active, setActive] = useState<string>('');

  // Reveal por máscara de cada foto y del nombre de cada serie.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.dataset.js = '';
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          (e.target as HTMLElement).dataset.in = '';
          io.unobserve(e.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.01 }
    );
    root.querySelectorAll('[data-mask]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Serie activa en el índice.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive((e.target as HTMLElement).id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    rootRef.current?.querySelectorAll('[data-series]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Mantiene visible el ítem activo del índice (scroll horizontal del índice, no de la página).
  useEffect(() => {
    const strip = stripRef.current;
    const el = strip?.querySelector<HTMLElement>(`[data-key="${active}"]`);
    if (!strip || !el) return;
    const target = el.offsetLeft - strip.clientWidth / 2 + el.offsetWidth / 2;
    strip.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [active]);

  const counts = useMemo(() => CHAPTERS.map((c) => c.photos.length), []);

  return (
    <div ref={rootRef} className={s.root}>
      <header className={s.hero} data-chapter="Fotografía">
        <div className={s.heroHead}>
          <div className="sec-label reveal">Fotografía de arquitectura</div>
          <h1 className={s.heroTitle}>
            <span className={s.line}><span className={s.lineIn}>Fotografía</span></span>
            <span className={s.line}><em className={`${s.lineIn} ${s.d1}`}>mirada arquitectónica.</em></span>
          </h1>
        </div>
        <div className={`${s.heroAside} reveal rd2`}>
          <p className={s.heroText}>
            {TOTAL} fotografías de arquitectura en {series.length} series, una por país. Cada imagen se muestra
            con su encuadre completo y su color original.
          </p>
          <p className={s.heroHint}>Seleccioná una foto para verla en pantalla completa.</p>
        </div>
        <div className={`${s.heroFilm} reveal rd3`}>
          <HeroFilm />
        </div>
      </header>

      {/* El índice queda fijo solo mientras se recorren las series. */}
      <div className={s.body}>
      <nav className={s.index} aria-label="Series">
        <span className={s.indexLabel}>Series</span>
        <ul ref={stripRef} className={s.indexList}>
          {CHAPTERS.map((c, i) => (
            <li key={c.key}>
              <a
                href={`#${c.key}`}
                data-key={c.key}
                className={s.indexLink}
                aria-current={active === c.key ? 'location' : undefined}
              >
                <span className={s.indexNum}>{pad(c.n)}</span>
                {c.title}
                <sup className={s.indexCount}>{counts[i]}</sup>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {CHAPTERS.map((c, ci) => (
        <section
          key={c.key}
          id={c.key}
          data-series
          data-chapter={c.title}
          className={s.series}
          data-side={ci % 2 ? 'right' : 'left'}
          aria-labelledby={`${c.key}-title`}
        >
          <header className={s.seriesHead}>
            <span className={s.seriesNum}>{pad(c.n)}</span>
            <h2 id={`${c.key}-title`} className={s.seriesTitle} data-mask>
              <span className={s.seriesTitleIn}>{c.title}</span>
            </h2>
            <span className={s.seriesCount}>
              {c.photos.length} {c.photos.length === 1 ? 'fotografía' : 'fotografías'}
            </span>
          </header>

          <div className={s.rows}>
            {c.rows.map((row, ri) => (
              <div key={ri} className={s.row}>
                {row.map((p) => (
                  <figure
                    key={p.src}
                    data-mask
                    className={s.photo}
                    style={{
                      ['--c' as string]: p.d[0],
                      ['--s' as string]: p.d[1],
                      ['--o' as string]: `${p.d[2]}vw`,
                      ['--mc' as string]: p.m[0],
                      ['--ms' as string]: p.m[1],
                      ['--mo' as string]: `${p.m[2]}vw`,
                    }}
                  >
                    <button
                      type="button"
                      className={s.open}
                      onClick={() => setOpen(p.index)}
                      aria-label={`Ver en pantalla completa: ${p.alt}`}
                    >
                      <span className={s.frame} style={{ aspectRatio: `${p.w} / ${p.h}` }}>
                        <Image
                          src={p.src}
                          alt={p.alt}
                          width={p.w}
                          height={p.h}
                          className={s.img}
                          sizes={`(max-width: 768px) ${Math.round((p.m[1] / 6) * 100)}vw, ${Math.round((p.d[1] / 12) * 100)}vw`}
                          loading="lazy"
                        />
                      </span>
                    </button>
                    <figcaption className={s.caption}>
                      <span className={s.captionNum}>{pad(p.n)}</span>
                      <span>{p.alt}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </section>
      ))}
      </div>

      <section className={s.cta} data-chapter="Contacto">
        <div>
          <div className="sec-label reveal">Nuevos proyectos</div>
          <h2 className="sec-title reveal rd1">Construyamos<br /><em>algo juntos.</em></h2>
        </div>
        <div className={`${s.ctaActions} reveal rd2`}>
          <Link href="/#contacto" className="btn-primary">
            Contacto
            <Arrow />
          </Link>
          <Link href="/proyectos" className="btn-ghost">Ver proyectos</Link>
        </div>
      </section>

      <Lightbox items={ITEMS} index={open} onChange={setOpen} />
    </div>
  );
}
