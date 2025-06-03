import { C as setContext, K as hasContext, M as getContext, N as spread_attributes, O as clsx, P as bind_props, D as pop, A as push, E as attr, I as ensure_array_like, F as head, Q as attr_class, G as escape_html } from "../../chunks/index.js";
import { c as cn, B as Button, I as Icon } from "../../chunks/circle.js";
import "clsx";
import { c as derivedMode } from "../../chunks/floating-layer-anchor.js";
import { N as Nav, e as env } from "../../chunks/Nav.js";
import { L as Logo } from "../../chunks/logo.js";
const EMBLA_CAROUSEL_CONTEXT = Symbol("EMBLA_CAROUSEL_CONTEXT");
function setEmblaContext(config) {
  setContext(EMBLA_CAROUSEL_CONTEXT, config);
  return config;
}
function getEmblaContext(name = "This component") {
  if (!hasContext(EMBLA_CAROUSEL_CONTEXT)) {
    throw new Error(`${name} must be used within a <Carousel.Root> component`);
  }
  return getContext(EMBLA_CAROUSEL_CONTEXT);
}
function Carousel_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const emblaCtx = getEmblaContext("<Carousel.Content/>");
  $$payload.out += `<div class="h-full w-full overflow-hidden"><div${spread_attributes(
    {
      class: clsx(cn("flex", emblaCtx.orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)),
      "data-embla-container": "",
      ...restProps
    }
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div></div>`;
  bind_props($$props, { ref });
  pop();
}
function Carousel_item($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const emblaCtx = getEmblaContext("<Carousel.Item/>");
  $$payload.out += `<div${spread_attributes(
    {
      role: "group",
      "aria-roledescription": "slide",
      class: clsx(cn("min-w-0 shrink-0 grow-0 basis-full", emblaCtx.orientation === "horizontal" ? "pl-4" : "pt-4", className)),
      "data-embla-slide": "",
      ...restProps
    }
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Carousel($$payload, $$props) {
  push();
  let {
    opts = {},
    plugins = [],
    setApi = () => {
    },
    orientation = "horizontal",
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let carouselState = {
    api: void 0,
    scrollPrev,
    scrollNext,
    orientation,
    canScrollNext: false,
    canScrollPrev: false,
    handleKeyDown,
    options: opts,
    plugins,
    onInit,
    scrollSnaps: [],
    selectedIndex: 0,
    scrollTo
  };
  setEmblaContext(carouselState);
  function scrollPrev() {
    carouselState.api?.scrollPrev();
  }
  function scrollNext() {
    carouselState.api?.scrollNext();
  }
  function scrollTo(index, jump) {
    carouselState.api?.scrollTo(index, jump);
  }
  function handleKeyDown(e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollNext();
    }
  }
  function onInit(event) {
    carouselState.api = event.detail;
    carouselState.scrollSnaps = carouselState.api.scrollSnapList();
  }
  $$payload.out += `<div${spread_attributes(
    {
      class: clsx(cn("relative", className)),
      role: "region",
      "aria-roledescription": "carousel",
      ...restProps
    }
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  pop();
}
const darkUrl = "/_app/immutable/assets/workspaceDark.C2oELa4z.png";
const lightUrl = "/_app/immutable/assets/workspaceLight.CcdMMaIp.png";
function Example($$payload, $$props) {
  push();
  const alt = "A screenshot of the workspace editor section of the application, where workspaces and other entities such as planting areas may be edited.";
  if (derivedMode.current === "dark") {
    $$payload.out += "<!--[-->";
    {
      $$payload.out += "<!--[-->";
      $$payload.out += `<img${attr("src", darkUrl)}${attr("alt", alt)}${attr("width", darkUrl)}${attr("height", darkUrl)}>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
    {
      $$payload.out += "<!--[-->";
      $$payload.out += `<img${attr("src", lightUrl)}${attr("alt", alt)}${attr("width", lightUrl)}${attr("height", lightUrl)}>`;
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
const examples = [
  {
    name: "Planting Areas",
    description: "Garden beds, areas, and any geometry can be flexibly represented.",
    component: Example
  }
];
function LandingPageDemo($$payload) {
  Carousel($$payload, {
    class: "border-neutral-3 bg-neutral-2 mt-6 overflow-hidden rounded-[4px] border shadow-lg",
    children: ($$payload2) => {
      Carousel_content($$payload2, {
        class: "",
        children: ($$payload3) => {
          const each_array = ensure_array_like(examples);
          $$payload3.out += `<!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let example = each_array[$$index];
            Carousel_item($$payload3, {
              class: "",
              children: ($$payload4) => {
                example.component($$payload4, {});
              },
              $$slots: { default: true }
            });
          }
          $$payload3.out += `<!--]-->`;
        },
        $$slots: { default: true }
      });
    },
    $$slots: { default: true }
  });
}
function explainerSnippet($$payload, explainer) {
  const each_array = ensure_array_like(explainer.points);
  $$payload.out += `<div class="mt-8 flex justify-between"><div class="flex h-full flex-col"><h3 class="text-neutral-12 w-full text-lg font-semibold">${escape_html(explainer.title)}</h3> <ul class="mt-4 flex list-disc flex-col gap-4 rounded-lg p-4"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let point = each_array[$$index];
    $$payload.out += `<li class="text-neutral-11 text-sm">${escape_html(point)}</li>`;
  }
  $$payload.out += `<!--]--></ul></div> <div${attr_class(clsx(cn(explainer.iconContainerClass, "ml-6 flex items-center justify-center rounded-lg border p-4")))}>`;
  Icon($$payload, {
    icon: explainer.icon,
    width: "6rem",
    class: explainer.iconClass || ""
  });
  $$payload.out += `<!----></div></div>`;
}
function _page($$payload, $$props) {
  push();
  const explainers = [
    {
      title: "A garden productivity tool and agro-ecological model",
      points: [
        "Maximize the use of space by simulating plants throughout space and time",
        "Tune recommendations for starting plants to local environmental conditions",
        "Compare multiple plans against estimated metrics of yield and eco benefit"
      ],
      icon: "mdi:plant-outline",
      iconContainerClass: "bg-primary-8 border-primary-10",
      iconClass: "text-primary-1"
    },
    {
      title: "A community hub for the coordination of labour and the distribution of produce",
      points: [
        "Edit gardens with other users in real time",
        "Generate tasks and assign responsibilities",
        "Record harvests and notify subscribers"
      ],
      icon: "mdi:handshake-outline",
      iconContainerClass: "bg-secondary-8 border-secondary-10",
      iconClass: "text-secondary-1"
    },
    {
      title: "An interface for external devices to send data to and receive commands from",
      points: [
        "Use environmental data to inform planning and update the model",
        "Use the model to intelligently control outputs such as irrigation"
      ],
      icon: "ant-design:control-outlined",
      iconContainerClass: "bg-accent-8 border-accent-10",
      iconClass: "text-accent-1"
    }
  ];
  const developmentStatusClass = "bg-crimson-5 border-crimson-6 text-crimson-12";
  const each_array_1 = ensure_array_like(explainers);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Verdagraph - Eco-modelling tools for collaboratively organized agriculture</title>`;
  });
  $$payload.out += `<div class="flex w-full flex-col">`;
  Nav($$payload);
  $$payload.out += `<!----> <div class="mb-12 flex h-full w-full justify-center"><div class="flex w-11/12 flex-col md:w-5/6 lg:w-3/4 2xl:w-1/2"><div class="mt-12 flex w-full items-center justify-between"><h1 class="text-left text-4xl font-extrabold">Eco-modelling tools for collaboratively organized agriculture</h1> <div class="ml-8">`;
  Logo($$payload, { size: "12rem" });
  $$payload.out += `<!----></div></div> <div class="mt-16 flex justify-between gap-4">`;
  Button($$payload, {
    variant: "default",
    href: "/demos",
    class: "w-full",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Try the Demonstration`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Button($$payload, {
    variant: "default",
    href: env.APP_URL,
    class: "w-full",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Get Started`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div> `;
  LandingPageDemo($$payload);
  $$payload.out += `<!----> <div class="mt-8 flex w-full flex-col gap-6"><div class="flex items-center justify-between"><h2 class="text-neutral-11 font-semibold">Project status:</h2> <div class="bg-neutral-6 mx-8 h-[1px] grow rounded-lg"></div> <span${attr_class(clsx(cn(developmentStatusClass, "rounded-lg border px-4 py-2 text-sm")))}>Early development</span></div> <div class="mt-4 flex flex-col gap-4">`;
  Button($$payload, {
    variant: "secondary",
    href: env.NEWSLETTER_URL,
    class: "w-full",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Join the newsletter for new features and progress updates`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div> <div class="bg-neutral-6 mt-4 h-[1px] grow rounded-lg"></div> <div class="mt-4 flex flex-col gap-8"><p class="text-neutral-11 italic">Verdagraph is a collection of open source tools that seek to empower the
						collaborative planning, tracking, and automation of agro-ecological systems.
						It currently consists of a garden productivity application and a smart
						irrigation controller.</p> <!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let explainer = each_array_1[$$index_1];
    explainerSnippet($$payload, explainer);
  }
  $$payload.out += `<!--]--></div></div> <div class="mt-12 flex justify-between gap-4">`;
  Button($$payload, {
    variant: "outline",
    href: "/about",
    class: "w-full",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Read More`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Button($$payload, {
    variant: "outline",
    href: "/support",
    class: "w-full",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Support the Project`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></div></div></div>`;
  pop();
}
export {
  _page as default
};
