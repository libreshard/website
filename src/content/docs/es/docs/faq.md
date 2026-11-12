---
title: Preguntas frecuentes
description: Respuestas sobre cómo conectar la tablet, teclas que no llegan, juegos, Wayland, el firewall y las descargas sin firmar.
---

<!-- Translation of docs/faq.md. Keep both in step. -->

## General

### ¿Tengo que instalar algo en la tablet?

No. La tablet abre LibreShard en su navegador: sirve cualquier navegador moderno, en Android, iPad,
un teléfono u otra computadora. Solo hace falta instalar LibreShard en la PC.

### ¿Necesita internet o una cuenta?

No. LibreShard no tiene cuenta, ni nube, ni telemetría: la PC y la tablet hablan por tu propia red.
Los shards tampoco pueden acceder a internet. Lo único que usa internet es la búsqueda diaria de
versiones nuevas, que no envía nada sobre ti y se puede desactivar en Ajustes.

### ¿Puedo usar varias tablets a la vez?

Sí. Vincula cada una con su propio QR o código; aparecen en la pestaña **Dispositivos**, donde puedes
renombrarlas o desvincularlas una a una.

### ¿Cómo llevo LibreShard a otra PC?

Ajustes → **Copia de seguridad** → **Exportar copia…** guarda en un archivo tus ajustes, las reglas de
apps, el orden y los ajustes de los shards y los shards que instalaste. En la PC nueva, **Importar
copia…** te muestra primero qué va a cambiar, y cada shard vuelve a pasar por la revisión de teclas.
Las tablets no van en la copia: vuelve a vincularlas.

### ¿Es gratis?

Sí. LibreShard es libre y de código abierto bajo la
[Apache License 2.0](https://github.com/libreshard/libreshard/blob/main/LICENSE), sin nada que
comprar.

## Conexión

### La tablet no abre la dirección del QR

- **La misma red:** la tablet y la PC tienen que estar en la misma red. La pestaña **Conectar**
  muestra un QR por cada red a la que está conectada la PC; solo abre el de la red que comparten.
- **Redes de invitados:** muchas redes Wi-Fi de invitados impiden que los dispositivos se vean entre
  sí. Usa tu red principal.
- **Firewall:** la PC tiene que dejar entrar a la tablet. Mira
  [la pregunta del firewall](#windows-pregunta-por-el-firewall-qué-debo-permitir) más abajo.
- **LibreShard abierto:** la tablet dice "No se pudo conectar con la PC" cuando LibreShard no está
  en marcha. Con **Seguir en la bandeja al cerrar la ventana** activado (en **Ajustes**), cerrar la
  ventana no lo detiene.

### Ayer funcionaba y hoy la tablet pide vincularse otra vez

La tablet recuerda la vinculación para la dirección de la PC. Si el router le dio a la PC otra
dirección, la tablet ve un sitio nuevo y vuelve a pedirla: escanea el QR que muestra ahora la PC.
Para evitarlo, reserva una dirección fija para la PC en los ajustes del router (suele llamarse
reserva DHCP).

Cambiar el puerto en **Ajustes** tiene el mismo efecto.

### "Este QR ya se usó o caducó"

Cada QR y cada código sirven una vez y durante 10 minutos, y después se renuevan. Escanea el que
muestra ahora la PC, o escribe el código.

### ¿Puedo usarlo fuera de casa?

Sí, con una VPN como Tailscale: LibreShard acepta los dispositivos de una VPN igual que los de tu red
local. No acepta conexiones desde internet salvo que actives **Permitir conexiones desde redes
públicas** en **Ajustes**, y no se recomienda.

## Teclas

### Toco un botón y no pasa nada

Normalmente la tablet dice por qué:

- **"No se ejecutó. Este shard solo funciona en…"**: el shard está limitado a ciertas apps y hay
  otra delante. Cambia a esa app, o cambia las apps del shard en la ventana de la PC (**Apps** en la
  tarjeta del shard). Con **Permitir apps desde la tablet** activado, la tablet ofrece añadir la app
  que está delante.
- **"LibreShard está en pausa en la PC"**: alguien usó **Pausar** en la ventana de la PC o en la
  bandeja.
- **"Permisos pendientes"**: el shard tiene teclas nuevas que tienes que aprobar en la PC.
- **"Esta PC no tiene la tecla … en su teclado"**: mira [F13–F24 en Linux](#algunas-teclas-no-funcionan-en-linux).

Si la tablet no dice nada, las teclas se pulsaron, pero algo en la PC se las quedó:

- **El atajo global de otro programa** usa la misma combinación y se la queda.
- El atajo no está configurado en la app: revisa los atajos de la propia app.

### Las teclas no llegan a un juego

Windows no deja que los programas normales envíen teclas a programas que se ejecutan como
administrador, y muchos juegos y lanzadores se ejecutan así. La tablet te avisa cuando pasa ("… se
ejecuta como administrador"). Ejecuta LibreShard también como administrador.

:::caution
Ejecutar LibreShard como administrador da ese mismo poder a las teclas que pulse cualquier shard.
Hazlo solo si confías en todos los shards instalados.
:::

### Algunas teclas no funcionan en Linux

Muchas distribuciones de teclado de Linux no tienen las teclas F13–F24. Ahí LibreShard se niega a
pulsarlas, y la tablet lo avisa, en vez de pulsar otra cosa. Los shards pensados para Linux no
deberían depender de ellas.

## Windows

### Windows dice "Windows protegió su PC"

Las versiones de LibreShard todavía no llevan firma de código, así que SmartScreen avisa. Haz clic en
**Más información → Ejecutar de todas formas**. Para comprobar que el archivo es el oficial, compara
su suma de verificación con `SHA256SUMS.txt` de la misma versión, que aparece en la
[página de descarga](/es/download/):

```powershell
Get-FileHash .\LibreShard-Setup-0.2.0.exe
```

Queremos firmar las versiones a través de [SignPath Foundation](https://signpath.org/) en la 1.0.

### Windows pregunta por el firewall: ¿qué debo permitir?

Permite solo las **redes privadas**: así las tablets de casa pueden conectarse, pero nadie en una red
pública. El instalador ofrece la misma regla, que pide permisos de administrador una vez.

## Linux

### ¿Funciona en Wayland?

Todavía no. Pulsar teclas y detectar la app que está delante necesitan una sesión X11. Si tu
distribución todavía la ofrece, elígela en la pantalla de inicio de sesión (en Ubuntu, el icono del
engranaje → **Ubuntu on Xorg**). Los escritorios que funcionan sobre X11, como XFCE, sirven tal cual.

### El firewall bloquea la tablet

Si `ufw` está activado, permite el puerto de LibreShard solo desde tu red local. Por ejemplo, si tu
red es `192.168.1.x`:

```bash
sudo ufw allow from 192.168.1.0/24 to any port 7878 proto tcp comment 'LibreShard'
```

Usa tu propio rango de red (`ip -4 addr` lo muestra) y tu puerto (7878 salvo que lo cambiaras en
**Ajustes**).

### ¿Cómo compruebo la descarga?

En la carpeta con la descarga y el `SHA256SUMS.txt` de la misma versión:

```bash
sha256sum -c SHA256SUMS.txt --ignore-missing
```

## ¿Sigues atascado?

Busca en los [issues](https://github.com/libreshard/libreshard/issues) o abre uno nuevo, o pregunta
en las [discusiones](https://github.com/libreshard/libreshard/discussions). Para problemas de
seguridad, escribe a security@libreshard.com.
