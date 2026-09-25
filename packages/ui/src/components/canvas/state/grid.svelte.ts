import { mode } from 'mode-watcher';

import { localStore } from '$state/localStore.svelte';
import { getColor } from '$utils';

import { type CanvasContainer } from './container.svelte';

type Position = { x: number; y: number };

export type GridManagerConfig = {
	metersPerBackgroundGridline: number;
};

type GridManagerPersistedState = {
	snapToGrid: boolean;
	rightAngleConstraint: boolean;
	metersPerBackgroundGridline: number;
};

/** The line styling for one grid tile - see Gridlines.svelte, which renders these as an SVG <pattern>. */
export type GridlineStyle = {
	color: string;
	strokeWidth: number;
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

export function createCanvasGridManager(container: CanvasContainer) {
	/** Runes. */
	const config = localStore<GridManagerPersistedState>('layoutGridState', {
		snapToGrid: true,
		rightAngleConstraint: false,
		metersPerBackgroundGridline: 0.3048
	});
	const pixelsPerBackgroundGridline = $derived(
		container.pixelsPerMeter * config.value.metersPerBackgroundGridline
	);

	/**
	 * Line styling only, not positions - Gridlines.svelte renders the grid as
	 * a single tiled SVG <pattern> rather than a JS-generated array of
	 * `<line>` elements, living inside the same outer <g> shapes ride on, so
	 * pan/zoom moves and scales it for free. Only mode changes (light/dark)
	 * need to recompute these colors.
	 */
	const horizontalLine: GridlineStyle = $derived({
		color: getColor('neutral', 3, mode.current),
		strokeWidth: 1
	});
	const verticalLine: GridlineStyle = $derived({
		color: getColor('neutral', 2, mode.current),
		strokeWidth: 1
	});
	const horizontalOriginLine: GridlineStyle = $derived({
		color: getColor('neutral', 4, mode.current),
		strokeWidth: 2
	});
	const verticalOriginLine: GridlineStyle = $derived({
		color: getColor('neutral', 3, mode.current),
		strokeWidth: 2
	});

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
	function snapToGrid(pos: Position): Position {
		if (!config.value.snapToGrid) {
			return pos;
		}

		/** TODO: support other grids than the background grid. */

		return {
			x: roundUpToStep(pos.x, pixelsPerBackgroundGridline / 2),
			y: roundUpToStep(pos.y, pixelsPerBackgroundGridline / 2)
		};
	}

	return {
		get config() {
			return config.value;
		},
		set config(newVal) {
			config.value = newVal;
		},
		get pixelsPerBackgroundGridline() {
			return pixelsPerBackgroundGridline;
		},
		get horizontalLine() {
			return horizontalLine;
		},
		get verticalLine() {
			return verticalLine;
		},
		get horizontalOriginLine() {
			return horizontalOriginLine;
		},
		get verticalOriginLine() {
			return verticalOriginLine;
		},
		snapToGrid
	};
}
export default createCanvasGridManager;

export type CanvasGridManager = ReturnType<typeof createCanvasGridManager>;
