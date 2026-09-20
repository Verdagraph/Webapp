<script lang="ts">
	import { TriplitClient } from '@triplit/client';
	import { getContext, onMount } from 'svelte';

	import { roles, schema } from '@vdg-webapp/models';
	import { setAppContext } from '@vdg-webapp/ui';

	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { type Demo, demos } from '$demos';
	import { garden, user } from '$lib/seeds';

	/** Find the demo that is active. */
	const demo = demos.find((demo) => demo.id === page.params.demoId);
	if (!demo) {
		console.error('This demo does not exist.');
		goto('/demos');
	}
	const triplit = new TriplitClient({
		schema,
		roles,
		autoConnect: false,
		storage: 'memory'
	});

	/** Create a controller with a mock client retrieval function. */
	async function getClient() {
		return { account: user.account, profile: user.profile };
	}

	/** Set app context. */
	const ctx = setAppContext(
		{ triplit, getClient },
		{ accountIdOverride: user.account.id }
	);
	ctx.garden.id = garden.id;

	/**
	 * Initialize the data according to the seed file, fully committed BEFORE
	 * the demo component (and the queries it fires on mount) render - matches
	 * a real garden's data, which is always already-committed by the time any
	 * page queries it, unlike inserting live while children are mounting.
	 */
	let seeded = $state(false);
	onMount(async () => {
		const seedData = (demo as Demo).seed();
		await triplit.transact(async (tx) => {
			for (const [collection, items] of Object.entries(seedData)) {
				for (const item of items) {
					// @ts-ignore
					await tx.insert(collection, item);
				}
			}
		});
		seeded = true;
	});
</script>

<svelte:head>
	<title>Demo - Verdagraph</title>
</svelte:head>

{#if demo && seeded}
	<demo.component />
{/if}
