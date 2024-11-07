import { date, z as zod } from 'zod';
import { useMutation } from '@sveltestack/svelte-query';
import { AppError } from '@vdt-webapp/common/src/errors';
import { GardenCreateCommand, GardenMembershipCreateCommand, isProfileMember } from '@vdt-webapp/common';
import type { Garden, GardenMembership } from '@vdt-webapp/common';
import { gardenFieldSchemas } from './schemas';
import triplit from '../triplit';
import { getProfileIdOrError } from '$state/access.svelte';
import authentication from '$state/authentication.svelte';
import { access } from 'fs';

/**
 * Creates a new garden.
 */
export const gardenCreate = {
	schema: GardenCreateCommand,
	mutation: async (data: zod.infer<typeof GardenCreateCommand>): Promise<Garden> => {
		/** Validate unique key constraint. */
		const existingGarden = await triplit.fetchOne(
			triplit
				.query('gardens')
				.where([['id', '=', data.id]])
				.build(),
			{ policy: 'remote-first' }
		);
		if (existingGarden) {
			throw new AppError('Garden key already exists.', {
				fieldErrors: { id: ['Key already exists.'] }
			});
		}

		/** Retrieve all invitee IDs. Add creator's ID. */
		let adminIds = new Set<string>();
		let editorIds = new Set<string>();
		let viewerIds = new Set<string>();
		if (data.adminInvites) {
			const adminProfiles = await triplit.fetch(
				triplit
					.query('profiles')
					.where([['username', 'in', data.adminInvites]])
					.build(),
				{ policy: 'remote-first' }
			);
			adminIds = new Set(adminProfiles.map((profile) => profile.id));
			adminIds.add(getProfileIdOrError());
		} else {
			adminIds.add(getProfileIdOrError());
		}
		if (data.editorInvites) {
			const editorProfiles = await triplit.fetch(
				triplit
					.query('profiles')
					.where([['username', 'in', data.editorInvites]])
					.build(),
				{ policy: 'remote-first' }
			);
			editorIds = new Set(editorProfiles.map((profile) => profile.id));
		}
		if (data.viewerInvites) {
			const viewerProfiles = await triplit.fetch(
				triplit
					.query('profiles')
					.where([['username', 'in', data.viewerInvites]])
					.build(),
				{ policy: 'remote-first' }
			);
			viewerIds = new Set(viewerProfiles.map((profile) => profile.id));
		}

		/** Persist to db and add memberships. */
		let garden: Garden | null = null;
		await triplit.transact(async (transaction) => {
			// @ts-ignore - Triplit not recognizing optionality of defaulted types.
			garden = await transaction.insert('gardens', {
				id: data.id,
				name: data.name,
				visibility: data.visibility,
				description: data.description,
				creatorId: getProfileIdOrError(),
				adminIds,
				editorIds,
				viewerIds
			});

			// @ts-ignore - Triplit not recognizing optionality of defaulted types.
			await transaction.insert('gardenMemberships', {
				gardenId: garden.id,
				userId: getProfileIdOrError(),
				inviterId: null,
				status: 'ACCEPTED',
				acceptedAt: new Date()
			});

			for (const userId in [...adminIds, ...editorIds, ...viewerIds]) {
				// @ts-ignore - Triplit not recognizing optionality of defaulted types.
				await transaction.insert('gardenMemberships', {
					gardenId: garden.id,
					userId: userId,
					inviterId: getProfileIdOrError(),
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
		/** Retrieve garden. */
		const garden = await triplit.fetchOne(
			triplit.query('gardens').where('id', '=', data.gardenId).build()
		);
		if (garden == null) {
			throw new AppError('Garden key does not exist.', {
				fieldErrors: { gardenId: ['Key does not exist.'] }
			});
		}

		/** Ensure client is an admin. */
		if (!(getProfileIdOrError() in garden.adminIds)) {
			throw new AppError('Requires admin access.', {
				nonFieldErrors: ['This action requires the admin role.']
			});
		}

		/** Retrieve all invitee IDs. Drop all IDs which are already members */
		let adminIds = new Set<string>();
		let editorIds = new Set<string>();
		let viewerIds = new Set<string>();
		if (data.adminInvites) {
			const adminProfiles = await triplit.fetch(
				triplit
					.query('profiles')
					.where([['username', 'in', data.adminInvites]])
					.build(),
				{ policy: 'remote-first' }
			);
			adminIds = new Set(
				adminProfiles
					.filter((profile) => !isProfileMember(garden, profile.id))
					.map((profile) => profile.id)
			);
		}
		if (data.editorInvites) {
			const editorProfiles = await triplit.fetch(
				triplit
					.query('profiles')
					.where([['username', 'in', data.editorInvites]])
					.build(),
				{ policy: 'remote-first' }
			);
			editorIds = new Set(
				editorProfiles
					.filter((profile) => !isProfileMember(garden, profile.id))
					.map((profile) => profile.id)
			);
		}
		if (data.viewerInvites) {
			const viewerProfiles = await triplit.fetch(
				triplit
					.query('profiles')
					.where([['username', 'in', data.viewerInvites]])
					.build(),
				{ policy: 'remote-first' }
			);
			viewerIds = new Set(
				viewerProfiles
					.filter((profile) => !isProfileMember(garden, profile.id))
					.map((profile) => profile.id)
			);
		}

		/** Persist to db and add memberships. */
		await triplit.transact(async (transaction) => {
			await transaction.update('gardens', garden.id, (garden) => {
				adminIds.forEach((id) => garden.adminIds.add(id));
				editorIds.forEach((id) => garden.editorIds.add(id));
				viewerIds.forEach((id) => garden.viewerIds.add(id));
			});

			for (const userId in [...adminIds, ...editorIds, ...viewerIds]) {
				// @ts-ignore - Triplit not recognizing optionality of defaulted types.
				await transaction.insert('gardenMemberships', {
					gardenId: garden.id,
					userId: userId,
					inviterId: getProfileIdOrError(),
					status: 'CREATED'
				});
			}
		});
	}
};

/**
 * Sends a garden membership acceptance request to the backend.
 */
export const gardenMembershipAccept = {
	schema: zod.object({
		key: gardenFieldSchemas.key
	}),
	mutation: () => {
		return useMutation(function (data: GardenMembershipAcceptCommand) {
			return gardenMembershipAcceptCommandOp(data);
		});
	}
};

/**
 * Sends a garden membership deletion request to the backend.
 */
export const gardenMembershipDelete = {
	schema: zod.object({
		key: gardenFieldSchemas.key
	}),
	mutation: () => {
		return useMutation(function (data: GardenMembershipDeleteCommand) {
			return gardenMembershipDeleteCommandOp(data);
		});
	}
};
