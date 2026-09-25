<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Tooltip, setAppContext } from '@vdg-webapp/ui';

	import PrimaryNav from '$components/primaryNav';
	import { fetchUsername } from '$data/users/auth';

	let { children }: { children: Snippet } = $props();

	/**
	 * Application context: controller, client, garden/workspace/plant contexts, etc.
	 * Must run inside <JazzProvider> (see +layout.svelte) since gardenContext
	 * reads Jazz's Svelte context (getSession()/getDb()) during initialization.
	 */
	setAppContext(fetchUsername);
</script>

<div class="h-screen w-screen overflow-hidden">
	<Tooltip.Provider delayDuration={500}>
		<PrimaryNav>
			{@render children()}
		</PrimaryNav>
	</Tooltip.Provider>
</div>
