// Generates the link preview images for libreshard.com and a square version for social posts:
//   public/og.png, public/og-es.png    1200×630, what Discord, LinkedIn, X or chat apps show for a
//                                      link (the Spanish one for pages under /es/)
//   social/square.png, square-es.png   1200×1200, to attach to a post (not served by the site)
// Each has the logo, the name, the tagline and a tablet screenshot.
// Usage: node scripts/og-image.mjs   (run it again when the logo, the screenshot or the texts change)
//
// The text uses Inter (scripts/fonts/, SIL Open Font License), so the images come out the same on
// any computer. librsvg finds fonts through fontconfig, which only reads FONTCONFIG_FILE when the
// process starts (on Windows, changing process.env later doesn't reach it), so the script writes a
// fontconfig file that lists only scripts/fonts/ and runs itself again with it.
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = new URL('..', import.meta.url);
const file = (p) => fileURLToPath(new URL(p, root));

if (!process.env.LIBRESHARD_OG_FONTS) {
	const dir = join(tmpdir(), 'libreshard-og-fontconfig');
	mkdirSync(dir, { recursive: true });
	const conf = join(dir, 'fonts.conf');
	const fonts = file('scripts/fonts/').replaceAll('\\', '/');
	const cache = join(dir, 'cache').replaceAll('\\', '/');
	writeFileSync(
		conf,
		`<?xml version="1.0"?>\n<!DOCTYPE fontconfig SYSTEM "fonts.dtd">\n<fontconfig><dir>${fonts}</dir><cachedir>${cache}</cachedir></fontconfig>\n`,
	);
	const run = spawnSync(process.execPath, [fileURLToPath(import.meta.url)], {
		stdio: 'inherit',
		env: { ...process.env, FONTCONFIG_FILE: conf, LIBRESHARD_OG_FONTS: '1' },
	});
	process.exit(run.status ?? 1);
}

const { default: sharp } = await import('sharp');

const TEXT = {
	en: {
		tagline: 'OPEN-SOURCE CONTROL DECK',
		lines: ['Turn any tablet, phone or spare screen', 'into a touch control deck for your PC.'],
	},
	es: {
		tagline: 'PANEL TÁCTIL DE CÓDIGO ABIERTO',
		lines: ['Convierte cualquier tablet, móvil o pantalla', 'libre en un panel táctil para tu PC.'],
	},
};

const font = `font-family="Inter"`;
const escape = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
const markSvg = readFileSync(file('src/assets/logo-mark.svg'), 'utf8');
// The mark's own <svg> nested at the given position, so its gradients and glow come along
const mark = (x, y, size) => markSvg.replace('<svg ', `<svg x="${x}" y="${y}" width="${size}" height="${size}" `);

const screenshot = file('src/assets/tablet-shard.png');
const { width: shotSrcW, height: shotSrcH } = await sharp(screenshot).metadata();

// The tablet screenshot scaled to `width`, with rounded corners and a frame
async function tablet(width, radius) {
	const height = Math.round((width * shotSrcH) / shotSrcW);
	const rect = (attrs) => Buffer.from(`<svg width="${width}" height="${height}"><rect ${attrs}/></svg>`);
	const input = await sharp(screenshot)
		.resize(width, height)
		.composite([
			{ input: rect(`width="${width}" height="${height}" rx="${radius}" fill="#fff"`), blend: 'dest-in' },
			{
				input: rect(
					`x="2" y="2" width="${width - 4}" height="${height - 4}" rx="${radius}" fill="none" stroke="#1f3a55" stroke-width="4"`,
				),
			},
		])
		.png()
		.toBuffer();
	return { input, width, height };
}

const background = (W, H, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
	<defs>
		<radialGradient id="bg" cx=".3" cy=".35" r=".9">
			<stop offset="0" stop-color="#16304a"/><stop offset="1" stop-color="#0d1b2a"/>
		</radialGradient>
	</defs>
	<rect width="${W}" height="${H}" fill="url(#bg)"/>
	${body}
</svg>`;

// 1200×630: text on the left, the whole tablet on the right
async function wide(t) {
	const W = 1200;
	const H = 630;
	const shot = await tablet(540, 20);
	const svg = background(
		W,
		H,
		`${mark(72, 84, 150)}
	<text x="70" y="332" ${font} font-size="80" font-weight="800" fill="#e6f1fa">LibreShard</text>
	<text x="74" y="382" ${font} font-size="20" font-weight="700" letter-spacing="3.5" fill="#22d3ee">${escape(t.tagline)}</text>
	<text x="74" y="444" ${font} font-size="24" fill="#9cc3e0">${escape(t.lines[0])}</text>
	<text x="74" y="478" ${font} font-size="24" fill="#9cc3e0">${escape(t.lines[1])}</text>
	<text x="74" y="552" ${font} font-size="24" font-weight="700" fill="#fbbf24">libreshard.com</text>`,
	);
	return { svg, shot, left: W - 48 - shot.width, top: Math.round((H - shot.height) / 2) };
}

// 1200×1200: logo and texts on top, a large tablet below
async function square(t) {
	const W = 1200;
	const H = 1200;
	const shot = await tablet(1056, 28);
	const svg = background(
		W,
		H,
		`${mark(72, 64, 150)}
	<text x="250" y="160" ${font} font-size="96" font-weight="800" fill="#e6f1fa">LibreShard</text>
	<text x="254" y="206" ${font} font-size="24" font-weight="700" letter-spacing="4" fill="#22d3ee">${escape(t.tagline)}</text>
	<text x="74" y="304" ${font} font-size="38" fill="#9cc3e0">${escape(t.lines[0])}</text>
	<text x="74" y="352" ${font} font-size="38" fill="#9cc3e0">${escape(t.lines[1])}</text>
	<text x="${W / 2}" y="1136" text-anchor="middle" ${font} font-size="36" font-weight="700" fill="#fbbf24">libreshard.com</text>`,
	);
	return { svg, shot, left: 72, top: 412 };
}

async function render(layout, out) {
	const { svg, shot, left, top } = await layout;
	await sharp(Buffer.from(svg))
		.composite([{ input: shot.input, left, top }])
		.png({ compressionLevel: 9 })
		.toFile(file(out));
	console.log(`${out} written`);
}

mkdirSync(file('social/'), { recursive: true });
await render(wide(TEXT.en), 'public/og.png');
await render(wide(TEXT.es), 'public/og-es.png');
await render(square(TEXT.en), 'social/square.png');
await render(square(TEXT.es), 'social/square-es.png');
