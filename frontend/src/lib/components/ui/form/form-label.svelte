<script lang="ts">
	import type { WithoutChild } from 'bits-ui';
	import * as FormPrimitive from 'formsnap';
	import { Label } from '$lib/components/ui/label/index.js';
	import { cn } from '$lib/utils';
	import FormInfoPopover from './form-info-popover.svelte';

	/**
	 * VerdanTech - Adds a description and optional marker.
	 */
	let {
		ref = $bindable(null),
		children,
		class: className,
		description,
		optional,
		...restProps
	}: WithoutChild<FormPrimitive.LabelProps> & {
		description?: string;
		optional?: boolean;
	} = $props();
</script>

<FormPrimitive.Label {...restProps} bind:ref>
	{#snippet child({ props })}
		<Label {...props} class={cn('flex items-center justify-between', className)}>
			<div
				class=" decoration-destructive-8 underline-offset-4 data-[fs-error]:underline data-[fs-error]:decoration-wavy"
			>
				{@render children?.()}
			</div>
			<div class="flex items-center">
				{#if !optional}
					<span class="translate-y-[2px]">*</span>
				{/if}
				{#if description}
					<FormInfoPopover {description} />
				{/if}
			</div>
		</Label>
	{/snippet}
</FormPrimitive.Label>
