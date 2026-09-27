import type { Metadata } from 'next';
import { BauhausCase } from '@/components/case-bauhaus/BauhausCase';

export const metadata: Metadata = {
  title: 'Bauhaus-Universität Weimar — Ader Studio',
  description:
    'Intercambio académico en la Bauhaus-Universität Weimar (Alemania, 2024): fotogrametría, planificación urbana sostenible, IA generativa aplicada al diseño de objetos y crítica de la inteligencia artificial.',
};

export default function BauhausWeimarPage() {
  return <BauhausCase />;
}
