<script lang="ts">
	import { useQuery } from '@triplit/svelte';

	import { EditableTree } from '$components';
	import { Button } from '$core/button/index.js';
	import { ScrollArea, Select } from '$core';
	import { getAppContext } from '$state';

	import { createPlantTreeController } from '../plantTreeController.svelte';
	import { getVerdagraphContext } from '../verdagraphContext.svelte';

	/** A synthetic option value signaling "start a new draft bucket" in the switcher. */
	const NEW_DRAFT_BUCKET_VALUE = '__new__';

	const ctx = getAppContext();
	const verdagraphContext = getVerdagraphContext();

	const activeBucket = $derived(verdagraphContext.draftBuckets.active);
	const draftBucketId = $derived(activeBucket?.id);

	/** Bucket switcher options: every open bucket, labeled with its creator when it isn't yours. */
	const bucketOptions = $derived(
		verdagraphContext.draftBuckets.list.map((bucket) => ({
			value: bucket.id,
			label:
				bucket.creatorId === ctx.client.profile?.id
					? bucket.name
					: `${bucket.name} (${bucket.creator?.username ?? 'unknown'})`
		}))
	);
	const bucketSwitcherTrigger = $derived(
		bucketOptions.find((option) => option.value === draftBucketId) ?? {
			label: 'No active draft'
		}
	);

	function handleBucketSwitcherChange(value: string) {
		if (value === NEW_DRAFT_BUCKET_VALUE) {
			verdagraphContext.draftBuckets.createNew();
		} else {
			verdagraphContext.draftBuckets.setActive(value);
		}
	}

	const plantsQuery = $derived(
		draftBucketId
			? useQuery(
					ctx.controller.triplit,
					ctx.controller.triplit
						.query('plants')
						.Where('draftBucketId', '=', draftBucketId)
						.Include('expectedLifespan', (rel) =>
							rel('expectedLifespan')
								.Include('geometryHistory', (rel) =>
									rel('geometryHistory').Include('geometries', (rel) =>
										rel('geometries').Include('linesCoordinates')
									)
								)
								.Include('locationHistory', (rel) =>
									rel('locationHistory').Include('locations')
								)
								.Include('observations')
						)
						.Include('recordedLifespan', (rel) =>
							rel('recordedLifespan')
								.Include('geometryHistory', (rel) =>
									rel('geometryHistory').Include('geometries', (rel) =>
										rel('geometries').Include('linesCoordinates')
									)
								)
								.Include('locationHistory', (rel) =>
									rel('locationHistory').Include('locations')
								)
								.Include('observations')
						)
						.Include('draftBucket')
				)
			: null
	);
	const plants = $derived(plantsQuery?.results ?? []);
	const workspaces = $derived(ctx.workspaces.workspaces);

	const controller = createPlantTreeController({
		plants: () => plants,
		workspaces: () => workspaces,
		plantDeleteHandler: (id) => {
			ctx.controller.triplit.delete('plants', id);
		}
	});
</script>

<div class="flex h-full flex-col">
	<div class="border-b p-2">
		<Select.Root
			type="single"
			items={[...bucketOptions, { value: NEW_DRAFT_BUCKET_VALUE, label: '+ New draft' }]}
			value={draftBucketId}
			onValueChange={handleBucketSwitcherChange}
		>
			<Select.Trigger class="w-full">
				<span>{bucketSwitcherTrigger.label}</span>
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.GroupHeading>Open drafts</Select.GroupHeading>
					{#each bucketOptions as option}
						<Select.Item value={option.value} label={option.label}>{option.label}</Select.Item>
					{/each}
				</Select.Group>
				<Select.Item value={NEW_DRAFT_BUCKET_VALUE} label="+ New draft">+ New draft</Select.Item
				>
			</Select.Content>
		</Select.Root>
	</div>

	<ScrollArea.Root class="flex-1 px-2">
		{#if plants.length === 0}
			<span class="p-2 italic">Nothing staged yet.</span>
		{:else}
			<EditableTree
				editableTree={controller.editableTree}
				fieldErrors={controller.fieldErrors}
				editing={verdagraphContext.editing}
			/>
		{/if}
	</ScrollArea.Root>

	{#if plants.length > 0 && draftBucketId}
		<div class="flex gap-2 border-t p-2">
			<Button
				variant="default"
				class="flex-1"
				onclick={() => verdagraphContext.draftBuckets.commit(draftBucketId)}>Commit</Button
			>
			<Button
				variant="destructive"
				class="flex-1"
				onclick={() => verdagraphContext.draftBuckets.discard(draftBucketId)}>Discard</Button
			>
		</div>
	{/if}
</div>
