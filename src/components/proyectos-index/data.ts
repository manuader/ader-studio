import { projects, type Project } from '@/components/proyectos/projects';

export type Category = 'obra' | 'formacion';

export type IndexEntry = Project & {
  href: string;
  category: Category;
  /** Portada del índice (dimensiones reales para evitar saltos). */
  cover: { src: string; w: number; h: number };
};

/** Datos propios del índice que no viven en projects.ts. */
const EXTRA: Record<string, { category: Category; cover: IndexEntry['cover'] }> = {
  '/proyectos/casa-angel': {
    category: 'obra',
    cover: { src: '/images/portfolio/casa-angel/cover.webp', w: 1440, h: 1169 },
  },
  '/proyectos/urbetrack': {
    category: 'obra',
    cover: { src: '/images/projects/URBETRACK.png', w: 1491, h: 1055 },
  },
  '/proyectos/fadu': {
    category: 'formacion',
    cover: { src: '/images/projects/fadu.webp', w: 1713, h: 1285 },
  },
  '/proyectos/bauhaus-weimar': {
    category: 'formacion',
    cover: { src: '/images/projects/bauhaus-weimar.webp', w: 1059, h: 794 },
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
