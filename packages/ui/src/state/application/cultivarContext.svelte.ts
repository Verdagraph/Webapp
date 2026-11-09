import { or } from '@triplit/client';
import { useQuery } from '@triplit/svelte';

import {
	type ControllerContext,
	type Cultivar,
	createCultivarIndex
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
	 * The collections the garden's own collections inherit from, such as the default collection.
	 * They are read only to the garden. An `or` of equalities rather than `in`, for the reason
	 * given on the cultivars query below.
	 */
	const inheritedCollectionsQuery = $derived(
		useQuery(
			controller.triplit,
			controller.triplit
				.query('cultivarCollections')
				.Where([
					or(
						ancestorCollectionsIds.size > 0
							? [...ancestorCollectionsIds].map((id) => ['id', '=', id] as const)
							: [['id', '=', ''] as const]
					)
				])
		)
	);
	const inheritedCollections = $derived(
		ancestorCollectionsIds.size === 0 ? [] : (inheritedCollectionsQuery.results ?? [])
	);
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
			controller.triplit.query('cultivars').Where([
				/**
				 * An `or` of equalities rather than an `in` list: a Triplit `in`
				 * subscription goes stale (misses later inserts) when it replaces an
				 * earlier subscription on the same table with a different list, which
				 * is what happens each time a collection is added.
				 */
				or(
					allCollectionIds.length > 0
						? allCollectionIds.map((id) => ['collectionId', '=', id] as const)
						: [['collectionId', '=', ''] as const]
				)
			])
		)
	);
	const allCultivars = $derived(
		allCollectionIds.length === 0 ? [] : (allCultivarsQuery.results ?? [])
	);
	const cultivarNames = $derived(
		new Set(allCultivars.map((cultivar) => cultivar.name))
	);

	/**
	 * Resolves cultivar names from the rows already loaded, so looking one up never queries.
	 * A name finds the cultivar of that name, or one with it as another name, in the garden's own
	 * collections before the collections they inherit from, with its parents' values merged in.
	 */
	const index = $derived(
		createCultivarIndex({
			collections: [...gardenCollections, ...inheritedCollections],
			roots: gardenCollections,
			cultivars: allCultivars
		})
	);
	const cultivars = $derived(new Set(index.all()));

	/** Looks up a resolved Cultivar by name, loosely: see normalizeCultivarName. */
	function getCultivar(name: string): Cultivar | null {
		return index.find(name);
	}

	return {
		/** Collections owned by the garden. Ancestors owned elsewhere are not included. */
		get collections() {
			return gardenCollections;
		},
		/** Collections inherited from, which the garden can read but not change. */
		get inheritedCollections() {
			return inheritedCollections;
		},
		/** Every cultivar stored in the garden's collections and their ancestors, unresolved. */
		get storedCultivars() {
			return allCultivars;
		},
		get cultivarNames() {
			return cultivarNames;
		},
		get cultivars() {
			return cultivars;
		},
		getCultivar
	};
}
export type CultivarContext = ReturnType<typeof createCultivarContext>;
