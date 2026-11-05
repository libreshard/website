// Spanish pages get the Spanish link preview image (public/og-es.png). The English one, and the
// rest of the preview tags, are set in astro.config.mjs.
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

const preview: Record<string, { image: string; alt: string }> = {
	es: {
		image: 'https://libreshard.com/og-es.png',
		alt: 'LibreShard, el panel táctil de código abierto, con el shard de OBS Studio en una tablet',
	},
};

export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	const localized = route.locale ? preview[route.locale] : undefined;
	if (!localized) return;
	for (const tag of route.head) {
		const key = tag.attrs?.property ?? tag.attrs?.name;
		if (key === 'og:image' || key === 'twitter:image') tag.attrs!.content = localized.image;
		if (key === 'og:image:alt') tag.attrs!.content = localized.alt;
	}
});
