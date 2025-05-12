import { t as triplit } from "./auth.svelte.js";
triplit.query("workspaces").Id("$query.id");
const workspaceSlugQuery = triplit.query("workspaces").Where([
  ["gardenId", "=", "$query.gardenId"],
  ["slug", "=", "$query.workspaceSlug"]
]);
const workspacesQuery = triplit.query("workspaces").Where(["gardenId", "=", "$query.gardenId"]);
const plantingAreaIdsQuery = triplit.query("plantingAreas").Where(["locationHistory.workspaceIds", "has", "$query.workspaceId"]).Select(["id"]);
const plantingAreaQuery = triplit.query("plantingAreas").Id("$query.plantingAreaId").Include("geometry", (rel) => rel("geometry").Include("linesCoordinates")).Include("locationHistory", (rel) => rel("locationHistory").Include("locations")).Limit(1);
const plantingAreasQuery = triplit.query("plantingAreas").Where("id", "in", "$query.ids").Include("geometry", (rel) => rel("geometry").Include("linesCoordinates")).Include("locationHistory", (rel) => rel("locationHistory").Include("locations"));
const plantingAreaSelectionQuery = triplit.query("plantingAreas").Where("id", "in", "$query.plantingAreaIds").Select(["id", "name"]);
export {
  plantingAreaQuery as a,
  plantingAreasQuery as b,
  plantingAreaIdsQuery as c,
  workspaceSlugQuery as d,
  plantingAreaSelectionQuery as p,
  workspacesQuery as w
};
