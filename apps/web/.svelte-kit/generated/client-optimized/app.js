export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26'),
	() => import('./nodes/27'),
	() => import('./nodes/28'),
	() => import('./nodes/29'),
	() => import('./nodes/30')
];

export const server_loads = [];

export const dictionary = {
		"/": [4],
		"/(other)/account": [5],
		"/gardens": [8],
		"/gardens/create": [19],
		"/gardens/discover": [20],
		"/gardens/[gardenId]": [9,[2]],
		"/gardens/[gardenId]/(config)/cultivars": [10,[2]],
		"/gardens/[gardenId]/(garden)/edit": [14,[2]],
		"/gardens/[gardenId]/(garden)/members": [15,[2]],
		"/gardens/[gardenId]/(garden)/metrics": [16,[2]],
		"/gardens/[gardenId]/(planner)/verdagraph": [17,[2]],
		"/gardens/[gardenId]/(planner)/workbook": [18,[2]],
		"/gardens/[gardenId]/(config)/workspaces": [11,[2,3]],
		"/gardens/[gardenId]/(config)/workspaces/create": [13,[2,3]],
		"/gardens/[gardenId]/(config)/workspaces/[workspaceSlug]": [12,[2,3]],
		"/login": [21],
		"/login/request-password-reset": [22],
		"/login/reset-password/[userId]/[confirmationToken]": [23],
		"/(other)/notifications": [6],
		"/register": [24],
		"/register/request-email-verification": [25],
		"/register/verify/[confirmationToken]": [26],
		"/(other)/settings": [7],
		"/traits": [27],
		"/traits/cultivars": [28],
		"/traits/environments": [29],
		"/traits/workspaces": [30]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';