import { m as escape_html, a as pop, p as push } from "../../chunks/index2.js";
import "clsx";
import { p as page } from "../../chunks/index5.js";
function Error($$payload, $$props) {
  push();
  $$payload.out += `<h1>${escape_html(page.status)}</h1> <p>${escape_html(page.error?.message)}</p>`;
  pop();
}
export {
  Error as default
};
