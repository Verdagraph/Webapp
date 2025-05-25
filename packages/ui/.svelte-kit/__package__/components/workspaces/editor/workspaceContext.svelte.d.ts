/**
 * Holds context for a workspace editor.
 */
export declare function createWorkspaceContext(id: string): {
    readonly id: string;
    editing: boolean;
    readonly layoutCanvasContext: {
        readonly canvasId: string;
        readonly workspaceId: string;
        transform: {
            config: {
                buttonsExpanded: boolean;
                buttonsPosition: "tl" | "tr" | "br" | "bl";
            };
            scaleFactor: import("konva/lib/types").Vector2d;
            position: import("konva/lib/types").Vector2d;
            readonly strokeScale: boolean;
            canvasXPos: (modelPos: number) => number;
            modelXPos: (canvasPos: number) => number;
            canvasYPos: (modelPos: number) => number;
            modelYPos: (canvasPos: number) => number;
            canvasDistance: (modelDistance: number) => number;
            modelDistance: (canvasDistance: number) => number;
            translate: (translation: import("konva/lib/types").Vector2d) => void;
            addScale: (scale: number) => void;
            reset: () => void;
            addTransformFunction: (func: () => void) => void;
            initialize: () => void;
        };
        container: {
            readonly containerId: string;
            readonly stage: import("konva/lib/Stage").Stage | null;
            pixelsPerMeter: number;
            readonly initialized: boolean;
            width: number;
            height: number;
            initialize: () => void;
            addLayer: (layerId: string) => import("konva").default.Layer;
            getLayer: (layerId: string) => import("konva").default.Layer;
            onResize: () => void;
            addResizeFunction: (func: () => void) => void;
        };
        selectionGroup: {
            setDocumentCursor: () => void;
        };
        gridManager: {
            config: {
                snapToGrid: boolean;
                rightAngleConstraint: boolean;
                metersPerBackgroundGridline: number;
            };
            initialize: () => void;
            snapToGrid: (pos: import("konva/lib/types").Vector2d) => import("konva/lib/types").Vector2d;
        };
        initialize: () => void;
        destroy: () => void;
        mode: {
            readonly current: import("mode-watcher").SystemModeValue;
        };
    };
    canvas: {
        readonly canvasId: string;
        readonly workspaceId: string;
        transform: {
            config: {
                buttonsExpanded: boolean;
                buttonsPosition: "tl" | "tr" | "br" | "bl";
            };
            scaleFactor: import("konva/lib/types").Vector2d;
            position: import("konva/lib/types").Vector2d;
            readonly strokeScale: boolean;
            canvasXPos: (modelPos: number) => number;
            modelXPos: (canvasPos: number) => number;
            canvasYPos: (modelPos: number) => number;
            modelYPos: (canvasPos: number) => number;
            canvasDistance: (modelDistance: number) => number;
            modelDistance: (canvasDistance: number) => number;
            translate: (translation: import("konva/lib/types").Vector2d) => void;
            addScale: (scale: number) => void;
            reset: () => void;
            addTransformFunction: (func: () => void) => void;
            initialize: () => void;
        };
        container: {
            readonly containerId: string;
            readonly stage: import("konva/lib/Stage").Stage | null;
            pixelsPerMeter: number;
            readonly initialized: boolean;
            width: number;
            height: number;
            initialize: () => void;
            addLayer: (layerId: string) => import("konva").default.Layer;
            getLayer: (layerId: string) => import("konva").default.Layer;
            onResize: () => void;
            addResizeFunction: (func: () => void) => void;
        };
        selectionGroup: {
            setDocumentCursor: () => void;
        };
        gridManager: {
            config: {
                snapToGrid: boolean;
                rightAngleConstraint: boolean;
                metersPerBackgroundGridline: number;
            };
            initialize: () => void;
            snapToGrid: (pos: import("konva/lib/types").Vector2d) => import("konva/lib/types").Vector2d;
        };
        initialize: () => void;
        destroy: () => void;
        mode: {
            readonly current: import("mode-watcher").SystemModeValue;
        };
    };
    toolbox: {
        lastActivatedId: ("translate" | "delete" | "layoutConfig" | "plantingAreaCreate" | "environmentCreate" | "expire") | undefined;
        activeTools: {
            id: "translate" | "delete" | "layoutConfig" | "plantingAreaCreate" | "environmentCreate" | "expire";
            label: string;
            ToolComponent: import("svelte").Component;
        }[];
        isActive: boolean;
        activate: (id: "translate" | "delete" | "layoutConfig" | "plantingAreaCreate" | "environmentCreate" | "expire", options?: Record<string, unknown>) => void;
        deactivate: (id: "translate" | "delete" | "layoutConfig" | "plantingAreaCreate" | "environmentCreate" | "expire") => void;
        isToolActive: (id: "translate" | "delete" | "layoutConfig" | "plantingAreaCreate" | "environmentCreate" | "expire") => boolean;
    };
    paneSettings: {
        readonly direction: import("../../../core/resizable").Direction;
        isEnabled: (pane: "tree" | "layout") => boolean;
        enable: (pane: "tree" | "layout") => void;
        disable: (pane: "tree" | "layout") => void;
        reset: () => void;
    };
    timelineSelection: any;
    selections: any;
    plantingAreaCreateForm: {
        handler: {
            readonly isLoading: boolean;
            readonly isSuccess: boolean;
            readonly isError: boolean;
            readonly result: unknown;
            readonly errors: any;
            readonly fieldErrors: any;
            readonly nonFieldErrors: any;
            readonly nonFormErrors: any;
            execute: (...params: unknown[]) => void;
            reset: () => void;
        };
        form: import("sveltekit-superforms").SuperForm<any, any>;
    };
    reset: () => void;
};
export type WorkspaceContext = ReturnType<typeof createWorkspaceContext>;
export declare function setWorkspaceContext(id: string): {
    readonly id: string;
    editing: boolean;
    readonly layoutCanvasContext: {
        readonly canvasId: string;
        readonly workspaceId: string;
        transform: {
            config: {
                buttonsExpanded: boolean;
                buttonsPosition: "tl" | "tr" | "br" | "bl";
            };
            scaleFactor: import("konva/lib/types").Vector2d;
            position: import("konva/lib/types").Vector2d;
            readonly strokeScale: boolean;
            canvasXPos: (modelPos: number) => number;
            modelXPos: (canvasPos: number) => number;
            canvasYPos: (modelPos: number) => number;
            modelYPos: (canvasPos: number) => number;
            canvasDistance: (modelDistance: number) => number;
            modelDistance: (canvasDistance: number) => number;
            translate: (translation: import("konva/lib/types").Vector2d) => void;
            addScale: (scale: number) => void;
            reset: () => void;
            addTransformFunction: (func: () => void) => void;
            initialize: () => void;
        };
        container: {
            readonly containerId: string;
            readonly stage: import("konva/lib/Stage").Stage | null;
            pixelsPerMeter: number;
            readonly initialized: boolean;
            width: number;
            height: number;
            initialize: () => void;
            addLayer: (layerId: string) => import("konva").default.Layer;
            getLayer: (layerId: string) => import("konva").default.Layer;
            onResize: () => void;
            addResizeFunction: (func: () => void) => void;
        };
        selectionGroup: {
            setDocumentCursor: () => void;
        };
        gridManager: {
            config: {
                snapToGrid: boolean;
                rightAngleConstraint: boolean;
                metersPerBackgroundGridline: number;
            };
            initialize: () => void;
            snapToGrid: (pos: import("konva/lib/types").Vector2d) => import("konva/lib/types").Vector2d;
        };
        initialize: () => void;
        destroy: () => void;
        mode: {
            readonly current: import("mode-watcher").SystemModeValue;
        };
    };
    canvas: {
        readonly canvasId: string;
        readonly workspaceId: string;
        transform: {
            config: {
                buttonsExpanded: boolean;
                buttonsPosition: "tl" | "tr" | "br" | "bl";
            };
            scaleFactor: import("konva/lib/types").Vector2d;
            position: import("konva/lib/types").Vector2d;
            readonly strokeScale: boolean;
            canvasXPos: (modelPos: number) => number;
            modelXPos: (canvasPos: number) => number;
            canvasYPos: (modelPos: number) => number;
            modelYPos: (canvasPos: number) => number;
            canvasDistance: (modelDistance: number) => number;
            modelDistance: (canvasDistance: number) => number;
            translate: (translation: import("konva/lib/types").Vector2d) => void;
            addScale: (scale: number) => void;
            reset: () => void;
            addTransformFunction: (func: () => void) => void;
            initialize: () => void;
        };
        container: {
            readonly containerId: string;
            readonly stage: import("konva/lib/Stage").Stage | null;
            pixelsPerMeter: number;
            readonly initialized: boolean;
            width: number;
            height: number;
            initialize: () => void;
            addLayer: (layerId: string) => import("konva").default.Layer;
            getLayer: (layerId: string) => import("konva").default.Layer;
            onResize: () => void;
            addResizeFunction: (func: () => void) => void;
        };
        selectionGroup: {
            setDocumentCursor: () => void;
        };
        gridManager: {
            config: {
                snapToGrid: boolean;
                rightAngleConstraint: boolean;
                metersPerBackgroundGridline: number;
            };
            initialize: () => void;
            snapToGrid: (pos: import("konva/lib/types").Vector2d) => import("konva/lib/types").Vector2d;
        };
        initialize: () => void;
        destroy: () => void;
        mode: {
            readonly current: import("mode-watcher").SystemModeValue;
        };
    };
    toolbox: {
        lastActivatedId: ("translate" | "delete" | "layoutConfig" | "plantingAreaCreate" | "environmentCreate" | "expire") | undefined;
        activeTools: {
            id: "translate" | "delete" | "layoutConfig" | "plantingAreaCreate" | "environmentCreate" | "expire";
            label: string;
            ToolComponent: import("svelte").Component;
        }[];
        isActive: boolean;
        activate: (id: "translate" | "delete" | "layoutConfig" | "plantingAreaCreate" | "environmentCreate" | "expire", options?: Record<string, unknown>) => void;
        deactivate: (id: "translate" | "delete" | "layoutConfig" | "plantingAreaCreate" | "environmentCreate" | "expire") => void;
        isToolActive: (id: "translate" | "delete" | "layoutConfig" | "plantingAreaCreate" | "environmentCreate" | "expire") => boolean;
    };
    paneSettings: {
        readonly direction: import("../../../core/resizable").Direction;
        isEnabled: (pane: "tree" | "layout") => boolean;
        enable: (pane: "tree" | "layout") => void;
        disable: (pane: "tree" | "layout") => void;
        reset: () => void;
    };
    timelineSelection: any;
    selections: any;
    plantingAreaCreateForm: {
        handler: {
            readonly isLoading: boolean;
            readonly isSuccess: boolean;
            readonly isError: boolean;
            readonly result: unknown;
            readonly errors: any;
            readonly fieldErrors: any;
            readonly nonFieldErrors: any;
            readonly nonFormErrors: any;
            execute: (...params: unknown[]) => void;
            reset: () => void;
        };
        form: import("sveltekit-superforms").SuperForm<any, any>;
    };
    reset: () => void;
};
export declare function getWorkspaceContext(): {
    readonly id: string;
    editing: boolean;
    readonly layoutCanvasContext: {
        readonly canvasId: string;
        readonly workspaceId: string;
        transform: {
            config: {
                buttonsExpanded: boolean;
                buttonsPosition: "tl" | "tr" | "br" | "bl";
            };
            scaleFactor: import("konva/lib/types").Vector2d;
            position: import("konva/lib/types").Vector2d;
            readonly strokeScale: boolean;
            canvasXPos: (modelPos: number) => number;
            modelXPos: (canvasPos: number) => number;
            canvasYPos: (modelPos: number) => number;
            modelYPos: (canvasPos: number) => number;
            canvasDistance: (modelDistance: number) => number;
            modelDistance: (canvasDistance: number) => number;
            translate: (translation: import("konva/lib/types").Vector2d) => void;
            addScale: (scale: number) => void;
            reset: () => void;
            addTransformFunction: (func: () => void) => void;
            initialize: () => void;
        };
        container: {
            readonly containerId: string;
            readonly stage: import("konva/lib/Stage").Stage | null;
            pixelsPerMeter: number;
            readonly initialized: boolean;
            width: number;
            height: number;
            initialize: () => void;
            addLayer: (layerId: string) => import("konva").default.Layer;
            getLayer: (layerId: string) => import("konva").default.Layer;
            onResize: () => void;
            addResizeFunction: (func: () => void) => void;
        };
        selectionGroup: {
            setDocumentCursor: () => void;
        };
        gridManager: {
            config: {
                snapToGrid: boolean;
                rightAngleConstraint: boolean;
                metersPerBackgroundGridline: number;
            };
            initialize: () => void;
            snapToGrid: (pos: import("konva/lib/types").Vector2d) => import("konva/lib/types").Vector2d;
        };
        initialize: () => void;
        destroy: () => void;
        mode: {
            readonly current: import("mode-watcher").SystemModeValue;
        };
    };
    canvas: {
        readonly canvasId: string;
        readonly workspaceId: string;
        transform: {
            config: {
                buttonsExpanded: boolean;
                buttonsPosition: "tl" | "tr" | "br" | "bl";
            };
            scaleFactor: import("konva/lib/types").Vector2d;
            position: import("konva/lib/types").Vector2d;
            readonly strokeScale: boolean;
            canvasXPos: (modelPos: number) => number;
            modelXPos: (canvasPos: number) => number;
            canvasYPos: (modelPos: number) => number;
            modelYPos: (canvasPos: number) => number;
            canvasDistance: (modelDistance: number) => number;
            modelDistance: (canvasDistance: number) => number;
            translate: (translation: import("konva/lib/types").Vector2d) => void;
            addScale: (scale: number) => void;
            reset: () => void;
            addTransformFunction: (func: () => void) => void;
            initialize: () => void;
        };
        container: {
            readonly containerId: string;
            readonly stage: import("konva/lib/Stage").Stage | null;
            pixelsPerMeter: number;
            readonly initialized: boolean;
            width: number;
            height: number;
            initialize: () => void;
            addLayer: (layerId: string) => import("konva").default.Layer;
            getLayer: (layerId: string) => import("konva").default.Layer;
            onResize: () => void;
            addResizeFunction: (func: () => void) => void;
        };
        selectionGroup: {
            setDocumentCursor: () => void;
        };
        gridManager: {
            config: {
                snapToGrid: boolean;
                rightAngleConstraint: boolean;
                metersPerBackgroundGridline: number;
            };
            initialize: () => void;
            snapToGrid: (pos: import("konva/lib/types").Vector2d) => import("konva/lib/types").Vector2d;
        };
        initialize: () => void;
        destroy: () => void;
        mode: {
            readonly current: import("mode-watcher").SystemModeValue;
        };
    };
    toolbox: {
        lastActivatedId: ("translate" | "delete" | "layoutConfig" | "plantingAreaCreate" | "environmentCreate" | "expire") | undefined;
        activeTools: {
            id: "translate" | "delete" | "layoutConfig" | "plantingAreaCreate" | "environmentCreate" | "expire";
            label: string;
            ToolComponent: import("svelte").Component;
        }[];
        isActive: boolean;
        activate: (id: "translate" | "delete" | "layoutConfig" | "plantingAreaCreate" | "environmentCreate" | "expire", options?: Record<string, unknown>) => void;
        deactivate: (id: "translate" | "delete" | "layoutConfig" | "plantingAreaCreate" | "environmentCreate" | "expire") => void;
        isToolActive: (id: "translate" | "delete" | "layoutConfig" | "plantingAreaCreate" | "environmentCreate" | "expire") => boolean;
    };
    paneSettings: {
        readonly direction: import("../../../core/resizable").Direction;
        isEnabled: (pane: "tree" | "layout") => boolean;
        enable: (pane: "tree" | "layout") => void;
        disable: (pane: "tree" | "layout") => void;
        reset: () => void;
    };
    timelineSelection: any;
    selections: any;
    plantingAreaCreateForm: {
        handler: {
            readonly isLoading: boolean;
            readonly isSuccess: boolean;
            readonly isError: boolean;
            readonly result: unknown;
            readonly errors: any;
            readonly fieldErrors: any;
            readonly nonFieldErrors: any;
            readonly nonFormErrors: any;
            execute: (...params: unknown[]) => void;
            reset: () => void;
        };
        form: import("sveltekit-superforms").SuperForm<any, any>;
    };
    reset: () => void;
};
//# sourceMappingURL=workspaceContext.svelte.d.ts.map