<script lang="ts">
	import { type GardenMembership } from '@vdg-webapp/models';
	import { ScrollArea } from '@vdg-webapp/ui';

	import GardenInvite from './GardenInvite.svelte';

	type Props = {
		invites: GardenMembership[];
	};

	let { invites }: Props = $props();
</script>

<ScrollArea.Root
	type="auto"
	orientation="vertical"
	class="w-auto {invites.length > 1 ? 'h-96' : 'h-48'}"
>
	<ul class="p-4">
		{#each invites as invite}
			<GardenInvite {invite} />
		{/each}
	</ul>
</ScrollArea.Root>
