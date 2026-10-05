export interface Project {
  /** Dibujo de líneas en blanco y negro: la portada del proyecto en toda la web. */
  image: string;
  /** Dimensiones reales del dibujo. */
  w: number;
  h: number;
  alt: string;
  tag: string;
  name: string;
  location: string;
  year: string;
  /** Página del caso de estudio, si existe. */
  href?: string;
}

// Para agregar un nuevo proyecto, simplemente añade un objeto a esta lista.
export const projects: Project[] = [
  {
    image: '/images/projects/casa-angel-dibujo.webp',
    w: 1882,
    h: 1412,
    alt: 'Casa Angel',
    tag: 'Residencial · Proyecto',
    name: 'Casa Ángel',
    location: 'Pinamar, Argentina',
    year: '2024–2026',
    href: '/proyectos/casa-angel',
  },
  {
    image: '/images/projects/casa-piaggio-dibujo.webp',
    w: 1402,
    h: 1122,
    alt: 'Casa Piaggio, dibujo de fachada',
    tag: 'Residencial · Anteproyecto',
    name: 'Casa Piaggio',
    location: 'San Vicente, Buenos Aires',
    year: '2026',
    href: '/proyectos/casa-piaggio',
  },
  {
    image: '/images/projects/urbetrack-acceso.webp',
    w: 1491,
    h: 1055,
    alt: 'Oficina Urbetrack',
    tag: 'Proyecto y dirección de obra',
    name: 'Oficina Urbetrack',
    location: 'Av. Rivadavia 4260, CABA',
    year: '2026',
    href: '/proyectos/urbetrack',
  },
  {
    image: '/images/projects/fadu-dibujo.webp',
    w: 1800,
    h: 1350,
    alt: 'FADU – UBA: render de un proyecto de taller',
    tag: 'Formación Académica',
    name: 'FADU – UBA',
    location: 'Buenos Aires, Argentina',
    year: '2020–2024',
    href: '/proyectos/fadu',
  },
  {
    image: '/images/projects/bauhaus-weimar-dibujo.webp',
    w: 1800,
    h: 1350,
    alt: 'Bauhaus-Universität Weimar: render de la plaza del mercado de tierra apisonada',
    tag: 'Intercambio Académico',
    name: 'Bauhaus-Universität Weimar',
    location: 'Weimar, Alemania',
    year: '2024',
    href: '/proyectos/bauhaus-weimar',
  },
  // {
  //   image: '/images/projects/urbetrack-dibujo.webp',
  //   alt: 'Casa Piaggio',
  //   tag: 'Residencial · Proyecto',
  //   name: 'Casa Piaggio',
  //   location: 'San Vicente, Buenos Aires',
  //   year: '2026–2027',
  // },
];

/** Portada de dibujo de líneas de un proyecto con página propia. */
export function lineCover(href: string) {
  const p = projects.find((x) => x.href === href);
  if (!p) throw new Error(`Proyecto sin portada: ${href}`);
  return { src: p.image, w: p.w, h: p.h, alt: p.name };
}
