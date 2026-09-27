// Fotografía de arquitectura — curaduría del portfolio. Todas las fotos son verticales.

export type Photo = { src: string; w: number; h: number; alt: string };
export type Series = { key: string; title: string; photos: Photo[] };

export const series: Series[] = [
  {
    "key": "argentina",
    "title": "Argentina",
    "photos": [
      {
        "src": "/images/fotografia/argentina/argentina-01.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Volumen de hormigón en voladizo sobre ladera"
      },
      {
        "src": "/images/fotografia/argentina/argentina-02.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Escalera helicoidal de hormigón vista en contrapicado"
      },
      {
        "src": "/images/fotografia/argentina/argentina-03.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Celosía de ladrillo calado a contraluz"
      },
      {
        "src": "/images/fotografia/argentina/argentina-04.webp",
        "w": 1440,
        "h": 1799,
        "alt": "Puente-casa de hormigón con banda vidriada sobre arroyo"
      },
      {
        "src": "/images/fotografia/argentina/argentina-05.webp",
        "w": 1799,
        "h": 2400,
        "alt": "Vacío de escalera blanco con cerramiento de vidrio"
      },
      {
        "src": "/images/fotografia/argentina/argentina-06.webp",
        "w": 1440,
        "h": 1800,
        "alt": "Losas superpuestas de hormigón contra cielo azul"
      },
      {
        "src": "/images/fotografia/argentina/argentina-07.webp",
        "w": 1350,
        "h": 2400,
        "alt": "Torre brutalista de hormigón en esquina urbana"
      }
    ]
  },
  {
    "key": "uruguay",
    "title": "Uruguay",
    "photos": [
      {
        "src": "/images/fotografia/uruguay/uruguay-01.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cubierta curva con costillas de madera laminada"
      },
      {
        "src": "/images/fotografia/uruguay/uruguay-02.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cuña de hormigón emergiendo del césped"
      },
      {
        "src": "/images/fotografia/uruguay/uruguay-03.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Alero de cubierta y ménsula de madera laminada"
      },
      {
        "src": "/images/fotografia/uruguay/uruguay-04.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Fachada blanca con ventanas en retícula escalonada"
      },
      {
        "src": "/images/fotografia/uruguay/uruguay-05.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torre de balcones curvos iluminada de noche"
      }
    ]
  },
  {
    "key": "alemania",
    "title": "Alemania",
    "photos": [
      {
        "src": "/images/fotografia/alemania/alemania-01.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cubierta tensada de lona y vidrio vista desde abajo"
      },
      {
        "src": "/images/fotografia/alemania/alemania-02.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Escalera de madera enmarcada en muro de piedra"
      },
      {
        "src": "/images/fotografia/alemania/alemania-03.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Lucernarios lineales en techo de hormigón"
      },
      {
        "src": "/images/fotografia/alemania/alemania-04.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Nave gótica con bóvedas nervadas y órgano"
      },
      {
        "src": "/images/fotografia/alemania/alemania-05.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Fachada de celosía blanca prefabricada"
      },
      {
        "src": "/images/fotografia/alemania/alemania-06.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Muro cortina interior con vitrina en sala vacía"
      },
      {
        "src": "/images/fotografia/alemania/alemania-07.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Estelas de hormigón contra cielo nublado"
      },
      {
        "src": "/images/fotografia/alemania/alemania-08.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Interior de época con ventanal y mobiliario moderno"
      },
      {
        "src": "/images/fotografia/alemania/alemania-09.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Campanario de ladrillo con lamas y cruz"
      }
    ]
  },
  {
    "key": "austria",
    "title": "Austria",
    "photos": [
      {
        "src": "/images/fotografia/austria/austria-01.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Volumen blanco en voladizo con franjas horizontales"
      },
      {
        "src": "/images/fotografia/austria/austria-02.webp",
        "w": 1799,
        "h": 2400,
        "alt": "Escalera curva de madera al fondo de un pasaje abovedado"
      },
      {
        "src": "/images/fotografia/austria/austria-03.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Fachada de listones de madera con ventanas enrasadas"
      },
      {
        "src": "/images/fotografia/austria/austria-04.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Vivienda colectiva blanca de ventanas profundas"
      },
      {
        "src": "/images/fotografia/austria/austria-05.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Fachada de madera envejecida en retícula regular"
      }
    ]
  },
  {
    "key": "republica-checa",
    "title": "República Checa",
    "photos": [
      {
        "src": "/images/fotografia/republica-checa/republica-checa-01.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Voladizos curvos iluminados de noche"
      },
      {
        "src": "/images/fotografia/republica-checa/republica-checa-02.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cumbrera ornamentada con remate dorado sobre cubierta de pizarra"
      },
      {
        "src": "/images/fotografia/republica-checa/republica-checa-03.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Fachada gótica con rosetón en contrapicado"
      }
    ]
  },
  {
    "key": "italia",
    "title": "Italia",
    "photos": [
      {
        "src": "/images/fotografia/italia/italia-01.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Pórtico abovedado en perspectiva"
      },
      {
        "src": "/images/fotografia/italia/italia-02.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Arcada continua acompañando una calle en pendiente"
      },
      {
        "src": "/images/fotografia/italia/italia-03.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Pabellón de ladrillo con arco sobre paisaje de colinas"
      }
    ]
  },
  {
    "key": "espana",
    "title": "España",
    "photos": [
      {
        "src": "/images/fotografia/espana/espana-01.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Patio circular con columnata de dos niveles"
      },
      {
        "src": "/images/fotografia/espana/espana-02.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Arco de mocárabes y yesería con cielo al fondo"
      },
      {
        "src": "/images/fotografia/espana/espana-03.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Estructura reticulada de madera con curva contra el cielo"
      },
      {
        "src": "/images/fotografia/espana/espana-04.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Esquina curva de fachada terracota texturada"
      },
      {
        "src": "/images/fotografia/espana/espana-05.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cúpula de mocárabes en estrella"
      },
      {
        "src": "/images/fotografia/espana/espana-06.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Fachada de piezas cerámicas tubulares en celdas"
      },
      {
        "src": "/images/fotografia/espana/espana-07.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torre de bandas horizontales vista en contrapicado"
      },
      {
        "src": "/images/fotografia/espana/espana-08.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Sala abovedada con arco de herradura y vista exterior"
      }
    ]
  },
  {
    "key": "monaco",
    "title": "Mónaco",
    "photos": [
      {
        "src": "/images/fotografia/monaco/monaco-01.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Balcones ondulantes de hormigón blanco"
      },
      {
        "src": "/images/fotografia/monaco/monaco-02.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Bandas curvas de fachada contra el cielo"
      },
      {
        "src": "/images/fotografia/monaco/monaco-03.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Edificio de balcones curvos con barandas de madera"
      },
      {
        "src": "/images/fotografia/monaco/monaco-04.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Terrazas escalonadas de líneas curvas"
      }
    ]
  },
  {
    "key": "tailandia",
    "title": "Tailandia",
    "photos": [
      {
        "src": "/images/fotografia/tailandia/tailandia-01.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cubierta de tejas vidriadas en franjas de color"
      },
      {
        "src": "/images/fotografia/tailandia/tailandia-02.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Frontones blancos superpuestos contra cielo azul"
      },
      {
        "src": "/images/fotografia/tailandia/tailandia-03.webp",
        "w": 1801,
        "h": 2400,
        "alt": "Pilares con mosaico dorado de un templo"
      }
    ]
  },
  {
    "key": "dubai",
    "title": "Dubái",
    "photos": [
      {
        "src": "/images/fotografia/dubai/dubai-01.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torre con puente-arco en fachada reticulada"
      },
      {
        "src": "/images/fotografia/dubai/dubai-02.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Fachada de vidrio y acero en pliegues verticales"
      },
      {
        "src": "/images/fotografia/dubai/dubai-03.webp",
        "w": 1799,
        "h": 2400,
        "alt": "Fachada de ventanas romboidales facetadas"
      },
      {
        "src": "/images/fotografia/dubai/dubai-04.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Aletas escalonadas en torre de vidrio"
      }
    ]
  },
  {
    "key": "usa",
    "title": "USA",
    "photos": [
      {
        "src": "/images/fotografia/usa/usa-01.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Marquesina de hormigón curvo en voladizo"
      },
      {
        "src": "/images/fotografia/usa/usa-02.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Fachada curva perforada azul"
      },
      {
        "src": "/images/fotografia/usa/usa-03.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Fachada de paneles facetados triangulares"
      }
    ]
  }
];

const all = series.flatMap((s) => s.photos.map((p) => ({ ...p, series: s.title })));
const bySrc = new Map(all.map((p) => [p.src, p]));

/** Secuencia curada para la galería de la home. */
export const homeSequence = [
  "/images/fotografia/alemania/alemania-01.webp",
  "/images/fotografia/espana/espana-02.webp",
  "/images/fotografia/argentina/argentina-01.webp",
  "/images/fotografia/monaco/monaco-01.webp",
  "/images/fotografia/alemania/alemania-02.webp",
  "/images/fotografia/uruguay/uruguay-01.webp",
  "/images/fotografia/espana/espana-01.webp",
  "/images/fotografia/dubai/dubai-02.webp",
  "/images/fotografia/austria/austria-02.webp",
  "/images/fotografia/argentina/argentina-02.webp",
  "/images/fotografia/tailandia/tailandia-01.webp",
  "/images/fotografia/alemania/alemania-03.webp",
  "/images/fotografia/espana/espana-03.webp"
].map((src) => bySrc.get(src)!);

export const heroPhoto = bySrc.get("/images/fotografia/espana/espana-01.webp")!;
