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
	 * Fetched once collectionIds settle, rather than a second live useQuery
	 * chained off the first: a useQuery whose own query depends on another
	 * live query's results gets its subscription torn down and rebuilt every
	 * time the upstream query's results tick, which can starve it before it
	 * ever surfaces data. A plain fetch sidesteps that, at the cost of not
	 * auto-updating if a Cultivar is added/removed elsewhere while this page
	 * is open - an acceptable trade for now since nothing yet edits Cultivars
	 * live alongside it (the Cultivar Collections editor doesn't exist yet).
	 */
	let allCultivars: { name: string }[] = $state([]);
	$effect(() => {
		const collectionIds = allCollectionIds;
		if (collectionIds.length === 0) {
			allCultivars = [];
			return;
		}

		controller.triplit
			.fetch(
				controller.triplit.query('cultivars').Where('collectionId', 'in', collectionIds)
			)
			.then((results) => {
				allCultivars = results;
			});
	});
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
