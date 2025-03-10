<script lang="ts">
	import { useQuery } from '@triplit/svelte';
	import triplit from '$data/triplit';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import { getWorkspaceContext } from '../activeWorkspace.svelte';
	import toolbox from '../tools';
	import TabToolbox from '$components/tabToolbox';
	import Tree from './Tree';
	import Layout from './Layout.svelte';
	import { TimelineSelector } from '$components/timeline';
	import { plantingAreaIdsQuery } from '$data/workspaces/queries';

	const workspaceContext = getWorkspaceContext();

	/** Force a re-render of the PaneGroup if the direction is changed. */
	let initialized = $state(true);
	$effect(() => {
		if (workspaceContext.contentPaneDirection) {
			initialized = false;
			initialized = true;
		}
	});

	/** Retrieve the planting area IDs. */
	const plantingAreaIds = useQuery(
		triplit,
		plantingAreaIdsQuery.vars({ workspaceId: workspaceContext.id })
	);

	/** TODO: Figure out why and fix the layout canvas not being there after renavigating after a page refresh. */
</script>

<div class="flex h-full w-full flex-col">
	<div class="h-full grow overflow-hidden">
		{#if initialized}
			<Resizable.PaneGroup direction={workspaceContext.contentPaneDirection}>
				{#if workspaceContext.layoutEnabled}
					<Resizable.Pane defaultSize={70} order={1} minSize={10}>
						{#key workspaceContext.id}
							<Layout
								plantingAreaIds={plantingAreaIds.results?.map((result) => result.id) ||
									[]}
							/>
						{/key}
					</Resizable.Pane>
					<Resizable.Handle withHandle={false} />
				{/if}
				{#if toolbox.isActive}
					<Resizable.Pane defaultSize={20} order={2} minSize={10}>
						<TabToolbox {toolbox} />
					</Resizable.Pane>
					<Resizable.Handle withHandle={false} />
				{/if}
				{#if workspaceContext.treeEnabled}
					<Resizable.Pane defaultSize={30} order={3} minSize={10}>
						<!--
							<Tree
								plantingAreaIds={plantingAreaIds.results?.map((result) => result.id) ||
									[]}
							/>
						-->
					</Resizable.Pane>
				{/if}
			</Resizable.PaneGroup>
		{/if}
	</div>
	<div class="bottom-0 h-24">
		<TimelineSelector selection={workspaceContext.timelineSelection} />
	</div>
</div>
