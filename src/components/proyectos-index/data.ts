import { projects, type Project } from '@/components/proyectos/projects';

export type Category = 'obra' | 'formacion';

export type IndexEntry = Project & {
  href: string;
  category: Category;
  /** Portada del índice: el mismo dibujo de líneas del carrusel de la home. */
  cover: { src: string; w: number; h: number };
};

/** Datos propios del índice que no viven en projects.ts. */
const CATEGORY: Record<string, Category> = {
  '/proyectos/casa-piaggio': 'obra',
  '/proyectos/casa-angel': 'obra',
  '/proyectos/urbetrack': 'obra',
  '/proyectos/fadu': 'formacion',
  '/proyectos/bauhaus-weimar': 'formacion',
};

export const entries: IndexEntry[] = projects.flatMap((p) => {
  const category = p.href ? CATEGORY[p.href] : undefined;
  return p.href && category
    ? [{ ...p, href: p.href, category, cover: { src: p.image, w: p.w, h: p.h } }]
    : [];
});

export const FILTERS: { key: 'all' | Category; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'obra', label: 'Obras' },
  { key: 'formacion', label: 'Formación' },
];
