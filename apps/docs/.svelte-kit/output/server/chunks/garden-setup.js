import "clsx";
const metadata = {
  "title": "Setup your First Garden",
  "description": "Instructions for creating and configuring a garden.",
  "updatedDate": "2025-5-29",
  "categories": ["tutorials"],
  "published": true
};
const {
  title,
  description,
  updatedDate,
  categories,
  published
} = metadata;
function Garden_setup_svx($$payload) {
  $$payload.out += `<h2>There’s nothing here yet!</h2> <p>Check back later.</p>`;
}
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Garden_setup_svx,
  metadata
}, Symbol.toStringTag, { value: "Module" }));
export {
  __vite_glob_0_5 as _
};
