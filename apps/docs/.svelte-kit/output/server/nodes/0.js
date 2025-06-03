import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.BQTKaCzQ.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/C33ZBluP.js","_app/immutable/chunks/VptmxkcR.js","_app/immutable/chunks/BQUvzZYV.js","_app/immutable/chunks/QJ-cPXuW.js","_app/immutable/chunks/BKUxGAWh.js","_app/immutable/chunks/D-1toLFz.js","_app/immutable/chunks/BNEUvLy9.js","_app/immutable/chunks/BZ1wCeQG.js"];
export const stylesheets = ["_app/immutable/assets/0.wUGpnocw.css"];
export const fonts = ["_app/immutable/assets/atkinson-hyperlegible-latin-ext-400-normal.Dwzd0TKx.woff2","_app/immutable/assets/atkinson-hyperlegible-latin-ext-400-normal.-EtKVqC7.woff","_app/immutable/assets/atkinson-hyperlegible-latin-400-normal.BKTgBNmI.woff2","_app/immutable/assets/atkinson-hyperlegible-latin-400-normal.DDbeQdWO.woff"];
