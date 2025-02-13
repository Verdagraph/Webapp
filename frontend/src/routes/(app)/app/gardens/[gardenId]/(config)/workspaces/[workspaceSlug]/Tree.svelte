<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Tree, type TreeItem } from 'melt/builders';
	import { Toolbar } from 'bits-ui';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import { type PaneAPI } from 'paneforge';
	import { localStore } from '$state/localStore.svelte';
	import iconIds from '$lib/assets/icons';

	type TreeViewConfig = {
		toggles: {
			workspaceEnabled: boolean;
			plantingAreasEnabled: boolean;
			environmentsEnabled: boolean;
		};
	};
	const treeViewConfig = localStore<TreeViewConfig>('workspaceTreeViewConfig', {
		toggles: {
			workspaceEnabled: true,
			plantingAreasEnabled: true,
			environmentsEnabled: true
		}
	});
	let treeViewConfigToolbarState = $derived(
		Object.entries(treeViewConfig.value.toggles)
			.filter(([key, value]) => value === true)
			.map(([key, value]) => key)
	);s

	type Item = TreeItem<{ label: string; icon: string; description: string }>;

	//const tree = new Tree()
</script>

<div class="flex h-full flex-col">
	<!-- Toolbar. -->
	<Toolbar.Root class="bg-neutral-1 border-neutral-7 border-b p-0">
		<Toolbar.Group
			class="flex w-full items-center justify-around p-0"
			type="multiple"
			bind:value={
				() => treeViewConfigToolbarState,
				(newVal) => {
					treeViewConfig.value.toggles.workspaceEnabled =
						newVal.includes('workspaceEnabled');
					treeViewConfig.value.toggles.plantingAreasEnabled =
						newVal.includes('plantingAreasEnabled');
					treeViewConfig.value.toggles.environmentsEnabled =
						newVal.includes('environmentsEnabled');
				}
			}
		>
			<Toolbar.GroupItem
				value="workspaceEnabled"
				class="bg-neutral-1 data-[state=on]:bg-neutral-3 flex h-6 w-full items-center justify-center transition-colors"
			>
				<Icon
					icon={iconIds.workspaceIcon}
					width="1rem"
					class="text-neutral-10 data-[state=on]:text-neutral-11"
				/>
			</Toolbar.GroupItem>
			<Toolbar.GroupItem
				value="plantingAreasEnabled"
				class="bg-neutral-1 data-[state=on]:bg-neutral-3 flex h-6 w-full items-center justify-center transition-colors"
			>
				<Icon
					icon={iconIds.plantingAreaIcon}
					width="1rem"
					class="text-neutral-10 data-[state=on]:text-neutral-11"
				/>
			</Toolbar.GroupItem>
			<Toolbar.GroupItem
				value="environmentsEnabled"
				class="bg-neutral-1 data-[state=on]:bg-neutral-3 flex h-6 w-full items-center justify-center transition-colors"
			>
				<Icon
					icon={iconIds.environmentIcon}
					width="1rem"
					class="text-neutral-10 data-[state=on]:text-neutral-11"
				/>
			</Toolbar.GroupItem>
		</Toolbar.Group>
	</Toolbar.Root>
	<div class="grow">
		<Resizable.PaneGroup direction="vertical">
			{#if treeViewConfig.value.toggles.workspaceEnabled}
				<Resizable.Pane defaultSize={20} order={1} minSize={10}>
					workspace
				</Resizable.Pane>
				<Resizable.Handle withHandle={false} />
			{/if}
			{#if treeViewConfig.value.toggles.plantingAreasEnabled}
				<Resizable.Pane defaultSize={40} order={2} minSize={10}>
					planting area
				</Resizable.Pane>
				<Resizable.Handle withHandle={false} />
			{/if}
			{#if treeViewConfig.value.toggles.environmentsEnabled}
				<Resizable.Pane defaultSize={40} order={3} minSize={10}>
					environment
				</Resizable.Pane>
			{/if}
		</Resizable.PaneGroup>
	</div>
</div>

<!-- Workspace name -->

<!-- Workspace description -->

<!-- Planting area trees -->

<!-- Planting area name -->

<!-- Planting area description -->

<!-- Planting area geometries -->

<!-- Geometry type -->

<!-- Geometry attributes -->

<!-- Rectangle attributes -->

<!-- Polygon attributes -->

<!-- Ellipse attributes -->

<!-- Lines attributes -->

<!-- Scale factor -->

<!-- Rotation -->

<!-- Nulled -->

<!-- Planting area locations -->

<!-- Planting area depth -->

<!-- Planting area movable -->
