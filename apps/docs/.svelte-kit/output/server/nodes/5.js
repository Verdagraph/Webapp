export const index = 5;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/pages/guides/_page.svelte.js'))
		.default);
export const imports = [
	'_app/immutable/nodes/5.xPn3IWzD.js',
	'_app/immutable/chunks/CNAEEddD.js',
	'_app/immutable/chunks/BvF3OQQc.js',
	'_app/immutable/chunks/CC_UwoEl.js',
	'_app/immutable/chunks/_pUHaYjN.js',
	'_app/immutable/chunks/BYaljbnY.js',
	'_app/immutable/chunks/Bx2UGga_.js',
	'_app/immutable/chunks/CHDAeHIy.js',
	'_app/immutable/chunks/DYloJB2f.js',
	'_app/immutable/chunks/EIGlRJae.js'
];
export const stylesheets = [];
export const fonts = [];
