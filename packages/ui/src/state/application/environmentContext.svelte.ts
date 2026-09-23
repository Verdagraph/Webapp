import { QuerySubscription } from 'jazz-tools/svelte';

import { jazzApp } from '@vdg-webapp/models/jazz';

import type { GardenContext } from './gardenContext.svelte';

/**
 * Holds context for a garden's environments.
 */
export function createEnvironmentContext(garden: GardenContext) {
	const environmentsQuery = new QuerySubscription(() =>
		garden.gardenId
			? jazzApp.environments.where({ gardenId: garden.gardenId })
			: undefined
	);
	const environments = $derived(environmentsQuery.current ?? []);

	return {
		get environments() {
			return environments;
		}
	};
}
export type EnvironmentContext = ReturnType<typeof createEnvironmentContext>;
