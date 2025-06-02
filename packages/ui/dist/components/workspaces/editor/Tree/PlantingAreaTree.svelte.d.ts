import { type PlantingArea, type Workspace } from '@vdg-webapp/models';
type Props = {
    plantingAreas: PlantingArea[];
    workspacesInGarden: Pick<Workspace, 'id' | 'name'>[];
};
declare const PlantingAreaTree: import("svelte").Component<Props, {}, "">;
type PlantingAreaTree = ReturnType<typeof PlantingAreaTree>;
export default PlantingAreaTree;
//# sourceMappingURL=PlantingAreaTree.svelte.d.ts.map