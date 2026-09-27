/**
 * Passes the workspace's URL slug through to the page, which resolves and
 * confirms its existence reactively against Jazz (see +page.svelte).
 */
export function load({ params }) {
	return { workspaceSlug: params.workspaceSlug };
}
