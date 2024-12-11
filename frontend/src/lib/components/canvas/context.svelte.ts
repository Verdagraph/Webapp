import { AppError } from '@vdt-webapp/common/src/errors';
import Konva from 'konva';

type CanvasReactiveState = {
	initialized: boolean;
	containerWidth: number;
	containerHeight: number;
};

export function createCanvasContext(canvasId: string, backgroundColor: string) {
	/** Konva elements. */
	const containerId = canvasId;
	let stage: Konva.Stage | null = null;
	let backgroundLayer;
	let layers: Record<string, Konva.Layer> = {};

	/** Runes. */
	let reactive = $state<CanvasReactiveState>({
		initialized: false,
		containerWidth: 0,
		containerHeight: 0
	});

	/**
	 * An array of functions which, when the canvas is resized, are called.
	 */
	let resizeFunctions: Array<() => void> = [
		/** Update the stage upon container resize. */
		() => {
			if (stage) {
				stage.width(reactive.containerWidth);
				stage.height(reactive.containerHeight);
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
	function initializeCanvas() {
		/** Initialize the stage. */
		stage = new Konva.Stage({
			container: containerId,
			width: reactive.containerWidth,
			height: reactive.containerHeight
		});

		/** Initialize the background*/
		const backgroundLayer = addLayer('background');
		const backgroundRect = new Konva.Rect({
			fill: backgroundColor,
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

		reactive.initialized = true;
	}

	return {
		get containerId() {
			return containerId;
		},
		get stage() {
			return stage;
		},
		get reactive() {
			return reactive;
		},
		set reactive(newVal: CanvasReactiveState) {
			reactive = newVal;
		},
		get backgroundLayer() {
			return backgroundLayer;
		},

		initializeCanvas,
		addLayer,
		getLayer,
		onResize,
		addResizeFunction
	};
}
export default createCanvasContext;

export type CanvasContext = ReturnType<typeof createCanvasContext>;
