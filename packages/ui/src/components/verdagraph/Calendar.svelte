<script lang="ts">
	import { CalendarDate } from '@internationalized/date';
	import { mode } from 'mode-watcher';

	import type {
		Cultivar,
		CultivarPlantingWindow,
		Plant,
		PlantingWindow
	} from '@vdg-webapp/models';

	import { iconIds } from '$assets';
	import { RangeCalendar, createCalendarContext } from '$components';
	import {
		plantCalendarItem,
		plantingWindowCalendarItem,
		stampPreviewCalendarItem
	} from '$components/rangeCalendar/items';
	import { getAppContext } from '$state';
	import { getColor } from '$utils';

	import TestComponent from './TestComponent.svelte';
	import { getVerdagraphContext } from './verdagraphContext.svelte';

	type Props = {
		plants: Plant[];
	};
	let { plants }: Props = $props();

	const ctx = getAppContext();
	const verdagraphContext = getVerdagraphContext();

	const windows: CultivarPlantingWindow[] = [
		{
			cultivar: {
				id: 'cultivar',
				collectionId: '',
				name: '',
				abbreviation: 'a',
				description: '',
				attributes: {},
				createdAt: new Date()
			},
			environment: {
				id: '',
				name: '',
				gardenId: '',
				description: '',
				parentType: 'GARDEN',
				inherit: false,
				attributes: {}
			},
			windows: [
				{
					range: { start: new Date(2026, 0, 1), end: new Date(2026, 0, 6) },
					suitability: 1
				}
			]
		}
	];
	const plantItems = $derived(
		plants
			.map((plant) => {
				return plantCalendarItem({
					plant: plant,
					cultivar: ctx.plants.getCultivar(plant.cultivarName)
				});
			})
			.filter((item) => item !== null)
	);

	/**
	 * The Add Plants tool's in-progress, not-yet-saved stamp(s) - previewed
	 * here the same way CreatePlantsContainer previews them on the spatial
	 * Layout canvas, so you can see when a stamp will land, not just where.
	 * Only SINGLE mode exists today (see CreatePlantsContainer.svelte), but
	 * this loops form.data.plants rather than hardcoding index 0 so Group/
	 * Pattern modes pick up a preview for free once built.
	 */
	const stampPreviewItems = $derived(
		verdagraphContext.plantsCreateForm.form.data.mode === 'SINGLE'
			? verdagraphContext.plantsCreateForm.form.data.plants
					.map((plant, plantIndex) =>
						stampPreviewCalendarItem({
							plantIndex,
							plant,
							cultivar: ctx.plants.getCultivar(plant.cultivarName)
						})
					)
					.filter((item) => item !== null)
			: []
	);
	const plantingWindowItems = $derived(
		windows
			.map((window) => plantingWindowCalendarItem({ plantingWindow: window }))
			.filter((item) => item !== null)
	);

	const calendarContext = createCalendarContext(verdagraphContext.timeline, [
		{
			entityType: 'plants',
			items: () => [...plantItems, ...stampPreviewItems],
			defaultExpanded: true
		},
		{
			entityType: 'plantingWindows',
			items: () => plantingWindowItems,
			defaultExpanded: true
		},
		{ entityType: 'actions', items: () => [], defaultExpanded: true }
	]);
</script>

<RangeCalendar timeline={verdagraphContext.timeline} context={calendarContext} />
