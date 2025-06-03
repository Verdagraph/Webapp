import "clsx";
const metadata = {
  "title": "Create your First Plan",
  "description": "Instructions for configuring cultivars.",
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
function First_plan_svx($$payload) {
  $$payload.out += `<h2>There’s nothing here yet!</h2> <p>Check back later.</p>`;
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: First_plan_svx,
  metadata
}, Symbol.toStringTag, { value: "Module" }));
export {
  __vite_glob_0_3 as _
};
