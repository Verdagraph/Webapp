<script lang="ts">
	import { getContext } from 'svelte';

	import type { CanvasContext } from './state/context.svelte';

	/** Props. */
	type Props = {
		canvasId: string;
	};
	let { canvasId }: Props = $props();

	let canvas = getContext<CanvasContext>(canvasId);

	/**
	 * A single tiled SVG pattern instead of a JS-generated array of `<line>`
	 * elements covering just the visible viewport - see grid.svelte.ts for
	 * why (this used to be the actual cause of panning feeling sluggish).
	 * Living inside the same outer `<g>` shapes ride on, the pattern (and
	 * the two origin lines below) move and scale for free during pan/zoom;
	 * the browser tiles it natively, no per-frame recomputation at all.
	 *
	 * The backing rect/lines are sized to a large fixed bound rather than
	 * reactively to the viewport - an SVG element's rendering cost is
	 * dictated by what's actually on screen, not its nominal coordinate
	 * bounds, so making this generously large (representing tens of
	 * thousands of meters at any realistic zoom) costs nothing and needs no
	 * viewport-tracking logic at all.
	 */
	const GRID_BOUND_PX = 1_000_000;

	const patternId = `${canvasId}-grid-pattern`;
</script>

<defs>
	<pattern
		id={patternId}
		patternUnits="userSpaceOnUse"
		width={canvas.gridManager.pixelsPerBackgroundGridline}
		height={canvas.gridManager.pixelsPerBackgroundGridline}
	>
		<line
			x1="0"
			y1="0"
			x2={canvas.gridManager.pixelsPerBackgroundGridline}
			y2="0"
			stroke={canvas.gridManager.horizontalLine.color}
			stroke-width={canvas.gridManager.horizontalLine.strokeWidth}
			vector-effect="non-scaling-stroke"
		/>
		<line
			x1="0"
			y1="0"
			x2="0"
			y2={canvas.gridManager.pixelsPerBackgroundGridline}
			stroke={canvas.gridManager.verticalLine.color}
			stroke-width={canvas.gridManager.verticalLine.strokeWidth}
			vector-effect="non-scaling-stroke"
		/>
	</pattern>
</defs>

<g>
	<rect
		x={-GRID_BOUND_PX}
		y={-GRID_BOUND_PX}
		width={GRID_BOUND_PX * 2}
		height={GRID_BOUND_PX * 2}
		fill="url(#{patternId})"
	/>
	<line
		x1={-GRID_BOUND_PX}
		y1="0"
		x2={GRID_BOUND_PX}
		y2="0"
		stroke={canvas.gridManager.horizontalOriginLine.color}
		stroke-width={canvas.gridManager.horizontalOriginLine.strokeWidth}
		vector-effect="non-scaling-stroke"
	/>
	<line
		x1="0"
		y1={-GRID_BOUND_PX}
		x2="0"
		y2={GRID_BOUND_PX}
		stroke={canvas.gridManager.verticalOriginLine.color}
		stroke-width={canvas.gridManager.verticalOriginLine.strokeWidth}
		vector-effect="non-scaling-stroke"
	/>
</g>
