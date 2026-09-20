<script lang="ts" module>
	import type { FormPath as _FormPath } from '$state/form';

	type T = Record<string, unknown>;
	type U = _FormPath<T>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPath<T>">
	import type { WithElementRef, WithoutChildren } from 'bits-ui';
	import { useId } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import type { FormPath, FormState } from '$state/form';
	import { cn } from '$utils';

	import { setFieldContext } from './formContext';

	let {
		ref = $bindable(null),
		class: className,
		form,
		name,
		children,
		...restProps
	}: WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> & {
		form: FormState<never, T>;
		name: U;
		children?: Snippet;
	} = $props();

	setFieldContext(
		useId(),
		() => form,
		() => name
	);
</script>

<div bind:this={ref} class={cn('space-y-4', className)} {...restProps}>
	{@render children?.()}
</div>
