import { SvelteSet } from 'svelte/reactivity';

/**
 * The different type of selection states that can be used
 * to select entities in the editors.
 */
type SelectionTool = 'pointer' | 'group';

/**
 * Creates a manager for a single set of entityIds.
 * @returns Selection.
 */
function createSelection() {
	const selection = $state(new SvelteSet<string>());

	/** Allows executing side effects on selection change. */
	const onSelectionChangeHandlers: Array<
		(addedIds: Array<string>, removedIds: Array<string>) => void
	> = [];

	/**
	 * Returns true if the given entityID is selected.
	 * @param entityId The entity ID to check.
	 * @returns True if the entity ID is selected.
	 */
	function has(entityId: string) {
		return selection.has(entityId);
	}

	/**
	 * Adds the given entity ID to the selection.
	 * @param entityId The entity ID to add.
	 */
	function select(entityId: string) {
		if (has(entityId)) return;
		selection.add(entityId);
		onSelectionChangeHandlers.forEach((handler) => handler([entityId], []));
	}

	/**
	 * Removes the given entity ID from the selection.
	 * @param entityId The entity ID to remove.
	 */
	function deselect(entityId: string) {
		if (!has(entityId)) return;
		selection.delete(entityId);
		onSelectionChangeHandlers.forEach((handler) => handler([], [entityId]));
	}

	/**
	 * Resets the entity selection.
	 */
	function reset() {
		const removedIds = [...selection];
		selection.clear();
		onSelectionChangeHandlers.forEach((handler) => handler([], removedIds));
	}

	/**
	 * Adds a side effect handler for selection change.
	 * @param handler Handler for the selection change.
	 * Takes the IDs which have been added and removed.
	 */
	function addSelectionChangeHandler(
		handler: (addedIds: Array<string>, removedIds: Array<string>) => void
	) {
		onSelectionChangeHandlers.push(handler);
	}

	return {
		get selection() {
			return selection;
		},
		has,
		select,
		deselect,
		reset,
		addSelectionChangeHandler
	};
}
type Selection = ReturnType<typeof createSelection>;

/**
 * Creates a manager for multiple sets of selected entity IDs.
 * @param entityTypes A list of strings to use for accessing each entity type.
 * @returns Selection manager.
 */
export function createSelectionManager<const EntityTypes extends readonly string[]>(
	entityTypes: EntityTypes
) {
	type EntityType = EntityTypes[number];

	/** The current selection tool state. */
	let tool: SelectionTool = $state('pointer');

	/**
	 * Stores each of the entity selection sets in its own key.
	 */
	const selections: Record<EntityType, Selection> = Object.fromEntries(
		entityTypes.map((entity) => [entity, createSelection()])
	) as Record<EntityType, Selection>;

	/**
	 * Returns the selected entity IDs.
	 * @param entityType The type of entity to return the selection for.
	 * @returns The selected entity IDs.
	 */
	function get(entityType: EntityType): Set<string> {
		return selections[entityType].selection;
	}

	/**
	 * Returns true if the given entityID is selected.
	 * @param entityType The type of entity.
	 * @param entityId The entity ID to check.
	 * @returns True if the entity ID is selected.
	 */
	function has(entityType: EntityType, entityId: string): boolean {
		return selections[entityType].has(entityId);
	}

	/**
	 * Adds the given entity ID to the selection.
	 * @param entityType The type of entity.
	 * @param entityId The entity ID to add.
	 */
	function select(entityType: EntityType, entityId: string) {
		selections[entityType].select(entityId);
	}

	/**
	 * Removes the given entity ID from the selection.
	 * @param entityType The type of entity.
	 * @param entityId The entity ID to remove.
	 */
	function deselect(entityType: EntityType, entityId: string) {
		selections[entityType].deselect(entityId);
	}

	/**
	 * Resets the entity selection.
	 * @param entityType The type of entity.
	 */
	function reset(entityType: EntityType) {
		selections[entityType].reset();
	}

	/**
	 * Resets all selections.
	 */
	function resetAll() {
		Object.entries(selections).forEach(([, selection]) => {
			(selection as Selection).reset();
		});
	}

	/**
	 * Adds a side effect handler for selection change for a selection.
	 * @param handler Handler for the selection change.
	 * Takes the IDs which have been added and removed.
	 */
	function addSelectionChangeHandler(
		entityType: EntityType,
		handler: (addedIds: Array<string>, removedIds: Array<string>) => void
	) {
		selections[entityType].addSelectionChangeHandler(handler);
	}

	return {
		get tool() {
			return tool;
		},
		set tool(newVal) {
			tool = newVal;
		},
		get,
		has,
		select,
		deselect,
		reset,
		resetAll,
		addSelectionChangeHandler
	};
}
export type SelectionManager = ReturnType<typeof createSelectionManager>;
