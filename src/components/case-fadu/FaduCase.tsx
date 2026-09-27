'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import s from './FaduCase.module.css';
import { SiteNav } from '@/components/site-nav/SiteNav';
import { Lightbox, type LightboxItem } from '@/components/portfolio/shared/Lightbox';
import { Footer } from '@/components/footer/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { bauhausWeimar, casaAngel } from '@/components/portfolio/data/cases';
import { YEARS, HERO, LEDE, PORTFOLIO_LINE, isLineDrawing, isSheet, hasMatte, type Year, type Slot } from './content';

const pad = (n: number) => String(n).padStart(2, '0');
const clamp = (v: number) => Math.min(1, Math.max(0, v));

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.2" />
    <polyline points="8,2 13,7 8,12" stroke="currentColor" strokeWidth="1.2" fill="none" />
  </svg>
);

const chapterLabel = (y: Year) => `${y.year} · ${y.materia}`;

function scrollToYear(key: string) {
  const el = document.getElementById(`anio-${key}`);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

/* ─── Regla de años ──────────────────────────────────────── */

function Ruler({ active, fillRef }: { active: number; fillRef: React.RefObject<HTMLDivElement | null> }) {
  const minor = Array.from({ length: 51 }, (_, i) => i);
  return (
    <nav className={s.ruler} aria-label="Años">
      <ol className={s.rulerYears}>
        {YEARS.map((y, i) => (
          <li key={y.key}>
            <button
              type="button"
              className={s.rulerYear}
              data-state={i === active ? 'on' : i < active ? 'past' : undefined}
              aria-current={i === active ? 'step' : undefined}
              onClick={() => scrollToYear(y.key)}
            >
              <span className={s.rulerNum}>{y.year}</span>
              <span className={s.rulerMat}>{y.materia}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className={s.rulerScale} aria-hidden="true">
        <svg className={s.rulerTicks} viewBox="0 0 500 10" preserveAspectRatio="none">
          {minor.map((i) => (
            <line
              key={i}
              x1={i * 10}
              x2={i * 10}
              y1={i % 10 === 5 ? 0 : 6}
              y2={10}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        <div ref={fillRef} className={s.rulerFill} />
      </div>
    </nav>
  );
}

/* ─── Figura ─────────────────────────────────────────────── */

function Figure({
  y,
  slot,
  onOpen,
}: {
  y: Year;
  slot: Extract<Slot, { type: 'img' }>;
  onOpen: (i: number) => void;
}) {
  const img = y.images[slot.i];
  const draw = isLineDrawing(img);
  const sheet = isSheet(img);
  const span = slot.col[1] - slot.col[0];
  const sizes = slot.bleed
    ? '100vw'
    : `(max-width: 768px) calc(100vw - 40px), (max-width: 1024px) ${Math.round(((slot.colMd ?? slot.col)[1] - (slot.colMd ?? slot.col)[0]) / 12 * 100)}vw, ${Math.round((span / 12) * 100)}vw`;
  const style = {
    '--c1': slot.col[0],
    '--c2': slot.col[1],
    '--m1': (slot.colMd ?? slot.col)[0],
    '--m2': (slot.colMd ?? slot.col)[1],
    '--shift': `${slot.shift ?? 0}px`,
    '--natural': `${img.w}px`,
    alignSelf: slot.align ?? 'start',
  } as CSSProperties;

  return (
    <figure
      className={`${s.fig} ${slot.bleed ? s.bleed : ''}`}
      style={style}
      data-sheet={sheet || undefined}
      data-matte={hasMatte(img) || undefined}
    >
      <button
        type="button"
        className={s.frame}
        onClick={() => onOpen(slot.i)}
        aria-label={`Ampliar: ${img.alt}`}
      >
        <span className={s.media} data-draw={draw || undefined} style={{ aspectRatio: `${img.w} / ${img.h}` }}>
          <Image
            src={img.src}
            alt={img.alt}
            width={img.w}
            height={img.h}
            sizes={sizes}
            loading="lazy"
            className={s.img}
          />
          {draw && <span className={s.pen} aria-hidden="true" />}
        </span>
      </button>
      <figcaption className={s.cap}>
        <span className={s.capIdx}>{y.year} / {pad(slot.i + 1)}</span>
        <span>{img.alt}</span>
      </figcaption>
    </figure>
  );
}

/* ─── Capítulo ───────────────────────────────────────────── */

function YearChapter({ y, index, onOpen }: { y: Year; index: number; onOpen: (i: number) => void }) {
  return (
    <section
      id={`anio-${y.key}`}
      className={`${s.chapter} ${y.tone === 'paper' ? s.paper : s.cream}`}
      data-chapter={chapterLabel(y)}
      data-year-index={index}
      aria-labelledby={`t-${y.key}`}
    >
      <header className={s.head} data-head>
        <div className={s.yearWrap} aria-hidden="true">
          <span className={s.year}>
            {y.year.split('').map((d, i) => (
              <span key={i} className={s.digitMask}>
                <span className={s.digit} style={{ transitionDelay: `${i * 70}ms` }}>{d}</span>
              </span>
            ))}
          </span>
        </div>
        <div className={s.headCopy}>
          <div className="sec-label reveal">{y.materia}</div>
          <h2 id={`t-${y.key}`} className={`sec-title ${s.headTitle} reveal rd1`}>
            <span className={s.srOnly}>{y.year}. </span>
            {y.name[0]}
            <br />
            <em>{y.name[1]}</em>
          </h2>
          <dl className={`${s.meta} reveal rd2`}>
            <div>
              <dt>Año</dt>
              <dd>{y.year}</dd>
            </div>
            {y.meta.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className={s.grid}>
        {y.layout.map((slot, k) =>
          slot.type === 'img' ? (
            <Figure key={k} y={y} slot={slot} onOpen={onOpen} />
          ) : y.quote ? (
            <blockquote
              key={k}
              className={`${s.quote} reveal`}
              style={{
                '--c1': slot.col[0],
                '--c2': slot.col[1],
                '--m1': (slot.colMd ?? slot.col)[0],
                '--m2': (slot.colMd ?? slot.col)[1],
                alignSelf: slot.align ?? 'start',
              } as CSSProperties}
            >
              <span className={s.quoteLabel}>Texto de la lámina</span>
              <p>{y.quote}</p>
            </blockquote>
          ) : null
        )}
      </div>
    </section>
  );
}

/* ─── Página ─────────────────────────────────────────────── */

export function FaduCase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  const [lb, setLb] = useState<{ y: number; i: number } | null>(null);

  // Progreso de la regla, año activo y trazado de los dibujos.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.dataset.ready = '';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const chapters = Array.from(root.querySelectorAll<HTMLElement>('[data-year-index]'));
    const drawings = reduce ? [] : Array.from(root.querySelectorAll<HTMLElement>('[data-draw]'));
    let last = -2;
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const probe = vh * 0.5;
      let idx = -1;
      let t = 0;
      chapters.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        if (r.top <= probe) {
          idx = i;
          t = clamp((probe - r.top) / r.height);
        }
      });
      const fill = idx < 0 ? 0 : (idx + t) / chapters.length;
      fillRef.current?.style.setProperty('transform', `scaleX(${fill.toFixed(4)})`);
      if (idx !== last) {
        last = idx;
        setActive(idx);
      }
      drawings.forEach((d) => {
        const r = d.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const q = clamp((vh * 0.95 - r.top) / (vh * 0.6));
        d.style.setProperty('--q', q.toFixed(4));
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    // Entrada del año: los dígitos suben desde una máscara.
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.in = '';
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.35 }
    );
    root.querySelectorAll('[data-head]').forEach((h) => io.observe(h));

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const lbItems: LightboxItem[] = lb
    ? YEARS[lb.y].images.map((img) => ({
        src: img.src,
        w: img.w,
        h: img.h,
        alt: img.alt,
        caption: `${YEARS[lb.y].year} · ${YEARS[lb.y].short} — ${img.alt}`,
      }))
    : [];

  const onLbChange = useCallback((i: number | null) => setLb((cur) => (cur && i !== null ? { y: cur.y, i } : null)), []);
  const last = YEARS[YEARS.length - 1];

  return (
    <>
      <SiteNav initialContext="FADU – UBA" />
      <main ref={rootRef} className={s.page}>
        {/* ─── Hero ─── */}
        <section className={s.hero} data-chapter="FADU – UBA">
          <div className={s.heroTop}>
            <div className={s.heroCopy}>
              <div className={`sec-label ${s.heroLabel}`}>Buenos Aires · 2020–2024</div>
              <h1 className={s.heroTitle}>
                FADU – UBA
                <br />
                <em>Formación</em>
              </h1>
            </div>
            <div className={s.heroSide}>
              <dl className={s.ficha}>
                <div>
                  <dt>Facultad</dt>
                  <dd>Facultad de Arquitectura, Diseño y Urbanismo</dd>
                </div>
                <div>
                  <dt>Universidad</dt>
                  <dd>Universidad de Buenos Aires</dd>
                </div>
                <div>
                  <dt>Período</dt>
                  <dd>2020–2024</dd>
                </div>
              </dl>
              <p className={s.heroLede}>{LEDE}</p>
            </div>
          </div>
          <figure className={s.heroFig}>
            <div className={s.heroMedia}>
              <Image
                src={HERO.src}
                alt={`${last.short}: ${last.images[0].alt.toLowerCase()}`}
                width={HERO.w}
                height={HERO.h}
                sizes="(max-width: 768px) calc(100vw - 40px), calc(100vw - 80px)"
                priority
                className={s.heroImg}
              />
            </div>
            <figcaption className={s.cap}>
              <span className={s.capIdx}>2024 / 01</span>
              <span>{last.short} — {last.images[0].alt}</span>
            </figcaption>
          </figure>
          <p className={`${s.portfolioLine} reveal`}>{PORTFOLIO_LINE}</p>
        </section>

        {/* ─── Cinco años ─── */}
        <div className={s.timeline}>
          <Ruler active={active} fillRef={fillRef} />
          {YEARS.map((y, i) => (
            <YearChapter key={y.key} y={y} index={i} onOpen={(k) => setLb({ y: i, i: k })} />
          ))}
        </div>

        {/* ─── Cierre: evolución ─── */}
        <section className={s.evolution} data-chapter="2020 → 2024">
          <div className={s.evoHead}>
            <div className="sec-label reveal">2020 → 2024</div>
            <h2 className="sec-title reveal rd1">
              Cinco años,
              <br />
              <em>cinco proyectos.</em>
            </h2>
          </div>
          <ol className={s.strip}>
            {YEARS.map((y, i) => {
              const img = y.images[y.thumb];
              return (
                <li key={y.key} className={`reveal ${i ? `rd${Math.min(4, i)}` : ''}`}>
                  <button type="button" className={s.stripItem} onClick={() => scrollToYear(y.key)}>
                    <span className={s.stripYear}>{y.year}</span>
                    <span className={s.stripMedia} data-sheet={isSheet(img) || undefined} data-matte={hasMatte(img) || undefined}>
                      <Image
                        src={img.src}
                        alt={`${y.short}: ${img.alt}`}
                        width={img.w}
                        height={img.h}
                        sizes="(max-width: 768px) 72vw, 20vw"
                        loading="lazy"
                        className={s.stripImg}
                      />
                    </span>
                    <span className={s.stripMat}>{y.materia}</span>
                    <span className={s.stripName}>{y.short}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </section>

        {/* ─── Seguir ─── */}
        <section className={s.more} data-chapter="Otros proyectos">
          <div className="sec-label reveal">Seguir recorriendo</div>
          <div className={s.moreGrid}>
            {[bauhausWeimar, casaAngel].map((c, i) => (
              <Link key={c.slug} href={`/proyectos/${c.slug}`} className={`${s.card} reveal rd${i + 1}`}>
                <span className={s.cardMedia}>
                  <Image
                    src={c.cover.src}
                    alt={c.title}
                    width={c.cover.w}
                    height={c.cover.h}
                    sizes="(max-width: 768px) calc(100vw - 40px), 50vw"
                    loading="lazy"
                    className={s.cardImg}
                  />
                </span>
                <span className={s.cardMeta}>
                  <span>{c.tag}</span>
                  <span>{c.years}</span>
                </span>
                <span className={s.cardTitle}>
                  {c.title}
                  <Arrow />
                </span>
                <span className={s.cardLoc}>{c.location}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className={s.cta}>
          <div>
            <div className="sec-label reveal">Tu proyecto</div>
            <h2 className="sec-title reveal rd1">
              ¿Hablamos
              <br />
              <em>del tuyo?</em>
            </h2>
          </div>
          <div className={`${s.ctaActions} reveal rd2`}>
            <Link href="/#contacto" className="btn-primary">
              Iniciar un proyecto
              <Arrow />
            </Link>
            <Link href="/proyectos" className="btn-ghost">Ver todos los proyectos</Link>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollReveal />
      <Lightbox items={lbItems} index={lb ? lb.i : null} onChange={onLbChange} />
    </>
  );
}
