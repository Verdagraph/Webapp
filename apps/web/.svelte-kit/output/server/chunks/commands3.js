import { U as UserRequestPasswordResetCommandSchema, f as UserConfirmPasswordResetCommandSchema, h as UserCreateCommandSchema, i as UserRequestEmailConfirmationCommandSchema, j as userRequestPasswordResetOp, k as userConfirmPasswordResetOp, l as userCreateOp, m as userRequestEmailConfirmationOp, n as userConfirmEmailOp } from "./auth.svelte.js";
const userCreate = {
  schema: UserCreateCommandSchema,
  mutation: userCreateOp
};
const userRequestEmailConfirmation = {
  schema: UserRequestEmailConfirmationCommandSchema,
  mutation: userRequestEmailConfirmationOp
};
const userConfirmEmailConfirmation = {
  mutation: userConfirmEmailOp
};
const userRequestPasswordReset = {
  schema: UserRequestPasswordResetCommandSchema,
  mutation: userRequestPasswordResetOp
};
const userConfirmPasswordReset = {
  schema: UserConfirmPasswordResetCommandSchema,
  mutation: userConfirmPasswordResetOp
};
export {
  userConfirmPasswordReset as a,
  userCreate as b,
  userRequestEmailConfirmation as c,
  userConfirmEmailConfirmation as d,
  userRequestPasswordReset as u
};
