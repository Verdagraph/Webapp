import { CultivarCollectionExportSchema } from '@vdg-webapp/models';

import { getAppContext } from '$state';
import createCommandHandler from '$state/commandHandler.svelte';

import type { EditorSelectionContext } from './selection.svelte';

/**
 * Imports a cultivar collection from a JSON file into the garden.
 * The file is validated before anything is written.
 * @param selection The detail pane selection, moved to the imported collection.
 */
export function createJsonImport(selection: EditorSelectionContext) {
	const ctx = getAppContext();

	let importError: string | null = $state(null);
	const handler = createCommandHandler(ctx.controller.cultivars.importCollection, {
		onSuccess: (collection) =>
			selection.select({ kind: 'collection', id: collection.id })
	});

	/** Reads, validates and imports a file. Problems are reported through `error`. */
	async function importFile(file: File) {
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
		await handler.execute({ ...result.data, gardenId: ctx.garden.id });
	}

	return {
		handler,
		importFile,
		get error() {
			return importError;
		}
	};
}
