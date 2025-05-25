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
});
/**
 * Retrieves the required role of an action.
 * @param action The action to retrieve the required role for.
 * @returns The required role.
 */
export function requiredRole(action) {
    return permissions[action];
}
//# sourceMappingURL=permissions.js.map