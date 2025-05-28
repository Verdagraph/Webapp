<script lang="ts">
	import { WorkspaceEditor, setWorkspaceContext } from '@vdg-webapp/ui';

	import { gardenId, workspaceId } from './seed';

	const workspace = setWorkspaceContext(workspaceId);
	workspace.editing = true;
</script>

<WorkspaceEditor {gardenId} />
