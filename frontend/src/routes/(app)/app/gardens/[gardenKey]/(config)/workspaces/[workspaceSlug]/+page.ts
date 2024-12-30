import triplit from '$data/triplit';
import { workspaceSlugQuery } from '$data/workspaces/queries.js';

/**
 * Retrieve the workspace.
 */
export async function load({ params }) {
	/** TODO: remove temp data */
	return {workspace: 		{
		gardenId: 'f4b3b1b0-0b3b-4b3b-8b3b-0b3b1b0b3b1b',
		id: 'f4b3b1b0-0b3b-4b3b-8b3b-0b3b1b0b3b1b',
		name: 'Workspace 1arstnoienrsienotarson',
		slug: 'workspace-1',
		description:
			"Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop Jokester. And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started laughing, they couldn't stop."
	},}
	
	const workspace = await triplit.fetchOne(
		workspaceSlugQuery
			.vars({ gardenId: params.gardenKey, workspaceSlug: params.workspaceSlug })
			.build()
	);
	return { workspace: workspace };
}
