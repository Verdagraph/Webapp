<script lang="ts">
	import type { Plant } from '@vdg-webapp/models';

	import { RangeCalendar, createCalendarContext } from '$components';
	import {
		createPlantStampCalendarItem,
		plantCalendarItem,
		plantingWindowCalendarItems
	} from '$components/rangeCalendar/items';
	import { getAppContext } from '$state';

	import { getVerdagraphContext } from './verdagraphContext.svelte';

	type Props = {
		plants: Plant[];
	};
	let { plants }: Props = $props();

	const ctx = getAppContext();
	const verdagraphContext = getVerdagraphContext();

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
						createPlantStampCalendarItem({
							plantIndex,
							plant,
							cultivar: ctx.plants.getCultivar(plant.cultivarName)
						})
					)
					.filter((item) => item !== null)
			: []
	);
	const plantingWindowItems = $derived(
		plantingWindowCalendarItems(ctx.plantingWindows.frostDatesPlantingWindows)
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
