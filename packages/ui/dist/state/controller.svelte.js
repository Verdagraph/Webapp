import { getContext } from 'svelte';
import { CONTROLLER_CONTEXT_ID } from '@vdg-webapp/models';
/**
 * Retrieves the controller context.
 */
export function getControllerContext() {
    return getContext(CONTROLLER_CONTEXT_ID);
}
