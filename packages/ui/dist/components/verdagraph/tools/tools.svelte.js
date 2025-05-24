import { createToolbox } from '../..';
import DeleteForm from './DeleteForm.svelte';
import GeneratorsForm from './GeneratorsForm.svelte';
import GroupsForm from './GroupsForm.svelte';
import LayoutConfigForm from './LayoutConfigForm.svelte';
import ObserveForm from './ObserveForm.svelte';
import PatternsForm from './PatternsForm.svelte';
import PlantsCreateForm from './PlantsCreateForm.svelte';
import TranslateForm from './TranslateForm.svelte';
const verdagraphTools = [
    {
        id: 'plantsCreate',
        label: 'Add Plants',
        ToolComponent: PlantsCreateForm
    },
    { id: 'translate', label: 'Translate', ToolComponent: TranslateForm },
    { id: 'observe', label: 'Observe', ToolComponent: ObserveForm },
    { id: 'delete', label: 'Delete', ToolComponent: DeleteForm },
    { id: 'groups', label: 'Plant Groups', ToolComponent: GroupsForm },
    { id: 'patterns', label: 'Patterns', ToolComponent: PatternsForm },
    { id: 'generators', label: 'Generators', ToolComponent: GeneratorsForm },
    { id: 'layoutConfig', label: 'Layout Config', ToolComponent: LayoutConfigForm }
];
const toolbox = createToolbox(verdagraphTools);
export default toolbox;
