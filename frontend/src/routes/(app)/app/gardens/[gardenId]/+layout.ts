import triplit from '$data/triplit';
import { activeGardenQuery } from '$data/gardens/queries.js';
import { goto } from '$app/navigation';
import { toast } from 'svelte-sonner';
import activeGardenId from '$state/activeGarden.svelte';
import { AppError } from '@vdt-webapp/common/src/errors';

/**
 * Retrieve the garden and set it as active.
 */
export async function load({ params }) {
	const garden = await triplit.fetchOne(
		activeGardenQuery.vars({ activeGardenId: params.gardenId }).build()
	);

	if (!garden) {
		/** TODO: Make toasts work here. */
		//toast.error('Garden does not exist.');
		goto(`/app/gardens`);
		throw new AppError(`Garden ${params.gardenId} does not exist`);
	}

	/** Update the active garden upon loading a new garden. */
	if (activeGardenId.value != garden.id) {
		activeGardenId.value = garden.id;
	}
}
