import { t as triplit } from "./auth.svelte.js";
const gardenQuery = triplit.query("gardens").Id("$query.id");
triplit.query("gardens").Where("adminIds", "has", "$session.profileId");
triplit.query("gardens").Where("editorIds", "has", "$session.profileId");
triplit.query("gardens").Where(["viewerIds", "has", "$session.profileId"]);
triplit.query("gardenMemberships").Where("gardenId", "=", "$query.gardenId").Where("userId", "=", "$query.userId");
triplit.query("gardenMemberships").Where("favorite", "=", true).Where(["userId", "=", "$session.profileId"]).Include("garden");
triplit.query("gardenMemberships").Where("status", "!=", "ACCEPTED").Where(["userId", "=", "$session.profileId"]).Include("garden");
export {
  gardenQuery as g
};
