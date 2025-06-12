import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),

	kit: {
		adapter: adapter({ fallback: '404.html' }),
		alias: {
			$lib: path.resolve('./src/lib'),
			$demos: path.resolve('./src/lib/demos')
		}
	}
};

export default config;
