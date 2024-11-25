<script lang="ts">
	import { Menubar as MenubarPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: MenubarPrimitive.RootProps = $props();
</script>

<MenubarPrimitive.Root
	bind:ref
	class={cn(
		'bg-neutral-2 flex h-8 items-center space-x-1 rounded-none border-b w-full p-1',
		className
	)}
	{...restProps}
/>
