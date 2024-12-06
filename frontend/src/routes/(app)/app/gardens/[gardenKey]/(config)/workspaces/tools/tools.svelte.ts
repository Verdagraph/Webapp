import { createToolbox, type ToolAttributes } from '$components/tabToolbox';
import AddPlantingAreaForm from './AddPlantingAreaForm.svelte';
import TranslateForm from './TranslateForm.svelte';

type WorkspaceToolIds = 'addPlantingArea' | 'translate';

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
	}
];

const toolbox = createToolbox(workspaceTools);
export default toolbox;
