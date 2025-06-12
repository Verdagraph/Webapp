import type { User } from '@vdg-webapp/models';

export const user: User = {
	account: {
		id: 'defaultUserAccount',
		profileId: 'defaultUser',
		passwordHash: 'password',
		unverifiedEmail: {},
		isActive: true
	},
	profile: { id: 'defaultUser', username: 'Demo User', createdAt: new Date() }
};
