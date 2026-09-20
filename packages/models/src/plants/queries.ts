import { type QueryBuilder, or } from '@triplit/client';

import { type Plant } from './schema.js';

/**
 * Restricts a plants query to official garden state: plants that either
 * aren't staged in a draft bucket, or whose draft bucket has been committed.
 * Centralizes the filter so Action generation, yield totals, and any future
 * Generator input all read the same definition of "official" rather than
 * each repeating the condition themselves.
 */
export function excludeDraftPlants<Q extends QueryBuilder<any, 'plants', any>>(
	query: Q
): Q {
	return query.Where(
		or([
			['draftBucketId', '=', null],
			['draftBucket.committed', '=', true]
		])
	) as Q;
}

/**
 * The client-side equivalent of excludeDraftPlants' condition, for filtering
 * an already-fetched Plant array (e.g. one shared across several views, only
 * some of which want drafts excluded) rather than a live query. Requires the
 * plant's draftBucket relation to have been included in the fetch/query that
 * produced it, or committed status can't be checked.
 */
export function isDraftPlant(plant: Plant): boolean {
	return plant.draftBucketId != null && plant.draftBucket?.committed !== true;
}
