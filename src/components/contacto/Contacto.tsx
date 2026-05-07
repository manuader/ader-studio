import styles from './Contacto.module.css';

export function Contacto() {
  return (
    <section id="contacto" className={styles.contacto}>
      {/* Decorative oscillating lines */}
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

      <svg className={styles.bg} viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid2" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#1A1917" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid2)" />
      </svg>
      <div className={`${styles.eyebrow} reveal`}>Nuevos proyectos</div>
      <div className={`${styles.title} reveal rd1`}>
        Construyamos<br /><em>algo juntos.</em>
      </div>
      <p className={`${styles.sub} reveal rd2`}>Aportando valor arquitectónico — Buenos Aires, Argentina</p>
      <div className={`${styles.cta} reveal rd3`}>
        <a href="mailto:ezeader@gmail.com" className="btn-primary">
          Agendar reunión
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1" /><polyline points="8,2 13,7 8,12" stroke="currentColor" strokeWidth="1" fill="none" /></svg>
        </a>
        <a href="mailto:ezeader@gmail.com" className="btn-ghost">Enviar mensaje</a>
      </div>
      <div className={`${styles.infoLinks} reveal rd4`}>
        <a href="https://instagram.com/eze.ader" className={styles.link} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1" /><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1" /><circle cx="12" cy="4" r="1" fill="currentColor" /></svg>
          @eze.ader
        </a>
        <a href="mailto:ezeader@gmail.com" className={styles.link}>
          <svg viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1" /><polyline points="1,4 8,10 15,4" stroke="currentColor" strokeWidth="1" fill="none" /></svg>
          ezeader@gmail.com
        </a>
        <span className={styles.link} style={{ cursor: 'default' }}>
          <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1" /><path d="M8,14 C8,14 2,10 2,7 A6,6 0 0,1 14,7 C14,10 8,14 8,14Z" stroke="currentColor" strokeWidth="1" fill="none" /></svg>
          Buenos Aires, Argentina
        </span>
      </div>
    </section>
  );
}
