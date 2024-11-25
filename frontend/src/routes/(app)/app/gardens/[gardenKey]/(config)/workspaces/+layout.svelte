<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import iconIds from '$lib/assets/icons';
	import * as Menubar from '$components/ui/menubar';
	import { Button } from '$components/ui/button';
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

	console.log(activeGardenKey.value);
</script>

<!-- Workspaces toolbar -->
<Menubar.Root
	class="border-neutral-8 justify-center border-0 border-b md:justify-start"
>
	<!-- Workspaces Menu -->
	<Menubar.Menu>
		<Menubar.Trigger>Workspaces</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Group>
				<Menubar.Trigger>Workspaces</Menubar.Trigger>
				{#each workspaces as workspace, index}
					{#if index <= workspacesDropdownMaxItems}
						<Menubar.Item>
							<Button
								href="/app/gardens/{$page.params.gardenKey}/workspaces/{workspace.slug}"
								class="text-light"
							>
								{workspace.name}
							</Button>
						</Menubar.Item>
					{/if}
				{/each}
				<Menubar.Item>
					<Button
						href="/app/gardens/{$page.params.gardenKey}/workspaces"
						class="flex items-center justify-between"
					>
						<span> See All </span>
						<Icon icon={iconIds.listIcon} width="1.25rem" class="text-neutral-10" />
					</Button>
				</Menubar.Item>
			</Menubar.Group>
			<Menubar.Separator />
			<Menubar.Item>
				<Button
					href="/app/gardens/{$page.params.gardenKey}/workspaces/create"
					class="flex items-center justify-between"
				>
					<span> Create Workspace </span>
					<Icon icon={iconIds.addIcon} width="1.25rem" class="text-neutral-10" />
				</Button>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>

	{#if activeWorkspace.value.activeWorkspaceId}
		<!-- Select Menu -->
		<Menubar.Menu>
			<Menubar.Trigger>Select</Menubar.Trigger>
			<Menubar.Content></Menubar.Content>
		</Menubar.Menu>

		<!-- Edit Menu -->
		<Menubar.Menu>
			<Menubar.Trigger>Edit</Menubar.Trigger>
			<Menubar.Content>
				{#if activeWorkspace.value.editing}
					<Menubar.Item>
						<Button
							class="flex items-center justify-start"
							onclick={() => {
								activeWorkspace.value.editing = false;
							}}
						>
							<Icon
								icon={iconIds.endEditingIcon}
								width="1.25rem"
								class="text-neutral-11 mr-2"
							/>
							<span> End Editing </span>
						</Button>
					</Menubar.Item>
					<Menubar.Item>
						<Button
							class="flex items-center justify-start"
							onclick={() => {
								forms.activateForm('translate');
							}}
						>
							<Icon
								icon={iconIds.verdagraphTranslateIcon}
								width="1.25rem"
								class="text-neutral-11 mr-2"
							/>
							<span> Translate </span>
						</Button>
					</Menubar.Item>
					<Menubar.Item class="flex items-center justify-start">
						<Icon
							icon={iconIds.deleteIcon}
							width="1.25rem"
							class="text-neutral-11 mr-2"
						/>
						<span> Delete </span>
					</Menubar.Item>
				{:else}
					<Menubar.Item>
						<Button
							class="flex items-center justify-start"
							onclick={() => {
								activeWorkspace.value.editing = true;
							}}
						>
							<Icon
								icon={iconIds.startEditingIcon}
								width="1.25rem"
								class="text-neutral-11 mr-2"
							/>
							<span> Start Editing </span>
						</Button>
					</Menubar.Item>
				{/if}
			</Menubar.Content>
		</Menubar.Menu>

		<!-- Add Menu -->
		{#if activeWorkspace.value.editing}
			<Menubar.Menu>
				<Menubar.Trigger>Add</Menubar.Trigger>
				<Menubar.Content>
					<Menubar.Item>
						<Button
							class="flex items-center justify-between"
							onclick={() => {
								forms.activateForm('addPlantingArea');
							}}
						>
							<Icon
								icon={iconIds.plantingAreaIcon}
								width="1.25rem"
								class="text-neutral-11"
							/>
							<span> Add Planting Area </span>
						</Button>
					</Menubar.Item>
				</Menubar.Content>
			</Menubar.Menu>
		{/if}

		<!-- View Menu -->
		<Menubar.Menu>
			<Menubar.Trigger>View</Menubar.Trigger>
			<Menubar.Content>
				<Menubar.Group>
					<Menubar.CheckboxItem bind:checked={activeWorkspace.value.treeEnabled}>
						<div class="flex w-full items-center justify-between">
							<span> Tree </span>
							<Icon icon={iconIds.verdagraphTreeIcon} width="1rem" />
						</div>
					</Menubar.CheckboxItem>
					<Menubar.CheckboxItem bind:checked={activeWorkspace.value.layoutEnabled}>
						<div class="flex w-full items-center justify-between">
							<span> Layout </span>
							<Icon icon={iconIds.verdagraphLayoutIcon} width="1rem" />
						</div>
					</Menubar.CheckboxItem>
				</Menubar.Group>
			</Menubar.Content>
		</Menubar.Menu>
	{/if}
</Menubar.Root>

{@render children()}
