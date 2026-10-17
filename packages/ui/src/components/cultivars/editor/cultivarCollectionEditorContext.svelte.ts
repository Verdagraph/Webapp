import { getContext, setContext } from 'svelte';

import {
	CultivarCollectionCreateCommandSchema,
	CultivarCollectionExportSchema,
	CultivarCollectionUpdateCommandSchema,
	CultivarCreateCommandSchema,
	CultivarUpdateCommandSchema
} from '@vdg-webapp/models';

import { getAppContext } from '$state';
import createCommandHandler from '$state/commandHandler.svelte';
import { createForm } from '$state/form';

const cultivarCollectionEditorContextKey = 'cultivarCollectionEditorContext';

/** The entity shown in the detail pane. */
export type EditorSelection = { kind: 'collection' | 'cultivar'; id: string };

/** A new entity being composed in the detail pane. */
export type EditorCreation =
	| { kind: 'collection' }
	| { kind: 'cultivar'; collectionId: string };

/**
 * Holds context for the cultivar collection editor: the tree selection,
 * and the form and handler of each action.
 */
export function createCultivarCollectionEditorContext() {
	const ctx = getAppContext();

	let selection: EditorSelection | null = $state(null);
	let creation: EditorCreation | null = $state(null);

	/** Shows an existing entity in the detail pane. */
	function select(newSelection: EditorSelection | null) {
		selection = newSelection;
		creation = null;
	}

	/** Shows an empty create form in the detail pane. */
	function startCreation(newCreation: EditorCreation) {
		creation = newCreation;
		selection = null;
		if (newCreation.kind === 'collection') {
			collectionCreateForm.reset({ gardenId: ctx.garden.id });
		} else {
			cultivarCreateForm.reset({ collectionId: newCreation.collectionId });
		}
	}

	/** Collections. */
	const collectionCreateHandler = createCommandHandler(
		ctx.controller.cultivars.createCollection,
		{ onSuccess: (collection) => select({ kind: 'collection', id: collection.id }) }
	);
	const collectionCreateForm = createForm(CultivarCollectionCreateCommandSchema, {
		initialValues: { gardenId: ctx.garden.id },
		onSubmit: (data) => collectionCreateHandler.execute(data)
	});
	const collectionUpdateHandler = createCommandHandler(
		ctx.controller.cultivars.updateCollection
	);
	const collectionUpdateForm = createForm(CultivarCollectionUpdateCommandSchema, {
		onSubmit: (data) => {
			if (selection?.kind === 'collection') {
				return collectionUpdateHandler.execute(selection.id, data);
			}
		}
	});
	const collectionDeleteHandler = createCommandHandler(
		ctx.controller.cultivars.deleteCollection,
		{ onSuccess: () => select(null) }
	);

	/** JSON import: the file is validated before anything is written. */
	let importError: string | null = $state(null);
	const collectionImportHandler = createCommandHandler(
		ctx.controller.cultivars.importCollection,
		{ onSuccess: (collection) => select({ kind: 'collection', id: collection.id }) }
	);
	async function importCollectionFile(file: File) {
		importError = null;
		let parsed: unknown;
		try {
			parsed = JSON.parse(await file.text());
		} catch {
			importError = 'The file is not valid JSON.';
			return;
		}
		const result = CultivarCollectionExportSchema.safeParse(parsed);
		if (!result.success) {
			const issue = result.error.issues[0];
			importError = `Invalid cultivar collection file: ${issue.path.join('.') || 'file'} - ${issue.message}`;
			return;
		}
		await collectionImportHandler.execute({ ...result.data, gardenId: ctx.garden.id });
	}

	/** Cultivars. */
	const cultivarCreateHandler = createCommandHandler(
		ctx.controller.cultivars.createCultivar,
		{ onSuccess: (cultivar) => select({ kind: 'cultivar', id: cultivar.id }) }
	);
	const cultivarCreateForm = createForm(CultivarCreateCommandSchema, {
		onSubmit: (data) => cultivarCreateHandler.execute(data)
	});
	const cultivarUpdateHandler = createCommandHandler(
		ctx.controller.cultivars.updateCultivar
	);
	const cultivarUpdateForm = createForm(CultivarUpdateCommandSchema, {
		onSubmit: (data) => {
			if (selection?.kind === 'cultivar') {
				return cultivarUpdateHandler.execute(selection.id, data);
			}
		}
	});
	const cultivarDeleteHandler = createCommandHandler(
		ctx.controller.cultivars.deleteCultivar,
		{ onSuccess: () => select(null) }
	);

	return {
		get selection() {
			return selection;
		},
		get creation() {
			return creation;
		},
		select,
		startCreation,
		collectionCreate: { handler: collectionCreateHandler, form: collectionCreateForm },
		collectionUpdate: { handler: collectionUpdateHandler, form: collectionUpdateForm },
		collectionDelete: { handler: collectionDeleteHandler },
		collectionImport: { handler: collectionImportHandler },
		importCollectionFile,
		get importError() {
			return importError;
		},
		cultivarCreate: { handler: cultivarCreateHandler, form: cultivarCreateForm },
		cultivarUpdate: { handler: cultivarUpdateHandler, form: cultivarUpdateForm },
		cultivarDelete: { handler: cultivarDeleteHandler }
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
