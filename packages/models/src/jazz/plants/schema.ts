import { type TableRow, schema as s } from 'jazz-tools';

import { OriginEnumOptions } from '../../plants/schema.js';

export { OriginEnumOptions };

/** Untyped for now, same tradeoff as cultivars' attributes field. */
export type JazzCultivarAttributesOverride = Record<string, unknown>;

export const plantSchema = {
	/** Lifespan schema. */
	lifespans: s.table({
		/** Garden the entity is located within, required for access control. */
		gardenId: s.ref('gardens'),
		/** The origin of the lifespan. */
		origin: s.enum(...OriginEnumOptions),
		/** The geometries of the lifespan. */
		geometryHistoryId: s.ref('geometryHistories').optional(),
		/** The locations of the lifespan. */
		locationHistoryId: s.ref('locationHistories').optional()
	}),
	/** Plant schema. */
	plants: s.table({
		/** Garden the entity is located within, required for access control. */
		gardenId: s.ref('gardens'),
		/**
		 * The name correlating with one of the common names specified by a
		 * cultivar. Will match the plant with a cultivar in one of the
		 * garden's cultivar collections.
		 */
		cultivarName: s.string(),
		/** A set of cultivar attributes to override those from the collections. Untyped, see JazzCultivarAttributesOverride. */
		cultivarAttributes: s.json().optional(),
		/** Lifespan attributes populated from the expected attributes based on the cultivar. */
		expectedLifespanId: s.ref('lifespans'),
		/** Lifespan attributes populated by observations of users. */
		recordedLifespanId: s.ref('lifespans'),
		/**
		 * Range of dates which encapsulates all dates applicable to this
		 * plant. Denormalized, must be updated alongside plant lifespan
		 * updates, to avoid relying on complex query logic for what time
		 * range a plant exists in.
		 */
		beginDate: s.timestamp(),
		endDate: s.timestamp(),
		/** The number of distinct plants which are managed together in this plant instance. */
		quantity: s.float().default(1),
		/**
		 * The DraftBucket this plant is staged in, if any. While set to a
		 * bucket whose `committed` is false, this plant is excluded from
		 * official reads of the garden's plants (see DraftBucket).
		 */
		draftBucketId: s.ref('draftBuckets').optional()
	}),
	/** Plant groups. */
	plantGroups: s.table({
		/** Garden the entity is located within, required for access control. */
		gardenId: s.ref('gardens'),
		/** Name. */
		name: s.string(),
		/** A set of plants contained with the group. */
		plantIds: s.array(s.string()).default([]),
		/** Optional description. */
		description: s.string().default('')
	}),
	/** Draft buckets. */
	draftBuckets: s.table({
		/** Garden the entity is located within, required for access control. */
		gardenId: s.ref('gardens'),
		/** Name. */
		name: s.string(),
		/** The user who started this plan. Undefined if that user has since left the garden. */
		creatorId: s.ref('users').optional(),
		/**
		 * Whether this plan has been accepted. Starts false; once true,
		 * this bucket's plants stop being excluded from official reads of
		 * the garden's plants.
		 */
		committed: s.boolean().default(false)
	})
};

export type JazzOrigin = (typeof OriginEnumOptions)[number];
export type JazzLifespan = TableRow<typeof plantSchema, 'lifespans'>;
export type JazzPlant = TableRow<typeof plantSchema, 'plants'>;
export type JazzPlantGroup = TableRow<typeof plantSchema, 'plantGroups'>;
export type JazzDraftBucket = TableRow<typeof plantSchema, 'draftBuckets'>;
