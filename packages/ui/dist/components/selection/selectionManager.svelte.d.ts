/**
 * The different type of selection states that can be used
 * to select entities in the editors.
 */
type SelectionTool = 'pointer' | 'group';
/**
 * Creates a manager for multiple sets of selected entity IDs.
 * @param entityTypes A list of strings to use for accessing each entity type.
 * @returns Selection manager.
 */
export declare function createSelectionManager<
	const EntityTypes extends readonly string[]
>(
	entityTypes: EntityTypes
): {
	tool: SelectionTool;
	get: (entityType: EntityTypes[number]) => Set<string>;
	has: (entityType: EntityTypes[number], entityId: string) => boolean;
	select: (entityType: EntityTypes[number], entityId: string) => void;
	deselect: (entityType: EntityTypes[number], entityId: string) => void;
	reset: (entityType: EntityTypes[number]) => void;
	resetAll: () => void;
	addSelectionChangeHandler: (
		entityType: EntityTypes[number],
		handler: (addedIds: Array<string>, removedIds: Array<string>) => void
	) => void;
};
export type SelectionManager = ReturnType<typeof createSelectionManager>;
export {};
//# sourceMappingURL=selectionManager.svelte.d.ts.map
