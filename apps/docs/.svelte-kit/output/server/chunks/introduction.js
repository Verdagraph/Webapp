import "clsx";
const metadata = {
  "title": "Introduction",
  "description": "Introduction to the documentation.",
  "updatedDate": "2025-5-29",
  "categories": ["general"],
  "published": true
};
const {
  title,
  description,
  updatedDate,
  categories,
  published
} = metadata;
function Introduction_svx($$payload) {
  $$payload.out += `<h2>Welcome to Verdagraph</h2> <p>Welcome to the documentation! As the Verdagraph application is not yet available for public use, this documentation is only partially completed. If you notice anything that could be added or improved, feel free to reach out.</p> <p>To use the documentation, navigate between pages using the left-hand sidebar on large screens, or the collapsible menu on small screens. The sidebar contains nested links that may be collapsed. Navigate between the contents of a page using the table of contents on the right-hand side of the screen for large screens, and the collapsible menu at the top of small screens.</p> <p>The documentation is broken up into the following sections:</p> <ul><li>The general pages, including this introduction, the FAQ, and any other documents in the top-level of the Documentation section of the sidebar.</li> <li>Usage pages, which include information on the components of the application and how to use them.</li> <li>Tutorial pages, which include instructions for specific workflows.</li></ul>`;
}
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Introduction_svx,
  metadata
}, Symbol.toStringTag, { value: "Module" }));
export {
  __vite_glob_0_6 as _
};
