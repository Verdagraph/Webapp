import { m as ensure_array_like, h as head, n as escape_html, a as pop, p as push } from "../../../../../../chunks/index2.js";
import { g as getWorkspaceContext } from "../../../../../../chunks/activeWorkspace.svelte.js";
import { B as Button } from "../../../../../../chunks/button2.js";
import "clsx";
import { S as Scroll_area } from "../../../../../../chunks/scroll-area.js";
function WorkspaceThumbnail($$payload) {
  $$payload.out += `<svg fill="#FFFFFF" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve"><path id="XMLID_523_" d="M315,0H15C6.716,0,0,6.716,0,15v300c0,8.284,6.716,15,15,15h300c8.284,0,15-6.716,15-15V15
	C330,6.716,323.285,0,315,0z M300,300H30V30h270V300z"></path></svg>`;
}
function _page($$payload, $$props) {
  push();
  getWorkspaceContext();
  let workspaces = [
    {
      gardenId: "f4b3b1b0-0b3b-4b3b-8b3b-0b3b1b0b3b1b",
      id: "f4b3b1b0-0b3b-4b3b-8b3b-0b3b1b0b3b1b",
      name: "Workspace 1arstnoienrsienotarson",
      slug: "workspace-1",
      description: "Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop Jokester. And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started laughing, they couldn't stop."
    }
  ];
  const each_array = ensure_array_like(workspaces);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Workspaces - Verdagraph</title>`;
  });
  $$payload.out += `<div class="mx-auto mt-0 grid w-full grid-cols-1 gap-0 md:mt-8 md:w-10/12 md:gap-8 lg:mt-16 lg:w-3/4 xl:w-1/2"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let workspace = each_array[$$index];
    $$payload.out += `<div class="bg-neutral-1 md:bg-neutral-3 flex h-auto w-auto flex-col items-center justify-around gap-4 rounded-none border-b p-8 shadow-lg md:rounded-md md:border lg:flex-row">`;
    Button($$payload, {
      variant: "outline",
      href: `workspaces/${workspace.slug}`,
      class: "bg-neutral-2 hover:bg-neutral-1 relative mx-4 flex h-72 w-96 flex-col justify-around text-xl",
      children: ($$payload2) => {
        $$payload2.out += `<p class="inset-1/8 absolute top-2 w-auto max-w-60 overflow-hidden text-wrap rounded-sm px-2 py-1 text-center">${escape_html(workspace.name)}</p> <div class="flex h-full w-full items-center justify-center p-2">`;
        WorkspaceThumbnail($$payload2);
        $$payload2.out += `<!----></div>`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> `;
    Scroll_area($$payload, {
      class: "bg-neutral-2 h-auto max-h-72 w-96 rounded-md border px-6 py-4 lg:h-72 lg:w-1/2",
      children: ($$payload2) => {
        $$payload2.out += `<!---->${escape_html(workspace.description || "No description provided.")}`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
export {
  _page as default
};
