import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

import { default as baseConfig } from '@vdg-webapp/tailwind-config/tailwind';

const config: Config = {
	presets: [baseConfig],
	plugins: [typography],
	content: [
		'./src/**/*.{html,js,svelte,ts,svx}',
		'./node_modules/@vdg-webapp/ui/dist/**/*.{html,js,svelte,ts}'
	]
};
export default config;
