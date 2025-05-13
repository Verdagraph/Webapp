export const manifest = (() => {
	function __memo(fn) {
		let value;
		return () => (value ??= value = fn());
	}

	return {
		appDir: '_app',
		appPath: '_app',
		assets: new Set(['favicon.png']),
		mimeTypes: { '.png': 'image/png' },
		_: {
			client: {
				start: '_app/immutable/entry/start.CRMck1Yn.js',
				app: '_app/immutable/entry/app.BogNfHbJ.js',
				imports: [
					'_app/immutable/entry/start.CRMck1Yn.js',
					'_app/immutable/chunks/q6OuH9xx.js',
					'_app/immutable/chunks/BvF3OQQc.js',
					'_app/immutable/chunks/CHDAeHIy.js',
					'_app/immutable/entry/app.BogNfHbJ.js',
					'_app/immutable/chunks/BvF3OQQc.js',
					'_app/immutable/chunks/7LWAmKDU.js',
					'_app/immutable/chunks/DYloJB2f.js',
					'_app/immutable/chunks/CNAEEddD.js',
					'_app/immutable/chunks/Bx2UGga_.js',
					'_app/immutable/chunks/CHDAeHIy.js',
					'_app/immutable/chunks/jdFFtPkc.js'
				],
				stylesheets: [],
				fonts: [],
				uses_env_dynamic_public: false
			},
			nodes: [
				__memo(() => import('./nodes/0.js')),
				__memo(() => import('./nodes/1.js')),
				__memo(() => import('./nodes/2.js')),
				__memo(() => import('./nodes/3.js')),
				__memo(() => import('./nodes/4.js')),
				__memo(() => import('./nodes/5.js'))
			],
			routes: [
				{
					id: '/',
					pattern: /^\/$/,
					params: [],
					page: { layouts: [0], errors: [1], leaf: 2 },
					endpoint: null
				},
				{
					id: '/about',
					pattern: /^\/about\/?$/,
					params: [],
					page: { layouts: [0], errors: [1], leaf: 3 },
					endpoint: null
				},
				{
					id: '/demo',
					pattern: /^\/demo\/?$/,
					params: [],
					page: { layouts: [0], errors: [1], leaf: 4 },
					endpoint: null
				},
				{
					id: '/guides',
					pattern: /^\/guides\/?$/,
					params: [],
					page: { layouts: [0], errors: [1], leaf: 5 },
					endpoint: null
				}
			],
			prerendered_routes: new Set([]),
			matchers: async () => {
				return {};
			},
			server_assets: {}
		}
	};
})();
