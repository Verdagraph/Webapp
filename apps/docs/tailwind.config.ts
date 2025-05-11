import type { Config } from 'tailwindcss';
import { default as baseConfig } from '@vdg-webapp/tailwind-config/tailwind';

const config: Config = {
	presets: [baseConfig],
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/@vdg-webapp/ui/dist/**/*.{html,js,svelte,ts}'
	]
};
export default config;
