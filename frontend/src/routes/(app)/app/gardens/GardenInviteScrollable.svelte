<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import type { AcceptancePendingMembershipsQueryResult } from '$data/garden/queries';
	import GardenInvite from './GardenInvite.svelte';

	type Props = {
		invites: AcceptancePendingMembershipsQueryResult[];
	};

	let { invites }: Props = $props();
</script>

<ScrollArea
	type="auto"
	orientation="vertical"
	class="w-auto {invites.length > 1 ? 'h-96' : 'h-48'}"
>
	<ul class="p-4">
		{#each invites as invite}
			<GardenInvite {invite} />
		{/each}
	</ul>
</ScrollArea>
