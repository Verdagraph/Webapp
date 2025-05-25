import { LocalStore } from '@vdg-webapp/ui';
import { setContext, getContext } from 'svelte';
const SETTINGS_CONTEXT_ID = 'userSettingsContext';
function createSettingsContext() {
    const units = new LocalStore('unitSettings', {
        distance: 'metric',
        temperature: 'metric',
        mass: 'metric',
        volume: 'metric'
    });
    return {
        get units() {
            return units.value;
        },
        set units(newVal) {
            units.value = newVal;
        }
    };
}
export function setSettingsContext() {
    return setContext(SETTINGS_CONTEXT_ID, createSettingsContext());
}
export function getSettingsContext() {
    return getContext(SETTINGS_CONTEXT_ID);
}
