import Image from 'next/image';
import { CASE, E1, E2, E3, E4, stageName } from '../data';
import s from '../CasaAngel.module.css';

const ROWS = [
  { ch: E1, thumb: E1.images[3] },
  { ch: E2, thumb: E2.images[0] },
  { ch: E3, thumb: E3.images[4] },
  { ch: E4, thumb: E4.images[3] },
];

/** Índice de las cuatro etapas: funciona como navegación a cada capítulo. */
export function Indice() {
  return (
    <section id="indice" className={s.indice} data-chapter="Casa Angel">
      <div className={s.indiceIntro}>
        <div className="sec-label reveal">El proyecto</div>
        <p className={`${s.indiceLede} reveal rd1`}>{CASE.lede}</p>
      </div>
      <nav aria-label="Etapas del proyecto">
        <ol className={s.indiceList}>
          {ROWS.map(({ ch, thumb }, i) => (
            <li key={ch.key} className={`reveal rd${i + 1}`}>
              <a href={`#${ch.key}`} className={s.indiceRow}>
                <span className={s.indiceNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={s.indiceName}>
                  <strong>Etapa {i + 1}</strong>
                  <em>{stageName(ch)}</em>
                </span>
                <span className={s.indiceYear}>{ch.year}</span>
                <span className={s.indiceThumb} aria-hidden="true">
                  <Image src={thumb.src} alt="" width={thumb.w} height={thumb.h} sizes="200px" loading="lazy" />
                </span>
                <svg className={s.indiceArrow} width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" strokeWidth="1" />
                  <polyline points="2,8 7,13 12,8" stroke="currentColor" strokeWidth="1" fill="none" />
                </svg>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}
