import { SiteNav } from '@/components/site-nav/SiteNav';
import { Footer } from '@/components/footer/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Cierre } from './sections/Cierre';
import { FachadaReveal } from '@/components/fachada-reveal/FachadaReveal';
import { VideoShowcase } from '@/components/vision/VideoShowcase';
import { Proceso } from '@/components/proceso/Proceso';
import { AnteproyectoExplorer } from './AnteproyectoExplorer';
import s from './CasaAngel.module.css';
import { ElevatorJourney } from './ElevatorJourney';
import { CurrentRenders, ProjectDevelopment } from './CurrentRenders';
export function CasaAngelCase() {
  return <>
    <SiteNav initialContext="Casa Ángel" />
    <main className={s.page}>
      <section id="proyecto" aria-label="Proyecto de Casa Ángel" data-chapter="Casa Ángel · Proyecto">
        <FachadaReveal projectHero />
        <Proceso />
        <VideoShowcase />
      </section>
      <CurrentRenders />
      <ElevatorJourney />
      <AnteproyectoExplorer />
      <ProjectDevelopment />
      <Cierre />
    </main>
    <Footer /><ScrollReveal />
  </>;
}
