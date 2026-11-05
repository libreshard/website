---
title: Security
description: How LibreShard keeps tablets and shards from doing more than you allowed, its known limitations, and how to report a vulnerability.
---

<!-- Summary of SECURITY.md in the LibreShard repository (0.2.0). Keep both in step. -->

LibreShard presses keys on your PC when someone taps a tablet. That's powerful, so this page
explains what LibreShard protects against, what it doesn't, and how to report a problem. The full
threat model is in
[SECURITY.md](https://github.com/libreshard/libreshard/blob/main/SECURITY.md).

## Report a vulnerability

Please **don't open a public issue** for a security problem. Instead:

- use GitHub's private reporting:
  [Report a vulnerability](https://github.com/libreshard/libreshard/security/advisories/new), or
- write to **[security@libreshard.com](mailto:security@libreshard.com)**.

Include the LibreShard version, your operating system and the steps to reproduce it. You'll get an
answer within a week. LibreShard is maintained by volunteers, so fixes may take a while, but we'll
keep you informed and credit you in the release notes if you want. Only the latest release gets
security fixes.

## How it protects you

LibreShard has two halves: an app on your PC that runs a small web server and presses keys, and a
web page on the tablet that shows the **shards**, panels made of HTML, CSS and JavaScript that
anyone can write.

- **Only approved keys.** The PC presses only keys a shard lists in its manifest **and** you
  approved. The check happens on the PC, not on the tablet. If a shard's keys change, the new ones
  stay blocked until you approve them again.
- **A review before installing.** The PC shows every key a shard wants, marks system shortcuts
  (Windows key, Ctrl+Alt) in red and warns when a shard could both open a system dialog and type
  text.
- **Shards are boxed in.** They run in a sandboxed frame with no network access: they can't reach
  the internet, your files, other shards or the tablet's saved pairing.
- **Pairing.** Each tablet pairs with a single-use code that expires in 10 minutes and then gets its
  own token; the PC stores only its hash. Failed attempts are rate limited, any device can be
  unpaired on its own, and you can require confirming every new device on the PC.
- **Your network only.** By default only devices on your local network or a VPN like Tailscale can
  connect. On Windows, the installer offers a firewall rule for private networks only. Web pages
  open in your browser can't control LibreShard.
- **No stuck keys.** Messages are limited in size and rate, but releasing a key is never dropped.
- **Safe installs.** Shard archives are checked for path tricks, links, size and file count before
  they're extracted.

## Known limitations

These are documented on purpose:

- **Local traffic isn't encrypted.** The tablet talks to the PC over plain HTTP. Someone who can
  sniff your network could capture a pairing code or a device token. Use LibreShard on networks you
  trust, and unpair a device if you suspect anything. HTTPS with a local certificate is on the
  [roadmap](/roadmap/).
- **"Only in these apps" prevents mistakes, not attacks.** It stops an accidental tap from firing
  shortcuts into the wrong program. What protects you from a malicious shard is the key review when
  you install it.
- **Running LibreShard as administrator**, needed for games that run elevated on Windows, gives the
  keys any shard presses the same power. Only do it if you trust every installed shard.
- **A shard's keys can still do a lot.** A shard approved for the Windows key, letters and Enter
  could open the Run dialog and type a command. The review warns about this combination: read it.
- **Public networks.** The advanced setting that accepts connections from public addresses removes
  one layer of protection. Only use it behind a VPN or a firewall you trust.

## Privacy

LibreShard sends no data anywhere. There's no telemetry, no account and no cloud service: the app
only talks to the devices you pair on your own network.

This website has no cookies or trackers. It counts visits with Cloudflare Web Analytics, which
doesn't use cookies or collect personal data.

## Code signing

Windows releases aren't code-signed yet. We plan to sign them for free through
[SignPath Foundation](https://signpath.org/). Until then, check downloads against the
`SHA256SUMS.txt` file published with each release (the [FAQ](/docs/faq/) shows how). How signing
will work, who approves it and what the app sends over the network: [Code signing policy](/code-signing/).
