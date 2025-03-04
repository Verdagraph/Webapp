import { type } from 'arktype';
import { userFields } from '../users/commands';
import { GardenVisibilityEnum, GardenMembershipRoleEnum } from './schema';
import { commonFields } from '@common/commands';

/** Field specifications. */
export const gardenFields = {
	id: type('string.trim & string.lower & /[0-9A-Za-z-]+/')
		.to('4 <= string <= 21')
		.describe(
			'betwwen 4 and 21 characters, contain only letters, numbers, and hyphens, and be unique.'
		)
		.configure({ details: 'Shorthand name for the garden used in URLs.' }),
	name: commonFields.name.configure({ details: 'Name of the garden.' }),
	description: commonFields.description.configure({ details: 'Optional description.' }),
	visibility: type
		.enumerated(...GardenVisibilityEnum)
		.configure({
			details:
				'Hidden gardens can only be viewed by members. Unlisted gardens can be viewed by anyone with a link. Public gardens are searchable.'
		})
		.default('HIDDEN'),
	usernameInvitesList: userFields.username
		.array()
		.lessThanLength(10)
		.describe('at most 10 users.')
};

/**
 * Command to create a new garden.
 */
export const GardenCreateCommandSchema = type({
	id: gardenFields.id,
	name: gardenFields.name,
	description: gardenFields.description.optional(),
	adminInvites: gardenFields.usernameInvitesList
		.configure({ details: 'A list of usernames to invite as admins.' })
		.default(() => []),
	editorInvites: gardenFields.usernameInvitesList
		.configure({ details: 'A list of usernames to invite as editors.' })
		.default(() => []),
	viewerInvites: gardenFields.usernameInvitesList
		.configure({ details: 'A list of usernames to invite as viewers.' })
		.default(() => [])
});
export type GardenCreateCommand = typeof GardenCreateCommandSchema.infer;

/**
 * Command to invite a user to a garden.
 */
export const GardenMembershipCreateCommandSchema = type({
	gardenId: 'string',
	adminInvites: gardenFields.usernameInvitesList
		.configure({ details: 'A list of usernames to invite as admins.' })
		.default(() => []),
	editorInvites: gardenFields.usernameInvitesList
		.configure({ details: 'A list of usernames to invite as editors.' })
		.default(() => []),
	viewerInvites: gardenFields.usernameInvitesList
		.configure({ details: 'A list of usernames to invite as viewers.' })
		.default(() => [])
});
export type GardenMembershipCreateCommand =
	typeof GardenMembershipCreateCommandSchema.infer;

/**
 * Command to accept a garden membership invite.
 */
export const GardenMembershipAcceptCommandSchema = type({
	gardenId: 'string'
});
export type GardenMembershipAcceptCommand =
	typeof GardenMembershipAcceptCommandSchema.infer;

/**
 * Command to leave a garden.
 */
export const GardenMembershipDeleteCommandSchema = type({
	gardenId: 'string'
});
export type GardenMembershipDeleteCommand =
	typeof GardenMembershipDeleteCommandSchema.infer;

/**
 * Command to revoke a user's membership.
 */
export const GardenMembershipRevokeCommandSchema = type({
	gardenId: 'string',
	profileId: 'string'
});
export type GardenMembershipRevokeCommand =
	typeof GardenMembershipRevokeCommandSchema.infer;

/**
 * Command to change the role on a user's membership.
 */
export const GardenMembershipRoleChangeCommandSchema = type({
	gardenId: 'string',
	profileId: 'string',
	newRole: type.enumerated(...GardenMembershipRoleEnum).default('VIEWER')
});
export type GardenMembershipRoleChangeCommand =
	typeof GardenMembershipRoleChangeCommandSchema.infer;
