import triplit from '$data/triplit';

export const workspaceSlugQuery = triplit.query('workspaces').where([
	['gardenId', '=', '$query.gardenId'],
	['slug', '=', '$query.workspaceSlug']
]);

export const plantingAreaIdsQuery = triplit
	.query('plantingAreas')
	.where(['locationHistory.workspaceIds', 'has', '$query.workspaceId'])
	.select(['id']);

/** TODO: Update this query once linesCoordinates can be moved to linesAttributes.coordinates. */
export const plantingAreaQuery = triplit
	.query('plantingAreas')
	.id('$query.plantingAreaId')
	.include('geometry', (rel) => rel('geometry').include('linesCoordinates').build())
	.include('locationHistory', (rel) =>
		rel('locationHistory').include('locations').build()
	)
	.limit(1);

/** TODO: Update this query once linesCoordinates can be moved to linesAttributes.coordinates. */
export const plantingAreasQuery = triplit
	.query('plantingAreas')
	.where('id', 'in', '$query.ids')
	.include('geometry', (rel) => rel('geometry').include('linesCoordinates').build())
	.include('locationHistory', (rel) =>
		rel('locationHistory').include('locations').build()
	);

export const plantingAreaSelectionQuery = triplit
	.query('plantingAreas')
	.where('id', 'in', '$query.plantingAreaIds')
	.select(['id', 'name']);
