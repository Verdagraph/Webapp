<script lang="ts">
	import * as Resizable from '$core/resizable';
	import Toolbar from './Toolbar.svelte';
	import NoneditableSliderBar from '$components/timeline/TimelineSelector/NoneditableSliderBar.svelte';
	import { type CalendarContext } from './context.svelte';
	import RangeCalendarPane from './RangeCalendarPane.svelte';
	import { type TimelineSelection } from '$components/timeline';

	type Props = {
		timeline: TimelineSelection;
		context: CalendarContext<any>;
	};
	let { timeline, context }: Props = $props();
</script>

<div bind:clientWidth={context.container.width} class="flex h-full w-full flex-col">
	<div>
		<Toolbar {context} />
	</div>

	<div class="border-neutral-7 border-b">
		<NoneditableSliderBar selection={timeline} width={context.container.width} />
	</div>

	<div class="flex-grow">
		<Resizable.PaneGroup direction={'vertical'}>
			{#if context.config.value.viewPanesSelect.includes('plantingWindows')}
				<Resizable.Pane defaultSize={1 / 3} minSize={5} order={0}>
					<RangeCalendarPane {context} pane={context.getPane('plantingWindows')} />
				</Resizable.Pane>
				<Resizable.Handle withHandle={false} />
			{/if}
			{#if context.config.value.viewPanesSelect.includes('plants')}
				<Resizable.Pane defaultSize={1 / 3} minSize={5} order={1}>
					<RangeCalendarPane {context} pane={context.getPane('plants')} />
				</Resizable.Pane>
				<Resizable.Handle withHandle={false} />
			{/if}
			{#if context.config.value.viewPanesSelect.includes('actions')}
				<Resizable.Pane defaultSize={1 / 3} minSize={5} order={2}>
					<RangeCalendarPane {context} pane={context.getPane('actions')} />
				</Resizable.Pane>
			{/if}
		</Resizable.PaneGroup>
	</div>
</div>
