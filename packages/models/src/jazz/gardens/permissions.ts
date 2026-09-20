import { anyOf, schema as s } from 'jazz-tools';

import type { JazzApp } from '../schema.js';

export function constructGardenPermissions(app: JazzApp) {
	return s.definePermissions(app, ({ policy, session }) => {
		/* Gardens. */
		policy.gardens.allowRead.where(
			anyOf([
				{ visibility: { ne: 'HIDDEN' } },
				{ adminIds: { contains: session.user.account } },
				{ editorIds: { contains: session.user.account } },
				{ viewerIds: { contains: session.user.account } }
			])
		);
		policy.gardens.allowInsert.always();
		policy.gardens.allowUpdate.where({ adminIds: { contains: session.user.account } });
		policy.gardens.allowDelete.never();

		/* Garden memberships - readable by garden members, writable by admins only. */
		policy.gardenMemberships.allowRead.where((membership) =>
			anyOf([
				policy.gardens.exists.where({
					id: membership.gardenId,
					adminIds: { contains: session.user.account }
				}),
				policy.gardens.exists.where({
					id: membership.gardenId,
					editorIds: { contains: session.user.account }
				}),
				policy.gardens.exists.where({
					id: membership.gardenId,
					viewerIds: { contains: session.user.account }
				})
			])
		);
		policy.gardenMemberships.allowInsert.where((membership) =>
			policy.gardens.exists.where({
				id: membership.gardenId,
				adminIds: { contains: session.user.account }
			})
		);
		policy.gardenMemberships.allowUpdate.where((membership) =>
			policy.gardens.exists.where({
				id: membership.gardenId,
				adminIds: { contains: session.user.account }
			})
		);
		policy.gardenMemberships.allowDelete.where((membership) =>
			policy.gardens.exists.where({
				id: membership.gardenId,
				adminIds: { contains: session.user.account }
			})
		);
	});
}
