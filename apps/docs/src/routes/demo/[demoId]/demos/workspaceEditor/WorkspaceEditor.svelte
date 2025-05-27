<script lang="ts">
	import { WorkspaceEditor, setWorkspaceContext } from '@vdg-webapp/ui';

	import { gardenId, workspaceId } from './seed';

	setWorkspaceContext(workspaceId);
</script>

<WorkspaceEditor {gardenId} />
