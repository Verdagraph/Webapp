<script lang="ts">
	import { Snippet } from 'svelte';
	import { FormHandler } from '../form.svelte';

	type Props = {
		form: FormHandler;
		fieldName: string;
		className?: string;
		children: Snippet<[]>;
	};

	let { form, fieldName, className = '', children }: Props = $props();
</script>

<div class={className}>
	{@render children()}
</div>
