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
	 * once gardenCollectionsQuery resolves). Confirmed via direct
	 * instrumentation this used to settle once with an empty result and never
	 * recover when collectionIds went from empty to populated while the
	 * page's own seed-data transact() was still inserting concurrently
	 * (collections land before cultivars in that same transaction) - a plain
	 * fetch() was used defensively instead. Re-tested after fixing the demo
	 * to fully commit its seed data before mounting anything that queries it
	 * (apps/demo's [demoId]/+page.svelte) - with that race removed, this
	 * chained useQuery is reliable (5/5 runs), matching how a real garden's
	 * data is always already-committed by the time any page queries it.
	 * Confirmed the demo-mount race was the actual cause, not a general
	 * Triplit chained-query limitation, so the live query is worth having
	 * back (it now updates if a Cultivar is added/removed elsewhere while
	 * this page is open, which the plain-fetch version never did).
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
