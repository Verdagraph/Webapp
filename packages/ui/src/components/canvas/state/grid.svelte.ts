import Konva from 'konva';
import { type CanvasContainer } from './container.svelte';
import { type CanvasTransform } from './transform.svelte';
import { getColor } from '$utils';
import { localStore } from '$state/localStore.svelte';
import type { Vector2d } from 'konva/lib/types';

type GridManagerPersistedState = {
	snapToGrid: boolean;
	rightAngleConstraint: boolean;
	metersPerBackgroundGridline: number;
};

/**
 * Rounds the number up to the nearest multiple of step.
 * @param number The number to round.
 * @param step The step to round to a multiple of.
 * @returns The rounded number.
 */
function roundUpToStep(number: number, step: number): number {
	return Math.round(number / step) * step;
}

/**
 * Rounds the number down to the nearest multiple of step.
 * @param number The number to round.
 * @param step The step to round to a multiple of.
 * @returns The rounded number.
 */
function roundDownToStep(number: number, step: number): number {
	return Math.floor(number / step) * step;
}

export function createCanvasGridManager(
	container: CanvasContainer,
	transform: CanvasTransform
) {
	/** Konva elements. */
	let gridlinesLayer: Konva.Layer | null = null;
	let backgroundGridlinesGroup: Konva.Group | null = null;

	/** Runes. */
	const config = localStore<GridManagerPersistedState>('layoutGridState', {
		snapToGrid: true,
		rightAngleConstraint: false,
		metersPerBackgroundGridline: 0.3048
	});
	const pixelsPerBackgroundGridline = $derived(
		container.pixelsPerMeter * config.value.metersPerBackgroundGridline
	);

	function initialize() {
		gridlinesLayer = container.addLayer('gridlines');
		backgroundGridlinesGroup = new Konva.Group();
		gridlinesLayer.add(backgroundGridlinesGroup);

		container.addResizeFunction(renderBackgroundGridlines);
		transform.addTransformFunction(renderBackgroundGridlines);
		renderBackgroundGridlines();
	}

	/** Functions. */

	/**
	 * Given a position, returns the closest position that matches a grid,
	 * meaning that it lies on a gridline or equally between two gridlines,
	 * with all other grids having a higher priority over the background grid.
	 *
	 * Returns the original position if snapping to grid is disabled.
	 * @param pos The position to snap.
	 * @returns The snapped position
	 */
	function snapToGrid(pos: Vector2d): Vector2d {
		if (!config.value.snapToGrid) {
			return pos;
		}

		/** TODO: support other grids than the background grid. */

		return {
			x: roundUpToStep(pos.x, pixelsPerBackgroundGridline / 2),
			y: roundUpToStep(pos.y, pixelsPerBackgroundGridline / 2)
		};
	}

	/**
	 * Renders the background gridlines onto the gridlines layer.
	 */
	function renderBackgroundGridlines() {
		if (!gridlinesLayer || !backgroundGridlinesGroup) {
			return;
		}

		/**
		 * Calculate the coordinate range viewable in the canvas currently,
		 * considering the canvas dimensions, position, and scaling.
		 */
		const viewableStartPosition = {
			x: -transform.position.x / transform.scaleFactor.x,
			y: -transform.position.y / transform.scaleFactor.y
		};
		const viewableEndPosition = {
			x: viewableStartPosition.x + container.width / transform.scaleFactor.x,
			y: viewableStartPosition.y + container.height / transform.scaleFactor.y
		};

		/**
		 * Calculate the starting and ending positions of the gridlines, such that it is outside of the viewable area
		 * and is a multiple of the spaces between gridlines, such that the gridlines stay at the same position
		 * across renders.
		 */
		const startPosition = {
			x: roundDownToStep(viewableStartPosition.x, pixelsPerBackgroundGridline),
			y: roundDownToStep(viewableStartPosition.y, pixelsPerBackgroundGridline)
		};
		const endPosition = {
			x: roundUpToStep(
				viewableEndPosition.x + pixelsPerBackgroundGridline,
				pixelsPerBackgroundGridline
			),
			y: roundUpToStep(
				viewableEndPosition.y + pixelsPerBackgroundGridline,
				pixelsPerBackgroundGridline
			)
		};

		/**
		 * Calculate the minimum number of grid segments to fully cover the viewable area.
		 */
		const numSegments = {
			x: Math.round((endPosition.y - startPosition.y) / pixelsPerBackgroundGridline),
			y: Math.round((endPosition.x - startPosition.x) / pixelsPerBackgroundGridline)
		};

		const gap = { x: pixelsPerBackgroundGridline, y: pixelsPerBackgroundGridline };

		backgroundGridlinesGroup.destroyChildren();

		/** Render horizontal gridlines. */
		for (let i = 0; i <= numSegments.x; i++) {
			const yPosition = startPosition.y + gap.x * i;
			let color = getColor('neutral', 3, mode.value);
			let strokeWidth = 1;
			if (yPosition == 0) {
				color = getColor('neutral', 4, mode.value);
				strokeWidth = 2;
			}
			backgroundGridlinesGroup.add(
				new Konva.Line({
					points: [startPosition.x, yPosition, endPosition.x, yPosition],
					stroke: color,
					strokeWidth: strokeWidth,
					strokeScaleEnabled: false
				})
			);
		}

		/** Render vertical gridlines. */
		for (let i = 0; i <= numSegments.y; i++) {
			const xPosition = startPosition.x + gap.y * i;
			let color = getColor('neutral', 2, mode.value);
			let strokeWidth = 1;
			if (xPosition == 0) {
				color = getColor('neutral', 3, mode.value);
				strokeWidth = 2;
			}
			backgroundGridlinesGroup.add(
				new Konva.Line({
					points: [xPosition, startPosition.y, xPosition, endPosition.y],
					stroke: color,
					strokeWidth: strokeWidth,
					strokeScaleEnabled: false
				})
			);
		}
	}

	return {
		get config() {
			return config.value;
		},
		set config(newVal) {
			config.value = newVal;
		},
		initialize,
		snapToGrid
	};
}
export default createCanvasGridManager;

export type CanvasGridManager = ReturnType<typeof createCanvasGridManager>;
