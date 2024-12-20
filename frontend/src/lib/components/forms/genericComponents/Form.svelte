<script lang="ts">
	import { setContext, Snippet } from 'svelte';
	import { FormHandler } from '../form.svelte';

	type Props = {
		form: FormHandler;
		children: Snippet<[]>;
	};
	let { form, children }: Props = $props();
</script>

<form id={form.id} method="POST">
	{@render children()}
</form>
