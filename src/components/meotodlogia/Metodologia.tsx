import Image from 'next/image';
import styles from './Metodologia.module.css';

const TOOLS = [
  { src: '/images/carrousel/Carrousel Software Logo.png', alt: 'Software' },
  { src: '/images/carrousel/Gemini Logo.png', alt: 'Gemini' },
  { src: '/images/carrousel/Carrousel Software Logo (1).png', alt: 'Software' },
  { src: '/images/carrousel/OpenAI Logo.png', alt: 'OpenAI' },
  { src: '/images/carrousel/Carrousel Software Logo (2).png', alt: 'Software' },
  { src: '/images/carrousel/Carrousel Software Logo 5.png', alt: 'Software' },
  { src: '/images/carrousel/Carrousel Software Logo 6.png', alt: 'Software' },
];

const STAGES = [
  {
    num: '01',
    name: 'Arquitectura',
    desc: 'Diseño integral de proyectos nuevos y renovaciones en tipologías residenciales, comerciales y culturales. Respuesta precisa al contexto y el programa.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="#1A1917" strokeWidth="1">
        <rect x="6" y="8" width="28" height="24" strokeOpacity="0.6" />
        <line x1="6" y1="18" x2="34" y2="18" strokeOpacity="0.4" />
        <line x1="20" y1="8" x2="20" y2="32" strokeOpacity="0.4" />
        <rect x="10" y="22" width="6" height="8" strokeOpacity="0.5" />
      </svg>
    ),
  },
  {
    num: '02',
    name: 'Anteproyecto',
    desc: 'Desarrollo de la idea arquitectónica: plantas, cortes, fachadas y volumetrías que definen la esencia del proyecto antes de la documentación técnica.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="#1A1917" strokeWidth="1">
        <polygon points="20,4 36,32 4,32" strokeOpacity="0.6" />
        <line x1="12" y1="22" x2="28" y2="22" strokeOpacity="0.4" />
      </svg>
    ),
  },
  {
    num: '03',
    name: 'Proyecto Ejecutivo',
    desc: 'Documentación técnica completa en BIM: planos de arquitectura, estructura, instalaciones y legajo municipal. Todo coordinado en un modelo único.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="#1A1917" strokeWidth="1">
        <rect x="5" y="5" width="30" height="30" strokeOpacity="0.6" />
        <line x1="5" y1="15" x2="35" y2="15" strokeOpacity="0.4" />
        <line x1="5" y1="25" x2="35" y2="25" strokeOpacity="0.4" />
        <line x1="15" y1="5" x2="15" y2="35" strokeOpacity="0.4" />
        <line x1="25" y1="5" x2="25" y2="35" strokeOpacity="0.4" />
      </svg>
    ),
  },
  {
    num: '04',
    name: 'Dirección de Obra',
    desc: 'Supervisión y conducción técnica durante la construcción. Garantizamos que el proyecto construido sea fiel a la intención del diseño, hasta el último detalle.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="#1A1917" strokeWidth="1">
        <circle cx="20" cy="20" r="14" strokeOpacity="0.6" />
        <line x1="20" y1="6" x2="20" y2="14" strokeOpacity="0.5" />
        <line x1="20" y1="26" x2="20" y2="34" strokeOpacity="0.5" />
        <line x1="6" y1="20" x2="14" y2="20" strokeOpacity="0.5" />
        <line x1="26" y1="20" x2="34" y2="20" strokeOpacity="0.5" />
      </svg>
    ),
  },
];

export function Metodologia() {
  return (
    <section id="metodologia" className={styles.metodologia}>
      <div className="sec-label reveal">Lo que hacemos</div>
      <div className="sec-title reveal rd1" style={{ marginBottom: 0 }}>Metodologia de trabajo</div>
      <div className={styles.grid}>
        {STAGES.map((stage, i) => (
          <div key={stage.num} className={`${styles.card} reveal rd${i + 1}`}>
            <div className={styles.icon}>{stage.icon}</div>
            <div className={styles.num}>{stage.num}</div>
            <div className={styles.name}>{stage.name}</div>
            <p className={styles.desc}>{stage.desc}</p>
          </div>
        ))}
      </div>

      <div className={`${styles.carousel} reveal`}>
        <div className={styles.carouselLabel}>Herramientas de trabajo</div>
        <div className={styles.carouselTrack}>
          <div className={styles.carouselSlide}>
            {TOOLS.map((logo, i) => (
              <div key={i} className={styles.carouselItem}>
                <Image src={logo.src} alt={logo.alt} width={180} height={72} className={styles.carouselImg} />
              </div>
            ))}
          </div>
          <div className={styles.carouselSlide} aria-hidden="true">
            {TOOLS.map((logo, i) => (
              <div key={`dup-${i}`} className={styles.carouselItem}>
                <Image src={logo.src} alt={logo.alt} width={180} height={72} className={styles.carouselImg} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
