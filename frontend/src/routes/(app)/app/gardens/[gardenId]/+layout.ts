import triplit from '$data/triplit';
import { activeGardenQuery } from '$data/gardens/queries.js';
import { goto } from '$app/navigation';
import activeGarden from '$state/gardenContext.svelte';
import { AppError } from '@vdt-webapp/common/src/errors';
import { getClient } from '$data/users/auth';

/**
 * Retrieve the garden and set it as active.
 */
export async function load({ params }) {
	const garden = await triplit.fetchOne(
		activeGardenQuery.vars({ activeGardenId: params.gardenId }).build()
	);
	const client = await getClient();

	if (!garden) {
		/** TODO: Make toasts work here. */
		//toast.error('Garden does not exist.');
		goto(`/app/gardens`);
		throw new AppError(`Garden ${params.gardenId} does not exist`);
	}

	/** Update the active garden upon loading a new garden. */
	if (activeGarden.id != garden.id) {
		activeGarden.id = garden.id;

		console.log('client');
		console.log(client);

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
