import "clsx";
const metadata = {
  "title": "Self Hosing Instructions",
  "description": "Instructions for replicating project deployment.",
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
function Self_hosting_svx($$payload) {
  $$payload.out += `<p>Instructions for self-hosting do not yet exist as the application has not yet made it out of a development environment. However, you can expect self-hosting to use a typical docker-compose approach. The infrastructure required to run the project will likely be composed of:</p> <ul><li>A static file server to send the frontend application to clients.</li> <li>A Node or other javascript runtime server hosting the <a href="https://www.triplit.dev/" rel="nofollow">Triplit</a> database.</li> <li>A Node or other javascript runtime server hosting an authentication provider and other utilities.</li></ul>`;
}
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Self_hosting_svx,
  metadata
}, Symbol.toStringTag, { value: "Module" }));
export {
  __vite_glob_0_7 as _
};
