<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

	import { cn } from '$utils';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DropdownMenuPrimitive.SubContentProps = $props();
</script>

<DropdownMenuPrimitive.SubContent
	bind:ref
	class={cn(
		'bg-neutral-3 text-neutral-12 z-50 min-w-[8rem] rounded-md border p-1 shadow-lg focus:outline-none',
		className
	)}
	{...restProps}
/>
