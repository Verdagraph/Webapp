import type { PlantingArea, Workspace } from '@vdg-webapp/models';
type Props = {
    workspaces: Workspace[];
    plantingAreas: PlantingArea[];
    /** If true, the menu to navigate between workspaces is included. */
    includeWorkspacesMenu: boolean;
};
declare const Toolbar: import("svelte").Component<Props, {}, "">;
type Toolbar = ReturnType<typeof Toolbar>;
export default Toolbar;
//# sourceMappingURL=Toolbar.svelte.d.ts.map