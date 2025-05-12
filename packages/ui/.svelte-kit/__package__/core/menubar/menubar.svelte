<script lang="ts">
	import { cn } from '../../utils';
	import { Menubar as MenubarPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: MenubarPrimitive.RootProps = $props();
</script>

<MenubarPrimitive.Root
	bind:ref
	class={cn(
		'bg-neutral-2 flex h-8 w-full items-center rounded-none border-b p-0',
		className
	)}
	{...restProps}
/>
