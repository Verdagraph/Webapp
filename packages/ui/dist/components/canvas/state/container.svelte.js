import Konva from 'konva';
import { AppError } from '@vdg-webapp/models/src/errors';
/**
 * Context which stores the Konva stage, container div sizing,
 * and layers.
 * @param canvasId The ID of the canvas context.
 * @returns The container context.
 */
export function createCanvasContainer(canvasId) {
    /** Consts. */
    const containerId = canvasId; /** ID of the container HTML element. */
    const pixelsPerMeter = 100; /** The initial scale of rendering, pre-scaling. */
    /** Konva. */
    let stage = null;
    const layers = {}; /** Record to track references to layers. */
    /** Runes. */
    let initialized = $state(false);
    let height = $state(0);
    let width = $state(0);
    /**
     * An array of functions which, when the canvas is resized, are called.
     */
    const resizeFunctions = [
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
    function addLayer(layerId) {
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
    function getLayer(layerId) {
        if (layers[layerId]) {
            return layers[layerId];
        }
        throw new AppError(`Attempted to retrieve layer '${layerId}' which does not exist.`);
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
    function addResizeFunction(func) {
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
        set width(newVal) {
            width = newVal;
        },
        set height(newVal) {
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
