<script lang="ts">
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';

	import { cn } from '$utils';

	import DrawerOverlay from './drawer-overlay.svelte';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: DrawerPrimitive.ContentProps = $props();
</script>

<DrawerPrimitive.Portal>
	<DrawerOverlay />
	<DrawerPrimitive.Content
		bind:ref
		class={cn(
			'bg-neutral-1 fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border',
			className
		)}
		{...restProps}
	>
		<div class="bg-neutral-3 mx-auto mt-4 h-2 w-[100px] rounded-full"></div>
		{@render children?.()}
	</DrawerPrimitive.Content>
</DrawerPrimitive.Portal>
