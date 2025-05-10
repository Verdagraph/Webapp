import { config } from '@vdg-webapp/eslint-config/index.js';

export default [
	...config,
	{
		ignores: ['.svelte-kit/*']
	}
];