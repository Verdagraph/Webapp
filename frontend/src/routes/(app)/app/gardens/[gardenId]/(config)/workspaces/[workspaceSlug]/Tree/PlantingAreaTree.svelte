<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import {
		EditableTree,
		editableStringAttribute,
		editableNumberAttribute
	} from '$components/editableTree';
	import triplit from '$data/triplit';
	import { plantingAreasQuery } from '$data/workspaces/queries';
	import iconIds from '$lib/assets/icons';
	import { useQuery } from '@triplit/svelte';
	import { workspaceFields } from '@vdt-webapp/common';
	import { getWorkspaceContext } from '../../activeWorkspace.svelte';

	type Props = {
		plantingAreaIds: string[];
	};
	let { plantingAreaIds }: Props = $props();

	const workspace = getWorkspaceContext();

	const query = useQuery(triplit, plantingAreasQuery.vars({ ids: plantingAreaIds }));
	$effect(() => {
		query.updateQuery(plantingAreasQuery.vars({ ids: plantingAreaIds }));
	});

	/** Given the planting areas, construct the editable tree items. */
	let items = $derived(
		(query.results || []).map((plantingArea) => {
			return {
				id: plantingArea.id,
				label: plantingArea.name,
				icon: iconIds.plantingAreaIcon,
				children: [
					{
						/** Name. */
						id: plantingArea.id + '+name',
						label: 'Name',
						description: workspaceFields.plantingAreaName.description,
						valueSnippet: editableStringAttribute,
						value: plantingArea.name,
						onChange: (changeOver: boolean, newData: string) => {}
					},

					/** Details. */
					{
						id: plantingArea.id + '+details',
						label: 'Details',
						children: [
							/** Description. */
							{
								id: plantingArea.id + '+description',
								label: 'Description',
								description: workspaceFields.plantingAreaDescription.description,
								valueSnippet: editableStringAttribute,
								value: plantingArea.description,
								onChange: (changeOver: boolean, newData: string) => {}
							},

							/** Depth. */
							{
								id: plantingArea.id + '+depth',
								label: 'Depth',
								description: workspaceFields.plantingAreaDepth.description,
								valueSnippet: editableNumberAttribute,
								value: plantingArea.depth,
								onChange: (changeOver: boolean, newData: number) => {}
							}
						]
					}
				]
			};
		})
	);
</script>

{#if plantingAreaIds.length === 0}
	<span class="p-2 italic"> No planting areas. </span>
{:else}
	<ScrollArea class="h-full w-full p-2">
		<EditableTree {items} editing={workspace.editing} />
	</ScrollArea>
{/if}
