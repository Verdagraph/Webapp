import "./auth.svelte.js";
const permissions = Object.freeze({
  /** Gardens. */
  MembershipCreate: "ADMIN",
  MembershipRevoke: "ADMIN",
  MembershipRoleChange: "ADMIN",
  /** Workspaces. */
  WorkspaceCreate: "ADMIN",
  WorkspaceUpdate: "ADMIN",
  WorkspaceEdit: "EDITOR",
  PlantingAreaCreate: "EDITOR"
});
function requiredRole(action) {
  return permissions[action];
}
export {
  requiredRole as r
};
