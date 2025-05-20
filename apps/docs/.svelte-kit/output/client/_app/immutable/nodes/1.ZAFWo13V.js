import { i as l } from '../chunks/B1d5rMd0.js';
import { s as p } from '../chunks/BRpxm6ve.js';
import { s as k, p as m } from '../chunks/CFlqBorB.js';
import {
	y as $,
	w as _,
	z as a,
	x as d,
	A as o,
	t as v,
	C as x
} from '../chunks/DgmMHYUv.js';
import { t as g, f as h } from '../chunks/HWDk4eir.js';

const b = {
	get error() {
		return m.error;
	},
	get status() {
		return m.status;
	}
};
k.updated.check;
const i = b;
var w = g('<h1> </h1> <p> </p>', 1);
function j(f, n) {
	v(n, !1), l();
	var r = w(),
		t = d(r),
		c = a(t, !0);
	o(t);
	var e = $(t, 2),
		u = a(e, !0);
	o(e),
		x(() => {
			var s;
			p(c, i.status), p(u, (s = i.error) == null ? void 0 : s.message);
		}),
		h(f, r),
		_();
}
export { j as component };
