import { mode } from 'mode-watcher';
type ModeStore = typeof mode;
export * from './transform.svelte';
/**
 * The Canvas Context provides access to all canvas state
 * that must be shared amongst components.
 * Note that one canvas represents one workspace.
 * @param canvasId Unique identifier for this canvas.
 * @param canvasWorkspaceId The ID of the workspace represented in the canvas.
 * @param mode Access to the ModeWatcher current store value.
 * @param strokeScale: The default value for strokeScaleEnabled for shapes.
 * @returns The canvas contexts.
 */
export declare function createCanvasContext(canvasContextId: string, canvasWorkspaceId: string, mode: ModeStore, draggable?: boolean, strokeScale?: boolean): {
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
export default createCanvasContext;
export type CanvasContext = ReturnType<typeof createCanvasContext>;
//# sourceMappingURL=context.svelte.d.ts.map