<script lang="ts">
	import { onMount } from 'svelte';

	import { setAppContext } from '@vdg-webapp/ui';

	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { demos } from '$demos';
	import { seedDemoGarden } from '$lib/seeds/jazzSeed';

	/** Find the demo that is active. */
	const demo = demos.find((demo) => demo.id === page.params.demoId);
	if (!demo) {
		console.error('This demo does not exist.');
		goto('/demos');
	}

	/** Set app context - no real login for the demo, a constant username is enough. */
	const ctx = setAppContext(async () => 'Demo User');

	/**
	 * Seeds a demo garden into Jazz before the demo component (and the
	 * queries it fires on mount) render - matches a real garden's data,
	 * which is always already-committed by the time any page queries it,
	 * unlike inserting live while children are mounting.
	 */
	let seeded = $state(false);
	onMount(async () => {
		const gardenSlug = await seedDemoGarden();
		ctx.garden.id = gardenSlug;
		seeded = true;
	});
</script>

<svelte:head>
	<title>Demo - Verdagraph</title>
</svelte:head>

{#if demo && seeded}
	<demo.component />
{/if}
