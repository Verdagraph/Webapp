<script lang="ts">
	import {
		type GenericObservation,
		type PlantObservation,
		PlantObservationDescriptions,
		PlantObservationLabels
	} from '@vdg-webapp/models';

	import ObservationGenericInfopoint from './ObservationGenericInfopoint.svelte';

	type Props = {
		observation: PlantObservation;
	};
	let { observation }: Props = $props();

	const label = $derived(
		PlantObservationLabels[observation.type] ?? 'Unknown Observation'
	);
	const description = $derived(
		PlantObservationDescriptions[observation.type] ?? 'Unknown Observation'
	);
</script>

{#snippet content(observation: GenericObservation)}
	<span class="text-sm">{description}</span>
{/snippet}

<!--
	ObservationGenericInfopoint only reads the fields common to every
	observation (id, date) - the cast bridges PlantObservation's
	discriminated `data` (untyped/undefined per variant) to GenericObservation's
	plain `data: JsonValue`.
-->
<ObservationGenericInfopoint
	observation={observation as GenericObservation}
	{label}
	{content}
/>
