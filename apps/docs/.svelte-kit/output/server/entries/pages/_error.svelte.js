import { G as escape_html, D as pop, A as push } from "../../chunks/index.js";
import "clsx";
import { p as page } from "../../chunks/index4.js";
function _error($$payload, $$props) {
  push();
  $$payload.out += `<div class="mt-24 text-center"><h1 class="text-2xl">${escape_html(page.status)}: ${escape_html(page.error?.message)}</h1></div>`;
  pop();
}
export {
  _error as default
};
