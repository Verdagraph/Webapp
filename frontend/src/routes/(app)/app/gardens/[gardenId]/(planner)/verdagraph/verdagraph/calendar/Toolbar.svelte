<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Toolbar } from 'bits-ui';
	import iconIds from '$lib/assets/icons';
	import * as Select from '$lib/components/ui/select/index.js';
	import { getVerdagraphContext } from '../verdagraphContext.svelte';
	import { type ViewPanesOptions } from './context.svelte';

	const verdagraphContext = getVerdagraphContext();

	const viewSelectOptions: { value: ViewPanesOptions; label: string }[] = [
		{ value: 'plants', label: 'Plants' },
		{ value: 'plantingWindows', label: 'Planting Windows' },
		{ value: 'actions', label: 'Actions' }
	];
</script>

<Toolbar.Root
	class="border-neutral-8 justify-center border-0 border-b md:justify-start"
>
	<!-- View Menu -->
	<Select.Root
		type="multiple"
		name="calendarView"
		bind:value={verdagraphContext.calendar.config.value.viewPanesSelect}
	>
		<Select.Trigger class="w-1/4 rounded-none border-none">Panes</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each viewSelectOptions as pane (pane.value)}
					<Select.Item value={pane.value} label={pane.label}>{pane.label}</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
</Toolbar.Root>
