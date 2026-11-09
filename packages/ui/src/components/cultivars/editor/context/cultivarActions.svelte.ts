import {
	CultivarCreateCommandSchema,
	CultivarUpdateCommandSchema
} from '@vdg-webapp/models';

import { getAppContext } from '$state';
import createCommandHandler from '$state/commandHandler.svelte';
import { createForm } from '$state/form';

import type { EditorSelectionContext } from './selection.svelte';

/**
 * The create, update and delete forms and handlers of cultivars.
 * @param selection The detail pane selection, moved to the result of each action.
 */
export function createCultivarActions(selection: EditorSelectionContext) {
	const ctx = getAppContext();

	const createHandler = createCommandHandler(ctx.controller.cultivars.createCultivar, {
		onSuccess: (cultivar) => selection.select({ kind: 'cultivar', id: cultivar.id })
	});
	const createFormState = createForm(CultivarCreateCommandSchema, {
		onSubmit: (data) => createHandler.execute(data)
	});

	const updateHandler = createCommandHandler(ctx.controller.cultivars.updateCultivar);
	const updateFormState = createForm(CultivarUpdateCommandSchema, {
		onSubmit: (data) => {
			if (selection.selection?.kind === 'cultivar') {
				return updateHandler.execute(selection.selection.id, data);
			}
		}
	});

	const deleteHandler = createCommandHandler(ctx.controller.cultivars.deleteCultivar, {
		onSuccess: () => selection.select(null)
	});

	/**
	 * Empties the create form for a new cultivar in a collection.
	 * @param collectionId The collection the cultivar is added to.
	 * @param seed Values to start the form with, such as the cultivar being overridden.
	 */
	function resetCreateForm(
		collectionId: string,
		seed?: Omit<
			NonNullable<Parameters<typeof createFormState.reset>[0]>,
			'collectionId'
		>
	) {
		createFormState.reset({ ...seed, collectionId });
	}

	return {
		create: { handler: createHandler, form: createFormState },
		update: { handler: updateHandler, form: updateFormState },
		delete: { handler: deleteHandler },
		resetCreateForm
	};
}
