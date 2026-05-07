import styles from './Proyectos.module.css';

export function Proyectos() {
  return (
    <section id="proyectos" className={styles.proyectos}>
      <svg className={styles.decorLines} viewBox="0 0 2000 1000" preserveAspectRatio="none" fill="none">
        <path stroke="#B8B3AA" strokeWidth="1.2" opacity="0.5">
          <animate attributeName="d" dur="16s" repeatCount="indefinite" values="
            M-200,100 C100,-100 400,300 700,100 C1000,-100 1300,300 1600,100 C1900,-100 2200,300 2200,100;
            M-200,100 C100,300 400,-100 700,100 C1000,300 1300,-100 1600,100 C1900,300 2200,-100 2200,100;
            M-200,100 C100,-100 400,300 700,100 C1000,-100 1300,300 1600,100 C1900,-100 2200,300 2200,100" />
        </path>
        <path stroke="#C8C3BB" strokeWidth="1" opacity="0.45">
          <animate attributeName="d" dur="20s" repeatCount="indefinite" values="
            M-100,300 C200,100 500,500 800,300 C1100,100 1400,500 1700,300 C2000,100 2200,500 2200,300;
            M-100,300 C200,500 500,100 800,300 C1100,500 1400,100 1700,300 C2000,500 2200,100 2200,300;
            M-100,300 C200,100 500,500 800,300 C1100,100 1400,500 1700,300 C2000,100 2200,500 2200,300" />
        </path>
        <path stroke="#ADA8A0" strokeWidth="1.3" opacity="0.5">
          <animate attributeName="d" dur="18s" repeatCount="indefinite" values="
            M0,500 C300,300 600,700 900,500 C1200,300 1500,700 1800,500 C2100,300 2200,700 2200,500;
            M0,500 C300,700 600,300 900,500 C1200,700 1500,300 1800,500 C2100,700 2200,300 2200,500;
            M0,500 C300,300 600,700 900,500 C1200,300 1500,700 1800,500 C2100,300 2200,700 2200,500" />
        </path>
        <path stroke="#C8C3BB" strokeWidth="1" opacity="0.45">
          <animate attributeName="d" dur="22s" repeatCount="indefinite" values="
            M-200,700 C100,500 400,900 700,700 C1000,500 1300,900 1600,700 C1900,500 2200,900 2200,700;
            M-200,700 C100,900 400,500 700,700 C1000,900 1300,500 1600,700 C1900,900 2200,500 2200,700;
            M-200,700 C100,500 400,900 700,700 C1000,500 1300,900 1600,700 C1900,500 2200,900 2200,700" />
        </path>
        <path stroke="#B8B3AA" strokeWidth="1.2" opacity="0.4">
          <animate attributeName="d" dur="17s" repeatCount="indefinite" values="
            M-100,900 C200,700 500,1100 800,900 C1100,700 1400,1100 1700,900 C2000,700 2200,1100 2200,900;
            M-100,900 C200,1100 500,700 800,900 C1100,1100 1400,700 1700,900 C2000,1100 2200,700 2200,900;
            M-100,900 C200,700 500,1100 800,900 C1100,700 1400,1100 1700,900 C2000,700 2200,1100 2200,900" />
        </path>
      </svg>

      <div className={styles.header}>
        <div>
          <div className="sec-label reveal">Portfolio</div>
          <div className="sec-title reveal rd1">Proyectos<br /><em>Destacados</em></div>
        </div>
        <a href="#fadu" className="btn-text reveal rd2">Ver todos los proyectos →</a>
      </div>
      <div className={styles.grid}>
        {/* Proyecto 1: Casa Angel */}
        <div className={`${styles.card} reveal rd1`}>
          <div className={styles.placeholder}>
            <svg viewBox="0 0 720 540" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
              <rect width="720" height="540" fill="#F2EFE9" />
              <rect x="160" y="140" width="400" height="300" fill="none" stroke="#D4D0C8" strokeWidth="1" />
              <rect x="160" y="140" width="200" height="300" fill="#EBE7E0" />
              <rect x="360" y="140" width="200" height="200" fill="#E8E5DD" />
              <line x1="160" y1="260" x2="560" y2="260" stroke="#D4D0C8" strokeWidth="0.5" />
              <rect x="180" y="160" width="70" height="80" fill="#FAFAF7" stroke="#D4D0C8" strokeWidth="0.4" />
              <rect x="270" y="160" width="70" height="80" fill="#FAFAF7" stroke="#D4D0C8" strokeWidth="0.4" />
              <rect x="380" y="160" width="80" height="60" fill="#FAFAF7" stroke="#D4D0C8" strokeWidth="0.4" />
              <rect x="180" y="280" width="70" height="80" fill="#FAFAF7" stroke="#D4D0C8" strokeWidth="0.4" />
              <rect x="300" y="350" width="60" height="90" fill="#F7F5F0" stroke="#D4D0C8" strokeWidth="0.5" />
              <line x1="80" y1="440" x2="80" y2="200" stroke="#C8C3BB" strokeWidth="2" />
              <ellipse cx="80" cy="190" rx="30" ry="50" fill="#E2DED6" stroke="#D4D0C8" strokeWidth="0.5" />
              <line x1="620" y1="440" x2="620" y2="220" stroke="#C8C3BB" strokeWidth="2" />
              <ellipse cx="620" cy="210" rx="25" ry="40" fill="#E2DED6" stroke="#D4D0C8" strokeWidth="0.5" />
              <rect x="0" y="440" width="720" height="100" fill="#EBE7E0" />
            </svg>
          </div>
          <div className={styles.info}>
            <div className={styles.tag}>Residencial Privado</div>
            <div className={styles.name}>Casa Angel</div>
            <div className={styles.meta}><span>Pinamar, Argentina</span><span>—</span><span>2025–2026</span></div>
          </div>
          <div className={styles.hoverLine} />
        </div>

        {/* Proyecto 2: Placeholder */}
        <div className={`${styles.card} reveal rd2`}>
          <div className={styles.placeholder}>
            <svg viewBox="0 0 720 540" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
              <rect width="720" height="540" fill="#FAFAF7" />
              <rect x="80" y="180" width="560" height="260" fill="none" stroke="#D4D0C8" strokeWidth="1" />
              <rect x="60" y="165" width="600" height="18" fill="#EBE7E0" stroke="#D4D0C8" strokeWidth="0.5" />
              <rect x="80" y="200" width="560" height="30" fill="#F2EFE9" stroke="#D4D0C8" strokeWidth="0.4" />
              <rect x="80" y="250" width="560" height="30" fill="#F2EFE9" stroke="#D4D0C8" strokeWidth="0.4" />
              <rect x="80" y="300" width="560" height="30" fill="#F2EFE9" stroke="#D4D0C8" strokeWidth="0.4" />
              <line x1="200" y1="180" x2="200" y2="440" stroke="#E2DED6" strokeWidth="0.5" />
              <line x1="360" y1="180" x2="360" y2="440" stroke="#E2DED6" strokeWidth="0.5" />
              <line x1="520" y1="180" x2="520" y2="440" stroke="#E2DED6" strokeWidth="0.5" />
              <rect x="80" y="440" width="560" height="30" fill="#EBE7E0" />
              <rect x="0" y="470" width="720" height="70" fill="#E8E5DD" />
            </svg>
          </div>
          <div className={styles.info}>
            <div className={styles.tag}>Reforma y modernizacion</div>
            <div className={styles.name}>Oficina Urbetrack</div>
            <div className={styles.meta}><span>Av. Rivadavia 4260, CABA</span><span>—</span><span>2026</span></div>
          </div>
          <div className={styles.hoverLine} />
        </div>
      </div>
      <div className={`${styles.footer} reveal`}>
        <a href="#fadu" className="btn-ghost">
          Ver todos los proyectos
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1" /><polyline points="8,2 13,7 8,12" stroke="currentColor" strokeWidth="1" fill="none" /></svg>
        </a>
      </div>
    </section>
  );
}
