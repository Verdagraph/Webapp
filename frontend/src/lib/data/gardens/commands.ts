import { z as zod } from 'zod';
import { AppError } from '@vdt-webapp/common/src/errors';
import {
	GardenCreateCommand,
	GardenCreateCommandSchema,
	GardenMembershipCreateCommand,
	GardenMembershipCreateCommandSchema,
	isProfileMember,
	isUserAuthorized,
	GardenMembershipAcceptCommand,
	GardenMembershipAcceptCommandSchema,
	GardenMembershipDeleteCommand,
	GardenMembershipDeleteCommandSchema,
	GardenMembershipRevokeCommand,
	GardenMembershipRevokeCommandSchema,
	GardenMembershipRoleChangeCommand,
	GardenMembershipRoleChangeCommandSchema
} from '@vdt-webapp/common';
import type { Garden, UserAccount, UserProfile } from '@vdt-webapp/common';
import triplit from '../triplit';
import { getClientOrError } from '$data/users/auth';
import { ActionType, requiredRole } from '$lib/permissions';

/** Helpers. */

/**
 * Given a garden and an action, retrieve the client
 * and throw an error if the client does not have at least
 * that role.
 * @param gardenId The garden to retrieve.
 * @param action The action to authorize for.
 * @returns The client and garden objects.
 */
export async function requireRole(
	gardenId: string,
	action: ActionType
): Promise<{
	client: {
		account: UserAccount;
		profile: UserProfile;
	};
	garden: Garden;
}> {
	/** Retrieve client. */
	const client = await getClientOrError();

	/** Retrieve garden. */
	const garden = await triplit.fetchOne(triplit.query('gardens').id(gardenId).build());
	if (garden == null) {
		throw new AppError('Garden key does not exist.', {
			nonFormErrors: ['Garden key does not exist.']
		});
	}

	/** Ensure client is of the specified role. */
	const role = requiredRole(action);
	if (!isUserAuthorized(garden, client.profile.id, role)) {
		throw new AppError(`Requires ${role} access.`, {
			nonFormErrors: [`This action requires the ${role} role.`]
		});
	}

	return { client, garden };
}

/**
 * Given a list of usernames, constructs a set of matching profile IDs
 * given they are not already members in a garden.
 * @param usernames The usernames to retrieve profile IDs for.
 * @param garden The garden to check the user's aren't already members in.
 * If the garden is undefined, all users are considered new members.
 * @returns A set of matching profile IDs that aren't already members in the garden.
 */
async function getNewMembershipIdsFromUsernames(
	usernames: string[] | undefined,
	garden?: Garden
): Promise<Set<string>> {
	if (!usernames) {
		return new Set();
	}

	const profiles = await triplit.fetch(
		triplit
			.query('profiles')
			.where([['username', 'in', usernames]])
			.build()
	);
	return new Set(
		profiles
			.filter((profile) => garden === undefined || !isProfileMember(garden, profile.id))
			.map((profile) => profile.id)
	);
}

/** Commands. */

/**
 * Creates a new garden.
 */
export const gardenCreate = {
	schema: GardenCreateCommandSchema,
	mutation: async function (data: GardenCreateCommand): Promise<Garden> {
		/** Retrieve client. */
		const client = await getClientOrError();

		/** Validate unique key constraint. */
		const existingGarden = await triplit.fetchOne(
			triplit.query('gardens').id(data.id).build()
		);
		if (existingGarden) {
			throw new AppError('Garden ID already exists.', {
				fieldErrors: { id: ['Key already exists.'] }
			});
		}

		/** Retrieve all invitee IDs. */
		const adminIds = await getNewMembershipIdsFromUsernames(data.adminInvites);
		const editorIds = await getNewMembershipIdsFromUsernames(data.editorInvites);
		const viewerIds = await getNewMembershipIdsFromUsernames(data.viewerInvites);

		/** Add creator's ID. */
		adminIds.add(client.profile.id);

		/** Persist to db and add memberships. */
		let garden: Garden | null = null;
		await triplit.transact(async (transaction) => {
			garden = await transaction.insert('gardens', {
				id: data.id,
				name: data.name,
				visibility: data.visibility,
				description: data.description,
				creatorId: client.profile.id,
				adminIds,
				editorIds,
				viewerIds
			});

			/** Add creator membership. */
			await transaction.insert('gardenMemberships', {
				gardenId: garden.id,
				userId: client.profile.id,
				role: 'ADMIN',
				inviterId: null,
				status: 'ACCEPTED'
			});

			/** Add admin memberships. */
			for (const userId in adminIds) {
				if (userId === client.profile.id) {
					continue;
				}

				await transaction.insert('gardenMemberships', {
					gardenId: garden.id,
					userId: userId,
					role: 'ADMIN',
					inviterId: client.profile.id,
					status: 'CREATED'
				});
			}

			/** Add editor memberships. */
			for (const userId in editorIds) {
				await transaction.insert('gardenMemberships', {
					gardenId: garden.id,
					userId: userId,
					role: 'EDITOR',
					inviterId: client.profile.id,
					status: 'CREATED'
				});
			}

			/** Add editor memberships. */
			for (const userId in viewerIds) {
				await transaction.insert('gardenMemberships', {
					gardenId: garden.id,
					userId: userId,
					role: 'VIEWER',
					inviterId: client.profile.id,
					status: 'CREATED'
				});
			}

			/** Add a default workspace. */
			await transaction.insert('workspaces', {
				gardenId: garden.id,
				name: 'Default',
				slug: 'default'
			});

			/** Add a default environment. */
			await transaction.insert('environments', {
				gardenId: garden.id,
				name: 'Garden',
				parentType: 'GARDEN'
			});
		});

		if (garden == null) {
			throw new AppError('Failed to create garden.');
		}
		return garden;
	}
};

/**
 * Invites users to an existing garden.
 */
export const gardenMembershipCreate = {
	schema: GardenMembershipCreateCommandSchema,
	mutation: async function (data: GardenMembershipCreateCommand) {
		/** Retrieve client and authorize. */
		const { client, garden } = await requireRole(data.gardenId, 'MembershipCreate');

		/** Retrieve all invitee IDs. Drop all IDs which are already members */
		const adminIds = await getNewMembershipIdsFromUsernames(data.adminInvites);
		const editorIds = await getNewMembershipIdsFromUsernames(data.editorInvites);
		const viewerIds = await getNewMembershipIdsFromUsernames(data.viewerInvites);

		/** Persist to db and add memberships. */
		await triplit.transact(async (transaction) => {
			await transaction.update('gardens', garden.id, (garden) => {
				adminIds.forEach((id) => garden.adminIds.add(id));
				editorIds.forEach((id) => garden.editorIds.add(id));
				viewerIds.forEach((id) => garden.viewerIds.add(id));
			});

			/** Add admin memberships. */
			for (const userId in adminIds) {
				await transaction.insert('gardenMemberships', {
					gardenId: garden.id,
					userId: userId,
					role: 'ADMIN',
					inviterId: client.profile.id,
					status: 'CREATED'
				});
			}

			/** Add editor memberships. */
			for (const userId in editorIds) {
				await transaction.insert('gardenMemberships', {
					gardenId: garden.id,
					userId: userId,
					role: 'EDITOR',
					inviterId: client.profile.id,
					status: 'CREATED'
				});
			}

			/** Add editor memberships. */
			for (const userId in viewerIds) {
				await transaction.insert('gardenMemberships', {
					gardenId: garden.id,
					userId: userId,
					role: 'VIEWER',
					inviterId: client.profile.id,
					status: 'CREATED'
				});
			}
		});
	}
};

/**
 * Sends a garden membership acceptance request.
 */
export const gardenMembershipAccept = {
	schema: GardenMembershipAcceptCommandSchema,
	mutation: async function (data: GardenMembershipAcceptCommand) {
		/** Retrieve client. */
		const client = await getClientOrError();

		/** Retrieve the membership. */
		const membership = await triplit.fetchOne(
			triplit
				.query('gardenMemberships')
				.where([
					['gardenId', '=', data.gardenId],
					['userId', '=', client.profile.id]
				])
				.build()
		);
		if (!membership) {
			throw new AppError('Membership does not exist in the collection.', {
				nonFormErrors: ['The invite to this garden does not exist.']
			});
		}

		/** Ensure the invite isn't already accepted. */
		if (membership.status === 'ACCEPTED') {
			throw new AppError('Membership was already accepted.', {
				nonFormErrors: ['The invite to this garden is already accepted.']
			});
		}

		/** Update the membership. */
		await triplit.update('gardenMemberships', membership.id, async (membership) => {
			membership.status = 'ACCEPTED';
			membership.acceptedAt = new Date();
		});
	}
};

/**
 * Deletes a user's own membership in a garden.
 */
export const gardenMembershipDelete = {
	schema: GardenMembershipDeleteCommandSchema,
	mutation: async function (data: GardenMembershipDeleteCommand) {
		/** Retrieve client. */
		const client = await getClientOrError();

		/** Retrieve the membership. */
		const membership = await triplit.fetchOne(
			triplit
				.query('gardenMemberships')
				.where([
					['gardenId', '=', data.gardenId],
					['userId', '=', client.profile.id]
				])
				.build()
		);
		if (!membership) {
			throw new AppError('Membership does not exist in the collection.', {
				nonFormErrors: ['The membership in this garden does not exist.']
			});
		}

		/**
		 * Delete the membership.
		 * Note that the update on the garden (removing the user's ID),
		 * is handled via event on the server, due to permission constraints.
		 */
		await triplit.delete('gardenMemberships', membership.id);
	}
};

/**
 * Revokes a membership of a different user.
 */
export const gardenMembershipRevoke = {
	schema: GardenMembershipRevokeCommandSchema,
	mutation: async function (data: GardenMembershipRevokeCommand) {
		/** Retrieve client and authorize. */
		const { client } = await requireRole(data.gardenId, 'MembershipRevoke');

		/** Ensure the command is valid. */
		if (client.profile.id === data.profileId) {
			throw new AppError(
				"Attempted to revoke one's own membership with the wrong command.",
				{
					nonFormErrors: ['Cannot revoke own membership - leave instead.']
				}
			);
		}

		/** Retrieve the membership. */
		const membership = await triplit.fetchOne(
			triplit
				.query('gardenMemberships')
				.where([
					['gardenId', '=', data.gardenId],
					['userId', '=', data.profileId]
				])
				.build()
		);
		if (!membership) {
			throw new AppError('Membership does not exist in the collection.', {
				nonFormErrors: ['The membership in this garden does not exist.']
			});
		}

		/**
		 * Delete the membership.
		 * Note that the update on the garden (removing the user's ID),
		 * is handled via event on the server, due to permission constraints.
		 */
		await triplit.delete('gardenMemberships', membership.id);
	}
};

/**
 * Revokes a membership of a different user.
 */
export const gardenMembershipRoleChange = {
	schema: GardenMembershipRoleChangeCommandSchema,
	mutation: async function (data: GardenMembershipRoleChangeCommand) {
		/** Retrieve client and authorize. */
		const { client, garden } = await requireRole(data.gardenId, 'MembershipRoleChange');

		/** Ensure the command is valid. */
		if (client.profile.id === data.profileId) {
			throw new AppError("Attempted to change the role of one's own membership.", {
				nonFormErrors: ['You cannot change the role of your own membership.']
			});
		}
		if (data.profileId === garden.creatorId) {
			throw new AppError("Creator's role cannot be changed.", {
				nonFormErrors: ["You cannot change the role of the garden's creator."]
			});
		}

		/** Retrieve membership. */
		const membership = await triplit.fetchOne(
			triplit
				.query('gardenMemberships')
				.where([
					['gardenId', '=', data.gardenId],
					['userId', '=', data.profileId]
				])
				.build()
		);
		if (!membership) {
			throw new AppError('Membership does not exist in the collection.', {
				nonFormErrors: ['The membership in this garden does not exist.']
			});
		}

		/** Ensure the new role is different. */
		if (data.newRole === membership.role) {
			throw new AppError('Role to be changed is not different.', {
				fieldErrors: { newRole: ['The user already has this role.'] }
			});
		}

		await triplit.transact(async (transaction) => {
			/** Modify the garden. */
			await transaction.update('gardens', garden.id, async (garden) => {
				/** Remove existing ID on the garden. */
				if (data.profileId in garden.adminIds) {
					garden.adminIds.delete(data.profileId);
				} else if (data.profileId in garden.editorIds) {
					garden.editorIds.delete(data.profileId);
				} else if (data.profileId in garden.viewerIds) {
					garden.viewerIds.delete(data.profileId);
					/** Should not get here. */
				} else {
					throw new AppError(
						'User not in garden when modifying a role despite previous check.',
						{ nonFormErrors: ['Something went wrong.'] }
					);
				}

				/** Add new ID. */
				switch (data.newRole) {
					case 'ADMIN':
						garden.adminIds.add(data.profileId);
						break;
					case 'EDITOR':
						garden.editorIds.add(data.profileId);
						break;
					case 'VIEWER':
						garden.viewerIds.add(data.profileId);
						break;
					/** Should not get here. */
					default:
						throw new AppError('New role not a valid role.', {
							nonFormErrors: ['Something went wrong.']
						});
				}
			});

			/** Modify the membership. */
			await transaction.update(
				'gardenMemberships',
				membership.id,
				async (membership) => {
					membership.role = data.newRole;
				}
			);
		});
	}
};
