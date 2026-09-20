<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn } from '$utils';

	import { getFieldContext } from './formContext';

	/**
	 * Verdagraph - Modified to allow passing custom errors.
	 */

	let {
		ref = $bindable(null),
		class: className,
		errorClasses,
		children: childrenProp,
		handlerErrors,
		...restProps
	}: Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
		ref?: HTMLDivElement | null;
		errorClasses?: string | undefined | null;
		handlerErrors?: Array<string>;
		children?: Snippet<
			[{ errors: string[]; errorProps: Record<string, unknown> }]
		>;
	} = $props();

	const field = getFieldContext();
	const errorProps = { 'data-fs-field-error': '', 'data-fs-error': '' };
</script>

<div
	bind:this={ref}
	id={`${field.id}-errors`}
	data-fs-field-errors=""
	data-fs-error={field.errors.length || handlerErrors?.length ? '' : undefined}
	aria-live="assertive"
	class={cn('text-destructive-11 text-sm font-medium', className)}
	{...restProps}
>
	{#if childrenProp}
		{@render childrenProp({ errors: field.errors, errorProps })}
	{:else}
		<ul>
			{#each field.errors as error}
				<li
					{...errorProps}
					class={cn(
						errorClasses,
						'border-destructive-7 bg-destructive-3 border-x p-2 first:rounded-t-sm first:border-t last:mb-4 last:rounded-b-sm last:border-b'
					)}
				>
					{error}
				</li>
			{/each}
			{#if handlerErrors}
				{#each handlerErrors as error}
					<li
						{...errorProps}
						class={cn(
							errorClasses,
							'border-destructive-7 bg-destructive-3 border-x p-2 first:rounded-t-sm first:border-t last:mb-4 last:rounded-b-sm last:border-b'
						)}
					>
						{error}
					</li>
				{/each}
			{/if}
		</ul>
	{/if}
</div>
