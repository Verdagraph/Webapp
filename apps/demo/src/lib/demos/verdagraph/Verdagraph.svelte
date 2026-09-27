<script lang="ts">
	import { Verdagraph, getAppContext } from '@vdg-webapp/ui';

	const ctx = getAppContext();

	const defaultWorkspaceId = $derived(ctx.workspaces.workspaces[0]?.id ?? null);
</script>

{#if defaultWorkspaceId}
	<Verdagraph contextParams={{ defaultSelectedWorkspaceId: defaultWorkspaceId }} />
{/if}
