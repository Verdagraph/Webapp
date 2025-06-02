import type { PlantingArea, Workspace } from '@vdg-webapp/models';
type Props = {
    plantingAreas: PlantingArea[];
    workspacesInGarden: Pick<Workspace, 'id' | 'name'>[];
};
declare const Tree: import("svelte").Component<Props, {}, "">;
type Tree = ReturnType<typeof Tree>;
export default Tree;
//# sourceMappingURL=Tree.svelte.d.ts.map