import { AppError } from '@vdt-webapp/common/src/errors';
import Konva from 'konva';
import { getColor } from '$lib/utils';
import mode from '$state/theme.svelte';

export function createCanvasContainer(canvasId: string) {
	/** Konva. */
	const containerId = canvasId; /** ID of the container HTML element. */
	let stage: Konva.Stage | null = null;
	let layers: Record<string, Konva.Layer> =
		{}; /** Record to track references to layers. */
	const pixelsPerMeter = 50; /** The initial scale of rendering, pre-scaling. */

	/** Runes. */
	let initialized = $state(false);
	let height = $state(0);
	let width = $state(0);

	/**
	 * An array of functions which, when the canvas is resized, are called.
	 */
	let resizeFunctions: Array<() => void> = [
		/** Update the stage upon container resize. */
		() => {
			if (stage) {
				stage.width(width);
				stage.height(height);
			}
		}
	];

	/** Functions. */

	/**
	 * Adds a new layer to the canvas.
	 * @param layerId Used as a key to retrieve the layer.
	 * @returns The new layer.
	 */
	function addLayer(layerId: string): Konva.Layer {
		if (!stage) {
			throw new AppError('Attempted to add a layer when the canvas is uninitialized.');
		}
		layers[layerId] = new Konva.Layer();
		stage.add(layers[layerId]);
		return layers[layerId];
	}

	/**
	 * Retrieves a layer from the canvas context.
	 * @param layerId The ID of the layer.
	 * @returns The retrieved layer.
	 */
	function getLayer(layerId: string): Konva.Layer {
		if (layers[layerId]) {
			return layers[layerId];
		}

		throw new AppError(
			`Attempted to retrieve layer '${layerId}' which does not exist.`
		);
	}

	/**
	 * Used to execute the resize functions.
	 */
	function onResize() {
		resizeFunctions.forEach((func) => func());
	}
	/**
	 * Adds a new side-effect to resizing the canvas container.
	 * @param func The function to add.
	 */
	function addResizeFunction(func: () => void) {
		resizeFunctions.push(func);
	}

	/**
	 * Initializes the canvas.
	 */
	function initialize() {
		/** Initialize the stage. */
		stage = new Konva.Stage({
			container: containerId,
			width: width,
			height: height
		});

		/** Initialize the background*/
		const backgroundLayer = addLayer('background');
		const backgroundRect = new Konva.Rect({
			fill: getColor('neutral', 1, mode.value),
			x: 0,
			y: 0,
			width: stage.width(),
			height: stage.height()
		});
		backgroundLayer.add(backgroundRect);
		addResizeFunction(() => {
			if (stage && backgroundRect) {
				backgroundRect.width(stage.width());
				backgroundRect.height(stage.height());
			}
		});

		initialized = true;
	}

	return {
		get containerId() {
			return containerId;
		},
		get stage() {
			return stage;
		},
		get pixelsPerMeter() {
			return pixelsPerMeter;
		},
		get initialized() {
			return initialized;
		},
		get width() {
			return width;
		},
		get height() {
			return height;
		},
		set width(newVal: number) {
			width = newVal;
		},
		set height(newVal: number) {
			height = newVal;
		},

		initialize,
		addLayer,
		getLayer,
		onResize,
		addResizeFunction
	};
}
export default createCanvasContainer;

export type CanvasContainer = ReturnType<typeof createCanvasContainer>;
