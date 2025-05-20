import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { z } from 'zod';

import {
	y as bind_props,
	F as clsx$1,
	m as pop,
	p as push,
	x as spread_attributes
} from './index.js';

function cn(...inputs) {
	return twMerge(clsx(inputs));
}
const buttonVariants = tv({
	base: 'ring-offset-background focus-visible:ring-primary-7 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
	variants: {
		variant: {
			default:
				'bg-primary-3 hover:bg-primary-4 active:bg-primary-5 border border-primary-7 text-primary-12',
			destructive:
				'bg-destructive-3 hover:bg-destructive-4 active:bg-destructive-5 border border-destructive-7 text-destructive-12',
			outline:
				'border-neutral-7 hover:bg-accent-3 active:bg-accent-4 hover:text-accent-12 border',
			secondary:
				'bg-secondary-3 hover:bg-secondary-4 active:bg-secondary-5 border border-secondary-7 text-secondary-12',
			accent:
				'bg-accent-3 hover:bg-accent-4 active:bg-accent-5 border border-accent-7 text-accent-12',
			ghost: 'hover:bg-accent-3 active:bg-accent-4 hover:text-accent-12',
			link: 'text-neutral-12 underline-offset-4 hover:underline hover:opacity-90'
		},
		size: {
			default: 'h-10 px-4 py-2',
			xsm: 'h-6 w-6 rounded-[8px] px-2',
			sm: 'h-9 rounded-md px-3',
			lg: 'h-11 rounded-md px-8',
			icon: 'h-10 w-10'
		}
	},
	defaultVariants: { variant: 'default', size: 'default' }
});
function Button($$payload, $$props) {
	push();
	let {
		class: className,
		variant = 'default',
		size = 'default',
		ref = null,
		href = void 0,
		type = 'button',
		children,
		$$slots,
		$$events,
		...restProps
	} = $$props;
	if (href) {
		$$payload.out += '<!--[-->';
		$$payload.out += `<a${spread_attributes({
			class: clsx$1(cn(buttonVariants({ variant, size }), className)),
			href,
			...restProps
		})}>`;
		children?.($$payload);
		$$payload.out += `<!----></a>`;
	} else {
		$$payload.out += '<!--[!-->';
		$$payload.out += `<button${spread_attributes({
			class: clsx$1(cn(buttonVariants({ variant, size }), className)),
			type,
			...restProps
		})}>`;
		children?.($$payload);
		$$payload.out += `<!----></button>`;
	}
	$$payload.out += `<!--]-->`;
	bind_props($$props, { ref });
	pop();
}
const variables = /* @__PURE__ */ Object.freeze(
	/* @__PURE__ */ Object.defineProperty(
		{
			__proto__: null
		},
		Symbol.toStringTag,
		{ value: 'Module' }
	)
);
const EnvSchema = z.object({
	/** URLs */
	APP_URL: z
		.string({
			description: 'The base URL of the application.'
		})
		.url()
		.default('http://localhost:5173'),
	NEWSLETTER_URL: z
		.string({ description: 'The URL to the newsletter signup.' })
		.url()
		.default('https://newsletter.verdagraph.org/subscription/form')
});
const env = EnvSchema.parse(variables);
export { Button as B, cn as c, env as e };
