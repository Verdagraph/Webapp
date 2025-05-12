<script lang="ts">
	import { cn } from '../../utils';
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DrawerPrimitive.DescriptionProps = $props();
</script>

<DrawerPrimitive.Description
	bind:ref
	class={cn('text-neutral-11 text-sm', className)}
	{...restProps}
/>
