import triplit from '$data/triplit';

export const workspaceSlugQuery = triplit.query('workspaces').where([
	['gardenId', '=', '$query.gardenId'],
	['slug', '=', '$query.workspaceSlug']
]);
