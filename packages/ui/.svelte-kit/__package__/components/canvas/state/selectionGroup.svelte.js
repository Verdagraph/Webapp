import Konva from 'konva';
import {} from './container.svelte';
export function createSelectionGroup(container) {
    /** Consts. */
    /** Konva. */
    // eslint-disable-next-line
    const group = new Konva.Group();
    /** Runes. */
    const selectTool = $state('pointer');
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
