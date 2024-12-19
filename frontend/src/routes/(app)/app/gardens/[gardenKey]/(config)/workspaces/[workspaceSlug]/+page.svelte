<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import activeWorkspace, { workspaceLayoutCanvasId } from '../activeWorkspace.svelte';
	import toolbox from '../tools';
	import Workspace from './Workspace.svelte';
	import type { Snippet } from 'svelte';
	import { setContext, getContext } from 'svelte';
	import { createCanvasContext, type CanvasContext } from '$components/canvas';

	const layoutCanvas = createCanvasContext(workspaceLayoutCanvasId);
	setContext<CanvasContext>(workspaceLayoutCanvasId, layoutCanvas);

	onMount(() => {
		/** Update the active workspace upon loading a new workspace. */
		if (activeWorkspace.id != $page.params.workspaceSlug) {
			activeWorkspace.id = $page.params.workspaceSlug;
			activeWorkspace.editing = false;
		}
	});
</script>

<Workspace workspaceSlug={$page.params.workspaceSlug} />
