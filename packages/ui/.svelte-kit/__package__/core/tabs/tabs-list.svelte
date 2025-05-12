<script lang="ts">
	import { cn } from '../../utils';
	import { Tabs as TabsPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: TabsPrimitive.ListProps = $props();
</script>

<TabsPrimitive.List
	bind:ref
	class={cn(
		'bg-neutral-1 text-neutral-11 flex w-full items-center justify-center rounded-none',
		className
	)}
	{...restProps}
/>
