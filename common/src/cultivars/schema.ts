import { Schema as S, ClientSchema, Entity, or } from '@triplit/client';
import { CultivarAttributes } from './attributes';

/**
 * Controls the visibility of the collection.
 * HIDDEN: the collection is visible only to those who are members of the garden,
 * or only to the user if the collection is associated with a user.
 * UNLISTED: the collection is visibile to anyone but is not listed
 *     on any public page - a link is required.
 * PUBLIC: the collection is visible to anyone and may be searchable.
 */
export const CultivarCollectionVisibilityEnum = [
	'HIDDEN',
	'UNLISTED',
	'PUBLIC'
] as const;

export const cultivarSchema = {
	/** Collection schema. */
	cultivarCollections: {
		schema: S.Schema({
			/** URL-friendly shorthand - unique. */
			id: S.Id(),

			/** Non-unique name of the collection. */
			name: S.String(),

			/** Unique URL slug. */
			slug: S.String(),

			/** Visibility of the collection.  */
			visibility: S.String({ enum: CultivarCollectionVisibilityEnum }),

			/** If defined, the collection is owned by a user. */
			userId: S.String(),
			user: S.RelationOne('profiles', {
				where: [['id', '=', '$userId']]
			}),

			/** If defined, the colletcion is owned by a garden. Overrides user ownership. */
			gardenId: S.String(),
			garden: S.RelationOne('gardens', {
				where: [['id', '=', '$gardenId']]
			}),

			/** Optional description. */
			description: S.String({ nullable: true, default: null }),

			/** Optional parent collection to derive attributes from. */
			parentId: S.String(),
			parent: S.RelationOne('cultivarCollections', {
				where: [['id', '=', '$parentId']]
			})
		}),
		permissions: {
			anon: {
				read: {
					/** Allow anonymous reads if the collection is not hidden. */
					filter: [['visibility', '!=', 'HIDDEN']]
				}
			},
			user: {
				read: {
					/** Allow reads if the collection is not hidden,
					 *  the garden is defined and the user is a member,
					 *  or the user is defined and the user is the owner. */
					/*
					filter: [
						or([
							['visibility', '!=', 'HIDDEN'],
							['adminIds', 'has', '$role.profileId'],
							['editorIds', 'has', '$role.profileId'],
							['viewerIds', 'has', '$role.profileId']
						])
					]*/
				},
				insert: {
					/** Allow new collections to be created:
					 * if the garden is defined, the user must be an admin in the garden.
					 * Otherwise, the user can create their own collections.
					 */
					//filter: [['creatorId', '=', '$role.profileId']]
				},
				update: {
					/** Restrict edit access to admins. */
					//filter: [['adminIds', 'has', '$role.profileId']]
				}
			}
		}
	},

	/** Cultivar schema. */
	cultivars: {
		schema: S.Schema({
			id: S.Id(),

			/** Collection the cultivar is in. */
			collectionId: S.String(),
			collection: S.RelationById('cultivarCollections', '$collectionId'),

			/** A list of common names. Used to match plants to cultivars. */
			names: S.Set(S.String()),

			/** Shorthand. */
			abbreviation: S.String(),

			/** Optional scientific name. */
			scientificName: S.Optional(S.String()),

			/** Optional description. */
			description: S.Optional(S.String()),

			/** Optional parent cultivar to derive attributes from. */
			parentId: S.String(),
			parent: S.RelationOne('cultivars', {
				where: [['id', '=', '$parentId']]
			}),

			/** Attributes which define this cultivar. */
			attributes: CultivarAttributes
		}),
		permissions: {}
	}
} satisfies ClientSchema;
export type Cultivar = Entity<typeof cultivarSchema, 'cultivarCollections'>;
export type CultivarCollection = Entity<typeof cultivarSchema, 'cultivars'>;
