import Root from './Canvas.svelte';
import Gridlines from './Gridlines.svelte';
import TransformControls from './TransformControls.svelte';
import { createCanvasContext, type CanvasContext } from './state';

export * from './workspace';
export { Root as Canvas, Gridlines, TransformControls };
export { createCanvasContext, type CanvasContext };
/**
 * TODO: remove notes
 *
 * Canvas needs to have the following features:
 * Gridlines corresponding to snap-in - global gridlines, and a set for each planting area
 * Canvas scrolling using keyboard, scroll wheels, drag, and buttons
 * Zoom using scroll wheel+keyboard, pinch and drag, and buttons
 * Home button
 * Scale
 */
