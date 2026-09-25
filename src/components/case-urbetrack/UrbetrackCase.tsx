'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import s from './UrbetrackCase.module.css';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Footer } from '@/components/footer/Footer';
import { Hero } from './sections/Hero';
import { Memoria } from './sections/Memoria';
import { Pisos } from './sections/Pisos';
import { Demolicion } from './sections/Demolicion';
import { Plantas } from './sections/Plantas';
import { Cortes } from './sections/Cortes';
import { Capas } from './sections/Capas';
import { Materialidad } from './sections/Materialidad';
import { Resultado } from './sections/Resultado';
import { Documentacion } from './sections/Documentacion';

function CaseNav() {
  const barRef = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState('Oficinas Urbetrack');

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      barRef.current?.style.setProperty('transform', `scaleX(${max > 0 ? window.scrollY / max : 0})`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setChapter((e.target as HTMLElement).dataset.chapter ?? '');
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    document.querySelectorAll('[data-chapter]').forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <nav className={s.nav}>
      <Link href="/" className={s.navBrand}>
        <Image src="/images/logo.jpeg" alt="Ader Studio" width={36} height={36} className={s.navLogo} />
        <span>Ader Studio</span>
      </Link>
      <div className={s.navChapter} key={chapter}>{chapter}</div>
      <div className={s.navRight}>
        <Link href="/#proyectos" className={s.navLink}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><polyline points="9,2 4,7 9,12" stroke="currentColor" strokeWidth="1.2" /></svg>
          Proyectos
        </Link>
        <Link href="/#contacto" className={s.navLink}>Contacto</Link>
      </div>
      <div className={s.navProgress}><div ref={barRef} /></div>
    </nav>
  );
}

export function UrbetrackCase() {
  // La home revela el cursor propio después de su intro; acá no hay intro.
  useEffect(() => {
    document.documentElement.classList.add('cursor-ready');
  }, []);

  return (
    <>
      <CaseNav />
      <main className={s.page}>
        <Hero />
        <Memoria />
        <Pisos />
        <Demolicion />
        <Plantas />
        <Cortes />
        <Capas />
        <Materialidad />
        <Resultado />
        <Documentacion />

        <section className={s.cierre} data-chapter="Oficinas Urbetrack">
          <Image
            src="/images/renders/02 - Oficina.png"
            alt="Planta de trabajo de Urbetrack"
            fill
            sizes="100vw"
            className={s.cierreImg}
          />
          <div className={s.cierreShade} />
          <blockquote className={s.cierreQuote}>
            <span className="reveal">Tres pisos.</span>
            <em className="reveal rd1">Una misma identidad.</em>
          </blockquote>
        </section>

        <section className={s.cta}>
          <div>
            <div className={`${s.kicker} reveal`}>Tu proyecto</div>
            <h2 className={`${s.splitTitle} reveal rd1`}>¿Hablamos<br /><em>del tuyo?</em></h2>
          </div>
          <div className={`${s.ctaActions} reveal rd2`}>
            <Link href="/#contacto" className="btn-primary">
              Iniciar un proyecto
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.2" /><polyline points="8,2 13,7 8,12" stroke="currentColor" strokeWidth="1.2" fill="none" /></svg>
            </Link>
            <Link href="/#proyectos" className="btn-ghost">Ver más proyectos</Link>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
