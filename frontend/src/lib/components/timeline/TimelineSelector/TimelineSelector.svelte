<script lang="ts">
	import DatePickerBar from './DatePickerBar.svelte';
	import SliderBar from './SliderBar.svelte';
	import { type TimelineSelection } from '../timelineSelection.svelte';

	type Props = {
		selection: TimelineSelection;
	};
	let { selection }: Props = $props();
</script>

<div class="border-neutral-6 flex h-auto w-full flex-col border-t">
	<DatePickerBar {selection} />
	<SliderBar {selection} />
</div>
