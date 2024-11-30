import { Schema as S, ClientSchema, Entity, or } from '@triplit/client';

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
			/** URL-friendly shorthand - unique. */
			id: S.Id(),

			/** Non-unique name of the garden. */
			name: S.String(),

			/** Controls which non-users may view the garden. */
			visibility: S.String({ enum: GardenVisibilityEnum }),

			/** Optional description. */
			description: S.String({ nullable: true, default: null }),

			/** Set to false for inactive gardens. */
			isActive: S.Boolean({ default: true }),

			/**
			 * User who created the garden.
			 * Note that the creator has access through an admin membership.
			 * If undefined, the original creator has left the garden.
			 */
			creatorId: S.String({ nullable: true }),
			creator: S.RelationOne('profiles', {
				where: [['id', '=', 'creatorId']]
			}),

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
			anon: {
				read: {
					/** Allow anonymous reads if the garden is public. */
					filter: [['visibility', '!=', 'HIDDEN']]
				}
			},
			user: {
				read: {
					/** Allow reads if the garden is public or the user is a member. */
					filter: [
						or([
							['visibility', '!=', 'HIDDEN'],
							['$role.userId', 'in', 'adminIds'],
							['$role.userId', 'in', 'editorIds'],
							['$role.userId', 'in', 'viewerIds']
						])
					]
				},
				insert: {
					/** Allow new gardens to be created by creators. */
					filter: [['creatorId', '=', '$role.userId']]
				},
				update: {
					/** Restrict edit access to admins. */
					filter: [['$role.userId', 'in', 'adminIds']]
				}
			}
		}
	},

	/** Garden membership schema. */
	gardenMemberships: {
		schema: S.Schema({
			id: S.Id(),

			/** Garden the membership is in. */
			gardenId: S.String(),
			garden: S.RelationById('gardens', '$gardenId'),

			/** User who is the subject of the membership. */
			userId: S.String(),
			user: S.RelationOne('profiles', { where: [['id', '=', '$userId']] }),

			/** Role of the membership. */
			role: S.String({ enum: GardenMembershipRoleEnum }),

			/** User who created the membership. */
			inviterId: S.String({ nullable: true }),
			inviter: S.RelationOne('profiles', { where: [['id', '=', '$inviterId']] }),

			/** The acceptance status and acceptance date of the membership. */
			status: S.String({ enum: GardenMembershipStatusEnum }),
			acceptedAt: S.Date({ nullable: true, default: null }),

			/** Allows marking gardens as favorites in the menu. */
			favorite: S.Boolean({ default: false })
		}),
		permissions: {
			anon: {
				read: {
					/** Allow anonymous reads if the garden is public. */
					filter: [['garden.visibility', '!=', 'HIDDEN']]
				}
			},
			user: {
				read: {
					/** Allow reads if the garden is public or the user is a member. */
					filter: [
						or([
							['garden.visibility', '!=', 'HIDDEN'],
							['$role.userId', 'in', 'garden.adminIds'],
							['$role.userId', 'in', 'garden.editorIds'],
							['$role.userId', 'in', 'garden.viewerIds']
						])
					]
				},
				insert: {
					/** Allow new memberships to be created by admins. */
					filter: [['$role.userId', 'in', 'garden.adminIds']]
				},
				update: {
					/** Restrict membership updates to admins and subjects. */
					filter: [
						or([
							['$role.userId', 'in', 'garden.adminIds'],
							['userId', '=', '$role.userId']
						])
					]
				},
				delete: {
					/** Allow the membership to be revoked by an admin or deleted by the subject. */
					filter: [
						or([
							['$role.userId', 'in', 'garden.adminIds'],
							['userId', '=', '$role.userId']
						])
					]
				}
			}
		}
	}
} satisfies ClientSchema;
export type Garden = Entity<typeof gardenSchema, 'gardens'>;
export type GardenMembership = Entity<typeof gardenSchema, 'gardenMemberships'>;
