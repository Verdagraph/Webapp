<script lang="ts">
	import type { Separator as SeparatorPrimitive } from 'bits-ui';

	import { Separator } from '$core/separator/index.js';
	import { cn } from '$utils';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: SeparatorPrimitive.RootProps = $props();
</script>

<Separator
	bind:ref
	class={cn('bg-neutral-4 -mx-1 my-1 h-px', className)}
	{...restProps}
/>
