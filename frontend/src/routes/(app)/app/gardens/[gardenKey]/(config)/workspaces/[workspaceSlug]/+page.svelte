<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import activeWorkspace, {
		workspaceLayoutCanvasId,
		plantingAreaCreateFormId
	} from '../activeWorkspace.svelte';
	import toolbox from '../tools';
	import { createPlantingAreaCreateForm } from './forms';
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

	if (data.workspace == null) {
		toast.error('Workspace does not exist.');
		goto(`/app/gardens/${$page.params.gardenKey}/workspaces`);
		throw new AppError(`Workspace ${$page.params.workspaceSlug} does not exist`);
	}

	/** Create the layout and set it to context. */
	const layoutCanvas = createCanvasContext(workspaceLayoutCanvasId, data.workspace.id);
	setContext<CanvasContext>(workspaceLayoutCanvasId, layoutCanvas);

	/** Create the planting area creation form and set it to context. */
	const plantingAreaCreateForm = createPlantingAreaCreateForm();
	setContext(plantingAreaCreateFormId, plantingAreaCreateForm);

	onMount(() => {
		if (data.workspace == null) {
			toast.error('Workspace does not exist.');
			goto(`app/gardens/${$page.params.gardenKey}/workspaces`);
			throw new AppError(`Workspace ${$page.params.workspaceSlug} does not exist`);
		}

		/** Update the active workspace upon loading a new workspace. */
		if (activeWorkspace.id != data.workspace.id) {
			activeWorkspace.id = data.workspace.id;
			activeWorkspace.editing = false;
		}
	});
</script>

<Workspace workspaceSlug={$page.params.workspaceSlug} />
