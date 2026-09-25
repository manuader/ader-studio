'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './UrbetrackCase.module.css';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Footer } from '@/components/footer/Footer';

const FICHA = [
  { k: 'Cliente', v: 'Urbetrack' },
  { k: 'Ubicación', v: 'Av. Rivadavia 4260, CABA' },
  { k: 'Año', v: '2026' },
  { k: 'Tipología', v: 'Oficinas corporativas' },
  { k: 'Alcance', v: 'Reforma integral y modernización' },
];

const ESTRATEGIAS = [
  {
    num: '01',
    title: 'Planta libre',
    text: 'Liberamos la planta para un espacio de trabajo abierto y flexible, organizado en islas de escritorios con divisores acústicos.',
    icon: 'plan',
  },
  {
    num: '02',
    title: 'Identidad',
    text: 'La marca se vuelve arquitectura: el violeta Urbetrack en columnas y paramentos, y el isotipo como vinilo esmerilado sobre los vidrios.',
    icon: 'brand',
  },
  {
    num: '03',
    title: 'Luz',
    text: 'Luminarias lineales suspendidas y aros circulares ordenan el cielorraso y acompañan el uso de cada zona.',
    icon: 'light',
  },
  {
    num: '04',
    title: 'Transparencia',
    text: 'Las salas cerradas se definen con tabiques vidriados: privacidad acústica sin perder la luz ni la conexión visual.',
    icon: 'glass',
  },
] as const;

const RECORRIDO = [
  {
    num: '01',
    title: 'Acceso',
    text: 'Un umbral de vidrio templado con el isotipo de la marca. La primera línea del proyecto: simple, reconocible, precisa.',
    img: '/images/projects/URBETRACK.png',
    alt: 'Dibujo lineal del acceso a la oficina Urbetrack',
    drawing: true,
  },
  {
    num: '02',
    title: 'Planta de trabajo',
    text: 'Islas de trabajo continuas bajo una grilla de luz lineal. Columnas en violeta marcan el ritmo y la vegetación suaviza el conjunto.',
    img: '/images/renders/02 - Oficina.png',
    alt: 'Planta abierta de trabajo de la oficina Urbetrack',
    drawing: false,
  },
  {
    num: '03',
    title: 'Sala de control',
    text: 'El corazón operativo de la empresa. Un recinto vidriado con videowall, puestos de monitoreo y un paramento de acento en color de marca.',
    img: '/images/renders/07 - Sala de control.png',
    alt: 'Sala de control y monitoreo de Urbetrack',
    drawing: false,
  },
  {
    num: '04',
    title: 'Sanitarios',
    text: 'Renovación completa de núcleos sanitarios: mesada corrida de piedra, bachas de apoyo, espejo continuo y vidrio templado.',
    img: '/images/renders/10 - Baño oficina.png',
    alt: 'Sanitarios renovados de la oficina Urbetrack',
    drawing: false,
  },
];

const MATERIALES = [
  { name: 'Blanco técnico', use: 'Cielorrasos y tabiques', swatch: '#F3F2EE' },
  { name: 'Violeta Urbetrack', use: 'Columnas y paramentos de acento', swatch: '#3A2A66' },
  { name: 'Vidrio esmerilado', use: 'Divisiones con vinilo de marca', swatch: 'glass' },
  { name: 'Gris cálido', use: 'Solados continuos', swatch: '#A7A198' },
  { name: 'Grafito', use: 'Equipamiento y luminarias', swatch: '#262523' },
  { name: 'Verde', use: 'Vegetación interior', swatch: '#4E6B4A' },
];

const AUTO_MS = 5000;
const TICK_MS = 50;

function clamp(v: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}

/** Serpentine "U" line, the motif of the frosted vinyl on the office glass. */
function serpentine(count: number, r: number, depth: number) {
  let d = `M0,0`;
  let x = 0;
  for (let i = 0; i < count; i++) {
    d += ` L${x},${depth} A${r},${r} 0 0 0 ${x + 2 * r},${depth} L${x + 2 * r},0 A${r},${r} 0 0 1 ${x + 4 * r},0`;
    x += 4 * r;
  }
  return { d, width: x };
}

function StrategyIcon({ type }: { type: string }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.2 };
  switch (type) {
    case 'plan':
      return (
        <svg viewBox="0 0 48 48" width="40" height="40" {...common}>
          <rect x="4" y="8" width="40" height="32" />
          <line x1="12" y1="18" x2="36" y2="18" />
          <line x1="12" y1="24" x2="36" y2="24" />
          <line x1="12" y1="30" x2="36" y2="30" />
          <line x1="24" y1="14" x2="24" y2="34" />
        </svg>
      );
    case 'brand':
      return (
        <svg viewBox="0 0 48 48" width="40" height="40" {...common}>
          <path d="M14 8 V26 A10 10 0 0 0 34 26 V8" />
          <circle cx="24" cy="22" r="3" />
          <path d="M24 32 L20.5 24.5 A4.2 4.2 0 1 1 27.5 24.5 Z" />
        </svg>
      );
    case 'light':
      return (
        <svg viewBox="0 0 48 48" width="40" height="40" {...common}>
          <line x1="16" y1="4" x2="16" y2="14" />
          <line x1="32" y1="4" x2="32" y2="14" />
          <rect x="8" y="14" width="32" height="4" />
          <line x1="12" y1="24" x2="8" y2="40" strokeDasharray="2 3" />
          <line x1="24" y1="24" x2="24" y2="42" strokeDasharray="2 3" />
          <line x1="36" y1="24" x2="40" y2="40" strokeDasharray="2 3" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 48 48" width="40" height="40" {...common}>
          <rect x="6" y="8" width="16" height="32" />
          <rect x="26" y="8" width="16" height="32" />
          <line x1="10" y1="14" x2="16" y2="20" />
          <line x1="30" y1="14" x2="36" y2="20" />
        </svg>
      );
  }
}

export function UrbetrackCase() {
  const heroRef = useRef<HTMLElement>(null);
  const motifRef = useRef<HTMLDivElement>(null);
  const recorridoRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [activeMat, setActiveMat] = useState(1);

  // The home page reveals the custom cursor after its intro; here there is no intro.
  useEffect(() => {
    document.documentElement.classList.add('cursor-ready');
  }, []);

  // Scroll-driven values: hero "trazo → obra" reveal and the serpentine drawing.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const hero = heroRef.current;
      if (hero) {
        const r = hero.getBoundingClientRect();
        const p = clamp(-r.top / Math.max(1, r.height - vh));
        hero.style.setProperty('--p', p.toFixed(4));
      }
      const motif = motifRef.current;
      if (motif) {
        const r = motif.getBoundingClientRect();
        const p = clamp((vh - r.top) / (vh * 0.9 + r.height));
        motif.style.setProperty('--draw', p.toFixed(4));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Recorrido auto-advances while on screen, pauses on hover.
  useEffect(() => {
    const el = recorridoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused) return;
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + TICK_MS / AUTO_MS;
        if (next >= 1) {
          setActive((a) => (a + 1) % RECORRIDO.length);
          return 0;
        }
        return next;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [inView, paused]);

  const select = (i: number) => {
    setActive(i);
    setProgress(0);
  };

  const motif = serpentine(14, 22, 58);

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navBrand}>
          <Image src="/images/logo.jpeg" alt="Ader Studio" width={36} height={36} className={styles.navLogo} />
          <span>Ader Studio</span>
        </Link>
        <div className={styles.navRight}>
          <Link href="/#proyectos" className={styles.navLink}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><polyline points="9,2 4,7 9,12" stroke="currentColor" strokeWidth="1.2" /></svg>
            Proyectos
          </Link>
          <Link href="/#contacto" className={styles.navLink}>Contacto</Link>
        </div>
      </nav>

      <main className={styles.page}>
        {/* ─── HERO · del trazo a la obra ─────────────────────── */}
        <section ref={heroRef} className={styles.hero} aria-label="Oficina Urbetrack">
          <div className={styles.heroSticky}>
            <div className={styles.heroDrawing}>
              <Image
                src="/images/projects/URBETRACK.png"
                alt="Dibujo lineal del acceso a Urbetrack"
                fill
                priority
                sizes="100vw"
                className={styles.heroDrawingImg}
              />
            </div>
            <div className={styles.heroRender}>
              <Image
                src="/images/renders/02 - Oficina.png"
                alt="Planta de trabajo de la oficina Urbetrack terminada"
                fill
                priority
                sizes="100vw"
                className={styles.heroRenderImg}
              />
              <div className={styles.heroShade} />
            </div>

            <div className={styles.heroTop}>
              <div className={styles.heroTag}>Caso de estudio · 02</div>
              <div className={styles.heroCoord}>34°36′S · 58°25′O</div>
            </div>

            <div className={styles.heroText}>
              <div className={styles.heroKicker}>
                <span className={styles.kickerA}>Del trazo</span>
                <span className={styles.kickerB}>a la obra</span>
              </div>
              <h1 className={styles.heroTitle}>
                Oficina<br /><em>Urbetrack</em>
              </h1>
              <p className={styles.heroSub}>Reforma integral y modernización — Buenos Aires, 2026</p>
            </div>

            <div className={styles.heroScroll}>
              <span>Scroll</span>
              <div className={styles.heroScrollLine} />
            </div>
          </div>
        </section>

        {/* ─── FICHA ────────────────────────────────────────── */}
        <section className={styles.ficha}>
          {FICHA.map((f, i) => (
            <div key={f.k} className={`${styles.fichaItem} reveal rd${Math.min(i, 4)}`}>
              <div className={styles.fichaKey}>{f.k}</div>
              <div className={styles.fichaVal}>{f.v}</div>
            </div>
          ))}
        </section>

        {/* ─── EL ENCARGO ───────────────────────────────────── */}
        <section className={styles.encargo}>
          <div className={styles.encargoGrid}>
            <div>
              <div className="sec-label reveal">El encargo</div>
              <h2 className="sec-title reveal rd1">
                Una oficina<br />a la altura<br /><em>de la marca</em>
              </h2>
            </div>
            <div className={styles.encargoBody}>
              <p className={`${styles.lead} reveal rd1`}>
                Urbetrack es una empresa de tecnología dedicada al rastreo y la gestión de flotas.
                El encargo: transformar por completo su sede en Almagro.
              </p>
              <p className="reveal rd2">
                El proyecto propuso una reforma integral: reorganizar la planta, renovar las
                terminaciones, los sanitarios y la iluminación, y convertir la identidad de la
                empresa en un sistema arquitectónico. Un espacio claro, luminoso y preciso,
                pensado para trabajar como trabaja la empresa: conectado y en tiempo real.
              </p>
            </div>
          </div>

          <div ref={motifRef} className={styles.motif} aria-hidden="true">
            <svg viewBox={`-8 -8 ${motif.width + 16} 110`} preserveAspectRatio="xMinYMid meet">
              <path d={motif.d} pathLength={1} className={styles.motifPath} />
              {[1, 4, 7, 10, 13].map((i) => (
                <g
                  key={i}
                  className={styles.motifPin}
                  style={{ ['--i' as string]: (i + 0.5) / 14 }}
                  transform={`translate(${i * 88 + 22} 40)`}
                >
                  <path d="M0 12 L-6 1 A7 7 0 1 1 6 1 Z" />
                  <circle cx="0" cy="-3" r="2.6" />
                </g>
              ))}
            </svg>
            <div className={styles.motifCaption}>
              Isotipo en serie — el vinilo esmerilado que recorre los vidrios de la oficina
            </div>
          </div>
        </section>

        {/* ─── ESTRATEGIAS ──────────────────────────────────── */}
        <section className={styles.estrategias}>
          <div className={styles.secHead}>
            <div className="sec-label reveal">La intervención</div>
            <h2 className="sec-title reveal rd1">Cuatro<br /><em>decisiones</em></h2>
          </div>
          <div className={styles.estrGrid}>
            {ESTRATEGIAS.map((e, i) => (
              <article key={e.num} className={`${styles.estrCard} reveal rd${i + 1}`}>
                <div className={styles.estrTop}>
                  <span className={styles.estrNum}>{e.num}</span>
                  <span className={styles.estrIcon}><StrategyIcon type={e.icon} /></span>
                </div>
                <h3 className={styles.estrTitle}>{e.title}</h3>
                <p className={styles.estrText}>{e.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ─── RECORRIDO ────────────────────────────────────── */}
        <section
          ref={recorridoRef}
          className={styles.recorrido}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className={styles.recList}>
            <div className="sec-label reveal">Recorrido</div>
            <h2 className="sec-title reveal rd1">El<br /><em>resultado</em></h2>
            <ol className={styles.recItems}>
              {RECORRIDO.map((r, i) => (
                <li key={r.num}>
                  <button
                    type="button"
                    className={`${styles.recItem} ${i === active ? styles.recItemActive : ''}`}
                    onClick={() => select(i)}
                    onMouseEnter={() => select(i)}
                    aria-pressed={i === active}
                  >
                    <span className={styles.recNum}>{r.num}</span>
                    <span className={styles.recBody}>
                      <span className={styles.recTitle}>{r.title}</span>
                      <span className={styles.recText}><span>{r.text}</span></span>
                    </span>
                    <span className={styles.recBar}>
                      <span
                        className={styles.recBarFill}
                        style={{ transform: `scaleX(${i === active ? progress : 0})` }}
                      />
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <div className={styles.recStage}>
            {RECORRIDO.map((r, i) => (
              <div
                key={r.num}
                className={`${styles.recFrame} ${i === active ? styles.recFrameActive : ''} ${r.drawing ? styles.recFrameDrawing : ''}`}
                aria-hidden={i !== active}
              >
                <Image
                  src={r.img}
                  alt={r.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className={r.drawing ? styles.recImgContain : styles.recImg}
                />
              </div>
            ))}
            <div className={styles.recCounter}>
              <span>{RECORRIDO[active].num}</span> / {String(RECORRIDO.length).padStart(2, '0')}
            </div>
          </div>
        </section>

        {/* ─── MATERIALIDAD ─────────────────────────────────── */}
        <section className={styles.materiales}>
          <div className={styles.secHead}>
            <div className="sec-label reveal">Materialidad</div>
            <h2 className="sec-title reveal rd1">Paleta<br /><em>contenida</em></h2>
            <p className={`${styles.matIntro} reveal rd2`}>
              Una base neutra y luminosa donde un único color, el de la marca, aparece
              con intención.
            </p>
          </div>
          <div className={`${styles.matRow} reveal rd2`}>
            {MATERIALES.map((m, i) => (
              <button
                key={m.name}
                type="button"
                className={`${styles.mat} ${i === activeMat ? styles.matActive : ''}`}
                onMouseEnter={() => setActiveMat(i)}
                onFocus={() => setActiveMat(i)}
                onClick={() => setActiveMat(i)}
              >
                <span
                  className={`${styles.matSwatch} ${m.swatch === 'glass' ? styles.matGlass : ''}`}
                  style={m.swatch === 'glass' ? undefined : { background: m.swatch }}
                />
                <span className={styles.matInfo}>
                  <span className={styles.matName}>{m.name}</span>
                  <span className={styles.matUse}>{m.use}</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ─── CIERRE ───────────────────────────────────────── */}
        <section className={styles.cierre}>
          <Image
            src="/images/renders/07 - Sala de control.png"
            alt="Sala de control de Urbetrack"
            fill
            sizes="100vw"
            className={styles.cierreImg}
          />
          <div className={styles.cierreShade} />
          <blockquote className={styles.cierreQuote}>
            <span className="reveal">“Un espacio que trabaja como la empresa:</span>
            <em className="reveal rd1">conectado, preciso y en tiempo real.”</em>
          </blockquote>
        </section>

        {/* ─── CTA ──────────────────────────────────────────── */}
        <section className={styles.cta}>
          <div>
            <div className="sec-label reveal">Tu proyecto</div>
            <h2 className="sec-title reveal rd1">¿Hablamos<br /><em>del tuyo?</em></h2>
          </div>
          <div className={`${styles.ctaActions} reveal rd2`}>
            <Link href="/#contacto" className="btn-primary">
              Iniciar un proyecto
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.2" /><polyline points="8,2 13,7 8,12" stroke="currentColor" strokeWidth="1.2" fill="none" /></svg>
            </Link>
            <Link href="/#proyectos" className="btn-ghost">Ver más proyectos</Link>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
