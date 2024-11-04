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
	() => import('./nodes/10')
];

export const server_loads = [0];

export const dictionary = {
		"/(static)": [3,[2]],
		"/(static)/guides": [4,[2]],
		"/(static)/login": [5,[2]],
		"/(static)/login/request-password-reset": [6,[2]],
		"/(static)/login/reset-password/[userId]/[confirmationKey]": [7,[2]],
		"/(static)/register": [8,[2]],
		"/(static)/register/request-email-verification": [9,[2]],
		"/(static)/register/verify/[confirmationKey]": [10,[2]]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.js';