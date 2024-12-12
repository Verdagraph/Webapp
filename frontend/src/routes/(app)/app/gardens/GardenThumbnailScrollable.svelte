<script lang="ts">
	import type { Garden } from '@vdt-webapp/common';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import GardenThumbnail from './GardenThumbnail.svelte';

	type Props = {
		gardens: Garden[];
	};

	let { gardens }: Props = $props();
</script>

<ScrollArea type="auto" orientation="horizontal" class="mt-8 h-auto w-full pb-4">
	<div class="flex flex-row">
		{#each gardens as garden}
			<GardenThumbnail {garden} />
		{/each}
	</div>
</ScrollArea>
