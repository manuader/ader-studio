'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Proceso.module.css';

const STEPS = [
  {
    num: '01',
    title: 'Terreno Base',
    desc: 'Relevamiento del terreno existente: límites, dimensiones y condicionantes del sitio.',
    img: '/images/process/01. TERRENO BASE ANGEL.png',
  },
  {
    num: '02',
    title: 'Grilla y Trazado',
    desc: 'Estructuración del terreno mediante una grilla que ordena el trazado y las proporciones.',
    img: '/images/process/02. TERRENO ANGEL GRILLA.png',
  },
  {
    num: '03',
    title: 'Análisis con IA',
    desc: 'Estudio del plano del terreno asistido por inteligencia artificial para explorar alternativas.',
    img: '/images/process/03. PLANO TERRENO IA.png',
  },
  {
    num: '04',
    title: 'Composición de la Forma',
    desc: 'Generación de la composición volumétrica a partir de los datos del sitio y el programa.',
    img: '/images/process/04. COMPOSICION FORMA IA.png',
  },
  {
    num: '05',
    title: 'Morfología',
    desc: 'Definición de la morfología del proyecto: la forma emerge de la síntesis del proceso.',
    img: '/images/process/05. MORFOLOGIA.png',
  },
  {
    num: '06',
    title: 'Planta Baja',
    desc: 'Resolución de la planta baja: distribución funcional y relaciones espaciales finales.',
    img: '/images/process/06. PB.png',
  },
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
    if (!inView) return;
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
    <section id="proceso" ref={sectionRef} className={styles.proceso}>
      <div className={styles.header}>
        <div className="sec-label reveal">Proceso</div>
        <div className="sec-title reveal rd1">Arquitectura<br /><em>que emerge</em><br />del lugar.</div>
      </div>

      <div className={`${styles.diagramGrid} reveal`}>
        <div className={styles.controls}>
          {STEPS.map((step, i) => (
            <button
              key={step.num}
              className={`${styles.btn} ${activeStep === i ? styles.btnActive : ''}`}
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
          {STEPS.map((step, i) => (
            <img
              key={step.num}
              src={step.img}
              alt={step.title}
              className={styles.image}
              style={{ opacity: activeStep === i ? 1 : 0 }}
              draggable={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
