import Konva from 'konva';
import { CanvasContainer } from './container.svelte';
import { getColor } from '$lib/utils';
import mode from '$state/theme.svelte';

export function createCanvasTransform(container: CanvasContainer) {
	/** Konva elements. */

	/** Runes. */
	const zoomButtons = true;
	const panButtons = true;

	const scale = 1;
	const translation = { x: 0, y: 0 };

	/** Functions. */

	return {};
}
export default createCanvasTransform;

export type CanvasTransform = ReturnType<typeof createCanvasTransform>;
