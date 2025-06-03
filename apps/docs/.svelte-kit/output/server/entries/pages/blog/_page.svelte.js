import { F as head } from "../../../chunks/index.js";
import { N as Nav } from "../../../chunks/Nav.js";
function _page($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Blog - Verdagraph</title>`;
  });
  $$payload.out += `<div class="flex w-full flex-col">`;
  Nav($$payload);
  $$payload.out += `<!----> To be completed</div>`;
}
export {
  _page as default
};
