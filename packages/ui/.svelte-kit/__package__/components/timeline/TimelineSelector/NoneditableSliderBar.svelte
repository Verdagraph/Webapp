<script lang="ts">
	import { type TimelineSelection } from '../timelineSelection.svelte';
	import { getDayOfWeek } from '@internationalized/date';
	import { cn } from '../../../utils';
	import { getMonthString, type MonthNumber } from '../utils';
	import {
		tickLineWidth,
		tickLabelThreshold,
		baseTickClass,
		baseTickDayLabelClass,
		baseTickLineClass
	} from './common';

	type Props = {
		selection: TimelineSelection;
		width: number;
	};
	let { selection, width }: Props = $props();

	/**
	 * Ideally, we would position the tick day label between the two
	 * ticks using flex. But, the tick divs aren't the width between ticks
	 * but just a point width.
	 * So, translate the tick labels so they are in between ticks.
	 * Calculate the width of a tick, divide in half, add the tick width,
	 * and add approximately half the day label's width.
	 */
	let tickWidth = $derived(
		width / (selection.sliderValue[2] - selection.sliderValue[0])
	);
	let tickLabelTranslate = $derived(tickWidth / 2 + tickLineWidth - 7);

	let ticks = $derived(
		Array.from(
			{ length: selection.sliderValue[2] - selection.sliderValue[0] + 1 },
			(_, index) => selection.sliderValue[0] + index
		)
	);
	let numTicks = $derived(ticks.length);
</script>

<div class="relative flex h-8 w-full touch-none select-none">
	{#each ticks as index}
		{#if index >= 0 && index < selection.maxSliderValue}
			{@const dateValue = selection.sliderValueToDateValue(index)}

			<!-- Render a different tick depending on the date. -->

			<!-- Start of year. -->
			{#if dateValue.month === 1 && dateValue.day === 1}
				<div
					class={cn(baseTickClass, '')}
					style="position: absolute; left: {(index - selection.sliderValue[0]) *
						(1 / numTicks) *
						100}%; translate: -50%"
				>
					<span class="text-neutral-11 absolute -translate-y-[14px] text-sm">
						{dateValue.year}
					</span>
					<span
						class={cn(baseTickDayLabelClass, '')}
						style="transform: translateX({tickLabelTranslate}px)"
						class:hidden={tickWidth < tickLabelThreshold}
					>
						{dateValue.day.toString().padStart(2, '0')}
					</span>
					<span class={cn(baseTickLineClass, 'h-[14px]')}></span>
				</div>

				<!-- Start of month. -->
			{:else if dateValue.day === 1}
				<div
					class={cn(baseTickClass, '')}
					style="position: absolute; left: {(index - selection.sliderValue[0]) *
						(1 / numTicks) *
						100}%; translate: -50%"
				>
					<span class="text-neutral-11 absolute -translate-y-[14px] text-xs">
						{getMonthString(dateValue.month as MonthNumber)}
					</span>
					<span
						class={cn(baseTickDayLabelClass, '')}
						style="transform: translateX({tickLabelTranslate}px)"
						class:hidden={tickWidth < tickLabelThreshold}
					>
						{dateValue.day.toString().padStart(2, '0')}
					</span>
					<span class={cn(baseTickLineClass, 'h-[14px]')}></span>
				</div>

				<!-- Start of week. -->
			{:else if getDayOfWeek(dateValue, 'en-US') === 0}
				<div
					class={cn(baseTickClass, '')}
					style="position: absolute; left: {(index - selection.sliderValue[0]) *
						(1 / numTicks) *
						100}%; translate: -50%"
				>
					<span
						class={cn(baseTickDayLabelClass, 'text-neutral-11')}
						style="transform: translateX({tickLabelTranslate}px)"
						class:hidden={tickWidth < tickLabelThreshold}
					>
						{dateValue.day.toString().padStart(2, '0')}
					</span>
					<span class={cn(baseTickLineClass, '')}></span>
				</div>

				<!-- Other. -->
			{:else}
				<div
					class={cn(baseTickClass, '')}
					style="position: absolute; left: {(index - selection.sliderValue[0]) *
						(1 / numTicks) *
						100}%; translate: -50%"
				>
					<span
						class={cn(baseTickDayLabelClass, '')}
						style="transform: translateX({tickLabelTranslate}px)"
						class:hidden={tickWidth < tickLabelThreshold}
					>
						{dateValue.day.toString().padStart(2, '0')}
					</span>
					<span class={cn(baseTickLineClass, '')}></span>
				</div>
			{/if}
		{/if}
	{/each}
</div>
