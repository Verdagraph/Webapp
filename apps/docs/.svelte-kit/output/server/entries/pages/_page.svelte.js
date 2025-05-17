import { s as setContext, l as hasContext, m as getContext, q as spread_attributes, G as clsx, j as bind_props, f as pop, p as push, w as ensure_array_like, I as element, t as spread_props, u as copy_payload, v as assign_payload, h as head, J as attr_class, x as escape_html } from "../../chunks/index2.js";
import { I as Icon$1 } from "../../chunks/Icon.js";
import "clsx";
import { c as cn, B as Button, e as env } from "../../chunks/env.js";
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
  $$payload.out += `<div class="overflow-hidden"><div${spread_attributes(
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
/**
 * @license @lucide/svelte v0.510.0 - ISC
 *
 * ISC License
 * 
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
 */
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
function Icon($$payload, $$props) {
  push();
  const {
    name,
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth = false,
    iconNode = [],
    children,
    $$slots,
    $$events,
    ...props
  } = $$props;
  const each_array = ensure_array_like(iconNode);
  $$payload.out += `<svg${spread_attributes(
    {
      ...defaultAttributes,
      ...props,
      width: size,
      height: size,
      stroke: color,
      "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      class: clsx([
        "lucide-icon lucide",
        name && `lucide-${name}`,
        props.class
      ])
    },
    null,
    void 0,
    void 0,
    3
  )}><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let [tag, attrs] = each_array[$$index];
    element($$payload, tag, () => {
      $$payload.out += `${spread_attributes({ ...attrs }, null, void 0, void 0, 3)}`;
    });
  }
  $$payload.out += `<!--]-->`;
  children?.($$payload);
  $$payload.out += `<!----></svg>`;
  pop();
}
function Arrow_right($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "M5 12h14" }],
    ["path", { "d": "m12 5 7 7-7 7" }]
  ];
  Icon($$payload, spread_props([
    { name: "arrow-right" },
    props,
    {
      iconNode,
      children: ($$payload2) => {
        props.children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function Carousel_next($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    variant = "outline",
    size = "icon",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const emblaCtx = getEmblaContext("<Carousel.Next/>");
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Button($$payload2, spread_props([
      {
        variant,
        size,
        class: cn("absolute size-8 touch-manipulation rounded-full", emblaCtx.orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", className),
        disabled: !emblaCtx.canScrollNext,
        onclick: emblaCtx.scrollNext,
        onkeydown: emblaCtx.handleKeyDown
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        },
        children: ($$payload3) => {
          Arrow_right($$payload3, { class: "size-4" });
          $$payload3.out += `<!----> <span class="sr-only">Next slide</span>`;
        },
        $$slots: { default: true }
      }
    ]));
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Arrow_left($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "m12 19-7-7 7-7" }],
    ["path", { "d": "M19 12H5" }]
  ];
  Icon($$payload, spread_props([
    { name: "arrow-left" },
    props,
    {
      iconNode,
      children: ($$payload2) => {
        props.children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function Carousel_previous($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    variant = "outline",
    size = "icon",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const emblaCtx = getEmblaContext("<Carousel.Previous/>");
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Button($$payload2, spread_props([
      {
        variant,
        size,
        class: cn("absolute size-8 touch-manipulation rounded-full", emblaCtx.orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className),
        disabled: !emblaCtx.canScrollPrev,
        onclick: emblaCtx.scrollPrev,
        onkeydown: emblaCtx.handleKeyDown
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        },
        children: ($$payload3) => {
          Arrow_left($$payload3, { class: "size-4" });
          $$payload3.out += `<!----> <span class="sr-only">Previous slide</span>`;
        },
        $$slots: { default: true }
      }
    ]));
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
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
function LandingPageDemo($$payload) {
  Carousel($$payload, {
    children: ($$payload2) => {
      Carousel_content($$payload2, {
        children: ($$payload3) => {
          Carousel_item($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->...`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Carousel_item($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->...`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Carousel_item($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->...`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Carousel_previous($$payload2, {});
      $$payload2.out += `<!----> `;
      Carousel_next($$payload2, {});
      $$payload2.out += `<!---->`;
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
  Icon$1($$payload, {
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
  $$payload.out += `<div class="flex h-full w-full justify-center"><div class="flex w-11/12 flex-col md:w-5/6 lg:w-3/4 2xl:w-1/2"><div class="mt-12 flex w-full items-center justify-between"><h1 class="text-left text-3xl font-bold">Eco-modelling tools for collaboratively organized agriculture</h1> <div class="ml-8">`;
  Logo($$payload, { size: "8rem" });
  $$payload.out += `<!----></div></div> <div class="mt-8 flex justify-between gap-4">`;
  Button($$payload, {
    variant: "default",
    href: "/demo",
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
  $$payload.out += `<!----></div> <div class="border-neutral-6 bg-neutral-2 mt-6 aspect-video w-full rounded-lg border shadow-md">`;
  LandingPageDemo($$payload);
  $$payload.out += `<!----></div> <div class="mt-8 flex w-full flex-col gap-6"><div class="flex items-center justify-between"><h2 class="text-neutral-11 font-semibold">Project status:</h2> <div class="bg-neutral-6 mx-8 h-[1px] grow rounded-lg"></div> <span${attr_class(clsx(cn(developmentStatusClass, "rounded-lg border px-4 py-2 text-sm")))}>Early development</span></div> <div class="mt-4 flex flex-col gap-4">`;
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
  $$payload.out += `<!----></div></div></div>`;
  pop();
}
export {
  _page as default
};
