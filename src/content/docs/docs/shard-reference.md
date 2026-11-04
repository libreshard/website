---
title: Shard reference
description: Every manifest field, the Shard API, key names, app limits, settings, languages and the sandbox shards run in.
---

<!-- Adapted from docs/shards.md in the LibreShard repository (0.2.0). Keep both in step. -->

Everything a shard can declare and call. New to shards? Start with
[Create a shard](/docs/create-a-shard/).

## manifest.json

| Field | Required | What it does |
|---|---|---|
| `id` | yes | Lowercase letters, digits and hyphens. Unique; it's also the URL hash. Pick something specific (`acme-photo-tools`, not `photo`). |
| `name` | yes | Shown in the menu and in the floating button's panel (up to 60 characters). |
| `permissions.keys` | yes | The closed list of combos the shard may press (up to 300). Nothing else is ever typed. |
| `author` | no | Shown on the menu card. |
| `version` | no | Informational; shown when the user updates the shard. |
| `icon` | no | An emoji or a letter. Without it, the name's initial is used. |
| `description` | no | One line for the menu card. |
| `apps` | no | Programs the shard is meant for (see [below](#limiting-a-shard-to-certain-apps)). |
| `settings` | no | Settings the user changes on the PC (see [below](#settings-the-user-changes-on-the-pc)). |
| `minAppVersion` | no | The oldest LibreShard the shard works with, such as `"0.1.0"`. Older versions skip it with an explanation. Set it if you publish your shard. |

The manifest is validated when it loads. Unknown fields are dropped, text is trimmed to its limit,
and a shard with a bad `id`, wrong types or unknown keys is rejected. The PC window lists rejected
shards with the reason.

## Buttons

No JavaScript needed:

```html
<button data-key="ctrl+s">Save</button>                <!-- one press per tap -->
<button data-hold="space">Hand tool</button>           <!-- held while the finger is on it -->
<button data-key="volup" data-repeat>Vol +</button>    <!-- repeats while held (every 100 ms) -->
<button data-key="rbracket" data-repeat="150">Brush +</button> <!-- every 150 ms (50–1000) -->
```

- `data-hold` captures the pointer, so the key is released even if the finger slides off the button.
- Tapping a `data-key` button while another finger holds a `data-hold` button works (Alt + Tab).
- Give buttons `touch-action: none`, or a second finger landing can start a pinch zoom that cancels
  both touches.

## From JavaScript

`window.Shard` exists from `DOMContentLoaded` on (the script is injected after yours):

```js
document.addEventListener('DOMContentLoaded', async () => {
  Shard.press('f5');            // press and release
  Shard.hold('shift');          // hold…
  Shard.release('shift');       // …and release

  // Data the shard keeps on this tablet (an object, up to 64 KB as JSON)
  const saved = (await Shard.load()) || {};
  Shard.save({ ...saved, lastPage: 2 });

  // Settings the user chose on the PC, and live changes
  const cfg = await Shard.settings();
  Shard.onSettings((values) => { /* re-render */ });

  // The PC's system and the language
  if (Shard.platform === 'linux') { /* 'windows', 'linux', 'mac' */ }
  console.log(Shard.lang);
});
```

:::caution
The iframe has no `localStorage` (it throws, because the shard's origin is opaque): use
`Shard.save()` and `Shard.load()` instead.
:::

## Keys

Combos are written in lowercase with `+` between keys: `ctrl+shift+p`, `alt+tab`, `numpad5`.

| Group | Names |
|---|---|
| Letters and digits | `a`–`z`, `0`–`9` |
| Function keys | `f1`–`f24` |
| Modifiers | `ctrl`, `shift`, `alt` (left; also `lctrl`, `lshift`, `lalt`), `rctrl`, `rshift`, `ralt`, `win` / `meta` / `cmd` |
| Editing and navigation | `enter`, `esc`, `tab`, `space`, `backspace`, `delete`, `insert`, `home`, `end`, `pageup`, `pagedown`, `up`, `down`, `left`, `right` |
| Punctuation | `comma`, `period`, `minus`, `equal`, `grave`, `slash`, `backslash`, `semicolon`, `apostrophe`, `lbracket`, `rbracket` |
| Numpad | `numpad0`–`numpad9`, `numpadplus`, `numpadminus`, `numpadmul`, `numpaddiv`, `numpaddot`, `numpadenter`, `numlock` |
| Media and others | `mute`, `volup`, `voldown`, `playpause`, `next`, `prev`, `print` (or `printscreen`) |

Things worth knowing:

- **Linux and F13–F24:** many Linux keyboard maps have no F13–F24. LibreShard refuses those keys
  there (the tablet shows a notice) instead of pressing something else. Shards meant for Linux
  shouldn't rely on them.
- **Numpad digits** only type digits with Num Lock on; otherwise Windows and X11 treat them as
  navigation keys.
- **Win + L** can't be injected on Windows (the lock screen ignores synthetic input).
- **Global shortcuts** registered by another program swallow that combo for everyone.
- When you declare system combos (`win+…`, `ctrl+alt+…`, `alt+f4`), the install review shows them in
  red. A shard that has system combos *and* can type text gets a prominent warning. Declare only what
  you use.

## Limiting a shard to certain apps

```json
"apps": ["photoshop", "affinity photo"]
```

Each string is compared, case-insensitively and as a partial match, with the program in front (its
name and executable). If none matches, LibreShard doesn't press anything and the tablet says which
app it expected. Prefer specific strings (`adobe photoshop` rather than `ps`).

These are only **suggestions**: the user decides in the PC window (**Apps** on the shard's card),
can add programs, or remove the restriction. Leave `apps` out for shards that work anywhere (media
keys, a numpad).

## Settings the user changes on the PC

```json
"settings": [
  { "id": "layout", "type": "select", "label": { "en": "Layout", "es": "Distribución" },
    "options": [ { "value": "compact", "label": "Compact" }, { "value": "wide", "label": "Wide" } ],
    "default": "wide" },
  { "id": "confirm", "type": "toggle", "label": "Confirm critical actions", "default": true },
  { "id": "scenes", "type": "number", "label": "Scene buttons", "min": 1, "max": 6, "step": 1, "default": 4 },
  { "id": "title", "type": "text", "label": "Title", "maxLength": 40, "default": "My shard" },
  { "id": "accent", "type": "color", "label": "Accent", "default": "#22d3ee" }
]
```

- Types: `toggle`, `select` (`options` as texts or `{ value, label }`), `number` (`min`, `max`,
  `step`), `text` (`maxLength`, up to 200) and `color` (`#rrggbb`). Up to 30 settings.
- A label is a text or `{ "en": "…", "es": "…" }`.
- The PC builds the form, checks every value against your declaration and sends the values to the
  shard: read them with `Shard.settings()` and follow changes with `Shard.onSettings(cb)`.
- Settings are data, never code. An invalid declaration rejects the shard.

A common pattern: a setting that picks the program, and JavaScript that fills `data-key` from a key
map per program (see the bundled Image editing and Video calls shards).

## Languages

A shard can be in one language only. To ship several:

1. Add a `strings.js` that sets
   `window.SHARD_STRINGS = { en: { title: 'My shard' }, es: { title: 'Mi shard' } }`, and load it
   before your own scripts.
2. Mark texts with `data-i18n="title"` (text) or `data-i18n-aria="title"` (`aria-label`).
3. In JavaScript, `Shard.t('title', { name: 'x' })` translates, and `Shard.translate(root)`
   re-fills a part of the page you built later.

LibreShard uses the language chosen on the PC, else the tablet's. Missing texts fall back to
English, then to the key. It must be a script, not a JSON file: shards can't `fetch`.

## What a shard can't do

Every shard file is served with this Content Security Policy:

```
default-src 'none'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';
img-src 'self' data:; font-src 'self' data:; connect-src 'none'; form-action 'none'
```

So a shard:

- can't load anything from the internet: no CDNs, no Google Fonts, no `fetch`, no WebSocket.
  Everything must live in the folder or be embedded as `data:`;
- runs in a sandboxed iframe: it can't read the viewer, other shards or the tablet's storage;
- can only ask the viewer to press keys from its own manifest, and the PC checks that again;
- can't run programs or commands on the PC.

Two side effects: `mask-image` with a file from the shard may fail (embed masks as `data:` URLs;
`<img>` and `background-image` work with files), and `localStorage` throws (use `Shard.save()`).
