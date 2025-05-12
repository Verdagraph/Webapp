<script lang="ts">
	import { cn } from '../../utils';
	import { Avatar as AvatarPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: AvatarPrimitive.FallbackProps = $props();
</script>

<AvatarPrimitive.Fallback
	bind:ref
	class={cn(
		'bg-neutral-3 border-neutral-5 flex h-full w-full items-center justify-center rounded-full border',
		className
	)}
	{...restProps}
/>
