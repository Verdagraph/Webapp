import { type TableRow, schema as s } from 'jazz-tools';

import { CultivarCollectionVisibilityEnumOptions } from '../../cultivars/schema.js';

export { CultivarCollectionVisibilityEnumOptions };

/**
 * Untyped for now: the 5 nested attribute profiles (annualLifeCycle, color,
 * frostDatePlantingWindows, expectedGeometry, origin) aren't ported to Jazz
 * yet, and nothing currently reads through this field's typed shape (the
 * Triplit controller only ever passes it through as opaque data).
 */
export type JazzCultivarAttributes = Record<string, unknown>;

export const cultivarSchema = {
	/** Collection schema. */
	cultivarCollections: s.table({
		/** Non-unique name of the collection. */
		name: s.string(),
		/** Unique URL slug. */
		slug: s.string(),
		/** Visibility of the collection. */
		visibility: s.enum(...CultivarCollectionVisibilityEnumOptions),
		/** If defined, the collection is owned by a user. */
		userId: s.ref('users').optional(),
		/** If defined, the collection is owned by a garden. Overrides user ownership. */
		gardenId: s.ref('gardens').optional(),
		/** Optional priority flag used to decide between collections in a garden. */
		priority: s.float().default(0),
		/** Optional description. */
		description: s.string().default(''),
		/** Optional parent collection to derive attributes from. */
		parentId: s.ref('cultivarCollections').optional(),
		/**
		 * Optional list of ancestor IDs (parent and their parent, up to a
		 * fixed depth). Denormalized data maintained by the controller.
		 */
		ancestorIds: s.array(s.string()).default([])
	}),
	/** Cultivar schema. */
	cultivars: s.table({
		/** Collection the cultivar is in. */
		collectionId: s.ref('cultivarCollections'),
		/**
		 * Denormalized from `collectionId`'s garden, maintained by the
		 * controller at insert time. Jazz's server-side policy compiler
		 * doesn't support a 2-hop qualified exists check (cultivars ->
		 * collection -> garden.adminIds) even though it typechecks and
		 * validates locally; this keeps the permission check a single hop,
		 * matching the pattern used everywhere else. Undefined for
		 * user-owned (non-garden) collections.
		 */
		gardenId: s.ref('gardens').optional(),
		/** A common name. Used to match plants to cultivars. */
		name: s.string(),
		/** Shorthand. */
		abbreviation: s.string(),
		/** Optional scientific name. */
		scientificName: s.string().optional(),
		/** Optional description. */
		description: s.string().default(''),
		/** Optional parent cultivar to derive attributes from. */
		parentId: s.ref('cultivars').optional(),
		/** Attributes which define this cultivar. Untyped, see JazzCultivarAttributes. */
		attributes: s.json().optional(),
		/**
		 * Needed to pick the newest of several same-named cultivars in
		 * `resolveCultivarName`; Jazz's built-in `$createdAt` provenance
		 * column isn't exposed on plain query results, only usable within
		 * queries/ordering/permissions themselves.
		 */
		createdAt: s.timestamp()
	})
};

export type JazzCultivarCollection = TableRow<
	typeof cultivarSchema,
	'cultivarCollections'
>;
export type JazzCultivar = TableRow<typeof cultivarSchema, 'cultivars'>;
