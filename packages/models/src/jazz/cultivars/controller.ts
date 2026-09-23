import { AppError } from '../../errors.js';
import { mergeAttributes } from '../../utils/index.js';
import { type ControllerContext } from '../controller.js';
import { type JazzCultivar, type JazzCultivarCollection } from './schema.js';

const MAX_CULTIVAR_COLLECTION_INHERITANCE_DEPTH = 16;
const MAX_CULTIVAR_INHERITANCE_DEPTH = 16;

/** Stores an inheritance tree of cultivar collections. */
type CultivarCollectionInheritanceStructure = {
	collection: JazzCultivarCollection;
	parent?: CultivarCollectionInheritanceStructure;
};

/**
 * Retrieves all cultivar collections in a garden, into an inheritance
 * structure storing each collection as well as its parent, with a fixed
 * inheritance depth limit.
 */
export async function resolveCultivarCollections(
	gardenId: string,
	ctx: ControllerContext
): Promise<CultivarCollectionInheritanceStructure[]> {
	const gardenCollections = await ctx.db.all(
		ctx.jazz.cultivarCollections.where({ gardenId })
	);
	if (gardenCollections.length === 0) {
		return [];
	}

	const collections: CultivarCollectionInheritanceStructure[] = [];
	for (const collection of gardenCollections) {
		const branchStructure: CultivarCollectionInheritanceStructure = { collection };

		let currentBranch = branchStructure;
		for (let index = 0; index < MAX_CULTIVAR_COLLECTION_INHERITANCE_DEPTH; index++) {
			if (!currentBranch.collection.parentId) {
				break;
			}
			const parentCollection = await ctx.db.one(
				ctx.jazz.cultivarCollections.where({ id: currentBranch.collection.parentId })
			);
			if (!parentCollection) {
				break;
			}

			currentBranch.parent = { collection: parentCollection };
			currentBranch = currentBranch.parent;
		}

		collections.push(branchStructure);
	}

	return collections;
}

/**
 * Given a cultivar name, retrieves the matching cultivar ID in the garden.
 * Cultivar collections within the garden are queried, along with their
 * parent collections. Collections are sorted by priority. The first
 * cultivar with a matching name found in a search of each collection and
 * all its parents is returned; in the case of multiple matches in the same
 * collection, the newest is chosen.
 */
export async function resolveCultivarName(
	gardenId: string,
	cultivarName: string,
	ctx: ControllerContext
): Promise<string | null> {
	const collections = await resolveCultivarCollections(gardenId, ctx);
	if (collections.length === 0) {
		return null;
	}

	collections.sort((a, b) => a.collection.priority - b.collection.priority);

	for (const collection of collections) {
		let currentBranch: CultivarCollectionInheritanceStructure | undefined = collection;

		while (currentBranch) {
			const matchedCultivars = await ctx.db.all(
				ctx.jazz.cultivars.where({
					collectionId: currentBranch.collection.id,
					name: cultivarName
				})
			);
			if (matchedCultivars.length > 0) {
				if (matchedCultivars.length > 1) {
					matchedCultivars.sort(
						(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					);
				}
				return matchedCultivars[0].id;
			}

			currentBranch = currentBranch.parent;
		}
	}

	return null;
}

/**
 * Given a cultivar ID, resolves the full cultivar object. For cultivars
 * without parents, this is a simple ID query. For cultivars with parents,
 * all cultivars in the inheritance tree up to a fixed depth are retrieved,
 * with child cultivar attributes overriding parent attributes.
 */
async function resolveCultivarId(
	cultivarId: string,
	ctx: ControllerContext
): Promise<JazzCultivar | null> {
	const cultivar = (await ctx.db.one(
		ctx.jazz.cultivars.where({ id: cultivarId })
	)) as JazzCultivar | null;
	if (cultivar == null) {
		throw new AppError('Failed to fetch cultivar - invalid ID.', {
			nonFormErrors: ['Failed to fetch cultivar.']
		});
	}

	if (cultivar.parentId == null) return cultivar;

	const cultivars = [cultivar];
	let parentCultivarId: string | null = cultivar.parentId;
	for (let index = 0; index < MAX_CULTIVAR_INHERITANCE_DEPTH; index++) {
		const parentCultivar = (await ctx.db.one(
			ctx.jazz.cultivars.where({ id: parentCultivarId })
		)) as JazzCultivar | null;
		if (parentCultivar) {
			cultivars.push(parentCultivar);

			if (parentCultivar.parentId) {
				parentCultivarId = parentCultivar.parentId;
			} else {
				break;
			}
		} else {
			break;
		}
	}

	/** Merge all cultivar values, letting children override parents. */
	let result = cultivars[cultivars.length - 1];
	for (let index = cultivars.length - 2; index >= 0; index--) {
		result = mergeAttributes(result, cultivars[index]);
	}
	return result;
}

/** Given a cultivar name, resolve the full cultivar, with inherited attributes. */
export async function resolveCultivar(
	gardenId: string,
	cultivarName: string,
	ctx: ControllerContext
): Promise<JazzCultivar | null> {
	const cultivarId = await resolveCultivarName(gardenId, cultivarName, ctx);
	if (!cultivarId) return null;

	return resolveCultivarId(cultivarId, ctx);
}

/**
 * Retrieve all the cultivar names valid in a garden: all unique names
 * among all collections and parents of collections in the garden up to a
 * fixed inheritance level.
 */
export async function getAllCultivarNames(
	gardenId: string,
	ctx: ControllerContext
): Promise<string[]> {
	const collections = await resolveCultivarCollections(gardenId, ctx);
	if (collections.length === 0) {
		return [];
	}

	const collectionIds = new Set<string>();
	for (const collection of collections) {
		let currentBranch: CultivarCollectionInheritanceStructure | undefined = collection;

		while (currentBranch) {
			collectionIds.add(currentBranch.collection.id);
			currentBranch = currentBranch.parent;
		}
	}

	const cultivars = await ctx.db.all(
		ctx.jazz.cultivars.where({ collectionId: { in: [...collectionIds] } })
	);
	const names = new Set<string>(cultivars.map((cultivar) => cultivar.name));

	return Array.from(names);
}
