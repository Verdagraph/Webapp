import { sveltekit } from '@sveltejs/kit/vite';
import { jazzPlugin } from 'jazz-tools/dev/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [jazzPlugin({ server: false }), sveltekit()],
	optimizeDeps: {
		exclude: ['jazz-tools', 'jazz-tools/svelte', 'jazz-wasm']
	}
});
