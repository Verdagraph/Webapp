import {
	I as b,
	O as c,
	u as d,
	N as g,
	T as h,
	F as i,
	U as k,
	Q as m,
	P as p,
	R as v
} from './DgmMHYUv.js';

function x(n = !1) {
	const s = d,
		e = s.l.u;
	if (!e) return;
	let f = () => m(s.s);
	if (n) {
		let a = 0,
			t = {};
		const _ = h(() => {
			let l = !1;
			const r = s.s;
			for (const o in r) r[o] !== t[o] && ((t[o] = r[o]), (l = !0));
			return l && a++, a;
		});
		f = () => p(_);
	}
	e.b.length &&
		g(() => {
			u(s, f), c(e.b);
		}),
		i(() => {
			const a = b(() => e.m.map(v));
			return () => {
				for (const t of a) typeof t == 'function' && t();
			};
		}),
		e.a.length &&
			i(() => {
				u(s, f), c(e.a);
			});
}
function u(n, s) {
	if (n.l.s) for (const e of n.l.s) p(e);
	s();
}
k();
export { x as i };
