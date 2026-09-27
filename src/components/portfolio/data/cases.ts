// Generado a partir de la curaduría del portfolio (ezeader.myportfolio.com).
// Textos literales del portfolio; no inventar datos.

export type PImage = { src: string; w: number; h: number; alt: string; kind: string };
export type Chapter = {
  key: string;
  title: string;
  /** Subtítulo o nombre del proyecto tal como figura en las láminas. */
  subtitle?: string;
  year?: string;
  /** Párrafos literales del portfolio. */
  text: string[];
  /** Texto transcripto de una lámina (en mayúsculas en el original). */
  boardText?: string;
  images: PImage[];
};
export type CaseStudy = {
  slug: string;
  title: string;
  tag: string;
  location: string;
  years: string;
  lede: string;
  hero: PImage;
  cover: PImage;
  chapters: Chapter[];
};

export const casaAngel: CaseStudy = {
  "slug": "casa-angel",
  "title": "Casa Angel",
  "tag": "Residencial Privado",
  "location": "Pinamar, Argentina",
  "years": "2024–2026",
  "lede": "Un refugio elevado en el bosque de Pinamar, contado en las cuatro etapas del proyecto: del estudio del sitio a la representación final.",
  "hero": {
    "src": "/images/portfolio/casa-angel/hero.webp",
    "w": 1440,
    "h": 1169,
    "alt": "Casa Angel",
    "kind": "render"
  },
  "cover": {
    "src": "/images/portfolio/casa-angel/cover.webp",
    "w": 1440,
    "h": 1169,
    "alt": "Casa Angel",
    "kind": "render"
  },
  "chapters": [
    {
      "key": "etapa-1",
      "title": "ETAPA 1",
      "text": [
        "Se realizó un estudio detallado del sitio en Pinamar, evaluando su orientación, topografía, vegetación y visuales para definir una implantación adecuada. Además, se analizaron las normativas urbanísticas y las relaciones con los lotes vecinos para garantizar privacidad sin perder conexión con el entorno. Este proceso permitió identificar las mejores condiciones para la iluminación natural, ventilación cruzada y acceso al terreno."
      ],
      "images": [
        {
          "src": "/images/portfolio/casa-angel/01-01.webp",
          "w": 2400,
          "h": 1332,
          "alt": "Conectividad: recorridos a playa y centro",
          "kind": "diagrama"
        },
        {
          "src": "/images/portfolio/casa-angel/01-02.webp",
          "w": 2400,
          "h": 1227,
          "alt": "Zonificación: Zona RUp1 Tridente V",
          "kind": "plano"
        },
        {
          "src": "/images/portfolio/casa-angel/01-03.webp",
          "w": 2400,
          "h": 1176,
          "alt": "Condiciones climáticas: viento",
          "kind": "diagrama"
        },
        {
          "src": "/images/portfolio/casa-angel/01-04.webp",
          "w": 2400,
          "h": 683,
          "alt": "Análisis de terreno: grilla modular 4x4 m y árboles a conservar",
          "kind": "diagrama"
        },
        {
          "src": "/images/portfolio/casa-angel/01-05.webp",
          "w": 2400,
          "h": 1164,
          "alt": "Análisis de vecinos: Penélope 4129, parcela 5",
          "kind": "foto"
        }
      ],
      "subtitle": "Entrega Etapa 1 – Investigación y diagnóstico",
      "year": "2024"
    },
    {
      "key": "etapa-2",
      "title": "ETAPA 2",
      "text": [
        "Se estructuró el programa arquitectónico diferenciando espacios públicos y privados, organizándolos según el uso cotidiano y su interacción con el entorno. La idea de refugio elevado tomó protagonismo, generando una planta alta más abierta y conectada con el paisaje, mientras que los espacios de servicio y acceso se ubicaron en planta baja. Se trabajaron las transiciones entre interior y exterior mediante espacios semicubiertos que filtran la luz y protegen de la exposición directa a la calle."
      ],
      "images": [
        {
          "src": "/images/portfolio/casa-angel/02-01.webp",
          "w": 2400,
          "h": 1117,
          "alt": "Idea: croquis en corte del refugio elevado",
          "kind": "diagrama"
        },
        {
          "src": "/images/portfolio/casa-angel/02-02.webp",
          "w": 2400,
          "h": 1148,
          "alt": "Implantación en L sobre la grilla",
          "kind": "plano"
        },
        {
          "src": "/images/portfolio/casa-angel/02-03.webp",
          "w": 2400,
          "h": 1116,
          "alt": "Asoleamiento y categorías de uso",
          "kind": "diagrama"
        },
        {
          "src": "/images/portfolio/casa-angel/02-04.webp",
          "w": 2400,
          "h": 1005,
          "alt": "Ordenamiento de espacios: PB privada / PA pública",
          "kind": "diagrama"
        },
        {
          "src": "/images/portfolio/casa-angel/02-05.webp",
          "w": 2334,
          "h": 1593,
          "alt": "Espacio articulador: croquis axonométrico",
          "kind": "diagrama"
        }
      ],
      "subtitle": "Entrega Etapa 2 – Definición conceptual",
      "year": "2024"
    },
    {
      "key": "etapa-3",
      "title": "ETAPA 3",
      "text": [
        "Se definió un sistema constructivo que responde a la morfología del terreno y el concepto del proyecto. Se optó por una combinación de hormigón y madera, integrando la estructura con el paisaje natural y buscando un balance entre solidez y calidez. Se evaluaron los esfuerzos estructurales para garantizar una construcción eficiente y duradera, minimizando el impacto sobre el suelo y preservando la mayor cantidad de vegetación existente."
      ],
      "images": [
        {
          "src": "/images/portfolio/casa-angel/03-01.webp",
          "w": 2400,
          "h": 1419,
          "alt": "Planta baja",
          "kind": "plano"
        },
        {
          "src": "/images/portfolio/casa-angel/03-02.webp",
          "w": 2111,
          "h": 1660,
          "alt": "Planta alta",
          "kind": "plano"
        },
        {
          "src": "/images/portfolio/casa-angel/03-03.webp",
          "w": 2400,
          "h": 1030,
          "alt": "Corte living",
          "kind": "plano"
        },
        {
          "src": "/images/portfolio/casa-angel/03-04.webp",
          "w": 2400,
          "h": 854,
          "alt": "Axonométrica: frente y volumen curvo",
          "kind": "diagrama"
        },
        {
          "src": "/images/portfolio/casa-angel/03-05.webp",
          "w": 2400,
          "h": 1545,
          "alt": "Axonométrica: patio interior y pileta",
          "kind": "diagrama"
        }
      ],
      "subtitle": "Entrega Etapa 3 – Diseño y desarrollo",
      "year": "2024"
    },
    {
      "key": "etapa-4",
      "title": "ETAPA 4",
      "text": [
        "Se consolidó el diseño a través de una representación precisa y detallada del proyecto. Se elaboraron planos de planta, cortes y vistas, asegurando una lectura clara de la organización espacial y su relación con el entorno. Para evaluar y comunicar la propuesta de manera efectiva, se trabajó en la visualización del proyecto mediante renders realistas y un recorrido virtual, permitiendo experimentar la espacialidad, materialidad y la interacción con la luz natural. Se realizaron estudios de asoleamiento y ventilación, verificando que cada ambiente reciba la iluminación adecuada y mantenga el confort térmico."
      ],
      "images": [
        {
          "src": "/images/portfolio/casa-angel/04-01.webp",
          "w": 1440,
          "h": 1157,
          "alt": "Render exterior: fachada al patio entre pinos",
          "kind": "render"
        },
        {
          "src": "/images/portfolio/casa-angel/04-02.webp",
          "w": 1440,
          "h": 1169,
          "alt": "Render exterior: frente con jardinera y volumen curvo",
          "kind": "render"
        },
        {
          "src": "/images/portfolio/casa-angel/04-03.webp",
          "w": 1440,
          "h": 1169,
          "alt": "Render: galería elevada de madera en planta alta",
          "kind": "render"
        },
        {
          "src": "/images/portfolio/casa-angel/04-04.webp",
          "w": 1440,
          "h": 1169,
          "alt": "Render interior: living bajo cubierta a dos aguas",
          "kind": "render"
        },
        {
          "src": "/images/portfolio/casa-angel/04-05.webp",
          "w": 1440,
          "h": 1169,
          "alt": "Render interior: doble altura con columna de piedra",
          "kind": "render"
        },
        {
          "src": "/images/portfolio/casa-angel/04-06.webp",
          "w": 1440,
          "h": 1139,
          "alt": "Render exterior: pileta y escalera exterior",
          "kind": "render"
        }
      ],
      "year": "2025"
    }
  ]
};

export const fadu: CaseStudy = {
  "slug": "fadu",
  "title": "FADU – UBA",
  "tag": "Formación",
  "location": "Buenos Aires, Argentina",
  "years": "2020–2024",
  "lede": "Cinco años de taller de arquitectura en la Facultad de Arquitectura, Diseño y Urbanismo de la Universidad de Buenos Aires: un proyecto por año.",
  "hero": {
    "src": "/images/portfolio/fadu/hero.webp",
    "w": 2400,
    "h": 1350,
    "alt": "FADU – UBA",
    "kind": "render"
  },
  "cover": {
    "src": "/images/portfolio/fadu/cover.webp",
    "w": 2400,
    "h": 1697,
    "alt": "FADU – UBA",
    "kind": "render"
  },
  "chapters": [
    {
      "key": "2020",
      "title": "Diseño I",
      "text": [],
      "images": [
        {
          "src": "/images/portfolio/fadu/01-01.webp",
          "w": 1863,
          "h": 1112,
          "alt": "Corte perspectivado",
          "kind": "plano"
        },
        {
          "src": "/images/portfolio/fadu/01-02.webp",
          "w": 1199,
          "h": 761,
          "alt": "Cortes longitudinal y transversal",
          "kind": "plano"
        },
        {
          "src": "/images/portfolio/fadu/01-03.webp",
          "w": 1822,
          "h": 1288,
          "alt": "Perspectiva peatonal a línea",
          "kind": "diagrama"
        },
        {
          "src": "/images/portfolio/fadu/01-04.webp",
          "w": 2400,
          "h": 1567,
          "alt": "Maqueta: cuatro vistas",
          "kind": "maqueta"
        }
      ],
      "subtitle": "Vivienda unifamiliar en Saavedra, año 2020 (sello A1-SCA, Taller de Arquitectura) — 2do cuatrimestre",
      "year": "2020"
    },
    {
      "key": "2021",
      "title": "Diseño II",
      "text": [],
      "images": [
        {
          "src": "/images/portfolio/fadu/02-01.webp",
          "w": 1920,
          "h": 1167,
          "alt": "Render exterior en esquina",
          "kind": "render"
        },
        {
          "src": "/images/portfolio/fadu/02-02.webp",
          "w": 1920,
          "h": 1167,
          "alt": "Render: plaza de acceso (Vista Darregueyra)",
          "kind": "render"
        },
        {
          "src": "/images/portfolio/fadu/02-03.webp",
          "w": 1920,
          "h": 1357,
          "alt": "Planta subsuelo, interior del vacío central y Corte T",
          "kind": "lamina"
        },
        {
          "src": "/images/portfolio/fadu/02-04.webp",
          "w": 1920,
          "h": 1357,
          "alt": "Detalle constructivo en corte y Vista Uriarte",
          "kind": "lamina"
        }
      ],
      "subtitle": "Escuela de Artes Escénicas (E4, A2 | SCA Taller Scagliotti 2021) — 2do cuatrimestre",
      "year": "2021",
      "boardText": "EL SISTEMA ARQUITECTÓNICO DE ESTE PROYECTO SURGE A PARTIR DE SU ESTRUCTURA INDEPENDIENTE DE H.A. CONSTANTEMENTE SE BUSCA GENERAR ESPACIOS FLEXIBLES MEDIANTE EL GRAN VACIO CENTRAL QUE ACTUA COMO ARTICULADOR ENTRE LOS SECTORES EDUCATIVOS, QUE ESTAN EN RELACION A LAS TRES FACHADAS Y LOS SERVICIOS, QUE SE UBICAN RESPECTO DE LA MEDIANERA. (texto de la lámina diseno-ii/012)"
    },
    {
      "key": "2022",
      "title": "Diseño III",
      "text": [],
      "images": [
        {
          "src": "/images/portfolio/fadu/03-01.webp",
          "w": 2400,
          "h": 1622,
          "alt": "Render: terraza con pileta bajo cubierta verde",
          "kind": "render"
        },
        {
          "src": "/images/portfolio/fadu/03-02.webp",
          "w": 2400,
          "h": 732,
          "alt": "Corte fugado del gimnasio",
          "kind": "plano"
        },
        {
          "src": "/images/portfolio/fadu/03-03.webp",
          "w": 2400,
          "h": 1467,
          "alt": "Axonométricas estructurales (secuencia)",
          "kind": "diagrama"
        },
        {
          "src": "/images/portfolio/fadu/03-04.webp",
          "w": 2400,
          "h": 1712,
          "alt": "Planta baja y Vista Gonçalves Dias",
          "kind": "plano"
        }
      ],
      "subtitle": "PULOPULO (ex Scagliotti) — Centro Comunitario Barracas, Jury 2022 — 2do cuatrimestre",
      "year": "2022"
    },
    {
      "key": "2023",
      "title": "Diseño IV",
      "text": [],
      "images": [
        {
          "src": "/images/portfolio/fadu/04-01.webp",
          "w": 2400,
          "h": 1625,
          "alt": "Render aéreo junto al río",
          "kind": "render"
        },
        {
          "src": "/images/portfolio/fadu/04-02.webp",
          "w": 2400,
          "h": 1619,
          "alt": "Render exterior: volumen elevado sobre la plaza",
          "kind": "render"
        },
        {
          "src": "/images/portfolio/fadu/04-03.webp",
          "w": 2400,
          "h": 1623,
          "alt": "Render: planta baja cubierta pública con lucernario",
          "kind": "render"
        },
        {
          "src": "/images/portfolio/fadu/04-04.webp",
          "w": 2400,
          "h": 1339,
          "alt": "Corte AA",
          "kind": "plano"
        },
        {
          "src": "/images/portfolio/fadu/04-05.webp",
          "w": 2400,
          "h": 1697,
          "alt": "Croquis axonométrico con memoria",
          "kind": "lamina"
        }
      ],
      "subtitle": "Museo Vicente López — 2do cuatrimestre",
      "year": "2023",
      "boardText": "EL ARGUMENTO PRINCIPAL DEL PROYECTO ES LOGRAR LA \"CONQUISTA DEL PARQUE\" ENTREGANDO LA PB DEL MUSEO AL ESPACIO PÚBLICO, Y MANTENER UNA CONEXIÓN CONSTANTE ENTRE EL INTERIOR Y EL EXTERIOR."
    },
    {
      "key": "2024",
      "title": "Proyecto Arquitectónico",
      "text": [],
      "images": [
        {
          "src": "/images/portfolio/fadu/05-01.webp",
          "w": 2400,
          "h": 1350,
          "alt": "Render exterior desde el río",
          "kind": "render"
        },
        {
          "src": "/images/portfolio/fadu/05-02.webp",
          "w": 2400,
          "h": 1350,
          "alt": "Corte AA y Vista Norte",
          "kind": "plano"
        },
        {
          "src": "/images/portfolio/fadu/05-03.webp",
          "w": 2400,
          "h": 1350,
          "alt": "Patio con árbol + despiece de la cubierta",
          "kind": "lamina"
        },
        {
          "src": "/images/portfolio/fadu/05-04.webp",
          "w": 2400,
          "h": 1350,
          "alt": "Render interior: hall bajo cubierta tensada",
          "kind": "render"
        },
        {
          "src": "/images/portfolio/fadu/05-05.webp",
          "w": 2400,
          "h": 1350,
          "alt": "Render nocturno desde el río",
          "kind": "render"
        }
      ],
      "subtitle": "Centro Cultural San Isidro (PA – Roca Sardin – Ezequiel Ader)",
      "year": "2024"
    }
  ]
};

export const bauhausWeimar: CaseStudy = {
  "slug": "bauhaus-weimar",
  "title": "Bauhaus-Universität Weimar",
  "tag": "Formación · Intercambio",
  "location": "Weimar, Alemania",
  "years": "2024",
  "lede": "Intercambio académico centrado en tecnología aplicada al diseño: inteligencia artificial, fotogrametría, planificación urbana sostenible y producción generativa.",
  "hero": {
    "src": "/images/portfolio/bauhaus-weimar/hero.webp",
    "w": 2400,
    "h": 794,
    "alt": "Bauhaus-Universität Weimar",
    "kind": "render"
  },
  "cover": {
    "src": "/images/portfolio/bauhaus-weimar/cover.webp",
    "w": 1920,
    "h": 1080,
    "alt": "Bauhaus-Universität Weimar",
    "kind": "render"
  },
  "chapters": [
    {
      "key": "critique-and-artificial-intelligence-machine-learning",
      "title": "Critique and Artificial Intelligence - Machine learning",
      "text": [
        "Esta materia abordó las implicancias éticas, filosóficas y prácticas del desarrollo de la inteligencia artificial. A lo largo del curso, exploramos los fundamentos teóricos de la IA, los riesgos asociados a su implementación, su funcionamiento actual basado en el manejo masivo de datos, y las responsabilidades éticas en su uso y regulación. El objetivo fue reflexionar sobre cómo la IA está transformando nuestra sociedad y cómo podemos adaptarnos a estos cambios de manera responsable.",
        "El trabajo invita a reflexionar sobre la responsabilidad compartida entre las grandes corporaciones, los gobiernos y la comunidad para abrazar los avances de la IA de forma ética y constructiva, asegurando que beneficien a toda la sociedad sin comprometer derechos fundamentales."
      ],
      "images": [
        {
          "src": "/images/portfolio/bauhaus-weimar/01-01.webp",
          "w": 1587,
          "h": 2245,
          "alt": "Póster: Beyond Algorithms – The ethical dimensions of AI",
          "kind": "lamina"
        }
      ]
    },
    {
      "key": "digital-realms-photogrammetry-sustainable-narratives",
      "title": "Digital Realms: Photogrammetry & Sustainable Narratives",
      "text": [
        "Esta materia se centró en la integración de tecnología digital en el ámbito arquitectónico y urbano, con énfasis en la documentación, preservación y análisis del espacio, mediante herramientas modernas como la fotogrametría y técnicas avanzadas de modelado 3D. A través del aprendizaje de metodologías de captura de datos y visualización digital, exploré cómo traducir experiencias físicas y urbanas en archivos digitales que puedan ser analizados, compartidos y utilizados como herramientas de diseño o conservación."
      ],
      "images": [
        {
          "src": "/images/portfolio/bauhaus-weimar/02-01.webp",
          "w": 1770,
          "h": 600,
          "alt": "Gaussian Splat: foto vs. modelo digital (Goethe's Gartenhaus)",
          "kind": "diagrama"
        },
        {
          "src": "/images/portfolio/bauhaus-weimar/02-02.webp",
          "w": 1920,
          "h": 1080,
          "alt": "Yuxtaposición: fotogrametría y Gaussian Splat",
          "kind": "lamina"
        },
        {
          "src": "/images/portfolio/bauhaus-weimar/02-03.webp",
          "w": 1920,
          "h": 1080,
          "alt": "Fotogrametría: estatua de William Shakespeare",
          "kind": "render"
        },
        {
          "src": "/images/portfolio/bauhaus-weimar/02-04.webp",
          "w": 817,
          "h": 905,
          "alt": "Portada 'Preserving Weimar' / mapa de Weimar",
          "kind": "lamina"
        }
      ]
    },
    {
      "key": "planning-process-for-future-oriented-urban-development",
      "title": "Planning process for future-oriented urban development",
      "text": [
        "En este proyecto trabajamos en la urbanización del barrio RothNEUsiedl, en Viena, Austria, enfocándonos en el tema del uso del suelo como eje central. La consigna planteaba que cada grupo abordara un aspecto específico del desarrollo urbano sostenible, y nosotros elegimos explorar el valor del suelo, integrando conceptos de economía circular para maximizar el aprovechamiento de los recursos locales.",
        "Trabajo práctico final, donde debimos exponer frente a un jurado que eran los desarrolladores del barrio RothNEUsiedl"
      ],
      "images": [
        {
          "src": "/images/portfolio/bauhaus-weimar/03-01.webp",
          "w": 2400,
          "h": 794,
          "alt": "Render: plaza del mercado de tierra apisonada",
          "kind": "render"
        },
        {
          "src": "/images/portfolio/bauhaus-weimar/03-02.webp",
          "w": 2400,
          "h": 1773,
          "alt": "Planta de implantación 1:500",
          "kind": "plano"
        },
        {
          "src": "/images/portfolio/bauhaus-weimar/03-03.webp",
          "w": 1698,
          "h": 2400,
          "alt": "Póster completo 'Soil Value'",
          "kind": "lamina"
        }
      ]
    },
    {
      "key": "generative-ai-in-physical-production",
      "title": "Generative AI in Physical Production",
      "text": [
        "En esta materia abordamos el uso de herramientas de inteligencia artificial para transformar procesos creativos en el diseño de objetos físicos. A través de la generación de imágenes, modelos 3D y prototipos, exploré cómo los algoritmos generativos pueden redefinir el diseño contemporáneo, combinando innovación tecnológica con necesidades funcionales y contextuales. El curso fomentó la experimentación para crear soluciones únicas, adaptadas al entorno físico y social."
      ],
      "images": [
        {
          "src": "/images/portfolio/bauhaus-weimar/04-01.webp",
          "w": 1920,
          "h": 1080,
          "alt": "Image to image: iteraciones del mueble",
          "kind": "lamina"
        },
        {
          "src": "/images/portfolio/bauhaus-weimar/04-02.webp",
          "w": 673,
          "h": 675,
          "alt": "Imagen final del mueble urbano",
          "kind": "render"
        },
        {
          "src": "/images/portfolio/bauhaus-weimar/04-03.webp",
          "w": 1920,
          "h": 1080,
          "alt": "Malla del objeto refinada en Blender",
          "kind": "diagrama"
        }
      ]
    }
  ]
};

export const caseStudies: CaseStudy[] = [casaAngel, fadu, bauhausWeimar];
