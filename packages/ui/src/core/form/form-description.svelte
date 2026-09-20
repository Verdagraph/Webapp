<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$utils';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: Omit<HTMLAttributes<HTMLParagraphElement>, 'children'> & {
		ref?: HTMLParagraphElement | null;
		children?: Snippet;
	} = $props();
</script>

<p bind:this={ref} data-fs-description="" class={cn('text-neutral-11 text-sm', className)} {...restProps}>
	{@render children?.()}
</p>
