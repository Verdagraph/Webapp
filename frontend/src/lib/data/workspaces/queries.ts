import triplit from '$data/triplit';

export const workspaceQuery = triplit.query('workspaces').Id('$query.id');

export const workspaceSlugQuery = triplit.query('workspaces').Where([
	['gardenId', '=', '$query.gardenId'],
	['slug', '=', '$query.workspaceSlug']
]);

export const workspacesQuery = triplit
	.query('workspaces')
	.Where(['gardenId', '=', '$query.gardenId']);

export const plantingAreaIdsQuery = triplit
	.query('plantingAreas')
	.Where(['locationHistory.workspaceIds', 'has', '$query.workspaceId'])
	.Select(['id']);

export const plantingAreaQuery = triplit
	.query('plantingAreas')
	.Id('$query.plantingAreaId')
	.Include('geometry', (rel) => rel('geometry').Include('linesCoordinates'))
	.Include('locationHistory', (rel) => rel('locationHistory').Include('locations'))
	.Limit(1);

export const plantingAreasQuery = triplit
	.query('plantingAreas')
	.Where('id', 'in', '$query.ids')
	.Include('geometry', (rel) => rel('geometry').Include('linesCoordinates'))
	.Include('locationHistory', (rel) => rel('locationHistory').Include('locations'));

export const plantingAreaSelectionQuery = triplit
	.query('plantingAreas')
	.Where('id', 'in', '$query.plantingAreaIds')
	.Select(['id', 'name']);
