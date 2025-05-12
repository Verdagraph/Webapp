<script lang="ts">
	import { Avatar as AvatarPrimitive } from 'bits-ui';

	import { cn } from '../../utils';

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
