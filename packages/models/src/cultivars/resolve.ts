import { mergeAttributes } from '../utils/index.js';
import { allCultivarNames, normalizeCultivarName } from './names.js';
import type { Cultivar, CultivarCollection } from './schema.js';

const MAX_INHERITANCE_DEPTH = 16;

/**
 * Merges a cultivar with the cultivars it inherits from, child values replacing parent values.
 * Tags are the exception: they accumulate down the chain.
 * @param chain The cultivar first, then its parent, then the parent's parent.
 * @returns The cultivar with inherited values.
 */
export function mergeCultivarChain(chain: Cultivar[]): Cultivar {
	let result = chain[chain.length - 1];
	for (let i = chain.length - 2; i >= 0; i--) {
		result = mergeAttributes(result, chain[i]);
	}
	if (chain.length > 1) {
		result.tags = new Set(chain.flatMap((entry) => [...entry.tags]));
	}
	return result;
}

/** Looks cultivars up by name, with inherited values, from rows already loaded. */
export type CultivarIndex = {
	/** The cultivar a name resolves to, with inherited values, or null. */
	find: (name: string) => Cultivar | null;
	/** Every cultivar a name can resolve to, with inherited values, once each. */
	all: () => Cultivar[];
};

/**
 * Builds an index which resolves names exactly as `resolveCultivar` does, without a query per name.
 * Names are found in the roots in order of priority (higher first), and within a root in the
 * collection itself before the collections it inherits from. A name in an earlier collection hides
 * the same name in a later one.
 * @param input The loaded rows.
 * @param input.collections Every loaded collection: the roots and the collections they inherit from.
 * @param input.roots The collections to resolve from, such as a garden's own collections.
 * @param input.cultivars Every loaded cultivar in those collections.
 * @returns The index.
 */
export function createCultivarIndex(input: {
	collections: CultivarCollection[];
	roots: CultivarCollection[];
	cultivars: Cultivar[];
}): CultivarIndex {
	const collectionsById = new Map(
		input.collections.map((collection) => [collection.id, collection])
	);
	const cultivarsById = new Map(
		input.cultivars.map((cultivar) => [cultivar.id, cultivar])
	);
	const cultivarsByCollection = new Map<string, Cultivar[]>();
	for (const cultivar of input.cultivars) {
		const list = cultivarsByCollection.get(cultivar.collectionId) ?? [];
		list.push(cultivar);
		cultivarsByCollection.set(cultivar.collectionId, list);
	}

	const winners = new Map<string, Cultivar>();
	const roots = [...input.roots].sort((a, b) => b.priority - a.priority);
	for (const root of roots) {
		let collection: CultivarCollection | undefined = root;
		for (let depth = 0; collection && depth < MAX_INHERITANCE_DEPTH; depth++) {
			/** Newest first, so a repeated name in one collection resolves to the newest. */
			const members = [...(cultivarsByCollection.get(collection.id) ?? [])].sort(
				(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
			);
			for (const cultivar of members) {
				for (const name of allCultivarNames(cultivar)) {
					const key = normalizeCultivarName(name);
					if (!winners.has(key)) winners.set(key, cultivar);
				}
			}
			collection = collection.parentId
				? collectionsById.get(collection.parentId)
				: undefined;
		}
	}

	const resolved = new Map<string, Cultivar>();
	function resolve(cultivar: Cultivar): Cultivar {
		const cached = resolved.get(cultivar.id);
		if (cached) return cached;
		const chain = [cultivar];
		let parentId = cultivar.parentId;
		for (let depth = 0; parentId && depth < MAX_INHERITANCE_DEPTH; depth++) {
			const parent = cultivarsById.get(parentId);
			if (!parent) break;
			chain.push(parent);
			parentId = parent.parentId;
		}
		const merged = mergeCultivarChain(chain);
		resolved.set(cultivar.id, merged);
		return merged;
	}

	return {
		find: (name) => {
			const winner = winners.get(normalizeCultivarName(name));
			return winner ? resolve(winner) : null;
		},
		all: () => [...new Set(winners.values())].map(resolve)
	};
}
