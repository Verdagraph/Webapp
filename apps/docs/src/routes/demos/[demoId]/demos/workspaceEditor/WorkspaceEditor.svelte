<script lang="ts">
	import { WorkspaceEditor, setWorkspaceContext } from '@vdg-webapp/ui';

	import { gardenId, workspaceId } from './seed';

	const workspace = setWorkspaceContext(workspaceId);
	console.log(workspace.paneSettings);
</script>

<WorkspaceEditor {gardenId} />
