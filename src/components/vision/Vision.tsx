import styles from './Vision.module.css';

const PILLARS = [
  { num: '01', title: 'Diseño Contextual', desc: 'Cada proyecto responde al sitio, el clima, los materiales disponibles y el contexto cultural. No existe una forma predeterminada — existe una respuesta específica.' },
  { num: '02', title: 'Honestidad Material', desc: 'Los materiales se usan por lo que son, no por lo que parecen. La estructura se expresa, la textura se celebra, el detalle se cuida.' },
  { num: '03', title: 'Tecnología + Diseño', desc: 'La metodología BIM no es solo un software — es una forma de pensar. Integramos inteligencia tecnológica en cada etapa del proceso de diseño.' },
  { num: '04', title: 'Ezequiel Ader', desc: 'Arquitecto formado en FADU UBA, con experiencia en Bauhaus-Universität Weimar. 8 años de formación integrando diseño académico, tecnología y práctica profesional.' },
];

export function Vision() {
  return (
    <section id="vision" className={styles.vision}>
      <svg className={styles.bgGrid} viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
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
