// The gallery's screenshots, served from libreshard.com (copied from the libreshard/shards
// repository when the site is built), so pages load nothing from other sites.
import type { APIRoute, GetStaticPaths } from 'astro';
import { gallery } from '../../../lib/gallery';

export const getStaticPaths: GetStaticPaths = async () => {
	const { screenshots } = await gallery();
	return [...screenshots.keys()].map((file) => ({ params: { file } }));
};

export const GET: APIRoute = async ({ params }) => {
	const shot = (await gallery()).screenshots.get(String(params.file));
	if (!shot) return new Response(null, { status: 404 });
	return new Response(shot.data, { headers: { 'Content-Type': shot.type } });
};
