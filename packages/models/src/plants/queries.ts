import { type QueryBuilder, or } from '@triplit/client';

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
