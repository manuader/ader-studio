import { fadu, type Chapter, type PImage } from '@/components/portfolio/data/cases';

/**
 * Presentación de los cinco años de FADU. Los nombres salen de `subtitle`
 * (lo que figura en las láminas), limpios de sellos y códigos de entrega.
 * La composición de cada año es propia: una grilla de 12 columnas distinta por capítulo.
 */

export type Slot =
  | {
      type: 'img';
      /** Índice de la imagen dentro del capítulo. */
      i: number;
      /** Columnas en la grilla de 12 (desktop). */
      col: [number, number];
      /** Columnas en tablet (≤1024). Si falta, usa `col`. */
      colMd?: [number, number];
      /** Desplazamiento vertical en desktop (px), para romper la línea de base. */
      shift?: number;
      /** Alineación dentro de la fila. */
      align?: 'start' | 'end' | 'center';
      /** A sangre: ocupa todo el ancho de la ventana. */
      bleed?: boolean;
    }
  | { type: 'quote'; col: [number, number]; colMd?: [number, number]; align?: 'start' | 'end' | 'center' };

export type Year = {
  key: string;
  year: string;
  materia: string;
  /** Nombre del proyecto en dos líneas: la segunda va en itálica. */
  name: [string, string];
  /** Nombre en una línea (resumen, nav). */
  short: string;
  meta: { label: string; value: string }[];
  quote?: string;
  images: PImage[];
  layout: Slot[];
  /** Imagen que representa el año en el cierre. */
  thumb: number;
  /** Fondo del capítulo. */
  tone: 'paper' | 'cream';
};

const cleanQuote = (t?: string) => t?.replace(/\s*\(texto de la lámina[^)]*\)\s*$/i, '').trim();

const chapter = (key: string): Chapter => {
  const c = fadu.chapters.find((ch) => ch.key === key);
  if (!c) throw new Error(`FADU: falta el capítulo ${key}`);
  return c;
};

const build = (key: string, rest: Omit<Year, 'key' | 'year' | 'materia' | 'quote' | 'images'>): Year => {
  const c = chapter(key);
  return { key, year: c.year ?? key, materia: c.title, quote: cleanQuote(c.boardText), images: c.images, ...rest };
};

export const YEARS: Year[] = [
  build('2020', {
    name: ['Vivienda unifamiliar', 'en Saavedra'],
    short: 'Vivienda unifamiliar en Saavedra',
    meta: [
      { label: 'Materia', value: 'Diseño I' },
      { label: 'Cuatrimestre', value: '2.º' },
    ],
    tone: 'paper',
    thumb: 0,
    layout: [
      { type: 'img', i: 0, col: [1, 9], colMd: [1, 13] },
      { type: 'img', i: 1, col: [9, 13], colMd: [1, 7], align: 'end' },
      { type: 'img', i: 3, col: [1, 6], colMd: [7, 13], shift: 96 },
      { type: 'img', i: 2, col: [7, 13], colMd: [1, 13] },
    ],
  }),
  build('2021', {
    name: ['Escuela de', 'Artes Escénicas'],
    short: 'Escuela de Artes Escénicas',
    meta: [
      { label: 'Materia', value: 'Diseño II' },
      { label: 'Cuatrimestre', value: '2.º' },
      { label: 'Taller', value: 'Scagliotti' },
    ],
    tone: 'cream',
    thumb: 0,
    layout: [
      { type: 'img', i: 0, col: [1, 10], colMd: [1, 13] },
      { type: 'quote', col: [10, 13], colMd: [1, 9], align: 'end' },
      { type: 'img', i: 1, col: [4, 13], colMd: [1, 13] },
      { type: 'img', i: 2, col: [1, 7], colMd: [1, 7] },
      { type: 'img', i: 3, col: [7, 13], colMd: [7, 13], shift: 120 },
    ],
  }),
  build('2022', {
    name: ['Centro Comunitario', 'Barracas'],
    short: 'Centro Comunitario Barracas',
    meta: [
      { label: 'Materia', value: 'Diseño III' },
      { label: 'Cuatrimestre', value: '2.º' },
      { label: 'Taller', value: 'Pulopulo' },
    ],
    tone: 'paper',
    thumb: 0,
    layout: [
      { type: 'img', i: 0, col: [1, 8], colMd: [1, 8] },
      { type: 'img', i: 2, col: [8, 13], colMd: [8, 13], shift: 160, align: 'start' },
      { type: 'img', i: 1, col: [1, 13] },
      { type: 'img', i: 3, col: [3, 11], colMd: [2, 12] },
    ],
  }),
  build('2023', {
    name: ['Museo', 'Vicente López'],
    short: 'Museo Vicente López',
    meta: [
      { label: 'Materia', value: 'Diseño IV' },
      { label: 'Cuatrimestre', value: '2.º' },
    ],
    tone: 'cream',
    thumb: 1,
    layout: [
      { type: 'img', i: 1, col: [1, 13] },
      { type: 'img', i: 0, col: [1, 7], colMd: [1, 7] },
      { type: 'img', i: 2, col: [7, 13], colMd: [7, 13], shift: 120 },
      { type: 'quote', col: [1, 6], colMd: [1, 13], align: 'center' },
      { type: 'img', i: 4, col: [6, 13], colMd: [1, 13] },
      { type: 'img', i: 3, col: [1, 10], colMd: [1, 13] },
    ],
  }),
  build('2024', {
    name: ['Centro Cultural', 'San Isidro'],
    short: 'Centro Cultural San Isidro',
    meta: [
      { label: 'Materia', value: 'Proyecto Arquitectónico' },
      { label: 'Taller', value: 'Roca – Sardin' },
    ],
    tone: 'paper',
    thumb: 0,
    layout: [
      { type: 'img', i: 3, col: [1, 9], colMd: [1, 13] },
      { type: 'img', i: 0, col: [9, 13], colMd: [1, 7], align: 'end' },
      { type: 'img', i: 1, col: [1, 7], colMd: [7, 13] },
      { type: 'img', i: 2, col: [7, 13], colMd: [1, 13], shift: 120 },
      { type: 'img', i: 4, col: [1, 13], bleed: true },
    ],
  }),
];

export const HERO = fadu.hero;
export const LEDE = fadu.lede;
export const PORTFOLIO_LINE =
  'Este portfolio reúne los proyectos y experiencias desarrollados a lo largo de 8 años de formación.';

/** Dibujos a línea: se trazan con el scroll. */
export const isLineDrawing = (img: PImage) => img.kind === 'plano' || img.kind === 'diagrama';
/** Renders exportados con un filete blanco de ~1 %: se recortan con una escala mínima. */
const MATTED = ['03-01', '04-01', '04-02', '04-03'];
export const hasMatte = (img: PImage) => MATTED.some((k) => img.src.endsWith(`/${k}.webp`));
/** Láminas y dibujos con fondo blanco: van sobre bloque #fff. */
export const isSheet = (img: PImage) => img.kind !== 'render';
