import { LogoIntro } from '@/components/logo-intro/LogoIntro';
import { Navbar } from '@/components/navbar/Navbar';
import { Hero } from '@/components/hero/Hero';
import { Vision } from '@/components/vision/Vision';
import { VideoShowcase } from '@/components/vision/VideoShowcase';
import { Bim } from '@/components/bim/Bim';
import { Proceso } from '@/components/proceso/Proceso';
import { Proyectos } from '@/components/proyectos/Proyectos';
import { Servicios } from '@/components/servicios/Servicios';
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
        <Vision />
        <VideoShowcase />
        <Bim />
        <Proceso />
        <Proyectos />
        <Servicios />
        <Contacto />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
