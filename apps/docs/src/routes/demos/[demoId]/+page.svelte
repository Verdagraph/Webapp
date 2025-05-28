<script lang="ts">
	import { TriplitClient } from '@triplit/client';
	import { onDestroy, onMount, setContext } from 'svelte';

	import {
		CONTROLLER_CONTEXT_ID,
		type ControllerContext,
		createController,
		roles,
		schema
	} from '@vdg-webapp/models';
	import { setSettingsContext } from '@vdg-webapp/ui';

	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	import { demos } from './demos';
	import { user } from './demos/seed';
	import type { Demo } from './demos/types';

	const demo = demos.find((demo) => demo.id === page.params.demoId);
	if (!demo) {
		console.error('This demo does not exist.');
		goto('/demos');
	}
	const triplit = new TriplitClient({ schema, roles, autoConnect: false });

	async function getClient() {
		return { account: user.account, profile: user.profile };
	}
	const controller = createController(triplit, getClient);

	/** Set settings context and controller context. */
	setContext(CONTROLLER_CONTEXT_ID, controller);
	setSettingsContext();

	onMount(async () => {
		const seedData = (demo as Demo).seed();
		await triplit.transact(async (tx) => {
			for (const [collection, items] of Object.entries(seedData)) {
				for (const item of items) {
					await tx.insert(collection, item);
				}
			}
		});
	});
</script>

<svelte:head>
	<title>Demo - Verdagraph</title>
</svelte:head>

{#if demo}
	<demo.component />
{/if}
