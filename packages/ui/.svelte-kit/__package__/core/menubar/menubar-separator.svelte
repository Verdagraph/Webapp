<script lang="ts">
	import { Menubar as MenubarPrimitive } from 'bits-ui';

	import { cn } from '../../utils';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: MenubarPrimitive.SeparatorProps = $props();
</script>

<MenubarPrimitive.Separator
	bind:ref
	class={cn('bg-neutral-3 -mx-1 my-1 h-px', className)}
	{...restProps}
/>
