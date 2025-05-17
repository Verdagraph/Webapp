import { o as once, p as push, b as bind_props, a as pop, d as spread_attributes, e as copy_payload, f as assign_payload, g as spread_props, z as sanitize_props, A as slot } from "./index2.js";
import { u as useDOMTypeahead, M as Mounted, w as wrapArray, I as Icon, C as Check } from "./index7.js";
import { f as box, u as useRefById, b as getDataOpenClosed, a as getDataDisabled, d as getAriaExpanded, c as getAriaDisabled, m as mergeProps, h as getAriaChecked, i as getAriaOrientation, e as useId } from "./use-id.js";
import { A as ARROW_RIGHT, e as ARROW_LEFT, E as ENTER, S as SPACE, f as ARROW_DOWN, g as PAGE_UP, H as HOME, h as ARROW_UP, i as PAGE_DOWN, j as END, c as createContext, k as isHTMLElement, a as afterTick, l as createCustomEvent, m as TAB, o as focusFirst, p as isElement, q as isElementOrSVGElement, n as noop, F as Floating_layer, r as Popper_layer_force_mount, s as Popper_layer, t as getFloatingContentCSSVars, u as Floating_layer_anchor, v as isBrowser } from "./index3.js";
import { c as cn } from "./shadcn.js";
import "clsx";
import { u as useRovingFocus } from "./use-roving-focus.svelte.js";
class Readable {
  #current;
  #start;
  constructor(initialValue, start) {
    this.#current = initialValue;
    this.#start = start;
  }
  #subscribers = 0;
  #stop = null;
  get current() {
    if (this.#subscribers === 0) {
      this.#subscribe(false);
      this.#unsubscribe();
    }
    return this.#current;
  }
  #subscribe(inEffect) {
    this.#stop = this.#start(
      (value) => {
        this.#current = value;
      },
      inEffect
    ) ?? null;
  }
  #unsubscribe() {
    if (this.#stop === null) return;
    this.#stop();
    this.#stop = null;
  }
}
const activeElement = new Readable(null, (set, insideEffect) => {
  function update() {
    return;
  }
  if (!insideEffect) return;
  document.addEventListener("focusin", update);
  document.addEventListener("focusout", update);
  return () => {
    document.removeEventListener("focusin", update);
    document.removeEventListener("focusout", update);
  };
});
function isFunction(value) {
  return typeof value === "function";
}
function extract(value, defaultValue) {
  if (isFunction(value)) {
    const getter = value;
    return getter() ?? defaultValue ?? getter();
  }
  return value ?? defaultValue ?? value;
}
class IsFocusWithin {
  #node;
  #target = once(() => extract(this.#node));
  constructor(node) {
    this.#node = node;
  }
  #current = once(() => {
    if (!this.#target() || !activeElement.current) return false;
    return this.#target().contains(activeElement.current);
  });
  get current() {
    return this.#current();
  }
}
const SELECTION_KEYS = [ENTER, SPACE];
const FIRST_KEYS = [ARROW_DOWN, PAGE_UP, HOME];
const LAST_KEYS = [ARROW_UP, PAGE_DOWN, END];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
const SUB_OPEN_KEYS = {
  ltr: [...SELECTION_KEYS, ARROW_RIGHT],
  rtl: [...SELECTION_KEYS, ARROW_LEFT]
};
const SUB_CLOSE_KEYS = {
  ltr: [ARROW_LEFT],
  rtl: [ARROW_RIGHT]
};
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getCheckedState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function isMouseEvent(event) {
  return event.pointerType === "mouse";
}
function makeHull(points) {
  const newPoints = points.slice();
  newPoints.sort(POINT_COMPARATOR);
  return makeHullPresorted(newPoints);
}
function makeHullPresorted(points) {
  if (points.length <= 1)
    return points.slice();
  const upperHull = [];
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    while (upperHull.length >= 2) {
      const q = upperHull[upperHull.length - 1];
      const r = upperHull[upperHull.length - 2];
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x))
        upperHull.pop();
      else
        break;
    }
    upperHull.push(p);
  }
  upperHull.pop();
  const lowerHull = [];
  for (let i = points.length - 1; i >= 0; i--) {
    const p = points[i];
    while (lowerHull.length >= 2) {
      const q = lowerHull[lowerHull.length - 1];
      const r = lowerHull[lowerHull.length - 2];
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x))
        lowerHull.pop();
      else
        break;
    }
    lowerHull.push(p);
  }
  lowerHull.pop();
  if (upperHull.length === 1 && lowerHull.length === 1 && upperHull[0].x === lowerHull[0].x && upperHull[0].y === lowerHull[0].y)
    return upperHull;
  else
    return upperHull.concat(lowerHull);
}
function POINT_COMPARATOR(a, b) {
  if (a.x < b.x)
    return -1;
  else if (a.x > b.x)
    return 1;
  else if (a.y < b.y)
    return -1;
  else if (a.y > b.y)
    return 1;
  else
    return 0;
}
function getPointsFromEl(el) {
  const rect = el.getBoundingClientRect();
  return [
    { x: rect.left, y: rect.top },
    { x: rect.right, y: rect.top },
    { x: rect.right, y: rect.bottom },
    { x: rect.left, y: rect.bottom }
  ];
}
function makeHullFromElements(els) {
  const points = els.flatMap((el) => getPointsFromEl(el));
  return makeHull(points);
}
function pointInPolygon(point, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersect = yi > point.y !== yj > point.y && point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi;
    if (intersect)
      inside = !inside;
  }
  return inside;
}
function isPointerInGraceArea(e, area) {
  if (!area)
    return false;
  return pointInPolygon({ x: e.clientX, y: e.clientY }, area);
}
const [setMenuRootContext, getMenuRootContext] = createContext("Menu.Root");
const [setMenuMenuContext, getMenuMenuContext] = createContext(["Menu.Root", "Menu.Sub"], "MenuContext");
const [setMenuContentContext, getMenuContentContext] = createContext("Menu.Content");
const [setMenuGroupContext, getMenuGroupContext] = createContext("Menu.Group");
const [
  setMenuRadioGroupContext,
  getMenuRadioGroupContext
] = createContext("Menu.RadioGroup");
const [dispatchMenuOpen, listenMenuOpen] = createCustomEvent("bitsmenuopen", { bubbles: false, cancelable: true });
class MenuRootState {
  onClose;
  variant;
  isUsingKeyboard = false;
  dir;
  constructor(props) {
    this.onClose = props.onClose;
    this.dir = props.dir;
    this.variant = props.variant;
  }
  getAttr(name) {
    return `data-${this.variant.current}-${name}`;
  }
}
class MenuMenuState {
  root;
  open;
  contentId = box.with(() => "");
  contentNode = null;
  triggerNode = null;
  parentMenu;
  constructor(props, root, parentMenu) {
    this.root = root;
    this.open = props.open;
    this.parentMenu = parentMenu;
  }
  toggleOpen() {
    this.open.current = !this.open.current;
  }
  onOpen() {
    this.open.current = true;
  }
  onClose() {
    this.open.current = false;
  }
}
class MenuContentState {
  #id;
  contentRef;
  parentMenu;
  search = "";
  #loop;
  #timer = 0;
  pointerGraceTimer = 0;
  #pointerGraceIntent = null;
  #pointerDir = "right";
  #lastPointerX = 0;
  #handleTypeaheadSearch;
  rovingFocusGroup;
  isMounted;
  isFocusWithin = new IsFocusWithin(() => this.parentMenu.contentNode ?? void 0);
  constructor(props, parentMenu) {
    this.#id = props.id;
    this.#loop = props.loop;
    this.parentMenu = parentMenu;
    this.parentMenu.contentId = props.id;
    this.contentRef = props.ref;
    this.isMounted = props.isMounted;
    this.onkeydown = this.onkeydown.bind(this);
    this.onblur = this.onblur.bind(this);
    this.onpointermove = this.onpointermove.bind(this);
    this.onfocus = this.onfocus.bind(this);
    this.handleInteractOutside = this.handleInteractOutside.bind(this);
    useRefById({
      id: this.#id,
      ref: this.contentRef,
      deps: () => this.parentMenu.open.current,
      onRefChange: (node) => {
        if (this.parentMenu.contentNode !== node) {
          this.parentMenu.contentNode = node;
        }
      }
    });
    this.#handleTypeaheadSearch = useDOMTypeahead().handleTypeaheadSearch;
    this.rovingFocusGroup = useRovingFocus({
      rootNodeId: this.parentMenu.contentId,
      candidateAttr: this.parentMenu.root.getAttr("item"),
      loop: this.#loop,
      orientation: box.with(() => "vertical")
    });
  }
  #getCandidateNodes() {
    const node = this.parentMenu.contentNode;
    if (!node) return [];
    const candidates = Array.from(node.querySelectorAll(`[${this.parentMenu.root.getAttr("item")}]:not([data-disabled])`));
    return candidates;
  }
  #isPointerMovingToSubmenu(e) {
    const isMovingTowards = this.#pointerDir === this.#pointerGraceIntent?.side;
    return isMovingTowards && isPointerInGraceArea(e, this.#pointerGraceIntent?.area);
  }
  onPointerGraceIntentChange(intent) {
    this.#pointerGraceIntent = intent;
  }
  onkeydown(e) {
    if (e.defaultPrevented) return;
    const target = e.target;
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(target) || !isHTMLElement(currentTarget)) return;
    const isKeydownInside = target.closest(`[${this.parentMenu.root.getAttr("content")}]`)?.id === this.parentMenu.contentId.current;
    const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
    const isCharacterKey = e.key.length === 1;
    const kbdFocusedEl = this.rovingFocusGroup.handleKeydown(target, e);
    if (kbdFocusedEl) return;
    if (e.code === "Space") return;
    const candidateNodes = this.#getCandidateNodes();
    if (isKeydownInside) {
      if (e.key === TAB) e.preventDefault();
      if (!isModifierKey && isCharacterKey) {
        this.#handleTypeaheadSearch(e.key, candidateNodes);
      }
    }
    if (e.target?.id !== this.parentMenu.contentId.current) return;
    if (!FIRST_LAST_KEYS.includes(e.key)) return;
    e.preventDefault();
    if (LAST_KEYS.includes(e.key)) {
      candidateNodes.reverse();
    }
    focusFirst(candidateNodes);
  }
  onblur(e) {
    if (!isElement(e.currentTarget)) return;
    if (!isElement(e.target)) return;
    if (!e.currentTarget.contains?.(e.target)) {
      window.clearTimeout(this.#timer);
      this.search = "";
    }
  }
  onfocus(_) {
    if (!this.parentMenu.root.isUsingKeyboard) return;
    afterTick(() => this.rovingFocusGroup.focusFirstCandidate());
  }
  onpointermove(e) {
    if (!isMouseEvent(e)) return;
    const target = e.target;
    if (!isElement(target)) return;
    const pointerXHasChanged = this.#lastPointerX !== e.clientX;
    const currentTarget = e.currentTarget;
    if (!isElement(currentTarget)) return;
    if (currentTarget.contains(target) && pointerXHasChanged) {
      const newDir = e.clientX > this.#lastPointerX ? "right" : "left";
      this.#pointerDir = newDir;
      this.#lastPointerX = e.clientX;
    }
  }
  onItemEnter(e) {
    if (this.#isPointerMovingToSubmenu(e)) return true;
    return false;
  }
  onItemLeave(e) {
    if (this.#isPointerMovingToSubmenu(e)) return;
    const contentNode = this.parentMenu.contentNode;
    contentNode?.focus();
    this.rovingFocusGroup.setCurrentTabStopId("");
  }
  onTriggerLeave(e) {
    if (this.#isPointerMovingToSubmenu(e)) return true;
    return false;
  }
  onOpenAutoFocus = (e) => {
    if (e.defaultPrevented) return;
    e.preventDefault();
    const contentNode = this.parentMenu.contentNode;
    contentNode?.focus();
  };
  handleInteractOutside(e) {
    if (!isElementOrSVGElement(e.target)) return;
    const triggerId = this.parentMenu.triggerNode?.id;
    if (e.target.id === triggerId) {
      e.preventDefault();
      return;
    }
    if (e.target.closest(`#${triggerId}`)) {
      e.preventDefault();
    }
  }
  #snippetProps = once(() => ({ open: this.parentMenu.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  #props = once(() => ({
    id: this.#id.current,
    role: "menu",
    "aria-orientation": getAriaOrientation("vertical"),
    [this.parentMenu.root.getAttr("content")]: "",
    "data-state": getDataOpenClosed(this.parentMenu.open.current),
    onkeydown: this.onkeydown,
    onblur: this.onblur,
    onpointermove: this.onpointermove,
    onfocus: this.onfocus,
    dir: this.parentMenu.root.dir.current,
    style: { pointerEvents: "auto" }
  }));
  get props() {
    return this.#props();
  }
}
class MenuItemSharedState {
  content;
  ref;
  id;
  disabled;
  #isFocused = false;
  constructor(props, content) {
    this.content = content;
    this.id = props.id;
    this.disabled = props.disabled;
    this.ref = props.ref;
    this.onpointermove = this.onpointermove.bind(this);
    this.onpointerleave = this.onpointerleave.bind(this);
    this.onfocus = this.onfocus.bind(this);
    this.onblur = this.onblur.bind(this);
    useRefById({
      id: this.id,
      ref: this.ref,
      deps: () => this.content.isMounted.current
    });
  }
  onpointermove(e) {
    if (e.defaultPrevented) return;
    if (!isMouseEvent(e)) return;
    if (this.disabled.current) {
      this.content.onItemLeave(e);
    } else {
      const defaultPrevented = this.content.onItemEnter(e);
      if (defaultPrevented) return;
      const item = e.currentTarget;
      if (!isHTMLElement(item)) return;
      item.focus();
    }
  }
  onpointerleave(e) {
    afterTick(() => {
      if (e.defaultPrevented) return;
      if (!isMouseEvent(e)) return;
      this.content.onItemLeave(e);
    });
  }
  onfocus(e) {
    afterTick(() => {
      if (e.defaultPrevented || this.disabled.current) return;
      this.#isFocused = true;
    });
  }
  onblur(e) {
    afterTick(() => {
      if (e.defaultPrevented) return;
      this.#isFocused = false;
    });
  }
  #props = once(() => ({
    id: this.id.current,
    tabindex: -1,
    role: "menuitem",
    "aria-disabled": getAriaDisabled(this.disabled.current),
    "data-disabled": getDataDisabled(this.disabled.current),
    "data-highlighted": this.#isFocused ? "" : void 0,
    [this.content.parentMenu.root.getAttr("item")]: "",
    //
    onpointermove: this.onpointermove,
    onpointerleave: this.onpointerleave,
    onfocus: this.onfocus,
    onblur: this.onblur
  }));
  get props() {
    return this.#props();
  }
}
class MenuItemState {
  #item;
  #onSelect;
  #closeOnSelect;
  #isPointerDown = false;
  root;
  constructor(props, item) {
    this.#item = item;
    this.root = item.content.parentMenu.root;
    this.#onSelect = props.onSelect;
    this.#closeOnSelect = props.closeOnSelect;
    this.onkeydown = this.onkeydown.bind(this);
    this.onclick = this.onclick.bind(this);
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onpointerup = this.onpointerup.bind(this);
  }
  #handleSelect() {
    if (this.#item.disabled.current) return;
    const selectEvent = new CustomEvent("menuitemselect", { bubbles: true, cancelable: true });
    this.#onSelect.current(selectEvent);
    afterTick(() => {
      if (selectEvent.defaultPrevented) {
        this.#item.content.parentMenu.root.isUsingKeyboard = false;
        return;
      }
      if (this.#closeOnSelect.current) {
        this.#item.content.parentMenu.root.onClose();
      }
    });
  }
  onkeydown(e) {
    const isTypingAhead = this.#item.content.search !== "";
    if (this.#item.disabled.current || isTypingAhead && e.key === SPACE) return;
    if (SELECTION_KEYS.includes(e.key)) {
      if (!isHTMLElement(e.currentTarget)) return;
      e.currentTarget.click();
      e.preventDefault();
    }
  }
  onclick(_) {
    if (this.#item.disabled.current) return;
    this.#handleSelect();
  }
  onpointerup(e) {
    if (e.defaultPrevented) return;
    if (!this.#isPointerDown) {
      if (!isHTMLElement(e.currentTarget)) return;
      e.currentTarget?.click();
    }
  }
  onpointerdown(_) {
    this.#isPointerDown = true;
  }
  #props = once(() => mergeProps(this.#item.props, {
    onclick: this.onclick,
    onpointerdown: this.onpointerdown,
    onpointerup: this.onpointerup,
    onkeydown: this.onkeydown
  }));
  get props() {
    return this.#props();
  }
}
class MenuSubTriggerState {
  #item;
  // The menu this sub-trigger item belongs within
  #content;
  // the menu this sub-trigger item opens
  #submenu;
  #openTimer = null;
  constructor(item, content, submenu) {
    this.#item = item;
    this.#content = content;
    this.#submenu = submenu;
    this.onpointerleave = this.onpointerleave.bind(this);
    this.onpointermove = this.onpointermove.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    this.onclick = this.onclick.bind(this);
    useRefById({
      id: this.#item.id,
      ref: this.#item.ref,
      onRefChange: (node) => {
        this.#submenu.triggerNode = node;
      }
    });
  }
  #clearOpenTimer() {
    if (this.#openTimer === null) return;
    window.clearTimeout(this.#openTimer);
    this.#openTimer = null;
  }
  onpointermove(e) {
    if (!isMouseEvent(e)) return;
    const defaultPrevented = this.#content.onItemEnter(e);
    if (defaultPrevented) return;
    if (!this.#item.disabled.current && !this.#submenu.open.current && !this.#openTimer) {
      this.#content.onPointerGraceIntentChange(null);
      this.#openTimer = window.setTimeout(
        () => {
          this.#submenu.onOpen();
          this.#clearOpenTimer();
        },
        100
      );
    }
  }
  onpointerleave(e) {
    if (!isMouseEvent(e)) return;
    this.#clearOpenTimer();
    const contentNode = this.#submenu.contentNode;
    const subTriggerNode = this.#item.ref.current;
    if (contentNode && subTriggerNode) {
      const polygon = makeHullFromElements([subTriggerNode, contentNode]);
      const side = contentNode?.dataset.side;
      this.#content.onPointerGraceIntentChange({ area: polygon, side });
      window.clearTimeout(this.#content.pointerGraceTimer);
      this.#content.pointerGraceTimer = window.setTimeout(() => this.#content.onPointerGraceIntentChange(null), 300);
    } else {
      const defaultPrevented = this.#content.onTriggerLeave(e);
      if (defaultPrevented) return;
      this.#content.onPointerGraceIntentChange(null);
    }
  }
  onkeydown(e) {
    const isTypingAhead = this.#content.search !== "";
    if (this.#item.disabled.current || isTypingAhead && e.key === SPACE) return;
    if (SUB_OPEN_KEYS[this.#submenu.root.dir.current].includes(e.key)) {
      this.#submenu.onOpen();
      afterTick(() => {
        const contentNode = this.#submenu.contentNode;
        if (!contentNode) return;
        dispatchMenuOpen(contentNode);
      });
      e.preventDefault();
    }
  }
  onclick(e) {
    if (this.#item.disabled.current) return;
    if (!isHTMLElement(e.currentTarget)) return;
    e.currentTarget.focus();
    if (!this.#submenu.open.current) {
      this.#submenu.onOpen();
    }
  }
  #props = once(() => mergeProps(
    {
      "aria-haspopup": "menu",
      "aria-expanded": getAriaExpanded(this.#submenu.open.current),
      "data-state": getDataOpenClosed(this.#submenu.open.current),
      "aria-controls": this.#submenu.open.current ? this.#submenu.contentId.current : void 0,
      [this.#submenu.root.getAttr("sub-trigger")]: "",
      onclick: this.onclick,
      onpointermove: this.onpointermove,
      onpointerleave: this.onpointerleave,
      onkeydown: this.onkeydown
    },
    this.#item.props
  ));
  get props() {
    return this.#props();
  }
}
class MenuCheckboxItemState {
  #item;
  #checked;
  #indeterminate;
  constructor(props, item) {
    this.#item = item;
    this.#checked = props.checked;
    this.#indeterminate = props.indeterminate;
  }
  toggleChecked() {
    if (this.#indeterminate.current) {
      this.#indeterminate.current = false;
      this.#checked.current = true;
    } else {
      this.#checked.current = !this.#checked.current;
    }
  }
  #snippetProps = once(() => ({
    checked: this.#checked.current,
    indeterminate: this.#indeterminate.current
  }));
  get snippetProps() {
    return this.#snippetProps();
  }
  #props = once(() => ({
    ...this.#item.props,
    role: "menuitemcheckbox",
    "aria-checked": getAriaChecked(this.#checked.current, this.#indeterminate.current),
    "data-state": getCheckedState(this.#checked.current),
    [this.#item.root.getAttr("checkbox-item")]: ""
  }));
  get props() {
    return this.#props();
  }
}
class MenuGroupState {
  #id;
  #ref;
  groupHeadingId = void 0;
  root;
  constructor(props, root) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.root = root;
    useRefById({ id: this.#id, ref: this.#ref });
  }
  #props = once(() => ({
    id: this.#id.current,
    role: "group",
    "aria-labelledby": this.groupHeadingId,
    [this.root.getAttr("group")]: ""
  }));
  get props() {
    return this.#props();
  }
}
class MenuGroupHeadingState {
  #id;
  #ref;
  #group;
  constructor(props, group) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.#group = group;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        this.#group.groupHeadingId = node?.id;
      }
    });
  }
  #props = once(() => ({
    id: this.#id.current,
    role: "group",
    [this.#group.root.getAttr("group-heading")]: ""
  }));
  get props() {
    return this.#props();
  }
}
class MenuSeparatorState {
  #id;
  #ref;
  #root;
  constructor(props, root) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.#root = root;
    useRefById({ id: this.#id, ref: this.#ref });
  }
  #props = once(() => ({
    id: this.#id.current,
    role: "group",
    [this.#root.getAttr("separator")]: ""
  }));
  get props() {
    return this.#props();
  }
}
class MenuRadioGroupState {
  #id;
  value;
  #ref;
  content;
  groupHeadingId = null;
  root;
  constructor(props, content) {
    this.value = props.value;
    this.#id = props.id;
    this.#ref = props.ref;
    this.content = content;
    this.root = content.parentMenu.root;
    useRefById({ id: this.#id, ref: this.#ref });
  }
  setValue(v) {
    this.value.current = v;
  }
  #props = once(() => ({
    id: this.#id.current,
    [this.root.getAttr("radio-group")]: "",
    role: "group",
    "aria-labelledby": this.groupHeadingId
  }));
  get props() {
    return this.#props();
  }
}
class MenuRadioItemState {
  #id;
  #ref;
  #closeOnSelect;
  #item;
  #value;
  #group;
  #isChecked = once(() => this.#group.value.current === this.#value.current);
  get isChecked() {
    return this.#isChecked();
  }
  constructor(props, item, group) {
    this.#item = item;
    this.#id = props.id;
    this.#ref = props.ref;
    this.#group = group;
    this.#value = props.value;
    this.#closeOnSelect = props.closeOnSelect;
    useRefById({ id: this.#id, ref: this.#ref });
  }
  selectValue() {
    this.#group.setValue(this.#value.current);
  }
  #props = once(() => ({
    [this.#group.root.getAttr("radio-item")]: "",
    ...this.#item.props,
    role: "menuitemradio",
    "aria-checked": getAriaChecked(this.isChecked, false),
    "data-state": getCheckedState(this.isChecked)
  }));
  get props() {
    return this.#props();
  }
}
class DropdownMenuTriggerState {
  #id;
  #ref;
  #parentMenu;
  #disabled;
  constructor(props, parentMenu) {
    this.#ref = props.ref;
    this.#id = props.id;
    this.#parentMenu = parentMenu;
    this.#disabled = props.disabled;
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onpointerup = this.onpointerup.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (ref) => {
        this.#parentMenu.triggerNode = ref;
      }
    });
  }
  onpointerdown(e) {
    if (this.#disabled.current) return;
    if (e.pointerType === "touch") return e.preventDefault();
    if (e.button === 0 && e.ctrlKey === false) {
      this.#parentMenu.toggleOpen();
      if (!this.#parentMenu.open.current) e.preventDefault();
    }
  }
  onpointerup(e) {
    if (this.#disabled.current) return;
    if (e.pointerType === "touch") {
      e.preventDefault();
      this.#parentMenu.toggleOpen();
    }
  }
  onkeydown(e) {
    if (this.#disabled.current) return;
    if (e.key === SPACE || e.key === ENTER) {
      this.#parentMenu.toggleOpen();
      e.preventDefault();
      return;
    }
    if (e.key === ARROW_DOWN) {
      this.#parentMenu.onOpen();
      e.preventDefault();
    }
  }
  #ariaControls = once(() => {
    if (this.#parentMenu.open.current && this.#parentMenu.contentId.current) return this.#parentMenu.contentId.current;
    return void 0;
  });
  #props = once(() => ({
    id: this.#id.current,
    disabled: this.#disabled.current,
    "aria-haspopup": "menu",
    "aria-expanded": getAriaExpanded(this.#parentMenu.open.current),
    "aria-controls": this.#ariaControls(),
    "data-disabled": getDataDisabled(this.#disabled.current),
    "data-state": getDataOpenClosed(this.#parentMenu.open.current),
    [this.#parentMenu.root.getAttr("trigger")]: "",
    //
    onpointerdown: this.onpointerdown,
    onpointerup: this.onpointerup,
    onkeydown: this.onkeydown
  }));
  get props() {
    return this.#props();
  }
}
function useMenuRoot(props) {
  return setMenuRootContext(new MenuRootState(props));
}
function useMenuMenu(root, props) {
  const menu = new MenuMenuState(props, root);
  return setMenuMenuContext(menu);
}
function useMenuSubmenu(props) {
  const menu = getMenuMenuContext();
  return setMenuMenuContext(new MenuMenuState(props, menu.root, menu));
}
function useMenuSubTrigger(props) {
  const content = getMenuContentContext();
  const item = new MenuItemSharedState(props, content);
  const submenu = getMenuMenuContext();
  return new MenuSubTriggerState(item, content, submenu);
}
function useMenuDropdownTrigger(props) {
  const menu = getMenuMenuContext();
  return new DropdownMenuTriggerState(props, menu);
}
function useMenuContent(props) {
  const menu = getMenuMenuContext();
  return setMenuContentContext(new MenuContentState(props, menu));
}
function useMenuItem(props) {
  const content = getMenuContentContext();
  const item = new MenuItemSharedState(props, content);
  return new MenuItemState(props, item);
}
function useMenuCheckboxItem(props) {
  const content = getMenuContentContext();
  const item = new MenuItemState(props, new MenuItemSharedState(props, content));
  return new MenuCheckboxItemState(props, item);
}
function useMenuRadioGroup(props) {
  const content = getMenuContentContext();
  const radioGroup = new MenuRadioGroupState(props, content);
  return setMenuGroupContext(setMenuRadioGroupContext(radioGroup));
}
function useMenuRadioItem(props) {
  const radioGroup = getMenuRadioGroupContext();
  const sharedItem = new MenuItemSharedState(props, radioGroup.content);
  const item = new MenuItemState(props, sharedItem);
  return new MenuRadioItemState(props, item, radioGroup);
}
function useMenuGroup(props) {
  const root = getMenuRootContext();
  return setMenuGroupContext(new MenuGroupState(props, root));
}
function useMenuGroupHeading(props) {
  const group = getMenuGroupContext();
  return new MenuGroupHeadingState(props, group);
}
function useMenuSeparator(props) {
  const root = getMenuRootContext();
  return new MenuSeparatorState(props, root);
}
function Menu_sub($$payload, $$props) {
  push();
  let {
    open = false,
    onOpenChange = noop,
    controlledOpen = false,
    children
  } = $$props;
  useMenuSubmenu({
    open: box.with(() => open, (v) => {
      if (controlledOpen) {
        onOpenChange(v);
      } else {
        open = v;
        onOpenChange?.(v);
      }
    })
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
function Menu_item($$payload, $$props) {
  push();
  let {
    child,
    children,
    ref = null,
    id = useId(),
    disabled = false,
    onSelect = noop,
    closeOnSelect = true,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const itemState = useMenuItem({
    id: box.with(() => id),
    disabled: box.with(() => disabled),
    onSelect: box.with(() => onSelect),
    ref: box.with(() => ref, (v) => ref = v),
    closeOnSelect: box.with(() => closeOnSelect)
  });
  const mergedProps = mergeProps(restProps, itemState.props);
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
function Menu_group($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const groupState = useMenuGroup({
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
function Menu_radio_item($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    value,
    onSelect = noop,
    id = useId(),
    disabled = false,
    closeOnSelect = true,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const radioItemState = useMenuRadioItem({
    value: box.with(() => value),
    id: box.with(() => id),
    disabled: box.with(() => disabled),
    onSelect: box.with(() => handleSelect),
    ref: box.with(() => ref, (v) => ref = v),
    closeOnSelect: box.with(() => closeOnSelect)
  });
  function handleSelect(e) {
    onSelect(e);
    if (e.defaultPrevented) return;
    radioItemState.selectValue();
  }
  const mergedProps = mergeProps(restProps, radioItemState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, {
      props: mergedProps,
      checked: radioItemState.isChecked
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload, { checked: radioItemState.isChecked });
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Menu_separator($$payload, $$props) {
  push();
  let {
    ref = null,
    id = useId(),
    child,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const separatorState = useMenuSeparator({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, separatorState.props);
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
function Menu_radio_group($$payload, $$props) {
  push();
  let {
    id = useId(),
    children,
    child,
    ref = null,
    value = "",
    onValueChange = noop,
    controlledValue = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const radioGroupState = useMenuRadioGroup({
    value: box.with(() => value, (v) => {
      if (controlledValue) {
        onValueChange(v);
      } else {
        value = v;
        onValueChange(v);
      }
    }),
    ref: box.with(() => ref, (v) => ref = v),
    id: box.with(() => id)
  });
  const mergedProps = mergeProps(restProps, radioGroupState.props);
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
  bind_props($$props, { ref, value });
  pop();
}
function Menu_sub_content($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    children,
    child,
    loop = true,
    onInteractOutside = noop,
    forceMount = false,
    onEscapeKeydown = noop,
    interactOutsideBehavior = "defer-otherwise-close",
    escapeKeydownBehavior = "defer-otherwise-close",
    onOpenAutoFocus: onOpenAutoFocusProp = noop,
    onCloseAutoFocus: onCloseAutoFocusProp = noop,
    onFocusOutside = noop,
    side = "right",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let isMounted = false;
  const subContentState = useMenuContent({
    id: box.with(() => id),
    loop: box.with(() => loop),
    ref: box.with(() => ref, (v) => ref = v),
    isMounted: box.with(() => isMounted)
  });
  function onkeydown(e) {
    const isKeyDownInside = e.currentTarget.contains(e.target);
    const isCloseKey = SUB_CLOSE_KEYS[subContentState.parentMenu.root.dir.current].includes(e.key);
    if (isKeyDownInside && isCloseKey) {
      subContentState.parentMenu.onClose();
      const triggerNode = subContentState.parentMenu.triggerNode;
      triggerNode?.focus();
      e.preventDefault();
    }
  }
  const dataAttr = subContentState.parentMenu.root.getAttr("sub-content");
  const mergedProps = mergeProps(restProps, subContentState.props, { side, onkeydown, [dataAttr]: "" });
  function handleOpenAutoFocus(e) {
    onOpenAutoFocusProp(e);
    if (e.defaultPrevented) return;
    e.preventDefault();
    if (subContentState.parentMenu.root.isUsingKeyboard && subContentState.parentMenu.contentNode) {
      dispatchMenuOpen(subContentState.parentMenu.contentNode);
    }
  }
  function handleCloseAutoFocus(e) {
    onCloseAutoFocusProp(e);
    if (e.defaultPrevented) return;
    e.preventDefault();
  }
  function handleInteractOutside(e) {
    onInteractOutside(e);
    if (e.defaultPrevented) return;
    subContentState.parentMenu.onClose();
  }
  function handleEscapeKeydown(e) {
    onEscapeKeydown(e);
    if (e.defaultPrevented) return;
    subContentState.parentMenu.onClose();
  }
  function handleOnFocusOutside(e) {
    onFocusOutside(e);
    if (e.defaultPrevented) return;
    if (!isHTMLElement(e.target)) return;
    if (e.target.id !== subContentState.parentMenu.triggerNode?.id) {
      subContentState.parentMenu.onClose();
    }
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (forceMount) {
      $$payload2.out += "<!--[-->";
      {
        let popper = function($$payload3, { props, wrapperProps }) {
          const finalProps = mergeProps(props, mergedProps, { style: getFloatingContentCSSVars("menu") });
          if (child) {
            $$payload3.out += "<!--[-->";
            child($$payload3, {
              props: finalProps,
              wrapperProps,
              ...subContentState.snippetProps
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
            interactOutsideBehavior,
            escapeKeydownBehavior,
            onCloseAutoFocus: handleCloseAutoFocus,
            onOpenAutoFocus: handleOpenAutoFocus,
            enabled: subContentState.parentMenu.open.current,
            onInteractOutside: handleInteractOutside,
            onEscapeKeydown: handleEscapeKeydown,
            onFocusOutside: handleOnFocusOutside,
            preventScroll: false,
            loop,
            trapFocus: false,
            popper,
            $$slots: { popper: true }
          }
        ]));
      }
    } else if (!forceMount) {
      $$payload2.out += "<!--[1-->";
      {
        let popper = function($$payload3, { props, wrapperProps }) {
          const finalProps = mergeProps(props, mergedProps, { style: getFloatingContentCSSVars("menu") });
          if (child) {
            $$payload3.out += "<!--[-->";
            child($$payload3, {
              props: finalProps,
              wrapperProps,
              ...subContentState.snippetProps
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
            interactOutsideBehavior,
            escapeKeydownBehavior,
            onCloseAutoFocus: handleCloseAutoFocus,
            onOpenAutoFocus: handleOpenAutoFocus,
            present: subContentState.parentMenu.open.current,
            onInteractOutside: handleInteractOutside,
            onEscapeKeydown: handleEscapeKeydown,
            onFocusOutside: handleOnFocusOutside,
            preventScroll: false,
            loop,
            trapFocus: false,
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
function Menu_sub_trigger($$payload, $$props) {
  push();
  let {
    id = useId(),
    disabled = false,
    ref = null,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const subTriggerState = useMenuSubTrigger({
    disabled: box.with(() => disabled),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, subTriggerState.props);
  Floating_layer_anchor($$payload, {
    id,
    children: ($$payload2) => {
      if (child) {
        $$payload2.out += "<!--[-->";
        child($$payload2, { props: mergedProps });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div${spread_attributes({ ...mergedProps })}>`;
        children?.($$payload2);
        $$payload2.out += `<!----></div>`;
      }
      $$payload2.out += `<!--]-->`;
    }
  });
  bind_props($$props, { ref });
  pop();
}
function Menu_checkbox_item($$payload, $$props) {
  push();
  let {
    child,
    children,
    ref = null,
    checked = false,
    id = useId(),
    onCheckedChange = noop,
    disabled = false,
    onSelect = noop,
    controlledChecked = false,
    closeOnSelect = true,
    indeterminate = false,
    controlledIndeterminate = false,
    onIndeterminateChange = noop,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const checkboxItemState = useMenuCheckboxItem({
    checked: box.with(() => checked, (v) => {
      if (controlledChecked) {
        onCheckedChange(v);
      } else {
        checked = v;
        onCheckedChange(v);
      }
    }),
    id: box.with(() => id),
    disabled: box.with(() => disabled),
    onSelect: box.with(() => handleSelect),
    ref: box.with(() => ref, (v) => ref = v),
    closeOnSelect: box.with(() => closeOnSelect),
    indeterminate: box.with(() => indeterminate, (v) => {
      if (controlledIndeterminate) {
        onIndeterminateChange(v);
      } else {
        indeterminate = v;
        onIndeterminateChange(v);
      }
    })
  });
  function handleSelect(e) {
    onSelect(e);
    if (e.defaultPrevented) return;
    checkboxItemState.toggleChecked();
  }
  const mergedProps = mergeProps(restProps, checkboxItemState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, {
      props: mergedProps,
      ...checkboxItemState.snippetProps
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload, checkboxItemState.snippetProps);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref, checked, indeterminate });
  pop();
}
function Menu$1($$payload, $$props) {
  push();
  let {
    open = false,
    dir = "ltr",
    onOpenChange = noop,
    controlledOpen = false,
    _internal_variant: variant = "dropdown-menu",
    children
  } = $$props;
  const root = useMenuRoot({
    variant: box.with(() => variant),
    dir: box.with(() => dir),
    onClose: () => {
      if (controlledOpen) {
        onOpenChange(false);
      } else {
        open = false;
        onOpenChange?.(false);
      }
    }
  });
  useMenuMenu(root, {
    open: box.with(() => open, (v) => {
      if (controlledOpen) {
        onOpenChange(v);
      } else {
        open = v;
        onOpenChange(v);
      }
    })
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
const ROOT_ATTR = "data-menubar-root";
const TRIGGER_ATTR = "data-menubar-trigger";
class MenubarRootState {
  id;
  ref;
  value;
  dir;
  loop;
  rovingFocusGroup;
  currentTabStopId = box(null);
  wasOpenedByKeyboard = false;
  triggerIds = [];
  valueToContentId = /* @__PURE__ */ new Map();
  constructor(props) {
    this.value = props.value;
    this.dir = props.dir;
    this.loop = props.loop;
    this.id = props.id;
    this.ref = props.ref;
    this.onMenuClose = this.onMenuClose.bind(this);
    this.onMenuOpen = this.onMenuOpen.bind(this);
    this.onMenuToggle = this.onMenuToggle.bind(this);
    this.registerTrigger = this.registerTrigger.bind(this);
    this.deRegisterTrigger = this.deRegisterTrigger.bind(this);
    useRefById({ id: this.id, ref: this.ref });
    this.rovingFocusGroup = useRovingFocus({
      rootNodeId: this.id,
      candidateAttr: TRIGGER_ATTR,
      loop: this.loop,
      orientation: box.with(() => "horizontal"),
      currentTabStopId: this.currentTabStopId
    });
  }
  registerTrigger(id) {
    this.triggerIds.push(id);
  }
  deRegisterTrigger(id) {
    this.triggerIds = this.triggerIds.filter((triggerId) => triggerId !== id);
  }
  getTriggers() {
    const node = this.ref.current;
    if (!node) return [];
    return Array.from(node.querySelectorAll(`[${TRIGGER_ATTR}]`));
  }
  onMenuOpen(id) {
    this.value.current = id;
    this.currentTabStopId.current = id;
  }
  onMenuClose() {
    this.value.current = "";
  }
  onMenuToggle(id) {
    this.value.current = this.value.current ? "" : id;
  }
  #props = once(() => ({
    id: this.id.current,
    role: "menubar",
    [ROOT_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
}
class MenubarMenuState {
  root;
  value;
  #open = once(() => this.root.value.current === this.value.current);
  get open() {
    return this.#open();
  }
  wasOpenedByKeyboard = false;
  triggerNode = null;
  contentNode = null;
  constructor(props, root) {
    this.value = props.value;
    this.root = root;
  }
  getTriggerNode() {
    if (!isBrowser) return null;
    return this.triggerNode;
  }
}
class MenubarTriggerState {
  id;
  ref;
  disabled;
  menu;
  root;
  isFocused = false;
  #tabIndex = 0;
  constructor(props, menu) {
    this.disabled = props.disabled;
    this.menu = menu;
    this.id = props.id;
    this.ref = props.ref;
    this.root = menu.root;
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onpointerenter = this.onpointerenter.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    this.onfocus = this.onfocus.bind(this);
    this.onblur = this.onblur.bind(this);
    useRefById({
      id: this.id,
      ref: this.ref,
      onRefChange: (node) => {
        this.menu.triggerNode = node;
      }
    });
  }
  onpointerdown(e) {
    if (!this.disabled.current && e.button === 0 && e.ctrlKey === false) {
      if (!this.menu.open) {
        e.preventDefault();
      }
      this.root.onMenuOpen(this.menu.value.current);
    }
  }
  onpointerenter(_) {
    const isMenubarOpen = Boolean(this.root.value.current);
    if (isMenubarOpen && !this.menu.open) {
      this.root.onMenuOpen(this.menu.value.current);
      this.menu.getTriggerNode()?.focus();
    }
  }
  onkeydown(e) {
    if (this.disabled.current) return;
    if (e.key === ENTER || e.key === SPACE) {
      this.root.onMenuToggle(this.menu.value.current);
    }
    if (e.key === ARROW_DOWN) {
      this.root.onMenuOpen(this.menu.value.current);
    }
    if (e.key === ENTER || e.key === SPACE || e.key === ARROW_DOWN) {
      this.menu.wasOpenedByKeyboard = true;
      e.preventDefault();
    }
    this.root.rovingFocusGroup.handleKeydown(this.menu.getTriggerNode(), e);
  }
  onfocus(_) {
    this.isFocused = true;
  }
  onblur(_) {
    this.isFocused = false;
  }
  #props = once(() => ({
    type: "button",
    role: "menuitem",
    id: this.id.current,
    "aria-haspopup": "menu",
    "aria-expanded": getAriaExpanded(this.menu.open),
    "aria-controls": this.menu.open ? this.menu.contentNode?.id : void 0,
    "data-highlighted": this.isFocused ? "" : void 0,
    "data-state": getDataOpenClosed(this.menu.open),
    "data-disabled": getDataDisabled(this.disabled.current),
    "data-menu-value": this.menu.value.current,
    disabled: this.disabled.current ? true : void 0,
    tabIndex: this.#tabIndex,
    [TRIGGER_ATTR]: "",
    onpointerdown: this.onpointerdown,
    onpointerenter: this.onpointerenter,
    onkeydown: this.onkeydown,
    onfocus: this.onfocus,
    onblur: this.onblur
  }));
  get props() {
    return this.#props();
  }
}
class MenubarContentState {
  id;
  ref;
  menu;
  root;
  hasInteractedOutside = false;
  interactOutsideBehavior;
  constructor(props, menu) {
    this.interactOutsideBehavior = props.interactOutsideBehavior;
    this.menu = menu;
    this.id = props.id;
    this.ref = props.ref;
    this.root = menu.root;
    this.onCloseAutoFocus = this.onCloseAutoFocus.bind(this);
    this.onFocusOutside = this.onFocusOutside.bind(this);
    this.onInteractOutside = this.onInteractOutside.bind(this);
    this.onOpenAutoFocus = this.onOpenAutoFocus.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    useRefById({
      id: this.id,
      ref: this.ref,
      onRefChange: (node) => {
        this.menu.contentNode = node;
      },
      deps: () => this.menu.open
    });
  }
  onCloseAutoFocus(e) {
    const menubarOpen = Boolean(this.root.value.current);
    if (!menubarOpen && !this.hasInteractedOutside) {
      this.menu.getTriggerNode()?.focus();
    }
    this.hasInteractedOutside = false;
    e.preventDefault();
  }
  onFocusOutside(e) {
    const target = e.target;
    const isMenubarTrigger = this.root.getTriggers().some((trigger) => trigger.contains(target));
    if (isMenubarTrigger) e.preventDefault();
  }
  onInteractOutside() {
    this.hasInteractedOutside = true;
  }
  onOpenAutoFocus() {
    afterTick(() => this.ref.current?.focus());
  }
  onkeydown(e) {
    if (e.key !== ARROW_LEFT && e.key !== ARROW_RIGHT) return;
    const target = e.target;
    const targetIsSubTrigger = target.hasAttribute("data-menu-sub-trigger");
    const isKeydownInsideSubMenu = target.closest("[data-menu-content]") !== e.currentTarget;
    const prevMenuKey = this.root.dir.current === "rtl" ? ARROW_RIGHT : ARROW_LEFT;
    const isPrevKey = prevMenuKey === e.key;
    const isNextKey = !isPrevKey;
    if (isNextKey && targetIsSubTrigger) return;
    if (isKeydownInsideSubMenu && isPrevKey) return;
    const items = this.root.getTriggers().filter((trigger) => !trigger.disabled);
    let candidateValues = items.map((item) => item.getAttribute("data-menu-value"));
    if (isPrevKey) candidateValues.reverse();
    const currentIndex = candidateValues.indexOf(this.menu.value.current);
    candidateValues = this.root.loop.current ? wrapArray(candidateValues, currentIndex + 1) : candidateValues.slice(currentIndex + 1);
    const [nextValue] = candidateValues;
    if (nextValue) this.root.onMenuOpen(nextValue);
  }
  #props = once(() => ({
    id: this.id.current,
    "aria-labelledby": this.menu.triggerNode?.id,
    style: {
      "--bits-menubar-content-transform-origin": "var(--bits-floating-transform-origin)",
      "--bits-menubar-content-available-width": "var(--bits-floating-available-width)",
      "--bits-menubar-content-available-height": "var(--bits-floating-available-height)",
      "--bits-menubar-anchor-width": "var(--bits-floating-anchor-width)",
      "--bits-menubar-anchor-height": "var(--bits-floating-anchor-height)"
    },
    onkeydown: this.onkeydown,
    "data-menu-content": ""
  }));
  get props() {
    return this.#props();
  }
}
const [setMenubarRootContext, getMenubarRootContext] = createContext("Menubar.Root");
const [setMenubarMenuContext, getMenubarMenuContext] = createContext("Menubar.Menu");
function useMenubarRoot(props) {
  return setMenubarRootContext(new MenubarRootState(props));
}
function useMenubarMenu(props) {
  return setMenubarMenuContext(new MenubarMenuState(props, getMenubarRootContext()));
}
function useMenubarTrigger(props) {
  return new MenubarTriggerState(props, getMenubarMenuContext());
}
function useMenubarContent(props) {
  return new MenubarContentState(props, getMenubarMenuContext());
}
function Menubar$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    children,
    child,
    ref = null,
    value = "",
    dir = "ltr",
    loop = true,
    onValueChange = noop,
    controlledValue = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = useMenubarRoot({
    id: box.with(() => id),
    value: box.with(() => value, (v) => {
      if (controlledValue) {
        onValueChange(v);
      } else {
        value = v;
        onValueChange?.(v);
      }
    }),
    dir: box.with(() => dir),
    loop: box.with(() => loop),
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
  bind_props($$props, { ref });
  pop();
}
function Menubar_menu($$payload, $$props) {
  push();
  let {
    value = useId(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const menuState = useMenubarMenu({ value: box.with(() => value) });
  Menu$1($$payload, spread_props([
    {
      open: menuState.open,
      onOpenChange: (open) => {
        if (!open) menuState.root.onMenuClose();
      },
      dir: menuState.root.dir.current,
      _internal_variant: "menubar"
    },
    restProps
  ]));
  pop();
}
function Menu_content($$payload, $$props) {
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
  const mergedProps = mergeProps(restProps, contentState.props, { style: { outline: "none" } });
  function handleInteractOutside(e) {
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
            style: {
              outline: "none",
              ...getFloatingContentCSSVars("menu")
            }
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
            style: {
              outline: "none",
              ...getFloatingContentCSSVars("menu")
            }
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
function Menubar_content$1($$payload, $$props) {
  push();
  let {
    ref = null,
    interactOutsideBehavior = "close",
    id = useId(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = useMenubarContent({
    id: box.with(() => id),
    interactOutsideBehavior: box.with(() => interactOutsideBehavior),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, contentState.props);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Menu_content($$payload2, spread_props([
      mergedProps,
      {
        preventScroll: false,
        onInteractOutside: contentState.onInteractOutside,
        onFocusOutside: contentState.onFocusOutside,
        onCloseAutoFocus: contentState.onCloseAutoFocus,
        onOpenAutoFocus: contentState.onOpenAutoFocus,
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
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
function Menubar_trigger$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    disabled = false,
    children,
    child,
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = useMenubarTrigger({
    id: box.with(() => id),
    disabled: box.with(() => disabled ?? false),
    ref: box.with(() => ref, (v) => ref = v)
  });
  useMenuDropdownTrigger({
    id: box.with(() => id),
    disabled: box.with(() => disabled ?? false),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, triggerState.props);
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
function Minus($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "M5 12h14" }]];
  Icon($$payload, spread_props([
    { name: "minus" },
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
function Circle($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "circle",
      { "cx": "12", "cy": "12", "r": "10" }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "circle" },
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
function Chevron_right($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "m9 18 6-6-6-6" }]];
  Icon($$payload, spread_props([
    { name: "chevron-right" },
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
function Menubar_checkbox_item($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    checked = false,
    indeterminate = false,
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
      let children = function($$payload3, { checked: checked2, indeterminate: indeterminate2 }) {
        $$payload3.out += `<span class="absolute left-2 flex size-3.5 items-center justify-center">`;
        if (indeterminate2) {
          $$payload3.out += "<!--[-->";
          Minus($$payload3, { class: "size-4" });
        } else {
          $$payload3.out += "<!--[!-->";
          Check($$payload3, {
            class: cn("size-4", !checked2 && "text-transparent")
          });
        }
        $$payload3.out += `<!--]--></span> `;
        childrenProp?.($$payload3);
        $$payload3.out += `<!---->`;
      };
      Menu_checkbox_item($$payload2, spread_props([
        {
          class: cn("data-[highlighted]:bg-accent-5 data-[highlighted]:text-accent-12 relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)
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
          get checked() {
            return checked;
          },
          set checked($$value) {
            checked = $$value;
            $$settled = false;
          },
          get indeterminate() {
            return indeterminate;
          },
          set indeterminate($$value) {
            indeterminate = $$value;
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
  bind_props($$props, { ref, checked, indeterminate });
  pop();
}
function Menubar_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    sideOffset = 8,
    alignOffset = -4,
    align = "start",
    side = "bottom",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Menubar_content$1($$payload2, spread_props([
      {
        sideOffset,
        align,
        alignOffset,
        side,
        class: cn("bg-neutral-2 text-neutral-11 z-50 min-w-[12rem] rounded-md border p-1 shadow-md focus:outline-none", className)
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
function Menubar_item($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    inset = void 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Menu_item($$payload2, spread_props([
      {
        class: cn("data-[highlighted]:bg-accent-5 data-[highlighted]:text-accent-12 relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50", inset && "pl-8", className)
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
function Menubar_radio_item($$payload, $$props) {
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
          class: cn("data-[highlighted]:bg-accent-5 data-[highlighted]:text-accent-12 relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)
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
function Menubar_separator($$payload, $$props) {
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
    Menu_separator($$payload2, spread_props([
      {
        class: cn("bg-neutral-3 -mx-1 my-1 h-px", className)
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
function Menubar_sub_content($$payload, $$props) {
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
    Menu_sub_content($$payload2, spread_props([
      {
        class: cn("bg-neutral-2 text-neutral-11 z-50 min-w-max rounded-md border p-1 focus:outline-none", className)
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
function Menubar_sub_trigger($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    inset = void 0,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Menu_sub_trigger($$payload2, spread_props([
      {
        class: cn("data-[highlighted]:bg-accent-5 data-[state=open]:bg-accent-5 data-[highlighted]:text-accent-12 data-[state=open]:text-accent-12 flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50", inset && "pl-8", className)
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
          Chevron_right($$payload3, { class: "ml-auto size-4" });
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
function Menubar_trigger($$payload, $$props) {
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
    Menubar_trigger$1($$payload2, spread_props([
      {
        class: cn("data-[highlighted]:bg-accent-5 data-[state=open]:bg-accent-5 data-[highlighted]:text-accent-12 data-[state=open]:text-accent-12 flex cursor-default select-none items-center rounded-none border-b px-3 py-1.5 text-sm font-medium outline-none", className)
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
function Menubar($$payload, $$props) {
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
    Menubar$1($$payload2, spread_props([
      {
        class: cn("bg-neutral-2 flex h-8 w-full items-center rounded-none border-b p-0", className)
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
const Menu = Menubar_menu;
const Group = Menu_group;
const Sub = Menu_sub;
const RadioGroup = Menu_radio_group;
export {
  Group as G,
  Menubar as M,
  RadioGroup as R,
  Sub as S,
  Menu as a,
  Menubar_trigger as b,
  Menubar_content as c,
  Menubar_item as d,
  Menubar_separator as e,
  Menubar_checkbox_item as f,
  Menubar_sub_trigger as g,
  Menubar_sub_content as h,
  Menubar_radio_item as i,
  useMenuGroupHeading as u
};
