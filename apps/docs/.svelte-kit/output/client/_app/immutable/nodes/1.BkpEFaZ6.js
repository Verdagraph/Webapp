import { s as p } from '../chunks/7LWAmKDU.js';
import {
	w as _,
	v as a,
	Q as d,
	P as l,
	x as o,
	p as v,
	u as x
} from '../chunks/BvF3OQQc.js';
import '../chunks/CC_UwoEl.js';
import { t as g, b as h } from '../chunks/CNAEEddD.js';
import { i as $ } from '../chunks/EIGlRJae.js';
import { s as b, p as m } from '../chunks/q6OuH9xx.js';

const k = {
	get error() {
		return m.error;
	},
	get status() {
		return m.status;
	}
};
b.updated.check;
const i = k;
var w = g('<h1> </h1> <p> </p>', 1);
function z(n, c) {
	v(c, !1), $();
	var r = w(),
		t = l(r),
		f = a(t, !0);
	o(t);
	var e = _(t, 2),
		u = a(e, !0);
	o(e),
		d(() => {
			var s;
			p(f, i.status), p(u, (s = i.error) == null ? void 0 : s.message);
		}),
		h(n, r),
		x();
}
export { z as component };
