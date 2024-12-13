import Konva from 'konva';
import { CanvasContainer } from './container.svelte';
import { getColor } from '$lib/utils';
import mode from '$state/theme.svelte';
import { isMobile } from '$state/isMobile.svelte';
import { LocalStore } from '$state/localStore.svelte';
import type { Vector2d } from 'konva/lib/types';

export function createCanvasTransform(container: CanvasContainer) {
	/** Runes. */

	let scaleFactor = $state(1);
	let position = $state<Vector2d>({ x: 0, y: 0 });

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
	 * Scales the current scale factor.
	 * @param factor Multiplied to the current scale factor.
	 */
	function scale(factor: number) {
		scaleFactor *= factor;
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
		get scaleFactor() {
			return scaleFactor;
		},
		set scaleFactor(newVal: number) {
			scaleFactor = newVal;
		},
		get position() {
			return position;
		},
		set position(newVal) {
			position = newVal;
		},
		translate,
		scale,
		reset,
		addTransformFunction,
		initialize
	};
}
export default createCanvasTransform;

export type CanvasTransform = ReturnType<typeof createCanvasTransform>;
