'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Proceso.module.css';

const STEPS = [
  { num: '01 —', title: 'Terreno y Sitio', desc: 'Análisis topográfico, orientación, vistas, accesos y condicionantes del entorno inmediato.' },
  { num: '02 —', title: 'Clima y Energía', desc: 'Estudio solar, vientos dominantes, humedad y estrategias bioclimáticas pasivas.' },
  { num: '03 —', title: 'Materialidad', desc: 'Selección de materiales en diálogo con el sitio, el programa y la capacidad constructiva local.' },
  { num: '04 —', title: 'La Arquitectura', desc: 'La forma emerge de la síntesis de todos los factores anteriores. No se impone — se descubre.' },
];

export function Proceso() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    // Auto-play when in viewport
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(section);

    // Sync steps with video time
    function onTimeUpdate() {
      const v = videoRef.current;
      if (!v || !v.duration) return;
      const segmentDuration = v.duration / STEPS.length;
      const step = Math.min(Math.floor(v.currentTime / segmentDuration), STEPS.length - 1);
      const segProgress = (v.currentTime - step * segmentDuration) / segmentDuration;
      setActiveStep(step);
      setProgress(segProgress);
    }

    video.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      io.disconnect();
      video.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, []);

  function handleStepClick(i: number) {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const segmentDuration = video.duration / STEPS.length;
    video.currentTime = i * segmentDuration;
    setActiveStep(i);
    setProgress(0);
  }

  return (
    <section id="proceso" ref={sectionRef} className={styles.proceso}>
      <div className={styles.header}>
        <div className="sec-label reveal">Proceso</div>
        <div className="sec-title reveal rd1">Arquitectura<br /><em>que emerge</em><br />del lugar.</div>
      </div>

      <div className={styles.steps}>
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            className={`${styles.step} ${activeStep === i ? styles.stepActive : ''}`}
            onClick={() => handleStepClick(i)}
          >
            <div className={styles.stepNum}>{step.num}</div>
            <div className={styles.stepTitle}>{step.title}</div>
            <div className={styles.stepDesc}>{step.desc}</div>
            <div className={styles.stepBarWrap}>
              <div
                className={styles.stepBar}
                style={{ width: activeStep === i ? `${progress * 100}%` : '0%' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.videoWrap}>
        <video
          ref={videoRef}
          src="/videos/terereno-ai.mp4"
          muted
          playsInline
          loop
          preload="metadata"
          className={styles.video}
        />
      </div>
    </section>
  );
}
