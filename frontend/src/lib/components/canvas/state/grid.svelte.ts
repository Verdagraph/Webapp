import Konva from 'konva';
import { CanvasContainer } from './container.svelte';
import { CanvasTransform } from './transform.svelte';
import { getColor } from '$lib/utils';
import mode from '$state/theme.svelte';
import { localStore } from '$state/localStore.svelte';

type GridManagerPersistedState = {
	snapToGrid: boolean;
	rightAngleConstraint: boolean;
};

export function createCanvasGridManager(
	container: CanvasContainer,
	transform: CanvasTransform
) {
	/** Konva elements. */
	let gridlinesLayer: Konva.Layer | null = null;

	/** Runes. */
	let pixelsPerMeter = $state(50);
	let metersPerGridline = $state(1);
	let pixelsPerGridline = $derived(pixelsPerMeter * metersPerGridline);
	let xGridlineCount = $derived(container.height / pixelsPerGridline);
	let yGridlineCount = $derived(container.width / pixelsPerGridline);

	let config = localStore<GridManagerPersistedState>('layoutGridState', {
		snapToGrid: true,
		rightAngleConstraint: false
	});

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
		transform.addTransformFunction(renderGridlines);
		renderGridlines();
	}

	return {
		get config() {
			return config.value;
		},
		set config(newVal) {
			config.value = newVal;
		},
		initialize
	};
}
export default createCanvasGridManager;

export type CanvasGridManager = ReturnType<typeof createCanvasGridManager>;
