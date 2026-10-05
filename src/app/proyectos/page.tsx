import type { Metadata } from 'next';
import { SiteNav } from '@/components/site-nav/SiteNav';
import { Footer } from '@/components/footer/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { IndexHero } from '@/components/proyectos-index/IndexHero';
import { ProjectIndex } from '@/components/proyectos-index/ProjectIndex';
import { Closing } from '@/components/proyectos-index/Closing';

export const metadata: Metadata = {
  title: 'Proyectos — Ader Studio',
  description:
    'Proyectos de Ader Studio: Casa Piaggio, Casa Ángel y Oficina Urbetrack.',
};

export default function ProyectosPage() {
  return (
    <>
      <SiteNav initialContext="Proyectos" />
      <main>
        <IndexHero />
        <ProjectIndex />
        <Closing />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
