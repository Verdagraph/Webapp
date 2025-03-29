import { GardenRole } from '@vdg-webapp/common';
import { ActionType, requiredRole as getRequiredRole } from '$lib/permissions';

let id: string | null = $state(null);
let role: GardenRole | null = $state(null);

/**
 * Returns whether the user can take an action on the active garden.
 * @param action The action to check.
 * @returns If true, the user is authorized.
 */
function authorize(action: ActionType): boolean {
	/** False for a null garden or user role. */
	if (id === null || role === null) {
		return false;
	}

	const requiredRole = getRequiredRole(action);
	if (requiredRole === 'ADMIN' && role === 'ADMIN') {
		return true;
	} else if (requiredRole === 'EDITOR' && (role === 'ADMIN' || role === 'EDITOR')) {
		return true;
	} else if (
		requiredRole === 'VIEWER' &&
		(role === 'ADMIN' || role === 'EDITOR' || role === 'VIEWER')
	) {
		return true;
	} else {
		return false;
	}
}

export const gardenContext = {
	/* Getters. */
	get id() {
		return id;
	},
	get role() {
		return role;
	},

	/* Setters. */
	set id(newVal) {
		id = newVal;
	},
	set role(newVal) {
		role = newVal;
	},
	authorize
};
export default gardenContext;
