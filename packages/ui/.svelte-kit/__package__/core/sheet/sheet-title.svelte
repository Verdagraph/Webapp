<script lang="ts">
	import { Dialog as SheetPrimitive } from 'bits-ui';

	import { cn } from '../../utils';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: SheetPrimitive.TitleProps = $props();
</script>

<SheetPrimitive.Title
	bind:ref
	class={cn('text-neutral-11 text-lg font-semibold', className)}
	{...restProps}
/>
