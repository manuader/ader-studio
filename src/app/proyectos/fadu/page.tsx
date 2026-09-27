import type { Metadata } from 'next';
import { FaduCase } from '@/components/case-fadu/FaduCase';

export const metadata: Metadata = {
  title: 'FADU – UBA — Ader Studio',
  description:
    'Cinco años de taller de arquitectura en la Facultad de Arquitectura, Diseño y Urbanismo de la Universidad de Buenos Aires, 2020–2024: un proyecto por año.',
};

export default function FaduPage() {
  return <FaduCase />;
}
