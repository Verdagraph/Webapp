import { getContext, setContext } from 'svelte';
import { Resizable, } from '../../core';
import { createTimelineSelection } from '..';
import { isMobile, localStore } from '../../state';
const verdagraphContextId = 'verdagraphEditorContext';
// const verdagraphLayoutCanvasContextId = 'verdagraphLayoutCanvas';
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
    /** Timeline. */
    const timeline = createTimelineSelection();
    /** Persisted config. */
    const config = localStore('verdagraphConfig', {
        treeEnabled: defaultTreeEnabled,
        calendarEnabled: true,
        layoutEnabled: true,
        contentPaneDirection: defaultContentPaneDirection
    });
    return {
        /* Getters. */
        get treeEnabled() {
            return config.value.treeEnabled;
        },
        get calendarEnabled() {
            return config.value.calendarEnabled;
        },
        get layoutEnabled() {
            return config.value.layoutEnabled;
        },
        get contentPaneDirection() {
            return config.value.contentPaneDirection;
        },
        /** Setters. */
        set treeEnabled(newVal) {
            /* Only allow disabling the content if other content is enabled. */
            if (newVal == false &&
                config.value.layoutEnabled == false &&
                config.value.calendarEnabled == false) {
                return;
            }
            config.value.treeEnabled = newVal;
        },
        set calendarEnabled(newVal) {
            /* Only allow disabling the content if other content is enabled. */
            if (newVal == false &&
                config.value.treeEnabled == false &&
                config.value.layoutEnabled == false) {
                return;
            }
            config.value.calendarEnabled = newVal;
        },
        set layoutEnabled(newVal) {
            /* Only allow disabling the content if other content is enabled. */
            if (newVal == false &&
                config.value.treeEnabled == false &&
                config.value.calendarEnabled == false) {
                return;
            }
            config.value.layoutEnabled = newVal;
        },
        set contentPaneDirection(newVal) {
            config.value.contentPaneDirection = newVal;
        },
        timeline
    };
}
export function setVerdagraphContext() {
    return setContext(verdagraphContextId, createVerdagraphContext());
}
export function getVerdagraphContext() {
    return getContext(verdagraphContextId);
}
