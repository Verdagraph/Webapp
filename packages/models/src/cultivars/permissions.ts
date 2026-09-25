import { type PolicyContext, type RowRefValue, anyOf, schema as s } from 'jazz-tools';

import type { AppSchema } from '../schema.js';

type CultivarPolicyContext = PolicyContext<AppSchema>;

export function constructCultivarPermissions(app: AppSchema) {
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
 *
 * Every anyOf() below keeps its branches consistently either all
 * `contains`-based or all non-`contains`-based, nesting a sub-anyOf where
 * both shapes are genuinely needed together: an alpha bug rejects
 * combining a `contains` condition with a non-`contains` condition in the
 * same anyOf/OR group (see SPIKE_NOTES.md) - nesting isolates each shape
 * into its own group.
 */
export function constructCultivarCollectionsPolicy({
	policy,
	session
}: CultivarPolicyContext) {
	const isOwner = (collection: { ownerIds: RowRefValue; gardenId: RowRefValue }) =>
		anyOf([
			{ ownerIds: { contains: session.user.account } },
			policy.gardens.exists.where({
				id: collection.gardenId,
				adminIds: { contains: session.user.account }
			})
		]);

	policy.cultivarCollections.allowRead.where((collection) =>
		anyOf([
			{ visibility: { ne: 'HIDDEN' } },
			anyOf([
				{ ownerIds: { contains: session.user.account } },
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
 * direct collection.ownerIds check for personally-owned collections.
 */
export function constructCultivarsPolicy({ policy, session }: CultivarPolicyContext) {
	const isCollectionOwner = (cultivar: { collectionId: RowRefValue }) =>
		policy.cultivarCollections.exists.where({
			id: cultivar.collectionId,
			ownerIds: { contains: session.user.account }
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
			anyOf([
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
