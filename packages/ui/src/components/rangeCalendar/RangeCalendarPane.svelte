<script lang="ts">
	import Icon from '@iconify/svelte';
	import { type DateValue } from '@internationalized/date';

	import iconIds from '$assets/icons';
	import { calculateDeltaDays } from '$components/timeline/utils';
	import { Popover } from '$core';
	import { ScrollArea } from '$core/scroll-area/index.js';
	import * as Tooltip from '$core/tooltip';
	import { cn } from '$utils';

	import { type CalendarContext, type CalendarPaneContext } from './context.svelte';

	type Props = {
		context: CalendarContext<any>;
		pane: CalendarPaneContext;
	};
	let { context, pane }: Props = $props();

	/** 0-1 percentage that the section label takes of the section height. */
	const LABEL_SECTION_HEIGHT_PORTION = 0.4;

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

	function calculateInfoPointLeft(
		itemStartDate: DateValue,
		itemEndDate: DateValue,
		infoPointDate: DateValue
	) {
		return (
			(calculateDeltaDays(infoPointDate, itemStartDate) /
				(calculateDeltaDays(itemEndDate, itemStartDate) + 1)) *
			100
		);
	}

	let sectionWidthPx = $derived(
		context.container.width /
			(context.timeline.sliderValue[2] - context.timeline.sliderValue[0] + 1)
	);

	const focusSection = $derived(
		calculateDeltaDays(context.timeline.focus, context.timeline.beginSelection)
	);

	/**
	 * Dragging the pane's empty background pans the whole timeline selection
	 * (shared across every pane and the slider above, since they all read
	 * off the same context.timeline) - the calendar's equivalent of dragging
	 * the Layout canvas's background to pan it (Canvas.svelte). A pointerdown
	 * that lands on an item bar is left alone (no stopPropagation available
	 * to us there, since items are Melt Tree elements) so its own click-to-
	 * expand/tooltip/popup behavior still works.
	 */
	let isPanning = false;
	let lastPointerX = 0;

	/**
	 * Which info point's popover is open, at most one at a time - keyed by
	 * `${item.item.id}-${infoPointIndex}` since CalendarItemInfoPoint has no
	 * id of its own. Popover.Root defaults to managing its own open state
	 * independently per instance, which is what let every info point stay
	 * open regardless of others; controlling it off this single value is
	 * what makes opening one close whatever else was open.
	 */
	let openInfoPointKey: string | null = $state(null);

	function handlePointerDown(event: PointerEvent) {
		if ((event.target as HTMLElement).closest('li')) {
			return;
		}
		(event.currentTarget as Element).setPointerCapture(event.pointerId);
		isPanning = true;
		lastPointerX = event.clientX;
		document.body.style.cursor = 'grabbing';
	}

	function handlePointerMove(event: PointerEvent) {
		if (!isPanning) {
			return;
		}
		/**
		 * Only translate by whole days (matching the day-granular selection
		 * model), carrying the sub-day remainder forward in lastPointerX
		 * rather than resetting it to event.clientX each move - otherwise a
		 * slow drag would round its fractional movement away every frame and
		 * never accumulate into a day.
		 */
		const deltaDays = Math.round((event.clientX - lastPointerX) / sectionWidthPx);
		if (deltaDays === 0) {
			return;
		}
		context.timeline.translate({ days: -deltaDays });
		lastPointerX += deltaDays * sectionWidthPx;
	}

	function handlePointerUp(event: PointerEvent) {
		if (!isPanning) {
			return;
		}
		(event.currentTarget as Element).releasePointerCapture(event.pointerId);
		isPanning = false;
		document.body.style.cursor = 'default';
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
				style:height="{item.item.labelOnly
					? context.container.sectionHeight * LABEL_SECTION_HEIGHT_PORTION
					: context.container.sectionHeight}px"
				style:width="{itemWidth}%"
				style:background-color={item.item.fillColor}
				style:border-color={item.item.borderColor}
				class={cn(
					'relative flex flex-col rounded-sm border-2',
					item.expanded
						? item.item.itemStyleExpanded || ''
						: item.item.itemStyleCollapsed || '',
					item.expanded
						? `mb-${item.item.bottomMarginChild !== undefined ? item.item.bottomMarginChild : item.item.bottomMargin}`
						: `mb-${item.item.bottomMargin}`,
					roundedStart ? 'rounded-l-none' : ''
				)}
			>
				<!-- Top row - label-->
				<div
					class="flex w-full items-center {item.item.labelOnly
						? 'h-[100%]'
						: `h-[${LABEL_SECTION_HEIGHT_PORTION * 100}%]`}"
				>
					<span class="text-neutral-12 sticky left-0 flex items-center text-xs">
						<!-- Label. -->
						<span class="text-neutral-12 ml-2 rounded-md px-2 py-0.5">
							{item.item.label}
						</span>

						<!-- Tree item expansion indicatator-->
						{#if item.children?.length}
							<Icon
								icon={iconIds.chevronRight}
								width="1.25rem"
								class={cn('text-neutral-9 mx-1', item.expanded ? 'rotate-90' : '')}
							/>
						{:else if item.item.description}
							<span class="bg-neutral-10 mx-2 h-[3px] w-[3px] rounded-lg"></span>
						{/if}

						<!-- Description. -->
						<span class="text-neutral-11 mr-2 truncate">
							{item.item.description || ''}
						</span>
					</span>
				</div>

				{#if item.item.labelOnly == false}
					<!-- Seperator. -->
					<div
						style:background-color={item.item.borderColor}
						class="h-[1px] w-full opacity-60"
					></div>

					<!-- Info popups. -->
					<div class="relative flex h-full w-full">
						{#each item.item.infoPoints || [] as infoPoint, infoPointIndex}
							{@const infoPointLeft = calculateInfoPointLeft(
								item.item.startDate,
								item.item.endDate,
								infoPoint.date
							)}
							{@const infoPointKey = `${item.item.id}-${infoPointIndex}`}

							<div
								style:left="{infoPointLeft}%"
								style:width="{sectionWidthPx}px"
								class="absolute flex h-full items-center"
							>
								{#snippet infoPointIcon(icon?: string)}
									{#if icon}
										<Icon
											color={item.item.borderColor}
											width="1.4rem"
											{icon}
											class="mx-auto"
										/>
									{:else}
										<div
											style:background-color={item.item.itemColor}
											style:border-color={item.item.borderColor}
											class="mx-auto h-5 w-5 rounded-lg border"
										></div>
									{/if}
								{/snippet}

								<Tooltip.Root>
									<Tooltip.Trigger class="w-full">
										{#if infoPoint.popup}
											<Popover.Root
												open={openInfoPointKey === infoPointKey}
												controlledOpen={true}
												onOpenChange={(open) => {
													openInfoPointKey = open ? infoPointKey : null;
												}}
											>
												<Popover.Trigger class="w-full">
													{@render infoPointIcon(infoPoint.icon)}
												</Popover.Trigger>
												<Popover.Content>
													<infoPoint.popup {...infoPoint.popupProps} />
												</Popover.Content>
											</Popover.Root>
										{:else}
											{@render infoPointIcon(infoPoint.icon)}
										{/if}
									</Tooltip.Trigger>
									<Tooltip.Content>{infoPoint.label}</Tooltip.Content>
								</Tooltip.Root>
							</div>
						{/each}
					</div>
				{/if}
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
	<div
		bind:clientHeight={pane.height}
		class="relative h-full w-full cursor-grab select-none overflow-hidden"
		style:touch-action="none"
		onpointerdown={handlePointerDown}
		onpointermove={handlePointerMove}
		onpointerup={handlePointerUp}
	>
		<!-- Focus day highlight. -->
		<div
			style:left="{calculateSectionLeft(focusSection)}%"
			style:width="{calculateSectionLeft(focusSection + 1) -
				calculateSectionLeft(focusSection)}%"
			class="bg-neutral-9 absolute h-full opacity-10"
		></div>

		{#each context.container.sections as section}
			{@const tickLeft = calculateSectionLeft(section)}
			{@const sectionEven = section % 2 == 0}
			{@const sectionSurroundsFocusDay =
				section === focusSection || section === focusSection + 1}
			<div
				style:left="{tickLeft}%"
				style="translate: -50%"
				class="{sectionSurroundsFocusDay
					? 'bg-neutral-9 opacity-30'
					: sectionEven
						? 'bg-neutral-3'
						: 'bg-neutral-2'} absolute h-full w-[2px]"
			></div>
		{/each}

		<ul {...pane.tree.root} class="pt-2">
			{@render calendarItems(pane.tree.children)}
		</ul>
	</div>
	<!-- p -->
</ScrollArea>
