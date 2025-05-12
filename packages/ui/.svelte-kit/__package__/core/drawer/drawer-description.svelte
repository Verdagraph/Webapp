<script lang="ts">
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';

	import { cn } from '../../utils';

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
