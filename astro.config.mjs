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
			],
		}),
	],
});
