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
        <div className={`${styles.cardWrap} reveal rd1`}>
          <div className={styles.card}>
            <img
              src="/images/projects/CASA ANGEL.png"
              alt="Casa Angel"
              className={styles.cardImg}
              draggable={false}
            />
            <div className={styles.hoverLine} />
          </div>
          <div className={styles.info}>
            <div className={styles.tag}>Residencial Privado</div>
            <div className={styles.name}>Casa Angel</div>
            <div className={styles.meta}><span>Pinamar, Argentina</span><span>—</span><span>2025–2026</span></div>
          </div>
        </div>

        {/* Proyecto 2: Urbetrack */}
        <div className={`${styles.cardWrap} reveal rd2`}>
          <div className={styles.card}>
            <img
              src="/images/projects/URBETRACK.png"
              alt="Oficina Urbetrack"
              className={styles.cardImg}
              draggable={false}
            />
            <div className={styles.hoverLine} />
          </div>
          <div className={styles.info}>
            <div className={styles.tag}>Reforma y modernizacion</div>
            <div className={styles.name}>Oficina Urbetrack</div>
            <div className={styles.meta}><span>Av. Rivadavia 4260, CABA</span><span>—</span><span>2026</span></div>
          </div>
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
