<script lang="ts">
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils";
	import { Calendar as CalendarPrimitive } from "bits-ui";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CalendarPrimitive.DayProps = $props();
</script>

<CalendarPrimitive.Day
	bind:ref
	class={cn(
		buttonVariants({ variant: "ghost" }),
		"size-9 p-0 font-normal",
		"[&[data-today]:not([data-selected])]:bg-accent-5 [&[data-today]:not([data-selected])]:text-accent-12",
		// Selected
		"data-[selected]:bg-primary-5 data-[selected]:text-primary-12 data-[selected]:hover:bg-primary-5 data-[selected]:hover:text-primary-12 data-[selected]:focus:bg-primary-5 data-[selected]:focus:text-primary-12 data-[selected]:opacity-100",
		// Disabled
		"data-[disabled]:text-neutral-11 data-[disabled]:opacity-50",
		// Unavailable
		"data-[unavailable]:text-destructive-12 data-[unavailable]:line-through",
		// Outside months
		"data-[outside-month]:text-neutral-11 [&[data-outside-month][data-selected]]:bg-accent-5/50 [&[data-outside-month][data-selected]]:text-neutral-11 data-[outside-month]:pointer-events-none data-[outside-month]:opacity-50 [&[data-outside-month][data-selected]]:opacity-30",
		className
	)}
	{...restProps}
/>
