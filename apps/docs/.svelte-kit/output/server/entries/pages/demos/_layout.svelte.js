import "clsx";
import { R as Root, T as Trigger, D as Dropdown_menu_content, a as RadioGroup, b as Dropdown_menu_radio_item, N as Nav } from "../../../chunks/Nav.js";
import { I as ensure_array_like, G as escape_html, J as spread_props, D as pop, A as push } from "../../../chunks/index.js";
import { g as goto } from "../../../chunks/client.js";
import { p as page } from "../../../chunks/index4.js";
import { d as demos, R as Root$1, T as Trigger$1, P as Popover_content } from "../../../chunks/demos.js";
import { B as Button } from "../../../chunks/circle.js";
function DemoNav($$payload, $$props) {
  push();
  const selectedDemo = demos.find((demo) => demo.id === page.params.demoId);
  $$payload.out += `<div class="border-neutral-8 bg-neutral-3 flex h-10 items-center justify-start gap-4 border-b px-8 py-2"><span>Verdagraph Demos</span> <!---->`;
  Root($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      {
        let child = function($$payload3, { props }) {
          $$payload3.out += `<!---->`;
          Button($$payload3, spread_props([
            props,
            {
              variant: "ghost",
              children: ($$payload4) => {
                $$payload4.out += `<!---->Select`;
              },
              $$slots: { default: true }
            }
          ]));
          $$payload3.out += `<!---->`;
        };
        Trigger($$payload2, { child, $$slots: { child: true } });
      }
      $$payload2.out += `<!----> <!---->`;
      Dropdown_menu_content($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          RadioGroup($$payload3, {
            value: selectedDemo ? selectedDemo.id : "",
            onValueChange: (value) => goto(),
            children: ($$payload4) => {
              const each_array = ensure_array_like(demos);
              $$payload4.out += `<!--[-->`;
              for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                let demo = each_array[$$index];
                $$payload4.out += `<!---->`;
                Dropdown_menu_radio_item($$payload4, {
                  value: demo.id,
                  children: ($$payload5) => {
                    $$payload5.out += `<!---->${escape_html(demo.title)}`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!---->`;
              }
              $$payload4.out += `<!--]-->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> <!---->`;
  Root$1($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      {
        let child = function($$payload3, { props }) {
          $$payload3.out += `<!---->`;
          Button($$payload3, spread_props([
            props,
            {
              variant: "ghost",
              children: ($$payload4) => {
                $$payload4.out += `<!---->Description`;
              },
              $$slots: { default: true }
            }
          ]));
          $$payload3.out += `<!---->`;
        };
        Trigger$1($$payload2, { child, $$slots: { child: true } });
      }
      $$payload2.out += `<!----> <!---->`;
      Popover_content($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<span class="text-neutral-11 text-italic text-sm">${escape_html(selectedDemo ? selectedDemo.description : "Demo not found...")}</span>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div>`;
  pop();
}
function _layout($$payload, $$props) {
  let { children } = $$props;
  $$payload.out += `<div class="flex h-screen w-full flex-col overflow-clip">`;
  Nav($$payload);
  $$payload.out += `<!----> `;
  DemoNav($$payload);
  $$payload.out += `<!----> `;
  children($$payload);
  $$payload.out += `<!----></div>`;
}
export {
  _layout as default
};
