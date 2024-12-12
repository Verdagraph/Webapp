import Konva from 'konva';
import { CanvasContainer } from './container.svelte';
import { getColor } from '$lib/utils';
import mode from '$state/theme.svelte';
import { isMobile } from '$state/isMobile.svelte';
import { LocalStore } from '$state/localStore.svelte';
import type { Vector2d } from 'konva/lib/types';

export function createCanvasTransform(container: CanvasContainer) {
	/** Konva elements. */

	/** Runes. */

	let scale = $state(1);
	let translate = $state<Vector2d>({ x: 0, y: 0 });

	/** Update the  */
	$effect(() => {
		container.stage?.scale({ x: scale, y: scale });
	});
	$effect(() => {
		container.stage?.position(translate);
	});

	/** Functions. */
	function reset() {
		scale = 1;
		translate = { x: 0, y: 0 };
	}

	return {
		reset
	};
}
export default createCanvasTransform;

export type CanvasTransform = ReturnType<typeof createCanvasTransform>;
