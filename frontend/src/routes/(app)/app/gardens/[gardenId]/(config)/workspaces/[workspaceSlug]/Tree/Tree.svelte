<script lang="ts">
	import * as Tabs from '$components/ui/tabs';
	import PlantingAreaTree from './PlantingAreaTree.svelte';

	type Props = {
		plantingAreaIds: string[];
	};
	let { plantingAreaIds }: Props = $props();
</script>

<Tabs.Root class="bg-neutral-1 flex h-full flex-col">
	<Tabs.List class="h-8 shadow-none">
		<Tabs.Trigger
			value="workspace"
			class="border-neutral-5 text-neutral-11 flex w-full items-center justify-between border-b p-0 px-4 py-1"
		>
			Workspace
		</Tabs.Trigger>
		<Tabs.Trigger
			value="plantingAreas"
			class="border-neutral-5 text-neutral-11 flex w-full items-center justify-between border-b p-0 px-4 py-1"
		>
			Planting Areas
		</Tabs.Trigger>
		<Tabs.Trigger
			value="environments"
			class="border-neutral-5 text-neutral-11 flex w-full items-center justify-between border-b p-0 px-4 py-1"
		>
			Environments
		</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="workspace" class="mt-0 overflow-hidden">workspace</Tabs.Content>
	<Tabs.Content value="plantingAreas" class="mt-0 overflow-hidden">
		<PlantingAreaTree {plantingAreaIds} />
	</Tabs.Content>
	<Tabs.Content value="environments" class="mt-0 overflow-hidden">
		environments
	</Tabs.Content>
</Tabs.Root>
