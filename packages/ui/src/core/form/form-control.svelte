<script lang="ts">
	import type { Snippet } from 'svelte';

	import {
		type ControlContext,
		getControlContext,
		setControlContext
	} from './formContext';

	let {
		id,
		children
	}: { id?: string; children?: Snippet<[{ props: ControlContext['props'] }]> } =
		$props();

	const control = setControlContext(id);
</script>

{@render children?.({ props: control.props })}
