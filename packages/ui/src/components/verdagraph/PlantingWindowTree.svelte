<script lang="ts">
	import { fromDate, getLocalTimeZone } from '@internationalized/date';

	import type { CultivarPlantingWindow, FieldErrors } from '@vdg-webapp/models';

	import {
		EditableTree,
		type Item,
		TreeDate,
		TreeString,
		createEditableTree,
		toTreeBaseId,
		toTreeId
	} from '$components';

	type Props = {
		plantingWindows: CultivarPlantingWindow[];
	};
	let { plantingWindows = [] }: Props = $props();

	/** Stores errors of the tree fields. */
	const fieldErrors: FieldErrors = $state({});

	/** Construct read-only tree items: Environment > Cultivar > Window. */
	let items = $derived(
		[...Map.groupBy(plantingWindows, (entry) => entry.environment.id).values()].map(
			(environmentWindows) => {
				const environment = environmentWindows[0].environment;
				const environmentId = toTreeBaseId('plantingWindowEnvironment', environment.id);

				const cultivarItems: Item[] = environmentWindows.map((plantingWindow) => {
					const cultivarId = toTreeId(environmentId, plantingWindow.cultivar.id);

					const windowItems: Item[] = plantingWindow.windows.map((window, index) => {
						const windowId = toTreeId(cultivarId, `window[${index}]`);
						return {
							id: windowId,
							label: `Window ${index + 1}`,
							children: [
								{
									id: toTreeId(windowId, 'start'),
									label: 'Start',
									valueComponent: TreeDate,
									value: fromDate(window.range.start, getLocalTimeZone()),
									onChange: () => {}
								},
								{
									id: toTreeId(windowId, 'end'),
									label: 'End',
									valueComponent: TreeDate,
									value: fromDate(window.range.end, getLocalTimeZone()),
									onChange: () => {}
								},
								{
									id: toTreeId(windowId, 'suitability'),
									label: 'Suitability',
									valueComponent: TreeString,
									value: `${Math.round(window.suitability * 100)}%`,
									onChange: () => {}
								}
							]
						};
					});

					return {
						id: cultivarId,
						label: plantingWindow.cultivar.name || plantingWindow.cultivar.abbreviation,
						children: windowItems
					};
				});

				return {
					id: environmentId,
					label: environment.name,
					children: cultivarItems
				};
			}
		)
	);

	/** Create the editable tree. */
	const editableTree = createEditableTree<never>(
		() => items,
		{} as Record<never, never>
	);
</script>

{#if plantingWindows.length === 0}
	<span class="p-2 italic"> No planting windows. </span>
{:else}
	<EditableTree {editableTree} {fieldErrors} editing={false} />
{/if}
