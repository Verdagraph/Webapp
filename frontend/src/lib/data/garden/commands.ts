import { date, z as zod } from 'zod';
import { useMutation } from '@sveltestack/svelte-query';
import { AppError } from '@vdt-webapp/common/src/errors';
import {
	GardenCreateCommand,
	GardenMembershipCreateCommand,
	isProfileMember,
	isProfileAdmin,
	GardenMembershipAcceptCommand,
	GardenMembershipDeleteCommand,
	GardenMembershipRevokeCommand,
	GardenMembershipRoleChangeCommand,
	GardenMembershipStatusEnum
} from '@vdt-webapp/common';
import type { Garden, GardenMembership } from '@vdt-webapp/common';
import { gardenFieldSchemas } from './schemas';
import triplit from '../triplit';
import { getClientOrError } from '$data/user/auth';

/** Helpers. */

/**
 * Given a list of usernames, constructs a set of matching profile IDs
 * given they are not already members in a garden.
 * @param usernames The usernames to retrieve profile IDs for.
 * @param garden The garden to check the user's aren't already members in.
 * @returns A set of matching profile IDs that aren't already members in the garden.
 */
const getNewMembershipIdsFromUsernames = async (
	usernames: string[] | undefined,
	garden?: Garden
): Promise<Set<string>> => {
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
};

/** Commands. */

/**
 * Creates a new garden.
 */
export const gardenCreate = {
	schema: GardenCreateCommand,
	mutation: async (data: zod.infer<typeof GardenCreateCommand>): Promise<Garden> => {
		/** Retrieve client. */
		const client = await getClientOrError();

		/** Validate unique key constraint. */
		const existingGarden = await triplit.fetchOne(
			triplit
				.query('gardens')
				.where([['id', '=', data.id]])
				.build(),
			{ policy: 'remote-first' }
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
			// @ts-ignore- Triplit not recognizing optionality of defaulted types.
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
			// @ts-ignore - Triplit not recognizing optionality of defaulted types.
			await transaction.insert('gardenMemberships', {
				gardenId: garden.id,
				userId: client.profile.id,
				role: 'ADMIN',
				inviterId: null,
				status: 'ACCEPTED'
			});

			/** Add admin memberships. */
			for (const userId in adminIds) {
				// @ts-ignore - Triplit not recognizing optionality of defaulted types.
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
				// @ts-ignore - Triplit not recognizing optionality of defaulted types.
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
				// @ts-ignore - Triplit not recognizing optionality of defaulted types.
				await transaction.insert('gardenMemberships', {
					gardenId: garden.id,
					userId: userId,
					role: 'VIEWER',
					inviterId: client.profile.id,
					status: 'CREATED'
				});
			}
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
	schema: GardenMembershipCreateCommand,
	mutation: async (data: zod.infer<typeof GardenMembershipCreateCommand>) => {
		/** Retrieve client. */
		const client = await getClientOrError();

		/** Retrieve garden. */
		const garden = await triplit.fetchOne(
			triplit.query('gardens').where('id', '=', data.gardenId).build()
		);
		if (garden == null) {
			throw new AppError('Garden key does not exist.', {
				nonFormErrors: ['Garden key does not exist.']
			});
		}

		/** Ensure client is an admin. */
		if (!isProfileAdmin(garden, client.profile.id)) {
			throw new AppError('Requires admin access.', {
				nonFormErrors: ['This action requires the admin role.']
			});
		}

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
				// @ts-ignore - Triplit not recognizing optionality of defaulted types.
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
				// @ts-ignore - Triplit not recognizing optionality of defaulted types.
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
				// @ts-ignore - Triplit not recognizing optionality of defaulted types.
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
	schema: GardenMembershipAcceptCommand,
	mutation: async (data: zod.infer<typeof GardenMembershipAcceptCommand>) => {
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
	schema: GardenMembershipDeleteCommand,
	mutation: async (data: zod.infer<typeof GardenMembershipDeleteCommand>) => {
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
	schema: GardenMembershipRevokeCommand,
	mutation: async (data: zod.infer<typeof GardenMembershipRevokeCommand>) => {
		/** Retrieve client. */
		const client = await getClientOrError();

		/** Ensure the command is valid. */
		if (client.profile.id === data.profileId) {
			throw new AppError(
				"Attempted to revoke one's own membership with the wrong command.",
				{
					nonFormErrors: ['Cannot revoke own membership - leave instead.']
				}
			);
		}

		/** Retrieve garden. */
		const garden = await triplit.fetchOne(
			triplit.query('gardens').where('id', '=', data.gardenId).build()
		);
		if (garden == null) {
			throw new AppError('Garden key does not exist.', {
				nonFormErrors: ['Garden key does not exist.']
			});
		}

		/** Ensure client is an admin. */
		if (!isProfileAdmin(garden, client.profile.id)) {
			throw new AppError('Requires admin access.', {
				nonFormErrors: ['This action requires the admin role.']
			});
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
	schema: GardenMembershipRoleChangeCommand,
	mutation: async (data: zod.infer<typeof GardenMembershipRoleChangeCommand>) => {
		/** Retrieve client. */
		const client = await getClientOrError();

		/** Ensure the command is valid. */
		if (client.profile.id === data.profileId) {
			throw new AppError("Attempted to change the role of one's own membership.", {
				nonFormErrors: ['You cannot change the role of your own membership.']
			});
		}

		/** Retrieve garden. */
		const garden = await triplit.fetchOne(
			triplit.query('gardens').where('id', '=', data.gardenId).build()
		);
		if (garden == null) {
			throw new AppError('Garden key does not exist.', {
				nonFormErrors: ['Garden key does not exist.']
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

		/** Ensure client is an admin. */
		if (!isProfileAdmin(garden, client.profile.id)) {
			throw new AppError('Requires admin access.', {
				nonFormErrors: ['This action requires the admin role.']
			});
		}

		/** Ensure the subject is not the creator. */
		if (data.profileId === garden.creatorId) {
			throw new AppError("Creator's role cannot be changed.", {
				nonFormErrors: ["You cannot change the role of the garden's creator."]
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
