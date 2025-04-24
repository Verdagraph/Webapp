<script lang="ts">
	import Toolbar from './Toolbar.svelte';
    import NoneditableSliderBar from '$components/timeline/TimelineSelector/NoneditableSliderBar.svelte';
    import { getVerdagraphContext } from '../verdagraphContext.svelte';

	const verdagraphContext = getVerdagraphContext();

	let width = $state(0);
	let numSections = $derived(verdagraphContext.timeline.sliderValue[2] - verdagraphContext.timeline.sliderValue[2])
	let sectionWidth = $derived(width / numSections)
</script>

<div bind:clientWidth={width} class="flex h-full w-full flex-col">
	<div>
		<Toolbar />
	</div>

	<div>
		<NoneditableSliderBar selection={verdagraphContext.timeline} {width} />
	</div>

	<div class="flex-grow"></div>
</div>
