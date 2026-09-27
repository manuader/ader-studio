'use client';

import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { lineCover } from '@/components/proyectos/projects';
import { SiteNav } from '@/components/site-nav/SiteNav';
import { Lightbox, type LightboxItem } from '@/components/portfolio/shared/Lightbox';
import { Footer } from '@/components/footer/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import s from './BauhausCase.module.css';
import { CASE, CHAPTERS, FIGS, FIG_ORDER, MESHES, NEXT, chapterOf, type ChapterId, type FigKey } from './data';
import { ViewerContext, useViewer } from './hooks';
import { Doc } from './Doc';
import { Loupe } from './Loupe';
import { Compare } from './Compare';
import { IterStrip } from './IterStrip';
import { RenderPan } from './RenderPan';

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.2" />
    <polyline points="8,2 13,7 8,12" stroke="currentColor" strokeWidth="1.2" fill="none" />
  </svg>
);

/** Encabezado de capítulo: número, materia (título original en itálica) y texto literal. */
function ChapterHead({ id, paragraphs = 1 }: { id: ChapterId; paragraphs?: number }) {
  const c = chapterOf(id);
  return (
    <div className={s.chHead}>
      <div className={s.chNum} aria-hidden="true">{c.num}</div>
      <div className={s.chTitleCol}>
        <div className="sec-label reveal">Materia {c.num} / 04</div>
        <h2 className={`sec-title ${s.chTitle} reveal rd1`}>
          {c.short}
          <em>{c.ch.title}</em>
        </h2>
      </div>
      <div className={`${s.chText} reveal rd2`}>
        {c.ch.text.slice(0, paragraphs).map((t) => (
          <p key={t.slice(0, 24)}>{t}</p>
        ))}
      </div>
    </div>
  );
}

function ViewLink({ k, children }: { k: FigKey; children: React.ReactNode }) {
  const open = useViewer();
  return (
    <button type="button" className={s.capLink} onClick={() => open(k)}>
      {children}
    </button>
  );
}

export function BauhausCase() {
  const [lb, setLb] = useState<number | null>(null);
  const items: LightboxItem[] = useMemo(
    () =>
      FIG_ORDER.map((k) => {
        const f = FIGS[k];
        return { src: f.src, w: f.w, h: f.h, alt: f.alt, caption: `${f.fig} — ${f.alt}` };
      }),
    []
  );
  const open = useCallback((k: FigKey) => setLb(FIG_ORDER.indexOf(k)), []);

  const plan = chapterOf('planificacion').ch;
  const critica = chapterOf('critica').ch;

  return (
    <ViewerContext.Provider value={open}>
      <SiteNav initialContext={CASE.title} />
      <main className={s.page}>
        {/* ─── HERO ─────────────────────────────── */}
        <header className={s.hero} data-chapter={CASE.title}>
          <div className={s.heroTop}>
            <div>
              <div className={`sec-label ${s.heroLabel}`}>{CASE.tag}</div>
              <h1 className={s.heroTitle}>
                <span className={s.line}><span>Bauhaus-Universität</span></span>
                <span className={s.line}><span>Weimar</span></span>
                <em className={s.line}><span>Tecnología aplicada al diseño.</span></em>
              </h1>
            </div>
            <p className={s.lede}>{CASE.lede}</p>
          </div>

          <dl className={s.ficha}>
            <div><dt>Programa</dt><dd>Intercambio académico</dd></div>
            <div><dt>Lugar</dt><dd>{CASE.location}</dd></div>
            <div><dt>Año</dt><dd>{CASE.years}</dd></div>
            <div><dt>Materias</dt><dd>{CHAPTERS.length}</dd></div>
          </dl>

          <figure className={s.heroFig}>
            <div className={s.heroImg}>
              <Image
                src={CASE.hero.src}
                alt={`${FIGS.render.alt}. Proyecto RothNEUsiedl, Viena`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, calc(100vw - 80px)"
              />
            </div>
            <figcaption className={s.cap}>
              <span className={s.capNum}>Portada</span>
              <span>{FIGS.render.alt}. RothNEUsiedl, Viena — materia 02.</span>
            </figcaption>
          </figure>
        </header>

        {/* ─── ÍNDICE ───────────────────────────── */}
        <nav className={s.index} aria-label="Materias">
          <div className="sec-label reveal">Contenido</div>
          <ol className={s.indexList}>
            {CHAPTERS.map((c, i) => (
              <li key={c.id} className={`reveal rd${i + 1}`}>
                <a href={`#${c.id}`} className={s.indexRow}>
                  <span className={s.indexNum}>{c.num}</span>
                  <span className={s.indexShort}>{c.short}</span>
                  <span className={s.indexOrig}>{c.ch.title}</span>
                  <span className={s.indexArrow}><Arrow /></span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* ─── 01 FOTOGRAMETRÍA ─────────────────── */}
        <section id="fotogrametria" className={`${s.chapter} ${s.bgCream}`} data-chapter="01 Fotogrametría">
          <ChapterHead id="fotogrametria" />
          <div className={s.compareRow}>
            <div className="reveal"><Compare /></div>
            <div className={`${s.legend} reveal rd2`}>
              <dl>
                <div><dt>Izquierda</dt><dd>Foto</dd></div>
                <div><dt>Derecha</dt><dd>Modelo digital</dd></div>
                <div><dt>Objeto</dt><dd>Goethe&apos;s Gartenhaus</dd></div>
              </dl>
              <p className={s.legendHint}>Arrastrá la línea, o usá las flechas del teclado, para pasar de la foto al modelo.</p>
            </div>
          </div>
          <div className={`${s.wide} ${s.wideOffset} reveal`}>
            <Doc k="juxta" sizes="(max-width: 1024px) 100vw, 1200px" />
          </div>
          <div className={s.pair}>
            <div className="reveal"><Doc k="statue" sizes="(max-width: 768px) 100vw, 58vw" /></div>
            <div className="reveal rd2"><Doc k="map" sizes="(max-width: 768px) 100vw, 36vw" /></div>
          </div>
        </section>

        {/* ─── 02 PLANIFICACIÓN ─────────────────── */}
        <section id="planificacion" className={`${s.chapter} ${s.bgWhite}`} data-chapter="02 Planificación urbana">
          <ChapterHead id="planificacion" />
          <RenderPan />
          <div className={s.planRow}>
            <div className="reveal">
              <Doc k="planta" sizes="(max-width: 1024px) 100vw, 70vw" />
            </div>
            <div className={`${s.scale} reveal rd2`}>
              <div className="sec-label">Planta de implantación</div>
              <span className={s.scaleNum}>1:500</span>
            </div>
          </div>
          <div className={s.posterRow}>
            <div className={s.posterAside}>
              <div className="sec-label reveal">Lámina final</div>
              <h3 className={`${s.posterTitle} reveal rd1`}>Soil Value</h3>
              <p className={`${s.posterText} reveal rd2`}>{plan.text[1]}.</p>
              <p className={`${s.credit} reveal rd3`}>
                Trabajo grupal. La lámina acredita a Ezequiel Ader y Anna Clara Dusanek Guedes.
              </p>
            </div>
            <div className="reveal">
              <Loupe k="soil" sizes="(max-width: 1024px) 100vw, 44vw" />
            </div>
          </div>
        </section>

        {/* ─── 03 IA GENERATIVA ─────────────────── */}
        <section id="ia-generativa" className={`${s.chapter} ${s.chapterPinned} ${s.bgCream}`} data-chapter="03 IA generativa">
          <ChapterHead id="ia-generativa" />
          <IterStrip>
            <p className={`${s.cap} ${s.iterFoot}`}>
              <span className={s.capNum}>{FIGS.iterSlide.fig}–3.2</span>
              <span>
                Recortes de la lámina «Image to image» e imagen final del mueble urbano.{' '}
                <ViewLink k="iterSlide">Ver lámina</ViewLink> · <ViewLink k="final">Ver imagen final</ViewLink>
              </span>
            </p>
          </IterStrip>
          <figure className={s.mesh}>
            <div className={s.meshGrid}>
              {MESHES.map((m, i) => (
                <div key={m.src} className={`${s.meshCell} reveal rd${i + 1}`}>
                  <Image src={m.src} alt={m.alt} width={m.w} height={m.h} sizes="(max-width: 768px) 100vw, 380px" loading="lazy" />
                  <span className={s.meshTag}>Vista {String(i + 1).padStart(2, '0')}</span>
                </div>
              ))}
            </div>
            <figcaption className={s.cap}>
              <span className={s.capNum}>{FIGS.mesh.fig}</span>
              <span>
                {FIGS.mesh.alt}. <ViewLink k="mesh">Ver lámina</ViewLink>
              </span>
            </figcaption>
          </figure>
        </section>

        {/* ─── 04 CRÍTICA E IA ──────────────────── */}
        <section id="critica" className={`${s.chapter} ${s.bgWhite}`} data-chapter="04 Crítica e IA">
          <ChapterHead id="critica" />
          <div className={s.posterRow}>
            <div className={s.posterAside}>
              <div className="sec-label reveal">Póster</div>
              <h3 className={`${s.posterTitle} reveal rd1`}>Beyond Algorithms<em>The ethical dimensions of AI</em></h3>
              <blockquote className={`${s.quote} reveal rd2`}>{critica.text[1]}</blockquote>
            </div>
            <div className="reveal">
              <Loupe k="ethics" sizes="(max-width: 1024px) 100vw, 44vw" />
            </div>
          </div>
        </section>

        {/* ─── CIERRE ───────────────────────────── */}
        <section className={s.next} data-chapter="Otros proyectos">
          <div className="sec-label reveal">Formación y obra</div>
          <h2 className="sec-title reveal rd1">Otros<br /><em>proyectos</em></h2>
          <div className={s.nextGrid}>
            {NEXT.map(({ href, c }, i) => (
              <Link key={href} href={href} className={`${s.card} reveal rd${i + 1}`}>
                <div className={s.cardImg}>
                  <Image src={lineCover(href).src} alt={c.title} fill sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" />
                </div>
                <div className={s.cardMeta}>
                  <span>{c.tag}</span>
                  <span>{c.location} · {c.years}</span>
                </div>
                <div className={s.cardTitle}>
                  {c.title}
                  <Arrow />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className={s.cta}>
          <div>
            <div className="sec-label reveal">Tu proyecto</div>
            <h2 className="sec-title reveal rd1">¿Hablamos<br /><em>del tuyo?</em></h2>
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
      <Lightbox items={items} index={lb} onChange={setLb} />
    </ViewerContext.Provider>
  );
}
