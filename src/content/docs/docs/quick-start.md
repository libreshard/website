---
title: Quick start
description: Pair a tablet with LibreShard and start using shards.
---

1. [Download](/download/) and install LibreShard on your PC, then open it. The **Connect** tab
   shows a QR code for each network the PC is on.
2. Scan one with the tablet's camera (the one that opens is the right one), or open the address on
   the tablet and type the 6-digit code.
3. Pick a shard from the menu and tap away. The floating button in the top-left corner switches
   shards and goes full screen.

Each code works once and for 10 minutes. Paired devices are listed in the **Devices** tab, where you
can rename or unpair them.

## A touch screen on the PC itself

If your PC has a touch screen, you don't need a tablet: the **This PC** card in the **Connect** tab
opens the shards in a window on the PC. Tapping it never takes the focus from the app in front, so
the keys still go to that app. Put the window on the touch screen; it remembers where you leave it.

- While LibreShard's own window is in front, the panel presses nothing and says so: switch to the
  app you want to control first.
- On Windows and macOS, **Settings → Keep this PC's panel on top** keeps it above other windows.
- On Linux the panel has its own bar: drag it to move the window, drag the corner to resize it and
  use × to close it. It always stays on top there.

## Make your own shard

A shard is a folder with a `manifest.json` and an `index.html`. Start from the
[template](https://github.com/libreshard/libreshard/tree/main/docs/shard-template) and read the
[guide for shard authors](https://github.com/libreshard/libreshard/blob/main/docs/shards.md).
