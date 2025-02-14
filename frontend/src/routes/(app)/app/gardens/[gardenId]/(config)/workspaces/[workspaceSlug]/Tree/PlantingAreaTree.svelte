<script lang="ts">

	import {EditableTree, editableStringAttribute} from '$components/editableTree';
	import { type PlantingAreasQueryResult } from '$data/workspaces/queries';

	let plantingAreas: PlantingAreasQueryResult[] = []

	let items = $derived(plantingAreas.map(plantingArea => {
		return	{
				id: plantingArea.id,
				label: plantingArea.name,
				children: [
					{
						id: plantingArea.id + '+name',
						label: 'Name',
						valueSnippet: editableStringAttribute,
						//value: plantingArea.name
					}
				]
			}
	}))

</script>

<EditableTree {items} />
