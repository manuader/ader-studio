import { LogoIntro } from '@/components/logo-intro/LogoIntro';
import { Navbar } from '@/components/navbar/Navbar';
import { Hero } from '@/components/hero/Hero';
import { FachadaReveal } from '@/components/fachada-reveal/FachadaReveal';
import { Vision } from '@/components/vision/Vision';
import { VideoShowcase } from '@/components/vision/VideoShowcase';
import { Bim } from '@/components/bim/Bim';
import { RendersGallery } from '@/components/renders-gallery/RendersGallery';
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
      <Navbar />
      <main>
        <Hero />
        <VideoShowcase />
        <Vision />
        <FachadaReveal />
        <Bim />
        <RendersGallery />
        <Proceso />
        <Proyectos />
        <Metodologia />
        <Contacto />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
