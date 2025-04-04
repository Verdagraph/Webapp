<script lang="ts">
	import { Slider } from 'bits-ui';
	import { type TimelineSelection } from '../timelineSelection.svelte';
	import { getDayOfWeek } from '@internationalized/date';
	import { cn } from '$lib/utils';
	import { getMonthString, type MonthNumber } from '../utils';

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
	const tickLineWidth = 2;
	let tickWidth = $derived(width / selection.maxSliderValue);
	let tickLabelTranslate = $derived(tickWidth / 2 + tickLineWidth - 7);

	/** The minimum amount of pixels that will allow the tick day labels to show. */
	const tickLabelThreshold = 16;

	const baseTickClass = 'self-end flex items-end h-[14px]';
	const baseTickDayLabelClass =
		'absolute text-[9px] text-neutral-9 w-[14px] text-center';
	const baseTickLineClass = `bg-neutral-7 h-[12px] w-[2px] rounded-t-lg`;
</script>

<Slider.Root
	bind:value={
		() => selection.sliderValue,
		(newVal) => {
			selection.updateSlider(newVal);
		}
	}
	min={selection.minSliderValue}
	max={selection.maxSliderValue}
	disabled={selection.disabled}
	class="relative flex h-12 w-full touch-none select-none"
>
	{#snippet children({ thumbs, ticks })}
		<span class="h-3 w-full cursor-pointer self-start">
			<Slider.Range class="bg-primary-8 h-3" />
		</span>
		{#each thumbs as index}
			<Slider.Thumb
				{index}
				class="focus-visible:ring-neutal-11 active:scale-98 bg-neutral-11 h-1/3 w-1 cursor-pointer self-start rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
			/>
		{/each}

		{#each ticks as index}
			{#if index >= 0 && index < selection.maxSliderValue}
				{@const dateValue = selection.sliderValueToDateValue(index)}

				<!-- Render a different tick depending on the date. -->

				<!-- Start of year. -->
				{#if dateValue.month === 1 && dateValue.day === 1}
					<Slider.Tick {index}>
						{#snippet child({ props })}
							<div {...props} class={cn(baseTickClass, '')}>
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
						{/snippet}
					</Slider.Tick>

					<!-- Start of month. -->
				{:else if dateValue.day === 1}
					<Slider.Tick {index}>
						{#snippet child({ props })}
							<div {...props} class={cn(baseTickClass, '')}>
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
						{/snippet}
					</Slider.Tick>

					<!-- Start of week. -->
				{:else if getDayOfWeek(dateValue, 'en-US') === 0}
					<Slider.Tick {index}>
						{#snippet child({ props })}
							<div {...props} class={cn(baseTickClass, '')}>
								<span
									class={cn(baseTickDayLabelClass, 'text-neutral-11')}
									style="transform: translateX({tickLabelTranslate}px)"
									class:hidden={tickWidth < tickLabelThreshold}
								>
									{dateValue.day.toString().padStart(2, '0')}
								</span>
								<span class={cn(baseTickLineClass, '')}></span>
							</div>
						{/snippet}
					</Slider.Tick>

					<!-- Other. -->
				{:else}
					<Slider.Tick {index}>
						{#snippet child({ props })}
							<div {...props} class={cn(baseTickClass, '')}>
								<span
									class={cn(baseTickDayLabelClass, '')}
									style="transform: translateX({tickLabelTranslate}px)"
									class:hidden={tickWidth < tickLabelThreshold}
								>
									{dateValue.day.toString().padStart(2, '0')}
								</span>
								<span class={cn(baseTickLineClass, '')}></span>
							</div>
						{/snippet}
					</Slider.Tick>
				{/if}
			{/if}
		{/each}
	{/snippet}
</Slider.Root>
