import { Resizable } from '../core';
import { localStore } from './localStore.svelte';
/**
 * Stores context for a set of resizable panes:
 * Which panes are enabled.
 * Their direction.
 *
 * @param id The ID to use for local storage.
 * @param initialEnabled The panes that are initially enabled.
 * @param initialDirection The initial direction of the panes.
 * @returns The pane settings.
 */
export function createPaneSettings(id, initialEnabled, initialDirection) {
    const settings = localStore(id, {
        enabled: initialEnabled,
        direction: initialDirection
    });
    function isEnabled(pane) {
        return settings.value.enabled.includes(pane);
    }
    function enable(pane) {
        if (!settings.value.enabled.includes(pane)) {
            settings.value.enabled.push(pane);
        }
    }
    function disable(pane) {
        if (settings.value.enabled.includes(pane) && settings.value.enabled.length > 1) {
            settings.value.enabled = settings.value.enabled.filter((item) => item !== pane);
        }
    }
    function reset() {
        settings.value.enabled = [];
        initialEnabled.forEach((pane) => {
            settings.value.enabled.push(pane);
        });
    }
    return {
        get direction() {
            return settings.value.direction;
        },
        set direction(newVal) {
            settings.value.direction = newVal;
        },
        isEnabled,
        enable,
        disable,
        reset
    };
}
