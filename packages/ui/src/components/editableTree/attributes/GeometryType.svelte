<script lang="ts">
	import { type GeometryType } from '@vdg-webapp/models';

	import GeometrySelect from '$components/workspaces/GeometrySelect.svelte';

	import DefaultStaticValue from './DefaultStaticValue.svelte';
	import { type EditableAttributeProps } from './types';

	let { value, editing, onChange }: EditableAttributeProps<GeometryType> = $props();

	/**
	 * Matches GeometrySelect's own option labels. Computed independently of
	 * that component (rather than via its bindable `label` prop) since it
	 * only mounts while editing, and this display also needs a label in
	 * the read-only view.
	 */
	const geometryTypeLabels: Record<GeometryType, string> = {
		RECTANGLE: 'Rectangle',
		POLYGON: 'Polygon',
		ELLIPSE: 'Ellipse',
		LINES: 'Lines'
	};
	let label: string = $state('');
</script>

{#if editing}
	<GeometrySelect {value} bind:label onValueChange={onChange} />
{:else}
	<DefaultStaticValue value={geometryTypeLabels[value]} />
{/if}
