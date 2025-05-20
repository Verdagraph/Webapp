import { i as _ } from '../chunks/B1d5rMd0.js';
import { M as B } from '../chunks/BNiip-ZU.js';
import { e as u } from '../chunks/C86kfYSN.js';
import { B as T } from '../chunks/Cy8X8so-.js';
import {
	$ as C,
	w as D,
	x as I,
	C as V,
	y as e,
	A as i,
	t as j,
	z as o,
	B as t
} from '../chunks/DgmMHYUv.js';
import { e as $, f as h, d as v, t as x } from '../chunks/HWDk4eir.js';
import { s as c } from '../chunks/UaJBEsuX.js';

var k = x(
	`<h1>Support the Project</h1> <p>There are many ways you can support Verdagraph.</p> <h2>Financial</h2> <p>Verdagraph is currently a hobby project, with ambitions to become a reliable source of income for its contributor(s).
Funding is appreciated.</p> <p>Donations are accepted through <a href="https://liberapay.com/Verdagraph" rel="nofollow">Liberapay</a>.</p> <!> <p>The current monthy expenses of the project, including the fees to run the application, this website, and other infrastructure, is listed below.</p> <div class="w-full border border-netural-6 rounded-lg flex justify-between px-4 py-2"><span class="text-neutral-11">Monthly expenses (CAD):</span> <span class="italic text-neutral-10"></span></div> <h2>Marketing</h2> <p>If you know anyone who is interested in technology and agriculture, feel free to show them this project.</p> <h2>Feedback</h2> <p>All ideas for how to improve the project are welcome.</p> <p>If you’re comfortable, you can create an issue in the <a>corresponding repository</a>.</p> <p>Otherwise, feel free to reach out via <a href="mailto:contact@verdagraph.org">email</a>.</p> <p>If a community grows around this project, a public forum using <a href="https://www.discourse.org/" rel="nofollow">Discourse</a> or another tool may be created.</p> <h2>Development</h2> <p>Contributors to the project are welcome.
You’ll be able to contribute to Verdagraph if you
want to build tools that empower food sovereignty through decentralized,
horizontal food systems, and are able to do any of the following:</p> <ul><li>Build cross platform Typescript applications.</li> <li>Build embedded IoT devices.</li> <li>Design user interfaces.</li> <li>Design graphics.</li> <li>Translate between English and any other language.</li></ul> <p>If you’re interested in a one-off contribution feel free to create an issue in the <a>corresponding repository</a>.</p> <p>If you’re interested in contributing on a more regular basis, please reach out via <a href="mailto:contact@verdagraph.org">email</a>.</p>`,
	1
);
function Y(d, f) {
	j(f, !1),
		_(),
		v((s) => {
			C.title = 'Support - Verdagraph';
		}),
		B(d, {
			children: (s, M) => {
				var n = k(),
					p = e(I(n), 10);
				T(p, {
					variant: 'default',
					href: 'https://liberapay.com/Verdagraph',
					class: 'w-full not-prose border-accent-8',
					children: (y, z) => {
						t();
						var w = $('Donate');
						h(y, w);
					},
					$$slots: { default: !0 }
				});
				var r = e(p, 4),
					m = e(o(r), 2);
				(m.textContent = '$10.06'), i(r);
				var a = e(r, 10),
					g = e(o(a));
				t(), i(a);
				var l = e(a, 12),
					b = e(o(l));
				t(),
					i(l),
					t(2),
					V(() => {
						c(g, 'href', u.repository), c(b, 'href', u.repository);
					}),
					h(s, n);
			}
		}),
		D();
}
export { Y as component };
