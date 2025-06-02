import { createToolbox } from '../../..';
import DeleteForm from './DeleteForm.svelte';
import EnvironmentCreateForm from './EnvironmentCreateForm.svelte';
import ExpireForm from './ExpireForm.svelte';
import LayoutConfig from './LayoutConfigForm.svelte';
import AddPlantingAreaForm from './PlantingAreaCreateForm.svelte';
import TranslateForm from './TranslateForm.svelte';
const workspaceTools = [
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
export function workspaceToolbox() {
    return createToolbox(workspaceTools);
}
