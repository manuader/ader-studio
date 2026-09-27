import type { Metadata } from 'next';
import { SiteNav } from '@/components/site-nav/SiteNav';
import { FotografiaPage } from '@/components/fotografia/FotografiaPage';
import { Footer } from '@/components/footer/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { series } from '@/components/portfolio/data/fotografia';

const total = series.reduce((n, s) => n + s.photos.length, 0);

export const metadata: Metadata = {
  title: 'Fotografía — Ader Studio',
  description: `Fotografía de arquitectura de Ezequiel Ader: ${total} fotografías en ${series.length} series (${series
    .map((s) => s.title)
    .join(', ')}).`,
};

export default function Page() {
  return (
    <>
      <SiteNav initialContext="Fotografía" />
      <main>
        <FotografiaPage />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
