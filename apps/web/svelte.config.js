import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		//
		alias: {
			$assets: path.resolve('./src/lib/assets'),
			$codegen: path.resolve('./src/lib/codegen'),
			$components: path.resolve('./src/lib/components'),
			$data: path.resolve('./src/lib/data'),
			$state: path.resolve('./src/lib/state'),
			$utils: path.resolve('./src/lib/utils')
		}
	}
};

export default config;
