<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Calendar as CalendarPrimitive } from 'bits-ui';

	import icons from '../../assets/icons';
	import { buttonVariants } from '../button/index.js';
	import { cn } from '../../utils';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: CalendarPrimitive.PrevButtonProps = $props();
</script>

{#snippet Fallback()}
	<Icon icon={icons.chevronRight} width="1rem" />
{/snippet}

<CalendarPrimitive.NextButton
	bind:ref
	class={cn(
		buttonVariants({ variant: 'outline' }),
		'size-7 bg-transparent p-0 opacity-50 hover:opacity-100',
		className
	)}
	children={children || Fallback}
	{...restProps}
/>
