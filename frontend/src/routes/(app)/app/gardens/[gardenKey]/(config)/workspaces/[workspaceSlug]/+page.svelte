<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import toolbox from '../tools';
	import {
		workspaceContextId,
		workspaceLayoutCanvasId,
		type WorkspaceContext
	} from '../activeWorkspace.svelte.js';
	import Workspace from './Workspace.svelte';
	import type { Snippet } from 'svelte';
	import { setContext, getContext } from 'svelte';
	import { createCanvasContext, type CanvasContext } from '$components/canvas';
	import { workspaceSlugQuery } from '$data/workspaces/queries';
	import triplit from '$data/triplit';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { AppError } from '@vdt-webapp/common/src/errors.js';

	let { data } = $props();

	const workspaceContext = getContext<WorkspaceContext>(workspaceContextId);

	if (data.workspace == null) {
		toast.error('Workspace does not exist.');
		goto(`/app/gardens/${$page.params.gardenKey}/workspaces`);
		throw new AppError(`Workspace ${$page.params.workspaceSlug} does not exist`);
	}

	/** Create the layout and set it to context. */
	const layoutCanvas = createCanvasContext(workspaceLayoutCanvasId, data.workspace.id);
	setContext<CanvasContext>(workspaceLayoutCanvasId, layoutCanvas);

	onMount(() => {
		if (data.workspace == null) {
			toast.error('Workspace does not exist.');
			goto(`app/gardens/${$page.params.gardenKey}/workspaces`);
			throw new AppError(`Workspace ${$page.params.workspaceSlug} does not exist`);
		}

		/** Update the active workspace upon loading a new workspace. */
		if (workspaceContext.id != data.workspace.id) {
			workspaceContext.id = data.workspace.id;
			workspaceContext.editing = false;
		}
	});
</script>

<Workspace workspaceSlug={$page.params.workspaceSlug} />
