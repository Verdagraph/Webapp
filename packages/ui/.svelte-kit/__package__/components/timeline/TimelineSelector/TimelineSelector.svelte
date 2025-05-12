<script lang="ts">
	import { type TimelineSelection } from '../timelineSelection.svelte';
	import DatePickerBar from './DatePickerBar.svelte';
	import SliderBar from './SliderBar.svelte';

	type Props = {
		selection: TimelineSelection;
	};
	let { selection }: Props = $props();

	let width = $state(0);
</script>

<div
	bind:clientWidth={width}
	class="border-neutral-6 flex h-24 w-full flex-col border-t"
>
	<DatePickerBar {selection} />
	<SliderBar {selection} {width} />
</div>
