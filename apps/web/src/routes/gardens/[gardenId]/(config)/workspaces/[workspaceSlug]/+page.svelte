<script lang="ts">
	import { WorkspaceEditor } from '@vdg-webapp/ui';

	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};
	let { data }: Props = $props();
</script>

<WorkspaceEditor defaultId={data.workspace.id} includeWorkspacesMenu={true} />
