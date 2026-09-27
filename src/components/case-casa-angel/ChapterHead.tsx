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
          Entrega{chapter.year ? ` ${chapter.year}` : ''}
        </div>
        <h2 className={`${s.title} reveal rd1`}>
          Etapa {n}
          <br />
          <em>{stageName(chapter)}</em>
        </h2>
      </div>
      <div className={s.headText}>
        {chapter.text.map((p) => (
          <p key={p.slice(0, 24)} className="reveal rd2">{p}</p>
        ))}
      </div>
    </header>
  );
}
