import { c as spread_attributes, t as clsx, d as bind_props, a as pop, p as push } from "./index2.js";
import { tv } from "tailwind-variants";
import { c as cn } from "./shadcn.js";
const buttonVariants = tv({
  base: "ring-offset-background focus-visible:ring-primary-7 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  variants: {
    variant: {
      default: "bg-primary-3 hover:bg-primary-4 active:bg-primary-5 border border-primary-7 text-primary-12",
      destructive: "bg-destructive-3 hover:bg-destructive-4 active:bg-destructive-5 border border-destructive-7 text-destructive-12",
      outline: "border-neutral-7 hover:bg-accent-3 active:bg-accent-4 hover:text-accent-12 border",
      secondary: "bg-secondary-3 hover:bg-secondary-4 active:bg-secondary-5 border border-secondary-7 text-secondary-12",
      accent: "bg-accent-3 hover:bg-accent-4 active:bg-accent-5 border border-accent-7 text-accent-12",
      ghost: "hover:bg-accent-3 active:bg-accent-4 hover:text-accent-12",
      link: "text-neutral-12 underline-offset-4 hover:underline hover:opacity-90"
    },
    size: {
      default: "h-10 px-4 py-2",
      xsm: "h-6 w-6 rounded-[8px] px-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10"
    }
  },
  defaultVariants: { variant: "default", size: "default" }
});
function Button($$payload, $$props) {
  push();
  let {
    class: className,
    variant = "default",
    size = "default",
    ref = null,
    href = void 0,
    type = "button",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  if (href) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<a${spread_attributes(
      {
        class: clsx(cn(buttonVariants({ variant, size }), className)),
        href,
        ...restProps
      }
    )}>`;
    children?.($$payload);
    $$payload.out += `<!----></a>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes(
      {
        class: clsx(cn(buttonVariants({ variant, size }), className)),
        type,
        ...restProps
      }
    )}>`;
    children?.($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
export {
  Button as B,
  buttonVariants as b
};
