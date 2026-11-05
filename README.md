# libreshard.com

The website of [LibreShard](https://github.com/libreshard/libreshard), the open-source touch control
deck. Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build), and
deployed to Cloudflare Pages on every push to `main`.

## Run it locally

Requirements: Node.js 24 (see `.node-version`).

```bash
npm install
npm run dev       # http://localhost:4321, reloads as you edit
npm run build     # the static site, in dist/
npm run preview   # serve dist/ to check the build
```

The download page reads the newest release from the GitHub API while building. If GitHub can't be
reached, it links to the releases list instead. Set `GITHUB_TOKEN` in the environment to avoid
GitHub's limit for anonymous requests; never commit a token.

## Where things are

| Path | What it is |
|---|---|
| `src/content/docs/` | The pages, in Markdown or MDX. English at the root, Spanish in `es/` with the same file names. |
| `src/components/` | `Downloads.astro` (download cards), `HeaderLinks.astro` (links in the header) `SiteFooter.astro` (licenses and trademark notice at the bottom of every page) and `Roadmap.astro` (the roadmap timeline; its data mirrors the app's README). |
| `src/lib/release.ts` | Reads the latest release from GitHub. |
| `src/styles/brand.css` | LibreShard's colors on Starlight's theme. |
| `src/assets/` | Logo and screenshots (optimized at build time). |
| `public/og.png` | The image link previews show. Regenerate it with `node scripts/og-image.mjs` when the logo or the screenshot changes. |
| `public/.well-known/security.txt` | Where to report vulnerabilities ([RFC 9116](https://www.rfc-editor.org/rfc/rfc9116)). Renew its `Expires` date before it passes (it's set a year ahead). |
| `public/_headers` | Security headers (CSP, HSTS…) that Cloudflare Pages sends with every page. |

## Contributing

Fixes, translations and new pages are welcome. Every page has an "Edit page" link that opens it on
GitHub. Commits must be signed off (`git commit -s`, the [DCO](https://developercertificate.org/)),
as in the app's repository. Check the [app's contributing guide](https://github.com/libreshard/libreshard/blob/main/CONTRIBUTING.md)
for the general rules.

A new page in English should get its Spanish version in `src/content/docs/es/`. If you can't write
it, open the pull request anyway: Starlight shows the English page with a notice until it exists.

## License

- **Code** (components, configuration, styles): [Apache License 2.0](LICENSE).
- **Text and documentation** (`src/content/`): [Creative Commons Attribution 4.0](LICENSES/CC-BY-4.0.txt).
- The **LibreShard name and logo** aren't covered by either license: see the
  [trademark policy](https://github.com/libreshard/libreshard/blob/main/TRADEMARKS.md).
