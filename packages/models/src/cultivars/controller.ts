import { type ControllerContext } from '../controller.js';
import { AppError } from '../errors.js';
import { type Cultivar, type CultivarCollection } from '../index.js';
import { slugify } from '../utils/index.js';
import {
	type CultivarCollectionCreateCommand,
	type CultivarCollectionUpdateCommand,
	type CultivarCreateCommand,
	type CultivarUpdateCommand
} from './commands.js';
import {
	type CultivarCollectionImportCommand,
	orderCultivarsParentsFirst
} from './exportImport.js';

const MAX_INHERITANCE_DEPTH = 16;

export class CultivarController {
	constructor(private ctx: ControllerContext) {}

	/**
	 * Authorizes the client to modify a collection and its cultivars.
	 * Garden-owned collections require the garden role; user-owned
	 * collections require the client to be the owner.
	 * @param collection The collection ownership fields to authorize against.
	 */
	async #requireCollectionEdit(
		collection: Pick<CultivarCollection, 'gardenId' | 'userId'>
	): Promise<void> {
		if (collection.gardenId) {
			await this.ctx.requireRole(collection.gardenId, 'CultivarCollectionEdit');
			return;
		}
		const client = await this.ctx.getClientOrError();
		if (!collection.userId || collection.userId !== client.profile.id) {
			throw new AppError('Not the collection owner.', {
				nonFormErrors: ['Only the owner of this collection may modify it.']
			});
		}
	}

	async #getCollectionOrError(id: string): Promise<CultivarCollection> {
		const collection = await this.ctx.triplit.fetchById('cultivarCollections', id);
		if (collection == null) {
			throw new AppError(`Failed to retrieve cultivar collection ${id}`, {
				nonFormErrors: ['Failed to retrieve cultivar collection.']
			});
		}
		return collection;
	}

	async #getCultivarOrError(id: string): Promise<Cultivar> {
		const cultivar = await this.ctx.triplit.fetchById('cultivars', id);
		if (cultivar == null) {
			throw new AppError(`Failed to retrieve cultivar ${id}`, {
				nonFormErrors: ['Failed to retrieve cultivar.']
			});
		}
		return cultivar;
	}

	/**
	 * Validates a collection's slug is unique among the collections of its owner.
	 * @param ownership The owner of the collection.
	 * @param slug The slug to check.
	 * @param excludeId A collection to ignore (the one being renamed).
	 */
	async #requireUniqueSlug(
		ownership: Pick<CultivarCollection, 'gardenId' | 'userId'>,
		slug: string,
		excludeId?: string
	): Promise<void> {
		const ownerFilter = ownership.gardenId
			? (['gardenId', '=', ownership.gardenId] as const)
			: (['userId', '=', ownership.userId] as const);
		const existing = await this.ctx.triplit.fetchOne(
			this.ctx.triplit
				.query('cultivarCollections')
				.Where([ownerFilter, ['slug', '=', slug]])
		);
		if (existing && existing.id !== excludeId) {
			throw new AppError('Cultivar collection slug already exists.', {
				fieldErrors: { name: ['This collection name already exists.'] }
			});
		}
	}

	/**
	 * Computes the denormalized ancestor ids for a collection with the given parent,
	 * rejecting cycles through `collectionId`.
	 * @param parentId The parent collection, if any.
	 * @param collectionId The collection being parented, if it exists yet.
	 * @returns The parent and the parent's ancestors.
	 */
	async #resolveAncestorIds(
		parentId: string | null | undefined,
		collectionId?: string
	): Promise<Set<string>> {
		if (!parentId) {
			return new Set();
		}
		if (parentId === collectionId) {
			throw new AppError('Collection cannot inherit from itself.', {
				fieldErrors: { parentId: ['A collection cannot inherit from itself.'] }
			});
		}
		const parent = await this.#getCollectionOrError(parentId);
		const ancestorIds = new Set<string>([...parent.ancestorIds, parent.id]);
		if (collectionId && ancestorIds.has(collectionId)) {
			throw new AppError('Cultivar collection inheritance cycle.', {
				fieldErrors: { parentId: ['This would create an inheritance cycle.'] }
			});
		}
		if (ancestorIds.size > MAX_INHERITANCE_DEPTH) {
			throw new AppError('Cultivar collection inheritance too deep.', {
				fieldErrors: {
					parentId: [`Inheritance is limited to ${MAX_INHERITANCE_DEPTH} levels.`]
				}
			});
		}
		return ancestorIds;
	}

	/**
	 * Validates a cultivar's parent is in the same collection or one of the
	 * collection's ancestors, and that it does not create a cycle.
	 * @param collection The collection the cultivar is in.
	 * @param parentId The proposed parent cultivar.
	 * @param cultivarId The cultivar being parented, if it exists yet.
	 */
	async #requireValidCultivarParent(
		collection: CultivarCollection,
		parentId: string,
		cultivarId?: string
	): Promise<void> {
		let currentId: string | null = parentId;
		for (let depth = 0; currentId && depth < MAX_INHERITANCE_DEPTH; depth++) {
			if (currentId === cultivarId) {
				throw new AppError('Cultivar inheritance cycle.', {
					fieldErrors: { parentId: ['This would create an inheritance cycle.'] }
				});
			}
			const current: Cultivar = await this.#getCultivarOrError(currentId);
			if (depth === 0) {
				const inScope =
					current.collectionId === collection.id ||
					collection.ancestorIds.has(current.collectionId);
				if (!inScope) {
					throw new AppError('Cultivar parent out of scope.', {
						fieldErrors: {
							parentId: [
								'The parent must be in this collection or a collection it inherits from.'
							]
						}
					});
				}
			}
			currentId = current.parentId ?? null;
		}
	}

	/** Validates the cultivar name is unique within its collection. */
	async #requireUniqueCultivarName(
		collectionId: string,
		name: string,
		excludeId?: string
	): Promise<void> {
		const existing = await this.ctx.triplit.fetchOne(
			this.ctx.triplit.query('cultivars').Where([
				['collectionId', '=', collectionId],
				['name', '=', name]
			])
		);
		if (existing && existing.id !== excludeId) {
			throw new AppError('Cultivar name already exists.', {
				fieldErrors: { name: ['This cultivar name already exists in this collection.'] }
			});
		}
	}

	/** Creates a cultivar collection owned by a garden or the client. */
	createCollection = async (
		data: CultivarCollectionCreateCommand
	): Promise<CultivarCollection> => {
		/** Garden ownership overrides user ownership. */
		const client = await this.ctx.getClientOrError();
		const ownership = data.gardenId
			? { gardenId: data.gardenId, userId: null }
			: { gardenId: null, userId: data.userId ?? client.profile.id };
		await this.#requireCollectionEdit(ownership);

		const slug = slugify(data.name);
		await this.#requireUniqueSlug(ownership, slug);
		const ancestorIds = await this.#resolveAncestorIds(data.parentId);

		return await this.ctx.triplit.insert('cultivarCollections', {
			...ownership,
			name: data.name,
			slug,
			visibility: data.visibility,
			description: data.description,
			tags: new Set(data.tags),
			parentId: data.parentId ?? null,
			ancestorIds
		});
	};

	/**
	 * Creates a collection and all of its cultivars from an export, in one transaction.
	 * Cultivars are inserted parents first so their parent ids can be resolved.
	 */
	importCollection = async (
		data: CultivarCollectionImportCommand
	): Promise<CultivarCollection> => {
		const client = await this.ctx.getClientOrError();
		const ownership = data.gardenId
			? { gardenId: data.gardenId, userId: null }
			: { gardenId: null, userId: data.userId ?? client.profile.id };
		await this.#requireCollectionEdit(ownership);

		const slug = slugify(data.collection.name);
		await this.#requireUniqueSlug(ownership, slug);
		const orderedCultivars = orderCultivarsParentsFirst(data.cultivars);

		let imported: CultivarCollection | undefined;
		await this.ctx.triplit.transact(async (transaction) => {
			const collection = await transaction.insert('cultivarCollections', {
				...ownership,
				name: data.collection.name,
				slug,
				visibility: data.collection.visibility ?? 'HIDDEN',
				description: data.collection.description ?? '',
				tags: new Set(data.collection.tags ?? [])
			});

			const idsByName = new Map<string, string>();
			for (const cultivar of orderedCultivars) {
				const inserted = await transaction.insert('cultivars', {
					collectionId: collection.id,
					name: cultivar.name,
					abbreviation: cultivar.abbreviation,
					scientificName: cultivar.scientificName,
					description: cultivar.description ?? '',
					parentId: cultivar.parentName
						? (idsByName.get(cultivar.parentName) ?? null)
						: null,
					attributes: cultivar.attributes ?? {}
				});
				idsByName.set(cultivar.name, inserted.id);
			}
			imported = collection;
		});
		if (!imported) {
			throw new AppError('Failed to import cultivar collection.', {
				nonFormErrors: ['Failed to import cultivar collection.']
			});
		}
		return imported;
	};

	/**
	 * Updates a cultivar collection. Reparenting rewrites the denormalized
	 * ancestorIds of the collection and all of its descendants.
	 */
	updateCollection = async (
		id: string,
		data: CultivarCollectionUpdateCommand
	): Promise<void> => {
		const collection = await this.#getCollectionOrError(id);
		await this.#requireCollectionEdit(collection);

		const newSlug = data.name ? slugify(data.name) : undefined;
		if (newSlug && newSlug !== collection.slug) {
			await this.#requireUniqueSlug(collection, newSlug, id);
		}

		const reparent =
			data.parentId !== undefined && data.parentId !== collection.parentId;
		const newAncestorIds = reparent
			? await this.#resolveAncestorIds(data.parentId, id)
			: collection.ancestorIds;

		await this.ctx.triplit.transact(async (transaction) => {
			await transaction.update('cultivarCollections', id, (draft) => {
				if (data.name && newSlug) {
					draft.name = data.name;
					draft.slug = newSlug;
				}
				if (data.visibility !== undefined) draft.visibility = data.visibility;
				if (data.description !== undefined) draft.description = data.description;
				if (data.tags !== undefined) draft.tags = new Set(data.tags);
				if (reparent) {
					draft.parentId = data.parentId ?? null;
					draft.ancestorIds = newAncestorIds;
				}
			});

			if (reparent) {
				await this.#rewriteDescendantAncestors(transaction, id, newAncestorIds);
			}
		});
	};

	/**
	 * Rewrites the ancestorIds of every descendant of a collection after it moved.
	 * @param transaction The transaction to write in.
	 * @param collectionId The collection which moved.
	 * @param collectionAncestorIds The collection's new ancestors.
	 */
	async #rewriteDescendantAncestors(
		transaction: Parameters<Parameters<ControllerContext['triplit']['transact']>[0]>[0],
		collectionId: string,
		collectionAncestorIds: Set<string>
	): Promise<void> {
		const descendants = await this.ctx.triplit.fetch(
			this.ctx.triplit
				.query('cultivarCollections')
				.Where(['ancestorIds', 'has', collectionId])
		);
		/** Parents are processed before their children, shallowest first. */
		descendants.sort((a, b) => a.ancestorIds.size - b.ancestorIds.size);

		const resolved = new Map<string, Set<string>>([
			[collectionId, collectionAncestorIds]
		]);
		for (const descendant of descendants) {
			const parentAncestorIds = resolved.get(descendant.parentId ?? '');
			if (!parentAncestorIds) continue;
			const ancestorIds = new Set<string>([...parentAncestorIds, descendant.parentId!]);
			resolved.set(descendant.id, ancestorIds);
			await transaction.update('cultivarCollections', descendant.id, (draft) => {
				draft.ancestorIds = ancestorIds;
			});
		}
	}

	/**
	 * Deletes a cultivar collection. Per the design, child collections which
	 * inherit from it first receive a copy of its cultivars (except names they
	 * already define), and are reparented to its parent.
	 */
	deleteCollection = async (id: string): Promise<void> => {
		const collection = await this.#getCollectionOrError(id);
		await this.#requireCollectionEdit(collection);

		const collectionCultivars = await this.ctx.triplit.fetch(
			this.ctx.triplit.query('cultivars').Where(['collectionId', '=', id])
		);
		/** Parents before children, so copies can be re-linked as they are made. */
		const cultivarIds = new Set(collectionCultivars.map((cultivar) => cultivar.id));
		const orderedCultivars = [...collectionCultivars].sort(
			(a, b) =>
				this.#depthWithin(a, collectionCultivars) -
				this.#depthWithin(b, collectionCultivars)
		);

		const children = await this.ctx.triplit.fetch(
			this.ctx.triplit.query('cultivarCollections').Where(['parentId', '=', id])
		);
		const descendants = await this.ctx.triplit.fetch(
			this.ctx.triplit.query('cultivarCollections').Where(['ancestorIds', 'has', id])
		);

		await this.ctx.triplit.transact(async (transaction) => {
			for (const child of children) {
				const subtreeIds = [
					child.id,
					...descendants
						.filter((descendant) => descendant.ancestorIds.has(child.id))
						.map((descendant) => descendant.id)
				];
				const subtreeCultivars = await this.ctx.triplit.fetch(
					this.ctx.triplit.query('cultivars').Where(['collectionId', 'in', subtreeIds])
				);
				const childNames = new Map(
					subtreeCultivars
						.filter((cultivar) => cultivar.collectionId === child.id)
						.map((cultivar) => [cultivar.name, cultivar.id])
				);

				/** Maps deleted cultivar ids to their replacement in this child. */
				const replacementIds = new Map<string, string>();
				for (const cultivar of orderedCultivars) {
					const existingId = childNames.get(cultivar.name);
					if (existingId) {
						replacementIds.set(cultivar.id, existingId);
						continue;
					}
					const parentId = cultivar.parentId
						? (replacementIds.get(cultivar.parentId) ?? cultivar.parentId)
						: null;
					const copy = await transaction.insert('cultivars', {
						collectionId: child.id,
						name: cultivar.name,
						abbreviation: cultivar.abbreviation,
						scientificName: cultivar.scientificName,
						description: cultivar.description,
						attributes: cultivar.attributes,
						parentId
					});
					replacementIds.set(cultivar.id, copy.id);
				}

				/** Re-link cultivars in the subtree which inherited from a deleted cultivar. */
				for (const subtreeCultivar of subtreeCultivars) {
					const replacementId =
						subtreeCultivar.parentId && cultivarIds.has(subtreeCultivar.parentId)
							? replacementIds.get(subtreeCultivar.parentId)
							: undefined;
					if (replacementId) {
						await transaction.update('cultivars', subtreeCultivar.id, (draft) => {
							draft.parentId = replacementId;
						});
					}
				}

				const newAncestorIds = new Set(
					[...collection.ancestorIds].filter((ancestorId) => ancestorId !== id)
				);
				await transaction.update('cultivarCollections', child.id, (draft) => {
					draft.parentId = collection.parentId;
					draft.ancestorIds = newAncestorIds;
				});
				await this.#rewriteDescendantAncestors(transaction, child.id, newAncestorIds);
			}

			for (const cultivar of collectionCultivars) {
				await transaction.delete('cultivars', cultivar.id);
			}
			await transaction.delete('cultivarCollections', id);
		});
	};

	/** Number of ancestors a cultivar has within the given set. */
	#depthWithin(cultivar: Cultivar, scope: Cultivar[]): number {
		const byId = new Map(scope.map((entry) => [entry.id, entry]));
		let depth = 0;
		let current: Cultivar | undefined = cultivar;
		while (
			current?.parentId &&
			byId.has(current.parentId) &&
			depth < MAX_INHERITANCE_DEPTH
		) {
			current = byId.get(current.parentId);
			depth++;
		}
		return depth;
	}

	/** Creates a cultivar in a collection. */
	createCultivar = async (data: CultivarCreateCommand): Promise<Cultivar> => {
		const collection = await this.#getCollectionOrError(data.collectionId);
		await this.#requireCollectionEdit(collection);
		await this.#requireUniqueCultivarName(collection.id, data.name);
		if (data.parentId) {
			await this.#requireValidCultivarParent(collection, data.parentId);
		}

		return await this.ctx.triplit.insert('cultivars', {
			collectionId: collection.id,
			name: data.name,
			abbreviation: data.abbreviation,
			scientificName: data.scientificName,
			description: data.description,
			parentId: data.parentId ?? null,
			attributes: data.attributes ?? {}
		});
	};

	/** Updates a cultivar. Attributes, if present, replace the stored attributes. */
	updateCultivar = async (id: string, data: CultivarUpdateCommand): Promise<void> => {
		const cultivar = await this.#getCultivarOrError(id);
		const collection = await this.#getCollectionOrError(cultivar.collectionId);
		await this.#requireCollectionEdit(collection);

		if (data.name && data.name !== cultivar.name) {
			await this.#requireUniqueCultivarName(collection.id, data.name, id);
		}
		if (data.parentId) {
			await this.#requireValidCultivarParent(collection, data.parentId, id);
		}

		await this.ctx.triplit.update('cultivars', id, (draft) => {
			if (data.name !== undefined) draft.name = data.name;
			if (data.abbreviation !== undefined) draft.abbreviation = data.abbreviation;
			if (data.scientificName !== undefined) draft.scientificName = data.scientificName;
			if (data.description !== undefined) draft.description = data.description;
			if (data.parentId !== undefined) draft.parentId = data.parentId;
			if (data.attributes) draft.attributes = data.attributes;
		});
	};

	/** Deletes a cultivar. Cultivars which inherited from it are reparented to its parent. */
	deleteCultivar = async (id: string): Promise<void> => {
		const cultivar = await this.#getCultivarOrError(id);
		const collection = await this.#getCollectionOrError(cultivar.collectionId);
		await this.#requireCollectionEdit(collection);

		const children = await this.ctx.triplit.fetch(
			this.ctx.triplit.query('cultivars').Where(['parentId', '=', id])
		);
		await this.ctx.triplit.transact(async (transaction) => {
			for (const child of children) {
				await transaction.update('cultivars', child.id, (draft) => {
					draft.parentId = cultivar.parentId;
				});
			}
			await transaction.delete('cultivars', id);
		});
	};
}
