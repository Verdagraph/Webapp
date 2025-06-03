import * as server from '../entries/pages/demos/_layout.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/demos/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/demos/+layout.server.js";
export const imports = ["_app/immutable/nodes/3.9uQLKn22.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/C33ZBluP.js","_app/immutable/chunks/VptmxkcR.js","_app/immutable/chunks/BQUvzZYV.js","_app/immutable/chunks/Ce0xbpzu.js","_app/immutable/chunks/D4tMsWHK.js","_app/immutable/chunks/C-nYA6EH.js","_app/immutable/chunks/BNEUvLy9.js","_app/immutable/chunks/b-jnAxWt.js","_app/immutable/chunks/QJ-cPXuW.js","_app/immutable/chunks/BKUxGAWh.js","_app/immutable/chunks/D-1toLFz.js","_app/immutable/chunks/BdSRcnLh.js","_app/immutable/chunks/VBhAFdqd.js","_app/immutable/chunks/BuzpPzY2.js","_app/immutable/chunks/jKjWACjA.js","_app/immutable/chunks/CWz9Okes.js","_app/immutable/chunks/BSdSrl02.js","_app/immutable/chunks/BBx3KdXg.js","_app/immutable/chunks/CJYQxs-V.js","_app/immutable/chunks/BZ1wCeQG.js"];
export const stylesheets = ["_app/immutable/assets/circle.bHHIbcsu.css","_app/immutable/assets/demos.B2Isvz3K.css"];
export const fonts = [];
