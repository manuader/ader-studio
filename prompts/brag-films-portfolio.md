# Films de portfolio con brag — diseño y prompts

Dos films cortos, hechos con la skill **brag** (versión *slim*: composición HTML donde cada frame es función pura del tiempo, capturada con Playwright y codificada con FFmpeg), pensados **como assets de la web**, no como reels sociales:

| Film | Dónde vive | Formatos | Duración | Audio |
|---|---|---|---|---|
| **OBRA** | Hero de `/proyectos` | 16:9 (1920×1080) + 9:16 (1080×1920) | 20 s, loop perfecto | Mudo (web) |
| **MIRADA** | Hero de `/fotografia` | 16:9 + 9:16 | 16 s, loop perfecto | Mudo (web) |

Salidas en `public/videos/portfolio/`: `<film>-16x9.mp4` (H.264, yuv420p, `+faststart`), `<film>-16x9.webm` (VP9), `<film>-9x16.mp4`, `<film>-9x16.webm`, `<film>-poster.jpg` y `<film>-9x16-poster.jpg`. Peso objetivo: ≤ 6 MB por archivo 16:9 y ≤ 4 MB por 9:16. En la web: `autoplay muted loop playsInline`, `poster`, `<source>` WebM primero, versión 9:16 vía `media` en ≤ 768 px, y con `prefers-reduced-motion` se muestra solo el poster.

## Principios (brag + sistema Ader)

- **Mostrar lo real.** Solo material del portfolio y del sitio: láminas, planos, renders, fotos. Nada de relleno abstracto, ni datos inventados.
- **Tono `polished`**: sobrio, elegante, holds largos, cortes con máscara. Pocas cosas en pantalla a la vez; un único punto focal por plano.
- **Identidad Ader, sin excepciones**: crema `#FAFAF7`, tinta `#1A1917`, grises `#5A5852 / #8A857D / #C8C3BB`, borde `#E2DED6`. Barlow Condensed 800 en mayúsculas + 300 itálica para la segunda línea; Barlow 300 para textos. Líneas onduladas del sitio como textura. Brújula de Ader como firma.
- **Movimiento**: easing de entrada `cubic-bezier(0.22,1,0.36,1)`, máscaras/wipes `cubic-bezier(0.77,0,0.18,1)`. Push-in lentos (≤ 6 %), nada de rebotes. Transiciones escalonadas (sale lo viejo, entra lo nuevo), nunca un crossfade barroso entre dos layouts cargados.
- **Legible**: cada línea que hay que leer queda quieta ≥ 0,3 s por palabra. Margen seguro 80 px laterales y 100 px arriba/abajo (en 1080 de ancho).
- **Loop perfecto**: el último frame empalma con el primero (mismo estado de cámara y composición).
- **Cada frame es posteable**: cualquier pausa del video tiene que servir de imagen.

---

## Film 1 — OBRA (hero de `/proyectos`)

**Ángulo:** el estudio piensa con una línea y termina en la obra. La misma línea recorre un proyecto real (Casa Angel), una reforma construida (Urbetrack) y cinco años de formación (FADU–UBA, Bauhaus-Universität Weimar).

**Hook (0–2,5 s):** sobre crema, una única línea de tinta se dibuja de izquierda a derecha y se quiebra en la grilla modular 4×4 de Casa Angel.

| # | Tiempo | Plano | Material real | Texto en pantalla |
|---|---|---|---|---|
| 1 | 0,0–2,5 | Línea que se dibuja y se convierte en la grilla modular sobre el lote | `portfolio/casa-angel` Etapa 1 (grilla 4×4) | — |
| 2 | 2,5–5,5 | La grilla se entinta en planta; aparece el corte con el refugio elevado | Etapa 3: planta alta + corte del living | **PENSAR** / *el lugar.* |
| 3 | 5,5–9,0 | Wipe de máscara desde la línea del corte a render a sangre; push-in lento | Etapa 4: fachada del patio entre pinos (hero) → pasarela de madera | CASA ANGEL — *Pinamar* |
| 4 | 9,0–12,0 | Axonometrías de Urbetrack (pisos 11-12-13) apiladas en explosión que se cierran | `images/urbetrack/axo-11/12/13` | URBETRACK — *Buenos Aires* |
| 5 | 12,0–15,5 | Marco fijo; los años 2020→2024 cuentan y detrás pasan los renders de FADU; cierre en Weimar (Gaussian Splat) | `portfolio/fadu` (un proyecto por año) + `portfolio/bauhaus-weimar` | FADU–UBA · *Bauhaus Weimar* |
| 6 | 15,5–20,0 | El render se reduce a línea; brújula Ader; la línea vuelve al punto inicial (loop) | Logo/brújula del sitio | Todos los proyectos / *tienen un norte.* |

**9:16:** misma historia, recomposición vertical (títulos arriba, imagen al centro, franja inferior para el pie).

## Film 2 — MIRADA (hero de `/fotografia`)

**Ángulo:** el estudio también mira. Fotos de arquitectura en viaje: estructura, luz, materia. Todas las fotos son verticales, así que el 16:9 se arma con **trípticos** y paneos verticales lentos dentro de ventanas; nunca se recorta una foto de forma fija.

**Hook (0–2 s):** tres ventanas verticales se abren con máscara, una tras otra, sobre crema: la cúpula de estructura radial, el arco de yeserías, el volumen de hormigón en voladizo.

| # | Tiempo | Plano | Material real | Texto |
|---|---|---|---|---|
| 1 | 0,0–3,0 | Tríptico que se abre con máscaras escalonadas; marcas de encuadre en las esquinas | Selección home de fotografía (3 primeras) | — |
| 2 | 3,0–7,0 | La ventana central crece a pantalla completa con paneo vertical lento; las laterales salen | Foto hero (patio circular con columnata) | **FOTOGRAFÍA** / *mirada arquitectónica.* |
| 3 | 7,0–12,0 | Ritmo: ventana central fija, 8 fotos en corte seco cada ~0,6 s, rótulo de la serie cambiando (país) | Home sequence + series | ALEMANIA · ESPAÑA · ARGENTINA… (literal, del portfolio) |
| 4 | 12,0–16,0 | Vuelve el tríptico inicial (loop) con el contador de series | 3 primeras fotos | 11 series / *un mismo lenguaje.* |

---

## Prompts para brag

Para correr en Claude Code dentro del repo, con la skill brag instalada y auditada (en Opus 5.5 brag deriva a *brag-slim*; se respeta).

### Prompt — Film OBRA

```
/brag --tone polished --format landscape --duration 20
Proyecto: la web de Ader Studio (este repo). Film "OBRA" para el hero de /proyectos: un loop mudo de 20 s que muestra cómo el estudio pasa de una línea a la obra.
Seguí el storyboard de prompts/brag-films-portfolio.md (Film 1) al pie de la letra.
Material: public/images/portfolio/casa-angel, public/images/urbetrack (axo-11/12/13), public/images/portfolio/fadu, public/images/portfolio/bauhaus-weimar, el logo/brújula de public/images.
Reglas: identidad Ader (tokens de src/app/globals.css, Barlow Condensed 800/300 itálica, Barlow 300), sin acentos de color, easings del sitio, loop perfecto (último frame = primero), sin audio, nada inventado.
Entregá además una versión 9:16 recompuesta.
Render: capturá a 2× y bajá a 1920×1080 (y 1080×1920), 30 fps, H.264 CRF 22 yuv420p +faststart y VP9 CRF 34; poster del frame más fuerte asentado. Guardá en public/videos/portfolio/obra-*.
```

### Prompt — Film MIRADA

```
/brag --tone polished --format landscape --duration 16
Film "MIRADA" para el hero de /fotografia de la web de Ader Studio: un loop mudo de 16 s sobre la fotografía de arquitectura del estudio.
Seguí el storyboard de prompts/brag-films-portfolio.md (Film 2).
Material: public/images/fotografia/<serie>/*.webp y el orden de la home en src/components/portfolio/data/fotografia.ts. Las fotos son todas verticales: usalas en ventanas/trípticos y paneos lentos, nunca recortes fijos ni filtros.
Reglas: identidad Ader, rótulos de serie literales (nombres de país del portfolio), loop perfecto, sin audio.
Entregá versión 9:16. Render igual que OBRA. Guardá en public/videos/portfolio/mirada-*.
```
