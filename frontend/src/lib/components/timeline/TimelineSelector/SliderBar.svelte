<script lang="ts">
	import { Slider } from 'bits-ui';
	import { type TimelineSelection } from '../timelineSelection.svelte';
	import { getDayOfWeek, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils';
	import { getMonthString } from '../utils';

	type Props = {
		selection: TimelineSelection;
	};
	let { selection }: Props = $props();

	const baseTickClass = 'self-end flex items-start';
	const baseTickDayLabelClass = 'absolute text-xs text-neutral-10 ml-[3px]';
	const baseTickLineClass = 'bg-neutral-8 h-[12px] w-[2px] rounded-t-lg';
</script>

<Slider.Root
	bind:value={() => selection.sliderValue,
	(newVal) => {
		selection.updateSlider(newVal);
	}}
	min={selection.minSliderValue}
	max={selection.maxSliderValue}
	class="relative flex h-12 w-full touch-none select-none"
>
	{#snippet children({ thumbs, ticks })}
		<span class="bg-neutral-2 h-[2px] w-full cursor-pointer self-start">
			<Slider.Range class="bg-neutral-2 h-3" />
		</span>
		{#each thumbs as index}
			<Slider.Thumb
				{index}
				class="focus-visible:ring-neutal-11 active:scale-98 bg-neutral-9 h-1/3 w-1 cursor-pointer self-start rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
			/>
		{/each}

		{#each ticks as index}
			{#if index > 0 && index < selection.maxSliderValue}
				{@const dateValue = selection.sliderValueToDateValue(index)}

				<!-- Render a different tick depending on the date. -->

				<!-- Start of year. -->
				{#if dateValue.month === 1 && dateValue.day === 1}
					<Slider.Tick {index}>
						{#snippet child({ props })}
							<div {...props} class={cn(baseTickClass, '')}>
								<span class="text-neutral-11 absolute -translate-y-[20px] text-sm">
									{dateValue.year}
								</span>
								<span class={cn(baseTickDayLabelClass, '')}>
									{dateValue.day.toString().padStart(2, '0')}
								</span>
								<span class={cn(baseTickLineClass, 'h-[18px]')}></span>
							</div>
						{/snippet}
					</Slider.Tick>

					<!-- Start of month. -->
				{:else if dateValue.day === 1}
					<Slider.Tick {index}>
						{#snippet child({ props })}
							<div {...props} class={cn(baseTickClass, '')}>
								<span class="text-neutral-11 absolute -translate-y-[16px] text-xs">
									{getMonthString(dateValue.month)}
								</span>
								<span class={cn(baseTickDayLabelClass, '')}>
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
								<span class={cn(baseTickDayLabelClass, 'text-neutral-11')}>
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
								<span class={cn(baseTickDayLabelClass, '')}>
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
