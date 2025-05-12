<script lang="ts">
	import { cn } from '../../utils';
	import { Calendar as CalendarPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CalendarPrimitive.HeadCellProps = $props();
</script>

<CalendarPrimitive.HeadCell
	bind:ref
	class={cn('text-neutral-11 w-9 rounded-md text-[0.8rem] font-normal', className)}
	{...restProps}
/>
