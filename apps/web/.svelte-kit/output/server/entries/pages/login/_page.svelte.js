import { e as copy_payload, f as assign_payload, a as pop, p as push, g as spread_props, x as store_mutate, v as store_get, w as unsubscribe_stores, t as head } from "../../../chunks/index2.js";
import { g as goto } from "../../../chunks/client.js";
import { u as userLogin, d as userFields } from "../../../chunks/auth.svelte.js";
import { c as createCommandHandler } from "../../../chunks/commandHandler.svelte.js";
import "clsx";
import { s as superForm, z as zod, d as defaults, F as Form_field, C as Control, a as Form_field_errors, b as Form_label, I as Input, c as Form_button } from "../../../chunks/zod.js";
import "../../../chunks/stringify.js";
import { F as Form_non_field_errors } from "../../../chunks/form-non-field-errors.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../../chunks/card.js";
import { C as Card_description } from "../../../chunks/card-description.js";
import { B as Button } from "../../../chunks/button2.js";
function LoginForm($$payload, $$props) {
  push();
  var $$store_subs;
  let formHandler = createCommandHandler(userLogin.mutation, {
    onSuccess: () => {
      goto();
    }
  });
  const form = superForm(defaults(zod(userLogin.schema)), {
    SPA: true,
    resetForm: false,
    validators: zod(userLogin.schema),
    onUpdate({ form: form2 }) {
      if (form2.valid) {
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
    $$payload2.out += `<form method="POST">`;
    Form_field($$payload2, {
      form,
      name: "email",
      children: ($$payload3) => {
        {
          let children = function($$payload4, { props }) {
            Form_label($$payload4, {
              description: userFields.emailSchema.description,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Email`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
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
        $$payload3.out += `<!----> `;
        Form_field_errors($$payload3, { handlerErrors: formHandler.fieldErrors?.email });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    Form_field($$payload2, {
      form,
      name: "password",
      children: ($$payload3) => {
        {
          let children = function($$payload4, { props }) {
            Form_label($$payload4, {
              description: userFields.passwordSchema.description,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Password`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Input($$payload4, spread_props([
              props,
              {
                type: "password",
                get value() {
                  return store_get($$store_subs ??= {}, "$formData", formData).password;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).password = $$value);
                  $$settled = false;
                }
              }
            ]));
            $$payload4.out += `<!---->`;
          };
          Control($$payload3, { children });
        }
        $$payload3.out += `<!----> `;
        Form_field_errors($$payload3, {
          handlerErrors: formHandler.fieldErrors?.password
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    Form_non_field_errors($$payload2, { handlerErrors: formHandler.nonFieldErrors });
    $$payload2.out += `<!----> `;
    Form_button($$payload2, {
      disabled: false,
      loading: formHandler.isLoading,
      variant: "default",
      class: "mt-2 w-full",
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
  pop();
}
function _page($$payload, $$props) {
  push();
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Login - Verdagraph</title>`;
  });
  Card($$payload, {
    class: "m-auto mt-12 w-3/4 md:w-1/2 lg:w-1/3",
    children: ($$payload2) => {
      Card_header($$payload2, {
        children: ($$payload3) => {
          Card_title($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->Login`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Card_description($$payload3, {
            children: ($$payload4) => {
              Button($$payload4, {
                variant: "link",
                class: "text-neutral-11 p-0",
                href: "/login/request-password-reset",
                children: ($$payload5) => {
                  $$payload5.out += `<!---->Forgot your password?`;
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Card_content($$payload2, {
        children: ($$payload3) => {
          LoginForm($$payload3);
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  pop();
}
export {
  _page as default
};
