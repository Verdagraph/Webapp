<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import Icon from '@iconify/svelte';
	import { buttonVariants } from '$components/ui/button/index.js';
	import { cn } from '$utils';
	import icons from '$assets/icons';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: CalendarPrimitive.PrevButtonProps = $props();
</script>

{#snippet Fallback()}
	<Icon icon={icons.chevronLeft} width="1rem" />
{/snippet}

<CalendarPrimitive.PrevButton
	bind:ref
	class={cn(
		buttonVariants({ variant: 'outline' }),
		'size-7 bg-transparent p-0 opacity-50 hover:opacity-100',
		className
	)}
	children={children || Fallback}
	{...restProps}
/>
