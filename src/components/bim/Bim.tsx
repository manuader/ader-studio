'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Bim.module.css';

const LAYERS = [
  { num: '01', label: 'Estructura', sub: 'Muros portantes de hormigón armado.', img: '/images/bim/BIM 01 ESTRUCTURA.png' },
  { num: '02', label: 'Cerramientos', sub: 'Mampostería de construcción en seco y aventanamientos de piso a techo.', img: '/images/bim/BIM 02 MAMPOSTERIA.png' },
  { num: '03', label: 'Arquitectura', sub: 'Configuración espacial y relaciones funcionales.', img: '/images/bim/BIM 03 ARQUITECTURA.png' },
  { num: '04', label: 'Instalaciones', sub: 'Coordinación integral de instalaciones sanitarias, cloacales y termomecánicas.', img: '/images/bim/BIM 04 INSTALACIONES.png' },
];

const STATS = [
  { num: '30%', label: 'Reducción de errores en obra' },
  { num: '100%', label: 'Coordinación multidisciplinar' },
  { num: 'BIM', label: 'Metodología en todos los proyectos' },
];

const SHUFFLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const ANIM_DURATION = 1500;
const AUTO_ADVANCE_MS = 3000;
const TICK_MS = 50;

function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - t, 5);
}

function shuffleBIM(t: number): string {
  const target = 'BIM';
  let result = '';
  for (let i = 0; i < 3; i++) {
    const lockAt = 0.5 + i * 0.2; // B locks at 0.5, I at 0.7, M at 0.9
    if (t >= lockAt) {
      result += target[i];
    } else {
      result += SHUFFLE_CHARS[Math.floor(Math.random() * SHUFFLE_CHARS.length)];
    }
  }
  return result;
}

export function Bim() {
  const [activeLayer, setActiveLayer] = useState(0);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [animStarted, setAnimStarted] = useState(false);
  const [displayValues, setDisplayValues] = useState(['0%', '0%', '---']);
  const [inView, setInView] = useState(false);

  // Trigger animation when stats enter viewport
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Track whether the section is on screen — drives the auto-advance carousel
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-advance layers every AUTO_ADVANCE_MS when section is on screen.
  // Re-runs on every activeLayer change (auto or manual click), which naturally
  // resets the progress bar and timer.
  useEffect(() => {
    if (!inView) return;
    setProgress(0);
    let startTime = performance.now();
    const id = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const p = Math.min(elapsed / AUTO_ADVANCE_MS, 1);
      setProgress(p);
      if (p >= 1) {
        setActiveLayer((prev) => (prev + 1) % LAYERS.length);
        startTime = performance.now();
      }
    }, TICK_MS);
    return () => clearInterval(id);
  }, [inView, activeLayer]);

  // Run counting + shuffle animation
  useEffect(() => {
    if (!animStarted) return;
    let start: number | null = null;
    let rafId: number;

    function tick(ts: number) {
      if (!start) start = ts;
      const t = Math.min((ts - start) / ANIM_DURATION, 1);
      const eased = easeOutQuint(t);

      setDisplayValues([
        Math.round(eased * 30) + '%',
        Math.round(eased * 100) + '%',
        t >= 1 ? 'BIM' : shuffleBIM(t),
      ]);

      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [animStarted]);

  return (
    <section id="bim" ref={sectionRef} className={styles.bim}>
      <div className={styles.header}>
        <div>
          <div className="sec-label reveal">Metodología</div>
          <div className="sec-title reveal rd1">BIM<br /><em>Integration</em></div>
        </div>
        <p className={`${styles.desc} reveal rd2`}>
          La metodología BIM (Building Information Modeling) es el núcleo de nuestro proceso. Un modelo digital único que integra arquitectura, estructura e instalaciones — eliminando interferencias, reduciendo errores y optimizando costos de construcción.
        </p>
      </div>

      <div className={`${styles.diagramGrid} reveal`}>
        <div className={styles.diagram}>
          {LAYERS.map((layer, i) => (
            <div key={layer.num} className={styles.layer} style={{ opacity: i <= activeLayer ? 1 : 0 }}>
              <img
                src={layer.img}
                alt={layer.label}
                className={styles.layerImg}
                draggable={false}
              />
            </div>
          ))}
        </div>

        <div className={styles.controls}>
          {LAYERS.map((layer, i) => (
            <button
              key={layer.num}
              className={`${styles.btn} ${activeLayer === i ? styles.btnActive : ''}`}
              onClick={() => setActiveLayer(i)}
            >
              <span className={styles.btnNum}>{layer.num}</span>
              <span className={styles.btnLabel}>{layer.label}</span>
              <span className={styles.btnSub}>{layer.sub}</span>
              <div className={styles.stepBarWrap}>
                <div
                  className={styles.stepBar}
                  style={{ width: activeLayer === i ? `${progress * 100}%` : '0%' }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div ref={statsRef} className={styles.stats}>
        {STATS.map((stat, i) => (
          <div key={stat.label} className={`${styles.stat} reveal rd${i + 1}`}>
            <div className={styles.statNum}>{displayValues[i]}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

    </section>
  );
}
