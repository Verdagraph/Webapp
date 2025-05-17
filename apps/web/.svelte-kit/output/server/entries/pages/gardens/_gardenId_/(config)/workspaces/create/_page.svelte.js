import { e as copy_payload, f as assign_payload, a as pop, p as push, g as spread_props, x as store_mutate, v as store_get, w as unsubscribe_stores, h as head } from "../../../../../../../chunks/index2.js";
import { g as goto } from "../../../../../../../chunks/client.js";
import "clsx";
import { s as superForm, z as zod, d as defaults, F as Form_field, C as Control, a as Form_field_errors, b as Form_label, I as Input, c as Form_button } from "../../../../../../../chunks/zod.js";
import "../../../../../../../chunks/stringify.js";
import { w as workspaceFields } from "../../../../../../../chunks/auth.svelte.js";
import { p as page } from "../../../../../../../chunks/index5.js";
import { w as workspaceCreate } from "../../../../../../../chunks/commands.js";
import { c as createCommandHandler } from "../../../../../../../chunks/commandHandler.svelte.js";
import { T as Textarea } from "../../../../../../../chunks/commands2.js";
import { F as Form_non_field_errors } from "../../../../../../../chunks/form-non-field-errors.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../../../../../../chunks/card.js";
function CreateWorkspaceForm($$payload, $$props) {
  push();
  var $$store_subs;
  let formHandler = createCommandHandler(workspaceCreate.mutation, {
    onSuccess: (workspace) => {
      `/gardens/${page.params.gardenId}/workspaces/${workspace.slug}`;
      goto();
    }
  });
  const form = superForm(defaults(zod(workspaceCreate.schema)), {
    SPA: true,
    resetForm: false,
    validators: zod(workspaceCreate.schema),
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
      name: "name",
      children: ($$payload3) => {
        {
          let children = function($$payload4, { props }) {
            Form_label($$payload4, {
              description: workspaceFields.workspaceNameSchema.description,
              optional: false,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Name`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Input($$payload4, spread_props([
              props,
              {
                type: "text",
                placeholder: "Backyard",
                get value() {
                  return store_get($$store_subs ??= {}, "$formData", formData).name;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).name = $$value);
                  $$settled = false;
                }
              }
            ]));
            $$payload4.out += `<!---->`;
          };
          Control($$payload3, { children });
        }
        $$payload3.out += `<!----> `;
        Form_field_errors($$payload3, { handlerErrors: formHandler.fieldErrors?.name });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    Form_field($$payload2, {
      form,
      name: "description",
      children: ($$payload3) => {
        {
          let children = function($$payload4, { props }) {
            Form_label($$payload4, {
              description: workspaceFields.workspaceDescriptionSchema.description,
              optional: true,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Description`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Textarea($$payload4, spread_props([
              props,
              {
                get value() {
                  return store_get($$store_subs ??= {}, "$formData", formData).description;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).description = $$value);
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
          handlerErrors: formHandler.fieldErrors?.description
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
function _page($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>New Workspace - Verdagraph</title>`;
  });
  Card($$payload, {
    class: "m-auto mt-12 w-3/4 md:w-1/2 lg:w-1/3",
    children: ($$payload2) => {
      Card_header($$payload2, {
        children: ($$payload3) => {
          Card_title($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->Create a Workspace`;
            },
            $$slots: { default: true }
          });
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Card_content($$payload2, {
        children: ($$payload3) => {
          CreateWorkspaceForm($$payload3);
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
}
export {
  _page as default
};
