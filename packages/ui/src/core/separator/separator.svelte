<script lang="ts">
	import { Separator as SeparatorPrimitive } from 'bits-ui';

	import { cn } from '$utils';

	let {
		ref = $bindable(null),
		class: className,
		orientation = 'horizontal',
		...restProps
	}: SeparatorPrimitive.RootProps = $props();
</script>

<SeparatorPrimitive.Root
	bind:ref
	class={cn(
		'bg-neutral-7 shrink-0',
		orientation === 'horizontal' ? 'h-[1px] w-full' : 'min-h-full w-[1px]',
		className
	)}
	{orientation}
	{...restProps}
/>
