'use client';
import { OtherProjects } from '@/components/other-projects/OtherProjects';

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
import { Proveedores } from './sections/Proveedores';
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
        <Demolicion />
        <Pisos />
        <Plantas />
        <Cortes />
        <Capas />
        <Materialidad />
        <Resultado />
        <Documentacion />

<Proveedores />

        <OtherProjects current="/proyectos/urbetrack" />

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
