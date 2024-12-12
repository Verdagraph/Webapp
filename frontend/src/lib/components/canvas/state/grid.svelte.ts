import Konva from 'konva';
import { CanvasContainer } from './container.svelte';
import { getColor } from '$lib/utils';
import mode from '$state/theme.svelte';

export function createCanvasGrid(container: CanvasContainer) {
	/** Konva elements. */
	let gridlinesLayer: Konva.Layer | null = null;

	/** Runes. */
	let pixelsPerMeter = $state(50);
	let metersPerGridline = $state(1);
	let pixelsPerGridline = $derived(pixelsPerMeter * metersPerGridline);
	let xGridlineCount = $derived(container.height / pixelsPerGridline);
	let yGridlineCount = $derived(container.width / pixelsPerGridline);

	/** Functions. */
	function renderGridlines() {
		if (gridlinesLayer) {
			gridlinesLayer.destroyChildren();

			/** Render horizontal gridlines. */
			for (let i = 0; i < xGridlineCount; i++) {
				const y = i * pixelsPerGridline;
				gridlinesLayer.add(
					new Konva.Line({
						points: [0, y, container.width, y],
						stroke: getColor('neutral', 3, mode.value),
						strokeWidth: 1,
						strokeScaleEnabled: false
					})
				);
			}

			/** Render vertical gridlines. */
			for (let i = 0; i < yGridlineCount; i++) {
				const x = i * pixelsPerGridline;
				gridlinesLayer.add(
					new Konva.Line({
						points: [x, 0, x, container.height],
						stroke: getColor('neutral', 3, mode.value),
						strokeWidth: 1,
						strokeScaleEnabled: false
					})
				);
			}
		}
	}

	function initialize() {
		gridlinesLayer = container.addLayer('gridlines');
		container.addResizeFunction(renderGridlines);
		renderGridlines();
	}

	return {
		initialize
	};
}
export default createCanvasGrid;

export type CanvasGrid = ReturnType<typeof createCanvasGrid>;
