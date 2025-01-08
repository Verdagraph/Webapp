<script lang="ts">
	import { page } from '$app/state';
	import { getWorkspaceContext } from '../activeWorkspace.svelte.js';
	import Workspace from './Workspace.svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { AppError } from '@vdt-webapp/common/src/errors.js';

	let { data } = $props();

	const workspaceContext = getWorkspaceContext();

	if (data.workspace == null) {
		toast.error('Workspace does not exist.');
		goto(`app/gardens/${page.params.gardenKey}/workspaces`);
		throw new AppError(`Workspace ${page.params.workspaceSlug} does not exist`);
	}

	/** Update the active workspace upon loading a new workspace. */
	if (workspaceContext.id != data.workspace.id) {
		workspaceContext.setWorkspace(data.workspace.id);
	}
</script>

{#if workspaceContext.id}
	<Workspace workspaceId={workspaceContext.id} />
{/if}
