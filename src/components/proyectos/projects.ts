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
    href: '/proyectos/casa-angel',
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
  {
    image: '/images/projects/fadu.webp',
    alt: 'FADU – UBA: render de un proyecto de taller',
    tag: 'Formación Académica',
    name: 'FADU – UBA',
    location: 'Buenos Aires, Argentina',
    year: '2020–2024',
    href: '/proyectos/fadu',
  },
  {
    image: '/images/projects/bauhaus-weimar.webp',
    alt: 'Bauhaus-Universität Weimar: render de la plaza del mercado de tierra apisonada',
    tag: 'Intercambio Académico',
    name: 'Bauhaus-Universität Weimar',
    location: 'Weimar, Alemania',
    year: '2024',
    href: '/proyectos/bauhaus-weimar',
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
