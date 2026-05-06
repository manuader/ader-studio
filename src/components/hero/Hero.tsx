import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.content}>
        <div className={`${styles.eyebrow} reveal`}>Ader Studio — Buenos Aires, Argentina</div>
        <h1 className={`${styles.headline} reveal rd1`}>
          Todos los proyectos tienen un norte.
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
