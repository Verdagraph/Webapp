<script lang="ts">
	import {
		DateFormatter,
		type DateValue,
		getLocalTimeZone
	} from '@internationalized/date';
	import CalendarIcon from 'lucide-svelte/icons/calendar';

	import { buttonVariants } from '../button/index.js';
	import { Calendar } from '../calendar/index.js';
	import * as Popover from '../popover/index.js';
	import { cn } from '../../utils';

	type Props = {
		value: DateValue | undefined;
		compact?: boolean;
		minValue?: DateValue | undefined;
		maxValue?: DateValue | undefined;
		onValueChange?: (date: DateValue | undefined) => void;
		disabled?: boolean;
	};
	let {
		value = $bindable(),
		compact = false,
		minValue,
		maxValue,
		onValueChange,
		disabled = false
	}: Props = $props();

	const df = new DateFormatter('en-US', {
		day: '2-digit',
		month: 'short',
		year: '2-digit'
	});
</script>

<Popover.Root>
	<Popover.Trigger
		class={cn(
			buttonVariants({
				variant: 'outline',
				class: 'w-full justify-start text-left font-normal'
			}),
			!value && 'text-muted-foreground',
			compact && 'px-2 text-xs'
		)}
	>
		{#if !compact}
			<CalendarIcon />
		{/if}
		{value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'}
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0">
		<Calendar
			type="single"
			bind:value
			{onValueChange}
			{minValue}
			{maxValue}
			{disabled}
		/>
	</Popover.Content>
</Popover.Root>
