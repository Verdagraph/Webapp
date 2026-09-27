<script lang="ts">
	import { Verdagraph, getAppContext } from '@vdg-webapp/ui';

	const ctx = getAppContext();

	/** Defaults the planner to this garden's first workspace, if any. */
	const defaultWorkspaceId = $derived(ctx.workspaces.workspaces[0]?.id ?? null);
</script>

<svelte:head>
	<title>Verdagraph - Verdagraph</title>
</svelte:head>

{#if defaultWorkspaceId}
	<Verdagraph contextParams={{ defaultSelectedWorkspaceId: defaultWorkspaceId }} />
{:else}
	<div class="flex h-full w-full items-center justify-center">
		<span class="italic">This garden has no workspaces yet.</span>
	</div>
{/if}
