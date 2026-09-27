# Prompt — Integrar el portfolio de arquitectura y fotografía en la web de Ader Studio

> Copiá todo lo que está debajo de la línea y pegalo en Claude Code dentro del repo `ader-studio`, adjuntando los PDF/carpetas del portfolio. Reemplazá lo que está entre `[corchetes]`.

---

## Rol y objetivo

Sos un diseñador-desarrollador senior especializado en sitios de estudios de arquitectura high-end. Vas a **ampliar** el sitio de Ader Studio (Next.js 16 + React 19 + CSS Modules + GSAP, en este repo) incorporando **todo** el contenido de dos portfolios:

- **Portfolio de arquitectura:** `[ruta o link al PDF/carpeta]`
- **Portfolio de fotografía:** `[ruta o link al PDF/carpeta]`

El resultado tiene que verse como si siempre hubiera sido parte del sitio: mismo lenguaje visual, misma calidad de movimiento, misma voz. No es un rediseño: es una ampliación.

## Reglas inquebrantables

1. **No modifiques lo que ya existe.** No cambies el diseño, los textos, el orden ni el comportamiento de las secciones actuales (`LogoIntro`, `Navbar`, `Hero`, `FachadaReveal`, `Vision`, `Proceso`, `VideoShowcase`, `Bim`, `Proyectos`, `RendersGallery`, `Metodologia`, `Contacto`, `Footer`) ni de la página `/proyectos/urbetrack`. Solo se permiten estos cambios mínimos, y cada uno se justifica en el resumen final:
   - agregar entradas nuevas a `src/components/proyectos/projects.ts` (incluido `href` a su página de caso);
   - agregar ítems nuevos a los links del `Navbar` y del `Footer`;
   - agregar nuevas secciones o rutas.
2. **No inventes contenido.** Todo texto, dato, año, ubicación, superficie, cliente o crédito sale del portfolio. Si falta un dato, omitilo; no lo rellenes. No uses lenguaje de marketing genérico.
3. **Todo el portfolio entra.** Cada proyecto, cada serie fotográfica y cada imagen relevante tiene un lugar. Antes de escribir código hacé un **inventario** (ver Paso 1) y al final demostrá que no quedó nada afuera.
4. **Reutilizá antes de crear.** Si un patrón existe (carrusel de `Proyectos`, galería horizontal de `RendersGallery`, reveal de `FachadaReveal`, capas de `Bim`, pasos de `Proceso`, caso de estudio de `case-urbetrack`), extendelo o duplicalo con los mismos tokens; no inventes un estilo nuevo.

## Sistema visual que tenés que respetar (extraído del código actual)

**Tokens (`src/app/globals.css`) — usá siempre las variables, nunca hex sueltos:**
- `--bg #FAFAF7` (crema, fondo principal) · `--bg2 #F2EFE9` · `--bg3 #EBE7E0` · `#ffffff` para secciones alternas.
- `--white #1A1917` (**es la tinta/texto principal**, no blanco) · `--gray1 #5A5852` · `--gray2 #8A857D` · `--gray3 #C8C3BB` · `--border #E2DED6`.
- El sitio es **monocromo cálido**. El color lo aportan solo las imágenes. No agregues acentos de color de marca (el violeta de Urbetrack vive únicamente en su caso de estudio).

**Tipografía:**
- `var(--font-c)` = Barlow Condensed para títulos, labels, navegación y números: pesos 800 (títulos, siempre en MAYÚSCULAS) y 300 itálica para la segunda línea contrastada (`.sec-title em`).
- `var(--font-b)` = Barlow 300/400 para párrafos, con line-height de 1.65 a 1.75 y color `--gray1`.
- Labels: 10–13 px, peso 600, `letter-spacing` de 0.15em a 0.3em, mayúsculas, color `--gray2`.
- Títulos de sección con `clamp(40px, 5vw, 72px)` y line-height 0.95. Números grandes en Barlow 300.
- Usá las clases globales existentes: `.sec-label` (con la línea de 24 px antes), `.sec-title` + `<em>`, `.btn-ghost`, `.btn-text`, `.btn-primary`, `.reveal` + `.rd1`–`.rd4` (animadas por `ScrollReveal`).

**Layout:**
- Padding de sección: `120px 40px` (o `100px 40px`) en desktop y `80px 20px` en ≤768 px. Separación entre secciones con `border-top: 1px solid var(--border)`, alternando fondo `--bg` y `#ffffff`.
- Breakpoints: 1024 px y 768 px. Mobile-first en los detalles: nada se corta, sin scroll horizontal.
- Mucho aire, alineación a la izquierda, grillas asimétricas (4/6, 5/7), imágenes grandes con borde `1px var(--border)`, sin sombras pesadas ni radios (esquinas rectas).

**Movimiento:**
- Easing firma: `cubic-bezier(0.22, 1, 0.36, 1)` para entradas; `cubic-bezier(0.77, 0, 0.18, 1)` para máscaras y wipes; `cubic-bezier(0.34, 1.56, 0.64, 1)` solo para rebotes pequeños.
- Recursos existentes a reutilizar: reveal al scroll (fade + translateY 20 px), secciones fijadas (sticky) con progreso de scroll y GSAP ScrollTrigger (ver `VideoShowcase` y `RendersGallery`), zoom suave de imagen en hover (`scale(1.03)`), líneas SVG onduladas animadas de fondo (ver `Hero` y `Proyectos`) y el cursor personalizado del sitio (`html.cursor-ready`).
- Respetá `prefers-reduced-motion`. Nada de rebotes exagerados, parallax mareante ni transiciones de más de 1,2 s.

**Voz:** español rioplatense, sobria y precisa, frases cortas. Los títulos combinan una línea fuerte en mayúsculas con una segunda línea en itálica liviana (ej.: "PROYECTOS / *Destacados*", "Arquitectura / *que emerge del lugar.*").

## Qué construir

### Paso 1 — Inventario (antes de programar)
Leé ambos portfolios completos y escribí `prompts/inventario-portfolio.md` con:
- **Arquitectura:** por proyecto, nombre, tipología, ubicación, año o estado, superficie, rol del estudio, descripción literal y lista de imágenes (render, foto de obra, planta, corte, axonométrica, diagrama, maqueta, detalle).
- **Fotografía:** por serie, título, lugar y fecha si existen, texto curatorial y cantidad de fotos, con orientación de cada una.
- Qué ya está en el sitio (Casa Angel, Urbetrack y los renders de `RendersGallery`) y qué es nuevo. Marcá los duplicados.

### Paso 2 — Assets
- Extraé las imágenes a máxima calidad, convertilas a `.webp` (calidad 82–85, lado largo máximo de 2400 px) y guardalas en `public/images/portfolio/<slug-proyecto>/` y `public/images/fotografia/<slug-serie>/`, con nombres descriptivos.
- Recortá márgenes blancos de las láminas; conservá el blanco solo si forma parte del dibujo.
- Guardá ancho, alto y relación de aspecto en los archivos de datos para evitar saltos de layout (CLS).
- Usá siempre `next/image` con `sizes` correctos. Priorizá solo lo que está arriba del pliegue.

### Paso 3 — Arquitectura
1. Sumá cada proyecto a `projects.ts` con `tag`, `name`, `location`, `year` y `href`, para que aparezca en el carrusel "Proyectos Destacados" sin tocar su diseño.
2. Creá una ruta `/proyectos/[slug]` generada desde un único archivo de datos (`src/components/portfolio/projects-data.ts`) con una plantilla de caso de estudio que siga la estructura de `/proyectos/urbetrack`, pero con la **estética monocroma de Ader** (sin acentos de color):
   - hero con imagen principal y título a dos líneas;
   - ficha técnica en tira (solo datos reales);
   - memoria o concepto;
   - planos y diagramas con interacción sobria: comparador antes/después, visor con lupa o capas, según el material disponible;
   - galería de imágenes;
   - navegación "Proyecto anterior / siguiente" y CTA a contacto.

   Si un proyecto tiene poco material, usá una versión corta de la misma plantilla. Nunca rellenes.
3. Agregá una página índice `/proyectos` con todos los proyectos: grilla editorial asimétrica, filtro por tipología con los mismos botones que `.btn-ghost`, hover con zoom de imagen y línea de borde como en las cards actuales.

### Paso 4 — Fotografía
1. Creá una sección nueva en la home, **después de `RendersGallery` y antes de `Metodologia`**, con el título "FOTOGRAFÍA / *mirada arquitectónica.*" (o el título que proponga el portfolio). Usá una galería horizontal fijada al scroll con la misma mecánica que `RendersGallery`, alternando fotos verticales y horizontales con alturas y desfases variables y frases cortas intercaladas tomadas de los textos del portfolio.
2. Creá una ruta `/fotografia` con todas las series. Cada serie lleva un encabezado (label + título) y una grilla tipo masonry que respeta la proporción original de cada foto, sin recortes que cambien el encuadre.
3. Sumá un visor a pantalla completa (lightbox) con fondo `--bg` al 96 %, flechas, teclado (← → Esc), swipe en mobile, contador "03 / 24" en Barlow Condensed y pie de foto si existe. Sin librerías pesadas: CSS Modules y React.
4. Las fotos van siempre a color original: sin filtros, viñetas ni duotonos agregados.

### Paso 5 — Navegación
- En el `Navbar` sumá los links "Proyectos" (a `/proyectos`) y "Fotografía" (a `/fotografia` o al ancla de la home), con el mismo estilo `.navLink` y el estado activo.
- En el `Footer` sumá los mismos links. Hacé que los anchors funcionen desde cualquier ruta (`/#contacto`).

## Estándar de calidad high-end (checklist obligatorio)

- [ ] Cada imagen con relación de aspecto definida: nada salta al cargar.
- [ ] Jerarquía tipográfica idéntica a la del sitio actual (comparala lado a lado con `Proyectos` y `Vision`).
- [ ] Ninguna sección nueva usa colores, fuentes, radios ni sombras que no existan en el sitio.
- [ ] Animaciones con los easings indicados; todo lo de scroll es suave a 60 fps (solo `transform` y `opacity`).
- [ ] Responsive probado a 1440, 1024, 768 y 390 px de ancho, sin overflow horizontal.
- [ ] Accesibilidad: `alt` descriptivo en cada imagen, foco visible, contraste AA en textos, navegación por teclado del lightbox.
- [ ] Rendimiento: las imágenes fuera de pantalla con `loading="lazy"`; ninguna ruta nueva supera 250 KB de JS de primera carga adicional.
- [ ] `npx next build` sin errores ni warnings de tipos.

## Verificación antes de entregar

1. Corré `npm run build` y levantá `next start`.
2. Con Playwright sacá capturas de la home completa y de cada ruta nueva en 1440 × 900 y 390 × 844. Revisalas: textos cortados, solapamientos, contraste, imágenes pixeladas.
3. Compará las secciones existentes antes y después (capturas o diff de CSS): **tienen que ser idénticas**.
4. Comprobá contra el inventario que cada proyecto y cada serie fotográfica aparece en el sitio.

## Entrega

- Commits chicos y descriptivos, uno por paso, en la rama de trabajo.
- Un resumen final con:
  - rutas nuevas;
  - secciones agregadas y dónde;
  - tabla inventario → ubicación en el sitio;
  - cambios mínimos hechos a archivos existentes y por qué;
  - datos que faltaban en el portfolio y quedaron omitidos;
  - capturas de desktop y mobile.
