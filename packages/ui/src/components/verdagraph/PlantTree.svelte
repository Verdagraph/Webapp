<script lang="ts">
	import { type Workspace } from '@vdg-webapp/models';

	import { EditableTree } from '$components';
	import { type ResolvedPlant } from '$state/application/plantsContext.svelte';

	import { createPlantTreeController } from './plantTreeController.svelte';
	import { getVerdagraphContext } from './verdagraphContext.svelte';

	type Props = {
		plants: ResolvedPlant[];
		workspaces: Pick<Workspace, 'id' | 'name'>[];
	};
	let { plants = [], workspaces = [] }: Props = $props();

	const verdagraphContext = getVerdagraphContext();

	const controller = createPlantTreeController({
		plants: () => plants,
		workspaces: () => workspaces
	});
</script>

{#if plants.length === 0}
	<span class="p-2 italic"> No plants. </span>
{:else}
	<EditableTree
		editableTree={controller.editableTree}
		fieldErrors={controller.fieldErrors}
		editing={verdagraphContext.editing}
	/>
{/if}
