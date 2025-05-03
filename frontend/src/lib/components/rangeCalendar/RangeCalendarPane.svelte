<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import type { CalendarItem } from './types';
	import { type CalendarPaneContext, type CalendarContext } from './context.svelte';
	import { calculateDeltaDays } from '$components/timeline/utils';
	import { type DateValue } from '@internationalized/date';
	import { cn } from '$lib/utils';
	import Icon from '@iconify/svelte';
	import iconIds from '$lib/assets/icons';

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
			return 'mt-3';
		} else if (depth == 1) {
			return 'mt-2';
		} else {
			return 'mt-1';
		}
	}

	$inspect(pane.tree.children);
</script>

<!-- Snippet for rendering a calendar item. Allows arbitrary nesting. -->
{#snippet calendarItems(items: (typeof pane.tree)['children'], depth: number = 0)}
	{#each items as item (item.id)}
		{@const itemLeft = calculateItemleft(item.item.startDate)}
		{@const itemWidth = calculateItemWidth(item.item.endDate, item.item.startDate)}
		{@const roundedStart = item.item.startDate < context.timeline.beginSelection}

		<div
			{...item.attrs}
			style:left="{itemLeft}%"
			style:height="{context.container.sectionHeight}px"
			style:width="{itemWidth}%"
			style:background-color={item.item.fillColor}
			style:border-color={item.item.borderColor}
			class={cn(
				'relative flex flex-col rounded-sm border-2',
				roundedStart ? 'rounded-l-none' : '',
				itemDepthToTopMargin(depth)
			)}
		>
			<div class="flex h-1/3 w-full items-center">
				<span class="text-neutral-12 sticky left-0 flex items-center text-xs">
					<span class="text-neutral-12 ml-2">
						{item.item.label}
					</span>
					{#if item.children}
						<Icon icon={iconIds.caretUpDownIcon} class="mx-1"></Icon>
					{:else}
						<span class="bg-neutral-10 mx-2 h-[3px] w-[3px] rounded-lg"></span>
					{/if}
					<span class="text-neutral-11 mr-2 truncate">
						{item.item.description || ''}
					</span>
				</span>
			</div>
			<div style:background-color={item.item.borderColor} class="h-[1px] w-full"></div>
			<div class="w-full"></div>
		</div>

		{#if item.children}
			{@render calendarItems(item.children, depth + 1)}
		{/if}
	{/each}
{/snippet}

<ScrollArea class="h-full w-full">
	<div
		bind:clientHeight={pane.height}
		{...pane.tree.root}
		class="relative h-full w-full overflow-hidden"
	>
		{#each context.container.sections as section}
			{@const tickLeft = calculateSectionLeft(section)}
			{@const sectionEven = section % 2 == 0}
			<div
				style:left="{tickLeft}%"
				style="translate: -50%"
				class="{sectionEven ? 'bg-neutral-3' : 'bg-neutral-2'} absolute h-full w-[2px]"
			></div>
		{/each}

		{@render calendarItems(pane.tree.children)}
	</div>
</ScrollArea>
