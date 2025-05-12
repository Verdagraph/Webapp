import { g as goto } from "../../../../chunks/client.js";
import { g as gardenQuery } from "../../../../chunks/queries.js";
import { g as getClient, t as triplit, A as AppError } from "../../../../chunks/auth.svelte.js";
import { g as gardenContext } from "../../../../chunks/gardenContext.svelte.js";
async function load({ params }) {
  const client = await getClient();
  const garden = await triplit.fetchOne(gardenQuery.Vars({ id: params.gardenId }));
  if (!garden) {
    goto();
    throw new AppError(`Garden ${params.gardenId} does not exist`);
  }
  if (gardenContext.id != garden.id) {
    gardenContext.id = garden.id;
    if (client === null) {
      gardenContext.role = null;
    } else if (garden.adminIds.has(client.profile.id)) {
      gardenContext.role = "ADMIN";
    } else if (garden.editorIds.has(client.profile.id)) {
      gardenContext.role = "EDITOR";
    } else if (garden.viewerIds.has(client.profile.id)) {
      gardenContext.role = "VIEWER";
    } else {
      gardenContext.role = null;
    }
  }
}
export {
  load
};
