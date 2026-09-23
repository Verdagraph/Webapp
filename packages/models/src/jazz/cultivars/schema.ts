import { type TableRow, schema as s } from 'jazz-tools';
import { type z } from 'zod';

import { type CultivarAttributesUpdateCommandSchema } from '../../cultivars/attributes/index.js';
import { CultivarCollectionVisibilityEnumOptions } from '../../cultivars/schema.js';

export { CultivarCollectionVisibilityEnumOptions };

/**
 * `s.json(CultivarAttributesUpdateCommandSchema)` would type this at the
 * schema level too, but jazz-tools's json() overload requires a Standard
 * Schema feature (`~standard.jsonSchema`) this project's zod version
 * doesn't implement - typed here instead via a TableRow override, the same
 * pattern used for JazzEnvironment.
 */
export type JazzCultivarAttributes = z.infer<
	typeof CultivarAttributesUpdateCommandSchema
>;

export const cultivarSchema = {
	/** Collection schema. */
	cultivarCollections: s.table({
		/** Non-unique name of the collection. */
		name: s.string(),
		/** Unique URL slug. */
		slug: s.string(),
		/** Visibility of the collection. */
		visibility: s.enum(...CultivarCollectionVisibilityEnumOptions),
		/**
		 * If non-empty, the collection is owned by a user (always exactly
		 * one - an array rather than a single optional ref so the
		 * ownership check can use `contains`, matching the garden-admin
		 * check it's combined with via anyOf(): an alpha bug rejects
		 * combining a `contains` condition with a non-`contains` condition
		 * in the same anyOf/OR group (see SPIKE_NOTES.md) - keeping both
		 * sides as `contains` checks avoids it.
		 */
		ownerIds: s.array(s.ref('users')).default([]),
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
		/**
		 * Attributes which define this cultivar. Untyped at the schema
		 * level, see JazzCultivarAttributes. `.default({})` rather than
		 * `.optional()`: an alpha bug rejects any explicit value written to
		 * an `.optional()` json column (see SPIKE_NOTES.md) - `.default({})`
		 * writes and reads correctly.
		 */
		attributes: s.json().default({}),
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
export type JazzCultivar = Omit<
	TableRow<typeof cultivarSchema, 'cultivars'>,
	'attributes'
> & {
	attributes?: JazzCultivarAttributes;
};
