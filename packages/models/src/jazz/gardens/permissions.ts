import { type PolicyContext, type RowRefValue, anyOf, schema as s } from 'jazz-tools';

import type { JazzApp } from '../schema.js';

type GardenPolicyContext = PolicyContext<JazzApp>;

/** Combines this domain's per-table policy builders into one compiled set. */
export function constructGardenPermissions(app: JazzApp) {
	return s.definePermissions(app, (ctx) => {
		constructGardensPolicy(ctx);
		constructGardenMembershipsPolicy(ctx);
	});
}

function constructGardensPolicy({ policy, session }: GardenPolicyContext) {
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
}

function constructGardenMembershipsPolicy({ policy, session }: GardenPolicyContext) {
	/** Readable by garden members, writable by admins only. */
	const isGardenAdmin = (membership: { gardenId: RowRefValue }) =>
		policy.gardens.exists.where({
			id: membership.gardenId,
			adminIds: { contains: session.user.account }
		});

	policy.gardenMemberships.allowRead.where((membership) =>
		anyOf([
			isGardenAdmin(membership),
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
	policy.gardenMemberships.allowInsert.where(isGardenAdmin);
	policy.gardenMemberships.allowUpdate.where(isGardenAdmin);
	policy.gardenMemberships.allowDelete.where(isGardenAdmin);
}
