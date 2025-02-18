import { Tree, type TreeItem } from 'melt/builders';
import { type Snippet } from 'svelte';
import { fromTreeId } from './utils';
import { z } from 'zod';

/** Describes the structure of an item in the tree. */
type Item = TreeItem & {
	/** Label for the item. */
	label: string;
	/** Description. Displayed in a popover. */
	description?: string;
	/** Icon for the item. */
	icon?: string;
	/**
	 * The value of the item.
	 * Mutually exclusive with the item having children.
	 */
	value?: any;
	/** The change callback to use for changing the item. */
	onChange?: (changeOver: boolean, newData: any) => void;
	/**
	 * Must be defined to render an editable value for the item value.
	 * The snippet can render any type of value, becomes editable if
	 * the editable argument changes, and propogates any editing
	 * via the onChange callback.
	 */
	valueSnippet?: Snippet<
		[
			value: any,
			editing: boolean,
			onChange: (changeOver: boolean, newData: any) => void,
			errors: boolean
		]
	>;
	/**
	 * The children of the item.
	 * Mutually exclusive with rendering a value for the item.
	 */
	children?: Item[];
};

/**
 * Creates a container for a Melt-UI tree,
 * allowing editing of items, synchronization
 * of selection state with app selections,
 * and validation of fields.
 * @param items A getter for the tree items.
 * @param entitySelectionHandlers Handlers for adding
 * and removing selected tree items to/from app selections.
 * @param onSelectedChange Called when the tree selection changes,
 * after the synchronization has happened.
 * @returns Editable tree.
 */
export function createEditableTree<EntityTypeT extends string>(
	items: () => Item[],
	entitySelectionHandlers: Record<
		EntityTypeT,
		{ add: (id: string) => void; remove: (id: string) => void }
	>,
	onSelectedChange?: (value: Set<string>) => void
) {
	/** Stores a previous selection for diffing. */
	let previousSelection: Set<string> = new Set();
	/**
	 * Diffs the previous and new selections to find the IDs which
	 * have been added and remove, then calls the appropriate handlers.
	 * @param newSelection The new selection returned by Melt.
	 */
	function onSelectedChangeHandler(newSelection: Set<string>) {
		/** Get items that have been added and remoeved. */
		const addedIds = newSelection.difference(previousSelection);
		const removedIds = previousSelection.difference(newSelection);

		/** Add all selected items to the workspace context. */
		for (const id of addedIds) {
			const { entityType, entityId } = fromTreeId<EntityTypeT>(id);
			entitySelectionHandlers[entityType].add(entityId);
		}

		/** Remove unselected items from the workspace context. */
		for (const id of removedIds) {
			const { entityType, entityId } = fromTreeId<EntityTypeT>(id);
			entitySelectionHandlers[entityType].add(entityId);
		}

		previousSelection = new Set([...newSelection]);

		if (onSelectedChange) {
			onSelectedChange(newSelection);
		}
	}

	/** The Melt-UI builder. */
	const tree = new Tree({
		items: items,
		expandOnClick: true,
		multiple: true,
		onSelectedChange: onSelectedChangeHandler
	});

	/** Stores the errors for each editable field. */
	let errors: Record<string, string[]> = $state({});
	function validateField(id: string, spec: z.ZodType): boolean {
		/** TODO */
		return true;
	}

	return {
		tree,
		errors,
		validateField
	};
}
export type EditableTree = ReturnType<typeof createEditableTree>;
