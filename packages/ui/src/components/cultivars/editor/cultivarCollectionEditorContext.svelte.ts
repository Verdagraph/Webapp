import { getContext, setContext } from 'svelte';

import { createCollectionActions } from './context/collectionActions.svelte';
import { createCultivarActions } from './context/cultivarActions.svelte';
import { createJsonImport } from './context/jsonImport.svelte';
import { type EditorCreation, createEditorSelection } from './context/selection.svelte';

export type { EditorCreation, EditorSelection } from './context/selection.svelte';

const cultivarCollectionEditorContextKey = 'cultivarCollectionEditorContext';

/**
 * Holds context for the cultivar collection editor, composed of sub-contexts:
 * the detail pane selection, and the actions on collections, cultivars and JSON imports.
 */
export function createCultivarCollectionEditorContext() {
	const selection = createEditorSelection();
	const collections = createCollectionActions(selection);
	const cultivars = createCultivarActions(selection);
	const jsonImport = createJsonImport(selection);

	/** Shows an empty create form in the detail pane. */
	function startCreation(creation: EditorCreation) {
		selection.showCreation(creation);
		if (creation.kind === 'collection') {
			collections.resetCreateForm();
		} else {
			cultivars.resetCreateForm(creation.collectionId);
		}
	}

	return {
		get selection() {
			return selection.selection;
		},
		get creation() {
			return selection.creation;
		},
		select: selection.select,
		startCreation,
		collectionCreate: collections.create,
		collectionUpdate: collections.update,
		collectionDelete: collections.delete,
		collectionImport: { handler: jsonImport.handler },
		importCollectionFile: jsonImport.importFile,
		get importError() {
			return jsonImport.error;
		},
		cultivarCreate: cultivars.create,
		cultivarUpdate: cultivars.update,
		cultivarDelete: cultivars.delete
	};
}
export type CultivarCollectionEditorContext = ReturnType<
	typeof createCultivarCollectionEditorContext
>;

export function setCultivarCollectionEditorContext() {
	return setContext(
		cultivarCollectionEditorContextKey,
		createCultivarCollectionEditorContext()
	);
}

export function getCultivarCollectionEditorContext() {
	return getContext<CultivarCollectionEditorContext>(
		cultivarCollectionEditorContextKey
	);
}
