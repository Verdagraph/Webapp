<script lang="ts">
	import { type Snippet } from 'svelte';

	import { getAppContext } from '@vdg-webapp/ui';

	import type { LayoutData } from './$types';

	type Props = {
		data: LayoutData;
		children: Snippet<[]>;
	};
	let { data, children }: Props = $props();

	const ctx = getAppContext();

	/** Keep the active garden in sync with the route param. */
	$effect(() => {
		ctx.garden.id = data.gardenId;
	});
</script>

{@render children()}
