<script lang="ts">
	import type { Geometry, GeometryUpdateCommand } from '@vdg-webapp/models';

	import { Plant } from '$components';

	import CreatePlantContainer from './CreatePlantContainer.svelte';
	import { getVerdagraphContext } from './verdagraphContext.svelte';

	type Props = {
		workspaceId: string;
	};
	let { workspaceId }: Props = $props();

	/** Contexts.*/
	const verdagraphContext = getVerdagraphContext();
	const canvas = verdagraphContext.layoutCanvasContext;
	const form = verdagraphContext.plantsCreateForm.form;
</script>

<!--
@component
Renders plant(s) in the canvas representing the
plants creation form.

Should only render this component if the plants
creation tool is active.
-->
{#if form.data.mode === 'SINGLE'}
	<CreatePlantContainer {workspaceId} plantIdx={0} />
{:else if form.data.mode === 'GROUP'}{:else if form.data.mode === 'PATTERN'}{:else if form.data.mode === 'COMBINED'}{/if}
