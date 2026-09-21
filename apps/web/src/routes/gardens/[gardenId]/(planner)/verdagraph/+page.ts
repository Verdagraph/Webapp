import triplit from '$data/triplit';
import { workspacesQuery } from '$data/workspaces/queries';

/**
 * Determine the default workspace to open the planner on.
 */
export async function load({ params }) {
	const workspace = await triplit.fetchOne(
		workspacesQuery.Vars({ gardenId: params.gardenId })
	);

	return { defaultWorkspaceId: workspace?.id ?? null };
}
