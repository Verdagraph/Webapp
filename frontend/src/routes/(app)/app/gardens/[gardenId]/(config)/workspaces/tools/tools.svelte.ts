import { createToolbox, type ToolAttributes } from '$components/tabToolbox';
import AddPlantingAreaForm from './AddPlantingAreaForm.svelte';
import TranslateForm from './TranslateForm.svelte';
import LayoutConfig from './LayoutConfigForm.svelte';

type WorkspaceToolIds = 'addPlantingArea' | 'translate' | 'layoutConfig';

const workspaceTools: ToolAttributes<WorkspaceToolIds> = [
	{
		id: 'addPlantingArea',
		label: 'Add Planting Area',
		ToolComponent: AddPlantingAreaForm
	},
	{
		id: 'translate',
		label: 'Translate',
		ToolComponent: TranslateForm
	},
	{
		id: 'layoutConfig',
		label: 'Layout Config',
		ToolComponent: LayoutConfig
	}
];

const toolbox = createToolbox(workspaceTools);
export default toolbox;
