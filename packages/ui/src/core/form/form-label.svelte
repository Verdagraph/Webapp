<script lang="ts">
	import { Label as LabelPrimitive, type WithoutChild } from 'bits-ui';

	import { Label } from '$core/label/index.js';
	import { cn } from '$utils';

	import FormInfoPopover from './form-info-popover.svelte';
	import { getControlContext } from './formContext';

	let {
		ref = $bindable(null),
		children,
		class: className,
		description,
		optional = false,
		...restProps
	}: WithoutChild<LabelPrimitive.RootProps> & {
		description?: string;
		optional?: boolean;
	} = $props();

	const control = getControlContext();
</script>

<Label
	bind:ref
	for={control.id}
	data-fs-label=""
	data-fs-error={control.field.errors.length ? '' : undefined}
	class={cn('flex items-center justify-between', className)}
	{...restProps}
>
	<div
		class="decoration-destructive-8 underline-offset-4 data-[fs-error]:underline data-[fs-error]:decoration-wavy"
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
