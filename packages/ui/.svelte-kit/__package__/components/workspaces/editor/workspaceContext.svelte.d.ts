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
        direction: import("../../../core/resizable").Direction;
        isEnabled: (pane: "tree" | "layout") => boolean;
        enable: (pane: "tree" | "layout") => void;
        disable: (pane: "tree" | "layout") => void;
        reset: () => void;
    };
    timelineSelection: {
        readonly focus: import("@internationalized/date").DateValue;
        readonly beginSelection: import("@internationalized/date").DateValue;
        readonly endSelection: import("@internationalized/date").DateValue;
        readonly focusUtc: Date;
        readonly beginSelectionUtc: Date;
        readonly endSelectionUtc: Date;
        readonly minSliderValue: number;
        readonly maxSliderValue: number;
        readonly sliderValue: number[];
        readonly disabled: boolean;
        minSelectOffset: import("@internationalized/date").DateDuration;
        maxSelectOffset: import("@internationalized/date").DateDuration;
        reset: () => void;
        resetSliderRange: () => void;
        refocus: (newFocus: import("@internationalized/date").DateValue) => void;
        changeBeginSelection: (newBeginSelection: import("@internationalized/date").DateValue) => void;
        changeEndSelection: (newEndSelection: import("@internationalized/date").DateValue) => void;
        translate: (translation: import("@internationalized/date").DateDuration) => void;
        sliderValueToDateValue: (sliderValue: number) => import("@internationalized/date").DateValue;
        updateSlider: (newVal: number[]) => void;
        disable: () => void;
        enable: () => void;
    };
    selections: {
        tool: "pointer" | "group";
        get: (entityType: "environment" | "plantingArea") => Set<string>;
        has: (entityType: "environment" | "plantingArea", entityId: string) => boolean;
        select: (entityType: "environment" | "plantingArea", entityId: string) => void;
        deselect: (entityType: "environment" | "plantingArea", entityId: string) => void;
        reset: (entityType: "environment" | "plantingArea") => void;
        resetAll: () => void;
        addSelectionChangeHandler: (entityType: "environment" | "plantingArea", handler: (addedIds: Array<string>, removedIds: Array<string>) => void) => void;
    };
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
        direction: import("../../../core/resizable").Direction;
        isEnabled: (pane: "tree" | "layout") => boolean;
        enable: (pane: "tree" | "layout") => void;
        disable: (pane: "tree" | "layout") => void;
        reset: () => void;
    };
    timelineSelection: {
        readonly focus: import("@internationalized/date").DateValue;
        readonly beginSelection: import("@internationalized/date").DateValue;
        readonly endSelection: import("@internationalized/date").DateValue;
        readonly focusUtc: Date;
        readonly beginSelectionUtc: Date;
        readonly endSelectionUtc: Date;
        readonly minSliderValue: number;
        readonly maxSliderValue: number;
        readonly sliderValue: number[];
        readonly disabled: boolean;
        minSelectOffset: import("@internationalized/date").DateDuration;
        maxSelectOffset: import("@internationalized/date").DateDuration;
        reset: () => void;
        resetSliderRange: () => void;
        refocus: (newFocus: import("@internationalized/date").DateValue) => void;
        changeBeginSelection: (newBeginSelection: import("@internationalized/date").DateValue) => void;
        changeEndSelection: (newEndSelection: import("@internationalized/date").DateValue) => void;
        translate: (translation: import("@internationalized/date").DateDuration) => void;
        sliderValueToDateValue: (sliderValue: number) => import("@internationalized/date").DateValue;
        updateSlider: (newVal: number[]) => void;
        disable: () => void;
        enable: () => void;
    };
    selections: {
        tool: "pointer" | "group";
        get: (entityType: "environment" | "plantingArea") => Set<string>;
        has: (entityType: "environment" | "plantingArea", entityId: string) => boolean;
        select: (entityType: "environment" | "plantingArea", entityId: string) => void;
        deselect: (entityType: "environment" | "plantingArea", entityId: string) => void;
        reset: (entityType: "environment" | "plantingArea") => void;
        resetAll: () => void;
        addSelectionChangeHandler: (entityType: "environment" | "plantingArea", handler: (addedIds: Array<string>, removedIds: Array<string>) => void) => void;
    };
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
        direction: import("../../../core/resizable").Direction;
        isEnabled: (pane: "tree" | "layout") => boolean;
        enable: (pane: "tree" | "layout") => void;
        disable: (pane: "tree" | "layout") => void;
        reset: () => void;
    };
    timelineSelection: {
        readonly focus: import("@internationalized/date").DateValue;
        readonly beginSelection: import("@internationalized/date").DateValue;
        readonly endSelection: import("@internationalized/date").DateValue;
        readonly focusUtc: Date;
        readonly beginSelectionUtc: Date;
        readonly endSelectionUtc: Date;
        readonly minSliderValue: number;
        readonly maxSliderValue: number;
        readonly sliderValue: number[];
        readonly disabled: boolean;
        minSelectOffset: import("@internationalized/date").DateDuration;
        maxSelectOffset: import("@internationalized/date").DateDuration;
        reset: () => void;
        resetSliderRange: () => void;
        refocus: (newFocus: import("@internationalized/date").DateValue) => void;
        changeBeginSelection: (newBeginSelection: import("@internationalized/date").DateValue) => void;
        changeEndSelection: (newEndSelection: import("@internationalized/date").DateValue) => void;
        translate: (translation: import("@internationalized/date").DateDuration) => void;
        sliderValueToDateValue: (sliderValue: number) => import("@internationalized/date").DateValue;
        updateSlider: (newVal: number[]) => void;
        disable: () => void;
        enable: () => void;
    };
    selections: {
        tool: "pointer" | "group";
        get: (entityType: "environment" | "plantingArea") => Set<string>;
        has: (entityType: "environment" | "plantingArea", entityId: string) => boolean;
        select: (entityType: "environment" | "plantingArea", entityId: string) => void;
        deselect: (entityType: "environment" | "plantingArea", entityId: string) => void;
        reset: (entityType: "environment" | "plantingArea") => void;
        resetAll: () => void;
        addSelectionChangeHandler: (entityType: "environment" | "plantingArea", handler: (addedIds: Array<string>, removedIds: Array<string>) => void) => void;
    };
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