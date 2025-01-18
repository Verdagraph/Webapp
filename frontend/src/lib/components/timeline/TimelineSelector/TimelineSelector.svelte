<script lang="ts">
	import DatePickerBar from './DatePickerBar.svelte';
	import SliderBar from './SliderBar.svelte';
	import { type TimelineSelection } from '../timelineSelection.svelte';

	type Props = {
		selection: TimelineSelection;
	};
	let { selection }: Props = $props();

	let width = $state(0);
</script>

<div
	bind:clientWidth={width}
	class="border-neutral-6 flex h-auto w-full flex-col border-t"
>
	<DatePickerBar {selection} />
	<SliderBar {selection} {width} />
</div>
