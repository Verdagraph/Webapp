<script lang="ts">
	import { WorkspaceEditor, getAppContext } from '@vdg-webapp/ui';

	const ctx = getAppContext();

	const defaultWorkspaceId = $derived(ctx.workspaces.workspaces[0]?.id ?? null);
</script>

{#if defaultWorkspaceId}
	<WorkspaceEditor defaultId={defaultWorkspaceId} includeWorkspacesMenu={false} />
{/if}
