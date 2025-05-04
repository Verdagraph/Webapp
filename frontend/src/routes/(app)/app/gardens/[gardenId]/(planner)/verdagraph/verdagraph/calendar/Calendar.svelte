<script lang="ts">
	import { getVerdagraphContext } from '../verdagraphContext.svelte';
	import { createCalendarContext, RangeCalendar } from '$components/rangeCalendar';
	import { CalendarDate } from '@internationalized/date';
	import { getColor } from '$lib/utils';
	import mode from '$state/theme.svelte';

	const verdagraphContext = getVerdagraphContext();
	const calendarContext = createCalendarContext(verdagraphContext.timeline, [
		{ entityType: 'plants', items: () => [] },
		{
			entityType: 'plantingWindows',
			items: () => {
				return [
					{
						id: '1',
						label: 'Tomato',
						description: 'Garden - Planting Window',
						startDate: new CalendarDate(2025, 2, 10),
						endDate: new CalendarDate(2025, 7, 30),
						fillColor: getColor('tomato', 4, mode.value),
						borderColor: getColor('tomato', 7, mode.value)
					},
					{
						id: '2',
						label: 'Lettuce',
						description: 'Planting Windows',
						startDate: new CalendarDate(2025, 2, 20),
						endDate: new CalendarDate(2025, 8, 30),
						fillColor: getColor('grass', 4, mode.value),
						borderColor: getColor('grass', 7, mode.value),
						children: [
							{
								id: '2a',
								label: 'Lettuce',
								description: 'Garden - Planting Window',
								startDate: new CalendarDate(2025, 2, 20),
								endDate: new CalendarDate(2025, 4, 28),
								fillColor: getColor('green', 4, mode.value),
								borderColor: getColor('green', 7, mode.value)
							},
							{
								id: '2b',
								label: 'Lettuce',
								description: 'Environment 2 - Planting Window',
								startDate: new CalendarDate(2025, 2, 22),
								endDate: new CalendarDate(2025, 8, 30),
								fillColor: getColor('lime', 4, mode.value),
								borderColor: getColor('lime', 7, mode.value)
							}
						]
					},
					{
						id: '3',
						label: 'Beet',
						description: 'Garden - Planting Window',
						startDate: new CalendarDate(2025, 2, 5),
						endDate: new CalendarDate(2025, 2, 23),
						fillColor: getColor('purple', 4, mode.value),
						borderColor: getColor('purple', 7, mode.value)
					}
				];
			}
		},
		{ entityType: 'actions', items: () => [] }
	]);
</script>

<RangeCalendar timeline={verdagraphContext.timeline} context={calendarContext} />
