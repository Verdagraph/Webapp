<script lang="ts">
	import * as FormPrimitive from 'formsnap';
	import type { WithoutChild } from 'bits-ui';
	import { cn } from '$lib/utils';

	/**
	 * VerdanTech - Modified to allow passing custom errors.
	 */

	let {
		ref = $bindable(null),
		class: className,
		errorClasses,
		children: childrenProp,
		handlerErrors,
		...restProps
	}: WithoutChild<FormPrimitive.FieldErrorsProps> & {
		errorClasses?: string | undefined | null;
		handlerErrors?: Array<string>;
	} = $props();
</script>

<FormPrimitive.FieldErrors
	bind:ref
	class={cn('text-destructive-11 text-sm font-medium', className)}
	{...restProps}
>
	{#snippet children({ errors, errorProps })}
		{#if childrenProp}
			{@render childrenProp({ errors, errorProps })}
		{:else}
			<ul>
				{#each errors as error}
					<li
						{...errorProps}
						class={cn(
							errorClasses,
							'border-warning-7 bg-warning-3 border-x p-1 first:rounded-t-sm first:border-t last:mb-4 last:rounded-b-sm last:border-b'
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
								'border-warning-7 bg-warning-3 border-x p-1 first:rounded-t-sm first:border-t last:mb-4 last:rounded-b-sm last:border-b'
							)}
						>
							{error}
						</li>
					{/each}
				{/if}
			</ul>
		{/if}
	{/snippet}
</FormPrimitive.FieldErrors>
