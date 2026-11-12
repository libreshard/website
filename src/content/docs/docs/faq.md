---
title: Frequently asked questions
description: Answers about connecting a tablet, keys that don't arrive, games, Wayland, the firewall and unsigned downloads.
---

## General

### Do I need to install anything on the tablet?

No. The tablet opens LibreShard in its browser: any modern browser works, on Android, iPad, a phone
or another computer. Only the PC needs LibreShard installed.

### Does it need the internet or an account?

No. LibreShard has no account, no cloud and no telemetry: the PC and the tablet talk over your own
network. Shards can't reach the internet either.

### Can I use several tablets at once?

Yes. Pair each one with its own QR code or pairing code; they're listed in the **Devices** tab,
where you can rename or unpair each one.

### Is it free?

Yes. LibreShard is free and open source under the
[Apache License 2.0](https://github.com/libreshard/libreshard/blob/main/LICENSE), with nothing to
buy.

## Connecting

### The tablet can't open the QR code's address

- **Same network:** the tablet and the PC must be on the same network. The **Connect** tab shows a
  QR code for each network the PC is on; only the one the tablet shares will open.
- **Guest networks:** many guest Wi-Fi networks keep devices from seeing each other. Use your main
  network.
- **Firewall:** the PC must let the tablet in. See
  [the firewall question](#windows-asks-about-the-firewall-what-should-i-allow) below.
- **LibreShard is open:** the tablet shows "Couldn't connect to the PC" when LibreShard isn't
  running. With **Keep running in the tray when the window is closed** on (in **Settings**), closing
  the window doesn't stop it.

### The tablet worked yesterday and now asks to pair again

The tablet remembers its pairing for the PC's address. If the router gave the PC a new address, the
tablet sees a new site and asks again: scan the QR code the PC shows now. To avoid it, reserve a
fixed address for the PC in your router's settings (often called a DHCP reservation).

Changing the port in **Settings** has the same effect.

### "This QR was already used or expired"

Each QR code and pairing code works once and for 10 minutes, then renews itself. Scan the one the PC
shows now, or type the code.

### Can I use it away from home?

Yes, through a VPN such as Tailscale: LibreShard accepts devices on a VPN like devices on your local
network. It doesn't accept connections from the internet unless you turn on **Allow connections
from public networks** in **Settings**, which isn't recommended.

## Keys

### I tap a button and nothing happens

The tablet usually says why:

- **"Not run. This shard only works in…"**: the shard is limited to certain apps and another one is
  in front. Switch to that app, or change the shard's apps in the PC window (**Apps** on the
  shard's card). With **Allow apps from the tablet** on, the tablet offers to add the app in front.
- **"LibreShard is paused on the PC"**: someone used **Pause** in the PC window or the tray.
- **"Pending permissions"**: the shard has new keys that need your approval on the PC.
- **"This PC's keyboard has no … key"**: see [F13–F24 on Linux](#some-keys-dont-work-on-linux).

If the tablet says nothing, the keys were pressed, but something on the PC took them:

- A **game or app running as administrator** ignores keys from normal programs (see
  [below](#keys-dont-reach-a-game)).
- **Another program's global shortcut** uses the same combo and swallows it.
- The shortcut isn't set in the app: check the app's own shortcut settings.

### Keys don't reach a game

Windows doesn't let normal programs send keys to programs running as administrator, and many games
and launchers run that way. Run LibreShard as administrator too.

:::caution
Running LibreShard as administrator gives the keys every shard presses the same power. Only do it if
you trust every installed shard.
:::

### Some keys don't work on Linux

Many Linux keyboard maps have no F13–F24 keys. LibreShard refuses to press them there, and the tablet
says so, instead of pressing something else. Shards meant for Linux shouldn't rely on them.

## Windows

### Windows says "Windows protected your PC"

LibreShard's releases aren't code-signed yet, so SmartScreen warns about them. Click **More info →
Run anyway**. To check that the file is the official one, compare its checksum with
`SHA256SUMS.txt` from the same release, shown on the [download page](/download/):

```powershell
Get-FileHash .\LibreShard-Setup-0.2.0.exe
```

We plan to sign the releases through [SignPath Foundation](https://signpath.org/) for 1.0.

### Windows asks about the firewall: what should I allow?

Allow **private networks** only, so tablets at home can connect but no one on a public network can.
The installer offers the same rule, which asks for administrator rights once.

## Linux

### Does it work on Wayland?

Not yet. Pressing keys and detecting the app in front need an X11 session. If your distribution
still offers one, pick it on the login screen (on Ubuntu, the gear icon → **Ubuntu on Xorg**).
Desktops that run on X11, such as XFCE, work as they are.

### The firewall blocks the tablet

If `ufw` is enabled, allow LibreShard's port from your local network only. For example, if your
network is `192.168.1.x`:

```bash
sudo ufw allow from 192.168.1.0/24 to any port 7878 proto tcp comment 'LibreShard'
```

Use your own network range (`ip -4 addr` shows it) and port (7878 unless you changed it in
**Settings**).

### How do I check the download?

In the folder with the download and `SHA256SUMS.txt` from the same release:

```bash
sha256sum -c SHA256SUMS.txt --ignore-missing
```

## Still stuck?

Search the [issues](https://github.com/libreshard/libreshard/issues) or open a new one, or ask in the
[discussions](https://github.com/libreshard/libreshard/discussions). For security problems, write to
security@libreshard.com instead.
