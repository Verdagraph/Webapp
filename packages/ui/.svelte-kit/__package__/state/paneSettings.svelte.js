import { Resizable } from '../core';
import { localStore } from './localStore.svelte';
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
            settings.value.enabled = settings.value.enabled.filter(item => item !== pane);
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
        isEnabled,
        enable,
        disable,
        reset
    };
}
