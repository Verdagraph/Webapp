import { type } from 'arktype';
import { userUsernameSchema } from '../users/commands';
import { GardenVisibilityEnum, GardenMembershipRoleEnum } from './schema';
import { commonFields } from '../commands';

/** Field specifications. */
export const gardenIdSchema = type('string.trim')
	.to('string.lower')
	.to(/[0-9A-Za-z-]+/)
	.to('4 <= string <= 21')
	.describe(
		'betwwen 4 and 21 characters, contain only letters, numbers, and hyphens, and be unique.'
	)
	.configure({ details: 'Shorthand name for the garden used in URLs.' });
export const gardenNameSchema = commonFields.name.configure({
	details: 'Name of the garden.'
});
export const gardenDescriptionSchema = commonFields.description.configure({
	details: 'Optional description.'
});
export const garednVisibilitySchema = type
	.enumerated(...GardenVisibilityEnum)
	.configure({
		details:
			'Hidden gardens can only be viewed by members. Unlisted gardens can be viewed by anyone with a link. Public gardens are searchable.'
	})
	.default('HIDDEN');
export const gardenUsernameInvitesListSchema = userUsernameSchema
	.array()
	.lessThanLength(10)
	.describe('at most 10 users.');

/** Commands. */

/**
 * Command to create a new garden.
 */
export const GardenCreateCommandSchema = type({
	id: gardenIdSchema,
	name: gardenNameSchema,
	description: gardenDescriptionSchema.default(''),
	adminInvites: gardenUsernameInvitesListSchema
		.configure({ details: 'A list of usernames to invite as admins.' })
		.default(() => []),
	editorInvites: gardenUsernameInvitesListSchema
		.configure({ details: 'A list of usernames to invite as editors.' })
		.default(() => []),
	viewerInvites: gardenUsernameInvitesListSchema
		.configure({ details: 'A list of usernames to invite as viewers.' })
		.default(() => [])
});
export type GardenCreateCommand = typeof GardenCreateCommandSchema.infer;

/**
 * Command to invite a user to a garden.
 */
export const GardenMembershipCreateCommandSchema = type({
	gardenId: 'string',
	adminInvites: gardenUsernameInvitesListSchema
		.configure({ details: 'A list of usernames to invite as admins.' })
		.default(() => []),
	editorInvites: gardenUsernameInvitesListSchema
		.configure({ details: 'A list of usernames to invite as editors.' })
		.default(() => []),
	viewerInvites: gardenUsernameInvitesListSchema
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
