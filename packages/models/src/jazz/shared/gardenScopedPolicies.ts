import { type PolicyContext, type RowRefValue, anyOf } from 'jazz-tools';

import type { JazzApp } from '../schema.js';

type GardenScopedPolicyContext = Pick<PolicyContext<JazzApp>, 'policy' | 'session'>;
type GardenScopedRow = { gardenId: RowRefValue };

/**
 * Most domain tables are scoped to a garden through a `gardenId` ref and
 * follow the same visibility/membership rules the garden itself uses:
 * readable if the garden is not HIDDEN or the caller is any kind of
 * member, writable by admins and editors only. These builders cover that
 * shared shape so each domain's permissions file only states where it
 * differs (e.g. planting areas and workspaces restrict writes to admins).
 */
export function gardenReadable({ policy, session }: GardenScopedPolicyContext) {
	return (row: GardenScopedRow) =>
		anyOf([
			policy.gardens.exists.where({ id: row.gardenId, visibility: { ne: 'HIDDEN' } }),
			policy.gardens.exists.where({
				id: row.gardenId,
				adminIds: { contains: session.user.account }
			}),
			policy.gardens.exists.where({
				id: row.gardenId,
				editorIds: { contains: session.user.account }
			}),
			policy.gardens.exists.where({
				id: row.gardenId,
				viewerIds: { contains: session.user.account }
			})
		]);
}

export function gardenAdminOrEditor({ policy, session }: GardenScopedPolicyContext) {
	return (row: GardenScopedRow) =>
		anyOf([
			policy.gardens.exists.where({
				id: row.gardenId,
				adminIds: { contains: session.user.account }
			}),
			policy.gardens.exists.where({
				id: row.gardenId,
				editorIds: { contains: session.user.account }
			})
		]);
}

export function gardenAdminOnly({ policy, session }: GardenScopedPolicyContext) {
	return (row: GardenScopedRow) =>
		policy.gardens.exists.where({
			id: row.gardenId,
			adminIds: { contains: session.user.account }
		});
}
