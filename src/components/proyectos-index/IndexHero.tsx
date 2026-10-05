'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Film } from '@/components/portfolio/shared/Film';
import { casaAngel } from '@/components/portfolio/data/cases';
import s from './IndexHero.module.css';

export function IndexHero() {
  const filmRef = useRef<HTMLDivElement>(null);
  const [missing, setMissing] = useState(false);

  // Si el film todavía no está publicado, se muestra una portada fija en su lugar.
  useEffect(() => {
    const img = filmRef.current?.querySelector('img');
    if (!img) return;
    const fail = () => setMissing(true);
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener('error', fail);
    return () => img.removeEventListener('error', fail);
  }, []);

  return (
    <header className={s.hero} data-chapter="Proyectos">
      <div className={s.top}>
        <div>
          <div className={`sec-label ${s.label}`}>Portfolio</div>
          <h1 className={s.title}>
            <span className={s.line}><span>Proyectos</span></span>
            <span className={s.line}><em>de la línea a la obra.</em></span>
          </h1>
        </div>
        <p className={s.lede}>
          Casa Piaggio, Casa Ángel y Oficina Urbetrack: tres proyectos, tres formas de responder al lugar.
        </p>
      </div>

      <div ref={filmRef} className={s.film} data-missing={missing || undefined}>
        <Film name="obra" label="Film de obra de Ader Studio" className={s.filmInner} />
        {missing && (
          <Image
            src={casaAngel.hero.src}
            alt="Casa Angel, Pinamar: render de la casa entre los pinos"
            width={casaAngel.hero.w}
            height={casaAngel.hero.h}
            sizes="(max-width: 768px) 100vw, calc(100vw - 80px)"
            className={s.fallback}
          />
        )}
      </div>
    </header>
  );
}
