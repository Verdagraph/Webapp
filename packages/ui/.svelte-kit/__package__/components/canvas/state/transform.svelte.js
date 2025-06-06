import { AppError } from '@vdg-webapp/models';
import { isMobile } from '../../../state/isMobile.svelte';
import { LocalStore } from '../../../state/localStore.svelte';
import {} from './container.svelte';
/** The default position of the transform controls. */
const defaultButtonPosition = isMobile() ? 'br' : 'bl';
/** The minimum and maximum allowed stage scale factors. */
const minScaleFactor = 0.1;
const maxScaleFactor = 10;
/**
 * Context which handles canvas positioning and scaling.
 * @param container The container context.
 * @param draggable: The draggable Konva value.
 * @param strokeScale: The default value for strokeScaleEnabled for shapes.
 * @returns The transform context.
 */
export function createCanvasTransform(container, draggable, strokeScale) {
    /** Runes. */
    let scaleFactor = $state({ x: 1, y: 1 });
    let position = $state({ x: 0, y: 0 });
    const config = new LocalStore('layoutControls', {
        buttonsExpanded: true,
        buttonsPosition: defaultButtonPosition
    });
    /**
     * An array of functions which, when the canvas is transformed, are called.
     */
    const transformFunctions = [];
    /** Functions. */
    /** Retrieve the initial position. */
    function initialPosition() {
        /** The top-right quadrant of the canvas is treated as the positive quadrant. */
        return { x: 0, y: container.height };
    }
    /**
     * Converts a model X position into a canvas equivalent.
     * @param modelPos The quantity contained within the model in meters.
     * @returns The equivalent canvas position in pixels.
     */
    function canvasXPos(modelPos) {
        return modelPos * container.pixelsPerMeter;
    }
    /**
     * Converts a canvas X position into a model eqivalent.
     * @param canvasPos The quantity represented on the canvas, in pixels.
     * @returns The equivalent model position in meters.
     */
    function modelXPos(canvasPos) {
        return canvasPos / container.pixelsPerMeter;
    }
    /**
     * Converts a model Y position into a canvas equivalent.
     * @param modelPos The quantity contained within the model in meters.
     * @returns The equivalent canvas position in  pixels.
     */
    function canvasYPos(modelPos) {
        /** The top-right quadrant of the canvas is treated as the positive quadrant. */
        return -modelPos * container.pixelsPerMeter;
    }
    /**
     * Converts a canvas Y position into a model eqivalent.
     * @param canvasPos The quantity represented on the canvas, in pixels.
     * @returns The equivalent model position in meters.
     */
    function modelYPos(canvasPos) {
        return -canvasPos / container.pixelsPerMeter;
    }
    /**
     * Converts a model distance into a canvas equivalent.
     * @param modelDistance The quantity contained within the model,
     * in meters.
     * @returns The equivalent canvas distance.
     */
    function canvasDistance(modelDistance) {
        return modelDistance * container.pixelsPerMeter;
    }
    /**
     * Converts a canvas distance into a model eqivalent.
     * @param canvasPos The quantity represented on the canvas, in pixels.
     * @returns The equivalent model distance in meters.
     */
    function modelDistance(canvasDistance) {
        return canvasDistance / container.pixelsPerMeter;
    }
    /**
     *  Reset the transformations to the initial state.
     */
    function reset() {
        scaleFactor = { x: 1, y: 1 };
        position = initialPosition();
    }
    /**
     * Moves the position of the canvas.
     * @param translation The translation to move the position by.
     */
    function translate(translation) {
        position.x += translation.x;
        position.y += translation.y;
    }
    /**
     * Adds to the current scale factor.
     * Scales from the center.
     * @param scale Adds to the current scale factor.
     */
    function addScale(scale) {
        if (scale === 0) {
            return;
        }
        /** Cap scaling. */
        if ((scaleFactor.x <= minScaleFactor && scale < 0) ||
            (scaleFactor.x >= maxScaleFactor && scale > 0) ||
            (scaleFactor.y <= minScaleFactor && scale < 0) ||
            (scaleFactor.y >= maxScaleFactor && scale > 0)) {
            return;
        }
        /** The center of the canvas without considering translation or scaling. */
        const preTransformedCenter = {
            x: container.width / 2,
            y: container.width / 2
        };
        /** The center of the canvas considering translation and scaling. */
        const transformedCenter = {
            x: (preTransformedCenter.x - position.x) / scaleFactor.x,
            y: (preTransformedCenter.y - position.y) / scaleFactor.y
        };
        /** Add to the scale factor. */
        const newScaleFactor = {
            x: scale < 0
                ? Math.max(scaleFactor.x + scale, minScaleFactor)
                : Math.min(scaleFactor.x + scale, maxScaleFactor),
            y: scale < 0
                ? Math.max(scaleFactor.y + scale, minScaleFactor)
                : Math.min(scaleFactor.y + scale, maxScaleFactor)
        };
        scaleFactor = newScaleFactor;
        /** Set the position such that the center of the canvas before and after scaling is the same. */
        position = {
            x: preTransformedCenter.x - transformedCenter.x * scaleFactor.x,
            y: preTransformedCenter.y - transformedCenter.y * scaleFactor.y
        };
    }
    /**
     * Adds a new side-effect to transforming the canvas.
     * @param func The function to add.
     */
    function addTransformFunction(func) {
        transformFunctions.push(func);
    }
    /**
     * Initialize the side-effects.
     */
    function initialize() {
        if (!container.stage) {
            throw new AppError('Attempted to initialize canvas transform with uninitialized stage.');
        }
        position = initialPosition();
        container.stage.position(position);
        container.stage.draggable(draggable);
        $effect(() => {
            if (!container.stage)
                return;
            container.stage.scale(scaleFactor);
            container.stage.position(position);
            transformFunctions.forEach((func) => func());
        });
        /** Events. */
        container.stage.on('dragmove', () => {
            if (!container.stage)
                return;
            position = container.stage.position();
        });
    }
    return {
        get config() {
            return config.value;
        },
        get scaleFactor() {
            return scaleFactor;
        },
        set scaleFactor(newVal) {
            scaleFactor = newVal;
        },
        get position() {
            return position;
        },
        get strokeScale() {
            return strokeScale;
        },
        set config(newVal) {
            config.value = newVal;
        },
        set position(newVal) {
            position = newVal;
        },
        canvasXPos,
        modelXPos,
        canvasYPos,
        modelYPos,
        canvasDistance,
        modelDistance,
        translate,
        addScale,
        reset,
        addTransformFunction,
        initialize
    };
}
export default createCanvasTransform;
