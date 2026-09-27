import { bauhausWeimar, casaAngel, fadu, type Chapter, type PImage } from '@/components/portfolio/data/cases';

export const CASE = bauhausWeimar;

const byKey = (key: string): Chapter => {
  const ch = CASE.chapters.find((c) => c.key === key);
  if (!ch) throw new Error(`Bauhaus: capítulo ${key} no encontrado`);
  return ch;
};

const RAW = {
  foto: byKey('digital-realms-photogrammetry-sustainable-narratives'),
  plan: byKey('planning-process-for-future-oriented-urban-development'),
  gen: byKey('generative-ai-in-physical-production'),
  critica: byKey('critique-and-artificial-intelligence-machine-learning'),
};

/** Orden de lectura: de la captura del espacio a la reflexión sobre la IA. */
export const CHAPTERS = [
  { id: 'fotogrametria', num: '01', short: 'Fotogrametría', ch: RAW.foto },
  { id: 'planificacion', num: '02', short: 'Planificación urbana', ch: RAW.plan },
  { id: 'ia-generativa', num: '03', short: 'IA generativa', ch: RAW.gen },
  { id: 'critica', num: '04', short: 'Crítica e IA', ch: RAW.critica },
] as const;

export type ChapterId = (typeof CHAPTERS)[number]['id'];
export const chapterOf = (id: ChapterId) => CHAPTERS.find((c) => c.id === id)!;

export type Fig = PImage & { fig: string };

const fig = (n: string, img: PImage): Fig => ({ ...img, fig: `Fig. ${n}` });

/** Las once imágenes del portfolio, numeradas por capítulo (orden de esta página). */
export const FIGS = {
  compare: fig('1.1', RAW.foto.images[0]),
  juxta: fig('1.2', RAW.foto.images[1]),
  statue: fig('1.3', RAW.foto.images[2]),
  map: fig('1.4', RAW.foto.images[3]),
  render: fig('2.1', RAW.plan.images[0]),
  planta: fig('2.2', RAW.plan.images[1]),
  soil: fig('2.3', RAW.plan.images[2]),
  iterSlide: fig('3.1', RAW.gen.images[0]),
  final: fig('3.2', RAW.gen.images[1]),
  mesh: fig('3.3', RAW.gen.images[2]),
  ethics: fig('4.1', RAW.critica.images[0]),
} as const;

export type FigKey = keyof typeof FIGS;
export const FIG_ORDER = Object.keys(FIGS) as FigKey[];

const D = '/images/portfolio/bauhaus-weimar/derived';

/** Mitades alineadas de la lámina "Gaussian Splat" (Fig. 1.1), para el comparador. */
export const COMPARE = {
  a: { src: `${D}/gartenhaus-foto.webp`, w: 747, h: 596, label: 'Foto' },
  b: { src: `${D}/gartenhaus-modelo.webp`, w: 747, h: 596, label: 'Modelo digital' },
  place: "Goethe's Gartenhaus",
};

/** Recortes de la lámina "Image to image" (Fig. 3.1) + imagen final (Fig. 3.2). */
export const ITERATIONS: { src: string; w: number; h: number; label: string; alt: string; big?: boolean }[] = [
  { src: `${D}/iteracion-00.webp`, w: 522, h: 522, label: 'Imagen base', alt: 'Imagen base del mueble generada con IA', big: true },
  { src: `${D}/iteracion-01.webp`, w: 198, h: 198, label: 'Iteración 01', alt: 'Iteración 01 del mueble (image to image)' },
  { src: `${D}/iteracion-02.webp`, w: 198, h: 198, label: 'Iteración 02', alt: 'Iteración 02 del mueble (image to image)' },
  { src: `${D}/iteracion-03.webp`, w: 198, h: 198, label: 'Iteración 03', alt: 'Iteración 03 del mueble (image to image)' },
  { src: `${D}/iteracion-04.webp`, w: 198, h: 198, label: 'Iteración 04', alt: 'Iteración 04 del mueble (image to image)' },
  { src: `${D}/mueble-final.webp`, w: 609, h: 609, label: 'Imagen final', alt: RAW.gen.images[1].alt, big: true },
];

/** Recortes de la lámina "Refine object mesh" (Fig. 3.3). */
export const MESHES = [1, 2, 3].map((i) => ({
  src: `${D}/malla-0${i}.webp`,
  w: 380,
  h: 380,
  alt: `Malla del mueble refinada en Blender, vista ${i}`,
}));

export const NEXT = [
  { href: '/proyectos/fadu', c: fadu },
  { href: '/proyectos/casa-angel', c: casaAngel },
];
