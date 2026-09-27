import type { Metadata } from 'next';
import { CasaAngelCase } from '@/components/case-casa-angel/CasaAngelCase';

export const metadata: Metadata = {
  title: 'Casa Angel — Ader Studio',
  description:
    'Casa Angel, vivienda residencial privada en Pinamar, Argentina (2024–2025): un refugio elevado en el bosque, contado en las cuatro etapas del proyecto.',
};

export default function CasaAngelPage() {
  return <CasaAngelCase />;
}
