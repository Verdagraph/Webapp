import Konva from 'konva';
import { CanvasContainer } from './container.svelte';
import { getColor } from '$lib/utils';
import mode from '$state/theme.svelte';
import { isMobile } from '$state/isMobile.svelte';
import { LocalStore } from '$state/localStore.svelte';
import type { Vector2d } from 'konva/lib/types';

const minScaleFactor = 0.1;
const maxScaleFactor = 10;

/**
 * Indicates a corner of the canvas.
 * Same as tailwind class names.
 */
type CanvasCorner = 'tl' | 'tr' | 'br' | 'bl';

/** Config for the controls. */
type TransformControlsPersistedState = {
	/** The open state of the buttons collapsible. */
	buttonsExpanded: boolean;
	/** The position of the buttons on the screen. */
	buttonsPosition: CanvasCorner;
};

const defaultButtonPosition: CanvasCorner = isMobile() ? 'br' : 'bl';

export function createCanvasTransform(container: CanvasContainer) {
	/** Runes. */
	let scaleFactor = $state<Vector2d>({ x: 1, y: 1 });
	let position = $state<Vector2d>({ x: 0, y: 0 });
	let config = new LocalStore<TransformControlsPersistedState>('layoutControls', {
		buttonsExpanded: true,
		buttonsPosition: defaultButtonPosition
	});

	/**
	 * An array of functions which, when the canvas is transformed, are called.
	 */
	let transformFunctions: Array<() => void> = [];

	/** Functions. */

	/** Retrieve the initial position. */
	function initialPosition() {
		/** The top-right quadrant of the canvas is treated as the positive quadrant. */
		return { x: 0, y: container.height };
	}

	/**
	 * Converts a model X position into a canvas equivalent.
	 * @param modelPos The quantity contained within the model in meters.
	 * @returns The equivalent canvas position in pixels.
	 */
	function canvasXPos(modelPos: number): number {
		return modelPos * container.pixelsPerMeter;
	}

	/**
	 * Converts a canvas X position into a model eqivalent.
	 * @param canvasPos The quantity represented on the canvas, in pixels.
	 * @returns The equivalent model position in meters.
	 */
	function modelXPos(canvasPos: number): number {
		return canvasPos / container.pixelsPerMeter;
	}

	/**
	 * Converts a model Y position into a canvas equivalent.
	 * @param modelPos The quantity contained within the model in meters.
	 * @returns The equivalent canvas position in  pixels.
	 */
	function canvasYPos(modelPos: number): number {
		/** The top-right quadrant of the canvas is treated as the positive quadrant. */
		return -modelPos * container.pixelsPerMeter;
	}

	/**
	 * Converts a canvas Y position into a model eqivalent.
	 * @param canvasPos The quantity represented on the canvas, in pixels.
	 * @returns The equivalent model position in meters.
	 */
	function modelYPos(canvasPos: number): number {
		return -canvasPos / container.pixelsPerMeter;
	}

	/**
	 * Converts a model distance into a canvas equivalent.
	 * @param modelDistance The quantity contained within the model,
	 * in meters.
	 * @returns The equivalent canvas distance.
	 */
	function canvasDistance(modelDistance: number): number {
		return modelDistance * container.pixelsPerMeter;
	}

	/**
	 * Converts a canvas distance into a model eqivalent.
	 * @param canvasPos The quantity represented on the canvas, in pixels.
	 * @returns The equivalent model distance in meters.
	 */
	function modelDistance(canvasDistance: number): number {
		return canvasDistance / container.pixelsPerMeter;
	}

	/**
	 *  Reset the transformations to the initial state.
	 */
	function reset() {
		scaleFactor = { x: 1, y: 1 };
		position = initialPosition();
	}

	/**
	 * Moves the position of the canvas.
	 * @param translation The translation to move the position by.
	 */
	function translate(translation: Vector2d) {
		position.x += translation.x;
		position.y += translation.y;
	}

	/**
	 * Adds to the current scale factor.
	 * Scales from the center.
	 * @param scale Adds to the current scale factor.
	 */
	function addScale(scale: number) {
		if (scale === 0) {
			return;
		}

		/** Cap scaling. */
		if (
			(scaleFactor.x <= minScaleFactor && scale < 0) ||
			(scaleFactor.x >= maxScaleFactor && scale > 0) ||
			(scaleFactor.y <= minScaleFactor && scale < 0) ||
			(scaleFactor.y >= maxScaleFactor && scale > 0)
		) {
			return;
		}

		/** The center of the canvas without considering translation or scaling. */
		const preTransformedCenter = {
			x: container.width / 2,
			y: container.width / 2
		};

		/** The center of the canvas considering translation and scaling. */
		const transformedCenter = {
			x: (preTransformedCenter.x - position.x) / scaleFactor.x,
			y: (preTransformedCenter.y - position.y) / scaleFactor.y
		};

		/** Add to the scale factor. */
		const newScaleFactor = {
			x:
				scale < 0
					? Math.max(scaleFactor.x + scale, minScaleFactor)
					: Math.min(scaleFactor.x + scale, maxScaleFactor),
			y:
				scale < 0
					? Math.max(scaleFactor.y + scale, minScaleFactor)
					: Math.min(scaleFactor.y + scale, maxScaleFactor)
		};
		scaleFactor = newScaleFactor;

		/** Set the position such that the center of the canvas before and after scaling is the same. */
		position = {
			x: preTransformedCenter.x - transformedCenter.x * scaleFactor.x,
			y: preTransformedCenter.y - transformedCenter.y * scaleFactor.y
		};
	}

	/**
	 * Adds a new side-effect to transforming the canvas.
	 * @param func The function to add.
	 */
	function addTransformFunction(func: () => void) {
		transformFunctions.push(func);
	}

	/**
	 * Initialize the side-effects.
	 */
	function initialize() {
		position = initialPosition();
		container.stage?.position(position);
		console.log(position);
		console.log(container.height);

		$effect(() => {
			container.stage?.scale({ x: scaleFactor.x, y: scaleFactor.y });
			container.stage?.position(position);
			transformFunctions.forEach((func) => func());
		});
	}

	return {
		get config() {
			return config.value;
		},
		get scaleFactor() {
			return scaleFactor;
		},
		set scaleFactor(newVal: Vector2d) {
			scaleFactor = newVal;
		},
		get position() {
			return position;
		},
		set config(newVal: TransformControlsPersistedState) {
			config.value = newVal;
		},
		set position(newVal) {
			position = newVal;
		},
		canvasXPos,
		modelXPos,
		canvasYPos,
		modelYPos,
		canvasDistance,
		modelDistance,
		translate,
		addScale,
		reset,
		addTransformFunction,
		initialize
	};
}
export default createCanvasTransform;

export type CanvasTransform = ReturnType<typeof createCanvasTransform>;
