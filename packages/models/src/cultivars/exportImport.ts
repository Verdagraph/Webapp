import { z } from 'zod';

import { AppError } from '../errors.js';
import {
	CultivarCollectionUpdateCommandSchema,
	CultivarUpdateCommandSchema,
	cultivarFields
} from './commands.js';
import { type Cultivar, type CultivarCollection } from './schema.js';

/** Bump when the export format changes incompatibly. */
export const CULTIVAR_COLLECTION_EXPORT_VERSION = 1;

/**
 * Portable form of a cultivar collection and its cultivars. Composed from the
 * update commands so new fields and attribute profiles are carried
 * automatically. Ids are omitted, and a cultivar's parent is referenced by
 * name within the collection, so imports never collide with existing rows.
 */
export const CultivarCollectionExportSchema = z.object({
	version: z.literal(CULTIVAR_COLLECTION_EXPORT_VERSION),
	collection: CultivarCollectionUpdateCommandSchema.omit({ parentId: true }).required({
		name: true
	}),
	cultivars: z.array(
		CultivarUpdateCommandSchema.omit({ parentId: true })
			.required({ name: true, abbreviation: true })
			.extend({ parentName: cultivarFields.cultivarNameSchema.optional() })
	)
});
export type CultivarCollectionExport = z.infer<typeof CultivarCollectionExportSchema>;

/**
 * Command to create a collection and its cultivars from an export.
 * Owned by the garden if one is given, otherwise by the user.
 */
export const CultivarCollectionImportCommandSchema =
	CultivarCollectionExportSchema.extend({
		gardenId: z.string().optional(),
		userId: z.string().optional()
	});
export type CultivarCollectionImportCommand = z.infer<
	typeof CultivarCollectionImportCommandSchema
>;

/**
 * Builds the export of a collection. A cultivar whose parent is outside the
 * collection (inherited from an ancestor collection) is exported without it.
 * @param collection The collection to export.
 * @param collectionCultivars The cultivars stored in the collection.
 * @returns The export.
 */
export function exportCultivarCollection(
	collection: CultivarCollection,
	collectionCultivars: Cultivar[]
): CultivarCollectionExport {
	const namesById = new Map(
		collectionCultivars.map((cultivar) => [cultivar.id, cultivar.name])
	);
	return CultivarCollectionExportSchema.parse({
		version: CULTIVAR_COLLECTION_EXPORT_VERSION,
		collection: {
			name: collection.name,
			visibility: collection.visibility,
			description: collection.description,
			tags: [...collection.tags]
		},
		cultivars: collectionCultivars.map((cultivar) => ({
			name: cultivar.name,
			abbreviation: cultivar.abbreviation,
			scientificName: cultivar.scientificName ?? undefined,
			description: cultivar.description,
			parentName: cultivar.parentId ? namesById.get(cultivar.parentId) : undefined,
			attributes: cultivar.attributes
		}))
	});
}

/**
 * Orders exported cultivars so each follows its parent, and rejects
 * duplicate names, unknown parents and cycles.
 * @param cultivars The exported cultivars.
 * @returns The cultivars, parents first.
 */
export function orderCultivarsParentsFirst(
	cultivars: CultivarCollectionExport['cultivars']
): CultivarCollectionExport['cultivars'] {
	const names = new Set<string>();
	for (const cultivar of cultivars) {
		if (names.has(cultivar.name)) {
			throw new AppError('Duplicate cultivar name in import.', {
				nonFormErrors: [`The cultivar name "${cultivar.name}" appears more than once.`]
			});
		}
		names.add(cultivar.name);
	}

	const ordered: CultivarCollectionExport['cultivars'] = [];
	const placed = new Set<string>();
	let remaining = [...cultivars];
	while (remaining.length > 0) {
		const ready = remaining.filter(
			(cultivar) => !cultivar.parentName || placed.has(cultivar.parentName)
		);
		if (ready.length === 0) {
			throw new AppError('Unresolvable cultivar parents in import.', {
				nonFormErrors: [
					`Cultivar parents are missing or form a cycle: ${remaining.map((cultivar) => cultivar.name).join(', ')}.`
				]
			});
		}
		for (const cultivar of ready) {
			ordered.push(cultivar);
			placed.add(cultivar.name);
		}
		remaining = remaining.filter((cultivar) => !placed.has(cultivar.name));
	}
	return ordered;
}
