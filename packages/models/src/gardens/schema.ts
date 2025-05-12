import { type Entity, Schema as S, or } from '@triplit/client';

import { userSchema } from '../users/schema.js';

/**
 * Controls the visibility of the garden.
 * HIDDEN: the garden is visible only to those who are members.
 * UNLISTED: the garden is visibile to anyone but is not listed
 *     on any public page - a link is required.
 * PUBLIC: the garden is visible to anyone and may be searchable.
 */
export const GardenVisibilityEnumOptions = ['HIDDEN', 'UNLISTED', 'PUBLIC'] as const;

/**
 * Controls the level of access of a garden membership.
 * ADMIN: all actions are supported.
 * EDITOR: routine changes in model state are supported, such as adding plant models,
 *     while configuration changes such as garden attributes are not.
 * VIEWER: Read-only access.
 */
export const GardenMembershipRoleEnumOptions = ['ADMIN', 'EDITOR', 'VIEWER'] as const;

/**
 * Indicates the acceptance status of a garden membership.
 * CREATED: the invite has been created but no notification has been sent.
 * PENDING: a notification has been sent and is pending acceptance.
 * ACCEPTED: the membership has been accepted.
 */
export const GardenMembershipStatusEnumOptions = [
	'CREATED',
	'PENDING',
	'ACCEPTED'
] as const;

export const gardenSchema = S.Collections({
	...userSchema,
	/** Garden schema. */
	gardens: {
		schema: S.Schema({
			/** URL-friendly shorthand - unique. */
			id: S.Id(),

			/** Non-unique name of the garden. */
			name: S.String(),

			/** Controls which non-users may view the garden. */
			visibility: S.String({ enum: [...GardenVisibilityEnumOptions] }),

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

			/** Set of users which have admin access. */
			adminIds: S.Set(S.String()),

			/** Set of users which have editing access. */
			editorIds: S.Set(S.String(), { default: S.Default.Set.empty() }),

			/** Set of users which have viewing access. */
			viewerIds: S.Set(S.String(), { default: S.Default.Set.empty() }),

			/** Date of garden creation. */
			createdAt: S.Date({ default: S.Default.now() })
		}),
		relationships: {
			creator: S.RelationById('profiles', '$creatorId'),
			adminMemberships: S.RelationMany('gardenMemberships', {
				where: [['userId', 'in', '$adminIds']]
			}),
			editorMemberships: S.RelationMany('gardenMemberships', {
				where: [['userId', 'in', '$adminIds']]
			}),
			viewerMemberships: S.RelationMany('gardenMemberships', {
				where: [['userId', 'in', '$adminIds']]
			})
		},
		permissions: {
			anon: {
				read: {
					/** Allow anonymous reads if the garden is not hidden. */
					filter: [['visibility', '!=', 'HIDDEN']]
				}
			},
			user: {
				read: {
					/** Allow reads if the garden is not hidden or the user is a member. */
					filter: [
						or([
							['visibility', '!=', 'HIDDEN'],
							['adminIds', 'has', '$role.profileId'],
							['editorIds', 'has', '$role.profileId'],
							['viewerIds', 'has', '$role.profileId']
						])
					]
				},
				insert: {
					/** Allow new gardens to be created by creators. */
					filter: [['creatorId', '=', '$role.profileId']]
				},
				update: {
					/** Restrict edit access to admins. */
					filter: [['adminIds', 'has', '$role.profileId']]
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

			/** User who is the subject of the membership. */
			userId: S.String(),

			/** Role of the membership. */
			role: S.String({ enum: [...GardenMembershipRoleEnumOptions] }),

			/** User who created the membership. */
			inviterId: S.String({ nullable: true }),

			/** The acceptance status and acceptance date of the membership. */
			status: S.String({ enum: [...GardenMembershipStatusEnumOptions] }),
			acceptedAt: S.Date({ nullable: true, default: null }),

			/** Allows marking gardens as favorites in the menu. */
			favorite: S.Boolean({ default: false })
		}),
		relationships: {
			garden: S.RelationById('gardens', '$gardenId'),
			user: S.RelationById('profiles', '$userId'),
			inviter: S.RelationById('profiles', '$inviterId')
		},
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
					/** Allow new memberships to be created by admins. */
					filter: [['garden.adminIds', 'has', '$role.profileId']]
				},
				update: {
					/** Restrict membership updates to admins and subjects. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['userId', '=', '$role.profileId']
						])
					]
				},
				delete: {
					/** Allow the membership to be revoked by an admin or deleted by the subject. */
					filter: [
						or([
							['garden.adminIds', 'has', '$role.profileId'],
							['userId', '=', '$role.accountId']
						])
					]
				}
			}
		}
	}
});
export type Garden = Entity<typeof gardenSchema, 'gardens'>;
export type GardenMembership = Entity<typeof gardenSchema, 'gardenMemberships'>;
export type GardenVisibility = (typeof GardenVisibilityEnumOptions)[number];
export type GardenRole = (typeof GardenMembershipRoleEnumOptions)[number];
export type GardenMembershipStatus = (typeof GardenMembershipStatusEnumOptions)[number];
