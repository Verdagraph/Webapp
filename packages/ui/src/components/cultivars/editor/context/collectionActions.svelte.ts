import {
	CultivarCollectionCreateCommandSchema,
	CultivarCollectionUpdateCommandSchema
} from '@vdg-webapp/models';

import { getAppContext } from '$state';
import createCommandHandler from '$state/commandHandler.svelte';
import { createForm } from '$state/form';

import type { EditorSelectionContext } from './selection.svelte';

/**
 * The create, update and delete forms and handlers of cultivar collections.
 * @param selection The detail pane selection, moved to the result of each action.
 */
export function createCollectionActions(selection: EditorSelectionContext) {
	const ctx = getAppContext();

	const createFormState = createForm(CultivarCollectionCreateCommandSchema, {
		handler: createCommandHandler(ctx.controller.cultivars.createCollection, {
			onSuccess: (collection) =>
				selection.select({ kind: 'collection', id: collection.id })
		}),
		initialValues: { gardenId: ctx.garden.id }
	});

	const updateFormState = createForm(CultivarCollectionUpdateCommandSchema, {
		handler: createCommandHandler(ctx.controller.cultivars.updateCollection),
		onSubmit: (data, handler) => {
			if (selection.selection?.kind === 'collection') {
				return handler.execute(selection.selection.id, data);
			}
		}
	});

	const deleteHandler = createCommandHandler(
		ctx.controller.cultivars.deleteCollection,
		{
			onSuccess: () => selection.select(null)
		}
	);

	/** Empties the create form, owning the collection by the current garden. */
	function resetCreateForm() {
		createFormState.reset({ gardenId: ctx.garden.id });
	}

	return {
		create: createFormState,
		update: updateFormState,
		delete: deleteHandler,
		resetCreateForm
	};
}
