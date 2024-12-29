<script lang="ts">
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import type { Workspace } from '@vdt-webapp/common';
	import activeWorkspace from '../activeWorkspace.svelte';
	import toolbox from '../tools';
	import TabToolbox from '$components/tabToolbox';
	import Tree from './Tree.svelte';
	import Layout from './Layout.svelte';
	import { workspaceLayoutCanvasId } from '../activeWorkspace.svelte';
	import { setContext, getContext } from 'svelte';
	import { createCanvasContext, type CanvasContext } from '$components/canvas';

	type Props = {
		workspaceSlug: string;
	};
	let { workspaceSlug }: Props = $props();

	let workspace: Workspace = {
		gardenId: 'f4b3b1b0-0b3b-4b3b-8b3b-0b3b1b0b3b1b',
		id: 'f4b3b1b0-0b3b-4b3b-8b3b-0b3b1b0b3b1b',
		name: 'Workspace 1arstnoienrsienotarson',
		slug: 'workspace-1',
		description:
			"Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop Jokester. And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started laughing, they couldn't stop."
	};

	/** Force a re-render of the PaneGroup if the direction is changed. */
	let initialized = $state(true);
	$effect(() => {
		activeWorkspace.contentPaneDirection;
		initialized = false;
		initialized = true;
	});
</script>

{#if initialized}
	<Resizable.PaneGroup direction={activeWorkspace.contentPaneDirection}>
		{#if activeWorkspace.layoutEnabled}
			<Resizable.Pane defaultSize={70} order={1} minSize={10}>
				<Layout canvasId={workspaceLayoutCanvasId} />
			</Resizable.Pane>
			<Resizable.Handle withHandle={false} />
		{/if}
		{#if toolbox.isActive}
			<Resizable.Pane defaultSize={20} order={2} minSize={10}>
				<TabToolbox {toolbox} />
			</Resizable.Pane>
			<Resizable.Handle withHandle={false} />
		{/if}
		{#if activeWorkspace.treeEnabled}
			<Resizable.Pane defaultSize={30} order={3} minSize={10}>
				<Tree />
			</Resizable.Pane>
		{/if}
	</Resizable.PaneGroup>
{/if}
