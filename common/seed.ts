import { BulkInsert } from '@triplit/client';
import { schema } from './triplit/schema';

export default function seed(): BulkInsert<typeof schema> {
	return {
		profiles: [{ id: 'user1', username: 'nathanielarking' }],
		accounts: [
			{
				profileId: 'user1',
				/** Password is 'password'. */
				passwordHash: '$argon2i$v=19$m=16,t=2,p=1$MTIzNDU2Nzg5$e7G/IEd63Q/ZrZIiW6FUow',
				verifiedEmail: 'nathanielarking@gmail.com',
				passwordResetToken: null
			}
		],
		gardens: [
			{
				id: 'garden1',
				name: "Nathaniel's Garden.",
				visibility: 'PUBLIC',
				description: 'This is the default seeded garden.',
				creatorId: 'user1',
				adminIds: new Set('user1')
			}
		],
		gardenMemberships: [
			{
				gardenId: 'garden1',
				userId: 'user1',
				inviterId: null,
				status: 'ACCEPTED',
				acceptedAt: new Date()
			}
		]
	};
}
