<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';

	import { cn } from '$utils';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CalendarPrimitive.CellProps = $props();
</script>

<CalendarPrimitive.Cell
	bind:ref
	class={cn(
		'[&:has([data-selected])]:bg-accent-5 [&:has([data-selected][data-outside-month])]:bg-accent-5/50 relative size-9 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:rounded-md',
		className
	)}
	{...restProps}
/>
