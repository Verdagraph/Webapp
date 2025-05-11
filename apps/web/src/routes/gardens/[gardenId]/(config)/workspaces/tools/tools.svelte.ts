import { createToolbox, type ToolAttributes } from '@vdg-webapp/ui';
import AddPlantingAreaForm from './PlantingAreaCreateForm.svelte';
import TranslateForm from './TranslateForm.svelte';
import LayoutConfig from './LayoutConfigForm.svelte';
import EnvironmentCreateForm from './EnvironmentCreateForm.svelte';
import ExpireForm from './ExpireForm.svelte';
import DeleteForm from './DeleteForm.svelte';

type WorkspaceToolIds =
	| 'plantingAreaCreate'
	| 'environmentCreate'
	| 'translate'
	| 'expire'
	| 'delete'
	| 'layoutConfig';

const workspaceTools: ToolAttributes<WorkspaceToolIds> = [
	{
		id: 'plantingAreaCreate',
		label: 'Add Planting Area',
		ToolComponent: AddPlantingAreaForm
	},
	{
		id: 'environmentCreate',
		label: 'Add Environment',
		ToolComponent: EnvironmentCreateForm
	},
	{
		id: 'translate',
		label: 'Translate',
		ToolComponent: TranslateForm
	},
	{ id: 'expire', label: 'Expire', ToolComponent: ExpireForm },
	{ id: 'delete', label: 'Delete', ToolComponent: DeleteForm },
	{
		id: 'layoutConfig',
		label: 'Layout Config',
		ToolComponent: LayoutConfig
	}
];

const toolbox = createToolbox(workspaceTools);
export default toolbox;
