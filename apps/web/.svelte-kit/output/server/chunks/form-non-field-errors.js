import { p as push, m as ensure_array_like, q as attr_class, n as escape_html, t as clsx, a as pop } from "./index2.js";
import { c as cn } from "./shadcn.js";
function Form_non_field_errors($$payload, $$props) {
  push();
  let { errorClasses, handlerErrors } = $$props;
  if (handlerErrors) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(handlerErrors);
    $$payload.out += `<ul class="mt-8"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let error = each_array[$$index];
      $$payload.out += `<li${attr_class(clsx(cn(errorClasses, "border-destructive-7 bg-destructive-3 border-x p-2 first:rounded-t-sm first:border-t last:mb-4 last:rounded-b-sm last:border-b")))}>${escape_html(error)}</li>`;
    }
    $$payload.out += `<!--]--></ul>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  Form_non_field_errors as F
};
