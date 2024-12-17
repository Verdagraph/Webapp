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
	let scaleFactor = $state(1);
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

	/**
	 *  Reset the transformations to the initial state.
	 */
	function reset() {
		scaleFactor = 1;
		position = { x: 0, y: 0 };
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
		if (scale == 0) {
			return;
		}

		/** Cap scaling. */
		if (scaleFactor <= minScaleFactor || scaleFactor >= maxScaleFactor) {
			return;
		}

		/** The center of the canvas without considering translation or scaling. */
		const preTransformedCenter = { x: container.width / 2, y: container.width / 2 };

		/** The center of the canvas considering translation and scaling. */
		const transformedCenter = {
			x: (preTransformedCenter.x - position.x) / scaleFactor,
			y: (preTransformedCenter.y - position.y) / scaleFactor
		};

		/** Add to the scale factor. */
		if (scale < 0) {
			scaleFactor = Math.max(scaleFactor + scale, minScaleFactor);
		} else {
			scaleFactor = Math.min(scaleFactor + scale, maxScaleFactor);
		}

		/** Set the position such that the center of the canvas before and after scaling is the same. */
		position = {
			x: preTransformedCenter.x - transformedCenter.x * scaleFactor,
			y: preTransformedCenter.y - transformedCenter.y * scaleFactor
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
		$effect(() => {
			container.stage?.scale({ x: scaleFactor, y: scaleFactor });
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
		set scaleFactor(newVal: number) {
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
		translate,
		addScale,
		reset,
		addTransformFunction,
		initialize
	};
}
export default createCanvasTransform;

export type CanvasTransform = ReturnType<typeof createCanvasTransform>;
