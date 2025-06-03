import { T as once, N as spread_attributes, P as bind_props, D as pop, A as push } from "./index.js";
import { k as createContext, n as useRefById, f as getDataDisabled, E as getDataOpenClosed, K as getAriaExpanded, u as useId, x as noop, y as box, z as mergeProps } from "./floating-layer-anchor.js";
import "clsx";
import { S as SPACE, E as ENTER, a5 as Presence_layer } from "./circle.js";
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
export {
  Content as C,
  Root as R,
  Trigger as T
};
