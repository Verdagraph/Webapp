import { u as Fo, s as Lo, m as ea } from '../chunks/7LWAmKDU.js';
import { I as $s, s as Gr, h as Mo, c as Ti, a as Xe } from '../chunks/BYaljbnY.js';
import {
	y as $n,
	Q as Ae,
	aM as Ai,
	c as Br,
	aK as Bs,
	o as Cr,
	O as Ds,
	as as Ei,
	R as Fs,
	aO as Gs,
	P as H,
	K as Hs,
	_ as I,
	V as Is,
	ar as J,
	aT as Js,
	aN as Ks,
	e as Ls,
	n as Ms,
	aj as Ns,
	Z as Pi,
	g as Rs,
	l as Si,
	t as To,
	aD as Ts,
	a as Us,
	at as V,
	a7 as Ve,
	s as Vr,
	k as Vs,
	aF as Wr,
	aL as Ws,
	aQ as Xs,
	aP as Ys,
	aS as Zs,
	T as _o,
	aC as _s,
	J as ao,
	a6 as at,
	L as bi,
	aI as co,
	C as de,
	az as et,
	u as ie,
	aA as js,
	aJ as ko,
	ak as ks,
	aG as lo,
	Y as ne,
	d as nt,
	p as oe,
	a3 as or,
	A as q,
	aR as qs,
	v as re,
	x as te,
	F as tt,
	r as we,
	U as wi,
	w as xe,
	aE as xi,
	E as y,
	h as yi,
	aH as zs
} from '../chunks/BvF3OQQc.js';
import {
	r as Oe,
	p as P,
	s as Qs,
	a as Ro,
	i as ce,
	b as qe
} from '../chunks/Bx2UGga_.js';
import '../chunks/CC_UwoEl.js';
import { d as Ci, w as Ne, g as Oi, o as _i } from '../chunks/CHDAeHIy.js';
import {
	n as Cs,
	b as F,
	h as Os,
	c as X,
	t as ae,
	d as zr
} from '../chunks/CNAEEddD.js';
import { i as ki } from '../chunks/EIGlRJae.js';
import { b as Io, c as ir } from '../chunks/jdFFtPkc.js';

var Ss = Object.defineProperty;
var Ps = Object.getPrototypeOf;
var As = Reflect.get;
var Oo = (t) => {
	throw TypeError(t);
};
var Es = (t, e, n) =>
	e in t
		? Ss(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n })
		: (t[e] = n);
var Z = (t, e, n) => Es(t, typeof e != 'symbol' ? e + '' : e, n),
	Nr = (t, e, n) => e.has(t) || Oo('Cannot ' + n);
var u = (t, e, n) => (Nr(t, e, 'read from private field'), n ? n.call(t) : e.get(t)),
	S = (t, e, n) =>
		e.has(t)
			? Oo('Cannot add the same private member more than once')
			: e instanceof WeakSet
				? e.add(t)
				: e.set(t, n),
	z = (t, e, n, r) => (
		Nr(t, e, 'write to private field'), r ? r.call(t, n) : e.set(t, n), n
	),
	he = (t, e, n) => (Nr(t, e, 'access private method'), n);
var Dr = (t, e, n, r) => ({
		set _(i) {
			z(t, e, i, n);
		},
		get _() {
			return u(t, e, r);
		}
	}),
	Co = (t, e, n) => As(Ps(t), n, e);

function ta(t, e, n) {
	we && yi();
	var r = t,
		i = Is,
		o,
		s = _s() ? Ts : ks;
	ao(() => {
		s(i, (i = e())) && (o && bi(o), (o = Cr(() => n(r))));
	}),
		we && (r = nt);
}
function No(t, e) {
	return e;
}
function na(t, e, n, r) {
	for (var i = [], o = e.length, s = 0; s < o; s++) Bs(e[s].e, i, !0);
	var a = o > 0 && i.length === 0 && n !== null;
	if (a) {
		var l = n.parentNode;
		Vs(l), l.append(n), r.clear(), We(t, e[0].prev, e[o - 1].next);
	}
	Ws(i, () => {
		for (var d = 0; d < o; d++) {
			var f = e[d];
			a || (r.delete(f.k), We(t, f.prev, f.next)), Ai(f.e, !a);
		}
	});
}
function Do(t, e, n, r, i, o = null) {
	var s = t,
		a = { flags: e, items: new Map(), first: null },
		l = (e & xi) !== 0;
	if (l) {
		var d = t;
		s = we ? Br(Rs(d)) : d.appendChild(Ms());
	}
	we && yi();
	var f = null,
		p = !1,
		g = or(() => {
			var m = n();
			return Ns(m) ? m : m == null ? [] : Si(m);
		});
	ao(() => {
		var m = y(g),
			c = m.length;
		if (p && c === 0) return;
		p = c === 0;
		let h = !1;
		if (we) {
			var v = s.data === Fs;
			v !== (c === 0) && ((s = _o()), Br(s), Vr(!1), (h = !0));
		}
		if (we) {
			for (var w = null, b, A = 0; A < c; A++) {
				if (nt.nodeType === 8 && nt.data === Ls) {
					(s = nt), (h = !0), Vr(!1);
					break;
				}
				var x = m[A],
					E = r(x, A);
				(b = Ii(nt, a, w, null, x, E, A, i, e, n)), a.items.set(E, b), (w = b);
			}
			c > 0 && Br(_o());
		}
		we || ra(m, a, s, i, e, r, n),
			o !== null &&
				(c === 0
					? f
						? wi(f)
						: (f = Cr(() => o(s)))
					: f !== null &&
						bi(f, () => {
							f = null;
						})),
			h && Vr(!0),
			y(g);
	}),
		we && (s = nt);
}
function ra(t, e, n, r, i, o, s) {
	var T, _, k, L;
	var a = (i & zs) !== 0,
		l = (i & (co | lo)) !== 0,
		d = t.length,
		f = e.items,
		p = e.first,
		g = p,
		m,
		c = null,
		h,
		v = [],
		w = [],
		b,
		A,
		x,
		E;
	if (a)
		for (E = 0; E < d; E += 1)
			(b = t[E]),
				(A = o(b, E)),
				(x = f.get(A)),
				x !== void 0 &&
					((T = x.a) == null || T.measure(), (h ?? (h = new Set())).add(x));
	for (E = 0; E < d; E += 1) {
		if (((b = t[E]), (A = o(b, E)), (x = f.get(A)), x === void 0)) {
			var W = g ? g.e.nodes_start : n;
			(c = Ii(W, e, c, c === null ? e.first : c.next, b, A, E, r, i, s)),
				f.set(A, c),
				(v = []),
				(w = []),
				(g = c.next);
			continue;
		}
		if (
			(l && oa(x, b, E, i),
			x.e.f & Wr &&
				(wi(x.e),
				a && ((_ = x.a) == null || _.unfix(), (h ?? (h = new Set())).delete(x))),
			x !== g)
		) {
			if (m !== void 0 && m.has(x)) {
				if (v.length < w.length) {
					var N = w[0],
						Y;
					c = N.prev;
					var U = v[0],
						B = v[v.length - 1];
					for (Y = 0; Y < v.length; Y += 1) zo(v[Y], N, n);
					for (Y = 0; Y < w.length; Y += 1) m.delete(w[Y]);
					We(e, U.prev, B.next),
						We(e, c, U),
						We(e, B, N),
						(g = N),
						(c = B),
						(E -= 1),
						(v = []),
						(w = []);
				} else
					m.delete(x),
						zo(x, g, n),
						We(e, x.prev, x.next),
						We(e, x, c === null ? e.first : c.next),
						We(e, c, x),
						(c = x);
				continue;
			}
			for (v = [], w = []; g !== null && g.k !== A; )
				g.e.f & Wr || (m ?? (m = new Set())).add(g), w.push(g), (g = g.next);
			if (g === null) continue;
			x = g;
		}
		v.push(x), (c = x), (g = x.next);
	}
	if (g !== null || m !== void 0) {
		for (var j = m === void 0 ? [] : Si(m); g !== null; )
			g.e.f & Wr || j.push(g), (g = g.next);
		var C = j.length;
		if (C > 0) {
			var R = i & xi && d === 0 ? n : null;
			if (a) {
				for (E = 0; E < C; E += 1) (k = j[E].a) == null || k.measure();
				for (E = 0; E < C; E += 1) (L = j[E].a) == null || L.fix();
			}
			na(e, j, R, f);
		}
	}
	a &&
		Ds(() => {
			var M;
			if (h !== void 0) for (x of h) (M = x.a) == null || M.apply();
		}),
		(To.first = e.first && e.first.e),
		(To.last = c && c.e);
}
function oa(t, e, n, r) {
	r & co && ko(t.v, e), r & lo ? ko(t.i, n) : (t.i = n);
}
function Ii(t, e, n, r, i, o, s, a, l, d) {
	var f = (l & co) !== 0,
		p = (l & Ks) === 0,
		g = f ? (p ? Pi(i) : Ve(i)) : i,
		m = l & lo ? Ve(s) : s,
		c = { i: m, v: g, k: o, a: null, e: null, prev: n, next: r };
	try {
		return (
			(c.e = Cr(() => a(t, g, m, d), we)),
			(c.e.prev = n && n.e),
			(c.e.next = r && r.e),
			n === null ? (e.first = c) : ((n.next = c), (n.e.next = c.e)),
			r !== null && ((r.prev = c), (r.e.prev = c.e)),
			c
		);
	} finally {
	}
}
function zo(t, e, n) {
	for (
		var r = t.next ? t.next.e.nodes_start : n,
			i = e ? e.e.nodes_start : n,
			o = t.e.nodes_start;
		o !== r;

	) {
		var s = Us(o);
		i.before(o), (o = s);
	}
}
function We(t, e, n) {
	e === null ? (t.first = n) : ((e.next = n), (e.e.next = n && n.e)),
		n !== null && ((n.prev = e), (n.e.prev = e && e.e));
}
function $(t, e, ...n) {
	var r = t,
		i = ne,
		o;
	ao(() => {
		i !== (i = e()) && (o && (Ai(o), (o = null)), (o = Cr(() => i(r, ...n))));
	}, Hs),
		we && (r = nt);
}
function Nt(t) {
	I(t, t.v + 1);
}
let Bo, Vo;
function Ri(t) {
	if (typeof document > 'u') return;
	clearTimeout(Bo), clearTimeout(Vo);
	const e = document.createElement('style'),
		n = document.createTextNode(`* {
     -webkit-transition: none !important;
     -moz-transition: none !important;
     -o-transition: none !important;
     -ms-transition: none !important;
     transition: none !important;
  }`);
	e.appendChild(n);
	const r = () => document.head.appendChild(e),
		i = () => document.head.removeChild(e);
	if (typeof window.getComputedStyle < 'u') {
		r(), t(), window.getComputedStyle(e).opacity, i();
		return;
	}
	if (typeof window.requestAnimationFrame < 'u') {
		r(), t(), window.requestAnimationFrame(i);
		return;
	}
	r(),
		(Bo = window.setTimeout(() => {
			t(), (Vo = window.setTimeout(i, 120));
		}, 120));
}
function Wo(t) {
	return t.filter((e) => e.length > 0);
}
const Mi = { getItem: (t) => null, setItem: (t, e) => {} },
	Ze = typeof document < 'u',
	ia = ['dark', 'light', 'system'],
	Yr = Ne('mode-watcher-mode'),
	Xr = Ne('mode-watcher-theme'),
	Fi = la(),
	qr = ua(),
	Li = Ne(void 0),
	Ni = ca(),
	uo = Ne(!0),
	Di = Ne([]),
	zi = Ne([]),
	sa = da(),
	aa = fa();
function la() {
	const t = 'system',
		e = Ze ? localStorage : Mi,
		n = e.getItem(i());
	let r = Zr(n) ? n : t;
	function i() {
		return Oi(Yr);
	}
	const { subscribe: o, set: s } = Ne(r, () => {
		if (!Ze) return;
		const l = (d) => {
			if (d.key !== i()) return;
			const f = d.newValue;
			Zr(f) ? s((r = f)) : s((r = t));
		};
		return addEventListener('storage', l), () => removeEventListener('storage', l);
	});
	function a(l) {
		s((r = l)), e.setItem(i(), r);
	}
	return { subscribe: o, set: a };
}
function ca() {
	const t = Ze ? localStorage : Mi,
		e = t.getItem(r());
	let n = e ?? '';
	function r() {
		return Oi(Xr);
	}
	const { subscribe: i, set: o } = Ne(n, () => {
		if (!Ze) return;
		const a = (l) => {
			if (l.key !== r()) return;
			const d = l.newValue;
			o(d === null ? (n = '') : (n = d));
		};
		return addEventListener('storage', a), () => removeEventListener('storage', a);
	});
	function s(a) {
		o((n = a)), t.setItem(r(), n);
	}
	return { subscribe: i, set: s };
}
function ua() {
	let e = !0;
	const { subscribe: n, set: r } = Ne(void 0, () => {
		if (!Ze) return;
		const s = (l) => {
				e && r(l.matches ? 'light' : 'dark');
			},
			a = window.matchMedia('(prefers-color-scheme: light)');
		return a.addEventListener('change', s), () => a.removeEventListener('change', s);
	});
	function i() {
		if (!Ze) return;
		const s = window.matchMedia('(prefers-color-scheme: light)');
		r(s.matches ? 'light' : 'dark');
	}
	function o(s) {
		e = s;
	}
	return { subscribe: n, query: i, tracking: o };
}
function da() {
	const { subscribe: t } = Ci([Fi, qr, Li, uo, Di, zi], ([e, n, r, i, o, s]) => {
		if (!Ze) return;
		const a = e === 'system' ? n : e,
			l = Wo(o),
			d = Wo(s);
		function f() {
			const p = document.documentElement,
				g = document.querySelector('meta[name="theme-color"]');
			a === 'light'
				? (l.length && p.classList.remove(...l),
					d.length && p.classList.add(...d),
					(p.style.colorScheme = 'light'),
					g && r && g.setAttribute('content', r.light))
				: (d.length && p.classList.remove(...d),
					l.length && p.classList.add(...l),
					(p.style.colorScheme = 'dark'),
					g && r && g.setAttribute('content', r.dark));
		}
		return i ? Ri(f) : f(), a;
	});
	return { subscribe: t };
}
function fa() {
	const { subscribe: t } = Ci([Ni, uo], ([e, n]) => {
		if (!Ze) return;
		function r() {
			document.documentElement.setAttribute('data-theme', e);
		}
		return n ? Ri(r) : r(), e;
	});
	return { subscribe: t };
}
function Zr(t) {
	return typeof t != 'string' ? !1 : ia.includes(t);
}
function ha(t) {
	Fi.set(t);
}
function ga(t) {
	Ni.set(t);
}
function Ko({
	defaultMode: t,
	themeColors: e,
	darkClassNames: n = ['dark'],
	lightClassNames: r = [],
	defaultTheme: i = ''
}) {
	const o = document.documentElement,
		s = localStorage.getItem('mode-watcher-mode') || t,
		a = localStorage.getItem('mode-watcher-theme') || i,
		l =
			s === 'light' ||
			(s === 'system' && window.matchMedia('(prefers-color-scheme: light)').matches);
	if (
		(l
			? (n.length && o.classList.remove(...n), r.length && o.classList.add(...r))
			: (r.length && o.classList.remove(...r), n.length && o.classList.add(...n)),
		(o.style.colorScheme = l ? 'light' : 'dark'),
		e)
	) {
		const d = document.querySelector('meta[name="theme-color"]');
		d && d.setAttribute('content', s === 'light' ? e.light : e.dark);
	}
	a && (o.setAttribute('data-theme', a), localStorage.setItem('mode-watcher-theme', a)),
		localStorage.setItem('mode-watcher-mode', s);
}
var ma = ae('<meta name="theme-color">'),
	pa = ae('<!> <!>', 1);
function va(t, e) {
	oe(e, !1);
	const [n, r] = Qs(),
		i = () => Ro(Yr, '$modeStorageKeyStore', n),
		o = () => Ro(Xr, '$themeStorageKeyStore', n),
		s = Pi();
	let a = P(e, 'track', 8, !0),
		l = P(e, 'defaultMode', 8, 'system'),
		d = P(e, 'themeColors', 24, () => {}),
		f = P(e, 'disableTransitions', 8, !0),
		p = P(e, 'darkClassNames', 24, () => ['dark']),
		g = P(e, 'lightClassNames', 24, () => []),
		m = P(e, 'defaultTheme', 8, ''),
		c = P(e, 'nonce', 8, ''),
		h = P(e, 'themeStorageKey', 8, 'mode-watcher-theme'),
		v = P(e, 'modeStorageKey', 8, 'mode-watcher-mode');
	_i(() => {
		const b = sa.subscribe(() => {}),
			A = aa.subscribe(() => {});
		qr.tracking(a()), qr.query();
		const x = localStorage.getItem(i());
		ha(Zr(x) ? x : l());
		const E = localStorage.getItem(o());
		return (
			ga(E || m()),
			() => {
				b(), A();
			}
		);
	});
	const w = {
		defaultMode: l(),
		themeColors: d(),
		darkClassNames: p(),
		lightClassNames: g(),
		defaultTheme: m(),
		modeStorageKey: v(),
		themeStorageKey: h()
	};
	et(
		() => tt(f()),
		() => {
			uo.set(f());
		}
	),
		et(
			() => tt(d()),
			() => {
				Li.set(d());
			}
		),
		et(
			() => tt(p()),
			() => {
				Di.set(p());
			}
		),
		et(
			() => tt(g()),
			() => {
				zi.set(g());
			}
		),
		et(
			() => tt(v()),
			() => {
				Yr.set(v());
			}
		),
		et(
			() => tt(h()),
			() => {
				Xr.set(h());
			}
		),
		et(
			() => tt(c()),
			() => {
				I(s, typeof window > 'u' ? c() : '');
			}
		),
		js(),
		ki(),
		Os((b) => {
			var A = pa(),
				x = H(A);
			{
				var E = (U) => {
					var B = ma();
					Ae(() => Gr(B, 'content', d().dark)), F(U, B);
				};
				ce(x, (U) => {
					d() && U(E);
				});
			}
			var W = xe(x, 2);
			{
				var N = (U) => {
						var B = X(),
							j = H(B);
						Mo(
							j,
							() =>
								`<script nonce=${y(s)}>(` +
								Ko.toString() +
								')(' +
								JSON.stringify(w) +
								');<\/script>'
						),
							F(U, B);
					},
					Y = (U) => {
						var B = X(),
							j = H(B);
						Mo(
							j,
							() =>
								'<script>(' + Ko.toString() + ')(' + JSON.stringify(w) + ');<\/script>'
						),
							F(U, B);
					};
				ce(W, (U) => {
					y(s) ? U(N) : U(Y, !1);
				});
			}
			F(b, A);
		}),
		ie(),
		r();
}
const ya = { project: 'https://github.com/Verdagraph' };
var ba = Cs(
	'<svg viewBox="0 0 185.3 195" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><defs><clipPath clipPathUnits="userSpaceOnUse" id="b"><path style="display:inline;fill:#4db24d;fill-opacity:1;stroke-width:.264583" d="M14.2 147.4s13.3 92 78 92.5c.2 0 1.4-12.4-4.6-18-1-.7-16.8 3.4-29.7-13.3h21.2s-5-13-39.3-42.3c0-.2 48.8 15.4 60 50.9.2 1.8 0 30.1 0 30.1l5.2.1V195s-14.6-47.2-90.8-47.5zm181.6 0s-13.3 92-78 92.5c-.2 0-1.4-12.4 4.6-18 1-.7 16.8 3.4 29.7-13.3h-21.2s5-13 39.3-42.3c0-.2-48.8 15.4-60 50.9-.2 1.8 0 30.1 0 30.1l-5.2.1V195s14.6-47.2 90.8-47.5z"></path></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="c"><path style="display:inline;fill:#4db24d;fill-opacity:1;stroke-width:.264583" d="M14.2 147.4s13.3 92 78 92.5c.2 0 1.4-12.4-4.6-18-1-.7-16.8 3.4-29.7-13.3h21.2s-5-13-39.3-42.3c0-.2 48.8 15.4 60 50.9.2 1.8 0 30.1 0 30.1l5.2.1V195s-14.6-47.2-90.8-47.5zm181.6 0s-13.3 92-78 92.5c-.2 0-1.4-12.4 4.6-18 1-.7 16.8 3.4 29.7-13.3h-21.2s5-13 39.3-42.3c0-.2-48.8 15.4-60 50.9-.2 1.8 0 30.1 0 30.1l-5.2.1V195s14.6-47.2 90.8-47.5z"></path></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="a"><path d="M205 147.4a100 100 0 1 1-200 0 100 100 0 0 1 200 0zm-200 0a100 100 0 1 0 200 0 100 100 0 0 0-200 0zm0 0a100 100 0 1 0 200 0 100 100 0 0 0-200 0zm200 0a100 100 0 1 1-200 0 100 100 0 0 1 200 0z" style="display:inline;fill:#000;stroke-width:.234257"></path></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="d"><circle style="display:inline;fill:#000;stroke-width:.269395" cx="122.3" cy="167.1" r="115"></circle></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="f"><path d="M205 147.4a100 100 0 0 1-100 100 100 100 0 0 1-100-100 100 100 0 0 1 100-100 100 100 0 0 1 100 100z" style="display:inline;fill:#000;stroke-width:.234257"></path></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="e"><circle style="display:inline;fill:navy;stroke-width:.128841" cx="105" cy="147.4" r="55"></circle></clipPath></defs><g style="display:inline"><path style="display:inline;fill:#4db24d;fill-opacity:1;stroke-width:.264583" d="M14.2 147.4s13.3 92 78 92.5c.2 0 1.4-12.4-4.6-18-1-.7-16.8 3.4-29.7-13.3h21.2s-5-13-39.3-42.3c0-.2 48.8 15.4 60 50.9.2 1.8 0 30.1 0 30.1l5.2.1V195s-14.6-47.2-90.8-47.5zm181.6 0s-13.3 92-78 92.5c-.2 0-1.4-12.4 4.6-18 1-.7 16.8 3.4 29.7-13.3h-21.2s5-13 39.3-42.3c0-.2-48.8 15.4-60 50.9-.2 1.8 0 30.1 0 30.1l-5.2.1V195s14.6-47.2 90.8-47.5z" transform="translate(-12.3 -52.4)"></path><path style="display:inline;opacity:1;fill:#1f5723;fill-opacity:1;stroke-width:.264583" d="M14 156.2s25.6 78.3 77.6 73.3c1.3 0 4.4 27.4 4.4 27.4l9 .3v8.7l-78.3-37.6Zm182 0s-25.6 78.3-77.6 73.3c-1.3 0-4.4 27.4-4.4 27.4l-9 .3v8.7l78.3-37.6z" clip-path="url(#b)" transform="translate(-12.3 -52.4)"></path><path style="display:inline;opacity:1;fill:#60ce3c;fill-opacity:1;stroke-width:.264583" d="M26 147.9c-68.9-11.4 72-7.3 72.4-7.9.4-.5 6.6-.2 6.6-.2v62c-7-2.3-2.8-41.3-79-54zm158 0c68.9-11.4-72-7.3-72.4-7.9-.4-.5-6.6-.2-6.6-.2v62c7-2.3 2.8-41.3 79-54z" clip-path="url(#c)" transform="translate(-12.3 -52.4)"></path></g><g style="display:inline"><path style="display:inline;fill:red;fill-opacity:1;stroke-width:.264583" d="M78.2 147.4s11.9-13 26.8-13v29zm53.6 0s-11.9-13-26.8-13v29z" transform="translate(-12.3 -52.4)"></path><path style="display:inline;fill:red;stroke-width:.222544" d="M34.5 83.7a94.7 94.7 0 0 0-22.2 42.8l9.3 2.2a85.3 85.3 0 0 1 20.3-39zm141 0-7.4 6a85.3 85.3 0 0 1 20.3 39l9.3-2.2a94.7 94.7 0 0 0-22.2-42.8Z" transform="translate(-12.3 -52.4)"></path><path style="display:inline;fill:red;fill-opacity:1;stroke-width:.264583" d="M105 52.4a94.7 94.7 0 0 0-33.6 6.2l3.4 8.8a85.3 85.3 0 0 1 60.3 0h.1l3.4-8.8a94.7 94.7 0 0 0-33.6-6.2Z" transform="translate(-12.3 -52.4)"></path><path style="display:inline;fill:red;stroke-width:.222251" d="m77.2 61.2-5 2-4.5 2.7 10.2 18.9 2.3 4.2 2.1 4 7-3.4a84.4 84.4 0 0 1 22.5-6.2L110.5 73A94.9 94.9 0 0 0 85.2 80zm90 0L159.4 80c-8-3.5-16.6-5.8-25.3-6.9l-1.3 10.4a83.8 83.8 0 0 1 29.5 9.6l2.1-4 2.3-4.2 10.2-19-4.6-2.6zM48.6 78.8l-5.4 2.5-2.6 4.9L55 100.5c-5.2 5.2-9.7 11-13.5 17.1l8.8 5.4c5.2-8.6 12-15 12.1-15.1 2-2 3.9-3.7 5.9-5.4l-1.1-1.3-5-5.9zm147.5 0-13.8 16.5-2.7 3.2-2.2 2.7-1 1.3c2 1.7 3.9 3.5 5.8 5.4.3.3 6.9 6.5 12.1 15.1l8.8-5.4c-3.8-6.1-8.3-11.9-13.5-17.1L204 86.2l-2.6-5z" transform="matrix(.86957 0 0 .86957 -13.6 -50.3)" clip-path="url(#d)"></path><path style="display:inline;fill:red;stroke-width:.264583" d="M90.2 91.9v15.5l5.8 5.8v9.8l9 4V92.4ZM82 97.5l-9.2 2.6-7 6.7 15.7 15.6v8h10.2v-12.8l-9.9-9zm-20.7 16.3-4.7 2.6L71.2 131v3.9h3.9v-7.4zm-7.8 11L49 135.2l21.5 7.3zm66.3-33v15.6l-5.8 5.8v9.8l-9 4V92.4Zm8.2 5.7 9.2 2.6 7 6.7-15.7 15.6v8h-10.2v-12.8l9.9-9zm20.7 16.3 4.7 2.6-14.6 14.6v3.9h-3.9v-7.4zm7.8 11 4.5 10.3-21.5 7.3z" clip-path="url(#e)" transform="translate(-12.3 -52.4)"></path><path clip-path="url(#f)" style="display:inline;fill:red;stroke-width:.264583" d="M52.7 62.2 48.5 64 45 67.5l18.7 24.9a69 69 0 0 0-25.9 39.9l6.7 1.5a62 62 0 0 1 121 0l6.7-1.5a69 69 0 0 0-25.9-40L165 67.6l-3.5-3.6-4.2-1.7L141 88.7a68.5 68.5 0 0 0-72 0Z" transform="translate(-12.3 -52.4)"></path></g></svg>'
);
function wa(t, e) {
	let n = P(e, 'size', 3, '6rem');
	var r = ba();
	Ae(() => {
		Gr(r, 'width', n()), Gr(r, 'height', n());
	}),
		F(t, r);
}
const xa = { dropdownMenuIcon: 'material-symbols-light:menu-rounded' };
var Uo = (t) => (typeof t == 'boolean' ? `${t}` : t === 0 ? '0' : t),
	le = (t) => !t || typeof t != 'object' || Object.keys(t).length === 0,
	Sa = (t, e) => JSON.stringify(t) === JSON.stringify(e);
function Bi(t, e) {
	t.forEach(function (n) {
		Array.isArray(n) ? Bi(n, e) : e.push(n);
	});
}
function Vi(t) {
	let e = [];
	return Bi(t, e), e;
}
var Wi = (...t) => Vi(t).filter(Boolean),
	Ki = (t, e) => {
		let n = {},
			r = Object.keys(t),
			i = Object.keys(e);
		for (let o of r)
			if (i.includes(o)) {
				let s = t[o],
					a = e[o];
				typeof s == 'object' && typeof a == 'object'
					? (n[o] = Ki(s, a))
					: Array.isArray(s) || Array.isArray(a)
						? (n[o] = Wi(a, s))
						: (n[o] = a + ' ' + s);
			} else n[o] = t[o];
		for (let o of i) r.includes(o) || (n[o] = e[o]);
		return n;
	},
	Ho = (t) => (!t || typeof t != 'string' ? t : t.replace(/\s+/g, ' ').trim());
const fo = '-',
	Pa = (t) => {
		const e = Ea(t),
			{ conflictingClassGroups: n, conflictingClassGroupModifiers: r } = t;
		return {
			getClassGroupId: (s) => {
				const a = s.split(fo);
				return a[0] === '' && a.length !== 1 && a.shift(), Ui(a, e) || Aa(s);
			},
			getConflictingClassGroupIds: (s, a) => {
				const l = n[s] || [];
				return a && r[s] ? [...l, ...r[s]] : l;
			}
		};
	},
	Ui = (t, e) => {
		var s;
		if (t.length === 0) return e.classGroupId;
		const n = t[0],
			r = e.nextPart.get(n),
			i = r ? Ui(t.slice(1), r) : void 0;
		if (i) return i;
		if (e.validators.length === 0) return;
		const o = t.join(fo);
		return (s = e.validators.find(({ validator: a }) => a(o))) == null
			? void 0
			: s.classGroupId;
	},
	jo = /^\[(.+)\]$/,
	Aa = (t) => {
		if (jo.test(t)) {
			const e = jo.exec(t)[1],
				n = e == null ? void 0 : e.substring(0, e.indexOf(':'));
			if (n) return 'arbitrary..' + n;
		}
	},
	Ea = (t) => {
		const { theme: e, prefix: n } = t,
			r = { nextPart: new Map(), validators: [] };
		return (
			Ca(Object.entries(t.classGroups), n).forEach(([o, s]) => {
				Jr(s, r, o, e);
			}),
			r
		);
	},
	Jr = (t, e, n, r) => {
		t.forEach((i) => {
			if (typeof i == 'string') {
				const o = i === '' ? e : Go(e, i);
				o.classGroupId = n;
				return;
			}
			if (typeof i == 'function') {
				if (Oa(i)) {
					Jr(i(r), e, n, r);
					return;
				}
				e.validators.push({ validator: i, classGroupId: n });
				return;
			}
			Object.entries(i).forEach(([o, s]) => {
				Jr(s, Go(e, o), n, r);
			});
		});
	},
	Go = (t, e) => {
		let n = t;
		return (
			e.split(fo).forEach((r) => {
				n.nextPart.has(r) || n.nextPart.set(r, { nextPart: new Map(), validators: [] }),
					(n = n.nextPart.get(r));
			}),
			n
		);
	},
	Oa = (t) => t.isThemeGetter,
	Ca = (t, e) =>
		e
			? t.map(([n, r]) => {
					const i = r.map((o) =>
						typeof o == 'string'
							? e + o
							: typeof o == 'object'
								? Object.fromEntries(Object.entries(o).map(([s, a]) => [e + s, a]))
								: o
					);
					return [n, i];
				})
			: t,
	_a = (t) => {
		if (t < 1) return { get: () => {}, set: () => {} };
		let e = 0,
			n = new Map(),
			r = new Map();
		const i = (o, s) => {
			n.set(o, s), e++, e > t && ((e = 0), (r = n), (n = new Map()));
		};
		return {
			get(o) {
				let s = n.get(o);
				if (s !== void 0) return s;
				if ((s = r.get(o)) !== void 0) return i(o, s), s;
			},
			set(o, s) {
				n.has(o) ? n.set(o, s) : i(o, s);
			}
		};
	},
	Hi = '!',
	Ta = (t) => {
		const { separator: e, experimentalParseClassName: n } = t,
			r = e.length === 1,
			i = e[0],
			o = e.length,
			s = (a) => {
				const l = [];
				let d = 0,
					f = 0,
					p;
				for (let v = 0; v < a.length; v++) {
					let w = a[v];
					if (d === 0) {
						if (w === i && (r || a.slice(v, v + o) === e)) {
							l.push(a.slice(f, v)), (f = v + o);
							continue;
						}
						if (w === '/') {
							p = v;
							continue;
						}
					}
					w === '[' ? d++ : w === ']' && d--;
				}
				const g = l.length === 0 ? a : a.substring(f),
					m = g.startsWith(Hi),
					c = m ? g.substring(1) : g,
					h = p && p > f ? p - f : void 0;
				return {
					modifiers: l,
					hasImportantModifier: m,
					baseClassName: c,
					maybePostfixModifierPosition: h
				};
			};
		return n ? (a) => n({ className: a, parseClassName: s }) : s;
	},
	ka = (t) => {
		if (t.length <= 1) return t;
		const e = [];
		let n = [];
		return (
			t.forEach((r) => {
				r[0] === '[' ? (e.push(...n.sort(), r), (n = [])) : n.push(r);
			}),
			e.push(...n.sort()),
			e
		);
	},
	Ia = (t) => ({ cache: _a(t.cacheSize), parseClassName: Ta(t), ...Pa(t) }),
	Ra = /\s+/,
	Ma = (t, e) => {
		const { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i } = e,
			o = [],
			s = t.trim().split(Ra);
		let a = '';
		for (let l = s.length - 1; l >= 0; l -= 1) {
			const d = s[l],
				{
					modifiers: f,
					hasImportantModifier: p,
					baseClassName: g,
					maybePostfixModifierPosition: m
				} = n(d);
			let c = !!m,
				h = r(c ? g.substring(0, m) : g);
			if (!h) {
				if (!c) {
					a = d + (a.length > 0 ? ' ' + a : a);
					continue;
				}
				if (((h = r(g)), !h)) {
					a = d + (a.length > 0 ? ' ' + a : a);
					continue;
				}
				c = !1;
			}
			const v = ka(f).join(':'),
				w = p ? v + Hi : v,
				b = w + h;
			if (o.includes(b)) continue;
			o.push(b);
			const A = i(h, c);
			for (let x = 0; x < A.length; ++x) {
				const E = A[x];
				o.push(w + E);
			}
			a = d + (a.length > 0 ? ' ' + a : a);
		}
		return a;
	};
function Fa() {
	let t = 0,
		e,
		n,
		r = '';
	for (; t < arguments.length; )
		(e = arguments[t++]) && (n = ji(e)) && (r && (r += ' '), (r += n));
	return r;
}
const ji = (t) => {
	if (typeof t == 'string') return t;
	let e,
		n = '';
	for (let r = 0; r < t.length; r++)
		t[r] && (e = ji(t[r])) && (n && (n += ' '), (n += e));
	return n;
};
function Qr(t, ...e) {
	let n,
		r,
		i,
		o = s;
	function s(l) {
		const d = e.reduce((f, p) => p(f), t());
		return (n = Ia(d)), (r = n.cache.get), (i = n.cache.set), (o = a), a(l);
	}
	function a(l) {
		const d = r(l);
		if (d) return d;
		const f = Ma(l, n);
		return i(l, f), f;
	}
	return function () {
		return o(Fa.apply(null, arguments));
	};
}
const Q = (t) => {
		const e = (n) => n[t] || [];
		return (e.isThemeGetter = !0), e;
	},
	Gi = /^\[(?:([a-z-]+):)?(.+)\]$/i,
	La = /^\d+\/\d+$/,
	Na = new Set(['px', 'full', 'screen']),
	Da = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
	za =
		/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
	Ba = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
	Va = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
	Wa =
		/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
	_e = (t) => dt(t) || Na.has(t) || La.test(t),
	De = (t) => Mt(t, 'length', qa),
	dt = (t) => !!t && !Number.isNaN(Number(t)),
	Kr = (t) => Mt(t, 'number', dt),
	Dt = (t) => !!t && Number.isInteger(Number(t)),
	Ka = (t) => t.endsWith('%') && dt(t.slice(0, -1)),
	K = (t) => Gi.test(t),
	ze = (t) => Da.test(t),
	Ua = new Set(['length', 'size', 'percentage']),
	Ha = (t) => Mt(t, Ua, Yi),
	ja = (t) => Mt(t, 'position', Yi),
	Ga = new Set(['image', 'url']),
	Ya = (t) => Mt(t, Ga, Ja),
	Xa = (t) => Mt(t, '', Za),
	zt = () => !0,
	Mt = (t, e, n) => {
		const r = Gi.exec(t);
		return r
			? r[1]
				? typeof e == 'string'
					? r[1] === e
					: e.has(r[1])
				: n(r[2])
			: !1;
	},
	qa = (t) => za.test(t) && !Ba.test(t),
	Yi = () => !1,
	Za = (t) => Va.test(t),
	Ja = (t) => Wa.test(t),
	$r = () => {
		const t = Q('colors'),
			e = Q('spacing'),
			n = Q('blur'),
			r = Q('brightness'),
			i = Q('borderColor'),
			o = Q('borderRadius'),
			s = Q('borderSpacing'),
			a = Q('borderWidth'),
			l = Q('contrast'),
			d = Q('grayscale'),
			f = Q('hueRotate'),
			p = Q('invert'),
			g = Q('gap'),
			m = Q('gradientColorStops'),
			c = Q('gradientColorStopPositions'),
			h = Q('inset'),
			v = Q('margin'),
			w = Q('opacity'),
			b = Q('padding'),
			A = Q('saturate'),
			x = Q('scale'),
			E = Q('sepia'),
			W = Q('skew'),
			N = Q('space'),
			Y = Q('translate'),
			U = () => ['auto', 'contain', 'none'],
			B = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'],
			j = () => ['auto', K, e],
			C = () => [K, e],
			R = () => ['', _e, De],
			T = () => ['auto', dt, K],
			_ = () => [
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
			k = () => ['solid', 'dashed', 'dotted', 'double', 'none'],
			L = () => [
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
			M = () => ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'],
			D = () => ['', '0', K],
			G = () => [
				'auto',
				'avoid',
				'all',
				'avoid-page',
				'page',
				'left',
				'right',
				'column'
			],
			ee = () => [dt, K];
		return {
			cacheSize: 500,
			separator: ':',
			theme: {
				colors: [zt],
				spacing: [_e, De],
				blur: ['none', '', ze, K],
				brightness: ee(),
				borderColor: [t],
				borderRadius: ['none', '', 'full', ze, K],
				borderSpacing: C(),
				borderWidth: R(),
				contrast: ee(),
				grayscale: D(),
				hueRotate: ee(),
				invert: D(),
				gap: C(),
				gradientColorStops: [t],
				gradientColorStopPositions: [Ka, De],
				inset: j(),
				margin: j(),
				opacity: ee(),
				padding: C(),
				saturate: ee(),
				scale: ee(),
				sepia: D(),
				skew: ee(),
				space: C(),
				translate: C()
			},
			classGroups: {
				aspect: [{ aspect: ['auto', 'square', 'video', K] }],
				container: ['container'],
				columns: [{ columns: [ze] }],
				'break-after': [{ 'break-after': G() }],
				'break-before': [{ 'break-before': G() }],
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
				'object-position': [{ object: [..._(), K] }],
				overflow: [{ overflow: B() }],
				'overflow-x': [{ 'overflow-x': B() }],
				'overflow-y': [{ 'overflow-y': B() }],
				overscroll: [{ overscroll: U() }],
				'overscroll-x': [{ 'overscroll-x': U() }],
				'overscroll-y': [{ 'overscroll-y': U() }],
				position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
				inset: [{ inset: [h] }],
				'inset-x': [{ 'inset-x': [h] }],
				'inset-y': [{ 'inset-y': [h] }],
				start: [{ start: [h] }],
				end: [{ end: [h] }],
				top: [{ top: [h] }],
				right: [{ right: [h] }],
				bottom: [{ bottom: [h] }],
				left: [{ left: [h] }],
				visibility: ['visible', 'invisible', 'collapse'],
				z: [{ z: ['auto', Dt, K] }],
				basis: [{ basis: j() }],
				'flex-direction': [{ flex: ['row', 'row-reverse', 'col', 'col-reverse'] }],
				'flex-wrap': [{ flex: ['wrap', 'wrap-reverse', 'nowrap'] }],
				flex: [{ flex: ['1', 'auto', 'initial', 'none', K] }],
				grow: [{ grow: D() }],
				shrink: [{ shrink: D() }],
				order: [{ order: ['first', 'last', 'none', Dt, K] }],
				'grid-cols': [{ 'grid-cols': [zt] }],
				'col-start-end': [{ col: ['auto', { span: ['full', Dt, K] }, K] }],
				'col-start': [{ 'col-start': T() }],
				'col-end': [{ 'col-end': T() }],
				'grid-rows': [{ 'grid-rows': [zt] }],
				'row-start-end': [{ row: ['auto', { span: [Dt, K] }, K] }],
				'row-start': [{ 'row-start': T() }],
				'row-end': [{ 'row-end': T() }],
				'grid-flow': [
					{ 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] }
				],
				'auto-cols': [{ 'auto-cols': ['auto', 'min', 'max', 'fr', K] }],
				'auto-rows': [{ 'auto-rows': ['auto', 'min', 'max', 'fr', K] }],
				gap: [{ gap: [g] }],
				'gap-x': [{ 'gap-x': [g] }],
				'gap-y': [{ 'gap-y': [g] }],
				'justify-content': [{ justify: ['normal', ...M()] }],
				'justify-items': [{ 'justify-items': ['start', 'end', 'center', 'stretch'] }],
				'justify-self': [
					{ 'justify-self': ['auto', 'start', 'end', 'center', 'stretch'] }
				],
				'align-content': [{ content: ['normal', ...M(), 'baseline'] }],
				'align-items': [{ items: ['start', 'end', 'center', 'baseline', 'stretch'] }],
				'align-self': [
					{ self: ['auto', 'start', 'end', 'center', 'stretch', 'baseline'] }
				],
				'place-content': [{ 'place-content': [...M(), 'baseline'] }],
				'place-items': [
					{ 'place-items': ['start', 'end', 'center', 'baseline', 'stretch'] }
				],
				'place-self': [{ 'place-self': ['auto', 'start', 'end', 'center', 'stretch'] }],
				p: [{ p: [b] }],
				px: [{ px: [b] }],
				py: [{ py: [b] }],
				ps: [{ ps: [b] }],
				pe: [{ pe: [b] }],
				pt: [{ pt: [b] }],
				pr: [{ pr: [b] }],
				pb: [{ pb: [b] }],
				pl: [{ pl: [b] }],
				m: [{ m: [v] }],
				mx: [{ mx: [v] }],
				my: [{ my: [v] }],
				ms: [{ ms: [v] }],
				me: [{ me: [v] }],
				mt: [{ mt: [v] }],
				mr: [{ mr: [v] }],
				mb: [{ mb: [v] }],
				ml: [{ ml: [v] }],
				'space-x': [{ 'space-x': [N] }],
				'space-x-reverse': ['space-x-reverse'],
				'space-y': [{ 'space-y': [N] }],
				'space-y-reverse': ['space-y-reverse'],
				w: [{ w: ['auto', 'min', 'max', 'fit', 'svw', 'lvw', 'dvw', K, e] }],
				'min-w': [{ 'min-w': [K, e, 'min', 'max', 'fit'] }],
				'max-w': [
					{
						'max-w': [
							K,
							e,
							'none',
							'full',
							'min',
							'max',
							'fit',
							'prose',
							{ screen: [ze] },
							ze
						]
					}
				],
				h: [{ h: [K, e, 'auto', 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
				'min-h': [{ 'min-h': [K, e, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
				'max-h': [{ 'max-h': [K, e, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh'] }],
				size: [{ size: [K, e, 'auto', 'min', 'max', 'fit'] }],
				'font-size': [{ text: ['base', ze, De] }],
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
							Kr
						]
					}
				],
				'font-family': [{ font: [zt] }],
				'fvn-normal': ['normal-nums'],
				'fvn-ordinal': ['ordinal'],
				'fvn-slashed-zero': ['slashed-zero'],
				'fvn-figure': ['lining-nums', 'oldstyle-nums'],
				'fvn-spacing': ['proportional-nums', 'tabular-nums'],
				'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
				tracking: [
					{ tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest', K] }
				],
				'line-clamp': [{ 'line-clamp': ['none', dt, Kr] }],
				leading: [
					{ leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose', _e, K] }
				],
				'list-image': [{ 'list-image': ['none', K] }],
				'list-style-type': [{ list: ['none', 'disc', 'decimal', K] }],
				'list-style-position': [{ list: ['inside', 'outside'] }],
				'placeholder-color': [{ placeholder: [t] }],
				'placeholder-opacity': [{ 'placeholder-opacity': [w] }],
				'text-alignment': [
					{ text: ['left', 'center', 'right', 'justify', 'start', 'end'] }
				],
				'text-color': [{ text: [t] }],
				'text-opacity': [{ 'text-opacity': [w] }],
				'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
				'text-decoration-style': [{ decoration: [...k(), 'wavy'] }],
				'text-decoration-thickness': [{ decoration: ['auto', 'from-font', _e, De] }],
				'underline-offset': [{ 'underline-offset': ['auto', _e, K] }],
				'text-decoration-color': [{ decoration: [t] }],
				'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
				'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
				'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
				indent: [{ indent: C() }],
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
							K
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
				content: [{ content: ['none', K] }],
				'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
				'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
				'bg-opacity': [{ 'bg-opacity': [w] }],
				'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
				'bg-position': [{ bg: [..._(), ja] }],
				'bg-repeat': [
					{ bg: ['no-repeat', { repeat: ['', 'x', 'y', 'round', 'space'] }] }
				],
				'bg-size': [{ bg: ['auto', 'cover', 'contain', Ha] }],
				'bg-image': [
					{
						bg: [
							'none',
							{ 'gradient-to': ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] },
							Ya
						]
					}
				],
				'bg-color': [{ bg: [t] }],
				'gradient-from-pos': [{ from: [c] }],
				'gradient-via-pos': [{ via: [c] }],
				'gradient-to-pos': [{ to: [c] }],
				'gradient-from': [{ from: [m] }],
				'gradient-via': [{ via: [m] }],
				'gradient-to': [{ to: [m] }],
				rounded: [{ rounded: [o] }],
				'rounded-s': [{ 'rounded-s': [o] }],
				'rounded-e': [{ 'rounded-e': [o] }],
				'rounded-t': [{ 'rounded-t': [o] }],
				'rounded-r': [{ 'rounded-r': [o] }],
				'rounded-b': [{ 'rounded-b': [o] }],
				'rounded-l': [{ 'rounded-l': [o] }],
				'rounded-ss': [{ 'rounded-ss': [o] }],
				'rounded-se': [{ 'rounded-se': [o] }],
				'rounded-ee': [{ 'rounded-ee': [o] }],
				'rounded-es': [{ 'rounded-es': [o] }],
				'rounded-tl': [{ 'rounded-tl': [o] }],
				'rounded-tr': [{ 'rounded-tr': [o] }],
				'rounded-br': [{ 'rounded-br': [o] }],
				'rounded-bl': [{ 'rounded-bl': [o] }],
				'border-w': [{ border: [a] }],
				'border-w-x': [{ 'border-x': [a] }],
				'border-w-y': [{ 'border-y': [a] }],
				'border-w-s': [{ 'border-s': [a] }],
				'border-w-e': [{ 'border-e': [a] }],
				'border-w-t': [{ 'border-t': [a] }],
				'border-w-r': [{ 'border-r': [a] }],
				'border-w-b': [{ 'border-b': [a] }],
				'border-w-l': [{ 'border-l': [a] }],
				'border-opacity': [{ 'border-opacity': [w] }],
				'border-style': [{ border: [...k(), 'hidden'] }],
				'divide-x': [{ 'divide-x': [a] }],
				'divide-x-reverse': ['divide-x-reverse'],
				'divide-y': [{ 'divide-y': [a] }],
				'divide-y-reverse': ['divide-y-reverse'],
				'divide-opacity': [{ 'divide-opacity': [w] }],
				'divide-style': [{ divide: k() }],
				'border-color': [{ border: [i] }],
				'border-color-x': [{ 'border-x': [i] }],
				'border-color-y': [{ 'border-y': [i] }],
				'border-color-s': [{ 'border-s': [i] }],
				'border-color-e': [{ 'border-e': [i] }],
				'border-color-t': [{ 'border-t': [i] }],
				'border-color-r': [{ 'border-r': [i] }],
				'border-color-b': [{ 'border-b': [i] }],
				'border-color-l': [{ 'border-l': [i] }],
				'divide-color': [{ divide: [i] }],
				'outline-style': [{ outline: ['', ...k()] }],
				'outline-offset': [{ 'outline-offset': [_e, K] }],
				'outline-w': [{ outline: [_e, De] }],
				'outline-color': [{ outline: [t] }],
				'ring-w': [{ ring: R() }],
				'ring-w-inset': ['ring-inset'],
				'ring-color': [{ ring: [t] }],
				'ring-opacity': [{ 'ring-opacity': [w] }],
				'ring-offset-w': [{ 'ring-offset': [_e, De] }],
				'ring-offset-color': [{ 'ring-offset': [t] }],
				shadow: [{ shadow: ['', 'inner', 'none', ze, Xa] }],
				'shadow-color': [{ shadow: [zt] }],
				opacity: [{ opacity: [w] }],
				'mix-blend': [{ 'mix-blend': [...L(), 'plus-lighter', 'plus-darker'] }],
				'bg-blend': [{ 'bg-blend': L() }],
				filter: [{ filter: ['', 'none'] }],
				blur: [{ blur: [n] }],
				brightness: [{ brightness: [r] }],
				contrast: [{ contrast: [l] }],
				'drop-shadow': [{ 'drop-shadow': ['', 'none', ze, K] }],
				grayscale: [{ grayscale: [d] }],
				'hue-rotate': [{ 'hue-rotate': [f] }],
				invert: [{ invert: [p] }],
				saturate: [{ saturate: [A] }],
				sepia: [{ sepia: [E] }],
				'backdrop-filter': [{ 'backdrop-filter': ['', 'none'] }],
				'backdrop-blur': [{ 'backdrop-blur': [n] }],
				'backdrop-brightness': [{ 'backdrop-brightness': [r] }],
				'backdrop-contrast': [{ 'backdrop-contrast': [l] }],
				'backdrop-grayscale': [{ 'backdrop-grayscale': [d] }],
				'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [f] }],
				'backdrop-invert': [{ 'backdrop-invert': [p] }],
				'backdrop-opacity': [{ 'backdrop-opacity': [w] }],
				'backdrop-saturate': [{ 'backdrop-saturate': [A] }],
				'backdrop-sepia': [{ 'backdrop-sepia': [E] }],
				'border-collapse': [{ border: ['collapse', 'separate'] }],
				'border-spacing': [{ 'border-spacing': [s] }],
				'border-spacing-x': [{ 'border-spacing-x': [s] }],
				'border-spacing-y': [{ 'border-spacing-y': [s] }],
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
							K
						]
					}
				],
				duration: [{ duration: ee() }],
				ease: [{ ease: ['linear', 'in', 'out', 'in-out', K] }],
				delay: [{ delay: ee() }],
				animate: [{ animate: ['none', 'spin', 'ping', 'pulse', 'bounce', K] }],
				transform: [{ transform: ['', 'gpu', 'none'] }],
				scale: [{ scale: [x] }],
				'scale-x': [{ 'scale-x': [x] }],
				'scale-y': [{ 'scale-y': [x] }],
				rotate: [{ rotate: [Dt, K] }],
				'translate-x': [{ 'translate-x': [Y] }],
				'translate-y': [{ 'translate-y': [Y] }],
				'skew-x': [{ 'skew-x': [W] }],
				'skew-y': [{ 'skew-y': [W] }],
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
							K
						]
					}
				],
				accent: [{ accent: ['auto', t] }],
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
							K
						]
					}
				],
				'caret-color': [{ caret: [t] }],
				'pointer-events': [{ 'pointer-events': ['none', 'auto'] }],
				resize: [{ resize: ['none', 'y', 'x', ''] }],
				'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
				'scroll-m': [{ 'scroll-m': C() }],
				'scroll-mx': [{ 'scroll-mx': C() }],
				'scroll-my': [{ 'scroll-my': C() }],
				'scroll-ms': [{ 'scroll-ms': C() }],
				'scroll-me': [{ 'scroll-me': C() }],
				'scroll-mt': [{ 'scroll-mt': C() }],
				'scroll-mr': [{ 'scroll-mr': C() }],
				'scroll-mb': [{ 'scroll-mb': C() }],
				'scroll-ml': [{ 'scroll-ml': C() }],
				'scroll-p': [{ 'scroll-p': C() }],
				'scroll-px': [{ 'scroll-px': C() }],
				'scroll-py': [{ 'scroll-py': C() }],
				'scroll-ps': [{ 'scroll-ps': C() }],
				'scroll-pe': [{ 'scroll-pe': C() }],
				'scroll-pt': [{ 'scroll-pt': C() }],
				'scroll-pr': [{ 'scroll-pr': C() }],
				'scroll-pb': [{ 'scroll-pb': C() }],
				'scroll-pl': [{ 'scroll-pl': C() }],
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
					{ 'will-change': ['auto', 'scroll', 'contents', 'transform', K] }
				],
				fill: [{ fill: [t, 'none'] }],
				'stroke-w': [{ stroke: [_e, De, Kr] }],
				stroke: [{ stroke: [t, 'none'] }],
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
	Qa = (
		t,
		{
			cacheSize: e,
			prefix: n,
			separator: r,
			experimentalParseClassName: i,
			extend: o = {},
			override: s = {}
		}
	) => {
		Wt(t, 'cacheSize', e),
			Wt(t, 'prefix', n),
			Wt(t, 'separator', r),
			Wt(t, 'experimentalParseClassName', i);
		for (const a in s) $a(t[a], s[a]);
		for (const a in o) el(t[a], o[a]);
		return t;
	},
	Wt = (t, e, n) => {
		n !== void 0 && (t[e] = n);
	},
	$a = (t, e) => {
		if (e) for (const n in e) Wt(t, n, e[n]);
	},
	el = (t, e) => {
		if (e)
			for (const n in e) {
				const r = e[n];
				r !== void 0 && (t[n] = (t[n] || []).concat(r));
			}
	},
	tl = (t, ...e) =>
		typeof t == 'function' ? Qr($r, t, ...e) : Qr(() => Qa($r(), t), ...e),
	Xi = Qr($r);
var nl = { twMerge: !0, twMergeConfig: {}, responsiveVariants: !1 },
	qi = (t) => t || void 0,
	Ut = (...t) => qi(Vi(t).filter(Boolean).join(' ')),
	Ur = null,
	Te = {},
	eo = !1,
	Bt =
		(...t) =>
		(e) =>
			e.twMerge
				? ((!Ur || eo) &&
						((eo = !1),
						(Ur = le(Te)
							? Xi
							: tl({
									...Te,
									extend: {
										theme: Te.theme,
										classGroups: Te.classGroups,
										conflictingClassGroupModifiers: Te.conflictingClassGroupModifiers,
										conflictingClassGroups: Te.conflictingClassGroups,
										...Te.extend
									}
								}))),
					qi(Ur(Ut(t))))
				: Ut(t),
	Yo = (t, e) => {
		for (let n in e) t.hasOwnProperty(n) ? (t[n] = Ut(t[n], e[n])) : (t[n] = e[n]);
		return t;
	},
	rl = (t, e) => {
		let {
				extend: n = null,
				slots: r = {},
				variants: i = {},
				compoundVariants: o = [],
				compoundSlots: s = [],
				defaultVariants: a = {}
			} = t,
			l = { ...nl, ...e },
			d =
				n != null && n.base
					? Ut(n.base, t == null ? void 0 : t.base)
					: t == null
						? void 0
						: t.base,
			f = n != null && n.variants && !le(n.variants) ? Ki(i, n.variants) : i,
			p =
				n != null && n.defaultVariants && !le(n.defaultVariants)
					? { ...n.defaultVariants, ...a }
					: a;
		!le(l.twMergeConfig) &&
			!Sa(l.twMergeConfig, Te) &&
			((eo = !0), (Te = l.twMergeConfig));
		let g = le(n == null ? void 0 : n.slots),
			m = le(r)
				? {}
				: {
						base: Ut(t == null ? void 0 : t.base, g && (n == null ? void 0 : n.base)),
						...r
					},
			c = g
				? m
				: Yo(
						{ ...(n == null ? void 0 : n.slots) },
						le(m) ? { base: t == null ? void 0 : t.base } : m
					),
			h = le(n == null ? void 0 : n.compoundVariants)
				? o
				: Wi(n == null ? void 0 : n.compoundVariants, o),
			v = (b) => {
				if (le(f) && le(r) && g)
					return Bt(
						d,
						b == null ? void 0 : b.class,
						b == null ? void 0 : b.className
					)(l);
				if (h && !Array.isArray(h))
					throw new TypeError(
						`The "compoundVariants" prop must be an array. Received: ${typeof h}`
					);
				if (s && !Array.isArray(s))
					throw new TypeError(
						`The "compoundSlots" prop must be an array. Received: ${typeof s}`
					);
				let A = (C, R, T = [], _) => {
						let k = T;
						if (typeof R == 'string')
							k = k.concat(
								Ho(R)
									.split(' ')
									.map((L) => `${C}:${L}`)
							);
						else if (Array.isArray(R))
							k = k.concat(R.reduce((L, M) => L.concat(`${C}:${M}`), []));
						else if (typeof R == 'object' && typeof _ == 'string') {
							for (let L in R)
								if (R.hasOwnProperty(L) && L === _) {
									let M = R[L];
									if (M && typeof M == 'string') {
										let D = Ho(M);
										k[_]
											? (k[_] = k[_].concat(D.split(' ').map((G) => `${C}:${G}`)))
											: (k[_] = D.split(' ').map((G) => `${C}:${G}`));
									} else
										Array.isArray(M) &&
											M.length > 0 &&
											(k[_] = M.reduce((D, G) => D.concat(`${C}:${G}`), []));
								}
						}
						return k;
					},
					x = (C, R = f, T = null, _ = null) => {
						var k;
						let L = R[C];
						if (!L || le(L)) return null;
						let M =
							(k = _ == null ? void 0 : _[C]) != null ? k : b == null ? void 0 : b[C];
						if (M === null) return null;
						let D = Uo(M),
							G =
								(Array.isArray(l.responsiveVariants) &&
									l.responsiveVariants.length > 0) ||
								l.responsiveVariants === !0,
							ee = p == null ? void 0 : p[C],
							me = [];
						if (typeof D == 'object' && G)
							for (let [Lr, Eo] of Object.entries(D)) {
								let xs = L[Eo];
								if (Lr === 'initial') {
									ee = Eo;
									continue;
								}
								(Array.isArray(l.responsiveVariants) &&
									!l.responsiveVariants.includes(Lr)) ||
									(me = A(Lr, xs, me, T));
							}
						let Mr = D != null && typeof D != 'object' ? D : Uo(ee),
							Fr = L[Mr || 'false'];
						return typeof me == 'object' && typeof T == 'string' && me[T]
							? Yo(me, Fr)
							: me.length > 0
								? (me.push(Fr), me)
								: Fr;
					},
					E = () => (f ? Object.keys(f).map((C) => x(C, f)) : null),
					W = (C, R) => {
						if (!f || typeof f != 'object') return null;
						let T = new Array();
						for (let _ in f) {
							let k = x(_, f, C, R),
								L = C === 'base' && typeof k == 'string' ? k : k && k[C];
							L && (T[T.length] = L);
						}
						return T;
					},
					N = {};
				for (let C in b) b[C] !== void 0 && (N[C] = b[C]);
				let Y = (C, R) => {
						var T;
						let _ =
							typeof (b == null ? void 0 : b[C]) == 'object'
								? { [C]: (T = b[C]) == null ? void 0 : T.initial }
								: {};
						return { ...p, ...N, ..._, ...R };
					},
					U = (C = [], R) => {
						let T = [];
						for (let { class: _, className: k, ...L } of C) {
							let M = !0;
							for (let [D, G] of Object.entries(L)) {
								let ee = Y(D, R);
								if (Array.isArray(G)) {
									if (!G.includes(ee[D])) {
										M = !1;
										break;
									}
								} else if (ee[D] !== G) {
									M = !1;
									break;
								}
							}
							M && (_ && T.push(_), k && T.push(k));
						}
						return T;
					},
					B = (C) => {
						let R = U(h, C);
						if (!Array.isArray(R)) return R;
						let T = {};
						for (let _ of R)
							if (
								(typeof _ == 'string' && (T.base = Bt(T.base, _)(l)),
								typeof _ == 'object')
							)
								for (let [k, L] of Object.entries(_)) T[k] = Bt(T[k], L)(l);
						return T;
					},
					j = (C) => {
						if (s.length < 1) return null;
						let R = {};
						for (let { slots: T = [], class: _, className: k, ...L } of s) {
							if (!le(L)) {
								let M = !0;
								for (let D of Object.keys(L)) {
									let G = Y(D, C)[D];
									if (
										G === void 0 ||
										(Array.isArray(L[D]) ? !L[D].includes(G) : L[D] !== G)
									) {
										M = !1;
										break;
									}
								}
								if (!M) continue;
							}
							for (let M of T) (R[M] = R[M] || []), R[M].push([_, k]);
						}
						return R;
					};
				if (!le(r) || !g) {
					let C = {};
					if (typeof c == 'object' && !le(c))
						for (let R of Object.keys(c))
							C[R] = (T) => {
								var _, k;
								return Bt(
									c[R],
									W(R, T),
									((_ = B(T)) != null ? _ : [])[R],
									((k = j(T)) != null ? k : [])[R],
									T == null ? void 0 : T.class,
									T == null ? void 0 : T.className
								)(l);
							};
					return C;
				}
				return Bt(
					d,
					E(),
					U(h),
					b == null ? void 0 : b.class,
					b == null ? void 0 : b.className
				)(l);
			},
			w = () => {
				if (!(!f || typeof f != 'object')) return Object.keys(f);
			};
		return (
			(v.variantKeys = w()),
			(v.extend = n),
			(v.base = d),
			(v.slots = c),
			(v.variants = f),
			(v.defaultVariants = p),
			(v.compoundSlots = s),
			(v.compoundVariants = h),
			v
		);
	};
function sr(...t) {
	return Xi(Ti(t));
}
const Xo = rl({
	base: 'ring-offset-background focus-visible:ring-primary-7 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
	variants: {
		variant: {
			default: 'bg-primary-3 hover:bg-primary-4 active:bg-primary-5 text-primary-12',
			destructive:
				'bg-destructive-3 hover:bg-destructive-4 active:bg-destructive-5 text-destructive-12',
			outline:
				'border-neutral-7 hover:bg-accent-3 active:bg-accent-4 hover:text-accent-12 border',
			secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
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
var ol = ae('<a><!></a>'),
	il = ae('<button><!></button>');
function Hr(t, e) {
	oe(e, !0);
	let n = P(e, 'variant', 3, 'default'),
		r = P(e, 'size', 3, 'default'),
		i = P(e, 'ref', 15, null),
		o = P(e, 'href', 3, void 0),
		s = P(e, 'type', 3, 'button'),
		a = Oe(e, [
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
	var l = X(),
		d = H(l);
	{
		var f = (g) => {
				var m = ol();
				let c;
				var h = re(m);
				$(h, () => e.children ?? ne),
					te(m),
					Io(
						m,
						(v) => i(v),
						() => i()
					),
					Ae(
						(v) => (c = Xe(m, c, { class: v, href: o(), ...a })),
						[() => sr(Xo({ variant: n(), size: r() }), e.class)]
					),
					F(g, m);
			},
			p = (g) => {
				var m = il();
				let c;
				var h = re(m);
				$(h, () => e.children ?? ne),
					te(m),
					Io(
						m,
						(v) => i(v),
						() => i()
					),
					Ae(
						(v) => (c = Xe(m, c, { class: v, type: s(), ...a })),
						[() => sr(Xo({ variant: n(), size: r() }), e.class)]
					),
					F(g, m);
			};
		ce(d, (g) => {
			o() ? g(f) : g(p, !1);
		});
	}
	F(t, l), ie();
}
function sl(t) {
	return typeof t == 'function';
}
function al(t) {
	return t !== null && typeof t == 'object';
}
const Ht = Symbol('box'),
	ho = Symbol('is-writable');
function ll(t) {
	return al(t) && Ht in t;
}
function cl(t) {
	return O.isBox(t) && ho in t;
}
function O(t) {
	let e = J(at(t));
	return {
		[Ht]: !0,
		[ho]: !0,
		get current() {
			return y(e);
		},
		set current(n) {
			I(e, n, !0);
		}
	};
}
function ul(t, e) {
	const n = V(t);
	return e
		? {
				[Ht]: !0,
				[ho]: !0,
				get current() {
					return y(n);
				},
				set current(r) {
					e(r);
				}
			}
		: {
				[Ht]: !0,
				get current() {
					return t();
				}
			};
}
function dl(t) {
	return O.isBox(t) ? t : sl(t) ? O.with(t) : O(t);
}
function fl(t) {
	return Object.entries(t).reduce(
		(e, [n, r]) =>
			O.isBox(r)
				? (O.isWritableBox(r)
						? Object.defineProperty(e, n, {
								get() {
									return r.current;
								},
								set(i) {
									r.current = i;
								}
							})
						: Object.defineProperty(e, n, {
								get() {
									return r.current;
								}
							}),
					e)
				: Object.assign(e, { [n]: r }),
		{}
	);
}
function hl(t) {
	return O.isWritableBox(t)
		? {
				[Ht]: !0,
				get current() {
					return t.current;
				}
			}
		: t;
}
O.from = dl;
O.with = ul;
O.flatten = fl;
O.readonly = hl;
O.isBox = ll;
O.isWritableBox = cl;
function Zi(...t) {
	return function (e) {
		var n;
		for (const r of t)
			if (r) {
				if (e.defaultPrevented) return;
				typeof r == 'function'
					? r.call(this, e)
					: (n = r.current) == null || n.call(this, e);
			}
	};
}
var qo =
		typeof globalThis < 'u'
			? globalThis
			: typeof window < 'u'
				? window
				: typeof global < 'u'
					? global
					: typeof self < 'u'
						? self
						: {},
	Ji = {},
	Zo = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,
	gl = /\n/g,
	ml = /^\s*/,
	pl = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,
	vl = /^:\s*/,
	yl = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,
	bl = /^[;\s]*/,
	wl = /^\s+|\s+$/g,
	xl = `
`,
	Jo = '/',
	Qo = '*',
	rt = '',
	Sl = 'comment',
	Pl = 'declaration',
	Al = function (t, e) {
		if (typeof t != 'string') throw new TypeError('First argument must be a string');
		if (!t) return [];
		e = e || {};
		var n = 1,
			r = 1;
		function i(c) {
			var h = c.match(gl);
			h && (n += h.length);
			var v = c.lastIndexOf(xl);
			r = ~v ? c.length - v : r + c.length;
		}
		function o() {
			var c = { line: n, column: r };
			return function (h) {
				return (h.position = new s(c)), d(), h;
			};
		}
		function s(c) {
			(this.start = c), (this.end = { line: n, column: r }), (this.source = e.source);
		}
		s.prototype.content = t;
		function a(c) {
			var h = new Error(e.source + ':' + n + ':' + r + ': ' + c);
			if (
				((h.reason = c),
				(h.filename = e.source),
				(h.line = n),
				(h.column = r),
				(h.source = t),
				!e.silent)
			)
				throw h;
		}
		function l(c) {
			var h = c.exec(t);
			if (h) {
				var v = h[0];
				return i(v), (t = t.slice(v.length)), h;
			}
		}
		function d() {
			l(ml);
		}
		function f(c) {
			var h;
			for (c = c || []; (h = p()); ) h !== !1 && c.push(h);
			return c;
		}
		function p() {
			var c = o();
			if (!(Jo != t.charAt(0) || Qo != t.charAt(1))) {
				for (
					var h = 2;
					rt != t.charAt(h) && (Qo != t.charAt(h) || Jo != t.charAt(h + 1));

				)
					++h;
				if (((h += 2), rt === t.charAt(h - 1))) return a('End of comment missing');
				var v = t.slice(2, h - 2);
				return (r += 2), i(v), (t = t.slice(h)), (r += 2), c({ type: Sl, comment: v });
			}
		}
		function g() {
			var c = o(),
				h = l(pl);
			if (h) {
				if ((p(), !l(vl))) return a("property missing ':'");
				var v = l(yl),
					w = c({
						type: Pl,
						property: $o(h[0].replace(Zo, rt)),
						value: v ? $o(v[0].replace(Zo, rt)) : rt
					});
				return l(bl), w;
			}
		}
		function m() {
			var c = [];
			f(c);
			for (var h; (h = g()); ) h !== !1 && (c.push(h), f(c));
			return c;
		}
		return d(), m();
	};
function $o(t) {
	return t ? t.replace(wl, rt) : rt;
}
var El =
	(qo && qo.__importDefault) ||
	function (t) {
		return t && t.__esModule ? t : { default: t };
	};
Object.defineProperty(Ji, '__esModule', { value: !0 });
var ei = (Ji.default = Cl),
	Ol = El(Al);
function Cl(t, e) {
	var n = null;
	if (!t || typeof t != 'string') return n;
	var r = (0, Ol.default)(t),
		i = typeof e == 'function';
	return (
		r.forEach(function (o) {
			if (o.type === 'declaration') {
				var s = o.property,
					a = o.value;
				i ? e(s, a, o) : a && ((n = n || {}), (n[s] = a));
			}
		}),
		n
	);
}
const _l = ei.default || ei,
	Tl = /\d/,
	kl = ['-', '_', '/', '.'];
function Il(t = '') {
	if (!Tl.test(t)) return t !== t.toLowerCase();
}
function Rl(t) {
	const e = [];
	let n = '',
		r,
		i;
	for (const o of t) {
		const s = kl.includes(o);
		if (s === !0) {
			e.push(n), (n = ''), (r = void 0);
			continue;
		}
		const a = Il(o);
		if (i === !1) {
			if (r === !1 && a === !0) {
				e.push(n), (n = o), (r = a);
				continue;
			}
			if (r === !0 && a === !1 && n.length > 1) {
				const l = n.at(-1);
				e.push(n.slice(0, Math.max(0, n.length - 1))), (n = l + o), (r = a);
				continue;
			}
		}
		(n += o), (r = a), (i = s);
	}
	return e.push(n), e;
}
function Qi(t) {
	return t
		? Rl(t)
				.map((e) => Fl(e))
				.join('')
		: '';
}
function Ml(t) {
	return Ll(Qi(t || ''));
}
function Fl(t) {
	return t ? t[0].toUpperCase() + t.slice(1) : '';
}
function Ll(t) {
	return t ? t[0].toLowerCase() + t.slice(1) : '';
}
function Kt(t) {
	if (!t) return {};
	const e = {};
	function n(r, i) {
		if (
			r.startsWith('-moz-') ||
			r.startsWith('-webkit-') ||
			r.startsWith('-ms-') ||
			r.startsWith('-o-')
		) {
			e[Qi(r)] = i;
			return;
		}
		if (r.startsWith('--')) {
			e[r] = i;
			return;
		}
		e[Ml(r)] = i;
	}
	return _l(t, n), e;
}
function ft(...t) {
	return (...e) => {
		for (const n of t) typeof n == 'function' && n(...e);
	};
}
function Nl(t, e) {
	const n = RegExp(t, 'g');
	return (r) => {
		if (typeof r != 'string')
			throw new TypeError(`expected an argument of type string, but got ${typeof r}`);
		return r.match(n) ? r.replace(n, e) : r;
	};
}
const Dl = Nl(/[A-Z]/, (t) => `-${t.toLowerCase()}`);
function zl(t) {
	if (!t || typeof t != 'object' || Array.isArray(t))
		throw new TypeError(`expected an argument of type object, but got ${typeof t}`);
	return Object.keys(t).map((e) => `${Dl(e)}: ${t[e]};`).join(`
`);
}
function go(t = {}) {
	return zl(t).replace(
		`
`,
		' '
	);
}
const Bl = {
	position: 'absolute',
	width: '1px',
	height: '1px',
	padding: '0',
	margin: '-1px',
	overflow: 'hidden',
	clip: 'rect(0, 0, 0, 0)',
	whiteSpace: 'nowrap',
	borderWidth: '0',
	transform: 'translateX(-100%)'
};
go(Bl);
function Vl(t) {
	var e;
	return (
		t.length > 2 &&
		t.startsWith('on') &&
		t[2] === ((e = t[2]) == null ? void 0 : e.toLowerCase())
	);
}
function lt(...t) {
	const e = { ...t[0] };
	for (let n = 1; n < t.length; n++) {
		const r = t[n];
		for (const i in r) {
			const o = e[i],
				s = r[i],
				a = typeof o == 'function',
				l = typeof s == 'function';
			if (a && Vl(i)) {
				const d = o,
					f = s;
				e[i] = Zi(d, f);
			} else if (a && l) e[i] = ft(o, s);
			else if (i === 'class' && typeof o == 'string' && typeof s == 'string')
				e[i] = Ti(o, s);
			else if (i === 'style') {
				const d = typeof o == 'object',
					f = typeof s == 'object',
					p = typeof o == 'string',
					g = typeof s == 'string';
				if (d && f) e[i] = { ...o, ...s };
				else if (d && g) {
					const m = Kt(s);
					e[i] = { ...o, ...m };
				} else if (p && f) {
					const m = Kt(o);
					e[i] = { ...m, ...s };
				} else if (p && g) {
					const m = Kt(o),
						c = Kt(s);
					e[i] = { ...m, ...c };
				} else d ? (e[i] = o) : f && (e[i] = s);
			} else e[i] = s !== void 0 ? s : o;
		}
	}
	return (
		typeof e.style == 'object' &&
			(e.style = go(e.style).replaceAll(
				`
`,
				' '
			)),
		e.hidden !== !0 && (e.hidden = void 0),
		e.disabled !== !0 && (e.disabled = void 0),
		e
	);
}
function Me({
	id: t,
	ref: e,
	deps: n = () => !0,
	onRefChange: r = () => {},
	getRootNode: i = () => (typeof document < 'u' ? document : void 0)
}) {
	const o = V(() => n()),
		s = V(() => i());
	q(
		() => (
			t.current,
			y(o),
			y(s),
			de(() => {
				var l;
				const a = (l = y(s)) == null ? void 0 : l.getElementById(t.current);
				a ? (e.current = a) : (e.current = null), r(e.current);
			})
		)
	),
		q(() => () => {
			(e.current = null), r(null);
		});
}
function $i(t) {
	q(() => () => {
		t();
	});
}
function es(t, e) {
	setTimeout(e, t);
}
function _r(t) {
	Ei().then(t);
}
var gt, Xt, Ke, ot, $e, to, no;
class Wl {
	constructor(e, n) {
		S(this, $e);
		S(this, gt, J());
		S(this, Xt);
		S(this, Ke, 0);
		S(this, ot, null);
		I(u(this, gt), e, !0), z(this, Xt, n);
	}
	get current() {
		return (
			Gs()
				? q(
						() => (
							Dr(this, Ke)._++,
							u(this, Ke) === 1 && he(this, $e, to).call(this, !0),
							() => {
								Ei().then(() => {
									Dr(this, Ke)._--, u(this, Ke) === 0 && he(this, $e, no).call(this);
								});
							}
						)
					)
				: u(this, Ke) === 0 &&
					(he(this, $e, to).call(this, !1), he(this, $e, no).call(this)),
			y(u(this, gt))
		);
	}
}
(gt = new WeakMap()),
	(Xt = new WeakMap()),
	(Ke = new WeakMap()),
	(ot = new WeakMap()),
	($e = new WeakSet()),
	(to = function (e) {
		z(
			this,
			ot,
			u(this, Xt).call(
				this,
				(n) => {
					I(u(this, gt), n, !0);
				},
				e
			) ?? null
		);
	}),
	(no = function () {
		u(this, ot) !== null && (u(this, ot).call(this), z(this, ot, null));
	});
new Wl(null, (t, e) => {
	function n() {
		t(document.activeElement);
	}
	if ((n(), !!e))
		return (
			document.addEventListener('focusin', n),
			document.addEventListener('focusout', n),
			() => {
				document.removeEventListener('focusin', n),
					document.removeEventListener('focusout', n);
			}
		);
});
function Kl(t) {
	return typeof t == 'function';
}
function Ul(t) {
	return Kl(t) ? t() : t;
}
var Ue;
class Hl {
	constructor(e, n = { box: 'border-box' }) {
		S(this, Ue, J(at({ width: 0, height: 0 })));
		var r, i;
		I(
			u(this, Ue),
			{
				width: ((r = n.initialSize) == null ? void 0 : r.width) ?? 0,
				height: ((i = n.initialSize) == null ? void 0 : i.height) ?? 0
			},
			!0
		),
			q(() => {
				const o = Ul(e);
				if (!o) return;
				const s = new ResizeObserver((a) => {
					for (const l of a) {
						const d = n.box === 'content-box' ? l.contentBoxSize : l.borderBoxSize,
							f = Array.isArray(d) ? d : [d];
						(y(u(this, Ue)).width = f.reduce((p, g) => Math.max(p, g.inlineSize), 0)),
							(y(u(this, Ue)).height = f.reduce((p, g) => Math.max(p, g.blockSize), 0));
					}
				});
				return (
					s.observe(o),
					() => {
						s.disconnect();
					}
				);
			});
	}
	get width() {
		return y(u(this, Ue)).width;
	}
	get height() {
		return y(u(this, Ue)).height;
	}
}
Ue = new WeakMap();
var qt, Zt;
class jl {
	constructor(e) {
		S(this, qt, J());
		S(this, Zt);
		q(() => {
			I(u(this, qt), u(this, Zt), !0), z(this, Zt, e());
		});
	}
	get current() {
		return y(u(this, qt));
	}
}
(qt = new WeakMap()), (Zt = new WeakMap());
function ts(t) {
	return t ? 'open' : 'closed';
}
function Gl(t) {
	return t ? 'true' : 'false';
}
function Yl(t) {
	return t ? 'true' : void 0;
}
const Xl = 'Enter',
	ql = 'Escape',
	Zl = ' ',
	Jl = 'Tab',
	Tr = typeof document < 'u',
	ti = Ql();
function Ql() {
	var t, e;
	return (
		Tr &&
		((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.userAgent) &&
		(/iP(ad|hone|od)/.test(window.navigator.userAgent) ||
			(((e = window == null ? void 0 : window.navigator) == null
				? void 0
				: e.maxTouchPoints) > 2 &&
				/iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent)))
	);
}
function jt(t) {
	return t instanceof HTMLElement;
}
function $l(t) {
	return t instanceof Element;
}
function ec(t) {
	return t !== null;
}
function tc(t) {
	return t instanceof HTMLInputElement && 'select' in t;
}
function nc(t, e) {
	if (getComputedStyle(t).visibility === 'hidden') return !0;
	for (; t; ) {
		if (e !== void 0 && t === e) return !1;
		if (getComputedStyle(t).display === 'none') return !0;
		t = t.parentElement;
	}
	return !1;
}
function ni(t, e) {
	return Ys(t, e);
}
function rc(t, e) {
	const n = t,
		r = typeof t == 'symbol' ? t.description : t;
	if (!Xs(n)) {
		if (e === void 0)
			throw new Error(`Missing context dependency: ${r} and no fallback was provided.`);
		return e;
	}
	return qs(t);
}
function oc(t, e) {
	return typeof t == 'string' && e === void 0
		? `${t}Context`
		: Array.isArray(t) && e === void 0
			? `${t[0]}Context`
			: `${t}Context`;
}
function Jn(t, e, n = !0) {
	const r = oc(t, e),
		i = Symbol.for(`bits-ui.${r}`),
		o = r;
	function s(l) {
		const d = rc(n ? i : o, l);
		if (d === void 0)
			throw new Error(
				`Context \`${r}\` not found. Component must be used within ${Array.isArray(t) ? `one of the following components: ${t.join(', ')}` : `\`${t}\``}`
			);
		return d;
	}
	function a(l) {
		return ni(n ? i : o, l);
	}
	return [a, s];
}
globalThis.bitsIdCounter ?? (globalThis.bitsIdCounter = { current: 0 });
function ut(t = 'bits') {
	return globalThis.bitsIdCounter.current++, `${t}-${globalThis.bitsIdCounter.current}`;
}
function se() {}
function ic(t, e) {
	const n = O(t);
	function r(o) {
		return e[n.current][o] ?? n.current;
	}
	return {
		state: n,
		dispatch: (o) => {
			n.current = r(o);
		}
	};
}
function sc(t, e) {
	let n = J(at({})),
		r = J('none');
	const i = t.current ? 'mounted' : 'unmounted';
	let o = J(null);
	const s = new jl(() => t.current);
	q(() => {
		e.current &&
			t.current &&
			_r(() => {
				I(o, document.getElementById(e.current), !0);
			});
	});
	const { state: a, dispatch: l } = ic(i, {
		mounted: { UNMOUNT: 'unmounted', ANIMATION_OUT: 'unmountSuspended' },
		unmountSuspended: { MOUNT: 'mounted', ANIMATION_END: 'unmounted' },
		unmounted: { MOUNT: 'mounted' }
	});
	q(() => {
		const g = t.current;
		de(() => {
			if (
				(y(o) || I(o, document.getElementById(e.current), !0),
				!y(o) || !(g !== s.current))
			)
				return;
			const c = y(r),
				h = er(y(o));
			g
				? l('MOUNT')
				: h === 'none' || y(n).display === 'none'
					? l('UNMOUNT')
					: l(s && c !== h ? 'ANIMATION_OUT' : 'UNMOUNT');
		});
	});
	function d(g) {
		if ((y(o) || I(o, document.getElementById(e.current), !0), !y(o))) return;
		const m = er(y(o)),
			c = m.includes(g.animationName) || m === 'none';
		g.target === y(o) && c && l('ANIMATION_END');
	}
	function f(g) {
		y(o) || I(o, document.getElementById(e.current), !0),
			y(o) && g.target === y(o) && I(r, er(y(o)), !0);
	}
	q(() => {
		a.current,
			de(() => {
				if ((y(o) || I(o, document.getElementById(e.current), !0), !y(o))) return;
				const g = er(y(o));
				I(r, a.current === 'mounted' ? g : 'none', !0);
			});
	}),
		q(() => {
			if (y(o))
				return (
					I(n, getComputedStyle(y(o)), !0),
					y(o).addEventListener('animationstart', f),
					y(o).addEventListener('animationcancel', d),
					y(o).addEventListener('animationend', d),
					() => {
						var g, m, c;
						(g = y(o)) == null || g.removeEventListener('animationstart', f),
							(m = y(o)) == null || m.removeEventListener('animationcancel', d),
							(c = y(o)) == null || c.removeEventListener('animationend', d);
					}
				);
		});
	const p = V(() => ['mounted', 'unmountSuspended'].includes(a.current));
	return {
		get current() {
			return y(p);
		}
	};
}
function er(t) {
	return (t && getComputedStyle(t).animationName) || 'none';
}
function ac(t, e) {
	oe(e, !0);
	const n = sc(
		O.with(() => e.present),
		O.with(() => e.id)
	);
	var r = X(),
		i = H(r);
	{
		var o = (s) => {
			var a = X(),
				l = H(a);
			$(
				l,
				() => e.presence ?? ne,
				() => ({ present: n })
			),
				F(s, a);
		};
		ce(i, (s) => {
			(e.forceMount || e.present || n.current) && s(o);
		});
	}
	F(t, r), ie();
}
function lc(t, e) {
	var n = X(),
		r = H(n);
	ta(
		r,
		() => e.children,
		(i) => {
			var o = X(),
				s = H(o);
			$(s, () => e.children ?? ne), F(i, o);
		}
	),
		F(t, n);
}
function cc(t, e) {
	oe(e, !0);
	let n = P(e, 'to', 3, 'body');
	const r = Zs();
	let i = V(o);
	function o() {
		if (!Tr || e.disabled) return null;
		let f = null;
		return (
			typeof n() == 'string'
				? (f = document.querySelector(n()))
				: (n() instanceof HTMLElement || n() instanceof DocumentFragment) && (f = n()),
			f
		);
	}
	let s;
	q(() => {
		if (!y(i) || e.disabled) {
			s && (Fo(s), (s = null));
			return;
		}
		return (
			de(
				() =>
					(s = ea(lc, { target: y(i), props: { children: e.children }, context: r }))
			),
			() => {
				s && (Fo(s), (s = null));
			}
		);
	});
	var a = X(),
		l = H(a);
	{
		var d = (f) => {
			var p = X(),
				g = H(p);
			$(g, () => e.children ?? ne), F(f, p);
		};
		ce(l, (f) => {
			e.disabled && f(d);
		});
	}
	F(t, a), ie();
}
function Se(t, e, n, r) {
	const i = Array.isArray(e) ? e : [e];
	return (
		i.forEach((o) => t.addEventListener(o, n, r)),
		() => {
			i.forEach((o) => t.removeEventListener(o, n, r));
		}
	);
}
function ri(t, e = 500) {
	let n = null;
	const r = (...i) => {
		n !== null && clearTimeout(n),
			(n = setTimeout(() => {
				t(...i);
			}, e));
	};
	return (
		(r.destroy = () => {
			n !== null && (clearTimeout(n), (n = null));
		}),
		r
	);
}
function mo(t, e) {
	return t === e || t.contains(e);
}
function ns(t) {
	return (t == null ? void 0 : t.ownerDocument) ?? document;
}
globalThis.bitsDismissableLayers ?? (globalThis.bitsDismissableLayers = new Map());
var mt,
	it,
	He,
	pt,
	je,
	vt,
	yt,
	Jt,
	Qt,
	$t,
	ke,
	ur,
	Rt,
	rs,
	dr,
	bt,
	fr,
	hr,
	gr,
	mr,
	en,
	os,
	pr,
	vr;
class uc {
	constructor(e) {
		S(this, Rt);
		S(this, mt);
		S(this, it);
		S(this, He, { pointerdown: !1 });
		S(this, pt, !1);
		Z(this, 'node', O(null));
		S(this, je);
		S(this, vt);
		S(this, yt, J(!1));
		S(this, Jt);
		S(this, Qt, J(null));
		S(this, $t);
		S(this, ke, se);
		S(this, ur, (e) => {
			e.defaultPrevented ||
				(this.currNode &&
					_r(() => {
						var n, r;
						!this.currNode ||
							u(this, mr).call(this, e.target) ||
							(e.target &&
								!y(u(this, yt)) &&
								((r = (n = u(this, Jt)).current) == null || r.call(n, e)));
					}));
		});
		S(this, dr, (e) => {
			let n = e;
			n.defaultPrevented && (n = oi(e)), u(this, mt).current(e);
		});
		S(
			this,
			bt,
			ri((e) => {
				if (!this.currNode) {
					u(this, ke).call(this);
					return;
				}
				const n = u(this, $t).current(e, this.currNode) || gc(e, this.currNode);
				if (!u(this, pt) || he(this, Rt, os).call(this) || !n) {
					u(this, ke).call(this);
					return;
				}
				let r = e;
				if (
					(r.defaultPrevented && (r = oi(r)),
					u(this, it).current !== 'close' &&
						u(this, it).current !== 'defer-otherwise-close')
				) {
					u(this, ke).call(this);
					return;
				}
				e.pointerType === 'touch'
					? (u(this, ke).call(this),
						z(this, ke, Se(u(this, je), 'click', u(this, dr), { once: !0 })))
					: u(this, mt).current(r);
			}, 10)
		);
		S(this, fr, (e) => {
			u(this, He)[e.type] = !0;
		});
		S(this, hr, (e) => {
			u(this, He)[e.type] = !1;
		});
		S(this, gr, () => {
			this.node.current && z(this, pt, hc(this.node.current));
		});
		S(this, mr, (e) => (this.node.current ? mo(this.node.current, e) : !1));
		S(
			this,
			en,
			ri(() => {
				for (const e in u(this, He)) u(this, He)[e] = !1;
				z(this, pt, !1);
			}, 20)
		);
		S(this, pr, () => {
			I(u(this, yt), !0);
		});
		S(this, vr, () => {
			I(u(this, yt), !1);
		});
		Z(this, 'props', { onfocuscapture: u(this, pr), onblurcapture: u(this, vr) });
		z(this, vt, e.enabled),
			z(this, $t, e.isValidEvent),
			Me({
				id: e.id,
				ref: this.node,
				deps: () => u(this, vt).current,
				onRefChange: (i) => {
					this.currNode = i;
				}
			}),
			z(this, it, e.interactOutsideBehavior),
			z(this, mt, e.onInteractOutside),
			z(this, Jt, e.onFocusOutside),
			q(() => {
				z(this, je, ns(this.currNode));
			});
		let n = se;
		const r = () => {
			u(this, en).call(this),
				globalThis.bitsDismissableLayers.delete(this),
				u(this, bt).destroy(),
				n();
		};
		q(
			() => (
				u(this, vt).current &&
					this.currNode &&
					es(1, () => {
						this.currNode &&
							(globalThis.bitsDismissableLayers.set(
								this,
								de(() => u(this, it))
							),
							n(),
							(n = he(this, Rt, rs).call(this)));
					}),
				() => {
					r();
				}
			)
		),
			$i(() => {
				u(this, en).destroy(),
					globalThis.bitsDismissableLayers.delete(this),
					u(this, bt).destroy(),
					u(this, ke).call(this),
					n();
			});
	}
	get currNode() {
		return y(u(this, Qt));
	}
	set currNode(e) {
		I(u(this, Qt), e, !0);
	}
}
(mt = new WeakMap()),
	(it = new WeakMap()),
	(He = new WeakMap()),
	(pt = new WeakMap()),
	(je = new WeakMap()),
	(vt = new WeakMap()),
	(yt = new WeakMap()),
	(Jt = new WeakMap()),
	(Qt = new WeakMap()),
	($t = new WeakMap()),
	(ke = new WeakMap()),
	(ur = new WeakMap()),
	(Rt = new WeakSet()),
	(rs = function () {
		return ft(
			Se(u(this, je), 'pointerdown', ft(u(this, fr), u(this, gr)), !0),
			Se(u(this, je), 'pointerdown', ft(u(this, hr), u(this, bt))),
			Se(u(this, je), 'focusin', u(this, ur))
		);
	}),
	(dr = new WeakMap()),
	(bt = new WeakMap()),
	(fr = new WeakMap()),
	(hr = new WeakMap()),
	(gr = new WeakMap()),
	(mr = new WeakMap()),
	(en = new WeakMap()),
	(os = function () {
		return Object.values(u(this, He)).some(Boolean);
	}),
	(pr = new WeakMap()),
	(vr = new WeakMap());
function dc(t) {
	return new uc(t);
}
function fc(t) {
	return t.findLast(([e, { current: n }]) => n === 'close' || n === 'ignore');
}
function hc(t) {
	const e = [...globalThis.bitsDismissableLayers],
		n = fc(e);
	if (n) return n[0].node.current === t;
	const [r] = e[0];
	return r.node.current === t;
}
function gc(t, e) {
	if ('button' in t && t.button > 0) return !1;
	const n = t.target;
	return $l(n) ? ns(n).documentElement.contains(n) && !mo(e, n) : !1;
}
function oi(t) {
	const e = t.currentTarget,
		n = t.target;
	let r;
	t instanceof PointerEvent
		? (r = new PointerEvent(t.type, t))
		: (r = new PointerEvent('pointerdown', t));
	let i = !1;
	return new Proxy(r, {
		get: (s, a) =>
			a === 'currentTarget'
				? e
				: a === 'target'
					? n
					: a === 'preventDefault'
						? () => {
								(i = !0), typeof s.preventDefault == 'function' && s.preventDefault();
							}
						: a === 'defaultPrevented'
							? i
							: a in s
								? s[a]
								: t[a]
	});
}
function mc(t, e) {
	oe(e, !0);
	let n = P(e, 'interactOutsideBehavior', 3, 'close'),
		r = P(e, 'onInteractOutside', 3, se),
		i = P(e, 'onFocusOutside', 3, se),
		o = P(e, 'isValidEvent', 3, () => !1);
	const s = dc({
		id: O.with(() => e.id),
		interactOutsideBehavior: O.with(() => n()),
		onInteractOutside: O.with(() => r()),
		enabled: O.with(() => e.enabled),
		onFocusOutside: O.with(() => i()),
		isValidEvent: O.with(() => o())
	});
	var a = X(),
		l = H(a);
	$(
		l,
		() => e.children ?? ne,
		() => ({ props: s.props })
	),
		F(t, a),
		ie();
}
globalThis.bitsEscapeLayers ?? (globalThis.bitsEscapeLayers = new Map());
var tn, wt, nn, yr, br;
class pc {
	constructor(e) {
		S(this, tn);
		S(this, wt);
		S(this, nn);
		S(this, yr, () => Se(document, 'keydown', u(this, br), { passive: !1 }));
		S(this, br, (e) => {
			if (e.key !== ql || !yc(this)) return;
			const n = new KeyboardEvent(e.type, e);
			e.preventDefault();
			const r = u(this, wt).current;
			(r !== 'close' && r !== 'defer-otherwise-close') || u(this, tn).current(n);
		});
		z(this, wt, e.escapeKeydownBehavior),
			z(this, tn, e.onEscapeKeydown),
			z(this, nn, e.enabled);
		let n = se;
		q(
			() => (
				u(this, nn).current &&
					(globalThis.bitsEscapeLayers.set(
						this,
						de(() => u(this, wt))
					),
					(n = u(this, yr).call(this))),
				() => {
					n(), globalThis.bitsEscapeLayers.delete(this);
				}
			)
		);
	}
}
(tn = new WeakMap()),
	(wt = new WeakMap()),
	(nn = new WeakMap()),
	(yr = new WeakMap()),
	(br = new WeakMap());
function vc(t) {
	return new pc(t);
}
function yc(t) {
	const e = [...globalThis.bitsEscapeLayers],
		n = e.findLast(([i, { current: o }]) => o === 'close' || o === 'ignore');
	if (n) return n[0] === t;
	const [r] = e[0];
	return r === t;
}
function bc(t, e) {
	oe(e, !0);
	let n = P(e, 'escapeKeydownBehavior', 3, 'close'),
		r = P(e, 'onEscapeKeydown', 3, se);
	vc({
		escapeKeydownBehavior: O.with(() => n()),
		onEscapeKeydown: O.with(() => r()),
		enabled: O.with(() => e.enabled)
	});
	var i = X(),
		o = H(i);
	$(o, () => e.children ?? ne), F(t, i), ie();
}
const wc = O([]);
function xc() {
	const t = wc;
	return {
		add(e) {
			const n = t.current[0];
			e.id !== (n == null ? void 0 : n.id) && (n == null || n.pause()),
				(t.current = ii(t.current, e)),
				t.current.unshift(e);
		},
		remove(e) {
			var n;
			(t.current = ii(t.current, e)), (n = t.current[0]) == null || n.resume();
		}
	};
}
function Sc() {
	let t = J(!1);
	return {
		id: ut(),
		get paused() {
			return y(t);
		},
		pause() {
			I(t, !0);
		},
		resume() {
			I(t, !1);
		}
	};
}
function ii(t, e) {
	return [...t].filter((n) => n.id !== e.id);
}
function Pc(t) {
	return t.filter((e) => e.tagName !== 'A');
}
function Be(t, { select: e = !1 } = {}) {
	if (!(t && t.focus)) return;
	const n = document.activeElement;
	t.focus({ preventScroll: !0 }), t !== n && tc(t) && e && t.select();
}
function Ac(t, { select: e = !1 } = {}) {
	const n = document.activeElement;
	for (const r of t)
		if ((Be(r, { select: e }), document.activeElement !== n)) return !0;
}
function si(t, e) {
	for (const n of t) if (!nc(n, e)) return n;
}
function is(t) {
	const e = [],
		n = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, {
			acceptNode: (r) => {
				const i = r.tagName === 'INPUT' && r.type === 'hidden';
				return r.disabled || r.hidden || i
					? NodeFilter.FILTER_SKIP
					: r.tabIndex >= 0
						? NodeFilter.FILTER_ACCEPT
						: NodeFilter.FILTER_SKIP;
			}
		});
	for (; n.nextNode(); ) e.push(n.currentNode);
	return e;
}
function Ec(t) {
	const e = is(t),
		n = si(e, t),
		r = si(e.reverse(), t);
	return [n, r];
}
const Oc = 'focusScope.autoFocusOnMount',
	Cc = 'focusScope.autoFocusOnDestroy',
	ai = { bubbles: !1, cancelable: !0 };
function _c({
	id: t,
	loop: e,
	enabled: n,
	onOpenAutoFocus: r,
	onCloseAutoFocus: i,
	forceMount: o
}) {
	const s = xc(),
		a = Sc(),
		l = O(null);
	Me({ id: t, ref: l, deps: () => n.current });
	let d = J(null);
	q(() => {
		const c = l.current;
		if (!c || !n.current) return;
		function h(b) {
			if (a.paused || !c) return;
			const A = b.target;
			jt(A) && (c.contains(A) ? I(d, A, !0) : Be(y(d), { select: !0 }));
		}
		function v(b) {
			if (a.paused || !c) return;
			const A = b.relatedTarget;
			jt(A) && A !== null && (c.contains(A) || Be(y(d), { select: !0 }));
		}
		function w(b) {
			(c == null ? void 0 : c.contains(y(d))) || Be(c);
		}
		return de(() => {
			const b = ft(Se(document, 'focusin', h), Se(document, 'focusout', v)),
				A = new MutationObserver(w);
			return (
				A.observe(c, { childList: !0, subtree: !0 }),
				() => {
					b(), A.disconnect();
				}
			);
		});
	}),
		q(() => {
			if (o.current) return;
			let c = l.current;
			const h = document.activeElement;
			return (
				de(() => {
					f(c, h);
				}),
				() => {
					c && p(h);
				}
			);
		}),
		q(() => {
			if (!o.current) return;
			n.current;
			const c = l.current,
				h = document.activeElement;
			return (
				de(() => {
					f(c, h);
				}),
				() => {
					c && p(h);
				}
			);
		});
	function f(c, h) {
		if ((c || (c = document.getElementById(t.current)), !c)) return;
		if ((s.add(a), !c.contains(h))) {
			const w = new CustomEvent(Oc, ai);
			r.current(w),
				w.defaultPrevented ||
					_r(() => {
						c && (Ac(Pc(is(c)), { select: !0 }), document.activeElement === h && Be(c));
					});
		}
	}
	function p(c) {
		const h = new CustomEvent(Cc, ai);
		i.current(h),
			setTimeout(() => {
				!h.defaultPrevented && c && Be(c ?? document.body, { select: !0 }), s.remove(a);
			}, 0);
	}
	function g(c) {
		if (!n.current || (!e.current && !n.current) || a.paused) return;
		const h = c.key === Jl && !c.ctrlKey && !c.altKey && !c.metaKey,
			v = document.activeElement;
		if (!(h && v)) return;
		const w = l.current;
		if (!w) return;
		const [b, A] = Ec(w);
		b && A
			? !c.shiftKey && v === A
				? (c.preventDefault(), e.current && Be(b, { select: !0 }))
				: c.shiftKey &&
					v === b &&
					(c.preventDefault(), e.current && Be(A, { select: !0 }))
			: v === w && c.preventDefault();
	}
	const m = V(() => ({ id: t.current, tabindex: -1, onkeydown: g }));
	return {
		get props() {
			return y(m);
		}
	};
}
function Tc(t, e) {
	oe(e, !0);
	let n = P(e, 'trapFocus', 3, !1),
		r = P(e, 'loop', 3, !1),
		i = P(e, 'onCloseAutoFocus', 3, se),
		o = P(e, 'onOpenAutoFocus', 3, se),
		s = P(e, 'forceMount', 3, !1);
	const a = _c({
		enabled: O.with(() => n()),
		loop: O.with(() => r()),
		onCloseAutoFocus: O.with(() => i()),
		onOpenAutoFocus: O.with(() => o()),
		id: O.with(() => e.id),
		forceMount: O.with(() => s())
	});
	var l = X(),
		d = H(l);
	$(
		d,
		() => e.focusScope ?? ne,
		() => ({ props: a.props })
	),
		F(t, l),
		ie();
}
globalThis.bitsTextSelectionLayers ?? (globalThis.bitsTextSelectionLayers = new Map());
var rn, on, sn, Ge, xt, an, wr, ss, xr, ln;
class kc {
	constructor(e) {
		S(this, wr);
		S(this, rn);
		S(this, on);
		S(this, sn);
		S(this, Ge);
		S(this, xt, se);
		S(this, an, O(null));
		S(this, xr, (e) => {
			const n = u(this, an).current,
				r = e.target;
			!jt(n) ||
				!jt(r) ||
				!u(this, Ge).current ||
				!Mc(this) ||
				!mo(n, r) ||
				(u(this, on).current(e), !e.defaultPrevented && z(this, xt, Rc(n)));
		});
		S(this, ln, () => {
			u(this, xt).call(this), z(this, xt, se);
		});
		z(this, rn, e.id),
			z(this, Ge, e.preventOverflowTextSelection),
			z(this, on, e.onPointerDown),
			z(this, sn, e.onPointerUp),
			Me({ id: u(this, rn), ref: u(this, an), deps: () => u(this, Ge).current });
		let n = se;
		q(
			() => (
				u(this, Ge).current &&
					(globalThis.bitsTextSelectionLayers.set(
						this,
						de(() => u(this, Ge))
					),
					(n = he(this, wr, ss).call(this))),
				() => {
					n(), u(this, ln).call(this), globalThis.bitsTextSelectionLayers.delete(this);
				}
			)
		);
	}
}
(rn = new WeakMap()),
	(on = new WeakMap()),
	(sn = new WeakMap()),
	(Ge = new WeakMap()),
	(xt = new WeakMap()),
	(an = new WeakMap()),
	(wr = new WeakSet()),
	(ss = function () {
		return ft(
			Se(document, 'pointerdown', u(this, xr)),
			Se(document, 'pointerup', Zi(u(this, ln), u(this, sn)))
		);
	}),
	(xr = new WeakMap()),
	(ln = new WeakMap());
function Ic(t) {
	return new kc(t);
}
const li = (t) => t.style.userSelect || t.style.webkitUserSelect;
function Rc(t) {
	const e = document.body,
		n = li(e),
		r = li(t);
	return (
		tr(e, 'none'),
		tr(t, 'text'),
		() => {
			tr(e, n), tr(t, r);
		}
	);
}
function tr(t, e) {
	(t.style.userSelect = e), (t.style.webkitUserSelect = e);
}
function Mc(t) {
	const e = [...globalThis.bitsTextSelectionLayers];
	if (!e.length) return !1;
	const n = e.at(-1);
	return n ? n[0] === t : !1;
}
function Fc(t, e) {
	oe(e, !0);
	let n = P(e, 'preventOverflowTextSelection', 3, !0),
		r = P(e, 'onPointerDown', 3, se),
		i = P(e, 'onPointerUp', 3, se);
	Ic({
		id: O.with(() => e.id),
		preventOverflowTextSelection: O.with(() => n()),
		onPointerDown: O.with(() => r()),
		onPointerUp: O.with(() => i()),
		enabled: O.with(() => e.enabled)
	});
	var o = X(),
		s = H(o);
	$(s, () => e.children ?? ne), F(t, o), ie();
}
var ye, be, Ie, St, rr;
const Ao = class Ao extends Map {
	constructor(n) {
		super();
		S(this, St);
		S(this, ye, new Map());
		S(this, be, Ve(0));
		S(this, Ie, Ve(0));
		if (n) {
			for (var [r, i] of n) super.set(r, i);
			u(this, Ie).v = super.size;
		}
	}
	has(n) {
		var r = u(this, ye),
			i = r.get(n);
		if (i === void 0) {
			var o = super.get(n);
			if (o !== void 0) (i = Ve(0)), r.set(n, i);
			else return y(u(this, be)), !1;
		}
		return y(i), !0;
	}
	forEach(n, r) {
		he(this, St, rr).call(this), super.forEach(n, r);
	}
	get(n) {
		var r = u(this, ye),
			i = r.get(n);
		if (i === void 0) {
			var o = super.get(n);
			if (o !== void 0) (i = Ve(0)), r.set(n, i);
			else {
				y(u(this, be));
				return;
			}
		}
		return y(i), super.get(n);
	}
	set(n, r) {
		var p;
		var i = u(this, ye),
			o = i.get(n),
			s = super.get(n),
			a = super.set(n, r),
			l = u(this, be);
		if (o === void 0) i.set(n, Ve(0)), I(u(this, Ie), super.size), Nt(l);
		else if (s !== r) {
			Nt(o);
			var d = l.reactions === null ? null : new Set(l.reactions),
				f = d === null || !((p = o.reactions) != null && p.every((g) => d.has(g)));
			f && Nt(l);
		}
		return a;
	}
	delete(n) {
		var r = u(this, ye),
			i = r.get(n),
			o = super.delete(n);
		return (
			i !== void 0 &&
				(r.delete(n), I(u(this, Ie), super.size), I(i, -1), Nt(u(this, be))),
			o
		);
	}
	clear() {
		if (super.size !== 0) {
			super.clear();
			var n = u(this, ye);
			I(u(this, Ie), 0);
			for (var r of n.values()) I(r, -1);
			Nt(u(this, be)), n.clear();
		}
	}
	keys() {
		return y(u(this, be)), super.keys();
	}
	values() {
		return he(this, St, rr).call(this), super.values();
	}
	entries() {
		return he(this, St, rr).call(this), super.entries();
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	get size() {
		return y(u(this, Ie)), super.size;
	}
};
(ye = new WeakMap()),
	(be = new WeakMap()),
	(Ie = new WeakMap()),
	(St = new WeakSet()),
	(rr = function () {
		y(u(this, be));
		var n = u(this, ye);
		if (u(this, Ie).v !== n.size)
			for (var r of Co(Ao.prototype, this, 'keys').call(this))
				n.has(r) || n.set(r, Ve(0));
		for (var [, i] of u(this, ye)) y(i);
	});
let ro = Ao;
function Lc(t) {
	let e = 0,
		n = J(void 0),
		r;
	function i() {
		(e -= 1), r && e <= 0 && (r(), I(n, void 0), (r = void 0));
	}
	return (...o) => (
		(e += 1),
		y(n) === void 0 &&
			(r = Js(() => {
				I(n, t(...o), !0);
			})),
		q(() => () => {
			i();
		}),
		y(n)
	);
}
const Nc = Lc(() => {
	const t = new ro(),
		e = V(() => {
			for (const o of t.values()) if (o) return !0;
			return !1;
		});
	let n = at({}),
		r = null;
	function i() {
		Tr &&
			((document.body.style.paddingRight = n.paddingRight ?? ''),
			(document.body.style.marginRight = n.marginRight ?? ''),
			(document.body.style.pointerEvents = n.pointerEvents ?? ''),
			document.body.style.removeProperty('--scrollbar-width'),
			(document.body.style.overflow = n.overflow ?? ''),
			ti && (r == null || r()));
	}
	return (
		q(() => {
			const o = y(e);
			return de(() => {
				if (!o) return;
				const s = getComputedStyle(document.body);
				(n.overflow = s.overflow),
					(n.paddingRight = s.paddingRight),
					(n.marginRight = s.marginRight),
					(n.pointerEvents = s.pointerEvents);
				const a = window.innerWidth - document.documentElement.clientWidth,
					d = {
						padding: Number.parseInt(n.paddingRight ?? '0', 10) + a,
						margin: Number.parseInt(n.marginRight ?? '0', 10)
					};
				a > 0 &&
					((document.body.style.paddingRight = `${d.padding}px`),
					(document.body.style.marginRight = `${d.margin}px`),
					document.body.style.setProperty('--scrollbar-width', `${a}px`),
					(document.body.style.overflow = 'hidden')),
					ti &&
						(r = Se(
							document,
							'touchmove',
							(f) => {
								f.target === document.documentElement &&
									(f.touches.length > 1 || f.preventDefault());
							},
							{ passive: !1 }
						)),
					_r(() => {
						(document.body.style.pointerEvents = 'none'),
							(document.body.style.overflow = 'hidden');
					});
			});
		}),
		q(() => () => {
			r == null || r();
		}),
		{
			get map() {
				return t;
			},
			resetBodyStyle: i
		}
	);
});
function Dc(t, e = () => null) {
	const n = ut(),
		r = Nc(),
		i = V(e);
	r.map.set(n, t ?? !1);
	const o = O.with(
		() => r.map.get(n) ?? !1,
		(s) => r.map.set(n, s)
	);
	return (
		q(() => () => {
			r.map.delete(n),
				!zc(r.map) &&
					(y(i) === null
						? requestAnimationFrame(() => r.resetBodyStyle())
						: es(y(i), () => r.resetBodyStyle()));
		}),
		o
	);
}
function zc(t) {
	for (const [e, n] of t) if (n) return !0;
	return !1;
}
function ci(t, e) {
	oe(e, !0);
	let n = P(e, 'preventScroll', 3, !0),
		r = P(e, 'restoreScrollDelay', 3, null);
	Dc(n(), () => r()), ie();
}
const Bc = ['top', 'right', 'bottom', 'left'],
	Je = Math.min,
	ue = Math.max,
	ar = Math.round,
	nr = Math.floor,
	Pe = (t) => ({ x: t, y: t }),
	Vc = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' },
	Wc = { start: 'end', end: 'start' };
function oo(t, e, n) {
	return ue(t, Je(e, n));
}
function Fe(t, e) {
	return typeof t == 'function' ? t(e) : t;
}
function Le(t) {
	return t.split('-')[0];
}
function Ft(t) {
	return t.split('-')[1];
}
function po(t) {
	return t === 'x' ? 'y' : 'x';
}
function vo(t) {
	return t === 'y' ? 'height' : 'width';
}
function Re(t) {
	return ['top', 'bottom'].includes(Le(t)) ? 'y' : 'x';
}
function yo(t) {
	return po(Re(t));
}
function Kc(t, e, n) {
	n === void 0 && (n = !1);
	const r = Ft(t),
		i = yo(t),
		o = vo(i);
	let s =
		i === 'x'
			? r === (n ? 'end' : 'start')
				? 'right'
				: 'left'
			: r === 'start'
				? 'bottom'
				: 'top';
	return e.reference[o] > e.floating[o] && (s = lr(s)), [s, lr(s)];
}
function Uc(t) {
	const e = lr(t);
	return [io(t), e, io(e)];
}
function io(t) {
	return t.replace(/start|end/g, (e) => Wc[e]);
}
function Hc(t, e, n) {
	const r = ['left', 'right'],
		i = ['right', 'left'],
		o = ['top', 'bottom'],
		s = ['bottom', 'top'];
	switch (t) {
		case 'top':
		case 'bottom':
			return n ? (e ? i : r) : e ? r : i;
		case 'left':
		case 'right':
			return e ? o : s;
		default:
			return [];
	}
}
function jc(t, e, n, r) {
	const i = Ft(t);
	let o = Hc(Le(t), n === 'start', r);
	return i && ((o = o.map((s) => s + '-' + i)), e && (o = o.concat(o.map(io)))), o;
}
function lr(t) {
	return t.replace(/left|right|bottom|top/g, (e) => Vc[e]);
}
function Gc(t) {
	return { top: 0, right: 0, bottom: 0, left: 0, ...t };
}
function as(t) {
	return typeof t != 'number' ? Gc(t) : { top: t, right: t, bottom: t, left: t };
}
function cr(t) {
	const { x: e, y: n, width: r, height: i } = t;
	return {
		width: r,
		height: i,
		top: n,
		left: e,
		right: e + r,
		bottom: n + i,
		x: e,
		y: n
	};
}
function ui(t, e, n) {
	let { reference: r, floating: i } = t;
	const o = Re(e),
		s = yo(e),
		a = vo(s),
		l = Le(e),
		d = o === 'y',
		f = r.x + r.width / 2 - i.width / 2,
		p = r.y + r.height / 2 - i.height / 2,
		g = r[a] / 2 - i[a] / 2;
	let m;
	switch (l) {
		case 'top':
			m = { x: f, y: r.y - i.height };
			break;
		case 'bottom':
			m = { x: f, y: r.y + r.height };
			break;
		case 'right':
			m = { x: r.x + r.width, y: p };
			break;
		case 'left':
			m = { x: r.x - i.width, y: p };
			break;
		default:
			m = { x: r.x, y: r.y };
	}
	switch (Ft(e)) {
		case 'start':
			m[s] -= g * (n && d ? -1 : 1);
			break;
		case 'end':
			m[s] += g * (n && d ? -1 : 1);
			break;
	}
	return m;
}
const Yc = async (t, e, n) => {
	const {
			placement: r = 'bottom',
			strategy: i = 'absolute',
			middleware: o = [],
			platform: s
		} = n,
		a = o.filter(Boolean),
		l = await (s.isRTL == null ? void 0 : s.isRTL(e));
	let d = await s.getElementRects({ reference: t, floating: e, strategy: i }),
		{ x: f, y: p } = ui(d, r, l),
		g = r,
		m = {},
		c = 0;
	for (let h = 0; h < a.length; h++) {
		const { name: v, fn: w } = a[h],
			{
				x: b,
				y: A,
				data: x,
				reset: E
			} = await w({
				x: f,
				y: p,
				initialPlacement: r,
				placement: g,
				strategy: i,
				middlewareData: m,
				rects: d,
				platform: s,
				elements: { reference: t, floating: e }
			});
		(f = b ?? f),
			(p = A ?? p),
			(m = { ...m, [v]: { ...m[v], ...x } }),
			E &&
				c <= 50 &&
				(c++,
				typeof E == 'object' &&
					(E.placement && (g = E.placement),
					E.rects &&
						(d =
							E.rects === !0
								? await s.getElementRects({ reference: t, floating: e, strategy: i })
								: E.rects),
					({ x: f, y: p } = ui(d, g, l))),
				(h = -1));
	}
	return { x: f, y: p, placement: g, strategy: i, middlewareData: m };
};
async function Gt(t, e) {
	var n;
	e === void 0 && (e = {});
	const { x: r, y: i, platform: o, rects: s, elements: a, strategy: l } = t,
		{
			boundary: d = 'clippingAncestors',
			rootBoundary: f = 'viewport',
			elementContext: p = 'floating',
			altBoundary: g = !1,
			padding: m = 0
		} = Fe(e, t),
		c = as(m),
		v = a[g ? (p === 'floating' ? 'reference' : 'floating') : p],
		w = cr(
			await o.getClippingRect({
				element:
					(n = await (o.isElement == null ? void 0 : o.isElement(v))) == null || n
						? v
						: v.contextElement ||
							(await (o.getDocumentElement == null
								? void 0
								: o.getDocumentElement(a.floating))),
				boundary: d,
				rootBoundary: f,
				strategy: l
			})
		),
		b =
			p === 'floating'
				? { x: r, y: i, width: s.floating.width, height: s.floating.height }
				: s.reference,
		A = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(a.floating)),
		x = (await (o.isElement == null ? void 0 : o.isElement(A)))
			? (await (o.getScale == null ? void 0 : o.getScale(A))) || { x: 1, y: 1 }
			: { x: 1, y: 1 },
		E = cr(
			o.convertOffsetParentRelativeRectToViewportRelativeRect
				? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
						elements: a,
						rect: b,
						offsetParent: A,
						strategy: l
					})
				: b
		);
	return {
		top: (w.top - E.top + c.top) / x.y,
		bottom: (E.bottom - w.bottom + c.bottom) / x.y,
		left: (w.left - E.left + c.left) / x.x,
		right: (E.right - w.right + c.right) / x.x
	};
}
const Xc = (t) => ({
		name: 'arrow',
		options: t,
		async fn(e) {
			const {
					x: n,
					y: r,
					placement: i,
					rects: o,
					platform: s,
					elements: a,
					middlewareData: l
				} = e,
				{ element: d, padding: f = 0 } = Fe(t, e) || {};
			if (d == null) return {};
			const p = as(f),
				g = { x: n, y: r },
				m = yo(i),
				c = vo(m),
				h = await s.getDimensions(d),
				v = m === 'y',
				w = v ? 'top' : 'left',
				b = v ? 'bottom' : 'right',
				A = v ? 'clientHeight' : 'clientWidth',
				x = o.reference[c] + o.reference[m] - g[m] - o.floating[c],
				E = g[m] - o.reference[m],
				W = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(d));
			let N = W ? W[A] : 0;
			(!N || !(await (s.isElement == null ? void 0 : s.isElement(W)))) &&
				(N = a.floating[A] || o.floating[c]);
			const Y = x / 2 - E / 2,
				U = N / 2 - h[c] / 2 - 1,
				B = Je(p[w], U),
				j = Je(p[b], U),
				C = B,
				R = N - h[c] - j,
				T = N / 2 - h[c] / 2 + Y,
				_ = oo(C, T, R),
				k =
					!l.arrow &&
					Ft(i) != null &&
					T !== _ &&
					o.reference[c] / 2 - (T < C ? B : j) - h[c] / 2 < 0,
				L = k ? (T < C ? T - C : T - R) : 0;
			return {
				[m]: g[m] + L,
				data: { [m]: _, centerOffset: T - _ - L, ...(k && { alignmentOffset: L }) },
				reset: k
			};
		}
	}),
	qc = function (t) {
		return (
			t === void 0 && (t = {}),
			{
				name: 'flip',
				options: t,
				async fn(e) {
					var n, r;
					const {
							placement: i,
							middlewareData: o,
							rects: s,
							initialPlacement: a,
							platform: l,
							elements: d
						} = e,
						{
							mainAxis: f = !0,
							crossAxis: p = !0,
							fallbackPlacements: g,
							fallbackStrategy: m = 'bestFit',
							fallbackAxisSideDirection: c = 'none',
							flipAlignment: h = !0,
							...v
						} = Fe(t, e);
					if ((n = o.arrow) != null && n.alignmentOffset) return {};
					const w = Le(i),
						b = Re(a),
						A = Le(a) === a,
						x = await (l.isRTL == null ? void 0 : l.isRTL(d.floating)),
						E = g || (A || !h ? [lr(a)] : Uc(a)),
						W = c !== 'none';
					!g && W && E.push(...jc(a, h, c, x));
					const N = [a, ...E],
						Y = await Gt(e, v),
						U = [];
					let B = ((r = o.flip) == null ? void 0 : r.overflows) || [];
					if ((f && U.push(Y[w]), p)) {
						const _ = Kc(i, s, x);
						U.push(Y[_[0]], Y[_[1]]);
					}
					if (((B = [...B, { placement: i, overflows: U }]), !U.every((_) => _ <= 0))) {
						var j, C;
						const _ = (((j = o.flip) == null ? void 0 : j.index) || 0) + 1,
							k = N[_];
						if (k) {
							var R;
							const M = p === 'alignment' ? b !== Re(k) : !1,
								D = ((R = B[0]) == null ? void 0 : R.overflows[0]) > 0;
							if (!M || D)
								return { data: { index: _, overflows: B }, reset: { placement: k } };
						}
						let L =
							(C = B.filter((M) => M.overflows[0] <= 0).sort(
								(M, D) => M.overflows[1] - D.overflows[1]
							)[0]) == null
								? void 0
								: C.placement;
						if (!L)
							switch (m) {
								case 'bestFit': {
									var T;
									const M =
										(T = B.filter((D) => {
											if (W) {
												const G = Re(D.placement);
												return G === b || G === 'y';
											}
											return !0;
										})
											.map((D) => [
												D.placement,
												D.overflows.filter((G) => G > 0).reduce((G, ee) => G + ee, 0)
											])
											.sort((D, G) => D[1] - G[1])[0]) == null
											? void 0
											: T[0];
									M && (L = M);
									break;
								}
								case 'initialPlacement':
									L = a;
									break;
							}
						if (i !== L) return { reset: { placement: L } };
					}
					return {};
				}
			}
		);
	};
function di(t, e) {
	return {
		top: t.top - e.height,
		right: t.right - e.width,
		bottom: t.bottom - e.height,
		left: t.left - e.width
	};
}
function fi(t) {
	return Bc.some((e) => t[e] >= 0);
}
const Zc = function (t) {
	return (
		t === void 0 && (t = {}),
		{
			name: 'hide',
			options: t,
			async fn(e) {
				const { rects: n } = e,
					{ strategy: r = 'referenceHidden', ...i } = Fe(t, e);
				switch (r) {
					case 'referenceHidden': {
						const o = await Gt(e, { ...i, elementContext: 'reference' }),
							s = di(o, n.reference);
						return { data: { referenceHiddenOffsets: s, referenceHidden: fi(s) } };
					}
					case 'escaped': {
						const o = await Gt(e, { ...i, altBoundary: !0 }),
							s = di(o, n.floating);
						return { data: { escapedOffsets: s, escaped: fi(s) } };
					}
					default:
						return {};
				}
			}
		}
	);
};
async function Jc(t, e) {
	const { placement: n, platform: r, elements: i } = t,
		o = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)),
		s = Le(n),
		a = Ft(n),
		l = Re(n) === 'y',
		d = ['left', 'top'].includes(s) ? -1 : 1,
		f = o && l ? -1 : 1,
		p = Fe(e, t);
	let {
		mainAxis: g,
		crossAxis: m,
		alignmentAxis: c
	} = typeof p == 'number'
		? { mainAxis: p, crossAxis: 0, alignmentAxis: null }
		: {
				mainAxis: p.mainAxis || 0,
				crossAxis: p.crossAxis || 0,
				alignmentAxis: p.alignmentAxis
			};
	return (
		a && typeof c == 'number' && (m = a === 'end' ? c * -1 : c),
		l ? { x: m * f, y: g * d } : { x: g * d, y: m * f }
	);
}
const Qc = function (t) {
		return (
			t === void 0 && (t = 0),
			{
				name: 'offset',
				options: t,
				async fn(e) {
					var n, r;
					const { x: i, y: o, placement: s, middlewareData: a } = e,
						l = await Jc(e, t);
					return s === ((n = a.offset) == null ? void 0 : n.placement) &&
						(r = a.arrow) != null &&
						r.alignmentOffset
						? {}
						: { x: i + l.x, y: o + l.y, data: { ...l, placement: s } };
				}
			}
		);
	},
	$c = function (t) {
		return (
			t === void 0 && (t = {}),
			{
				name: 'shift',
				options: t,
				async fn(e) {
					const { x: n, y: r, placement: i } = e,
						{
							mainAxis: o = !0,
							crossAxis: s = !1,
							limiter: a = {
								fn: (v) => {
									let { x: w, y: b } = v;
									return { x: w, y: b };
								}
							},
							...l
						} = Fe(t, e),
						d = { x: n, y: r },
						f = await Gt(e, l),
						p = Re(Le(i)),
						g = po(p);
					let m = d[g],
						c = d[p];
					if (o) {
						const v = g === 'y' ? 'top' : 'left',
							w = g === 'y' ? 'bottom' : 'right',
							b = m + f[v],
							A = m - f[w];
						m = oo(b, m, A);
					}
					if (s) {
						const v = p === 'y' ? 'top' : 'left',
							w = p === 'y' ? 'bottom' : 'right',
							b = c + f[v],
							A = c - f[w];
						c = oo(b, c, A);
					}
					const h = a.fn({ ...e, [g]: m, [p]: c });
					return {
						...h,
						data: { x: h.x - n, y: h.y - r, enabled: { [g]: o, [p]: s } }
					};
				}
			}
		);
	},
	eu = function (t) {
		return (
			t === void 0 && (t = {}),
			{
				options: t,
				fn(e) {
					const { x: n, y: r, placement: i, rects: o, middlewareData: s } = e,
						{ offset: a = 0, mainAxis: l = !0, crossAxis: d = !0 } = Fe(t, e),
						f = { x: n, y: r },
						p = Re(i),
						g = po(p);
					let m = f[g],
						c = f[p];
					const h = Fe(a, e),
						v =
							typeof h == 'number'
								? { mainAxis: h, crossAxis: 0 }
								: { mainAxis: 0, crossAxis: 0, ...h };
					if (l) {
						const A = g === 'y' ? 'height' : 'width',
							x = o.reference[g] - o.floating[A] + v.mainAxis,
							E = o.reference[g] + o.reference[A] - v.mainAxis;
						m < x ? (m = x) : m > E && (m = E);
					}
					if (d) {
						var w, b;
						const A = g === 'y' ? 'width' : 'height',
							x = ['top', 'left'].includes(Le(i)),
							E =
								o.reference[p] -
								o.floating[A] +
								((x && ((w = s.offset) == null ? void 0 : w[p])) || 0) +
								(x ? 0 : v.crossAxis),
							W =
								o.reference[p] +
								o.reference[A] +
								(x ? 0 : ((b = s.offset) == null ? void 0 : b[p]) || 0) -
								(x ? v.crossAxis : 0);
						c < E ? (c = E) : c > W && (c = W);
					}
					return { [g]: m, [p]: c };
				}
			}
		);
	},
	tu = function (t) {
		return (
			t === void 0 && (t = {}),
			{
				name: 'size',
				options: t,
				async fn(e) {
					var n, r;
					const { placement: i, rects: o, platform: s, elements: a } = e,
						{ apply: l = () => {}, ...d } = Fe(t, e),
						f = await Gt(e, d),
						p = Le(i),
						g = Ft(i),
						m = Re(i) === 'y',
						{ width: c, height: h } = o.floating;
					let v, w;
					p === 'top' || p === 'bottom'
						? ((v = p),
							(w =
								g ===
								((await (s.isRTL == null ? void 0 : s.isRTL(a.floating)))
									? 'start'
									: 'end')
									? 'left'
									: 'right'))
						: ((w = p), (v = g === 'end' ? 'top' : 'bottom'));
					const b = h - f.top - f.bottom,
						A = c - f.left - f.right,
						x = Je(h - f[v], b),
						E = Je(c - f[w], A),
						W = !e.middlewareData.shift;
					let N = x,
						Y = E;
					if (
						((n = e.middlewareData.shift) != null && n.enabled.x && (Y = A),
						(r = e.middlewareData.shift) != null && r.enabled.y && (N = b),
						W && !g)
					) {
						const B = ue(f.left, 0),
							j = ue(f.right, 0),
							C = ue(f.top, 0),
							R = ue(f.bottom, 0);
						m
							? (Y = c - 2 * (B !== 0 || j !== 0 ? B + j : ue(f.left, f.right)))
							: (N = h - 2 * (C !== 0 || R !== 0 ? C + R : ue(f.top, f.bottom)));
					}
					await l({ ...e, availableWidth: Y, availableHeight: N });
					const U = await s.getDimensions(a.floating);
					return c !== U.width || h !== U.height ? { reset: { rects: !0 } } : {};
				}
			}
		);
	};
function kr() {
	return typeof window < 'u';
}
function Lt(t) {
	return ls(t) ? (t.nodeName || '').toLowerCase() : '#document';
}
function fe(t) {
	var e;
	return (
		(t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window
	);
}
function Ce(t) {
	var e;
	return (e = (ls(t) ? t.ownerDocument : t.document) || window.document) == null
		? void 0
		: e.documentElement;
}
function ls(t) {
	return kr() ? t instanceof Node || t instanceof fe(t).Node : !1;
}
function pe(t) {
	return kr() ? t instanceof Element || t instanceof fe(t).Element : !1;
}
function Ee(t) {
	return kr() ? t instanceof HTMLElement || t instanceof fe(t).HTMLElement : !1;
}
function hi(t) {
	return !kr() || typeof ShadowRoot > 'u'
		? !1
		: t instanceof ShadowRoot || t instanceof fe(t).ShadowRoot;
}
function Qn(t) {
	const { overflow: e, overflowX: n, overflowY: r, display: i } = ve(t);
	return (
		/auto|scroll|overlay|hidden|clip/.test(e + r + n) &&
		!['inline', 'contents'].includes(i)
	);
}
function nu(t) {
	return ['table', 'td', 'th'].includes(Lt(t));
}
function Ir(t) {
	return [':popover-open', ':modal'].some((e) => {
		try {
			return t.matches(e);
		} catch {
			return !1;
		}
	});
}
function bo(t) {
	const e = wo(),
		n = pe(t) ? ve(t) : t;
	return (
		['transform', 'translate', 'scale', 'rotate', 'perspective'].some((r) =>
			n[r] ? n[r] !== 'none' : !1
		) ||
		(n.containerType ? n.containerType !== 'normal' : !1) ||
		(!e && (n.backdropFilter ? n.backdropFilter !== 'none' : !1)) ||
		(!e && (n.filter ? n.filter !== 'none' : !1)) ||
		['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'].some((r) =>
			(n.willChange || '').includes(r)
		) ||
		['paint', 'layout', 'strict', 'content'].some((r) => (n.contain || '').includes(r))
	);
}
function ru(t) {
	let e = Qe(t);
	for (; Ee(e) && !It(e); ) {
		if (bo(e)) return e;
		if (Ir(e)) return null;
		e = Qe(e);
	}
	return null;
}
function wo() {
	return typeof CSS > 'u' || !CSS.supports
		? !1
		: CSS.supports('-webkit-backdrop-filter', 'none');
}
function It(t) {
	return ['html', 'body', '#document'].includes(Lt(t));
}
function ve(t) {
	return fe(t).getComputedStyle(t);
}
function Rr(t) {
	return pe(t)
		? { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop }
		: { scrollLeft: t.scrollX, scrollTop: t.scrollY };
}
function Qe(t) {
	if (Lt(t) === 'html') return t;
	const e = t.assignedSlot || t.parentNode || (hi(t) && t.host) || Ce(t);
	return hi(e) ? e.host : e;
}
function cs(t) {
	const e = Qe(t);
	return It(e)
		? t.ownerDocument
			? t.ownerDocument.body
			: t.body
		: Ee(e) && Qn(e)
			? e
			: cs(e);
}
function Yt(t, e, n) {
	var r;
	e === void 0 && (e = []), n === void 0 && (n = !0);
	const i = cs(t),
		o = i === ((r = t.ownerDocument) == null ? void 0 : r.body),
		s = fe(i);
	if (o) {
		const a = so(s);
		return e.concat(s, s.visualViewport || [], Qn(i) ? i : [], a && n ? Yt(a) : []);
	}
	return e.concat(i, Yt(i, [], n));
}
function so(t) {
	return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function us(t) {
	const e = ve(t);
	let n = parseFloat(e.width) || 0,
		r = parseFloat(e.height) || 0;
	const i = Ee(t),
		o = i ? t.offsetWidth : n,
		s = i ? t.offsetHeight : r,
		a = ar(n) !== o || ar(r) !== s;
	return a && ((n = o), (r = s)), { width: n, height: r, $: a };
}
function xo(t) {
	return pe(t) ? t : t.contextElement;
}
function ht(t) {
	const e = xo(t);
	if (!Ee(e)) return Pe(1);
	const n = e.getBoundingClientRect(),
		{ width: r, height: i, $: o } = us(e);
	let s = (o ? ar(n.width) : n.width) / r,
		a = (o ? ar(n.height) : n.height) / i;
	return (
		(!s || !Number.isFinite(s)) && (s = 1),
		(!a || !Number.isFinite(a)) && (a = 1),
		{ x: s, y: a }
	);
}
const ou = Pe(0);
function ds(t) {
	const e = fe(t);
	return !wo() || !e.visualViewport
		? ou
		: { x: e.visualViewport.offsetLeft, y: e.visualViewport.offsetTop };
}
function iu(t, e, n) {
	return e === void 0 && (e = !1), !n || (e && n !== fe(t)) ? !1 : e;
}
function ct(t, e, n, r) {
	e === void 0 && (e = !1), n === void 0 && (n = !1);
	const i = t.getBoundingClientRect(),
		o = xo(t);
	let s = Pe(1);
	e && (r ? pe(r) && (s = ht(r)) : (s = ht(t)));
	const a = iu(o, n, r) ? ds(o) : Pe(0);
	let l = (i.left + a.x) / s.x,
		d = (i.top + a.y) / s.y,
		f = i.width / s.x,
		p = i.height / s.y;
	if (o) {
		const g = fe(o),
			m = r && pe(r) ? fe(r) : r;
		let c = g,
			h = so(c);
		for (; h && r && m !== c; ) {
			const v = ht(h),
				w = h.getBoundingClientRect(),
				b = ve(h),
				A = w.left + (h.clientLeft + parseFloat(b.paddingLeft)) * v.x,
				x = w.top + (h.clientTop + parseFloat(b.paddingTop)) * v.y;
			(l *= v.x),
				(d *= v.y),
				(f *= v.x),
				(p *= v.y),
				(l += A),
				(d += x),
				(c = fe(h)),
				(h = so(c));
		}
	}
	return cr({ width: f, height: p, x: l, y: d });
}
function So(t, e) {
	const n = Rr(t).scrollLeft;
	return e ? e.left + n : ct(Ce(t)).left + n;
}
function fs(t, e, n) {
	n === void 0 && (n = !1);
	const r = t.getBoundingClientRect(),
		i = r.left + e.scrollLeft - (n ? 0 : So(t, r)),
		o = r.top + e.scrollTop;
	return { x: i, y: o };
}
function su(t) {
	let { elements: e, rect: n, offsetParent: r, strategy: i } = t;
	const o = i === 'fixed',
		s = Ce(r),
		a = e ? Ir(e.floating) : !1;
	if (r === s || (a && o)) return n;
	let l = { scrollLeft: 0, scrollTop: 0 },
		d = Pe(1);
	const f = Pe(0),
		p = Ee(r);
	if ((p || (!p && !o)) && ((Lt(r) !== 'body' || Qn(s)) && (l = Rr(r)), Ee(r))) {
		const m = ct(r);
		(d = ht(r)), (f.x = m.x + r.clientLeft), (f.y = m.y + r.clientTop);
	}
	const g = s && !p && !o ? fs(s, l, !0) : Pe(0);
	return {
		width: n.width * d.x,
		height: n.height * d.y,
		x: n.x * d.x - l.scrollLeft * d.x + f.x + g.x,
		y: n.y * d.y - l.scrollTop * d.y + f.y + g.y
	};
}
function au(t) {
	return Array.from(t.getClientRects());
}
function lu(t) {
	const e = Ce(t),
		n = Rr(t),
		r = t.ownerDocument.body,
		i = ue(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth),
		o = ue(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
	let s = -n.scrollLeft + So(t);
	const a = -n.scrollTop;
	return (
		ve(r).direction === 'rtl' && (s += ue(e.clientWidth, r.clientWidth) - i),
		{ width: i, height: o, x: s, y: a }
	);
}
function cu(t, e) {
	const n = fe(t),
		r = Ce(t),
		i = n.visualViewport;
	let o = r.clientWidth,
		s = r.clientHeight,
		a = 0,
		l = 0;
	if (i) {
		(o = i.width), (s = i.height);
		const d = wo();
		(!d || (d && e === 'fixed')) && ((a = i.offsetLeft), (l = i.offsetTop));
	}
	return { width: o, height: s, x: a, y: l };
}
function uu(t, e) {
	const n = ct(t, !0, e === 'fixed'),
		r = n.top + t.clientTop,
		i = n.left + t.clientLeft,
		o = Ee(t) ? ht(t) : Pe(1),
		s = t.clientWidth * o.x,
		a = t.clientHeight * o.y,
		l = i * o.x,
		d = r * o.y;
	return { width: s, height: a, x: l, y: d };
}
function gi(t, e, n) {
	let r;
	if (e === 'viewport') r = cu(t, n);
	else if (e === 'document') r = lu(Ce(t));
	else if (pe(e)) r = uu(e, n);
	else {
		const i = ds(t);
		r = { x: e.x - i.x, y: e.y - i.y, width: e.width, height: e.height };
	}
	return cr(r);
}
function hs(t, e) {
	const n = Qe(t);
	return n === e || !pe(n) || It(n) ? !1 : ve(n).position === 'fixed' || hs(n, e);
}
function du(t, e) {
	const n = e.get(t);
	if (n) return n;
	let r = Yt(t, [], !1).filter((a) => pe(a) && Lt(a) !== 'body'),
		i = null;
	const o = ve(t).position === 'fixed';
	let s = o ? Qe(t) : t;
	for (; pe(s) && !It(s); ) {
		const a = ve(s),
			l = bo(s);
		!l && a.position === 'fixed' && (i = null),
			(
				o
					? !l && !i
					: (!l &&
							a.position === 'static' &&
							!!i &&
							['absolute', 'fixed'].includes(i.position)) ||
						(Qn(s) && !l && hs(t, s))
			)
				? (r = r.filter((f) => f !== s))
				: (i = a),
			(s = Qe(s));
	}
	return e.set(t, r), r;
}
function fu(t) {
	let { element: e, boundary: n, rootBoundary: r, strategy: i } = t;
	const s = [
			...(n === 'clippingAncestors' ? (Ir(e) ? [] : du(e, this._c)) : [].concat(n)),
			r
		],
		a = s[0],
		l = s.reduce(
			(d, f) => {
				const p = gi(e, f, i);
				return (
					(d.top = ue(p.top, d.top)),
					(d.right = Je(p.right, d.right)),
					(d.bottom = Je(p.bottom, d.bottom)),
					(d.left = ue(p.left, d.left)),
					d
				);
			},
			gi(e, a, i)
		);
	return { width: l.right - l.left, height: l.bottom - l.top, x: l.left, y: l.top };
}
function hu(t) {
	const { width: e, height: n } = us(t);
	return { width: e, height: n };
}
function gu(t, e, n) {
	const r = Ee(e),
		i = Ce(e),
		o = n === 'fixed',
		s = ct(t, !0, o, e);
	let a = { scrollLeft: 0, scrollTop: 0 };
	const l = Pe(0);
	function d() {
		l.x = So(i);
	}
	if (r || (!r && !o))
		if (((Lt(e) !== 'body' || Qn(i)) && (a = Rr(e)), r)) {
			const m = ct(e, !0, o, e);
			(l.x = m.x + e.clientLeft), (l.y = m.y + e.clientTop);
		} else i && d();
	o && !r && i && d();
	const f = i && !r && !o ? fs(i, a) : Pe(0),
		p = s.left + a.scrollLeft - l.x - f.x,
		g = s.top + a.scrollTop - l.y - f.y;
	return { x: p, y: g, width: s.width, height: s.height };
}
function jr(t) {
	return ve(t).position === 'static';
}
function mi(t, e) {
	if (!Ee(t) || ve(t).position === 'fixed') return null;
	if (e) return e(t);
	let n = t.offsetParent;
	return Ce(t) === n && (n = n.ownerDocument.body), n;
}
function gs(t, e) {
	const n = fe(t);
	if (Ir(t)) return n;
	if (!Ee(t)) {
		let i = Qe(t);
		for (; i && !It(i); ) {
			if (pe(i) && !jr(i)) return i;
			i = Qe(i);
		}
		return n;
	}
	let r = mi(t, e);
	for (; r && nu(r) && jr(r); ) r = mi(r, e);
	return r && It(r) && jr(r) && !bo(r) ? n : r || ru(t) || n;
}
const mu = async function (t) {
	const e = this.getOffsetParent || gs,
		n = this.getDimensions,
		r = await n(t.floating);
	return {
		reference: gu(t.reference, await e(t.floating), t.strategy),
		floating: { x: 0, y: 0, width: r.width, height: r.height }
	};
};
function pu(t) {
	return ve(t).direction === 'rtl';
}
const vu = {
	convertOffsetParentRelativeRectToViewportRelativeRect: su,
	getDocumentElement: Ce,
	getClippingRect: fu,
	getOffsetParent: gs,
	getElementRects: mu,
	getClientRects: au,
	getDimensions: hu,
	getScale: ht,
	isElement: pe,
	isRTL: pu
};
function ms(t, e) {
	return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function yu(t, e) {
	let n = null,
		r;
	const i = Ce(t);
	function o() {
		var a;
		clearTimeout(r), (a = n) == null || a.disconnect(), (n = null);
	}
	function s(a, l) {
		a === void 0 && (a = !1), l === void 0 && (l = 1), o();
		const d = t.getBoundingClientRect(),
			{ left: f, top: p, width: g, height: m } = d;
		if ((a || e(), !g || !m)) return;
		const c = nr(p),
			h = nr(i.clientWidth - (f + g)),
			v = nr(i.clientHeight - (p + m)),
			w = nr(f),
			A = {
				rootMargin: -c + 'px ' + -h + 'px ' + -v + 'px ' + -w + 'px',
				threshold: ue(0, Je(1, l)) || 1
			};
		let x = !0;
		function E(W) {
			const N = W[0].intersectionRatio;
			if (N !== l) {
				if (!x) return s();
				N
					? s(!1, N)
					: (r = setTimeout(() => {
							s(!1, 1e-7);
						}, 1e3));
			}
			N === 1 && !ms(d, t.getBoundingClientRect()) && s(), (x = !1);
		}
		try {
			n = new IntersectionObserver(E, { ...A, root: i.ownerDocument });
		} catch {
			n = new IntersectionObserver(E, A);
		}
		n.observe(t);
	}
	return s(!0), o;
}
function bu(t, e, n, r) {
	r === void 0 && (r = {});
	const {
			ancestorScroll: i = !0,
			ancestorResize: o = !0,
			elementResize: s = typeof ResizeObserver == 'function',
			layoutShift: a = typeof IntersectionObserver == 'function',
			animationFrame: l = !1
		} = r,
		d = xo(t),
		f = i || o ? [...(d ? Yt(d) : []), ...Yt(e)] : [];
	f.forEach((w) => {
		i && w.addEventListener('scroll', n, { passive: !0 }),
			o && w.addEventListener('resize', n);
	});
	const p = d && a ? yu(d, n) : null;
	let g = -1,
		m = null;
	s &&
		((m = new ResizeObserver((w) => {
			let [b] = w;
			b &&
				b.target === d &&
				m &&
				(m.unobserve(e),
				cancelAnimationFrame(g),
				(g = requestAnimationFrame(() => {
					var A;
					(A = m) == null || A.observe(e);
				}))),
				n();
		})),
		d && !l && m.observe(d),
		m.observe(e));
	let c,
		h = l ? ct(t) : null;
	l && v();
	function v() {
		const w = ct(t);
		h && !ms(h, w) && n(), (h = w), (c = requestAnimationFrame(v));
	}
	return (
		n(),
		() => {
			var w;
			f.forEach((b) => {
				i && b.removeEventListener('scroll', n),
					o && b.removeEventListener('resize', n);
			}),
				p == null || p(),
				(w = m) == null || w.disconnect(),
				(m = null),
				l && cancelAnimationFrame(c);
		}
	);
}
const wu = Qc,
	xu = $c,
	Su = qc,
	Pu = tu,
	Au = Zc,
	Eu = Xc,
	Ou = eu,
	Cu = (t, e, n) => {
		const r = new Map(),
			i = { platform: vu, ...n },
			o = { ...i.platform, _c: r };
		return Yc(t, e, { ...i, platform: o });
	};
function Vt(t) {
	return typeof t == 'function' ? t() : t;
}
function ps(t) {
	return typeof window > 'u'
		? 1
		: (t.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function pi(t, e) {
	const n = ps(t);
	return Math.round(e * n) / n;
}
function vi(t) {
	return {
		[`--bits-${t}-content-transform-origin`]: 'var(--bits-floating-transform-origin)',
		[`--bits-${t}-content-available-width`]: 'var(--bits-floating-available-width)',
		[`--bits-${t}-content-available-height`]: 'var(--bits-floating-available-height)',
		[`--bits-${t}-anchor-width`]: 'var(--bits-floating-anchor-width)',
		[`--bits-${t}-anchor-height`]: 'var(--bits-floating-anchor-height)'
	};
}
function _u(t) {
	const e = t.whileElementsMounted,
		n = V(() => Vt(t.open) ?? !0),
		r = V(() => Vt(t.middleware)),
		i = V(() => Vt(t.transform) ?? !0),
		o = V(() => Vt(t.placement) ?? 'bottom'),
		s = V(() => Vt(t.strategy) ?? 'absolute'),
		a = t.reference;
	let l = J(0),
		d = J(0);
	const f = O(null);
	let p = J(at(y(s))),
		g = J(at(y(o))),
		m = J(at({})),
		c = J(!1);
	const h = V(() => {
		const E = { position: y(p), left: '0', top: '0' };
		if (!f.current) return E;
		const W = pi(f.current, y(l)),
			N = pi(f.current, y(d));
		return y(i)
			? {
					...E,
					transform: `translate(${W}px, ${N}px)`,
					...(ps(f.current) >= 1.5 && { willChange: 'transform' })
				}
			: { position: y(p), left: `${W}px`, top: `${N}px` };
	});
	let v;
	function w() {
		a.current === null ||
			f.current === null ||
			Cu(a.current, f.current, {
				middleware: y(r),
				placement: y(o),
				strategy: y(s)
			}).then((E) => {
				I(l, E.x, !0),
					I(d, E.y, !0),
					I(p, E.strategy, !0),
					I(g, E.placement, !0),
					I(m, E.middlewareData, !0),
					I(c, !0);
			});
	}
	function b() {
		typeof v == 'function' && (v(), (v = void 0));
	}
	function A() {
		if ((b(), e === void 0)) {
			w();
			return;
		}
		a.current === null || f.current === null || (v = e(a.current, f.current, w));
	}
	function x() {
		y(n) || I(c, !1);
	}
	return (
		q(w),
		q(A),
		q(x),
		q(() => b),
		{
			floating: f,
			reference: a,
			get strategy() {
				return y(p);
			},
			get placement() {
				return y(g);
			},
			get middlewareData() {
				return y(m);
			},
			get isPositioned() {
				return y(c);
			},
			get floatingStyles() {
				return y(h);
			},
			get update() {
				return w;
			}
		}
	);
}
const Tu = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' };
class ku {
	constructor() {
		Z(this, 'anchorNode', O(null));
		Z(this, 'customAnchorNode', O(null));
		Z(this, 'triggerNode', O(null));
		q(() => {
			this.customAnchorNode.current
				? typeof this.customAnchorNode.current == 'string'
					? (this.anchorNode.current = document.querySelector(
							this.customAnchorNode.current
						))
					: (this.anchorNode.current = this.customAnchorNode.current)
				: (this.anchorNode.current = this.triggerNode.current);
		});
	}
}
var cn,
	un,
	dn,
	fn,
	Pt,
	hn,
	gn,
	At,
	st,
	mn,
	pn,
	vn,
	yn,
	bn,
	wn,
	Sr,
	xn,
	Pr,
	Sn,
	Pn,
	An,
	En,
	On,
	Cn,
	_n,
	Tn,
	kn,
	In,
	Rn,
	Mn,
	Fn,
	Ln,
	Nn,
	Dn,
	zn,
	Bn;
class Iu {
	constructor(e, n) {
		Z(this, 'root');
		Z(this, 'contentRef', O(null));
		Z(this, 'wrapperRef', O(null));
		Z(this, 'arrowRef', O(null));
		Z(this, 'arrowId', O(ut()));
		Z(this, 'id');
		Z(this, 'wrapperId');
		Z(this, 'style');
		S(
			this,
			cn,
			V(() => {
				if (typeof this.style == 'string') return Kt(this.style);
				if (!this.style) return {};
			})
		);
		S(this, un);
		S(this, dn);
		S(this, fn);
		S(this, Pt);
		S(this, hn);
		S(this, gn);
		S(this, At);
		S(this, st);
		S(this, mn);
		S(this, pn);
		S(this, vn);
		S(this, yn);
		S(this, bn);
		Z(this, 'onPlaced');
		Z(this, 'enabled');
		S(this, wn, new Hl(() => this.arrowRef.current ?? void 0));
		S(
			this,
			Sr,
			V(() => {
				var e;
				return ((e = u(this, wn)) == null ? void 0 : e.width) ?? 0;
			})
		);
		S(
			this,
			xn,
			V(() => {
				var e;
				return ((e = u(this, wn)) == null ? void 0 : e.height) ?? 0;
			})
		);
		S(
			this,
			Pr,
			V(() => {
				var e;
				return (
					((e = u(this, dn)) == null ? void 0 : e.current) +
					(u(this, Pt).current !== 'center' ? `-${u(this, Pt).current}` : '')
				);
			})
		);
		S(
			this,
			Sn,
			V(() =>
				Array.isArray(u(this, st).current) ? u(this, st).current : [u(this, st).current]
			)
		);
		S(
			this,
			Pn,
			V(() => y(u(this, Sn)).length > 0)
		);
		S(
			this,
			An,
			V(() => ({
				padding: u(this, mn).current,
				boundary: y(u(this, Sn)).filter(ec),
				altBoundary: this.hasExplicitBoundaries
			}))
		);
		S(this, En, J(void 0));
		S(this, On, J(void 0));
		S(this, Cn, J(void 0));
		S(this, _n, J(void 0));
		S(
			this,
			Tn,
			V(() =>
				[
					wu({
						mainAxis: u(this, fn).current + y(u(this, xn)),
						alignmentAxis: u(this, hn).current
					}),
					u(this, At).current &&
						xu({
							mainAxis: !0,
							crossAxis: !1,
							limiter: u(this, pn).current === 'partial' ? Ou() : void 0,
							...this.detectOverflowOptions
						}),
					u(this, At).current && Su({ ...this.detectOverflowOptions }),
					Pu({
						...this.detectOverflowOptions,
						apply: ({ rects: e, availableWidth: n, availableHeight: r }) => {
							const { width: i, height: o } = e.reference;
							I(u(this, En), n, !0),
								I(u(this, On), r, !0),
								I(u(this, Cn), i, !0),
								I(u(this, _n), o, !0);
						}
					}),
					this.arrowRef.current &&
						Eu({ element: this.arrowRef.current, padding: u(this, gn).current }),
					zu({ arrowWidth: y(u(this, Sr)), arrowHeight: y(u(this, xn)) }),
					u(this, vn).current &&
						Au({ strategy: 'referenceHidden', ...this.detectOverflowOptions })
				].filter(Boolean)
			)
		);
		Z(this, 'floating');
		S(
			this,
			kn,
			V(() => Bu(this.floating.placement))
		);
		S(
			this,
			In,
			V(() => Vu(this.floating.placement))
		);
		S(
			this,
			Rn,
			V(() => {
				var e;
				return ((e = this.floating.middlewareData.arrow) == null ? void 0 : e.x) ?? 0;
			})
		);
		S(
			this,
			Mn,
			V(() => {
				var e;
				return ((e = this.floating.middlewareData.arrow) == null ? void 0 : e.y) ?? 0;
			})
		);
		S(
			this,
			Fn,
			V(() => {
				var e;
				return (
					((e = this.floating.middlewareData.arrow) == null
						? void 0
						: e.centerOffset) !== 0
				);
			})
		);
		S(this, Ln, J());
		S(
			this,
			Nn,
			V(() => Tu[this.placedSide])
		);
		S(
			this,
			Dn,
			V(() => {
				var e, n, r;
				return {
					id: this.wrapperId.current,
					'data-bits-floating-content-wrapper': '',
					style: {
						...this.floating.floatingStyles,
						transform: this.floating.isPositioned
							? this.floating.floatingStyles.transform
							: 'translate(0, -200%)',
						minWidth: 'max-content',
						zIndex: this.contentZIndex,
						'--bits-floating-transform-origin': `${(e = this.floating.middlewareData.transformOrigin) == null ? void 0 : e.x} ${(n = this.floating.middlewareData.transformOrigin) == null ? void 0 : n.y}`,
						'--bits-floating-available-width': `${y(u(this, En))}px`,
						'--bits-floating-available-height': `${y(u(this, On))}px`,
						'--bits-floating-anchor-width': `${y(u(this, Cn))}px`,
						'--bits-floating-anchor-height': `${y(u(this, _n))}px`,
						...(((r = this.floating.middlewareData.hide) == null
							? void 0
							: r.referenceHidden) && {
							visibility: 'hidden',
							'pointer-events': 'none'
						}),
						...y(u(this, cn))
					},
					dir: u(this, un).current
				};
			})
		);
		S(
			this,
			zn,
			V(() => ({
				'data-side': this.placedSide,
				'data-align': this.placedAlign,
				style: go({ ...y(u(this, cn)) })
			}))
		);
		S(
			this,
			Bn,
			V(() => ({
				position: 'absolute',
				left: this.arrowX ? `${this.arrowX}px` : void 0,
				top: this.arrowY ? `${this.arrowY}px` : void 0,
				[this.arrowBaseSide]: 0,
				'transform-origin': {
					top: '',
					right: '0 0',
					bottom: 'center 0',
					left: '100% 0'
				}[this.placedSide],
				transform: {
					top: 'translateY(100%)',
					right: 'translateY(50%) rotate(90deg) translateX(-50%)',
					bottom: 'rotate(180deg)',
					left: 'translateY(50%) rotate(-90deg) translateX(50%)'
				}[this.placedSide],
				visibility: this.cannotCenterArrow ? 'hidden' : void 0
			}))
		);
		(this.id = e.id),
			z(this, dn, e.side),
			z(this, fn, e.sideOffset),
			z(this, Pt, e.align),
			z(this, hn, e.alignOffset),
			z(this, gn, e.arrowPadding),
			z(this, At, e.avoidCollisions),
			z(this, st, e.collisionBoundary),
			z(this, mn, e.collisionPadding),
			z(this, pn, e.sticky),
			z(this, vn, e.hideWhenDetached),
			z(this, bn, e.updatePositionStrategy),
			(this.onPlaced = e.onPlaced),
			z(this, yn, e.strategy),
			z(this, un, e.dir),
			(this.style = e.style),
			(this.root = n),
			(this.enabled = e.enabled),
			(this.wrapperId = e.wrapperId),
			e.customAnchor && (this.root.customAnchorNode.current = e.customAnchor.current),
			q(() => {
				e.customAnchor.current,
					de(() => {
						this.root.customAnchorNode.current = e.customAnchor.current;
					});
			}),
			Me({
				id: this.wrapperId,
				ref: this.wrapperRef,
				deps: () => this.enabled.current
			}),
			Me({ id: this.id, ref: this.contentRef, deps: () => this.enabled.current }),
			(this.floating = _u({
				strategy: () => u(this, yn).current,
				placement: () => y(u(this, Pr)),
				middleware: () => this.middleware,
				reference: this.root.anchorNode,
				whileElementsMounted: (...r) => {
					var o;
					return bu(...r, {
						animationFrame:
							((o = u(this, bn)) == null ? void 0 : o.current) === 'always'
					});
				},
				open: () => this.enabled.current
			})),
			q(() => {
				var r;
				this.floating.isPositioned && ((r = this.onPlaced) == null || r.current());
			}),
			q(() => {
				const r = this.contentRef.current;
				r &&
					de(() => {
						this.contentZIndex = window.getComputedStyle(r).zIndex;
					});
			}),
			q(() => {
				this.floating.floating.current = this.wrapperRef.current;
			});
	}
	get hasExplicitBoundaries() {
		return y(u(this, Pn));
	}
	set hasExplicitBoundaries(e) {
		I(u(this, Pn), e);
	}
	get detectOverflowOptions() {
		return y(u(this, An));
	}
	set detectOverflowOptions(e) {
		I(u(this, An), e);
	}
	get middleware() {
		return y(u(this, Tn));
	}
	set middleware(e) {
		I(u(this, Tn), e);
	}
	get placedSide() {
		return y(u(this, kn));
	}
	set placedSide(e) {
		I(u(this, kn), e);
	}
	get placedAlign() {
		return y(u(this, In));
	}
	set placedAlign(e) {
		I(u(this, In), e);
	}
	get arrowX() {
		return y(u(this, Rn));
	}
	set arrowX(e) {
		I(u(this, Rn), e);
	}
	get arrowY() {
		return y(u(this, Mn));
	}
	set arrowY(e) {
		I(u(this, Mn), e);
	}
	get cannotCenterArrow() {
		return y(u(this, Fn));
	}
	set cannotCenterArrow(e) {
		I(u(this, Fn), e);
	}
	get contentZIndex() {
		return y(u(this, Ln));
	}
	set contentZIndex(e) {
		I(u(this, Ln), e, !0);
	}
	get arrowBaseSide() {
		return y(u(this, Nn));
	}
	set arrowBaseSide(e) {
		I(u(this, Nn), e);
	}
	get wrapperProps() {
		return y(u(this, Dn));
	}
	set wrapperProps(e) {
		I(u(this, Dn), e);
	}
	get props() {
		return y(u(this, zn));
	}
	set props(e) {
		I(u(this, zn), e);
	}
	get arrowStyle() {
		return y(u(this, Bn));
	}
	set arrowStyle(e) {
		I(u(this, Bn), e);
	}
}
(cn = new WeakMap()),
	(un = new WeakMap()),
	(dn = new WeakMap()),
	(fn = new WeakMap()),
	(Pt = new WeakMap()),
	(hn = new WeakMap()),
	(gn = new WeakMap()),
	(At = new WeakMap()),
	(st = new WeakMap()),
	(mn = new WeakMap()),
	(pn = new WeakMap()),
	(vn = new WeakMap()),
	(yn = new WeakMap()),
	(bn = new WeakMap()),
	(wn = new WeakMap()),
	(Sr = new WeakMap()),
	(xn = new WeakMap()),
	(Pr = new WeakMap()),
	(Sn = new WeakMap()),
	(Pn = new WeakMap()),
	(An = new WeakMap()),
	(En = new WeakMap()),
	(On = new WeakMap()),
	(Cn = new WeakMap()),
	(_n = new WeakMap()),
	(Tn = new WeakMap()),
	(kn = new WeakMap()),
	(In = new WeakMap()),
	(Rn = new WeakMap()),
	(Mn = new WeakMap()),
	(Fn = new WeakMap()),
	(Ln = new WeakMap()),
	(Nn = new WeakMap()),
	(Dn = new WeakMap()),
	(zn = new WeakMap()),
	(Bn = new WeakMap());
class Ru {
	constructor(e, n) {
		Z(this, 'ref', O(null));
		e.virtualEl && e.virtualEl.current
			? (n.triggerNode = O.from(e.virtualEl.current))
			: Me({
					id: e.id,
					ref: this.ref,
					onRefChange: (r) => {
						n.triggerNode.current = r;
					}
				});
	}
}
const [Mu, vs] = Jn('Floating.Root'),
	[Fu, Wd] = Jn('Floating.Content');
function Lu() {
	return Mu(new ku());
}
function Nu(t) {
	return Fu(new Iu(t, vs()));
}
function Du(t) {
	return new Ru(t, vs());
}
function zu(t) {
	return {
		name: 'transformOrigin',
		options: t,
		fn(e) {
			var v, w, b;
			const { placement: n, rects: r, middlewareData: i } = e,
				s = ((v = i.arrow) == null ? void 0 : v.centerOffset) !== 0,
				a = s ? 0 : t.arrowWidth,
				l = s ? 0 : t.arrowHeight,
				[d, f] = Po(n),
				p = { start: '0%', center: '50%', end: '100%' }[f],
				g = (((w = i.arrow) == null ? void 0 : w.x) ?? 0) + a / 2,
				m = (((b = i.arrow) == null ? void 0 : b.y) ?? 0) + l / 2;
			let c = '',
				h = '';
			return (
				d === 'bottom'
					? ((c = s ? p : `${g}px`), (h = `${-l}px`))
					: d === 'top'
						? ((c = s ? p : `${g}px`), (h = `${r.floating.height + l}px`))
						: d === 'right'
							? ((c = `${-l}px`), (h = s ? p : `${m}px`))
							: d === 'left' &&
								((c = `${r.floating.width + l}px`), (h = s ? p : `${m}px`)),
				{ data: { x: c, y: h } }
			);
		}
	};
}
function Po(t) {
	const [e, n = 'center'] = t.split('-');
	return [e, n];
}
function Bu(t) {
	return Po(t)[0];
}
function Vu(t) {
	return Po(t)[1];
}
function Wu(t, e) {
	oe(e, !0), Lu();
	var n = X(),
		r = H(n);
	$(r, () => e.children ?? ne), F(t, n), ie();
}
function Ku(t, e) {
	oe(e, !0), Du({ id: O.with(() => e.id), virtualEl: O.with(() => e.virtualEl) });
	var n = X(),
		r = H(n);
	$(r, () => e.children ?? ne), F(t, n), ie();
}
function Uu(t, e) {
	oe(e, !0);
	let n = P(e, 'side', 3, 'bottom'),
		r = P(e, 'sideOffset', 3, 0),
		i = P(e, 'align', 3, 'center'),
		o = P(e, 'alignOffset', 3, 0),
		s = P(e, 'arrowPadding', 3, 0),
		a = P(e, 'avoidCollisions', 3, !0),
		l = P(e, 'collisionBoundary', 19, () => []),
		d = P(e, 'collisionPadding', 3, 0),
		f = P(e, 'hideWhenDetached', 3, !1),
		p = P(e, 'onPlaced', 3, () => {}),
		g = P(e, 'sticky', 3, 'partial'),
		m = P(e, 'updatePositionStrategy', 3, 'optimized'),
		c = P(e, 'strategy', 3, 'fixed'),
		h = P(e, 'dir', 3, 'ltr'),
		v = P(e, 'style', 19, () => ({})),
		w = P(e, 'wrapperId', 19, ut),
		b = P(e, 'customAnchor', 3, null);
	const A = Nu({
			side: O.with(() => n()),
			sideOffset: O.with(() => r()),
			align: O.with(() => i()),
			alignOffset: O.with(() => o()),
			id: O.with(() => e.id),
			arrowPadding: O.with(() => s()),
			avoidCollisions: O.with(() => a()),
			collisionBoundary: O.with(() => l()),
			collisionPadding: O.with(() => d()),
			hideWhenDetached: O.with(() => f()),
			onPlaced: O.with(() => p()),
			sticky: O.with(() => g()),
			updatePositionStrategy: O.with(() => m()),
			strategy: O.with(() => c()),
			dir: O.with(() => h()),
			style: O.with(() => v()),
			enabled: O.with(() => !1),
			wrapperId: O.with(() => w()),
			customAnchor: O.with(() => b())
		}),
		x = V(() => lt(A.wrapperProps, { style: { pointerEvents: 'auto' } }));
	var E = X(),
		W = H(E);
	$(
		W,
		() => e.content ?? ne,
		() => ({ props: A.props, wrapperProps: y(x) })
	),
		F(t, E),
		ie();
}
function Hu(t, e) {
	oe(e, !0),
		_i(() => {
			var i;
			(i = e.onPlaced) == null || i.call(e);
		});
	var n = X(),
		r = H(n);
	$(
		r,
		() => e.content ?? ne,
		() => ({ props: {}, wrapperProps: {} })
	),
		F(t, n),
		ie();
}
const ju = 'data-separator-root';
var Et, Vn, Ot, Ct, Wn;
class Gu {
	constructor(e) {
		S(this, Et);
		S(this, Vn);
		S(this, Ot);
		S(this, Ct);
		S(
			this,
			Wn,
			V(() => ({
				id: u(this, Et).current,
				role: u(this, Ct).current ? 'none' : 'separator',
				'aria-orientation': u(this, Ot).current,
				'aria-hidden': Yl(u(this, Ct).current),
				'data-orientation': u(this, Ot).current,
				[ju]: ''
			}))
		);
		z(this, Ot, e.orientation),
			z(this, Ct, e.decorative),
			z(this, Et, e.id),
			z(this, Vn, e.ref),
			Me({ id: u(this, Et), ref: u(this, Vn) });
	}
	get props() {
		return y(u(this, Wn));
	}
	set props(e) {
		I(u(this, Wn), e);
	}
}
(Et = new WeakMap()),
	(Vn = new WeakMap()),
	(Ot = new WeakMap()),
	(Ct = new WeakMap()),
	(Wn = new WeakMap());
function Yu(t) {
	return new Gu(t);
}
var Xu = ae('<div><!></div>');
function qu(t, e) {
	oe(e, !0);
	let n = P(e, 'id', 19, ut),
		r = P(e, 'ref', 15, null),
		i = P(e, 'decorative', 3, !1),
		o = P(e, 'orientation', 3, 'horizontal'),
		s = Oe(e, [
			'$$slots',
			'$$events',
			'$$legacy',
			'id',
			'ref',
			'child',
			'children',
			'decorative',
			'orientation'
		]);
	const a = Yu({
			ref: O.with(
				() => r(),
				(m) => r(m)
			),
			id: O.with(() => n()),
			decorative: O.with(() => i()),
			orientation: O.with(() => o())
		}),
		l = V(() => lt(s, a.props));
	var d = X(),
		f = H(d);
	{
		var p = (m) => {
				var c = X(),
					h = H(c);
				$(
					h,
					() => e.child,
					() => ({ props: y(l) })
				),
					F(m, c);
			},
			g = (m) => {
				var c = Xu();
				let h;
				var v = re(c);
				$(v, () => e.children ?? ne),
					te(c),
					Ae(() => (h = Xe(c, h, { ...y(l) }))),
					F(m, c);
			};
		ce(f, (m) => {
			e.child ? m(p) : m(g, !1);
		});
	}
	F(t, d), ie();
}
function Zu(t, e) {
	let n = P(e, 'isStatic', 3, !1),
		r = Oe(e, ['$$slots', '$$events', '$$legacy', 'content', 'isStatic', 'onPlaced']);
	var i = X(),
		o = H(i);
	{
		var s = (l) => {
				Hu(l, {
					get content() {
						return e.content;
					},
					get onPlaced() {
						return e.onPlaced;
					}
				});
			},
			a = (l) => {
				Uu(
					l,
					qe(
						{
							get content() {
								return e.content;
							},
							get onPlaced() {
								return e.onPlaced;
							}
						},
						() => r
					)
				);
			};
		ce(o, (l) => {
			n() ? l(s) : l(a, !1);
		});
	}
	F(t, i);
}
var Ju = ae('<!> <!>', 1);
function ys(t, e) {
	oe(e, !0);
	let n = P(e, 'interactOutsideBehavior', 3, 'close'),
		r = P(e, 'trapFocus', 3, !0),
		i = P(e, 'isValidEvent', 3, () => !1),
		o = P(e, 'customAnchor', 3, null),
		s = P(e, 'isStatic', 3, !1),
		a = Oe(e, [
			'$$slots',
			'$$events',
			'$$legacy',
			'popper',
			'onEscapeKeydown',
			'escapeKeydownBehavior',
			'preventOverflowTextSelection',
			'id',
			'onPointerDown',
			'onPointerUp',
			'side',
			'sideOffset',
			'align',
			'alignOffset',
			'arrowPadding',
			'avoidCollisions',
			'collisionBoundary',
			'collisionPadding',
			'sticky',
			'hideWhenDetached',
			'updatePositionStrategy',
			'strategy',
			'dir',
			'preventScroll',
			'wrapperId',
			'style',
			'onPlaced',
			'onInteractOutside',
			'onCloseAutoFocus',
			'onOpenAutoFocus',
			'onFocusOutside',
			'interactOutsideBehavior',
			'loop',
			'trapFocus',
			'isValidEvent',
			'customAnchor',
			'isStatic',
			'enabled'
		]);
	Zu(t, {
		get isStatic() {
			return s();
		},
		get id() {
			return e.id;
		},
		get side() {
			return e.side;
		},
		get sideOffset() {
			return e.sideOffset;
		},
		get align() {
			return e.align;
		},
		get alignOffset() {
			return e.alignOffset;
		},
		get arrowPadding() {
			return e.arrowPadding;
		},
		get avoidCollisions() {
			return e.avoidCollisions;
		},
		get collisionBoundary() {
			return e.collisionBoundary;
		},
		get collisionPadding() {
			return e.collisionPadding;
		},
		get sticky() {
			return e.sticky;
		},
		get hideWhenDetached() {
			return e.hideWhenDetached;
		},
		get updatePositionStrategy() {
			return e.updatePositionStrategy;
		},
		get strategy() {
			return e.strategy;
		},
		get dir() {
			return e.dir;
		},
		get wrapperId() {
			return e.wrapperId;
		},
		get style() {
			return e.style;
		},
		get onPlaced() {
			return e.onPlaced;
		},
		get customAnchor() {
			return o();
		},
		content: (d, f) => {
			let p = () => (f == null ? void 0 : f().props),
				g = () => (f == null ? void 0 : f().wrapperProps);
			var m = Ju(),
				c = H(m);
			{
				var h = (A) => {
						ci(A, {
							get preventScroll() {
								return e.preventScroll;
							}
						});
					},
					v = (A, x) => {
						{
							var E = (W) => {
								ci(W, {
									get preventScroll() {
										return e.preventScroll;
									}
								});
							};
							ce(
								A,
								(W) => {
									e.forceMount || W(E);
								},
								x
							);
						}
					};
				ce(c, (A) => {
					e.forceMount && e.enabled ? A(h) : A(v, !1);
				});
			}
			var w = xe(c, 2);
			const b = V(() => e.enabled && r());
			Tc(w, {
				get id() {
					return e.id;
				},
				get onOpenAutoFocus() {
					return e.onOpenAutoFocus;
				},
				get onCloseAutoFocus() {
					return e.onCloseAutoFocus;
				},
				get loop() {
					return e.loop;
				},
				get trapFocus() {
					return y(b);
				},
				get forceMount() {
					return e.forceMount;
				},
				focusScope: (x, E) => {
					let W = () => (E == null ? void 0 : E().props);
					bc(x, {
						get onEscapeKeydown() {
							return e.onEscapeKeydown;
						},
						get escapeKeydownBehavior() {
							return e.escapeKeydownBehavior;
						},
						get enabled() {
							return e.enabled;
						},
						children: (N, Y) => {
							mc(N, {
								get id() {
									return e.id;
								},
								get onInteractOutside() {
									return e.onInteractOutside;
								},
								get onFocusOutside() {
									return e.onFocusOutside;
								},
								get interactOutsideBehavior() {
									return n();
								},
								get isValidEvent() {
									return i();
								},
								get enabled() {
									return e.enabled;
								},
								children: (B, j) => {
									let C = () => (j == null ? void 0 : j().props);
									Fc(B, {
										get id() {
											return e.id;
										},
										get preventOverflowTextSelection() {
											return e.preventOverflowTextSelection;
										},
										get onPointerDown() {
											return e.onPointerDown;
										},
										get onPointerUp() {
											return e.onPointerUp;
										},
										get enabled() {
											return e.enabled;
										},
										children: (R, T) => {
											var _ = X(),
												k = H(_),
												L = or(() => ({
													props: lt(a, p(), C(), W(), {
														style: { pointerEvents: 'auto' }
													}),
													wrapperProps: g()
												}));
											$(
												k,
												() => e.popper ?? ne,
												() => y(L)
											),
												F(R, _);
										},
										$$slots: { default: !0 }
									});
								},
								$$slots: { default: !0 }
							});
						},
						$$slots: { default: !0 }
					});
				},
				$$slots: { focusScope: !0 }
			}),
				F(d, m);
		},
		$$slots: { content: !0 }
	}),
		ie();
}
function Qu(t, e) {
	let n = P(e, 'interactOutsideBehavior', 3, 'close'),
		r = P(e, 'trapFocus', 3, !0),
		i = P(e, 'isValidEvent', 3, () => !1),
		o = P(e, 'customAnchor', 3, null),
		s = P(e, 'isStatic', 3, !1),
		a = Oe(e, [
			'$$slots',
			'$$events',
			'$$legacy',
			'popper',
			'present',
			'onEscapeKeydown',
			'escapeKeydownBehavior',
			'preventOverflowTextSelection',
			'id',
			'onPointerDown',
			'onPointerUp',
			'side',
			'sideOffset',
			'align',
			'alignOffset',
			'arrowPadding',
			'avoidCollisions',
			'collisionBoundary',
			'collisionPadding',
			'sticky',
			'hideWhenDetached',
			'updatePositionStrategy',
			'strategy',
			'dir',
			'preventScroll',
			'wrapperId',
			'style',
			'onPlaced',
			'onInteractOutside',
			'onCloseAutoFocus',
			'onOpenAutoFocus',
			'onFocusOutside',
			'interactOutsideBehavior',
			'loop',
			'trapFocus',
			'isValidEvent',
			'customAnchor',
			'isStatic'
		]);
	ac(
		t,
		qe(
			{
				get id() {
					return e.id;
				},
				get present() {
					return e.present;
				}
			},
			() => a,
			{
				presence: (d, f) => {
					let p = () => (f == null ? void 0 : f().present);
					ys(
						d,
						qe(
							{
								get popper() {
									return e.popper;
								},
								get onEscapeKeydown() {
									return e.onEscapeKeydown;
								},
								get escapeKeydownBehavior() {
									return e.escapeKeydownBehavior;
								},
								get preventOverflowTextSelection() {
									return e.preventOverflowTextSelection;
								},
								get id() {
									return e.id;
								},
								get onPointerDown() {
									return e.onPointerDown;
								},
								get onPointerUp() {
									return e.onPointerUp;
								},
								get side() {
									return e.side;
								},
								get sideOffset() {
									return e.sideOffset;
								},
								get align() {
									return e.align;
								},
								get alignOffset() {
									return e.alignOffset;
								},
								get arrowPadding() {
									return e.arrowPadding;
								},
								get avoidCollisions() {
									return e.avoidCollisions;
								},
								get collisionBoundary() {
									return e.collisionBoundary;
								},
								get collisionPadding() {
									return e.collisionPadding;
								},
								get sticky() {
									return e.sticky;
								},
								get hideWhenDetached() {
									return e.hideWhenDetached;
								},
								get updatePositionStrategy() {
									return e.updatePositionStrategy;
								},
								get strategy() {
									return e.strategy;
								},
								get dir() {
									return e.dir;
								},
								get preventScroll() {
									return e.preventScroll;
								},
								get wrapperId() {
									return e.wrapperId;
								},
								get style() {
									return e.style;
								},
								get onPlaced() {
									return e.onPlaced;
								},
								get customAnchor() {
									return o();
								},
								get isStatic() {
									return s();
								},
								get enabled() {
									return p().current;
								},
								get onInteractOutside() {
									return e.onInteractOutside;
								},
								get onCloseAutoFocus() {
									return e.onCloseAutoFocus;
								},
								get onOpenAutoFocus() {
									return e.onOpenAutoFocus;
								},
								get interactOutsideBehavior() {
									return n();
								},
								get loop() {
									return e.loop;
								},
								get trapFocus() {
									return r();
								},
								get isValidEvent() {
									return i();
								},
								get onFocusOutside() {
									return e.onFocusOutside;
								},
								forceMount: !1
							},
							() => a
						)
					);
				},
				$$slots: { presence: !0 }
			}
		)
	);
}
function $u(t, e) {
	let n = P(e, 'interactOutsideBehavior', 3, 'close'),
		r = P(e, 'trapFocus', 3, !0),
		i = P(e, 'isValidEvent', 3, () => !1),
		o = P(e, 'customAnchor', 3, null),
		s = P(e, 'isStatic', 3, !1),
		a = Oe(e, [
			'$$slots',
			'$$events',
			'$$legacy',
			'popper',
			'onEscapeKeydown',
			'escapeKeydownBehavior',
			'preventOverflowTextSelection',
			'id',
			'onPointerDown',
			'onPointerUp',
			'side',
			'sideOffset',
			'align',
			'alignOffset',
			'arrowPadding',
			'avoidCollisions',
			'collisionBoundary',
			'collisionPadding',
			'sticky',
			'hideWhenDetached',
			'updatePositionStrategy',
			'strategy',
			'dir',
			'preventScroll',
			'wrapperId',
			'style',
			'onPlaced',
			'onInteractOutside',
			'onCloseAutoFocus',
			'onOpenAutoFocus',
			'onFocusOutside',
			'interactOutsideBehavior',
			'loop',
			'trapFocus',
			'isValidEvent',
			'customAnchor',
			'isStatic',
			'enabled'
		]);
	ys(
		t,
		qe(
			{
				get popper() {
					return e.popper;
				},
				get onEscapeKeydown() {
					return e.onEscapeKeydown;
				},
				get escapeKeydownBehavior() {
					return e.escapeKeydownBehavior;
				},
				get preventOverflowTextSelection() {
					return e.preventOverflowTextSelection;
				},
				get id() {
					return e.id;
				},
				get onPointerDown() {
					return e.onPointerDown;
				},
				get onPointerUp() {
					return e.onPointerUp;
				},
				get side() {
					return e.side;
				},
				get sideOffset() {
					return e.sideOffset;
				},
				get align() {
					return e.align;
				},
				get alignOffset() {
					return e.alignOffset;
				},
				get arrowPadding() {
					return e.arrowPadding;
				},
				get avoidCollisions() {
					return e.avoidCollisions;
				},
				get collisionBoundary() {
					return e.collisionBoundary;
				},
				get collisionPadding() {
					return e.collisionPadding;
				},
				get sticky() {
					return e.sticky;
				},
				get hideWhenDetached() {
					return e.hideWhenDetached;
				},
				get updatePositionStrategy() {
					return e.updatePositionStrategy;
				},
				get strategy() {
					return e.strategy;
				},
				get dir() {
					return e.dir;
				},
				get preventScroll() {
					return e.preventScroll;
				},
				get wrapperId() {
					return e.wrapperId;
				},
				get style() {
					return e.style;
				},
				get onPlaced() {
					return e.onPlaced;
				},
				get customAnchor() {
					return o();
				},
				get isStatic() {
					return s();
				},
				get enabled() {
					return e.enabled;
				},
				get onInteractOutside() {
					return e.onInteractOutside;
				},
				get onCloseAutoFocus() {
					return e.onCloseAutoFocus;
				},
				get onOpenAutoFocus() {
					return e.onOpenAutoFocus;
				},
				get interactOutsideBehavior() {
					return n();
				},
				get loop() {
					return e.loop;
				},
				get trapFocus() {
					return r();
				},
				get isValidEvent() {
					return i();
				},
				get onFocusOutside() {
					return e.onFocusOutside;
				}
			},
			() => a,
			{ forceMount: !0 }
		)
	);
}
var Kn, Un, Hn;
class ed {
	constructor(e) {
		Z(this, 'open');
		S(this, Kn, J(null));
		S(this, Un, J(void 0));
		S(this, Hn, J(null));
		this.open = e.open;
	}
	get contentNode() {
		return y(u(this, Kn));
	}
	set contentNode(e) {
		I(u(this, Kn), e, !0);
	}
	get contentId() {
		return y(u(this, Un));
	}
	set contentId(e) {
		I(u(this, Un), e, !0);
	}
	get triggerNode() {
		return y(u(this, Hn));
	}
	set triggerNode(e) {
		I(u(this, Hn), e, !0);
	}
	toggleOpen() {
		this.open.current = !this.open.current;
	}
	handleClose() {
		this.open.current && (this.open.current = !1);
	}
}
(Kn = new WeakMap()), (Un = new WeakMap()), (Hn = new WeakMap());
var _t, jn, Ye, ge, Ar, bs, Gn;
class td {
	constructor(e, n) {
		S(this, Ar);
		S(this, _t);
		S(this, jn);
		S(this, Ye);
		S(this, ge);
		S(
			this,
			Gn,
			V(() => ({
				id: u(this, _t).current,
				'aria-haspopup': 'dialog',
				'aria-expanded': Gl(u(this, ge).open.current),
				'data-state': ts(u(this, ge).open.current),
				'aria-controls': he(this, Ar, bs).call(this),
				'data-popover-trigger': '',
				disabled: u(this, Ye).current,
				onpointerdown: this.onpointerdown,
				onkeydown: this.onkeydown,
				onclick: this.onclick
			}))
		);
		z(this, _t, e.id),
			z(this, ge, n),
			z(this, jn, e.ref),
			z(this, Ye, e.disabled),
			Me({
				id: u(this, _t),
				ref: u(this, jn),
				onRefChange: (r) => {
					u(this, ge).triggerNode = r;
				}
			}),
			(this.onclick = this.onclick.bind(this)),
			(this.onpointerdown = this.onpointerdown.bind(this)),
			(this.onkeydown = this.onkeydown.bind(this));
	}
	onclick(e) {
		u(this, Ye).current || (e.button === 0 && u(this, ge).toggleOpen());
	}
	onpointerdown(e) {
		u(this, Ye).current || (e.button === 0 && e.preventDefault());
	}
	onkeydown(e) {
		u(this, Ye).current ||
			((e.key === Xl || e.key === Zl) &&
				(e.preventDefault(), u(this, ge).toggleOpen()));
	}
	get props() {
		return y(u(this, Gn));
	}
	set props(e) {
		I(u(this, Gn), e);
	}
}
(_t = new WeakMap()),
	(jn = new WeakMap()),
	(Ye = new WeakMap()),
	(ge = new WeakMap()),
	(Ar = new WeakSet()),
	(bs = function () {
		if (u(this, ge).open.current && u(this, ge).contentId) return u(this, ge).contentId;
	}),
	(Gn = new WeakMap());
var Tt, Yn, Xn, qn;
class nd {
	constructor(e, n) {
		S(this, Tt);
		S(this, Yn);
		Z(this, 'root');
		S(
			this,
			Xn,
			V(() => ({ open: this.root.open.current }))
		);
		S(
			this,
			qn,
			V(() => ({
				id: u(this, Tt).current,
				tabindex: -1,
				'data-state': ts(this.root.open.current),
				'data-popover-content': '',
				style: { pointerEvents: 'auto' }
			}))
		);
		z(this, Tt, e.id),
			(this.root = n),
			z(this, Yn, e.ref),
			Me({
				id: u(this, Tt),
				ref: u(this, Yn),
				deps: () => this.root.open.current,
				onRefChange: (r) => {
					(this.root.contentNode = r),
						(this.root.contentId = r == null ? void 0 : r.id);
				}
			});
	}
	get snippetProps() {
		return y(u(this, Xn));
	}
	set snippetProps(e) {
		I(u(this, Xn), e);
	}
	get props() {
		return y(u(this, qn));
	}
	set props(e) {
		I(u(this, qn), e);
	}
}
(Tt = new WeakMap()), (Yn = new WeakMap()), (Xn = new WeakMap()), (qn = new WeakMap());
const [rd, ws] = Jn('Popover.Root');
function od(t) {
	return rd(new ed(t));
}
function id(t) {
	return new td(t, ws());
}
function sd(t) {
	return new nd(t, ws());
}
var ad = ae('<div><div><!></div></div>'),
	ld = ae('<div><div><!></div></div>');
function cd(t, e) {
	oe(e, !0);
	let n = P(e, 'ref', 15, null),
		r = P(e, 'id', 19, ut),
		i = P(e, 'forceMount', 3, !1),
		o = P(e, 'onCloseAutoFocus', 3, se),
		s = P(e, 'onEscapeKeydown', 3, se),
		a = P(e, 'onInteractOutside', 3, se),
		l = P(e, 'trapFocus', 3, !0),
		d = P(e, 'preventScroll', 3, !1),
		f = Oe(e, [
			'$$slots',
			'$$events',
			'$$legacy',
			'child',
			'children',
			'ref',
			'id',
			'forceMount',
			'onCloseAutoFocus',
			'onEscapeKeydown',
			'onInteractOutside',
			'trapFocus',
			'preventScroll'
		]);
	const p = sd({
			id: O.with(() => r()),
			ref: O.with(
				() => n(),
				(x) => n(x)
			)
		}),
		g = V(() => lt(f, p.props));
	function m(x) {
		a()(x),
			!x.defaultPrevented &&
				((jt(x.target) && x.target.closest('[data-popover-trigger')) ||
					p.root.handleClose());
	}
	function c(x) {
		s()(x), !x.defaultPrevented && p.root.handleClose();
	}
	function h(x) {
		var E;
		o()(x),
			!x.defaultPrevented &&
				(x.preventDefault(), (E = p.root.triggerNode) == null || E.focus());
	}
	var v = X(),
		w = H(v);
	{
		var b = (x) => {
				$u(
					x,
					qe(() => y(g), {
						get enabled() {
							return p.root.open.current;
						},
						get id() {
							return r();
						},
						onInteractOutside: m,
						onEscapeKeydown: c,
						onCloseAutoFocus: h,
						get trapFocus() {
							return l();
						},
						get preventScroll() {
							return d();
						},
						loop: !0,
						forceMount: !0,
						popper: (W, N) => {
							let Y = () => (N == null ? void 0 : N().props),
								U = () => (N == null ? void 0 : N().wrapperProps);
							var B = X();
							const j = V(() => lt(Y(), { style: vi('popover') }));
							var C = H(B);
							{
								var R = (_) => {
										var k = X(),
											L = H(k),
											M = or(() => ({
												props: y(j),
												wrapperProps: U(),
												...p.snippetProps
											}));
										$(
											L,
											() => e.child,
											() => y(M)
										),
											F(_, k);
									},
									T = (_) => {
										var k = ad();
										let L;
										var M = re(k);
										let D;
										var G = re(M);
										$(G, () => e.children ?? ne),
											te(M),
											te(k),
											Ae(() => {
												(L = Xe(k, L, { ...U() })), (D = Xe(M, D, { ...y(j) }));
											}),
											F(_, k);
									};
								ce(C, (_) => {
									e.child ? _(R) : _(T, !1);
								});
							}
							F(W, B);
						},
						$$slots: { popper: !0 }
					})
				);
			},
			A = (x, E) => {
				{
					var W = (N) => {
						Qu(
							N,
							qe(() => y(g), {
								get present() {
									return p.root.open.current;
								},
								get id() {
									return r();
								},
								onInteractOutside: m,
								onEscapeKeydown: c,
								onCloseAutoFocus: h,
								get trapFocus() {
									return l();
								},
								get preventScroll() {
									return d();
								},
								loop: !0,
								forceMount: !1,
								popper: (U, B) => {
									let j = () => (B == null ? void 0 : B().props),
										C = () => (B == null ? void 0 : B().wrapperProps);
									var R = X();
									const T = V(() => lt(j(), { style: vi('popover') }));
									var _ = H(R);
									{
										var k = (M) => {
												var D = X(),
													G = H(D),
													ee = or(() => ({
														props: y(T),
														wrapperProps: C(),
														...p.snippetProps
													}));
												$(
													G,
													() => e.child,
													() => y(ee)
												),
													F(M, D);
											},
											L = (M) => {
												var D = ld();
												let G;
												var ee = re(D);
												let me;
												var Mr = re(ee);
												$(Mr, () => e.children ?? ne),
													te(ee),
													te(D),
													Ae(() => {
														(G = Xe(D, G, { ...C() })), (me = Xe(ee, me, { ...y(T) }));
													}),
													F(M, D);
											};
										ce(_, (M) => {
											e.child ? M(k) : M(L, !1);
										});
									}
									F(U, R);
								},
								$$slots: { popper: !0 }
							})
						);
					};
					ce(
						x,
						(N) => {
							i() || N(W);
						},
						E
					);
				}
			};
		ce(w, (x) => {
			i() ? x(b) : x(A, !1);
		});
	}
	F(t, v), ie();
}
var ud = ae('<button><!></button>');
function dd(t, e) {
	oe(e, !0);
	let n = P(e, 'id', 19, ut),
		r = P(e, 'ref', 15, null),
		i = P(e, 'type', 3, 'button'),
		o = P(e, 'disabled', 3, !1),
		s = Oe(e, [
			'$$slots',
			'$$events',
			'$$legacy',
			'children',
			'child',
			'id',
			'ref',
			'type',
			'disabled'
		]);
	const a = id({
			id: O.with(() => n()),
			ref: O.with(
				() => r(),
				(d) => r(d)
			),
			disabled: O.with(() => !!o())
		}),
		l = V(() => lt(s, a.props, { type: i() }));
	Ku(t, {
		get id() {
			return n();
		},
		children: (d, f) => {
			var p = X(),
				g = H(p);
			{
				var m = (h) => {
						var v = X(),
							w = H(v);
						$(
							w,
							() => e.child,
							() => ({ props: y(l) })
						),
							F(h, v);
					},
					c = (h) => {
						var v = ud();
						let w;
						var b = re(v);
						$(b, () => e.children ?? ne),
							te(v),
							Ae(() => (w = Xe(v, w, { ...y(l) }))),
							F(h, v);
					};
				ce(g, (h) => {
					e.child ? h(m) : h(c, !1);
				});
			}
			F(d, p);
		},
		$$slots: { default: !0 }
	}),
		ie();
}
function fd(t, e) {
	oe(e, !0);
	let n = P(e, 'open', 15, !1),
		r = P(e, 'onOpenChange', 3, se),
		i = P(e, 'controlledOpen', 3, !1);
	od({
		open: O.with(
			() => n(),
			(o) => {
				i() || n(o), r()(o);
			}
		)
	}),
		Wu(t, {
			children: (o, s) => {
				var a = X(),
					l = H(a);
				$(l, () => e.children ?? ne), F(o, a);
			},
			$$slots: { default: !0 }
		}),
		ie();
}
function hd(t, e, n = {}) {
	const { immediate: r = !0 } = n,
		i = O(!1);
	let o;
	function s() {
		o && (clearTimeout(o), (o = null));
	}
	function a() {
		(i.current = !1), s();
	}
	function l(...d) {
		s(),
			(i.current = !0),
			(o = setTimeout(() => {
				(i.current = !1), (o = null), t(...d);
			}, e));
	}
	return (
		r && ((i.current = !0), Tr && l()),
		$i(() => {
			a();
		}),
		{ isPending: O.readonly(i), start: l, stop: a }
	);
}
var Zn, kt, Er, Or;
class gd {
	constructor(e) {
		Z(this, 'delayDuration');
		Z(this, 'disableHoverableContent');
		Z(this, 'disableCloseOnTriggerClick');
		Z(this, 'disabled');
		Z(this, 'ignoreNonKeyboardFocus');
		Z(this, 'skipDelayDuration');
		S(this, Zn, J(!0));
		Z(this, 'isPointerInTransit', O(!1));
		S(this, kt);
		S(this, Er, () => {
			u(this, kt).start();
		});
		S(this, Or, () => {
			u(this, kt).stop();
		});
		Z(this, 'onOpen', () => {
			u(this, Or).call(this), (this.isOpenDelayed = !1);
		});
		Z(this, 'onClose', () => {
			u(this, Er).call(this);
		});
		(this.delayDuration = e.delayDuration),
			(this.disableHoverableContent = e.disableHoverableContent),
			(this.disableCloseOnTriggerClick = e.disableCloseOnTriggerClick),
			(this.disabled = e.disabled),
			(this.ignoreNonKeyboardFocus = e.ignoreNonKeyboardFocus),
			(this.skipDelayDuration = e.skipDelayDuration),
			z(
				this,
				kt,
				hd(
					() => {
						this.isOpenDelayed = !0;
					},
					this.skipDelayDuration.current,
					{ immediate: !1 }
				)
			);
	}
	get isOpenDelayed() {
		return y(u(this, Zn));
	}
	set isOpenDelayed(e) {
		I(u(this, Zn), e, !0);
	}
}
(Zn = new WeakMap()), (kt = new WeakMap()), (Er = new WeakMap()), (Or = new WeakMap());
const [md, Kd] = Jn('Tooltip.Provider');
Jn('Tooltip.Root');
function pd(t) {
	return md(new gd(t));
}
function vd(t, e) {
	oe(e, !0);
	let n = P(e, 'delayDuration', 3, 700),
		r = P(e, 'disableCloseOnTriggerClick', 3, !1),
		i = P(e, 'disableHoverableContent', 3, !1),
		o = P(e, 'disabled', 3, !1),
		s = P(e, 'ignoreNonKeyboardFocus', 3, !1),
		a = P(e, 'skipDelayDuration', 3, 300);
	pd({
		delayDuration: O.with(() => n()),
		disableCloseOnTriggerClick: O.with(() => r()),
		disableHoverableContent: O.with(() => i()),
		disabled: O.with(() => o()),
		ignoreNonKeyboardFocus: O.with(() => s()),
		skipDelayDuration: O.with(() => a())
	});
	var l = X(),
		d = H(l);
	$(d, () => e.children ?? ne), F(t, l), ie();
}
const yd = vd;
function bd(t, e) {
	oe(e, !0);
	let n = P(e, 'ref', 15, null),
		r = P(e, 'sideOffset', 3, 4),
		i = P(e, 'align', 3, 'center'),
		o = Oe(e, [
			'$$slots',
			'$$events',
			'$$legacy',
			'ref',
			'class',
			'sideOffset',
			'align'
		]);
	var s = X(),
		a = H(s);
	ir(
		a,
		() => cc,
		(l, d) => {
			d(l, {
				children: (f, p) => {
					var g = X(),
						m = H(g);
					const c = V(() =>
						sr(
							'bg-neutral-3 text-neutral-11 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md outline-none',
							e.class
						)
					);
					ir(
						m,
						() => cd,
						(h, v) => {
							v(
								h,
								qe(
									{
										get sideOffset() {
											return r();
										},
										get align() {
											return i();
										},
										get class() {
											return y(c);
										}
									},
									() => o,
									{
										get ref() {
											return n();
										},
										set ref(w) {
											n(w);
										}
									}
								)
							);
						}
					),
						F(f, g);
				},
				$$slots: { default: !0 }
			});
		}
	),
		F(t, s),
		ie();
}
const wd = fd,
	xd = dd;
function Sd(t, e) {
	oe(e, !0);
	let n = P(e, 'ref', 15, null),
		r = P(e, 'orientation', 3, 'horizontal'),
		i = Oe(e, ['$$slots', '$$events', '$$legacy', 'ref', 'class', 'orientation']);
	var o = X(),
		s = H(o);
	const a = V(() =>
		sr(
			'bg-neutral-7 shrink-0',
			r() === 'horizontal' ? 'h-[1px] w-full' : 'min-h-full w-[1px]',
			e.class
		)
	);
	ir(
		s,
		() => qu,
		(l, d) => {
			d(
				l,
				qe(
					{
						get class() {
							return y(a);
						},
						get orientation() {
							return r();
						}
					},
					() => i,
					{
						get ref() {
							return n();
						},
						set ref(f) {
							n(f);
						}
					}
				)
			);
		}
	),
		F(t, o),
		ie();
}
var Pd = ae('<li><!></li>'),
	Ad = ae('<li><!></li>'),
	Ed = ae('<ul class="flex flex-col"><!> <!> <li><!></li></ul>'),
	Od = ae('<!> <!>', 1),
	Cd =
		ae(`<header class="border-neutral-7 sticky left-0 top-0 w-full rounded-none border-b-2
		drop-shadow-md"><nav class="bg-neutral-2 flex items-center justify-around py-4"><div><ul class="flex items-center gap-6 p-2 text-lg"><li><a href="/"><!></a></li> <li><a href="/" class="hidden lg:block"><span class="font-semibold">Verdagraph</span></a></li></ul></div> <ul class="hidden gap-4 md:flex md:gap-8 lg:gap-12"></ul> <div class="flex md:hidden"><!></div> <ul class="hidden gap-8 text-lg md:flex"><li class="hidden lg:block"><!></li></ul></nav></header>`);
function _d(t, e) {
	oe(e, !1);
	let n = [
		{ url: '/demo', label: 'Demonstration' },
		{ url: '/guides', label: 'Documentation' },
		{ url: ya.project, label: 'About' }
	];
	ki();
	var r = Cd(),
		i = re(r),
		o = re(i),
		s = re(o),
		a = re(s),
		l = re(a),
		d = re(l);
	wa(d, { size: '4rem' }), te(l), te(a), $n(2), te(s), te(o);
	var f = xe(o, 2);
	Do(
		f,
		5,
		() => n,
		No,
		(v, w) => {
			var b = Pd(),
				A = re(b);
			Hr(A, {
				get href() {
					return y(w).url;
				},
				variant: 'ghost',
				children: (x, E) => {
					$n();
					var W = zr();
					Ae(() => Lo(W, y(w).label)), F(x, W);
				},
				$$slots: { default: !0 }
			}),
				te(b),
				F(v, b);
		}
	),
		te(f);
	var p = xe(f, 2),
		g = re(p);
	wd(g, {
		children: (v, w) => {
			var b = Od(),
				A = H(b);
			xd(A, {
				children: (E, W) => {
					$s(E, {
						get icon() {
							return xa.dropdownMenuIcon;
						},
						width: '3rem'
					});
				},
				$$slots: { default: !0 }
			});
			var x = xe(A, 2);
			bd(x, {
				class: 'w-auto',
				children: (E, W) => {
					var N = Ed();
					{
						const C = (R, T = ne, _ = ne) => {
							Hr(R, {
								get href() {
									return T();
								},
								variant: 'link',
								children: (k, L) => {
									$n();
									var M = zr();
									Ae(() => Lo(M, _())), F(k, M);
								},
								$$slots: { default: !0 }
							});
						};
						var Y = re(N);
						Do(
							Y,
							1,
							() => n,
							No,
							(R, T) => {
								var _ = Ad(),
									k = re(_);
								C(
									k,
									() => y(T).url,
									() => y(T).label
								),
									te(_),
									F(R, _);
							}
						);
						var U = xe(Y, 2);
						Sd(U, { class: 'bg-neutral-6 w-full opacity-50' });
						var B = xe(U, 2),
							j = re(B);
						C(
							j,
							() => '/register',
							() => 'Get Started'
						),
							te(B),
							te(N);
					}
					F(E, N);
				},
				$$slots: { default: !0 }
			}),
				F(v, b);
		},
		$$slots: { default: !0 }
	}),
		te(p);
	var m = xe(p, 2),
		c = re(m),
		h = re(c);
	Hr(h, {
		href: '/login',
		variant: 'default',
		children: (v, w) => {
			$n();
			var b = zr('Get Started');
			F(v, b);
		},
		$$slots: { default: !0 }
	}),
		te(c),
		te(m),
		te(i),
		te(r),
		F(t, r),
		ie();
}
var Td = ae('<!> <!>', 1),
	kd = ae('<!> <div class="h-screen w-screen overflow-hidden"><!></div>', 1);
function Ud(t, e) {
	var n = kd(),
		r = H(n);
	va(r, {});
	var i = xe(r, 2),
		o = re(i);
	ir(
		o,
		() => yd,
		(s, a) => {
			a(s, {
				delayDuration: 500,
				children: (l, d) => {
					var f = Td(),
						p = H(f);
					_d(p, {});
					var g = xe(p, 2);
					$(g, () => e.children), F(l, f);
				},
				$$slots: { default: !0 }
			});
		}
	),
		te(i),
		F(t, n);
}
export { Ud as component };
