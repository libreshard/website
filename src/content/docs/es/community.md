---
title: Comunidad
description: Cómo ayudar a LibreShard con reportes de errores, shards, traducciones y código, y las reglas para participar.
---

<!-- Translation of community.md. Keep both in step. -->

LibreShard se construye en abierto, entre voluntarios. Se agradecen reportes de errores, shards,
traducciones, documentación y código.

## Habla con nosotros

- **[Discusiones](https://github.com/libreshard/libreshard/discussions):** preguntas, ideas y para
  enseñar tus shards.
- **[Issues](https://github.com/libreshard/libreshard/issues):** reportes de errores y propuestas
  concretas.
- **Correo:** [hello@libreshard.com](mailto:hello@libreshard.com). Para problemas de seguridad, sigue
  la [página de seguridad](/es/security/).

## Formas de ayudar

### Reporta un error

En LibreShard, Ajustes → **Informar de un error** abre el formulario de GitHub con tu versión y tu
sistema ya rellenos, y copia el diagnóstico para que lo pegues (revísalo antes: no incluye nombres de
dispositivos, direcciones ni teclas pulsadas). También puedes
[abrir un issue](https://github.com/libreshard/libreshard/issues/new/choose) tú con tu versión de
LibreShard, tu sistema (y el escritorio, en Linux), qué hiciste y qué pasó. Mira antes las
[preguntas frecuentes](/es/docs/faq/): puede que la respuesta esté ahí.

### Comparte un shard

No hace falta cambiar LibreShard para eso. [Crea tu shard](/es/docs/create-a-shard/), publícalo en
tu propio repositorio y cuéntalo en las discusiones.

### Propón un shard incluido

Abre antes un issue. Los shards incluidos deben funcionar con los atributos declarativos
`data-key` / `data-hold`, traer los textos en inglés y español, y no usar material de terceros
(logos, imágenes, fuentes).

### Traduce

Los textos de la app están en `i18n/en.json` e `i18n/es.json`, en el
[repositorio de LibreShard](https://github.com/libreshard/libreshard); un idioma nuevo es un archivo
nuevo con las mismas claves. Las páginas de esta web están en el
[repositorio de la web](https://github.com/libreshard/website), en `src/content/docs/`, y cada página
tiene abajo un enlace "Edita esta página".

### Escribe código

Lee la [guía para contribuir](https://github.com/libreshard/libreshard/blob/main/CONTRIBUTING.md)
(en inglés) para la instalación, las convenciones y cómo funcionan los pull requests.
[CONTEXT.md](https://github.com/libreshard/libreshard/blob/main/CONTEXT.md) explica la arquitectura,
el protocolo y el modelo de seguridad. La [hoja de ruta](/es/roadmap/)
dice lo que viene, y se agradece ayuda con cualquier punto.

## Las reglas

### Código de conducta

Quien participa sigue el
[código de conducta](https://github.com/libreshard/libreshard/blob/main/CODE_OF_CONDUCT.md) (el
Contributor Covenant 3.0, en inglés). En resumen: sé amable y presupón buena fe; no se toleran el
acoso ni los ataques personales. Para reportar un problema, escribe a
[conduct@libreshard.com](mailto:conduct@libreshard.com): solo lo leen los mantenedores.

### Firma tus commits

Las contribuciones se licencian con la licencia del proyecto: Apache-2.0 para la app, MIT-0 para la
plantilla de shards y los archivos comunes de los shards. Cada commit lleva una línea
`Signed-off-by`, el [Developer Certificate of Origin](https://developercertificate.org/), que declara
que escribiste el cambio o tienes derecho a enviarlo:

```bash
git commit -s
```

Los dos repositorios lo piden, y el CI de la app lo comprueba en cada pull request.

### El nombre y el logo

Puedes decir que algo funciona con LibreShard y redistribuir versiones sin modificar. Los forks
necesitan su propio nombre e icono. Los detalles están en la
[política de marca](https://github.com/libreshard/libreshard/blob/main/TRADEMARKS.md) (en inglés).
