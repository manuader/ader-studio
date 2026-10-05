'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Proceso.module.css';

const STEPS = [
  {
    num: '01',
    title: 'Terreno Base',
    desc: 'Relevamiento del terreno existente: límites, dimensiones y condicionantes del sitio.',
    img: '/images/process/01. TERRENO BASE ANGEL.webp',
  },
  {
    num: '02',
    title: 'Grilla y Trazado',
    desc: 'Estructuración del terreno mediante una grilla que ordena el trazado y las proporciones.',
    img: '/images/process/02. TERRENO ANGEL GRILLA.webp',
  },
  {
    num: '03',
    title: 'Análisis con IA',
    desc: 'Estudio del plano del terreno asistido por inteligencia artificial para explorar alternativas.',
    img: '/images/process/03. PLANO TERRENO IA.webp',
  },
  {
    num: '04',
    title: 'Composición de la Forma',
    desc: 'Generación de la composición volumétrica a partir de los datos del sitio y el programa.',
    img: '/images/process/04. COMPOSICION FORMA IA.webp',
  },
  {
    num: '05',
    title: 'Morfología',
    desc: 'Definición de la morfología del proyecto: la forma emerge de la síntesis del proceso.',
    img: '/images/process/05. MORFOLOGIA.webp',
  },
  {
    num: '06',
    title: 'Planta Baja',
    desc: 'Resolución de la planta baja: distribución funcional y relaciones espaciales finales.',
    img: '/images/process/06. PB.webp',
  },
];

// Register the original sheets to the same lot edge with uniform scaling only.
const REGISTRATION = [
 [2400,1532,147/1955*2400,211/1248*1532,1649/1955*2400],
 [2400,1697,141/1888*2400,273/1334*1697,1593/1888*2400],
 [2400,1434,155/2048*2400,156/1224*1434,1760/2048*2400],
 [2400,1607,133/1912*2400,162/1280*1607,1679/1912*2400],
 [2400,1437,132/2048*2400,130/1226*1437,1786/2048*2400],
 [2400,1684,125/1869*2400,273/1312*1684,1657/1869*2400],
];
const AUTO_ADVANCE_MS = 3000;
const TICK_MS = 50;

export function Proceso() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);

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

  // Auto-advance steps every AUTO_ADVANCE_MS when section is on screen.
  // Re-runs on every activeStep change (auto or manual click), which naturally
  // resets the progress bar and timer.
  useEffect(() => {
    if (!inView || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setProgress(0);
    let startTime = performance.now();
    const id = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const p = Math.min(elapsed / AUTO_ADVANCE_MS, 1);
      setProgress(p);
      if (p >= 1) {
        setActiveStep((prev) => (prev + 1) % STEPS.length);
        startTime = performance.now();
      }
    }, TICK_MS);
    return () => clearInterval(id);
  }, [inView, activeStep]);

  return (
    <section id="proceso" ref={sectionRef} className={styles.proceso} data-chapter="Casa Ángel · Proceso">
      <div className={styles.header}>
        <div className="sec-label reveal">Proceso</div>
        <h2 className="sec-title">Arquitectura <em>que emerge del lugar.</em></h2>
      </div>

      <div className={`${styles.diagramGrid} reveal`}>
        <div className={styles.controls}>
          {STEPS.map((step, i) => (
            <button
              key={step.num}
              className={`${styles.btn} ${activeStep === i ? styles.btnActive : ''}`}
              aria-pressed={activeStep === i}
              onClick={() => setActiveStep(i)}
            >
              <span className={styles.btnNum}>{step.num} —</span>
              <span className={styles.btnLabel}>{step.title}</span>
              <span className={styles.btnSub}>{step.desc}</span>
              <div className={styles.stepBarWrap}>
                <div
                  className={styles.stepBar}
                  style={{ width: activeStep === i ? `${progress * 100}%` : '0%' }}
                />
              </div>
            </button>
          ))}
        </div>

        <div className={styles.imageWrap}>
          <svg className={styles.image} viewBox="0 0 2800 2100" role="img" aria-label={STEPS[activeStep].title}>
          {STEPS.map((step, i) => {
            const [w,h,x,y,edge]=REGISTRATION[i]; const scale=2200/edge;
            return <image key={step.num} href={step.img} x={300-x*scale} y={460-y*scale} width={w*scale} height={h*scale} style={{opacity:activeStep===i?1:0,transition:'opacity .45s ease'}}/>;
          })}
          </svg>
        </div>
      </div>
    </section>
  );
}
