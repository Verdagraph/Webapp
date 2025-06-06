import type { Vector2d } from 'konva/lib/types';
import { type CanvasContainer } from './container.svelte';
/**
 * Indicates a corner of the canvas.
 * Same as tailwind class names.
 */
type CanvasCorner = 'tl' | 'tr' | 'br' | 'bl';
/** Config for the UI controls. */
type TransformControlsState = {
    /** The open state of the buttons collapsible. */
    buttonsExpanded: boolean;
    /** The position of the buttons on the screen. */
    buttonsPosition: CanvasCorner;
};
/**
 * Context which handles canvas positioning and scaling.
 * @param container The container context.
 * @param draggable: The draggable Konva value.
 * @param strokeScale: The default value for strokeScaleEnabled for shapes.
 * @returns The transform context.
 */
export declare function createCanvasTransform(container: CanvasContainer, draggable: boolean, strokeScale: boolean): {
    config: TransformControlsState;
    scaleFactor: Vector2d;
    position: Vector2d;
    readonly strokeScale: boolean;
    canvasXPos: (modelPos: number) => number;
    modelXPos: (canvasPos: number) => number;
    canvasYPos: (modelPos: number) => number;
    modelYPos: (canvasPos: number) => number;
    canvasDistance: (modelDistance: number) => number;
    modelDistance: (canvasDistance: number) => number;
    translate: (translation: Vector2d) => void;
    addScale: (scale: number) => void;
    reset: () => void;
    addTransformFunction: (func: () => void) => void;
    initialize: () => void;
};
export default createCanvasTransform;
export type CanvasTransform = ReturnType<typeof createCanvasTransform>;
//# sourceMappingURL=transform.svelte.d.ts.map