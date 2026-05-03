'use client';

import { useState } from 'react';
import styles from './Bim.module.css';

const LAYERS = [
  { num: '00', label: 'Modelo Completo', sub: 'Vista integrada BIM' },
  { num: '01', label: 'Precisión', sub: 'Estructura y cimientos' },
  { num: '02', label: 'Coordinación', sub: 'Instalaciones MEP' },
  { num: '03', label: 'Eficiencia', sub: 'Arquitectura y detalles' },
];

const STATS = [
  { num: '30%', label: 'Reducción de errores en obra' },
  { num: '100%', label: 'Coordinación multidisciplinar' },
  { num: 'BIM', label: 'Metodología en todos los proyectos' },
];

export function Bim() {
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <section id="bim" className={styles.bim}>
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
          {/* Layer 0: Full axo */}
          <div className={styles.layer} style={{ opacity: activeLayer === 0 ? 1 : 0 }}>
            <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg">
              <g stroke="#1A1917" fill="none" opacity="0.7">
                <polygon points="100,360 400,480 700,360 400,240" strokeWidth="1" fill="rgba(26,25,23,0.02)" />
                <polygon points="100,360 100,160 400,40 400,240" strokeWidth="1" fill="rgba(26,25,23,0.04)" />
                <polygon points="700,360 700,160 400,40 400,240" strokeWidth="1" fill="rgba(26,25,23,0.03)" />
                <polygon points="100,160 400,40 700,160 400,280" strokeWidth="1" fill="rgba(26,25,23,0.06)" />
                <line x1="100" y1="280" x2="700" y2="280" strokeWidth="0.4" opacity="0.4" />
                <rect x="130" y="185" width="50" height="60" strokeWidth="0.6" opacity="0.6" />
                <rect x="200" y="185" width="50" height="60" strokeWidth="0.6" opacity="0.6" />
                <rect x="270" y="185" width="50" height="60" strokeWidth="0.6" opacity="0.6" />
                <rect x="130" y="285" width="50" height="60" strokeWidth="0.6" opacity="0.6" />
                <rect x="200" y="285" width="50" height="60" strokeWidth="0.6" opacity="0.6" />
                <rect x="350" y="390" width="50" height="70" strokeWidth="0.7" opacity="0.7" />
              </g>
            </svg>
          </div>
          {/* Layer 1: Structure */}
          <div className={styles.layer} style={{ opacity: activeLayer === 1 ? 1 : 0 }}>
            <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg">
              <g stroke="#5A5852" fill="none" opacity="0.9">
                <line x1="100" y1="160" x2="100" y2="360" strokeWidth="3" />
                <line x1="250" y1="100" x2="250" y2="300" strokeWidth="3" />
                <line x1="400" y1="40" x2="400" y2="240" strokeWidth="3" />
                <line x1="550" y1="100" x2="550" y2="300" strokeWidth="3" />
                <line x1="700" y1="160" x2="700" y2="360" strokeWidth="3" />
                <line x1="100" y1="160" x2="400" y2="40" strokeWidth="2" />
                <line x1="400" y1="40" x2="700" y2="160" strokeWidth="2" />
                <line x1="100" y1="260" x2="700" y2="260" strokeWidth="1.5" />
                <polygon points="100,260 400,140 700,260 400,380" strokeWidth="1" fill="rgba(26,25,23,0.04)" />
                <line x1="80" y1="370" x2="720" y2="370" strokeWidth="1.5" opacity="0.5" />
              </g>
              <text x="400" y="460" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontSize="11" letterSpacing="3" fill="#8A857D">ESTRUCTURA</text>
            </svg>
          </div>
          {/* Layer 2: MEP */}
          <div className={styles.layer} style={{ opacity: activeLayer === 2 ? 1 : 0 }}>
            <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg">
              <g stroke="#8A857D" fill="none">
                <line x1="150" y1="180" x2="650" y2="180" strokeWidth="1.5" strokeDasharray="8,4" />
                <line x1="150" y1="220" x2="650" y2="220" strokeWidth="1.5" strokeDasharray="8,4" />
                <line x1="200" y1="180" x2="200" y2="380" strokeWidth="1.5" strokeDasharray="6,3" />
                <line x1="400" y1="180" x2="400" y2="380" strokeWidth="1.5" strokeDasharray="6,3" />
                <line x1="600" y1="180" x2="600" y2="380" strokeWidth="1.5" strokeDasharray="6,3" />
                <circle cx="200" cy="180" r="5" strokeWidth="1" fill="rgba(26,25,23,0.08)" />
                <circle cx="400" cy="180" r="5" strokeWidth="1" fill="rgba(26,25,23,0.08)" />
                <circle cx="600" cy="180" r="5" strokeWidth="1" fill="rgba(26,25,23,0.08)" />
                <circle cx="200" cy="220" r="5" strokeWidth="1" fill="rgba(26,25,23,0.08)" />
                <circle cx="400" cy="220" r="5" strokeWidth="1" fill="rgba(26,25,23,0.08)" />
                <circle cx="600" cy="220" r="5" strokeWidth="1" fill="rgba(26,25,23,0.08)" />
                <circle cx="200" cy="380" r="8" strokeWidth="1" fill="none" />
                <circle cx="400" cy="380" r="8" strokeWidth="1" fill="none" />
                <circle cx="600" cy="380" r="8" strokeWidth="1" fill="none" />
              </g>
              <text x="400" y="460" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontSize="11" letterSpacing="3" fill="#8A857D">INSTALACIONES MEP</text>
            </svg>
          </div>
          {/* Layer 3: Architecture detail */}
          <div className={styles.layer} style={{ opacity: activeLayer === 3 ? 1 : 0 }}>
            <svg viewBox="0 0 800 480" xmlns="http://www.w3.org/2000/svg">
              <g stroke="#1A1917" fill="none">
                <rect x="120" y="200" width="240" height="180" strokeWidth="0.8" opacity="0.6" />
                <rect x="440" y="200" width="240" height="180" strokeWidth="0.8" opacity="0.6" />
                <rect x="135" y="215" width="60" height="40" strokeWidth="0.5" opacity="0.5" />
                <circle cx="300" cy="320" r="20" strokeWidth="0.5" opacity="0.5" />
                <rect x="455" y="215" width="80" height="50" strokeWidth="0.5" opacity="0.5" />
                <rect x="455" y="280" width="40" height="80" strokeWidth="0.5" opacity="0.5" />
                <line x1="120" y1="395" x2="360" y2="395" strokeWidth="0.4" opacity="0.4" />
                <line x1="120" y1="390" x2="120" y2="400" strokeWidth="0.4" opacity="0.4" />
                <line x1="360" y1="390" x2="360" y2="400" strokeWidth="0.4" opacity="0.4" />
              </g>
              <text x="400" y="460" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontSize="11" letterSpacing="3" fill="#8A857D">ARQUITECTURA + DETALLES</text>
            </svg>
          </div>
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
            </button>
          ))}
        </div>
      </div>

      <div className={styles.stats}>
        {STATS.map((stat, i) => (
          <div key={stat.label} className={`${styles.stat} reveal rd${i + 1}`}>
            <div className={styles.statNum}>{stat.num}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
