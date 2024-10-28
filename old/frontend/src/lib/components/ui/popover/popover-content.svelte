<script lang="ts">
	import { Popover as PopoverPrimitive } from 'bits-ui';
	import { cn, flyAndScale } from '$lib/utils/shadcn.js';

	type $$Props = PopoverPrimitive.ContentProps;
	let className: $$Props['class'] = undefined;
	export let transition: $$Props['transition'] = flyAndScale;
	export let transitionConfig: $$Props['transitionConfig'] = undefined;
	export { className as class };
</script>

<PopoverPrimitive.Content
	{transition}
	{transitionConfig}
	class={cn(
		'border-neutral-11 bg-neutral-3 z-50 rounded-md border p-4 shadow-md outline-none',
		className
	)}
	{...$$restProps}
>
	<slot />
</PopoverPrimitive.Content>
