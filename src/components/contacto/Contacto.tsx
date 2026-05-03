import styles from './Contacto.module.css';

export function Contacto() {
  return (
    <section id="contacto" className={styles.contacto}>
      <svg className={styles.bg} viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid2" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
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
