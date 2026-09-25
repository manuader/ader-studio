// Contenido del caso Urbetrack, tomado de la carpeta técnica (48 láminas).
const IMG = '/images/urbetrack';

export type FloorId = 11 | 12 | 13;

export interface Room {
  name: string;
  area: string;
  /** Posición del rótulo en la planta, en % del ancho / alto de la imagen. */
  x: number;
  y: number;
}

export interface Floor {
  id: FloorId;
  use: string;
  summary: string;
  highlights: { label: string; value: string }[];
  axo: string;
  diagram: string;
  plan: string;
  demolition?: string;
  rooms: Room[];
}

export const FLOORS: Floor[] = [
  {
    id: 13,
    use: 'Desarrollo',
    summary:
      'Reforma integral de unos 300 m². La planta de puestos operativos ocupa el centro y el perímetro se reparte entre salas de trabajo, NOC, I.O.T. y gerencias, todas con frentes vidriados.',
    highlights: [
      { label: 'Puestos operativos', value: '144 m²' },
      { label: 'Sala de reuniones', value: '25 m²' },
      { label: 'NOC · videowall', value: '14 m²' },
    ],
    axo: `${IMG}/axo-13.webp`,
    diagram: `${IMG}/diag-13.webp`,
    plan: `${IMG}/plan-13.webp`,
    demolition: `${IMG}/dem-13.webp`,
    rooms: [
      { name: 'Puestos operativos', area: '144 m²', x: 46.9, y: 33.6 },
      { name: 'Sala de reuniones', area: '25 m²', x: 14.7, y: 33.6 },
      { name: 'Sala de trabajo', area: '14 m²', x: 14.8, y: 55.6 },
      { name: 'NOC', area: '14 m²', x: 14.5, y: 70.5 },
      { name: 'I.O.T.', area: '20 m²', x: 14.5, y: 85.6 },
      { name: 'Sala de trabajo', area: '16 m²', x: 43.3, y: 86.4 },
      { name: 'Gerencia Desarrollo', area: '17 m²', x: 66.5, y: 86.4 },
      { name: 'Gerencia de Talento', area: '20 m²', x: 85.2, y: 86.4 },
      { name: 'Baños', area: '10 m²', x: 79.7, y: 40.2 },
      { name: 'Cocina', area: '5 m²', x: 87.0, y: 28.2 },
    ],
  },
  {
    id: 12,
    use: 'Operaciones',
    summary:
      'Se renovó gran parte del nivel conservando las tres oficinas del frente. Suma un comedor para 30 personas, compartido por los tres pisos: el nuevo punto de encuentro cotidiano entre equipos.',
    highlights: [
      { label: 'Comedor compartido', value: '43 m²' },
      { label: 'Soporte', value: '28 m²' },
      { label: 'Sala de capacitación', value: '19 m²' },
    ],
    axo: `${IMG}/axo-12.webp`,
    diagram: `${IMG}/diag-12.webp`,
    plan: `${IMG}/plan-12.webp`,
    demolition: `${IMG}/dem-12.webp`,
    rooms: [
      { name: 'Comedor', area: '43 m²', x: 47.5, y: 82.3 },
      { name: 'Soporte', area: '28 m²', x: 81.7, y: 82.3 },
      { name: 'Sala de capacitación', area: '19 m²', x: 47.9, y: 64.7 },
      { name: 'Sala de trabajo', area: '10 m²', x: 40.8, y: 51.3 },
      { name: 'Coordinación', area: '10 m²', x: 57.1, y: 51.3 },
      { name: 'Depósito', area: '33 m²', x: 15.6, y: 54.0 },
      { name: 'Laboratorio + Volumétricos', area: '13 m²', x: 19.8, y: 86.5 },
      { name: 'Gerencia Operaciones', area: '16 m²', x: 52.2, y: 25.0 },
      { name: 'Jefatura Operaciones', area: '14 m²', x: 31.2, y: 25.0 },
      { name: 'Calidad', area: '17 m²', x: 12.9, y: 25.0 },
      { name: 'Baños', area: '11 m²', x: 80.0, y: 39.7 },
    ],
  },
  {
    id: 11,
    use: 'Administración',
    summary:
      'El punto de partida: la intervención de 2019 que definió la identidad. Ahora se reorganizaron los puestos centrales y se sumaron dos oficinas para el área comercial.',
    highlights: [
      { label: 'Puestos operativos', value: '118 m²' },
      { label: 'Área comercial', value: '2 oficinas' },
      { label: 'Sala de reuniones', value: '27 m²' },
    ],
    axo: `${IMG}/axo-11.webp`,
    diagram: `${IMG}/diag-11.webp`,
    plan: `${IMG}/plan-11.webp`,
    rooms: [
      { name: 'Puestos operativos', area: '118 m²', x: 69.2, y: 58.7 },
      { name: 'Gerencia Comercial', area: '17 m²', x: 52.4, y: 25.8 },
      { name: 'Comercial trabajo', area: '17 m²', x: 32.7, y: 25.8 },
      { name: 'Sala de reuniones', area: '27 m²', x: 12.4, y: 25.8 },
      { name: 'Gerencia B&S', area: '13 m²', x: 17.6, y: 85.6 },
      { name: 'Oficinas', area: '18 y 21 m²', x: 47.5, y: 85.6 },
      { name: 'Gerencia Administrativa', area: '13 m²', x: 84.4, y: 85.6 },
      { name: 'Baño', area: '11 m²', x: 80.1, y: 39.8 },
    ],
  },
];

export const STATS = [
  { value: 3, suffix: '', label: 'Pisos integrados en un mismo sistema' },
  { value: 300, prefix: '≈', suffix: ' m²', label: 'De reforma integral en el piso 13' },
  { value: 30, suffix: '', label: 'Personas en el comedor compartido' },
  { value: 24, suffix: '', label: 'Frentes vidriados a medida' },
];

export const CORTES = [
  {
    id: 'a',
    label: 'Transversal A',
    text: 'Salas vidriadas sobre el frente, puestos al centro y el núcleo de baños compartidos, repetido en los tres niveles.',
    img: `${IMG}/corte-a.webp`,
    ratio: 1262 / 723,
  },
  {
    id: 'l',
    label: 'Longitudinal',
    text: 'Las columnas en violeta marcan el ritmo de la planta y vinculan los tres pisos con un mismo gesto de color.',
    img: `${IMG}/corte-l.webp`,
    ratio: 1233 / 494,
  },
  {
    id: 'b',
    label: 'Transversal B',
    text: 'Del rack y la circulación al comedor y las salas de trabajo: la secuencia completa de usos en un solo corte.',
    img: `${IMG}/corte-b.webp`,
    ratio: 1261 / 722,
  },
] as const;

export const CAPAS = [
  {
    num: '02',
    title: 'Sanitarias',
    text: 'Agua fría, caliente y desagües integrados en una misma implantación para los pisos 12 y 13: baños compartidos y cocina de servicio.',
    fact: 'AF · AC · desagües',
    img: `${IMG}/inst-sanitaria.webp`,
  },
  {
    num: '03',
    title: 'Iluminación',
    text: 'Circuitos por sector y bandejas portacables que recorren la planta, proyectados según el uso de cada espacio.',
    fact: 'Tableros seccionales por uso',
    img: `${IMG}/inst-iluminacion.webp`,
  },
  {
    num: '03',
    title: 'Datos',
    text: 'Bocas de datos por puesto, CCTV, WiFi y control de acceso, pensados desde el equipamiento previsto.',
    fact: 'Cat 6A por puesto',
    img: `${IMG}/inst-datos.webp`,
  },
  {
    num: '04',
    title: 'Climatización',
    text: 'Equipos nuevos coordinados con los existentes en los tres pisos, con alimentación eléctrica propia.',
    fact: 'Naranja: equipos nuevos',
    img: `${IMG}/inst-aa.webp`,
  },
  {
    num: '05',
    title: 'Tabiquería vidriada',
    text: 'Frentes de vidrio 5+5 con perfilería de aluminio anodizado, esmerilados donde se necesita privacidad, y cubículos de baño con pivote libre.',
    fact: '24 frentes a medida',
    img: `${IMG}/inst-tabiqueria.webp`,
  },
];

export const TERMINACIONES = [
  { id: 'piso', name: 'Piso vinílico', spec: 'LVT 3 mm · color Cenizo', use: 'Espacios de trabajo', img: `${IMG}/mat-piso.webp` },
  { id: 'cherry', name: 'Cherry Imperial', spec: 'Revestimiento de madera', use: 'Hall de entrada y servicios', img: `${IMG}/mat-cherry.webp` },
  { id: 'nogal', name: 'Nogal Persa', spec: 'Muebles fijos', use: 'Baños, cocina y comedor', img: `${IMG}/mat-nogal.webp` },
  { id: 'violeta', name: 'Palacio Persa', spec: 'Pintura violeta', use: 'Identidad y continuidad', color: '#693C8D' },
  { id: 'gris', name: 'Lluvia de Terciopelo', spec: 'Pintura gris claro', use: 'Paramentos generales', color: '#D9DAD5' },
  { id: 'porcelanato', name: 'Porcelanato gris', spec: '60 × 60 cm', use: 'Pisos de baños y cocina', img: `${IMG}/mat-porcelanato.webp` },
  { id: 'granito', name: 'Granito Gris Mara', spec: 'Mesadas', use: 'Baños y cocina', img: `${IMG}/mat-granito.webp` },
] as const;

export const EQUIPAMIENTO = [
  { name: 'Silla operativa', spec: 'Respaldo en red gris', img: `${IMG}/obj-silla-operativa.webp` },
  { name: 'Silla de gerencia', spec: 'Ecocuero crudo · casco blanco', img: `${IMG}/obj-silla-cosmos.webp` },
  { name: 'Luminaria colgante', spec: 'Aro suspendido · difusor continuo', img: `${IMG}/obj-luminaria.webp` },
  { name: 'Climatización', spec: 'Split inverter', img: `${IMG}/obj-aa.webp` },
  { name: 'Lavatorio', spec: 'Bacha de apoyo · monocomando', img: `${IMG}/obj-griferia.webp` },
  { name: 'Cocina', spec: 'Bacha Ø 37 cm · grifería cromada', img: `${IMG}/obj-bacha-cocina.webp` },
];

export const RECORRIDO = [
  {
    num: '01',
    title: 'NOC',
    text: 'La sala de monitoreo del piso 13: videowall, puestos de control y un paramento de acento en el violeta de la marca.',
    img: '/images/renders/07 - Sala de control.png',
    alt: 'Sala NOC de Urbetrack',
    drawing: false,
  },
  {
    num: '02',
    title: 'Planta de trabajo',
    text: 'Islas de puestos bajo una grilla de luz lineal, con las columnas en violeta marcando el ritmo del espacio.',
    img: '/images/renders/02 - Oficina.png',
    alt: 'Planta de trabajo de Urbetrack',
    drawing: false,
  },
  {
    num: '03',
    title: 'Baños compartidos',
    text: 'Mesada corrida de granito, bachas de apoyo, muebles en Nogal Persa y cubículos de vidrio.',
    img: '/images/renders/10 - Baño oficina.png',
    alt: 'Baños compartidos de Urbetrack',
    drawing: false,
  },
  {
    num: '04',
    title: 'Acceso',
    text: 'Un umbral de vidrio con el isotipo de la marca. Simple, reconocible y preciso.',
    img: '/images/projects/URBETRACK.png',
    alt: 'Dibujo del acceso a Urbetrack',
    drawing: true,
  },
];

export const CAPITULOS = [
  { num: '00', name: 'Demolición', pages: [5, 6, 7] },
  { num: '01', name: 'Arquitectura', pages: [8, 9, 10, 11, 12, 13] },
  { num: '02', name: 'Sanitarias', pages: [14, 15, 16, 17] },
  { num: '03', name: 'Eléctricas', pages: [18, 19, 20, 21, 22, 23, 24, 25] },
  { num: '03b', name: 'Tableros', pages: [26, 27, 28, 29, 30, 31, 32] },
  { num: '04', name: 'Aire acondicionado', pages: [33, 34, 35, 36, 37, 38] },
  { num: '05', name: 'Tabiquería vidriada', pages: [39, 40, 41, 42, 43, 44] },
  { num: '06', name: 'Materialidad', pages: [45, 46, 47, 48] },
];

export const docThumb = (n: number) => `${IMG}/docs/${String(n).padStart(2, '0')}.webp`;
