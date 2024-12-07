<script lang="ts">
	import 'tailwindcss/tailwind.css';
	import { Toaster } from '$components/ui/sonner';
	import * as Tooltip from '$components/ui/tooltip';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import * as utils from '$data/gardens/utils';

	let { children } = $props();
</script>

<ModeWatcher />

<!-- Sonner toaster from Shadcn-svelte -->
<Toaster richColors />

<Tooltip.Provider delayDuration={200}>
	{@render children()}
</Tooltip.Provider>
