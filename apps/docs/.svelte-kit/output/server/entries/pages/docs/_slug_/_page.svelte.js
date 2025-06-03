import { F as head, G as escape_html, D as pop, A as push, E as attr } from "../../../../chunks/index.js";
import { DateFormatter } from "@internationalized/date";
import { M as MainContentContainer } from "../../../../chunks/MainContentContainer.js";
function _page($$payload, $$props) {
  push();
  const df = new DateFormatter("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
  let { data } = $$props;
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>${escape_html(data.meta.title)}</title>`;
    $$payload2.out += `<meta property="og:type" content="article"> <meta property="og:title"${attr("content", data.meta.title)}>`;
  });
  MainContentContainer($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<article><hgroup><h1>${escape_html(data.meta.title)}</h1> <p class="text-neutral-10">Last updated ${escape_html(df.format(new Date(data.meta.updatedDate)))}</p></hgroup> <div><!---->`;
      data.content($$payload2, {});
      $$payload2.out += `<!----></div></article>`;
    }
  });
  pop();
}
export {
  _page as default
};
