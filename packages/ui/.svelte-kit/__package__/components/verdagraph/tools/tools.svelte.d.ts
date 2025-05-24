type VerdagraphToolIds = 'plantsCreate' | 'translate' | 'observe' | 'delete' | 'groups' | 'patterns' | 'generators' | 'layoutConfig';
declare const toolbox: {
    lastActivatedId: VerdagraphToolIds | undefined;
    activeTools: {
        id: VerdagraphToolIds;
        label: string;
        ToolComponent: import("svelte").Component;
    }[];
    isActive: boolean;
    activate: (id: VerdagraphToolIds, options?: Record<string, unknown>) => void;
    deactivate: (id: VerdagraphToolIds) => void;
    isToolActive: (id: VerdagraphToolIds) => boolean;
};
export default toolbox;
//# sourceMappingURL=tools.svelte.d.ts.map