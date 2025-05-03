<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import type { CalendarItem } from './types';
	import { type CalendarPaneContext, type CalendarContext } from './context.svelte';
	import { calculateDeltaDays } from '$components/timeline/utils';
	import { type DateValue } from '@internationalized/date';

	type Props = {
		context: CalendarContext<any>;
		pane: CalendarPaneContext;
	};
	let { context, pane }: Props = $props();

	function paneIndexToVisibleIndex(paneIndex: number): number {
		return paneIndex;
	}
	$inspect(context.container.sectionHeight);

	/**
	 * Calculates the leftpoint of a section, in %.
	 * @param sectionIndex The index of the section from
	 */
	function calculateSectionLeft(sectionIndex: number): number {
		return (sectionIndex / (context.container.numSections + 1)) * 100;
	}

	function calculateItemleft(startDate: DateValue) {
		return (
			(calculateDeltaDays(startDate, context.timeline.beginSelection) /
				(context.container.numSections + 1)) *
			100
		);
	}

	function calculateItemWidth(endDate: DateValue, startDate: DateValue) {
		return (
			(Math.max(calculateDeltaDays(endDate, startDate) + 1, 0) /
				(context.container.numSections + 1)) *
			100
		);
	}

	function itemDepthToTopMargin(depth: number) {
		if (depth == 0) {
			return "mt-3"
		} else if (depth == 1) {
			return "mt-2"
		} else {
			return "mt-1"
		}
	}
</script>

<!-- Snippet for rendering a calendar item. Allows arbitrary nesting. -->
{#snippet calendarItems(items: CalendarItem[], depth: number = 0)}
	{#each items as item, index (item.id)}
		{@const itemLeft = calculateItemleft(item.startDate)}
		{@const itemWidth = calculateItemWidth(item.endDate, item.startDate)}
		{@const roundedStart = item.startDate < context.timeline.beginSelection}

		<div
			style:left="{itemLeft}%"
			style:height="{context.container.sectionHeight}px"
			style:width="{itemWidth}%"
			class="bg-neutral-6 border-neutral-9 rounded-sm border-2 {roundedStart
				? 'rounded-l-none'
				: ''} {itemDepthToTopMargin(depth)} relative"
		></div>

		{#if item.children}
			{@render calendarItems(item.children, depth + 1)}
		{/if}
	{/each}
{/snippet}

<ScrollArea class="h-full w-full">
	<div bind:clientHeight={pane.height} class="relative h-full w-full overflow-hidden">
		{#each context.container.sections as section}
			{@const tickLeft = calculateSectionLeft(section)}
			<div
				style:left="{tickLeft}%"
				style="translate: -50%"
				class="bg-neutral-3 absolute h-full w-[2px]"
			></div>
		{/each}

		{@render calendarItems(pane.items)}
	</div>
</ScrollArea>
