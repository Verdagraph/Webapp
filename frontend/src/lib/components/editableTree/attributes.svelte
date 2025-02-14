<script lang="ts" module>
	export { editableStringAttribute };
</script>

{#snippet editableStringAttribute(
	value: string,
	editing: boolean,
	onChange: (changeOver: boolean, newData: string) => void
)}
	a
{/snippet}
