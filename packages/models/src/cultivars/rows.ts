import { attributesToStored } from './attributes/index.js';
import {
	type CultivarCollectionExport,
	orderCultivarsParentsFirst
} from './exportImport.js';
import { normalizeCultivarName } from './names.js';
import type { Cultivar, CultivarCollection } from './schema.js';

type CollectionRow = Omit<CultivarCollection, 'createdAt'>;
type CultivarRow = Omit<Cultivar, 'createdAt'>;

export type CultivarCollectionRowsOptions = {
	collectionId: string;
	slug: string;
	/** Owner. Leave both unset for a system-owned collection. */
	gardenId?: string | null;
	userId?: string | null;
	/** Collection the new one inherits from, with that collection's own ancestors. */
	parentId?: string | null;
	parentAncestorIds?: Iterable<string>;
	/** Makes the id of a cultivar from its primary name, so ids can be stable between runs. */
	cultivarId: (name: string) => string;
};

/**
 * Turns a collection export into the rows to insert. Cultivars come out parents first,
 * with parent references resolved by name. Nothing is read or written here.
 * @param data The export.
 * @param options Ids and ownership for the new rows.
 * @returns The collection row and its cultivar rows.
 */
export function cultivarCollectionRows(
	data: CultivarCollectionExport,
	options: CultivarCollectionRowsOptions
): { collection: CollectionRow; cultivars: CultivarRow[] } {
	const ordered = orderCultivarsParentsFirst(data.cultivars);
	const ancestorIds = new Set<string>(
		options.parentId ? [options.parentId, ...(options.parentAncestorIds ?? [])] : []
	);

	const collection: CollectionRow = {
		id: options.collectionId,
		name: data.collection.name,
		slug: options.slug,
		visibility: data.collection.visibility ?? 'HIDDEN',
		description: data.collection.description ?? '',
		tags: new Set(data.collection.tags ?? []),
		userId: options.userId ?? null,
		gardenId: options.gardenId ?? null,
		priority: 0,
		parentId: options.parentId ?? null,
		ancestorIds
	};

	const idsByName = new Map<string, string>();
	const cultivars: CultivarRow[] = ordered.map((cultivar) => {
		const id = options.cultivarId(cultivar.name);
		idsByName.set(normalizeCultivarName(cultivar.name), id);
		return {
			id,
			collectionId: options.collectionId,
			name: cultivar.name,
			names: new Set(cultivar.names ?? []),
			category: cultivar.category ?? null,
			tags: new Set(cultivar.tags ?? []),
			abbreviation: cultivar.abbreviation,
			scientificName: cultivar.scientificName,
			description: cultivar.description ?? '',
			parentId: cultivar.parentName
				? (idsByName.get(normalizeCultivarName(cultivar.parentName)) ?? null)
				: null,
			attributes: attributesToStored(cultivar.attributes) as Cultivar['attributes']
		};
	});
	return { collection, cultivars };
}

/**
 * The cultivar collection a garden starts with: empty, and inheriting the default collection
 * so the garden has its cultivars. Gardens add their own cultivars and overrides here.
 * @param gardenId The garden that owns the collection.
 * @param parent The collection to inherit.
 * @returns The collection row, without an id.
 */
export function gardenCultivarCollectionRow(
	gardenId: string,
	parent: Pick<CultivarCollection, 'id' | 'ancestorIds'>
): Omit<CollectionRow, 'id'> {
	return {
		name: 'Garden cultivars',
		slug: 'cultivars',
		visibility: 'HIDDEN',
		description:
			'Cultivars specific to this garden. It inherits the default cultivars.',
		tags: new Set(),
		userId: null,
		gardenId,
		priority: 0,
		parentId: parent.id,
		ancestorIds: new Set([parent.id, ...parent.ancestorIds])
	};
}
