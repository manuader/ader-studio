import styles from './Vision.module.css';

const PILLARS = [
  { num: '01', title: 'Diseño Contextual', desc: 'Cada proyecto responde al sitio, el clima, los materiales disponibles y el contexto cultural. No existe una forma predeterminada — existe una respuesta específica.' },
  { num: '02', title: 'Honestidad Material', desc: 'Los materiales se usan por lo que son, no por lo que parecen. La estructura se expresa, la textura se celebra, el detalle se cuida.' },
  { num: '03', title: 'Tecnología + Diseño', desc: 'La metodología BIM no es solo un software — es una forma de pensar. Integramos inteligencia tecnológica en cada etapa del proceso de diseño.' },
  { num: '04', title: 'Ezequiel Ader', desc: 'Arquitecto formado en FADU UBA, con experiencia en Bauhaus-Universität Weimar. Tambien Maestro Mayor de Obras de la Escuela Tecnica ORT. 8 años de formación integrando diseño académico, tecnología y práctica profesional.' },
];

export function Vision() {
  return (
    <section id="vision" className={styles.vision}>
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

      <svg className={styles.bgGrid} viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1A1917" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <div className="sec-label reveal">El Estudio</div>
      <div className={styles.grid}>
        <div className="reveal rd1">
          <div className="sec-title">
            Diseñamos<br />desde<br /><em>el contexto,</em><br />no desde<br />la forma.
          </div>
        </div>
        <div className={`${styles.right} reveal rd2`}>
          <div className={styles.pillars}>
            {PILLARS.map((p) => (
              <div key={p.num} className={styles.pillar}>
                <div className={styles.pillarNum}>{p.num}</div>
                <div>
                  <div className={styles.pillarTitle}>{p.title}</div>
                  <p className={styles.pillarDesc}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
