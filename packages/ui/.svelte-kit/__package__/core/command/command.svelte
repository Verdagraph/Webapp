<script lang="ts">
	import { cn } from '../../utils';
	import { Command as CommandPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		value = $bindable(''),
		class: className,
		...restProps
	}: CommandPrimitive.RootProps = $props();
</script>

<CommandPrimitive.Root
	class={cn(
		'bg-neutral-3 text-neutral-11 flex h-full w-full flex-col overflow-hidden rounded-md',
		className
	)}
	bind:value
	bind:ref
	{...restProps}
/>
