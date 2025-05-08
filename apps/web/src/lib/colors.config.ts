import {
	gray,
	grayDark,
	mauve,
	mauveDark,
	slate,
	slateDark,
	sage,
	sageDark,
	olive,
	oliveDark,
	sand,
	sandDark,
	tomato,
	tomatoDark,
	red,
	redDark,
	ruby,
	rubyDark,
	crimson,
	crimsonDark,
	pink,
	pinkDark,
	plum,
	plumDark,
	purple,
	purpleDark,
	violet,
	violetDark,
	iris,
	irisDark,
	indigo,
	indigoDark,
	blue,
	blueDark,
	cyan,
	cyanDark,
	teal,
	tealDark,
	jade,
	jadeDark,
	green,
	greenDark,
	grass,
	grassDark,
	bronze,
	bronzeDark,
	gold,
	goldDark,
	brown,
	brownDark,
	orange,
	orangeDark,
	amber,
	amberDark,
	yellow,
	yellowDark,
	lime,
	limeDark,
	mint,
	mintDark,
	sky,
	skyDark
} from '@radix-ui/colors';

/**
 * Colors used are from Radix-UI.
 * Note that colors used here must be imported as CSS variables
 * within src/app.pcss.
 * Defined here to provide access both to tailwind config and canvas.
 */

/** Colors that are used for UI elements. */
export type SemanticColor =
	| 'neutral'
	| 'primary'
	| 'secondary'
	| 'accent'
	| 'destructive'
	| 'warning'
	| 'success';

/** Literal colors. */
export type LiteralColor =
	| 'gray'
	| 'mauve'
	| 'slate'
	| 'sage'
	| 'olive'
	| 'sand'
	| 'tomato'
	| 'red'
	| 'ruby'
	| 'crimson'
	| 'pink'
	| 'plum'
	| 'purple'
	| 'violet'
	| 'iris'
	| 'indigo'
	| 'blue'
	| 'cyan'
	| 'teal'
	| 'jade'
	| 'green'
	| 'grass'
	| 'bronze'
	| 'gold'
	| 'brown'
	| 'orange'
	| 'amber'
	| 'yellow'
	| 'lime'
	| 'mint'
	| 'sky';

export type Color = SemanticColor | LiteralColor;

/** Colors that need to be a specific color (eg., user selected plant color.) */
type ColorSpec = {
	/** The name of the color in radix UI. */
	radixId: string;
	/** The imported value of the color's light hex values from radix UI. */
	radixLightValue: Record<string, string>;
	/** The imported value of the color's dark hex values from radix UI. */
	radixDarkValue: Record<string, string>;
};

export const colors: Record<Color, ColorSpec> = {
	/** Semantic colors. */
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

	/** Literal colors. */
	gray: {
		radixId: 'gray',
		radixLightValue: gray,
		radixDarkValue: grayDark
	},
	mauve: {
		radixId: 'mauve',
		radixLightValue: mauve,
		radixDarkValue: mauveDark
	},
	slate: {
		radixId: 'slate',
		radixLightValue: slate,
		radixDarkValue: slateDark
	},
	sage: {
		radixId: 'sage',
		radixLightValue: sage,
		radixDarkValue: sageDark
	},
	olive: {
		radixId: 'olive',
		radixLightValue: olive,
		radixDarkValue: oliveDark
	},
	sand: {
		radixId: 'sand',
		radixLightValue: sand,
		radixDarkValue: sandDark
	},
	tomato: {
		radixId: 'tomato',
		radixLightValue: tomato,
		radixDarkValue: tomatoDark
	},
	red: {
		radixId: 'red',
		radixLightValue: red,
		radixDarkValue: redDark
	},
	ruby: {
		radixId: 'ruby',
		radixLightValue: ruby,
		radixDarkValue: rubyDark
	},
	crimson: {
		radixId: 'crimson',
		radixLightValue: crimson,
		radixDarkValue: crimsonDark
	},
	pink: {
		radixId: 'pink',
		radixLightValue: pink,
		radixDarkValue: pinkDark
	},
	plum: {
		radixId: 'plum',
		radixLightValue: plum,
		radixDarkValue: plumDark
	},
	purple: {
		radixId: 'purple',
		radixLightValue: purple,
		radixDarkValue: purpleDark
	},
	violet: {
		radixId: 'violet',
		radixLightValue: violet,
		radixDarkValue: violetDark
	},
	iris: {
		radixId: 'iris',
		radixLightValue: iris,
		radixDarkValue: irisDark
	},
	indigo: {
		radixId: 'indigo',
		radixLightValue: indigo,
		radixDarkValue: indigoDark
	},
	blue: {
		radixId: 'blue',
		radixLightValue: blue,
		radixDarkValue: blueDark
	},
	cyan: {
		radixId: 'cyan',
		radixLightValue: cyan,
		radixDarkValue: cyanDark
	},
	teal: {
		radixId: 'teal',
		radixLightValue: teal,
		radixDarkValue: tealDark
	},
	jade: {
		radixId: 'jade',
		radixLightValue: jade,
		radixDarkValue: jadeDark
	},
	green: {
		radixId: 'green',
		radixLightValue: green,
		radixDarkValue: greenDark
	},
	grass: {
		radixId: 'grass',
		radixLightValue: grass,
		radixDarkValue: grassDark
	},
	bronze: {
		radixId: 'bronze',
		radixLightValue: bronze,
		radixDarkValue: bronzeDark
	},
	gold: {
		radixId: 'gold',
		radixLightValue: gold,
		radixDarkValue: goldDark
	},
	brown: {
		radixId: 'brown',
		radixLightValue: brown,
		radixDarkValue: brownDark
	},
	orange: {
		radixId: 'orange',
		radixLightValue: orange,
		radixDarkValue: orangeDark
	},
	amber: {
		radixId: 'amber',
		radixLightValue: amber,
		radixDarkValue: amberDark
	},
	yellow: {
		radixId: 'yellow',
		radixLightValue: yellow,
		radixDarkValue: yellowDark
	},
	lime: {
		radixId: 'lime',
		radixLightValue: lime,
		radixDarkValue: limeDark
	},
	mint: {
		radixId: 'mint',
		radixLightValue: mint,
		radixDarkValue: mintDark
	},
	sky: {
		radixId: 'sky',
		radixLightValue: sky,
		radixDarkValue: skyDark
	}
};
export default colors;
