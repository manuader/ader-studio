// Material de Casa Angel ordenado para la página de caso.
// Los textos y las imágenes salen de `casaAngel` (portfolio) y de material ya publicado en el sitio.

import { casaAngel, type Chapter, type PImage } from '@/components/portfolio/data/cases';

export const CASE = casaAngel;
export const [E1, E2, E3, E4] = casaAngel.chapters as [Chapter, Chapter, Chapter, Chapter];

/** Subtítulo de lámina sin el prefijo "Entrega Etapa n –". */
export function stageName(ch: Chapter): string {
  if (ch.subtitle) return ch.subtitle.split('–').pop()!.trim();
  // La lámina de la etapa 4 no lleva subtítulo; el portfolio la presenta como la representación final.
  return 'Representación final';
}

const img = (ch: Chapter, i: number) => ch.images[i];

/** Etapa 1 — secuencia de lectura del sitio (del entorno al lote). */
export const SITE_SEQUENCE: PImage[] = [
  img(E1, 0), // conectividad
  img(E1, 1), // zonificación
  img(E1, 4), // vecinos
  img(E1, 2), // viento
  img(E1, 3), // grilla 4×4
];

/** Frase literal de la lámina "Idea" (Etapa 2). */
export const BOARD_QUOTE = {
  strong: 'Un refugio elevado en el bosque,',
  soft: 'donde los espacios públicos buscan la luz, y las visuales integran la naturaleza como parte de la vida diaria.',
};

/** Pasos del video de proceso, tal como los nombra la sección Proceso de la home. */
export const PROCESS_STEPS = ['Terreno base', 'Grilla y trazado', 'Análisis con IA', 'Composición de la forma', 'Morfología', 'Planta baja'];

export const PLAN_VIEWS = [
  { key: 'pb', label: 'Planta baja', image: img(E3, 0) },
  { key: 'pa', label: 'Planta alta', image: img(E3, 1) },
  { key: 'corte', label: 'Corte', image: img(E3, 2) },
];

/** Capas del modelo BIM, con los rótulos de la sección BIM de la home. */
export const BIM_LAYERS = [
  { num: '01', label: 'Estructura', sub: 'Muros portantes de hormigón armado.', src: '/images/bim/BIM 01 ESTRUCTURA.png' },
  { num: '02', label: 'Cerramientos', sub: 'Mampostería de construcción en seco y aventanamientos de piso a techo.', src: '/images/bim/BIM 02 MAMPOSTERIA.png' },
  { num: '03', label: 'Arquitectura', sub: 'Configuración espacial y relaciones funcionales.', src: '/images/bim/BIM 03 ARQUITECTURA.png' },
  { num: '04', label: 'Instalaciones', sub: 'Coordinación integral de instalaciones sanitarias, cloacales y termomecánicas.', src: '/images/bim/BIM 04 INSTALACIONES.png' },
];
export const BIM_SIZE = { w: 4961, h: 3508 };

/** Etapa 4 — recorrido de renders: del exterior al interior y de vuelta al jardín. */
const site = (src: string, w: number, h: number, alt: string): PImage => ({ src, w, h, alt, kind: 'render' });
export const RENDERS: PImage[] = [
  img(E4, 1),
  site('/images/renders/03 - Acceso.png', 941, 1672, 'Render: acceso'),
  img(E4, 2),
  img(E4, 3),
  site('/images/renders/01 - Living.png', 1086, 1448, 'Render interior: living'),
  img(E4, 4),
  site('/images/renders/14 - Estructura.png', 941, 1672, 'Render: estructura'),
  img(E4, 5),
];

/** Píxeles a recortar abajo en la galería (franja oscura de exportación del render). */
export const TRIM_BOTTOM: Record<string, number> = {
  '/images/portfolio/casa-angel/04-06.webp': 28,
};
