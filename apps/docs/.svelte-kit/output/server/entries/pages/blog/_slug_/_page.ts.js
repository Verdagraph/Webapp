import { _ as __variableDynamicImportRuntimeHelper } from "../../../../chunks/dynamic-import-helper.js";
import { e as error } from "../../../../chunks/index2.js";
async function load({ params }) {
  try {
    const page = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({}), `../../../blog/${params.slug}.svx`, 5);
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
