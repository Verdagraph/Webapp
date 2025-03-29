import { type GardenRole } from '@vdg-webapp/common';

/**
 * This file is a centralized location for mapping application actions to a required Garden role.
 */
const permissions = Object.freeze({
	/** Gardens. */
	MembershipCreate: 'ADMIN',
	MembershipRevoke: 'ADMIN',
	MembershipRoleChange: 'ADMIN',

	/** Workspaces. */
	WorkspaceCreate: 'ADMIN',
	WorkspaceUpdate: 'ADMIN',
	WorkspaceEdit: 'EDITOR',
	PlantingAreaCreate: 'EDITOR'
} satisfies Record<string, GardenRole>);
export type ActionType = keyof typeof permissions;

/**
 * Retrieves the required role of an action.
 * @param action The action to retrieve the required role for.
 * @returns The required role.
 */
export function requiredRole(action: ActionType): GardenRole {
	return permissions[action];
}
