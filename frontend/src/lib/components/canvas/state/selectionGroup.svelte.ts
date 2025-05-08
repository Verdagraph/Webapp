import { AppError } from '@vdg-webapp/common/src/errors';
import Konva from 'konva';
import { CanvasContainer } from './container.svelte';

type SelectTool = 'pointer' | 'group' | 'union' | 'intersect';

export function createSelectionGroup(container: CanvasContainer) {
	/** Consts. */

	/** Konva. */
	let group: Konva.Group = new Konva.Group();

	/** Runes. */
	let selectTool: SelectTool = $state('pointer');

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
