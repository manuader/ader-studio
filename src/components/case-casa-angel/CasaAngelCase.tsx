import { PortfolioNav } from '@/components/portfolio/shared/PortfolioNav';
import { Footer } from '@/components/footer/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Hero } from './sections/Hero';
import { Indice } from './sections/Indice';
import { Etapa1 } from './sections/Etapa1';
import { Etapa2 } from './sections/Etapa2';
import { Etapa3 } from './sections/Etapa3';
import { Etapa4 } from './sections/Etapa4';
import { Cierre } from './sections/Cierre';
import s from './CasaAngel.module.css';

export function CasaAngelCase() {
  return (
    <>
      <PortfolioNav initialChapter="Casa Angel" />
      <main className={s.page}>
        <Hero />
        <Indice />
        <Etapa1 />
        <Etapa2 />
        <Etapa3 />
        <Etapa4 />
        <Cierre />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
