import { C as setContext, F as head, D as pop, A as push } from "../../../../chunks/index.js";
import { TriplitClient } from "@triplit/client";
import { p as plantSchema, d as demos, r as roles, c as createController, s as setSettingsContext, C as CONTROLLER_CONTEXT_ID, u as user } from "../../../../chunks/demos.js";
import { g as goto } from "../../../../chunks/client.js";
import { p as page } from "../../../../chunks/index4.js";
const schema = plantSchema;
function _page($$payload, $$props) {
  push();
  const demo = demos.find((demo2) => demo2.id === page.params.demoId);
  if (!demo) {
    console.error("This demo does not exist.");
    goto();
  }
  const triplit = new TriplitClient({ schema, roles, autoConnect: false });
  async function getClient() {
    return { account: user.account, profile: user.profile };
  }
  const controller = createController(triplit, getClient, true);
  setContext(CONTROLLER_CONTEXT_ID, controller);
  setSettingsContext();
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Demo - Verdagraph</title>`;
  });
  if (demo) {
    $$payload.out += "<!--[-->";
    demo.component($$payload, {});
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _page as default
};
