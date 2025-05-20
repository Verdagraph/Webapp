import { b as Nt } from './CwnTrnkb.js';
import { p as Ne, r as wr, i as xr } from './Cz8mIVZI.js';
import {
	A as At,
	z as Ct,
	C as St,
	w as _r,
	x as br,
	b as fr,
	h as gr,
	c as hr,
	aB as mr,
	E as pr,
	aA as pt,
	t as vr,
	d as yr
} from './DgmMHYUv.js';
import { t as Ut, f as ct, j as ur } from './HWDk4eir.js';
import { a as Zt, c as kr } from './UaJBEsuX.js';

function Rt(r, e, ...t) {
	var n = r,
		s = pt,
		a;
	fr(() => {
		s !== (s = e()) && (a && (mr(a), (a = null)), (a = hr(() => s(n, ...t))));
	}, pr),
		gr && (n = yr);
}
var Ot = (r) => (typeof r == 'boolean' ? `${r}` : r === 0 ? '0' : r),
	B = (r) => !r || typeof r != 'object' || Object.keys(r).length === 0,
	Tr = (r, e) => JSON.stringify(r) === JSON.stringify(e);
function Dt(r, e) {
	r.forEach(function (t) {
		Array.isArray(t) ? Dt(t, e) : e.push(t);
	});
}
function Bt(r) {
	let e = [];
	return Dt(r, e), e;
}
var Ft = (...r) => Bt(r).filter(Boolean),
	Gt = (r, e) => {
		let t = {},
			n = Object.keys(r),
			s = Object.keys(e);
		for (let a of n)
			if (s.includes(a)) {
				let o = r[a],
					i = e[a];
				typeof o == 'object' && typeof i == 'object'
					? (t[a] = Gt(o, i))
					: Array.isArray(o) || Array.isArray(i)
						? (t[a] = Ft(i, o))
						: (t[a] = i + ' ' + o);
			} else t[a] = r[a];
		for (let a of s) n.includes(a) || (t[a] = e[a]);
		return t;
	},
	Et = (r) => (!r || typeof r != 'string' ? r : r.replace(/\s+/g, ' ').trim());
const wt = '-',
	Cr = (r) => {
		const e = Sr(r),
			{ conflictingClassGroups: t, conflictingClassGroupModifiers: n } = r;
		return {
			getClassGroupId: (o) => {
				const i = o.split(wt);
				return i[0] === '' && i.length !== 1 && i.shift(), Wt(i, e) || Ar(o);
			},
			getConflictingClassGroupIds: (o, i) => {
				const c = t[o] || [];
				return i && n[o] ? [...c, ...n[o]] : c;
			}
		};
	},
	Wt = (r, e) => {
		var o;
		if (r.length === 0) return e.classGroupId;
		const t = r[0],
			n = e.nextPart.get(t),
			s = n ? Wt(r.slice(1), n) : void 0;
		if (s) return s;
		if (e.validators.length === 0) return;
		const a = r.join(wt);
		return (o = e.validators.find(({ validator: i }) => i(a))) == null
			? void 0
			: o.classGroupId;
	},
	jt = /^\[(.+)\]$/,
	Ar = (r) => {
		if (jt.test(r)) {
			const e = jt.exec(r)[1],
				t = e == null ? void 0 : e.substring(0, e.indexOf(':'));
			if (t) return 'arbitrary..' + t;
		}
	},
	Sr = (r) => {
		const { theme: e, prefix: t } = r,
			n = { nextPart: new Map(), validators: [] };
		return (
			Nr(Object.entries(r.classGroups), t).forEach(([a, o]) => {
				ht(o, n, a, e);
			}),
			n
		);
	},
	ht = (r, e, t, n) => {
		r.forEach((s) => {
			if (typeof s == 'string') {
				const a = s === '' ? e : It(e, s);
				a.classGroupId = t;
				return;
			}
			if (typeof s == 'function') {
				if (Zr(s)) {
					ht(s(n), e, t, n);
					return;
				}
				e.validators.push({ validator: s, classGroupId: t });
				return;
			}
			Object.entries(s).forEach(([a, o]) => {
				ht(o, It(e, a), t, n);
			});
		});
	},
	It = (r, e) => {
		let t = r;
		return (
			e.split(wt).forEach((n) => {
				t.nextPart.has(n) || t.nextPart.set(n, { nextPart: new Map(), validators: [] }),
					(t = t.nextPart.get(n));
			}),
			t
		);
	},
	Zr = (r) => r.isThemeGetter,
	Nr = (r, e) =>
		e
			? r.map(([t, n]) => {
					const s = n.map((a) =>
						typeof a == 'string'
							? e + a
							: typeof a == 'object'
								? Object.fromEntries(Object.entries(a).map(([o, i]) => [e + o, i]))
								: a
					);
					return [t, s];
				})
			: r,
	Rr = (r) => {
		if (r < 1) return { get: () => {}, set: () => {} };
		let e = 0,
			t = new Map(),
			n = new Map();
		const s = (a, o) => {
			t.set(a, o), e++, e > r && ((e = 0), (n = t), (t = new Map()));
		};
		return {
			get(a) {
				let o = t.get(a);
				if (o !== void 0) return o;
				if ((o = n.get(a)) !== void 0) return s(a, o), o;
			},
			set(a, o) {
				t.has(a) ? t.set(a, o) : s(a, o);
			}
		};
	},
	qt = '!',
	Or = (r) => {
		const { separator: e, experimentalParseClassName: t } = r,
			n = e.length === 1,
			s = e[0],
			a = e.length,
			o = (i) => {
				const c = [];
				let l = 0,
					u = 0,
					k;
				for (let x = 0; x < i.length; x++) {
					let V = i[x];
					if (l === 0) {
						if (V === s && (n || i.slice(x, x + a) === e)) {
							c.push(i.slice(u, x)), (u = x + a);
							continue;
						}
						if (V === '/') {
							k = x;
							continue;
						}
					}
					V === '[' ? l++ : V === ']' && l--;
				}
				const R = c.length === 0 ? i : i.substring(u),
					Z = R.startsWith(qt),
					P = Z ? R.substring(1) : R,
					O = k && k > u ? k - u : void 0;
				return {
					modifiers: c,
					hasImportantModifier: Z,
					baseClassName: P,
					maybePostfixModifierPosition: O
				};
			};
		return t ? (i) => t({ className: i, parseClassName: o }) : o;
	},
	Er = (r) => {
		if (r.length <= 1) return r;
		const e = [];
		let t = [];
		return (
			r.forEach((n) => {
				n[0] === '[' ? (e.push(...t.sort(), n), (t = [])) : t.push(n);
			}),
			e.push(...t.sort()),
			e
		);
	},
	jr = (r) => ({ cache: Rr(r.cacheSize), parseClassName: Or(r), ...Cr(r) }),
	Ir = /\s+/,
	Mr = (r, e) => {
		const { parseClassName: t, getClassGroupId: n, getConflictingClassGroupIds: s } = e,
			a = [],
			o = r.trim().split(Ir);
		let i = '';
		for (let c = o.length - 1; c >= 0; c -= 1) {
			const l = o[c],
				{
					modifiers: u,
					hasImportantModifier: k,
					baseClassName: R,
					maybePostfixModifierPosition: Z
				} = t(l);
			let P = !!Z,
				O = n(P ? R.substring(0, Z) : R);
			if (!O) {
				if (!P) {
					i = l + (i.length > 0 ? ' ' + i : i);
					continue;
				}
				if (((O = n(R)), !O)) {
					i = l + (i.length > 0 ? ' ' + i : i);
					continue;
				}
				P = !1;
			}
			const x = Er(u).join(':'),
				V = k ? x + qt : x,
				N = V + O;
			if (a.includes(N)) continue;
			a.push(N);
			const de = s(O, P);
			for (let J = 0; J < de.length; ++J) {
				const me = de[J];
				a.push(V + me);
			}
			i = l + (i.length > 0 ? ' ' + i : i);
		}
		return i;
	};
function zr() {
	let r = 0,
		e,
		t,
		n = '';
	for (; r < arguments.length; )
		(e = arguments[r++]) && (t = Jt(e)) && (n && (n += ' '), (n += t));
	return n;
}
const Jt = (r) => {
	if (typeof r == 'string') return r;
	let e,
		t = '';
	for (let n = 0; n < r.length; n++)
		r[n] && (e = Jt(r[n])) && (t && (t += ' '), (t += e));
	return t;
};
function mt(r, ...e) {
	let t,
		n,
		s,
		a = o;
	function o(c) {
		const l = e.reduce((u, k) => k(u), r());
		return (t = jr(l)), (n = t.cache.get), (s = t.cache.set), (a = i), i(c);
	}
	function i(c) {
		const l = n(c);
		if (l) return l;
		const u = Mr(c, t);
		return s(c, u), u;
	}
	return function () {
		return a(zr.apply(null, arguments));
	};
}
const M = (r) => {
		const e = (t) => t[r] || [];
		return (e.isThemeGetter = !0), e;
	},
	Yt = /^\[(?:([a-z-]+):)?(.+)\]$/i,
	Pr = /^\d+\/\d+$/,
	Vr = new Set(['px', 'full', 'screen']),
	$r = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
	Lr =
		/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
	Ur = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
	Dr = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
	Br =
		/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
	X = (r) => be(r) || Vr.has(r) || Pr.test(r),
	se = (r) => Te(r, 'length', Kr),
	be = (r) => !!r && !Number.isNaN(Number(r)),
	lt = (r) => Te(r, 'number', be),
	Re = (r) => !!r && Number.isInteger(Number(r)),
	Fr = (r) => r.endsWith('%') && be(r.slice(0, -1)),
	b = (r) => Yt.test(r),
	ae = (r) => $r.test(r),
	Gr = new Set(['length', 'size', 'percentage']),
	Wr = (r) => Te(r, Gr, Ht),
	qr = (r) => Te(r, 'position', Ht),
	Jr = new Set(['image', 'url']),
	Yr = (r) => Te(r, Jr, Qr),
	Hr = (r) => Te(r, '', Xr),
	Oe = () => !0,
	Te = (r, e, t) => {
		const n = Yt.exec(r);
		return n
			? n[1]
				? typeof e == 'string'
					? n[1] === e
					: e.has(n[1])
				: t(n[2])
			: !1;
	},
	Kr = (r) => Lr.test(r) && !Ur.test(r),
	Ht = () => !1,
	Xr = (r) => Dr.test(r),
	Qr = (r) => Br.test(r),
	gt = () => {
		const r = M('colors'),
			e = M('spacing'),
			t = M('blur'),
			n = M('brightness'),
			s = M('borderColor'),
			a = M('borderRadius'),
			o = M('borderSpacing'),
			i = M('borderWidth'),
			c = M('contrast'),
			l = M('grayscale'),
			u = M('hueRotate'),
			k = M('invert'),
			R = M('gap'),
			Z = M('gradientColorStops'),
			P = M('gradientColorStopPositions'),
			O = M('inset'),
			x = M('margin'),
			V = M('opacity'),
			N = M('padding'),
			de = M('saturate'),
			J = M('scale'),
			me = M('sepia'),
			Ke = M('skew'),
			Ce = M('space'),
			Ae = M('translate'),
			ge = () => ['auto', 'contain', 'none'],
			Se = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'],
			Ze = () => ['auto', b, e],
			m = () => [b, e],
			T = () => ['', X, se],
			w = () => ['auto', be, b],
			S = () => [
				'bottom',
				'center',
				'left',
				'left-bottom',
				'left-top',
				'right',
				'right-bottom',
				'right-top',
				'top'
			],
			C = () => ['solid', 'dashed', 'dotted', 'double', 'none'],
			E = () => [
				'normal',
				'multiply',
				'screen',
				'overlay',
				'darken',
				'lighten',
				'color-dodge',
				'color-burn',
				'hard-light',
				'soft-light',
				'difference',
				'exclusion',
				'hue',
				'saturation',
				'color',
				'luminosity'
			],
			j = () => ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'],
			I = () => ['', '0', b],
			$ = () => [
				'auto',
				'avoid',
				'all',
				'avoid-page',
				'page',
				'left',
				'right',
				'column'
			],
			U = () => [be, b];
		return {
			cacheSize: 500,
			separator: ':',
			theme: {
				colors: [Oe],
				spacing: [X, se],
				blur: ['none', '', ae, b],
				brightness: U(),
				borderColor: [r],
				borderRadius: ['none', '', 'full', ae, b],
				borderSpacing: m(),
				borderWidth: T(),
				contrast: U(),
				grayscale: I(),
				hueRotate: U(),
				invert: I(),
				gap: m(),
				gradientColorStops: [r],
				gradientColorStopPositions: [Fr, se],
				inset: Ze(),
				margin: Ze(),
				opacity: U(),
				padding: m(),
				saturate: U(),
				scale: U(),
				sepia: I(),
				skew: U(),
				space: m(),
				translate: m()
			},
			classGroups: {
				aspect: [{ aspect: ['auto', 'square', 'video', b] }],
				container: ['container'],
				columns: [{ columns: [ae] }],
				'break-after': [{ 'break-after': $() }],
				'break-before': [{ 'break-before': $() }],
				'break-inside': [
					{ 'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'] }
				],
				'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
				box: [{ box: ['border', 'content'] }],
				display: [
					'block',
					'inline-block',
					'inline',
					'flex',
					'inline-flex',
					'table',
					'inline-table',
					'table-caption',
					'table-cell',
					'table-column',
					'table-column-group',
					'table-footer-group',
					'table-header-group',
					'table-row-group',
					'table-row',
					'flow-root',
					'grid',
					'inline-grid',
					'contents',
					'list-item',
					'hidden'
				],
				float: [{ float: ['right', 'left', 'none', 'start', 'end'] }],
				clear: [{ clear: ['left', 'right', 'both', 'none', 'start', 'end'] }],
				isolation: ['isolate', 'isolation-auto'],
				'object-fit': [{ object: ['contain', 'cover', 'fill', 'none', 'scale-down'] }],
				'object-position': [{ object: [...S(), b] }],
				overflow: [{ overflow: Se() }],
				'overflow-x': [{ 'overflow-x': Se() }],
				'overflow-y': [{ 'overflow-y': Se() }],
				overscroll: [{ overscroll: ge() }],
				'overscroll-x': [{ 'overscroll-x': ge() }],
				'overscroll-y': [{ 'overscroll-y': ge() }],
				position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
				inset: [{ inset: [O] }],
				'inset-x': [{ 'inset-x': [O] }],
				'inset-y': [{ 'inset-y': [O] }],
				start: [{ start: [O] }],
				end: [{ end: [O] }],
				top: [{ top: [O] }],
				right: [{ right: [O] }],
				bottom: [{ bottom: [O] }],
				left: [{ left: [O] }],
				visibility: ['visible', 'invisible', 'collapse'],
				z: [{ z: ['auto', Re, b] }],
				basis: [{ basis: Ze() }],
				'flex-direction': [{ flex: ['row', 'row-reverse', 'col', 'col-reverse'] }],
				'flex-wrap': [{ flex: ['wrap', 'wrap-reverse', 'nowrap'] }],
				flex: [{ flex: ['1', 'auto', 'initial', 'none', b] }],
				grow: [{ grow: I() }],
				shrink: [{ shrink: I() }],
				order: [{ order: ['first', 'last', 'none', Re, b] }],
				'grid-cols': [{ 'grid-cols': [Oe] }],
				'col-start-end': [{ col: ['auto', { span: ['full', Re, b] }, b] }],
				'col-start': [{ 'col-start': w() }],
				'col-end': [{ 'col-end': w() }],
				'grid-rows': [{ 'grid-rows': [Oe] }],
				'row-start-end': [{ row: ['auto', { span: [Re, b] }, b] }],
				'row-start': [{ 'row-start': w() }],
				'row-end': [{ 'row-end': w() }],
				'grid-flow': [
					{ 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] }
				],
				'auto-cols': [{ 'auto-cols': ['auto', 'min', 'max', 'fr', b] }],
				'auto-rows': [{ 'auto-rows': ['auto', 'min', 'max', 'fr', b] }],
				gap: [{ gap: [R] }],
				'gap-x': [{ 'gap-x': [R] }],
				'gap-y': [{ 'gap-y': [R] }],
				'justify-content': [{ justify: ['normal', ...j()] }],
				'justify-items': [{ 'justify-items': ['start', 'end', 'center', 'stretch'] }],
				'justify-self': [
					{ 'justify-self': ['auto', 'start', 'end', 'center', 'stretch'] }
				],
				'align-content': [{ content: ['normal', ...j(), 'baseline'] }],
				'align-items': [{ items: ['start', 'end', 'center', 'baseline', 'stretch'] }],
				'align-self': [
					{ self: ['auto', 'start', 'end', 'center', 'stretch', 'baseline'] }
				],
				'place-content': [{ 'place-content': [...j(), 'baseline'] }],
				'place-items': [
					{ 'place-items': ['start', 'end', 'center', 'baseline', 'stretch'] }
				],
				'place-self': [{ 'place-self': ['auto', 'start', 'end', 'center', 'stretch'] }],
				p: [{ p: [N] }],
				px: [{ px: [N] }],
				py: [{ py: [N] }],
				ps: [{ ps: [N] }],
				pe: [{ pe: [N] }],
				pt: [{ pt: [N] }],
				pr: [{ pr: [N] }],
				pb: [{ pb: [N] }],
				pl: [{ pl: [N] }],
				m: [{ m: [x] }],
				mx: [{ mx: [x] }],
				my: [{ my: [x] }],
				ms: [{ ms: [x] }],
				me: [{ me: [x] }],
				mt: [{ mt: [x] }],
				mr: [{ mr: [x] }],
				mb: [{ mb: [x] }],
				ml: [{ ml: [x] }],
				'space-x': [{ 'space-x': [Ce] }],
				'space-x-reverse': ['space-x-reverse'],
				'space-y': [{ 'space-y': [Ce] }],
				'space-y-reverse': ['space-y-reverse'],
				w: [{ w: ['auto', 'min', 'max', 'fit', 'svw', 'lvw', 'dvw', b, e] }],
				'min-w': [{ 'min-w': [b, e, 'min', 'max', 'fit'] }],
				'max-w': [
					{
						'max-w': [
							b,
							e,
							'none',
							'full',
							'min',
							'max',
							'fit',
							'prose',
							{ screen: [ae] },
							ae
						]
					}
				],
				h: [{ h: [b, e, 'auto', 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
				'min-h': [{ 'min-h': [b, e, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
				'max-h': [{ 'max-h': [b, e, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
				size: [{ size: [b, e, 'auto', 'min', 'max', 'fit'] }],
				'font-size': [{ text: ['base', ae, se] }],
				'font-smoothing': ['antialiased', 'subpixel-antialiased'],
				'font-style': ['italic', 'not-italic'],
				'font-weight': [
					{
						font: [
							'thin',
							'extralight',
							'light',
							'normal',
							'medium',
							'semibold',
							'bold',
							'extrabold',
							'black',
							lt
						]
					}
				],
				'font-family': [{ font: [Oe] }],
				'fvn-normal': ['normal-nums'],
				'fvn-ordinal': ['ordinal'],
				'fvn-slashed-zero': ['slashed-zero'],
				'fvn-figure': ['lining-nums', 'oldstyle-nums'],
				'fvn-spacing': ['proportional-nums', 'tabular-nums'],
				'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
				tracking: [
					{ tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest', b] }
				],
				'line-clamp': [{ 'line-clamp': ['none', be, lt] }],
				leading: [
					{ leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose', X, b] }
				],
				'list-image': [{ 'list-image': ['none', b] }],
				'list-style-type': [{ list: ['none', 'disc', 'decimal', b] }],
				'list-style-position': [{ list: ['inside', 'outside'] }],
				'placeholder-color': [{ placeholder: [r] }],
				'placeholder-opacity': [{ 'placeholder-opacity': [V] }],
				'text-alignment': [
					{ text: ['left', 'center', 'right', 'justify', 'start', 'end'] }
				],
				'text-color': [{ text: [r] }],
				'text-opacity': [{ 'text-opacity': [V] }],
				'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
				'text-decoration-style': [{ decoration: [...C(), 'wavy'] }],
				'text-decoration-thickness': [{ decoration: ['auto', 'from-font', X, se] }],
				'underline-offset': [{ 'underline-offset': ['auto', X, b] }],
				'text-decoration-color': [{ decoration: [r] }],
				'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
				'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
				'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
				indent: [{ indent: m() }],
				'vertical-align': [
					{
						align: [
							'baseline',
							'top',
							'middle',
							'bottom',
							'text-top',
							'text-bottom',
							'sub',
							'super',
							b
						]
					}
				],
				whitespace: [
					{
						whitespace: [
							'normal',
							'nowrap',
							'pre',
							'pre-line',
							'pre-wrap',
							'break-spaces'
						]
					}
				],
				break: [{ break: ['normal', 'words', 'all', 'keep'] }],
				hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
				content: [{ content: ['none', b] }],
				'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
				'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
				'bg-opacity': [{ 'bg-opacity': [V] }],
				'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
				'bg-position': [{ bg: [...S(), qr] }],
				'bg-repeat': [
					{ bg: ['no-repeat', { repeat: ['', 'x', 'y', 'round', 'space'] }] }
				],
				'bg-size': [{ bg: ['auto', 'cover', 'contain', Wr] }],
				'bg-image': [
					{
						bg: [
							'none',
							{ 'gradient-to': ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] },
							Yr
						]
					}
				],
				'bg-color': [{ bg: [r] }],
				'gradient-from-pos': [{ from: [P] }],
				'gradient-via-pos': [{ via: [P] }],
				'gradient-to-pos': [{ to: [P] }],
				'gradient-from': [{ from: [Z] }],
				'gradient-via': [{ via: [Z] }],
				'gradient-to': [{ to: [Z] }],
				rounded: [{ rounded: [a] }],
				'rounded-s': [{ 'rounded-s': [a] }],
				'rounded-e': [{ 'rounded-e': [a] }],
				'rounded-t': [{ 'rounded-t': [a] }],
				'rounded-r': [{ 'rounded-r': [a] }],
				'rounded-b': [{ 'rounded-b': [a] }],
				'rounded-l': [{ 'rounded-l': [a] }],
				'rounded-ss': [{ 'rounded-ss': [a] }],
				'rounded-se': [{ 'rounded-se': [a] }],
				'rounded-ee': [{ 'rounded-ee': [a] }],
				'rounded-es': [{ 'rounded-es': [a] }],
				'rounded-tl': [{ 'rounded-tl': [a] }],
				'rounded-tr': [{ 'rounded-tr': [a] }],
				'rounded-br': [{ 'rounded-br': [a] }],
				'rounded-bl': [{ 'rounded-bl': [a] }],
				'border-w': [{ border: [i] }],
				'border-w-x': [{ 'border-x': [i] }],
				'border-w-y': [{ 'border-y': [i] }],
				'border-w-s': [{ 'border-s': [i] }],
				'border-w-e': [{ 'border-e': [i] }],
				'border-w-t': [{ 'border-t': [i] }],
				'border-w-r': [{ 'border-r': [i] }],
				'border-w-b': [{ 'border-b': [i] }],
				'border-w-l': [{ 'border-l': [i] }],
				'border-opacity': [{ 'border-opacity': [V] }],
				'border-style': [{ border: [...C(), 'hidden'] }],
				'divide-x': [{ 'divide-x': [i] }],
				'divide-x-reverse': ['divide-x-reverse'],
				'divide-y': [{ 'divide-y': [i] }],
				'divide-y-reverse': ['divide-y-reverse'],
				'divide-opacity': [{ 'divide-opacity': [V] }],
				'divide-style': [{ divide: C() }],
				'border-color': [{ border: [s] }],
				'border-color-x': [{ 'border-x': [s] }],
				'border-color-y': [{ 'border-y': [s] }],
				'border-color-s': [{ 'border-s': [s] }],
				'border-color-e': [{ 'border-e': [s] }],
				'border-color-t': [{ 'border-t': [s] }],
				'border-color-r': [{ 'border-r': [s] }],
				'border-color-b': [{ 'border-b': [s] }],
				'border-color-l': [{ 'border-l': [s] }],
				'divide-color': [{ divide: [s] }],
				'outline-style': [{ outline: ['', ...C()] }],
				'outline-offset': [{ 'outline-offset': [X, b] }],
				'outline-w': [{ outline: [X, se] }],
				'outline-color': [{ outline: [r] }],
				'ring-w': [{ ring: T() }],
				'ring-w-inset': ['ring-inset'],
				'ring-color': [{ ring: [r] }],
				'ring-opacity': [{ 'ring-opacity': [V] }],
				'ring-offset-w': [{ 'ring-offset': [X, se] }],
				'ring-offset-color': [{ 'ring-offset': [r] }],
				shadow: [{ shadow: ['', 'inner', 'none', ae, Hr] }],
				'shadow-color': [{ shadow: [Oe] }],
				opacity: [{ opacity: [V] }],
				'mix-blend': [{ 'mix-blend': [...E(), 'plus-lighter', 'plus-darker'] }],
				'bg-blend': [{ 'bg-blend': E() }],
				filter: [{ filter: ['', 'none'] }],
				blur: [{ blur: [t] }],
				brightness: [{ brightness: [n] }],
				contrast: [{ contrast: [c] }],
				'drop-shadow': [{ 'drop-shadow': ['', 'none', ae, b] }],
				grayscale: [{ grayscale: [l] }],
				'hue-rotate': [{ 'hue-rotate': [u] }],
				invert: [{ invert: [k] }],
				saturate: [{ saturate: [de] }],
				sepia: [{ sepia: [me] }],
				'backdrop-filter': [{ 'backdrop-filter': ['', 'none'] }],
				'backdrop-blur': [{ 'backdrop-blur': [t] }],
				'backdrop-brightness': [{ 'backdrop-brightness': [n] }],
				'backdrop-contrast': [{ 'backdrop-contrast': [c] }],
				'backdrop-grayscale': [{ 'backdrop-grayscale': [l] }],
				'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [u] }],
				'backdrop-invert': [{ 'backdrop-invert': [k] }],
				'backdrop-opacity': [{ 'backdrop-opacity': [V] }],
				'backdrop-saturate': [{ 'backdrop-saturate': [de] }],
				'backdrop-sepia': [{ 'backdrop-sepia': [me] }],
				'border-collapse': [{ border: ['collapse', 'separate'] }],
				'border-spacing': [{ 'border-spacing': [o] }],
				'border-spacing-x': [{ 'border-spacing-x': [o] }],
				'border-spacing-y': [{ 'border-spacing-y': [o] }],
				'table-layout': [{ table: ['auto', 'fixed'] }],
				caption: [{ caption: ['top', 'bottom'] }],
				transition: [
					{
						transition: [
							'none',
							'all',
							'',
							'colors',
							'opacity',
							'shadow',
							'transform',
							b
						]
					}
				],
				duration: [{ duration: U() }],
				ease: [{ ease: ['linear', 'in', 'out', 'in-out', b] }],
				delay: [{ delay: U() }],
				animate: [{ animate: ['none', 'spin', 'ping', 'pulse', 'bounce', b] }],
				transform: [{ transform: ['', 'gpu', 'none'] }],
				scale: [{ scale: [J] }],
				'scale-x': [{ 'scale-x': [J] }],
				'scale-y': [{ 'scale-y': [J] }],
				rotate: [{ rotate: [Re, b] }],
				'translate-x': [{ 'translate-x': [Ae] }],
				'translate-y': [{ 'translate-y': [Ae] }],
				'skew-x': [{ 'skew-x': [Ke] }],
				'skew-y': [{ 'skew-y': [Ke] }],
				'transform-origin': [
					{
						origin: [
							'center',
							'top',
							'top-right',
							'right',
							'bottom-right',
							'bottom',
							'bottom-left',
							'left',
							'top-left',
							b
						]
					}
				],
				accent: [{ accent: ['auto', r] }],
				appearance: [{ appearance: ['none', 'auto'] }],
				cursor: [
					{
						cursor: [
							'auto',
							'default',
							'pointer',
							'wait',
							'text',
							'move',
							'help',
							'not-allowed',
							'none',
							'context-menu',
							'progress',
							'cell',
							'crosshair',
							'vertical-text',
							'alias',
							'copy',
							'no-drop',
							'grab',
							'grabbing',
							'all-scroll',
							'col-resize',
							'row-resize',
							'n-resize',
							'e-resize',
							's-resize',
							'w-resize',
							'ne-resize',
							'nw-resize',
							'se-resize',
							'sw-resize',
							'ew-resize',
							'ns-resize',
							'nesw-resize',
							'nwse-resize',
							'zoom-in',
							'zoom-out',
							b
						]
					}
				],
				'caret-color': [{ caret: [r] }],
				'pointer-events': [{ 'pointer-events': ['none', 'auto'] }],
				resize: [{ resize: ['none', 'y', 'x', ''] }],
				'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
				'scroll-m': [{ 'scroll-m': m() }],
				'scroll-mx': [{ 'scroll-mx': m() }],
				'scroll-my': [{ 'scroll-my': m() }],
				'scroll-ms': [{ 'scroll-ms': m() }],
				'scroll-me': [{ 'scroll-me': m() }],
				'scroll-mt': [{ 'scroll-mt': m() }],
				'scroll-mr': [{ 'scroll-mr': m() }],
				'scroll-mb': [{ 'scroll-mb': m() }],
				'scroll-ml': [{ 'scroll-ml': m() }],
				'scroll-p': [{ 'scroll-p': m() }],
				'scroll-px': [{ 'scroll-px': m() }],
				'scroll-py': [{ 'scroll-py': m() }],
				'scroll-ps': [{ 'scroll-ps': m() }],
				'scroll-pe': [{ 'scroll-pe': m() }],
				'scroll-pt': [{ 'scroll-pt': m() }],
				'scroll-pr': [{ 'scroll-pr': m() }],
				'scroll-pb': [{ 'scroll-pb': m() }],
				'scroll-pl': [{ 'scroll-pl': m() }],
				'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
				'snap-stop': [{ snap: ['normal', 'always'] }],
				'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
				'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
				touch: [{ touch: ['auto', 'none', 'manipulation'] }],
				'touch-x': [{ 'touch-pan': ['x', 'left', 'right'] }],
				'touch-y': [{ 'touch-pan': ['y', 'up', 'down'] }],
				'touch-pz': ['touch-pinch-zoom'],
				select: [{ select: ['none', 'text', 'all', 'auto'] }],
				'will-change': [
					{ 'will-change': ['auto', 'scroll', 'contents', 'transform', b] }
				],
				fill: [{ fill: [r, 'none'] }],
				'stroke-w': [{ stroke: [X, se, lt] }],
				stroke: [{ stroke: [r, 'none'] }],
				sr: ['sr-only', 'not-sr-only'],
				'forced-color-adjust': [{ 'forced-color-adjust': ['auto', 'none'] }]
			},
			conflictingClassGroups: {
				overflow: ['overflow-x', 'overflow-y'],
				overscroll: ['overscroll-x', 'overscroll-y'],
				inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
				'inset-x': ['right', 'left'],
				'inset-y': ['top', 'bottom'],
				flex: ['basis', 'grow', 'shrink'],
				gap: ['gap-x', 'gap-y'],
				p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
				px: ['pr', 'pl'],
				py: ['pt', 'pb'],
				m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
				mx: ['mr', 'ml'],
				my: ['mt', 'mb'],
				size: ['w', 'h'],
				'font-size': ['leading'],
				'fvn-normal': [
					'fvn-ordinal',
					'fvn-slashed-zero',
					'fvn-figure',
					'fvn-spacing',
					'fvn-fraction'
				],
				'fvn-ordinal': ['fvn-normal'],
				'fvn-slashed-zero': ['fvn-normal'],
				'fvn-figure': ['fvn-normal'],
				'fvn-spacing': ['fvn-normal'],
				'fvn-fraction': ['fvn-normal'],
				'line-clamp': ['display', 'overflow'],
				rounded: [
					'rounded-s',
					'rounded-e',
					'rounded-t',
					'rounded-r',
					'rounded-b',
					'rounded-l',
					'rounded-ss',
					'rounded-se',
					'rounded-ee',
					'rounded-es',
					'rounded-tl',
					'rounded-tr',
					'rounded-br',
					'rounded-bl'
				],
				'rounded-s': ['rounded-ss', 'rounded-es'],
				'rounded-e': ['rounded-se', 'rounded-ee'],
				'rounded-t': ['rounded-tl', 'rounded-tr'],
				'rounded-r': ['rounded-tr', 'rounded-br'],
				'rounded-b': ['rounded-br', 'rounded-bl'],
				'rounded-l': ['rounded-tl', 'rounded-bl'],
				'border-spacing': ['border-spacing-x', 'border-spacing-y'],
				'border-w': [
					'border-w-s',
					'border-w-e',
					'border-w-t',
					'border-w-r',
					'border-w-b',
					'border-w-l'
				],
				'border-w-x': ['border-w-r', 'border-w-l'],
				'border-w-y': ['border-w-t', 'border-w-b'],
				'border-color': [
					'border-color-s',
					'border-color-e',
					'border-color-t',
					'border-color-r',
					'border-color-b',
					'border-color-l'
				],
				'border-color-x': ['border-color-r', 'border-color-l'],
				'border-color-y': ['border-color-t', 'border-color-b'],
				'scroll-m': [
					'scroll-mx',
					'scroll-my',
					'scroll-ms',
					'scroll-me',
					'scroll-mt',
					'scroll-mr',
					'scroll-mb',
					'scroll-ml'
				],
				'scroll-mx': ['scroll-mr', 'scroll-ml'],
				'scroll-my': ['scroll-mt', 'scroll-mb'],
				'scroll-p': [
					'scroll-px',
					'scroll-py',
					'scroll-ps',
					'scroll-pe',
					'scroll-pt',
					'scroll-pr',
					'scroll-pb',
					'scroll-pl'
				],
				'scroll-px': ['scroll-pr', 'scroll-pl'],
				'scroll-py': ['scroll-pt', 'scroll-pb'],
				touch: ['touch-x', 'touch-y', 'touch-pz'],
				'touch-x': ['touch'],
				'touch-y': ['touch'],
				'touch-pz': ['touch']
			},
			conflictingClassGroupModifiers: { 'font-size': ['leading'] }
		};
	},
	en = (
		r,
		{
			cacheSize: e,
			prefix: t,
			separator: n,
			experimentalParseClassName: s,
			extend: a = {},
			override: o = {}
		}
	) => {
		je(r, 'cacheSize', e),
			je(r, 'prefix', t),
			je(r, 'separator', n),
			je(r, 'experimentalParseClassName', s);
		for (const i in o) tn(r[i], o[i]);
		for (const i in a) rn(r[i], a[i]);
		return r;
	},
	je = (r, e, t) => {
		t !== void 0 && (r[e] = t);
	},
	tn = (r, e) => {
		if (e) for (const t in e) je(r, t, e[t]);
	},
	rn = (r, e) => {
		if (e)
			for (const t in e) {
				const n = e[t];
				n !== void 0 && (r[t] = (r[t] || []).concat(n));
			}
	},
	nn = (r, ...e) =>
		typeof r == 'function' ? mt(gt, r, ...e) : mt(() => en(gt(), r), ...e),
	Kt = mt(gt);
var sn = { twMerge: !0, twMergeConfig: {}, responsiveVariants: !1 },
	Xt = (r) => r || void 0,
	ze = (...r) => Xt(Bt(r).filter(Boolean).join(' ')),
	dt = null,
	ee = {},
	yt = !1,
	Ee =
		(...r) =>
		(e) =>
			e.twMerge
				? ((!dt || yt) &&
						((yt = !1),
						(dt = B(ee)
							? Kt
							: nn({
									...ee,
									extend: {
										theme: ee.theme,
										classGroups: ee.classGroups,
										conflictingClassGroupModifiers: ee.conflictingClassGroupModifiers,
										conflictingClassGroups: ee.conflictingClassGroups,
										...ee.extend
									}
								}))),
					Xt(dt(ze(r))))
				: ze(r),
	Mt = (r, e) => {
		for (let t in e) r.hasOwnProperty(t) ? (r[t] = ze(r[t], e[t])) : (r[t] = e[t]);
		return r;
	},
	an = (r, e) => {
		let {
				extend: t = null,
				slots: n = {},
				variants: s = {},
				compoundVariants: a = [],
				compoundSlots: o = [],
				defaultVariants: i = {}
			} = r,
			c = { ...sn, ...e },
			l =
				t != null && t.base
					? ze(t.base, r == null ? void 0 : r.base)
					: r == null
						? void 0
						: r.base,
			u = t != null && t.variants && !B(t.variants) ? Gt(s, t.variants) : s,
			k =
				t != null && t.defaultVariants && !B(t.defaultVariants)
					? { ...t.defaultVariants, ...i }
					: i;
		!B(c.twMergeConfig) &&
			!Tr(c.twMergeConfig, ee) &&
			((yt = !0), (ee = c.twMergeConfig));
		let R = B(t == null ? void 0 : t.slots),
			Z = B(n)
				? {}
				: {
						base: ze(r == null ? void 0 : r.base, R && (t == null ? void 0 : t.base)),
						...n
					},
			P = R
				? Z
				: Mt(
						{ ...(t == null ? void 0 : t.slots) },
						B(Z) ? { base: r == null ? void 0 : r.base } : Z
					),
			O = B(t == null ? void 0 : t.compoundVariants)
				? a
				: Ft(t == null ? void 0 : t.compoundVariants, a),
			x = (N) => {
				if (B(u) && B(n) && R)
					return Ee(
						l,
						N == null ? void 0 : N.class,
						N == null ? void 0 : N.className
					)(c);
				if (O && !Array.isArray(O))
					throw new TypeError(
						`The "compoundVariants" prop must be an array. Received: ${typeof O}`
					);
				if (o && !Array.isArray(o))
					throw new TypeError(
						`The "compoundSlots" prop must be an array. Received: ${typeof o}`
					);
				let de = (m, T, w = [], S) => {
						let C = w;
						if (typeof T == 'string')
							C = C.concat(
								Et(T)
									.split(' ')
									.map((E) => `${m}:${E}`)
							);
						else if (Array.isArray(T))
							C = C.concat(T.reduce((E, j) => E.concat(`${m}:${j}`), []));
						else if (typeof T == 'object' && typeof S == 'string') {
							for (let E in T)
								if (T.hasOwnProperty(E) && E === S) {
									let j = T[E];
									if (j && typeof j == 'string') {
										let I = Et(j);
										C[S]
											? (C[S] = C[S].concat(I.split(' ').map(($) => `${m}:${$}`)))
											: (C[S] = I.split(' ').map(($) => `${m}:${$}`));
									} else
										Array.isArray(j) &&
											j.length > 0 &&
											(C[S] = j.reduce((I, $) => I.concat(`${m}:${$}`), []));
								}
						}
						return C;
					},
					J = (m, T = u, w = null, S = null) => {
						var C;
						let E = T[m];
						if (!E || B(E)) return null;
						let j =
							(C = S == null ? void 0 : S[m]) != null ? C : N == null ? void 0 : N[m];
						if (j === null) return null;
						let I = Ot(j),
							$ =
								(Array.isArray(c.responsiveVariants) &&
									c.responsiveVariants.length > 0) ||
								c.responsiveVariants === !0,
							U = k == null ? void 0 : k[m],
							ne = [];
						if (typeof I == 'object' && $)
							for (let [ot, Tt] of Object.entries(I)) {
								let dr = E[Tt];
								if (ot === 'initial') {
									U = Tt;
									continue;
								}
								(Array.isArray(c.responsiveVariants) &&
									!c.responsiveVariants.includes(ot)) ||
									(ne = de(ot, dr, ne, w));
							}
						let lr = I != null && typeof I != 'object' ? I : Ot(U),
							it = E[lr || 'false'];
						return typeof ne == 'object' && typeof w == 'string' && ne[w]
							? Mt(ne, it)
							: ne.length > 0
								? (ne.push(it), ne)
								: it;
					},
					me = () => (u ? Object.keys(u).map((m) => J(m, u)) : null),
					Ke = (m, T) => {
						if (!u || typeof u != 'object') return null;
						let w = new Array();
						for (let S in u) {
							let C = J(S, u, m, T),
								E = m === 'base' && typeof C == 'string' ? C : C && C[m];
							E && (w[w.length] = E);
						}
						return w;
					},
					Ce = {};
				for (let m in N) N[m] !== void 0 && (Ce[m] = N[m]);
				let Ae = (m, T) => {
						var w;
						let S =
							typeof (N == null ? void 0 : N[m]) == 'object'
								? { [m]: (w = N[m]) == null ? void 0 : w.initial }
								: {};
						return { ...k, ...Ce, ...S, ...T };
					},
					ge = (m = [], T) => {
						let w = [];
						for (let { class: S, className: C, ...E } of m) {
							let j = !0;
							for (let [I, $] of Object.entries(E)) {
								let U = Ae(I, T);
								if (Array.isArray($)) {
									if (!$.includes(U[I])) {
										j = !1;
										break;
									}
								} else if (U[I] !== $) {
									j = !1;
									break;
								}
							}
							j && (S && w.push(S), C && w.push(C));
						}
						return w;
					},
					Se = (m) => {
						let T = ge(O, m);
						if (!Array.isArray(T)) return T;
						let w = {};
						for (let S of T)
							if (
								(typeof S == 'string' && (w.base = Ee(w.base, S)(c)),
								typeof S == 'object')
							)
								for (let [C, E] of Object.entries(S)) w[C] = Ee(w[C], E)(c);
						return w;
					},
					Ze = (m) => {
						if (o.length < 1) return null;
						let T = {};
						for (let { slots: w = [], class: S, className: C, ...E } of o) {
							if (!B(E)) {
								let j = !0;
								for (let I of Object.keys(E)) {
									let $ = Ae(I, m)[I];
									if (
										$ === void 0 ||
										(Array.isArray(E[I]) ? !E[I].includes($) : E[I] !== $)
									) {
										j = !1;
										break;
									}
								}
								if (!j) continue;
							}
							for (let j of w) (T[j] = T[j] || []), T[j].push([S, C]);
						}
						return T;
					};
				if (!B(n) || !R) {
					let m = {};
					if (typeof P == 'object' && !B(P))
						for (let T of Object.keys(P))
							m[T] = (w) => {
								var S, C;
								return Ee(
									P[T],
									Ke(T, w),
									((S = Se(w)) != null ? S : [])[T],
									((C = Ze(w)) != null ? C : [])[T],
									w == null ? void 0 : w.class,
									w == null ? void 0 : w.className
								)(c);
							};
					return m;
				}
				return Ee(
					l,
					me(),
					ge(O),
					N == null ? void 0 : N.class,
					N == null ? void 0 : N.className
				)(c);
			},
			V = () => {
				if (!(!u || typeof u != 'object')) return Object.keys(u);
			};
		return (
			(x.variantKeys = V()),
			(x.extend = t),
			(x.base = l),
			(x.slots = P),
			(x.variants = u),
			(x.defaultVariants = k),
			(x.compoundSlots = o),
			(x.compoundVariants = O),
			x
		);
	};
function zt(...r) {
	return Kt(kr(r));
}
const Pt = an({
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
var on = Ut('<a><!></a>'),
	cn = Ut('<button><!></button>');
function Ts(r, e) {
	vr(e, !0);
	let t = Ne(e, 'variant', 3, 'default'),
		n = Ne(e, 'size', 3, 'default'),
		s = Ne(e, 'ref', 15, null),
		a = Ne(e, 'href', 3, void 0),
		o = Ne(e, 'type', 3, 'button'),
		i = wr(e, [
			'$$slots',
			'$$events',
			'$$legacy',
			'class',
			'variant',
			'size',
			'ref',
			'href',
			'type',
			'children'
		]);
	var c = ur(),
		l = br(c);
	{
		var u = (R) => {
				var Z = on();
				let P;
				var O = Ct(Z);
				Rt(O, () => e.children ?? pt),
					At(Z),
					Nt(
						Z,
						(x) => s(x),
						() => s()
					),
					St(
						(x) => (P = Zt(Z, P, { class: x, href: a(), ...i })),
						[() => zt(Pt({ variant: t(), size: n() }), e.class)]
					),
					ct(R, Z);
			},
			k = (R) => {
				var Z = cn();
				let P;
				var O = Ct(Z);
				Rt(O, () => e.children ?? pt),
					At(Z),
					Nt(
						Z,
						(x) => s(x),
						() => s()
					),
					St(
						(x) => (P = Zt(Z, P, { class: x, type: o(), ...i })),
						[() => zt(Pt({ variant: t(), size: n() }), e.class)]
					),
					ct(R, Z);
			};
		xr(l, (R) => {
			a() ? R(u) : R(k, !1);
		});
	}
	ct(r, c), _r();
}
var A;
(function (r) {
	r.assertEqual = (s) => s;
	function e(s) {}
	r.assertIs = e;
	function t(s) {
		throw new Error();
	}
	(r.assertNever = t),
		(r.arrayToEnum = (s) => {
			const a = {};
			for (const o of s) a[o] = o;
			return a;
		}),
		(r.getValidEnumValues = (s) => {
			const a = r.objectKeys(s).filter((i) => typeof s[s[i]] != 'number'),
				o = {};
			for (const i of a) o[i] = s[i];
			return r.objectValues(o);
		}),
		(r.objectValues = (s) =>
			r.objectKeys(s).map(function (a) {
				return s[a];
			})),
		(r.objectKeys =
			typeof Object.keys == 'function'
				? (s) => Object.keys(s)
				: (s) => {
						const a = [];
						for (const o in s) Object.prototype.hasOwnProperty.call(s, o) && a.push(o);
						return a;
					}),
		(r.find = (s, a) => {
			for (const o of s) if (a(o)) return o;
		}),
		(r.isInteger =
			typeof Number.isInteger == 'function'
				? (s) => Number.isInteger(s)
				: (s) => typeof s == 'number' && isFinite(s) && Math.floor(s) === s);
	function n(s, a = ' | ') {
		return s.map((o) => (typeof o == 'string' ? `'${o}'` : o)).join(a);
	}
	(r.joinValues = n),
		(r.jsonStringifyReplacer = (s, a) => (typeof a == 'bigint' ? a.toString() : a));
})(A || (A = {}));
var vt;
(function (r) {
	r.mergeShapes = (e, t) => ({ ...e, ...t });
})(vt || (vt = {}));
const p = A.arrayToEnum([
		'string',
		'nan',
		'number',
		'integer',
		'float',
		'boolean',
		'date',
		'bigint',
		'symbol',
		'function',
		'undefined',
		'null',
		'array',
		'object',
		'unknown',
		'promise',
		'void',
		'never',
		'map',
		'set'
	]),
	te = (r) => {
		switch (typeof r) {
			case 'undefined':
				return p.undefined;
			case 'string':
				return p.string;
			case 'number':
				return isNaN(r) ? p.nan : p.number;
			case 'boolean':
				return p.boolean;
			case 'function':
				return p.function;
			case 'bigint':
				return p.bigint;
			case 'symbol':
				return p.symbol;
			case 'object':
				return Array.isArray(r)
					? p.array
					: r === null
						? p.null
						: r.then &&
							  typeof r.then == 'function' &&
							  r.catch &&
							  typeof r.catch == 'function'
							? p.promise
							: typeof Map < 'u' && r instanceof Map
								? p.map
								: typeof Set < 'u' && r instanceof Set
									? p.set
									: typeof Date < 'u' && r instanceof Date
										? p.date
										: p.object;
			default:
				return p.unknown;
		}
	},
	d = A.arrayToEnum([
		'invalid_type',
		'invalid_literal',
		'custom',
		'invalid_union',
		'invalid_union_discriminator',
		'invalid_enum_value',
		'unrecognized_keys',
		'invalid_arguments',
		'invalid_return_type',
		'invalid_date',
		'invalid_string',
		'too_small',
		'too_big',
		'invalid_intersection_types',
		'not_multiple_of',
		'not_finite'
	]),
	ln = (r) => JSON.stringify(r, null, 2).replace(/"([^"]+)":/g, '$1:');
class F extends Error {
	get errors() {
		return this.issues;
	}
	constructor(e) {
		super(),
			(this.issues = []),
			(this.addIssue = (n) => {
				this.issues = [...this.issues, n];
			}),
			(this.addIssues = (n = []) => {
				this.issues = [...this.issues, ...n];
			});
		const t = new.target.prototype;
		Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : (this.__proto__ = t),
			(this.name = 'ZodError'),
			(this.issues = e);
	}
	format(e) {
		const t =
				e ||
				function (a) {
					return a.message;
				},
			n = { _errors: [] },
			s = (a) => {
				for (const o of a.issues)
					if (o.code === 'invalid_union') o.unionErrors.map(s);
					else if (o.code === 'invalid_return_type') s(o.returnTypeError);
					else if (o.code === 'invalid_arguments') s(o.argumentsError);
					else if (o.path.length === 0) n._errors.push(t(o));
					else {
						let i = n,
							c = 0;
						for (; c < o.path.length; ) {
							const l = o.path[c];
							c === o.path.length - 1
								? ((i[l] = i[l] || { _errors: [] }), i[l]._errors.push(t(o)))
								: (i[l] = i[l] || { _errors: [] }),
								(i = i[l]),
								c++;
						}
					}
			};
		return s(this), n;
	}
	static assert(e) {
		if (!(e instanceof F)) throw new Error(`Not a ZodError: ${e}`);
	}
	toString() {
		return this.message;
	}
	get message() {
		return JSON.stringify(this.issues, A.jsonStringifyReplacer, 2);
	}
	get isEmpty() {
		return this.issues.length === 0;
	}
	flatten(e = (t) => t.message) {
		const t = {},
			n = [];
		for (const s of this.issues)
			s.path.length > 0
				? ((t[s.path[0]] = t[s.path[0]] || []), t[s.path[0]].push(e(s)))
				: n.push(e(s));
		return { formErrors: n, fieldErrors: t };
	}
	get formErrors() {
		return this.flatten();
	}
}
F.create = (r) => new F(r);
const xe = (r, e) => {
	let t;
	switch (r.code) {
		case d.invalid_type:
			r.received === p.undefined
				? (t = 'Required')
				: (t = `Expected ${r.expected}, received ${r.received}`);
			break;
		case d.invalid_literal:
			t = `Invalid literal value, expected ${JSON.stringify(r.expected, A.jsonStringifyReplacer)}`;
			break;
		case d.unrecognized_keys:
			t = `Unrecognized key(s) in object: ${A.joinValues(r.keys, ', ')}`;
			break;
		case d.invalid_union:
			t = 'Invalid input';
			break;
		case d.invalid_union_discriminator:
			t = `Invalid discriminator value. Expected ${A.joinValues(r.options)}`;
			break;
		case d.invalid_enum_value:
			t = `Invalid enum value. Expected ${A.joinValues(r.options)}, received '${r.received}'`;
			break;
		case d.invalid_arguments:
			t = 'Invalid function arguments';
			break;
		case d.invalid_return_type:
			t = 'Invalid function return type';
			break;
		case d.invalid_date:
			t = 'Invalid date';
			break;
		case d.invalid_string:
			typeof r.validation == 'object'
				? 'includes' in r.validation
					? ((t = `Invalid input: must include "${r.validation.includes}"`),
						typeof r.validation.position == 'number' &&
							(t = `${t} at one or more positions greater than or equal to ${r.validation.position}`))
					: 'startsWith' in r.validation
						? (t = `Invalid input: must start with "${r.validation.startsWith}"`)
						: 'endsWith' in r.validation
							? (t = `Invalid input: must end with "${r.validation.endsWith}"`)
							: A.assertNever(r.validation)
				: r.validation !== 'regex'
					? (t = `Invalid ${r.validation}`)
					: (t = 'Invalid');
			break;
		case d.too_small:
			r.type === 'array'
				? (t = `Array must contain ${r.exact ? 'exactly' : r.inclusive ? 'at least' : 'more than'} ${r.minimum} element(s)`)
				: r.type === 'string'
					? (t = `String must contain ${r.exact ? 'exactly' : r.inclusive ? 'at least' : 'over'} ${r.minimum} character(s)`)
					: r.type === 'number'
						? (t = `Number must be ${r.exact ? 'exactly equal to ' : r.inclusive ? 'greater than or equal to ' : 'greater than '}${r.minimum}`)
						: r.type === 'date'
							? (t = `Date must be ${r.exact ? 'exactly equal to ' : r.inclusive ? 'greater than or equal to ' : 'greater than '}${new Date(Number(r.minimum))}`)
							: (t = 'Invalid input');
			break;
		case d.too_big:
			r.type === 'array'
				? (t = `Array must contain ${r.exact ? 'exactly' : r.inclusive ? 'at most' : 'less than'} ${r.maximum} element(s)`)
				: r.type === 'string'
					? (t = `String must contain ${r.exact ? 'exactly' : r.inclusive ? 'at most' : 'under'} ${r.maximum} character(s)`)
					: r.type === 'number'
						? (t = `Number must be ${r.exact ? 'exactly' : r.inclusive ? 'less than or equal to' : 'less than'} ${r.maximum}`)
						: r.type === 'bigint'
							? (t = `BigInt must be ${r.exact ? 'exactly' : r.inclusive ? 'less than or equal to' : 'less than'} ${r.maximum}`)
							: r.type === 'date'
								? (t = `Date must be ${r.exact ? 'exactly' : r.inclusive ? 'smaller than or equal to' : 'smaller than'} ${new Date(Number(r.maximum))}`)
								: (t = 'Invalid input');
			break;
		case d.custom:
			t = 'Invalid input';
			break;
		case d.invalid_intersection_types:
			t = 'Intersection results could not be merged';
			break;
		case d.not_multiple_of:
			t = `Number must be a multiple of ${r.multipleOf}`;
			break;
		case d.not_finite:
			t = 'Number must be finite';
			break;
		default:
			(t = e.defaultError), A.assertNever(r);
	}
	return { message: t };
};
let Qt = xe;
function dn(r) {
	Qt = r;
}
function Xe() {
	return Qt;
}
const Qe = (r) => {
		const { data: e, path: t, errorMaps: n, issueData: s } = r,
			a = [...t, ...(s.path || [])],
			o = { ...s, path: a };
		if (s.message !== void 0) return { ...s, path: a, message: s.message };
		let i = '';
		const c = n
			.filter((l) => !!l)
			.slice()
			.reverse();
		for (const l of c) i = l(o, { data: e, defaultError: i }).message;
		return { ...s, path: a, message: i };
	},
	un = [];
function f(r, e) {
	const t = Xe(),
		n = Qe({
			issueData: e,
			data: r.data,
			path: r.path,
			errorMaps: [
				r.common.contextualErrorMap,
				r.schemaErrorMap,
				t,
				t === xe ? void 0 : xe
			].filter((s) => !!s)
		});
	r.common.issues.push(n);
}
class L {
	constructor() {
		this.value = 'valid';
	}
	dirty() {
		this.value === 'valid' && (this.value = 'dirty');
	}
	abort() {
		this.value !== 'aborted' && (this.value = 'aborted');
	}
	static mergeArray(e, t) {
		const n = [];
		for (const s of t) {
			if (s.status === 'aborted') return y;
			s.status === 'dirty' && e.dirty(), n.push(s.value);
		}
		return { status: e.value, value: n };
	}
	static async mergeObjectAsync(e, t) {
		const n = [];
		for (const s of t) {
			const a = await s.key,
				o = await s.value;
			n.push({ key: a, value: o });
		}
		return L.mergeObjectSync(e, n);
	}
	static mergeObjectSync(e, t) {
		const n = {};
		for (const s of t) {
			const { key: a, value: o } = s;
			if (a.status === 'aborted' || o.status === 'aborted') return y;
			a.status === 'dirty' && e.dirty(),
				o.status === 'dirty' && e.dirty(),
				a.value !== '__proto__' &&
					(typeof o.value < 'u' || s.alwaysSet) &&
					(n[a.value] = o.value);
		}
		return { status: e.value, value: n };
	}
}
const y = Object.freeze({ status: 'aborted' }),
	ve = (r) => ({ status: 'dirty', value: r }),
	D = (r) => ({ status: 'valid', value: r }),
	bt = (r) => r.status === 'aborted',
	_t = (r) => r.status === 'dirty',
	fe = (r) => r.status === 'valid',
	Pe = (r) => typeof Promise < 'u' && r instanceof Promise;
function et(r, e, t, n) {
	if (typeof e == 'function' ? r !== e || !0 : !e.has(r))
		throw new TypeError(
			'Cannot read private member from an object whose class did not declare it'
		);
	return e.get(r);
}
function er(r, e, t, n, s) {
	if (typeof e == 'function' ? r !== e || !0 : !e.has(r))
		throw new TypeError(
			'Cannot write private member to an object whose class did not declare it'
		);
	return e.set(r, t), t;
}
var h;
(function (r) {
	(r.errToObj = (e) => (typeof e == 'string' ? { message: e } : e || {})),
		(r.toString = (e) => (typeof e == 'string' ? e : e == null ? void 0 : e.message));
})(h || (h = {}));
var Ie, Me;
class H {
	constructor(e, t, n, s) {
		(this._cachedPath = []),
			(this.parent = e),
			(this.data = t),
			(this._path = n),
			(this._key = s);
	}
	get path() {
		return (
			this._cachedPath.length ||
				(this._key instanceof Array
					? this._cachedPath.push(...this._path, ...this._key)
					: this._cachedPath.push(...this._path, this._key)),
			this._cachedPath
		);
	}
}
const Vt = (r, e) => {
	if (fe(e)) return { success: !0, data: e.value };
	if (!r.common.issues.length)
		throw new Error('Validation failed but no issues detected.');
	return {
		success: !1,
		get error() {
			if (this._error) return this._error;
			const t = new F(r.common.issues);
			return (this._error = t), this._error;
		}
	};
};
function v(r) {
	if (!r) return {};
	const { errorMap: e, invalid_type_error: t, required_error: n, description: s } = r;
	if (e && (t || n))
		throw new Error(
			`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`
		);
	return e
		? { errorMap: e, description: s }
		: {
				errorMap: (o, i) => {
					var c, l;
					const { message: u } = r;
					return o.code === 'invalid_enum_value'
						? { message: u ?? i.defaultError }
						: typeof i.data > 'u'
							? { message: (c = u ?? n) !== null && c !== void 0 ? c : i.defaultError }
							: o.code !== 'invalid_type'
								? { message: i.defaultError }
								: {
										message: (l = u ?? t) !== null && l !== void 0 ? l : i.defaultError
									};
				},
				description: s
			};
}
class _ {
	get description() {
		return this._def.description;
	}
	_getType(e) {
		return te(e.data);
	}
	_getOrReturnCtx(e, t) {
		return (
			t || {
				common: e.parent.common,
				data: e.data,
				parsedType: te(e.data),
				schemaErrorMap: this._def.errorMap,
				path: e.path,
				parent: e.parent
			}
		);
	}
	_processInputParams(e) {
		return {
			status: new L(),
			ctx: {
				common: e.parent.common,
				data: e.data,
				parsedType: te(e.data),
				schemaErrorMap: this._def.errorMap,
				path: e.path,
				parent: e.parent
			}
		};
	}
	_parseSync(e) {
		const t = this._parse(e);
		if (Pe(t)) throw new Error('Synchronous parse encountered promise.');
		return t;
	}
	_parseAsync(e) {
		const t = this._parse(e);
		return Promise.resolve(t);
	}
	parse(e, t) {
		const n = this.safeParse(e, t);
		if (n.success) return n.data;
		throw n.error;
	}
	safeParse(e, t) {
		var n;
		const s = {
				common: {
					issues: [],
					async: (n = t == null ? void 0 : t.async) !== null && n !== void 0 ? n : !1,
					contextualErrorMap: t == null ? void 0 : t.errorMap
				},
				path: (t == null ? void 0 : t.path) || [],
				schemaErrorMap: this._def.errorMap,
				parent: null,
				data: e,
				parsedType: te(e)
			},
			a = this._parseSync({ data: e, path: s.path, parent: s });
		return Vt(s, a);
	}
	'~validate'(e) {
		var t, n;
		const s = {
			common: { issues: [], async: !!this['~standard'].async },
			path: [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data: e,
			parsedType: te(e)
		};
		if (!this['~standard'].async)
			try {
				const a = this._parseSync({ data: e, path: [], parent: s });
				return fe(a) ? { value: a.value } : { issues: s.common.issues };
			} catch (a) {
				!(
					(n =
						(t = a == null ? void 0 : a.message) === null || t === void 0
							? void 0
							: t.toLowerCase()) === null || n === void 0
				) &&
					n.includes('encountered') &&
					(this['~standard'].async = !0),
					(s.common = { issues: [], async: !0 });
			}
		return this._parseAsync({ data: e, path: [], parent: s }).then((a) =>
			fe(a) ? { value: a.value } : { issues: s.common.issues }
		);
	}
	async parseAsync(e, t) {
		const n = await this.safeParseAsync(e, t);
		if (n.success) return n.data;
		throw n.error;
	}
	async safeParseAsync(e, t) {
		const n = {
				common: {
					issues: [],
					contextualErrorMap: t == null ? void 0 : t.errorMap,
					async: !0
				},
				path: (t == null ? void 0 : t.path) || [],
				schemaErrorMap: this._def.errorMap,
				parent: null,
				data: e,
				parsedType: te(e)
			},
			s = this._parse({ data: e, path: n.path, parent: n }),
			a = await (Pe(s) ? s : Promise.resolve(s));
		return Vt(n, a);
	}
	refine(e, t) {
		const n = (s) =>
			typeof t == 'string' || typeof t > 'u'
				? { message: t }
				: typeof t == 'function'
					? t(s)
					: t;
		return this._refinement((s, a) => {
			const o = e(s),
				i = () => a.addIssue({ code: d.custom, ...n(s) });
			return typeof Promise < 'u' && o instanceof Promise
				? o.then((c) => (c ? !0 : (i(), !1)))
				: o
					? !0
					: (i(), !1);
		});
	}
	refinement(e, t) {
		return this._refinement((n, s) =>
			e(n) ? !0 : (s.addIssue(typeof t == 'function' ? t(n, s) : t), !1)
		);
	}
	_refinement(e) {
		return new q({
			schema: this,
			typeName: g.ZodEffects,
			effect: { type: 'refinement', refinement: e }
		});
	}
	superRefine(e) {
		return this._refinement(e);
	}
	constructor(e) {
		(this.spa = this.safeParseAsync),
			(this._def = e),
			(this.parse = this.parse.bind(this)),
			(this.safeParse = this.safeParse.bind(this)),
			(this.parseAsync = this.parseAsync.bind(this)),
			(this.safeParseAsync = this.safeParseAsync.bind(this)),
			(this.spa = this.spa.bind(this)),
			(this.refine = this.refine.bind(this)),
			(this.refinement = this.refinement.bind(this)),
			(this.superRefine = this.superRefine.bind(this)),
			(this.optional = this.optional.bind(this)),
			(this.nullable = this.nullable.bind(this)),
			(this.nullish = this.nullish.bind(this)),
			(this.array = this.array.bind(this)),
			(this.promise = this.promise.bind(this)),
			(this.or = this.or.bind(this)),
			(this.and = this.and.bind(this)),
			(this.transform = this.transform.bind(this)),
			(this.brand = this.brand.bind(this)),
			(this.default = this.default.bind(this)),
			(this.catch = this.catch.bind(this)),
			(this.describe = this.describe.bind(this)),
			(this.pipe = this.pipe.bind(this)),
			(this.readonly = this.readonly.bind(this)),
			(this.isNullable = this.isNullable.bind(this)),
			(this.isOptional = this.isOptional.bind(this)),
			(this['~standard'] = {
				version: 1,
				vendor: 'zod',
				validate: (t) => this['~validate'](t)
			});
	}
	optional() {
		return Y.create(this, this._def);
	}
	nullable() {
		return le.create(this, this._def);
	}
	nullish() {
		return this.nullable().optional();
	}
	array() {
		return W.create(this);
	}
	promise() {
		return ke.create(this, this._def);
	}
	or(e) {
		return Ue.create([this, e], this._def);
	}
	and(e) {
		return De.create(this, e, this._def);
	}
	transform(e) {
		return new q({
			...v(this._def),
			schema: this,
			typeName: g.ZodEffects,
			effect: { type: 'transform', transform: e }
		});
	}
	default(e) {
		const t = typeof e == 'function' ? e : () => e;
		return new qe({
			...v(this._def),
			innerType: this,
			defaultValue: t,
			typeName: g.ZodDefault
		});
	}
	brand() {
		return new kt({ typeName: g.ZodBranded, type: this, ...v(this._def) });
	}
	catch(e) {
		const t = typeof e == 'function' ? e : () => e;
		return new Je({
			...v(this._def),
			innerType: this,
			catchValue: t,
			typeName: g.ZodCatch
		});
	}
	describe(e) {
		const t = this.constructor;
		return new t({ ...this._def, description: e });
	}
	pipe(e) {
		return He.create(this, e);
	}
	readonly() {
		return Ye.create(this);
	}
	isOptional() {
		return this.safeParse(void 0).success;
	}
	isNullable() {
		return this.safeParse(null).success;
	}
}
const fn = /^c[^\s-]{8,}$/i,
	pn = /^[0-9a-z]+$/,
	hn = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
	mn =
		/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
	gn = /^[a-z0-9_-]{21}$/i,
	yn = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
	vn =
		/^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
	bn =
		/^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
	_n = '^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$';
let ut;
const xn =
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
	wn =
		/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
	kn =
		/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
	Tn =
		/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
	Cn = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
	An = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
	tr =
		'((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))',
	Sn = new RegExp(`^${tr}$`);
function rr(r) {
	let e = '[0-5]\\d';
	r.precision
		? (e = `${e}\\.\\d{${r.precision}}`)
		: r.precision == null && (e = `${e}(\\.\\d+)?`);
	const t = r.precision ? '+' : '?';
	return `([01]\\d|2[0-3]):[0-5]\\d(:${e})${t}`;
}
function Zn(r) {
	return new RegExp(`^${rr(r)}$`);
}
function nr(r) {
	let e = `${tr}T${rr(r)}`;
	const t = [];
	return (
		t.push(r.local ? 'Z?' : 'Z'),
		r.offset && t.push('([+-]\\d{2}:?\\d{2})'),
		(e = `${e}(${t.join('|')})`),
		new RegExp(`^${e}$`)
	);
}
function Nn(r, e) {
	return !!(((e === 'v4' || !e) && xn.test(r)) || ((e === 'v6' || !e) && kn.test(r)));
}
function Rn(r, e) {
	if (!yn.test(r)) return !1;
	try {
		const [t] = r.split('.'),
			n = t
				.replace(/-/g, '+')
				.replace(/_/g, '/')
				.padEnd(t.length + ((4 - (t.length % 4)) % 4), '='),
			s = JSON.parse(atob(n));
		return !(
			typeof s != 'object' ||
			s === null ||
			!s.typ ||
			!s.alg ||
			(e && s.alg !== e)
		);
	} catch {
		return !1;
	}
}
function On(r, e) {
	return !!(((e === 'v4' || !e) && wn.test(r)) || ((e === 'v6' || !e) && Tn.test(r)));
}
class G extends _ {
	_parse(e) {
		if (
			(this._def.coerce && (e.data = String(e.data)), this._getType(e) !== p.string)
		) {
			const a = this._getOrReturnCtx(e);
			return (
				f(a, { code: d.invalid_type, expected: p.string, received: a.parsedType }), y
			);
		}
		const n = new L();
		let s;
		for (const a of this._def.checks)
			if (a.kind === 'min')
				e.data.length < a.value &&
					((s = this._getOrReturnCtx(e, s)),
					f(s, {
						code: d.too_small,
						minimum: a.value,
						type: 'string',
						inclusive: !0,
						exact: !1,
						message: a.message
					}),
					n.dirty());
			else if (a.kind === 'max')
				e.data.length > a.value &&
					((s = this._getOrReturnCtx(e, s)),
					f(s, {
						code: d.too_big,
						maximum: a.value,
						type: 'string',
						inclusive: !0,
						exact: !1,
						message: a.message
					}),
					n.dirty());
			else if (a.kind === 'length') {
				const o = e.data.length > a.value,
					i = e.data.length < a.value;
				(o || i) &&
					((s = this._getOrReturnCtx(e, s)),
					o
						? f(s, {
								code: d.too_big,
								maximum: a.value,
								type: 'string',
								inclusive: !0,
								exact: !0,
								message: a.message
							})
						: i &&
							f(s, {
								code: d.too_small,
								minimum: a.value,
								type: 'string',
								inclusive: !0,
								exact: !0,
								message: a.message
							}),
					n.dirty());
			} else if (a.kind === 'email')
				bn.test(e.data) ||
					((s = this._getOrReturnCtx(e, s)),
					f(s, { validation: 'email', code: d.invalid_string, message: a.message }),
					n.dirty());
			else if (a.kind === 'emoji')
				ut || (ut = new RegExp(_n, 'u')),
					ut.test(e.data) ||
						((s = this._getOrReturnCtx(e, s)),
						f(s, { validation: 'emoji', code: d.invalid_string, message: a.message }),
						n.dirty());
			else if (a.kind === 'uuid')
				mn.test(e.data) ||
					((s = this._getOrReturnCtx(e, s)),
					f(s, { validation: 'uuid', code: d.invalid_string, message: a.message }),
					n.dirty());
			else if (a.kind === 'nanoid')
				gn.test(e.data) ||
					((s = this._getOrReturnCtx(e, s)),
					f(s, { validation: 'nanoid', code: d.invalid_string, message: a.message }),
					n.dirty());
			else if (a.kind === 'cuid')
				fn.test(e.data) ||
					((s = this._getOrReturnCtx(e, s)),
					f(s, { validation: 'cuid', code: d.invalid_string, message: a.message }),
					n.dirty());
			else if (a.kind === 'cuid2')
				pn.test(e.data) ||
					((s = this._getOrReturnCtx(e, s)),
					f(s, { validation: 'cuid2', code: d.invalid_string, message: a.message }),
					n.dirty());
			else if (a.kind === 'ulid')
				hn.test(e.data) ||
					((s = this._getOrReturnCtx(e, s)),
					f(s, { validation: 'ulid', code: d.invalid_string, message: a.message }),
					n.dirty());
			else if (a.kind === 'url')
				try {
					new URL(e.data);
				} catch {
					(s = this._getOrReturnCtx(e, s)),
						f(s, { validation: 'url', code: d.invalid_string, message: a.message }),
						n.dirty();
				}
			else
				a.kind === 'regex'
					? ((a.regex.lastIndex = 0),
						a.regex.test(e.data) ||
							((s = this._getOrReturnCtx(e, s)),
							f(s, { validation: 'regex', code: d.invalid_string, message: a.message }),
							n.dirty()))
					: a.kind === 'trim'
						? (e.data = e.data.trim())
						: a.kind === 'includes'
							? e.data.includes(a.value, a.position) ||
								((s = this._getOrReturnCtx(e, s)),
								f(s, {
									code: d.invalid_string,
									validation: { includes: a.value, position: a.position },
									message: a.message
								}),
								n.dirty())
							: a.kind === 'toLowerCase'
								? (e.data = e.data.toLowerCase())
								: a.kind === 'toUpperCase'
									? (e.data = e.data.toUpperCase())
									: a.kind === 'startsWith'
										? e.data.startsWith(a.value) ||
											((s = this._getOrReturnCtx(e, s)),
											f(s, {
												code: d.invalid_string,
												validation: { startsWith: a.value },
												message: a.message
											}),
											n.dirty())
										: a.kind === 'endsWith'
											? e.data.endsWith(a.value) ||
												((s = this._getOrReturnCtx(e, s)),
												f(s, {
													code: d.invalid_string,
													validation: { endsWith: a.value },
													message: a.message
												}),
												n.dirty())
											: a.kind === 'datetime'
												? nr(a).test(e.data) ||
													((s = this._getOrReturnCtx(e, s)),
													f(s, {
														code: d.invalid_string,
														validation: 'datetime',
														message: a.message
													}),
													n.dirty())
												: a.kind === 'date'
													? Sn.test(e.data) ||
														((s = this._getOrReturnCtx(e, s)),
														f(s, {
															code: d.invalid_string,
															validation: 'date',
															message: a.message
														}),
														n.dirty())
													: a.kind === 'time'
														? Zn(a).test(e.data) ||
															((s = this._getOrReturnCtx(e, s)),
															f(s, {
																code: d.invalid_string,
																validation: 'time',
																message: a.message
															}),
															n.dirty())
														: a.kind === 'duration'
															? vn.test(e.data) ||
																((s = this._getOrReturnCtx(e, s)),
																f(s, {
																	validation: 'duration',
																	code: d.invalid_string,
																	message: a.message
																}),
																n.dirty())
															: a.kind === 'ip'
																? Nn(e.data, a.version) ||
																	((s = this._getOrReturnCtx(e, s)),
																	f(s, {
																		validation: 'ip',
																		code: d.invalid_string,
																		message: a.message
																	}),
																	n.dirty())
																: a.kind === 'jwt'
																	? Rn(e.data, a.alg) ||
																		((s = this._getOrReturnCtx(e, s)),
																		f(s, {
																			validation: 'jwt',
																			code: d.invalid_string,
																			message: a.message
																		}),
																		n.dirty())
																	: a.kind === 'cidr'
																		? On(e.data, a.version) ||
																			((s = this._getOrReturnCtx(e, s)),
																			f(s, {
																				validation: 'cidr',
																				code: d.invalid_string,
																				message: a.message
																			}),
																			n.dirty())
																		: a.kind === 'base64'
																			? Cn.test(e.data) ||
																				((s = this._getOrReturnCtx(e, s)),
																				f(s, {
																					validation: 'base64',
																					code: d.invalid_string,
																					message: a.message
																				}),
																				n.dirty())
																			: a.kind === 'base64url'
																				? An.test(e.data) ||
																					((s = this._getOrReturnCtx(e, s)),
																					f(s, {
																						validation: 'base64url',
																						code: d.invalid_string,
																						message: a.message
																					}),
																					n.dirty())
																				: A.assertNever(a);
		return { status: n.value, value: e.data };
	}
	_regex(e, t, n) {
		return this.refinement((s) => e.test(s), {
			validation: t,
			code: d.invalid_string,
			...h.errToObj(n)
		});
	}
	_addCheck(e) {
		return new G({ ...this._def, checks: [...this._def.checks, e] });
	}
	email(e) {
		return this._addCheck({ kind: 'email', ...h.errToObj(e) });
	}
	url(e) {
		return this._addCheck({ kind: 'url', ...h.errToObj(e) });
	}
	emoji(e) {
		return this._addCheck({ kind: 'emoji', ...h.errToObj(e) });
	}
	uuid(e) {
		return this._addCheck({ kind: 'uuid', ...h.errToObj(e) });
	}
	nanoid(e) {
		return this._addCheck({ kind: 'nanoid', ...h.errToObj(e) });
	}
	cuid(e) {
		return this._addCheck({ kind: 'cuid', ...h.errToObj(e) });
	}
	cuid2(e) {
		return this._addCheck({ kind: 'cuid2', ...h.errToObj(e) });
	}
	ulid(e) {
		return this._addCheck({ kind: 'ulid', ...h.errToObj(e) });
	}
	base64(e) {
		return this._addCheck({ kind: 'base64', ...h.errToObj(e) });
	}
	base64url(e) {
		return this._addCheck({ kind: 'base64url', ...h.errToObj(e) });
	}
	jwt(e) {
		return this._addCheck({ kind: 'jwt', ...h.errToObj(e) });
	}
	ip(e) {
		return this._addCheck({ kind: 'ip', ...h.errToObj(e) });
	}
	cidr(e) {
		return this._addCheck({ kind: 'cidr', ...h.errToObj(e) });
	}
	datetime(e) {
		var t, n;
		return typeof e == 'string'
			? this._addCheck({
					kind: 'datetime',
					precision: null,
					offset: !1,
					local: !1,
					message: e
				})
			: this._addCheck({
					kind: 'datetime',
					precision:
						typeof (e == null ? void 0 : e.precision) > 'u'
							? null
							: e == null
								? void 0
								: e.precision,
					offset: (t = e == null ? void 0 : e.offset) !== null && t !== void 0 ? t : !1,
					local: (n = e == null ? void 0 : e.local) !== null && n !== void 0 ? n : !1,
					...h.errToObj(e == null ? void 0 : e.message)
				});
	}
	date(e) {
		return this._addCheck({ kind: 'date', message: e });
	}
	time(e) {
		return typeof e == 'string'
			? this._addCheck({ kind: 'time', precision: null, message: e })
			: this._addCheck({
					kind: 'time',
					precision:
						typeof (e == null ? void 0 : e.precision) > 'u'
							? null
							: e == null
								? void 0
								: e.precision,
					...h.errToObj(e == null ? void 0 : e.message)
				});
	}
	duration(e) {
		return this._addCheck({ kind: 'duration', ...h.errToObj(e) });
	}
	regex(e, t) {
		return this._addCheck({ kind: 'regex', regex: e, ...h.errToObj(t) });
	}
	includes(e, t) {
		return this._addCheck({
			kind: 'includes',
			value: e,
			position: t == null ? void 0 : t.position,
			...h.errToObj(t == null ? void 0 : t.message)
		});
	}
	startsWith(e, t) {
		return this._addCheck({ kind: 'startsWith', value: e, ...h.errToObj(t) });
	}
	endsWith(e, t) {
		return this._addCheck({ kind: 'endsWith', value: e, ...h.errToObj(t) });
	}
	min(e, t) {
		return this._addCheck({ kind: 'min', value: e, ...h.errToObj(t) });
	}
	max(e, t) {
		return this._addCheck({ kind: 'max', value: e, ...h.errToObj(t) });
	}
	length(e, t) {
		return this._addCheck({ kind: 'length', value: e, ...h.errToObj(t) });
	}
	nonempty(e) {
		return this.min(1, h.errToObj(e));
	}
	trim() {
		return new G({ ...this._def, checks: [...this._def.checks, { kind: 'trim' }] });
	}
	toLowerCase() {
		return new G({
			...this._def,
			checks: [...this._def.checks, { kind: 'toLowerCase' }]
		});
	}
	toUpperCase() {
		return new G({
			...this._def,
			checks: [...this._def.checks, { kind: 'toUpperCase' }]
		});
	}
	get isDatetime() {
		return !!this._def.checks.find((e) => e.kind === 'datetime');
	}
	get isDate() {
		return !!this._def.checks.find((e) => e.kind === 'date');
	}
	get isTime() {
		return !!this._def.checks.find((e) => e.kind === 'time');
	}
	get isDuration() {
		return !!this._def.checks.find((e) => e.kind === 'duration');
	}
	get isEmail() {
		return !!this._def.checks.find((e) => e.kind === 'email');
	}
	get isURL() {
		return !!this._def.checks.find((e) => e.kind === 'url');
	}
	get isEmoji() {
		return !!this._def.checks.find((e) => e.kind === 'emoji');
	}
	get isUUID() {
		return !!this._def.checks.find((e) => e.kind === 'uuid');
	}
	get isNANOID() {
		return !!this._def.checks.find((e) => e.kind === 'nanoid');
	}
	get isCUID() {
		return !!this._def.checks.find((e) => e.kind === 'cuid');
	}
	get isCUID2() {
		return !!this._def.checks.find((e) => e.kind === 'cuid2');
	}
	get isULID() {
		return !!this._def.checks.find((e) => e.kind === 'ulid');
	}
	get isIP() {
		return !!this._def.checks.find((e) => e.kind === 'ip');
	}
	get isCIDR() {
		return !!this._def.checks.find((e) => e.kind === 'cidr');
	}
	get isBase64() {
		return !!this._def.checks.find((e) => e.kind === 'base64');
	}
	get isBase64url() {
		return !!this._def.checks.find((e) => e.kind === 'base64url');
	}
	get minLength() {
		let e = null;
		for (const t of this._def.checks)
			t.kind === 'min' && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxLength() {
		let e = null;
		for (const t of this._def.checks)
			t.kind === 'max' && (e === null || t.value < e) && (e = t.value);
		return e;
	}
}
G.create = (r) => {
	var e;
	return new G({
		checks: [],
		typeName: g.ZodString,
		coerce: (e = r == null ? void 0 : r.coerce) !== null && e !== void 0 ? e : !1,
		...v(r)
	});
};
function En(r, e) {
	const t = (r.toString().split('.')[1] || '').length,
		n = (e.toString().split('.')[1] || '').length,
		s = t > n ? t : n,
		a = parseInt(r.toFixed(s).replace('.', '')),
		o = parseInt(e.toFixed(s).replace('.', ''));
	return (a % o) / Math.pow(10, s);
}
class ie extends _ {
	constructor() {
		super(...arguments),
			(this.min = this.gte),
			(this.max = this.lte),
			(this.step = this.multipleOf);
	}
	_parse(e) {
		if (
			(this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== p.number)
		) {
			const a = this._getOrReturnCtx(e);
			return (
				f(a, { code: d.invalid_type, expected: p.number, received: a.parsedType }), y
			);
		}
		let n;
		const s = new L();
		for (const a of this._def.checks)
			a.kind === 'int'
				? A.isInteger(e.data) ||
					((n = this._getOrReturnCtx(e, n)),
					f(n, {
						code: d.invalid_type,
						expected: 'integer',
						received: 'float',
						message: a.message
					}),
					s.dirty())
				: a.kind === 'min'
					? (a.inclusive ? e.data < a.value : e.data <= a.value) &&
						((n = this._getOrReturnCtx(e, n)),
						f(n, {
							code: d.too_small,
							minimum: a.value,
							type: 'number',
							inclusive: a.inclusive,
							exact: !1,
							message: a.message
						}),
						s.dirty())
					: a.kind === 'max'
						? (a.inclusive ? e.data > a.value : e.data >= a.value) &&
							((n = this._getOrReturnCtx(e, n)),
							f(n, {
								code: d.too_big,
								maximum: a.value,
								type: 'number',
								inclusive: a.inclusive,
								exact: !1,
								message: a.message
							}),
							s.dirty())
						: a.kind === 'multipleOf'
							? En(e.data, a.value) !== 0 &&
								((n = this._getOrReturnCtx(e, n)),
								f(n, {
									code: d.not_multiple_of,
									multipleOf: a.value,
									message: a.message
								}),
								s.dirty())
							: a.kind === 'finite'
								? Number.isFinite(e.data) ||
									((n = this._getOrReturnCtx(e, n)),
									f(n, { code: d.not_finite, message: a.message }),
									s.dirty())
								: A.assertNever(a);
		return { status: s.value, value: e.data };
	}
	gte(e, t) {
		return this.setLimit('min', e, !0, h.toString(t));
	}
	gt(e, t) {
		return this.setLimit('min', e, !1, h.toString(t));
	}
	lte(e, t) {
		return this.setLimit('max', e, !0, h.toString(t));
	}
	lt(e, t) {
		return this.setLimit('max', e, !1, h.toString(t));
	}
	setLimit(e, t, n, s) {
		return new ie({
			...this._def,
			checks: [
				...this._def.checks,
				{ kind: e, value: t, inclusive: n, message: h.toString(s) }
			]
		});
	}
	_addCheck(e) {
		return new ie({ ...this._def, checks: [...this._def.checks, e] });
	}
	int(e) {
		return this._addCheck({ kind: 'int', message: h.toString(e) });
	}
	positive(e) {
		return this._addCheck({
			kind: 'min',
			value: 0,
			inclusive: !1,
			message: h.toString(e)
		});
	}
	negative(e) {
		return this._addCheck({
			kind: 'max',
			value: 0,
			inclusive: !1,
			message: h.toString(e)
		});
	}
	nonpositive(e) {
		return this._addCheck({
			kind: 'max',
			value: 0,
			inclusive: !0,
			message: h.toString(e)
		});
	}
	nonnegative(e) {
		return this._addCheck({
			kind: 'min',
			value: 0,
			inclusive: !0,
			message: h.toString(e)
		});
	}
	multipleOf(e, t) {
		return this._addCheck({ kind: 'multipleOf', value: e, message: h.toString(t) });
	}
	finite(e) {
		return this._addCheck({ kind: 'finite', message: h.toString(e) });
	}
	safe(e) {
		return this._addCheck({
			kind: 'min',
			inclusive: !0,
			value: Number.MIN_SAFE_INTEGER,
			message: h.toString(e)
		})._addCheck({
			kind: 'max',
			inclusive: !0,
			value: Number.MAX_SAFE_INTEGER,
			message: h.toString(e)
		});
	}
	get minValue() {
		let e = null;
		for (const t of this._def.checks)
			t.kind === 'min' && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxValue() {
		let e = null;
		for (const t of this._def.checks)
			t.kind === 'max' && (e === null || t.value < e) && (e = t.value);
		return e;
	}
	get isInt() {
		return !!this._def.checks.find(
			(e) => e.kind === 'int' || (e.kind === 'multipleOf' && A.isInteger(e.value))
		);
	}
	get isFinite() {
		let e = null,
			t = null;
		for (const n of this._def.checks) {
			if (n.kind === 'finite' || n.kind === 'int' || n.kind === 'multipleOf') return !0;
			n.kind === 'min'
				? (t === null || n.value > t) && (t = n.value)
				: n.kind === 'max' && (e === null || n.value < e) && (e = n.value);
		}
		return Number.isFinite(t) && Number.isFinite(e);
	}
}
ie.create = (r) =>
	new ie({
		checks: [],
		typeName: g.ZodNumber,
		coerce: (r == null ? void 0 : r.coerce) || !1,
		...v(r)
	});
class oe extends _ {
	constructor() {
		super(...arguments), (this.min = this.gte), (this.max = this.lte);
	}
	_parse(e) {
		if (this._def.coerce)
			try {
				e.data = BigInt(e.data);
			} catch {
				return this._getInvalidInput(e);
			}
		if (this._getType(e) !== p.bigint) return this._getInvalidInput(e);
		let n;
		const s = new L();
		for (const a of this._def.checks)
			a.kind === 'min'
				? (a.inclusive ? e.data < a.value : e.data <= a.value) &&
					((n = this._getOrReturnCtx(e, n)),
					f(n, {
						code: d.too_small,
						type: 'bigint',
						minimum: a.value,
						inclusive: a.inclusive,
						message: a.message
					}),
					s.dirty())
				: a.kind === 'max'
					? (a.inclusive ? e.data > a.value : e.data >= a.value) &&
						((n = this._getOrReturnCtx(e, n)),
						f(n, {
							code: d.too_big,
							type: 'bigint',
							maximum: a.value,
							inclusive: a.inclusive,
							message: a.message
						}),
						s.dirty())
					: a.kind === 'multipleOf'
						? e.data % a.value !== BigInt(0) &&
							((n = this._getOrReturnCtx(e, n)),
							f(n, {
								code: d.not_multiple_of,
								multipleOf: a.value,
								message: a.message
							}),
							s.dirty())
						: A.assertNever(a);
		return { status: s.value, value: e.data };
	}
	_getInvalidInput(e) {
		const t = this._getOrReturnCtx(e);
		return (
			f(t, { code: d.invalid_type, expected: p.bigint, received: t.parsedType }), y
		);
	}
	gte(e, t) {
		return this.setLimit('min', e, !0, h.toString(t));
	}
	gt(e, t) {
		return this.setLimit('min', e, !1, h.toString(t));
	}
	lte(e, t) {
		return this.setLimit('max', e, !0, h.toString(t));
	}
	lt(e, t) {
		return this.setLimit('max', e, !1, h.toString(t));
	}
	setLimit(e, t, n, s) {
		return new oe({
			...this._def,
			checks: [
				...this._def.checks,
				{ kind: e, value: t, inclusive: n, message: h.toString(s) }
			]
		});
	}
	_addCheck(e) {
		return new oe({ ...this._def, checks: [...this._def.checks, e] });
	}
	positive(e) {
		return this._addCheck({
			kind: 'min',
			value: BigInt(0),
			inclusive: !1,
			message: h.toString(e)
		});
	}
	negative(e) {
		return this._addCheck({
			kind: 'max',
			value: BigInt(0),
			inclusive: !1,
			message: h.toString(e)
		});
	}
	nonpositive(e) {
		return this._addCheck({
			kind: 'max',
			value: BigInt(0),
			inclusive: !0,
			message: h.toString(e)
		});
	}
	nonnegative(e) {
		return this._addCheck({
			kind: 'min',
			value: BigInt(0),
			inclusive: !0,
			message: h.toString(e)
		});
	}
	multipleOf(e, t) {
		return this._addCheck({ kind: 'multipleOf', value: e, message: h.toString(t) });
	}
	get minValue() {
		let e = null;
		for (const t of this._def.checks)
			t.kind === 'min' && (e === null || t.value > e) && (e = t.value);
		return e;
	}
	get maxValue() {
		let e = null;
		for (const t of this._def.checks)
			t.kind === 'max' && (e === null || t.value < e) && (e = t.value);
		return e;
	}
}
oe.create = (r) => {
	var e;
	return new oe({
		checks: [],
		typeName: g.ZodBigInt,
		coerce: (e = r == null ? void 0 : r.coerce) !== null && e !== void 0 ? e : !1,
		...v(r)
	});
};
class Ve extends _ {
	_parse(e) {
		if ((this._def.coerce && (e.data = !!e.data), this._getType(e) !== p.boolean)) {
			const n = this._getOrReturnCtx(e);
			return (
				f(n, { code: d.invalid_type, expected: p.boolean, received: n.parsedType }), y
			);
		}
		return D(e.data);
	}
}
Ve.create = (r) =>
	new Ve({
		typeName: g.ZodBoolean,
		coerce: (r == null ? void 0 : r.coerce) || !1,
		...v(r)
	});
class pe extends _ {
	_parse(e) {
		if (
			(this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== p.date)
		) {
			const a = this._getOrReturnCtx(e);
			return (
				f(a, { code: d.invalid_type, expected: p.date, received: a.parsedType }), y
			);
		}
		if (isNaN(e.data.getTime())) {
			const a = this._getOrReturnCtx(e);
			return f(a, { code: d.invalid_date }), y;
		}
		const n = new L();
		let s;
		for (const a of this._def.checks)
			a.kind === 'min'
				? e.data.getTime() < a.value &&
					((s = this._getOrReturnCtx(e, s)),
					f(s, {
						code: d.too_small,
						message: a.message,
						inclusive: !0,
						exact: !1,
						minimum: a.value,
						type: 'date'
					}),
					n.dirty())
				: a.kind === 'max'
					? e.data.getTime() > a.value &&
						((s = this._getOrReturnCtx(e, s)),
						f(s, {
							code: d.too_big,
							message: a.message,
							inclusive: !0,
							exact: !1,
							maximum: a.value,
							type: 'date'
						}),
						n.dirty())
					: A.assertNever(a);
		return { status: n.value, value: new Date(e.data.getTime()) };
	}
	_addCheck(e) {
		return new pe({ ...this._def, checks: [...this._def.checks, e] });
	}
	min(e, t) {
		return this._addCheck({ kind: 'min', value: e.getTime(), message: h.toString(t) });
	}
	max(e, t) {
		return this._addCheck({ kind: 'max', value: e.getTime(), message: h.toString(t) });
	}
	get minDate() {
		let e = null;
		for (const t of this._def.checks)
			t.kind === 'min' && (e === null || t.value > e) && (e = t.value);
		return e != null ? new Date(e) : null;
	}
	get maxDate() {
		let e = null;
		for (const t of this._def.checks)
			t.kind === 'max' && (e === null || t.value < e) && (e = t.value);
		return e != null ? new Date(e) : null;
	}
}
pe.create = (r) =>
	new pe({
		checks: [],
		coerce: (r == null ? void 0 : r.coerce) || !1,
		typeName: g.ZodDate,
		...v(r)
	});
class tt extends _ {
	_parse(e) {
		if (this._getType(e) !== p.symbol) {
			const n = this._getOrReturnCtx(e);
			return (
				f(n, { code: d.invalid_type, expected: p.symbol, received: n.parsedType }), y
			);
		}
		return D(e.data);
	}
}
tt.create = (r) => new tt({ typeName: g.ZodSymbol, ...v(r) });
class $e extends _ {
	_parse(e) {
		if (this._getType(e) !== p.undefined) {
			const n = this._getOrReturnCtx(e);
			return (
				f(n, { code: d.invalid_type, expected: p.undefined, received: n.parsedType }), y
			);
		}
		return D(e.data);
	}
}
$e.create = (r) => new $e({ typeName: g.ZodUndefined, ...v(r) });
class Le extends _ {
	_parse(e) {
		if (this._getType(e) !== p.null) {
			const n = this._getOrReturnCtx(e);
			return (
				f(n, { code: d.invalid_type, expected: p.null, received: n.parsedType }), y
			);
		}
		return D(e.data);
	}
}
Le.create = (r) => new Le({ typeName: g.ZodNull, ...v(r) });
class we extends _ {
	constructor() {
		super(...arguments), (this._any = !0);
	}
	_parse(e) {
		return D(e.data);
	}
}
we.create = (r) => new we({ typeName: g.ZodAny, ...v(r) });
class ue extends _ {
	constructor() {
		super(...arguments), (this._unknown = !0);
	}
	_parse(e) {
		return D(e.data);
	}
}
ue.create = (r) => new ue({ typeName: g.ZodUnknown, ...v(r) });
class re extends _ {
	_parse(e) {
		const t = this._getOrReturnCtx(e);
		return f(t, { code: d.invalid_type, expected: p.never, received: t.parsedType }), y;
	}
}
re.create = (r) => new re({ typeName: g.ZodNever, ...v(r) });
class rt extends _ {
	_parse(e) {
		if (this._getType(e) !== p.undefined) {
			const n = this._getOrReturnCtx(e);
			return (
				f(n, { code: d.invalid_type, expected: p.void, received: n.parsedType }), y
			);
		}
		return D(e.data);
	}
}
rt.create = (r) => new rt({ typeName: g.ZodVoid, ...v(r) });
class W extends _ {
	_parse(e) {
		const { ctx: t, status: n } = this._processInputParams(e),
			s = this._def;
		if (t.parsedType !== p.array)
			return (
				f(t, { code: d.invalid_type, expected: p.array, received: t.parsedType }), y
			);
		if (s.exactLength !== null) {
			const o = t.data.length > s.exactLength.value,
				i = t.data.length < s.exactLength.value;
			(o || i) &&
				(f(t, {
					code: o ? d.too_big : d.too_small,
					minimum: i ? s.exactLength.value : void 0,
					maximum: o ? s.exactLength.value : void 0,
					type: 'array',
					inclusive: !0,
					exact: !0,
					message: s.exactLength.message
				}),
				n.dirty());
		}
		if (
			(s.minLength !== null &&
				t.data.length < s.minLength.value &&
				(f(t, {
					code: d.too_small,
					minimum: s.minLength.value,
					type: 'array',
					inclusive: !0,
					exact: !1,
					message: s.minLength.message
				}),
				n.dirty()),
			s.maxLength !== null &&
				t.data.length > s.maxLength.value &&
				(f(t, {
					code: d.too_big,
					maximum: s.maxLength.value,
					type: 'array',
					inclusive: !0,
					exact: !1,
					message: s.maxLength.message
				}),
				n.dirty()),
			t.common.async)
		)
			return Promise.all(
				[...t.data].map((o, i) => s.type._parseAsync(new H(t, o, t.path, i)))
			).then((o) => L.mergeArray(n, o));
		const a = [...t.data].map((o, i) => s.type._parseSync(new H(t, o, t.path, i)));
		return L.mergeArray(n, a);
	}
	get element() {
		return this._def.type;
	}
	min(e, t) {
		return new W({ ...this._def, minLength: { value: e, message: h.toString(t) } });
	}
	max(e, t) {
		return new W({ ...this._def, maxLength: { value: e, message: h.toString(t) } });
	}
	length(e, t) {
		return new W({ ...this._def, exactLength: { value: e, message: h.toString(t) } });
	}
	nonempty(e) {
		return this.min(1, e);
	}
}
W.create = (r, e) =>
	new W({
		type: r,
		minLength: null,
		maxLength: null,
		exactLength: null,
		typeName: g.ZodArray,
		...v(e)
	});
function ye(r) {
	if (r instanceof z) {
		const e = {};
		for (const t in r.shape) {
			const n = r.shape[t];
			e[t] = Y.create(ye(n));
		}
		return new z({ ...r._def, shape: () => e });
	} else
		return r instanceof W
			? new W({ ...r._def, type: ye(r.element) })
			: r instanceof Y
				? Y.create(ye(r.unwrap()))
				: r instanceof le
					? le.create(ye(r.unwrap()))
					: r instanceof K
						? K.create(r.items.map((e) => ye(e)))
						: r;
}
class z extends _ {
	constructor() {
		super(...arguments),
			(this._cached = null),
			(this.nonstrict = this.passthrough),
			(this.augment = this.extend);
	}
	_getCached() {
		if (this._cached !== null) return this._cached;
		const e = this._def.shape(),
			t = A.objectKeys(e);
		return (this._cached = { shape: e, keys: t });
	}
	_parse(e) {
		if (this._getType(e) !== p.object) {
			const l = this._getOrReturnCtx(e);
			return (
				f(l, { code: d.invalid_type, expected: p.object, received: l.parsedType }), y
			);
		}
		const { status: n, ctx: s } = this._processInputParams(e),
			{ shape: a, keys: o } = this._getCached(),
			i = [];
		if (!(this._def.catchall instanceof re && this._def.unknownKeys === 'strip'))
			for (const l in s.data) o.includes(l) || i.push(l);
		const c = [];
		for (const l of o) {
			const u = a[l],
				k = s.data[l];
			c.push({
				key: { status: 'valid', value: l },
				value: u._parse(new H(s, k, s.path, l)),
				alwaysSet: l in s.data
			});
		}
		if (this._def.catchall instanceof re) {
			const l = this._def.unknownKeys;
			if (l === 'passthrough')
				for (const u of i)
					c.push({
						key: { status: 'valid', value: u },
						value: { status: 'valid', value: s.data[u] }
					});
			else if (l === 'strict')
				i.length > 0 && (f(s, { code: d.unrecognized_keys, keys: i }), n.dirty());
			else if (l !== 'strip')
				throw new Error('Internal ZodObject error: invalid unknownKeys value.');
		} else {
			const l = this._def.catchall;
			for (const u of i) {
				const k = s.data[u];
				c.push({
					key: { status: 'valid', value: u },
					value: l._parse(new H(s, k, s.path, u)),
					alwaysSet: u in s.data
				});
			}
		}
		return s.common.async
			? Promise.resolve()
					.then(async () => {
						const l = [];
						for (const u of c) {
							const k = await u.key,
								R = await u.value;
							l.push({ key: k, value: R, alwaysSet: u.alwaysSet });
						}
						return l;
					})
					.then((l) => L.mergeObjectSync(n, l))
			: L.mergeObjectSync(n, c);
	}
	get shape() {
		return this._def.shape();
	}
	strict(e) {
		return (
			h.errToObj,
			new z({
				...this._def,
				unknownKeys: 'strict',
				...(e !== void 0
					? {
							errorMap: (t, n) => {
								var s, a, o, i;
								const c =
									(o =
										(a = (s = this._def).errorMap) === null || a === void 0
											? void 0
											: a.call(s, t, n).message) !== null && o !== void 0
										? o
										: n.defaultError;
								return t.code === 'unrecognized_keys'
									? {
											message:
												(i = h.errToObj(e).message) !== null && i !== void 0 ? i : c
										}
									: { message: c };
							}
						}
					: {})
			})
		);
	}
	strip() {
		return new z({ ...this._def, unknownKeys: 'strip' });
	}
	passthrough() {
		return new z({ ...this._def, unknownKeys: 'passthrough' });
	}
	extend(e) {
		return new z({ ...this._def, shape: () => ({ ...this._def.shape(), ...e }) });
	}
	merge(e) {
		return new z({
			unknownKeys: e._def.unknownKeys,
			catchall: e._def.catchall,
			shape: () => ({ ...this._def.shape(), ...e._def.shape() }),
			typeName: g.ZodObject
		});
	}
	setKey(e, t) {
		return this.augment({ [e]: t });
	}
	catchall(e) {
		return new z({ ...this._def, catchall: e });
	}
	pick(e) {
		const t = {};
		return (
			A.objectKeys(e).forEach((n) => {
				e[n] && this.shape[n] && (t[n] = this.shape[n]);
			}),
			new z({ ...this._def, shape: () => t })
		);
	}
	omit(e) {
		const t = {};
		return (
			A.objectKeys(this.shape).forEach((n) => {
				e[n] || (t[n] = this.shape[n]);
			}),
			new z({ ...this._def, shape: () => t })
		);
	}
	deepPartial() {
		return ye(this);
	}
	partial(e) {
		const t = {};
		return (
			A.objectKeys(this.shape).forEach((n) => {
				const s = this.shape[n];
				e && !e[n] ? (t[n] = s) : (t[n] = s.optional());
			}),
			new z({ ...this._def, shape: () => t })
		);
	}
	required(e) {
		const t = {};
		return (
			A.objectKeys(this.shape).forEach((n) => {
				if (e && !e[n]) t[n] = this.shape[n];
				else {
					let a = this.shape[n];
					for (; a instanceof Y; ) a = a._def.innerType;
					t[n] = a;
				}
			}),
			new z({ ...this._def, shape: () => t })
		);
	}
	keyof() {
		return sr(A.objectKeys(this.shape));
	}
}
z.create = (r, e) =>
	new z({
		shape: () => r,
		unknownKeys: 'strip',
		catchall: re.create(),
		typeName: g.ZodObject,
		...v(e)
	});
z.strictCreate = (r, e) =>
	new z({
		shape: () => r,
		unknownKeys: 'strict',
		catchall: re.create(),
		typeName: g.ZodObject,
		...v(e)
	});
z.lazycreate = (r, e) =>
	new z({
		shape: r,
		unknownKeys: 'strip',
		catchall: re.create(),
		typeName: g.ZodObject,
		...v(e)
	});
class Ue extends _ {
	_parse(e) {
		const { ctx: t } = this._processInputParams(e),
			n = this._def.options;
		function s(a) {
			for (const i of a) if (i.result.status === 'valid') return i.result;
			for (const i of a)
				if (i.result.status === 'dirty')
					return t.common.issues.push(...i.ctx.common.issues), i.result;
			const o = a.map((i) => new F(i.ctx.common.issues));
			return f(t, { code: d.invalid_union, unionErrors: o }), y;
		}
		if (t.common.async)
			return Promise.all(
				n.map(async (a) => {
					const o = { ...t, common: { ...t.common, issues: [] }, parent: null };
					return {
						result: await a._parseAsync({ data: t.data, path: t.path, parent: o }),
						ctx: o
					};
				})
			).then(s);
		{
			let a;
			const o = [];
			for (const c of n) {
				const l = { ...t, common: { ...t.common, issues: [] }, parent: null },
					u = c._parseSync({ data: t.data, path: t.path, parent: l });
				if (u.status === 'valid') return u;
				u.status === 'dirty' && !a && (a = { result: u, ctx: l }),
					l.common.issues.length && o.push(l.common.issues);
			}
			if (a) return t.common.issues.push(...a.ctx.common.issues), a.result;
			const i = o.map((c) => new F(c));
			return f(t, { code: d.invalid_union, unionErrors: i }), y;
		}
	}
	get options() {
		return this._def.options;
	}
}
Ue.create = (r, e) => new Ue({ options: r, typeName: g.ZodUnion, ...v(e) });
const Q = (r) =>
	r instanceof Fe
		? Q(r.schema)
		: r instanceof q
			? Q(r.innerType())
			: r instanceof Ge
				? [r.value]
				: r instanceof ce
					? r.options
					: r instanceof We
						? A.objectValues(r.enum)
						: r instanceof qe
							? Q(r._def.innerType)
							: r instanceof $e
								? [void 0]
								: r instanceof Le
									? [null]
									: r instanceof Y
										? [void 0, ...Q(r.unwrap())]
										: r instanceof le
											? [null, ...Q(r.unwrap())]
											: r instanceof kt || r instanceof Ye
												? Q(r.unwrap())
												: r instanceof Je
													? Q(r._def.innerType)
													: [];
class at extends _ {
	_parse(e) {
		const { ctx: t } = this._processInputParams(e);
		if (t.parsedType !== p.object)
			return (
				f(t, { code: d.invalid_type, expected: p.object, received: t.parsedType }), y
			);
		const n = this.discriminator,
			s = t.data[n],
			a = this.optionsMap.get(s);
		return a
			? t.common.async
				? a._parseAsync({ data: t.data, path: t.path, parent: t })
				: a._parseSync({ data: t.data, path: t.path, parent: t })
			: (f(t, {
					code: d.invalid_union_discriminator,
					options: Array.from(this.optionsMap.keys()),
					path: [n]
				}),
				y);
	}
	get discriminator() {
		return this._def.discriminator;
	}
	get options() {
		return this._def.options;
	}
	get optionsMap() {
		return this._def.optionsMap;
	}
	static create(e, t, n) {
		const s = new Map();
		for (const a of t) {
			const o = Q(a.shape[e]);
			if (!o.length)
				throw new Error(
					`A discriminator value for key \`${e}\` could not be extracted from all schema options`
				);
			for (const i of o) {
				if (s.has(i))
					throw new Error(
						`Discriminator property ${String(e)} has duplicate value ${String(i)}`
					);
				s.set(i, a);
			}
		}
		return new at({
			typeName: g.ZodDiscriminatedUnion,
			discriminator: e,
			options: t,
			optionsMap: s,
			...v(n)
		});
	}
}
function xt(r, e) {
	const t = te(r),
		n = te(e);
	if (r === e) return { valid: !0, data: r };
	if (t === p.object && n === p.object) {
		const s = A.objectKeys(e),
			a = A.objectKeys(r).filter((i) => s.indexOf(i) !== -1),
			o = { ...r, ...e };
		for (const i of a) {
			const c = xt(r[i], e[i]);
			if (!c.valid) return { valid: !1 };
			o[i] = c.data;
		}
		return { valid: !0, data: o };
	} else if (t === p.array && n === p.array) {
		if (r.length !== e.length) return { valid: !1 };
		const s = [];
		for (let a = 0; a < r.length; a++) {
			const o = r[a],
				i = e[a],
				c = xt(o, i);
			if (!c.valid) return { valid: !1 };
			s.push(c.data);
		}
		return { valid: !0, data: s };
	} else
		return t === p.date && n === p.date && +r == +e
			? { valid: !0, data: r }
			: { valid: !1 };
}
class De extends _ {
	_parse(e) {
		const { status: t, ctx: n } = this._processInputParams(e),
			s = (a, o) => {
				if (bt(a) || bt(o)) return y;
				const i = xt(a.value, o.value);
				return i.valid
					? ((_t(a) || _t(o)) && t.dirty(), { status: t.value, value: i.data })
					: (f(n, { code: d.invalid_intersection_types }), y);
			};
		return n.common.async
			? Promise.all([
					this._def.left._parseAsync({ data: n.data, path: n.path, parent: n }),
					this._def.right._parseAsync({ data: n.data, path: n.path, parent: n })
				]).then(([a, o]) => s(a, o))
			: s(
					this._def.left._parseSync({ data: n.data, path: n.path, parent: n }),
					this._def.right._parseSync({ data: n.data, path: n.path, parent: n })
				);
	}
}
De.create = (r, e, t) =>
	new De({ left: r, right: e, typeName: g.ZodIntersection, ...v(t) });
class K extends _ {
	_parse(e) {
		const { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== p.array)
			return (
				f(n, { code: d.invalid_type, expected: p.array, received: n.parsedType }), y
			);
		if (n.data.length < this._def.items.length)
			return (
				f(n, {
					code: d.too_small,
					minimum: this._def.items.length,
					inclusive: !0,
					exact: !1,
					type: 'array'
				}),
				y
			);
		!this._def.rest &&
			n.data.length > this._def.items.length &&
			(f(n, {
				code: d.too_big,
				maximum: this._def.items.length,
				inclusive: !0,
				exact: !1,
				type: 'array'
			}),
			t.dirty());
		const a = [...n.data]
			.map((o, i) => {
				const c = this._def.items[i] || this._def.rest;
				return c ? c._parse(new H(n, o, n.path, i)) : null;
			})
			.filter((o) => !!o);
		return n.common.async
			? Promise.all(a).then((o) => L.mergeArray(t, o))
			: L.mergeArray(t, a);
	}
	get items() {
		return this._def.items;
	}
	rest(e) {
		return new K({ ...this._def, rest: e });
	}
}
K.create = (r, e) => {
	if (!Array.isArray(r))
		throw new Error('You must pass an array of schemas to z.tuple([ ... ])');
	return new K({ items: r, typeName: g.ZodTuple, rest: null, ...v(e) });
};
class Be extends _ {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(e) {
		const { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== p.object)
			return (
				f(n, { code: d.invalid_type, expected: p.object, received: n.parsedType }), y
			);
		const s = [],
			a = this._def.keyType,
			o = this._def.valueType;
		for (const i in n.data)
			s.push({
				key: a._parse(new H(n, i, n.path, i)),
				value: o._parse(new H(n, n.data[i], n.path, i)),
				alwaysSet: i in n.data
			});
		return n.common.async ? L.mergeObjectAsync(t, s) : L.mergeObjectSync(t, s);
	}
	get element() {
		return this._def.valueType;
	}
	static create(e, t, n) {
		return t instanceof _
			? new Be({ keyType: e, valueType: t, typeName: g.ZodRecord, ...v(n) })
			: new Be({ keyType: G.create(), valueType: e, typeName: g.ZodRecord, ...v(t) });
	}
}
class nt extends _ {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(e) {
		const { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== p.map)
			return f(n, { code: d.invalid_type, expected: p.map, received: n.parsedType }), y;
		const s = this._def.keyType,
			a = this._def.valueType,
			o = [...n.data.entries()].map(([i, c], l) => ({
				key: s._parse(new H(n, i, n.path, [l, 'key'])),
				value: a._parse(new H(n, c, n.path, [l, 'value']))
			}));
		if (n.common.async) {
			const i = new Map();
			return Promise.resolve().then(async () => {
				for (const c of o) {
					const l = await c.key,
						u = await c.value;
					if (l.status === 'aborted' || u.status === 'aborted') return y;
					(l.status === 'dirty' || u.status === 'dirty') && t.dirty(),
						i.set(l.value, u.value);
				}
				return { status: t.value, value: i };
			});
		} else {
			const i = new Map();
			for (const c of o) {
				const l = c.key,
					u = c.value;
				if (l.status === 'aborted' || u.status === 'aborted') return y;
				(l.status === 'dirty' || u.status === 'dirty') && t.dirty(),
					i.set(l.value, u.value);
			}
			return { status: t.value, value: i };
		}
	}
}
nt.create = (r, e, t) =>
	new nt({ valueType: e, keyType: r, typeName: g.ZodMap, ...v(t) });
class he extends _ {
	_parse(e) {
		const { status: t, ctx: n } = this._processInputParams(e);
		if (n.parsedType !== p.set)
			return f(n, { code: d.invalid_type, expected: p.set, received: n.parsedType }), y;
		const s = this._def;
		s.minSize !== null &&
			n.data.size < s.minSize.value &&
			(f(n, {
				code: d.too_small,
				minimum: s.minSize.value,
				type: 'set',
				inclusive: !0,
				exact: !1,
				message: s.minSize.message
			}),
			t.dirty()),
			s.maxSize !== null &&
				n.data.size > s.maxSize.value &&
				(f(n, {
					code: d.too_big,
					maximum: s.maxSize.value,
					type: 'set',
					inclusive: !0,
					exact: !1,
					message: s.maxSize.message
				}),
				t.dirty());
		const a = this._def.valueType;
		function o(c) {
			const l = new Set();
			for (const u of c) {
				if (u.status === 'aborted') return y;
				u.status === 'dirty' && t.dirty(), l.add(u.value);
			}
			return { status: t.value, value: l };
		}
		const i = [...n.data.values()].map((c, l) => a._parse(new H(n, c, n.path, l)));
		return n.common.async ? Promise.all(i).then((c) => o(c)) : o(i);
	}
	min(e, t) {
		return new he({ ...this._def, minSize: { value: e, message: h.toString(t) } });
	}
	max(e, t) {
		return new he({ ...this._def, maxSize: { value: e, message: h.toString(t) } });
	}
	size(e, t) {
		return this.min(e, t).max(e, t);
	}
	nonempty(e) {
		return this.min(1, e);
	}
}
he.create = (r, e) =>
	new he({ valueType: r, minSize: null, maxSize: null, typeName: g.ZodSet, ...v(e) });
class _e extends _ {
	constructor() {
		super(...arguments), (this.validate = this.implement);
	}
	_parse(e) {
		const { ctx: t } = this._processInputParams(e);
		if (t.parsedType !== p.function)
			return (
				f(t, { code: d.invalid_type, expected: p.function, received: t.parsedType }), y
			);
		function n(i, c) {
			return Qe({
				data: i,
				path: t.path,
				errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, Xe(), xe].filter(
					(l) => !!l
				),
				issueData: { code: d.invalid_arguments, argumentsError: c }
			});
		}
		function s(i, c) {
			return Qe({
				data: i,
				path: t.path,
				errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, Xe(), xe].filter(
					(l) => !!l
				),
				issueData: { code: d.invalid_return_type, returnTypeError: c }
			});
		}
		const a = { errorMap: t.common.contextualErrorMap },
			o = t.data;
		if (this._def.returns instanceof ke) {
			const i = this;
			return D(async function (...c) {
				const l = new F([]),
					u = await i._def.args.parseAsync(c, a).catch((Z) => {
						throw (l.addIssue(n(c, Z)), l);
					}),
					k = await Reflect.apply(o, this, u);
				return await i._def.returns._def.type.parseAsync(k, a).catch((Z) => {
					throw (l.addIssue(s(k, Z)), l);
				});
			});
		} else {
			const i = this;
			return D(function (...c) {
				const l = i._def.args.safeParse(c, a);
				if (!l.success) throw new F([n(c, l.error)]);
				const u = Reflect.apply(o, this, l.data),
					k = i._def.returns.safeParse(u, a);
				if (!k.success) throw new F([s(u, k.error)]);
				return k.data;
			});
		}
	}
	parameters() {
		return this._def.args;
	}
	returnType() {
		return this._def.returns;
	}
	args(...e) {
		return new _e({ ...this._def, args: K.create(e).rest(ue.create()) });
	}
	returns(e) {
		return new _e({ ...this._def, returns: e });
	}
	implement(e) {
		return this.parse(e);
	}
	strictImplement(e) {
		return this.parse(e);
	}
	static create(e, t, n) {
		return new _e({
			args: e || K.create([]).rest(ue.create()),
			returns: t || ue.create(),
			typeName: g.ZodFunction,
			...v(n)
		});
	}
}
class Fe extends _ {
	get schema() {
		return this._def.getter();
	}
	_parse(e) {
		const { ctx: t } = this._processInputParams(e);
		return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
	}
}
Fe.create = (r, e) => new Fe({ getter: r, typeName: g.ZodLazy, ...v(e) });
class Ge extends _ {
	_parse(e) {
		if (e.data !== this._def.value) {
			const t = this._getOrReturnCtx(e);
			return (
				f(t, { received: t.data, code: d.invalid_literal, expected: this._def.value }),
				y
			);
		}
		return { status: 'valid', value: e.data };
	}
	get value() {
		return this._def.value;
	}
}
Ge.create = (r, e) => new Ge({ value: r, typeName: g.ZodLiteral, ...v(e) });
function sr(r, e) {
	return new ce({ values: r, typeName: g.ZodEnum, ...v(e) });
}
class ce extends _ {
	constructor() {
		super(...arguments), Ie.set(this, void 0);
	}
	_parse(e) {
		if (typeof e.data != 'string') {
			const t = this._getOrReturnCtx(e),
				n = this._def.values;
			return (
				f(t, {
					expected: A.joinValues(n),
					received: t.parsedType,
					code: d.invalid_type
				}),
				y
			);
		}
		if (
			(et(this, Ie) || er(this, Ie, new Set(this._def.values)),
			!et(this, Ie).has(e.data))
		) {
			const t = this._getOrReturnCtx(e),
				n = this._def.values;
			return f(t, { received: t.data, code: d.invalid_enum_value, options: n }), y;
		}
		return D(e.data);
	}
	get options() {
		return this._def.values;
	}
	get enum() {
		const e = {};
		for (const t of this._def.values) e[t] = t;
		return e;
	}
	get Values() {
		const e = {};
		for (const t of this._def.values) e[t] = t;
		return e;
	}
	get Enum() {
		const e = {};
		for (const t of this._def.values) e[t] = t;
		return e;
	}
	extract(e, t = this._def) {
		return ce.create(e, { ...this._def, ...t });
	}
	exclude(e, t = this._def) {
		return ce.create(
			this.options.filter((n) => !e.includes(n)),
			{ ...this._def, ...t }
		);
	}
}
Ie = new WeakMap();
ce.create = sr;
class We extends _ {
	constructor() {
		super(...arguments), Me.set(this, void 0);
	}
	_parse(e) {
		const t = A.getValidEnumValues(this._def.values),
			n = this._getOrReturnCtx(e);
		if (n.parsedType !== p.string && n.parsedType !== p.number) {
			const s = A.objectValues(t);
			return (
				f(n, {
					expected: A.joinValues(s),
					received: n.parsedType,
					code: d.invalid_type
				}),
				y
			);
		}
		if (
			(et(this, Me) || er(this, Me, new Set(A.getValidEnumValues(this._def.values))),
			!et(this, Me).has(e.data))
		) {
			const s = A.objectValues(t);
			return f(n, { received: n.data, code: d.invalid_enum_value, options: s }), y;
		}
		return D(e.data);
	}
	get enum() {
		return this._def.values;
	}
}
Me = new WeakMap();
We.create = (r, e) => new We({ values: r, typeName: g.ZodNativeEnum, ...v(e) });
class ke extends _ {
	unwrap() {
		return this._def.type;
	}
	_parse(e) {
		const { ctx: t } = this._processInputParams(e);
		if (t.parsedType !== p.promise && t.common.async === !1)
			return (
				f(t, { code: d.invalid_type, expected: p.promise, received: t.parsedType }), y
			);
		const n = t.parsedType === p.promise ? t.data : Promise.resolve(t.data);
		return D(
			n.then((s) =>
				this._def.type.parseAsync(s, {
					path: t.path,
					errorMap: t.common.contextualErrorMap
				})
			)
		);
	}
}
ke.create = (r, e) => new ke({ type: r, typeName: g.ZodPromise, ...v(e) });
class q extends _ {
	innerType() {
		return this._def.schema;
	}
	sourceType() {
		return this._def.schema._def.typeName === g.ZodEffects
			? this._def.schema.sourceType()
			: this._def.schema;
	}
	_parse(e) {
		const { status: t, ctx: n } = this._processInputParams(e),
			s = this._def.effect || null,
			a = {
				addIssue: (o) => {
					f(n, o), o.fatal ? t.abort() : t.dirty();
				},
				get path() {
					return n.path;
				}
			};
		if (((a.addIssue = a.addIssue.bind(a)), s.type === 'preprocess')) {
			const o = s.transform(n.data, a);
			if (n.common.async)
				return Promise.resolve(o).then(async (i) => {
					if (t.value === 'aborted') return y;
					const c = await this._def.schema._parseAsync({
						data: i,
						path: n.path,
						parent: n
					});
					return c.status === 'aborted'
						? y
						: c.status === 'dirty' || t.value === 'dirty'
							? ve(c.value)
							: c;
				});
			{
				if (t.value === 'aborted') return y;
				const i = this._def.schema._parseSync({ data: o, path: n.path, parent: n });
				return i.status === 'aborted'
					? y
					: i.status === 'dirty' || t.value === 'dirty'
						? ve(i.value)
						: i;
			}
		}
		if (s.type === 'refinement') {
			const o = (i) => {
				const c = s.refinement(i, a);
				if (n.common.async) return Promise.resolve(c);
				if (c instanceof Promise)
					throw new Error(
						'Async refinement encountered during synchronous parse operation. Use .parseAsync instead.'
					);
				return i;
			};
			if (n.common.async === !1) {
				const i = this._def.schema._parseSync({
					data: n.data,
					path: n.path,
					parent: n
				});
				return i.status === 'aborted'
					? y
					: (i.status === 'dirty' && t.dirty(),
						o(i.value),
						{ status: t.value, value: i.value });
			} else
				return this._def.schema
					._parseAsync({ data: n.data, path: n.path, parent: n })
					.then((i) =>
						i.status === 'aborted'
							? y
							: (i.status === 'dirty' && t.dirty(),
								o(i.value).then(() => ({ status: t.value, value: i.value })))
					);
		}
		if (s.type === 'transform')
			if (n.common.async === !1) {
				const o = this._def.schema._parseSync({
					data: n.data,
					path: n.path,
					parent: n
				});
				if (!fe(o)) return o;
				const i = s.transform(o.value, a);
				if (i instanceof Promise)
					throw new Error(
						'Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.'
					);
				return { status: t.value, value: i };
			} else
				return this._def.schema
					._parseAsync({ data: n.data, path: n.path, parent: n })
					.then((o) =>
						fe(o)
							? Promise.resolve(s.transform(o.value, a)).then((i) => ({
									status: t.value,
									value: i
								}))
							: o
					);
		A.assertNever(s);
	}
}
q.create = (r, e, t) =>
	new q({ schema: r, typeName: g.ZodEffects, effect: e, ...v(t) });
q.createWithPreprocess = (r, e, t) =>
	new q({
		schema: e,
		effect: { type: 'preprocess', transform: r },
		typeName: g.ZodEffects,
		...v(t)
	});
class Y extends _ {
	_parse(e) {
		return this._getType(e) === p.undefined ? D(void 0) : this._def.innerType._parse(e);
	}
	unwrap() {
		return this._def.innerType;
	}
}
Y.create = (r, e) => new Y({ innerType: r, typeName: g.ZodOptional, ...v(e) });
class le extends _ {
	_parse(e) {
		return this._getType(e) === p.null ? D(null) : this._def.innerType._parse(e);
	}
	unwrap() {
		return this._def.innerType;
	}
}
le.create = (r, e) => new le({ innerType: r, typeName: g.ZodNullable, ...v(e) });
class qe extends _ {
	_parse(e) {
		const { ctx: t } = this._processInputParams(e);
		let n = t.data;
		return (
			t.parsedType === p.undefined && (n = this._def.defaultValue()),
			this._def.innerType._parse({ data: n, path: t.path, parent: t })
		);
	}
	removeDefault() {
		return this._def.innerType;
	}
}
qe.create = (r, e) =>
	new qe({
		innerType: r,
		typeName: g.ZodDefault,
		defaultValue: typeof e.default == 'function' ? e.default : () => e.default,
		...v(e)
	});
class Je extends _ {
	_parse(e) {
		const { ctx: t } = this._processInputParams(e),
			n = { ...t, common: { ...t.common, issues: [] } },
			s = this._def.innerType._parse({ data: n.data, path: n.path, parent: { ...n } });
		return Pe(s)
			? s.then((a) => ({
					status: 'valid',
					value:
						a.status === 'valid'
							? a.value
							: this._def.catchValue({
									get error() {
										return new F(n.common.issues);
									},
									input: n.data
								})
				}))
			: {
					status: 'valid',
					value:
						s.status === 'valid'
							? s.value
							: this._def.catchValue({
									get error() {
										return new F(n.common.issues);
									},
									input: n.data
								})
				};
	}
	removeCatch() {
		return this._def.innerType;
	}
}
Je.create = (r, e) =>
	new Je({
		innerType: r,
		typeName: g.ZodCatch,
		catchValue: typeof e.catch == 'function' ? e.catch : () => e.catch,
		...v(e)
	});
class st extends _ {
	_parse(e) {
		if (this._getType(e) !== p.nan) {
			const n = this._getOrReturnCtx(e);
			return f(n, { code: d.invalid_type, expected: p.nan, received: n.parsedType }), y;
		}
		return { status: 'valid', value: e.data };
	}
}
st.create = (r) => new st({ typeName: g.ZodNaN, ...v(r) });
const jn = Symbol('zod_brand');
class kt extends _ {
	_parse(e) {
		const { ctx: t } = this._processInputParams(e),
			n = t.data;
		return this._def.type._parse({ data: n, path: t.path, parent: t });
	}
	unwrap() {
		return this._def.type;
	}
}
class He extends _ {
	_parse(e) {
		const { status: t, ctx: n } = this._processInputParams(e);
		if (n.common.async)
			return (async () => {
				const a = await this._def.in._parseAsync({
					data: n.data,
					path: n.path,
					parent: n
				});
				return a.status === 'aborted'
					? y
					: a.status === 'dirty'
						? (t.dirty(), ve(a.value))
						: this._def.out._parseAsync({ data: a.value, path: n.path, parent: n });
			})();
		{
			const s = this._def.in._parseSync({ data: n.data, path: n.path, parent: n });
			return s.status === 'aborted'
				? y
				: s.status === 'dirty'
					? (t.dirty(), { status: 'dirty', value: s.value })
					: this._def.out._parseSync({ data: s.value, path: n.path, parent: n });
		}
	}
	static create(e, t) {
		return new He({ in: e, out: t, typeName: g.ZodPipeline });
	}
}
class Ye extends _ {
	_parse(e) {
		const t = this._def.innerType._parse(e),
			n = (s) => (fe(s) && (s.value = Object.freeze(s.value)), s);
		return Pe(t) ? t.then((s) => n(s)) : n(t);
	}
	unwrap() {
		return this._def.innerType;
	}
}
Ye.create = (r, e) => new Ye({ innerType: r, typeName: g.ZodReadonly, ...v(e) });
function $t(r, e) {
	const t = typeof r == 'function' ? r(e) : typeof r == 'string' ? { message: r } : r;
	return typeof t == 'string' ? { message: t } : t;
}
function ar(r, e = {}, t) {
	return r
		? we.create().superRefine((n, s) => {
				var a, o;
				const i = r(n);
				if (i instanceof Promise)
					return i.then((c) => {
						var l, u;
						if (!c) {
							const k = $t(e, n),
								R =
									(u = (l = k.fatal) !== null && l !== void 0 ? l : t) !== null &&
									u !== void 0
										? u
										: !0;
							s.addIssue({ code: 'custom', ...k, fatal: R });
						}
					});
				if (!i) {
					const c = $t(e, n),
						l =
							(o = (a = c.fatal) !== null && a !== void 0 ? a : t) !== null &&
							o !== void 0
								? o
								: !0;
					s.addIssue({ code: 'custom', ...c, fatal: l });
				}
			})
		: we.create();
}
const In = { object: z.lazycreate };
var g;
(function (r) {
	(r.ZodString = 'ZodString'),
		(r.ZodNumber = 'ZodNumber'),
		(r.ZodNaN = 'ZodNaN'),
		(r.ZodBigInt = 'ZodBigInt'),
		(r.ZodBoolean = 'ZodBoolean'),
		(r.ZodDate = 'ZodDate'),
		(r.ZodSymbol = 'ZodSymbol'),
		(r.ZodUndefined = 'ZodUndefined'),
		(r.ZodNull = 'ZodNull'),
		(r.ZodAny = 'ZodAny'),
		(r.ZodUnknown = 'ZodUnknown'),
		(r.ZodNever = 'ZodNever'),
		(r.ZodVoid = 'ZodVoid'),
		(r.ZodArray = 'ZodArray'),
		(r.ZodObject = 'ZodObject'),
		(r.ZodUnion = 'ZodUnion'),
		(r.ZodDiscriminatedUnion = 'ZodDiscriminatedUnion'),
		(r.ZodIntersection = 'ZodIntersection'),
		(r.ZodTuple = 'ZodTuple'),
		(r.ZodRecord = 'ZodRecord'),
		(r.ZodMap = 'ZodMap'),
		(r.ZodSet = 'ZodSet'),
		(r.ZodFunction = 'ZodFunction'),
		(r.ZodLazy = 'ZodLazy'),
		(r.ZodLiteral = 'ZodLiteral'),
		(r.ZodEnum = 'ZodEnum'),
		(r.ZodEffects = 'ZodEffects'),
		(r.ZodNativeEnum = 'ZodNativeEnum'),
		(r.ZodOptional = 'ZodOptional'),
		(r.ZodNullable = 'ZodNullable'),
		(r.ZodDefault = 'ZodDefault'),
		(r.ZodCatch = 'ZodCatch'),
		(r.ZodPromise = 'ZodPromise'),
		(r.ZodBranded = 'ZodBranded'),
		(r.ZodPipeline = 'ZodPipeline'),
		(r.ZodReadonly = 'ZodReadonly');
})(g || (g = {}));
const Mn = (r, e = { message: `Input not instance of ${r.name}` }) =>
		ar((t) => t instanceof r, e),
	ir = G.create,
	or = ie.create,
	zn = st.create,
	Pn = oe.create,
	cr = Ve.create,
	Vn = pe.create,
	$n = tt.create,
	Ln = $e.create,
	Un = Le.create,
	Dn = we.create,
	Bn = ue.create,
	Fn = re.create,
	Gn = rt.create,
	Wn = W.create,
	qn = z.create,
	Jn = z.strictCreate,
	Yn = Ue.create,
	Hn = at.create,
	Kn = De.create,
	Xn = K.create,
	Qn = Be.create,
	es = nt.create,
	ts = he.create,
	rs = _e.create,
	ns = Fe.create,
	ss = Ge.create,
	as = ce.create,
	is = We.create,
	os = ke.create,
	Lt = q.create,
	cs = Y.create,
	ls = le.create,
	ds = q.createWithPreprocess,
	us = He.create,
	fs = () => ir().optional(),
	ps = () => or().optional(),
	hs = () => cr().optional(),
	ms = {
		string: (r) => G.create({ ...r, coerce: !0 }),
		number: (r) => ie.create({ ...r, coerce: !0 }),
		boolean: (r) => Ve.create({ ...r, coerce: !0 }),
		bigint: (r) => oe.create({ ...r, coerce: !0 }),
		date: (r) => pe.create({ ...r, coerce: !0 })
	},
	gs = y;
var ft = Object.freeze({
	__proto__: null,
	defaultErrorMap: xe,
	setErrorMap: dn,
	getErrorMap: Xe,
	makeIssue: Qe,
	EMPTY_PATH: un,
	addIssueToContext: f,
	ParseStatus: L,
	INVALID: y,
	DIRTY: ve,
	OK: D,
	isAborted: bt,
	isDirty: _t,
	isValid: fe,
	isAsync: Pe,
	get util() {
		return A;
	},
	get objectUtil() {
		return vt;
	},
	ZodParsedType: p,
	getParsedType: te,
	ZodType: _,
	datetimeRegex: nr,
	ZodString: G,
	ZodNumber: ie,
	ZodBigInt: oe,
	ZodBoolean: Ve,
	ZodDate: pe,
	ZodSymbol: tt,
	ZodUndefined: $e,
	ZodNull: Le,
	ZodAny: we,
	ZodUnknown: ue,
	ZodNever: re,
	ZodVoid: rt,
	ZodArray: W,
	ZodObject: z,
	ZodUnion: Ue,
	ZodDiscriminatedUnion: at,
	ZodIntersection: De,
	ZodTuple: K,
	ZodRecord: Be,
	ZodMap: nt,
	ZodSet: he,
	ZodFunction: _e,
	ZodLazy: Fe,
	ZodLiteral: Ge,
	ZodEnum: ce,
	ZodNativeEnum: We,
	ZodPromise: ke,
	ZodEffects: q,
	ZodTransformer: q,
	ZodOptional: Y,
	ZodNullable: le,
	ZodDefault: qe,
	ZodCatch: Je,
	ZodNaN: st,
	BRAND: jn,
	ZodBranded: kt,
	ZodPipeline: He,
	ZodReadonly: Ye,
	custom: ar,
	Schema: _,
	ZodSchema: _,
	late: In,
	get ZodFirstPartyTypeKind() {
		return g;
	},
	coerce: ms,
	any: Dn,
	array: Wn,
	bigint: Pn,
	boolean: cr,
	date: Vn,
	discriminatedUnion: Hn,
	effect: Lt,
	enum: as,
	function: rs,
	instanceof: Mn,
	intersection: Kn,
	lazy: ns,
	literal: ss,
	map: es,
	nan: zn,
	nativeEnum: is,
	never: Fn,
	null: Un,
	nullable: ls,
	number: or,
	object: qn,
	oboolean: hs,
	onumber: ps,
	optional: cs,
	ostring: fs,
	pipeline: us,
	preprocess: ds,
	promise: os,
	record: Qn,
	set: ts,
	strictObject: Jn,
	string: ir,
	symbol: $n,
	transformer: Lt,
	tuple: Xn,
	undefined: Ln,
	union: Yn,
	unknown: Bn,
	void: Gn,
	NEVER: gs,
	ZodIssueCode: d,
	quotelessJson: ln,
	ZodError: F
});
const ys = Object.freeze(
		Object.defineProperty({ __proto__: null }, Symbol.toStringTag, { value: 'Module' })
	),
	vs = ft.object({
		APP_URL: ft
			.string({ description: 'The base URL of the application.' })
			.url()
			.default('http://localhost:5173'),
		NEWSLETTER_URL: ft
			.string({ description: 'The URL to the newsletter signup.' })
			.url()
			.default('https://newsletter.verdagraph.org/subscription/form')
	}),
	Cs = vs.parse(ys);
export { Ts as B, zt as c, Cs as e, Rt as s, ft as z };
