import * as server from '../entries/pages/blog/_layout.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog/+layout.server.js";
export const imports = ["_app/immutable/nodes/2.hpHknHWq.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/C33ZBluP.js","_app/immutable/chunks/VptmxkcR.js","_app/immutable/chunks/BQUvzZYV.js"];
export const stylesheets = [];
export const fonts = [];
