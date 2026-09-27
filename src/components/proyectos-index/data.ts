import { projects, type Project } from '@/components/proyectos/projects';

export type Category = 'obra' | 'formacion';

export type IndexEntry = Project & {
  href: string;
  category: Category;
  /** Portada del índice: la misma imagen del carrusel de la home (dimensiones reales). */
  cover: { src: string; w: number; h: number };
};

/** Datos propios del índice que no viven en projects.ts. */
const EXTRA: Record<string, { category: Category; cover: IndexEntry['cover'] }> = {
  '/proyectos/casa-angel': {
    category: 'obra',
    cover: { src: '/images/projects/CASA ANGEL.webp', w: 1536, h: 1024 },
  },
  '/proyectos/urbetrack': {
    category: 'obra',
    cover: { src: '/images/projects/URBETRACK.webp', w: 1491, h: 1055 },
  },
  '/proyectos/fadu': {
    category: 'formacion',
    cover: { src: '/images/projects/fadu-dibujo.webp', w: 1800, h: 1350 },
  },
  '/proyectos/bauhaus-weimar': {
    category: 'formacion',
    cover: { src: '/images/projects/bauhaus-weimar-dibujo.webp', w: 1800, h: 1350 },
  },
};

export const entries: IndexEntry[] = projects.flatMap((p) => {
  const extra = p.href ? EXTRA[p.href] : undefined;
  return p.href && extra ? [{ ...p, href: p.href, ...extra }] : [];
});

export const FILTERS: { key: 'all' | Category; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'obra', label: 'Obras' },
  { key: 'formacion', label: 'Formación' },
];
