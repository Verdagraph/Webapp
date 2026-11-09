import { BulkInsert } from '@triplit/client';

import { defaultCultivarRows } from '../../src/cultivars/defaults/index.js';
import { schema } from '../schema.js';

/**
 * Only the system-owned default cultivar collection, for a database which has real users and
 * should not get the development data. Run with `triplit seed run defaults`.
 */
export default function seed(): BulkInsert<typeof schema> {
	const defaults = defaultCultivarRows();
	return { cultivarCollections: [defaults.collection], cultivars: defaults.cultivars };
}
