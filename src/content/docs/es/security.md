---
title: Seguridad
description: Cómo evita LibreShard que las tablets y los shards hagan más de lo que permitiste, sus limitaciones conocidas y cómo reportar una vulnerabilidad.
---

<!-- Translation of security.md. Keep both in step. -->

LibreShard pulsa teclas en tu PC cuando alguien toca una tablet. Eso es mucho poder, así que esta
página explica de qué te protege LibreShard, de qué no y cómo reportar un problema. El modelo de
amenazas completo está en
[SECURITY.md](https://github.com/libreshard/libreshard/blob/main/SECURITY.md) (en inglés).

## Reportar una vulnerabilidad

Por favor, **no abras un issue público** para un problema de seguridad. En su lugar:

- usa el reporte privado de GitHub:
  [Report a vulnerability](https://github.com/libreshard/libreshard/security/advisories/new), o
- escribe a **[security@libreshard.com](mailto:security@libreshard.com)**.

Incluye la versión de LibreShard, tu sistema operativo y los pasos para reproducirlo. Recibirás
respuesta en una semana. LibreShard lo mantienen voluntarios, así que las correcciones pueden
tardar, pero te mantendremos al tanto y, si quieres, te daremos crédito en las notas de la versión.
Solo la última versión recibe correcciones de seguridad.

## Cómo te protege

LibreShard tiene dos mitades: una app en tu PC que ejecuta un pequeño servidor web y pulsa teclas, y
una página web en la tablet que muestra los **shards**, paneles hechos con HTML, CSS y JavaScript que
cualquiera puede escribir.

- **Solo teclas aprobadas.** La PC solo pulsa las teclas que un shard declara en su manifest **y**
  que tú aprobaste. La comprobación se hace en la PC, no en la tablet. Si cambian las teclas de un
  shard, las nuevas quedan bloqueadas hasta que las vuelvas a aprobar.
- **Una revisión antes de instalar.** La PC muestra cada tecla que pide un shard, marca en rojo los
  atajos del sistema (tecla Windows, Ctrl+Alt) y avisa cuando un shard podría abrir un diálogo del
  sistema y además escribir texto.
- **Los shards están encerrados.** Se ejecutan en un marco aislado sin acceso a la red: no pueden
  llegar a internet, a tus archivos, a otros shards ni a la vinculación guardada en la tablet.
- **Vinculación.** Cada tablet se vincula con un código de un solo uso que caduca en 10 minutos y
  después recibe su propio token; la PC solo guarda su hash. Los intentos fallidos están limitados,
  cada dispositivo se puede desvincular por separado y puedes exigir que la PC confirme cada
  dispositivo nuevo.
- **Solo tu red.** Por defecto solo se pueden conectar dispositivos de tu red local o de una VPN como
  Tailscale. En Windows, el instalador ofrece una regla del firewall solo para redes privadas. Las
  páginas web abiertas en tu navegador no pueden controlar LibreShard.
- **Sin teclas atascadas.** Los mensajes tienen límites de tamaño y frecuencia, pero soltar una tecla
  nunca se descarta.
- **Instalaciones seguras.** Antes de extraer el archivo de un shard, se comprueban trucos con las
  rutas, enlaces, tamaño y número de archivos.

## Limitaciones conocidas

Están documentadas a propósito:

- **El tráfico local no va cifrado.** La tablet habla con la PC por HTTP sin cifrar. Alguien que
  pueda espiar tu red podría capturar un código de vinculación o el token de un dispositivo. Usa
  LibreShard en redes de confianza y desvincula un dispositivo si sospechas algo. HTTPS con un
  certificado local está en la [hoja de ruta](/es/roadmap/).
- **"Solo en estas apps" evita errores, no ataques.** Impide que un toque accidental dispare atajos
  en el programa equivocado. Lo que te protege de un shard malicioso es la revisión de teclas al
  instalarlo.
- **Ejecutar LibreShard como administrador**, necesario para juegos que se ejecutan elevados en
  Windows, da ese mismo poder a las teclas que pulse cualquier shard. Hazlo solo si confías en todos
  los shards instalados.
- **Las teclas de un shard aún pueden hacer mucho.** Un shard aprobado para la tecla Windows, letras
  y Enter podría abrir el diálogo Ejecutar y escribir un comando. La revisión avisa de esa
  combinación: léela.
- **Redes públicas.** El ajuste avanzado que acepta conexiones desde direcciones públicas quita una
  capa de protección. Úsalo solo detrás de una VPN o de un firewall de confianza.

## Privacidad

LibreShard no envía datos a ningún sitio. No hay telemetría, ni cuenta, ni servicio en la nube: la
app solo habla con los dispositivos que vinculas en tu propia red.

Esta web no tiene cookies ni rastreadores. Cuenta las visitas con Cloudflare Web Analytics, que no
usa cookies ni recoge datos personales.

## Firma de código

Las versiones para Windows todavía no llevan firma de código. Queremos firmarlas gratis a través de
[SignPath Foundation](https://signpath.org/). Mientras tanto, comprueba las descargas con el archivo
`SHA256SUMS.txt` que se publica con cada versión (las [preguntas frecuentes](/es/docs/faq/) explican
cómo). Esta sección será la política de firma de código del proyecto cuando la firma esté en marcha.
