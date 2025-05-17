import { q as head, n as attr, m as pop, p as push } from "../../../chunks/index.js";
import { M as MainContentContainer } from "../../../chunks/MainContentContainer.js";
import { B as Button } from "../../../chunks/env.js";
import { e as externalLinks } from "../../../chunks/links.js";
function _page_svx($$payload, $$props) {
  push();
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Support - Verdagraph</title>`;
  });
  MainContentContainer($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<h1>Support the Project</h1> <p>There are many ways you can support Verdagraph.</p> <h2>Financial</h2> <p>Verdagraph is currently a hobby project, with ambitions to become a reliable source of income for its contributor(s).
Funding is appreciated.</p> <p>Donations are accepted through <a href="https://liberapay.com/Verdagraph" rel="nofollow">Liberapay</a>.</p> `;
      Button($$payload2, {
        variant: "default",
        href: "https://liberapay.com/Verdagraph",
        class: "w-full not-prose border-accent-8",
        children: ($$payload3) => {
          $$payload3.out += `<!---->Donate`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <p>The current monthy expenses of the project, including the fees to run the application, this website, and other infrastructure, is listed below.</p> <div class="w-full border border-netural-6 rounded-lg flex justify-between px-4 py-2"><span class="text-neutral-11">Monthly expenses (CAD):</span> <span class="italic text-neutral-10">$10.06</span></div> <h2>Marketing</h2> <p>If you know anyone who is interested in technology and agriculture, feel free to show them this project.</p> <h2>Feedback</h2> <p>All ideas for how to improve the project are welcome.</p> <p>If you’re comfortable, you can create an issue in the <a${attr("href", externalLinks.repository)}>corresponding repository</a>.</p> <p>Otherwise, feel free to reach out via <a href="mailto:contact@verdagraph.org">email</a>.</p> <p>If a community grows around this project, a public forum using <a href="https://www.discourse.org/" rel="nofollow">Discourse</a> or another tool may be created.</p> <h2>Development</h2> <p>Contributors to the project are welcome.
You’ll be able to contribute to Verdagraph if you
want to build tools that empower food sovereignty through decentralized,
horizontal food systems, and are able to do any of the following:</p> <ul><li>Build cross platform Typescript applications.</li> <li>Build embedded IoT devices.</li> <li>Design user interfaces.</li> <li>Design graphics.</li> <li>Translate between English and any other language.</li></ul> <p>If you’re interested in a one-off contribution feel free to create an issue in the <a${attr("href", externalLinks.repository)}>corresponding repository</a>.</p> <p>If you’re interested in contributing on a more regular basis, please reach out via <a href="mailto:contact@verdagraph.org">email</a>.</p>`;
    }
  });
  pop();
}
export {
  _page_svx as default
};
