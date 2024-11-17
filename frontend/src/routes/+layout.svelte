<script lang="ts">
	import 'tailwindcss/tailwind.css';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';

	let { children } = $props();
</script>

<ModeWatcher />

<!-- Sonner toaster from Shadcn-svelte -->
<Toaster richColors />

{@render children()}