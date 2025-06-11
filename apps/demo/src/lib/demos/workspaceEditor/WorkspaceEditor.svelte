<script lang="ts">
	import { getContext } from 'svelte';

	import { CONTROLLER_CONTEXT_ID, type ControllerContext } from '@vdg-webapp/models';
	import {
		WorkspaceEditor,
		setGardenContext,
		setWorkspaceContext
	} from '@vdg-webapp/ui';

	import { gardenId, workspaceId } from './seed';

	const controller = getContext<ControllerContext>(CONTROLLER_CONTEXT_ID);
	const workspace = setWorkspaceContext(workspaceId);
	workspace.editing = true;
	const garden = setGardenContext(controller);
	garden.id = gardenId;
</script>

<WorkspaceEditor {gardenId} includeWorkspacesMenu={false} />
