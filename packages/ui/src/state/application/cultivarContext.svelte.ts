import { QuerySubscription } from 'jazz-tools/svelte';

import { type Commands, type Cultivar, app, resolveCultivar } from '@vdg-webapp/models';

import type { GardenContext } from './gardenContext.svelte';

/**
 * Holds context for a garden's cultivar collections.
 */
export function createCultivarContext(commands: Commands, garden: GardenContext) {
	/** Queries all collections in the garden. */
	const gardenCollectionsQuery = new QuerySubscription(() =>
		garden.gardenId
			? app.cultivarCollections.where({ gardenId: garden.gardenId })
			: undefined
	);
	const gardenCollections = $derived(gardenCollectionsQuery.current ?? []);
	const gardenCollectionsIds = $derived(
		gardenCollections.map((collection) => collection.id)
	);
	/** Collects IDs of all the ancestors of collections in the garden. */
	const ancestorCollectionsIds = $derived.by(() => {
		const uniqueAncestorIds = new Set<string>([]);

		for (const collection of gardenCollections) {
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
	 */
	const allCultivarsQuery = new QuerySubscription(() =>
		allCollectionIds.length > 0
			? app.cultivars.where({ collectionId: { in: allCollectionIds } })
			: undefined
	);
	const allCultivars = $derived(
		allCollectionIds.length === 0 ? [] : (allCultivarsQuery.current ?? [])
	);
	const cultivarNames = $derived(
		new Set(allCultivars.map((cultivar) => cultivar.name))
	);

	/** Collects all resolved cultivar objects in the garden, keyed by name for O(1) lookup via getCultivar. */
	let cultivarsByName: Map<string, Cultivar> = $state(new Map());
	$effect(() => {
		const names = cultivarNames;
		const gardenId = garden.gardenId;
		if (names.size === 0 || !gardenId) {
			cultivarsByName = new Map();
			return;
		}

		Promise.all(
			[...names].map(
				async (name) => [name, await resolveCultivar(gardenId, name, commands)] as const
			)
		).then((entries) => {
			cultivarsByName = new Map(
				entries.filter((entry): entry is [string, Cultivar] => entry[1] !== null)
			);
		});
	});
	const cultivars = $derived(new Set(cultivarsByName.values()));

	/**
	 * Looks up a resolved cultivar by name - centralized here (rather than
	 * every caller doing `[...cultivars].find(...)` itself) so the lookup
	 * can be O(1) via the underlying map instead of an O(n) scan repeated at
	 * every call site.
	 */
	function getCultivar(name: string): Cultivar | null {
		return cultivarsByName.get(name) ?? null;
	}

	return {
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
