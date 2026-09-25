<script lang="ts">
	import { type Snippet } from 'svelte';

	import { getAppContext } from '@vdg-webapp/ui';

	import { goto } from '$app/navigation';

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

	/** Redirect away once the garden slug is confirmed not to exist. */
	$effect(() => {
		if (ctx.garden.notFound) {
			goto('/gardens');
		}
	});
</script>

{@render children()}
