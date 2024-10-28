<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Tabs } from 'bits-ui';
	import { Button } from '$lib/components/ui/button';
	import forms from '../forms.svelte';
	import iconIds from '$lib/assets/icons';
</script>

<Tabs.Root bind:value={forms.lastActivatedId} class="bg-neutral-1 h-full">
	<Tabs.List class="flex w-full flex-row justify-evenly overflow-auto">
		{#each forms.activeForms as form}
			<Tabs.Trigger
				value={form.id}
				class="border-neutral-5 text-neutral-11 flex w-full items-center justify-between border-b p-0 px-8 py-1 {forms.lastActivatedId ===
				form.id
					? 'bg-neutral-1 hover:bg-neutral-2'
					: 'bg-neutral-2 hover:bg-neutral-3'}"
			>
				<span>
					{form.label}
				</span>
				<Button
					variant="ghost"
					class="hover:bg-accent-5 h-auto rounded-md p-1"
					on:click={() => forms.deactivateForm(form.id)}
				>
					<Icon icon={iconIds.defaultClose} width="1rem" />
				</Button>
			</Tabs.Trigger>
		{/each}
	</Tabs.List>
	{#each forms.activeForms as form}
		<Tabs.Content value={form.id}>
			<svelte:component this={form.content} />
		</Tabs.Content>
	{/each}
</Tabs.Root>
