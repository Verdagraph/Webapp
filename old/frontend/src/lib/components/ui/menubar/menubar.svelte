<script lang="ts">
	import { Menubar as MenubarPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils/shadcn.js';

	type $$Props = MenubarPrimitive.Props;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<MenubarPrimitive.Root
	class={cn(
		'bg-neutral-2 flex h-10 items-center space-x-1 rounded-none border p-1',
		className
	)}
	{...$$restProps}
>
	<slot />
</MenubarPrimitive.Root>
