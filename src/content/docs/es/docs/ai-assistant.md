---
title: Crea un shard con un asistente de IA
description: Describe el panel que quieres y deja que un asistente de IA escriba el shard, aunque nunca hayas programado. Qué darle, un prompt para copiar y qué revisar.
---

<!-- Translation of docs/ai-assistant.md. Keep both in step. -->

Un shard es una pequeña página web (HTML, CSS y JavaScript) con un `manifest.json` que lista las
teclas que puede pulsar. Los asistentes de IA como ChatGPT, Claude, Gemini o Copilot escriben muy
bien justo ese tipo de página, así que puedes describir el panel que quieres y dejar que un
asistente lo escriba, aunque nunca hayas programado.

## ¿Necesitas un asistente?

Muchas veces no. **Nuevo shard**, en la pestaña Shards de la app, abre el [editor de shards](/es/docs/shard-editor/): una
cuadrícula de botones con páginas, iconos, imágenes, colores y temas, donde cada botón pulsa,
mantiene o repite una tecla, alterna entre dos teclas o abre otra página. Si es lo que buscas, usa
el editor: es más rápido y no hay nada que revisar. **Importar perfil de Stream Deck…** convierte un
perfil de Stream Deck que ya tengas en un shard así.

Un asistente vale la pena cuando quieres algo que una cuadrícula no hace, por ejemplo:

- una disposición propia: una rueda grande en el centro, un pad con forma de teclado, botones
  de formas distintas, secciones que se pliegan;
- botones que cambian según un ajuste (un panel para varios programas, cada uno con sus atajos);
- botones que recuerdan cosas (un contador, la última herramienta elegida, una lista de pasos);
- un panel en varios idiomas.

## Qué darle al asistente

El asistente necesita saber cómo funcionan los shards. Dale estos archivos del repositorio de
LibreShard (adjúntalos o pega su contenido en el chat):

- [`docs/shards.md`](https://github.com/libreshard/libreshard/blob/main/docs/shards.md): la guía
  completa para autores de shards (teclas, botones, las reglas que sigue todo shard; está en
  inglés, y el asistente la entiende igual);
- los archivos de la [plantilla de shards](https://github.com/libreshard/libreshard/tree/main/docs/shard-template):
  `manifest.json`, `index.html` y `README.md`, y también `libreshard.css` y `libreshard.js` si
  quieres el aspecto de LibreShard.

Si tu asistente puede leer páginas web, también sirven las direcciones de texto plano, por ejemplo
`https://raw.githubusercontent.com/libreshard/libreshard/main/docs/shards.md`.

Después, cuéntale sobre tu panel:

- **el programa** para el que es, y su versión si los atajos cambiaron entre versiones;
- **las teclas**: los atajos que usas y qué hace cada uno. Búscalos en la lista de atajos del propio
  programa en vez de dejar que el asistente los adivine: los asistentes suelen recordarlos mal;
- **tu sistema** (Windows, Linux o macOS), porque los atajos cambian (Ctrl en Windows suele ser Cmd
  en un Mac);
- **el dispositivo**: un teléfono o una tablet, en vertical o en horizontal;
- qué va en cada sitio, qué botones importan más y el aspecto que te gustaría.

## Un prompt para empezar

Copia esto, completa lo que está entre corchetes y envíalo junto con los archivos de arriba:

```text
Uso LibreShard, que muestra paneles llamados "shards" en una tablet y pulsa teclas en mi PC.
Adjunté docs/shards.md (cómo funcionan los shards) y la plantilla de shards. Escríbeme un shard.

Para qué es: [programa y versión, p. ej. "Krita 5.2 para dibujar"]
Mi sistema: [Windows / Linux / macOS]
Mi dispositivo: [p. ej. "una tablet Android de 10 pulgadas, en horizontal"]
Botones que quiero (atajo y qué hace):
- [p. ej. "ctrl+z: deshacer"]
- [p. ej. "mantener space: mover el lienzo"]
- [...]
Disposición y aspecto: [p. ej. "deshacer y rehacer grandes abajo, tamaño de pincel + y - que se
repitan mientras los mantengo, colores oscuros"]

Sigue estas reglas de docs/shards.md:
- Escribe manifest.json e index.html (y archivos CSS o JavaScript si hacen falta), todo en una carpeta.
- Pon en permissions.keys cada combinación que el shard pulsa, solo con los nombres de tecla de la
  sección "Keys", y nada que no pulse.
- Usa data-key para una pulsación, data-hold para teclas que se mantienen mientras el dedo está
  encima y data-repeat para teclas que se repiten mientras se mantienen.
- Nada de internet: sin CDN, fuentes web, fetch ni imágenes externas. Todo vive en la carpeta o va
  incrustado.
- Ocupa toda la pantalla con unidades relativas (%, vw, vh, grid, flex) y que funcione en vertical y
  en horizontal.
- Deja libre la esquina superior izquierda (unos 64 px) para el botón flotante de LibreShard.
- Haz botones de al menos 48 px y ponles touch-action: none.
- Usa Shard.save() y Shard.load() en vez de localStorage.
- Pon minAppVersion en "0.4.0".
- Los textos de los botones, en español.
Dame cada archivo completo, listo para guardar.
```

Guarda cada archivo que escriba el asistente con exactamente el nombre que le da (`manifest.json`,
`index.html`…) en una carpeta nueva. Sirve un editor de texto simple como el Bloc de notas; fíjate
en que el nombre no acabe como `index.html.txt`.

## Pruébalo mientras lo afinas

1. En LibreShard, en la PC, abre **Shards → Cargar en desarrollo…** y elige la carpeta.
2. LibreShard te muestra las teclas que pide el shard (mira la sección siguiente) y lo añade al menú
   de la tablet con la etiqueta "En desarrollo".
3. Ábrelo en la tablet y prueba cada botón con el programa al frente.
4. Dile al asistente qué cambiar ("el botón de deshacer es muy pequeño", "el tamaño de pincel debería
   repetirse más rápido") y guarda los archivos nuevos encima de los viejos. La tablet recarga el
   shard cada vez que guardas.

Cuando te guste, instálalo de forma definitiva con **Instalar desde carpeta…** (un shard en
desarrollo deja de funcionar si mueves o borras su carpeta). Para compartirlo, usa **Exportar…** en
su tarjeta: guarda un archivo `.libreshard` que se abre en LibreShard con doble clic.

## Revisa las teclas antes de aprobarlas

No hace falta leer el código para estar seguro. Un shard funciona en una caja cerrada: no puede
acceder a internet, leer tus archivos, ejecutar programas ni ver otros shards, y solo puede pulsar
las teclas de su `manifest.json`. LibreShard comprueba cada pulsación contra esa lista en la PC.

Así que lo que importa es la lista de teclas, y LibreShard te la muestra antes de instalar el shard:

- Léela. Cada combinación debería ser una que pediste. Si ves teclas que no pediste, pregúntale al
  asistente por qué, o quítalas.
- **Las teclas en rojo** son atajos del sistema: la tecla Windows, combinaciones con Ctrl+Alt,
  Alt+F4 y similares. Están bien si las pediste (Win+Shift+S para una captura), pero las inesperadas
  merecen una pregunta.
- **El aviso rojo grande** aparece cuando un shard tiene atajos del sistema *y* teclas suficientes
  para escribir texto (letras y Enter). Juntos podrían abrir el cuadro Ejecutar y escribir un
  comando. Acéptalo solo si sabes por qué tu panel necesita ambas cosas.

Cada vez que cambias `manifest.json`, las teclas nuevas necesitan tu aprobación otra vez.

## Cuando algo no funciona

- **El shard sale en blanco o sin estilos:** seguramente intenta cargar algo de internet (una
  fuente, una biblioteca, una imagen). Pídele al asistente que lo incruste o lo quite.
- **Un botón no hace nada:** su combinación tiene que estar en `permissions.keys`, escrita con los
  nombres de tecla de LibreShard. La ventana de la PC lista los shards que rechazó, con el motivo.
- **Pulsa otra cosa:** revisa el atajo en la lista del propio programa, y que el programa esté al
  frente en la PC. Los símbolos siguen la distribución de teclado de la PC.
- **Hay botones debajo del botón flotante redondo:** recuérdale al asistente que deje libre la
  esquina superior izquierda.
- **Se ve mal en vertical o en horizontal:** dile cuál, y que debe usar unidades relativas.

Para ver errores, abre `http://localhost:7878/` en el navegador de la PC, escribe el código de la
pestaña Conectar, abre el shard y usa las herramientas de desarrollo del navegador (F12). Copia en
el chat cualquier error en rojo.

## Privacidad y autoría

- **No pegues datos personales** en el chat ni en el shard: contraseñas, nombres de cuenta, claves de
  licencia, rutas privadas. Un panel nunca los necesita.
- **El shard es tuyo.** LibreShard no impone ninguna licencia a lo que creas; la plantilla y los
  archivos base de LibreShard son MIT-0, así que usarlos no añade obligaciones. Revisa lo que dicen
  las condiciones de tu asistente sobre el contenido generado, y añade un archivo `LICENSE` si lo
  compartes.
- **Incluye solo imágenes, iconos y logos que puedas compartir**, como en cualquier shard que
  publiques (mira [Comparte tu shard](/es/docs/create-a-shard/#comparte-tu-shard)).
