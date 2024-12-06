<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import activeWorkspace from '../activeWorkspace.svelte';
	import toolbox from '../tools';
	import Toolbox from '$components/tabToolbox';
	import Tree from './Tree.svelte';
	import Layout from './Layout.svelte';

	onMount(() => {
		/** Update the active workspace upon loading a new workspace. */
		if (activeWorkspace.id != $page.params.workspaceSlug) {
			activeWorkspace.id = $page.params.workspaceSlug;
		}
	});

	/**
	 * 
	 const workspace: WorkspaceFullSchema = {
		id: '12345',
		description: 'This is the description',
		garden_ref: { id: 'aisoret' },
		name: 'WorkspaceAlpha',
		slug: 'workspace-slug',
		planting_areas: [
			{
				id: 'aisrtne',
				name: 'Rectangle',
				geometries: {
					geometries: [
						{
							time: null,
							geometry: {
								type: GeometrySchemaType.rectangle,
								attributes: {
									width: 3,
									height: 2,
									scale_factor: 1,
									rotation: 90,
									nulled: false
								}
							}
						}
					]
				}
			}
		]
	};
	*/
</script>

<Resizable.PaneGroup direction={activeWorkspace.contentPaneDirection}>
	{#if activeWorkspace.treeEnabled}
		<Resizable.Pane defaultSize={30} order={0} minSize={10}>
			<Tree />
		</Resizable.Pane>
		<Resizable.Handle withHandle={false} />
	{/if}
	{#if toolbox.isActive}
		<Resizable.Pane defaultSize={20} order={1} minSize={10}>
			<Toolbox {toolbox} />
		</Resizable.Pane>
		<Resizable.Handle withHandle={false} />
	{/if}
	{#if activeWorkspace.layoutEnabled}
		<Resizable.Pane defaultSize={70} order={2} minSize={10}>
			<Layout />
		</Resizable.Pane>
	{/if}
</Resizable.PaneGroup>
