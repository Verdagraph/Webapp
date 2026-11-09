/** The entity shown in the detail pane. */
export type EditorSelection = { kind: 'collection' | 'cultivar'; id: string };

/** A new entity being composed in the detail pane. */
export type EditorCreation =
	| { kind: 'collection' }
	| {
			kind: 'cultivar';
			collectionId: string;
			/** Values to start the form with, such as the cultivar being overridden. */
			seed?: { name?: string; abbreviation?: string; parentId?: string };
	  };

/**
 * Holds what the detail pane shows: an existing entity or a new one being created.
 */
export function createEditorSelection() {
	let selection: EditorSelection | null = $state(null);
	let creation: EditorCreation | null = $state(null);

	/** Shows an existing entity in the detail pane. */
	function select(newSelection: EditorSelection | null) {
		selection = newSelection;
		creation = null;
	}

	/** Shows the create form for a new entity in the detail pane. */
	function showCreation(newCreation: EditorCreation) {
		creation = newCreation;
		selection = null;
	}

	return {
		get selection() {
			return selection;
		},
		get creation() {
			return creation;
		},
		select,
		showCreation
	};
}
export type EditorSelectionContext = ReturnType<typeof createEditorSelection>;
