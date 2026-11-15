// /gallery/index.json: the list LibreShard reads when someone opens its gallery (gallery.js in the
// app checks every entry again, and installs a file only if it matches its entry's sha256).
import type { APIRoute } from 'astro';
import { gallery } from '../../lib/gallery';

export const GET: APIRoute = async () => {
	const { entries } = await gallery();
	return new Response(JSON.stringify({ format: 1, updated: new Date().toISOString(), shards: entries }), {
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
};
