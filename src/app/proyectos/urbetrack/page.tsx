import type { Metadata } from 'next';
import { UrbetrackCase } from '@/components/case-urbetrack/UrbetrackCase';

export const metadata: Metadata = {
  title: 'Oficina Urbetrack — Ader Studio',
  description:
    'Reforma integral y modernización de las oficinas de Urbetrack en Av. Rivadavia 4260, CABA. Proyecto de Ader Studio.',
};

export default function UrbetrackPage() {
  return <UrbetrackCase />;
}
