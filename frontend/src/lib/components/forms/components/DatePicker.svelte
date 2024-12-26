<script lang="ts">
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import {
		DateFormatter,
		type DateValue,
		getLocalTimeZone
	} from '@internationalized/date';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';

	const df = new DateFormatter('en-US', {
		day: '2-digit',
		month: 'short',
		year: '2-digit'
	});

	type Props = {
		value: DateValue | undefined;
		minValue?: DateValue | undefined;
		maxValue?: DateValue | undefined;
		onValueChange?: (date: DateValue | undefined) => void;
	};
	let { value = $bindable(), minValue, maxValue, onValueChange }: Props = $props();
</script>

<Popover.Root>
	<Popover.Trigger
		class={cn(
			buttonVariants({
				variant: 'outline',
				class: 'w-full justify-start text-left font-normal'
			}),
			!value && 'text-muted-foreground'
		)}
	>
		<CalendarIcon />
		{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0">
		<Calendar type="single" bind:value />
	</Popover.Content>
</Popover.Root>
