import triplit from '$data/triplit';
import { workspaceSlugQuery } from '$data/workspaces/queries.js';
import { goto } from '$app/navigation';
import { AppError } from '@vdt-webapp/common/src/errors.js';

/**
 * Retrieve the workspace.
 */
export async function load({ params }) {
	const workspace = await triplit.fetchOne(
		workspaceSlugQuery.Vars({
			gardenId: params.gardenId,
			workspaceSlug: params.workspaceSlug
		})
	);

	if (!workspace) {
		/** TODO: Make toasts work here. */
		//toast.error('Workspace does not exist.');
		goto(`/app/gardens/${params.gardenId}/workspaces`);
		throw new AppError(`Workspace ${params.workspaceSlug} does not exist`);
	}

	return { workspace: workspace };
}
