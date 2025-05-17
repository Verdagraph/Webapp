import { p as push, e as copy_payload, f as assign_payload, d as bind_props, a as pop, g as spread_props, x as store_mutate, v as store_get, w as unsubscribe_stores, h as head, n as escape_html } from "../../../../chunks/index2.js";
import "../../../../chunks/client.js";
import "clsx";
import { s as superForm, z as zod, d as defaults, F as Form_field, C as Control, a as Form_field_errors, b as Form_label, I as Input, c as Form_button } from "../../../../chunks/zod.js";
import "../../../../chunks/stringify.js";
import { d as userFields } from "../../../../chunks/auth.svelte.js";
import { c as userRequestEmailConfirmation } from "../../../../chunks/commands3.js";
import { c as createCommandHandler } from "../../../../chunks/commandHandler.svelte.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../../../chunks/card.js";
import { R as Root, D as Dialog_content, a as Dialog_header, b as Dialog_title, c as Dialog_description } from "../../../../chunks/index8.js";
import { B as Button } from "../../../../chunks/button2.js";
import { e as externalLinks } from "../../../../chunks/links.js";
function RequestEmailConfirmationForm($$payload, $$props) {
  push();
  var $$store_subs;
  let { succeeded = false, registeredEmail = "" } = $$props;
  let formHandler = createCommandHandler(userRequestEmailConfirmation.mutation, {
    onSuccess: () => {
      succeeded = true;
    }
  });
  const form = superForm(defaults(zod(userRequestEmailConfirmation.schema)), {
    SPA: true,
    validators: zod(userRequestEmailConfirmation.schema),
    onUpdate({ form: form2 }) {
      if (form2.valid) {
        registeredEmail = form2.data.email;
        formHandler.execute(form2.data);
      }
    },
    onChange() {
      formHandler.reset();
    }
  });
  const { form: formData, enhance } = form;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<form method="POST" autocomplete="off"><!---->`;
    Form_field($$payload2, {
      form,
      name: "email",
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        {
          let children = function($$payload4, { props }) {
            $$payload4.out += `<!---->`;
            Form_label($$payload4, {
              description: userFields.emailSchema.description,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Email`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <!---->`;
            Input($$payload4, spread_props([
              props,
              {
                type: "email",
                placeholder: "email@example.com",
                get value() {
                  return store_get($$store_subs ??= {}, "$formData", formData).email;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).email = $$value);
                  $$settled = false;
                }
              }
            ]));
            $$payload4.out += `<!---->`;
          };
          Control($$payload3, { children });
        }
        $$payload3.out += `<!----> <!---->`;
        Form_field_errors($$payload3, { handlerErrors: formHandler.fieldErrors?.email });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <!---->`;
    Form_button($$payload2, {
      disabled: false,
      loading: formHandler.isLoading,
      variant: "default",
      class: "mt-4 w-full",
      children: ($$payload3) => {
        $$payload3.out += `<!---->Submit`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></form>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { succeeded, registeredEmail });
  pop();
}
function _page($$payload, $$props) {
  push();
  let succeeded = false;
  let registeredEmail = "";
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>Verify Email - Verdagraph</title>`;
    });
    $$payload2.out += `<!---->`;
    Card($$payload2, {
      class: "m-auto mt-12 w-3/4 md:w-1/2 lg:w-1/3",
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        Card_header($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->`;
            Card_title($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Request an email confirmation`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <!---->`;
        Card_content($$payload3, {
          children: ($$payload4) => {
            RequestEmailConfirmationForm($$payload4, {
              get succeeded() {
                return succeeded;
              },
              set succeeded($$value) {
                succeeded = $$value;
                $$settled = false;
              },
              get registeredEmail() {
                return registeredEmail;
              },
              set registeredEmail($$value) {
                registeredEmail = $$value;
                $$settled = false;
              }
            });
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <!---->`;
        Root($$payload3, {
          open: succeeded,
          onOpenChange: (open) => {
            if (!open) {
              succeeded = false;
            }
          },
          children: ($$payload4) => {
            $$payload4.out += `<!---->`;
            Dialog_content($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->`;
                Dialog_header($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Dialog_title($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->An email confirmation has been sent to ${escape_html(registeredEmail)}`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Dialog_description($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->If the email remains unsent, <!---->`;
                        Button($$payload7, {
                          variant: "link",
                          class: "text-neutral-11 inline p-0",
                          href: externalLinks.discord,
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->try reaching out to our community.`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!---->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
export {
  _page as default
};
