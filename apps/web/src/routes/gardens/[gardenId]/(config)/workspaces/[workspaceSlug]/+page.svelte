<script lang="ts">
	import { getWorkspaceContext } from '../activeWorkspace.svelte.js';
	import type { PageData } from './$types';
	import Workspace from './Workspace.svelte';

	type Props = {
		data: PageData;
	};
	let { data }: Props = $props();

	const workspaceContext = getWorkspaceContext();

	/** Update the active workspace upon loading a new workspace. */
	$effect(() => {
		if (workspaceContext.id != data.workspace.id) {
			workspaceContext.setWorkspace(data.workspace.id);
		}
	});
</script>

{#if workspaceContext.id}
	<Workspace />
{/if}
