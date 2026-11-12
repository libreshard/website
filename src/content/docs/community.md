---
title: Community
description: How to help LibreShard with bug reports, shards, translations and code, and the rules for taking part.
---

<!-- Based on CONTRIBUTING.md in the LibreShard repository (0.2.0). Keep both in step. -->

LibreShard is built in the open, by volunteers. Bug reports, shards, translations, documentation and
code are all welcome.

## Talk to us

- **[Discussions](https://github.com/libreshard/libreshard/discussions):** questions, ideas and
  showing off your shards.
- **[Issues](https://github.com/libreshard/libreshard/issues):** bug reports and concrete proposals.
- **Email:** [hello@libreshard.com](mailto:hello@libreshard.com). For security problems, follow the
  [security page](/security/) instead.

## Ways to help

### Report a bug

In LibreShard, Settings → **Report a bug** opens the bug report form with your version and system
filled in, and copies the diagnostics for you to paste (read them first: they have no device names,
addresses or keys typed). You can also [open an issue](https://github.com/libreshard/libreshard/issues/new/choose)
yourself with your LibreShard version, your system (and desktop on Linux), what you did and what
happened. Check the [FAQ](/docs/faq/) first: the
answer may be there.

### Share a shard

You don't need to change LibreShard for that. [Create your shard](/docs/create-a-shard/), publish it
in your own repository, and tell people about it in the discussions.

### Propose a bundled shard

Open an issue first. Bundled shards must work with the declarative `data-key` / `data-hold`
attributes, ship English and Spanish texts, and use no third-party material (logos, images, fonts).

### Translate

The app's texts live in `i18n/en.json` and `i18n/es.json` in the
[LibreShard repository](https://github.com/libreshard/libreshard); a new language is a new file with
the same keys. This website's pages are in the
[website repository](https://github.com/libreshard/website), under `src/content/docs/`, and every
page has an "Edit page" link at the bottom.

### Write code

Read the [contributing guide](https://github.com/libreshard/libreshard/blob/main/CONTRIBUTING.md)
for the setup, the conventions and how pull requests work.
[CONTEXT.md](https://github.com/libreshard/libreshard/blob/main/CONTEXT.md) explains the
architecture, the protocol and the security model. The [roadmap](/roadmap/)
lists what's coming, and help is welcome on any of it.

## The rules

### Code of conduct

Everyone taking part follows the
[code of conduct](https://github.com/libreshard/libreshard/blob/main/CODE_OF_CONDUCT.md) (the
Contributor Covenant 3.0). In short: be kind and assume good faith; harassment and personal attacks
aren't tolerated. To report a problem, write to
[conduct@libreshard.com](mailto:conduct@libreshard.com): only the maintainers read it.

### Signing off your commits

Contributions are licensed under the project's license: Apache-2.0 for the app, MIT-0 for the shard
template and the shared shard files. Every commit carries a `Signed-off-by` line, the
[Developer Certificate of Origin](https://developercertificate.org/), stating that you wrote the
change or have the right to submit it:

```bash
git commit -s
```

Both repositories ask for it, and the app's CI checks it on every pull request.

### The name and logo

You can say that something works with LibreShard, and redistribute unmodified releases. Forks need
their own name and icon. The details are in the
[trademark policy](https://github.com/libreshard/libreshard/blob/main/TRADEMARKS.md).
