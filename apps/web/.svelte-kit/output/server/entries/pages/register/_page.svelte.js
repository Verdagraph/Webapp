import { p as push, e as copy_payload, f as assign_payload, d as bind_props, a as pop, g as spread_props, x as store_mutate, v as store_get, w as unsubscribe_stores, t as head, m as escape_html } from "../../../chunks/index2.js";
import { b as userCreate } from "../../../chunks/commands3.js";
import { c as createCommandHandler } from "../../../chunks/commandHandler.svelte.js";
import "../../../chunks/client.js";
import "clsx";
import { s as superForm, z as zod, d as defaults, F as Form_field, C as Control, a as Form_field_errors, b as Form_label, I as Input, c as Form_button } from "../../../chunks/zod.js";
import "../../../chunks/stringify.js";
import { d as userFields } from "../../../chunks/auth.svelte.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../../chunks/card.js";
import { C as Card_description } from "../../../chunks/card-description.js";
import { B as Button } from "../../../chunks/button2.js";
import { R as Root, D as Dialog_content, a as Dialog_header, b as Dialog_title, c as Dialog_description } from "../../../chunks/index8.js";
function RegistrationForm($$payload, $$props) {
  push();
  var $$store_subs;
  let { succeeded = false, registeredEmail = "" } = $$props;
  let formHandler = createCommandHandler(userCreate.mutation, {
    onSuccess: () => {
      succeeded = true;
    }
  });
  const form = superForm(defaults(zod(userCreate.schema)), {
    SPA: true,
    validators: zod(userCreate.schema),
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
      name: "username",
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        {
          let children = function($$payload4, { props }) {
            $$payload4.out += `<!---->`;
            Form_label($$payload4, {
              description: userFields.usernameSchema.description,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Username`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <!---->`;
            Input($$payload4, spread_props([
              props,
              {
                type: "text",
                placeholder: "username",
                get value() {
                  return store_get($$store_subs ??= {}, "$formData", formData).username;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).username = $$value);
                  $$settled = false;
                }
              }
            ]));
            $$payload4.out += `<!---->`;
          };
          Control($$payload3, { children });
        }
        $$payload3.out += `<!----> <!---->`;
        Form_field_errors($$payload3, {
          handlerErrors: formHandler.fieldErrors?.username
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <!---->`;
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
    Form_field($$payload2, {
      form,
      name: "password1",
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        {
          let children = function($$payload4, { props }) {
            $$payload4.out += `<!---->`;
            Form_label($$payload4, {
              description: userFields.passwordSchema.description,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Password`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <!---->`;
            Input($$payload4, spread_props([
              props,
              {
                type: "password",
                get value() {
                  return store_get($$store_subs ??= {}, "$formData", formData).password1;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).password1 = $$value);
                  $$settled = false;
                }
              }
            ]));
            $$payload4.out += `<!---->`;
          };
          Control($$payload3, { children });
        }
        $$payload3.out += `<!----> <!---->`;
        Form_field_errors($$payload3, {
          handlerErrors: formHandler.fieldErrors?.password1
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <!---->`;
    Form_field($$payload2, {
      form,
      name: "password2",
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        {
          let children = function($$payload4, { props }) {
            $$payload4.out += `<!---->`;
            Form_label($$payload4, {
              description: userFields.passwordSchema.description,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Confirm Password`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <!---->`;
            Input($$payload4, spread_props([
              props,
              {
                type: "password",
                get value() {
                  return store_get($$store_subs ??= {}, "$formData", formData).password2;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).password2 = $$value);
                  $$settled = false;
                }
              }
            ]));
            $$payload4.out += `<!---->`;
          };
          Control($$payload3, { children });
        }
        $$payload3.out += `<!----> <!---->`;
        Form_field_errors($$payload3, {
          handlerErrors: formHandler.fieldErrors?.password2
        });
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
function _page($$payload) {
  let succeeded = false;
  let registeredEmail = "";
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    head($$payload2, ($$payload3) => {
      $$payload3.title = `<title>Register - Verdagraph</title>`;
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
                $$payload5.out += `<!---->Create an account`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <!---->`;
            Card_description($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->`;
                Button($$payload5, {
                  variant: "link",
                  class: "text-neutral-11 p-0",
                  href: "/login",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Already have one?`;
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
        $$payload3.out += `<!----> <!---->`;
        Card_content($$payload3, {
          children: ($$payload4) => {
            RegistrationForm($$payload4, {
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
                        $$payload7.out += `<!---->If you don't receive it, <!---->`;
                        Button($$payload7, {
                          variant: "link",
                          class: "text-neutral-11 p-0",
                          href: "/register/request-email-verification",
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->request another through this link.`;
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
}
export {
  _page as default
};
