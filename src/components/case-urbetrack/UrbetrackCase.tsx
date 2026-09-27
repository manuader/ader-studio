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
import { projects, lineCover } from '@/components/proyectos/projects';

const OTHERS = ['/proyectos/casa-angel', '/proyectos/fadu'].map((href) => {
  const p = projects.find((x) => x.href === href)!;
  return { href, tag: p.tag, name: p.name, place: p.location, img: lineCover(href) };
});

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.2" />
    <polyline points="8,2 13,7 8,12" stroke="currentColor" strokeWidth="1.2" fill="none" />
  </svg>
);

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

        <section className={s.others} data-chapter="Otros proyectos" aria-labelledby="ub-others">
          <div className={s.othersHead}>
            <div className={`${s.kicker} reveal`}>Seguir recorriendo</div>
            <h2 id="ub-others" className={`${s.splitTitle} reveal rd1`}>Otros<br /><em>proyectos</em></h2>
          </div>
          <ul className={s.othersList}>
            {OTHERS.map((o, i) => (
              <li key={o.href} className={`reveal rd${i + 1}`}>
                <Link href={o.href} className={s.otherCard}>
                  <span className={s.otherImg}>
                    <Image src={o.img.src} alt={o.img.alt} width={o.img.w} height={o.img.h} sizes="(max-width: 768px) 100vw, 45vw" loading="lazy" />
                  </span>
                  <span className={s.otherMeta}>
                    <span className={s.otherTag}>{o.tag}</span>
                    <span className={s.otherName}>{o.name}</span>
                    <span className={s.otherPlace}>{o.place}</span>
                  </span>
                  <span className={s.otherArrow}><Arrow /></span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={s.cta}>
          <div>
            <div className={`${s.kicker} reveal`}>Tu proyecto</div>
            <h2 className={`${s.splitTitle} reveal rd1`}>¿Hablamos<br /><em>del tuyo?</em></h2>
          </div>
          <div className={`${s.ctaActions} reveal rd2`}>
            <Link href="/#contacto" className="btn-primary">
              Iniciar un proyecto
              <Arrow />
            </Link>
            <Link href="/proyectos" className="btn-ghost">Ver todos los proyectos</Link>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
