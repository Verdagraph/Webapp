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
			return 'mt-6';
		} else if (depth == 1) {
			return 'mt-2';
		} else {
			return 'mt-1';
		}
	}
</script>

<!-- Snippet for rendering a calendar item. Allows arbitrary nesting. -->
{#snippet calendarItems(items: (typeof pane.tree)['children'], depth: number = 0)}
	{#each items as item (item.id)}
		{@const itemLeft = calculateItemleft(item.item.startDate)}
		{@const itemWidth = calculateItemWidth(item.item.endDate, item.item.startDate)}
		{@const roundedStart = item.item.startDate < context.timeline.beginSelection}

		<!-- Item element. -->
		<li {...item.attrs}>
			<!-- Item row. -->
			<div
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
				{#if item.children?.length}
					<div class="text-neutral-8 absolute -translate-x-8">
						<Icon
							icon={iconIds.chevronRight}
							width="2rem"
							class={item.expanded ? 'rotate-90' : ''}
						/>
					</div>
				{/if}
				<div class="flex h-[40%] w-full items-center">
					<span class="text-neutral-12 sticky left-0 flex items-center text-xs">
						<span class="text-neutral-12 ml-2">
							{item.item.label}
						</span>
						<span class="bg-neutral-10 mx-2 h-[3px] w-[3px] rounded-lg"></span>
						<span class="text-neutral-11 mr-2 truncate">
							{item.item.description || ''}
						</span>
					</span>
				</div>
				<div
					style:background-color={item.item.borderColor}
					class="h-[1px] w-full"
				></div>
				<div class="w-full"></div>
			</div>
			{#if item.children?.length}
				<ul
					{...pane.tree.group}
					class={item.expanded ? 'opacity-100' : 'pointer-events-none h-0 opacity-0'}
				>
					{@render calendarItems(item.children, depth + 1)}
				</ul>
			{/if}
		</li>
	{/each}
{/snippet}

<ScrollArea class="h-full w-full">
	<div bind:clientHeight={pane.height} class="relative h-full w-full overflow-hidden">
		{#each context.container.sections as section}
			{@const tickLeft = calculateSectionLeft(section)}
			{@const sectionEven = section % 2 == 0}
			<div
				style:left="{tickLeft}%"
				style="translate: -50%"
				class="{sectionEven ? 'bg-neutral-3' : 'bg-neutral-2'} absolute h-full w-[2px]"
			></div>
		{/each}

		<ul {...pane.tree.root}>
			{@render calendarItems(pane.tree.children)}
		</ul>
	</div>
</ScrollArea>
