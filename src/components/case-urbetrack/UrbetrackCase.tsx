'use client';

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
import { SiteNav } from '@/components/site-nav/SiteNav';

export function UrbetrackCase() {
  return (
    <>
      <SiteNav initialContext="Oficinas Urbetrack" />
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
            src="/images/renders/02 - Oficina.webp"
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
