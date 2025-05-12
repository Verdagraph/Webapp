<script lang="ts">
	import { cn } from '../../utils';
	import type { WithoutChild } from 'bits-ui';
	import * as FormPrimitive from 'formsnap';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithoutChild<FormPrimitive.DescriptionProps> = $props();
</script>

<FormPrimitive.Description
	bind:ref
	class={cn('text-neutral-11 text-sm', className)}
	{...restProps}
/>
