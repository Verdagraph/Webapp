import { j as json } from "../../../../chunks/index2.js";
async function getBlogs() {
  let pages = [];
  const paths = /* @__PURE__ */ Object.assign({});
  for (const path in paths) {
    const file = paths[path];
    const slug = path.split("/").at(-1)?.replace(".svx", "");
    if (file && typeof file === "object" && "metadata" in file && slug) {
      const metadata = file.metadata;
      const page = { ...metadata, slug };
      if (page.published) {
        pages.push(page);
      }
    }
  }
  pages = pages.sort(
    (first, second) => new Date(second.publishedDate).getTime() - new Date(first.publishedDate).getTime()
  );
  return pages;
}
async function GET() {
  const pages = await getBlogs();
  return json(pages);
}
export {
  GET
};
