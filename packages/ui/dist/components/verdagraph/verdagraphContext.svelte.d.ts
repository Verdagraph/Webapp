/**
 * Holds context for the verdagraph.
 */
declare function createVerdagraphContext(): {
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
    /** Setters. */
    paneSettings: {
        readonly direction: import("../../core/resizable").Direction;
        isEnabled: (pane: "tree" | "calendar" | "layout") => boolean;
        enable: (pane: "tree" | "calendar" | "layout") => void;
        disable: (pane: "tree" | "calendar" | "layout") => void;
        reset: () => void;
    };
    timeline: {
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
};
export type VerdagraphContext = ReturnType<typeof createVerdagraphContext>;
export declare function setVerdagraphContext(): {
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
    /** Setters. */
    paneSettings: {
        readonly direction: import("../../core/resizable").Direction;
        isEnabled: (pane: "tree" | "calendar" | "layout") => boolean;
        enable: (pane: "tree" | "calendar" | "layout") => void;
        disable: (pane: "tree" | "calendar" | "layout") => void;
        reset: () => void;
    };
    timeline: {
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
};
export declare function getVerdagraphContext(): {
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
    /** Setters. */
    paneSettings: {
        readonly direction: import("../../core/resizable").Direction;
        isEnabled: (pane: "tree" | "calendar" | "layout") => boolean;
        enable: (pane: "tree" | "calendar" | "layout") => void;
        disable: (pane: "tree" | "calendar" | "layout") => void;
        reset: () => void;
    };
    timeline: {
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
};
export {};
//# sourceMappingURL=verdagraphContext.svelte.d.ts.map