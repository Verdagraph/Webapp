import {
	t as $,
	o as C,
	g as D,
	j as E,
	H,
	k as I,
	e as L,
	q as M,
	a as O,
	v as P,
	r as S,
	c as V,
	w as W,
	l as Y,
	d as _,
	s as c,
	m as j,
	n as k,
	i as m,
	f as p,
	u as q,
	h as w
} from './DgmMHYUv.js';
import { i as B, b as F, c as G, r as N, h, a as z } from './HWDk4eir.js';

function U(t, e) {
	var r = e == null ? '' : typeof e == 'object' ? e + '' : e;
	r !== (t.__t ?? (t.__t = t.nodeValue)) && ((t.__t = r), (t.nodeValue = r + ''));
}
function J(t, e) {
	return b(t, e);
}
function X(t, e) {
	m(), (e.intro = e.intro ?? !1);
	const r = e.target,
		l = w,
		u = _;
	try {
		for (var a = D(r); a && (a.nodeType !== 8 || a.data !== H); ) a = L(a);
		if (!a) throw p;
		c(!0), E(a), O();
		const o = b(t, { ...e, anchor: a });
		if (_ === null || _.nodeType !== 8 || _.data !== I) throw (Y(), p);
		return c(!1), o;
	} catch (o) {
		if (o === p) return e.recover === !1 && j(), m(), k(r), c(!1), J(t, e);
		throw o;
	} finally {
		c(l), E(u), F();
	}
}
const i = new Map();
function b(
	t,
	{ target: e, anchor: r, props: l = {}, events: u, context: a, intro: o = !0 }
) {
	m();
	var v = new Set(),
		y = (d) => {
			for (var s = 0; s < d.length; s++) {
				var n = d[s];
				if (!v.has(n)) {
					v.add(n);
					var f = B(n);
					e.addEventListener(n, h, { passive: f });
					var T = i.get(n);
					T === void 0
						? (document.addEventListener(n, h, { passive: f }), i.set(n, 1))
						: i.set(n, T + 1);
				}
			}
		};
	y(C(z)), N.add(y);
	var g = void 0,
		A = M(() => {
			var d = r ?? e.appendChild(S());
			return (
				V(() => {
					if (a) {
						$({});
						var s = q;
						s.c = a;
					}
					u && (l.$$events = u),
						w && G(d, null),
						(g = t(d, l) || {}),
						w && (P.nodes_end = _),
						a && W();
				}),
				() => {
					var f;
					for (var s of v) {
						e.removeEventListener(s, h);
						var n = i.get(s);
						--n === 0 ? (document.removeEventListener(s, h), i.delete(s)) : i.set(s, n);
					}
					N.delete(y), d !== r && ((f = d.parentNode) == null || f.removeChild(d));
				}
			);
		});
	return R.set(g, A), g;
}
let R = new WeakMap();
function Z(t, e) {
	const r = R.get(t);
	return r ? (R.delete(t), r(e)) : Promise.resolve();
}
export { X as h, J as m, U as s, Z as u };
