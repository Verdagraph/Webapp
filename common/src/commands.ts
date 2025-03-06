import { type } from 'arktype';

export const commonFields = {
	name: type('string.trim & /^[a-zA-Z0-9 _-]*$/')
		.to('3 <= string <= 50')
		.describe(
			'between 3 and 50 characters and contain only letters, numbers, spaces, underscores, or hyphens'
		),
	description: type('string <= 1400').describe('at most 1400 characters')
};
