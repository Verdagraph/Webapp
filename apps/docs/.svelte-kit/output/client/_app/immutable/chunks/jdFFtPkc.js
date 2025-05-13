import {
	M as A,
	S as C,
	K as E,
	N,
	o as S,
	h as T,
	r as c,
	C as d,
	L as k,
	J as n,
	O as x,
	d as y
} from './BvF3OQQc.js';

function L(r, f, i) {
	c && T();
	var t = r,
		a,
		s;
	n(() => {
		a !== (a = f()) && (s && (k(s), (s = null)), a && (s = S(() => i(t, a))));
	}, E),
		c && (t = y);
}
function h(r, f) {
	return r === f || (r == null ? void 0 : r[C]) === f;
}
function M(r = {}, f, i, t) {
	return (
		A(() => {
			var a, s;
			return (
				N(() => {
					(a = s),
						(s = []),
						d(() => {
							r !== i(...s) && (f(r, ...s), a && h(i(...a), r) && f(null, ...a));
						});
				}),
				() => {
					x(() => {
						s && h(i(...s), r) && f(null, ...s);
					});
				}
			);
		}),
		r
	);
}
export { M as b, L as c };
