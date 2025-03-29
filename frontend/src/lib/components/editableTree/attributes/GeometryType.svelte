<script lang="ts">
	import { type EditableAttributeProps } from './types';
	import DefaultStaticValue from './DefaultStaticValue.svelte';
	import { type GeometryType } from '@vdg-webapp/common';
	import GeometrySelect from '$components/workspaces/GeometrySelect.svelte';

	let { value, editing, onChange }: EditableAttributeProps<GeometryType> = $props();

	let label: string = $state('');
</script>

{#if editing}
	<GeometrySelect {value} bind:label onValueChange={onChange} />
{:else}
	<DefaultStaticValue value={label} />
{/if}
