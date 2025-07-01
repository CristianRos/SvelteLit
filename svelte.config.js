import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: { 
		adapter: adapter(),
		files: {
			routes: 'src/1_pages',
			appTemplate: 'src/0_app/app.html',
			lib: 'src',
		},
		alias: {
			'$/*': './src/*', 
		}
	 }
};

export default config;
