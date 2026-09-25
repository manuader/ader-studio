export interface Project {
  image: string;
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
    image: '/images/projects/CASA ANGEL.png',
    alt: 'Casa Angel',
    tag: 'Residencial Privado',
    name: 'Casa Angel',
    location: 'Pinamar, Argentina',
    year: '2025–2026',
  },
  {
    image: '/images/projects/URBETRACK.png',
    alt: 'Oficina Urbetrack',
    tag: 'Reforma y modernizacion',
    name: 'Oficina Urbetrack',
    location: 'Av. Rivadavia 4260, CABA',
    year: '2026',
    href: '/proyectos/urbetrack',
  },
  // {
  //   image: '/images/projects/URBETRACK.png',
  //   alt: 'Casa Piaggio',
  //   tag: 'Residencial Privado',
  //   name: 'Casa Piaggio',
  //   location: 'San Vicente, Buenos Aires',
  //   year: '2026–2027',
  // },
];
