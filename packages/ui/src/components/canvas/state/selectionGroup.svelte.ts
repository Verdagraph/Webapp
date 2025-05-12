import Konva from 'konva';

import { type CanvasContainer } from './container.svelte';

type SelectTool = 'pointer' | 'group' | 'union' | 'intersect';

export function createSelectionGroup(container: CanvasContainer) {
	/** Consts. */

	/** Konva. */
	// eslint-disable-next-line
	const group: Konva.Group = new Konva.Group();

	/** Runes. */
	const selectTool: SelectTool = $state('pointer');

	container.stage?.on('mouseover', () => {
		setDocumentCursor();
	});
	container.stage?.on('mouseout', () => {
		document.body.style.cursor = 'default';
	});

	function setDocumentCursor() {
		switch (selectTool) {
			case 'pointer':
				document.body.style.cursor = 'default';
				break;
			case 'group':
				document.body.style.cursor = 'crosshair';
				break;
			case 'union':
				document.body.style.cursor = 'crosshair';
				break;
			case 'intersect':
				document.body.style.cursor = 'crosshair';
				break;
		}
	}

	return {
		setDocumentCursor
	};
}
export default createSelectionGroup;

export type SelectGroup = ReturnType<typeof createSelectionGroup>;
