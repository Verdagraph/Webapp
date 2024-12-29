import triplit from '$data/triplit';
import { workspaceSlugQuery } from '$data/workspaces/queries.js';

/**
 * Retrieve the workspace.
 */
export async function load({ params }) {
	const workspace = await triplit.fetchOne(
		workspaceSlugQuery
			.vars({ gardenId: params.gardenKey, workspaceSlug: params.workspaceSlug })
			.build()
	);
	return { workspace: workspace };
}
