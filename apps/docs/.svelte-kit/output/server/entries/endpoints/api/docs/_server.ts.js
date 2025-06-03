import { _ as __vite_glob_0_0 } from "../../../../chunks/concepts.js";
import { _ as __vite_glob_0_1 } from "../../../../chunks/cultivar-config.js";
import { _ as __vite_glob_0_2 } from "../../../../chunks/faq.js";
import { _ as __vite_glob_0_3 } from "../../../../chunks/first-plan.js";
import { _ as __vite_glob_0_4 } from "../../../../chunks/garden-management.js";
import { _ as __vite_glob_0_5 } from "../../../../chunks/garden-setup.js";
import { _ as __vite_glob_0_6 } from "../../../../chunks/introduction.js";
import { _ as __vite_glob_0_7 } from "../../../../chunks/self-hosting.js";
import { _ as __vite_glob_0_8 } from "../../../../chunks/workspace-environment-config.js";
import { j as json } from "../../../../chunks/index2.js";
async function getDocs() {
  let pages = [];
  const paths = /* @__PURE__ */ Object.assign({ "/src/docs/concepts.svx": __vite_glob_0_0, "/src/docs/cultivar-config.svx": __vite_glob_0_1, "/src/docs/faq.svx": __vite_glob_0_2, "/src/docs/first-plan.svx": __vite_glob_0_3, "/src/docs/garden-management.svx": __vite_glob_0_4, "/src/docs/garden-setup.svx": __vite_glob_0_5, "/src/docs/introduction.svx": __vite_glob_0_6, "/src/docs/self-hosting.svx": __vite_glob_0_7, "/src/docs/workspace-environment-config.svx": __vite_glob_0_8 });
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
    (first, second) => new Date(second.updatedDate).getTime() - new Date(first.updatedDate).getTime()
  );
  return pages;
}
async function GET() {
  const pages = await getDocs();
  return json(pages);
}
export {
  GET
};
