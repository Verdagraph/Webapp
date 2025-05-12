import { t as triplit } from "./auth.svelte.js";
triplit.query("profiles").Where("id", "in", "$query.profileIds");
const userProfilesUsernameQuery = triplit.query("profiles").Where("username", "in", "$query.usernames");
export {
  userProfilesUsernameQuery as u
};
