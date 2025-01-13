<script lang="ts">
	import { writable } from 'svelte/store';
	import { createSlider, melt, type CreateSliderProps } from '@melt-ui/svelte';
	import {
		startOfYear,
		startOfMonth,
		startOfWeek,
		isSameDay
	} from '@internationalized/date';
	import type { DateValue } from '@internationalized/date';
	import {
		timelineSelection,
		calculateDeltaDays,
		dateToSliderDisplayIndex,
		sliderDisplayIndexToDate,
		sliderDisplayOffset
	} from '../timelineSelection.svelte';

	const sliderOnValueChange: CreateSliderProps['onValueChange'] = ({ curr, next }) => {
		if (next[0] != curr[0]) {
			timelineSelection.value.beginSelectedDays = sliderDisplayIndexToDate(next[0]);
		}
		if (next[1] != curr[1]) {
			timelineSelection.value.focusedDay = sliderDisplayIndexToDate(next[1]);
		}
		if (next[2] != curr[2]) {
			timelineSelection.value.endSelectedDays = sliderDisplayIndexToDate(next[2]);
		}
		return next;
	};

	/** TODO: Update to share runes with the timelineSelection state when melt-ui updated to Svelte 5.*/
	let sliderStore = writable([
		dateToSliderDisplayIndex(timelineSelection.value.beginSelectedDays),
		dateToSliderDisplayIndex(timelineSelection.value.focusedDay),
		dateToSliderDisplayIndex(timelineSelection.value.endSelectedDays)
	]);

	const {
		elements: { root, range, thumbs, ticks },
		options: { max }
	} = createSlider({
		value: sliderStore,
		min: 1,
		max: timelineSelection.numSliderDisplayedDays,
		step: 1,
		onValueChange: sliderOnValueChange
	});
</script>

<div use:melt={$root} class="overflow-none relative flex h-16 w-full">
	<span class="bg-neutral-6 h-[3px] w-full self-start">
		<span use:melt={$range} class="bg-neutral-9 h-[3px]"></span>
	</span>

	<span use:melt={$thumbs[0]} class="bg-neutral-9 h-1/3 w-1 self-start rounded-md"
	></span>
	<span use:melt={$thumbs[1]} class="bg-primary-8 h-1/2 w-1 self-start rounded-b-md"
	></span>
	<span use:melt={$thumbs[2]} class="bg-neutral-9 h-1/3 w-1 self-start rounded-md"
	></span>

	{#each $ticks as tick, index}
		<span use:melt={tick} class="bg-neutral-11 h-3 w-[3px] self-end rounded-t-lg">
		</span>
	{/each}
</div>
