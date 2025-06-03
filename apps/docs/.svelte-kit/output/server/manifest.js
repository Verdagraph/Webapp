export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.BA4YcLXN.js",app:"_app/immutable/entry/app.SbdGWc0V.js",imports:["_app/immutable/entry/start.BA4YcLXN.js","_app/immutable/chunks/BuzpPzY2.js","_app/immutable/chunks/BKUxGAWh.js","_app/immutable/chunks/C33ZBluP.js","_app/immutable/entry/app.SbdGWc0V.js","_app/immutable/chunks/jKjWACjA.js","_app/immutable/chunks/C33ZBluP.js","_app/immutable/chunks/C-nYA6EH.js","_app/immutable/chunks/BNEUvLy9.js","_app/immutable/chunks/VptmxkcR.js","_app/immutable/chunks/CWj6FrbW.js","_app/immutable/chunks/QJ-cPXuW.js","_app/immutable/chunks/BKUxGAWh.js","_app/immutable/chunks/BdSRcnLh.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js'))
		],
		routes: [
			{
				id: "/api/blog",
				pattern: /^\/api\/blog\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/blog/_server.ts.js'))
			},
			{
				id: "/api/docs",
				pattern: /^\/api\/docs\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/docs/_server.ts.js'))
			},
			{
				id: "/blog",
				pattern: /^\/blog\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/blog/[slug]",
				pattern: /^\/blog\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/demos",
				pattern: /^\/demos\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/demos/[demoId]",
				pattern: /^\/demos\/([^/]+?)\/?$/,
				params: [{"name":"demoId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,], errors: [1,,], leaf: 7 },
				endpoint: null
			}
		],
		prerendered_routes: new Set(["/","/about","/api/search","/docs","/docs/__data.json","/support","/docs/introduction","/docs/faq","/docs/concepts","/docs/self-hosting","/docs/garden-management","/docs/workspace-environment-config","/docs/cultivar-config","/docs/garden-setup","/docs/first-plan"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
