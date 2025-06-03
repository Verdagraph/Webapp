import { _ as __variableDynamicImportRuntimeHelper } from "../../../../chunks/dynamic-import-helper.js";
import { e as error } from "../../../../chunks/index2.js";
async function load({ params }) {
  try {
    const page = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../../../docs/concepts.svx": () => import("../../../../chunks/concepts.js").then((n) => n._), "../../../docs/cultivar-config.svx": () => import("../../../../chunks/cultivar-config.js").then((n) => n._), "../../../docs/faq.svx": () => import("../../../../chunks/faq.js").then((n) => n._), "../../../docs/first-plan.svx": () => import("../../../../chunks/first-plan.js").then((n) => n._), "../../../docs/garden-management.svx": () => import("../../../../chunks/garden-management.js").then((n) => n._), "../../../docs/garden-setup.svx": () => import("../../../../chunks/garden-setup.js").then((n) => n._), "../../../docs/introduction.svx": () => import("../../../../chunks/introduction.js").then((n) => n._), "../../../docs/self-hosting.svx": () => import("../../../../chunks/self-hosting.js").then((n) => n._), "../../../docs/workspace-environment-config.svx": () => import("../../../../chunks/workspace-environment-config.js").then((n) => n._) }), `../../../docs/${params.slug}.svx`, 5);
    return {
      content: page.default,
      meta: page.metadata
    };
  } catch (e) {
    error(404, `The documentation article "${params.slug}" could not be found.`);
  }
}
export {
  load
};
