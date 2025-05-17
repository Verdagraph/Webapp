import "clsx";
import { b as attr, a as pop, p as push, h as head, o as once, c as spread_attributes, d as bind_props, e as copy_payload, f as assign_payload, g as spread_props, j as stringify, s as setContext$1, k as hasContext, l as getContext$1, m as ensure_array_like, n as escape_html, q as attr_class, t as clsx } from "../../chunks/index2.js";
import { m as modeStorageKey, t as themeStorageKey, d as darkClassNames, l as lightClassNames, a as disableTransitions, b as themeColors, B as Button, c as derivedMode } from "../../chunks/button.js";
import { u as useRefById$1, g as getDataOrientation, a as getDataDisabled, b as getDataOpenClosed, c as getAriaDisabled, d as getAriaExpanded, e as useId$1, f as box, m as mergeProps } from "../../chunks/use-id.js";
import { I as IsMobile } from "../../chunks/isMobile.svelte.js";
import { h as html, I as Icon } from "../../chunks/Icon.js";
import { t as triplit, a as auth, u as userLogin } from "../../chunks/auth.svelte.js";
import { u as useQuery } from "../../chunks/index.svelte.js";
import { g as gardenQuery } from "../../chunks/queries.js";
import { g as gardenContext } from "../../chunks/gardenContext.svelte.js";
import { i as is_array, y as get_prototype_of, z as object_prototype } from "../../chunks/utils.js";
import { u as useDialogTrigger, D as Dialog, a as Dialog_content, b as Dialog_overlay } from "../../chunks/dialog-content.js";
import { i as iconIds } from "../../chunks/icons.js";
import { c as createContext$1, S as SPACE, E as ENTER, w as watch, a as afterTick, n as noop$1, P as Presence_layer, b as Portal, R as Root, T as Trigger$2, d as Popover_content } from "../../chunks/index3.js";
import { c as cn } from "../../chunks/shadcn.js";
import { u as useRovingFocus } from "../../chunks/use-roving-focus.svelte.js";
import { S as Separator } from "../../chunks/separator.js";
import { e as externalLinks } from "../../chunks/links.js";
import { m as mode } from "../../chunks/theme.svelte.js";
import { P as Provider } from "../../chunks/index4.js";
const empty = [];
function snapshot(value, skip_warning = false) {
  return clone(value, /* @__PURE__ */ new Map(), "", empty);
}
function clone(value, cloned, path, paths, original = null) {
  if (typeof value === "object" && value !== null) {
    var unwrapped = cloned.get(value);
    if (unwrapped !== void 0) return unwrapped;
    if (value instanceof Map) return (
      /** @type {Snapshot<T>} */
      new Map(value)
    );
    if (value instanceof Set) return (
      /** @type {Snapshot<T>} */
      new Set(value)
    );
    if (is_array(value)) {
      var copy = (
        /** @type {Snapshot<any>} */
        Array(value.length)
      );
      cloned.set(value, copy);
      if (original !== null) {
        cloned.set(original, copy);
      }
      for (var i = 0; i < value.length; i += 1) {
        var element = value[i];
        if (i in value) {
          copy[i] = clone(element, cloned, path, paths);
        }
      }
      return copy;
    }
    if (get_prototype_of(value) === object_prototype) {
      copy = {};
      cloned.set(value, copy);
      if (original !== null) {
        cloned.set(original, copy);
      }
      for (var key in value) {
        copy[key] = clone(value[key], cloned, path, paths);
      }
      return copy;
    }
    if (value instanceof Date) {
      return (
        /** @type {Snapshot<T>} */
        structuredClone(value)
      );
    }
    if (typeof /** @type {T & { toJSON?: any } } */
    value.toJSON === "function") {
      return clone(
        /** @type {T & { toJSON(): any } } */
        value.toJSON(),
        cloned,
        path,
        paths,
        // Associate the instance with the toJSON clone
        value
      );
    }
  }
  if (value instanceof EventTarget) {
    return (
      /** @type {Snapshot<T>} */
      value
    );
  }
  try {
    return (
      /** @type {Snapshot<T>} */
      structuredClone(value)
    );
  } catch (e) {
    return (
      /** @type {Snapshot<T>} */
      value
    );
  }
}
function defineConfig(config) {
  return config;
}
function setInitialMode({ defaultMode = "system", themeColors: themeColors2, darkClassNames: darkClassNames2 = ["dark"], lightClassNames: lightClassNames2 = [], defaultTheme = "", modeStorageKey: modeStorageKey2 = "mode-watcher-mode", themeStorageKey: themeStorageKey2 = "mode-watcher-theme" }) {
  const rootEl = document.documentElement;
  const mode2 = localStorage.getItem(modeStorageKey2) ?? defaultMode;
  const theme = localStorage.getItem(themeStorageKey2) ?? defaultTheme;
  const light = mode2 === "light" || mode2 === "system" && window.matchMedia("(prefers-color-scheme: light)").matches;
  if (light) {
    if (darkClassNames2.length)
      rootEl.classList.remove(...darkClassNames2.filter(Boolean));
    if (lightClassNames2.length)
      rootEl.classList.add(...lightClassNames2.filter(Boolean));
  } else {
    if (lightClassNames2.length)
      rootEl.classList.remove(...lightClassNames2.filter(Boolean));
    if (darkClassNames2.length)
      rootEl.classList.add(...darkClassNames2.filter(Boolean));
  }
  rootEl.style.colorScheme = light ? "light" : "dark";
  if (themeColors2) {
    const themeMetaEl = document.querySelector('meta[name="theme-color"]');
    if (themeMetaEl) {
      themeMetaEl.setAttribute("content", mode2 === "light" ? themeColors2.light : themeColors2.dark);
    }
  }
  if (theme) {
    rootEl.setAttribute("data-theme", theme);
    localStorage.setItem(themeStorageKey2, theme);
  }
  localStorage.setItem(modeStorageKey2, mode2);
}
function Mode_watcher_lite($$payload, $$props) {
  push();
  let { themeColors: themeColors2 } = $$props;
  if (themeColors2) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<meta name="theme-color"${attr("content", themeColors2.dark)}>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Mode_watcher_full($$payload, $$props) {
  push();
  let { trueNonce = "", initConfig, themeColors: themeColors2 } = $$props;
  head($$payload, ($$payload2) => {
    if (themeColors2) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<meta name="theme-color"${attr("content", themeColors2.dark)}>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> ${html(`<script${trueNonce ? ` nonce=${trueNonce}` : ""}>(` + setInitialMode.toString() + `)(` + JSON.stringify(initConfig) + `);<\/script>`)}`;
  });
  pop();
}
function Mode_watcher($$payload, $$props) {
  push();
  let {
    defaultMode = "system",
    themeColors: themeColorsProp,
    disableTransitions: disableTransitionsProp = true,
    darkClassNames: darkClassNamesProp = ["dark"],
    lightClassNames: lightClassNamesProp = [],
    defaultTheme = "",
    nonce = "",
    themeStorageKey: themeStorageKeyProp = "mode-watcher-theme",
    modeStorageKey: modeStorageKeyProp = "mode-watcher-mode",
    disableHeadScriptInjection = false
  } = $$props;
  modeStorageKey.current = modeStorageKeyProp;
  themeStorageKey.current = themeStorageKeyProp;
  darkClassNames.current = darkClassNamesProp;
  lightClassNames.current = lightClassNamesProp;
  disableTransitions.current = disableTransitionsProp;
  themeColors.current = themeColorsProp;
  const initConfig = defineConfig({
    defaultMode,
    themeColors: themeColorsProp,
    darkClassNames: darkClassNamesProp,
    lightClassNames: lightClassNamesProp,
    defaultTheme,
    modeStorageKey: modeStorageKeyProp,
    themeStorageKey: themeStorageKeyProp
  });
  const trueNonce = typeof window === "undefined" ? nonce : "";
  if (disableHeadScriptInjection) {
    $$payload.out += "<!--[-->";
    Mode_watcher_lite($$payload, { themeColors: themeColors.current });
  } else {
    $$payload.out += "<!--[!-->";
    Mode_watcher_full($$payload, {
      trueNonce,
      initConfig,
      themeColors: themeColors.current
    });
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Logo($$payload, $$props) {
  let { size = "6rem" } = $$props;
  $$payload.out += `<svg${attr("width", size)}${attr("height", size)} viewBox="0 0 185.3 195" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><defs><clipPath clipPathUnits="userSpaceOnUse" id="b"><path style="display:inline;fill:#4db24d;fill-opacity:1;stroke-width:.264583" d="M14.2 147.4s13.3 92 78 92.5c.2 0 1.4-12.4-4.6-18-1-.7-16.8 3.4-29.7-13.3h21.2s-5-13-39.3-42.3c0-.2 48.8 15.4 60 50.9.2 1.8 0 30.1 0 30.1l5.2.1V195s-14.6-47.2-90.8-47.5zm181.6 0s-13.3 92-78 92.5c-.2 0-1.4-12.4 4.6-18 1-.7 16.8 3.4 29.7-13.3h-21.2s5-13 39.3-42.3c0-.2-48.8 15.4-60 50.9-.2 1.8 0 30.1 0 30.1l-5.2.1V195s14.6-47.2 90.8-47.5z"></path></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="c"><path style="display:inline;fill:#4db24d;fill-opacity:1;stroke-width:.264583" d="M14.2 147.4s13.3 92 78 92.5c.2 0 1.4-12.4-4.6-18-1-.7-16.8 3.4-29.7-13.3h21.2s-5-13-39.3-42.3c0-.2 48.8 15.4 60 50.9.2 1.8 0 30.1 0 30.1l5.2.1V195s-14.6-47.2-90.8-47.5zm181.6 0s-13.3 92-78 92.5c-.2 0-1.4-12.4 4.6-18 1-.7 16.8 3.4 29.7-13.3h-21.2s5-13 39.3-42.3c0-.2-48.8 15.4-60 50.9-.2 1.8 0 30.1 0 30.1l-5.2.1V195s14.6-47.2 90.8-47.5z"></path></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="a"><path d="M205 147.4a100 100 0 1 1-200 0 100 100 0 0 1 200 0zm-200 0a100 100 0 1 0 200 0 100 100 0 0 0-200 0zm0 0a100 100 0 1 0 200 0 100 100 0 0 0-200 0zm200 0a100 100 0 1 1-200 0 100 100 0 0 1 200 0z" style="display:inline;fill:#000;stroke-width:.234257"></path></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="d"><circle style="display:inline;fill:#000;stroke-width:.269395" cx="122.3" cy="167.1" r="115"></circle></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="f"><path d="M205 147.4a100 100 0 0 1-100 100 100 100 0 0 1-100-100 100 100 0 0 1 100-100 100 100 0 0 1 100 100z" style="display:inline;fill:#000;stroke-width:.234257"></path></clipPath><clipPath clipPathUnits="userSpaceOnUse" id="e"><circle style="display:inline;fill:navy;stroke-width:.128841" cx="105" cy="147.4" r="55"></circle></clipPath></defs><g style="display:inline"><path style="display:inline;fill:#4db24d;fill-opacity:1;stroke-width:.264583" d="M14.2 147.4s13.3 92 78 92.5c.2 0 1.4-12.4-4.6-18-1-.7-16.8 3.4-29.7-13.3h21.2s-5-13-39.3-42.3c0-.2 48.8 15.4 60 50.9.2 1.8 0 30.1 0 30.1l5.2.1V195s-14.6-47.2-90.8-47.5zm181.6 0s-13.3 92-78 92.5c-.2 0-1.4-12.4 4.6-18 1-.7 16.8 3.4 29.7-13.3h-21.2s5-13 39.3-42.3c0-.2-48.8 15.4-60 50.9-.2 1.8 0 30.1 0 30.1l-5.2.1V195s14.6-47.2 90.8-47.5z" transform="translate(-12.3 -52.4)"></path><path style="display:inline;opacity:1;fill:#1f5723;fill-opacity:1;stroke-width:.264583" d="M14 156.2s25.6 78.3 77.6 73.3c1.3 0 4.4 27.4 4.4 27.4l9 .3v8.7l-78.3-37.6Zm182 0s-25.6 78.3-77.6 73.3c-1.3 0-4.4 27.4-4.4 27.4l-9 .3v8.7l78.3-37.6z" clip-path="url(#b)" transform="translate(-12.3 -52.4)"></path><path style="display:inline;opacity:1;fill:#60ce3c;fill-opacity:1;stroke-width:.264583" d="M26 147.9c-68.9-11.4 72-7.3 72.4-7.9.4-.5 6.6-.2 6.6-.2v62c-7-2.3-2.8-41.3-79-54zm158 0c68.9-11.4-72-7.3-72.4-7.9-.4-.5-6.6-.2-6.6-.2v62c7-2.3 2.8-41.3 79-54z" clip-path="url(#c)" transform="translate(-12.3 -52.4)"></path></g><g style="display:inline"><path style="display:inline;fill:red;fill-opacity:1;stroke-width:.264583" d="M78.2 147.4s11.9-13 26.8-13v29zm53.6 0s-11.9-13-26.8-13v29z" transform="translate(-12.3 -52.4)"></path><path style="display:inline;fill:red;stroke-width:.222544" d="M34.5 83.7a94.7 94.7 0 0 0-22.2 42.8l9.3 2.2a85.3 85.3 0 0 1 20.3-39zm141 0-7.4 6a85.3 85.3 0 0 1 20.3 39l9.3-2.2a94.7 94.7 0 0 0-22.2-42.8Z" transform="translate(-12.3 -52.4)"></path><path style="display:inline;fill:red;fill-opacity:1;stroke-width:.264583" d="M105 52.4a94.7 94.7 0 0 0-33.6 6.2l3.4 8.8a85.3 85.3 0 0 1 60.3 0h.1l3.4-8.8a94.7 94.7 0 0 0-33.6-6.2Z" transform="translate(-12.3 -52.4)"></path><path style="display:inline;fill:red;stroke-width:.222251" d="m77.2 61.2-5 2-4.5 2.7 10.2 18.9 2.3 4.2 2.1 4 7-3.4a84.4 84.4 0 0 1 22.5-6.2L110.5 73A94.9 94.9 0 0 0 85.2 80zm90 0L159.4 80c-8-3.5-16.6-5.8-25.3-6.9l-1.3 10.4a83.8 83.8 0 0 1 29.5 9.6l2.1-4 2.3-4.2 10.2-19-4.6-2.6zM48.6 78.8l-5.4 2.5-2.6 4.9L55 100.5c-5.2 5.2-9.7 11-13.5 17.1l8.8 5.4c5.2-8.6 12-15 12.1-15.1 2-2 3.9-3.7 5.9-5.4l-1.1-1.3-5-5.9zm147.5 0-13.8 16.5-2.7 3.2-2.2 2.7-1 1.3c2 1.7 3.9 3.5 5.8 5.4.3.3 6.9 6.5 12.1 15.1l8.8-5.4c-3.8-6.1-8.3-11.9-13.5-17.1L204 86.2l-2.6-5z" transform="matrix(.86957 0 0 .86957 -13.6 -50.3)" clip-path="url(#d)"></path><path style="display:inline;fill:red;stroke-width:.264583" d="M90.2 91.9v15.5l5.8 5.8v9.8l9 4V92.4ZM82 97.5l-9.2 2.6-7 6.7 15.7 15.6v8h10.2v-12.8l-9.9-9zm-20.7 16.3-4.7 2.6L71.2 131v3.9h3.9v-7.4zm-7.8 11L49 135.2l21.5 7.3zm66.3-33v15.6l-5.8 5.8v9.8l-9 4V92.4Zm8.2 5.7 9.2 2.6 7 6.7-15.7 15.6v8h-10.2v-12.8l9.9-9zm20.7 16.3 4.7 2.6-14.6 14.6v3.9h-3.9v-7.4zm7.8 11 4.5 10.3-21.5 7.3z" clip-path="url(#e)" transform="translate(-12.3 -52.4)"></path><path clip-path="url(#f)" style="display:inline;fill:red;stroke-width:.264583" d="M52.7 62.2 48.5 64 45 67.5l18.7 24.9a69 69 0 0 0-25.9 39.9l6.7 1.5a62 62 0 0 1 121 0l6.7-1.5a69 69 0 0 0-25.9-40L165 67.6l-3.5-3.6-4.2-1.7L141 88.7a68.5 68.5 0 0 0-72 0Z" transform="translate(-12.3 -52.4)"></path></g></svg>`;
}
function afterSleep(ms, cb) {
  setTimeout(cb, ms);
}
const ACCORDION_ROOT_ATTR = "data-accordion-root";
const ACCORDION_TRIGGER_ATTR = "data-accordion-trigger";
const ACCORDION_CONTENT_ATTR = "data-accordion-content";
const ACCORDION_ITEM_ATTR = "data-accordion-item";
const ACCORDION_HEADER_ATTR = "data-accordion-header";
class AccordionBaseState {
  #id;
  #ref;
  disabled;
  #loop;
  orientation;
  rovingFocusGroup;
  constructor(props) {
    this.#id = props.id;
    this.disabled = props.disabled;
    this.#ref = props.ref;
    useRefById$1({ id: props.id, ref: this.#ref });
    this.orientation = props.orientation;
    this.#loop = props.loop;
    this.rovingFocusGroup = useRovingFocus({
      rootNodeId: this.#id,
      candidateAttr: ACCORDION_TRIGGER_ATTR,
      loop: this.#loop,
      orientation: this.orientation
    });
  }
  #props = once(() => ({
    id: this.#id.current,
    "data-orientation": getDataOrientation(this.orientation.current),
    "data-disabled": getDataDisabled(this.disabled.current),
    [ACCORDION_ROOT_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
}
class AccordionSingleState extends AccordionBaseState {
  #value;
  isMulti = false;
  constructor(props) {
    super(props);
    this.#value = props.value;
    this.includesItem = this.includesItem.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
  }
  includesItem(item) {
    return this.#value.current === item;
  }
  toggleItem(item) {
    this.#value.current = this.includesItem(item) ? "" : item;
  }
}
class AccordionMultiState extends AccordionBaseState {
  #value;
  isMulti = true;
  constructor(props) {
    super(props);
    this.#value = props.value;
    this.includesItem = this.includesItem.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
  }
  includesItem(item) {
    return this.#value.current.includes(item);
  }
  toggleItem(item) {
    if (this.includesItem(item)) {
      this.#value.current = this.#value.current.filter((v) => v !== item);
    } else {
      this.#value.current = [...this.#value.current, item];
    }
  }
}
class AccordionItemState {
  #id;
  #ref;
  value;
  disabled;
  root;
  #isActive = once(() => this.root.includesItem(this.value.current));
  get isActive() {
    return this.#isActive();
  }
  #isDisabled = once(() => this.disabled.current || this.root.disabled.current);
  get isDisabled() {
    return this.#isDisabled();
  }
  constructor(props) {
    this.value = props.value;
    this.disabled = props.disabled;
    this.root = props.rootState;
    this.#id = props.id;
    this.#ref = props.ref;
    this.updateValue = this.updateValue.bind(this);
    useRefById$1({
      id: this.#id,
      ref: this.#ref,
      deps: () => this.isActive
    });
  }
  updateValue() {
    this.root.toggleItem(this.value.current);
  }
  #props = once(() => ({
    id: this.#id.current,
    "data-state": getDataOpenClosed(this.isActive),
    "data-disabled": getDataDisabled(this.isDisabled),
    "data-orientation": getDataOrientation(this.root.orientation.current),
    [ACCORDION_ITEM_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
}
class AccordionTriggerState {
  #ref;
  #disabled;
  #id;
  #root;
  #itemState;
  #isDisabled = once(() => this.#disabled.current || this.#itemState.disabled.current || this.#root.disabled.current);
  constructor(props, itemState) {
    this.#disabled = props.disabled;
    this.#itemState = itemState;
    this.#root = itemState.root;
    this.#id = props.id;
    this.#ref = props.ref;
    this.onkeydown = this.onkeydown.bind(this);
    this.onclick = this.onclick.bind(this);
    useRefById$1({ id: props.id, ref: this.#ref });
  }
  onclick(e) {
    if (this.#isDisabled()) return;
    if (e.button !== 0) return e.preventDefault();
    this.#itemState.updateValue();
  }
  onkeydown(e) {
    if (this.#isDisabled()) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      this.#itemState.updateValue();
      return;
    }
    this.#root.rovingFocusGroup.handleKeydown(this.#ref.current, e);
  }
  #props = once(() => ({
    id: this.#id.current,
    disabled: this.#isDisabled(),
    "aria-expanded": getAriaExpanded(this.#itemState.isActive),
    "aria-disabled": getAriaDisabled(this.#isDisabled()),
    "data-disabled": getDataDisabled(this.#isDisabled()),
    "data-state": getDataOpenClosed(this.#itemState.isActive),
    "data-orientation": getDataOrientation(this.#root.orientation.current),
    [ACCORDION_TRIGGER_ATTR]: "",
    tabindex: 0,
    //
    onclick: this.onclick,
    onkeydown: this.onkeydown
  }));
  get props() {
    return this.#props();
  }
}
class AccordionContentState {
  item;
  #ref;
  #id;
  #originalStyles = void 0;
  #isMountAnimationPrevented = false;
  #width = 0;
  #height = 0;
  #forceMount;
  #present = once(() => this.#forceMount.current || this.item.isActive);
  get present() {
    return this.#present();
  }
  constructor(props, item) {
    this.item = item;
    this.#forceMount = props.forceMount;
    this.#isMountAnimationPrevented = this.item.isActive;
    this.#id = props.id;
    this.#ref = props.ref;
    useRefById$1({ id: this.#id, ref: this.#ref });
    watch([() => this.present, () => this.#ref.current], ([_, node]) => {
      if (!node) return;
      afterTick(() => {
        if (!this.#ref.current) return;
        this.#originalStyles = this.#originalStyles || {
          transitionDuration: node.style.transitionDuration,
          animationName: node.style.animationName
        };
        node.style.transitionDuration = "0s";
        node.style.animationName = "none";
        const rect = node.getBoundingClientRect();
        this.#height = rect.height;
        this.#width = rect.width;
        if (!this.#isMountAnimationPrevented) {
          const { animationName, transitionDuration } = this.#originalStyles;
          node.style.transitionDuration = transitionDuration;
          node.style.animationName = animationName;
        }
      });
    });
  }
  #snippetProps = once(() => ({ open: this.item.isActive }));
  get snippetProps() {
    return this.#snippetProps();
  }
  #props = once(() => ({
    id: this.#id.current,
    "data-state": getDataOpenClosed(this.item.isActive),
    "data-disabled": getDataDisabled(this.item.isDisabled),
    "data-orientation": getDataOrientation(this.item.root.orientation.current),
    [ACCORDION_CONTENT_ATTR]: "",
    style: {
      "--bits-accordion-content-height": `${this.#height}px`,
      "--bits-accordion-content-width": `${this.#width}px`
    }
  }));
  get props() {
    return this.#props();
  }
}
class AccordionHeaderState {
  #id;
  #ref;
  #level;
  #item;
  constructor(props, item) {
    this.#level = props.level;
    this.#id = props.id;
    this.#ref = props.ref;
    useRefById$1({ id: this.#id, ref: this.#ref });
    this.#item = item;
  }
  #props = once(() => ({
    id: this.#id.current,
    role: "heading",
    "aria-level": this.#level.current,
    "data-heading-level": this.#level.current,
    "data-state": getDataOpenClosed(this.#item.isActive),
    "data-orientation": getDataOrientation(this.#item.root.orientation.current),
    [ACCORDION_HEADER_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
}
const [
  setAccordionRootContext,
  getAccordionRootContext
] = createContext$1("Accordion.Root");
const [
  setAccordionItemContext,
  getAccordionItemContext
] = createContext$1("Accordion.Item");
function useAccordionRoot(props) {
  const { type, ...rest } = props;
  const rootState = type === "single" ? new AccordionSingleState(rest) : new AccordionMultiState(rest);
  return setAccordionRootContext(rootState);
}
function useAccordionItem(props) {
  const rootState = getAccordionRootContext();
  return setAccordionItemContext(new AccordionItemState({ ...props, rootState }));
}
function useAccordionTrigger(props) {
  const item = getAccordionItemContext();
  return new AccordionTriggerState(props, item);
}
function useAccordionContent(props) {
  const item = getAccordionItemContext();
  return new AccordionContentState(props, item);
}
function useAccordionHeader(props) {
  const item = getAccordionItemContext();
  return new AccordionHeaderState(props, item);
}
function Accordion($$payload, $$props) {
  push();
  let {
    disabled = false,
    children,
    child,
    type,
    value = void 0,
    ref = null,
    id = useId$1(),
    onValueChange = noop$1,
    loop = true,
    orientation = "vertical",
    controlledValue = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  value === void 0 && (value = type === "single" ? "" : []);
  const rootState = useAccordionRoot({
    type,
    value: box.with(() => value, (v) => {
      if (controlledValue) {
        onValueChange(v);
      } else {
        value = v;
        onValueChange(v);
      }
    }),
    id: box.with(() => id),
    disabled: box.with(() => disabled),
    loop: box.with(() => loop),
    orientation: box.with(() => orientation),
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
  bind_props($$props, { value, ref });
  pop();
}
function Accordion_item($$payload, $$props) {
  push();
  let {
    id = useId$1(),
    disabled = false,
    value = useId$1(),
    children,
    child,
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const itemState = useAccordionItem({
    value: box.with(() => value),
    disabled: box.with(() => disabled),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
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
function Accordion_header($$payload, $$props) {
  push();
  let {
    id = useId$1(),
    level = 2,
    children,
    child,
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const headerState = useAccordionHeader({
    id: box.with(() => id),
    level: box.with(() => level),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, headerState.props);
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
function Accordion_trigger($$payload, $$props) {
  push();
  let {
    disabled = false,
    ref = null,
    id = useId$1(),
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = useAccordionTrigger({
    disabled: box.with(() => disabled),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, triggerState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ type: "button", ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Accordion_content($$payload, $$props) {
  push();
  let {
    child,
    ref = null,
    id = useId$1(),
    forceMount = false,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = useAccordionContent({
    forceMount: box.with(() => forceMount),
    id: box.with(() => id),
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
          props: mergedProps,
          ...contentState.snippetProps
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
function Dialog_trigger($$payload, $$props) {
  push();
  let {
    id = useId$1(),
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
const AVATAR_ROOT_ATTR = "data-avatar-root";
const AVATAR_IMAGE_ATTR = "data-avatar-image";
const AVATAR_FALLBACK_ATTR = "data-avatar-fallback";
class AvatarRootState {
  #id;
  #ref;
  delayMs;
  loadingStatus;
  constructor(props) {
    this.delayMs = props.delayMs;
    this.loadingStatus = props.loadingStatus;
    this.#ref = props.ref;
    this.#id = props.id;
    this.loadImage = this.loadImage.bind(this);
    useRefById$1({ id: this.#id, ref: this.#ref });
  }
  loadImage(src, crossorigin, referrerPolicy) {
    let imageTimerId;
    const image = new Image();
    image.src = src;
    if (crossorigin !== void 0) image.crossOrigin = crossorigin;
    if (referrerPolicy) image.referrerPolicy = referrerPolicy;
    this.loadingStatus.current = "loading";
    image.onload = () => {
      imageTimerId = window.setTimeout(
        () => {
          this.loadingStatus.current = "loaded";
        },
        this.delayMs.current
      );
    };
    image.onerror = () => {
      this.loadingStatus.current = "error";
    };
    return () => {
      window.clearTimeout(imageTimerId);
    };
  }
  #props = once(() => ({
    id: this.#id.current,
    [AVATAR_ROOT_ATTR]: "",
    "data-status": this.loadingStatus.current
  }));
  get props() {
    return this.#props();
  }
}
class AvatarImageState {
  #id;
  #ref;
  #crossOrigin;
  #referrerPolicy;
  #src;
  #root;
  constructor(props, root) {
    this.#root = root;
    this.#src = props.src;
    this.#id = props.id;
    this.#ref = props.ref;
    this.#crossOrigin = props.crossOrigin;
    this.#referrerPolicy = props.referrerPolicy;
    useRefById$1({ id: this.#id, ref: this.#ref });
  }
  #props = once(() => ({
    id: this.#id.current,
    style: {
      display: this.#root.loadingStatus.current === "loaded" ? "block" : "none"
    },
    "data-status": this.#root.loadingStatus.current,
    [AVATAR_IMAGE_ATTR]: "",
    src: this.#src.current,
    crossorigin: this.#crossOrigin.current,
    referrerpolicy: this.#referrerPolicy.current
  }));
  get props() {
    return this.#props();
  }
}
class AvatarFallbackState {
  #id;
  #ref;
  #root;
  constructor(props, root) {
    this.#root = root;
    this.#id = props.id;
    this.#ref = props.ref;
    useRefById$1({ id: this.#id, ref: this.#ref });
  }
  #props = once(() => ({
    style: {
      display: this.#root.loadingStatus.current === "loaded" ? "none" : void 0
    },
    "data-status": this.#root.loadingStatus.current,
    [AVATAR_FALLBACK_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
}
const [setAvatarRootContext, getAvatarRootContext] = createContext$1("Avatar.Root");
function useAvatarRoot(props) {
  return setAvatarRootContext(new AvatarRootState(props));
}
function useAvatarImage(props) {
  const root = getAvatarRootContext();
  return new AvatarImageState(props, root);
}
function useAvatarFallback(props) {
  const root = getAvatarRootContext();
  return new AvatarFallbackState(props, root);
}
function Avatar$1($$payload, $$props) {
  push();
  let {
    delayMs = 0,
    loadingStatus = "loading",
    onLoadingStatusChange,
    child,
    children,
    id = useId$1(),
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = useAvatarRoot({
    delayMs: box.with(() => delayMs),
    loadingStatus: box.with(() => loadingStatus, (v) => {
      if (loadingStatus !== v) {
        loadingStatus = v;
        onLoadingStatusChange?.(v);
      }
    }),
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
  bind_props($$props, { loadingStatus, ref });
  pop();
}
function Avatar_image$1($$payload, $$props) {
  push();
  let {
    src,
    child,
    id = useId$1(),
    ref = null,
    crossorigin = void 0,
    referrerpolicy = void 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const imageState = useAvatarImage({
    src: box.with(() => src),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    crossOrigin: box.with(() => crossorigin),
    referrerPolicy: box.with(() => referrerpolicy)
  });
  const mergedProps = mergeProps(restProps, imageState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<img${spread_attributes({ ...mergedProps, src })} onload="this.__e=event" onerror="this.__e=event">`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Avatar_fallback$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    id = useId$1(),
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const fallbackState = useAvatarFallback({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, fallbackState.props);
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
  bind_props($$props, { ref });
  pop();
}
function Avatar_fallback($$payload, $$props) {
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
    Avatar_fallback$1($$payload2, spread_props([
      {
        class: cn("bg-neutral-3 border-neutral-5 flex h-full w-full items-center justify-center rounded-full border", className)
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
function Avatar_image($$payload, $$props) {
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
    Avatar_image$1($$payload2, spread_props([
      {
        class: cn("aspect-square h-full w-full", className)
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
function Avatar($$payload, $$props) {
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
    Avatar$1($$payload2, spread_props([
      {
        class: cn("relative flex size-10 shrink-0 overflow-hidden rounded-full", className)
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
function ClientAvatarIcon($$payload, $$props) {
  let { size } = $$props;
  $$payload.out += `<!---->`;
  Avatar($$payload, {
    class: `h-[${stringify(size)}] w-[${stringify(size)}]`,
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Avatar_image($$payload2, { src: "", alt: "" });
      $$payload2.out += `<!----> <!---->`;
      Avatar_fallback($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<!---->CN`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
}
function noop() {
}
const isBrowser = typeof document !== "undefined";
function isVertical$1(direction) {
  switch (direction) {
    case "top":
    case "bottom":
      return true;
    case "left":
    case "right":
      return false;
    default:
      return direction;
  }
}
const TRANSITIONS = {
  DURATION: 0.5,
  EASE: [0.32, 0.72, 0, 1]
};
const VELOCITY_THRESHOLD = 0.4;
const CLOSE_THRESHOLD = 0.25;
const SCROLL_LOCK_TIMEOUT = 100;
const BORDER_RADIUS = 8;
const NESTED_DISPLACEMENT = 16;
const WINDOW_TOP_OFFSET = 26;
const DRAG_CLASS = "vaul-dragging";
const cache = /* @__PURE__ */ new WeakMap();
function set(el, styles, ignoreCache = false) {
  if (!el || !(el instanceof HTMLElement))
    return;
  const originalStyles = {};
  Object.entries(styles).forEach(([key, value]) => {
    if (key.startsWith("--")) {
      el.style.setProperty(key, value);
      return;
    }
    originalStyles[key] = el.style[key];
    el.style[key] = value;
  });
  if (ignoreCache)
    return;
  cache.set(el, originalStyles);
}
function isMac() {
  return testPlatform(/^Mac/);
}
function testPlatform(re) {
  return typeof window !== "undefined" && window.navigator != null ? re.test(window.navigator.platform) : void 0;
}
function isIPhone() {
  return testPlatform(/^iPhone/);
}
function isSafari() {
  return /^(?:(?!chrome|android).)*safari/i.test(navigator.userAgent);
}
function isIPad() {
  return testPlatform(/^iPad/) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
  isMac() && navigator.maxTouchPoints > 1;
}
function isIOS() {
  return isIPhone() || isIPad();
}
function isVertical(direction) {
  switch (direction) {
    case "top":
    case "bottom":
      return true;
    case "left":
    case "right":
      return false;
    default:
      return direction;
  }
}
function getTranslate(element, direction) {
  if (!element) {
    return null;
  }
  const style = window.getComputedStyle(element);
  const transform = (
    // @ts-expect-error - vendor prefix
    style.transform || style.webkitTransform || style.mozTransform
  );
  let mat = transform.match(/^matrix3d\((.+)\)$/);
  if (mat) {
    return Number.parseFloat(mat[1].split(", ")[isVertical(direction) ? 13 : 12]);
  }
  mat = transform.match(/^matrix\((.+)\)$/);
  return mat ? Number.parseFloat(mat[1].split(", ")[isVertical(direction) ? 5 : 4]) : null;
}
let previousBodyPosition = null;
class PositionFixed {
  #root;
  #activeUrl = typeof window !== "undefined" ? window.location.href : "";
  #scrollPos = 0;
  #open = once(() => this.#root.open.current);
  #noBodyStyles = once(() => this.#root.noBodyStyles.current);
  #preventScrollRestoration = once(() => this.#root.preventScrollRestoration.current);
  #modal = once(() => this.#root.modal.current);
  #nested = once(() => this.#root.nested.current);
  #hasBeenOpened = once(() => this.#root.hasBeenOpened);
  constructor(root) {
    this.#root = root;
  }
  setPositionFixed = () => {
    if (!isSafari()) return;
    if (previousBodyPosition === null && this.#open() && !this.#noBodyStyles()) {
      previousBodyPosition = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left,
        height: document.body.style.height,
        right: "unset"
      };
      const { scrollX, innerHeight } = window;
      document.body.style.setProperty("position", "fixed", "important");
      Object.assign(document.body.style, {
        top: `${-this.#scrollPos}px`,
        left: `${-scrollX}px`,
        right: "0px",
        height: "auto"
      });
      window.setTimeout(
        () => window.requestAnimationFrame(() => {
          const bottomBarHeight = innerHeight - window.innerHeight;
          if (bottomBarHeight && this.#scrollPos >= innerHeight) {
            document.body.style.top = `${-(this.#scrollPos + bottomBarHeight)}px`;
          }
        }),
        300
      );
    }
  };
  restorePositionSetting = () => {
    if (!isSafari()) return;
    if (previousBodyPosition !== null && !this.#noBodyStyles()) {
      const y = -Number.parseInt(document.body.style.top, 10);
      const x = -Number.parseInt(document.body.style.left, 10);
      Object.assign(document.body.style, previousBodyPosition);
      window.requestAnimationFrame(() => {
        if (this.#preventScrollRestoration() && this.#activeUrl !== window.location.href) {
          this.#activeUrl = window.location.href;
          return;
        }
        window.scrollTo(x, y);
      });
      previousBodyPosition = null;
    }
  };
}
function setContext(key, value) {
  return setContext$1(key, value);
}
function getContext(key, fallback) {
  const trueKey = typeof key === "symbol" ? key : key;
  const description = typeof key === "symbol" ? key.description : key;
  if (!hasContext(trueKey)) {
    if (fallback === void 0) {
      throw new Error(`Missing context dependency: ${description} and no fallback was provided.`);
    }
    return fallback;
  }
  return getContext$1(key);
}
function getSymbolDescription(providerComponentName, contextName) {
  {
    return `${providerComponentName}Context`;
  }
}
function createContext(providerComponentName, contextName, useSymbol = true) {
  const symbolDescription = getSymbolDescription(providerComponentName);
  const symbol = Symbol(symbolDescription);
  const key = symbolDescription;
  function getCtx(fallback) {
    const context = getContext(useSymbol ? symbol : key, fallback);
    if (context === void 0) {
      throw new Error(`Context \`${symbolDescription}\` not found. Component must be used within ${Array.isArray(providerComponentName) ? `one of the following components: ${providerComponentName.join(", ")}` : `\`${providerComponentName}\``}`);
    }
    if (context === null)
      return context;
    return context;
  }
  function setCtx(value) {
    if (useSymbol) {
      return setContext(symbol, value);
    } else {
      return setContext(key, value);
    }
  }
  return [setCtx, getCtx];
}
class SnapPointsState {
  #root;
  #direction = once(() => this.#root.direction.current);
  #container = once(() => this.#root.container.current);
  #snapPoints = once(() => this.#root.snapPoints.current ?? []);
  #activeSnapPoint = once(() => this.#root.activeSnapPoint.current);
  get activeSnapPoint() {
    return this.#activeSnapPoint();
  }
  #fadeFromIndex = once(() => this.#root.fadeFromIndex.current);
  get fadeFromIndex() {
    return this.#fadeFromIndex();
  }
  #overlayNode = once(() => this.#root.overlayNode);
  #drawerNode = once(() => this.#root.drawerNode);
  #snapToSequentialPoint = once(() => this.#root.snapToSequentialPoint.current);
  windowDimensions = isBrowser ? {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight
  } : void 0;
  #isLastSnapPoint = once(() => {
    return this.activeSnapPoint === this.#snapPoints()?.[this.#snapPoints().length - 1] || null;
  });
  get isLastSnapPoint() {
    return this.#isLastSnapPoint();
  }
  #activeSnapPointIndex = once(() => {
    return this.#snapPoints()?.findIndex((snapPoint) => snapPoint === this.activeSnapPoint);
  });
  get activeSnapPointIndex() {
    return this.#activeSnapPointIndex();
  }
  #shouldFade = once(() => {
    return this.#snapPoints() && this.#snapPoints().length > 0 && (this.fadeFromIndex || this.fadeFromIndex === 0) && !Number.isNaN(this.fadeFromIndex) && this.#snapPoints()[this.fadeFromIndex] === this.activeSnapPoint || !this.#snapPoints();
  });
  get shouldFade() {
    return this.#shouldFade();
  }
  #snapPointsOffset = once(() => {
    this.windowDimensions;
    this.#root.open.current;
    const containerSize = this.#container() ? {
      width: this.#container().getBoundingClientRect().width,
      height: this.#container().getBoundingClientRect().height
    } : typeof window !== "undefined" ? {
      width: window.innerWidth,
      height: window.innerHeight
    } : { width: 0, height: 0 };
    const offset = this.#snapPoints()?.map((snapPoint) => {
      const isPx = typeof snapPoint === "string";
      let snapPointAsNumber = 0;
      if (isPx) {
        snapPointAsNumber = Number.parseInt(snapPoint, 10);
      }
      if (isVertical$1(this.#direction())) {
        const height = isPx ? snapPointAsNumber : this.windowDimensions ? snapPoint * containerSize.height : 0;
        if (this.windowDimensions) {
          return this.#direction() === "bottom" ? containerSize.height - height : -containerSize.height + height;
        }
        return height;
      }
      const width = isPx ? snapPointAsNumber : this.windowDimensions ? snapPoint * containerSize.width : 0;
      if (this.windowDimensions) {
        return this.#direction() === "right" ? containerSize.width - width : -containerSize.width + width;
      }
      return width;
    }) ?? [];
    return offset;
  });
  get snapPointsOffset() {
    return this.#snapPointsOffset();
  }
  #activeSnapPointOffset = once(() => {
    if (this.activeSnapPointIndex !== null) {
      if (this.activeSnapPointIndex !== void 0) {
        return this.snapPointsOffset[this.activeSnapPointIndex];
      }
    }
    return null;
  });
  get activeSnapPointOffset() {
    return this.#activeSnapPointOffset();
  }
  constructor(root) {
    this.#root = root;
  }
  #onResize = () => {
    this.windowDimensions = {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight
    };
  };
  snapToPoint = (dimension) => {
    const newSnapPointIndex = this.snapPointsOffset.findIndex((snapPointDim) => snapPointDim === dimension) ?? null;
    this.#root.onSnapPointChange(newSnapPointIndex);
    set(this.#drawerNode(), {
      transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
      transform: isVertical$1(this.#direction()) ? `translate3d(0, ${dimension}px, 0)` : `translate3d(${dimension}px, 0, 0)`
    });
    if (this.snapPointsOffset && newSnapPointIndex !== this.snapPointsOffset.length - 1 && newSnapPointIndex !== this.fadeFromIndex && this.fadeFromIndex !== void 0 && newSnapPointIndex < this.fadeFromIndex) {
      set(this.#overlayNode(), {
        transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
        opacity: "0"
      });
    } else {
      set(this.#overlayNode(), {
        transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
        opacity: "1"
      });
    }
    this.#root.setActiveSnapPoint(this.#snapPoints()?.[Math.max(newSnapPointIndex, 0)]);
  };
  onRelease = (props) => {
    if (this.fadeFromIndex === void 0) return;
    const currentPosition = this.#direction() === "bottom" || this.#direction() === "right" ? (this.activeSnapPointOffset ?? 0) - props.draggedDistance : (this.activeSnapPointOffset ?? 0) + props.draggedDistance;
    const isOverlaySnapPoint = this.activeSnapPointIndex === this.fadeFromIndex - 1;
    const isFirst = this.activeSnapPointIndex === 0;
    const hasDraggedUp = props.draggedDistance > 0;
    if (isOverlaySnapPoint) {
      set(this.#overlayNode(), {
        transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`
      });
    }
    if (!this.#snapToSequentialPoint() && props.velocity > 2 && !hasDraggedUp) {
      if (props.dismissible) props.closeDrawer();
      else this.snapToPoint(this.snapPointsOffset[0]);
      return;
    }
    if (!this.#snapToSequentialPoint() && props.velocity > 2 && hasDraggedUp && this.snapPointsOffset && this.#snapPoints()) {
      this.snapToPoint(this.snapPointsOffset[this.#snapPoints().length - 1]);
      return;
    }
    const closestSnapPoint = this.snapPointsOffset?.reduce((prev, curr) => {
      if (typeof prev !== "number" || typeof curr !== "number") return prev;
      return Math.abs(curr - currentPosition) < Math.abs(prev - currentPosition) ? curr : prev;
    });
    const dim = isVertical$1(this.#direction()) ? window.innerHeight : window.innerWidth;
    if (props.velocity > VELOCITY_THRESHOLD && Math.abs(props.draggedDistance) < dim * 0.4) {
      const dragDirection = hasDraggedUp ? 1 : -1;
      if (dragDirection > 0 && this.isLastSnapPoint) {
        this.snapToPoint(this.snapPointsOffset[this.#snapPoints().length - 1]);
        return;
      }
      if (isFirst && dragDirection < 0 && props.dismissible) {
        this.#root.closeDrawer();
      }
      if (this.activeSnapPointIndex === null) return;
      this.snapToPoint(this.snapPointsOffset[this.activeSnapPointIndex + dragDirection]);
      return;
    }
    this.snapToPoint(closestSnapPoint);
  };
  onDrag = (props) => {
    if (this.activeSnapPointOffset === null) return;
    const newValue = this.#direction() === "bottom" || this.#direction() === "right" ? this.activeSnapPointOffset - props.draggedDistance : this.activeSnapPointOffset + props.draggedDistance;
    if ((this.#direction() === "bottom" || this.#direction() === "right") && newValue < this.snapPointsOffset[this.snapPointsOffset.length - 1]) {
      return;
    }
    if ((this.#direction() === "top" || this.#direction() === "left") && newValue > this.snapPointsOffset[this.snapPointsOffset.length - 1]) {
      return;
    }
    set(this.#drawerNode(), {
      transform: isVertical$1(this.#direction()) ? `translate3d(0, ${newValue}px, 0)` : `translate3d(${newValue}px, 0, 0)`
    });
  };
  getPercentageDragged = (absDraggedDistance, isDraggingDown) => {
    if (!this.#snapPoints().length || typeof this.activeSnapPointIndex !== "number" || !this.snapPointsOffset.length || this.fadeFromIndex === void 0) return null;
    const isOverlaySnapPoint = this.activeSnapPointIndex === this.fadeFromIndex - 1;
    const isOverlaySnapPointOrHigher = this.activeSnapPointIndex >= this.fadeFromIndex;
    if (isOverlaySnapPointOrHigher && isDraggingDown) {
      return 0;
    }
    if (isOverlaySnapPoint && !isDraggingDown) return 1;
    if (!this.shouldFade && !isOverlaySnapPoint) return null;
    const targetSnapPointIndex = isOverlaySnapPoint ? this.activeSnapPointIndex + 1 : this.activeSnapPointIndex - 1;
    const snapPointDistance = isOverlaySnapPoint ? this.snapPointsOffset[targetSnapPointIndex] - this.snapPointsOffset[targetSnapPointIndex - 1] : this.snapPointsOffset[targetSnapPointIndex + 1] - this.snapPointsOffset[targetSnapPointIndex];
    const percentageDragged = absDraggedDistance / Math.abs(snapPointDistance);
    if (isOverlaySnapPoint) {
      return 1 - percentageDragged;
    } else {
      return percentageDragged;
    }
  };
}
function useScaleBackground(root) {
  (() => root.direction.current)();
  (() => root.open.current)();
  (() => root.shouldScaleBackground.current)();
  (() => root.setBackgroundColorOnScale.current)();
  (() => root.noBodyStyles.current)();
}
class DrawerRootState {
  open;
  activeSnapPoint;
  closeThreshold;
  shouldScaleBackground;
  scrollLockTimeout;
  snapPoints;
  fadeFromIndex;
  fixed;
  dismissible;
  direction;
  onDragProp;
  onReleaseProp;
  nested;
  onCloseProp;
  backgroundColor;
  modal;
  handleOnly;
  noBodyStyles;
  preventScrollRestoration;
  setBackgroundColorOnScale;
  disablePreventScroll;
  container;
  snapToSequentialPoint;
  repositionInputs;
  autoFocus;
  //
  hasBeenOpened = false;
  isDragging = false;
  justReleased = false;
  overlayNode = null;
  openTime = null;
  dragStartTime = null;
  dragEndTime = null;
  lastTimeDragPrevented = null;
  isAllowedToDrag = false;
  nestedOpenChangeTimer = null;
  pointerStart = 0;
  keyboardIsOpen = false;
  previousDiffFromInitial = 0;
  drawerNode = null;
  drawerHeight = 0;
  drawerWidth = 0;
  initialDrawerHeight = 0;
  //
  snapPointsState;
  #snapPointsOffset = once(() => this.snapPointsState.snapPointsOffset);
  get snapPointsOffset() {
    return this.#snapPointsOffset();
  }
  positionFixedState;
  constructor(props) {
    this.open = props.open;
    this.activeSnapPoint = props.activeSnapPoint;
    this.closeThreshold = props.closeThreshold;
    this.shouldScaleBackground = props.shouldScaleBackground;
    this.scrollLockTimeout = props.scrollLockTimeout;
    this.snapPoints = props.snapPoints;
    this.fadeFromIndex = props.fadeFromIndex;
    this.fixed = props.fixed;
    this.dismissible = props.dismissible;
    this.direction = props.direction;
    this.onDragProp = props.onDrag;
    this.onReleaseProp = props.onRelease;
    this.nested = props.nested;
    this.onCloseProp = props.onClose;
    this.backgroundColor = props.backgroundColor;
    this.modal = props.modal;
    this.handleOnly = props.handleOnly;
    this.noBodyStyles = props.noBodyStyles;
    this.preventScrollRestoration = props.preventScrollRestoration;
    this.setBackgroundColorOnScale = props.setBackgroundColorOnScale;
    this.disablePreventScroll = props.disablePreventScroll;
    this.container = props.container;
    this.snapToSequentialPoint = props.snapToSequentialPoint;
    this.repositionInputs = props.repositionInputs;
    this.autoFocus = props.autoFocus;
    this.snapPointsState = new SnapPointsState(this);
    this.positionFixedState = new PositionFixed(this);
  }
  setActiveSnapPoint = (snapPoint) => {
    this.activeSnapPoint.current = snapPoint;
  };
  onSnapPointChange = (activeSnapPointIndex) => {
    if (this.snapPoints.current && activeSnapPointIndex === this.snapPointsOffset.length - 1) this.openTime = /* @__PURE__ */ new Date();
  };
  onPress = (e) => {
    if (!this.dismissible.current && !this.snapPoints.current) return;
    if (this.drawerNode && !this.drawerNode.contains(e.target)) return;
    const drawerRect = this.drawerNode?.getBoundingClientRect();
    this.drawerHeight = drawerRect?.height || 0;
    this.drawerWidth = drawerRect?.width || 0;
    this.isDragging = true;
    this.dragStartTime = /* @__PURE__ */ new Date();
    if (isIOS()) {
      window.addEventListener("touchend", () => this.isAllowedToDrag = false, { once: true });
    }
    e.target.setPointerCapture(e.pointerId);
    this.pointerStart = isVertical$1(this.direction.current) ? e.pageY : e.pageX;
  };
  shouldDrag = (el, isDraggingInDirection) => {
    if (el === null) return false;
    let element = el;
    const highlightedText = window.getSelection()?.toString();
    const swipeAmount = this.drawerNode ? getTranslate(this.drawerNode, this.direction.current) : null;
    const date = /* @__PURE__ */ new Date();
    if (element.hasAttribute("data-vaul-no-drag") || element.closest("[data-vaul-no-drag]")) {
      return false;
    }
    if (this.direction.current === "right" || this.direction.current === "left") {
      return true;
    }
    if (this.openTime && date.getTime() - this.openTime.getTime() < 500) {
      return false;
    }
    if (swipeAmount !== null) {
      if (this.direction.current === "bottom" ? swipeAmount > 0 : swipeAmount < 0) {
        return true;
      }
    }
    if (highlightedText && highlightedText.length > 0) {
      return false;
    }
    if (this.lastTimeDragPrevented !== null && date.getTime() - this.lastTimeDragPrevented.getTime() < this.scrollLockTimeout.current && swipeAmount === 0) {
      this.lastTimeDragPrevented = date;
      return false;
    }
    if (isDraggingInDirection) {
      this.lastTimeDragPrevented = date;
      return false;
    }
    while (element) {
      if (element.scrollHeight > element.clientHeight) {
        if (element.scrollTop !== 0) {
          this.lastTimeDragPrevented = /* @__PURE__ */ new Date();
          return false;
        }
        if (element.getAttribute("role") === "dialog") {
          return true;
        }
      }
      element = element.parentNode;
    }
    return true;
  };
  onDrag = (e) => {
    if (!this.drawerNode) return;
    if (!this.isDragging) return;
    const directionMultiplier = this.direction.current === "bottom" || this.direction.current === "right" ? 1 : -1;
    const draggedDistance = (this.pointerStart - (isVertical$1(this.direction.current) ? e.pageY : e.pageX)) * directionMultiplier;
    const isDraggingInDirection = draggedDistance > 0;
    const noCloseSnapPointsPreCondition = this.snapPoints.current && !this.dismissible.current && !isDraggingInDirection;
    if (noCloseSnapPointsPreCondition && this.snapPointsState.activeSnapPointIndex === 0) return;
    const absDraggedDistance = Math.abs(draggedDistance);
    const wrapper = document.querySelector("[data-vaul-drawer-wrapper]");
    const drawerDimension = this.direction.current === "bottom" || this.direction.current === "top" ? this.drawerHeight : this.drawerWidth;
    let percentageDragged = absDraggedDistance / drawerDimension;
    const snapPointPercentageDragged = this.snapPointsState.getPercentageDragged(absDraggedDistance, isDraggingInDirection);
    if (snapPointPercentageDragged !== null) {
      percentageDragged = snapPointPercentageDragged;
    }
    if (noCloseSnapPointsPreCondition && percentageDragged >= 1) {
      return;
    }
    if (!this.isAllowedToDrag && !this.shouldDrag(e.target, isDraggingInDirection)) {
      return;
    }
    this.drawerNode.classList.add(DRAG_CLASS);
    this.isAllowedToDrag = true;
    set(this.drawerNode, { transition: "none" });
    set(this.overlayNode, { transition: "none" });
    if (this.snapPoints.current && this.snapPoints.current.length > 0) {
      this.snapPointsState.onDrag({ draggedDistance });
    }
    if (isDraggingInDirection && !this.snapPoints.current) {
      const dampenedDraggedDistance = dampenValue(draggedDistance);
      const translateValue = Math.min(dampenedDraggedDistance * -1, 0) * directionMultiplier;
      set(this.drawerNode, {
        transform: isVertical$1(this.direction.current) ? `translate3d(0, ${translateValue}px, 0)` : `translate3d(${translateValue}px, 0, 0)`
      });
      return;
    }
    const opacityValue = 1 - percentageDragged;
    if (this.snapPointsState.shouldFade || this.snapPointsState.fadeFromIndex && this.snapPointsState.activeSnapPointIndex === this.snapPointsState.fadeFromIndex - 1) {
      this.onDragProp.current?.(e, percentageDragged);
      set(
        this.overlayNode,
        {
          opacity: `${opacityValue}`,
          transition: "none"
        },
        true
      );
    }
    if (wrapper && this.overlayNode && this.shouldScaleBackground.current) {
      const scaleValue = Math.min(getScale() + percentageDragged * (1 - getScale()), 1);
      const borderRadiusValue = 8 - percentageDragged * 8;
      const translateValue = Math.max(0, 14 - percentageDragged * 14);
      set(
        wrapper,
        {
          borderRadius: `${borderRadiusValue}px`,
          transform: isVertical$1(this.direction.current) ? `scale(${scaleValue}) translate3d(0, ${translateValue}px, 0)` : `scale(${scaleValue}) translate3d(${translateValue}px, 0, 0)`,
          transition: "none"
        },
        true
      );
    }
    if (!this.snapPoints.current) {
      const translateValue = absDraggedDistance * directionMultiplier;
      set(this.drawerNode, {
        transform: isVertical$1(this.direction.current) ? `translate3d(0, ${translateValue}px, 0)` : `translate3d(${translateValue}px, 0, 0)`
      });
    }
  };
  closeDrawer = (fromWithin) => {
    this.cancelDrag();
    this.onCloseProp.current?.();
    if (!fromWithin) {
      this.open.current = false;
    }
    window.setTimeout(
      () => {
        if (this.snapPoints.current && this.snapPoints.current.length > 0) {
          this.activeSnapPoint.current = this.snapPoints.current[0];
        }
      },
      TRANSITIONS.DURATION * 1e3
    );
  };
  resetDrawer = () => {
    if (!this.drawerNode) return;
    const wrapper = document.querySelector("[data-vaul-drawer-wrapper]");
    const currentSwipeAmount = getTranslate(this.drawerNode, this.direction.current);
    set(this.drawerNode, {
      transform: "translate3d(0, 0, 0)",
      transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`
    });
    set(this.overlayNode, {
      transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
      opacity: "1"
    });
    if (this.shouldScaleBackground.current && currentSwipeAmount && currentSwipeAmount > 0 && this.open.current) {
      set(
        wrapper,
        {
          borderRadius: `${BORDER_RADIUS}px`,
          overflow: "hidden",
          ...isVertical$1(this.direction.current) ? {
            transform: `scale(${getScale()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
            transformOrigin: "top"
          } : {
            transform: `scale(${getScale()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
            transformOrigin: "left"
          },
          transitionProperty: "transform, border-radius",
          transitionDuration: `${TRANSITIONS.DURATION}s`,
          transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(",")})`
        },
        true
      );
    }
  };
  cancelDrag = () => {
    if (!this.isDragging || !this.drawerNode) return;
    this.drawerNode.classList.remove(DRAG_CLASS);
    this.isAllowedToDrag = false;
    this.isDragging = false;
    this.dragEndTime = /* @__PURE__ */ new Date();
  };
  onRelease = (e) => {
    if (!this.isDragging || !this.drawerNode) return;
    this.drawerNode.classList.remove(DRAG_CLASS);
    this.isAllowedToDrag = false;
    this.isDragging = false;
    this.dragEndTime = /* @__PURE__ */ new Date();
    const swipeAmount = getTranslate(this.drawerNode, this.direction.current);
    if (!this.shouldDrag(e.target, false) || !swipeAmount || Number.isNaN(swipeAmount)) return;
    if (this.dragStartTime === null) return;
    const timeTaken = this.dragEndTime.getTime() - this.dragStartTime.getTime();
    const distMoved = this.pointerStart - (isVertical$1(this.direction.current) ? e.pageY : e.pageX);
    const velocity = Math.abs(distMoved) / timeTaken;
    if (velocity > 0.05) {
      this.justReleased = true;
      setTimeout(
        () => {
          this.justReleased = false;
        },
        200
      );
    }
    if (this.snapPoints.current) {
      const directionMultiplier = this.direction.current === "bottom" || this.direction.current === "right" ? 1 : -1;
      this.snapPointsState.onRelease({
        draggedDistance: distMoved * directionMultiplier,
        closeDrawer: this.closeDrawer,
        velocity,
        dismissible: this.dismissible.current
      });
      this.onReleaseProp.current?.(e, true);
      return;
    }
    if (this.direction.current === "bottom" || this.direction.current === "right" ? distMoved > 0 : distMoved < 0) {
      this.resetDrawer();
      this.onReleaseProp.current?.(e, true);
      return;
    }
    if (velocity > VELOCITY_THRESHOLD) {
      this.closeDrawer();
      this.onReleaseProp.current?.(e, false);
      return;
    }
    const visibleDrawerHeight = Math.min(this.drawerNode.getBoundingClientRect().height ?? 0, window.innerHeight);
    const visibleDrawerWidth = Math.min(this.drawerNode.getBoundingClientRect().width ?? 0, window.innerWidth);
    const isHorizontalSwipe = this.direction.current === "left" || this.direction.current === "right";
    if (Math.abs(swipeAmount) >= (isHorizontalSwipe ? visibleDrawerWidth : visibleDrawerHeight) * this.closeThreshold.current) {
      this.closeDrawer();
      this.onReleaseProp.current?.(e, false);
      return;
    }
    this.onReleaseProp.current?.(e, true);
    this.resetDrawer();
  };
  onNestedOpenChange = (o) => {
    const scale = o ? (window.innerWidth - NESTED_DISPLACEMENT) / window.innerWidth : 1;
    const y = o ? -16 : 0;
    if (this.nestedOpenChangeTimer) {
      window.clearTimeout(this.nestedOpenChangeTimer);
    }
    set(this.drawerNode, {
      transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
      transform: `scale(${scale}) translate3d(0, ${y}px, 0)`
    });
    if (!o && this.drawerNode) {
      this.nestedOpenChangeTimer = window.setTimeout(
        () => {
          const translateValue = getTranslate(this.drawerNode, this.direction.current);
          set(this.drawerNode, {
            transition: "none",
            transform: isVertical$1(this.direction.current) ? `translate3d(0, ${translateValue}px, 0)` : `translate3d(${translateValue}px, 0, 0)`
          });
        },
        500
      );
    }
  };
  onNestedDrag = (_e, percentageDragged) => {
    if (percentageDragged < 0) return;
    const initialScale = (window.innerWidth - NESTED_DISPLACEMENT) / window.innerWidth;
    const newScale = initialScale + percentageDragged * (1 - initialScale);
    const newTranslate = -16 + percentageDragged * NESTED_DISPLACEMENT;
    set(this.drawerNode, {
      transform: isVertical$1(this.direction.current) ? `scale(${newScale}) translate3d(0, ${newTranslate}px, 0)` : `scale(${newScale}) translate3d(${newTranslate}px, 0, 0)`,
      transition: "none"
    });
  };
  onNestedRelease = (_e, o) => {
    const dim = isVertical$1(this.direction.current) ? window.innerHeight : window.innerWidth;
    const scale = o ? (dim - NESTED_DISPLACEMENT) / dim : 1;
    const translate = o ? -16 : 0;
    if (o) {
      set(this.drawerNode, {
        transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(",")})`,
        transform: isVertical$1(this.direction.current) ? `scale(${scale}) translate3d(0, ${translate}px, 0)` : `scale(${scale}) translate3d(${translate}px, 0, 0)`
      });
    }
  };
  onDialogOpenChange = (o) => {
    if (!this.dismissible.current && !this.open.current) return;
    if (o) {
      this.hasBeenOpened = true;
    } else {
      this.closeDrawer(true);
    }
    this.open.current = o;
  };
}
class DrawerOverlayState {
  #root;
  #id;
  #ref;
  mounted = false;
  constructor(props, root) {
    this.#root = root;
    this.#id = props.id;
    this.#ref = props.ref;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        if (!this.mounted) {
          this.#root.overlayNode = null;
        } else {
          this.#root.overlayNode = node;
        }
      },
      deps: () => this.mounted
    });
  }
  #hasSnapPoints = once(() => this.#root.snapPoints.current && this.#root.snapPoints.current.length > 0);
  #onmouseup = (e) => {
    this.#root.onRelease(e);
  };
  #props = once(() => ({
    id: this.#id.current,
    "data-vaul-overlay": "",
    "data-vaul-snap-points": this.#root.open.current && this.#hasSnapPoints() ? "true" : "false",
    "data-vaul-snap-points-overlay": this.#root.open.current && this.#root.snapPointsState.shouldFade ? "true" : "false",
    onmouseup: this.#onmouseup
  }));
  get props() {
    return this.#props();
  }
}
class DrawerContentState {
  #root;
  #id;
  #ref;
  #onInteractOutsideProp;
  #onPointerDownProp;
  #onPointerMoveProp;
  #onPointerUpProp;
  #onPointerOutProp;
  #onContextMenuProp;
  #onOpenAutoFocusProp;
  //
  delayedSnapPoints = false;
  pointerStart = null;
  lastKnownPointerEvent = null;
  wasBeyondThePoint = false;
  #hasSnapPoints = once(() => this.#root.snapPoints.current && this.#root.snapPoints.current.length > 0);
  get hasSnapPoints() {
    return this.#hasSnapPoints();
  }
  mounted = false;
  constructor(props, root) {
    this.#root = root;
    this.#id = props.id;
    this.#ref = props.ref;
    this.#onInteractOutsideProp = props.onInteractOutside;
    this.#onPointerDownProp = props.onPointerDown;
    this.#onPointerMoveProp = props.onPointerMove;
    this.#onPointerUpProp = props.onPointerUp;
    this.#onPointerOutProp = props.onPointerOut;
    this.#onContextMenuProp = props.onContextMenu;
    this.#onOpenAutoFocusProp = props.onOpenAutoFocus;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        if (!this.mounted) {
          this.#root.drawerNode = null;
        } else {
          this.#root.drawerNode = node;
        }
      },
      deps: () => this.mounted && this.#root.open.current
    });
    useScaleBackground(this.#root);
  }
  isDeltaInDirection = (delta, direction, threshold = 0) => {
    if (this.wasBeyondThePoint) return true;
    const deltaY = Math.abs(delta.y);
    const deltaX = Math.abs(delta.x);
    const isDeltaX = deltaX > deltaY;
    const dFactor = ["bottom", "right"].includes(direction) ? 1 : -1;
    if (direction === "left" || direction === "right") {
      const isReverseDirection = delta.x * dFactor < 0;
      if (!isReverseDirection && deltaX >= 0 && deltaX <= threshold) {
        return isDeltaX;
      }
    } else {
      const isReverseDirection = delta.y * dFactor < 0;
      if (!isReverseDirection && deltaY >= 0 && deltaY <= threshold) {
        return !isDeltaX;
      }
    }
    this.wasBeyondThePoint = true;
    return true;
  };
  handleOnPointerUp = (e) => {
    this.pointerStart = null;
    this.wasBeyondThePoint = false;
    this.#root.onRelease(e);
  };
  onOpenAutoFocus = (e) => {
    this.#onOpenAutoFocusProp.current(e);
  };
  onInteractOutside = (e) => {
    this.#onInteractOutsideProp.current(e);
    if (!this.#root.modal.current || e.defaultPrevented) {
      e.preventDefault();
      return;
    }
    if (this.#root.keyboardIsOpen) {
      this.#root.keyboardIsOpen = false;
    }
  };
  onFocusOutside = (e) => {
    if (!this.#root.modal.current) {
      e.preventDefault();
    }
  };
  #onpointermove = (e) => {
    this.lastKnownPointerEvent = e;
    if (this.#root.handleOnly.current) return;
    this.#onPointerMoveProp.current(e);
    if (!this.pointerStart) return;
    const yPosition = e.pageY - this.pointerStart.y;
    const xPosition = e.pageX - this.pointerStart.x;
    const swipeStartThreshold = e.pointerType === "touch" ? 10 : 2;
    const delta = { x: xPosition, y: yPosition };
    const isAllowedToSwipe = this.isDeltaInDirection(delta, this.#root.direction.current, swipeStartThreshold);
    if (isAllowedToSwipe) this.#root.onDrag(e);
    else if (Math.abs(xPosition) > swipeStartThreshold || Math.abs(yPosition) > swipeStartThreshold) {
      this.pointerStart = null;
    }
  };
  #onpointerup = (e) => {
    this.#onPointerUpProp.current(e);
    this.pointerStart = null;
    this.wasBeyondThePoint = false;
    this.#root.onRelease(e);
  };
  #onpointerout = (e) => {
    this.#onPointerOutProp.current(e);
    if (!this.lastKnownPointerEvent) return;
    this.handleOnPointerUp(this.lastKnownPointerEvent);
  };
  #oncontextmenu = (e) => {
    this.#onContextMenuProp.current(e);
    if (!this.lastKnownPointerEvent) return;
    this.handleOnPointerUp(this.lastKnownPointerEvent);
  };
  #onpointerdown = (e) => {
    if (this.#root.handleOnly.current) return;
    this.#onPointerDownProp.current(e);
    this.pointerStart = { x: e.pageX, y: e.pageY };
    this.#root.onPress(e);
  };
  #snapPointsOffset = once(() => snapshot(this.#root.snapPointsState.snapPointsOffset));
  get snapPointsOffset() {
    return this.#snapPointsOffset();
  }
  #props = once(() => ({
    id: this.#id.current,
    "data-vaul-drawer-direction": this.#root.direction.current,
    "data-vaul-drawer": "",
    "data-vaul-delayed-snap-points": this.delayedSnapPoints ? "true" : "false",
    "data-vaul-custom-container": this.#root.container.current ? "true" : "false",
    "data-vaul-snap-points": this.#root.open.current && this.hasSnapPoints ? "true" : "false",
    style: this.snapPointsOffset && this.snapPointsOffset.length > 0 ? {
      "--snap-point-height": `${this.snapPointsOffset[0]}px`
    } : void 0,
    onpointerdown: this.#onpointerdown,
    onpointermove: this.#onpointermove,
    onpointerup: this.#onpointerup,
    onpointerout: this.#onpointerout,
    oncontextmenu: this.#oncontextmenu
  }));
  get props() {
    return this.#props();
  }
}
class DrawerPortalState {
  #root;
  constructor(root) {
    this.#root = root;
  }
  #props = once(() => ({
    to: this.#root.container.current ? this.#root.container.current : void 0
  }));
  get props() {
    return this.#props();
  }
}
const [setDrawerRootContext, getDrawerRootContext] = createContext("Drawer.Root");
function useDrawerRoot(props) {
  return setDrawerRootContext(new DrawerRootState(props));
}
function useDrawerContent(props) {
  const root = getDrawerRootContext();
  return new DrawerContentState(props, root);
}
function useDrawerOverlay(props) {
  const root = getDrawerRootContext();
  return new DrawerOverlayState(props, root);
}
function useDrawerPortal() {
  const root = getDrawerRootContext();
  return new DrawerPortalState(root);
}
function getScale() {
  return (window.innerWidth - WINDOW_TOP_OFFSET) / window.innerWidth;
}
function dampenValue(v) {
  return 8 * (Math.log(v + 1) - 2);
}
function useRefById({
  id,
  ref,
  deps = () => true,
  onRefChange = () => {
  }
}) {
  (() => deps())();
}
function Drawer$1($$payload, $$props) {
  push();
  let {
    open = false,
    onOpenChange = noop,
    closeThreshold = CLOSE_THRESHOLD,
    scrollLockTimeout = SCROLL_LOCK_TIMEOUT,
    snapPoints,
    fadeFromIndex = snapPoints && snapPoints.length - 1,
    backgroundColor = "black",
    nested = false,
    shouldScaleBackground = false,
    activeSnapPoint = null,
    onActiveSnapPointChange = noop,
    onRelease = noop,
    onDrag = noop,
    onClose = noop,
    dismissible = true,
    direction = "bottom",
    fixed = false,
    handleOnly = false,
    noBodyStyles = false,
    preventScrollRestoration = true,
    setBackgroundColorOnScale = true,
    disablePreventScroll = false,
    onAnimationEnd = noop,
    controlledOpen = false,
    repositionInputs = true,
    autoFocus = false,
    snapToSequentialPoint = false,
    container = null,
    controlledActiveSnapPoint = false,
    modal = true,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = useDrawerRoot({
    open: box.with(() => open, (o) => {
      if (controlledOpen) {
        handleOpenChange(open);
      } else {
        open = o;
        handleOpenChange(o);
      }
    }),
    closeThreshold: box.with(() => closeThreshold),
    scrollLockTimeout: box.with(() => scrollLockTimeout),
    snapPoints: box.with(() => snapPoints),
    fadeFromIndex: box.with(() => fadeFromIndex),
    backgroundColor: box.with(() => backgroundColor),
    nested: box.with(() => nested),
    shouldScaleBackground: box.with(() => shouldScaleBackground),
    activeSnapPoint: box.with(() => activeSnapPoint, (v) => {
      if (controlledActiveSnapPoint) {
        onActiveSnapPointChange(v);
      } else {
        activeSnapPoint = v;
        onActiveSnapPointChange(v);
      }
    }),
    onRelease: box.with(() => onRelease),
    onDrag: box.with(() => onDrag),
    onClose: box.with(() => onClose),
    dismissible: box.with(() => dismissible),
    direction: box.with(() => direction),
    fixed: box.with(() => fixed),
    modal: box.with(() => modal),
    handleOnly: box.with(() => handleOnly),
    noBodyStyles: box.with(() => noBodyStyles),
    preventScrollRestoration: box.with(() => preventScrollRestoration),
    setBackgroundColorOnScale: box.with(() => setBackgroundColorOnScale),
    disablePreventScroll: box.with(() => disablePreventScroll),
    repositionInputs: box.with(() => repositionInputs),
    autoFocus: box.with(() => autoFocus),
    snapToSequentialPoint: box.with(() => snapToSequentialPoint),
    container: box.with(() => container)
  });
  let bodyStyles;
  function handleOpenChange(o) {
    onOpenChange?.(o);
    if (o && !nested) {
      bodyStyles = document.body.style.cssText;
    } else if (!o && !nested) {
      afterSleep(TRANSITIONS.DURATION * 1e3, () => {
        document.body.style.cssText = bodyStyles;
      });
    }
    if (!o && !nested) {
      rootState.positionFixedState.restorePositionSetting();
    }
    setTimeout(
      () => {
        onAnimationEnd?.(o);
      },
      TRANSITIONS.DURATION * 1e3
    );
    if (o && !modal) {
      if (typeof window !== "undefined") {
        window.requestAnimationFrame(() => {
          document.body.style.pointerEvents = "auto";
        });
      }
    }
    if (!o) {
      document.body.style.pointerEvents = "auto";
    }
  }
  $$payload.out += `<!---->`;
  Dialog($$payload, spread_props([
    {
      controlledOpen: true,
      open: rootState.open.current,
      onOpenChange: (o) => {
        rootState.onDialogOpenChange(o);
        handleOpenChange(o);
      }
    },
    restProps
  ]));
  $$payload.out += `<!---->`;
  bind_props($$props, { open, activeSnapPoint });
  pop();
}
function Mounted($$payload, $$props) {
  push();
  let { onMounted } = $$props;
  pop();
}
class Counter {
  value = 0;
  constructor(initialValue = 0) {
    this.value = initialValue;
  }
}
const count = new Counter(0);
function useId() {
  const num = count.value++;
  return `vaul-${num}`;
}
function Drawer_content$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    onOpenAutoFocus = noop,
    onInteractOutside = noop,
    oncontextmenu = noop,
    onpointerdown = noop,
    onpointerup = noop,
    onpointerout = noop,
    onpointermove = noop,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = useDrawerContent({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    onContextMenu: box.with(() => oncontextmenu ?? noop),
    onInteractOutside: box.with(() => onInteractOutside),
    onPointerDown: box.with(() => onpointerdown ?? noop),
    onPointerMove: box.with(() => onpointermove ?? noop),
    onPointerOut: box.with(() => onpointerout ?? noop),
    onPointerUp: box.with(() => onpointerup ?? noop),
    onOpenAutoFocus: box.with(() => onOpenAutoFocus)
  });
  const mergedProps = mergeProps(restProps, contentState.props);
  $$payload.out += `<!---->`;
  Dialog_content($$payload, spread_props([
    mergedProps,
    {
      preventScroll: true,
      children: ($$payload2) => {
        children?.($$payload2);
        $$payload2.out += `<!----> `;
        Mounted($$payload2, { onMounted: (m) => contentState.mounted = m });
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  $$payload.out += `<!---->`;
  bind_props($$props, { ref });
  pop();
}
function Drawer_overlay$1($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const overlayState = useDrawerOverlay({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, overlayState.props);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Dialog_overlay($$payload2, spread_props([
      mergedProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        },
        children: ($$payload3) => {
          Mounted($$payload3, {
            onMounted: (m) => {
              overlayState.mounted = m;
            }
          });
          $$payload3.out += `<!----> `;
          children?.($$payload3);
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
function Drawer_portal($$payload, $$props) {
  push();
  const portalState = useDrawerPortal();
  let {
    to = portalState.props.to,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<!---->`;
  Portal($$payload, spread_props([{ to }, restProps]));
  $$payload.out += `<!---->`;
  pop();
}
const Trigger$1 = Dialog_trigger;
function Drawer_overlay($$payload, $$props) {
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
    Drawer_overlay$1($$payload2, spread_props([
      {
        class: cn("fixed inset-0 z-50 bg-black/80", className)
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
function Drawer_content($$payload, $$props) {
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
    Drawer_portal($$payload2, {
      children: ($$payload3) => {
        Drawer_overlay($$payload3, {});
        $$payload3.out += `<!----> <!---->`;
        Drawer_content$1($$payload3, spread_props([
          {
            class: cn("bg-neutral-1 fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border", className)
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
              $$payload4.out += `<div class="bg-neutral-3 mx-auto mt-4 h-2 w-[100px] rounded-full"></div> `;
              children?.($$payload4);
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          }
        ]));
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
  bind_props($$props, { ref });
  pop();
}
function Drawer($$payload, $$props) {
  push();
  let {
    shouldScaleBackground = true,
    open = false,
    activeSnapPoint = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Drawer$1($$payload2, spread_props([
      { shouldScaleBackground },
      restProps,
      {
        get open() {
          return open;
        },
        set open($$value) {
          open = $$value;
          $$settled = false;
        },
        get activeSnapPoint() {
          return activeSnapPoint;
        },
        set activeSnapPoint($$value) {
          activeSnapPoint = $$value;
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
  bind_props($$props, { open, activeSnapPoint });
  pop();
}
const Trigger = Trigger$1;
function BottombarGardenDrawer($$payload, $$props) {
  push();
  let { gardenTabs } = $$props;
  let open = false;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<li class="hover:bg-neutral-3 w-full"><!---->`;
    Drawer($$payload2, {
      direction: "bottom",
      get open() {
        return open;
      },
      set open($$value) {
        open = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        Trigger($$payload3, {
          class: "flex h-full w-full items-center justify-center p-2",
          children: ($$payload4) => {
            Icon($$payload4, { icon: iconIds.gardenDrawerIcon, width: "3rem" });
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <!---->`;
        Drawer_content($$payload3, {
          class: "bg-neutral-3 flex items-center",
          children: ($$payload4) => {
            $$payload4.out += `<!---->`;
            Accordion($$payload4, {
              type: "single",
              class: "w-full",
              children: ($$payload5) => {
                const each_array = ensure_array_like(gardenTabs ?? []);
                $$payload5.out += `<!--[-->`;
                for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
                  let spec = each_array[$$index_1];
                  if (spec !== void 0) {
                    $$payload5.out += "<!--[-->";
                    $$payload5.out += `<!---->`;
                    Accordion_item($$payload5, {
                      value: spec.label,
                      class: "mx-12 w-full",
                      children: ($$payload6) => {
                        $$payload6.out += `<!---->`;
                        Accordion_header($$payload6, {
                          children: ($$payload7) => {
                            $$payload7.out += `<!---->`;
                            Accordion_trigger($$payload7, {
                              class: "my-6 flex w-full items-center justify-start",
                              children: ($$payload8) => {
                                Icon($$payload8, {
                                  icon: spec.iconId,
                                  width: "1.5rem",
                                  class: "mr-6"
                                });
                                $$payload8.out += `<!----> <span>${escape_html(spec.label)}</span>`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!---->`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload6.out += `<!----> <!---->`;
                        Accordion_content($$payload6, {
                          class: "border-neutral-10 mx-4 border-l",
                          children: ($$payload7) => {
                            $$payload7.out += `<ul class="px-4">`;
                            if (spec.submenuItems) {
                              $$payload7.out += "<!--[-->";
                              const each_array_1 = ensure_array_like(spec.submenuItems ?? []);
                              $$payload7.out += `<!--[-->`;
                              for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
                                let item = each_array_1[$$index];
                                $$payload7.out += `<li><!---->`;
                                Button($$payload7, {
                                  href: item.url,
                                  class: "my-4 flex items-center",
                                  children: ($$payload8) => {
                                    if (item.iconId) {
                                      $$payload8.out += "<!--[-->";
                                      Icon($$payload8, {
                                        icon: item.iconId,
                                        width: "1rem",
                                        class: "mr-4"
                                      });
                                    } else {
                                      $$payload8.out += "<!--[!-->";
                                    }
                                    $$payload8.out += `<!--]--> <span${attr_class(clsx(item.className ?? ""))}>${escape_html(item.label)}</span>`;
                                  },
                                  $$slots: { default: true }
                                });
                                $$payload7.out += `<!----></li>`;
                              }
                              $$payload7.out += `<!--]-->`;
                            } else {
                              $$payload7.out += "<!--[!-->";
                            }
                            $$payload7.out += `<!--]--></ul>`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload6.out += `<!---->`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload5.out += `<!---->`;
                  } else {
                    $$payload5.out += "<!--[!-->";
                  }
                  $$payload5.out += `<!--]-->`;
                }
                $$payload5.out += `<!--]-->`;
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
    $$payload2.out += `<!----></li>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
function Tab($$payload, $$props) {
  push();
  let {
    spec,
    side,
    iconSize,
    flipped = false,
    altIcon
  } = $$props;
  let open = false;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<li${attr_class("hover:bg-neutral-3 w-full", void 0, { "bg-neutral-3": open })}><!---->`;
    Root($$payload2, {
      get open() {
        return open;
      },
      set open($$value) {
        open = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        Trigger$2($$payload3, {
          class: "flex h-full w-full items-center justify-center p-2",
          children: ($$payload4) => {
            if (altIcon) {
              $$payload4.out += "<!--[-->";
              altIcon($$payload4);
              $$payload4.out += `<!---->`;
            } else {
              $$payload4.out += "<!--[!-->";
              Icon($$payload4, { icon: spec.iconId, width: iconSize });
            }
            $$payload4.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <!---->`;
        Popover_content($$payload3, {
          side,
          class: "bg-neutral-3 h-auto w-auto max-w-96 p-0",
          children: ($$payload4) => {
            const each_array = ensure_array_like(spec.submenuItems ?? []);
            $$payload4.out += `<ul${attr_class("flex flex-col items-center", void 0, { "flex-col-reverse": flipped })}><li class="flex w-full items-center justify-center py-2"><span class="font-extralight">${escape_html(spec.label)}</span></li> <!---->`;
            Separator($$payload4, { class: "bg-neutral-6" });
            $$payload4.out += `<!----> <!--[-->`;
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let item = each_array[$$index];
              $$payload4.out += `<li class="group h-full w-full"><!---->`;
              Button($$payload4, {
                class: `hover:bg-primary-4 flex h-full w-full items-center py-2 ${stringify(item.iconId ? "justify-start" : "justify-center")} ${stringify(flipped ? "group-last:rounded-t-md" : "group-last:rounded-b-md")}`,
                href: item.url,
                children: ($$payload5) => {
                  if (item.iconId) {
                    $$payload5.out += "<!--[-->";
                    Icon($$payload5, {
                      icon: item.iconId,
                      class: "mx-2",
                      width: "2rem"
                    });
                  } else {
                    $$payload5.out += "<!--[!-->";
                  }
                  $$payload5.out += `<!--]--> <span${attr_class(clsx(cn(item.className, "mx-2")))}>${escape_html(item.label)}</span>`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----></li>`;
            }
            $$payload4.out += `<!--]--></ul>`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></li>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
function clientProfileIcon$1($$payload) {
  ClientAvatarIcon($$payload, { size: "3rem" });
}
function Bottombar($$payload, $$props) {
  push();
  let {
    gardensTab,
    gardenTabs,
    traitsTab,
    resourcesTab,
    profileTab
  } = $$props;
  $$payload.out += `<nav class="border-neutral-6 bg-neutral-2 fixed bottom-0 h-16 w-full border-t"><ul class="flex flex-row items-center justify-around">`;
  Tab($$payload, {
    spec: profileTab,
    side: "top",
    flipped: true,
    iconSize: "3rem",
    altIcon: clientProfileIcon$1
  });
  $$payload.out += `<!----> `;
  Tab($$payload, {
    spec: resourcesTab,
    side: "top",
    flipped: true,
    iconSize: "3rem"
  });
  $$payload.out += `<!----> `;
  Tab($$payload, {
    spec: traitsTab,
    side: "top",
    flipped: true,
    iconSize: "3rem"
  });
  $$payload.out += `<!----> `;
  Tab($$payload, {
    spec: gardensTab,
    side: "top",
    flipped: true,
    iconSize: "3rem"
  });
  $$payload.out += `<!----> `;
  if (gardenContext.id) {
    $$payload.out += "<!--[-->";
    BottombarGardenDrawer($$payload, { gardenTabs });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></ul></nav>`;
  pop();
}
function clientProfileIcon($$payload) {
  ClientAvatarIcon($$payload, { size: "2rem" });
}
function Sidebar($$payload, $$props) {
  push();
  let {
    gardensTab,
    gardenTabs,
    bottomTabs,
    profileTab
  } = $$props;
  const each_array_1 = ensure_array_like(bottomTabs);
  $$payload.out += `<nav class="border-neutral-8 bg-neutral-2 fixed top-0 flex h-full flex-col justify-between border-r"><ul><li class="hover:bg-neutral-3 p-2"><!---->`;
  Button($$payload, {
    class: "flex items-center justify-center",
    href: "/",
    children: ($$payload2) => {
      Logo($$payload2, { size: "2rem" });
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></li> `;
  Tab($$payload, {
    spec: gardensTab,
    side: "right",
    iconSize: "2rem"
  });
  $$payload.out += `<!----> `;
  if (gardenContext.id) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(gardenTabs);
    $$payload.out += `<!---->`;
    Separator($$payload, { class: "bg-neutral-6" });
    $$payload.out += `<!----> <!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      Tab($$payload, { spec: tab, side: "right", iconSize: "2rem" });
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></ul> <ul><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let tab = each_array_1[$$index_1];
    Tab($$payload, {
      spec: tab,
      flipped: true,
      side: "right",
      iconSize: "2rem"
    });
  }
  $$payload.out += `<!--]--> `;
  Tab($$payload, {
    spec: profileTab,
    flipped: true,
    side: "right",
    iconSize: "2rem",
    altIcon: clientProfileIcon
  });
  $$payload.out += `<!----></ul></nav>`;
  pop();
}
function PrimaryNav($$payload, $$props) {
  push();
  let {
    gardensTab,
    gardenTabs,
    profileTab,
    traitsTab,
    resourcesTab,
    children
  } = $$props;
  const isMobile = new IsMobile();
  if (isMobile.current) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="flex h-screen w-screen flex-col overflow-clip"><div class="mb-16 ml-0 h-auto w-full grow overflow-auto">`;
    children($$payload);
    $$payload.out += `<!----></div> `;
    Bottombar($$payload, {
      gardensTab,
      gardenTabs,
      traitsTab,
      resourcesTab,
      profileTab
    });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div class="flex h-screen w-screen flex-row overflow-clip">`;
    Sidebar($$payload, {
      gardensTab,
      gardenTabs,
      bottomTabs: [traitsTab, resourcesTab],
      profileTab
    });
    $$payload.out += `<!----> <div class="mb-0 ml-14 h-auto w-full grow overflow-auto">`;
    children($$payload);
    $$payload.out += `<!----></div></div>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
const getGardenBaseUrl = (gardenId) => {
  return "/gardens/" + gardenId;
};
const MAX_GARDENS_IN_TAB_SIDEBAR = 10;
const getGardensAuthTab = (gardens = []) => {
  const viewAllSubmenuItem = {
    url: getGardenBaseUrl(""),
    label: "View All",
    className: "underline"
  };
  const gardensSubmenuItems = gardens.slice(0, MAX_GARDENS_IN_TAB_SIDEBAR).map((garden) => ({
    label: garden.name,
    url: getGardenBaseUrl(garden.id),
    className: "truncate italic"
  }));
  return {
    id: "gardens",
    label: "Gardens",
    iconId: iconIds.gardensIcon,
    submenuItems: [...gardensSubmenuItems, viewAllSubmenuItem]
  };
};
const getGardensAnonTab = () => {
  const discoverSubmenuItem = {
    url: getGardenBaseUrl("discover"),
    label: "Discover",
    iconId: iconIds.gardensIcon
  };
  return {
    id: "gardens",
    label: "Gardens",
    iconId: iconIds.gardensIcon,
    submenuItems: [discoverSubmenuItem]
  };
};
const getTraitsTab = () => {
  return {
    id: "traits",
    label: "Traits",
    iconId: iconIds.traitsIcon,
    submenuItems: [
      {
        label: "Cultivars",
        iconId: iconIds.cultivarIcon,
        url: "/app/traits/cultivars"
      },
      {
        label: "Workspaces",
        iconId: iconIds.workspaceIcon,
        url: "/app/traits/workspaces"
      },
      {
        label: "Environments",
        iconId: iconIds.environmentIcon,
        url: "/app/traits/environments"
      }
    ]
  };
};
const getResourcesTab = () => {
  return {
    id: "resources",
    label: "Resources",
    iconId: iconIds.resourcesIcon,
    submenuItems: [
      {
        label: "Guides",
        url: "/guides",
        iconId: iconIds.resourcesGuidesIcon
      },
      {
        label: "Project",
        url: externalLinks.project,
        iconId: iconIds.resourcesProjectIcon
      },
      {
        label: "Donate",
        url: externalLinks.donation,
        iconId: iconIds.resourcesDonateIcon
      }
    ]
  };
};
const getAuthProfileTab = () => {
  return {
    id: "profile",
    label: "Profile",
    iconId: iconIds.profileIcon,
    submenuItems: [
      {
        label: "Notifications",
        url: "/app/notifications",
        iconId: iconIds.profileNotificationsIcon
      },
      {
        label: "Account",
        url: "/app/account",
        iconId: iconIds.profileAccountIcon
      },
      {
        label: "Settings",
        url: "/app/settings",
        iconId: iconIds.profileSettingsIcon
      }
    ]
  };
};
const getAnonProfileTab = () => {
  {
    return {
      id: "account",
      label: "Account",
      iconId: iconIds.profileIcon,
      submenuItems: [
        { label: "Login", url: "/login" },
        { label: "Register", url: "/register" }
      ]
    };
  }
};
function PrimaryNavContainerAuth($$payload, $$props) {
  push();
  let { children } = $$props;
  useQuery(triplit, gardenQuery.Vars({ id: gardenContext.id }));
  let gardensTab = (() => {
    const mostRelevantGardens = [];
    return getGardensAuthTab(mostRelevantGardens);
  })();
  let gardenTabs = (() => {
    {
      return [];
    }
  })();
  let profileTab = (() => {
    return getAuthProfileTab();
  })();
  const traitsTab = getTraitsTab();
  const resourcesTab = getResourcesTab();
  PrimaryNav($$payload, {
    gardensTab,
    gardenTabs,
    profileTab,
    traitsTab,
    resourcesTab,
    children
  });
  pop();
}
function PrimaryNavContainerUnauth($$payload, $$props) {
  push();
  let { children } = $$props;
  useQuery(triplit, gardenQuery.Vars({ id: gardenContext.id }));
  let gardensTab = getGardensAnonTab();
  let gardenTabs = (() => {
    {
      return [];
    }
  })();
  let profileTab = (() => {
    return getAnonProfileTab();
  })();
  const traitsTab = getTraitsTab();
  const resourcesTab = getResourcesTab();
  PrimaryNav($$payload, {
    gardensTab,
    gardenTabs,
    profileTab,
    traitsTab,
    resourcesTab,
    children
  });
  pop();
}
function PrimaryNavContainer($$payload, $$props) {
  push();
  let { children } = $$props;
  if (auth.isAuthenticated) {
    $$payload.out += "<!--[-->";
    PrimaryNavContainerAuth($$payload, { children });
  } else {
    $$payload.out += "<!--[!-->";
    PrimaryNavContainerUnauth($$payload, { children });
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function _layout($$payload, $$props) {
  push();
  let { children } = $$props;
  derivedMode.subscribe((value) => {
    mode.value = value;
  });
  let initialized = false;
  {
    setTimeout(
      () => {
        userLogin.mutation({
          email: "test@Verdagraph.com",
          password: "password"
        }).then(() => {
          initialized = true;
        });
      },
      1e3
    );
  }
  Mode_watcher($$payload, {});
  $$payload.out += `<!---->  `;
  if (initialized) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="h-screen w-screen overflow-hidden"><!---->`;
    Provider($$payload, {
      delayDuration: 500,
      children: ($$payload2) => {
        PrimaryNavContainer($$payload2, {
          children: ($$payload3) => {
            children($$payload3);
            $$payload3.out += `<!---->`;
          }
        });
      }
    });
    $$payload.out += `<!----></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _layout as default
};
