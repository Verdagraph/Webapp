import { mode } from 'mode-watcher';
import { getContext, setContext } from 'svelte';
import { createCanvasContext } from '..';
import { createTimelineSelection } from '..';
import { createPaneSettings, isMobile } from '../../state';
const verdagraphContextId = 'verdagraphEditorContext';
const verdagraphLayoutCanvasContextId = 'verdagraphLayoutCanvas';
/**
 * TODO: Disable the tree by default on small devices.
 * Once the Layout has achieved feature parity with the Tree,
 * including editing the geometry of plantings, this may be done.
 */
const defaultTreeEnabled = isMobile() ? true : true;
/** Organize content panes vertically on narrow screens. */
const defaultContentPaneDirection = isMobile() ? 'vertical' : 'horizontal';
/**
 * Holds context for the verdagraph.
 */
function createVerdagraphContext() {
    const paneSettings = createPaneSettings('verdagraphPaneSettings', defaultTreeEnabled ? ['tree', 'calendar', 'layout'] : ['calendar', 'layout'], defaultContentPaneDirection);
    /** Timeline. */
    const timeline = createTimelineSelection();
    /** Canvas context. */
    setContext(verdagraphLayoutCanvasContextId, createCanvasContext(verdagraphLayoutCanvasContextId, 'id', mode));
    return {
        /* Getters. */
        get layoutCanvasContext() {
            return getContext(verdagraphLayoutCanvasContextId);
        },
        /** Setters. */
        paneSettings,
        timeline
    };
}
export function setVerdagraphContext() {
    return setContext(verdagraphContextId, createVerdagraphContext());
}
export function getVerdagraphContext() {
    return getContext(verdagraphContextId);
}
