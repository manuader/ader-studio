import styles from './Proyectos.module.css';

export function Proyectos() {
  return (
    <section id="proyectos" className={styles.proyectos}>
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
              <rect width="720" height="540" fill="#111" />
              <rect x="160" y="140" width="400" height="300" fill="none" stroke="#222" strokeWidth="1" />
              <rect x="160" y="140" width="200" height="300" fill="#161616" />
              <rect x="360" y="140" width="200" height="200" fill="#131313" />
              <line x1="160" y1="260" x2="560" y2="260" stroke="#1e1e1e" strokeWidth="0.5" />
              <rect x="180" y="160" width="70" height="80" fill="#0e0e0e" stroke="#222" strokeWidth="0.4" />
              <rect x="270" y="160" width="70" height="80" fill="#0e0e0e" stroke="#222" strokeWidth="0.4" />
              <rect x="380" y="160" width="80" height="60" fill="#0e0e0e" stroke="#222" strokeWidth="0.4" />
              <rect x="180" y="280" width="70" height="80" fill="#0e0e0e" stroke="#222" strokeWidth="0.4" />
              <rect x="300" y="350" width="60" height="90" fill="#080808" stroke="#222" strokeWidth="0.5" />
              <line x1="80" y1="440" x2="80" y2="200" stroke="#1a1a1a" strokeWidth="2" />
              <ellipse cx="80" cy="190" rx="30" ry="50" fill="#141414" stroke="#1e1e1e" strokeWidth="0.5" />
              <line x1="620" y1="440" x2="620" y2="220" stroke="#1a1a1a" strokeWidth="2" />
              <ellipse cx="620" cy="210" rx="25" ry="40" fill="#141414" stroke="#1e1e1e" strokeWidth="0.5" />
              <rect x="0" y="440" width="720" height="100" fill="#0d0d0d" />
            </svg>
          </div>
          <div className={styles.info}>
            <div className={styles.tag}>Residencial Privado</div>
            <div className={styles.name}>Casa Angel</div>
            <div className={styles.meta}><span>Pinamar, Argentina</span><span>—</span><span>2024–2025</span></div>
          </div>
          <div className={styles.hoverLine} />
        </div>

        {/* Proyecto 2: Placeholder */}
        <div className={`${styles.card} reveal rd2`}>
          <div className={styles.placeholder}>
            <svg viewBox="0 0 720 540" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
              <rect width="720" height="540" fill="#0e0e0e" />
              <rect x="80" y="180" width="560" height="260" fill="none" stroke="#1e1e1e" strokeWidth="1" />
              <rect x="60" y="165" width="600" height="18" fill="#161616" stroke="#1e1e1e" strokeWidth="0.5" />
              <rect x="80" y="200" width="560" height="30" fill="#0d0d0d" stroke="#1e1e1e" strokeWidth="0.4" />
              <rect x="80" y="250" width="560" height="30" fill="#0d0d0d" stroke="#1e1e1e" strokeWidth="0.4" />
              <rect x="80" y="300" width="560" height="30" fill="#0d0d0d" stroke="#1e1e1e" strokeWidth="0.4" />
              <line x1="200" y1="180" x2="200" y2="440" stroke="#181818" strokeWidth="0.5" />
              <line x1="360" y1="180" x2="360" y2="440" stroke="#181818" strokeWidth="0.5" />
              <line x1="520" y1="180" x2="520" y2="440" stroke="#181818" strokeWidth="0.5" />
              <rect x="80" y="440" width="560" height="30" fill="#131313" />
              <rect x="0" y="470" width="720" height="70" fill="#0a0a0a" />
            </svg>
          </div>
          <div className={styles.info}>
            <div className={styles.tag}>Próximamente</div>
            <div className={styles.name}>Proyecto 02</div>
            <div className={styles.meta}><span>Buenos Aires</span><span>—</span><span>2025</span></div>
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
