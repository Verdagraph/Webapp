<script lang="ts">
	import { cn } from '../../utils';
	import { Menubar as MenubarPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 8,
		alignOffset = -4,
		align = 'start',
		side = 'bottom',
		...restProps
	}: MenubarPrimitive.ContentProps = $props();
</script>

<MenubarPrimitive.Content
	bind:ref
	{sideOffset}
	{align}
	{alignOffset}
	{side}
	class={cn(
		'bg-neutral-2 text-neutral-11 z-50 min-w-[12rem] rounded-md border p-1 shadow-md focus:outline-none',
		className
	)}
	{...restProps}
/>
