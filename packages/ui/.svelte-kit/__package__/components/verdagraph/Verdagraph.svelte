<script lang="ts">
	import { TabToolbox, TimelineSelector } from '..';
	import { Resizable } from '../../core';

	import Toolbar from './Toolbar.svelte';
	import Calendar from './calendar/Calendar.svelte';
	import Layout from './layout/Layout.svelte';
	import { toolbox } from './tools/index';
	import Tree from './tree/Tree.svelte';
	import { setVerdagraphContext } from './verdagraphContext.svelte';

	const verdagraphContext = setVerdagraphContext();

	/** Force a re-render of the PaneGroup if the direction is changed. */
	let initialized = $state(true);
	$effect(() => {
		if (verdagraphContext.contentPaneDirection) {
			initialized = false;
			initialized = true;
		}
	});
</script>

<div class="bg-neutral-1 flex h-full flex-col">
	<Toolbar />

	<div class="overflow-none grow">
		{#if initialized}
			<Resizable.PaneGroup direction={verdagraphContext.contentPaneDirection}>
				{#if verdagraphContext.layoutEnabled}
					<Resizable.Pane defaultSize={30} minSize={5} order={0}>
						<Layout />
					</Resizable.Pane>
					<Resizable.Handle withHandle={false} />
				{/if}
				{#if verdagraphContext.calendarEnabled}
					<Resizable.Pane defaultSize={30} minSize={5} order={1}>
						<Calendar />
					</Resizable.Pane>
					<Resizable.Handle withHandle={false} />
				{/if}
				{#if toolbox.isActive}
					<Resizable.Pane defaultSize={15} minSize={5} order={2}>
						<TabToolbox {toolbox} />
					</Resizable.Pane>
					<Resizable.Handle withHandle={false} />
				{/if}
				{#if verdagraphContext.treeEnabled}
					<Resizable.Pane defaultSize={25} minSize={5} order={3}>
						<Tree />
					</Resizable.Pane>
				{/if}
			</Resizable.PaneGroup>
		{/if}
	</div>

	<div class="bottom-0 h-24">
		<TimelineSelector selection={verdagraphContext.timeline} />
	</div>
</div>
