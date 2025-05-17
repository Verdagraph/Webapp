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
		client: {start:"_app/immutable/entry/start.DKZ5jE24.js",app:"_app/immutable/entry/app.k2XWZ-ZF.js",imports:["_app/immutable/entry/start.DKZ5jE24.js","_app/immutable/chunks/Cqi9girw.js","_app/immutable/chunks/Cfcy5gmN.js","_app/immutable/chunks/DHe4-ApK.js","_app/immutable/chunks/DSDviygy.js","_app/immutable/entry/app.k2XWZ-ZF.js","_app/immutable/chunks/DHe4-ApK.js","_app/immutable/chunks/DyNanOjA.js","_app/immutable/chunks/D7mGbQuf.js","_app/immutable/chunks/BWEqFMly.js","_app/immutable/chunks/BLh5GmnI.js","_app/immutable/chunks/B_kr4MhJ.js","_app/immutable/chunks/DSDviygy.js","_app/immutable/chunks/kXQwtSo-.js","_app/immutable/chunks/DyPfmwiR.js","_app/immutable/chunks/Cfcy5gmN.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js')),
			__memo(() => import('./nodes/16.js')),
			__memo(() => import('./nodes/17.js')),
			__memo(() => import('./nodes/18.js')),
			__memo(() => import('./nodes/19.js')),
			__memo(() => import('./nodes/20.js')),
			__memo(() => import('./nodes/21.js')),
			__memo(() => import('./nodes/22.js')),
			__memo(() => import('./nodes/23.js')),
			__memo(() => import('./nodes/24.js')),
			__memo(() => import('./nodes/25.js')),
			__memo(() => import('./nodes/26.js')),
			__memo(() => import('./nodes/27.js')),
			__memo(() => import('./nodes/28.js')),
			__memo(() => import('./nodes/29.js')),
			__memo(() => import('./nodes/30.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/(other)/account",
				pattern: /^\/account\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/gardens",
				pattern: /^\/gardens\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/gardens/create",
				pattern: /^\/gardens\/create\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/gardens/discover",
				pattern: /^\/gardens\/discover\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/gardens/[gardenId]",
				pattern: /^\/gardens\/([^/]+?)\/?$/,
				params: [{"name":"gardenId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/gardens/[gardenId]/(config)/cultivars",
				pattern: /^\/gardens\/([^/]+?)\/cultivars\/?$/,
				params: [{"name":"gardenId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/gardens/[gardenId]/(garden)/edit",
				pattern: /^\/gardens\/([^/]+?)\/edit\/?$/,
				params: [{"name":"gardenId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/gardens/[gardenId]/(garden)/members",
				pattern: /^\/gardens\/([^/]+?)\/members\/?$/,
				params: [{"name":"gardenId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/gardens/[gardenId]/(garden)/metrics",
				pattern: /^\/gardens\/([^/]+?)\/metrics\/?$/,
				params: [{"name":"gardenId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/gardens/[gardenId]/(planner)/verdagraph",
				pattern: /^\/gardens\/([^/]+?)\/verdagraph\/?$/,
				params: [{"name":"gardenId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/gardens/[gardenId]/(planner)/workbook",
				pattern: /^\/gardens\/([^/]+?)\/workbook\/?$/,
				params: [{"name":"gardenId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/gardens/[gardenId]/(config)/workspaces",
				pattern: /^\/gardens\/([^/]+?)\/workspaces\/?$/,
				params: [{"name":"gardenId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/gardens/[gardenId]/(config)/workspaces/create",
				pattern: /^\/gardens\/([^/]+?)\/workspaces\/create\/?$/,
				params: [{"name":"gardenId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/gardens/[gardenId]/(config)/workspaces/[workspaceSlug]",
				pattern: /^\/gardens\/([^/]+?)\/workspaces\/([^/]+?)\/?$/,
				params: [{"name":"gardenId","optional":false,"rest":false,"chained":false},{"name":"workspaceSlug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/login/request-password-reset",
				pattern: /^\/login\/request-password-reset\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/login/reset-password/[userId]/[confirmationToken]",
				pattern: /^\/login\/reset-password\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"userId","optional":false,"rest":false,"chained":false},{"name":"confirmationToken","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/(other)/notifications",
				pattern: /^\/notifications\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/register/request-email-verification",
				pattern: /^\/register\/request-email-verification\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/register/verify/[confirmationToken]",
				pattern: /^\/register\/verify\/([^/]+?)\/?$/,
				params: [{"name":"confirmationToken","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/(other)/settings",
				pattern: /^\/settings\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/traits",
				pattern: /^\/traits\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/traits/cultivars",
				pattern: /^\/traits\/cultivars\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/traits/environments",
				pattern: /^\/traits\/environments\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 29 },
				endpoint: null
			},
			{
				id: "/traits/workspaces",
				pattern: /^\/traits\/workspaces\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 30 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
