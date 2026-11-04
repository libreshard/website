---
title: Referencia de shards
description: Cada campo del manifest, la API de Shard, los nombres de las teclas, el límite por apps, los ajustes, los idiomas y el aislamiento en que se ejecutan los shards.
---

<!-- Translation of docs/shard-reference.md. Keep both in step. -->

Todo lo que un shard puede declarar y usar. ¿Es tu primer shard? Empieza por
[Crea un shard](/es/docs/create-a-shard/).

## manifest.json

| Campo | Obligatorio | Para qué sirve |
|---|---|---|
| `id` | sí | Letras minúsculas, dígitos y guiones. Único; también es el hash de la URL. Elige algo concreto (`acme-photo-tools`, no `photo`). |
| `name` | sí | Se muestra en el menú y en el panel del botón flotante (hasta 60 caracteres). |
| `permissions.keys` | sí | La lista cerrada de combinaciones que el shard puede pulsar (hasta 300). Nunca se escribe nada más. |
| `author` | no | Aparece en la tarjeta del menú. |
| `version` | no | Informativo; se muestra cuando el usuario actualiza el shard. |
| `icon` | no | Un emoji o una letra. Sin él, se usa la inicial del nombre. |
| `description` | no | Una línea para la tarjeta del menú. |
| `apps` | no | Programas para los que está pensado el shard (ver [más abajo](#limitar-un-shard-a-ciertas-apps)). |
| `settings` | no | Ajustes que el usuario cambia en la PC (ver [más abajo](#ajustes-que-el-usuario-cambia-en-la-pc)). |
| `minAppVersion` | no | La versión más antigua de LibreShard con la que funciona, por ejemplo `"0.1.0"`. Las versiones anteriores lo omiten y explican por qué. Ponlo si publicas tu shard. |

El manifest se valida al cargarlo. Los campos desconocidos se descartan, los textos se recortan a su
límite y un shard con un `id` incorrecto, tipos equivocados o teclas desconocidas se rechaza. La
ventana de la PC lista los shards rechazados con el motivo.

## Botones

Sin JavaScript:

```html
<button data-key="ctrl+s">Guardar</button>             <!-- una pulsación por toque -->
<button data-hold="space">Mano</button>                <!-- mantenida mientras el dedo está encima -->
<button data-key="volup" data-repeat>Vol +</button>    <!-- se repite mientras se mantiene (cada 100 ms) -->
<button data-key="rbracket" data-repeat="150">Pincel +</button> <!-- cada 150 ms (50–1000) -->
```

- `data-hold` captura el puntero, así que la tecla se suelta aunque el dedo se salga del botón.
- Tocar un botón `data-key` mientras otro dedo mantiene un botón `data-hold` funciona (Alt + Tab).
- Ponles a los botones `touch-action: none`; si no, un segundo dedo puede empezar un zoom con
  pellizco que cancela los dos toques.

## Desde JavaScript

`window.Shard` existe a partir de `DOMContentLoaded` (el script se inyecta después del tuyo):

```js
document.addEventListener('DOMContentLoaded', async () => {
  Shard.press('f5');            // pulsa y suelta
  Shard.hold('shift');          // mantiene…
  Shard.release('shift');       // …y suelta

  // Datos que el shard guarda en esta tablet (un objeto, hasta 64 KB en JSON)
  const saved = (await Shard.load()) || {};
  Shard.save({ ...saved, lastPage: 2 });

  // Ajustes que el usuario eligió en la PC, y sus cambios en vivo
  const cfg = await Shard.settings();
  Shard.onSettings((values) => { /* volver a pintar */ });

  // El sistema de la PC y el idioma
  if (Shard.platform === 'linux') { /* 'windows', 'linux', 'mac' */ }
  console.log(Shard.lang);
});
```

:::caution
El iframe no tiene `localStorage` (lanza un error, porque el origen del shard es opaco): usa
`Shard.save()` y `Shard.load()`.
:::

## Teclas

Las combinaciones se escriben en minúsculas con `+` entre teclas: `ctrl+shift+p`, `alt+tab`,
`numpad5`.

| Grupo | Nombres |
|---|---|
| Letras y dígitos | `a`–`z`, `0`–`9` |
| Teclas de función | `f1`–`f24` |
| Modificadores | `ctrl`, `shift`, `alt` (izquierdos; también `lctrl`, `lshift`, `lalt`), `rctrl`, `rshift`, `ralt`, `win` / `meta` / `cmd` |
| Edición y navegación | `enter`, `esc`, `tab`, `space`, `backspace`, `delete`, `insert`, `home`, `end`, `pageup`, `pagedown`, `up`, `down`, `left`, `right` |
| Puntuación | `comma`, `period`, `minus`, `equal`, `grave`, `slash`, `backslash`, `semicolon`, `apostrophe`, `lbracket`, `rbracket` |
| Teclado numérico | `numpad0`–`numpad9`, `numpadplus`, `numpadminus`, `numpadmul`, `numpaddiv`, `numpaddot`, `numpadenter`, `numlock` |
| Multimedia y otras | `mute`, `volup`, `voldown`, `playpause`, `next`, `prev`, `print` (o `printscreen`) |

Conviene saber:

- **Linux y F13–F24:** muchas distribuciones de teclado de Linux no tienen F13–F24. Ahí LibreShard
  rechaza esas teclas (la tablet muestra un aviso) en vez de pulsar otra cosa. Los shards pensados
  para Linux no deberían depender de ellas.
- **Los dígitos del teclado numérico** solo escriben dígitos con Bloq Num activado; si no, Windows y
  X11 los tratan como teclas de navegación.
- **Win + L** no se puede inyectar en Windows (la pantalla de bloqueo ignora la entrada simulada).
- **Los atajos globales** que registra otro programa se quedan con esa combinación para todos.
- Cuando declaras combinaciones del sistema (`win+…`, `ctrl+alt+…`, `alt+f4`), la revisión de la
  instalación las muestra en rojo. Un shard que tiene combinaciones del sistema *y* puede escribir
  texto recibe un aviso destacado. Declara solo lo que uses.

## Limitar un shard a ciertas apps

```json
"apps": ["photoshop", "affinity photo"]
```

Cada texto se compara, sin distinguir mayúsculas y como coincidencia parcial, con el programa que
está delante (su nombre y su ejecutable). Si ninguno coincide, LibreShard no pulsa nada y la tablet
dice qué app esperaba. Mejor textos concretos (`adobe photoshop` en vez de `ps`).

Son solo **sugerencias**: el usuario decide en la ventana de la PC (**Apps** en la tarjeta del
shard), puede añadir programas o quitar la restricción. No pongas `apps` en shards que sirven en
cualquier sitio (teclas multimedia, un teclado numérico).

## Ajustes que el usuario cambia en la PC

```json
"settings": [
  { "id": "layout", "type": "select", "label": { "en": "Layout", "es": "Distribución" },
    "options": [ { "value": "compact", "label": "Compact" }, { "value": "wide", "label": "Wide" } ],
    "default": "wide" },
  { "id": "confirm", "type": "toggle", "label": "Confirm critical actions", "default": true },
  { "id": "scenes", "type": "number", "label": "Scene buttons", "min": 1, "max": 6, "step": 1, "default": 4 },
  { "id": "title", "type": "text", "label": "Title", "maxLength": 40, "default": "My shard" },
  { "id": "accent", "type": "color", "label": "Accent", "default": "#22d3ee" }
]
```

- Tipos: `toggle`, `select` (`options` como textos o `{ value, label }`), `number` (`min`, `max`,
  `step`), `text` (`maxLength`, hasta 200) y `color` (`#rrggbb`). Hasta 30 ajustes.
- Una etiqueta es un texto o `{ "en": "…", "es": "…" }`.
- La PC construye el formulario, comprueba cada valor contra tu declaración y envía los valores al
  shard: léelos con `Shard.settings()` y sigue los cambios con `Shard.onSettings(cb)`.
- Los ajustes son datos, nunca código. Una declaración no válida hace que se rechace el shard.

Un patrón habitual: un ajuste que elige el programa y un JavaScript que rellena `data-key` a partir
de un mapa de teclas por programa (mira los shards incluidos Edición de imagen y Videollamadas).

## Idiomas

Un shard puede estar en un solo idioma. Para incluir varios:

1. Añade un `strings.js` que defina
   `window.SHARD_STRINGS = { en: { title: 'My shard' }, es: { title: 'Mi shard' } }`, y cárgalo
   antes de tus propios scripts.
2. Marca los textos con `data-i18n="title"` (texto) o `data-i18n-aria="title"` (`aria-label`).
3. En JavaScript, `Shard.t('title', { name: 'x' })` traduce, y `Shard.translate(root)` vuelve a
   rellenar una parte de la página que construiste después.

LibreShard usa el idioma elegido en la PC o, si no hay, el de la tablet. Los textos que falten
pasan al inglés y, si tampoco están, a la clave. Tiene que ser un script, no un JSON: los shards no
pueden hacer `fetch`.

## Lo que un shard no puede hacer

Cada archivo de un shard se sirve con esta Content Security Policy:

```
default-src 'none'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';
img-src 'self' data:; font-src 'self' data:; connect-src 'none'; form-action 'none'
```

Así que un shard:

- no puede cargar nada de internet: ni CDN, ni Google Fonts, ni `fetch`, ni WebSocket. Todo tiene
  que estar en la carpeta o incrustado como `data:`;
- se ejecuta en un iframe aislado: no puede leer el visor, otros shards ni el almacenamiento de la
  tablet;
- solo puede pedirle al visor que pulse teclas de su propio manifest, y la PC lo vuelve a comprobar;
- no puede ejecutar programas ni comandos en la PC.

Dos efectos secundarios: `mask-image` con un archivo del shard puede fallar (incrusta las máscaras
como URL `data:`; `<img>` y `background-image` funcionan con archivos), y `localStorage` lanza un
error (usa `Shard.save()`).
