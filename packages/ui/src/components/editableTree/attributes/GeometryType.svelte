<script lang="ts">
	import { type GeometryType } from '@vdg-webapp/models';

	import GeometrySelect from '$components/workspaces/GeometrySelect.svelte';

	import DefaultStaticValue from './DefaultStaticValue.svelte';
	import { type EditableAttributeProps } from './types';

	let { value, editing, onChange }: EditableAttributeProps<GeometryType> = $props();

	let label: string = $state('');
</script>

{#if editing}
	<GeometrySelect {value} bind:label onValueChange={onChange} />
{:else}
	<DefaultStaticValue value={label} />
{/if}
