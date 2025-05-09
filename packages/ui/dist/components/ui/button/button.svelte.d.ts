import type { WithElementRef } from 'bits-ui';
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
import { type VariantProps } from 'tailwind-variants';
export declare const buttonVariants: import('tailwind-variants').TVReturnType<
	{
		variant: {
			default: string;
			destructive: string;
			outline: string;
			secondary: string;
			ghost: string;
			link: string;
		};
		size: {
			default: string;
			xsm: string;
			sm: string;
			lg: string;
			icon: string;
		};
	},
	undefined,
	'ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
	import('tailwind-variants/dist/config').TVConfig<
		{
			variant: {
				default: string;
				destructive: string;
				outline: string;
				secondary: string;
				ghost: string;
				link: string;
			};
			size: {
				default: string;
				xsm: string;
				sm: string;
				lg: string;
				icon: string;
			};
		},
		{
			variant: {
				default: string;
				destructive: string;
				outline: string;
				secondary: string;
				ghost: string;
				link: string;
			};
			size: {
				default: string;
				xsm: string;
				sm: string;
				lg: string;
				icon: string;
			};
		}
	>,
	{
		variant: {
			default: string;
			destructive: string;
			outline: string;
			secondary: string;
			ghost: string;
			link: string;
		};
		size: {
			default: string;
			xsm: string;
			sm: string;
			lg: string;
			icon: string;
		};
	},
	undefined,
	import('tailwind-variants').TVReturnType<
		{
			variant: {
				default: string;
				destructive: string;
				outline: string;
				secondary: string;
				ghost: string;
				link: string;
			};
			size: {
				default: string;
				xsm: string;
				sm: string;
				lg: string;
				icon: string;
			};
		},
		undefined,
		'ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
		import('tailwind-variants/dist/config').TVConfig<
			{
				variant: {
					default: string;
					destructive: string;
					outline: string;
					secondary: string;
					ghost: string;
					link: string;
				};
				size: {
					default: string;
					xsm: string;
					sm: string;
					lg: string;
					icon: string;
				};
			},
			{
				variant: {
					default: string;
					destructive: string;
					outline: string;
					secondary: string;
					ghost: string;
					link: string;
				};
				size: {
					default: string;
					xsm: string;
					sm: string;
					lg: string;
					icon: string;
				};
			}
		>,
		unknown,
		unknown,
		undefined
	>
>;
export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
export type ButtonSize = VariantProps<typeof buttonVariants>['size'];
export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
	WithElementRef<HTMLAnchorAttributes> & {
		variant?: ButtonVariant;
		size?: ButtonSize;
	};
declare const Button: import('svelte').Component<ButtonProps, {}, 'ref'>;
type Button = ReturnType<typeof Button>;
export default Button;
//# sourceMappingURL=button.svelte.d.ts.map
