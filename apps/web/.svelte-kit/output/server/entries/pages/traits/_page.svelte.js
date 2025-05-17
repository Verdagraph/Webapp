import { h as head } from "../../../chunks/index2.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../../chunks/card.js";
import { C as Card_description } from "../../../chunks/card-description.js";
import { S as Separator } from "../../../chunks/separator.js";
function _page($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Traits - Verdagraph</title>`;
  });
  $$payload.out += `<div class="m-auto mt-12 flex w-3/4 flex-col items-center"><h1 class="text-4xl">Traits</h1> <p>Verdagraph's flexible system for specifying model behavior and sharing data amongst
		gardens and users.</p></div> `;
  Card($$payload, {
    class: "m-auto mt-12 w-3/4 md:w-1/2 lg:w-1/3",
    children: ($$payload2) => {
      Card_header($$payload2, {
        class: "m-auto flex flex-col items-center",
        children: ($$payload3) => {
          Card_title($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->Cultivars`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Card_description($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->Describes the behavior of plant species.`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Separator($$payload3, { class: "bg-neutral-7" });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Card_content($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<div>Public Data - discover button</div> <div>Your Data</div> `;
          Separator($$payload3, { class: "bg-neutral-7" });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
}
export {
  _page as default
};
