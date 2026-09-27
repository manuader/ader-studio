import { LogoIntro } from '@/components/logo-intro/LogoIntro';
import { SiteNav } from '@/components/site-nav/SiteNav';
import { Hero } from '@/components/hero/Hero';
import { FachadaReveal } from '@/components/fachada-reveal/FachadaReveal';
import { Vision } from '@/components/vision/Vision';
import { VideoShowcase } from '@/components/vision/VideoShowcase';
import { Bim } from '@/components/bim/Bim';
import { RendersGallery } from '@/components/renders-gallery/RendersGallery';
import { Fotografia } from '@/components/fotografia/Fotografia';
import { Proceso } from '@/components/proceso/Proceso';
import { Proyectos } from '@/components/proyectos/Proyectos';
import { Metodologia } from '@/components/meotodlogia/Metodologia';
import { Contacto } from '@/components/contacto/Contacto';
import { Footer } from '@/components/footer/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';

export default function Home() {
  return (
    <>
      <LogoIntro />
      <SiteNav home />
      <main>
        <Hero />
        <FachadaReveal />
        <Vision />
        <Proceso />
        <VideoShowcase />
        <Bim />
        <Proyectos />
        <RendersGallery />
        <Fotografia />
        <Metodologia />
        <Contacto />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
