import { type BulkInsert } from '@triplit/client';

import { gardenCultivarCollectionRow, schema } from '@vdg-webapp/models';
import { defaultCultivarRows } from '@vdg-webapp/models/defaults';

import { garden } from './garden';

/**
 * The default cultivar collection, owned by nobody, and the garden's own collection
 * which inherits it. This is how a real garden gets its cultivars.
 */
export default function cultivarsSeed(): BulkInsert<typeof schema> {
	const defaults = defaultCultivarRows();
	return {
		cultivarCollections: [
			defaults.collection,
			{
				id: 'garden-cultivars',
				...gardenCultivarCollectionRow(garden.id, defaults.collection)
			}
		],
		cultivars: defaults.cultivars
	};
}
