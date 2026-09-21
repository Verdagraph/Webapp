import { AppError } from '@vdg-webapp/models';

import { goto } from '$app/navigation';
import { gardenQuery } from '$data/gardens/queries';
import triplit from '$data/triplit';

/**
 * Confirm the garden exists before rendering.
 */
export async function load({ params }) {
	const garden = await triplit.fetchOne(gardenQuery.Vars({ id: params.gardenId }));

	if (!garden) {
		/** TODO: Make toasts work here. */
		//toast.error('Garden does not exist.');
		goto(`/gardens`);
		throw new AppError(`Garden ${params.gardenId} does not exist`);
	}

	return { gardenId: params.gardenId };
}
