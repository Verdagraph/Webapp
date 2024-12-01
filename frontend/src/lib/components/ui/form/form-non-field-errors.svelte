<script lang="ts">
	import { cn } from '$lib/utils';

	/**
	 * VerdanTech - Modified to allow passing custom errors.
	 */

	let {
		errorClasses,
		handlerErrors
	}: {
		errorClasses?: string | undefined | null;
		handlerErrors?: Array<string>;
	} = $props();
</script>

{#if handlerErrors}
	<ul class="mt-8">
		{#each handlerErrors as error}
			<li
				class={cn(
					errorClasses,
					'border-destructive-7 bg-destructive-3 border-x p-2 first:rounded-t-sm first:border-t last:mb-4 last:rounded-b-sm last:border-b'
				)}
			>
				{error}
			</li>
		{/each}
	</ul>
{/if}
