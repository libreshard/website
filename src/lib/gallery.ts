// The gallery, read from the libreshard/shards repository when the site is built: one reviewed
// entry per shard (shards/<id>.json) and optional screenshots. The repository comes as one tarball
// from codeload.github.com (not the API, which limits anonymous requests).
//
// The site publishes /gallery/index.json for the app, the screenshots and the gallery pages. If the
// repository can't be read, the build fails on purpose: Cloudflare Pages then keeps the previous
// site, instead of publishing an empty gallery that would make every app show nothing.
import { gunzipSync } from 'node:zlib';

const REPO = 'libreshard/shards';
export const REPO_URL = `https://github.com/${REPO}`;
const TARBALL = `https://codeload.github.com/${REPO}/tar.gz/refs/heads/main`;
export const TAGS = ['games', 'streaming', 'creative', 'video', 'audio', 'office', 'development', 'desktop', 'accessibility', 'other'] as const;

export interface GalleryEntry {
	id: string;
	name: string;
	author: string;
	description: string;
	icon?: string;
	version: string;
	minAppVersion?: string;
	license: string;
	url?: string;
	tags: string[];
	screenshot?: string; // absolute URL on libreshard.com
	keys: string[];
	apps: string[];
	download?: { url: string; sha256: string; size: number };
	paid?: boolean;
	price?: string;
	buyUrl?: string;
}

export interface Gallery {
	entries: GalleryEntry[];
	screenshots: Map<string, { data: Buffer; type: string }>; // file name → image
}

// Files in a ustar archive: name → contents (regular files only)
function untar(buf: Buffer): Map<string, Buffer> {
	const files = new Map<string, Buffer>();
	let off = 0;
	while (off + 512 <= buf.length) {
		const header = buf.subarray(off, off + 512);
		if (header.every((b) => b === 0)) break;
		const str = (a: number, b: number) => header.subarray(a, b).toString('utf8').replace(/\0.*$/s, '');
		const size = parseInt(str(124, 136).trim() || '0', 8);
		const type = str(156, 157);
		const prefix = str(345, 500);
		const name = (prefix ? prefix + '/' : '') + str(0, 100);
		if (type === '0' || type === '') files.set(name, buf.subarray(off + 512, off + 512 + size));
		off += 512 + Math.ceil(size / 512) * 512;
	}
	return files;
}

const text = (v: unknown, max: number) => typeof v === 'string' && v.trim() === v && v.length > 0 && [...v].length <= max;
function https(v: unknown) {
	if (typeof v !== 'string' || v.length > 2048) return false;
	try { const u = new URL(v); return u.protocol === 'https:' && !!u.hostname && !u.username && !u.password; } catch { return false; }
}

// The repository's CI already checked every entry against its file; this only makes sure the site
// never publishes something malformed (a bad entry is left out with a warning)
function clean(e: any, file: string): GalleryEntry | null {
	const bad = (why: string) => { console.warn(`[gallery] ${file}: ${why}, left out`); return null; };
	if (!e || typeof e !== 'object' || typeof e.id !== 'string' || !/^[a-z0-9-]{1,64}$/.test(e.id)) return bad('no valid id');
	if (file !== `${e.id}.json`) return bad('file name and id differ');
	if (!text(e.name, 60) || !text(e.author, 60) || !text(e.description, 160)) return bad('name, author or description');
	if (typeof e.version !== 'string' || typeof e.license !== 'string') return bad('version or license');
	if (!Array.isArray(e.keys) || !e.keys.length || !e.keys.every((k: unknown) => typeof k === 'string')) return bad('keys');
	const out: GalleryEntry = {
		id: e.id, name: e.name, author: e.author, description: e.description, version: e.version, license: e.license,
		tags: Array.isArray(e.tags) ? e.tags.filter((t: string) => (TAGS as readonly string[]).includes(t)) : [],
		keys: e.keys, apps: Array.isArray(e.apps) ? e.apps.filter((a: unknown) => typeof a === 'string') : [],
	};
	if (text(e.icon, 16)) out.icon = e.icon;
	if (typeof e.minAppVersion === 'string') out.minAppVersion = e.minAppVersion;
	if (https(e.url)) out.url = e.url;
	if (e.paid === true) {
		if (!text(e.price, 40) || !https(e.buyUrl)) return bad('paid without price or buyUrl');
		Object.assign(out, { paid: true, price: e.price, buyUrl: e.buyUrl });
	} else {
		const d = e.download;
		if (!d || !https(d.url) || !/^[0-9a-f]{64}$/.test(d.sha256) || !Number.isInteger(d.size)) return bad('download');
		out.download = { url: d.url, sha256: d.sha256, size: d.size };
	}
	return out;
}

const TYPES: Record<string, string> = { png: 'image/png', webp: 'image/webp', jpg: 'image/jpeg' };

let cached: Promise<Gallery> | undefined;
export function gallery(): Promise<Gallery> {
	cached ??= load();
	return cached;
}

async function load(): Promise<Gallery> {
	const res = await fetch(TARBALL, { headers: { 'User-Agent': 'libreshard.com build' } });
	if (!res.ok) throw new Error(`[gallery] couldn't download ${REPO} (${res.status}): the build stops so the previous site stays`);
	const files = untar(gunzipSync(Buffer.from(await res.arrayBuffer())));
	const entries: GalleryEntry[] = [];
	const screenshots = new Map<string, { data: Buffer; type: string }>();
	for (const [name, data] of files) {
		const rel = name.split('/').slice(1).join('/'); // drop the "shards-main/" folder
		const shot = /^screenshots\/([a-z0-9-]{1,64}\.(png|webp|jpg))$/.exec(rel);
		if (shot) { screenshots.set(shot[1], { data, type: TYPES[shot[2]] }); continue; }
		const m = /^shards\/([^/]+\.json)$/.exec(rel);
		if (!m) continue;
		let raw;
		try { raw = JSON.parse(data.toString('utf8')); } catch { console.warn(`[gallery] ${m[1]}: not valid JSON, left out`); continue; }
		const e = clean(raw, m[1]);
		if (!e) continue;
		if (typeof raw.screenshot === 'string') {
			const file = raw.screenshot.replace(/^screenshots\//, '');
			if (screenshots.has(file) || files.has(`${name.split('/')[0]}/${raw.screenshot}`)) e.screenshot = `https://libreshard.com/gallery/screenshots/${file}`;
		}
		entries.push(e);
	}
	entries.sort((a, b) => a.name.localeCompare(b.name));
	console.log(`[gallery] ${entries.length} entries, ${screenshots.size} screenshots`);
	return { entries, screenshots };
}
