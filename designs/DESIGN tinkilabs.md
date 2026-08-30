# Tinkilabs — Sistema de diseño
> Papel de taller recortado a troquel. Fondo crema cálido, tarjetas con filo dibujado, y un solo naranja que solo aparece donde hay que pulsar.

**Tema:** claro
**Versión:** 1.0 — 2026-08-28
**Aplicado en:** `web/app/concepto-d/`

---

## De dónde sale

Síntesis deliberada de tres referencias, cada una aportando una cosa:

| Referencia | Qué se toma | Qué se descarta |
|---|---|---|
| **Getharvest** — golden hour workbench | El suelo crema cálido y la disciplina de un único acento cromático sobre neutros | Su tipografía serif de display; su condición de SaaS adulto |
| **Slush** — inflatable sticker universe | El filo de troquel de 1-2px en todo, la tipografía aplastada, los stickers, el collage, la marquesina | **La paleta arcoíris.** Slush usa seis colores a la vez y prohíbe elegir un acento. Aquí se hace lo contrario |
| **Lamborghini** — one yellow car | La regla del acento único: *un solo elemento de color por pantalla, o deja de ser señal* | El radio 0px, las mayúsculas obligatorias y la dependencia de fotografía |

**El reparto es el 70/30 de la guía de marca:** el 70% de precisión técnica lo da la contención de Getharvest; el 30% de energía lo dan el troquel y el collage de Slush.

---

## Tokens — Color

| Nombre | Valor | Token | Rol |
|---|---|---|---|
| Paper | `#FAF3EA` | `--tk-paper` | Lienzo de página. **Derivado de Birch Wood a luminosidad alta.** Sustituye al blanco: el `#EDF8FB` de la guía es un blanco frío y pelea con la madera |
| Card | `#FFFFFF` | `--tk-card` | Superficie de tarjeta troquelada, campos de formulario |
| Ink | `#4B260E` | `--tk-ink` | Timber Brown. **Todo el texto y todos los contornos.** Es el "negro" del sistema |
| Ink Soft | `#7A5540` | `--tk-ink-soft` | Texto secundario, metadatos |
| Ink Faint | `#A98A72` | `--tk-ink-faint` | Texto terciario, placeholders |
| Wood | `#BF946C` | `--tk-wood` | Birch Wood. Rellenos planos de stickers y del motivo de madera |
| Wood Pale | `#E4CDB4` | `--tk-wood-pale` | Banda de sección alterna, rellenos suaves |
| Orange | `#FF6B35` | `--tk-orange` | Tinki Orange. **Único acento cromático. Un elemento por pantalla** |
| Orange Deep | `#D8480F` | `--tk-orange-deep` | Estado hover del CTA |
| Green | `#2ECC71` | `--tk-green` | **Solo estado semántico de éxito.** Nunca decorativo |

### La regla del acento

El naranja aparece en **exactamente un elemento por viewport**, y ese elemento es casi siempre el botón de acción principal. En cualquier otro sitio el papel de acento lo hacen los rellenos de Birch Wood o los contornos de Timber Brown.

Excepciones permitidas, solo dos:
1. Un numeral gigante que sea el sujeto de su propia sección (el "100" de Fundadores), **si en ese viewport no hay CTA**.
2. **El logotipo.** El wordmark y el icono de Tinki llevan naranja de marca y quedan exentos: son identidad, no señal. No cuentan para el recuento por viewport.

Por qué: el naranja Tinki es un color de croma muy alto. Repartido, satura la vista y deja de leerse como señal — se probó a pantalla completa y el resultado fue expulsivo. Concentrado sobre crema, se ve más con mucha menos superficie.

---

## Tokens — Tipografía

### Anton — display
- **Uso:** solo momentos grandes. Titular de héroe, aperturas de sección, numerales gigantes.
- **Peso:** 400 (único que tiene)
- **Line-height: 0.78** — el interlineado aplastado es lo que convierte las palabras en objetos. No subir de 0.85.
- **Tracking:** -0.01em
- **Tamaños:** 44-64px en móvil, 110-190px en escritorio
- **Nunca por debajo de 1.75rem**: a tamaño pequeño se apelmaza y pierde legibilidad.

### Exo 2 — todo lo demás
- **Uso:** cuerpo, navegación, botones, subtítulos, encabezados pequeños, etiquetas.
- **Pesos:** 400 cuerpo, 600 subtítulos, 700 etiquetas y botones
- **Tamaños:** 13, 15, 17, 21px
- **Line-height:** 1.65 cuerpo, 1.2 encabezados
- **Tracking:** -0.01em cuerpo, +0.18em en etiquetas versales

### Gugi — solo wordmark
⚠️ **Gugi no contiene los glifos `á é í ó ú ñ ü ç ¿ ¡`.** Verificado glifo a glifo contra el woff2 de Google. Cualquier texto con acentos compuesto en Gugi cae a otra fuente carácter a carácter. Se reserva al wordmark, que no lleva acentos y además va como SVG con trazados convertidos.

### Escala

| Rol | Tamaño | Line-height | Tracking | Familia |
|---|---|---|---|---|
| micro | 12px | 1.4 | 0.18em | Exo 2 700 |
| caption | 13px | 1.5 | -0.01em | Exo 2 400 |
| body | 17px | 1.65 | -0.01em | Exo 2 400 |
| body-lg | 21px | 1.55 | -0.01em | Exo 2 400 |
| sub | 21px | 1.2 | -0.015em | Exo 2 700 |
| heading | 34px | 1.15 | -0.015em | Exo 2 700 |
| display-sm | 44px | 0.80 | -0.01em | Anton |
| display | 88px | 0.78 | -0.01em | Anton |
| display-lg | 190px | 0.78 | -0.01em | Anton |

---

## Tokens — Forma

**Unidad base:** 4px

### Contorno — la firma del sistema

Todo elemento con superficie lleva **2px sólidos de `--tk-ink`**. Tarjetas, botones, chips, campos, stickers, imágenes. Es el filo de troquel y es lo que hace que la página se lea como cartón cortado en vez de como una interfaz.

Slush lo hace a 1px sobre blanco; aquí va a 2px porque sobre crema y en móvil 1px se pierde.

### Radios

| Elemento | Valor |
|---|---|
| tarjetas | 20px |
| imágenes y huecos | 16px |
| stickers | 14px |
| botones y chips | 999px (píldora) |
| campos de formulario | 999px |

**Nada por debajo de 14px.** Las esquinas duras rompen el sistema.

### Sombras

**Ninguna.** La elevación la da el contorno y el cambio de banda de color. Una sombra bajo un elemento ya contorneado es la "tarjeta fantasma".

### Espaciado

Escala: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128px.
Separación entre secciones: 64px en móvil, 96-128px en escritorio.
Ancho máximo de página: 1200px. Ancho de lectura: 62ch.

---

## Componentes

### Botón principal (CTA)
Relleno `--tk-orange`. Texto `--tk-ink`. Contorno 2px `--tk-ink`. Radio píldora. Exo 2 700 a 15px. Altura mínima 48px. Hover: `--tk-orange-deep`. **Es el único elemento naranja de su pantalla.**

### Botón secundario
Relleno `--tk-card`. Texto y contorno `--tk-ink` a 2px. Radio píldora. Mismas métricas.

### Campo de email
Relleno `--tk-card`. Contorno 2px `--tk-ink`. Radio píldora. Padding 14px 22px. Placeholder `--tk-ink-faint`. Foco: contorno `--tk-orange` de 2px con offset de 3px.

### Tarjeta troquelada
Relleno `--tk-card` o `--tk-wood-pale`. Contorno 2px `--tk-ink`. Radio 20px. Padding 24-32px. Sin sombra.

### Sticker
Icono de marca sobre relleno plano (`--tk-wood`, `--tk-wood-pale` o `--tk-card`), contorno 2px `--tk-ink`, radio 14px, **rotado entre -8° y +8°**. Nunca alineado a la rejilla. El icono se recolorea con `mask-image`, no con `filter`.

### Marquesina
Banda a sangre completa. Fondo `--tk-ink`, texto `--tk-paper`. Exo 2 700 versales a 12px con tracking 0.18em. Mensaje repetido en bucle horizontal: `IMAGINA · CONSTRUYE · ALUCINA ·`. Se detiene con `prefers-reduced-motion`.

### Motivo de madera
Engranaje de geometría autoral: relleno plano `--tk-wood`, contorno 2px `--tk-ink`. Sobredimensionado, rotado, **detrás del texto de display y saliéndose del encuadre**. Aparece en cada sección. Hoy es SVG; sustituible por renders 3D con grano cuando existan.

Regla heredada de Slush: **el texto de display nunca aparece solo sobre fondo plano.** Siempre lleva un engranaje o un grupo de stickers.

---

## Do's

- Poner contorno de 2px `--tk-ink` a toda superficie. Es el sistema, no un adorno.
- Alternar bandas `--tk-paper` → `--tk-card` → `--tk-wood-pale` para marcar el ritmo. Sin separadores ni sombras.
- Anton a interlineado 0.78 en todo display. El aplastamiento es innegociable.
- Rotar los stickers y solaparlos con el texto. La composición es de collage, no de rejilla.
- Reservar el naranja para un único elemento por pantalla.
- Sacar el motivo de madera fuera del encuadre. Que se corte por el borde.
- Tratar cada sección como un cartel autónomo.

## Don'ts

- No usar más de un elemento naranja por viewport. Es el error que hizo la versión anterior inaceptable.
- No usar sombras en ningún sitio. La elevación es contorno y banda de color.
- No poner Anton por debajo de 1.75rem: usar Exo 2 700.
- No subir el interlineado de Anton por encima de 0.85.
- No usar el verde como decoración. Solo estado de éxito.
- No componer texto acentuado en Gugi.
- No usar radios por debajo de 14px.
- No usar gradientes. Rellenos planos siempre.
- No usar emojis del sistema como iconos. Hay set de marca.
- No repetir la mascota Tinki fuera del wordmark (decisión de marca 2026-08-25).

---

## Assets

### Disponibles
- 11 iconos de marca en SVG plano: `public/images/brand/icons/` — crane, gear, hammer, pulley, robot, rocket, ruler, screw, spring, target, wrench.
- Patterns: blueprint, gears, organic.

#### ⚠️ Logotipos — usar SOLO las versiones web
Los ficheros de `brand/Tinkilabs Brand Assets/` son **lienzos cuadrados de 1080×1080 con rectángulo de fondo a sangre**, pensados para redes sociales. Puestos en una barra de navegación se renderizan como un cuadradito ilegible.

Versiones web derivadas (fondo quitado y viewBox recortado a la caja real, medida con `getBBox()` en navegador):

| Fichero | Origen | Uso |
|---|---|---|
| `wordmarks/wordmark-tinkilabs.svg` | `Tinki Wordmark/wordmark-naranja.svg` | Wordmark naranja sobre fondo claro. Ratio **5.58:1** |
| `wordmarks/wordmark-tinkilabs-claro.svg` | `Tinki Wordmark/wordmark-blanco.svg` | Wordmark claro sobre fondo oscuro (pie) |
| `icons/tinki-profile-light.svg` | `Tinki Icon/profile light.svg` | Icono de Tinki, cuadrado 1:1. Ya viene en Timber Brown + naranja |

Los SVG originales sin tocar están en `web/designs/_svg-fuente/`, fuera de `public/` para que no se sirvan.

**No usar** `wordmark-naranja.svg`, `wordmark-blanco.svg` ni `wordmark-negro.svg` de `public/`: todos llevan fondo cuadrado.

### Pendientes
| Asset | Para qué | Cómo |
|---|---|---|
| Foto de la caja cerrada | Héroe | Caja de luz, luz plana, recortada |
| Chapa de Fundador | Sección Fundador | Caja de luz, macro |
| 3 fotos de situación | Cómo funciona | Prompts en `marketing/imagen/prompts-landing-tres-pasos.md` |
| Renders 3D del motivo de madera | Sustituir el SVG del engranaje | Veo / Nano Banana, con grano, fondo transparente |
| Imagen OG | Compartir enlace | 1200x630 |

El sistema **funciona sin ninguno de ellos**: el motivo geométrico y los stickers sostienen la página. Ésa fue la razón de descartar la dirección Apple, que sin fotografía de estudio se queda vacía.
