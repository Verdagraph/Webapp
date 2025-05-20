export const index = 2;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/pages/_page.svelte.js')).default);
export const imports = [
	'_app/immutable/nodes/2.BMV6p3Jv.js',
	'_app/immutable/chunks/HWDk4eir.js',
	'_app/immutable/chunks/DgmMHYUv.js',
	'_app/immutable/chunks/B1d5rMd0.js',
	'_app/immutable/chunks/BRpxm6ve.js',
	'_app/immutable/chunks/Dl94qWna.js',
	'_app/immutable/chunks/UaJBEsuX.js',
	'_app/immutable/chunks/BRBqP9qL.js',
	'_app/immutable/chunks/Cz8mIVZI.js',
	'_app/immutable/chunks/C1QID_m_.js',
	'_app/immutable/chunks/Cy8X8so-.js',
	'_app/immutable/chunks/CwnTrnkb.js',
	'_app/immutable/chunks/BYzBvHMH.js'
];
export const stylesheets = [];
export const fonts = [];
