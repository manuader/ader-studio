import type { Photo, Series } from '@/components/portfolio/data/fotografia';

/**
 * Composición editorial de /fotografia.
 * Cada fila coloca sus retratos en una grilla de 12 columnas (6 en mobile):
 * [columna inicial, columnas que ocupa, desfase vertical en vw].
 * Cada serie encadena filas distintas, así el ritmo cambia de una a otra.
 */
type Slot = readonly [col: number, span: number, offset: number];
type Row = { d: readonly Slot[]; m: readonly Slot[] };

const ROWS = {
  A1: { d: [[5, 4, 0]], m: [[1, 5, 0]] },
  B1: { d: [[8, 4, 0]], m: [[2, 5, 0]] },
  C1: { d: [[2, 4, 0]], m: [[1, 6, 0]] },
  A2: { d: [[1, 4, 0], [7, 4, 8]], m: [[1, 4, 0], [3, 4, 0]] },
  B2: { d: [[2, 3, 6], [7, 4, 0]], m: [[1, 3, 0], [4, 3, 16]] },
  C2: { d: [[1, 4, 0], [9, 4, 12]], m: [[2, 5, 0], [1, 4, 0]] },
  A3: { d: [[1, 3, 8], [5, 4, 0], [10, 3, 14]], m: [[1, 3, 10], [4, 3, 0], [2, 4, 0]] },
  B3: { d: [[1, 4, 0], [6, 3, 10], [10, 3, 3]], m: [[1, 5, 0], [1, 3, 0], [4, 3, 14]] },
} satisfies Record<string, Row>;

type RowKey = keyof typeof ROWS;

/** Secuencia de filas por serie (la suma de cada secuencia = fotos de la serie). */
const PLAN: Record<string, RowKey[]> = {
  argentina: ['A2', 'A3', 'B2'],
  uruguay: ['B3', 'C2'],
  alemania: ['A3', 'B2', 'A1', 'B3'],
  austria: ['C2', 'A3'],
  'republica-checa': ['B3'],
  italia: ['C2', 'B1'],
  espana: ['A2', 'B3', 'A1', 'C2'],
  monaco: ['B2', 'A2'],
  tailandia: ['A3'],
  dubai: ['C1', 'B3'],
  usa: ['B1', 'A2'],
};

/** Plan de reserva para series sin plan explícito. */
const FALLBACK: RowKey[] = ['A2', 'B3', 'A1', 'C2', 'A3', 'B1', 'B2'];

export type PlacedPhoto = Photo & {
  /** Índice global (para el visor). */
  index: number;
  /** Número dentro de la serie (1-based). */
  n: number;
  d: Slot;
  m: Slot;
};

export function compose(s: Series, startIndex: number): PlacedPhoto[][] {
  const plan = PLAN[s.key] ?? [];
  const rows: PlacedPhoto[][] = [];
  let i = 0;
  let k = 0;
  while (i < s.photos.length) {
    const left = s.photos.length - i;
    let key: RowKey = plan[k] ?? FALLBACK[k % FALLBACK.length];
    let row: Row = ROWS[key];
    if (row.d.length > left) {
      key = left === 1 ? 'A1' : left === 2 ? 'A2' : 'A3';
      row = ROWS[key];
    }
    rows.push(
      row.d.map((slot, j) => {
        const photo = s.photos[i + j];
        return { ...photo, index: startIndex + i + j, n: i + j + 1, d: slot, m: row.m[j] };
      })
    );
    i += row.d.length;
    k += 1;
  }
  return rows;
}
