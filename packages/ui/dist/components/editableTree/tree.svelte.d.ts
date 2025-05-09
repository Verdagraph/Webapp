import type { Item } from './types';
/**
 * Creates a container for a Melt-UI tree,
 * allowing editing of items and synchronization
 * of selection state with app selections..
 * @param items A getter for the tree items.
 * @param entitySelectionHandlers Handlers for adding
 * and removing selected tree items to/from app selections.
 * @param onSelectedChange Called when the tree selection changes,
 * after the synchronization has happened.
 * @returns Editable tree.
 */
export declare function createEditableTree<EntityTypeT extends string>(
	items: () => Item[],
	entitySelectionHandlers: Record<
		EntityTypeT,
		{
			add: (id: string) => void;
			remove: (id: string) => void;
		}
	>,
	onSelectedChange?: (value: Set<string>) => void
): {
	tree: any;
};
export type EditableTreeContext = ReturnType<typeof createEditableTree>;
//# sourceMappingURL=tree.svelte.d.ts.map
