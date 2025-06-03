import { T as once, A as push, P as bind_props, D as pop, N as spread_attributes, J as spread_props, U as copy_payload, V as assign_payload, Y as sanitize_props, Z as slot, W as stringify, I as ensure_array_like, X as attr_style, E as attr, Q as attr_class, G as escape_html } from "./index.js";
import { S as SPACE, E as ENTER, a5 as Presence_layer, a6 as Focus_scope, a7 as Escape_layer, a8 as Dismissible_layer, a9 as Text_selection_layer, aa as Scroll_lock, w as useMenuContent, o as Popper_layer_force_mount, q as Popper_layer, M as Mounted, J as useMenuDropdownTrigger, c as cn, I as Icon, Q as iconIds, O as Portal$1, $ as Menu_group_heading, a0 as Menu_radio_item, a1 as Circle, G as Menu, a2 as Menu_radio_group, R as Icon$1, B as Button, W as Tree, N as localStore, a4 as Scroll_area, U as Input } from "./circle.js";
import { z } from "zod";
import "clsx";
import { k as createContext, n as useRefById, E as getDataOpenClosed, K as getAriaExpanded, u as useId, y as box, z as mergeProps, x as noop, I as getFloatingContentCSSVars, J as Floating_layer_anchor, Q as userPrefersMode, c as derivedMode, h as html } from "./floating-layer-anchor.js";
import { p as page } from "./index4.js";
import { tv } from "tailwind-variants";
import "flexsearch";
const externalLinks = {
  repository: "https://github.com/Verdagraph",
  donation: "https://en.liberapay.com/Verdagraph/"
};
function createAttrs(variant) {
  return {
    content: `data-${variant}-content`,
    trigger: `data-${variant}-trigger`,
    overlay: `data-${variant}-overlay`,
    title: `data-${variant}-title`,
    description: `data-${variant}-description`,
    close: `data-${variant}-close`,
    cancel: `data-${variant}-cancel`,
    action: `data-${variant}-action`
  };
}
class DialogRootState {
  open;
  variant;
  triggerNode = null;
  titleNode = null;
  contentNode = null;
  descriptionNode = null;
  contentId = void 0;
  titleId = void 0;
  triggerId = void 0;
  descriptionId = void 0;
  cancelNode = null;
  #attrs = once(() => createAttrs(this.variant.current));
  get attrs() {
    return this.#attrs();
  }
  constructor(props) {
    this.open = props.open;
    this.variant = props.variant;
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleOpen() {
    if (this.open.current) return;
    this.open.current = true;
  }
  handleClose() {
    if (!this.open.current) return;
    this.open.current = false;
  }
  #sharedProps = once(() => ({
    "data-state": getDataOpenClosed(this.open.current)
  }));
  get sharedProps() {
    return this.#sharedProps();
  }
}
class DialogTriggerState {
  #id;
  #ref;
  #root;
  #disabled;
  constructor(props, root) {
    this.#id = props.id;
    this.#root = root;
    this.#ref = props.ref;
    this.#disabled = props.disabled;
    this.onclick = this.onclick.bind(this);
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        this.#root.triggerNode = node;
        this.#root.triggerId = node?.id;
      }
    });
  }
  onclick = (e) => {
    if (this.#disabled.current) return;
    if (e.button > 0) return;
    this.#root.handleOpen();
  };
  onpointerdown = (e) => {
    if (this.#disabled.current) return;
    if (e.button > 0) return;
    e.preventDefault();
  };
  onkeydown = (e) => {
    if (this.#disabled.current) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      this.#root.handleOpen();
    }
  };
  #props = once(() => ({
    id: this.#id.current,
    "aria-haspopup": "dialog",
    "aria-expanded": getAriaExpanded(this.#root.open.current),
    "aria-controls": this.#root.contentId,
    [this.#root.attrs.trigger]: "",
    onpointerdown: this.onpointerdown,
    onkeydown: this.onkeydown,
    onclick: this.onclick,
    ...this.#root.sharedProps
  }));
  get props() {
    return this.#props();
  }
}
class DialogCloseState {
  #id;
  #ref;
  #root;
  #variant;
  #disabled;
  #attr = once(() => this.#root.attrs[this.#variant.current]);
  constructor(props, root) {
    this.#root = root;
    this.#ref = props.ref;
    this.#id = props.id;
    this.#variant = props.variant;
    this.#disabled = props.disabled;
    this.onclick = this.onclick.bind(this);
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    useRefById({
      id: this.#id,
      ref: this.#ref,
      deps: () => this.#root.open.current
    });
  }
  onclick(e) {
    if (this.#disabled.current) return;
    if (e.button > 0) return;
    this.#root.handleClose();
  }
  onpointerdown(e) {
    if (this.#disabled.current) return;
    if (e.button > 0) return;
    e.preventDefault();
    this.#root.handleClose();
  }
  onkeydown(e) {
    if (this.#disabled.current) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      this.#root.handleClose();
    }
  }
  #props = once(() => ({
    id: this.#id.current,
    [this.#attr()]: "",
    onpointerdown: this.onpointerdown,
    onclick: this.onclick,
    onkeydown: this.onkeydown,
    ...this.#root.sharedProps
  }));
  get props() {
    return this.#props();
  }
}
class DialogContentState {
  #id;
  #ref;
  root;
  constructor(props, root) {
    this.#id = props.id;
    this.root = root;
    this.#ref = props.ref;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      deps: () => this.root.open.current,
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
    role: this.root.variant.current === "alert-dialog" ? "alertdialog" : "dialog",
    "aria-describedby": this.root.descriptionId,
    "aria-labelledby": this.root.titleId,
    [this.root.attrs.content]: "",
    style: { pointerEvents: "auto" },
    ...this.root.sharedProps
  }));
  get props() {
    return this.#props();
  }
}
class DialogOverlayState {
  #id;
  #ref;
  root;
  constructor(props, root) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.root = root;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      deps: () => this.root.open.current
    });
  }
  #snippetProps = once(() => ({ open: this.root.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  #props = once(() => ({
    id: this.#id.current,
    [this.root.attrs.overlay]: "",
    style: { pointerEvents: "auto" },
    ...this.root.sharedProps
  }));
  get props() {
    return this.#props();
  }
}
const [setDialogRootContext, getDialogRootContext] = createContext("Dialog.Root");
function useDialogRoot(props) {
  return setDialogRootContext(new DialogRootState(props));
}
function useDialogTrigger(props) {
  const root = getDialogRootContext();
  return new DialogTriggerState(props, root);
}
function useDialogContent(props) {
  return new DialogContentState(props, getDialogRootContext());
}
function useDialogOverlay(props) {
  return new DialogOverlayState(props, getDialogRootContext());
}
function useDialogClose(props) {
  return new DialogCloseState(props, getDialogRootContext());
}
function shouldTrapFocus({ forceMount, present, trapFocus, open }) {
  if (forceMount) {
    return open && trapFocus;
  }
  return present && trapFocus && open;
}
function Dialog_overlay$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    forceMount = false,
    child,
    children,
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const overlayState = useDialogOverlay({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, overlayState.props);
  {
    let presence = function($$payload2) {
      if (child) {
        $$payload2.out += "<!--[-->";
        child($$payload2, {
          props: mergeProps(mergedProps),
          ...overlayState.snippetProps
        });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div${spread_attributes({ ...mergeProps(mergedProps) })}>`;
        children?.($$payload2, overlayState.snippetProps);
        $$payload2.out += `<!----></div>`;
      }
      $$payload2.out += `<!--]-->`;
    };
    Presence_layer($$payload, {
      id,
      present: overlayState.root.open.current || forceMount,
      presence
    });
  }
  bind_props($$props, { ref });
  pop();
}
function Dialog_trigger($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    children,
    child,
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = useDialogTrigger({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    disabled: box.with(() => Boolean(disabled))
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
function Dialog($$payload, $$props) {
  push();
  let {
    open = false,
    onOpenChange = noop,
    controlledOpen = false,
    children
  } = $$props;
  useDialogRoot({
    variant: box.with(() => "dialog"),
    open: box.with(() => open, (v) => {
      if (controlledOpen) {
        onOpenChange(v);
      } else {
        open = v;
        onOpenChange(v);
      }
    })
  });
  children?.($$payload);
  $$payload.out += `<!---->`;
  bind_props($$props, { open });
  pop();
}
function Dialog_close($$payload, $$props) {
  push();
  let {
    children,
    child,
    id = useId(),
    ref = null,
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const closeState = useDialogClose({
    variant: box.with(() => "close"),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    disabled: box.with(() => Boolean(disabled))
  });
  const mergedProps = mergeProps(restProps, closeState.props);
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
function Dialog_content$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    children,
    child,
    ref = null,
    forceMount = false,
    onCloseAutoFocus = noop,
    onEscapeKeydown = noop,
    onInteractOutside = noop,
    trapFocus = true,
    preventScroll = true,
    restoreScrollDelay = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = useDialogContent({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, contentState.props);
  {
    let presence = function($$payload2, { present }) {
      {
        let focusScope = function($$payload3, { props: focusScopeProps }) {
          Escape_layer($$payload3, spread_props([
            mergedProps,
            {
              enabled: present.current,
              onEscapeKeydown: (e) => {
                onEscapeKeydown(e);
                if (e.defaultPrevented) return;
                contentState.root.handleClose();
              },
              children: ($$payload4) => {
                Dismissible_layer($$payload4, spread_props([
                  mergedProps,
                  {
                    enabled: present.current,
                    onInteractOutside: (e) => {
                      onInteractOutside(e);
                      if (e.defaultPrevented) return;
                      contentState.root.handleClose();
                    },
                    children: ($$payload5) => {
                      Text_selection_layer($$payload5, spread_props([
                        mergedProps,
                        {
                          enabled: present.current,
                          children: ($$payload6) => {
                            if (child) {
                              $$payload6.out += "<!--[-->";
                              if (contentState.root.open.current) {
                                $$payload6.out += "<!--[-->";
                                Scroll_lock($$payload6, { preventScroll, restoreScrollDelay });
                              } else {
                                $$payload6.out += "<!--[!-->";
                              }
                              $$payload6.out += `<!--]--> `;
                              child($$payload6, {
                                props: mergeProps(mergedProps, focusScopeProps),
                                ...contentState.snippetProps
                              });
                              $$payload6.out += `<!---->`;
                            } else {
                              $$payload6.out += "<!--[!-->";
                              Scroll_lock($$payload6, { preventScroll });
                              $$payload6.out += `<!----> <div${spread_attributes(
                                {
                                  ...mergeProps(mergedProps, focusScopeProps)
                                }
                              )}>`;
                              children?.($$payload6);
                              $$payload6.out += `<!----></div>`;
                            }
                            $$payload6.out += `<!--]-->`;
                          },
                          $$slots: { default: true }
                        }
                      ]));
                    },
                    $$slots: { default: true }
                  }
                ]));
              },
              $$slots: { default: true }
            }
          ]));
        };
        Focus_scope($$payload2, spread_props([
          {
            loop: true,
            trapFocus: shouldTrapFocus({
              forceMount,
              present: present.current,
              trapFocus,
              open: contentState.root.open.current
            })
          },
          mergedProps,
          {
            onCloseAutoFocus: (e) => {
              onCloseAutoFocus(e);
              if (e.defaultPrevented) return;
              contentState.root.triggerNode?.focus();
            },
            focusScope,
            $$slots: { focusScope: true }
          }
        ]));
      }
    };
    Presence_layer($$payload, spread_props([
      mergedProps,
      {
        forceMount,
        present: contentState.root.open.current || forceMount,
        presence,
        $$slots: { presence: true }
      }
    ]));
  }
  bind_props($$props, { ref });
  pop();
}
function Dropdown_menu_content$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    child,
    children,
    ref = null,
    loop = true,
    onInteractOutside = noop,
    onEscapeKeydown = noop,
    forceMount = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let isMounted = false;
  const contentState = useMenuContent({
    id: box.with(() => id),
    loop: box.with(() => loop),
    ref: box.with(() => ref, (v) => ref = v),
    isMounted: box.with(() => isMounted)
  });
  const mergedProps = mergeProps(restProps, contentState.props);
  function handleInteractOutside(e) {
    contentState.handleInteractOutside(e);
    if (e.defaultPrevented) return;
    onInteractOutside(e);
    if (e.defaultPrevented) return;
    contentState.parentMenu.onClose();
  }
  function handleEscapeKeydown(e) {
    onEscapeKeydown(e);
    if (e.defaultPrevented) return;
    contentState.parentMenu.onClose();
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (forceMount) {
      $$payload2.out += "<!--[-->";
      {
        let popper = function($$payload3, { props, wrapperProps }) {
          const finalProps = mergeProps(props, {
            style: getFloatingContentCSSVars("dropdown-menu")
          });
          if (child) {
            $$payload3.out += "<!--[-->";
            child($$payload3, {
              props: finalProps,
              wrapperProps,
              ...contentState.snippetProps
            });
            $$payload3.out += `<!---->`;
          } else {
            $$payload3.out += "<!--[!-->";
            $$payload3.out += `<div${spread_attributes({ ...wrapperProps })}><div${spread_attributes({ ...finalProps })}>`;
            children?.($$payload3);
            $$payload3.out += `<!----></div></div>`;
          }
          $$payload3.out += `<!--]--> `;
          Mounted($$payload3, {
            get isMounted() {
              return isMounted;
            },
            set isMounted($$value) {
              isMounted = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!---->`;
        };
        Popper_layer_force_mount($$payload2, spread_props([
          mergedProps,
          {
            enabled: contentState.parentMenu.open.current,
            onInteractOutside: handleInteractOutside,
            onEscapeKeydown: handleEscapeKeydown,
            trapFocus: true,
            loop,
            forceMount: true,
            id,
            popper,
            $$slots: { popper: true }
          }
        ]));
      }
    } else if (!forceMount) {
      $$payload2.out += "<!--[1-->";
      {
        let popper = function($$payload3, { props, wrapperProps }) {
          const finalProps = mergeProps(props, {
            style: getFloatingContentCSSVars("dropdown-menu")
          });
          if (child) {
            $$payload3.out += "<!--[-->";
            child($$payload3, {
              props: finalProps,
              wrapperProps,
              ...contentState.snippetProps
            });
            $$payload3.out += `<!---->`;
          } else {
            $$payload3.out += "<!--[!-->";
            $$payload3.out += `<div${spread_attributes({ ...wrapperProps })}><div${spread_attributes({ ...finalProps })}>`;
            children?.($$payload3);
            $$payload3.out += `<!----></div></div>`;
          }
          $$payload3.out += `<!--]--> `;
          Mounted($$payload3, {
            get isMounted() {
              return isMounted;
            },
            set isMounted($$value) {
              isMounted = $$value;
              $$settled = false;
            }
          });
          $$payload3.out += `<!---->`;
        };
        Popper_layer($$payload2, spread_props([
          mergedProps,
          {
            present: contentState.parentMenu.open.current,
            onInteractOutside: handleInteractOutside,
            onEscapeKeydown: handleEscapeKeydown,
            trapFocus: true,
            loop,
            forceMount: false,
            id,
            popper,
            $$slots: { popper: true }
          }
        ]));
      }
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
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
function Menu_trigger($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    child,
    children,
    disabled = false,
    type = "button",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = useMenuDropdownTrigger({
    id: box.with(() => id),
    disabled: box.with(() => disabled ?? false),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, triggerState.props, { type });
  Floating_layer_anchor($$payload, {
    id,
    children: ($$payload2) => {
      if (child) {
        $$payload2.out += "<!--[-->";
        child($$payload2, { props: mergedProps });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<button${spread_attributes({ ...mergedProps })}>`;
        children?.($$payload2);
        $$payload2.out += `<!----></button>`;
      }
      $$payload2.out += `<!--]-->`;
    }
  });
  bind_props($$props, { ref });
  pop();
}
function Dialog_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Portal($$payload2, {
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        Dialog_overlay($$payload3, {});
        $$payload3.out += `<!----> <!---->`;
        Dialog_content$1($$payload3, spread_props([
          {
            class: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] bg-neutral-1 fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg", className)
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
            children: ($$payload4) => {
              children?.($$payload4);
              $$payload4.out += `<!----> <!---->`;
              Dialog_close($$payload4, {
                class: "ring-offset-neutral-1 focus:ring-neutral-7 absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none",
                children: ($$payload5) => {
                  Icon($$payload5, { icon: iconIds.defaultClose, class: "size-4" });
                  $$payload5.out += `<!----> <span class="sr-only">Close</span>`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          }
        ]));
        $$payload3.out += `<!---->`;
      }
    });
    $$payload2.out += `<!---->`;
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
function Dialog_overlay($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Dialog_overlay$1($$payload2, spread_props([
      {
        class: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0  fixed inset-0 z-50 bg-black/80", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
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
const Root$2 = Dialog;
const Trigger$2 = Dialog_trigger;
const Portal = Portal$1;
function Dropdown_menu_content($$payload, $$props) {
  push();
  let {
    ref = null,
    sideOffset = 4,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Dropdown_menu_content$1($$payload2, spread_props([
      {
        sideOffset,
        class: cn("bg-neutral-3 text-neutral-12 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md outline-none", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
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
function Dropdown_menu_group_heading($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    inset,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Menu_group_heading($$payload2, spread_props([
      {
        class: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
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
function Dropdown_menu_radio_item($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children: childrenProp,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    {
      let children = function($$payload3, { checked }) {
        $$payload3.out += `<span class="absolute left-2 flex size-3.5 items-center justify-center">`;
        if (checked) {
          $$payload3.out += "<!--[-->";
          Circle($$payload3, { class: "size-2 fill-current" });
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]--></span> `;
        childrenProp?.($$payload3, { checked });
        $$payload3.out += `<!---->`;
      };
      Menu_radio_item($$payload2, spread_props([
        {
          class: cn("data-[highlighted]:bg-accent-6 data-[highlighted]:text-accent-12 relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)
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
          children,
          $$slots: { default: true }
        }
      ]));
    }
    $$payload2.out += `<!---->`;
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
const Root$1 = Menu;
const Trigger$1 = Menu_trigger;
const RadioGroup = Menu_radio_group;
function X($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M18 6 6 18" }],
    ["path", { "d": "m6 6 12 12" }]
  ];
  Icon$1($$payload, spread_props([
    { name: "x" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Sheet_overlay($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Dialog_overlay$1($$payload2, spread_props([
      {
        class: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0  fixed inset-0 z-50 bg-black/80", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref, class: className });
  pop();
}
const sheetVariants = tv({
  base: "bg-neutral-1 data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 gap-4 p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  variants: {
    side: {
      top: "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 border-b",
      bottom: "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 border-t",
      left: "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
      right: "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm"
    }
  },
  defaultVariants: { side: "right" }
});
function Sheet_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    side = "right",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Portal$1($$payload2, {
      children: ($$payload3) => {
        Sheet_overlay($$payload3, {});
        $$payload3.out += `<!----> <!---->`;
        Dialog_content$1($$payload3, spread_props([
          {
            class: cn(sheetVariants({ side }), className)
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
            children: ($$payload4) => {
              children?.($$payload4);
              $$payload4.out += `<!----> <!---->`;
              Dialog_close($$payload4, {
                class: "ring-offset-neutral-1 focus:ring-neutral-7 data-[state=open]:bg-secondary-5 absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none",
                children: ($$payload5) => {
                  X($$payload5, { class: "size-4" });
                  $$payload5.out += `<!----> <span class="sr-only">Close</span>`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          }
        ]));
        $$payload3.out += `<!---->`;
      }
    });
    $$payload2.out += `<!---->`;
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
const Root = Dialog;
const Trigger = Dialog_trigger;
const variables = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
const EnvSchema = z.object({
  /** URLs */
  APP_URL: z.string({
    description: "The base URL of the application."
  }).url().default("http://localhost:5173"),
  NEWSLETTER_URL: z.string({ description: "The URL to the newsletter signup." }).url().default("https://newsletter.verdagraph.org/subscription/form")
});
const env = EnvSchema.parse(variables);
function ThemeSwitcher($$payload, $$props) {
  push();
  let { showLabel } = $$props;
  let icon = derivedMode.current === "light" ? "material-symbols:light-mode" : "material-symbols:dark-mode";
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Root$1($$payload2, {
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        {
          let child = function($$payload4, { props }) {
            $$payload4.out += `<!---->`;
            Button($$payload4, spread_props([
              props,
              {
                variant: "ghost",
                class: `flex w-full items-center ${stringify(showLabel ? "justify-start" : "justify-center")}`,
                children: ($$payload5) => {
                  Icon($$payload5, { icon, class: "text-neutral-11" });
                  $$payload5.out += `<!----> `;
                  if (showLabel) {
                    $$payload5.out += "<!--[-->";
                    $$payload5.out += `<span class="text-neutral-11">Theme</span>`;
                  } else {
                    $$payload5.out += "<!--[!-->";
                  }
                  $$payload5.out += `<!--]-->`;
                },
                $$slots: { default: true }
              }
            ]));
            $$payload4.out += `<!---->`;
          };
          Trigger$1($$payload3, { child, $$slots: { child: true } });
        }
        $$payload3.out += `<!----> <!---->`;
        Dropdown_menu_content($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->`;
            RadioGroup($$payload4, {
              get value() {
                return userPrefersMode.current;
              },
              set value($$value) {
                userPrefersMode.current = $$value;
                $$settled = false;
              },
              children: ($$payload5) => {
                $$payload5.out += `<!---->`;
                Dropdown_menu_group_heading($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Theme`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <!---->`;
                Dropdown_menu_radio_item($$payload5, {
                  value: "dark",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Dark`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <!---->`;
                Dropdown_menu_radio_item($$payload5, {
                  value: "light",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->Light`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!----> <!---->`;
                Dropdown_menu_radio_item($$payload5, {
                  value: "system",
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->System`;
                  },
                  $$slots: { default: true }
                });
                $$payload5.out += `<!---->`;
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
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
const navItems = [
  /** Application. */
  {
    id: "app",
    label: "Application",
    children: [
      { id: "appStart", label: "Start the Application", url: env.APP_URL },
      { id: "appDemo", label: "View the Demonstration", url: "/demos" }
    ]
  },
  /** Project. */
  {
    id: "project",
    label: "Project",
    children: [
      { id: "about", label: "About", url: "/about" },
      {
        id: "support",
        label: "Support the Project",
        url: "/support"
      },
      { id: "donate", label: "Donation", url: externalLinks.donation },
      { id: "source", label: "Source Code", url: externalLinks.repository }
    ]
  },
  /** Community. */
  {
    id: "community",
    label: "Community",
    children: [
      { id: "newsletter", label: "Newsletter", url: env.NEWSLETTER_URL },
      { id: "blog", label: "Blog", url: "/blog" },
      { id: "email", label: "Email", url: "mailto:contact@verdagraph.org" }
    ]
  },
  /** Documentation. */
  {
    id: "docs",
    label: "Documentation",
    children: [
      { id: "introduction", label: "Introduction", url: "/docs/introduction" },
      { id: "faq", label: "Frequently Asked Questions", url: "/docs/faq" },
      { id: "concepts", label: "Concepts", url: "/docs/concepts" },
      { id: "hosting", label: "Self Hosting Instructions", url: "/docs/self-hosting" },
      {
        id: "usage",
        label: "General Usage",
        children: [
          {
            id: "garden-management",
            label: "Garden Management",
            url: "/docs/garden-management"
          },
          {
            id: "workspace-environment-config",
            label: "Workspace & Environment Configuration",
            url: "/docs/workspace-environment-config"
          },
          {
            id: "cultivar-config",
            label: "Cutivar Configuration",
            url: "/docs/cultivar-config"
          }
        ]
      },
      {
        id: "tutorials",
        label: "Tutorials",
        children: [
          {
            id: "garden-setup",
            label: "Setup a New Garden",
            url: "/docs/garden-setup"
          },
          {
            id: "first-plan",
            label: "Creating your First Plan",
            url: "/docs/first-plan"
          }
        ]
      }
    ]
  }
];
function Tree_1($$payload, $$props) {
  push();
  const expandedTreeItems = localStore("navigationExpanded", [
    "app",
    "project",
    "docs",
    "usage",
    "tutorials"
  ]);
  const tree = new Tree({
    items: navItems,
    expanded: expandedTreeItems.value
  });
  function isMac() {
    return /mac/i.test(navigator.platform);
  }
  function isControlOrMeta(event) {
    return isMac() ? event.metaKey : event.ctrlKey;
  }
  const url = new URL(page.url);
  const urlToken = url.pathname.split("/").pop();
  tree.clearSelection();
  if (urlToken) {
    tree.select(urlToken);
  }
  function treeItems($$payload2, items, depth = 0) {
    const each_array = ensure_array_like(items);
    $$payload2.out += `<!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$payload2.out += `<li${spread_attributes(
        {
          ...item.attrs,
          class: "cursor-pointer rounded-sm !outline-none first:mt-0 [&amp;:focus-visible>:first-child>div]:ring-4"
        }
      )}><div class="group py-1"${attr_style(`padding-left: ${stringify(depth * 1)}rem`)}><a${attr("href", item.item.url)}${attr_class(`${stringify(item.selected ? "!bg-accent-5 !text-accent-12" : "")} ring-accent-6 ring-offset-neutral-12 group-hover:bg-neutral-3 flex h-full w-full items-center gap-2 rounded-xl px-3 py-1 transition`)}><span class="select-none">${escape_html(item.item.label)}</span></a></div> `;
      if (item.children?.length) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<ul${spread_attributes(
          {
            ...tree.group,
            class: `relative list-none p-0 ${stringify(!item.expanded ? "pointer-events-none h-0 opacity-0" : "h-auto opacity-100")} origin-left`
          }
        )}><div class="absolute bottom-2 top-2 w-px bg-gray-200 dark:bg-gray-700"${attr_style(`left: ${stringify(0.5 + depth * 1)}rem`)}></div> `;
        treeItems($$payload2, item.children, depth + 1);
        $$payload2.out += `<!----></ul>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></li>`;
    }
    $$payload2.out += `<!--]-->`;
  }
  $$payload.out += `<ul${spread_attributes(
    {
      class: "mb-12 w-[200px] list-none",
      ...tree.root
    }
  )}>`;
  treeItems($$payload, tree.children, 0);
  $$payload.out += `<!----></ul>`;
  bind_props($$props, { isMac, isControlOrMeta });
  pop();
}
function MobileNav($$payload, $$props) {
  push();
  Root($$payload, {
    children: ($$payload2) => {
      Trigger($$payload2, {
        children: ($$payload3) => {
          Icon($$payload3, { icon: iconIds.gardenDrawerIcon, width: "2rem" });
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Sheet_content($$payload2, {
        children: ($$payload3) => {
          ThemeSwitcher($$payload3, { showLabel: true });
          $$payload3.out += `<!----> `;
          Scroll_area($$payload3, {
            class: "h-full",
            children: ($$payload4) => {
              Tree_1($$payload4, {});
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
  pop();
}
function Search($$payload, $$props) {
  push();
  let searchTerm = "";
  let results = (() => {
    {
      return [];
    }
  })();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Root$2($$payload2, {
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        {
          let child = function($$payload4, { props }) {
            $$payload4.out += `<!---->`;
            Button($$payload4, spread_props([
              props,
              {
                variant: "ghost",
                class: "flex justify-between py-1",
                children: ($$payload5) => {
                  Icon($$payload5, { icon: iconIds.searchIcon });
                  $$payload5.out += `<!----> <span>Search</span>`;
                },
                $$slots: { default: true }
              }
            ]));
            $$payload4.out += `<!---->`;
          };
          Trigger$2($$payload3, { child, $$slots: { child: true } });
        }
        $$payload3.out += `<!----> <!---->`;
        Dialog_content($$payload3, {
          class: "p-0",
          children: ($$payload4) => {
            $$payload4.out += `<!---->`;
            Input($$payload4, {
              class: "rounded-b-none",
              get value() {
                return searchTerm;
              },
              set value($$value) {
                searchTerm = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `<!----> <!---->`;
            Scroll_area($$payload4, {
              class: "",
              children: ($$payload5) => {
                $$payload5.out += `<ul class="flex flex-col p-4">`;
                if (results.length > 0) {
                  $$payload5.out += "<!--[-->";
                  const each_array = ensure_array_like(results);
                  $$payload5.out += `<!--[-->`;
                  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                    let result = each_array[$$index];
                    $$payload5.out += `<li class="w-full py-2"><a${attr("href", result.url)} class="text-neutral-10 text-lg">${html(result.title)}</a> <p class="text-neutral-11">${html(result.content)}</p></li>`;
                  }
                  $$payload5.out += `<!--]-->`;
                } else {
                  $$payload5.out += "<!--[!-->";
                  $$payload5.out += `<li class="text-neutral-11">No results found.</li>`;
                }
                $$payload5.out += `<!--]--></ul>`;
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
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
function Nav($$payload, $$props) {
  push();
  let navLinks = [
    { url: "/docs", label: "Docs" },
    { url: env.APP_URL, label: "App" }
  ];
  const each_array = ensure_array_like(navLinks);
  $$payload.out += `<header class="border-neutral-6 sticky left-0 top-0 z-50 w-full border-b drop-shadow-md"><nav class="bg-neutral-2 flex items-center justify-between px-8 py-2"><div><ul class="flex items-center gap-6 p-2 text-lg"><li><a href="/"><span class="font-bold">Verdagraph</span></a></li></ul></div> <div class="flex items-center gap-8"><div class="w-max-[300px] w-1/2">`;
  Search($$payload);
  $$payload.out += `<!----></div> <ul class="hidden gap-4 md:flex md:gap-8 lg:gap-12"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let link = each_array[$$index];
    $$payload.out += `<li>`;
    Button($$payload, {
      href: link.url,
      variant: "ghost",
      children: ($$payload2) => {
        $$payload2.out += `<!---->${escape_html(link.label)}`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----></li>`;
  }
  $$payload.out += `<!--]--> <li>`;
  ThemeSwitcher($$payload, { showLabel: false });
  $$payload.out += `<!----></li></ul> <div class="flex items-center md:hidden">`;
  MobileNav($$payload);
  $$payload.out += `<!----></div></div></nav></header>`;
  pop();
}
export {
  Dropdown_menu_content as D,
  Nav as N,
  Root$1 as R,
  Trigger$1 as T,
  RadioGroup as a,
  Dropdown_menu_radio_item as b,
  externalLinks as c,
  Tree_1 as d,
  env as e
};
