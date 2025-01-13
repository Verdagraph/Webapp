import {
	olive,
	oliveDark,
	grass,
	grassDark,
	teal,
	tealDark,
	lime,
	limeDark,
	tomato,
	tomatoDark,
	amber,
	amberDark,
	mint,
	mintDark,
	brown,
	brownDark
} from '@radix-ui/colors';

/**
 * Colors used are from Radix-UI.
 * Note that colors used here must be imported as CSS variables
 * within src/app.pcss.
 * Defined here to provide access both to tailwind config and canvas.
 */

export type Color =
	/** Semantic colors. */
	| 'neutral'
	| 'primary'
	| 'secondary'
	| 'accent'
	| 'destructive'
	| 'warning'
	| 'success'

	/** Literal colors. */
	| 'brown';

type ColorSpec = {
	/** The name of the color in radix UI. */
	radixId: string;
	/** The imported value of the color's light hex values from radix UI. */
	radixLightValue: Record<string, string>;
	/** The imported value of the color's dark hex values from radix UI. */
	radixDarkValue: Record<string, string>;
};

export const colors: Record<Color, ColorSpec> = {
	neutral: {
		radixId: 'olive',
		radixLightValue: olive,
		radixDarkValue: oliveDark
	},
	primary: {
		radixId: 'grass',
		radixLightValue: grass,
		radixDarkValue: grassDark
	},
	secondary: {
		radixId: 'teal',
		radixLightValue: teal,
		radixDarkValue: tealDark
	},
	accent: {
		radixId: 'lime',
		radixLightValue: lime,
		radixDarkValue: limeDark
	},
	destructive: {
		radixId: 'tomato',
		radixLightValue: tomato,
		radixDarkValue: tomatoDark
	},
	warning: {
		radixId: 'amber',
		radixLightValue: amber,
		radixDarkValue: amberDark
	},
	success: {
		radixId: 'mint',
		radixLightValue: mint,
		radixDarkValue: mintDark
	},
	brown: {
		radixId: 'brown',
		radixLightValue: brown,
		radixDarkValue: brownDark
	}
};
export default colors;
