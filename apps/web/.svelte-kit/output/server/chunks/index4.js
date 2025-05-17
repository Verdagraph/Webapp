import "clsx";
import { o as once, b as bind_props, a as pop, p as push, d as spread_attributes } from "./index2.js";
import { f as box, u as useRefById, a as getDataDisabled, e as useId, m as mergeProps } from "./use-id.js";
import { v as isBrowser, c as createContext, x as isFocusVisible, n as noop, F as Floating_layer, u as Floating_layer_anchor } from "./index3.js";
function useTimeoutFn(cb, interval, options = {}) {
  const { immediate = true } = options;
  const isPending = box(false);
  let timer;
  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function stop() {
    isPending.current = false;
    clear();
  }
  function start(...args) {
    clear();
    isPending.current = true;
    timer = setTimeout(
      () => {
        isPending.current = false;
        timer = null;
        cb(...args);
      },
      interval
    );
  }
  if (immediate) {
    isPending.current = true;
    if (isBrowser) start();
  }
  return {
    isPending: box.readonly(isPending),
    start,
    stop
  };
}
const CONTENT_ATTR = "data-tooltip-content";
const TRIGGER_ATTR = "data-tooltip-trigger";
class TooltipProviderState {
  delayDuration;
  disableHoverableContent;
  disableCloseOnTriggerClick;
  disabled;
  ignoreNonKeyboardFocus;
  skipDelayDuration;
  isOpenDelayed = true;
  isPointerInTransit = box(false);
  #timerFn;
  constructor(props) {
    this.delayDuration = props.delayDuration;
    this.disableHoverableContent = props.disableHoverableContent;
    this.disableCloseOnTriggerClick = props.disableCloseOnTriggerClick;
    this.disabled = props.disabled;
    this.ignoreNonKeyboardFocus = props.ignoreNonKeyboardFocus;
    this.skipDelayDuration = props.skipDelayDuration;
    this.#timerFn = useTimeoutFn(
      () => {
        this.isOpenDelayed = true;
      },
      this.skipDelayDuration.current,
      { immediate: false }
    );
  }
  #startTimer = () => {
    this.#timerFn.start();
  };
  #clearTimer = () => {
    this.#timerFn.stop();
  };
  onOpen = () => {
    this.#clearTimer();
    this.isOpenDelayed = false;
  };
  onClose = () => {
    this.#startTimer();
  };
}
class TooltipRootState {
  open;
  _delayDuration;
  _disableHoverableContent;
  _disableCloseOnTriggerClick;
  _disabled;
  _ignoreNonKeyboardFocus;
  provider;
  #delayDuration = once(() => this._delayDuration.current ?? this.provider.delayDuration.current);
  get delayDuration() {
    return this.#delayDuration();
  }
  #disableHoverableContent = once(() => this._disableHoverableContent.current ?? this.provider.disableHoverableContent.current);
  get disableHoverableContent() {
    return this.#disableHoverableContent();
  }
  #disableCloseOnTriggerClick = once(() => this._disableCloseOnTriggerClick.current ?? this.provider.disableCloseOnTriggerClick.current);
  get disableCloseOnTriggerClick() {
    return this.#disableCloseOnTriggerClick();
  }
  #disabled = once(() => this._disabled.current ?? this.provider.disabled.current);
  get disabled() {
    return this.#disabled();
  }
  #ignoreNonKeyboardFocus = once(() => this._ignoreNonKeyboardFocus.current ?? this.provider.ignoreNonKeyboardFocus.current);
  get ignoreNonKeyboardFocus() {
    return this.#ignoreNonKeyboardFocus();
  }
  contentNode = null;
  triggerNode = null;
  #wasOpenDelayed = false;
  #timerFn;
  #stateAttr = once(() => {
    if (!this.open.current) return "closed";
    return this.#wasOpenDelayed ? "delayed-open" : "instant-open";
  });
  get stateAttr() {
    return this.#stateAttr();
  }
  constructor(props, provider) {
    this.provider = provider;
    this.open = props.open;
    this._delayDuration = props.delayDuration;
    this._disableHoverableContent = props.disableHoverableContent;
    this._disableCloseOnTriggerClick = props.disableCloseOnTriggerClick;
    this._disabled = props.disabled;
    this._ignoreNonKeyboardFocus = props.ignoreNonKeyboardFocus;
    this.#timerFn = useTimeoutFn(
      () => {
        this.#wasOpenDelayed = true;
        this.open.current = true;
      },
      this.delayDuration ?? 0,
      { immediate: false }
    );
  }
  handleOpen = () => {
    this.#timerFn.stop();
    this.#wasOpenDelayed = false;
    this.open.current = true;
  };
  handleClose = () => {
    this.#timerFn.stop();
    this.open.current = false;
  };
  #handleDelayedOpen = () => {
    this.#timerFn.start();
  };
  onTriggerEnter = () => {
    this.#handleDelayedOpen();
  };
  onTriggerLeave = () => {
    if (this.disableHoverableContent) {
      this.handleClose();
    } else {
      this.#timerFn.stop();
    }
  };
}
class TooltipTriggerState {
  #id;
  #ref;
  #root;
  #isPointerDown = box(false);
  #hasPointerMoveOpened = false;
  #disabled;
  #isDisabled = once(() => this.#disabled.current || this.#root.disabled);
  constructor(props, root) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.#disabled = props.disabled;
    this.#root = root;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        this.#root.triggerNode = node;
      }
    });
  }
  handlePointerUp = () => {
    this.#isPointerDown.current = false;
  };
  #onpointerup = () => {
    if (this.#isDisabled()) return;
    this.#isPointerDown.current = false;
  };
  #onpointerdown = () => {
    if (this.#isDisabled()) return;
    this.#isPointerDown.current = true;
    document.addEventListener(
      "pointerup",
      () => {
        this.handlePointerUp();
      },
      { once: true }
    );
  };
  #onpointermove = (e) => {
    if (this.#isDisabled()) return;
    if (e.pointerType === "touch") return;
    if (this.#hasPointerMoveOpened || this.#root.provider.isPointerInTransit.current) return;
    this.#root.onTriggerEnter();
    this.#hasPointerMoveOpened = true;
  };
  #onpointerleave = () => {
    if (this.#isDisabled()) return;
    this.#root.onTriggerLeave();
    this.#hasPointerMoveOpened = false;
  };
  #onfocus = (e) => {
    if (this.#isPointerDown.current || this.#isDisabled()) return;
    if (this.#root.ignoreNonKeyboardFocus && !isFocusVisible(e.currentTarget)) return;
    this.#root.handleOpen();
  };
  #onblur = () => {
    if (this.#isDisabled()) return;
    this.#root.handleClose();
  };
  #onclick = () => {
    if (this.#root.disableCloseOnTriggerClick || this.#isDisabled()) return;
    this.#root.handleClose();
  };
  #props = once(() => ({
    id: this.#id.current,
    "aria-describedby": this.#root.open.current ? this.#root.contentNode?.id : void 0,
    "data-state": this.#root.stateAttr,
    "data-disabled": getDataDisabled(this.#isDisabled()),
    "data-delay-duration": `${this.#root.delayDuration}`,
    [TRIGGER_ATTR]: "",
    tabindex: this.#isDisabled() ? void 0 : 0,
    disabled: this.#disabled.current,
    onpointerup: this.#onpointerup,
    onpointerdown: this.#onpointerdown,
    onpointermove: this.#onpointermove,
    onpointerleave: this.#onpointerleave,
    onfocus: this.#onfocus,
    onblur: this.#onblur,
    onclick: this.#onclick
  }));
  get props() {
    return this.#props();
  }
}
class TooltipContentState {
  root;
  #id;
  #ref;
  constructor(props, root) {
    this.root = root;
    this.#id = props.id;
    this.#ref = props.ref;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        this.root.contentNode = node;
      },
      deps: () => this.root.open.current
    });
  }
  #snippetProps = once(() => ({ open: this.root.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  #props = once(() => ({
    id: this.#id.current,
    "data-state": this.root.stateAttr,
    "data-disabled": getDataDisabled(this.root.disabled),
    style: { pointerEvents: "auto", outline: "none" },
    [CONTENT_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
}
const [
  setTooltipProviderContext,
  getTooltipProviderContext
] = createContext("Tooltip.Provider");
const [setTooltipRootContext, getTooltipRootContext] = createContext("Tooltip.Root");
function useTooltipProvider(props) {
  return setTooltipProviderContext(new TooltipProviderState(props));
}
function useTooltipRoot(props) {
  return setTooltipRootContext(new TooltipRootState(props, getTooltipProviderContext()));
}
function useTooltipTrigger(props) {
  return new TooltipTriggerState(props, getTooltipRootContext());
}
function useTooltipContent(props) {
  return new TooltipContentState(props, getTooltipRootContext());
}
function Tooltip($$payload, $$props) {
  push();
  let {
    open = false,
    onOpenChange = noop,
    disabled,
    delayDuration,
    disableCloseOnTriggerClick,
    disableHoverableContent,
    ignoreNonKeyboardFocus,
    controlledOpen = false,
    children
  } = $$props;
  useTooltipRoot({
    open: box.with(() => open, (v) => {
      if (controlledOpen) {
        onOpenChange(v);
      } else {
        open = v;
        onOpenChange(v);
      }
    }),
    delayDuration: box.with(() => delayDuration),
    disableCloseOnTriggerClick: box.with(() => disableCloseOnTriggerClick),
    disableHoverableContent: box.with(() => disableHoverableContent),
    ignoreNonKeyboardFocus: box.with(() => ignoreNonKeyboardFocus),
    disabled: box.with(() => disabled)
  });
  Floating_layer($$payload, {
    children: ($$payload2) => {
      children?.($$payload2);
      $$payload2.out += `<!---->`;
    }
  });
  bind_props($$props, { open });
  pop();
}
function Tooltip_trigger($$payload, $$props) {
  push();
  let {
    children,
    child,
    id = useId(),
    disabled = false,
    type = "button",
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = useTooltipTrigger({
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
function Tooltip_provider($$payload, $$props) {
  push();
  let {
    children,
    delayDuration = 700,
    disableCloseOnTriggerClick = false,
    disableHoverableContent = false,
    disabled = false,
    ignoreNonKeyboardFocus = false,
    skipDelayDuration = 300
  } = $$props;
  useTooltipProvider({
    delayDuration: box.with(() => delayDuration),
    disableCloseOnTriggerClick: box.with(() => disableCloseOnTriggerClick),
    disableHoverableContent: box.with(() => disableHoverableContent),
    disabled: box.with(() => disabled),
    ignoreNonKeyboardFocus: box.with(() => ignoreNonKeyboardFocus),
    skipDelayDuration: box.with(() => skipDelayDuration)
  });
  children?.($$payload);
  $$payload.out += `<!---->`;
  pop();
}
const Root = Tooltip;
const Trigger = Tooltip_trigger;
const Provider = Tooltip_provider;
export {
  Provider as P,
  Root as R,
  Trigger as T,
  useTooltipContent as u
};
