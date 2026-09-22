import { type PolicyContext, type RowRefValue, anyOf, schema as s } from 'jazz-tools';

import type { JazzApp } from '../schema.js';

type CultivarPolicyContext = PolicyContext<JazzApp>;

export function constructCultivarPermissions(app: JazzApp) {
	return s.definePermissions(app, (ctx) => {
		constructCultivarCollectionsPolicy(ctx);
		constructCultivarsPolicy(ctx);
	});
}

/**
 * A collection is owned either by a user directly, or by a garden (in
 * which case garden admins own it). Unlike most domains, ownership here
 * is not "any garden member", so this doesn't reuse the shared
 * garden-scoped policy helpers.
 */
export function constructCultivarCollectionsPolicy({
	policy,
	session
}: CultivarPolicyContext) {
	const isOwner = (collection: { userId: RowRefValue; gardenId: RowRefValue }) =>
		anyOf([
			{ userId: { eq: session.user.account } },
			policy.gardens.exists.where({
				id: collection.gardenId,
				adminIds: { contains: session.user.account }
			})
		]);

	policy.cultivarCollections.allowRead.where((collection) =>
		anyOf([
			{ visibility: { ne: 'HIDDEN' } },
			{ userId: { eq: session.user.account } },
			policy.gardens.exists.where({
				id: collection.gardenId,
				adminIds: { contains: session.user.account }
			}),
			policy.gardens.exists.where({
				id: collection.gardenId,
				editorIds: { contains: session.user.account }
			}),
			policy.gardens.exists.where({
				id: collection.gardenId,
				viewerIds: { contains: session.user.account }
			})
		])
	);
	policy.cultivarCollections.allowInsert.where(isOwner);
	policy.cultivarCollections.allowUpdate.where(isOwner);
	policy.cultivarCollections.allowDelete.where(isOwner);
}

/**
 * `cultivars.gardenId` is denormalized from its collection (see
 * schema.ts): Jazz's alpha policy compiler doesn't support the 2-hop
 * qualified check this would otherwise need (cultivars -> collection ->
 * garden.adminIds), so ownership checks go through the direct gardenId
 * (single hop, the same pattern every other domain uses) alongside a
 * direct collection.userId check for personally-owned collections.
 */
export function constructCultivarsPolicy({ policy, session }: CultivarPolicyContext) {
	const isCollectionOwner = (cultivar: { collectionId: RowRefValue }) =>
		policy.cultivarCollections.exists.where({
			id: cultivar.collectionId,
			userId: { eq: session.user.account }
		});

	const isGardenAdmin = (cultivar: { gardenId: RowRefValue }) =>
		policy.gardens.exists.where({
			id: cultivar.gardenId,
			adminIds: { contains: session.user.account }
		});

	policy.cultivars.allowRead.where((cultivar) =>
		anyOf([
			policy.cultivarCollections.exists.where({
				id: cultivar.collectionId,
				visibility: { ne: 'HIDDEN' }
			}),
			isCollectionOwner(cultivar),
			policy.gardens.exists.where({
				id: cultivar.gardenId,
				adminIds: { contains: session.user.account }
			}),
			policy.gardens.exists.where({
				id: cultivar.gardenId,
				editorIds: { contains: session.user.account }
			}),
			policy.gardens.exists.where({
				id: cultivar.gardenId,
				viewerIds: { contains: session.user.account }
			})
		])
	);
	policy.cultivars.allowInsert.where((cultivar) =>
		anyOf([isCollectionOwner(cultivar), isGardenAdmin(cultivar)])
	);
	policy.cultivars.allowUpdate.where((cultivar) =>
		anyOf([isCollectionOwner(cultivar), isGardenAdmin(cultivar)])
	);
	policy.cultivars.allowDelete.where((cultivar) =>
		anyOf([isCollectionOwner(cultivar), isGardenAdmin(cultivar)])
	);
}
