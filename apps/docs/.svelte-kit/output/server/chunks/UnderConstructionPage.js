import "clsx";
import { I as Icon } from "./Icon.js";
function UnderConstructionPage($$payload) {
  $$payload.out += `<div class="mt-12 flex flex-col items-center"><h1 class="flex items-center p-4 text-5xl">`;
  Icon($$payload, { icon: "material-symbols:construction" });
  $$payload.out += `<!----> <span class="mx-4">Under Construction</span> `;
  Icon($$payload, { icon: "material-symbols:construction" });
  $$payload.out += `<!----></h1> <p class="xl p-4">This is a placeholder for a page that has not been started yet. Please check back
		later.</p></div>`;
}
export {
  UnderConstructionPage as U
};
