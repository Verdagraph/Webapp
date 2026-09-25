import { QuerySubscription } from 'jazz-tools/svelte';

import { type Environment, app } from '@vdg-webapp/models';

import type { GardenContext } from './gardenContext.svelte';

/**
 * Holds context for a garden's environments.
 */
export function createEnvironmentContext(garden: GardenContext) {
	const environmentsQuery = new QuerySubscription(() =>
		garden.gardenId ? app.environments.where({ gardenId: garden.gardenId }) : undefined
	);
	/**
	 * Cast to the friendly `Environment` type: the raw query result types
	 * `attributes` as unstructured `JsonValue` (jazz-tools has no typed-json
	 * column support yet, see EnvironmentAttributes), the same trust
	 * boundary `resolveCultivarId` asserts for cultivars.
	 */
	const environments = $derived((environmentsQuery.current ?? []) as Environment[]);

	return {
		get environments() {
			return environments;
		}
	};
}
export type EnvironmentContext = ReturnType<typeof createEnvironmentContext>;
