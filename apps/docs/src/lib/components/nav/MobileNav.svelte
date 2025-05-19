<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Button } from 'bits-ui';
	import { Accordion } from 'bits-ui';

	import { Drawer, iconIds } from '@vdg-webapp/ui';

	let open = $state(false);
</script>

<!--
@component
Single tab for navigating between feature domains on the main bottom bar.
-->
