<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import { cn } from '$lib/utils/shadcn.js';

	type $$Props = SelectPrimitive.TriggerProps & {
		chevron: boolean | undefined;
	};
	type $$Events = SelectPrimitive.TriggerEvents;

	let className: $$Props['class'] = undefined;
	export { className as class };
	export let chevron: boolean = true;
</script>

<SelectPrimitive.Trigger
	class={cn(
		'border-input ring-offset-background bg-neutral-1 focus-visible:ring-primary-6 aria-[invalid]:border-destructive-7 data-[placeholder]:[&>span]:text-neutral-4 flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
		className
	)}
	{...$$restProps}
	let:builder
	on:click
	on:keydown
>
	<slot {builder} />
	{#if chevron}
		<div>
			<ChevronDown class="h-4 w-4 opacity-50" />
		</div>
	{/if}
</SelectPrimitive.Trigger>
