import type { Chapter } from '@/components/portfolio/data/cases';
import { stageName } from './data';
import s from './CasaAngel.module.css';

type Props = { chapter: Chapter; n: number; tone?: 'light' | 'dark' };

/** Encabezado de etapa: número grande, título a dos líneas y el texto literal del portfolio. */
export function ChapterHead({ chapter, n, tone = 'light' }: Props) {
  return (
    <header className={`${s.head} ${tone === 'dark' ? s.headDark : ''}`}>
      <div className={s.headNum} aria-hidden="true">
        <span className="reveal">{String(n).padStart(2, '0')}</span>
      </div>
      <div className={s.headTitleCol}>
        <div className={`${s.label} reveal`}>
          Anteproyecto · Entrega{chapter.year ? ` ${chapter.year}` : ''}
        </div>
        <h2 className={`${s.title} reveal rd1`}>
          Etapa {n}
          <br />
          <em>{stageName(chapter)}</em>
        </h2>
      </div>
      <div className={s.headText}>
        <p className="reveal rd2">{[
          '¿Cómo implantarse entre los pinos? La conectividad, el viento, los vecinos y la grilla permiten leer las condiciones del lote.',
          '¿Dónde ubicar cada forma de habitar? El croquis, la implantación y los diagramas exploran el refugio elevado y su relación con el paisaje.',
          '¿Cómo se organiza la propuesta? Las plantas, el corte y las axonométricas permiten contrastar las relaciones entre niveles, estructura y espacios.',
          '¿Cómo se percibiría la casa? Los renders exploran las atmósferas de la propuesta y conectan los dibujos con la experiencia de habitarla.'
        ][n-1]}</p>
        <details className={s.memory}>
          <summary>Leer la memoria de esta etapa</summary>
          {chapter.text.map(p => <p key={p.slice(0,24)}>{p}</p>)}
        </details>
      </div>
    </header>
  );
}
