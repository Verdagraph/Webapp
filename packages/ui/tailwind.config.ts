import type { Config } from 'tailwindcss';
import { default as baseConfig } from '@vdg-webapp/tailwind-config/tailwind';

const config: Config = {
	presets: [baseConfig],
	content: ['./node_modules/@vdg-webapp/ui/**/*.{html,js,svelte,ts}']
};
export default config;
