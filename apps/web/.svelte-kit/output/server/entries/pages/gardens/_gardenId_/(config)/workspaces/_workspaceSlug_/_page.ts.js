import { t as triplit, A as AppError } from "../../../../../../../chunks/auth.svelte.js";
import { g as goto } from "../../../../../../../chunks/client.js";
import { d as workspaceSlugQuery } from "../../../../../../../chunks/queries2.js";
async function load({ params }) {
  const workspace = await triplit.fetchOne(
    workspaceSlugQuery.Vars({
      gardenId: params.gardenId,
      workspaceSlug: params.workspaceSlug
    })
  );
  if (!workspace) {
    goto(`/gardens/${params.gardenId}/workspaces`);
    throw new AppError(`Workspace ${params.workspaceSlug} does not exist`);
  }
  return { workspace };
}
export {
  load
};
