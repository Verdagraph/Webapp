<script lang="ts">
	import 'tailwindcss/tailwind.css';
	import { Toaster } from '$components/ui/sonner';
	import * as Tooltip from '$components/ui/tooltip';
	import { ModeWatcher } from 'mode-watcher';
	import mode from '$state/theme.svelte';
	import { mode as modeWatcher } from 'mode-watcher';
	import '../app.pcss';

	/** Track ModeWatcher's value into a svelte 5 rune. */
	modeWatcher.subscribe((value) => {
		mode.value = value;
	});

	let { children } = $props();
</script>

<ModeWatcher />

<!-- Sonner toaster from Shadcn-svelte -->
<Toaster richColors />

<Tooltip.Provider delayDuration={500}>
	{@render children()}
</Tooltip.Provider>
