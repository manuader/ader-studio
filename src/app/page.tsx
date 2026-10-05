import { LogoIntro } from '@/components/logo-intro/LogoIntro';
import { SiteNav } from '@/components/site-nav/SiteNav';
import { Hero } from '@/components/hero/Hero';
import { Vision } from '@/components/vision/Vision';
import { Bim } from '@/components/bim/Bim';
import { RendersGallery } from '@/components/renders-gallery/RendersGallery';
import { Fotografia } from '@/components/fotografia/Fotografia';
import { Proyectos } from '@/components/proyectos/Proyectos';
import { Metodologia } from '@/components/meotodlogia/Metodologia';
import { Contacto } from '@/components/contacto/Contacto';
import { Footer } from '@/components/footer/Footer';
import { HomeCurves } from '@/components/hero/HomeCurves';
import home from './Home.module.css';
import { ScrollReveal } from '@/components/ScrollReveal';

export default function Home() {
  return (
    <>
      <LogoIntro />
      <SiteNav home />
      <main className={home.home}><HomeCurves />
        <Hero />
        <Vision />
        <Metodologia />
        <Bim />
        <RendersGallery />
        <Proyectos />
        <Fotografia />
        <Contacto />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
