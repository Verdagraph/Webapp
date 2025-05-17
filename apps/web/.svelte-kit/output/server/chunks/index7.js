import { p as push, d as spread_attributes, a as pop, o as once, b as bind_props, g as spread_props, e as copy_payload, f as assign_payload, m as ensure_array_like, z as sanitize_props, B as rest_props, t as clsx, y as element, A as slot, n as escape_html } from "./index2.js";
import { m as mergeProps, f as box, u as useRefById, v as styleToString, w as getRequired, r as getDisabled, x as srOnlyStyles, a as getDataDisabled, b as getDataOpenClosed, l as getAriaHidden, e as useId } from "./use-id.js";
import { c as cn } from "./shadcn.js";
import { c as createContext, h as ARROW_UP, f as ARROW_DOWN, E as ENTER, S as SPACE, a as afterTick, m as TAB, g as PAGE_UP, H as HOME, i as PAGE_DOWN, j as END, n as noop, r as Popper_layer_force_mount, s as Popper_layer, F as Floating_layer, u as Floating_layer_anchor, b as Portal } from "./index3.js";
import { A as fallback } from "./utils.js";
import "clsx";
class Previous {
  #previous;
  #curr;
  constructor(getter) {
  }
  get current() {
    return this.#previous;
  }
}
function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
function isValidIndex(index, arr) {
  return index >= 0 && index < arr.length;
}
function next(array, index, loop = true) {
  if (array.length === 0 || index < 0 || index >= array.length) {
    return void 0;
  }
  if (array.length === 1 && index === 0) {
    return array[0];
  }
  if (index === array.length - 1) {
    return loop ? array[0] : void 0;
  }
  return array[index + 1];
}
function prev(array, index, loop = true) {
  if (array.length === 0 || index < 0 || index >= array.length) {
    return void 0;
  }
  if (array.length === 1 && index === 0) {
    return array[0];
  }
  if (index === 0) {
    return loop ? array[array.length - 1] : void 0;
  }
  return array[index - 1];
}
function forward(array, index, increment, loop = true) {
  if (array.length === 0 || index < 0 || index >= array.length) {
    return void 0;
  }
  let targetIndex = index + increment;
  if (loop) {
    targetIndex = (targetIndex % array.length + array.length) % array.length;
  } else {
    targetIndex = Math.max(0, Math.min(targetIndex, array.length - 1));
  }
  return array[targetIndex];
}
function backward(array, index, decrement, loop = true) {
  if (array.length === 0 || index < 0 || index >= array.length) {
    return void 0;
  }
  let targetIndex = index - decrement;
  if (loop) {
    targetIndex = (targetIndex % array.length + array.length) % array.length;
  } else {
    targetIndex = Math.max(0, Math.min(targetIndex, array.length - 1));
  }
  return array[targetIndex];
}
function getNextMatch(values, search, currentMatch) {
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const normalizedSearch = isRepeated ? search[0] : search;
  const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
  let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0));
  const excludeCurrentMatch = normalizedSearch.length === 1;
  if (excludeCurrentMatch)
    wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
  const nextMatch = wrappedValues.find((value) => value?.toLowerCase().startsWith(normalizedSearch.toLowerCase()));
  return nextMatch !== currentMatch ? nextMatch : void 0;
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
function Visually_hidden($$payload, $$props) {
  push();
  let {
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const style = {
    position: "absolute",
    border: 0,
    width: "1px",
    display: "inline-block",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    whiteSpace: "nowrap",
    wordWrap: "normal"
  };
  const mergedProps = mergeProps(restProps, { style });
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></span>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function boxAutoReset(defaultValue, afterMs = 1e4) {
  let timeout = null;
  let value = defaultValue;
  function resetAfter() {
    return setTimeout(
      () => {
        value = defaultValue;
      },
      afterMs
    );
  }
  return box.with(() => value, (v) => {
    value = v;
    if (timeout) clearTimeout(timeout);
    timeout = resetAfter();
  });
}
function useDOMTypeahead(opts) {
  const search = boxAutoReset("", 1e3);
  const onMatch = opts?.onMatch ?? ((node) => node.focus());
  const getCurrentItem = opts?.getCurrentItem ?? (() => document.activeElement);
  function handleTypeaheadSearch(key, candidates) {
    if (!candidates.length) return;
    search.current = search.current + key;
    const currentItem = getCurrentItem();
    const currentMatch = candidates.find((item) => item === currentItem)?.textContent?.trim() ?? "";
    const values = candidates.map((item) => item.textContent?.trim() ?? "");
    const nextMatch = getNextMatch(values, search.current, currentMatch);
    const newItem = candidates.find((item) => item.textContent?.trim() === nextMatch);
    if (newItem) {
      onMatch(newItem);
    }
    return newItem;
  }
  function resetTypeahead() {
    search.current = "";
  }
  return {
    search,
    handleTypeaheadSearch,
    resetTypeahead
  };
}
function useDataTypeahead(opts) {
  const search = boxAutoReset("", 1e3);
  function handleTypeaheadSearch(key, candidateValues) {
    if (!opts.enabled) return;
    if (!candidateValues.length) return;
    search.current = search.current + key;
    const currentItem = opts.getCurrentItem();
    const currentMatch = candidateValues.find((item) => item === currentItem) ?? "";
    const values = candidateValues.map((item) => item ?? "");
    const nextMatch = getNextMatch(values, search.current, currentMatch);
    const newItem = candidateValues.find((item) => item === nextMatch);
    if (newItem) {
      opts.onMatch(newItem);
    }
    return newItem;
  }
  function resetTypeahead() {
    search.current = "";
  }
  return {
    search,
    handleTypeaheadSearch,
    resetTypeahead
  };
}
const FIRST_KEYS = [ARROW_DOWN, PAGE_UP, HOME];
const LAST_KEYS = [ARROW_UP, PAGE_DOWN, END];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
class SelectBaseRootState {
  disabled;
  required;
  name;
  loop;
  open;
  scrollAlignment;
  items;
  allowDeselect;
  touchedInput = false;
  inputValue = "";
  inputNode = null;
  contentNode = null;
  triggerNode = null;
  valueId = "";
  highlightedNode = null;
  #highlightedValue = once(() => {
    if (!this.highlightedNode) return null;
    return this.highlightedNode.getAttribute("data-value");
  });
  get highlightedValue() {
    return this.#highlightedValue();
  }
  #highlightedId = once(() => {
    if (!this.highlightedNode) return void 0;
    return this.highlightedNode.id;
  });
  get highlightedId() {
    return this.#highlightedId();
  }
  #highlightedLabel = once(() => {
    if (!this.highlightedNode) return null;
    return this.highlightedNode.getAttribute("data-label");
  });
  get highlightedLabel() {
    return this.#highlightedLabel();
  }
  isUsingKeyboard = false;
  isCombobox = false;
  bitsAttrs;
  triggerPointerDownPos = { x: 0, y: 0 };
  constructor(props) {
    this.disabled = props.disabled;
    this.required = props.required;
    this.name = props.name;
    this.loop = props.loop;
    this.open = props.open;
    this.scrollAlignment = props.scrollAlignment;
    this.isCombobox = props.isCombobox;
    this.items = props.items;
    this.allowDeselect = props.allowDeselect;
    this.bitsAttrs = getSelectBitsAttrs(this);
  }
  setHighlightedNode(node) {
    this.highlightedNode = node;
    if (node) {
      if (this.isUsingKeyboard) {
        node.scrollIntoView({ block: "nearest" });
      }
    }
  }
  getCandidateNodes() {
    const node = this.contentNode;
    if (!node) return [];
    const nodes = Array.from(node.querySelectorAll(`[${this.bitsAttrs.item}]:not([data-disabled])`));
    return nodes;
  }
  setHighlightedToFirstCandidate() {
    this.setHighlightedNode(null);
    const candidateNodes = this.getCandidateNodes();
    if (!candidateNodes.length) return;
    this.setHighlightedNode(candidateNodes[0]);
  }
  getNodeByValue(value) {
    const candidateNodes = this.getCandidateNodes();
    return candidateNodes.find((node) => node.dataset.value === value) ?? null;
  }
  setOpen(open) {
    this.open.current = open;
  }
  toggleOpen() {
    this.open.current = !this.open.current;
  }
  handleOpen() {
    this.setOpen(true);
  }
  handleClose() {
    this.setHighlightedNode(null);
    this.setOpen(false);
  }
  toggleMenu() {
    this.toggleOpen();
  }
}
class SelectSingleRootState extends SelectBaseRootState {
  value;
  isMulti = false;
  #hasValue = once(() => this.value.current !== "");
  get hasValue() {
    return this.#hasValue();
  }
  #currentLabel = once(() => {
    if (!this.items.current.length) return "";
    const match = this.items.current.find((item) => item.value === this.value.current)?.label;
    return match ?? "";
  });
  get currentLabel() {
    return this.#currentLabel();
  }
  #candidateLabels = once(() => {
    if (!this.items.current.length) return [];
    const filteredItems = this.items.current.filter((item) => !item.disabled);
    return filteredItems.map((item) => item.label);
  });
  get candidateLabels() {
    return this.#candidateLabels();
  }
  #dataTypeaheadEnabled = once(() => {
    if (this.isMulti) return false;
    if (this.items.current.length === 0) return false;
    return true;
  });
  get dataTypeaheadEnabled() {
    return this.#dataTypeaheadEnabled();
  }
  constructor(props) {
    super(props);
    this.value = props.value;
  }
  includesItem(itemValue) {
    return this.value.current === itemValue;
  }
  toggleItem(itemValue, itemLabel = itemValue) {
    this.value.current = this.includesItem(itemValue) ? "" : itemValue;
    this.inputValue = itemLabel;
  }
  setInitialHighlightedNode() {
    if (this.highlightedNode && document.contains(this.highlightedNode)) return;
    if (this.value.current !== "") {
      const node = this.getNodeByValue(this.value.current);
      if (node) {
        this.setHighlightedNode(node);
        return;
      }
    }
    const firstCandidate = this.getCandidateNodes()[0];
    if (!firstCandidate) return;
    this.setHighlightedNode(firstCandidate);
  }
}
class SelectMultipleRootState extends SelectBaseRootState {
  value;
  isMulti = true;
  #hasValue = once(() => this.value.current.length > 0);
  get hasValue() {
    return this.#hasValue();
  }
  constructor(props) {
    super(props);
    this.value = props.value;
  }
  includesItem(itemValue) {
    return this.value.current.includes(itemValue);
  }
  toggleItem(itemValue, itemLabel = itemValue) {
    if (this.includesItem(itemValue)) {
      this.value.current = this.value.current.filter((v) => v !== itemValue);
    } else {
      this.value.current = [...this.value.current, itemValue];
    }
    this.inputValue = itemLabel;
  }
  setInitialHighlightedNode() {
    if (this.highlightedNode) return;
    if (this.value.current.length && this.value.current[0] !== "") {
      const node = this.getNodeByValue(this.value.current[0]);
      if (node) {
        this.setHighlightedNode(node);
        return;
      }
    }
    const firstCandidate = this.getCandidateNodes()[0];
    if (!firstCandidate) return;
    this.setHighlightedNode(firstCandidate);
  }
}
class SelectTriggerState {
  #id;
  #ref;
  root;
  #domTypeahead;
  #dataTypeahead;
  constructor(props, root) {
    this.root = root;
    this.#id = props.id;
    this.#ref = props.ref;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        this.root.triggerNode = node;
      }
    });
    this.#domTypeahead = useDOMTypeahead({
      getCurrentItem: () => this.root.highlightedNode,
      onMatch: (node) => {
        this.root.setHighlightedNode(node);
      }
    });
    this.#dataTypeahead = useDataTypeahead({
      getCurrentItem: () => {
        if (this.root.isMulti) return "";
        return this.root.currentLabel;
      },
      onMatch: (label) => {
        if (this.root.isMulti) return;
        if (!this.root.items.current) return;
        const matchedItem = this.root.items.current.find((item) => item.label === label);
        if (!matchedItem) return;
        this.root.value.current = matchedItem.value;
      },
      enabled: !this.root.isMulti && this.root.dataTypeaheadEnabled
    });
    this.onkeydown = this.onkeydown.bind(this);
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onpointerup = this.onpointerup.bind(this);
    this.onclick = this.onclick.bind(this);
  }
  #handleOpen() {
    this.root.open.current = true;
    this.#dataTypeahead.resetTypeahead();
    this.#domTypeahead.resetTypeahead();
  }
  #handlePointerOpen(e) {
    this.#handleOpen();
    this.root.triggerPointerDownPos = {
      x: Math.round(e.pageX),
      y: Math.round(e.pageY)
    };
  }
  onkeydown(e) {
    this.root.isUsingKeyboard = true;
    if (e.key === ARROW_UP || e.key === ARROW_DOWN) e.preventDefault();
    if (!this.root.open.current) {
      if (e.key === ENTER || e.key === SPACE || e.key === ARROW_DOWN || e.key === ARROW_UP) {
        e.preventDefault();
        this.root.handleOpen();
      } else if (!this.root.isMulti && this.root.dataTypeaheadEnabled) {
        this.#dataTypeahead.handleTypeaheadSearch(e.key, this.root.candidateLabels);
        return;
      }
      afterTick(() => {
        if (this.root.hasValue) return;
        const candidateNodes2 = this.root.getCandidateNodes();
        if (!candidateNodes2.length) return;
        if (e.key === ARROW_DOWN) {
          const firstCandidate = candidateNodes2[0];
          this.root.setHighlightedNode(firstCandidate);
        } else if (e.key === ARROW_UP) {
          const lastCandidate = candidateNodes2[candidateNodes2.length - 1];
          this.root.setHighlightedNode(lastCandidate);
        }
      });
      return;
    }
    if (e.key === TAB) {
      this.root.handleClose();
      return;
    }
    if ((e.key === ENTER || e.key === SPACE) && !e.isComposing) {
      e.preventDefault();
      const highlightedValue = this.root.highlightedValue;
      const isCurrentSelectedValue = highlightedValue === this.root.value.current;
      if (!this.root.allowDeselect.current && isCurrentSelectedValue && !this.root.isMulti) {
        this.root.handleClose();
        return;
      }
      if (highlightedValue !== null) {
        this.root.toggleItem(highlightedValue, this.root.highlightedLabel ?? void 0);
      }
      if (!this.root.isMulti && !isCurrentSelectedValue) {
        this.root.handleClose();
      }
    }
    if (e.key === ARROW_UP && e.altKey) {
      this.root.handleClose();
    }
    if (FIRST_LAST_KEYS.includes(e.key)) {
      e.preventDefault();
      const candidateNodes2 = this.root.getCandidateNodes();
      const currHighlightedNode = this.root.highlightedNode;
      const currIndex = currHighlightedNode ? candidateNodes2.indexOf(currHighlightedNode) : -1;
      const loop = this.root.loop.current;
      let nextItem;
      if (e.key === ARROW_DOWN) {
        nextItem = next(candidateNodes2, currIndex, loop);
      } else if (e.key === ARROW_UP) {
        nextItem = prev(candidateNodes2, currIndex, loop);
      } else if (e.key === PAGE_DOWN) {
        nextItem = forward(candidateNodes2, currIndex, 10, loop);
      } else if (e.key === PAGE_UP) {
        nextItem = backward(candidateNodes2, currIndex, 10, loop);
      } else if (e.key === HOME) {
        nextItem = candidateNodes2[0];
      } else if (e.key === END) {
        nextItem = candidateNodes2[candidateNodes2.length - 1];
      }
      if (!nextItem) return;
      this.root.setHighlightedNode(nextItem);
      return;
    }
    const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
    const isCharacterKey = e.key.length === 1;
    if (e.code === "Space") return;
    const candidateNodes = this.root.getCandidateNodes();
    if (e.key === TAB) return;
    if (!isModifierKey && isCharacterKey) {
      this.#domTypeahead.handleTypeaheadSearch(e.key, candidateNodes);
      return;
    }
    if (!this.root.highlightedNode) {
      this.root.setHighlightedToFirstCandidate();
    }
  }
  onclick(e) {
    const currTarget = e.currentTarget;
    currTarget.focus();
  }
  /**
   * `pointerdown` fires before the `focus` event, so we can prevent the default
   * behavior of focusing the button and keep focus on the input.
   */
  onpointerdown = (e) => {
    if (this.root.disabled.current) return;
    if (e.pointerType === "touch") return e.preventDefault();
    const target = e.target;
    if (target?.hasPointerCapture(e.pointerId)) {
      target?.releasePointerCapture(e.pointerId);
    }
    if (e.button === 0 && e.ctrlKey === false) {
      if (this.root.open.current === false) {
        this.#handlePointerOpen(e);
        e.preventDefault();
      } else {
        this.root.handleClose();
      }
    }
  };
  onpointerup = (e) => {
    e.preventDefault();
    if (e.pointerType === "touch") {
      this.#handlePointerOpen(e);
    }
  };
  #props = once(() => ({
    id: this.#id.current,
    disabled: this.root.disabled.current ? true : void 0,
    "aria-haspopup": "listbox",
    "data-state": getDataOpenClosed(this.root.open.current),
    "data-disabled": getDataDisabled(this.root.disabled.current),
    "data-placeholder": this.root.hasValue ? void 0 : "",
    [this.root.bitsAttrs.trigger]: "",
    onpointerdown: this.onpointerdown,
    onkeydown: this.onkeydown,
    onclick: this.onclick,
    onpointerup: this.onpointerup
  }));
  get props() {
    return this.#props();
  }
}
class SelectContentState {
  id;
  ref;
  viewportNode = null;
  root;
  isPositioned = false;
  constructor(props, root) {
    this.root = root;
    this.id = props.id;
    this.ref = props.ref;
    useRefById({
      id: this.id,
      ref: this.ref,
      onRefChange: (node) => {
        this.root.contentNode = node;
      },
      deps: () => this.root.open.current
    });
    this.onpointermove = this.onpointermove.bind(this);
    this.handleInteractOutside = this.handleInteractOutside.bind(this);
  }
  onpointermove(_) {
    this.root.isUsingKeyboard = false;
  }
  #styles = once(() => {
    if (this.root.isCombobox) {
      return {
        "--bits-combobox-content-transform-origin": "var(--bits-floating-transform-origin)",
        "--bits-combobox-content-available-width": "var(--bits-floating-available-width)",
        "--bits-combobox-content-available-height": "var(--bits-floating-available-height)",
        "--bits-combobox-anchor-width": "var(--bits-floating-anchor-width)",
        "--bits-combobox-anchor-height": "var(--bits-floating-anchor-height)"
      };
    } else {
      return {
        "--bits-select-content-transform-origin": "var(--bits-floating-transform-origin)",
        "--bits-select-content-available-width": "var(--bits-floating-available-width)",
        "--bits-select-content-available-height": "var(--bits-floating-available-height)",
        "--bits-select-anchor-width": "var(--bits-floating-anchor-width)",
        "--bits-select-anchor-height": "var(--bits-floating-anchor-height)"
      };
    }
  });
  handleInteractOutside(e) {
    if (e.target === this.root.triggerNode || e.target === this.root.inputNode) {
      e.preventDefault();
    }
  }
  #snippetProps = once(() => ({ open: this.root.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  #props = once(() => ({
    id: this.id.current,
    role: "listbox",
    "data-state": getDataOpenClosed(this.root.open.current),
    [this.root.bitsAttrs.content]: "",
    style: {
      display: "flex",
      flexDirection: "column",
      outline: "none",
      boxSizing: "border-box",
      pointerEvents: "auto",
      ...this.#styles()
    },
    onpointermove: this.onpointermove
  }));
  get props() {
    return this.#props();
  }
}
class SelectItemState {
  #id;
  #ref;
  root;
  value;
  label;
  onHighlight;
  onUnhighlight;
  disabled;
  #isSelected = once(() => this.root.includesItem(this.value.current));
  get isSelected() {
    return this.#isSelected();
  }
  #isHighlighted = once(() => this.root.highlightedValue === this.value.current);
  get isHighlighted() {
    return this.#isHighlighted();
  }
  prevHighlighted = new Previous(() => this.isHighlighted);
  textId = "";
  mounted = false;
  constructor(props, root) {
    this.root = root;
    this.value = props.value;
    this.disabled = props.disabled;
    this.label = props.label;
    this.onHighlight = props.onHighlight;
    this.onUnhighlight = props.onUnhighlight;
    this.#id = props.id;
    this.#ref = props.ref;
    useRefById({ id: this.#id, ref: this.#ref });
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onpointerup = this.onpointerup.bind(this);
    this.onpointermove = this.onpointermove.bind(this);
  }
  #snippetProps = once(() => ({
    selected: this.isSelected,
    highlighted: this.isHighlighted
  }));
  get snippetProps() {
    return this.#snippetProps();
  }
  onpointerdown(e) {
    e.preventDefault();
  }
  /**
   * Using `pointerup` instead of `click` allows power users to pointerdown
   * the trigger, then release pointerup on an item to select it vs having to do
   * multiple clicks.
   */
  onpointerup(e) {
    if (e.defaultPrevented) return;
    e.preventDefault();
    if (this.disabled.current) return;
    const isCurrentSelectedValue = this.value.current === this.root.value.current;
    if (!this.root.allowDeselect.current && isCurrentSelectedValue && !this.root.isMulti) {
      this.root.handleClose();
      return;
    }
    this.root.toggleItem(this.value.current, this.label.current);
    if (!this.root.isMulti && !isCurrentSelectedValue) {
      this.root.handleClose();
    }
  }
  onpointermove(_) {
    if (this.root.highlightedNode !== this.#ref.current) {
      this.root.setHighlightedNode(this.#ref.current);
    }
  }
  #props = once(() => ({
    id: this.#id.current,
    role: "option",
    "aria-selected": this.root.includesItem(this.value.current) ? "true" : void 0,
    "data-value": this.value.current,
    "data-disabled": getDataDisabled(this.disabled.current),
    "data-highlighted": this.root.highlightedValue === this.value.current ? "" : void 0,
    "data-selected": this.root.includesItem(this.value.current) ? "" : void 0,
    "data-label": this.label.current,
    [this.root.bitsAttrs.item]: "",
    onpointermove: this.onpointermove,
    onpointerdown: this.onpointerdown,
    onpointerup: this.onpointerup
  }));
  get props() {
    return this.#props();
  }
}
class SelectGroupState {
  #id;
  #ref;
  root;
  labelNode = null;
  constructor(props, root) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.root = root;
    useRefById({ id: this.#id, ref: this.#ref });
  }
  #props = once(() => ({
    id: this.#id.current,
    role: "group",
    [this.root.bitsAttrs.group]: "",
    "aria-labelledby": this.labelNode?.id ?? void 0
  }));
  get props() {
    return this.#props();
  }
}
class SelectGroupHeadingState {
  #id;
  #ref;
  group;
  constructor(props, group) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.group = group;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        group.labelNode = node;
      }
    });
  }
  #props = once(() => ({
    id: this.#id.current,
    [this.group.root.bitsAttrs["group-label"]]: ""
  }));
  get props() {
    return this.#props();
  }
}
class SelectHiddenInputState {
  #value;
  root;
  #shouldRender = once(() => this.root.name.current !== "");
  get shouldRender() {
    return this.#shouldRender();
  }
  constructor(props, root) {
    this.root = root;
    this.#value = props.value;
    this.onfocus = this.onfocus.bind(this);
  }
  onfocus(e) {
    e.preventDefault();
    if (!this.root.isCombobox) {
      this.root.triggerNode?.focus();
    } else {
      this.root.inputNode?.focus();
    }
  }
  #props = once(() => ({
    disabled: getDisabled(this.root.disabled.current),
    required: getRequired(this.root.required.current),
    name: this.root.name.current,
    value: this.#value.current,
    style: styleToString(srOnlyStyles),
    tabindex: -1,
    onfocus: this.onfocus
  }));
  get props() {
    return this.#props();
  }
}
class SelectViewportState {
  #id;
  #ref;
  root;
  content;
  prevScrollTop = 0;
  constructor(props, content) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.content = content;
    this.root = content.root;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        this.content.viewportNode = node;
      },
      deps: () => this.root.open.current
    });
  }
  #props = once(() => ({
    id: this.#id.current,
    role: "presentation",
    [this.root.bitsAttrs.viewport]: "",
    style: {
      // we use position: 'relative' here on the `viewport` so that when we call
      // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
      // (independent of the scrollUpButton).
      position: "relative",
      flex: 1,
      overflow: "auto"
    }
  }));
  get props() {
    return this.#props();
  }
}
class SelectScrollButtonImplState {
  id;
  ref;
  content;
  root;
  autoScrollTimer = null;
  onAutoScroll = noop;
  mounted;
  constructor(props, content) {
    this.ref = props.ref;
    this.id = props.id;
    this.mounted = props.mounted;
    this.content = content;
    this.root = content.root;
    useRefById({
      id: this.id,
      ref: this.ref,
      deps: () => this.mounted.current
    });
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onpointermove = this.onpointermove.bind(this);
    this.onpointerleave = this.onpointerleave.bind(this);
  }
  clearAutoScrollTimer() {
    if (this.autoScrollTimer === null) return;
    window.clearInterval(this.autoScrollTimer);
    this.autoScrollTimer = null;
  }
  onpointerdown(_) {
    if (this.autoScrollTimer !== null) return;
    this.autoScrollTimer = window.setInterval(
      () => {
        this.onAutoScroll();
      },
      50
    );
  }
  onpointermove(_) {
    if (this.autoScrollTimer !== null) return;
    this.autoScrollTimer = window.setInterval(
      () => {
        this.onAutoScroll();
      },
      50
    );
  }
  onpointerleave(_) {
    this.clearAutoScrollTimer();
  }
  #props = once(() => ({
    id: this.id.current,
    "aria-hidden": getAriaHidden(true),
    style: { flexShrink: 0 },
    onpointerdown: this.onpointerdown,
    onpointermove: this.onpointermove,
    onpointerleave: this.onpointerleave
  }));
  get props() {
    return this.#props();
  }
}
class SelectScrollDownButtonState {
  state;
  content;
  root;
  canScrollDown = false;
  constructor(state) {
    this.state = state;
    this.content = state.content;
    this.root = state.root;
    this.state.onAutoScroll = this.handleAutoScroll;
  }
  handleAutoScroll = () => {
    afterTick(() => {
      const viewport = this.content.viewportNode;
      const selectedItem = this.root.highlightedNode;
      if (!viewport || !selectedItem) return;
      viewport.scrollTop = viewport.scrollTop + selectedItem.offsetHeight;
    });
  };
  #props = once(() => ({
    ...this.state.props,
    [this.root.bitsAttrs["scroll-down-button"]]: ""
  }));
  get props() {
    return this.#props();
  }
}
class SelectScrollUpButtonState {
  state;
  content;
  root;
  canScrollUp = false;
  constructor(state) {
    this.state = state;
    this.content = state.content;
    this.root = state.root;
    this.state.onAutoScroll = this.handleAutoScroll;
  }
  handleAutoScroll = () => {
    afterTick(() => {
      const viewport = this.content.viewportNode;
      const selectedItem = this.root.highlightedNode;
      if (!viewport || !selectedItem) return;
      viewport.scrollTop = viewport.scrollTop - selectedItem.offsetHeight;
    });
  };
  #props = once(() => ({
    ...this.state.props,
    [this.root.bitsAttrs["scroll-up-button"]]: ""
  }));
  get props() {
    return this.#props();
  }
}
const [setSelectRootContext, getSelectRootContext] = createContext(["Select.Root", "Combobox.Root"]);
const [setSelectGroupContext, getSelectGroupContext] = createContext(["Select.Group", "Combobox.Group"]);
const [
  setSelectContentContext,
  getSelectContentContext
] = createContext(["Select.Content", "Combobox.Content"]);
function useSelectRoot(props) {
  const { type, ...rest } = props;
  const rootState = type === "single" ? new SelectSingleRootState(rest) : new SelectMultipleRootState(rest);
  return setSelectRootContext(rootState);
}
function useSelectContent(props) {
  return setSelectContentContext(new SelectContentState(props, getSelectRootContext()));
}
function useSelectTrigger(props) {
  return new SelectTriggerState(props, getSelectRootContext());
}
function useSelectItem(props) {
  return new SelectItemState(props, getSelectRootContext());
}
function useSelectViewport(props) {
  return new SelectViewportState(props, getSelectContentContext());
}
function useSelectScrollUpButton(props) {
  return new SelectScrollUpButtonState(new SelectScrollButtonImplState(props, getSelectContentContext()));
}
function useSelectScrollDownButton(props) {
  return new SelectScrollDownButtonState(new SelectScrollButtonImplState(props, getSelectContentContext()));
}
function useSelectGroup(props) {
  return setSelectGroupContext(new SelectGroupState(props, getSelectRootContext()));
}
function useSelectGroupHeading(props) {
  return new SelectGroupHeadingState(props, getSelectGroupContext());
}
function useSelectHiddenInput(props) {
  return new SelectHiddenInputState(props, getSelectRootContext());
}
const selectParts = [
  "trigger",
  "content",
  "item",
  "viewport",
  "scroll-up-button",
  "scroll-down-button",
  "group",
  "group-label",
  "separator",
  "arrow",
  "input",
  "content-wrapper",
  "item-text",
  "value"
];
function getSelectBitsAttrs(root) {
  const isCombobox = root.isCombobox;
  const attrObj = {};
  for (const part of selectParts) {
    attrObj[part] = isCombobox ? `data-combobox-${part}` : `data-select-${part}`;
  }
  return attrObj;
}
function Select_hidden_input($$payload, $$props) {
  push();
  let { value = "" } = $$props;
  const hiddenInputState = useSelectHiddenInput({ value: box.with(() => value) });
  Visually_hidden($$payload, {
    children: ($$payload2) => {
      if (hiddenInputState.shouldRender) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<input${spread_attributes({ ...hiddenInputState.props, value })}>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    },
    $$slots: { default: true }
  });
  bind_props($$props, { value });
  pop();
}
function Select_content$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    forceMount = false,
    side = "bottom",
    onInteractOutside = noop,
    onEscapeKeydown = noop,
    children,
    child,
    preventScroll = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = useSelectContent({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, contentState.props);
  function handleInteractOutside(e) {
    contentState.handleInteractOutside(e);
    if (e.defaultPrevented) return;
    onInteractOutside(e);
    if (e.defaultPrevented) return;
    contentState.root.handleClose();
  }
  function handleEscapeKeydown(e) {
    onEscapeKeydown(e);
    if (e.defaultPrevented) return;
    contentState.root.handleClose();
  }
  if (forceMount) {
    $$payload.out += "<!--[-->";
    {
      let popper = function($$payload2, { props, wrapperProps }) {
        const finalProps = mergeProps(props, { style: contentState.props.style });
        if (child) {
          $$payload2.out += "<!--[-->";
          child($$payload2, {
            props: finalProps,
            wrapperProps,
            ...contentState.snippetProps
          });
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<div${spread_attributes({ ...wrapperProps })}><div${spread_attributes({ ...finalProps })}>`;
          children?.($$payload2);
          $$payload2.out += `<!----></div></div>`;
        }
        $$payload2.out += `<!--]-->`;
      };
      Popper_layer_force_mount($$payload, spread_props([
        mergedProps,
        {
          side,
          enabled: contentState.root.open.current,
          id,
          onInteractOutside: handleInteractOutside,
          onEscapeKeydown: handleEscapeKeydown,
          onOpenAutoFocus: (e) => e.preventDefault(),
          onCloseAutoFocus: (e) => e.preventDefault(),
          trapFocus: false,
          loop: false,
          preventScroll,
          onPlaced: () => contentState.isPositioned = true,
          forceMount: true,
          popper,
          $$slots: { popper: true }
        }
      ]));
    }
  } else if (!forceMount) {
    $$payload.out += "<!--[1-->";
    {
      let popper = function($$payload2, { props, wrapperProps }) {
        const finalProps = mergeProps(props, { style: contentState.props.style });
        if (child) {
          $$payload2.out += "<!--[-->";
          child($$payload2, {
            props: finalProps,
            wrapperProps,
            ...contentState.snippetProps
          });
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<div${spread_attributes({ ...wrapperProps })}><div${spread_attributes({ ...finalProps })}>`;
          children?.($$payload2);
          $$payload2.out += `<!----></div></div>`;
        }
        $$payload2.out += `<!--]-->`;
      };
      Popper_layer($$payload, spread_props([
        mergedProps,
        {
          side,
          present: contentState.root.open.current,
          id,
          onInteractOutside: handleInteractOutside,
          onEscapeKeydown: handleEscapeKeydown,
          onOpenAutoFocus: (e) => e.preventDefault(),
          onCloseAutoFocus: (e) => e.preventDefault(),
          trapFocus: false,
          loop: false,
          preventScroll,
          onPlaced: () => contentState.isPositioned = true,
          forceMount: false,
          popper,
          $$slots: { popper: true }
        }
      ]));
    }
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Mounted($$payload, $$props) {
  push();
  let { isMounted = false, onMountedChange = noop } = $$props;
  bind_props($$props, { isMounted });
  pop();
}
function Select_item$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    value,
    label = value,
    disabled = false,
    children,
    child,
    onHighlight = noop,
    onUnhighlight = noop,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const itemState = useSelectItem({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    value: box.with(() => value),
    disabled: box.with(() => disabled),
    label: box.with(() => label),
    onHighlight: box.with(() => onHighlight),
    onUnhighlight: box.with(() => onUnhighlight)
  });
  const mergedProps = mergeProps(restProps, itemState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps, ...itemState.snippetProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload, itemState.snippetProps);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]--> `;
  Mounted($$payload, {
    onMountedChange: (m) => {
      itemState.mounted = m;
    }
  });
  $$payload.out += `<!---->`;
  bind_props($$props, { ref });
  pop();
}
function Select_group($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const groupState = useSelectGroup({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, groupState.props);
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
  bind_props($$props, { ref });
  pop();
}
function Select_viewport($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const viewportState = useSelectViewport({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, viewportState.props);
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
  bind_props($$props, { ref });
  pop();
}
function Select_scroll_down_button$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    child,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let mounted = false;
  const scrollDownButtonState = useSelectScrollDownButton({
    id: box.with(() => id),
    mounted: box.with(() => mounted),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, scrollDownButtonState.props);
  if (scrollDownButtonState.canScrollDown) {
    $$payload.out += "<!--[-->";
    Mounted($$payload, { onMountedChange: (m) => mounted = m });
    $$payload.out += `<!----> `;
    if (child) {
      $$payload.out += "<!--[-->";
      child($$payload, { props: restProps });
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
      children?.($$payload);
      $$payload.out += `<!----></div>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Select_scroll_up_button$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    child,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let mounted = false;
  const scrollDownButtonState = useSelectScrollUpButton({
    id: box.with(() => id),
    mounted: box.with(() => mounted),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, scrollDownButtonState.props);
  if (scrollDownButtonState.canScrollUp) {
    $$payload.out += "<!--[-->";
    Mounted($$payload, { onMountedChange: (m) => mounted = m });
    $$payload.out += `<!----> `;
    if (child) {
      $$payload.out += "<!--[-->";
      child($$payload, { props: restProps });
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
      children?.($$payload);
      $$payload.out += `<!----></div>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Select($$payload, $$props) {
  push();
  let {
    value = void 0,
    onValueChange = noop,
    name = "",
    disabled = false,
    type,
    open = false,
    onOpenChange = noop,
    loop = false,
    scrollAlignment = "nearest",
    required = false,
    controlledOpen = false,
    controlledValue = false,
    items = [],
    allowDeselect = true,
    children
  } = $$props;
  if (value === void 0) {
    const defaultValue = type === "single" ? "" : [];
    if (controlledValue) {
      onValueChange(defaultValue);
    } else {
      value = defaultValue;
    }
  }
  const rootState = useSelectRoot({
    type,
    value: box.with(() => value, (v) => {
      if (controlledValue) {
        onValueChange(v);
      } else {
        value = v;
        onValueChange(v);
      }
    }),
    disabled: box.with(() => disabled),
    required: box.with(() => required),
    open: box.with(() => open, (v) => {
      if (controlledOpen) {
        onOpenChange(v);
      } else {
        open = v;
        onOpenChange(v);
      }
    }),
    loop: box.with(() => loop),
    scrollAlignment: box.with(() => scrollAlignment),
    name: box.with(() => name),
    isCombobox: false,
    items: box.with(() => items),
    allowDeselect: box.with(() => allowDeselect)
  });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Floating_layer($$payload2, {
      children: ($$payload3) => {
        children?.($$payload3);
        $$payload3.out += `<!---->`;
      }
    });
    $$payload2.out += `<!----> `;
    if (Array.isArray(rootState.value.current)) {
      $$payload2.out += "<!--[-->";
      if (rootState.value.current.length) {
        $$payload2.out += "<!--[-->";
        const each_array = ensure_array_like(rootState.value.current);
        $$payload2.out += `<!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let item = each_array[$$index];
          Select_hidden_input($$payload2, { value: item });
        }
        $$payload2.out += `<!--]-->`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    } else {
      $$payload2.out += "<!--[!-->";
      Select_hidden_input($$payload2, {
        get value() {
          return rootState.value.current;
        },
        set value($$value) {
          rootState.value.current = $$value;
          $$settled = false;
        }
      });
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { value, open });
  pop();
}
function Select_trigger$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    child,
    children,
    type = "button",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = useSelectTrigger({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, triggerState.props, { type });
  $$payload.out += `<!---->`;
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
  $$payload.out += `<!---->`;
  bind_props($$props, { ref });
  pop();
}
/**
 * @license lucide-svelte v0.416.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
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
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "name",
    "color",
    "size",
    "strokeWidth",
    "absoluteStrokeWidth",
    "iconNode"
  ]);
  push();
  let name = fallback($$props["name"], void 0);
  let color = fallback($$props["color"], "currentColor");
  let size = fallback($$props["size"], 24);
  let strokeWidth = fallback($$props["strokeWidth"], 2);
  let absoluteStrokeWidth = fallback($$props["absoluteStrokeWidth"], false);
  let iconNode = fallback($$props["iconNode"], () => [], true);
  const mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && array.indexOf(className) === index;
  }).join(" ");
  const each_array = ensure_array_like(iconNode);
  $$payload.out += `<svg${spread_attributes(
    {
      ...defaultAttributes,
      ...$$restProps,
      width: size,
      height: size,
      stroke: color,
      "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      class: clsx(mergeClasses("lucide-icon", "lucide", name ? `lucide-${name}` : "", $$sanitized_props.class))
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
  $$payload.out += `<!--]--><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></svg>`;
  bind_props($$props, {
    name,
    color,
    size,
    strokeWidth,
    absoluteStrokeWidth,
    iconNode
  });
  pop();
}
function Check($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "M20 6 9 17l-5-5" }]];
  Icon($$payload, spread_props([
    { name: "check" },
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
function Chevron_down($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
  Icon($$payload, spread_props([
    { name: "chevron-down" },
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
function Select_scroll_down_button($$payload, $$props) {
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
    Select_scroll_down_button$1($$payload2, spread_props([
      {
        class: cn("flex cursor-default items-center justify-center py-1", className)
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
          Chevron_down($$payload3, { class: "size-4" });
        },
        $$slots: { default: true }
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
function Chevron_up($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "m18 15-6-6-6 6" }]];
  Icon($$payload, spread_props([
    { name: "chevron-up" },
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
function Select_scroll_up_button($$payload, $$props) {
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
    Select_scroll_up_button$1($$payload2, spread_props([
      {
        class: cn("flex cursor-default items-center justify-center py-1", className)
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
          Chevron_up($$payload3, { class: "size-4" });
        },
        $$slots: { default: true }
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
function Select_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    sideOffset = 4,
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
        Select_content$1($$payload3, spread_props([
          {
            sideOffset,
            class: cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-neutral-2 text-neutral-11 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className)
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
              Select_scroll_up_button($$payload4, {});
              $$payload4.out += `<!----> <!---->`;
              Select_viewport($$payload4, {
                class: cn("h-[var(--bits-select-anchor-height)] w-full min-w-[var(--bits-select-anchor-width)] p-1"),
                children: ($$payload5) => {
                  children?.($$payload5);
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              Select_scroll_down_button($$payload4, {});
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
function Select_item($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    value,
    label,
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
      let children = function($$payload3, { selected, highlighted }) {
        $$payload3.out += `<span class="absolute left-2 flex size-3.5 items-center justify-center">`;
        if (selected) {
          $$payload3.out += "<!--[-->";
          Check($$payload3, { class: "size-4" });
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]--></span> `;
        if (childrenProp) {
          $$payload3.out += "<!--[-->";
          childrenProp($$payload3, { selected, highlighted });
          $$payload3.out += `<!---->`;
        } else {
          $$payload3.out += "<!--[!-->";
          $$payload3.out += `${escape_html(label || value)}`;
        }
        $$payload3.out += `<!--]-->`;
      };
      Select_item$1($$payload2, spread_props([
        {
          value,
          class: cn("data-[highlighted]:bg-neutral-4 data-[highlighted]:text-neutral-10 relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)
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
function Select_trigger($$payload, $$props) {
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
    Select_trigger$1($$payload2, spread_props([
      {
        class: cn("border-neutral-7 bg-neutral-1 ring-offset-neutral-1 data-[placeholder]:text-neutral-11 focus:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className)
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
          children?.($$payload3);
          $$payload3.out += `<!----> `;
          Chevron_down($$payload3, { class: "size-4 opacity-50" });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
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
const Root = Select;
const Group = Select_group;
export {
  Check as C,
  Group as G,
  Icon as I,
  Mounted as M,
  Root as R,
  Select_trigger as S,
  Select_content as a,
  Select_item as b,
  chunk as c,
  useSelectGroupHeading as d,
  isValidIndex as i,
  useDOMTypeahead as u,
  wrapArray as w
};
