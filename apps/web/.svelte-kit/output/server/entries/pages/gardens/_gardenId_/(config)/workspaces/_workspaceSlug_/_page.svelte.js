import "clsx";
import { k as getContext, b as attr, a as pop, p as push, o as once, c as spread_attributes, d as bind_props, e as copy_payload, f as assign_payload, n as attr_class, h as stringify, m as escape_html, q as clsx, l as ensure_array_like, u as attr_style, v as store_get, w as unsubscribe_stores, x as store_mutate } from "../../../../../../../chunks/index2.js";
import { d as derivedMode, F as FormInfoPopover, c as createUnitAwareValues, C as CoordinateInput, U as UnitAwareInput, G as GeometrySelect, g as getWorkspaceContext, t as toolbox } from "../../../../../../../chunks/activeWorkspace.svelte.js";
import { A as AppError, w as workspaceFields, t as triplit } from "../../../../../../../chunks/auth.svelte.js";
import { a as plantingAreaQuery, b as plantingAreasQuery, w as workspacesQuery, c as plantingAreaIdsQuery } from "../../../../../../../chunks/queries2.js";
import { u as useQuery } from "../../../../../../../chunks/index.svelte.js";
import Konva from "konva";
import { I as Icon, o as onDestroy } from "../../../../../../../chunks/Icon.js";
import { u as useRefById, a as getDataDisabled, b as getDataOpenClosed, d as getAriaExpanded, e as useId, f as box, m as mergeProps } from "../../../../../../../chunks/use-id.js";
import { g as getColor } from "../../../../../../../chunks/tools.svelte.js";
import { h as historySelect, l as locationHistoryUpdate, g as geometryUpdate, p as plantingAreaUpdate, a as locationHistoryExtend, b as locationUpdate } from "../../../../../../../chunks/commands.js";
import { c as createCommandHandler } from "../../../../../../../chunks/commandHandler.svelte.js";
import { B as Button } from "../../../../../../../chunks/button2.js";
import { c as createContext, S as SPACE, E as ENTER, n as noop, P as Presence_layer, R as Root$2, T as Trigger$2, d as Popover_content } from "../../../../../../../chunks/index3.js";
import { R as Root$1, T as Trigger$1 } from "../../../../../../../chunks/index4.js";
import { T as Tooltip_content, D as DatePicker, a as Tree$1, R as Root$4, b as Tabs_list, c as Tabs_trigger, d as Tabs_content, e as Resizable_pane_group, P as Pane, f as Resizable_handle, g as TabToolbox, h as TimelineSelector } from "../../../../../../../chunks/TabToolbox.js";
import { p as page } from "../../../../../../../chunks/index5.js";
import { S as Scroll_area } from "../../../../../../../chunks/scroll-area.js";
import { i as iconIds } from "../../../../../../../chunks/icons.js";
import { I as Input } from "../../../../../../../chunks/zod.js";
import { T as Textarea } from "../../../../../../../chunks/commands2.js";
import { fromDate, getLocalTimeZone } from "@internationalized/date";
import { B as Button$1 } from "../../../../../../../chunks/button.js";
import { R as Root$3, S as Select_trigger, a as Select_content, G as Group, b as Select_item } from "../../../../../../../chunks/index7.js";
function validateField(value, schema) {
  const parseResult = schema.safeParse(value);
  if (parseResult.success) {
    return;
  }
  return parseResult.error.issues.map((error) => error.message);
}
function Canvas($$payload, $$props) {
  push();
  let { canvasId, children, overlay } = $$props;
  const canvas = getContext(canvasId);
  $$payload.out += `<div class="relative h-full w-full"><div${attr("id", canvasId)} class="absolute left-[0.5px] top-0 h-full w-full">`;
  if (canvas.container.initialized) {
    $$payload.out += "<!--[-->";
    children($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="pointer-events-none absolute left-[0.5px] top-0 z-10 h-full w-full">`;
  overlay($$payload);
  $$payload.out += `<!----></div></div>`;
  pop();
}
function Gridlines($$payload, $$props) {
  push();
  let { canvasId } = $$props;
  let canvas = getContext(canvasId);
  canvas.gridManager.initialize();
  pop();
}
const COLLAPSIBLE_ROOT_ATTR = "data-collapsible-root";
const COLLAPSIBLE_CONTENT_ATTR = "data-collapsible-content";
const COLLAPSIBLE_TRIGGER_ATTR = "data-collapsible-trigger";
class CollapsibleRootState {
  #id;
  #ref;
  open;
  disabled;
  contentNode = null;
  contentId = void 0;
  constructor(props) {
    this.open = props.open;
    this.disabled = props.disabled;
    this.#id = props.id;
    this.#ref = props.ref;
    this.toggleOpen = this.toggleOpen.bind(this);
    useRefById({ id: this.#id, ref: this.#ref });
  }
  toggleOpen() {
    this.open.current = !this.open.current;
  }
  #props = once(() => ({
    id: this.#id.current,
    "data-state": getDataOpenClosed(this.open.current),
    "data-disabled": getDataDisabled(this.disabled.current),
    [COLLAPSIBLE_ROOT_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
}
class CollapsibleContentState {
  #id;
  #ref;
  root;
  #originalStyles;
  #isMountAnimationPrevented = false;
  #width = 0;
  #height = 0;
  #forceMount;
  #present = once(() => this.#forceMount.current || this.root.open.current);
  get present() {
    return this.#present();
  }
  constructor(props, root) {
    this.root = root;
    this.#isMountAnimationPrevented = root.open.current;
    this.#forceMount = props.forceMount;
    this.#id = props.id;
    this.#ref = props.ref;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      deps: () => this.present,
      onRefChange: (node) => {
        this.root.contentNode = node;
        this.root.contentId = node?.id;
      }
    });
  }
  #snippetProps = once(() => ({ open: this.root.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  #props = once(() => ({
    id: this.#id.current,
    style: {
      "--bits-collapsible-content-height": this.#height ? `${this.#height}px` : void 0,
      "--bits-collapsible-content-width": this.#width ? `${this.#width}px` : void 0
    },
    "data-state": getDataOpenClosed(this.root.open.current),
    "data-disabled": getDataDisabled(this.root.disabled.current),
    [COLLAPSIBLE_CONTENT_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
}
class CollapsibleTriggerState {
  #root;
  #ref;
  #id;
  #disabled;
  #isDisabled = once(() => this.#disabled.current || this.#root.disabled.current);
  constructor(props, root) {
    this.#root = root;
    this.#id = props.id;
    this.#ref = props.ref;
    this.#disabled = props.disabled;
    this.onclick = this.onclick.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    useRefById({ id: this.#id, ref: this.#ref });
  }
  onclick(e) {
    if (this.#isDisabled()) return;
    if (e.button !== 0) return e.preventDefault();
    this.#root.toggleOpen();
  }
  onkeydown(e) {
    if (this.#isDisabled()) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      this.#root.toggleOpen();
    }
  }
  #props = once(() => ({
    id: this.#id.current,
    type: "button",
    disabled: this.#isDisabled(),
    "aria-controls": this.#root.contentId,
    "aria-expanded": getAriaExpanded(this.#root.open.current),
    "data-state": getDataOpenClosed(this.#root.open.current),
    "data-disabled": getDataDisabled(this.#isDisabled()),
    [COLLAPSIBLE_TRIGGER_ATTR]: "",
    //
    onclick: this.onclick,
    onkeydown: this.onkeydown
  }));
  get props() {
    return this.#props();
  }
}
const [
  setCollapsibleRootContext,
  getCollapsibleRootContext
] = createContext("Collapsible.Root");
function useCollapsibleRoot(props) {
  return setCollapsibleRootContext(new CollapsibleRootState(props));
}
function useCollapsibleTrigger(props) {
  const root = getCollapsibleRootContext();
  return new CollapsibleTriggerState(props, root);
}
function useCollapsibleContent(props) {
  const root = getCollapsibleRootContext();
  return new CollapsibleContentState(props, root);
}
function Collapsible($$payload, $$props) {
  push();
  let {
    children,
    child,
    id = useId(),
    ref = null,
    open = false,
    disabled = false,
    controlledOpen = false,
    onOpenChange = noop,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = useCollapsibleRoot({
    open: box.with(() => open, (v) => {
      if (controlledOpen) {
        onOpenChange(v);
      } else {
        open = v;
        onOpenChange(v);
      }
    }),
    disabled: box.with(() => disabled),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, rootState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref, open });
  pop();
}
function Collapsible_content($$payload, $$props) {
  push();
  let {
    child,
    ref = null,
    forceMount = false,
    children,
    id = useId(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = useCollapsibleContent({
    id: box.with(() => id),
    forceMount: box.with(() => forceMount),
    ref: box.with(() => ref, (v) => ref = v)
  });
  {
    let presence = function($$payload2, { present }) {
      const mergedProps = mergeProps(restProps, contentState.props, {
        hidden: forceMount ? void 0 : !present.current
      });
      if (child) {
        $$payload2.out += "<!--[-->";
        child($$payload2, {
          ...contentState.snippetProps,
          props: mergedProps
        });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div${spread_attributes({ ...mergedProps })}>`;
        children?.($$payload2);
        $$payload2.out += `<!----></div>`;
      }
      $$payload2.out += `<!--]-->`;
    };
    Presence_layer($$payload, {
      forceMount: true,
      present: contentState.present,
      id,
      presence
    });
  }
  bind_props($$props, { ref });
  pop();
}
function Collapsible_trigger($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId(),
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = useCollapsibleTrigger({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    disabled: box.with(() => disabled)
  });
  const mergedProps = mergeProps(restProps, triggerState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
const Root = Collapsible;
const Trigger = Collapsible_trigger;
const Content = Collapsible_content;
function TransformControls($$payload, $$props) {
  push();
  let { canvasId } = $$props;
  let canvas = getContext(canvasId);
  const buttonDirectionBreakpoint = 400;
  let buttonsDirection = canvas.container.width < buttonDirectionBreakpoint ? "vertical" : "horizontal";
  let collapsibleFlexPositioning = (() => {
    switch (canvas.transform.config.buttonsPosition) {
      case "bl":
        return "justify-start items-end";
      case "br":
        return "justify-end items-end";
      case "tl":
        return "justify-start items-start";
      case "tr":
        return "justify-end items-start";
    }
  })();
  let collapsibleFlexDirection = (() => {
    switch (buttonsDirection) {
      case "horizontal":
        switch (canvas.transform.config.buttonsPosition) {
          case "bl":
            return "flex-row";
          case "br":
            return "flex-row-reverse";
          case "tl":
            return "flex-row";
          case "tr":
            return "flex-row-reverse";
        }
        break;
      case "vertical":
        switch (canvas.transform.config.buttonsPosition) {
          case "bl":
            return "flex-col-reverse";
          case "br":
            return "flex-col-reverse";
          case "tl":
            return "flex-col";
          case "tr":
            return "flex-col";
        }
        break;
    }
  })();
  let collapsibleFlexAlignment = (() => {
    switch (buttonsDirection) {
      case "horizontal":
        switch (canvas.transform.config.buttonsPosition) {
          case "bl":
            return "items-end";
          case "br":
            return "items-end";
          case "tl":
            return "items-start";
          case "tr":
            return "items-start";
        }
        break;
      case "vertical":
        switch (canvas.transform.config.buttonsPosition) {
          case "bl":
            return "items-start";
          case "br":
            return "items-end";
          case "tl":
            return "items-start";
          case "tr":
            return "items-end";
        }
        break;
    }
  })();
  let collapsibleTriggerRotation = (() => {
    switch (buttonsDirection) {
      case "horizontal":
        switch (canvas.transform.config.buttonsPosition) {
          case "bl":
            return canvas.transform.config.buttonsExpanded ? "rotate-180" : "rotate-10";
          case "br":
            return canvas.transform.config.buttonsExpanded ? "rotate-0" : "rotate-180";
          case "tl":
            return canvas.transform.config.buttonsExpanded ? "rotate-180" : "rotate-0";
          case "tr":
            return canvas.transform.config.buttonsExpanded ? "rotate-0" : "rotate-180";
        }
        break;
      case "vertical":
        switch (canvas.transform.config.buttonsPosition) {
          case "bl":
            return canvas.transform.config.buttonsExpanded ? "-rotate-90" : "rotate-90";
          case "br":
            return canvas.transform.config.buttonsExpanded ? "-rotate-90" : "rotate-90";
          case "tl":
            return canvas.transform.config.buttonsExpanded ? "rotate-90" : "-rotate-90";
          case "tr":
            return canvas.transform.config.buttonsExpanded ? "rotate-90" : "-rotate-90";
        }
        break;
    }
  })();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div${attr_class(`flex h-full w-full p-2 ${stringify(collapsibleFlexPositioning)}`)}><!---->`;
    Root$1($$payload2, {
      delayDuration: 800,
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        Root($$payload3, {
          class: `z-50 flex ${stringify(collapsibleFlexDirection)} ${stringify(collapsibleFlexAlignment)} justify-start gap-2`,
          get open() {
            return canvas.transform.config.buttonsExpanded;
          },
          set open($$value) {
            canvas.transform.config.buttonsExpanded = $$value;
            $$settled = false;
          },
          children: ($$payload4) => {
            $$payload4.out += `<!---->`;
            Trigger$1($$payload4, {
              class: "order-last",
              children: ($$payload5) => {
                $$payload5.out += `<!---->`;
                Trigger($$payload5, {
                  children: ($$payload6) => {
                    Button($$payload6, {
                      variant: "outline",
                      size: "xsm",
                      class: "hover:bg-secondary-5 bg-neutral-1 hover:text-secondary-12 pointer-events-auto flex items-center justify-center",
                      children: ($$payload7) => {
                        Icon($$payload7, {
                          icon: "material-symbols:double-arrow",
                          width: "3rem",
                          class: `${stringify(collapsibleTriggerRotation)} text-neutral-11 transition-transform`
                        });
                      },
                      $$slots: { default: true }
                    });
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <!---->`;
            Tooltip_content($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Toggle Layout Controls`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <!---->`;
            Content($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<div${attr_class(`flex ${stringify(collapsibleFlexDirection)} ${stringify(collapsibleFlexAlignment)} gap-2`)}><div class="flex items-center"><!---->`;
                Root$1($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Trigger$1($$payload6, {
                      children: ($$payload7) => {
                        Button($$payload7, {
                          onclick: () => {
                            canvas.transform.addScale(-0.1);
                          },
                          variant: "outline",
                          size: "xsm",
                          class: "hover:bg-secondary-5 bg-neutral-1 hover:text-secondary-12 border-r-neutral-4 pointer-events-auto flex items-center justify-center rounded-r-none",
                          children: ($$payload8) => {
                            Icon($$payload8, {
                              icon: "material-symbols:zoom-out",
                              width: "3rem",
                              class: "text-neutral-11"
                            });
                          },
                          $$slots: { default: true }
                        });
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Tooltip_content($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Zoom out`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <!---->`;
                Root$1($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Trigger$1($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<span class="bg-neutral-1 text-neutral-11 border-neutral-6 flex h-6 w-auto items-center justify-center border-b border-t px-1 py-0.5 text-sm">${escape_html(Math.trunc(canvas.transform.scaleFactor.x * 100))}
									%</span>`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Tooltip_content($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Current zoom percentage`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <!---->`;
                Root$1($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Trigger$1($$payload6, {
                      children: ($$payload7) => {
                        Button($$payload7, {
                          onclick: () => {
                            canvas.transform.addScale(0.1);
                          },
                          variant: "outline",
                          size: "xsm",
                          class: "hover:bg-secondary-5 bg-neutral-1 hover:text-secondary-12 border-l-neutral-4 pointer-events-auto flex items-center justify-center rounded-l-none",
                          children: ($$payload8) => {
                            Icon($$payload8, {
                              icon: "material-symbols:zoom-in",
                              width: "3rem",
                              class: "text-neutral-11"
                            });
                          },
                          $$slots: { default: true }
                        });
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Tooltip_content($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Zoom in`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----></div> <div${attr_class(`grid gap-1 ${stringify(buttonsDirection === "horizontal" ? "grid-cols-3 grid-rows-2" : "grid-cols-2 grid-rows-3")}`)}><div${attr_class(clsx(buttonsDirection === "horizontal" ? "order-1 row-span-2 self-center" : "order-2"))}><!---->`;
                Root$1($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Trigger$1($$payload6, {
                      children: ($$payload7) => {
                        Button($$payload7, {
                          onclick: () => {
                            canvas.transform.translate({ x: 120, y: 0 });
                          },
                          variant: "outline",
                          size: "xsm",
                          class: "hover:bg-secondary-5 bg-neutral-1 hover:text-secondary-12 pointer-events-auto flex items-center justify-center",
                          children: ($$payload8) => {
                            Icon($$payload8, {
                              icon: "material-symbols:arrow-back-2",
                              width: "3rem",
                              class: "text-neutral-11"
                            });
                          },
                          $$slots: { default: true }
                        });
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Tooltip_content($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Move Left`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----></div> <div${attr_class(clsx(buttonsDirection === "horizontal" ? "order-2" : "order-1 col-span-2 justify-self-center"))}><!---->`;
                Root$1($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Trigger$1($$payload6, {
                      children: ($$payload7) => {
                        Button($$payload7, {
                          onclick: () => {
                            canvas.transform.translate({ x: 0, y: 120 });
                          },
                          variant: "outline",
                          size: "xsm",
                          class: "hover:bg-secondary-5 bg-neutral-1 hover:text-secondary-12 pointer-events-auto flex items-center justify-center",
                          children: ($$payload8) => {
                            Icon($$payload8, {
                              icon: "material-symbols:arrow-back-2",
                              width: "3rem",
                              class: "text-neutral-11 rotate-90"
                            });
                          },
                          $$slots: { default: true }
                        });
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Tooltip_content($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Move up`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----></div> <div${attr_class(clsx(buttonsDirection === "horizontal" ? "order-3 row-span-2 self-center" : "order-3"))}><!---->`;
                Root$1($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Trigger$1($$payload6, {
                      children: ($$payload7) => {
                        Button($$payload7, {
                          onclick: () => {
                            canvas.transform.translate({ x: -120, y: 0 });
                          },
                          variant: "outline",
                          size: "xsm",
                          class: "hover:bg-secondary-5 bg-neutral-1 hover:text-secondary-12 pointer-events-auto flex items-center justify-center",
                          children: ($$payload8) => {
                            Icon($$payload8, {
                              icon: "material-symbols:arrow-back-2",
                              width: "3rem",
                              class: "text-neutral-11 rotate-180"
                            });
                          },
                          $$slots: { default: true }
                        });
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Tooltip_content($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Move right`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----></div> <div${attr_class(clsx(buttonsDirection === "horizontal" ? "order-4" : "order-4 col-span-2 justify-self-center"))}><!---->`;
                Root$1($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Trigger$1($$payload6, {
                      children: ($$payload7) => {
                        Button($$payload7, {
                          onclick: () => {
                            canvas.transform.translate({ x: 0, y: -120 });
                          },
                          variant: "outline",
                          size: "xsm",
                          class: "hover:bg-secondary-5 bg-neutral-1 hover:text-secondary-12 pointer-events-auto flex items-center justify-center",
                          children: ($$payload8) => {
                            Icon($$payload8, {
                              icon: "material-symbols:arrow-back-2",
                              width: "3rem",
                              class: "text-neutral-11 -rotate-90"
                            });
                          },
                          $$slots: { default: true }
                        });
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Tooltip_content($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Move down`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----></div></div> <div><!---->`;
                Root$1($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Trigger$1($$payload6, {
                      children: ($$payload7) => {
                        Button($$payload7, {
                          onclick: canvas.transform.reset,
                          variant: "outline",
                          size: "xsm",
                          class: "hover:bg-secondary-5 bg-neutral-1 hover:text-secondary-12 pointer-events-auto flex items-center justify-center",
                          children: ($$payload8) => {
                            Icon($$payload8, {
                              icon: "material-symbols:home",
                              width: "3rem",
                              class: "text-neutral-11"
                            });
                          },
                          $$slots: { default: true }
                        });
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Tooltip_content($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Reset layout position`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----></div> <div><!---->`;
                Root$1($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Trigger$1($$payload6, {
                      children: ($$payload7) => {
                        Button($$payload7, {
                          onclick: () => {
                            canvas.gridManager.config.snapToGrid = !canvas.gridManager.config.snapToGrid;
                          },
                          variant: "outline",
                          size: "xsm",
                          class: `${stringify(canvas.gridManager.config.snapToGrid ? "bg-secondary-5 border-secondary-6 hover:bg-neutral-3 hover:border-neutral-8" : "bg-neutral-1 hover:bg-secondary-5")} hover:text-secondary-12 pointer-events-auto flex rotate-180 items-center justify-center transition-colors`,
                          children: ($$payload8) => {
                            Icon($$payload8, {
                              icon: "iconoir:magnet-solid",
                              width: "3rem",
                              class: "text-neutral-11"
                            });
                          },
                          $$slots: { default: true }
                        });
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Tooltip_content($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Toggle snap to grid`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----></div> <div><!---->`;
                Root$1($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Trigger$1($$payload6, {
                      children: ($$payload7) => {
                        Button($$payload7, {
                          onclick: () => {
                            canvas.gridManager.config.rightAngleConstraint = !canvas.gridManager.config.rightAngleConstraint;
                          },
                          variant: "outline",
                          size: "xsm",
                          class: `${stringify(canvas.gridManager.config.rightAngleConstraint ? "bg-secondary-5 border-secondary-6 hover:bg-neutral-3 hover:border-neutral-8" : "bg-neutral-1 hover:bg-secondary-5")} hover:text-secondary-12 pointer-events-auto flex items-center justify-center transition-colors`,
                          children: ($$payload8) => {
                            Icon($$payload8, {
                              icon: "mdi:parallel",
                              width: "3rem",
                              class: "text-neutral-11"
                            });
                          },
                          $$slots: { default: true }
                        });
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> <!---->`;
                    Tooltip_content($$payload6, {
                      children: ($$payload7) => {
                        $$payload7.out += `<!---->Toggle right angle constraint`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----></div></div>`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
function EditableGeometryResizePoints($$payload, $$props) {
  push();
  let {
    canvasId,
    geometry,
    geometryGroup
  } = $$props;
  getContext(canvasId);
  let group = new Konva.Group();
  geometryGroup.add(group);
  group.moveToTop();
  geometry.type;
  onDestroy(() => {
    group.destroy();
  });
  pop();
}
function PlantingArea($$payload, $$props) {
  push();
  let {
    canvasId,
    plantingAreaLayerId,
    name,
    showName = true,
    position,
    geometry,
    editable,
    selected,
    // grid,
    onTranslate,
    onTransform: onTransformContainer,
    onClick
  } = $$props;
  const canvas = getContext(canvasId);
  const layer = canvas.container.getLayer(plantingAreaLayerId);
  const group = new Konva.Group({ draggable: editable });
  layer.add(group);
  let nameText = new Konva.Text({
    fontFamily: "sans",
    fontSize: 15,
    opacity: 0.7,
    text: name,
    visible: showName
  });
  group.add(nameText);
  geometry.type;
  selected ? getColor("accent", 8, derivedMode.current) : getColor("brown", 10, derivedMode.current);
  selected ? getColor("accent", 5, derivedMode.current) : getColor("brown", 3, derivedMode.current);
  selected ? getColor("accent", 11, derivedMode.current) : getColor("brown", 11, derivedMode.current);
  onDestroy(() => {
    group.destroy();
  });
  if (editable) {
    $$payload.out += "<!--[-->";
    EditableGeometryResizePoints($$payload, {
      canvasId,
      geometry,
      geometryGroup: group
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function PlantingAreas($$payload, $$props) {
  push();
  let { canvasId, plantingAreaLayerId, children } = $$props;
  let canvas = getContext(canvasId);
  canvas.container.addLayer(plantingAreaLayerId);
  children($$payload);
  $$payload.out += `<!---->`;
  pop();
}
function FormErrorsPopover($$payload, $$props) {
  push();
  let { errors } = $$props;
  $$payload.out += `<!---->`;
  Root$2($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Trigger$2($$payload2, {
        class: "w-8",
        children: ($$payload3) => {
          Icon($$payload3, {
            icon: iconIds.formFieldDescriptionIcon,
            width: "1rem",
            class: "text-destructive-9 hover:text-destructive-10 ml-2"
          });
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Popover_content($$payload2, {
        class: "max-w-2xl",
        children: ($$payload3) => {
          $$payload3.out += `<!---->${escape_html(errors.join(" "))}`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
  pop();
}
const TREE_ID_DELIMITER = "/~";
function toTreeBaseId(entityType, entityId) {
  return `${entityType}${TREE_ID_DELIMITER}${entityId}`;
}
function toTreeId(baseId, field) {
  return `${baseId}${TREE_ID_DELIMITER}${field}`;
}
function fromTreeId(id) {
  const parts = id.split(TREE_ID_DELIMITER);
  if (parts.length < 2 || parts.length > 3) {
    throw new AppError(`Invalid Tree ID format: ${id}`);
  }
  return parts[2] ? { entityType: parts[0], entityId: parts[1], field: parts[2] } : { entityType: parts[0], entityId: parts[1] };
}
function fieldValid(treeId, value, schema, fieldErrors) {
  const errors = validateField(value, schema);
  if (errors) {
    fieldErrors[treeId] = errors;
    return false;
  } else {
    return true;
  }
}
function EditableTree($$payload, $$props) {
  push();
  let { editableTree, fieldErrors, editing } = $$props;
  function isMac() {
    return /mac/i.test(navigator.platform);
  }
  function isControlOrMeta(event) {
    return isMac() ? event.metaKey : event.ctrlKey;
  }
  function treeItems($$payload2, items, depth = 0) {
    const each_array = ensure_array_like(items);
    $$payload2.out += `<!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$payload2.out += `<li${spread_attributes({ ...item.attrs, class: "cursor-pointer py-3" })}><div${attr_class(`flex justify-between gap-4 rounded-md py-2 pr-2 ${stringify(depth == 0 ? "" : "pl-2")}`)}${attr_style(`margin-left: ${stringify(depth * 1)}rem`)}><div class="flex items-center gap-2 pl-2">`;
      if (!fromTreeId(item.id).field) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<button aria-label="select" class="border-accent-8 mr-1 flex h-5 w-5 items-center justify-center rounded-[4px] border-2">`;
        if (item.selected) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<span class="bg-accent-7 h-3 w-3 rounded-[4px]"></span>`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--></button>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (item.item.icon) {
        $$payload2.out += "<!--[-->";
        Icon($$payload2, { icon: item.item.icon, width: "1.25rem" });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> <span>${escape_html(item.item.label)}</span> `;
      if (item.item.description) {
        $$payload2.out += "<!--[-->";
        FormInfoPopover($$payload2, { description: item.item.description });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div>  `;
      if (item.children?.length) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<div class="flex grow items-center"><div class="bg-neutral-3 mx-3 h-[1px] w-full"></div> `;
        Icon($$payload2, {
          icon: iconIds.chevronRight,
          width: "1rem",
          class: `${stringify(item.expanded ? "rotate-90" : "")} ml-2 h-6 w-8 rounded-md p-1  ${stringify(item.selected ? "hover:bg-accent-5" : "hover:bg-neutral-3")}`
        });
        $$payload2.out += `<!----></div>`;
      } else if (item.item.valueComponent && item.item.onChange) {
        $$payload2.out += "<!--[1-->";
        $$payload2.out += `<div role="none" class="flex w-1/2 items-center"><div class="mr-1 flex items-center">`;
        if (Object.keys(fieldErrors).includes(item.id)) {
          $$payload2.out += "<!--[-->";
          FormErrorsPopover($$payload2, { errors: fieldErrors[item.id] });
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--></div> <!---->`;
        item.item.valueComponent($$payload2, {
          value: item.item.value,
          editing,
          onChange: item.item.onChange,
          errors: Object.keys(fieldErrors).includes(item.id)
        });
        $$payload2.out += `<!----></div>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></div> `;
      if (item.children?.length && !item.item.value) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<ul${spread_attributes(
          {
            ...editableTree.tree.group,
            class: `${stringify(item.expanded ? "h-auto opacity-100" : "pointer-events-none h-0 opacity-0")} relative origin-left`
          }
        )}><div class="bg-neutral-5 absolute bottom-4 top-4 w-[1px]"${attr_style(`left: ${stringify(0.5 + depth * 1)}rem`)}></div> `;
        treeItems($$payload2, item.children, depth + 1);
        $$payload2.out += `<!----></ul>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></li>`;
    }
    $$payload2.out += `<!--]-->`;
  }
  $$payload.out += `<ul${spread_attributes({ ...editableTree.tree.root, class: "px-2" })}>`;
  treeItems($$payload, editableTree.tree.children);
  $$payload.out += `<!----></ul>`;
  bind_props($$props, { isMac, isControlOrMeta });
  pop();
}
function AddButton($$payload, $$props) {
  push();
  let { editing, onChange } = $$props;
  if (editing) {
    $$payload.out += "<!--[-->";
    Button($$payload, {
      class: "flex w-full select-none items-center justify-center",
      onclick: () => {
        onChange(void 0);
      },
      children: ($$payload2) => {
        Icon($$payload2, {
          icon: iconIds.addIcon,
          width: "1.5rem",
          class: "text-neutral-11"
        });
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
    Button($$payload, {
      class: "flex w-full select-none items-center justify-center",
      disabled: true,
      children: ($$payload2) => {
        Icon($$payload2, {
          icon: iconIds.addIcon,
          width: "1.5rem",
          class: "text-neutral-11"
        });
      },
      $$slots: { default: true }
    });
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function CoordinateSpan($$payload, $$props) {
  push();
  let {
    x = void 0,
    y = void 0,
    initialUnitSystem,
    decimalPlaces = 2,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const unitAwareValues = createUnitAwareValues("distance", [x, y], initialUnitSystem, decimalPlaces);
  $$payload.out += `<div${spread_attributes(
    {
      ...restProps,
      class: "@container h-full w-full"
    }
  )}><div class="@xs:flex-row flex w-full grid-cols-3 grid-rows-2 flex-col justify-between"><div class="flex w-full"><span class="bg-neutral-2 border-neutral-7 border-r-neutral-5 @xs:rounded-bl-md @xs:border-b flex h-10 w-8 items-center justify-center rounded-l-md rounded-bl-none border border-b-0 border-r-0 px-3 text-sm">X</span> <span class="@xs:border-b @xs:rounded-tr-none border-neutral-7 bg-neutral-1 flex w-full items-center justify-center rounded-l-none rounded-r-none rounded-tr-md border border-b-0">${escape_html(x)}</span></div> <div class="flex w-full"><span class="bg-neutral-2 border-neutral-7 @xs:border-x-neutral-5 @xs:border-b @xs:border-l-0 flex h-10 w-8 items-center justify-center rounded-none border border-b-0 border-r-0 px-3 text-sm">Y</span> <span class="@xs:border-b border-neutral-7 bg-neutral-1 flex w-full items-center justify-center rounded-l-none rounded-r-none border border-b-0">${escape_html(y)}</span></div> <span${attr_class(`border-x-neutral-7 @xs:border-x-neutral-5 bg-neutral-2 border-neutral-7 @xs:h-10 @xs:w-8 @xs:border-b @xs:border-l-0 flex h-8 w-full min-w-10 items-center justify-center border-x border-y border-b-0 px-3 ${stringify(unitAwareValues.unitSystem === "metric" ? "text-lg" : "text-md")} text-neutral-11`)}>${escape_html(unitAwareValues.unitSymbol)}</span> <!---->`;
  Button$1($$payload, {
    onclick: unitAwareValues.swapUnits,
    type: "button",
    class: "border-x-neutral-7 @xs:border-x-neutral-5 bg-neutral-2 hover:bg-neutral-3 @xs:h-10 @xs:w-8 @xs:rounded-none @xs:rounded-r-md flex h-8 w-full items-center justify-center rounded-b-md border px-2",
    children: ($$payload2) => {
      Icon($$payload2, {
        icon: "material-symbols:swap-horiz-rounded",
        width: "1rem"
      });
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></div>`;
  bind_props($$props, { x, y });
  pop();
}
function Coordinate($$payload, $$props) {
  push();
  let { value, editing, onChange } = $$props;
  if (editing) {
    $$payload.out += "<!--[-->";
    CoordinateInput($$payload, {
      x: value.x,
      y: value.y,
      onValueChange: (value2) => {
        onChange(value2);
      }
    });
  } else {
    $$payload.out += "<!--[!-->";
    CoordinateSpan($$payload, { x: value.x, y: value.y });
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Date($$payload, $$props) {
  push();
  let { value, editing, onChange } = $$props;
  if (editing) {
    $$payload.out += "<!--[-->";
    DatePicker($$payload, {
      value,
      onValueChange: (newVal) => {
        if (newVal) {
          onChange(newVal);
        }
      }
    });
  } else {
    $$payload.out += "<!--[!-->";
    DatePicker($$payload, { value, disabled: true });
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function DeleteButton($$payload, $$props) {
  push();
  let { editing, onChange } = $$props;
  if (editing) {
    $$payload.out += "<!--[-->";
    Button($$payload, {
      class: "bg-destructive-6 text-destructive-12 w-full select-none",
      onclick: () => {
        onChange(void 0);
      },
      children: ($$payload2) => {
        Icon($$payload2, {
          icon: iconIds.deleteIcon,
          width: "1.5rem",
          class: "text-neutral-11"
        });
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
    Button($$payload, {
      class: "bg-destructive-6 text-destructive-12 w-full select-none",
      disabled: true,
      children: ($$payload2) => {
        Icon($$payload2, {
          icon: iconIds.deleteIcon,
          width: "1.5rem",
          class: "text-neutral-11"
        });
      },
      $$slots: { default: true }
    });
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function DefaultStaticValue($$payload, $$props) {
  let { value } = $$props;
  $$payload.out += `<span${attr_class(`${stringify(!value ? "italic" : "")} border-neutral-7 bg-neutral-1 ring-offset-neutral-1 focus-visible:ring-neutral-7 flex w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`)}>${escape_html(value || "None")}</span>`;
}
function Distance($$payload, $$props) {
  push();
  let { value, editing, onChange } = $$props;
  if (editing) {
    $$payload.out += "<!--[-->";
    UnitAwareInput($$payload, {
      oninput: (newData) => {
        onChange(newData);
      },
      value,
      quantityType: "distance"
    });
  } else {
    $$payload.out += "<!--[!-->";
    DefaultStaticValue($$payload, { value });
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function DynamicSelect($$payload, $$props) {
  push();
  let { value, editing, onChange } = $$props;
  const selectTrigger = value.options.find((option) => option.id === value.id) ?? { label: "Make a selection" };
  if (editing) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    Root$3($$payload, {
      type: "single",
      value: value.id,
      onValueChange: (selectValue) => {
        onChange({ id: selectValue, options: value.options });
      },
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        Select_trigger($$payload2, {
          class: "w-full",
          children: ($$payload3) => {
            $$payload3.out += `<div class="item-center flex"><span>${escape_html(selectTrigger.label)}</span></div>`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----> <!---->`;
        Select_content($$payload2, {
          children: ($$payload3) => {
            $$payload3.out += `<!---->`;
            Group($$payload3, {
              children: ($$payload4) => {
                const each_array = ensure_array_like(value.options);
                $$payload4.out += `<!--[-->`;
                for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                  let option = each_array[$$index];
                  $$payload4.out += `<!---->`;
                  Select_item($$payload4, {
                    value: option.id,
                    label: option.label,
                    children: ($$payload5) => {
                      $$payload5.out += `<div class="item-center flex"><span>${escape_html(option.label)}</span></div>`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload4.out += `<!---->`;
                }
                $$payload4.out += `<!--]-->`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    DefaultStaticValue($$payload, { value: selectTrigger.label });
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function GeometryType($$payload, $$props) {
  let { value, editing, onChange } = $$props;
  let label = "";
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (editing) {
      $$payload2.out += "<!--[-->";
      GeometrySelect($$payload2, {
        value,
        onValueChange: onChange,
        get label() {
          return label;
        },
        set label($$value) {
          label = $$value;
          $$settled = false;
        }
      });
    } else {
      $$payload2.out += "<!--[!-->";
      DefaultStaticValue($$payload2, { value: label });
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
}
function getOninputString(onChange) {
  return (event) => {
    const target = event.target;
    if (!target?.value) {
      return;
    }
    onChange(target.value);
  };
}
function getOninputNumber(onChange) {
  return (event) => {
    const target = event.target;
    if (!target?.value) {
      return;
    }
    onChange(Number(target.value));
  };
}
function Number$1($$payload, $$props) {
  push();
  let { value, editing, onChange } = $$props;
  if (editing) {
    $$payload.out += "<!--[-->";
    Input($$payload, {
      value,
      type: "number",
      class: "select-none",
      oninput: getOninputNumber(onChange)
    });
  } else {
    $$payload.out += "<!--[!-->";
    DefaultStaticValue($$payload, { value });
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function String($$payload, $$props) {
  push();
  let { value, editing, onChange } = $$props;
  if (editing) {
    $$payload.out += "<!--[-->";
    Input($$payload, {
      value,
      class: "select-none",
      oninput: getOninputString(onChange)
    });
  } else {
    $$payload.out += "<!--[!-->";
    DefaultStaticValue($$payload, { value });
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Textarea_1($$payload, $$props) {
  push();
  let { value, editing, onChange } = $$props;
  if (editing) {
    $$payload.out += "<!--[-->";
    Textarea($$payload, {
      value,
      class: "select-none",
      oninput: getOninputString(onChange)
    });
  } else {
    $$payload.out += "<!--[!-->";
    DefaultStaticValue($$payload, { value });
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function createEditableTree(items, entitySelectionHandlers, onSelectedChange) {
  let previousSelection = /* @__PURE__ */ new Set();
  function onSelectedChangeHandler(newSelection) {
    const addedIds = newSelection.difference(previousSelection);
    const removedIds = previousSelection.difference(newSelection);
    for (const id of addedIds) {
      const { entityType, entityId } = fromTreeId(id);
      entitySelectionHandlers[entityType].add(entityId);
    }
    for (const id of removedIds) {
      const { entityType, entityId } = fromTreeId(id);
      entitySelectionHandlers[entityType].remove(entityId);
    }
    previousSelection = /* @__PURE__ */ new Set([...newSelection]);
  }
  const tree = new Tree$1({
    items,
    expandOnClick: true,
    multiple: true,
    onSelectedChange: onSelectedChangeHandler
  });
  return { tree };
}
function geometryTreeItem(parentId, value, options, ctx) {
  const geometryBaseId = parentId + `${value.index}/`;
  if (!value.geometry) {
    return {
      id: geometryBaseId,
      label: "Failed to resolve geometry."
    };
  }
  const typeId = geometryBaseId + "type";
  const scaleFactorId = geometryBaseId + "scaleFactor";
  const rotationId = geometryBaseId + "rotation";
  ({
    description: workspaceFields.geometryDateSchema.description,
    value: fromDate(value.geometry.date, getLocalTimeZone())
  });
  const typeItem = {
    id: typeId,
    label: "Type",
    description: workspaceFields.geometryTypeSchema.description,
    valueComponent: GeometryType,
    value: value.geometry.type,
    onChange: (newData) => {
      if (!fieldValid(typeId, newData, workspaceFields.geometryTypeSchema, ctx.fieldErrors) || !value.geometry) {
        return;
      }
      ctx.updateHandler(value.geometry.id, { type: newData });
    }
  };
  const scaleFactorItem = {
    id: scaleFactorId,
    label: "Scale Factor",
    description: workspaceFields.geometryScaleFactorSchema.description,
    valueComponent: Number$1,
    value: value.geometry.scaleFactor,
    onChange: (newData) => {
      if (!fieldValid(scaleFactorId, newData, workspaceFields.geometryScaleFactorSchema, ctx.fieldErrors) || !value.geometry) {
        return;
      }
      ctx.updateHandler(value.geometry.id, { scaleFactor: newData });
    }
  };
  const rotationItem = {
    id: rotationId,
    label: "Rotation",
    description: workspaceFields.geometryRotationSchema.description,
    valueComponent: Number$1,
    value: value.geometry.rotation,
    onChange: (newData) => {
      if (!fieldValid(rotationId, newData, workspaceFields.geometryRotationSchema, ctx.fieldErrors) || !value.geometry) {
        return;
      }
      ctx.updateHandler(value.geometry.id, { rotation: newData });
    }
  };
  let attributesItems = [];
  switch (value.geometry.type) {
    case "RECTANGLE": {
      const rectangleLengthId = geometryBaseId + "rectangleLength";
      const rectangleWidthId = geometryBaseId + "rectangleWidth";
      attributesItems = [
        {
          id: rectangleLengthId,
          label: "Length",
          description: workspaceFields.geometryRectangleLengthSchema.description,
          valueComponent: Distance,
          value: value.geometry.rectangleLength,
          onChange: (newData) => {
            if (!fieldValid(rectangleLengthId, newData, workspaceFields.geometryRectangleLengthSchema, ctx.fieldErrors) || !value.geometry) {
              return;
            }
            ctx.updateHandler(value.geometry.id, { rectangleLength: newData });
          }
        },
        {
          id: rectangleWidthId,
          label: "Width",
          description: workspaceFields.geometryRectangleWidthSchema.description,
          valueComponent: Distance,
          value: value.geometry.rectangleWidth,
          onChange: (newData) => {
            if (!fieldValid(rectangleWidthId, newData, workspaceFields.geometryRectangleWidthSchema, ctx.fieldErrors) || !value.geometry) {
              return;
            }
            ctx.updateHandler(value.geometry.id, { rectangleWidth: newData });
          }
        }
      ];
      break;
    }
    case "POLYGON": {
      const polygonNumSidesId = geometryBaseId + "polygonNumSides";
      const polygonRadiusId = geometryBaseId + "polygonRadius";
      attributesItems = [
        {
          id: polygonNumSidesId,
          label: "Side Count",
          description: workspaceFields.geometryPolygonNumSidesSchema.description,
          valueComponent: Number$1,
          value: value.geometry.polygonNumSides,
          onChange: (newData) => {
            if (!fieldValid(polygonNumSidesId, newData, workspaceFields.geometryPolygonNumSidesSchema, ctx.fieldErrors) || !value.geometry) {
              return;
            }
            ctx.updateHandler(value.geometry.id, { polygonNumSides: newData });
          }
        },
        {
          id: polygonRadiusId,
          label: "Radius",
          description: workspaceFields.geometryPolygonRadiusSchema.description,
          valueComponent: Distance,
          value: value.geometry.polygonRadius,
          onChange: (newData) => {
            if (!fieldValid(polygonRadiusId, newData, workspaceFields.geometryPolygonRadiusSchema, ctx.fieldErrors) || !value.geometry) {
              return;
            }
            ctx.updateHandler(value.geometry.id, { polygonRadius: newData });
          }
        }
      ];
      break;
    }
    case "ELLIPSE": {
      const ellipseLengthId = geometryBaseId + "ellipseLength";
      const ellipseWidthId = geometryBaseId + "ellipseWidth";
      attributesItems = [
        {
          id: ellipseLengthId,
          label: "Length",
          description: workspaceFields.geometryEllipseLengthSchema.description,
          valueComponent: Distance,
          value: value.geometry.ellipseLength,
          onChange: (newData) => {
            if (!fieldValid(ellipseLengthId, newData, workspaceFields.geometryEllipseLengthSchema, ctx.fieldErrors) || !value.geometry) {
              return;
            }
            ctx.updateHandler(value.geometry.id, { ellipseLength: newData });
          }
        },
        {
          id: ellipseWidthId,
          label: "Width",
          description: workspaceFields.geometryEllipseWidthSchema.description,
          valueComponent: Distance,
          value: value.geometry.ellipseWidth,
          onChange: (newData) => {
            if (!fieldValid(ellipseWidthId, newData, workspaceFields.geometryEllipseWidthSchema, ctx.fieldErrors) || !value.geometry) {
              return;
            }
            ctx.updateHandler(value.geometry.id, { ellipseWidth: newData });
          }
        }
      ];
      break;
    }
    case "LINES": {
      const linesCoordinatesId = geometryBaseId + "linesCoordinates";
      const linesAddCoordinateId = geometryBaseId + "linesAddCoordinate";
      const coordinateItems = value.geometry.linesCoordinates.map((coordinate, index) => {
        const coordinateId = geometryBaseId + `linesCoordinate${index}`;
        const positionId = coordinateId + "/position";
        const deleteId = coordinateId + `/delete`;
        const positionItem = {
          id: positionId,
          label: "Position",
          description: workspaceFields.coordinateSchema.description,
          valueComponent: Coordinate,
          value: coordinate,
          onChange: (newData) => {
            if (!fieldValid(positionId, newData, workspaceFields.coordinateSchema, ctx.fieldErrors) || !value.geometry) {
              return;
            }
            const newCoordinates = value.geometry.linesCoordinates;
            newCoordinates[index] = newData;
            ctx.updateHandler(value.geometry.id, {
              linesCoordinates: newCoordinates
            });
          }
        };
        const deleteItem = {
          id: deleteId,
          label: "Delete",
          description: "Deletes the coordinate.",
          valueComponent: DeleteButton,
          value: void 0,
          onChange: () => {
            if (!value.geometry) {
              return;
            }
            const newCoordinates = value.geometry.linesCoordinates.filter((existingCoordinate) => existingCoordinate.id != coordinate.id);
            ctx.updateHandler(value.geometry.id, {
              linesCoordinates: newCoordinates
            });
          }
        };
        return {
          id: coordinateId,
          label: `Coordinate ${index}`,
          children: [positionItem, deleteItem]
        };
      });
      const addCoordinateItem = {
        id: linesAddCoordinateId,
        label: "Add Coordinate",
        valueComponent: AddButton,
        value: void 0,
        /**
         * The callback here is just used to register the add
         * button has been pressed, so no need for data.
         */
        onChange: () => {
          if (!value.geometry) {
            return;
          }
          const newCoordinates = [...value.geometry.linesCoordinates];
          const newCoordinate = {
            x: newCoordinates[newCoordinates.length - 1].x + 0.1,
            y: newCoordinates[newCoordinates.length - 1].y + 0.1
          };
          newCoordinates.push(newCoordinate);
          ctx.updateHandler(value.geometry.id, {
            linesCoordinates: newCoordinates
          });
        }
      };
      ({
        description: workspaceFields.geometryLinesClosedSchema.description,
        value: value.geometry.linesClosed
      });
      {
        attributesItems = [
          {
            id: linesCoordinatesId,
            label: "Coordinates",
            children: [...coordinateItems, addCoordinateItem]
          }
        ];
      }
      break;
    }
  }
  let children = [];
  {
    children = [typeItem, scaleFactorItem, rotationItem, ...attributesItems];
  }
  const geometryLabel = options.includeIndex ? `Geometry ${value.index + 1}` : "Geometry";
  return {
    id: geometryBaseId,
    label: geometryLabel,
    children
  };
}
function locationTreeItem(parentId, value, options, ctx) {
  const locationBaseId = parentId + `${value.index}/`;
  if (!value.location) {
    return {
      id: locationBaseId,
      label: "Failed to resolve location."
    };
  }
  const dateId = locationBaseId + "date";
  const coordinateId = locationBaseId + "coordinate";
  const workspaceId = locationBaseId + "workspace";
  const deleteId = locationBaseId + "delete";
  const dateItem = {
    id: dateId,
    label: "Date",
    description: workspaceFields.locationDateSchema.description,
    valueComponent: Date,
    value: fromDate(value.location.date, getLocalTimeZone()),
    onChange: (newData) => {
      if (!fieldValid(dateId, newData, workspaceFields.locationDateSchema, ctx.fieldErrors)) {
        return;
      }
      ctx.updateHandler(value.location.id, {
        date: newData.toDate(getLocalTimeZone())
      });
    }
  };
  const coordinateItem = {
    id: coordinateId,
    label: "Position",
    description: workspaceFields.coordinateSchema.description,
    valueComponent: Coordinate,
    value: { x: value.location.x, y: value.location.y },
    onChange: (newData) => {
      if (!fieldValid(coordinateId, newData, workspaceFields.coordinateSchema, ctx.fieldErrors)) {
        return;
      }
      ctx.updateHandler(value.location.id, { coordinate: newData });
    }
  };
  const workspaceItem = {
    id: workspaceId,
    label: "Workspace",
    description: "The workspace the location is located in.",
    valueComponent: DynamicSelect,
    value: {
      id: value.location.workspaceId,
      options: value.workspaces.map((workspace) => {
        return { id: workspace.id, label: workspace.name };
      })
    },
    onChange: (newData) => {
      ctx.updateHandler(value.location.id, { workspaceId: newData.id });
    }
  };
  const deleteItem = {
    id: deleteId,
    label: "Delete",
    description: "Deletes the geometry from the history.",
    valueComponent: DeleteButton,
    value: void 0,
    onChange: () => {
      ctx.updateHandler(value.location.id, { delete: true });
    }
  };
  const children = [dateItem, coordinateItem, workspaceItem];
  if (options.includeDelete) {
    children.push(deleteItem);
  }
  return {
    id: locationBaseId,
    label: `Location ${value.index + 1}`,
    children
  };
}
function locationHistoryTreeItem(baseId, value, ctx) {
  const locationHistoryBaseId = toTreeId(baseId, "locations");
  if (!value.locationHistory) {
    return {
      id: locationHistoryBaseId,
      label: "Failed to resolve locations."
    };
  }
  const addLocationId = toTreeId(baseId, "locationAdd");
  const locationItems = value.locationHistory.locations.map((location, index) => {
    const numLocations = value.locationHistory?.locations.length;
    const includeDelete = numLocations && numLocations > 1 ? true : false;
    return locationTreeItem(locationHistoryBaseId, { location, workspaces: value.workspaces, index }, { includeDelete }, { updateHandler: ctx.locationUpdateHandler, fieldErrors: ctx.fieldErrors });
  });
  const addLocationItem = {
    id: addLocationId,
    label: "Add",
    description: "Adds a new location to the history.",
    valueComponent: AddButton,
    value: void 0,
    /**
     * The callback here is just used to register the add
     * button has been pressed, so no need for data.
     */
    onChange: () => {
      if (!value.locationHistory) {
        return;
      }
      ctx.onLocationHistoryExtend(value.locationHistory.id);
    }
  };
  return {
    id: locationHistoryBaseId,
    label: "Locations",
    children: [...locationItems, addLocationItem]
  };
}
function CreatePlantingAreaContainer($$payload, $$props) {
  push();
  var $$store_subs;
  let { plantingAreaLayerId } = $$props;
  const workspaceContext = getWorkspaceContext();
  const canvas = workspaceContext.layoutCanvasContext;
  const { form: formData } = workspaceContext.plantingAreaCreateForm.form;
  function onTranslate(newPos) {
    store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).location.coordinate = {
      x: canvas.transform.modelXPos(newPos.x),
      y: canvas.transform.modelYPos(newPos.y)
    });
  }
  function onTransform(newGeometry) {
    if (newGeometry.rectangleLength) {
      store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).geometry.rectangleLength = newGeometry.rectangleLength);
    }
    if (newGeometry.rectangleWidth) {
      store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).geometry.rectangleWidth = newGeometry.rectangleWidth);
    }
    if (newGeometry.polygonNumSides) {
      store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).geometry.polygonNumSides = newGeometry.polygonNumSides);
    }
    if (newGeometry.polygonRadius) {
      store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).geometry.polygonRadius = newGeometry.polygonRadius);
    }
    if (newGeometry.ellipseLength) {
      store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).geometry.ellipseLength = newGeometry.ellipseLength);
    }
    if (newGeometry.ellipseWidth) {
      store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).geometry.ellipseWidth = newGeometry.ellipseWidth);
    }
    if (newGeometry.linesCoordinates) {
      if (newGeometry.linesCoordinates) {
        store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).geometry.linesCoordinates = newGeometry.linesCoordinates);
      }
    }
  }
  PlantingArea($$payload, {
    canvasId: canvas.canvasId,
    plantingAreaLayerId,
    name: store_get($$store_subs ??= {}, "$formData", formData).name,
    showName: true,
    position: store_get($$store_subs ??= {}, "$formData", formData).location.coordinate,
    geometry: store_get($$store_subs ??= {}, "$formData", formData).geometry,
    editable: true,
    selected: true,
    onTranslate,
    onTransform
  });
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function EditablePlantingAreaContainer($$payload, $$props) {
  push();
  let { plantingAreaLayerId, plantingAreaId } = $$props;
  const workspaceContext = getWorkspaceContext();
  const canvasContext = workspaceContext.layoutCanvasContext;
  const canvasId = canvasContext.canvasId;
  useQuery(triplit, plantingAreaQuery.Vars({ plantingAreaId }));
  const translateCommandHandler = createCommandHandler(locationHistoryUpdate);
  const transformMutationHandler = createCommandHandler(geometryUpdate);
  let plantingArea = (() => {
    {
      return null;
    }
  })();
  let position = (() => {
    if (plantingArea && plantingArea.locationHistory) {
      const location = historySelect(plantingArea.locationHistory?.locations, workspaceContext.timelineSelection.focusUtc);
      if (location && location.workspaceId === workspaceContext.id) {
        return { x: location.x, y: location.y };
      } else {
        return null;
      }
    } else {
      return null;
    }
  })();
  let editable = workspaceContext.editing && !toolbox.isToolActive("plantingAreaCreate");
  let selected = workspaceContext.selections.has("plantingArea", plantingAreaId);
  function onTranslate(newPos) {
    if (!plantingArea || !workspaceContext.id) {
      return;
    }
    translateCommandHandler.execute({
      id: plantingArea.locationHistoryId,
      workspaceId: workspaceContext.id,
      coordinate: {
        x: canvasContext.transform.modelXPos(newPos.x),
        y: canvasContext.transform.modelYPos(newPos.y)
      },
      date: workspaceContext.timelineSelection.focusUtc
    });
  }
  function onTransform(newGeometry) {
    if (!plantingArea) {
      return;
    }
    transformMutationHandler.execute(plantingArea.geometryId, newGeometry);
  }
  if (plantingArea && plantingArea.geometry) {
    $$payload.out += "<!--[-->";
    PlantingArea($$payload, {
      canvasId,
      plantingAreaLayerId,
      name: plantingArea.name,
      showName: true,
      position,
      geometry: plantingArea.geometry,
      editable,
      selected,
      onTranslate,
      onTransform,
      onClick: () => {
        if (toolbox.isToolActive("plantingAreaCreate")) {
          return;
        }
        workspaceContext.selections.select("plantingArea", plantingAreaId);
      }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Layout($$payload, $$props) {
  push();
  let { plantingAreaIds } = $$props;
  const workspaceContext = getWorkspaceContext();
  const canvasContext = workspaceContext.layoutCanvasContext;
  const canvasId = canvasContext.canvasId;
  const plantingAreaLayerId = "plantingAreas";
  function overlay($$payload2) {
    TransformControls($$payload2, { canvasId });
  }
  Canvas($$payload, {
    canvasId,
    overlay,
    children: ($$payload2) => {
      Gridlines($$payload2, { canvasId });
      $$payload2.out += `<!----> `;
      PlantingAreas($$payload2, {
        canvasId,
        plantingAreaLayerId,
        children: ($$payload3) => {
          const each_array = ensure_array_like(plantingAreaIds);
          if (toolbox.isToolActive("plantingAreaCreate")) {
            $$payload3.out += "<!--[-->";
            CreatePlantingAreaContainer($$payload3, { plantingAreaLayerId });
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> <!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let plantingAreaId = each_array[$$index];
            EditablePlantingAreaContainer($$payload3, { plantingAreaId, plantingAreaLayerId });
          }
          $$payload3.out += `<!--]-->`;
        }
      });
      $$payload2.out += `<!---->`;
    }
  });
  pop();
}
function PlantingAreaTree($$payload, $$props) {
  push();
  let { plantingAreaIds } = $$props;
  const workspace = getWorkspaceContext();
  const fieldErrors = {};
  useQuery(triplit, plantingAreasQuery.Vars({ ids: plantingAreaIds }));
  useQuery(triplit, workspacesQuery.Vars({ gardenId: page.params.gardenId }));
  let workspacesOptions = [];
  const plantingAreaUpdateCommandHandler = createCommandHandler(plantingAreaUpdate.mutation);
  const geometryUpdateCommandHandler = createCommandHandler(geometryUpdate);
  const locationUpdateCommandHandler = createCommandHandler(locationUpdate);
  const locationHistoryExtendCommandHandler = createCommandHandler(locationHistoryExtend);
  function plantingAreaTreeItem(plantingArea) {
    const baseId = toTreeBaseId("plantingArea", plantingArea.id);
    const nameId = toTreeId(baseId, "name");
    const descriptionId = toTreeId(baseId, "description");
    const depthId = toTreeId(baseId, "depth");
    const geometryItem = geometryTreeItem(
      toTreeId(baseId, "geometry"),
      { geometry: plantingArea.geometry, index: 0 },
      {
        includeIndex: false
      },
      {
        updateHandler: (id, data) => {
          geometryUpdateCommandHandler.execute(id, data);
        },
        fieldErrors
      }
    );
    const locationHistoryItem = locationHistoryTreeItem(
      baseId,
      {
        locationHistory: plantingArea.locationHistory,
        workspaces: workspacesOptions
      },
      {
        locationUpdateHandler: (id, data) => {
          locationUpdateCommandHandler.execute(id, data);
        },
        onLocationHistoryExtend: (id) => {
          locationHistoryExtendCommandHandler.execute(id, workspace.timelineSelection.focusUtc);
        },
        fieldErrors
      }
    );
    const nameItem = {
      id: nameId,
      label: "Name",
      description: workspaceFields.plantingAreaNameSchema.description,
      valueComponent: String,
      value: plantingArea.name,
      onChange: (newData) => {
        if (!fieldValid(nameId, newData, workspaceFields.plantingAreaNameSchema, fieldErrors)) {
          return;
        }
        plantingAreaUpdateCommandHandler.execute(plantingArea.id, { name: newData });
      }
    };
    const descriptionItem = {
      id: descriptionId,
      label: "Description",
      description: workspaceFields.plantingAreaDescriptionSchema.description,
      valueComponent: Textarea_1,
      value: plantingArea.description,
      onChange: (newData) => {
        if (!fieldValid(descriptionId, newData, workspaceFields.plantingAreaDescriptionSchema, fieldErrors)) {
          return;
        }
        plantingAreaUpdateCommandHandler.execute(plantingArea.id, { description: newData });
      }
    };
    const depthItem = {
      id: depthId,
      label: "Depth",
      description: workspaceFields.plantingAreaDepthSchema.description,
      valueComponent: Distance,
      value: plantingArea.depth,
      onChange: (newData) => {
        if (!fieldValid(depthId, newData, workspaceFields.plantingAreaDepthSchema, fieldErrors)) {
          return;
        }
        plantingAreaUpdateCommandHandler.execute(plantingArea.id, { depth: newData });
      }
    };
    return {
      id: baseId,
      label: plantingArea.name,
      children: [
        nameItem,
        /** Details. */
        {
          id: toTreeId(baseId, "details"),
          label: "Details",
          children: [descriptionItem, depthItem]
        },
        geometryItem,
        locationHistoryItem
      ]
    };
  }
  let items = [].map((plantingArea) => {
    return plantingAreaTreeItem(plantingArea);
  });
  const editableTree = createEditableTree(() => items, {
    plantingArea: {
      add: (id) => {
        workspace.selections.select("plantingArea", id);
      },
      remove: (id) => {
        workspace.selections.deselect("plantingArea", id);
      }
    }
  });
  workspace.selections.addSelectionChangeHandler("plantingArea", (addedIds, removedIds) => {
    addedIds.forEach((id) => {
      editableTree.tree.select(toTreeId("plantingArea", id));
    });
    removedIds.forEach((id) => {
      editableTree.tree.deselect(toTreeId("plantingArea", id));
    });
  });
  if (plantingAreaIds.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="p-2 italic">No planting areas.</span>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<!---->`;
    Scroll_area($$payload, {
      class: "h-full w-full px-2",
      children: ($$payload2) => {
        EditableTree($$payload2, {
          editableTree,
          fieldErrors,
          editing: workspace.editing
        });
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Tree($$payload, $$props) {
  let { plantingAreaIds } = $$props;
  $$payload.out += `<!---->`;
  Root$4($$payload, {
    value: "plantingAreas",
    class: "bg-neutral-1 flex h-full flex-col",
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Tabs_list($$payload2, {
        class: "h-8 shadow-none",
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          Tabs_trigger($$payload3, {
            value: "plantingAreas",
            class: "border-neutral-5 text-neutral-11 flex w-full items-center justify-between border-b p-0 px-4 py-1",
            children: ($$payload4) => {
              $$payload4.out += `<!---->Planting Areas`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Tabs_content($$payload2, {
        value: "plantingAreas",
        class: "mt-0 overflow-hidden",
        children: ($$payload3) => {
          PlantingAreaTree($$payload3, { plantingAreaIds });
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
}
function Workspace($$payload, $$props) {
  push();
  const workspaceContext = getWorkspaceContext();
  useQuery(triplit, plantingAreaIdsQuery.Vars({ workspaceId: workspaceContext.id }));
  $$payload.out += `<div class="flex h-full w-full flex-col"><div class="h-full grow overflow-hidden">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    Resizable_pane_group($$payload, {
      direction: workspaceContext.contentPaneDirection,
      children: ($$payload2) => {
        if (workspaceContext.layoutEnabled) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<!---->`;
          Pane($$payload2, {
            defaultSize: 70,
            order: 1,
            minSize: 10,
            children: ($$payload3) => {
              $$payload3.out += `<!---->`;
              {
                Layout($$payload3, {
                  plantingAreaIds: []
                });
              }
              $$payload3.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload2.out += `<!----> <!---->`;
          Resizable_handle($$payload2, { withHandle: false });
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> `;
        if (toolbox.isActive) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<!---->`;
          Pane($$payload2, {
            defaultSize: 20,
            order: 2,
            minSize: 10,
            children: ($$payload3) => {
              TabToolbox($$payload3, { toolbox });
            },
            $$slots: { default: true }
          });
          $$payload2.out += `<!----> <!---->`;
          Resizable_handle($$payload2, { withHandle: false });
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> `;
        if (workspaceContext.treeEnabled) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<!---->`;
          Pane($$payload2, {
            defaultSize: 30,
            order: 3,
            minSize: 10,
            children: ($$payload3) => {
              Tree($$payload3, {
                plantingAreaIds: []
              });
            },
            $$slots: { default: true }
          });
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]-->`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]--></div> <div class="bottom-0 h-24">`;
  TimelineSelector($$payload, { selection: workspaceContext.timelineSelection });
  $$payload.out += `<!----></div></div>`;
  pop();
}
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  const workspaceContext = getWorkspaceContext();
  if (workspaceContext.id) {
    $$payload.out += "<!--[-->";
    Workspace($$payload);
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _page as default
};
