<script lang="ts">
	import { Toaster as Sonner, type ToasterProps as SonnerProps } from 'svelte-sonner';
	import { mode } from 'mode-watcher';

	let restProps: SonnerProps = $props();
</script>

<Sonner
	theme={$mode}
	class="toaster group"
	toastOptions={{
		classes: {
			toast:
				'group toast group-[.toaster]:bg-neutral-1 group-[.toaster]:text-neutral-12 group-[.toaster]:border-neutral-7 group-[.toaster]:shadow-lg',
			description: 'group-[.toast]:text-neutral-11',
			actionButton: 'group-[.toast]:bg-primary-6 group-[.toast]:text-primary-12',
			cancelButton: 'group-[.toast]:bg-neutral-2 group-[.toast]:text-neutral-11'
		}
	}}
	{...restProps}
/>
