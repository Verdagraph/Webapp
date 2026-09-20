import { useQuery } from '@triplit/svelte';

import {
	type ControllerContext,
	type Cultivar,
	resolveCultivar
} from '@vdg-webapp/models';

import type { GardenContext } from './gardenContext.svelte';

/**
 * Holds context for a garden's cultivar collections.
 */
export function createCultivarContext(
	controller: ControllerContext,
	garden: GardenContext
) {
	/** Queries all collections in the garden. */
	const gardenCollectionsQuery = $derived(
		useQuery(
			controller.triplit,
			controller.triplit.query('cultivarCollections').Where('gardenId', '=', garden.id)
		)
	);
	const gardenCollections = $derived(gardenCollectionsQuery.results ?? []);
	const gardenCollectionsIds = $derived(
		gardenCollections.map((collection) => collection.id)
	);
	/** Collects IDs of all the ancestors of collections in the garden. */
	const ancestorCollectionsIds = $derived.by(() => {
		const uniqueAncestorIds = new Set<string>([]);

		for (const collection of gardenCollections) {
			if (!collection.ancestorIds) {
				continue;
			}

			for (const id of collection.ancestorIds) {
				uniqueAncestorIds.add(id);
			}
		}

		return uniqueAncestorIds;
	});
	const allCollectionIds = $derived([
		...gardenCollectionsIds,
		...ancestorCollectionsIds
	]);
	/**
	 * A second live query chained off the first (collectionIds only settle
	 * once gardenCollectionsQuery resolves). This assumes collections are
	 * already committed by the time it queries them, same as a real garden -
	 * see apps/demo's [demoId]/+page.svelte, which seeds the demo the same
	 * way for exactly this reason.
	 * TODO: reinvestigate with the Jazz migration.
	 */
	const allCultivarsQuery = $derived(
		useQuery(
			controller.triplit,
			controller.triplit.query('cultivars').Where('collectionId', 'in', allCollectionIds)
		)
	);
	const allCultivars = $derived(
		allCollectionIds.length === 0 ? [] : (allCultivarsQuery.results ?? [])
	);
	const cultivarNames = $derived(
		new Set(allCultivars.map((cultivar) => cultivar.name))
	);

	/** Collects all resolved cultivar objects in the garden. */
	let cultivars: Set<Cultivar> = $state(new Set([]));
	$effect(() => {
		const names = cultivarNames;
		if (names.size === 0) {
			cultivars = new Set([]);
			return;
		}

		Promise.all(
			[...names].map((name) => resolveCultivar(garden.id, name, controller))
		).then((results) => {
			cultivars = new Set(
				results.filter((cultivar): cultivar is Cultivar => cultivar !== null)
			);
		});
	});

	return {
		get cultivarNames() {
			return cultivarNames;
		},
		get cultivars() {
			return cultivars;
		}
	};
}
export type CultivarContext = ReturnType<typeof createCultivarContext>;
