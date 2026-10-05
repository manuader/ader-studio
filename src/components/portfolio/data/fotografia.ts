// Fotografía de arquitectura — curaduría del portfolio. Todas las fotos son verticales.

export type Photo = { src: string; w: number; h: number; alt: string; caption?: string; sourceUrl?: string; thumbnail?: string };
export type Series = { key: string; title: string; photos: Photo[] };

export const series: Series[] = [
  {
    "key": "alemania",
    "title": "Alemania",
    "photos": [
      {
        "src": "/images/fotografia/alemania/adobe-001.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Fachadas iluminadas y una torre de vidrio encuadrando la calle nocturna.",
        "thumbnail": "/images/fotografia/alemania/adobe-001-thumb.webp",
        "caption": "Fachadas iluminadas y una torre de vidrio encuadrando la calle nocturna."
      },
      {
        "src": "/images/fotografia/alemania/adobe-002.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Un pequeño pabellón recortado entre árboles de otoño.",
        "thumbnail": "/images/fotografia/alemania/adobe-002-thumb.webp",
        "caption": "Un pequeño pabellón recortado entre árboles de otoño."
      },
      {
        "src": "/images/fotografia/alemania/adobe-003.webp",
        "w": 1768,
        "h": 2400,
        "alt": "Plano blanco y arista limpia frente a las ramas y el cielo.",
        "thumbnail": "/images/fotografia/alemania/adobe-003-thumb.webp",
        "caption": "Plano blanco y arista limpia frente a las ramas y el cielo."
      },
      {
        "src": "/images/fotografia/alemania/adobe-005.webp",
        "w": 1351,
        "h": 2400,
        "alt": "Vitrales iluminados en una calle oscura.",
        "thumbnail": "/images/fotografia/alemania/adobe-005-thumb.webp",
        "caption": "Vitrales iluminados en una calle oscura."
      },
      {
        "src": "/images/fotografia/alemania/adobe-006.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Órgano de madera bajo una bóveda de piedra.",
        "thumbnail": "/images/fotografia/alemania/adobe-006-thumb.webp",
        "caption": "Órgano de madera bajo una bóveda de piedra."
      },
      {
        "src": "/images/fotografia/alemania/adobe-007.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torre histórica y remate escultórico contra el cielo.",
        "thumbnail": "/images/fotografia/alemania/adobe-007-thumb.webp",
        "caption": "Torre histórica y remate escultórico contra el cielo."
      },
      {
        "src": "/images/fotografia/alemania/adobe-008.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Campanario y reloj como referencia del paisaje urbano.",
        "thumbnail": "/images/fotografia/alemania/adobe-008-thumb.webp",
        "caption": "Campanario y reloj como referencia del paisaje urbano."
      },
      {
        "src": "/images/fotografia/alemania/adobe-009.webp",
        "w": 1350,
        "h": 2400,
        "alt": "Esculturas frente a un edificio de composición clásica.",
        "thumbnail": "/images/fotografia/alemania/adobe-009-thumb.webp",
        "caption": "Esculturas frente a un edificio de composición clásica."
      },
      {
        "src": "/images/fotografia/alemania/adobe-010.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Ábside gótico y contrafuertes bajo un cielo nublado.",
        "thumbnail": "/images/fotografia/alemania/adobe-010-thumb.webp",
        "caption": "Ábside gótico y contrafuertes bajo un cielo nublado."
      },
      {
        "src": "/images/fotografia/alemania/adobe-011.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Bóvedas nervadas, altar y profundidad de la nave.",
        "thumbnail": "/images/fotografia/alemania/adobe-011-thumb.webp",
        "caption": "Bóvedas nervadas, altar y profundidad de la nave."
      },
      {
        "src": "/images/fotografia/alemania/adobe-012.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Fachadas de entramado de madera junto al agua.",
        "thumbnail": "/images/fotografia/alemania/adobe-012-thumb.webp",
        "caption": "Fachadas de entramado de madera junto al agua."
      },
      {
        "src": "/images/fotografia/alemania/adobe-013.webp",
        "w": 1351,
        "h": 2400,
        "alt": "Edificaciones bajas frente a una gran explanada.",
        "thumbnail": "/images/fotografia/alemania/adobe-013-thumb.webp",
        "caption": "Edificaciones bajas frente a una gran explanada."
      },
      {
        "src": "/images/fotografia/alemania/adobe-014.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una casa de madera sobre el borde del paisaje abierto.",
        "thumbnail": "/images/fotografia/alemania/adobe-014-thumb.webp",
        "caption": "Una casa de madera sobre el borde del paisaje abierto."
      },
      {
        "src": "/images/fotografia/alemania/adobe-015.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Tablas envejecidas y ventana blanca sobre el muro de madera.",
        "thumbnail": "/images/fotografia/alemania/adobe-015-thumb.webp",
        "caption": "Tablas envejecidas y ventana blanca sobre el muro de madera."
      },
      {
        "src": "/images/fotografia/alemania/adobe-016.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Volumen blanco aislado entre árboles sin hojas.",
        "thumbnail": "/images/fotografia/alemania/adobe-016-thumb.webp",
        "caption": "Volumen blanco aislado entre árboles sin hojas."
      },
      {
        "src": "/images/fotografia/alemania/adobe-017.webp",
        "w": 1800,
        "h": 2399,
        "alt": "Una chimenea de ladrillo dibujando la vertical del conjunto.",
        "thumbnail": "/images/fotografia/alemania/adobe-017-thumb.webp",
        "caption": "Una chimenea de ladrillo dibujando la vertical del conjunto."
      },
      {
        "src": "/images/fotografia/alemania/adobe-018.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Calle empedrada encuadrada por fachadas próximas.",
        "thumbnail": "/images/fotografia/alemania/adobe-018-thumb.webp",
        "caption": "Calle empedrada encuadrada por fachadas próximas."
      },
      {
        "src": "/images/fotografia/alemania/adobe-019.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Campanario de ladrillo: lamas horizontales y una cruz en el cielo.",
        "thumbnail": "/images/fotografia/alemania/adobe-019-thumb.webp",
        "caption": "Campanario de ladrillo: lamas horizontales y una cruz en el cielo."
      },
      {
        "src": "/images/fotografia/alemania/adobe-020.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Ladrillo rojo, ventanas y coronamiento de una fachada histórica.",
        "thumbnail": "/images/fotografia/alemania/adobe-020-thumb.webp",
        "caption": "Ladrillo rojo, ventanas y coronamiento de una fachada histórica."
      },
      {
        "src": "/images/fotografia/alemania/adobe-021.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cúpula de piedra vista desde el patio urbano.",
        "thumbnail": "/images/fotografia/alemania/adobe-021-thumb.webp",
        "caption": "Cúpula de piedra vista desde el patio urbano."
      },
      {
        "src": "/images/fotografia/alemania/adobe-022.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Fachada simétrica y torre de reloj sobre el acceso.",
        "thumbnail": "/images/fotografia/alemania/adobe-022-thumb.webp",
        "caption": "Fachada simétrica y torre de reloj sobre el acceso."
      },
      {
        "src": "/images/fotografia/alemania/adobe-023.webp",
        "w": 1758,
        "h": 2400,
        "alt": "La calle estrecha como marco de una fachada ornamental.",
        "thumbnail": "/images/fotografia/alemania/adobe-023-thumb.webp",
        "caption": "La calle estrecha como marco de una fachada ornamental."
      },
      {
        "src": "/images/fotografia/alemania/adobe-024.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Luz cenital sobre una sala de exposición y su piso de madera.",
        "thumbnail": "/images/fotografia/alemania/adobe-024-thumb.webp",
        "caption": "Luz cenital sobre una sala de exposición y su piso de madera."
      },
      {
        "src": "/images/fotografia/alemania/adobe-025.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Un umbral de madera entre dos espacios de distinta luz.",
        "thumbnail": "/images/fotografia/alemania/adobe-025-thumb.webp",
        "caption": "Un umbral de madera entre dos espacios de distinta luz."
      },
      {
        "src": "/images/fotografia/alemania/adobe-026.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Ventanal de gran escala y figura humana en una sala de museo.",
        "thumbnail": "/images/fotografia/alemania/adobe-026-thumb.webp",
        "caption": "Ventanal de gran escala y figura humana en una sala de museo."
      },
      {
        "src": "/images/fotografia/alemania/adobe-027.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Escalera de madera enmarcada por un muro mineral.",
        "thumbnail": "/images/fotografia/alemania/adobe-027-thumb.webp",
        "caption": "Escalera de madera enmarcada por un muro mineral."
      },
      {
        "src": "/images/fotografia/alemania/adobe-028.webp",
        "w": 1800,
        "h": 2400,
        "alt": "El vacío central del museo conectando niveles y recorridos.",
        "thumbnail": "/images/fotografia/alemania/adobe-028-thumb.webp",
        "caption": "El vacío central del museo conectando niveles y recorridos."
      },
      {
        "src": "/images/fotografia/alemania/adobe-029.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Piedra, madera y luz sobre una secuencia de umbrales.",
        "thumbnail": "/images/fotografia/alemania/adobe-029-thumb.webp",
        "caption": "Piedra, madera y luz sobre una secuencia de umbrales."
      },
      {
        "src": "/images/fotografia/alemania/adobe-030.webp",
        "w": 1351,
        "h": 2400,
        "alt": "Estructura de vidrio y acero en un espacio de gran altura.",
        "thumbnail": "/images/fotografia/alemania/adobe-030-thumb.webp",
        "caption": "Estructura de vidrio y acero en un espacio de gran altura."
      },
      {
        "src": "/images/fotografia/alemania/adobe-031.webp",
        "w": 1351,
        "h": 2400,
        "alt": "Un ventanal reticulado iluminando el interior de hormigón.",
        "thumbnail": "/images/fotografia/alemania/adobe-031-thumb.webp",
        "caption": "Un ventanal reticulado iluminando el interior de hormigón."
      },
      {
        "src": "/images/fotografia/alemania/adobe-032.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Transparencia y estructura en la sala de la Neue Nationalgalerie.",
        "caption": "Neue Nationalgalerie — Berlín · Ludwig Mies van der Rohe",
        "sourceUrl": "https://www.smb.museum/en/museums-institutions/neue-nationalgalerie/about-us/profile",
        "thumbnail": "/images/fotografia/alemania/adobe-032-thumb.webp"
      },
      {
        "src": "/images/fotografia/alemania/adobe-033.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Casa blanca elevada sobre un jardín arbolado.",
        "thumbnail": "/images/fotografia/alemania/adobe-033-thumb.webp",
        "caption": "Casa blanca elevada sobre un jardín arbolado."
      },
      {
        "src": "/images/fotografia/alemania/adobe-034.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Muro de borde y edificio recortados contra las nubes.",
        "thumbnail": "/images/fotografia/alemania/adobe-034-thumb.webp",
        "caption": "Muro de borde y edificio recortados contra las nubes."
      },
      {
        "src": "/images/fotografia/alemania/adobe-035.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Grafitis superpuestos en un interior de escala mínima.",
        "thumbnail": "/images/fotografia/alemania/adobe-035-thumb.webp",
        "caption": "Grafitis superpuestos en un interior de escala mínima."
      },
      {
        "src": "/images/fotografia/alemania/adobe-036.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Pradera y edificios históricos como fondo del recorrido.",
        "thumbnail": "/images/fotografia/alemania/adobe-036-thumb.webp",
        "caption": "Pradera y edificios históricos como fondo del recorrido."
      },
      {
        "src": "/images/fotografia/alemania/adobe-037.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Mampostería irregular y pequeñas ventanas de una torre.",
        "thumbnail": "/images/fotografia/alemania/adobe-037-thumb.webp",
        "caption": "Mampostería irregular y pequeñas ventanas de una torre."
      },
      {
        "src": "/images/fotografia/alemania/adobe-038.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Edificio palaciego frente a una explanada abierta.",
        "thumbnail": "/images/fotografia/alemania/adobe-038-thumb.webp",
        "caption": "Edificio palaciego frente a una explanada abierta."
      },
      {
        "src": "/images/fotografia/alemania/adobe-039.webp",
        "w": 1351,
        "h": 2400,
        "alt": "Una ventana iluminada en la oscuridad de la calle.",
        "thumbnail": "/images/fotografia/alemania/adobe-039-thumb.webp",
        "caption": "Una ventana iluminada en la oscuridad de la calle."
      },
      {
        "src": "/images/fotografia/alemania/adobe-040.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Curvatura y reflejos del cerramiento de vidrio.",
        "thumbnail": "/images/fotografia/alemania/adobe-040-thumb.webp",
        "caption": "Curvatura y reflejos del cerramiento de vidrio."
      },
      {
        "src": "/images/fotografia/alemania/adobe-041.webp",
        "w": 1800,
        "h": 2400,
        "alt": "La oficina de Walter Gropius: luz, mobiliario y proporción interior.",
        "caption": "Oficina de Walter Gropius — Bauhaus, Weimar",
        "sourceUrl": "https://www.uni-weimar.de/de/universitaet/profil/bauhaus-jubilaeen/bauhaus2023/gropius-zimmer-pavillon/",
        "thumbnail": "/images/fotografia/alemania/adobe-041-thumb.webp"
      },
      {
        "src": "/images/fotografia/alemania/adobe-042.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Sombras proyectadas por un ventanal sobre el piso.",
        "thumbnail": "/images/fotografia/alemania/adobe-042-thumb.webp",
        "caption": "Sombras proyectadas por un ventanal sobre el piso."
      },
      {
        "src": "/images/fotografia/alemania/adobe-043.webp",
        "w": 1800,
        "h": 2399,
        "alt": "Objetos expuestos tras un escaparate nocturno.",
        "thumbnail": "/images/fotografia/alemania/adobe-043-thumb.webp",
        "caption": "Objetos expuestos tras un escaparate nocturno."
      },
      {
        "src": "/images/fotografia/alemania/adobe-044.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Fachadas iluminadas y escala peatonal al anochecer.",
        "thumbnail": "/images/fotografia/alemania/adobe-044-thumb.webp",
        "caption": "Fachadas iluminadas y escala peatonal al anochecer."
      },
      {
        "src": "/images/fotografia/alemania/adobe-045.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Un puente de piedra enmarcando el paso del agua.",
        "thumbnail": "/images/fotografia/alemania/adobe-045-thumb.webp",
        "caption": "Un puente de piedra enmarcando el paso del agua."
      },
      {
        "src": "/images/fotografia/alemania/adobe-046.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Vegetación y cielo reflejados sobre un curso de agua.",
        "thumbnail": "/images/fotografia/alemania/adobe-046-thumb.webp",
        "caption": "Vegetación y cielo reflejados sobre un curso de agua."
      },
      {
        "src": "/images/fotografia/alemania/adobe-047.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Un hueco circular como interrupción del muro de piedra.",
        "thumbnail": "/images/fotografia/alemania/adobe-047-thumb.webp",
        "caption": "Un hueco circular como interrupción del muro de piedra."
      },
      {
        "src": "/images/fotografia/alemania/adobe-048.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Puente y follaje reflejados en el agua quieta.",
        "thumbnail": "/images/fotografia/alemania/adobe-048-thumb.webp",
        "caption": "Puente y follaje reflejados en el agua quieta."
      },
      {
        "src": "/images/fotografia/alemania/adobe-049.webp",
        "w": 1800,
        "h": 2400,
        "alt": "El eje interior de un vehículo de transporte colectivo.",
        "thumbnail": "/images/fotografia/alemania/adobe-049-thumb.webp",
        "caption": "El eje interior de un vehículo de transporte colectivo."
      },
      {
        "src": "/images/fotografia/alemania/adobe-050.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cúpula histórica emergiendo entre las copas de los árboles.",
        "thumbnail": "/images/fotografia/alemania/adobe-050-thumb.webp",
        "caption": "Cúpula histórica emergiendo entre las copas de los árboles."
      },
      {
        "src": "/images/fotografia/alemania/adobe-051.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una torre de comunicaciones sobre el cielo de la ciudad.",
        "thumbnail": "/images/fotografia/alemania/adobe-051-thumb.webp",
        "caption": "Una torre de comunicaciones sobre el cielo de la ciudad."
      },
      {
        "src": "/images/fotografia/alemania/adobe-052.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Lucernarios repetidos filtrando la luz sobre el hormigón.",
        "thumbnail": "/images/fotografia/alemania/adobe-052-thumb.webp",
        "caption": "Lucernarios repetidos filtrando la luz sobre el hormigón."
      },
      {
        "src": "/images/fotografia/alemania/adobe-053.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Pasarela de vidrio entre dos volúmenes urbanos.",
        "thumbnail": "/images/fotografia/alemania/adobe-053-thumb.webp",
        "caption": "Pasarela de vidrio entre dos volúmenes urbanos."
      },
      {
        "src": "/images/fotografia/alemania/adobe-054.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Fachada reticulada vista desde la calle en contrapicado.",
        "thumbnail": "/images/fotografia/alemania/adobe-054-thumb.webp",
        "caption": "Fachada reticulada vista desde la calle en contrapicado."
      },
      {
        "src": "/images/fotografia/alemania/adobe-055.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Estelas de hormigón: materia, cielo y escala del recorrido.",
        "caption": "Memorial a los judíos asesinados de Europa — Berlín",
        "sourceUrl": "https://www.stiftung-denkmal.de/en/",
        "thumbnail": "/images/fotografia/alemania/adobe-055-thumb.webp"
      },
      {
        "src": "/images/fotografia/alemania/adobe-056.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Ventanas, molduras y textura de una fachada histórica.",
        "thumbnail": "/images/fotografia/alemania/adobe-056-thumb.webp",
        "caption": "Ventanas, molduras y textura de una fachada histórica."
      },
      {
        "src": "/images/fotografia/alemania/adobe-058.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Columnas y dintel monumental frente al cielo azul.",
        "thumbnail": "/images/fotografia/alemania/adobe-058-thumb.webp",
        "caption": "Columnas y dintel monumental frente al cielo azul."
      },
      {
        "src": "/images/fotografia/alemania/adobe-059.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torre de vidrio y emblema recortados bajo las nubes.",
        "thumbnail": "/images/fotografia/alemania/adobe-059-thumb.webp",
        "caption": "Torre de vidrio y emblema recortados bajo las nubes."
      },
      {
        "src": "/images/fotografia/alemania/adobe-060.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Retícula de vidrio y coronamiento de una torre urbana.",
        "thumbnail": "/images/fotografia/alemania/adobe-060-thumb.webp",
        "caption": "Retícula de vidrio y coronamiento de una torre urbana."
      },
      {
        "src": "/images/fotografia/alemania/adobe-061.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Color y grafiti envolviendo un pasaje interior.",
        "thumbnail": "/images/fotografia/alemania/adobe-061-thumb.webp",
        "caption": "Color y grafiti envolviendo un pasaje interior."
      },
      {
        "src": "/images/fotografia/alemania/adobe-062.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Aguja verde y ornamento sobre el remate de una torre.",
        "thumbnail": "/images/fotografia/alemania/adobe-062-thumb.webp",
        "caption": "Aguja verde y ornamento sobre el remate de una torre."
      },
      {
        "src": "/images/fotografia/alemania/adobe-063.webp",
        "w": 1800,
        "h": 2400,
        "alt": "El acceso urbano como umbral al caer la noche.",
        "thumbnail": "/images/fotografia/alemania/adobe-063-thumb.webp",
        "caption": "El acceso urbano como umbral al caer la noche."
      },
      {
        "src": "/images/fotografia/alemania/adobe-064.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Pasaje lateral entre fachada, escalera y vegetación.",
        "thumbnail": "/images/fotografia/alemania/adobe-064-thumb.webp",
        "caption": "Pasaje lateral entre fachada, escalera y vegetación."
      },
      {
        "src": "/images/fotografia/alemania/adobe-065.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Pabellón blanco dentro de un jardín de trazado regular.",
        "thumbnail": "/images/fotografia/alemania/adobe-065-thumb.webp",
        "caption": "Pabellón blanco dentro de un jardín de trazado regular."
      },
      {
        "src": "/images/fotografia/alemania/adobe-066.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Repetición de ventanas sobre una fachada de gran altura.",
        "thumbnail": "/images/fotografia/alemania/adobe-066-thumb.webp",
        "caption": "Repetición de ventanas sobre una fachada de gran altura."
      },
      {
        "src": "/images/fotografia/alemania/adobe-067.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Campanario gótico recortado contra el cielo azul.",
        "thumbnail": "/images/fotografia/alemania/adobe-067-thumb.webp",
        "caption": "Campanario gótico recortado contra el cielo azul."
      },
      {
        "src": "/images/fotografia/alemania/adobe-068.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Calle estrecha y torre al fondo: capas de profundidad urbana.",
        "thumbnail": "/images/fotografia/alemania/adobe-068-thumb.webp",
        "caption": "Calle estrecha y torre al fondo: capas de profundidad urbana."
      },
      {
        "src": "/images/fotografia/alemania/adobe-069.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Vacíos y ventanas desplazadas en una fachada contemporánea.",
        "thumbnail": "/images/fotografia/alemania/adobe-069-thumb.webp",
        "caption": "Vacíos y ventanas desplazadas en una fachada contemporánea."
      },
      {
        "src": "/images/fotografia/alemania/adobe-070.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Ornamento de piedra alrededor de un acceso monumental.",
        "thumbnail": "/images/fotografia/alemania/adobe-070-thumb.webp",
        "caption": "Ornamento de piedra alrededor de un acceso monumental."
      },
      {
        "src": "/images/fotografia/alemania/adobe-071.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torre y fachadas históricas sobre el borde de una plaza.",
        "thumbnail": "/images/fotografia/alemania/adobe-071-thumb.webp",
        "caption": "Torre y fachadas históricas sobre el borde de una plaza."
      },
      {
        "src": "/images/fotografia/alemania/adobe-072.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Mampostería de ladrillo y remates escalonados contra las nubes.",
        "thumbnail": "/images/fotografia/alemania/adobe-072-thumb.webp",
        "caption": "Mampostería de ladrillo y remates escalonados contra las nubes."
      },
      {
        "src": "/images/fotografia/alemania/adobe-073.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Encuentro de volúmenes y distintas retículas de ventanas.",
        "thumbnail": "/images/fotografia/alemania/adobe-073-thumb.webp",
        "caption": "Encuentro de volúmenes y distintas retículas de ventanas."
      },
      {
        "src": "/images/fotografia/alemania/adobe-074.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cubierta de gran vuelo y geometría escultórica de BMW Welt.",
        "thumbnail": "/images/fotografia/alemania/adobe-074-thumb.webp",
        "caption": "Cubierta de gran vuelo y geometría escultórica de BMW Welt.",
        "sourceUrl": "https://www.bmw-welt.com/en/index.html"
      },
      {
        "src": "/images/fotografia/alemania/adobe-075.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Superficie curva y reflejos bajo la cubierta de BMW Welt.",
        "thumbnail": "/images/fotografia/alemania/adobe-075-thumb.webp",
        "caption": "Superficie curva y reflejos bajo la cubierta de BMW Welt.",
        "sourceUrl": "https://www.bmw-welt.com/en/index.html"
      },
      {
        "src": "/images/fotografia/alemania/adobe-076.webp",
        "w": 1800,
        "h": 2400,
        "alt": "La cubierta encuadrando la torre y el paisaje exterior.",
        "thumbnail": "/images/fotografia/alemania/adobe-076-thumb.webp",
        "caption": "La cubierta encuadrando la torre y el paisaje exterior."
      },
      {
        "src": "/images/fotografia/alemania/adobe-077.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una piel facetada acompañando el recorrido hacia el paisaje.",
        "thumbnail": "/images/fotografia/alemania/adobe-077-thumb.webp",
        "caption": "Una piel facetada acompañando el recorrido hacia el paisaje."
      },
      {
        "src": "/images/fotografia/alemania/adobe-078.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Volúmenes cilíndricos y bandas horizontales de la sede de BMW.",
        "thumbnail": "/images/fotografia/alemania/adobe-078-thumb.webp",
        "caption": "Volúmenes cilíndricos y bandas horizontales de la sede de BMW.",
        "sourceUrl": "https://www.bmw-welt.com/en/index.html"
      },
      {
        "src": "/images/fotografia/alemania/adobe-079.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Calle y fachadas teñidas por la luz del atardecer.",
        "thumbnail": "/images/fotografia/alemania/adobe-079-thumb.webp",
        "caption": "Calle y fachadas teñidas por la luz del atardecer."
      },
      {
        "src": "/images/fotografia/alemania/adobe-080.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Elementos salientes proyectando sombras sobre una fachada de vidrio.",
        "thumbnail": "/images/fotografia/alemania/adobe-080-thumb.webp",
        "caption": "Elementos salientes proyectando sombras sobre una fachada de vidrio."
      },
      {
        "src": "/images/fotografia/alemania/adobe-081.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una cubierta curva organizada por nervios estructurales.",
        "thumbnail": "/images/fotografia/alemania/adobe-081-thumb.webp",
        "caption": "Una cubierta curva organizada por nervios estructurales."
      },
      {
        "src": "/images/fotografia/alemania/adobe-082.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Volumen de oficinas y ventanas repetidas bajo un cielo gris.",
        "thumbnail": "/images/fotografia/alemania/adobe-082-thumb.webp",
        "caption": "Volumen de oficinas y ventanas repetidas bajo un cielo gris."
      },
      {
        "src": "/images/fotografia/alemania/adobe-083.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Marco de piedra y ventanas en una fachada urbana.",
        "thumbnail": "/images/fotografia/alemania/adobe-083-thumb.webp",
        "caption": "Marco de piedra y ventanas en una fachada urbana."
      },
      {
        "src": "/images/fotografia/alemania/adobe-084.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Ritmo de huecos y paños minerales en el cerramiento.",
        "thumbnail": "/images/fotografia/alemania/adobe-084-thumb.webp",
        "caption": "Ritmo de huecos y paños minerales en el cerramiento."
      },
      {
        "src": "/images/fotografia/alemania/adobe-085.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Fachada curva de vidrio frente a una plaza abierta.",
        "thumbnail": "/images/fotografia/alemania/adobe-085-thumb.webp",
        "caption": "Fachada curva de vidrio frente a una plaza abierta."
      },
      {
        "src": "/images/fotografia/alemania/adobe-086.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cables y membrana: una cubierta tensada vista desde abajo.",
        "thumbnail": "/images/fotografia/alemania/adobe-086-thumb.webp",
        "caption": "Cables y membrana: una cubierta tensada vista desde abajo."
      },
      {
        "src": "/images/fotografia/alemania/adobe-087.webp",
        "w": 1800,
        "h": 2400,
        "alt": "La cubierta del Sony Center: vidrio, estructura y cielo.",
        "caption": "Sony Center (actual Center Potsdamer Platz) — Berlín · Cubierta del patio",
        "sourceUrl": "https://www.berlin.de/en/attractions-and-sights/3560868-3104052-sony-center.en.html",
        "thumbnail": "/images/fotografia/alemania/adobe-087-thumb.webp"
      },
      {
        "src": "/images/fotografia/alemania/adobe-088.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Dos fachadas de vidrio encuadrando una franja de cielo.",
        "thumbnail": "/images/fotografia/alemania/adobe-088-thumb.webp",
        "caption": "Dos fachadas de vidrio encuadrando una franja de cielo."
      },
      {
        "src": "/images/fotografia/alemania/adobe-089.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cruce de piezas metálicas sobre la transparencia del cerramiento.",
        "thumbnail": "/images/fotografia/alemania/adobe-089-thumb.webp",
        "caption": "Cruce de piezas metálicas sobre la transparencia del cerramiento."
      },
      {
        "src": "/images/fotografia/alemania/adobe-090.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Capas de vidrio y perfiles horizontales en una esquina urbana.",
        "thumbnail": "/images/fotografia/alemania/adobe-090-thumb.webp",
        "caption": "Capas de vidrio y perfiles horizontales en una esquina urbana."
      },
      {
        "src": "/images/fotografia/alemania/adobe-091.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Retícula blanca de una torre sobre el cielo azul.",
        "thumbnail": "/images/fotografia/alemania/adobe-091-thumb.webp",
        "caption": "Retícula blanca de una torre sobre el cielo azul."
      },
      {
        "src": "/images/fotografia/alemania/adobe-092.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Repetición de balcones y trama vertical en altura.",
        "thumbnail": "/images/fotografia/alemania/adobe-092-thumb.webp",
        "caption": "Repetición de balcones y trama vertical en altura."
      },
      {
        "src": "/images/fotografia/alemania/adobe-093.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Piezas prefabricadas formando una celosía blanca.",
        "thumbnail": "/images/fotografia/alemania/adobe-093-thumb.webp",
        "caption": "Piezas prefabricadas formando una celosía blanca."
      },
      {
        "src": "/images/fotografia/alemania/adobe-094.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Profundidad y sombras en una fachada de trama repetida.",
        "thumbnail": "/images/fotografia/alemania/adobe-094-thumb.webp",
        "caption": "Profundidad y sombras en una fachada de trama repetida."
      },
      {
        "src": "/images/fotografia/alemania/adobe-095.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torre de piedra: textura de los muros y pequeños vanos.",
        "thumbnail": "/images/fotografia/alemania/adobe-095-thumb.webp",
        "caption": "Torre de piedra: textura de los muros y pequeños vanos."
      },
      {
        "src": "/images/fotografia/alemania/adobe-096.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Un círculo reflejado dentro de un jardín frondoso.",
        "thumbnail": "/images/fotografia/alemania/adobe-096-thumb.webp",
        "caption": "Un círculo reflejado dentro de un jardín frondoso."
      },
      {
        "src": "/images/fotografia/alemania/adobe-097.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Encuentro entre cubierta metálica, fachada clara y cielo.",
        "thumbnail": "/images/fotografia/alemania/adobe-097-thumb.webp",
        "caption": "Encuentro entre cubierta metálica, fachada clara y cielo."
      },
      {
        "src": "/images/fotografia/alemania/adobe-098.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Pequeña casa de techo inclinado frente al paisaje de otoño.",
        "thumbnail": "/images/fotografia/alemania/adobe-098-thumb.webp",
        "caption": "Pequeña casa de techo inclinado frente al paisaje de otoño."
      },
      {
        "src": "/images/fotografia/alemania/adobe-099.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cerchas, instalaciones y luz cenital en una nave de gran escala.",
        "thumbnail": "/images/fotografia/alemania/adobe-099-thumb.webp",
        "caption": "Cerchas, instalaciones y luz cenital en una nave de gran escala."
      }
    ]
  },
  {
    "key": "argentina",
    "title": "Argentina",
    "photos": [
      {
        "src": "/images/fotografia/argentina/adobe-001.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Franjas de luz sobre una fachada urbana nocturna.",
        "thumbnail": "/images/fotografia/argentina/adobe-001-thumb.webp",
        "caption": "Franjas de luz sobre una fachada urbana nocturna."
      },
      {
        "src": "/images/fotografia/argentina/adobe-002.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Perfil de edificios frente al cielo del anochecer.",
        "thumbnail": "/images/fotografia/argentina/adobe-002-thumb.webp",
        "caption": "Perfil de edificios frente al cielo del anochecer."
      },
      {
        "src": "/images/fotografia/argentina/adobe-003.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Estructura e iluminación de una nave industrial.",
        "thumbnail": "/images/fotografia/argentina/adobe-003-thumb.webp",
        "caption": "Estructura e iluminación de una nave industrial."
      },
      {
        "src": "/images/fotografia/argentina/adobe-004.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Densidad urbana y ritmo de balcones vistos desde arriba.",
        "thumbnail": "/images/fotografia/argentina/adobe-004-thumb.webp",
        "caption": "Densidad urbana y ritmo de balcones vistos desde arriba."
      },
      {
        "src": "/images/fotografia/argentina/adobe-005.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una fachada alta que se disuelve entre la niebla.",
        "thumbnail": "/images/fotografia/argentina/adobe-005-thumb.webp",
        "caption": "Una fachada alta que se disuelve entre la niebla."
      },
      {
        "src": "/images/fotografia/argentina/adobe-006.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Casa y jardín bajo las copas de los árboles.",
        "thumbnail": "/images/fotografia/argentina/adobe-006-thumb.webp",
        "caption": "Casa y jardín bajo las copas de los árboles."
      },
      {
        "src": "/images/fotografia/argentina/adobe-007.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Ventana horizontal como marco del bosque desde el interior.",
        "thumbnail": "/images/fotografia/argentina/adobe-007-thumb.webp",
        "caption": "Ventana horizontal como marco del bosque desde el interior."
      },
      {
        "src": "/images/fotografia/argentina/adobe-008.webp",
        "w": 1440,
        "h": 1799,
        "alt": "Casa del Puente: arco de hormigón y banda vidriada sobre el arroyo.",
        "caption": "Casa del Puente — Mar del Plata · Amancio Williams",
        "sourceUrl": "https://www.argentina.gob.ar/node/423208",
        "thumbnail": "/images/fotografia/argentina/adobe-008-thumb.webp"
      },
      {
        "src": "/images/fotografia/argentina/adobe-009.webp",
        "w": 1440,
        "h": 1800,
        "alt": "Ventanas y muros cubiertos de imágenes reflejados en el agua del piso.",
        "thumbnail": "/images/fotografia/argentina/adobe-009-thumb.webp",
        "caption": "Ventanas y muros cubiertos de imágenes reflejados en el agua del piso."
      },
      {
        "src": "/images/fotografia/argentina/adobe-010.webp",
        "w": 1440,
        "h": 1800,
        "alt": "Pilares y cubierta de madera en un espacio de transición.",
        "thumbnail": "/images/fotografia/argentina/adobe-010-thumb.webp",
        "caption": "Pilares y cubierta de madera en un espacio de transición."
      },
      {
        "src": "/images/fotografia/argentina/adobe-011.webp",
        "w": 1440,
        "h": 1799,
        "alt": "El bosque visto desde la sombra del alero de hormigón.",
        "thumbnail": "/images/fotografia/argentina/adobe-011-thumb.webp",
        "caption": "El bosque visto desde la sombra del alero de hormigón."
      },
      {
        "src": "/images/fotografia/argentina/adobe-012.webp",
        "w": 1440,
        "h": 1800,
        "alt": "Losas de hormigón superpuestas contra el cielo azul.",
        "thumbnail": "/images/fotografia/argentina/adobe-012-thumb.webp",
        "caption": "Losas de hormigón superpuestas contra el cielo azul."
      },
      {
        "src": "/images/fotografia/argentina/adobe-013.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Troncos y luz filtrada en un paisaje de bosque.",
        "thumbnail": "/images/fotografia/argentina/adobe-013-thumb.webp",
        "caption": "Troncos y luz filtrada en un paisaje de bosque."
      },
      {
        "src": "/images/fotografia/argentina/adobe-014.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Silueta urbana frente al último resplandor del día.",
        "thumbnail": "/images/fotografia/argentina/adobe-014-thumb.webp",
        "caption": "Silueta urbana frente al último resplandor del día."
      },
      {
        "src": "/images/fotografia/argentina/adobe-015.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cielo crepuscular y paisaje abierto en penumbra.",
        "thumbnail": "/images/fotografia/argentina/adobe-015-thumb.webp",
        "caption": "Cielo crepuscular y paisaje abierto en penumbra."
      },
      {
        "src": "/images/fotografia/argentina/adobe-016.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cumbre nevada y nubes sobre el relieve montañoso.",
        "thumbnail": "/images/fotografia/argentina/adobe-016-thumb.webp",
        "caption": "Cumbre nevada y nubes sobre el relieve montañoso."
      },
      {
        "src": "/images/fotografia/argentina/adobe-017.webp",
        "w": 1800,
        "h": 2400,
        "alt": "La ciudad recortada frente a un cielo de atardecer.",
        "thumbnail": "/images/fotografia/argentina/adobe-017-thumb.webp",
        "caption": "La ciudad recortada frente a un cielo de atardecer."
      },
      {
        "src": "/images/fotografia/argentina/adobe-018.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Nieve, horizonte y capas del paisaje de montaña.",
        "thumbnail": "/images/fotografia/argentina/adobe-018-thumb.webp",
        "caption": "Nieve, horizonte y capas del paisaje de montaña."
      },
      {
        "src": "/images/fotografia/argentina/adobe-019.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Agua quieta y cordillera en el horizonte.",
        "thumbnail": "/images/fotografia/argentina/adobe-019-thumb.webp",
        "caption": "Agua quieta y cordillera en el horizonte."
      },
      {
        "src": "/images/fotografia/argentina/adobe-020.webp",
        "w": 1800,
        "h": 2400,
        "alt": "La sombra del relieve sobre la nieve al final del día.",
        "thumbnail": "/images/fotografia/argentina/adobe-020-thumb.webp",
        "caption": "La sombra del relieve sobre la nieve al final del día."
      },
      {
        "src": "/images/fotografia/argentina/adobe-021.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torres, medianeras y densidad del paisaje urbano.",
        "thumbnail": "/images/fotografia/argentina/adobe-021-thumb.webp",
        "caption": "Torres, medianeras y densidad del paisaje urbano."
      },
      {
        "src": "/images/fotografia/argentina/adobe-022.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Escalera y ventanal conectando interior y paisaje.",
        "thumbnail": "/images/fotografia/argentina/adobe-022-thumb.webp",
        "caption": "Escalera y ventanal conectando interior y paisaje."
      },
      {
        "src": "/images/fotografia/argentina/adobe-023.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Celosía de ladrillo: pequeños fragmentos de luz y exterior.",
        "thumbnail": "/images/fotografia/argentina/adobe-023-thumb.webp",
        "caption": "Celosía de ladrillo: pequeños fragmentos de luz y exterior."
      },
      {
        "src": "/images/fotografia/argentina/adobe-024.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Hueco rectangular en el ladrillo como marco de la vegetación.",
        "thumbnail": "/images/fotografia/argentina/adobe-024-thumb.webp",
        "caption": "Hueco rectangular en el ladrillo como marco de la vegetación."
      },
      {
        "src": "/images/fotografia/argentina/adobe-025.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Volumen de hormigón en voladizo sobre una ladera.",
        "thumbnail": "/images/fotografia/argentina/adobe-025-thumb.webp",
        "caption": "Volumen de hormigón en voladizo sobre una ladera."
      },
      {
        "src": "/images/fotografia/argentina/adobe-026.webp",
        "w": 1800,
        "h": 2400,
        "alt": "La implantación de dos volúmenes sobre el relieve natural.",
        "thumbnail": "/images/fotografia/argentina/adobe-026-thumb.webp",
        "caption": "La implantación de dos volúmenes sobre el relieve natural."
      },
      {
        "src": "/images/fotografia/argentina/adobe-027.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una figura humana frente a la escala del paisaje.",
        "thumbnail": "/images/fotografia/argentina/adobe-027-thumb.webp",
        "caption": "Una figura humana frente a la escala del paisaje."
      },
      {
        "src": "/images/fotografia/argentina/adobe-028.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Un monumento vertical iluminado en violeta durante la noche.",
        "thumbnail": "/images/fotografia/argentina/adobe-028-thumb.webp",
        "caption": "Un monumento vertical iluminado en violeta durante la noche."
      },
      {
        "src": "/images/fotografia/argentina/adobe-029.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Alero y fachada en silueta bajo un cielo violeta.",
        "thumbnail": "/images/fotografia/argentina/adobe-029-thumb.webp",
        "caption": "Alero y fachada en silueta bajo un cielo violeta."
      },
      {
        "src": "/images/fotografia/argentina/adobe-030.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Vidrio, estructura oscura y follaje en el encuentro interior-exterior.",
        "thumbnail": "/images/fotografia/argentina/adobe-030-thumb.webp",
        "caption": "Vidrio, estructura oscura y follaje en el encuentro interior-exterior."
      },
      {
        "src": "/images/fotografia/argentina/adobe-031.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una fachada vidriada que se abre hacia el jardín.",
        "thumbnail": "/images/fotografia/argentina/adobe-031-thumb.webp",
        "caption": "Una fachada vidriada que se abre hacia el jardín."
      },
      {
        "src": "/images/fotografia/argentina/adobe-032.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Pilares, alero y césped como transición entre casa y entorno.",
        "thumbnail": "/images/fotografia/argentina/adobe-032-thumb.webp",
        "caption": "Pilares, alero y césped como transición entre casa y entorno."
      },
      {
        "src": "/images/fotografia/argentina/adobe-033.webp",
        "w": 1800,
        "h": 2400,
        "alt": "La ciudad iluminada por el sol bajo del atardecer.",
        "thumbnail": "/images/fotografia/argentina/adobe-033-thumb.webp",
        "caption": "La ciudad iluminada por el sol bajo del atardecer."
      },
      {
        "src": "/images/fotografia/argentina/adobe-034.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torre de vidrio y bandas opacas dentro del tejido urbano.",
        "thumbnail": "/images/fotografia/argentina/adobe-034-thumb.webp",
        "caption": "Torre de vidrio y bandas opacas dentro del tejido urbano."
      },
      {
        "src": "/images/fotografia/argentina/adobe-035.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Escalera helicoidal vista desde abajo: ritmo y estructura.",
        "thumbnail": "/images/fotografia/argentina/adobe-035-thumb.webp",
        "caption": "Escalera helicoidal vista desde abajo: ritmo y estructura."
      },
      {
        "src": "/images/fotografia/argentina/adobe-036.webp",
        "w": 1799,
        "h": 2400,
        "alt": "Luz cenital y cerramiento vidriado en el vacío de una escalera.",
        "thumbnail": "/images/fotografia/argentina/adobe-036-thumb.webp",
        "caption": "Luz cenital y cerramiento vidriado en el vacío de una escalera."
      },
      {
        "src": "/images/fotografia/argentina/adobe-037.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Siluetas humanas frente a la luz de un interior profundo.",
        "thumbnail": "/images/fotografia/argentina/adobe-037-thumb.webp",
        "caption": "Siluetas humanas frente a la luz de un interior profundo."
      },
      {
        "src": "/images/fotografia/argentina/adobe-038.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Un obelisco recortado contra el cielo azul.",
        "thumbnail": "/images/fotografia/argentina/adobe-038-thumb.webp",
        "caption": "Un obelisco recortado contra el cielo azul."
      },
      {
        "src": "/images/fotografia/argentina/adobe-039.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Agujas de una iglesia emergiendo sobre la vegetación.",
        "thumbnail": "/images/fotografia/argentina/adobe-039-thumb.webp",
        "caption": "Agujas de una iglesia emergiendo sobre la vegetación."
      },
      {
        "src": "/images/fotografia/argentina/adobe-040.webp",
        "w": 1350,
        "h": 2400,
        "alt": "Torre de hormigón y profundidad de sus vanos en la esquina urbana.",
        "thumbnail": "/images/fotografia/argentina/adobe-040-thumb.webp",
        "caption": "Torre de hormigón y profundidad de sus vanos en la esquina urbana."
      },
      {
        "src": "/images/fotografia/argentina/adobe-041.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Balcones y distintas capas de una fachada de vivienda.",
        "thumbnail": "/images/fotografia/argentina/adobe-041-thumb.webp",
        "caption": "Balcones y distintas capas de una fachada de vivienda."
      },
      {
        "src": "/images/fotografia/argentina/adobe-042.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Un arco como marco de la vegetación y el cielo.",
        "thumbnail": "/images/fotografia/argentina/adobe-042-thumb.webp",
        "caption": "Un arco como marco de la vegetación y el cielo."
      },
      {
        "src": "/images/fotografia/argentina/adobe-043.webp",
        "w": 1351,
        "h": 2400,
        "alt": "Alero y muro claro en el detalle de una esquina.",
        "thumbnail": "/images/fotografia/argentina/adobe-043-thumb.webp",
        "caption": "Alero y muro claro en el detalle de una esquina."
      },
      {
        "src": "/images/fotografia/argentina/adobe-044.webp",
        "w": 1351,
        "h": 2400,
        "alt": "Curvas y sombras repetidas en una fachada de balcones.",
        "thumbnail": "/images/fotografia/argentina/adobe-044-thumb.webp",
        "caption": "Curvas y sombras repetidas en una fachada de balcones."
      },
      {
        "src": "/images/fotografia/argentina/adobe-045.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Un pabellón bajo dentro de un jardín abierto.",
        "thumbnail": "/images/fotografia/argentina/adobe-045-thumb.webp",
        "caption": "Un pabellón bajo dentro de un jardín abierto."
      }
    ]
  },
  {
    "key": "aruba",
    "title": "Aruba",
    "photos": [
      {
        "src": "/images/fotografia/aruba/adobe-001.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Hotel, piscina y palmeras: reflejos de luz al anochecer.",
        "thumbnail": "/images/fotografia/aruba/adobe-001-thumb.webp",
        "caption": "Hotel, piscina y palmeras: reflejos de luz al anochecer."
      },
      {
        "src": "/images/fotografia/aruba/adobe-002.webp",
        "w": 1800,
        "h": 2400,
        "alt": "El mar y el jardín vistos desde la sombra de un balcón.",
        "thumbnail": "/images/fotografia/aruba/adobe-002-thumb.webp",
        "caption": "El mar y el jardín vistos desde la sombra de un balcón."
      },
      {
        "src": "/images/fotografia/aruba/adobe-003.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una palmera recortada entre roca, follaje y cielo.",
        "thumbnail": "/images/fotografia/aruba/adobe-003-thumb.webp",
        "caption": "Una palmera recortada entre roca, follaje y cielo."
      },
      {
        "src": "/images/fotografia/aruba/adobe-004.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Rocas, agua y presencia humana en el borde costero.",
        "thumbnail": "/images/fotografia/aruba/adobe-004-thumb.webp",
        "caption": "Rocas, agua y presencia humana en el borde costero."
      },
      {
        "src": "/images/fotografia/aruba/adobe-005.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Relieve rocoso y reflejos del sol sobre el mar.",
        "thumbnail": "/images/fotografia/aruba/adobe-005-thumb.webp",
        "caption": "Relieve rocoso y reflejos del sol sobre el mar."
      }
    ]
  },
  {
    "key": "austria",
    "title": "Austria",
    "photos": [
      {
        "src": "/images/fotografia/austria/adobe-001.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Planos de vidrio y remate de cubierta sobre la fachada.",
        "thumbnail": "/images/fotografia/austria/adobe-001-thumb.webp",
        "caption": "Planos de vidrio y remate de cubierta sobre la fachada."
      },
      {
        "src": "/images/fotografia/austria/adobe-002.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Un volumen de gran vuelo sobre el acceso peatonal.",
        "thumbnail": "/images/fotografia/austria/adobe-002-thumb.webp",
        "caption": "Un volumen de gran vuelo sobre el acceso peatonal."
      },
      {
        "src": "/images/fotografia/austria/adobe-003.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Continuidad de fachadas históricas en el borde de la plaza.",
        "thumbnail": "/images/fotografia/austria/adobe-003-thumb.webp",
        "caption": "Continuidad de fachadas históricas en el borde de la plaza."
      },
      {
        "src": "/images/fotografia/austria/adobe-004.webp",
        "w": 1799,
        "h": 2400,
        "alt": "Retícula de ventanas y bandas horizontales en un edificio urbano.",
        "thumbnail": "/images/fotografia/austria/adobe-004-thumb.webp",
        "caption": "Retícula de ventanas y bandas horizontales en un edificio urbano."
      },
      {
        "src": "/images/fotografia/austria/adobe-005.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Edificio y árboles acompañando el borde del agua.",
        "thumbnail": "/images/fotografia/austria/adobe-005-thumb.webp",
        "caption": "Edificio y árboles acompañando el borde del agua."
      },
      {
        "src": "/images/fotografia/austria/adobe-006.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Contraste entre una torre oscura y un volumen de fachada curva.",
        "thumbnail": "/images/fotografia/austria/adobe-006-thumb.webp",
        "caption": "Contraste entre una torre oscura y un volumen de fachada curva."
      },
      {
        "src": "/images/fotografia/austria/adobe-007.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Curvatura de fachada y bandas de luz al anochecer.",
        "thumbnail": "/images/fotografia/austria/adobe-007-thumb.webp",
        "caption": "Curvatura de fachada y bandas de luz al anochecer."
      },
      {
        "src": "/images/fotografia/austria/adobe-008.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Silueta de una torre frente al resplandor del horizonte.",
        "thumbnail": "/images/fotografia/austria/adobe-008-thumb.webp",
        "caption": "Silueta de una torre frente al resplandor del horizonte."
      },
      {
        "src": "/images/fotografia/austria/adobe-009.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Library & Learning Center, Campus WU: el voladizo como gesto de acceso.",
        "caption": "Library & Learning Center, Campus WU — Viena · Zaha Hadid Architects",
        "sourceUrl": "https://www.zaha-hadid.com/architecture/library-and-learning-centre-university-of-economics-vienna/",
        "thumbnail": "/images/fotografia/austria/adobe-009-thumb.webp"
      },
      {
        "src": "/images/fotografia/austria/adobe-010.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Vidrio curvo y reflejos en una fachada contemporánea.",
        "thumbnail": "/images/fotografia/austria/adobe-010-thumb.webp",
        "caption": "Vidrio curvo y reflejos en una fachada contemporánea."
      },
      {
        "src": "/images/fotografia/austria/adobe-011.webp",
        "w": 1800,
        "h": 2400,
        "alt": "La estructura de un alero vista desde el espacio cubierto.",
        "thumbnail": "/images/fotografia/austria/adobe-011-thumb.webp",
        "caption": "La estructura de un alero vista desde el espacio cubierto."
      },
      {
        "src": "/images/fotografia/austria/adobe-012.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Madera y ritmo regular de ventanas sobre la fachada.",
        "thumbnail": "/images/fotografia/austria/adobe-012-thumb.webp",
        "caption": "Madera y ritmo regular de ventanas sobre la fachada."
      },
      {
        "src": "/images/fotografia/austria/adobe-013.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una plaza interior encuadrada por volúmenes claros.",
        "thumbnail": "/images/fotografia/austria/adobe-013-thumb.webp",
        "caption": "Una plaza interior encuadrada por volúmenes claros."
      },
      {
        "src": "/images/fotografia/austria/adobe-014.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Repetición de pequeños huecos en una fachada de gran escala.",
        "thumbnail": "/images/fotografia/austria/adobe-014-thumb.webp",
        "caption": "Repetición de pequeños huecos en una fachada de gran escala."
      },
      {
        "src": "/images/fotografia/austria/adobe-015.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Ventanas profundas: espesor y sombras sobre el muro blanco.",
        "thumbnail": "/images/fotografia/austria/adobe-015-thumb.webp",
        "caption": "Ventanas profundas: espesor y sombras sobre el muro blanco."
      },
      {
        "src": "/images/fotografia/austria/adobe-016.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Madera, vidrio y cambios de textura en el cerramiento.",
        "thumbnail": "/images/fotografia/austria/adobe-016-thumb.webp",
        "caption": "Madera, vidrio y cambios de textura en el cerramiento."
      },
      {
        "src": "/images/fotografia/austria/adobe-017.webp",
        "w": 1800,
        "h": 2400,
        "alt": "La fachada plegándose alrededor de un patio peatonal.",
        "thumbnail": "/images/fotografia/austria/adobe-017-thumb.webp",
        "caption": "La fachada plegándose alrededor de un patio peatonal."
      },
      {
        "src": "/images/fotografia/austria/adobe-018.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torres y composición monumental frente a una explanada.",
        "thumbnail": "/images/fotografia/austria/adobe-018-thumb.webp",
        "caption": "Torres y composición monumental frente a una explanada."
      },
      {
        "src": "/images/fotografia/austria/adobe-019.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cúpula y pórtico de un edificio histórico.",
        "thumbnail": "/images/fotografia/austria/adobe-019-thumb.webp",
        "caption": "Cúpula y pórtico de un edificio histórico."
      },
      {
        "src": "/images/fotografia/austria/adobe-020.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una maqueta mostrando la relación entre edificios y espacios verdes.",
        "thumbnail": "/images/fotografia/austria/adobe-020-thumb.webp",
        "caption": "Una maqueta mostrando la relación entre edificios y espacios verdes."
      },
      {
        "src": "/images/fotografia/austria/adobe-021.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Volumen revestido en madera con un gran paño de vidrio.",
        "thumbnail": "/images/fotografia/austria/adobe-021-thumb.webp",
        "caption": "Volumen revestido en madera con un gran paño de vidrio."
      },
      {
        "src": "/images/fotografia/austria/adobe-022.webp",
        "w": 1799,
        "h": 2400,
        "alt": "Escalera curva de madera al fondo de un pasaje abovedado.",
        "thumbnail": "/images/fotografia/austria/adobe-022-thumb.webp",
        "caption": "Escalera curva de madera al fondo de un pasaje abovedado."
      },
      {
        "src": "/images/fotografia/austria/adobe-023.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cúpula, cornisa y cielo desde la escala de la calle.",
        "thumbnail": "/images/fotografia/austria/adobe-023-thumb.webp",
        "caption": "Cúpula, cornisa y cielo desde la escala de la calle."
      }
    ]
  },
  {
    "key": "costa",
    "title": "Costa Rica",
    "photos": [
      {
        "src": "/images/fotografia/costa/adobe-001.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Puente colgante como recorrido sobre el dosel del bosque.",
        "thumbnail": "/images/fotografia/costa/adobe-001-thumb.webp",
        "caption": "Puente colgante como recorrido sobre el dosel del bosque."
      },
      {
        "src": "/images/fotografia/costa/adobe-002.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Estructura y cables de un puente dentro de la niebla.",
        "thumbnail": "/images/fotografia/costa/adobe-002-thumb.webp",
        "caption": "Estructura y cables de un puente dentro de la niebla."
      },
      {
        "src": "/images/fotografia/costa/adobe-003.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una pasarela roja enmarcada por la vegetación.",
        "thumbnail": "/images/fotografia/costa/adobe-003-thumb.webp",
        "caption": "Una pasarela roja enmarcada por la vegetación."
      },
      {
        "src": "/images/fotografia/costa/adobe-004.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Serpiente enroscada sobre una hoja: textura y camuflaje.",
        "thumbnail": "/images/fotografia/costa/adobe-004-thumb.webp",
        "caption": "Serpiente enroscada sobre una hoja: textura y camuflaje."
      },
      {
        "src": "/images/fotografia/costa/adobe-005.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Pasarela suspendida entre el cielo y el bosque.",
        "thumbnail": "/images/fotografia/costa/adobe-005-thumb.webp",
        "caption": "Pasarela suspendida entre el cielo y el bosque."
      },
      {
        "src": "/images/fotografia/costa/adobe-006.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Serpiente enroscada entre hojas: color y camuflaje.",
        "thumbnail": "/images/fotografia/costa/adobe-006-thumb.webp",
        "caption": "Serpiente enroscada entre hojas: color y camuflaje."
      },
      {
        "src": "/images/fotografia/costa/adobe-007.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Ave en silueta dentro de la trama de ramas y follaje.",
        "thumbnail": "/images/fotografia/costa/adobe-007-thumb.webp",
        "caption": "Ave en silueta dentro de la trama de ramas y follaje."
      },
      {
        "src": "/images/fotografia/costa/adobe-008.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Roedor entre la hojarasca y la luz filtrada del bosque.",
        "thumbnail": "/images/fotografia/costa/adobe-008-thumb.webp",
        "caption": "Roedor entre la hojarasca y la luz filtrada del bosque."
      },
      {
        "src": "/images/fotografia/costa/adobe-009.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Ave posada dentro de un entorno de vegetación densa.",
        "thumbnail": "/images/fotografia/costa/adobe-009-thumb.webp",
        "caption": "Ave posada dentro de un entorno de vegetación densa."
      },
      {
        "src": "/images/fotografia/costa/adobe-010.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Luz y sombra dibujando el fondo arenoso bajo el agua.",
        "thumbnail": "/images/fotografia/costa/adobe-010-thumb.webp",
        "caption": "Luz y sombra dibujando el fondo arenoso bajo el agua."
      },
      {
        "src": "/images/fotografia/costa/adobe-011.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Ondulaciones y reflejos de color sobre la superficie del agua.",
        "thumbnail": "/images/fotografia/costa/adobe-011-thumb.webp",
        "caption": "Ondulaciones y reflejos de color sobre la superficie del agua."
      },
      {
        "src": "/images/fotografia/costa/adobe-012.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Un mamífero sobre la hojarasca del bosque.",
        "thumbnail": "/images/fotografia/costa/adobe-012-thumb.webp",
        "caption": "Un mamífero sobre la hojarasca del bosque."
      },
      {
        "src": "/images/fotografia/costa/adobe-013.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Color intenso de un cangrejo sobre la textura de la corteza.",
        "thumbnail": "/images/fotografia/costa/adobe-013-thumb.webp",
        "caption": "Color intenso de un cangrejo sobre la textura de la corteza."
      },
      {
        "src": "/images/fotografia/costa/adobe-014.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Reptil adherido a un tronco: textura y camuflaje.",
        "thumbnail": "/images/fotografia/costa/adobe-014-thumb.webp",
        "caption": "Reptil adherido a un tronco: textura y camuflaje."
      },
      {
        "src": "/images/fotografia/costa/adobe-015.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Reptil de escamas marcadas descansando sobre una rama.",
        "thumbnail": "/images/fotografia/costa/adobe-015-thumb.webp",
        "caption": "Reptil de escamas marcadas descansando sobre una rama."
      },
      {
        "src": "/images/fotografia/costa/adobe-016.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Reptil mimetizado con la textura de la corteza de un árbol.",
        "thumbnail": "/images/fotografia/costa/adobe-016-thumb.webp",
        "caption": "Reptil mimetizado con la textura de la corteza de un árbol."
      },
      {
        "src": "/images/fotografia/costa/adobe-017.webp",
        "w": 1351,
        "h": 2400,
        "alt": "Mariposa sobre una flor: contraste de color frente al verde desenfocado.",
        "thumbnail": "/images/fotografia/costa/adobe-017-thumb.webp",
        "caption": "Mariposa sobre una flor: contraste de color frente al verde desenfocado."
      },
      {
        "src": "/images/fotografia/costa/adobe-018.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Ave de plumaje rojo y oscuro entre las ramas.",
        "thumbnail": "/images/fotografia/costa/adobe-018-thumb.webp",
        "caption": "Ave de plumaje rojo y oscuro entre las ramas."
      },
      {
        "src": "/images/fotografia/costa/adobe-019.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Un mono observado entre las hojas y la luz filtrada.",
        "thumbnail": "/images/fotografia/costa/adobe-019-thumb.webp",
        "caption": "Un mono observado entre las hojas y la luz filtrada."
      },
      {
        "src": "/images/fotografia/costa/adobe-020.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Perezoso suspendido entre ramas y hojas iluminadas.",
        "thumbnail": "/images/fotografia/costa/adobe-020-thumb.webp",
        "caption": "Perezoso suspendido entre ramas y hojas iluminadas."
      },
      {
        "src": "/images/fotografia/costa/adobe-021.webp",
        "w": 1440,
        "h": 1800,
        "alt": "Un primate recortado entre hojas grandes y troncos.",
        "thumbnail": "/images/fotografia/costa/adobe-021-thumb.webp",
        "caption": "Un primate recortado entre hojas grandes y troncos."
      }
    ]
  },
  {
    "key": "dubai",
    "title": "Emiratos Árabes Unidos",
    "photos": [
      {
        "src": "/images/fotografia/dubai/adobe-001.webp",
        "w": 1350,
        "h": 2400,
        "alt": "Torre escalonada y remate en aguja sobre el cielo.",
        "thumbnail": "/images/fotografia/dubai/adobe-001-thumb.webp",
        "caption": "Torre escalonada y remate en aguja sobre el cielo."
      },
      {
        "src": "/images/fotografia/dubai/adobe-002.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Tres torres dibujando el perfil del paisaje urbano.",
        "thumbnail": "/images/fotografia/dubai/adobe-002-thumb.webp",
        "caption": "Tres torres dibujando el perfil del paisaje urbano."
      },
      {
        "src": "/images/fotografia/dubai/adobe-003.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Verticalidad y retícula de una torre de vidrio.",
        "thumbnail": "/images/fotografia/dubai/adobe-003-thumb.webp",
        "caption": "Verticalidad y retícula de una torre de vidrio."
      },
      {
        "src": "/images/fotografia/dubai/adobe-004.webp",
        "w": 1799,
        "h": 2400,
        "alt": "Remate de fachada y geometría escalonada en altura.",
        "thumbnail": "/images/fotografia/dubai/adobe-004-thumb.webp",
        "caption": "Remate de fachada y geometría escalonada en altura."
      },
      {
        "src": "/images/fotografia/dubai/adobe-005.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una fachada curva emergiendo detrás de un conjunto de edificios.",
        "thumbnail": "/images/fotografia/dubai/adobe-005-thumb.webp",
        "caption": "Una fachada curva emergiendo detrás de un conjunto de edificios."
      },
      {
        "src": "/images/fotografia/dubai/adobe-006.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una torre acristalada como referencia del recorrido urbano.",
        "thumbnail": "/images/fotografia/dubai/adobe-006-thumb.webp",
        "caption": "Una torre acristalada como referencia del recorrido urbano."
      },
      {
        "src": "/images/fotografia/dubai/adobe-007.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Curvatura y repetición de balcones en la fachada.",
        "thumbnail": "/images/fotografia/dubai/adobe-007-thumb.webp",
        "caption": "Curvatura y repetición de balcones en la fachada."
      },
      {
        "src": "/images/fotografia/dubai/adobe-008.webp",
        "w": 1799,
        "h": 2400,
        "alt": "Ventanas romboidales y reflejos en una piel facetada.",
        "thumbnail": "/images/fotografia/dubai/adobe-008-thumb.webp",
        "caption": "Ventanas romboidales y reflejos en una piel facetada."
      },
      {
        "src": "/images/fotografia/dubai/adobe-009.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Volúmenes y bandas horizontales de una torre contemporánea.",
        "thumbnail": "/images/fotografia/dubai/adobe-009-thumb.webp",
        "caption": "Volúmenes y bandas horizontales de una torre contemporánea."
      },
      {
        "src": "/images/fotografia/dubai/adobe-010.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Acero y vidrio en los pliegues verticales de la fachada.",
        "caption": "Burj Khalifa — Dubái · Detalle de la fachada",
        "sourceUrl": "https://www.burjkhalifa.ae/the-tower/architecture-design/",
        "thumbnail": "/images/fotografia/dubai/adobe-010-thumb.webp"
      },
      {
        "src": "/images/fotografia/dubai/adobe-011.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Las curvas y retranqueos del Burj Khalifa vistos desde abajo.",
        "thumbnail": "/images/fotografia/dubai/adobe-011-thumb.webp",
        "caption": "Las curvas y retranqueos del Burj Khalifa vistos desde abajo."
      },
      {
        "src": "/images/fotografia/dubai/adobe-012.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Balcones, franjas y profundidad en la piel del edificio.",
        "thumbnail": "/images/fotografia/dubai/adobe-012-thumb.webp",
        "caption": "Balcones, franjas y profundidad en la piel del edificio."
      },
      {
        "src": "/images/fotografia/dubai/adobe-013.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una torre plegada definiendo un perfil escultórico.",
        "thumbnail": "/images/fotografia/dubai/adobe-013-thumb.webp",
        "caption": "Una torre plegada definiendo un perfil escultórico."
      },
      {
        "src": "/images/fotografia/dubai/adobe-014.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torres próximas y contraste de sus cerramientos.",
        "thumbnail": "/images/fotografia/dubai/adobe-014-thumb.webp",
        "caption": "Torres próximas y contraste de sus cerramientos."
      },
      {
        "src": "/images/fotografia/dubai/adobe-015.webp",
        "w": 1800,
        "h": 2400,
        "alt": "La silueta escalonada de una torre contra el cielo.",
        "thumbnail": "/images/fotografia/dubai/adobe-015-thumb.webp",
        "caption": "La silueta escalonada de una torre contra el cielo."
      },
      {
        "src": "/images/fotografia/dubai/adobe-016.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Aletas y balcones repetidos sobre un paño de vidrio.",
        "thumbnail": "/images/fotografia/dubai/adobe-016-thumb.webp",
        "caption": "Aletas y balcones repetidos sobre un paño de vidrio."
      },
      {
        "src": "/images/fotografia/dubai/adobe-017.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una torre en aguja que se pierde entre las nubes.",
        "thumbnail": "/images/fotografia/dubai/adobe-017-thumb.webp",
        "caption": "Una torre en aguja que se pierde entre las nubes."
      },
      {
        "src": "/images/fotografia/dubai/adobe-018.webp",
        "w": 1351,
        "h": 2400,
        "alt": "Agua turquesa y densidad de torres en el horizonte.",
        "thumbnail": "/images/fotografia/dubai/adobe-018-thumb.webp",
        "caption": "Agua turquesa y densidad de torres en el horizonte."
      },
      {
        "src": "/images/fotografia/dubai/adobe-019.webp",
        "w": 1351,
        "h": 2400,
        "alt": "Burj Khalifa iluminado: una línea vertical dentro de la noche.",
        "thumbnail": "/images/fotografia/dubai/adobe-019-thumb.webp",
        "caption": "Burj Khalifa iluminado: una línea vertical dentro de la noche."
      },
      {
        "src": "/images/fotografia/dubai/adobe-020.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Luces de la ciudad y reflejos bajo un cielo oscuro.",
        "thumbnail": "/images/fotografia/dubai/adobe-020-thumb.webp",
        "caption": "Luces de la ciudad y reflejos bajo un cielo oscuro."
      },
      {
        "src": "/images/fotografia/dubai/adobe-021.webp",
        "w": 1800,
        "h": 2400,
        "alt": "La aguja iluminada de una torre frente al negro del cielo.",
        "thumbnail": "/images/fotografia/dubai/adobe-021-thumb.webp",
        "caption": "La aguja iluminada de una torre frente al negro del cielo."
      },
      {
        "src": "/images/fotografia/dubai/adobe-022.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Retícula y profundidad de un edificio visto en contrapicado.",
        "thumbnail": "/images/fotografia/dubai/adobe-022-thumb.webp",
        "caption": "Retícula y profundidad de un edificio visto en contrapicado."
      },
      {
        "src": "/images/fotografia/dubai/adobe-023.webp",
        "w": 1351,
        "h": 2400,
        "alt": "Franjas cálidas de luz sobre una torre nocturna.",
        "thumbnail": "/images/fotografia/dubai/adobe-023-thumb.webp",
        "caption": "Franjas cálidas de luz sobre una torre nocturna."
      },
      {
        "src": "/images/fotografia/dubai/adobe-024.webp",
        "w": 1800,
        "h": 2400,
        "alt": "The Opus: un gran vacío entre dos volúmenes de vidrio.",
        "caption": "The Opus — Dubái · Zaha Hadid",
        "sourceUrl": "https://opus.omniyat.com/",
        "thumbnail": "/images/fotografia/dubai/adobe-024-thumb.webp"
      },
      {
        "src": "/images/fotografia/dubai/adobe-025.webp",
        "w": 1800,
        "h": 2400,
        "alt": "La abertura vertical del edificio como interrupción del volumen.",
        "thumbnail": "/images/fotografia/dubai/adobe-025-thumb.webp",
        "caption": "La abertura vertical del edificio como interrupción del volumen."
      },
      {
        "src": "/images/fotografia/dubai/adobe-026.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Contraste de alturas y paños de vidrio desde la calle.",
        "thumbnail": "/images/fotografia/dubai/adobe-026-thumb.webp",
        "caption": "Contraste de alturas y paños de vidrio desde la calle."
      },
      {
        "src": "/images/fotografia/dubai/adobe-027.webp",
        "w": 1800,
        "h": 2399,
        "alt": "Una torre estrecha recortada frente al cielo despejado.",
        "thumbnail": "/images/fotografia/dubai/adobe-027-thumb.webp",
        "caption": "Una torre estrecha recortada frente al cielo despejado."
      },
      {
        "src": "/images/fotografia/dubai/adobe-028.webp",
        "w": 1351,
        "h": 2400,
        "alt": "El arco de una rueda panorámica dibujando el cielo.",
        "thumbnail": "/images/fotografia/dubai/adobe-028-thumb.webp",
        "caption": "El arco de una rueda panorámica dibujando el cielo."
      },
      {
        "src": "/images/fotografia/dubai/adobe-029.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torres y horizonte vistos desde la superficie del agua.",
        "thumbnail": "/images/fotografia/dubai/adobe-029-thumb.webp",
        "caption": "Torres y horizonte vistos desde la superficie del agua."
      },
      {
        "src": "/images/fotografia/dubai/adobe-030.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Lamas verticales y tonalidades cálidas de una fachada.",
        "thumbnail": "/images/fotografia/dubai/adobe-030-thumb.webp",
        "caption": "Lamas verticales y tonalidades cálidas de una fachada."
      },
      {
        "src": "/images/fotografia/dubai/adobe-031.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Dos fachadas altas encuadrando una franja de cielo.",
        "thumbnail": "/images/fotografia/dubai/adobe-031-thumb.webp",
        "caption": "Dos fachadas altas encuadrando una franja de cielo."
      },
      {
        "src": "/images/fotografia/dubai/adobe-032.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Curvatura y bandas de color en un cerramiento de vidrio.",
        "thumbnail": "/images/fotografia/dubai/adobe-032-thumb.webp",
        "caption": "Curvatura y bandas de color en un cerramiento de vidrio."
      },
      {
        "src": "/images/fotografia/dubai/adobe-033.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una torre y sus edificios vecinos en el perfil urbano.",
        "thumbnail": "/images/fotografia/dubai/adobe-033-thumb.webp",
        "caption": "Una torre y sus edificios vecinos en el perfil urbano."
      },
      {
        "src": "/images/fotografia/dubai/adobe-034.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Balcones circulares superpuestos sobre una torre de vivienda.",
        "thumbnail": "/images/fotografia/dubai/adobe-034-thumb.webp",
        "caption": "Balcones circulares superpuestos sobre una torre de vivienda."
      },
      {
        "src": "/images/fotografia/dubai/adobe-035.webp",
        "w": 1350,
        "h": 2400,
        "alt": "Volúmenes altos delimitando el vacío de la calle.",
        "thumbnail": "/images/fotografia/dubai/adobe-035-thumb.webp",
        "caption": "Volúmenes altos delimitando el vacío de la calle."
      },
      {
        "src": "/images/fotografia/dubai/adobe-036.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Fachada dorada y coronamiento sobre el cielo.",
        "thumbnail": "/images/fotografia/dubai/adobe-036-thumb.webp",
        "caption": "Fachada dorada y coronamiento sobre el cielo."
      },
      {
        "src": "/images/fotografia/dubai/adobe-037.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torres iluminadas y vegetación en el paisaje nocturno.",
        "thumbnail": "/images/fotografia/dubai/adobe-037-thumb.webp",
        "caption": "Torres iluminadas y vegetación en el paisaje nocturno."
      }
    ]
  },
  {
    "key": "espana",
    "title": "España",
    "photos": [
      {
        "src": "/images/fotografia/espana/adobe-001.webp",
        "w": 1351,
        "h": 2400,
        "alt": "Una fachada ondulante de piedra y balcones escultóricos.",
        "thumbnail": "/images/fotografia/espana/adobe-001-thumb.webp",
        "caption": "Una fachada ondulante de piedra y balcones escultóricos."
      },
      {
        "src": "/images/fotografia/espana/adobe-002.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Color, vidrio y curvas en el detalle de una fachada.",
        "thumbnail": "/images/fotografia/espana/adobe-002-thumb.webp",
        "caption": "Color, vidrio y curvas en el detalle de una fachada."
      },
      {
        "src": "/images/fotografia/espana/adobe-003.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Piel cerámica rojiza y curvatura de una esquina.",
        "thumbnail": "/images/fotografia/espana/adobe-003-thumb.webp",
        "caption": "Piel cerámica rojiza y curvatura de una esquina."
      },
      {
        "src": "/images/fotografia/espana/adobe-004.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torre de bandas horizontales y perfil curvo contra el cielo.",
        "thumbnail": "/images/fotografia/espana/adobe-004-thumb.webp",
        "caption": "Torre de bandas horizontales y perfil curvo contra el cielo."
      },
      {
        "src": "/images/fotografia/espana/adobe-005.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Campanario y ornamentación de piedra vistos desde abajo.",
        "thumbnail": "/images/fotografia/espana/adobe-005-thumb.webp",
        "caption": "Campanario y ornamentación de piedra vistos desde abajo."
      },
      {
        "src": "/images/fotografia/espana/adobe-006.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Alero de gran vuelo acompañando el borde del agua.",
        "thumbnail": "/images/fotografia/espana/adobe-006-thumb.webp",
        "caption": "Alero de gran vuelo acompañando el borde del agua."
      },
      {
        "src": "/images/fotografia/espana/adobe-007.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Celosía ligera filtrando el cielo sobre el recorrido.",
        "thumbnail": "/images/fotografia/espana/adobe-007-thumb.webp",
        "caption": "Celosía ligera filtrando el cielo sobre el recorrido."
      },
      {
        "src": "/images/fotografia/espana/adobe-008.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Ritmo de ventanas y curvas de una torre urbana.",
        "thumbnail": "/images/fotografia/espana/adobe-008-thumb.webp",
        "caption": "Ritmo de ventanas y curvas de una torre urbana."
      },
      {
        "src": "/images/fotografia/espana/adobe-009.webp",
        "w": 1800,
        "h": 2400,
        "alt": "La fachada curva estrechándose en perspectiva.",
        "thumbnail": "/images/fotografia/espana/adobe-009-thumb.webp",
        "caption": "La fachada curva estrechándose en perspectiva."
      },
      {
        "src": "/images/fotografia/espana/adobe-010.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Fachada gótica y arco ornamental de un edificio religioso.",
        "thumbnail": "/images/fotografia/espana/adobe-010-thumb.webp",
        "caption": "Fachada gótica y arco ornamental de un edificio religioso."
      },
      {
        "src": "/images/fotografia/espana/adobe-011.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Plaza, puente y torre como secuencia del recorrido urbano.",
        "thumbnail": "/images/fotografia/espana/adobe-011-thumb.webp",
        "caption": "Plaza, puente y torre como secuencia del recorrido urbano."
      },
      {
        "src": "/images/fotografia/espana/adobe-012.webp",
        "w": 1800,
        "h": 2400,
        "alt": "La escala de una plaza definida por fachadas continuas.",
        "thumbnail": "/images/fotografia/espana/adobe-012-thumb.webp",
        "caption": "La escala de una plaza definida por fachadas continuas."
      },
      {
        "src": "/images/fotografia/espana/adobe-013.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Iluminación nocturna sobre una fachada histórica.",
        "thumbnail": "/images/fotografia/espana/adobe-013-thumb.webp",
        "caption": "Iluminación nocturna sobre una fachada histórica."
      },
      {
        "src": "/images/fotografia/espana/adobe-014.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Rosetón y arcos de piedra vistos desde la plaza.",
        "thumbnail": "/images/fotografia/espana/adobe-014-thumb.webp",
        "caption": "Rosetón y arcos de piedra vistos desde la plaza."
      },
      {
        "src": "/images/fotografia/espana/adobe-015.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Piezas cerámicas formando una celosía de profundidad variable.",
        "thumbnail": "/images/fotografia/espana/adobe-015-thumb.webp",
        "caption": "Piezas cerámicas formando una celosía de profundidad variable."
      },
      {
        "src": "/images/fotografia/espana/adobe-016.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Retícula decorada de un techo artesonado.",
        "thumbnail": "/images/fotografia/espana/adobe-016-thumb.webp",
        "caption": "Retícula decorada de un techo artesonado."
      },
      {
        "src": "/images/fotografia/espana/adobe-017.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Relieves dorados y ornamentación sobre una bóveda.",
        "thumbnail": "/images/fotografia/espana/adobe-017-thumb.webp",
        "caption": "Relieves dorados y ornamentación sobre una bóveda."
      },
      {
        "src": "/images/fotografia/espana/adobe-018.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Metropol Parasol: la retícula de madera dibujando una curva.",
        "caption": "Metropol Parasol, Setas de Sevilla — Sevilla",
        "sourceUrl": "https://www.juntadeandalucia.es/cultura/agendaculturaldeandalucia/espacios/setas-de-sevilla-metropol-parasol",
        "thumbnail": "/images/fotografia/espana/adobe-018-thumb.webp"
      },
      {
        "src": "/images/fotografia/espana/adobe-019.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Luz y sombra sobre una cubierta de piezas triangulares.",
        "thumbnail": "/images/fotografia/espana/adobe-019-thumb.webp",
        "caption": "Luz y sombra sobre una cubierta de piezas triangulares."
      },
      {
        "src": "/images/fotografia/espana/adobe-020.webp",
        "w": 1601,
        "h": 2400,
        "alt": "Un retablo dorado como fondo de una nave interior.",
        "thumbnail": "/images/fotografia/espana/adobe-020-thumb.webp",
        "caption": "Un retablo dorado como fondo de una nave interior."
      },
      {
        "src": "/images/fotografia/espana/adobe-021.webp",
        "w": 1800,
        "h": 2400,
        "alt": "La cubierta curvada enmarcando el cielo y la plaza.",
        "thumbnail": "/images/fotografia/espana/adobe-021-thumb.webp",
        "caption": "La cubierta curvada enmarcando el cielo y la plaza."
      },
      {
        "src": "/images/fotografia/espana/adobe-022.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Las curvas de una cubierta vistas desde el recorrido elevado.",
        "thumbnail": "/images/fotografia/espana/adobe-022-thumb.webp",
        "caption": "Las curvas de una cubierta vistas desde el recorrido elevado."
      },
      {
        "src": "/images/fotografia/espana/adobe-023.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Jardín longitudinal y edificios como marco del eje central.",
        "thumbnail": "/images/fotografia/espana/adobe-023-thumb.webp",
        "caption": "Jardín longitudinal y edificios como marco del eje central."
      },
      {
        "src": "/images/fotografia/espana/adobe-024.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Arco y luz exterior al fondo de una sala ornamentada.",
        "thumbnail": "/images/fotografia/espana/adobe-024-thumb.webp",
        "caption": "Arco y luz exterior al fondo de una sala ornamentada."
      },
      {
        "src": "/images/fotografia/espana/adobe-025.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Muro y cornisa de un edificio histórico frente al cielo.",
        "thumbnail": "/images/fotografia/espana/adobe-025-thumb.webp",
        "caption": "Muro y cornisa de un edificio histórico frente al cielo."
      },
      {
        "src": "/images/fotografia/espana/adobe-026.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Patio circular del Palacio de Carlos V: dos niveles de columnas.",
        "caption": "Palacio de Carlos V, Alhambra — Granada · Patio circular",
        "sourceUrl": "https://www.alhambra-patronato.es/edificios-lugares/palacio-de-carlos-v",
        "thumbnail": "/images/fotografia/espana/adobe-026-thumb.webp"
      },
      {
        "src": "/images/fotografia/espana/adobe-027.webp",
        "w": 1800,
        "h": 2400,
        "alt": "La ciudad vista como tejido continuo desde una posición elevada.",
        "thumbnail": "/images/fotografia/espana/adobe-027-thumb.webp",
        "caption": "La ciudad vista como tejido continuo desde una posición elevada."
      },
      {
        "src": "/images/fotografia/espana/adobe-028.webp",
        "w": 1800,
        "h": 2400,
        "alt": "El alero de madera y la ornamentación del muro.",
        "thumbnail": "/images/fotografia/espana/adobe-028-thumb.webp",
        "caption": "El alero de madera y la ornamentación del muro."
      },
      {
        "src": "/images/fotografia/espana/adobe-029.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Mocárabes: profundidad del arco y transición hacia el cielo.",
        "caption": "Alhambra — Granada · Arco de mocárabes de los Palacios Nazaríes",
        "sourceUrl": "https://www.alhambra-patronato.es/edificios-lugares/sala-de-dos-hermanas",
        "thumbnail": "/images/fotografia/espana/adobe-029-thumb.webp"
      },
      {
        "src": "/images/fotografia/espana/adobe-030.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cúpula de mocárabes: luz y repetición de pequeñas piezas.",
        "caption": "Alhambra — Granada · Cúpula de mocárabes",
        "sourceUrl": "https://www.alhambra-patronato.es/edificios-lugares/sala-de-dos-hermanas",
        "thumbnail": "/images/fotografia/espana/adobe-030-thumb.webp"
      },
      {
        "src": "/images/fotografia/espana/adobe-031.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Un arco ornamentado enmarcando el jardín exterior.",
        "thumbnail": "/images/fotografia/espana/adobe-031-thumb.webp",
        "caption": "Un arco ornamentado enmarcando el jardín exterior."
      },
      {
        "src": "/images/fotografia/espana/adobe-032.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Edificios y vegetación dentro de un paisaje de ladera.",
        "thumbnail": "/images/fotografia/espana/adobe-032-thumb.webp",
        "caption": "Edificios y vegetación dentro de un paisaje de ladera."
      },
      {
        "src": "/images/fotografia/espana/adobe-033.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torre histórica recortada entre árboles y cielo.",
        "thumbnail": "/images/fotografia/espana/adobe-033-thumb.webp",
        "caption": "Torre histórica recortada entre árboles y cielo."
      },
      {
        "src": "/images/fotografia/espana/adobe-034.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Muro de piedra y arbolado sobre el borde del terreno.",
        "thumbnail": "/images/fotografia/espana/adobe-034-thumb.webp",
        "caption": "Muro de piedra y arbolado sobre el borde del terreno."
      },
      {
        "src": "/images/fotografia/espana/adobe-035.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torres y murallas emergiendo sobre una ladera verde.",
        "thumbnail": "/images/fotografia/espana/adobe-035-thumb.webp",
        "caption": "Torres y murallas emergiendo sobre una ladera verde."
      },
      {
        "src": "/images/fotografia/espana/adobe-036.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Volúmenes históricos y vegetación en el perfil de la colina.",
        "thumbnail": "/images/fotografia/espana/adobe-036-thumb.webp",
        "caption": "Volúmenes históricos y vegetación en el perfil de la colina."
      },
      {
        "src": "/images/fotografia/espana/adobe-038.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Pilares, arcos y luz lateral en el espacio de una iglesia.",
        "thumbnail": "/images/fotografia/espana/adobe-038-thumb.webp",
        "caption": "Pilares, arcos y luz lateral en el espacio de una iglesia."
      },
      {
        "src": "/images/fotografia/espana/adobe-039.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cúpula decorada: geometría y luz sobre el espacio central.",
        "thumbnail": "/images/fotografia/espana/adobe-039-thumb.webp",
        "caption": "Cúpula decorada: geometría y luz sobre el espacio central."
      },
      {
        "src": "/images/fotografia/espana/adobe-040.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Profundidad de la nave y dibujo del piso hacia el altar.",
        "thumbnail": "/images/fotografia/espana/adobe-040-thumb.webp",
        "caption": "Profundidad de la nave y dibujo del piso hacia el altar."
      },
      {
        "src": "/images/fotografia/espana/adobe-041.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Tejas y muros blancos recortados bajo el cielo nocturno.",
        "thumbnail": "/images/fotografia/espana/adobe-041-thumb.webp",
        "caption": "Tejas y muros blancos recortados bajo el cielo nocturno."
      },
      {
        "src": "/images/fotografia/espana/adobe-042.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una nave religiosa marcada por bóvedas y luz lateral.",
        "thumbnail": "/images/fotografia/espana/adobe-042-thumb.webp",
        "caption": "Una nave religiosa marcada por bóvedas y luz lateral."
      },
      {
        "src": "/images/fotografia/espana/adobe-043.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Luz de un ventanal al fondo de una mesa interior.",
        "thumbnail": "/images/fotografia/espana/adobe-043-thumb.webp",
        "caption": "Luz de un ventanal al fondo de una mesa interior."
      },
      {
        "src": "/images/fotografia/espana/adobe-044.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Palmeras y borde construido acompañando la costa.",
        "thumbnail": "/images/fotografia/espana/adobe-044-thumb.webp",
        "caption": "Palmeras y borde construido acompañando la costa."
      },
      {
        "src": "/images/fotografia/espana/adobe-045.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torres de vivienda frente al paisaje abierto.",
        "thumbnail": "/images/fotografia/espana/adobe-045-thumb.webp",
        "caption": "Torres de vivienda frente al paisaje abierto."
      },
      {
        "src": "/images/fotografia/espana/adobe-046.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una luminaria y un banco frente al horizonte marino.",
        "thumbnail": "/images/fotografia/espana/adobe-046-thumb.webp",
        "caption": "Una luminaria y un banco frente al horizonte marino."
      },
      {
        "src": "/images/fotografia/espana/adobe-047.webp",
        "w": 1800,
        "h": 2400,
        "alt": "El techo de una cavidad rocosa como marco del cielo.",
        "thumbnail": "/images/fotografia/espana/adobe-047-thumb.webp",
        "caption": "El techo de una cavidad rocosa como marco del cielo."
      },
      {
        "src": "/images/fotografia/espana/adobe-048.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Paisaje rocoso visto desde la sombra de una abertura.",
        "thumbnail": "/images/fotografia/espana/adobe-048-thumb.webp",
        "caption": "Paisaje rocoso visto desde la sombra de una abertura."
      }
    ]
  },
  {
    "key": "hungria",
    "title": "Hungría",
    "photos": [
      {
        "src": "/images/fotografia/hungria/adobe-001.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cúpula y frontón sobre una fachada de composición clásica.",
        "thumbnail": "/images/fotografia/hungria/adobe-001-thumb.webp",
        "caption": "Cúpula y frontón sobre una fachada de composición clásica."
      },
      {
        "src": "/images/fotografia/hungria/adobe-002.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una esquina curva coronada por una cúpula.",
        "thumbnail": "/images/fotografia/hungria/adobe-002-thumb.webp",
        "caption": "Una esquina curva coronada por una cúpula."
      },
      {
        "src": "/images/fotografia/hungria/adobe-003.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torres, cubierta y arcos en una fachada monumental.",
        "thumbnail": "/images/fotografia/hungria/adobe-003-thumb.webp",
        "caption": "Torres, cubierta y arcos en una fachada monumental."
      },
      {
        "src": "/images/fotografia/hungria/adobe-004.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Un edificio histórico extendido frente a la explanada verde.",
        "thumbnail": "/images/fotografia/hungria/adobe-004-thumb.webp",
        "caption": "Un edificio histórico extendido frente a la explanada verde."
      },
      {
        "src": "/images/fotografia/hungria/adobe-005.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cúpula y aguja como remate de una silueta urbana.",
        "thumbnail": "/images/fotografia/hungria/adobe-005-thumb.webp",
        "caption": "Cúpula y aguja como remate de una silueta urbana."
      },
      {
        "src": "/images/fotografia/hungria/adobe-006.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torres gemelas y acceso de una iglesia.",
        "thumbnail": "/images/fotografia/hungria/adobe-006-thumb.webp",
        "caption": "Torres gemelas y acceso de una iglesia."
      },
      {
        "src": "/images/fotografia/hungria/adobe-007.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Columnas y cúpula organizando el frente de un edificio.",
        "thumbnail": "/images/fotografia/hungria/adobe-007-thumb.webp",
        "caption": "Columnas y cúpula organizando el frente de un edificio."
      },
      {
        "src": "/images/fotografia/hungria/adobe-009.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Profundidad de vanos y balcones en una fachada de esquina.",
        "thumbnail": "/images/fotografia/hungria/adobe-009-thumb.webp",
        "caption": "Profundidad de vanos y balcones en una fachada de esquina."
      },
      {
        "src": "/images/fotografia/hungria/adobe-010.webp",
        "w": 1351,
        "h": 2400,
        "alt": "Edificios al otro lado del agua bajo un cielo cubierto.",
        "thumbnail": "/images/fotografia/hungria/adobe-010-thumb.webp",
        "caption": "Edificios al otro lado del agua bajo un cielo cubierto."
      },
      {
        "src": "/images/fotografia/hungria/adobe-011.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torres y cubiertas ornamentadas vistas desde la calle.",
        "thumbnail": "/images/fotografia/hungria/adobe-011-thumb.webp",
        "caption": "Torres y cubiertas ornamentadas vistas desde la calle."
      },
      {
        "src": "/images/fotografia/hungria/adobe-012.webp",
        "w": 1351,
        "h": 2400,
        "alt": "Encuentro de distintas fachadas dentro del tejido urbano.",
        "thumbnail": "/images/fotografia/hungria/adobe-012-thumb.webp",
        "caption": "Encuentro de distintas fachadas dentro del tejido urbano."
      },
      {
        "src": "/images/fotografia/hungria/adobe-013.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Luz de una rueda panorámica frente al cielo nocturno.",
        "thumbnail": "/images/fotografia/hungria/adobe-013-thumb.webp",
        "caption": "Luz de una rueda panorámica frente al cielo nocturno."
      }
    ]
  },
  {
    "key": "italia",
    "title": "Italia",
    "photos": [
      {
        "src": "/images/fotografia/italia/adobe-001.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Emblema Ferrari y brillo de la pintura roja de la carrocería.",
        "thumbnail": "/images/fotografia/italia/adobe-001-thumb.webp",
        "caption": "Emblema Ferrari y brillo de la pintura roja de la carrocería."
      },
      {
        "src": "/images/fotografia/italia/adobe-002.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Un detalle de carrocería: líneas, reflejos y superficie roja.",
        "thumbnail": "/images/fotografia/italia/adobe-002-thumb.webp",
        "caption": "Un detalle de carrocería: líneas, reflejos y superficie roja."
      },
      {
        "src": "/images/fotografia/italia/adobe-003.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Número de competición sobre una pieza de carrocería.",
        "thumbnail": "/images/fotografia/italia/adobe-003-thumb.webp",
        "caption": "Número de competición sobre una pieza de carrocería."
      },
      {
        "src": "/images/fotografia/italia/adobe-004.webp",
        "w": 1800,
        "h": 2399,
        "alt": "Monoplaza de competición iluminado dentro de una sala oscura.",
        "thumbnail": "/images/fotografia/italia/adobe-004-thumb.webp",
        "caption": "Monoplaza de competición iluminado dentro de una sala oscura."
      },
      {
        "src": "/images/fotografia/italia/adobe-005.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cubierta de vidrio y acero recortada contra el cielo.",
        "thumbnail": "/images/fotografia/italia/adobe-005-thumb.webp",
        "caption": "Cubierta de vidrio y acero recortada contra el cielo."
      },
      {
        "src": "/images/fotografia/italia/adobe-006.webp",
        "w": 1800,
        "h": 2399,
        "alt": "Museo Ferrari de Maranello: emblema y acceso.",
        "thumbnail": "/images/fotografia/italia/adobe-006-thumb.webp",
        "caption": "Museo Ferrari de Maranello: emblema y acceso.",
        "sourceUrl": "https://www.ferrari.com/it-CH/museums/ferrari-maranello"
      },
      {
        "src": "/images/fotografia/italia/adobe-007.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Franjas de color y transparencias en el detalle de un automóvil.",
        "thumbnail": "/images/fotografia/italia/adobe-007-thumb.webp",
        "caption": "Franjas de color y transparencias en el detalle de un automóvil."
      },
      {
        "src": "/images/fotografia/italia/adobe-009.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Número y emblema sobre el rojo de un automóvil de competición.",
        "thumbnail": "/images/fotografia/italia/adobe-009-thumb.webp",
        "caption": "Número y emblema sobre el rojo de un automóvil de competición."
      },
      {
        "src": "/images/fotografia/italia/adobe-010.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Edificio y vegetación al final de un recorrido curvo.",
        "thumbnail": "/images/fotografia/italia/adobe-010-thumb.webp",
        "caption": "Edificio y vegetación al final de un recorrido curvo."
      },
      {
        "src": "/images/fotografia/italia/adobe-011.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una fachada urbana marcada por la repetición de ventanas.",
        "thumbnail": "/images/fotografia/italia/adobe-011-thumb.webp",
        "caption": "Una fachada urbana marcada por la repetición de ventanas."
      },
      {
        "src": "/images/fotografia/italia/adobe-012.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una colección gráfica de automóviles sobre un plano blanco.",
        "thumbnail": "/images/fotografia/italia/adobe-012-thumb.webp",
        "caption": "Una colección gráfica de automóviles sobre un plano blanco."
      },
      {
        "src": "/images/fotografia/italia/adobe-013.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Pórtico y paisaje de colinas desde una posición elevada.",
        "thumbnail": "/images/fotografia/italia/adobe-013-thumb.webp",
        "caption": "Pórtico y paisaje de colinas desde una posición elevada."
      },
      {
        "src": "/images/fotografia/italia/adobe-014.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Arcada acompañando una calle en pendiente.",
        "caption": "Pórtico de San Luca — Bolonia",
        "sourceUrl": "https://portici.comune.bologna.it/la-serie/san-luca",
        "thumbnail": "/images/fotografia/italia/adobe-014-thumb.webp"
      },
      {
        "src": "/images/fotografia/italia/adobe-015.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Bóvedas y columnas construyendo la profundidad de un pórtico.",
        "thumbnail": "/images/fotografia/italia/adobe-015-thumb.webp",
        "caption": "Bóvedas y columnas construyendo la profundidad de un pórtico."
      },
      {
        "src": "/images/fotografia/italia/adobe-016.webp",
        "w": 1800,
        "h": 2400,
        "alt": "El pórtico como continuidad entre ciudad y paisaje.",
        "thumbnail": "/images/fotografia/italia/adobe-016-thumb.webp",
        "caption": "El pórtico como continuidad entre ciudad y paisaje."
      }
    ]
  },
  {
    "key": "londres",
    "title": "Reino Unido",
    "photos": [
      {
        "src": "/images/fotografia/londres/adobe-001.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una torre de vidrio afinándose hacia el cielo.",
        "thumbnail": "/images/fotografia/londres/adobe-001-thumb.webp",
        "caption": "Una torre de vidrio afinándose hacia el cielo."
      },
      {
        "src": "/images/fotografia/londres/adobe-002.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Un vehículo sobre el borde de un parque arbolado.",
        "thumbnail": "/images/fotografia/londres/adobe-002-thumb.webp",
        "caption": "Un vehículo sobre el borde de un parque arbolado."
      },
      {
        "src": "/images/fotografia/londres/adobe-003.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Estructura y cabinas de una rueda panorámica vistas desde abajo.",
        "thumbnail": "/images/fotografia/londres/adobe-003-thumb.webp",
        "caption": "Estructura y cabinas de una rueda panorámica vistas desde abajo."
      },
      {
        "src": "/images/fotografia/londres/adobe-004.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Dos fachadas altas enmarcando un rectángulo de cielo.",
        "thumbnail": "/images/fotografia/londres/adobe-004-thumb.webp",
        "caption": "Dos fachadas altas enmarcando un rectángulo de cielo."
      },
      {
        "src": "/images/fotografia/londres/adobe-005.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torre de reloj y puente como referencia del paisaje urbano.",
        "thumbnail": "/images/fotografia/londres/adobe-005-thumb.webp",
        "caption": "Torre de reloj y puente como referencia del paisaje urbano."
      }
    ]
  },
  {
    "key": "monaco",
    "title": "Mónaco",
    "photos": [
      {
        "src": "/images/fotografia/monaco/adobe-001.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Bandas ondulantes y terrazas escalonadas en la fachada.",
        "thumbnail": "/images/fotografia/monaco/adobe-001-thumb.webp",
        "caption": "Bandas ondulantes y terrazas escalonadas en la fachada."
      },
      {
        "src": "/images/fotografia/monaco/adobe-002.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Curvas de hormigón recortadas contra un cielo nublado.",
        "thumbnail": "/images/fotografia/monaco/adobe-002-thumb.webp",
        "caption": "Curvas de hormigón recortadas contra un cielo nublado."
      },
      {
        "src": "/images/fotografia/monaco/adobe-003.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Balcones sinuosos y vacíos entre dos alas del edificio.",
        "thumbnail": "/images/fotografia/monaco/adobe-003-thumb.webp",
        "caption": "Balcones sinuosos y vacíos entre dos alas del edificio."
      },
      {
        "src": "/images/fotografia/monaco/adobe-004.webp",
        "w": 1800,
        "h": 2399,
        "alt": "Bordes curvos repetidos sobre la altura de una fachada.",
        "thumbnail": "/images/fotografia/monaco/adobe-004-thumb.webp",
        "caption": "Bordes curvos repetidos sobre la altura de una fachada."
      },
      {
        "src": "/images/fotografia/monaco/adobe-005.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cornisa, molduras y ventana de un edificio histórico.",
        "thumbnail": "/images/fotografia/monaco/adobe-005-thumb.webp",
        "caption": "Cornisa, molduras y ventana de un edificio histórico."
      },
      {
        "src": "/images/fotografia/monaco/adobe-006.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Terrazas de vivienda abriéndose hacia un jardín central.",
        "thumbnail": "/images/fotografia/monaco/adobe-006-thumb.webp",
        "caption": "Terrazas de vivienda abriéndose hacia un jardín central."
      },
      {
        "src": "/images/fotografia/monaco/adobe-007.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Sombras profundas en los huecos de una fachada.",
        "thumbnail": "/images/fotografia/monaco/adobe-007-thumb.webp",
        "caption": "Sombras profundas en los huecos de una fachada."
      },
      {
        "src": "/images/fotografia/monaco/adobe-008.webp",
        "w": 1799,
        "h": 2400,
        "alt": "Curvas claras y vidrio en la piel del edificio.",
        "thumbnail": "/images/fotografia/monaco/adobe-008-thumb.webp",
        "caption": "Curvas claras y vidrio en la piel del edificio."
      },
      {
        "src": "/images/fotografia/monaco/adobe-009.webp",
        "w": 1800,
        "h": 2400,
        "alt": "La superposición de balcones como juego de vacíos y sombras.",
        "thumbnail": "/images/fotografia/monaco/adobe-009-thumb.webp",
        "caption": "La superposición de balcones como juego de vacíos y sombras."
      },
      {
        "src": "/images/fotografia/monaco/adobe-010.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Tejidos construidos y relieve en el paisaje de la ciudad.",
        "thumbnail": "/images/fotografia/monaco/adobe-010-thumb.webp",
        "caption": "Tejidos construidos y relieve en el paisaje de la ciudad."
      },
      {
        "src": "/images/fotografia/monaco/adobe-011.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Puerto, barcos y ladera urbana vistos desde arriba.",
        "thumbnail": "/images/fotografia/monaco/adobe-011-thumb.webp",
        "caption": "Puerto, barcos y ladera urbana vistos desde arriba."
      },
      {
        "src": "/images/fotografia/monaco/adobe-012.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Edificios frente al agua bajo la luz del anochecer.",
        "thumbnail": "/images/fotografia/monaco/adobe-012-thumb.webp",
        "caption": "Edificios frente al agua bajo la luz del anochecer."
      },
      {
        "src": "/images/fotografia/monaco/adobe-013.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torres de vivienda en el borde de una calle urbana.",
        "thumbnail": "/images/fotografia/monaco/adobe-013-thumb.webp",
        "caption": "Torres de vivienda en el borde de una calle urbana."
      },
      {
        "src": "/images/fotografia/monaco/adobe-014.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Balcones curvos y barandas como capas del cerramiento.",
        "thumbnail": "/images/fotografia/monaco/adobe-014-thumb.webp",
        "caption": "Balcones curvos y barandas como capas del cerramiento."
      }
    ]
  },
  {
    "key": "portugal",
    "title": "Portugal",
    "photos": [
      {
        "src": "/images/fotografia/portugal/adobe-001.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cúpula y tambor emergiendo sobre una fachada clara.",
        "thumbnail": "/images/fotografia/portugal/adobe-001-thumb.webp",
        "caption": "Cúpula y tambor emergiendo sobre una fachada clara."
      },
      {
        "src": "/images/fotografia/portugal/adobe-002.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Mural urbano como plano de color frente al paisaje.",
        "thumbnail": "/images/fotografia/portugal/adobe-002-thumb.webp",
        "caption": "Mural urbano como plano de color frente al paisaje."
      },
      {
        "src": "/images/fotografia/portugal/adobe-003.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Arco de piedra y relieve ornamental contra el cielo.",
        "thumbnail": "/images/fotografia/portugal/adobe-003-thumb.webp",
        "caption": "Arco de piedra y relieve ornamental contra el cielo."
      },
      {
        "src": "/images/fotografia/portugal/adobe-004.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Techos, fachadas y monumentos en el perfil de la ciudad.",
        "thumbnail": "/images/fotografia/portugal/adobe-004-thumb.webp",
        "caption": "Techos, fachadas y monumentos en el perfil de la ciudad."
      },
      {
        "src": "/images/fotografia/portugal/adobe-005.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cubiertas rojizas y densidad del tejido urbano.",
        "thumbnail": "/images/fotografia/portugal/adobe-005-thumb.webp",
        "caption": "Cubiertas rojizas y densidad del tejido urbano."
      },
      {
        "src": "/images/fotografia/portugal/adobe-006.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Balcones metálicos y esquinas en una fachada de vivienda.",
        "thumbnail": "/images/fotografia/portugal/adobe-006-thumb.webp",
        "caption": "Balcones metálicos y esquinas en una fachada de vivienda."
      },
      {
        "src": "/images/fotografia/portugal/adobe-007.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Arcos, óculos y balcón continuo en el remate del edificio.",
        "thumbnail": "/images/fotografia/portugal/adobe-007-thumb.webp",
        "caption": "Arcos, óculos y balcón continuo en el remate del edificio."
      },
      {
        "src": "/images/fotografia/portugal/adobe-008.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Dos fachadas próximas encuadrando el cielo y las nubes.",
        "thumbnail": "/images/fotografia/portugal/adobe-008-thumb.webp",
        "caption": "Dos fachadas próximas encuadrando el cielo y las nubes."
      }
    ]
  },
  {
    "key": "republica-checa",
    "title": "República Checa",
    "photos": [
      {
        "src": "/images/fotografia/republica-checa/adobe-001.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Losas en voladizo y luz lineal en una escena nocturna.",
        "thumbnail": "/images/fotografia/republica-checa/adobe-001-thumb.webp",
        "caption": "Losas en voladizo y luz lineal en una escena nocturna."
      },
      {
        "src": "/images/fotografia/republica-checa/adobe-002.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Escalera y estructura de una nave contemporánea.",
        "thumbnail": "/images/fotografia/republica-checa/adobe-002-thumb.webp",
        "caption": "Escalera y estructura de una nave contemporánea."
      },
      {
        "src": "/images/fotografia/republica-checa/adobe-003.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torres y cornisa de un edificio histórico frente al cielo.",
        "thumbnail": "/images/fotografia/republica-checa/adobe-003-thumb.webp",
        "caption": "Torres y cornisa de un edificio histórico frente al cielo."
      },
      {
        "src": "/images/fotografia/republica-checa/adobe-004.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Agujas góticas recortadas sobre una fachada clara.",
        "thumbnail": "/images/fotografia/republica-checa/adobe-004-thumb.webp",
        "caption": "Agujas góticas recortadas sobre una fachada clara."
      },
      {
        "src": "/images/fotografia/republica-checa/adobe-005.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Esfera decorada y figuras escultóricas de un reloj astronómico.",
        "thumbnail": "/images/fotografia/republica-checa/adobe-005-thumb.webp",
        "caption": "Esfera decorada y figuras escultóricas de un reloj astronómico."
      },
      {
        "src": "/images/fotografia/republica-checa/adobe-006.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Retícula de ventanas y ornamentación sobre la fachada urbana.",
        "thumbnail": "/images/fotografia/republica-checa/adobe-006-thumb.webp",
        "caption": "Retícula de ventanas y ornamentación sobre la fachada urbana."
      },
      {
        "src": "/images/fotografia/republica-checa/adobe-007.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Edificio contemporáneo junto a un remate curvo histórico.",
        "thumbnail": "/images/fotografia/republica-checa/adobe-007-thumb.webp",
        "caption": "Edificio contemporáneo junto a un remate curvo histórico."
      },
      {
        "src": "/images/fotografia/republica-checa/adobe-008.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Tejas de pizarra y ornamento dorado en la cumbrera.",
        "thumbnail": "/images/fotografia/republica-checa/adobe-008-thumb.webp",
        "caption": "Tejas de pizarra y ornamento dorado en la cumbrera."
      },
      {
        "src": "/images/fotografia/republica-checa/adobe-009.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una fachada de esquina de piedra con relieve y balcones.",
        "thumbnail": "/images/fotografia/republica-checa/adobe-009-thumb.webp",
        "caption": "Una fachada de esquina de piedra con relieve y balcones."
      },
      {
        "src": "/images/fotografia/republica-checa/adobe-010.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Esquina curva y remate de cubierta en un edificio urbano.",
        "thumbnail": "/images/fotografia/republica-checa/adobe-010-thumb.webp",
        "caption": "Esquina curva y remate de cubierta en un edificio urbano."
      },
      {
        "src": "/images/fotografia/republica-checa/adobe-011.webp",
        "w": 1800,
        "h": 2400,
        "alt": "La iluminación nocturna resaltando un acceso monumental.",
        "thumbnail": "/images/fotografia/republica-checa/adobe-011-thumb.webp",
        "caption": "La iluminación nocturna resaltando un acceso monumental."
      },
      {
        "src": "/images/fotografia/republica-checa/adobe-012.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Escultura de piedra aislada sobre el cielo oscuro.",
        "thumbnail": "/images/fotografia/republica-checa/adobe-012-thumb.webp",
        "caption": "Escultura de piedra aislada sobre el cielo oscuro."
      },
      {
        "src": "/images/fotografia/republica-checa/adobe-013.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torre y cubierta de una catedral en contrapicado.",
        "thumbnail": "/images/fotografia/republica-checa/adobe-013-thumb.webp",
        "caption": "Torre y cubierta de una catedral en contrapicado."
      },
      {
        "src": "/images/fotografia/republica-checa/adobe-014.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una aguja gótica enmarcada por las ramas de un árbol.",
        "thumbnail": "/images/fotografia/republica-checa/adobe-014-thumb.webp",
        "caption": "Una aguja gótica enmarcada por las ramas de un árbol."
      },
      {
        "src": "/images/fotografia/republica-checa/adobe-015.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Catedral de San Vito: rosetón y fachada gótica.",
        "caption": "Catedral de San Vito — Praga · Fachada gótica",
        "sourceUrl": "https://www.visitczechia.com/pt-pt/things-to-do/places/landmarks/religious-monuments/c-prague-st-vitus-cathedral",
        "thumbnail": "/images/fotografia/republica-checa/adobe-015-thumb.webp"
      },
      {
        "src": "/images/fotografia/republica-checa/adobe-016.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Agua y horizonte bajo la luz cálida del atardecer.",
        "thumbnail": "/images/fotografia/republica-checa/adobe-016-thumb.webp",
        "caption": "Agua y horizonte bajo la luz cálida del atardecer."
      },
      {
        "src": "/images/fotografia/republica-checa/adobe-017.webp",
        "w": 1351,
        "h": 2400,
        "alt": "Una fachada iluminada reflejándose sobre el agua nocturna.",
        "thumbnail": "/images/fotografia/republica-checa/adobe-017-thumb.webp",
        "caption": "Una fachada iluminada reflejándose sobre el agua nocturna."
      }
    ]
  },
  {
    "key": "tailandia",
    "title": "Tailandia",
    "photos": [
      {
        "src": "/images/fotografia/tailandia/adobe-001.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torre de un templo: repetición de niveles y ornamentación.",
        "thumbnail": "/images/fotografia/tailandia/adobe-001-thumb.webp",
        "caption": "Torre de un templo: repetición de niveles y ornamentación."
      },
      {
        "src": "/images/fotografia/tailandia/adobe-002.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Columnas doradas y alero sobre el recorrido cubierto.",
        "thumbnail": "/images/fotografia/tailandia/adobe-002-thumb.webp",
        "caption": "Columnas doradas y alero sobre el recorrido cubierto."
      },
      {
        "src": "/images/fotografia/tailandia/adobe-003.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Agujas y cuerpos escalonados de un conjunto religioso.",
        "thumbnail": "/images/fotografia/tailandia/adobe-003-thumb.webp",
        "caption": "Agujas y cuerpos escalonados de un conjunto religioso."
      },
      {
        "src": "/images/fotografia/tailandia/adobe-004.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Geometría ascendente de una cubierta ornamentada.",
        "thumbnail": "/images/fotografia/tailandia/adobe-004-thumb.webp",
        "caption": "Geometría ascendente de una cubierta ornamentada."
      },
      {
        "src": "/images/fotografia/tailandia/adobe-005.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Pequeñas piezas cerámicas construyendo la superficie de una torre.",
        "thumbnail": "/images/fotografia/tailandia/adobe-005-thumb.webp",
        "caption": "Pequeñas piezas cerámicas construyendo la superficie de una torre."
      },
      {
        "src": "/images/fotografia/tailandia/adobe-006.webp",
        "w": 1800,
        "h": 2400,
        "alt": "El umbral de un templo entre color, relieve y vegetación.",
        "thumbnail": "/images/fotografia/tailandia/adobe-006-thumb.webp",
        "caption": "El umbral de un templo entre color, relieve y vegetación."
      },
      {
        "src": "/images/fotografia/tailandia/adobe-007.webp",
        "w": 1800,
        "h": 2399,
        "alt": "Columnas con mosaicos dorados sosteniendo el alero.",
        "thumbnail": "/images/fotografia/tailandia/adobe-007-thumb.webp",
        "caption": "Columnas con mosaicos dorados sosteniendo el alero."
      },
      {
        "src": "/images/fotografia/tailandia/adobe-008.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cubierta, aguja y ventanas en la fachada de un templo.",
        "thumbnail": "/images/fotografia/tailandia/adobe-008-thumb.webp",
        "caption": "Cubierta, aguja y ventanas en la fachada de un templo."
      },
      {
        "src": "/images/fotografia/tailandia/adobe-009.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Remate de fachada y ornamento bajo el cielo.",
        "thumbnail": "/images/fotografia/tailandia/adobe-009-thumb.webp",
        "caption": "Remate de fachada y ornamento bajo el cielo."
      },
      {
        "src": "/images/fotografia/tailandia/adobe-010.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Frontones blancos y planos de cubierta superpuestos.",
        "thumbnail": "/images/fotografia/tailandia/adobe-010-thumb.webp",
        "caption": "Frontones blancos y planos de cubierta superpuestos."
      },
      {
        "src": "/images/fotografia/tailandia/adobe-011.webp",
        "w": 1800,
        "h": 2400,
        "alt": "La cubierta decorada como coronamiento del conjunto.",
        "thumbnail": "/images/fotografia/tailandia/adobe-011-thumb.webp",
        "caption": "La cubierta decorada como coronamiento del conjunto."
      },
      {
        "src": "/images/fotografia/tailandia/adobe-012.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Luz cálida y paneles geométricos dentro de un interior.",
        "thumbnail": "/images/fotografia/tailandia/adobe-012-thumb.webp",
        "caption": "Luz cálida y paneles geométricos dentro de un interior."
      },
      {
        "src": "/images/fotografia/tailandia/adobe-013.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Franjas de tejas vidriadas: color y repetición en la cubierta.",
        "thumbnail": "/images/fotografia/tailandia/adobe-013-thumb.webp",
        "caption": "Franjas de tejas vidriadas: color y repetición en la cubierta."
      },
      {
        "src": "/images/fotografia/tailandia/adobe-014.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Puerta roja y ornamentación de piedra en el muro exterior.",
        "thumbnail": "/images/fotografia/tailandia/adobe-014-thumb.webp",
        "caption": "Puerta roja y ornamentación de piedra en el muro exterior."
      },
      {
        "src": "/images/fotografia/tailandia/adobe-015.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Patio, agua y torres como secuencia de espacios abiertos.",
        "thumbnail": "/images/fotografia/tailandia/adobe-015-thumb.webp",
        "caption": "Patio, agua y torres como secuencia de espacios abiertos."
      }
    ]
  },
  {
    "key": "uruguay",
    "title": "Uruguay",
    "photos": [
      {
        "src": "/images/fotografia/uruguay/adobe-001.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torres del borde costero bajo un cielo despejado.",
        "thumbnail": "/images/fotografia/uruguay/adobe-001-thumb.webp",
        "caption": "Torres del borde costero bajo un cielo despejado."
      },
      {
        "src": "/images/fotografia/uruguay/adobe-002.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Volúmenes de vivienda y terrazas desplazadas en altura.",
        "thumbnail": "/images/fotografia/uruguay/adobe-002-thumb.webp",
        "caption": "Volúmenes de vivienda y terrazas desplazadas en altura."
      },
      {
        "src": "/images/fotografia/uruguay/adobe-003.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cubierta curva y volumen bajo dentro del paisaje abierto.",
        "thumbnail": "/images/fotografia/uruguay/adobe-003-thumb.webp",
        "caption": "Cubierta curva y volumen bajo dentro del paisaje abierto."
      },
      {
        "src": "/images/fotografia/uruguay/adobe-004.webp",
        "w": 1800,
        "h": 2400,
        "alt": "El edificio emergiendo sobre una explanada verde.",
        "thumbnail": "/images/fotografia/uruguay/adobe-004-thumb.webp",
        "caption": "El edificio emergiendo sobre una explanada verde."
      },
      {
        "src": "/images/fotografia/uruguay/adobe-005.webp",
        "w": 1800,
        "h": 2400,
        "alt": "MACA: fachada, cubierta y espacio de llegada.",
        "thumbnail": "/images/fotografia/uruguay/adobe-005-thumb.webp",
        "caption": "MACA: fachada, cubierta y espacio de llegada.",
        "sourceUrl": "https://carlosott.com/?project=2294"
      },
      {
        "src": "/images/fotografia/uruguay/adobe-006.webp",
        "w": 1800,
        "h": 2400,
        "alt": "La cubierta de madera del MACA como línea continua en el paisaje.",
        "thumbnail": "/images/fotografia/uruguay/adobe-006-thumb.webp",
        "caption": "La cubierta de madera del MACA como línea continua en el paisaje.",
        "sourceUrl": "https://carlosott.com/?project=2294"
      },
      {
        "src": "/images/fotografia/uruguay/adobe-007.webp",
        "w": 1800,
        "h": 2400,
        "alt": "MACA: la curva de la cubierta acompañando el parque de esculturas.",
        "thumbnail": "/images/fotografia/uruguay/adobe-007-thumb.webp",
        "caption": "MACA: la curva de la cubierta acompañando el parque de esculturas.",
        "sourceUrl": "https://carlosott.com/?project=2294"
      },
      {
        "src": "/images/fotografia/uruguay/adobe-008.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Un gran alero de madera y la escala del jardín.",
        "thumbnail": "/images/fotografia/uruguay/adobe-008-thumb.webp",
        "caption": "Un gran alero de madera y la escala del jardín."
      },
      {
        "src": "/images/fotografia/uruguay/adobe-009.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una cuña de hormigón emergiendo del césped.",
        "thumbnail": "/images/fotografia/uruguay/adobe-009-thumb.webp",
        "caption": "Una cuña de hormigón emergiendo del césped."
      },
      {
        "src": "/images/fotografia/uruguay/adobe-010.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cubierta de madera y ménsula vistas desde abajo.",
        "thumbnail": "/images/fotografia/uruguay/adobe-010-thumb.webp",
        "caption": "Cubierta de madera y ménsula vistas desde abajo."
      },
      {
        "src": "/images/fotografia/uruguay/adobe-011.webp",
        "w": 1800,
        "h": 2400,
        "alt": "La estructura curvada de madera y el muro inclinado de hormigón.",
        "thumbnail": "/images/fotografia/uruguay/adobe-011-thumb.webp",
        "caption": "La estructura curvada de madera y el muro inclinado de hormigón."
      },
      {
        "src": "/images/fotografia/uruguay/adobe-012.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Vidrio y costillas de madera en el encuentro con el paisaje.",
        "thumbnail": "/images/fotografia/uruguay/adobe-012-thumb.webp",
        "caption": "Vidrio y costillas de madera en el encuentro con el paisaje."
      },
      {
        "src": "/images/fotografia/uruguay/adobe-013.webp",
        "w": 1800,
        "h": 2400,
        "alt": "La sombra del alero como transición hacia el interior.",
        "thumbnail": "/images/fotografia/uruguay/adobe-013-thumb.webp",
        "caption": "La sombra del alero como transición hacia el interior."
      },
      {
        "src": "/images/fotografia/uruguay/adobe-014.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torres de vivienda frente al cielo y el borde urbano.",
        "thumbnail": "/images/fotografia/uruguay/adobe-014-thumb.webp",
        "caption": "Torres de vivienda frente al cielo y el borde urbano."
      },
      {
        "src": "/images/fotografia/uruguay/adobe-015.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Repetición de balcones formando una trama vertical.",
        "thumbnail": "/images/fotografia/uruguay/adobe-015-thumb.webp",
        "caption": "Repetición de balcones formando una trama vertical."
      },
      {
        "src": "/images/fotografia/uruguay/adobe-016.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Ventanas profundas en una retícula de volúmenes blancos.",
        "thumbnail": "/images/fotografia/uruguay/adobe-016-thumb.webp",
        "caption": "Ventanas profundas en una retícula de volúmenes blancos."
      },
      {
        "src": "/images/fotografia/uruguay/adobe-017.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Retícula de huecos sobre una fachada de vivienda.",
        "thumbnail": "/images/fotografia/uruguay/adobe-017-thumb.webp",
        "caption": "Retícula de huecos sobre una fachada de vivienda."
      },
      {
        "src": "/images/fotografia/uruguay/adobe-018.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torre de balcones curvos recortada contra el cielo azul.",
        "thumbnail": "/images/fotografia/uruguay/adobe-018-thumb.webp",
        "caption": "Torre de balcones curvos recortada contra el cielo azul."
      },
      {
        "src": "/images/fotografia/uruguay/adobe-019.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Franjas de luz y curvas de una torre durante la noche.",
        "thumbnail": "/images/fotografia/uruguay/adobe-019-thumb.webp",
        "caption": "Franjas de luz y curvas de una torre durante la noche."
      },
      {
        "src": "/images/fotografia/uruguay/adobe-020.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Iluminación y ritmo de balcones en el paisaje nocturno.",
        "thumbnail": "/images/fotografia/uruguay/adobe-020-thumb.webp",
        "caption": "Iluminación y ritmo de balcones en el paisaje nocturno."
      },
      {
        "src": "/images/fotografia/uruguay/adobe-021.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torres y espacio público vistos desde la escala de la calle.",
        "thumbnail": "/images/fotografia/uruguay/adobe-021-thumb.webp",
        "caption": "Torres y espacio público vistos desde la escala de la calle."
      }
    ]
  },
  {
    "key": "usa",
    "title": "Estados Unidos",
    "photos": [
      {
        "src": "/images/fotografia/usa/adobe-001.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Un paisaje construido de roca, agua y arquitectura escenográfica.",
        "thumbnail": "/images/fotografia/usa/adobe-001-thumb.webp",
        "caption": "Un paisaje construido de roca, agua y arquitectura escenográfica."
      },
      {
        "src": "/images/fotografia/usa/adobe-002.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Torres de un castillo emergiendo sobre la vegetación.",
        "thumbnail": "/images/fotografia/usa/adobe-002-thumb.webp",
        "caption": "Torres de un castillo emergiendo sobre la vegetación."
      },
      {
        "src": "/images/fotografia/usa/adobe-003.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Grafitis superpuestos dentro de un vano urbano.",
        "thumbnail": "/images/fotografia/usa/adobe-003-thumb.webp",
        "caption": "Grafitis superpuestos dentro de un vano urbano."
      },
      {
        "src": "/images/fotografia/usa/adobe-004.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Institute of Contemporary Art, Miami: planos triangulares y fachada metálica.",
        "caption": "Institute of Contemporary Art, Miami — Aranguren + Gallegos",
        "sourceUrl": "https://wolfbergalvarez.com/projects/ica-miami/",
        "thumbnail": "/images/fotografia/usa/adobe-004-thumb.webp"
      },
      {
        "src": "/images/fotografia/usa/adobe-005.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Calle, arbolado y edificio bajo la luz del atardecer.",
        "thumbnail": "/images/fotografia/usa/adobe-005-thumb.webp",
        "caption": "Calle, arbolado y edificio bajo la luz del atardecer."
      },
      {
        "src": "/images/fotografia/usa/adobe-006.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Una piel azul perforada que se curva sobre la fachada.",
        "thumbnail": "/images/fotografia/usa/adobe-006-thumb.webp",
        "caption": "Una piel azul perforada que se curva sobre la fachada."
      },
      {
        "src": "/images/fotografia/usa/adobe-007.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Reflejos de edificios iluminados sobre el agua nocturna.",
        "thumbnail": "/images/fotografia/usa/adobe-007-thumb.webp",
        "caption": "Reflejos de edificios iluminados sobre el agua nocturna."
      },
      {
        "src": "/images/fotografia/usa/adobe-008.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Apple Aventura: cubierta ondulada y transparencia del cerramiento.",
        "thumbnail": "/images/fotografia/usa/adobe-008-thumb.webp",
        "caption": "Apple Aventura: cubierta ondulada y transparencia del cerramiento.",
        "sourceUrl": "https://www.apple.com/retail/aventura/"
      },
      {
        "src": "/images/fotografia/usa/adobe-009.webp",
        "w": 1800,
        "h": 2400,
        "alt": "La curva del alero de Apple Aventura recortada contra el cielo.",
        "thumbnail": "/images/fotografia/usa/adobe-009-thumb.webp",
        "caption": "La curva del alero de Apple Aventura recortada contra el cielo.",
        "sourceUrl": "https://www.apple.com/retail/aventura/"
      },
      {
        "src": "/images/fotografia/usa/adobe-010.webp",
        "w": 1351,
        "h": 2400,
        "alt": "Apple Aventura: luz interior detrás del gran frente vidriado.",
        "thumbnail": "/images/fotografia/usa/adobe-010-thumb.webp",
        "caption": "Apple Aventura: luz interior detrás del gran frente vidriado.",
        "sourceUrl": "https://www.apple.com/retail/aventura/"
      },
      {
        "src": "/images/fotografia/usa/adobe-011.webp",
        "w": 1800,
        "h": 2400,
        "alt": "Cubierta y fachada de vidrio iluminadas durante la noche.",
        "thumbnail": "/images/fotografia/usa/adobe-011-thumb.webp",
        "caption": "Cubierta y fachada de vidrio iluminadas durante la noche."
      }
    ]
  }
].sort((a,b)=>a.title.localeCompare(b.title,'es'));

const all = series.flatMap((s) => s.photos.map((p) => ({ ...p, series: s.title })));
export const homeSequence = series.map(s=>({...s.photos[0],series:s.title}));
export const heroPhoto = series.find(s=>s.key==='espana')!.photos[0];
