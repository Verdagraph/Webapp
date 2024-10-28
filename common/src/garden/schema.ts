import { Schema as S, ClientSchema, Entity } from '@triplit/client';

/**
 * Controls the visibility of the garden.
 * HIDDEN: the garden is visible only to those who are members.
 * UNLISTED: the garden is visibile to anyone but is not listed
 *     on any public page - a link is required.
 * PUBLIC: the garden is visible to anyone and may be searchable.
 */
export const GardenVisibilityEnum = ['HIDDEN', 'UNLISTED', 'PUBLIC'] as const;

/**
 * Controls the level of access of a garden membership.
 * ADMIN: all actions are supported.
 * EDITOR: routine changes in model state are supported, such as adding plant models,
 *     while configuration changes such as garden attributes are not.
 * VIEWER: Read-only access.
 */
export const GardenMembershipRoleEnum = ['ADMIN', 'EDITOR', 'VIEWER'] as const;

/**
 * Indicates the acceptance status of a garden membership.
 * CREATED: the invite has been created but no notification has been sent.
 * PENDING: a notification has been sent and is pending acceptance.
 * ACCEPTED: the membership has been accepted.
 */
export const GardenMembershipStatusEnum = ['CREATED', 'PENDING', 'ACCEPTED'] as const;

export const gardenSchema = {
	/** Garden schema. */
	gardens: {
		schema: S.Schema({
			id: S.Id(),

			/** Non-unique name of the garden. */
			name: S.String(),

			/** URL-friendly shorthand - unique. */
			key: S.String(),

			/** Controls which non-users may view the garden. */
			visibility: S.String({ enum: GardenVisibilityEnum }),

			/** Optional description. */
			description: S.Optional(S.String()),

			/** Set to false for inactive gardens. */
			isActive: S.Boolean({ default: true }),

			/**
			 * User who created the garden.
			 * Note that the creator has access through an admin membership.
			 * If undefined, the original creator has left the garden.
			 */
			creatorId: S.Optional(S.String()),
			creator: S.Optional(
				S.RelationOne('users', {
					where: [['id', '=', 'creatorId']]
				})
			),

			/** Set of users which have admin access. */
			adminIds: S.Set(S.String()),
			adminMemberships: S.RelationMany('gardenMemberships', {
				where: [['userId', 'in', '$adminIds']]
			}),

			/** Set of users which have editing access. */
			editorIds: S.Set(S.String()),
			editorMemberships: S.RelationMany('gardenMemberships', {
				where: [['userId', 'in', '$adminIds']]
			}),

			/** Set of users which have viewing access. */
			viewerIds: S.Set(S.String()),
			viewerMemberships: S.RelationMany('gardenMemberships', {
				where: [['userId', 'in', '$adminIds']]
			}),

			/** Date of garden creation. */
			createdAt: S.Date({ default: S.Default.now() })
		}),
		permissions: {
			user: {}
		}
	},

	/** Garden membership schema. */
	gardenMemberships: {
		schema: S.Schema({
			id: S.Id(),

			/** User who is the subject of the membership. */
			userId: S.String(),
			user: S.RelationOne('users', { where: [['id', '=', '$userId']] }),

			/** User who created the membership. */
			inviterId: S.Optional(S.String()),
			inviter: S.Optional(
				S.RelationOne('users', { where: [['id', '=', '$inviterId']] })
			),

			/** The role the membership grants access to. */
			role: S.String({ enum: GardenMembershipRoleEnum }),

			/** The acceptance status and acceptance date of the membership. */
			status: S.String({ enum: GardenMembershipStatusEnum }),
			acceptedAt: S.Date(),

			/** Allows marking gardens as favorites in the menu. */
			favorite: S.Boolean()
		}),
		permissions: {
			user: {}
		}
	}
} satisfies ClientSchema;
export type Garden = Entity<typeof gardenSchema, 'gardens'>;
export type GardenMembership = Entity<typeof gardenSchema, 'gardenMemberships'>;
