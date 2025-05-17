import { h as head, a as pop, p as push } from "../../../chunks/index2.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { g as goto } from "../../../chunks/client.js";
import "../../../chunks/queries.js";
import { a as auth } from "../../../chunks/auth.svelte.js";
import "../../../chunks/queries3.js";
import "clsx";
import { B as Button } from "../../../chunks/button2.js";
import { R as Root, T as Trigger, d as Popover_content } from "../../../chunks/index3.js";
import { i as iconIds } from "../../../chunks/icons.js";
function _page($$payload, $$props) {
  push();
  if (!auth.isAuthenticated) {
    goto();
  }
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Gardens - Verdagraph</title>`;
  });
  $$payload.out += `<div class="border-neutral-5 bg-neutral-1 sticky top-0 z-50 flex h-10 w-full flex-row items-center justify-between overflow-hidden border-b"><span class="ml-8">Gardens</span> <ul class="flex h-full flex-row items-center"><li class="h-full">`;
  Button($$payload, {
    variant: "ghost",
    href: "gardens/discover",
    class: "rounded-none",
    children: ($$payload2) => {
      Icon($$payload2, {
        icon: iconIds.gardensDiscoverIcon,
        width: "1.5rem",
        class: "mx-2"
      });
      $$payload2.out += `<!----> <span class="mx-2 hidden sm:block">Discovery</span>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></li> <li class="h-full">`;
  Root($$payload, {
    children: ($$payload2) => {
      Trigger($$payload2, {
        children: ($$payload3) => {
          Button($$payload3, {
            variant: "ghost",
            class: "rounded-none",
            children: ($$payload4) => {
              Icon($$payload4, {
                icon: iconIds.gardensInviteIcon,
                width: "1.5rem",
                class: "mx-2"
              });
              $$payload4.out += `<!----> <span class="mx-2 hidden sm:block">Invites</span> <div class="border-neutral-9 h-6 w-6 rounded-2xl border">`;
              {
                $$payload4.out += "<!--[-->";
                $$payload4.out += `?`;
              }
              $$payload4.out += `<!--]--></div>`;
            },
            $$slots: { default: true }
          });
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Popover_content($$payload2, {
        children: ($$payload3) => {
          {
            $$payload3.out += "<!--[-->";
            Icon($$payload3, {
              icon: iconIds.defaultSpinnerIcon,
              width: "1.5rem",
              class: "animate-spin"
            });
          }
          $$payload3.out += `<!--]-->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></li> <li class="h-full">`;
  Button($$payload, {
    variant: "default",
    href: "gardens/create",
    class: "rounded-none",
    children: ($$payload2) => {
      Icon($$payload2, {
        icon: iconIds.gardensCreateIcon,
        width: "1.5rem",
        class: "mx-2"
      });
      $$payload2.out += `<!----> <span class="mx-2 hidden sm:block">Create</span>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></li></ul></div>  <div class="bg-neutral-1 h-full w-full p-8">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `Loading...`;
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `Loading...`;
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `Loading...`;
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `Loading...`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
export {
  _page as default
};
