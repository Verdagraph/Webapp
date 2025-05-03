<script lang="ts">
	import { getVerdagraphContext } from '../verdagraphContext.svelte';
	import { createCalendarContext, RangeCalendar } from '$components/rangeCalendar';
	import { CalendarDate } from '@internationalized/date';

	const verdagraphContext = getVerdagraphContext();
	const calendarContext = createCalendarContext(verdagraphContext.timeline, [
		'plantingWindows',
		'plants',
		'actions'
	]);

	const pane = calendarContext.getPane('plants');

	pane.items = [
		{
			id: '1',
			label: 'Lettuce',
			description: 'Lettuce cultivars',
			startDate: new CalendarDate(2025, 1, 20),
			endDate: new CalendarDate(2025, 7, 30)
		},
		{
			id: '2',
			label: 'Lettuce',
			description: 'Lettuce cultivars',
			startDate: new CalendarDate(2025, 2, 20),
			endDate: new CalendarDate(2025, 8, 30),
			children: [
				{
					id: '2a',
					label: 'Lettuce',
					description: 'Lettuce cultivars',
					startDate: new CalendarDate(2025, 2, 20),
					endDate: new CalendarDate(2025, 4, 28)
				},
				{
					id: '2b',
					label: 'Lettuce',
					description: 'Lettuce cultivars',
					startDate: new CalendarDate(2025, 3, 14),
					endDate: new CalendarDate(2025, 8, 30)
				}
			]
		},
		{
			id: '3',
			label: 'Lettuce',
			description: 'Lettuce cultivars',
			startDate: new CalendarDate(2025, 9, 12),
			endDate: new CalendarDate(2025, 11, 13)
		}
	];
</script>

<RangeCalendar timeline={verdagraphContext.timeline} context={calendarContext} />
