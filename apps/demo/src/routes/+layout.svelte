<script lang="ts">
	import '@fontsource/atkinson-hyperlegible';
	import { JazzProvider } from 'jazz-tools/svelte';
	import { ModeWatcher } from 'mode-watcher';
	import 'tailwindcss/tailwind.css';

	import { Tooltip } from '@vdg-webapp/ui';

	import { getJazzConfig } from '$lib/data/jazz';

	import '../app.pcss';

	let { children } = $props();
</script>

<!-- Theme switcher. -->
<ModeWatcher />

<JazzProvider {...getJazzConfig()}>
	<Tooltip.Provider delayDuration={500}>
		<div class="h-screen w-screen overflow-hidden">
			{@render children()}
		</div>
	</Tooltip.Provider>
</JazzProvider>
