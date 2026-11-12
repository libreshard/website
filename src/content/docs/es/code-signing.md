---
title: Política de firma de código
description: Cómo se firman las versiones de LibreShard para Windows, quién aprueba cada firma y qué envía la app por la red.
---

<!-- Translation of code-signing.md. Keep both in step. SignPath asks for the English terms "Code signing policy" and the attribution line, which the English page has. -->

:::note[Estado]
Las versiones para Windows **todavía no llevan firma de código**. LibreShard está solicitando la
firma a [SignPath Foundation](https://signpath.org/), que firma gratis proyectos de código abierto.
Hasta que empiece, comprueba cada descarga con el archivo `SHA256SUMS.txt` que se publica con la
versión (las [preguntas frecuentes](/es/docs/faq/) explican cómo). Esta página describe cómo
funcionará la firma, y lo dirá aquí cuando esté en marcha.
:::

## Quién firma

Free code signing provided by [SignPath.io](https://about.signpath.io/), certificate by
[SignPath Foundation](https://signpath.org/). (Firma de código gratuita de SignPath.io, con
certificado de SignPath Foundation.)

El certificado pertenece a SignPath Foundation, así que Windows muestra **SignPath Foundation**
como editor de los archivos firmados.

## Qué se firma

- El instalador de Windows (`LibreShard-Setup-<versión>.exe`) y el programa LibreShard que contiene.
- Solo archivos compilados a partir del código de
  [libreshard/libreshard](https://github.com/libreshard/libreshard), por GitHub Actions, desde una
  etiqueta de versión. Nunca se firma nada compilado en un equipo personal.
- Los paquetes de Linux y macOS no se firman con SignPath. Compruébalos con `SHA256SUMS.txt`.

## Cómo se firma una versión

1. Un mantenedor crea una etiqueta de versión (`v*`). Solo los administradores del proyecto pueden
   crearlas.
2. GitHub Actions compila los instaladores desde esa etiqueta
   ([workflow de versiones](https://github.com/libreshard/libreshard/blob/main/.github/workflows/release.yml))
   y envía los archivos de Windows a SignPath.
3. Un aprobador comprueba que la solicitud viene de esa compilación y de esa etiqueta, y la aprueba
   a mano. Cada versión necesita su propia aprobación.
4. Los archivos firmados van a un borrador de versión, que un mantenedor revisa y publica.

## Roles del equipo

| Rol | Quién |
|---|---|
| Autores y revisores | [Miembros de la organización libreshard](https://github.com/orgs/libreshard/people): hoy, Gabriel Hernandez |
| Aprobadores | Los propietarios de la organización: hoy, Gabriel Hernandez |

Todo cambio llega a la rama `main` mediante un pull request que pasa las comprobaciones
automáticas. Las contribuciones de personas de fuera del equipo las revisa un miembro del equipo
antes de fusionarlas. Los miembros del equipo usan autenticación de varios factores en GitHub y
SignPath.

## Privacidad

LibreShard no transfiere ninguna información a otros sistemas de la red salvo que lo pida
expresamente el usuario o la persona que lo instala o lo utiliza.

La app habla con los dispositivos que vinculas en tu propia red: no hay telemetría, ni cuenta, ni
servicio en la nube. Su única conexión a internet es la búsqueda de versiones nuevas (desde la 0.3):
una vez al día pregunta a la API de GitHub (`api.github.com`) cuál es la última versión, sin enviar
nada sobre el usuario, y nunca descarga ni instala nada por su cuenta. Se puede desactivar en
Ajustes. Las notas de
privacidad de la web están en la [página de seguridad](/es/security/#privacidad).

## Reportar un problema

Si un archivo firmado parece incorrecto, o crees que se firmó algo que no debía, escribe a
**[security@libreshard.com](mailto:security@libreshard.com)**.
