import { y as element, d as bind_props, a as pop, p as push, c as spread_attributes } from "./index2.js";
function Button($$payload, $$props) {
  push();
  let {
    href,
    type,
    children,
    ref = void 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  element(
    $$payload,
    href ? "a" : "button",
    () => {
      $$payload.out += `${spread_attributes(
        {
          type: href ? void 0 : type,
          href,
          tabindex: "0",
          ...restProps
        }
      )}`;
    },
    () => {
      children?.($$payload);
      $$payload.out += `<!---->`;
    }
  );
  bind_props($$props, { ref });
  pop();
}
export {
  Button as B
};
