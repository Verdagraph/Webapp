import { AppError } from '@vdg-webapp/models';

import { goto } from '$app/navigation';
import { gardenQuery } from '$data/gardens/queries.js';
import triplit from '$data/triplit';
import { getClient } from '$data/users/auth';
import activeGarden from '$state/gardenContext.svelte';

/**
 * Retrieve the garden and set it as active.
 */
export async function load({ params }) {
	const client = await getClient();
	const garden = await triplit.fetchOne(gardenQuery.Vars({ id: params.gardenId }));

	if (!garden) {
		/** TODO: Make toasts work here. */
		//toast.error('Garden does not exist.');
		goto(`/gardens`);
		throw new AppError(`Garden ${params.gardenId} does not exist`);
	}

	/** Update the active garden upon loading a new garden. */
	if (activeGarden.id != garden.id) {
		activeGarden.id = garden.id;

		if (client === null) {
			activeGarden.role = null;
		} else if (garden.adminIds.has(client.profile.id)) {
			activeGarden.role = 'ADMIN';
		} else if (garden.editorIds.has(client.profile.id)) {
			activeGarden.role = 'EDITOR';
		} else if (garden.viewerIds.has(client.profile.id)) {
			activeGarden.role = 'VIEWER';
		} else {
			activeGarden.role = null;
		}
	}
}
