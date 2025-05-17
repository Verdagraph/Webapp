import { c as spread_attributes, t as clsx, d as bind_props, a as pop, p as push } from "./index2.js";
import { c as cn } from "./shadcn.js";
function Card_description($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<p${spread_attributes(
    {
      class: clsx(cn("text-neutral-11 text-sm", className)),
      ...restProps
    }
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></p>`;
  bind_props($$props, { ref });
  pop();
}
export {
  Card_description as C
};
