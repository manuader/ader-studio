'use client';

import { useState } from 'react';
import styles from './Proceso.module.css';

const STEPS = [
  { num: '01 —', title: 'Terreno y Sitio', desc: 'Análisis topográfico, orientación, vistas, accesos y condicionantes del entorno inmediato.' },
  { num: '02 —', title: 'Clima y Energía', desc: 'Estudio solar, vientos dominantes, humedad y estrategias bioclimáticas pasivas.' },
  { num: '03 —', title: 'Materialidad', desc: 'Selección de materiales en diálogo con el sitio, el programa y la capacidad constructiva local.' },
  { num: '04 —', title: 'La Arquitectura', desc: 'La forma emerge de la síntesis de todos los factores anteriores. No se impone — se descubre.' },
];

export function Proceso() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="proceso" className={styles.proceso}>
      <div className={styles.header}>
        <div className="sec-label reveal">Proceso</div>
        <div className="sec-title reveal rd1">Arquitectura<br /><em>que emerge</em><br />del lugar.</div>
      </div>

      <div className={styles.layers}>
        <div className={styles.diagram}>
          <div className={styles.layerStack}>
            {/* Layer 0: Terrain */}
            <div className={`${styles.layerItem} ${activeStep === 0 ? styles.layerItemVisible : ''}`}>
              <svg viewBox="0 0 560 560" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <path d="M0,400 Q140,350 280,380 Q420,410 560,360 L560,560 L0,560 Z" fill="rgba(26,25,23,0.06)" stroke="#1A1917" strokeWidth="0.6" />
                <path d="M0,430 Q140,390 280,410 Q420,430 560,400" fill="none" stroke="rgba(26,25,23,0.3)" strokeWidth="0.5" />
                <text x="280" y="500" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontSize="10" letterSpacing="4" fill="rgba(26,25,23,0.3)">TERRENO</text>
              </svg>
            </div>
            {/* Layer 1: Climate */}
            <div className={`${styles.layerItem} ${activeStep === 1 ? styles.layerItemVisible : ''}`}>
              <svg viewBox="0 0 560 560" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <circle cx="280" cy="100" r="30" fill="none" stroke="rgba(26,25,23,0.5)" strokeWidth="1" />
                <line x1="280" y1="60" x2="280" y2="40" stroke="rgba(26,25,23,0.4)" strokeWidth="1" />
                <line x1="310" y1="70" x2="325" y2="55" stroke="rgba(26,25,23,0.4)" strokeWidth="1" />
                <line x1="320" y1="100" x2="340" y2="100" stroke="rgba(26,25,23,0.4)" strokeWidth="1" />
                <line x1="50" y1="250" x2="150" y2="250" stroke="rgba(26,25,23,0.3)" strokeWidth="1" />
                <line x1="50" y1="280" x2="150" y2="280" stroke="rgba(26,25,23,0.3)" strokeWidth="1" />
                <line x1="50" y1="310" x2="140" y2="310" stroke="rgba(26,25,23,0.3)" strokeWidth="1" />
                <text x="280" y="500" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontSize="10" letterSpacing="4" fill="rgba(26,25,23,0.3)">CLIMA</text>
              </svg>
            </div>
            {/* Layer 2: Materials */}
            <div className={`${styles.layerItem} ${activeStep === 2 ? styles.layerItemVisible : ''}`}>
              <svg viewBox="0 0 560 560" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <rect x="100" y="180" width="80" height="80" fill="rgba(26,25,23,0.08)" stroke="rgba(26,25,23,0.4)" strokeWidth="0.6" />
                <rect x="200" y="180" width="80" height="80" fill="rgba(26,25,23,0.04)" stroke="rgba(26,25,23,0.3)" strokeWidth="0.6" />
                <rect x="300" y="180" width="80" height="80" fill="rgba(26,25,23,0.06)" stroke="rgba(26,25,23,0.35)" strokeWidth="0.6" />
                <rect x="380" y="180" width="80" height="80" fill="rgba(26,25,23,0.03)" stroke="rgba(26,25,23,0.25)" strokeWidth="0.6" />
                <text x="140" y="280" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontSize="8" letterSpacing="2" fill="rgba(26,25,23,0.25)">HORMIGÓN</text>
                <text x="240" y="280" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontSize="8" letterSpacing="2" fill="rgba(26,25,23,0.25)">MADERA</text>
                <text x="340" y="280" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontSize="8" letterSpacing="2" fill="rgba(26,25,23,0.25)">ACERO</text>
                <text x="420" y="280" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontSize="8" letterSpacing="2" fill="rgba(26,25,23,0.25)">VIDRIO</text>
                <text x="280" y="500" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontSize="10" letterSpacing="4" fill="rgba(26,25,23,0.3)">MATERIALIDAD</text>
              </svg>
            </div>
            {/* Layer 3: Architecture */}
            <div className={`${styles.layerItem} ${activeStep === 3 ? styles.layerItemVisible : ''}`}>
              <svg viewBox="0 0 560 560" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <polygon points="280,80 180,300 380,300" fill="none" stroke="rgba(26,25,23,0.6)" strokeWidth="1.2" />
                <rect x="160" y="300" width="240" height="180" fill="none" stroke="rgba(26,25,23,0.6)" strokeWidth="1.2" />
                <line x1="280" y1="300" x2="280" y2="480" stroke="rgba(26,25,23,0.3)" strokeWidth="0.5" />
                <rect x="220" y="380" width="50" height="100" stroke="rgba(26,25,23,0.4)" strokeWidth="0.8" fill="none" />
                <text x="280" y="500" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontSize="10" letterSpacing="4" fill="rgba(26,25,23,0.3)">ARQUITECTURA</text>
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.steps}>
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`${styles.step} ${activeStep === i ? styles.stepActive : ''}`}
              onClick={() => setActiveStep(i)}
            >
              <div className={styles.stepNum}>{step.num}</div>
              <div className={styles.stepTitle}>{step.title}</div>
              <div className={styles.stepDesc}>{step.desc}</div>
              <div className={styles.stepBarWrap}>
                <div className={styles.stepBar} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
