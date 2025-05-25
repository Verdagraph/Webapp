type WorkspaceToolIds = 'plantingAreaCreate' | 'environmentCreate' | 'translate' | 'expire' | 'delete' | 'layoutConfig';
export declare function workspaceToolbox(): {
    lastActivatedId: WorkspaceToolIds | undefined;
    activeTools: {
        id: WorkspaceToolIds;
        label: string;
        ToolComponent: import("svelte").Component;
    }[];
    isActive: boolean;
    activate: (id: WorkspaceToolIds, options?: Record<string, unknown>) => void;
    deactivate: (id: WorkspaceToolIds) => void;
    isToolActive: (id: WorkspaceToolIds) => boolean;
};
export {};
//# sourceMappingURL=tools.svelte.d.ts.map