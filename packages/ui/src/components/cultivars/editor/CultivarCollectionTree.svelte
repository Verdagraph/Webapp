<script lang="ts">
	import type { Cultivar, CultivarCollection } from '@vdg-webapp/models';

	import {
		EditableTree,
		type Item,
		createEditableTree,
		toTreeBaseId
	} from '$components';

	import { getCultivarCollectionEditorContext } from './cultivarCollectionEditorContext.svelte';

	type Props = {
		collections: CultivarCollection[];
		cultivars: Cultivar[];
	};
	let { collections = [], cultivars = [] }: Props = $props();

	/** The types of entities in the tree whose selections must be synchronized. */
	type TreeEntities = 'cultivarCollection' | 'cultivar';

	const editor = getCultivarCollectionEditorContext();

	/** Builds the items of the cultivars in a collection, nesting varieties under their parent. */
	function cultivarItems(
		collectionCultivars: Cultivar[],
		parentId: string | null
	): Item[] {
		return collectionCultivars
			.filter((cultivar) =>
				parentId === null
					? !cultivar.parentId ||
						!collectionCultivars.some((other) => other.id === cultivar.parentId)
					: cultivar.parentId === parentId
			)
			.map((cultivar) => ({
				id: toTreeBaseId<TreeEntities>('cultivar', cultivar.id),
				label: cultivar.name,
				children: cultivarItems(collectionCultivars, cultivar.id)
			}));
	}

	/** Builds the items of the collections inheriting from a parent, with their cultivars. */
	function collectionItems(parentId: string | null): Item[] {
		return collections
			.filter((collection) =>
				parentId === null
					? !collection.parentId ||
						!collections.some((other) => other.id === collection.parentId)
					: collection.parentId === parentId
			)
			.map((collection) => ({
				id: toTreeBaseId<TreeEntities>('cultivarCollection', collection.id),
				label: collection.name,
				children: [
					...collectionItems(collection.id),
					...cultivarItems(
						cultivars.filter((cultivar) => cultivar.collectionId === collection.id),
						null
					)
				]
			}));
	}
	const items = $derived(collectionItems(null));

	/** Show the selected entity in the detail pane. */
	function showEntity(entityType: TreeEntities, id: string) {
		editor.select({ kind: entityType === 'cultivar' ? 'cultivar' : 'collection', id });
	}
	const editableTree = createEditableTree<TreeEntities>(() => items, {
		cultivarCollection: {
			add: (id) => showEntity('cultivarCollection', id),
			remove: (id) => {
				if (editor.selection?.id === id) editor.select(null);
			}
		},
		cultivar: {
			add: (id) => showEntity('cultivar', id),
			remove: (id) => {
				if (editor.selection?.id === id) editor.select(null);
			}
		}
	});

	/** Field errors are unused: the tree only navigates. */
	const fieldErrors: Record<string, string[]> = {};
</script>

{#if collections.length === 0}
	<span class="p-2 italic">No cultivar collections.</span>
{:else}
	<EditableTree {editableTree} {fieldErrors} editing={false} />
{/if}
