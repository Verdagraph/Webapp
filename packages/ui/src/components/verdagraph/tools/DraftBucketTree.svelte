<script lang="ts">
	import { useQuery } from '@triplit/svelte';

	import { Button } from '$core/button/index.js';
	import { ScrollArea } from '$core';
	import { getAppContext } from '$state';

	import { getVerdagraphContext } from '../verdagraphContext.svelte';

	const ctx = getAppContext();
	const verdagraphContext = getVerdagraphContext();

	const draftBucketId = $derived(verdagraphContext.draftBucket.current?.id);

	const plantsQuery = $derived(
		draftBucketId
			? useQuery(
					ctx.controller.triplit,
					ctx.controller.triplit
						.query('plants')
						.Where('draftBucketId', '=', draftBucketId)
				)
			: null
	);
	const plants = $derived(plantsQuery?.results ?? []);

	function removePlant(id: string) {
		ctx.controller.triplit.delete('plants', id);
	}
</script>

<div class="flex h-full flex-col">
	<ScrollArea.Root class="flex-1 px-2">
		{#if plants.length === 0}
			<span class="p-2 italic">Nothing staged yet.</span>
		{:else}
			<ul>
				{#each plants as plant (plant.id)}
					<li class="flex items-center justify-between gap-2 border-b py-1">
						<span>{plant.cultivarName} &times;{plant.quantity}</span>
						<Button variant="ghost" size="sm" onclick={() => removePlant(plant.id)}
							>Remove</Button
						>
					</li>
				{/each}
			</ul>
		{/if}
	</ScrollArea.Root>

	{#if plants.length > 0}
		<div class="flex gap-2 border-t p-2">
			<Button
				variant="default"
				class="flex-1"
				onclick={() => verdagraphContext.draftBucket.commit()}>Commit</Button
			>
			<Button
				variant="destructive"
				class="flex-1"
				onclick={() => verdagraphContext.draftBucket.discard()}>Discard</Button
			>
		</div>
	{/if}
</div>
