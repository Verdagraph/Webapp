export const index = 3;
let component_cache;
export const component = async () =>
	(component_cache ??= (await import('../entries/pages/about/_page.svx.js')).default);
export const imports = [
	'_app/immutable/nodes/3.DwgYNQzr.js',
	'_app/immutable/chunks/HWDk4eir.js',
	'_app/immutable/chunks/DgmMHYUv.js',
	'_app/immutable/chunks/B1d5rMd0.js',
	'_app/immutable/chunks/BNiip-ZU.js',
	'_app/immutable/chunks/Cy8X8so-.js',
	'_app/immutable/chunks/Cz8mIVZI.js',
	'_app/immutable/chunks/UaJBEsuX.js',
	'_app/immutable/chunks/CwnTrnkb.js',
	'_app/immutable/chunks/BYzBvHMH.js'
];
export const stylesheets = [];
export const fonts = [];
