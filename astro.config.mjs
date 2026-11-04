// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://libreshard.com',
	integrations: [
		starlight({
			title: 'LibreShard',
			description: 'The open-source touch control deck: turn any tablet, phone or spare screen into a control panel for your PC.',
			logo: { src: './src/assets/logo-mark.svg', alt: 'LibreShard' },
			favicon: '/favicon.svg',
			head: [
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#0d1b2a' } },
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' } },
				// Link previews (Discord, Reddit, X…): public/og.png, made by scripts/og-image.mjs
				{ tag: 'meta', attrs: { property: 'og:image', content: 'https://libreshard.com/og.png' } },
				{ tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
				{ tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
				{ tag: 'meta', attrs: { property: 'og:image:alt', content: 'LibreShard, the open-source control deck, with the OBS Studio shard on a tablet' } },
				{ tag: 'meta', attrs: { name: 'twitter:image', content: 'https://libreshard.com/og.png' } },
			],
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
				es: { label: 'Español', lang: 'es' },
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/libreshard/libreshard' }],
			editLink: { baseUrl: 'https://github.com/libreshard/website/edit/main/' },
			customCss: ['./src/styles/brand.css'],
			components: {
				// Adds "Download" and "Docs" links next to the GitHub icon in the header
				SocialIcons: './src/components/HeaderLinks.astro',
				// Adds the licenses, the trademark policy and the non-affiliation notice to every page
				Footer: './src/components/SiteFooter.astro',
			},
			sidebar: [
				{
					label: 'Start here',
					translations: { es: 'Empieza aquí' },
					items: [
						{ slug: 'download' },
						{ slug: 'docs/quick-start' },
					],
				},
				{
					label: 'Shard authors',
					translations: { es: 'Autores de shards' },
					items: [
						{ slug: 'docs/create-a-shard' },
						{ slug: 'docs/shard-reference' },
					],
				},
				{
					label: 'Project',
					translations: { es: 'Proyecto' },
					items: [
						{ slug: 'security' },
						{ slug: 'community' },
					],
				},
			],
		}),
	],
});
