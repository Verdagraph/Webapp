<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import iconIds from '$lib/assets/icons';
	import * as Menubar from '$components/ui/menubar';
	import { Button } from 'bits-ui';
	import type { Workspace } from '@vdt-webapp/common';
	import activeWorkspace from './activeWorkspace.svelte';
	import forms from './forms.svelte';
	import activeGardenKey from '$state/activeGarden.svelte';

	let { children } = $props();

	/** Maximum amount of workspaces displayed in the dropdown. */
	const workspacesDropdownMaxItems = 10;

	let workspaces: Workspace[] = [
		{
			gardenId: 'f4b3b1b0-0b3b-4b3b-8b3b-0b3b1b0b3b1b',
			id: 'f4b3b1b0-0b3b-4b3b-8b3b-0b3b1b0b3b1b',
			name: 'Workspace 1',
			slug: 'workspace-1',
			description: ''
		}
	];
</script>

<!-- Workspaces toolbar -->
<Menubar.Root
	class="border-neutral-8 justify-center border-0 border-b md:justify-start"
>
	<!-- Workspaces Menu.-->
	<Menubar.Menu>
		<Menubar.Trigger>Workspaces</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Group>
				{#each workspaces as workspace, index}
					{#if index <= workspacesDropdownMaxItems}
						<Menubar.Item>
							<Button.Root
								href="/app/gardens/{$page.params.gardenKey}/workspaces/{workspace.slug}"
								class="text-light w-full"
							>
								{workspace.name}
							</Button.Root>
						</Menubar.Item>
					{/if}
				{/each}
				<Menubar.Item>
					<Button.Root
						href="/app/gardens/{$page.params.gardenKey}/workspaces"
						class="flex w-full justify-between"
					>
						<span> See All </span>
						<Icon icon={iconIds.listIcon} width="1.25rem" class="text-neutral-10" />
					</Button.Root>
				</Menubar.Item>
			</Menubar.Group>
			<Menubar.Separator />
			<Menubar.Item>
				<Button.Root
					href="/app/gardens/{$page.params.gardenKey}/workspaces/create"
					class="flex w-full items-center justify-between"
				>
					<span> Create Workspace </span>
					<Icon icon={iconIds.addIcon} width="1.25rem" class="text-neutral-10" />
				</Button.Root>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>

{@render children()}
