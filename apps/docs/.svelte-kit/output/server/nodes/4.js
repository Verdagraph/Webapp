export const index = 4;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default);
export const imports = [
	'_app/immutable/nodes/4.BCD2MQ-x.js',
	'_app/immutable/chunks/HWDk4eir.js',
	'_app/immutable/chunks/DgmMHYUv.js',
	'_app/immutable/chunks/B1d5rMd0.js',
	'_app/immutable/chunks/Cp_vbEY-.js',
	'_app/immutable/chunks/BRBqP9qL.js',
	'_app/immutable/chunks/Cz8mIVZI.js',
	'_app/immutable/chunks/UaJBEsuX.js',
	'_app/immutable/chunks/C1QID_m_.js'
];
export const stylesheets = [];
export const fonts = [];
