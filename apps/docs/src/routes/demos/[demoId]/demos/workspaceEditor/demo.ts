import type { Demo } from '../types';
import WorkspaceEditor from './WorkspaceEditor.svelte';
import seed from './seed';

export const workspaceDemo: Demo = {
	id: 'workspace-editor',
	title: 'Workspace Editor',
	description:
		'The workspace editor allows editing workspaces, planting areas, and environments.',
	component: WorkspaceEditor,
	seed: seed
};
