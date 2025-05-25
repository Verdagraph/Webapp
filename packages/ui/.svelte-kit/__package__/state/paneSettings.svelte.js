import { Resizable } from '../core';
import { localStore } from './localStore.svelte';
export function createPaneSettings(id, initialEnabled, initialDirection) {
    const settings = localStore(id, {
        enabled: new Set(initialEnabled),
        direction: initialDirection
    });
    function isEnabled(pane) {
        return settings.value.enabled.has(pane);
    }
    function enable(pane) {
        if (!settings.value.enabled.has(pane)) {
            settings.value.enabled.add(pane);
        }
    }
    function disable(pane) {
        if (settings.value.enabled.has(pane) && settings.value.enabled.size > 1) {
            settings.value.enabled.delete(pane);
        }
    }
    function reset() {
        settings.value.enabled.clear();
        initialEnabled.forEach((pane) => {
            settings.value.enabled.add(pane);
        });
    }
    return {
        get direction() {
            return settings.value.direction;
        },
        isEnabled,
        enable,
        disable,
        reset
    };
}
