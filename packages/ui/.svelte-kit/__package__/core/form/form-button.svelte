<script lang="ts">
	import Icon from '@iconify/svelte';
	import iconIds from '../../assets/icons';
	import * as Button from '../button/index.js';

	/**
	 * Verdagraph - Modified to allow loading spinner.
	 */

	let {
		ref = $bindable(null),
		loading = false,
		...restProps
	}: Button.Props & {
		loading?: boolean;
	} = $props();
</script>

{#if loading}
	<Button.Root type="submit" {...restProps}>
		<Icon icon={iconIds.defaultSpinnerIcon} width="1.5rem" class="animate-spin" />
	</Button.Root>
{:else}
	<Button.Root bind:ref type="submit" {...restProps} />
{/if}
