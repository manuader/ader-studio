// Contenido del caso Urbetrack, tomado de la carpeta técnica (48 láminas).
const IMG = '/images/urbetrack';

export type FloorId = 11 | 12 | 13;

export interface Room {
  code: string;
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
      'Reforma integral de 292 m². La planta de puestos operativos ocupa el centro y el perímetro se reparte entre salas de trabajo, NOC, I.O.T. y gerencias, todas con frentes vidriados.',
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
      { code: '13.01', name: 'Puestos operativos', area: '144 m²', x: 46.9, y: 33.6 },
      { code: '13.02', name: 'Sala de reuniones', area: '25 m²', x: 14.7, y: 33.6 },
      { code: '13.03', name: 'Sala de trabajo', area: '14 m²', x: 14.8, y: 55.6 },
      { code: '13.04', name: 'NOC', area: '14 m²', x: 14.5, y: 70.5 },
      { code: '13.05', name: 'I.O.T.', area: '20 m²', x: 14.5, y: 85.6 },
      { code: '13.06', name: 'Sala de trabajo', area: '16 m²', x: 43.3, y: 86.4 },
      { code: '13.07', name: 'Gerencia Desarrollo', area: '17 m²', x: 66.5, y: 86.4 },
      { code: '13.08', name: 'Gerencia de Talento', area: '20 m²', x: 85.2, y: 86.4 },
      { code: '13.09', name: 'Rack', area: '2 m²', x: 80.0, y: 62.8 },
      { code: '13.10', name: 'Caldera', area: '11 m²', x: 89.5, y: 60.5 },
      { code: '13.11', name: 'Baños', area: '10 m²', x: 79.7, y: 40.2 },
      { code: '13.12', name: 'Cocina', area: '5 m²', x: 87.0, y: 28.2 },
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
      { code: '12.01', name: 'Gerencia Operaciones', area: '16 m²', x: 52.2, y: 25.0 },
      { code: '12.02', name: 'Jefatura Operaciones', area: '14 m²', x: 31.2, y: 25.0 },
      { code: '12.03', name: 'Calidad', area: '17 m²', x: 12.9, y: 25.0 },
      { code: '12.04a', name: 'Depósito', area: '33 m²', x: 15.6, y: 54.0 },
      { code: '12.04b', name: 'Bóveda', area: '7 m²', x: 15.7, y: 77.2 },
      { code: '12.05', name: 'Laboratorio + Volumétricos', area: '13 m²', x: 19.8, y: 86.5 },
      { code: '12.06', name: 'Comedor', area: '43 m²', x: 47.5, y: 82.3 },
      { code: '12.07', name: 'Soporte', area: '28 m²', x: 81.7, y: 82.3 },
      { code: '12.08a', name: 'Rack', area: '4 m²', x: 79.5, y: 63.3 },
      { code: '12.08b', name: 'Office', area: '4 m²', x: 79.4, y: 54.6 },
      { code: '12.09', name: 'Caldera', area: '11 m²', x: 89.5, y: 60.5 },
      { code: '12.10', name: 'Baños', area: '11 m²', x: 80.0, y: 39.7 },
      { code: '12.11', name: 'Cocina', area: '5 m²', x: 86.8, y: 28.5 },
      { code: '12.12', name: 'Sala de trabajo', area: '10 m²', x: 40.8, y: 51.3 },
      { code: '12.13', name: 'Coordinación', area: '10 m²', x: 57.1, y: 51.3 },
      { code: '12.14', name: 'Sala de capacitación', area: '19 m²', x: 47.9, y: 64.7 },
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
      { code: '11.01', name: 'Puestos operativos', area: '118 m²', x: 69.2, y: 58.7 },
      { code: '11.02', name: 'Gerencia Comercial', area: '17 m²', x: 52.4, y: 25.8 },
      { code: '11.03', name: 'Comercial trabajo', area: '17 m²', x: 32.7, y: 25.8 },
      { code: '11.04', name: 'Sala de reuniones', area: '27 m²', x: 12.4, y: 25.8 },
      { code: '11.05', name: 'Bonomia', area: '15 m²', x: 13.6, y: 61.4 },
      { code: '11.06', name: 'Gerencia B&S', area: '13 m²', x: 17.6, y: 85.6 },
      { code: '11.07', name: 'Oficina Pablo', area: '18 m²', x: 32.0, y: 85.6 },
      { code: '11.08', name: 'Oficina Ángel', area: '21 m²', x: 65.2, y: 85.6 },
      { code: '11.09', name: 'Gerencia Administrativa', area: '13 m²', x: 84.4, y: 85.6 },
      { code: '11.10', name: 'Tesorería', area: '5 m²', x: 87.7, y: 74.1 },
      { code: '11.11', name: 'Caldera', area: '11 m²', x: 89.5, y: 60.5 },
      { code: '11.12', name: 'Baño', area: '11 m²', x: 80.1, y: 39.8 },
      { code: '11.13', name: 'Cocina', area: '5 m²', x: 85.9, y: 28.1 },
    ],
  },
];

export const STATS = [
  { value: 3, suffix: '', label: 'Pisos integrados en un mismo sistema' },
  { value: 618, suffix: ' m²', label: 'Metros cuadrados totales' },
  { value: 35, suffix: '', label: 'Semanas de trabajo' },
  { value: 100, prefix: '+', suffix: '', label: 'Puestos de trabajo agregados' },
];

export const CORTES = [
  {
    id: 'a',
    label: 'Transversal A',
    text: 'Salas vidriadas sobre el frente, puestos al centro y el núcleo de baños compartidos, repetido en los tres niveles.',
    img: `${IMG}/corte-a.webp`,
    crop: { x: 36, y: 51, width: 1190, height: 602, imageWidth: 1262, imageHeight: 723 },
  },
  {
    id: 'l',
    label: 'Longitudinal',
    text: 'Las columnas en violeta marcan el ritmo de la planta y vinculan los tres pisos con un mismo gesto de color.',
    img: `${IMG}/corte-l.webp`,
    crop: { x: 17, y: 11, width: 1191, height: 464, imageWidth: 1233, imageHeight: 494 },
  },
  {
    id: 'b',
    label: 'Transversal B',
    text: 'Cada piso con su rack independiente distinguiendo la sala de servidores en el P12.',
    img: `${IMG}/corte-b.webp`,
    crop: { x: 35, y: 51, width: 1191, height: 601, imageWidth: 1261, imageHeight: 722 },
  },
] as const;

export const CAPAS = [
  {
    num: '01', title: 'Iluminación',
    text: 'La luz acompaña los puestos, las salas y las circulaciones. Circuitos y comandos por sector coordinados con la distribución de cada planta.',
    fact: 'Luz por sector',
    sheets: [{ page: 19, label: 'Piso 12 · Iluminación' }, { page: 20, label: 'Piso 13 · Iluminación' }],
  },
  {
    num: '02', title: 'Tomacorrientes',
    text: 'La energía llega a cada isla de trabajo. Tomas, canalizaciones y detalles de conexión pensados junto con el mobiliario y los equipos.',
    fact: 'Energía en cada puesto',
    sheets: [{ page: 21, label: 'Piso 12 · Tomacorrientes' }, { page: 22, label: 'Piso 13 · Tomacorrientes' }],
  },
  {
    num: '03', title: 'Datos',
    text: 'La conectividad es parte de la arquitectura de una empresa de software. Bocas de datos, CCTV y WiFi se coordinan con los racks, los recorridos y la ubicación de los equipos.',
    fact: 'Bocas · CCTV · WiFi',
    sheets: [{ page: 24, label: 'Piso 12 · Datos' }, { page: 25, label: 'Piso 13 · Datos' }],
  },
  {
    num: '04', title: 'Climatización',
    text: 'Equipos nuevos y existentes trabajan con la organización de cada piso. Su ubicación y su alimentación eléctrica se documentan como parte del mismo sistema.',
    fact: 'Confort y alimentación',
    sheets: [{ page: 34, label: 'Piso 11 · Equipos' }, { page: 35, label: 'Piso 12 · Equipos' }, { page: 36, label: 'Piso 12 · Alimentación eléctrica' }, { page: 37, label: 'Piso 13 · Equipos' }, { page: 38, label: 'Piso 13 · Alimentación eléctrica' }],
  },
  {
    num: '05', title: 'Tableros',
    text: 'La distribución se organiza en tableros de iluminación y tomas, puestos y aire acondicionado. Cada uno tiene su esquema unifilar, circuitos y referencias para ejecutar y mantener la instalación.',
    fact: 'Circuitos documentados',
    sheets: [{ page: 27, label: 'Piso 12 · TS-IT' }, { page: 28, label: 'Piso 12 · TS-Puestos' }, { page: 29, label: 'Piso 12 · TS-AA' }, { page: 30, label: 'Piso 13 · TS-IT' }, { page: 31, label: 'Piso 13 · TS-Puestos' }, { page: 32, label: 'Piso 13 · TS-AA' }],
  },
];

export const technicalSheet = (page: number) => `${IMG}/technical/${String(page).padStart(2, '0')}.webp`;

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
    "num": "01",
    "title": "Puestos de trabajo",
    "text": "El espacio central del equipo, con islas de trabajo, luz continua y la identidad violeta de Urbetrack.",
    "img": "/images/urbetrack/espacios/02. PUESTOS DE TRABAJO.png",
    "alt": "Urbetrack · Puestos de trabajo",
    "drawing": false
  },
  {
    "num": "02",
    "title": "NOC",
    "text": "La sala de monitoreo: videowall, puestos de control y conexión visual con la planta de trabajo.",
    "img": "/images/urbetrack/espacios/01. NOC.png",
    "alt": "Urbetrack · NOC",
    "drawing": false
  },
  {
    "num": "03",
    "title": "Comedor",
    "text": "Un lugar de encuentro compartido por los tres pisos, pensado para las pausas y la conversación.",
    "img": "/images/urbetrack/espacios/03-comedor-realista.png",
    "alt": "Urbetrack · Comedor",
    "drawing": false
  },
  {
    "num": "04",
    "title": "Sala de trabajo",
    "text": "Un ámbito de colaboración delimitado por vidrio, integrado visualmente al resto de la oficina.",
    "img": "/images/urbetrack/espacios/04. SALA DE TRABAJO.png",
    "alt": "Urbetrack · Sala de trabajo",
    "drawing": false
  },
  {
    "num": "05",
    "title": "Acceso",
    "text": "La llegada a la planta entre la circulación, los puestos y el núcleo revestido en madera.",
    "img": "/images/urbetrack/espacios/05. ACCESO.png",
    "alt": "Urbetrack · Acceso",
    "drawing": false
  },
  {
    "num": "06",
    "title": "Baños",
    "text": "Réplica de los baños compartidos, manteniendo los materiales y criterios de diseño entre los pisos.",
    "img": "/images/urbetrack/espacios/06. BAÑOS.png",
    "alt": "Urbetrack · Baños",
    "drawing": false
  }
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
