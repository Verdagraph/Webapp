<script lang="ts">
	import { getVerdagraphContext } from '../verdagraphContext.svelte';
	import { createCalendarContext, RangeCalendar } from '$components/rangeCalendar';
	import { CalendarDate } from '@internationalized/date';
	import { getColor } from '$lib/utils';
	import mode from '$state/theme.svelte';

	const verdagraphContext = getVerdagraphContext();
	const calendarContext = createCalendarContext(verdagraphContext.timeline, [
		{ entityType: 'plantingWindows', items: () => [] },
		{
			entityType: 'plants',
			items: () => {
				return [
					{
						id: '1',
						label: 'Lettuce',
						description: 'Lettuce cultivars',
						startDate: new CalendarDate(2025, 1, 20),
						endDate: new CalendarDate(2025, 7, 30),
						fillColor: getColor('grass', 4, mode.value),
						borderColor: getColor('grass', 7, mode.value)
					},
					{
						id: '2',
						label: 'Lettuce',
						description: 'Lettuce cultivars',
						startDate: new CalendarDate(2025, 2, 20),
						endDate: new CalendarDate(2025, 8, 30),
						fillColor: getColor('grass', 4, mode.value),
						borderColor: getColor('grass', 7, mode.value),
						children: [
							{
								id: '2a',
								label: 'Lettuce',
								description: 'Lettuce cultivars',
								startDate: new CalendarDate(2025, 2, 20),
								endDate: new CalendarDate(2025, 4, 28),
								fillColor: getColor('grass', 4, mode.value),
								borderColor: getColor('grass', 7, mode.value)
							},
							{
								id: '2b',
								label: 'Lettuce',
								description: 'Lettuce cultivars',
								startDate: new CalendarDate(2025, 3, 14),
								endDate: new CalendarDate(2025, 8, 30),
								fillColor: getColor('grass', 4, mode.value),
								borderColor: getColor('grass', 7, mode.value)
							}
						]
					},
					{
						id: '3',
						label: 'Lettuce',
						description: 'Lettuce cultivars',
						startDate: new CalendarDate(2025, 9, 12),
						endDate: new CalendarDate(2025, 11, 13),
						fillColor: getColor('grass', 4, mode.value),
						borderColor: getColor('grass', 7, mode.value)
					}
				];
			}
		},
		{ entityType: 'actions', items: () => [] }
	]);
</script>

<RangeCalendar timeline={verdagraphContext.timeline} context={calendarContext} />
