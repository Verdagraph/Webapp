<script lang="ts">
	import Icon from '@iconify/svelte';
	//import { Tabs } from 'bits-ui';
	import * as Tabs from '$components/ui/tabs';
	import { Button } from '$lib/components/ui/button';
	import iconIds from '$lib/assets/icons';
	import createToolbox from './tools.svelte';

	type Props = {
		toolbox: ReturnType<typeof createToolbox<any>>;
	};
	let { toolbox }: Props = $props();
</script>

<Tabs.Root bind:value={toolbox.lastActivatedId} class="bg-neutral-1 h-full">
	<Tabs.List class="">
		{#each toolbox.activeTools as tool}
			<Tabs.Trigger
				value={tool.id}
				class="border-neutral-5 text-neutral-11 flex w-full items-center justify-between border-b p-0 px-8 py-1 {toolbox.lastActivatedId ===
				tool.id
					? 'bg-neutral-2 hover:bg-neutral-3'
					: 'bg-neutral-1 hover:bg-neutral-2'}"
			>
				<span>
					{tool.label}
				</span>
				<Button
					variant="ghost"
					class="hover:bg-accent-5 h-auto rounded-md p-1"
					onclick={() => toolbox.deactivate(tool.id)}
				>
					<Icon icon={iconIds.defaultClose} width="1rem" />
				</Button>
			</Tabs.Trigger>
		{/each}
	</Tabs.List>
	{#each toolbox.activeTools as tool}
		<Tabs.Content value={tool.id}>
			<tool.ToolComponent />
		</Tabs.Content>
	{/each}
</Tabs.Root>
