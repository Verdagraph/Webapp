<script lang="ts">
	import { app } from '@vdg-webapp/models';

	import { EditableTree } from '$components';
	import { ScrollArea, Select } from '$core';
	import { Button } from '$core/button/index.js';
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
					: `${bucket.name} (${bucket.creatorUsername ?? 'unknown'})`
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

	/**
	 * Filters the garden's whole-plants query (plantsContext.svelte.ts, the
	 * one canonical query - already includes everything this tree needs)
	 * down to the active bucket's plants, rather than firing a second,
	 * near-identical query with its own copy of the same relation includes.
	 */
	const plants = $derived(
		draftBucketId
			? ctx.plants.plants.filter((plant) => plant.draftBucketId === draftBucketId)
			: []
	);
	const workspaces = $derived(ctx.workspaces.workspaces);

	const controller = createPlantTreeController({
		plants: () => plants,
		workspaces: () => workspaces,
		plantDeleteHandler: (id) => {
			ctx.controller.db.delete(app.plants, id);
		}
	});
</script>

<div class="flex h-full flex-col">
	<div class="border-b p-2">
		<Select.Root
			type="single"
			items={[
				...bucketOptions,
				{ value: NEW_DRAFT_BUCKET_VALUE, label: '+ New draft' }
			]}
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
						<Select.Item value={option.value} label={option.label}
							>{option.label}</Select.Item
						>
					{/each}
				</Select.Group>
				<Select.Item value={NEW_DRAFT_BUCKET_VALUE} label="+ New draft"
					>+ New draft</Select.Item
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
				onclick={() => verdagraphContext.draftBuckets.commit(draftBucketId)}
				>Commit</Button
			>
			<Button
				variant="destructive"
				class="flex-1"
				onclick={() => verdagraphContext.draftBuckets.discard(draftBucketId)}
				>Discard</Button
			>
		</div>
	{/if}
</div>
