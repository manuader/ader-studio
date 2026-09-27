import Image from 'next/image';
import { CASE } from '../data';
import s from '../CasaAngel.module.css';

const FICHA = [
  { k: 'Tipología', v: 'Residencial privado' },
  { k: 'Ubicación', v: CASE.location },
  { k: 'Proyecto', v: CASE.years },
  { k: 'Desarrollo', v: '4 etapas' },
];

export function Hero() {
  return (
    <>
      <section className={s.hero} data-chapter="Casa Angel" aria-labelledby="ca-title">
        <div className={s.heroFrame}>
          <Image
            src={CASE.hero.src}
            alt="Casa Angel: fachada al patio entre los pinos, con la galería de la planta alta"
            width={CASE.hero.w}
            height={CASE.hero.h}
            sizes="(min-width: 1600px) 1600px, 100vw"
            className={s.heroImg}
            priority
          />
          <div className={s.heroShade} />
        </div>
        <div className={s.heroCopy}>
          <p className={s.heroKicker}>
            <span>Caso de estudio</span>
          </p>
          <h1 id="ca-title" className={s.heroTitle}>
            <span className={s.heroLine}><span>Casa Angel</span></span>
            <span className={s.heroLine}><em>Un refugio elevado en el bosque</em></span>
          </h1>
        </div>
        <a href="#indice" className={s.heroScroll}>
          <span>Recorrer el proyecto</span>
          <i aria-hidden="true" />
        </a>
      </section>

      <dl className={s.ficha}>
        {FICHA.map((f, i) => (
          <div key={f.k} className={`${s.fichaCell} reveal rd${i + 1}`}>
            <dt>{f.k}</dt>
            <dd>{f.v}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
