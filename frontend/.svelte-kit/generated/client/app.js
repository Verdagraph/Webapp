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
	() => import('./nodes/30'),
	() => import('./nodes/31'),
	() => import('./nodes/32'),
	() => import('./nodes/33'),
	() => import('./nodes/34')
];

export const server_loads = [0];

export const dictionary = {
		"/(static)": [27,[5]],
		"/(app)/app": [6,[2]],
		"/(app)/app/(other)/account": [7,[2]],
		"/(app)/app/gardens": [10,[2]],
		"/(app)/app/gardens/create": [21,[2]],
		"/(app)/app/gardens/discover": [22,[2]],
		"/(app)/app/gardens/[gardenId]": [11,[2,3]],
		"/(app)/app/gardens/[gardenId]/(config)/cultivars": [12,[2,3]],
		"/(app)/app/gardens/[gardenId]/(garden)/edit": [16,[2,3]],
		"/(app)/app/gardens/[gardenId]/(garden)/members": [17,[2,3]],
		"/(app)/app/gardens/[gardenId]/(garden)/metrics": [18,[2,3]],
		"/(app)/app/gardens/[gardenId]/(planner)/verdagraph": [19,[2,3]],
		"/(app)/app/gardens/[gardenId]/(planner)/workbook": [20,[2,3]],
		"/(app)/app/gardens/[gardenId]/(config)/workspaces": [13,[2,3,4]],
		"/(app)/app/gardens/[gardenId]/(config)/workspaces/create": [15,[2,3,4]],
		"/(app)/app/gardens/[gardenId]/(config)/workspaces/[workspaceSlug]": [14,[2,3,4]],
		"/(app)/app/(other)/notifications": [8,[2]],
		"/(app)/app/(other)/settings": [9,[2]],
		"/(app)/app/traits": [23,[2]],
		"/(app)/app/traits/cultivars": [24,[2]],
		"/(app)/app/traits/environments": [25,[2]],
		"/(app)/app/traits/workspaces": [26,[2]],
		"/(static)/guides": [28,[5]],
		"/(static)/login": [29,[5]],
		"/(static)/login/request-password-reset": [30,[5]],
		"/(static)/login/reset-password/[userId]/[confirmationToken]": [31,[5]],
		"/(static)/register": [32,[5]],
		"/(static)/register/request-email-verification": [33,[5]],
		"/(static)/register/verify/[confirmationToken]": [34,[5]]
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