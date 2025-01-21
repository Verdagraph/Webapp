<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import iconIds from '$lib/assets/icons';
	import * as Menubar from '$components/ui/menubar';
	import { Button } from 'bits-ui';
	import type { Workspace } from '@vdt-webapp/common';
	import { setWorkspaceContext } from './activeWorkspace.svelte';
	import toolbox from './tools';
	import auth from '$state/auth.svelte';
	import { useQuery } from '@triplit/svelte';
	import triplit from '$data/triplit';
	import { plantingAreaSelectionQuery } from '$data/workspaces/queries';

	let { children } = $props();

	/** Maximum amount of workspaces displayed in the dropdown. */
	const workspacesDropdownMaxItems = 10;

	const workspaceContext = setWorkspaceContext();

	/** TODO: Replace with query. */
	let workspaces: Workspace[] = [
		{
			gardenId: 'f4b3b1b0-0b3b-4b3b-8b3b-0b3b1b0b3b1b',
			id: 'f4b3b1b0-0b3b-4b3b-8b3b-0b3b1b0b3b1b',
			name: 'Workspace 1',
			slug: 'workspace-1ss',
			description: ''
		}
	];

	const selectedPlantingAreas = useQuery(
		triplit,
		plantingAreaSelectionQuery.vars({
			plantingAreaIds: [...workspaceContext.selectedPlantingAreaIds]
		})
	);
	$effect(() => {
		selectedPlantingAreas.updateQuery(
			plantingAreaSelectionQuery.vars({
				plantingAreaIds: [...workspaceContext.selectedPlantingAreaIds]
			})
		);
	});
</script>

<div class="flex h-full w-full flex-col overflow-clip">
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
									onclick={() => {
										goto(
											`/app/gardens/${page.params.gardenId}/workspaces/${workspace.slug}`
										);
									}}
									class="text-light h-full w-full"
								>
									{workspace.name}
								</Button.Root>
							</Menubar.Item>
						{/if}
					{/each}
					<Menubar.Item>
						<Button.Root
							href="/app/gardens/{page.params.gardenId}/workspaces"
							class="flex h-full w-full justify-between"
						>
							<span> See All </span>
							<Icon icon={iconIds.listIcon} width="1.25rem" class="text-neutral-10" />
						</Button.Root>
					</Menubar.Item>
				</Menubar.Group>
				<!-- TODO: Check admin. -->
				{#if auth.isAuthenticated}
					<Menubar.Separator />
					<Menubar.Item>
						<Button.Root
							href="/app/gardens/{page.params.gardenId}/workspaces/create"
							class="flex h-full w-full items-center justify-between"
						>
							<span> Create Workspace </span>
							<Icon icon={iconIds.addIcon} width="1.25rem" class="text-neutral-10" />
						</Button.Root>
					</Menubar.Item>
				{/if}
			</Menubar.Content>
		</Menubar.Menu>

		<!-- Workspace specific content. -->
		{#if workspaceContext.id}
			<!-- Select menu. -->
			<Menubar.Menu>
				<Menubar.Trigger>Select</Menubar.Trigger>
				<Menubar.Content>
					<Menubar.Group>
						<Menubar.GroupHeading>Planting Areas</Menubar.GroupHeading>
						{#if selectedPlantingAreas.results && selectedPlantingAreas.results.length > 0}
							{#each selectedPlantingAreas.results as plantingArea}
								<Menubar.Item class="flex justify-between px-2">
									<span class="text-sm">
										{plantingArea.name}
									</span>
									<Button.Root
										onclick={() => {
											workspaceContext.unselectPlantingArea(plantingArea.id);
										}}
									>
										<Icon icon={iconIds.defaultClose} width="1.25rem" />
									</Button.Root>
								</Menubar.Item>
							{/each}
						{:else}
							<Menubar.Item>
								<span class="italic">None</span>
							</Menubar.Item>
						{/if}
					</Menubar.Group>
				</Menubar.Content>
			</Menubar.Menu>

			<!-- Edit Menu -->
			<Menubar.Menu>
				<Menubar.Trigger>Edit</Menubar.Trigger>
				<Menubar.Content>
					{#if workspaceContext.editing}
						<Menubar.Item>
							<Button.Root
								class="flex h-full w-full items-center justify-start"
								onclick={() => {
									workspaceContext.editing = false;
								}}
							>
								<Icon
									icon={iconIds.endEditingIcon}
									width="1.25rem"
									class="text-neutral-11 mr-2"
								/>
								<span> End Editing </span>
							</Button.Root>
						</Menubar.Item>
						<Menubar.Item>
							<Button.Root
								class="flex h-full w-full items-center justify-start"
								onclick={() => {
									toolbox.activate('translate');
								}}
							>
								<Icon
									icon={iconIds.verdagraphTranslateIcon}
									width="1.25rem"
									class="text-neutral-11 mr-2"
								/>
								<span> Translate </span>
							</Button.Root>
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
							<Button.Root
								class="flex h-full w-full items-center justify-start"
								onclick={() => {
									workspaceContext.editing = true;
								}}
							>
								<Icon
									icon={iconIds.startEditingIcon}
									width="1.25rem"
									class="text-neutral-11 mr-2"
								/>
								<span> Start Editing </span>
							</Button.Root>
						</Menubar.Item>
					{/if}
				</Menubar.Content>
			</Menubar.Menu>

			<!-- Add Menu -->
			{#if workspaceContext.editing}
				<Menubar.Menu>
					<Menubar.Trigger>Add</Menubar.Trigger>
					<Menubar.Content>
						<Menubar.Item>
							<Button.Root
								class="flex h-full w-full items-center justify-between"
								onclick={() => {
									toolbox.activate('addPlantingArea');
								}}
							>
								<Icon
									icon={iconIds.plantingAreaIcon}
									width="1.25rem"
									class="text-neutral-11"
								/>
								<span> Add Planting Area </span>
							</Button.Root>
						</Menubar.Item>
					</Menubar.Content>
				</Menubar.Menu>
			{/if}

			<!-- View Menu -->
			<Menubar.Menu>
				<Menubar.Trigger>View</Menubar.Trigger>
				<Menubar.Content>
					<!-- Content pane toggles. -->
					<Menubar.Group>
						<Menubar.CheckboxItem
							bind:checked={workspaceContext.treeEnabled}
							disabled={!workspaceContext.layoutEnabled}
						>
							<div class="flex w-full items-center justify-between">
								<span> Tree </span>
								<Icon icon={iconIds.verdagraphTreeIcon} width="1rem" />
							</div>
						</Menubar.CheckboxItem>
						<Menubar.CheckboxItem
							bind:checked={workspaceContext.layoutEnabled}
							disabled={!workspaceContext.treeEnabled}
						>
							<div class="flex w-full items-center justify-between">
								<span> Layout </span>
								<Icon icon={iconIds.verdagraphLayoutIcon} width="1rem" />
							</div>
						</Menubar.CheckboxItem>
						<!-- Content pane direction. -->
						{#if workspaceContext.layoutEnabled && workspaceContext.treeEnabled}
							<Menubar.Sub>
								<Menubar.SubTrigger>Direction</Menubar.SubTrigger>
								<Menubar.SubContent>
									<Menubar.RadioGroup
										bind:value={workspaceContext.contentPaneDirection}
									>
										<Menubar.RadioItem value="horizontal">Horizontal</Menubar.RadioItem>
										<Menubar.RadioItem value="vertical">Vertical</Menubar.RadioItem>
									</Menubar.RadioGroup>
								</Menubar.SubContent>
							</Menubar.Sub>
						{/if}
					</Menubar.Group>

					<Menubar.Separator />

					<Menubar.Item
						onclick={() => {
							toolbox.activate('layoutConfig');
						}}
					>
						Layout Config
					</Menubar.Item>
				</Menubar.Content>
			</Menubar.Menu>
		{/if}
	</Menubar.Root>
	{@render children()}
</div>
