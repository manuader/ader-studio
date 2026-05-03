import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.canvas}>
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="820" x2="1440" y2="820" stroke="#1A1917" strokeWidth="0.6" />
          <rect x="160" y="200" width="380" height="620" stroke="#1A1917" strokeWidth="0.7" />
          <rect x="200" y="160" width="280" height="40" stroke="#1A1917" strokeWidth="0.5" />
          <line x1="160" y1="350" x2="540" y2="350" stroke="#1A1917" strokeWidth="0.3" />
          <line x1="160" y1="500" x2="540" y2="500" stroke="#1A1917" strokeWidth="0.3" />
          <line x1="160" y1="650" x2="540" y2="650" stroke="#1A1917" strokeWidth="0.3" />
          <line x1="320" y1="200" x2="320" y2="820" stroke="#1A1917" strokeWidth="0.3" />
          <line x1="420" y1="200" x2="420" y2="820" stroke="#1A1917" strokeWidth="0.3" />
          <rect x="180" y="220" width="60" height="45" stroke="#1A1917" strokeWidth="0.4" />
          <rect x="260" y="220" width="60" height="45" stroke="#1A1917" strokeWidth="0.4" />
          <rect x="340" y="220" width="60" height="45" stroke="#1A1917" strokeWidth="0.4" />
          <rect x="430" y="220" width="80" height="45" stroke="#1A1917" strokeWidth="0.4" />
          <rect x="180" y="370" width="60" height="45" stroke="#1A1917" strokeWidth="0.4" />
          <rect x="260" y="370" width="60" height="45" stroke="#1A1917" strokeWidth="0.4" />
          <rect x="340" y="370" width="60" height="45" stroke="#1A1917" strokeWidth="0.4" />
          <rect x="430" y="370" width="80" height="45" stroke="#1A1917" strokeWidth="0.4" />
          <rect x="180" y="520" width="60" height="45" stroke="#1A1917" strokeWidth="0.4" />
          <rect x="260" y="520" width="60" height="45" stroke="#1A1917" strokeWidth="0.4" />
          <rect x="340" y="520" width="60" height="45" stroke="#1A1917" strokeWidth="0.4" />
          <rect x="430" y="520" width="80" height="45" stroke="#1A1917" strokeWidth="0.4" />
          <rect x="240" y="720" width="80" height="100" stroke="#1A1917" strokeWidth="0.5" />
          <rect x="620" y="120" width="520" height="700" stroke="#1A1917" strokeWidth="0.7" />
          <line x1="620" y1="280" x2="1140" y2="280" stroke="#1A1917" strokeWidth="0.3" />
          <line x1="620" y1="440" x2="1140" y2="440" stroke="#1A1917" strokeWidth="0.3" />
          <line x1="620" y1="600" x2="1140" y2="600" stroke="#1A1917" strokeWidth="0.3" />
          <line x1="620" y1="700" x2="1140" y2="700" stroke="#1A1917" strokeWidth="0.3" />
          <line x1="750" y1="120" x2="750" y2="820" stroke="#1A1917" strokeWidth="0.3" />
          <line x1="880" y1="120" x2="880" y2="820" stroke="#1A1917" strokeWidth="0.3" />
          <line x1="1010" y1="120" x2="1010" y2="820" stroke="#1A1917" strokeWidth="0.3" />
          <line x1="160" y1="860" x2="540" y2="860" stroke="#1A1917" strokeWidth="0.4" />
          <line x1="160" y1="855" x2="160" y2="865" stroke="#1A1917" strokeWidth="0.4" />
          <line x1="540" y1="855" x2="540" y2="865" stroke="#1A1917" strokeWidth="0.4" />
          <line x1="620" y1="860" x2="1140" y2="860" stroke="#1A1917" strokeWidth="0.4" />
          <line x1="620" y1="855" x2="620" y2="865" stroke="#1A1917" strokeWidth="0.4" />
          <line x1="1140" y1="855" x2="1140" y2="865" stroke="#1A1917" strokeWidth="0.4" />
          <line x1="0" y1="820" x2="720" y2="80" stroke="#1A1917" strokeWidth="0.15" opacity="0.4" />
          <line x1="1440" y1="820" x2="720" y2="80" stroke="#1A1917" strokeWidth="0.15" opacity="0.4" />
        </svg>
      </div>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={`${styles.eyebrow} reveal`}>Ader Studio — Buenos Aires, Argentina</div>
        <h1 className={`${styles.headline} reveal rd1`}>
          Arquitectura argentina 🇦🇷
        </h1>
        <p className={`${styles.sub} reveal rd2`}>
          Aportando valor arquitectónico a través del diseño contextual, la honestidad material y la precisión tecnológica.
        </p>
        <div className={`${styles.cta} reveal rd3`}>
          <a href="#proyectos" className="btn-ghost">
            Ver proyectos
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1" /><polyline points="8,2 13,7 8,12" stroke="currentColor" strokeWidth="1" fill="none" /></svg>
          </a>
          <a href="#contacto" className="btn-text">Agendar reunión →</a>
        </div>
      </div>
      <div className={styles.scroll}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
