import { h as head, m as ensure_array_like, n as escape_html, a as pop, p as push } from "../../../../../chunks/index2.js";
import { I as Icon } from "../../../../../chunks/Icon.js";
import { g as goto } from "../../../../../chunks/client.js";
import { p as page } from "../../../../../chunks/index5.js";
import { d as userConfirmEmailConfirmation } from "../../../../../chunks/commands3.js";
import { c as createCommandHandler } from "../../../../../chunks/commandHandler.svelte.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../../../../chunks/card.js";
import { C as Card_description } from "../../../../../chunks/card-description.js";
import { i as iconIds } from "../../../../../chunks/icons.js";
function _page($$payload, $$props) {
  push();
  const confirmationToken = page.params.confirmationToken;
  let formHandler = createCommandHandler(userConfirmEmailConfirmation.mutation, {
    onSuccess: () => {
      goto();
    }
  });
  formHandler.execute({ token: confirmationToken });
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Email Confirmed - Verdagraph</title>`;
  });
  Card($$payload, {
    class: "m-auto mt-12 w-3/4 md:w-1/2 lg:w-1/3",
    children: ($$payload2) => {
      if (formHandler.isLoading) {
        $$payload2.out += "<!--[-->";
        Card_header($$payload2, {
          children: ($$payload3) => {
            Card_title($$payload3, {
              children: ($$payload4) => {
                $$payload4.out += `<!---->Confirming your email `;
                Icon($$payload4, {
                  icon: iconIds.defaultSpinnerIcon,
                  width: "1.5rem",
                  class: "inline animate-spin"
                });
                $$payload4.out += `<!---->`;
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
      } else if (formHandler.isError) {
        $$payload2.out += "<!--[1-->";
        Card_header($$payload2, {
          children: ($$payload3) => {
            Card_title($$payload3, {
              children: ($$payload4) => {
                $$payload4.out += `<!---->Something went wrong...`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!----> `;
            Card_content($$payload3, {
              class: "text-md text-warning-11 w-full px-0 pb-0 pt-4 font-medium",
              children: ($$payload4) => {
                const each_array = ensure_array_like(formHandler.fieldErrors?.token ?? []);
                $$payload4.out += `<ul><!--[-->`;
                for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                  let error = each_array[$$index];
                  $$payload4.out += `<li class="border-warning-7 bg-warning-3 border-x p-1 first:rounded-t-md first:border-t last:rounded-b-md last:border-b">${escape_html(error)}</li>`;
                }
                $$payload4.out += `<!--]--></ul>`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          },
          $$slots: { default: true }
        });
      } else if (formHandler.isSuccess) {
        $$payload2.out += "<!--[2-->";
        Card_header($$payload2, {
          children: ($$payload3) => {
            Card_title($$payload3, {
              children: ($$payload4) => {
                $$payload4.out += `<!---->Confirmed!`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!----> `;
            Card_description($$payload3, {
              children: ($$payload4) => {
                $$payload4.out += `<!---->Redirecting to the login page.`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          },
          $$slots: { default: true }
        });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    },
    $$slots: { default: true }
  });
  pop();
}
export {
  _page as default
};
