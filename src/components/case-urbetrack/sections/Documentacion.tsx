'use client';

import { useState } from 'react';
import Image from 'next/image';
import s from '../UrbetrackCase.module.css';
import { CAPITULOS, docThumb } from '../data';

const ROW_A = Array.from({ length: 24 }, (_, i) => i + 1);
const ROW_B = Array.from({ length: 24 }, (_, i) => i + 25);

export function Documentacion() {
  const [chapter, setChapter] = useState<number | null>(null);
  const pages = chapter === null ? null : CAPITULOS[chapter].pages;

  const row = (list: number[], reverse: boolean) => (
    <div className={`${s.marquee} ${reverse ? s.marqueeReverse : ''} ${pages ? s.marqueePaused : ''}`}>
      <div className={s.marqueeTrack}>
        {[...list, ...list].map((n, i) => (
          <div
            key={`${n}-${i}`}
            className={`${s.sheet} ${pages && !pages.includes(n) ? s.sheetDim : ''} ${pages?.includes(n) ? s.sheetOn : ''}`}
            aria-hidden={i >= list.length}
          >
            <Image src={docThumb(n)} alt={`Lámina ${n}`} width={360} height={508} sizes="180px" />
            <span>{String(n).padStart(2, '0')}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className={s.docs} data-chapter="Documentación">
      <div className={s.docsHead}>
        <div>
          <div className={`${s.kicker} reveal`}>Carpeta técnica</div>
          <h2 className={`${s.splitTitle} reveal rd1`}>
            48 láminas,<br /><em>ninguna improvisación</em>
          </h2>
        </div>
        <p className={`${s.splitLead} reveal rd2`}>
          Modelado en Revit y documentado disciplina por disciplina: de la demolición a la última
          grifería. Así documentamos cada proyecto antes de llegar a obra.
        </p>
      </div>
      <div className={`${s.chapters} reveal`}>
        {CAPITULOS.map((c, i) => (
          <button
            key={c.num}
            type="button"
            className={`${s.chapter} ${chapter === i ? s.chapterOn : ''}`}
            aria-pressed={chapter === i}
            onClick={() => setChapter(chapter === i ? null : i)}
          >
            <span>{c.num}</span>
            {c.name}
          </button>
        ))}
      </div>
      {pages ? <div key={chapter} className={s.selectedSheets}>
        <div className={s.selectedTrack} style={{ animationDuration: `${Math.max(20, pages.length * 4)}s` }}>
          {[0, 1].map(copy => <div className={s.selectedGroup} key={copy} aria-hidden={copy === 1}>
            {pages.map(n => <div className={s.sheet} key={n}>
              <Image src={docThumb(n)} alt={`Lámina ${n} · ${CAPITULOS[chapter!].name}`} width={360} height={508} sizes="(max-width: 700px) 42vw, 180px" />
              <span>{String(n).padStart(2, '0')}</span>
            </div>)}
          </div>)}
        </div>
      </div> : <>{row(ROW_A, false)}{row(ROW_B, true)}</>}

    </section>
  );
}
