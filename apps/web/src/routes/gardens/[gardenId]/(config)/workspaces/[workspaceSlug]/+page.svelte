<script lang="ts">
	import { QuerySubscriptionOne } from 'jazz-tools/svelte';

	import { app } from '@vdg-webapp/models';
	import { WorkspaceEditor, getAppContext } from '@vdg-webapp/ui';

	import { goto } from '$app/navigation';

	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};
	let { data }: Props = $props();

	const ctx = getAppContext();

	const workspaceQuery = new QuerySubscriptionOne(() =>
		ctx.garden.gardenId
			? app.workspaces.where({
					gardenId: ctx.garden.gardenId,
					slug: data.workspaceSlug
				})
			: undefined
	);

	/** Redirect away once the workspace slug is confirmed not to exist. */
	$effect(() => {
		if (!workspaceQuery.isLoading && workspaceQuery.current === null) {
			goto(`/gardens/${ctx.garden.id}/workspaces`);
		}
	});
</script>

{#if workspaceQuery.current}
	<WorkspaceEditor defaultId={workspaceQuery.current.id} includeWorkspacesMenu={true} />
{/if}
