import type { Metadata } from 'next';
import { PiaggioCase } from '@/components/case-casa-piaggio/PiaggioCase';

export const metadata: Metadata = {
  title: 'Casa Piaggio — Ader Studio',
  description: 'Una casa alrededor de un patio. El anteproyecto de Casa Piaggio: investigación, definición conceptual, diseño y desarrollo, y producción gráfica.',
};

export default function Page() { return <PiaggioCase />; }
