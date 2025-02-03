import { CultivarAttributes } from '../cultivars/attributes';
import { Schema as S, ClientSchema, Entity, or } from '@triplit/client';

/**
 *
 */
export const OriginEnum = [
	'DIRECT_SEED',
	'SEED_TO_TRANSPLANT',
	'SEEDLING_TO_TRANSPLANT'
] as const;

export const HarvestQualityEnum = [
	'COMPOST',
	'LOW',
	'MEDIUM',
	'HIGH',
	'PERFECT'
] as const;

export const plantSchema = {
	/** Harvest schema. */
	harvests: {
		schema: S.Schema({
			id: S.Id(),

			/** Garden the entity is located within - required for access control. */
			gardenId: S.String(),
			garden: S.RelationOne('gardens', { where: [['id', '=', '$gardenId']] }),

			/** The date of the harvest. */
			date: S.Date(),

			/** The mass of the harvest in kilograms. */
			mass: S.Optional(S.Number()),

			/**
			 * The number of units. This may differ in meaning depending on the plant.
			 * For example, for carrots, it could mean the number of roots.
			 * For lettuce, it could mean the number of leaves.
			 */
			units: S.Optional(S.Number()),

			/** The quality of the harvest. */
			quality: S.Optional(S.String({ enum: HarvestQualityEnum })),

			/** Optional description. */
			description: S.String({ default: '' })
		}),
		permissions: {
			anon: {
				read: {
					/** Allow anonymous reads if the garden is not hidden. */
					filter: [['garden.visibility', '!=', 'HIDDEN']]
				}
			},
			user: {
				read: {
					/** Allow reads if the garden is not hidden or the user is a member. */
					filter: [
						or([
							['garden.visibility', '!=', 'HIDDEN'],
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId'],
							['garden.viewerIds', 'has', '$role.profileId']
						])
					]
				},
				insert: {
					/** Allow new harvests to be created by admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				update: {
					/** Restrict harvest updates to admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				delete: {
					/** Restrict harvest deletes to admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				}
			}
		}
	},
	/** Lifespan schema. */
	lifespans: {
		schema: S.Schema({
			id: S.Id(),

			/** Garden the entity is located within - required for access control. */
			gardenId: S.String(),
			garden: S.RelationOne('gardens', { where: [['id', '=', '$gardenId']] }),

			/** The origin of the lifespan. */
			origin: S.String({ enum: OriginEnum }),

			/** The geometries of the lifespan. */
			geometryHistoryId: S.Optional(S.String()),
			geometriHistory: S.RelationOne('geometryHistories', {
				where: [['id', '=', '$geometryHistoryId']]
			}),

			/** The locations of the lifespan& */
			locationHistoryId: S.Optional(S.String()),
			locationHistory: S.RelationOne('locationHistories', {
				where: [['id', '=', '$locationHistoryId']]
			}),

			/** The dates of the lifespan. */
			dates: S.Record({
				/** The date at which the plant is seeded. */
				seedDate: S.Optional(S.Date()),
				/** The date at which the seed germinated. */
				germDate: S.Optional(S.Date()),
				/** The date at which the plant is removed from the space. */
				expiryDate: S.Optional(S.Date()),
				/**
				 * This is defined only for biennial or perennial plants.
				 * A set of dates which the plant became dormant until the following year.
				 * For example, includes the dates a berry bush has stopped producing fruit and vegetation.
				 */
				dormancyDates: S.Optional(S.Set(S.Date())),
				/**
				 * This is defined only for biennial or perennial plants.
				 * A set of dates which the plant exited dormancy for the year.
				 * For example, includes the dates a berry bush has begun vegetative growth again.
				 */
				growthDates: S.Optional(S.Set(S.Date()))
			}),

			/** A set of harvests over the lifespan. */
			harvestIds: S.Set(S.String()),
			harvests: S.RelationMany('harvests', { where: [['id', 'in', '$harvestIds']] })
		}),
		permissions: {
			anon: {
				read: {
					/** Allow anonymous reads if the garden is not hidden. */
					filter: [['garden.visibility', '!=', 'HIDDEN']]
				}
			},
			user: {
				read: {
					/** Allow reads if the garden is not hidden or the user is a member. */
					filter: [
						or([
							['garden.visibility', '!=', 'HIDDEN'],
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId'],
							['garden.viewerIds', 'has', '$role.profileId']
						])
					]
				},
				insert: {
					/** Allow new lifespans to be created by admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				update: {
					/** Restrict lifespans updates to admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				delete: {
					/** Restrict lifespans deletes to admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				}
			}
		}
	},
	/** Plant schema. */
	plants: {
		schema: S.Schema({
			id: S.Id(),

			/** Garden the entity is located within - required for access control. */
			gardenId: S.String(),
			garden: S.RelationOne('gardens', { where: [['id', '=', '$gardenId']] }),

			/**
			 * The name correlating with one of the common names specified by a cultivar.
			 * Will match the plant with a cultivar in one of the garden's cultivar collections.
			 */
			cultivarName: S.String(),

			/** A set of cultivar attributes to override those from the collections. */
			cultivarAttributes: CultivarAttributes,

			/** Lifespan attributes populated from the expected attributes based on the cultivar. */
			expectedLifespanId: S.String(),
			expectedLifespan: S.RelationOne('lifespans', {
				where: [['id', '=', '$expectedLifespanId']]
			}),

			/** Lifespan attributes populated by observations of users. */
			recordedLifespanId: S.String(),
			recordedLifespan: S.RelationOne('lifespans', {
				where: [['id', '=', '$recordedLifespanId']]
			}),

			/** If true, this plant entity represents multiple distinct plants which are managed together. */
			aggregate: S.Boolean({ default: false })
		}),
		permissions: {
			anon: {
				read: {
					/** Allow anonymous reads if the garden is not hidden. */
					filter: [['garden.visibility', '!=', 'HIDDEN']]
				}
			},
			user: {
				read: {
					/** Allow reads if the garden is not hidden or the user is a member. */
					filter: [
						or([
							['garden.visibility', '!=', 'HIDDEN'],
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId'],
							['garden.viewerIds', 'has', '$role.profileId']
						])
					]
				},
				insert: {
					/** Allow new location history to be created by admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				update: {
					/** Restrict location history updates to admins. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				delete: {
					/** Restrict location histories deletes to admins. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				}
			}
		}
	},
	/** Plant groups. */
	plantGroups: {
		schema: S.Schema({
			id: S.Id(),

			/** Garden the entity is located within - required for access control. */
			gardenId: S.String(),
			garden: S.RelationOne('gardens', { where: [['id', '=', '$gardenId']] }),

			/** Name. */
			name: S.String(),

			/** A set of plants contained with the group. */
			plantIds: S.Set(S.String()),
			plants: S.RelationMany('plants', { where: [['id', 'in', '$plantIds']] }),

			/** Optional description. */
			description: S.String({ default: '' })
		}),
		permissions: {
			anon: {
				read: {
					/** Allow anonymous reads if the garden is not hidden. */
					filter: [['garden.visibility', '!=', 'HIDDEN']]
				}
			},
			user: {
				read: {
					/** Allow reads if the garden is not hidden or the user is a member. */
					filter: [
						or([
							['garden.visibility', '!=', 'HIDDEN'],
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId'],
							['garden.viewerIds', 'has', '$role.profileId']
						])
					]
				},
				insert: {
					/** Allow new location history to be created by admins and editors. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				update: {
					/** Restrict location history updates to admins. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				},
				delete: {
					/** Restrict location histories deletes to admins. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['garden.editorIds', 'has', '$role.profileId']
						])
					]
				}
			}
		}
	}
} satisfies ClientSchema;

export type Harvest = Entity<typeof plantSchema, 'harvests'>;
export type Lifespan = Entity<typeof plantSchema, 'lifespans'>;
export type Plant = Entity<typeof plantSchema, 'plants'>;
export type PlantGroup = Entity<typeof plantSchema, 'plantGroups'>;
