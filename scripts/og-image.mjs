// Generates public/og.png, the 1200×630 image that link previews (Discord, Reddit, X, chat apps)
// show for libreshard.com: the logo, the name, the tagline and a tablet screenshot.
// Usage: node scripts/og-image.mjs   (run it again when the logo or the screenshot changes)
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const W = 1200;
const H = 630;
const root = new URL('..', import.meta.url);
const path = (p) => new URL(p, root);

// The mark's own <svg> nested at the given position, so its gradients and glow come along
const mark = readFileSync(path('src/assets/logo-mark.svg'), 'utf8').replace(
	'<svg ',
	'<svg x="72" y="96" width="150" height="150" ',
);
const font = `font-family="'Segoe UI','Helvetica Neue',Arial,sans-serif"`;

const background = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
	<defs>
		<radialGradient id="bg" cx=".3" cy=".35" r=".9">
			<stop offset="0" stop-color="#16304a"/><stop offset="1" stop-color="#0d1b2a"/>
		</radialGradient>
	</defs>
	<rect width="${W}" height="${H}" fill="url(#bg)"/>
	${mark}
	<text x="72" y="340" ${font} font-size="76" font-weight="800" fill="#e6f1fa">LibreShard</text>
	<text x="74" y="392" ${font} font-size="22" font-weight="600" letter-spacing="5" fill="#22d3ee">OPEN-SOURCE CONTROL DECK</text>
	<text x="74" y="452" ${font} font-size="26" fill="#9cc3e0">Turn any tablet or phone into a</text>
	<text x="74" y="488" ${font} font-size="26" fill="#9cc3e0">touch control panel for your PC.</text>
	<text x="74" y="560" ${font} font-size="24" font-weight="700" fill="#fbbf24">libreshard.com</text>
</svg>`;

// The tablet screenshot on the right, bleeding off the edge, with rounded corners and a frame
const shotW = 640;
const shotH = Math.round((shotW * 803) / 1283);
const radius = 22;
const shot = await sharp(readFileSync(path('src/assets/tablet-shard.png')))
	.resize(shotW, shotH)
	.composite([
		{
			input: Buffer.from(
				`<svg width="${shotW}" height="${shotH}"><rect width="${shotW}" height="${shotH}" rx="${radius}" fill="#fff"/></svg>`,
			),
			blend: 'dest-in',
		},
		{
			input: Buffer.from(
				`<svg width="${shotW}" height="${shotH}"><rect x="2" y="2" width="${shotW - 4}" height="${shotH - 4}" rx="${radius}" fill="none" stroke="#1f3a55" stroke-width="4"/></svg>`,
			),
		},
	])
	.png()
	.toBuffer();

await sharp(Buffer.from(background))
	.composite([{ input: shot, left: 610, top: Math.round((H - shotH) / 2) }])
	.png({ compressionLevel: 9, palette: false })
	.toFile(fileURLToPath(path('public/og.png')));

console.log('public/og.png written');
