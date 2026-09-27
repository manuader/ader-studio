import type { Metadata } from 'next';
import { PortfolioNav } from '@/components/portfolio/shared/PortfolioNav';
import { Footer } from '@/components/footer/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { IndexHero } from '@/components/proyectos-index/IndexHero';
import { ProjectIndex } from '@/components/proyectos-index/ProjectIndex';
import { Closing } from '@/components/proyectos-index/Closing';

export const metadata: Metadata = {
  title: 'Proyectos — Ader Studio',
  description:
    'Índice de proyectos de Ader Studio: Casa Angel en Pinamar, la Oficina Urbetrack en CABA, la formación en FADU – UBA y el intercambio en la Bauhaus-Universität Weimar.',
};

export default function ProyectosPage() {
  return (
    <>
      <PortfolioNav initialChapter="Proyectos" />
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
