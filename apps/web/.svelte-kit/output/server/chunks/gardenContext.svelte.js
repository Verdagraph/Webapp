import "clsx";
import "./auth.svelte.js";
import { r as requiredRole } from "./permissions.js";
let id = null;
let role = null;
function authorize(action) {
  if (id === null || role === null) {
    return false;
  }
  const requiredRole$1 = requiredRole(action);
  if (requiredRole$1 === "ADMIN" && role === "ADMIN") {
    return true;
  } else if (requiredRole$1 === "EDITOR" && (role === "ADMIN" || role === "EDITOR")) {
    return true;
  } else if (requiredRole$1 === "VIEWER" && (role === "ADMIN" || role === "EDITOR" || role === "VIEWER")) {
    return true;
  } else {
    return false;
  }
}
const gardenContext = {
  get id() {
    return id;
  },
  get role() {
    return role;
  },
  set id(newVal) {
    id = newVal;
  },
  set role(newVal) {
    role = newVal;
  },
  authorize
};
export {
  gardenContext as g
};
