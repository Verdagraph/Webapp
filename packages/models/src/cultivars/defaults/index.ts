import { slugify } from '../../utils/slugify.js';
import { CultivarCollectionExportSchema } from '../exportImport.js';
import { cultivarCollectionRows } from '../rows.js';
import { DEFAULT_CULTIVAR_COLLECTION_ID } from '../system.js';
import westCoastSeedsData from './west-coast-seeds.json' with { type: 'json' };

/**
 * The default cultivar collections shipped with the app. Kept out of the package's main entry
 * (import it from '@vdg-webapp/models/defaults') so the data is only bundled where it is used.
 */

/** The West Coast Seeds collection, validated. */
export const westCoastSeedsExport =
	CultivarCollectionExportSchema.parse(westCoastSeedsData);

/**
 * Rows for the system-owned default collection and its cultivars, with stable ids
 * so seeding it again updates the same rows.
 * @returns The collection and cultivar rows.
 */
export function defaultCultivarRows() {
	const used = new Set<string>();
	return cultivarCollectionRows(westCoastSeedsExport, {
		collectionId: DEFAULT_CULTIVAR_COLLECTION_ID,
		slug: DEFAULT_CULTIVAR_COLLECTION_ID,
		cultivarId: (name) => {
			const base = `${DEFAULT_CULTIVAR_COLLECTION_ID}-${slugify(name) || 'cultivar'}`;
			let id = base;
			for (let suffix = 2; used.has(id); suffix++) id = `${base}-${suffix}`;
			used.add(id);
			return id;
		}
	});
}
