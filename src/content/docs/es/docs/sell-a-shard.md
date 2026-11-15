---
title: Vende tu shard
description: Qué hace y qué no hace LibreShard con los shards de pago, una licencia de uso personal para empezar, dónde vender y cómo listar un shard de pago en la galería.
---

<!-- Translation of docs/sell-a-shard.md. Keep both in step. -->

Un shard es tu trabajo, y puedes venderlo. Esta guía explica qué hace y qué no hace LibreShard con
los shards de pago, una licencia desde la que empezar, cómo lo instalan los compradores y cómo
listarlo en la galería.

## Qué hace LibreShard, y qué no

- **No hay protección contra copias, a propósito.** La tablet tiene que recibir el HTML, el CSS y el
  JavaScript del shard tal cual para mostrarlo, y los archivos quedan en la PC del comprador.
  Cualquier cifrado se desharía justo antes de mostrarlo, y LibreShard es de código abierto, así que
  una comprobación se podría quitar con una línea. Lo que protege tu trabajo es tu **licencia** (uso
  personal, sin compartir) y pedir que se retiren las copias compartidas, como pasa con las fuentes,
  las plantillas y los packs de iconos.
- **Minificar depende de ti.** No cambia la revisión al instalar ni la seguridad del shard:
  LibreShard solo pulsa las teclas que el shard declara y el usuario aprueba, y un shard no puede
  acceder a la red. Las herramientas que usan `eval` o `new Function` no funcionan (la Content
  Security Policy del shard las bloquea).
- **Los compradores ven la misma revisión que con cualquier shard:** cada tecla, las apps, el tamaño,
  y tu licencia y tu página del manifest.
- **LibreShard no se queda ninguna parte** ni gestiona pagos: vendes donde quieras.

## Antes de vender

- **Usa solo material que puedas vender.** Las imágenes, iconos, fuentes y sonidos necesitan una
  licencia que permita el uso comercial y la redistribución. Los kits para fans de los juegos suelen
  permitir solo el uso personal o no comercial.
- **Los juegos y programas tienen sus propias reglas.** Lee la política de contenido de fans o de
  marcas del juego o programa para el que es tu shard antes de vender algo con su nombre o su
  aspecto. Dibujar tus propios iconos, como hace el [SC MFD](https://github.com/libreshard/libreshard-sc-mfd),
  evita la mayoría de los problemas.
- **Ponle un nombre claro.** "MFD para LibreShard" está bien; nada que sugiera que es oficial o que
  lo hizo LibreShard (mira la [política de marca](https://github.com/libreshard/libreshard/blob/main/TRADEMARKS.md)).
- **La plantilla y los archivos base de LibreShard son MIT-0:** puedes usarlos en un shard cerrado y
  de pago, sin ningún aviso.

## Una licencia para un shard de pago

Ponla en un archivo `LICENSE` en la carpeta del shard, y en el manifest pon `license` en
`"LicenseRef-Proprietary"` (o tu propio nombre `LicenseRef-…`), para que la revisión al instalar la
muestre. Un punto de partida, en inglés para que valga en cualquier tienda (no es asesoramiento
legal: adáptalo o consulta a un abogado):

```text
<Shard name>
Copyright (c) <year> <your name>. All rights reserved.

You may install this shard and use it on your own devices, for personal or work use, and change it
for your own use.

You may not share, publish, sell or give away this shard or a changed version of it, in whole or
in part, without written permission from the author. Buying it gives you a license to use it, not
ownership of it.

This shard is provided "as is", without warranty of any kind. The author isn't liable for any damage
arising from its use.
```

## Empaquétalo

- Pon `version`, `license`, `url` (tu tienda o tu página) y `minAppVersion` en `manifest.json`.
- Usa **Exportar…** en la tarjeta del shard, en la pestaña Shards: guarda un archivo `.libreshard`
  sin archivos ocultos (`.git`, `.DS_Store`). Ese archivo es lo que vendes.
- Los compradores lo abren con doble clic (o lo arrastran a la ventana de LibreShard). Si tu tienda
  les da una dirección `https://` de descarga directa, un enlace `libreshard://install?url=…` lo
  instala con un clic (mira [Comparte tu shard](/es/docs/create-a-shard/#comparte-tu-shard)).

## Dónde venderlo

Sirve cualquier tienda de archivos digitales. Algunas actúan como **merchant of record** (se ocupan
de los impuestos sobre las ventas y el IVA por ti, en todo el mundo), lo que ahorra mucho papeleo;
otras te lo dejan a ti. Revisa las condiciones y comisiones actuales de cada una:

- [itch.io](https://itch.io): popular entre jugadores, permite "paga lo que quieras" y descargas
  gratuitas.
- [Gumroad](https://gumroad.com) y [Lemon Squeezy](https://www.lemonsqueezy.com): tiendas sencillas
  que se presentan como merchant of record.
- La tienda de [Ko-fi](https://ko-fi.com): práctica si ya recibes donaciones ahí.

Vendas donde vendas, indica que hace falta LibreShard (gratis, [libreshard.com](https://libreshard.com))
y qué versión.

## Qué se vende

Lo que la gente paga es tu trabajo y tu cuidado, más que los archivos:

- una versión gratis, y una de pago con más páginas o programas;
- actualizaciones cuando el juego o el programa cambia sus atajos;
- acceso anticipado: de pago primero, gratis después;
- "paga lo que quieras", con un precio sugerido;
- shards hechos a medida.

## Lístalo en la galería

Los shards de pago pueden aparecer en la [galería](/es/gallery/), con la etiqueta "De pago" y un
botón "Comprar" que abre tu tienda. LibreShard nunca descarga un shard de pago por su cuenta.

- Añade una ficha a [libreshard/shards](https://github.com/libreshard/shards#publish-your-shard) con
  `"paid": true`, `"price"` (texto: `"4 USD"`, `"Paga lo que quieras"`) y `"buyUrl"` en lugar de
  `"download"`. `keys` tiene que seguir siendo exactamente la del manifest, para que la gente las vea
  antes de comprar.
- Dale una copia al revisor (vale un enlace privado). El código puede ir minificado; el manifest no.
- Una demo gratuita puede tener su propia ficha.
- Pagar no da un mejor puesto en la galería. Mira la [política de revisión](https://github.com/libreshard/shards/blob/main/POLICY.md) (en inglés).

## Versiones nuevas

- Mantén el mismo `id` y `author`, y sube `version`.
- Actualiza `version` en la ficha de la galería (y `keys`, si cambiaron) con un pull request. Los
  compradores que tengan tu shard verán "Versión x disponible" en su tarjeta, con un botón a tu
  tienda, aunque lo hayan instalado desde tu archivo.
- Cuando instalen el archivo nuevo, LibreShard les muestra qué cambió, empezando por las teclas
  nuevas.
