import { p as push, c as spread_attributes, d as bind_props, a as pop, e as copy_payload, f as assign_payload, g as spread_props, m as ensure_array_like, v as store_get, n as escape_html, w as unsubscribe_stores, x as store_mutate, h as head } from "../../../../chunks/index2.js";
import { o as onDestroy, t as tick, I as Icon } from "../../../../chunks/Icon.js";
import { g as goto } from "../../../../chunks/client.js";
import "clsx";
import { u as useId$1, e as useDescription, s as superForm, z as zod, d as defaults$2, F as Form_field, C as Control, a as Form_field_errors, b as Form_label, I as Input, c as Form_button } from "../../../../chunks/zod.js";
import "../../../../chunks/stringify.js";
import { t as triplit, b as gardenFields } from "../../../../chunks/auth.svelte.js";
import { g as gardenCreate, T as Textarea } from "../../../../chunks/commands2.js";
import { c as createCommandHandler } from "../../../../chunks/commandHandler.svelte.js";
import { d as derived, g as get, w as writable, r as readable, a as readonly } from "../../../../chunks/index.js";
import { u as useQuery } from "../../../../chunks/index.svelte.js";
import { u as userProfilesUsernameQuery } from "../../../../chunks/queries3.js";
import { i as iconIds } from "../../../../chunks/icons.js";
import { R as Root, T as Trigger, d as Popover_content } from "../../../../chunks/index3.js";
import { e as useId, f as box, m as mergeProps } from "../../../../chunks/use-id.js";
import { c as cn } from "../../../../chunks/shadcn.js";
import { B as Button } from "../../../../chunks/button2.js";
import { d as useSelectGroupHeading, R as Root$1, S as Select_trigger, a as Select_content, G as Group, b as Select_item } from "../../../../chunks/index7.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../../../chunks/card.js";
function Select_group_heading$1($$payload, $$props) {
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
  const groupHeadingState = useSelectGroupHeading({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, groupHeadingState.props);
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
function Select_group_heading($$payload, $$props) {
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
    Select_group_heading$1($$payload2, spread_props([
      {
        class: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)
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
function Description($$payload, $$props) {
  push();
  let {
    id = useId$1(),
    ref = null,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const descriptionState = useDescription({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, descriptionState.props);
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
function Form_description($$payload, $$props) {
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
    Description($$payload2, spread_props([
      {
        class: cn("text-neutral-11 text-sm", className)
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
function styleToString(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return str + `${key}:${style[key]};`;
  }, "");
}
function disabledAttr(disabled) {
  return disabled ? true : void 0;
}
({
  style: styleToString({
    position: "absolute",
    opacity: 0,
    "pointer-events": "none",
    margin: 0,
    transform: "translateX(-100%)"
  })
});
function omit(obj, ...keys) {
  const result = {};
  for (const key of Object.keys(obj)) {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
function removeUndefined(obj) {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== void 0) {
      result[key] = value;
    }
  }
  return result;
}
function lightable(value) {
  function subscribe(run) {
    run(value);
    return () => {
    };
  }
  return { subscribe };
}
function getElementByMeltId(id) {
  if (!isBrowser)
    return null;
  const el = document.querySelector(`[data-melt-id="${id}"]`);
  return isHTMLElement(el) ? el : null;
}
const hiddenAction = (obj) => {
  return new Proxy(obj, {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    ownKeys(target) {
      return Reflect.ownKeys(target).filter((key) => key !== "action");
    }
  });
};
const isFunctionWithParams = (fn) => {
  return typeof fn === "function";
};
makeElement("empty");
function makeElement(name2, args) {
  const { stores, action, returned } = args ?? {};
  const derivedStore = (() => {
    if (stores && returned) {
      return derived(stores, (values) => {
        const result = returned(values);
        if (isFunctionWithParams(result)) {
          const fn = (...args2) => {
            return hiddenAction(removeUndefined({
              ...result(...args2),
              [`data-melt-${name2}`]: "",
              action: action ?? noop
            }));
          };
          fn.action = action ?? noop;
          return fn;
        }
        return hiddenAction(removeUndefined({
          ...result,
          [`data-melt-${name2}`]: "",
          action: action ?? noop
        }));
      });
    } else {
      const returnedFn = returned;
      const result = returnedFn?.();
      if (isFunctionWithParams(result)) {
        const resultFn = (...args2) => {
          return hiddenAction(removeUndefined({
            ...result(...args2),
            [`data-melt-${name2}`]: "",
            action: action ?? noop
          }));
        };
        resultFn.action = action ?? noop;
        return lightable(resultFn);
      }
      return lightable(hiddenAction(removeUndefined({
        ...result,
        [`data-melt-${name2}`]: "",
        action: action ?? noop
      })));
    }
  })();
  const actionFn = action ?? (() => {
  });
  actionFn.subscribe = derivedStore.subscribe;
  return actionFn;
}
function createElHelpers(prefix) {
  const name2 = (part) => part ? `${prefix}-${part}` : prefix;
  const attribute2 = (part) => `data-melt-${prefix}${part ? `-${part}` : ""}`;
  const selector2 = (part) => `[data-melt-${prefix}${part ? `-${part}` : ""}]`;
  const getEl = (part) => document.querySelector(selector2(part));
  return {
    name: name2,
    attribute: attribute2,
    selector: selector2,
    getEl
  };
}
const isBrowser = typeof document !== "undefined";
function isElement(element) {
  return element instanceof Element;
}
function isHTMLElement(element) {
  return element instanceof HTMLElement;
}
function isHTMLInputElement(element) {
  return element instanceof HTMLInputElement;
}
function executeCallbacks(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
function noop() {
}
function addEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options));
  };
}
function addMeltEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  if (typeof handler === "function") {
    const handlerWithMelt = withMelt((_event) => handler(_event));
    events.forEach((_event) => target.addEventListener(_event, handlerWithMelt, options));
    return () => {
      events.forEach((_event) => target.removeEventListener(_event, handlerWithMelt, options));
    };
  }
  return () => noop();
}
function dispatchMeltEvent(originalEvent) {
  const node = originalEvent.currentTarget;
  if (!isHTMLElement(node))
    return null;
  const customMeltEvent = new CustomEvent(`m-${originalEvent.type}`, {
    detail: {
      originalEvent
    },
    cancelable: true
  });
  node.dispatchEvent(customMeltEvent);
  return customMeltEvent;
}
function withMelt(handler) {
  return (event) => {
    const customEvent = dispatchMeltEvent(event);
    if (customEvent?.defaultPrevented)
      return;
    return handler(event);
  };
}
const safeOnDestroy = (fn) => {
  try {
    onDestroy(fn);
  } catch {
    return fn;
  }
};
function withGet(store) {
  return {
    ...store,
    get: () => get(store)
  };
}
withGet.writable = function(initial) {
  const internal = writable(initial);
  let value = initial;
  return {
    subscribe: internal.subscribe,
    set(newValue) {
      internal.set(newValue);
      value = newValue;
    },
    update(updater) {
      const newValue = updater(value);
      internal.set(newValue);
      value = newValue;
    },
    get() {
      return value;
    }
  };
};
withGet.derived = function(stores, fn) {
  const subscribers = /* @__PURE__ */ new Map();
  const get2 = () => {
    const values = Array.isArray(stores) ? stores.map((store) => store.get()) : stores.get();
    return fn(values);
  };
  const subscribe = (subscriber) => {
    const unsubscribers = [];
    const storesArr = Array.isArray(stores) ? stores : [stores];
    storesArr.forEach((store) => {
      unsubscribers.push(store.subscribe(() => {
        subscriber(get2());
      }));
    });
    subscriber(get2());
    subscribers.set(subscriber, unsubscribers);
    return () => {
      const unsubscribers2 = subscribers.get(subscriber);
      if (unsubscribers2) {
        for (const unsubscribe of unsubscribers2) {
          unsubscribe();
        }
      }
      subscribers.delete(subscriber);
    };
  };
  return {
    get: get2,
    subscribe
  };
};
const overridable = (_store, onChange) => {
  const store = withGet(_store);
  const update = (updater, sideEffect) => {
    store.update((curr) => {
      const next = updater(curr);
      let res = next;
      if (onChange) {
        res = onChange({ curr, next });
      }
      sideEffect?.(res);
      return res;
    });
  };
  const set = (curr) => {
    update(() => curr);
  };
  return {
    ...store,
    update,
    set
  };
};
let urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let nanoid = (size = 21) => {
  let id = "";
  let i = size | 0;
  while (i--) {
    id += urlAlphabet[Math.random() * 64 | 0];
  }
  return id;
};
function generateId() {
  return nanoid(10);
}
function generateIds(args) {
  return args.reduce((acc, curr) => {
    acc[curr] = generateId();
    return acc;
  }, {});
}
const kbd = {
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  BACKSPACE: "Backspace",
  DELETE: "Delete",
  END: "End",
  ENTER: "Enter",
  ESCAPE: "Escape",
  HOME: "Home",
  SPACE: " "
};
function debounce(fn, wait = 500) {
  let timeout;
  const debounced = (...args) => {
    clearTimeout(timeout);
    const later = () => fn(...args);
    timeout = setTimeout(later, wait);
  };
  debounced.destroy = () => clearTimeout(timeout);
  return debounced;
}
function effect(stores, fn, opts = {}) {
  const { skipFirstRun } = opts;
  let isFirstRun = true;
  let cb = void 0;
  const destroy = derived(stores, (stores2) => {
    cb?.();
    if (isFirstRun && skipFirstRun) {
      isFirstRun = false;
    } else {
      cb = fn(stores2);
    }
  }).subscribe(noop);
  const unsub = () => {
    destroy();
    cb?.();
  };
  safeOnDestroy(unsub);
  return unsub;
}
function toWritableStores(properties) {
  const result = {};
  Object.keys(properties).forEach((key) => {
    const propertyKey = key;
    const value = properties[propertyKey];
    result[propertyKey] = withGet(writable(value));
  });
  return result;
}
function isOrContainsTarget(node, target) {
  return node === target || node.contains(target);
}
function getOwnerDocument(el) {
  return el?.ownerDocument ?? document;
}
({
  disabled: readable(false),
  required: readable(false),
  name: readable(void 0),
  type: readable(void 0)
});
const layers = /* @__PURE__ */ new Set();
const useInteractOutside = (node, config = {}) => {
  let unsubEvents = noop;
  let unsubPointerDown = noop;
  let unsubPointerUp = noop;
  let unsubResetInterceptedEvents = noop;
  layers.add(node);
  const documentObj = getOwnerDocument(node);
  let isPointerDown = false;
  let isPointerDownInside = false;
  const interceptedEvents = {
    pointerdown: false,
    pointerup: false,
    mousedown: false,
    mouseup: false,
    touchstart: false,
    touchend: false,
    click: false
  };
  const resetInterceptedEvents = () => {
    for (const eventType in interceptedEvents) {
      interceptedEvents[eventType] = false;
    }
  };
  const isAnyEventIntercepted = () => {
    for (const isIntercepted of Object.values(interceptedEvents)) {
      if (isIntercepted)
        return true;
    }
    return false;
  };
  const setupCapturePhaseHandlerAndMarkAsIntercepted = (eventType, handler) => {
    return addEventListener(documentObj, eventType, (e) => {
      interceptedEvents[eventType] = true;
      handler?.(e);
    }, true);
  };
  const setupBubblePhaseHandlerAndMarkAsNotIntercepted = (eventType, handler) => {
    return addEventListener(documentObj, eventType, (e) => {
      interceptedEvents[eventType] = false;
      handler?.(e);
    });
  };
  function update(config2) {
    unsubEvents();
    unsubPointerDown();
    unsubPointerUp();
    unsubResetInterceptedEvents();
    resetInterceptedEvents();
    const { onInteractOutside, onInteractOutsideStart, enabled } = { enabled: true, ...config2 };
    if (!enabled)
      return;
    let wasTopLayerInPointerDownCapture = false;
    const onPointerDownDebounced = debounce((e) => {
      if (!wasTopLayerInPointerDownCapture || isAnyEventIntercepted())
        return;
      if (onInteractOutside && isValidEvent(e, node))
        onInteractOutsideStart?.(e);
      const target = e.target;
      if (isElement(target) && isOrContainsTarget(node, target)) {
        isPointerDownInside = true;
      }
      isPointerDown = true;
    }, 10);
    unsubPointerDown = onPointerDownDebounced.destroy;
    const onPointerUpDebounced = debounce((e) => {
      if (wasTopLayerInPointerDownCapture && !isAnyEventIntercepted() && shouldTriggerInteractOutside(e)) {
        onInteractOutside?.(e);
      }
      resetPointerState();
    }, 10);
    unsubPointerUp = onPointerUpDebounced.destroy;
    const resetInterceptedEventsDebounced = debounce(resetInterceptedEvents, 20);
    unsubResetInterceptedEvents = resetInterceptedEventsDebounced.destroy;
    const markTopLayerInPointerDown = () => {
      wasTopLayerInPointerDownCapture = isHighestLayer(node);
    };
    unsubEvents = executeCallbacks(
      /** Capture Events For Interaction Start */
      setupCapturePhaseHandlerAndMarkAsIntercepted("pointerdown", markTopLayerInPointerDown),
      setupCapturePhaseHandlerAndMarkAsIntercepted("mousedown", markTopLayerInPointerDown),
      setupCapturePhaseHandlerAndMarkAsIntercepted("touchstart", markTopLayerInPointerDown),
      /**
       * Intercepted events are reset only at the end of an interaction, allowing
       * interception at the start while still capturing the entire interaction.
       * Additionally, intercepted events are reset in the capture phase with `resetInterceptedEventsDebounced`,
       * accommodating events not invoked in the bubbling phase due to user interception.
       */
      setupCapturePhaseHandlerAndMarkAsIntercepted("pointerup", resetInterceptedEventsDebounced),
      setupCapturePhaseHandlerAndMarkAsIntercepted("mouseup", resetInterceptedEventsDebounced),
      setupCapturePhaseHandlerAndMarkAsIntercepted("touchend", resetInterceptedEventsDebounced),
      setupCapturePhaseHandlerAndMarkAsIntercepted("click", resetInterceptedEventsDebounced),
      /** Bubbling Events For Interaction Start */
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("pointerdown", onPointerDownDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("mousedown", onPointerDownDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("touchstart", onPointerDownDebounced),
      /**
       * To effectively detect an end of an interaction, we must monitor all relevant events,
       * not just `click` events. This is because on touch devices, actions like pressing,
       * moving the finger, and lifting it off the screen may not trigger a `click` event,
       * but should still invoke `onPointerUp` to properly handle the interaction.
       */
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("pointerup", onPointerUpDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("mouseup", onPointerUpDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("touchend", onPointerUpDebounced),
      setupBubblePhaseHandlerAndMarkAsNotIntercepted("click", onPointerUpDebounced)
    );
  }
  function shouldTriggerInteractOutside(e) {
    if (isPointerDown && !isPointerDownInside && isValidEvent(e, node)) {
      return true;
    }
    return false;
  }
  function resetPointerState() {
    isPointerDown = false;
    isPointerDownInside = false;
  }
  update(config);
  return {
    update,
    destroy() {
      unsubEvents();
      unsubPointerDown();
      unsubPointerUp();
      unsubResetInterceptedEvents();
      layers.delete(node);
    }
  };
};
function isValidEvent(e, node) {
  if ("button" in e && e.button > 0)
    return false;
  const target = e.target;
  if (!isElement(target))
    return false;
  const ownerDocument = target.ownerDocument;
  if (!ownerDocument || !ownerDocument.documentElement.contains(target)) {
    return false;
  }
  return node && !isOrContainsTarget(node, target);
}
function isHighestLayer(node) {
  return Array.from(layers).at(-1) === node;
}
const defaults$1 = {
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  preventDeselect: false,
  numberOfMonths: 1,
  pagedNavigation: false,
  weekStartsOn: 0,
  fixedWeeks: false,
  calendarLabel: "Event Date",
  locale: "en",
  minValue: void 0,
  maxValue: void 0,
  disabled: false,
  readonly: false,
  weekdayFormat: "narrow"
};
({
  ...omit(defaults$1, "isDateDisabled", "isDateUnavailable", "value", "locale", "disabled", "readonly", "minValue", "maxValue", "weekdayFormat")
});
function focusInput(id, pos = "default") {
  const inputEl = getElementByMeltId(id);
  if (!isHTMLInputElement(inputEl))
    return;
  inputEl.focus();
  if (pos === "start") {
    inputEl.setSelectionRange(0, 0);
  } else if (pos === "end") {
    inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);
  }
}
function setSelectedFromEl(el, selected) {
  if (!el) {
    selected.set(null);
    return;
  }
  selected.set({
    id: el.getAttribute("data-tag-id") ?? "",
    value: el.getAttribute("data-tag-value") ?? ""
  });
}
function highlightText(query) {
  const el = document.querySelector(query);
  if (!isHTMLElement(el))
    return;
  el.focus();
  const range = document.createRange();
  range.selectNodeContents(el);
  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
const defaults = {
  placeholder: "",
  disabled: false,
  editable: true,
  defaultTags: [],
  unique: false,
  trim: true,
  blur: "nothing",
  addOnPaste: false,
  maxTags: void 0,
  allowed: [],
  denied: [],
  add: void 0,
  remove: void 0,
  update: void 0
};
const { name, attribute, selector } = createElHelpers("tags-input");
function createTagsInput(props) {
  const withDefaults = { ...defaults, ...props };
  const meltIds = generateIds(["root", "input"]);
  const options = toWritableStores(omit(withDefaults, "tags"));
  const { placeholder, disabled, editable, unique, trim, blur, addOnPaste, allowed, denied, add, remove, update, maxTags } = options;
  const inputValue = writable("");
  const inputInvalid = writable(false);
  const editValue = writable("");
  const tagsWritable = withDefaults.tags ?? writable(
    withDefaults.defaultTags && withDefaults.defaultTags.length > 0 ? typeof withDefaults.defaultTags[0] === "string" ? withDefaults.defaultTags.map((tag2) => ({ id: generateId(), value: tag2 })) : withDefaults.defaultTags : []
    // if undefined)
  );
  const tags = overridable(tagsWritable, withDefaults?.onTagsChange);
  const selected = withGet.writable(withDefaults.selected ?? null);
  const editing = withGet.writable(null);
  const isInputValid = (v) => {
    const $tags = tags.get();
    const $editing = editing.get();
    const $allowed = allowed.get();
    const $denied = denied.get();
    const $maxTags = maxTags.get();
    if (trim.get())
      v = v.trim();
    if (unique.get() && $editing?.value !== v) {
      const index = $tags.findIndex((tag2) => tag2.value === v);
      if (index >= 0)
        return false;
    }
    if ($allowed && $allowed.length > 0 && !$allowed.includes(v))
      return false;
    if ($denied && $denied.length > 0 && $denied.includes(v))
      return false;
    if ($maxTags && $maxTags > 0 && $tags.length >= $maxTags)
      return false;
    return true;
  };
  const addTag = async (v) => {
    const $add = add.get();
    let workingTag = { id: "", value: v };
    if ($add) {
      try {
        const res = await $add(v);
        if (typeof res === "string")
          workingTag.value = res;
        else
          workingTag = res;
        if (!workingTag.id)
          workingTag.id = generateId();
      } catch {
        return false;
      }
    } else {
      workingTag.id = generateId();
    }
    if (trim.get())
      workingTag.value = workingTag.value.trim();
    if (!isInputValid(workingTag.value))
      return false;
    tags.update((current) => {
      current.push(workingTag);
      return current;
    });
    return true;
  };
  async function updateTag(tag2, select = false) {
    const $update = update.get();
    const oldId = tag2.id;
    let workingTag = tag2;
    if ($update) {
      try {
        const res = await $update(workingTag);
        workingTag = res;
        if (!workingTag.id)
          workingTag.id = generateId();
      } catch {
        return false;
      }
    }
    if (trim.get())
      workingTag.value = workingTag.value.trim();
    if (!isInputValid(workingTag.value))
      return false;
    tags.update(($tags) => {
      return $tags.map((t) => {
        if (t.id === oldId) {
          return workingTag;
        }
        return t;
      });
    });
    if (select)
      selected.set(workingTag);
    return true;
  }
  async function removeTag(t) {
    const $remove = remove.get();
    if ($remove) {
      try {
        if (!await $remove(t))
          return false;
      } catch {
        return false;
      }
    }
    const $tags = tags.get();
    const index = $tags.findIndex((tag2) => tag2.id === t.id);
    tags.update((t2) => {
      t2.splice(index, 1);
      return t2;
    });
    return true;
  }
  const isEditing = derived([editable, editing], ([$editable, $editing]) => {
    return (tag2) => $editable && $editing?.id === tag2.id;
  });
  const root = makeElement(name(""), {
    stores: [disabled],
    returned: ([$disabled]) => {
      return {
        "data-melt-id": meltIds.root,
        "data-disabled": disabledAttr($disabled),
        disabled: disabledAttr($disabled)
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "mousedown", (e) => {
        const target = e.target;
        if (!isHTMLElement(target))
          return;
        if (target.hasAttribute(attribute())) {
          e.preventDefault();
          focusInput(meltIds.input);
        }
      }));
      return {
        destroy: unsub
      };
    }
  });
  const input = makeElement(name("input"), {
    stores: [disabled, placeholder],
    returned: ([$disabled, $placeholder]) => {
      return {
        "data-melt-id": meltIds.input,
        "data-disabled": disabledAttr($disabled),
        disabled: disabledAttr($disabled),
        placeholder: $placeholder
      };
    },
    action: (node) => {
      const getTagsInfo = (id) => {
        const rootEl = getElementByMeltId(meltIds.root);
        let tagsEl = [];
        let selectedIndex = -1;
        let prevIndex = -1;
        let nextIndex = -1;
        if (rootEl) {
          tagsEl = Array.from(rootEl.querySelectorAll(selector("tag")));
          selectedIndex = tagsEl.findIndex((element) => element.getAttribute("data-tag-id") === id);
          prevIndex = selectedIndex - 1;
          nextIndex = selectedIndex + 1;
        }
        return {
          tagsEl,
          selectedIndex,
          prevIndex,
          nextIndex
        };
      };
      const unsub = executeCallbacks(addMeltEventListener(node, "focus", () => {
        const rootEl = getElementByMeltId(meltIds.root);
        if (rootEl)
          rootEl.setAttribute("data-focus", "");
        node.setAttribute("data-focus", "");
      }), addMeltEventListener(node, "blur", async () => {
        const rootEl = getElementByMeltId(meltIds.root);
        if (rootEl)
          rootEl.removeAttribute("data-focus");
        node.removeAttribute("data-focus");
        selected.set(null);
        const value = node.value;
        if (!value)
          return;
        const $blur = blur.get();
        if ($blur === "clear") {
          node.value = "";
        } else if ($blur === "add") {
          if (isInputValid(value) && await addTag(value)) {
            node.value = "";
            inputValue.set("");
          } else {
            inputInvalid.set(true);
          }
        }
      }), addMeltEventListener(node, "paste", async (e) => {
        const pastedText = e.clipboardData?.getData("text");
        if (!pastedText)
          return;
        if (!addOnPaste.get())
          return;
        e.preventDefault();
        const newTags = pastedText.split(",");
        addTag: for (let i = 0; i < newTags.length; i++) {
          const newTag = newTags[i];
          if (isInputValid(newTag) && await addTag(newTag)) {
            continue addTag;
          } else {
            node.value = newTags.slice(i).join(",");
            inputInvalid.set(true);
            return;
          }
        }
      }), addMeltEventListener(node, "keydown", async (e) => {
        const $selected = selected.get();
        if ($selected) {
          if (e.key.length === 1) {
            selected.set(null);
          } else if (e.key === kbd.ARROW_LEFT) {
            e.preventDefault();
            const { tagsEl, prevIndex } = getTagsInfo($selected.id);
            if (prevIndex >= 0) {
              setSelectedFromEl(tagsEl[prevIndex], selected);
            }
          } else if (e.key === kbd.ARROW_RIGHT) {
            e.preventDefault();
            const { tagsEl, nextIndex } = getTagsInfo($selected.id);
            if (nextIndex === -1 || nextIndex >= tagsEl.length) {
              selected.set(null);
              focusInput(meltIds.input, "start");
            } else {
              setSelectedFromEl(tagsEl[nextIndex], selected);
            }
          } else if (e.key === kbd.HOME) {
            e.preventDefault();
            const { tagsEl } = getTagsInfo($selected.id);
            if (tagsEl.length > 0)
              setSelectedFromEl(tagsEl[0], selected);
          } else if (e.key === kbd.END) {
            e.preventDefault();
            selected.set(null);
            focusInput(meltIds.input);
          } else if (e.key === kbd.DELETE) {
            e.preventDefault();
            const prevSelected = $selected;
            const { tagsEl, nextIndex } = getTagsInfo($selected.id);
            if (nextIndex === -1 || nextIndex >= tagsEl.length) {
              selected.set(null);
              focusInput(meltIds.input);
            } else {
              setSelectedFromEl(tagsEl[nextIndex], selected);
            }
            if (!await removeTag(prevSelected))
              selected.set(prevSelected);
          } else if (e.key === kbd.BACKSPACE) {
            e.preventDefault();
            const prevSelected = $selected;
            const { tagsEl, nextIndex, prevIndex } = getTagsInfo($selected.id);
            if (prevIndex >= 0) {
              setSelectedFromEl(tagsEl[prevIndex], selected);
            } else {
              if (nextIndex === -1 || nextIndex >= tagsEl.length) {
                selected.set(null);
                focusInput(meltIds.input, "start");
              } else {
                setSelectedFromEl(tagsEl[nextIndex], selected);
              }
            }
            if (!await removeTag(prevSelected))
              selected.set(prevSelected);
          } else if (e.key === kbd.ENTER) {
            e.preventDefault();
            const editEl = document.querySelector(selector("edit") + `[data-tag-id="${$selected.id}"]`);
            if (!editEl)
              return;
            editing.set({ id: $selected.id, value: $selected.value });
            editEl.textContent = $selected.value;
            await tick();
            highlightText(selector("edit") + `[data-tag-id="${$selected.id}"]`);
          }
        } else {
          if (e.key === kbd.ENTER) {
            e.preventDefault();
            const value = node.value;
            if (!value)
              return;
            if (isInputValid(value) && await addTag(value)) {
              node.value = "";
              inputValue.set("");
            } else {
              inputInvalid.set(true);
            }
          } else if (node.selectionStart === 0 && node.selectionEnd === 0 && (e.key === kbd.ARROW_LEFT || e.key === kbd.BACKSPACE)) {
            e.preventDefault();
            const { tagsEl } = getTagsInfo("");
            const lastTag = tagsEl.at(-1);
            if (!lastTag)
              return;
            setSelectedFromEl(lastTag, selected);
          }
        }
      }), addMeltEventListener(node, "input", () => {
        inputValue.set(node.value);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const tag = makeElement(name("tag"), {
    stores: [selected, editing, disabled, editable],
    returned: ([$selected, $editing, $disabled, $editable]) => {
      return (tag2) => {
        const disabled2 = $disabled || tag2.disabled;
        const editable2 = $editable && tag2.editable !== false;
        const selected2 = disabled2 ? void 0 : $selected?.id === tag2?.id;
        const editing2 = editable2 ? $editing?.id === tag2?.id : void 0;
        return {
          "aria-hidden": editing2,
          "aria-selected": selected2,
          "data-tag-id": tag2.id,
          "data-tag-value": tag2.value,
          "data-selected": selected2 ? "" : void 0,
          "data-editable": editable2 ? "" : void 0,
          "data-editing": editing2 ? "" : void 0,
          "data-disabled": disabledAttr(disabled2),
          disabled: disabledAttr(disabled2),
          hidden: editing2,
          tabindex: -1,
          style: editing2 ? styleToString({
            position: "absolute",
            opacity: 0,
            "pointer-events": "none",
            margin: 0
          }) : void 0
        };
      };
    },
    action: (node) => {
      const getElProps = () => {
        const id = node.getAttribute("data-tag-id") ?? "";
        return {
          id
        };
      };
      const unsub = executeCallbacks(addMeltEventListener(node, "mousedown", (e) => {
        const $editing = editing.get();
        if ($editing && $editing.id !== getElProps().id)
          return;
        focusInput(meltIds.input);
        e.preventDefault();
        setSelectedFromEl(node, selected);
        editing.set(null);
      }), addMeltEventListener(node, "click", (e) => {
        const $editing = editing.get();
        if ($editing && $editing.id === getElProps().id)
          return;
        focusInput(meltIds.input);
        e.preventDefault();
        setSelectedFromEl(node, selected);
        editing.set(null);
      }), addMeltEventListener(node, "dblclick", async () => {
        if (!isBrowser)
          return;
        if (!node.hasAttribute("data-editable"))
          return;
        const editEl = document.querySelector(selector("edit") + `[data-tag-id="${getElProps().id}"]`);
        if (!editEl)
          return;
        const value = node.getAttribute("data-tag-value") ?? "";
        editing.set({
          id: node.getAttribute("data-tag-id") ?? "",
          value
        });
        editEl.textContent = value;
        await tick();
        highlightText(selector("edit") + `[data-tag-id="${getElProps().id}"]`);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const deleteTrigger = makeElement(name("delete-trigger"), {
    stores: [selected, editing, disabled, editable],
    returned: ([$selected, $editing, $disabled, $editable]) => {
      return (tag2) => {
        const disabled2 = $disabled || tag2.disabled;
        const editable2 = $editable && tag2.editable !== false;
        const selected2 = disabled2 ? void 0 : $selected?.id === tag2?.id;
        const editing2 = editable2 ? $editing?.id === tag2?.id : void 0;
        return {
          "aria-selected": selected2,
          "data-tag-id": tag2.id,
          "data-tag-value": tag2.value,
          "data-selected": selected2 ? "" : void 0,
          "data-editing": editing2 ? "" : void 0,
          "data-disabled": disabledAttr(disabled2),
          disabled: disabledAttr(disabled2),
          tabindex: -1
        };
      };
    },
    action: (node) => {
      function handleDelete() {
        if (node.hasAttribute("data-disabled"))
          return;
        const value = node.getAttribute("data-tag-value") ?? "";
        const id = node.getAttribute("data-tag-id") ?? "";
        removeTag({ id, value });
        focusInput(meltIds.input);
      }
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        e.stopPropagation();
        handleDelete();
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd.ENTER && e.key !== kbd.SPACE)
          return;
        e.preventDefault();
        handleDelete();
      }));
      return {
        destroy: unsub
      };
    }
  });
  const edit = makeElement(name("edit"), {
    stores: isEditing,
    returned: ($isEditing) => {
      return (tag2) => {
        const editing2 = $isEditing(tag2);
        return {
          "aria-hidden": !editing2,
          "data-tag-id": tag2.id,
          "data-tag-value": tag2.value,
          hidden: !editing2 ? true : void 0,
          contenteditable: editing2,
          tabindex: -1,
          style: !editing2 ? styleToString({
            position: "absolute",
            opacity: 0,
            "pointer-events": "none",
            margin: 0
          }) : void 0
        };
      };
    },
    action: (node) => {
      const getElProps = () => {
        const id = node.getAttribute("data-tag-id") ?? "";
        const value = node.getAttribute("data-tag-value") ?? "";
        return {
          id,
          value
        };
      };
      let unsubInteractOutside = noop;
      let unsubEvents = noop;
      const unsubDerived = effect(isEditing, ($isEditing) => {
        unsubInteractOutside();
        unsubEvents();
        if (!$isEditing(getElProps()))
          return;
        unsubInteractOutside = useInteractOutside(node).destroy;
        unsubEvents = executeCallbacks(addMeltEventListener(node, "blur", () => {
          editing.set(null);
          node.textContent = getElProps().value;
          getElementByMeltId(meltIds.root)?.removeAttribute("data-invalid-edit");
          node.removeAttribute("data-invalid-edit");
        }), addMeltEventListener(node, "keydown", async (e) => {
          if (e.key === kbd.ENTER) {
            e.preventDefault();
            const value = node.textContent;
            if (!value)
              return;
            const t = { id: getElProps().id, value };
            if (isInputValid(value) && await updateTag(t, true)) {
              node.textContent = t.value;
              editValue.set("");
              focusInput(meltIds.input);
            } else {
              getElementByMeltId(meltIds.root)?.setAttribute("data-invalid-edit", "");
              node.setAttribute("data-invalid-edit", "");
            }
          } else if (e.key === kbd.ESCAPE) {
            e.preventDefault();
            e.stopImmediatePropagation();
            node.textContent = getElProps().value;
            editValue.set("");
            setSelectedFromEl(node, selected);
            focusInput(meltIds.input);
          }
        }), addMeltEventListener(node, "input", () => {
          editValue.set(node.textContent || "");
        }));
      });
      return {
        destroy() {
          unsubInteractOutside();
          unsubEvents();
          unsubDerived();
        }
      };
    }
  });
  const isSelected = derived(selected, ($selected) => {
    return (tag2) => $selected?.id === tag2.id;
  });
  effect(inputValue, () => {
    inputInvalid.set(false);
  });
  effect(inputInvalid, ($inputInvalid) => {
    if ($inputInvalid) {
      getElementByMeltId(meltIds.root)?.setAttribute("data-invalid", "");
      getElementByMeltId(meltIds.input)?.setAttribute("data-invalid", "");
    } else {
      getElementByMeltId(meltIds.root)?.removeAttribute("data-invalid");
      getElementByMeltId(meltIds.input)?.removeAttribute("data-invalid");
    }
  });
  effect(editValue, () => {
    if (!isBrowser)
      return;
    getElementByMeltId(meltIds.root)?.removeAttribute("data-invalid-edit");
    const invalidEl = Array.from(document.querySelectorAll(selector("edit") + "[data-invalid-edit]"));
    invalidEl.forEach((e) => {
      e.removeAttribute("data-invalid-edit");
    });
  });
  return {
    ids: meltIds,
    elements: {
      root,
      input,
      deleteTrigger,
      edit,
      tag
    },
    states: {
      tags,
      inputValue: readonly(inputValue),
      inputInvalid: readonly(inputInvalid),
      selected: readonly(selected)
    },
    helpers: {
      isSelected,
      isEditing,
      isInputValid,
      addTag,
      updateTag,
      removeTag
    },
    options
  };
}
const plants = [
  "african-violet",
  "alder",
  "alder",
  "almond",
  "amaranth",
  "ambrosia",
  "appalachian-tea",
  "apple",
  "apricot",
  "arfaj",
  "arrow-wood",
  "artichoke",
  "arugula",
  "ash",
  "asparagus",
  "azolla",
  "baby-rose",
  "bamboo",
  "banana",
  "baobab",
  "basil",
  "bay",
  "bay-laurel",
  "bean",
  "bean",
  "bear-corn",
  "bearberry",
  "beech",
  "beet",
  "bergamont",
  "betula-lenta",
  "big-hellebore",
  "bindweed",
  "birch",
  "birds-nest",
  "birds-nest-plant",
  "bitter-nightshade",
  "bitter-weed",
  "bittercress",
  "bittersweet",
  "black-alder",
  "black-ash",
  "black-birch",
  "black-cap",
  "black-cherry",
  "black-hellebore",
  "black-maple",
  "black-nightshade",
  "black-raspberry",
  "black-weed",
  "blackberry",
  "blackhaw",
  "blackhaw-viburnum",
  "blackie-head",
  "blue-ash",
  "blue-bindweed",
  "blue-oak",
  "blueberry",
  "blueberry-cornel",
  "bolean-birch",
  "borage",
  "bow-wood",
  "box",
  "boxelder",
  "boxwood",
  "brier",
  "bristly-dewberry",
  "brittle-bush",
  "broadleaf",
  "broccoli",
  "brown-betty",
  "brown-daisy",
  "buckeye",
  "buffalo-weed",
  "bulbous-cress",
  "bull-nettle",
  "bur-oak",
  "butterfly-flower",
  "butterfly-weed",
  "cabbage",
  "cabbage",
  "cabinet-cherry",
  "cancer-jalap",
  "cane-ash",
  "cannabis",
  "canoe-birch",
  "caraway",
  "carrot",
  "carrot",
  "carrot-weed",
  "catalina-ironwood",
  "cauliflower",
  "celery",
  "champion-oak",
  "cherry",
  "cherry-birch",
  "chestnut",
  "chicory",
  "chive",
  "chrysanthemum",
  "cilantro",
  "clove",
  "clover",
  "coakum",
  "coast-live-oak",
  "coconut",
  "coffee",
  "colic",
  "collard",
  "collards",
  "colwort",
  "comfrey",
  "coneflower",
  "cork-oak",
  "corn",
  "cornel",
  "cornelian-tree",
  "corydalis",
  "cotton-plant",
  "coyote-willow",
  "creek-maple",
  "cress",
  "cress",
  "crowfoot",
  "crows-nest",
  "crows-toes",
  "cucumber",
  "cucumber",
  "cumin",
  "cursed-thistle",
  "cutleaf-maple",
  "cutleaf-toothwort",
  "daisy",
  "daisy",
  "damask-violet",
  "dames-rocket",
  "dames-violet",
  "deadnettle",
  "deciduous-holly",
  "devils-bite",
  "devils-nose",
  "devils-plague",
  "dewberry",
  "dill",
  "dindle",
  "dogtooth-violet",
  "dogwood",
  "dogwood",
  "dooryard-plantain",
  "drumstick",
  "duck-retten",
  "duscle",
  "dwarf-wild-rose",
  "dye-leaves",
  "dyers-oak",
  "earth-gall",
  "eastern-black-oak",
  "eastern-redbud",
  "eggplant",
  "endive",
  "english-bulls-eye",
  "english-oak",
  "epazote",
  "eucalyptus",
  "european-flax",
  "european-holly",
  "extinguisher-moss",
  "eytelia",
  "fairymoss",
  "false-alder",
  "false-box",
  "false-boxwood",
  "false-hellebore",
  "fellenwort",
  "felonwood",
  "felonwort",
  "fennel",
  "fern-leaf-yarrow",
  "ferns",
  "fever-bush",
  "feverfew",
  "field-sow-thistle",
  "fig",
  "fig",
  "flax",
  "florida-dogwood",
  "flowering-dogwood",
  "fluxroot",
  "fumewort",
  "gai-lan",
  "gallberry",
  "garden-nightshade",
  "garget",
  "garlic",
  "garlic-mustard",
  "garlic-root",
  "gewa-bangladesh",
  "giant-onion",
  "giant-ragweed",
  "gilli-flower",
  "gloriosa-daisy",
  "golden-buttons",
  "golden-corydalis",
  "golden-garlic",
  "golden-jerusalem",
  "goldenglow",
  "goodding-willow",
  "goose-tongue",
  "gordaldo",
  "grapefruit",
  "grapevine",
  "gray-alder",
  "gray-birch",
  "great-ragweed",
  "greater-plantain",
  "green-ash",
  "green-thistle",
  "ground-berry",
  "gutweed",
  "hairy-bittercress",
  "haldi",
  "hard-thistle",
  "hares-colwort",
  "hares-thistle",
  "harlequin",
  "hay-fever-weed",
  "healing-blade",
  "hedge-plant",
  "hellebore",
  "hellebore",
  "hemp",
  "hemp-dogbane",
  "hen-plant",
  "henbit-deadnettle",
  "herb-barbara",
  "hoary-ragwort",
  "hogweed",
  "holly",
  "honey-mesquite",
  "hops",
  "horse-cane",
  "horse-nettle",
  "hounds-berry",
  "houseleek",
  "huckleberry",
  "indian-arrow-wood",
  "indian-hemp",
  "indian-paintbrush",
  "indian-poke",
  "indian-posy",
  "inkberry",
  "inkberry-holly",
  "island-oak",
  "itch-weed",
  "ivy",
  "jack-by-the-hedge",
  "jack-in-the-bush",
  "judas-tree",
  "juneberry",
  "juniper",
  "kale",
  "keek",
  "kinnikinnik",
  "kohlrabi",
  "korean-rock-fern",
  "kousa",
  "kousa-dogwood",
  "kudzu",
  "lace-flower",
  "lambs-cress",
  "lambs-foot",
  "land-cress",
  "lavendar",
  "lavender",
  "leek",
  "leek",
  "lemon",
  "lemon",
  "lemongrass",
  "lettuce",
  "lettuce",
  "lilac",
  "lily-leek",
  "lime",
  "liquorice",
  "lovage",
  "love-vine",
  "low-rose",
  "mahogany-birch",
  "maize",
  "mango",
  "maple",
  "maple",
  "maple-ash",
  "marina",
  "marjoram",
  "marsh-ragwort",
  "meadow-cabbage",
  "meadow-holly",
  "melon",
  "mesquite",
  "microgreens",
  "milfoil",
  "milk-thistle",
  "milkweed",
  "milkweed",
  "milky-tassel",
  "mint",
  "mirbecks-oak",
  "moose-maple",
  "moosewood",
  "morel",
  "mosquito-fern",
  "mosquito-plant",
  "mountain-mahogany",
  "mulberry",
  "multiflora-rose",
  "mustard",
  "neem",
  "nettle",
  "nettle",
  "new-zealand-flax",
  "nightshade",
  "nightshade",
  "nodding-onion",
  "nodding-thistle",
  "northern-red-oak",
  "nosebleed",
  "oak-tree-quercus",
  "okra",
  "olive",
  "onion",
  "onion",
  "onion",
  "orange",
  "orange-coneflower",
  "orange-milkweed",
  "orange-root",
  "oregano",
  "osage",
  "osage-orange",
  "osier-salix",
  "oxford-ragwort",
  "pac-choi",
  "pacific-dogwood",
  "pale-corydalis",
  "paper-birch",
  "parsley",
  "parsley",
  "parsnip",
  "parsnip",
  "pea",
  "pea",
  "peach",
  "peanut",
  "pear",
  "pedunculate-oak",
  "pellitory",
  "penny-hedge",
  "pepper",
  "pepper-root",
  "perennial-thistle",
  "petty-morel",
  "pigeon-berry",
  "pin-oak",
  "pine",
  "pineapple",
  "pink-corydalis",
  "pistachio",
  "plantain",
  "plantain",
  "pleurisy-root",
  "pocan-bush",
  "poison-berry",
  "poison-flower",
  "poison-ivy",
  "poke",
  "pokeroot",
  "pokeweed",
  "polecat-weed",
  "polkweed",
  "poor-annie",
  "poor-mans-mustard",
  "poorland-daisy",
  "poplar",
  "poppy",
  "possumhaw",
  "potato",
  "potato",
  "prairie-rose",
  "prickly-thistle",
  "pudina",
  "pumpkin",
  "purple-raspberry",
  "queen-annes-lace",
  "quercitron",
  "radical-weed",
  "radish",
  "ragweed",
  "ragweed",
  "ragwort",
  "ragwort",
  "rambler-rose",
  "rantipole",
  "rapeseed",
  "raspberry",
  "red-ash",
  "red-birch",
  "red-brush",
  "red-deadnettle",
  "red-ink-plant",
  "red-mulberry",
  "red-oak",
  "red-osier",
  "red-river-maple",
  "red-weed",
  "red-willow",
  "redbud",
  "redwood-sorrel",
  "rheumatism-root",
  "rhubarb",
  "rhubarb",
  "ribwort",
  "rice",
  "river-ash",
  "river-birch",
  "river-maple",
  "road-weed",
  "rock-harlequin",
  "rocket",
  "rocket-cress",
  "roman-wormwood",
  "root",
  "rose",
  "rose-milkweed",
  "rose-willow",
  "rosemary",
  "rosemary",
  "rum-cherry",
  "rutabaga",
  "rye",
  "saffron-crocus",
  "sage",
  "sand-brier",
  "sanguinary",
  "saskatoon",
  "sauce-alone",
  "savory",
  "scarlet-berry",
  "scarlet-oak",
  "scoke",
  "scotch-cap",
  "scrambled-eggs",
  "scrub-oak",
  "scurvy-cress",
  "scurvy-grass",
  "serviceberry",
  "serviceberry",
  "sesame",
  "sessile-oak",
  "shad-blow",
  "shadbush",
  "shiso",
  "silkweed",
  "silky-cornel",
  "silky-dogwood",
  "silver-birch",
  "silver-leaf-maple",
  "silver-maple",
  "silver-ragwort",
  "skunk-cabbage",
  "skunk-weed",
  "snake-berry",
  "sneezeweed",
  "sneezewort",
  "sneezewort-yarrow",
  "snowdrop",
  "soft-maple",
  "sorrel",
  "spanish-oak",
  "speckled-alder",
  "speedwell",
  "spice-birch",
  "spinach",
  "spiny-sow-thistle",
  "spool-wood",
  "spotted-oak",
  "spring-cress",
  "squash",
  "squaw-bush",
  "stag-bush",
  "stammerwort",
  "star-of-persia",
  "stevia",
  "stickweed",
  "strawberry",
  "strawberry-tree",
  "striped-alder",
  "striped-maple",
  "sugar-maple",
  "sugarcane",
  "sugarplum",
  "summer-lilac",
  "sunflower",
  "swallow-wort",
  "swamp-ash",
  "swamp-cabbage",
  "swamp-dewberry",
  "swamp-dogwood",
  "swamp-hellebore",
  "swamp-holly",
  "swamp-maple",
  "swamp-milkweed",
  "swamp-oak",
  "swamp-silkweed",
  "swamp-spanish-oak",
  "swamp-white-oak",
  "sweet-birch",
  "sweet-orange",
  "sweet-potato",
  "sweet-potato-vine",
  "sweet-rocket",
  "swine-thistle",
  "swinies",
  "swiss-chard",
  "sword-ferns",
  "sycamore",
  "sycamore",
  "sycamore-american",
  "sycamore-arizona",
  "tall-ambrosia",
  "tall-coneflower",
  "tansy",
  "tansy",
  "tarragon",
  "tassel-weed",
  "tea",
  "thimbleberry",
  "thimbleweed",
  "thistle",
  "thistle",
  "thousand-leaf",
  "thousand-seal",
  "thyme",
  "thyme",
  "tickle-weed",
  "tobacco-plant",
  "tomatillo",
  "tomato",
  "tomato",
  "toothwort",
  "touch-me-not",
  "travellers-joy",
  "tree-onion",
  "tree-sow-thistle",
  "tree-tobacco",
  "trillium",
  "true-cinnamon",
  "tuber-root",
  "tulip",
  "tulsi",
  "turnip",
  "upland-cress",
  "valley-oak",
  "vanilla-orchid",
  "viburnum",
  "viola-species",
  "violet",
  "violet-bloom",
  "virgins-bower",
  "wall-speedwell",
  "walnut",
  "water-ash",
  "water-birch",
  "water-fern",
  "water-maple",
  "way-bread",
  "way-thistle",
  "wayside-plantain",
  "weeping-birch",
  "western-redbud",
  "western-trillium",
  "wheat",
  "whiskey-cherry",
  "white-alder",
  "white-ash",
  "white-birch",
  "white-cornel",
  "white-hellebore",
  "white-indian-hemp",
  "white-mans-foot",
  "white-maple",
  "white-mulberry",
  "white-oak",
  "white-root",
  "white-tansy",
  "white-trillium",
  "whorled-milkweed",
  "wild-black-cherry",
  "wild-carrot",
  "wild-cherry",
  "wild-cotton",
  "wild-garlic",
  "wild-hops",
  "wild-onion",
  "wild-orange",
  "wild-pellitory",
  "wild-rose",
  "wild-tansy",
  "willow",
  "wind-root",
  "wineberry",
  "winter-cress",
  "winter-rocket",
  "winterberry",
  "winterberry",
  "winterberry-holly",
  "woodbine",
  "woody-nightshade",
  "woolly-yarrow",
  "wormwood",
  "wound-rocket",
  "yam-dios-corea",
  "yarrow",
  "yarrow",
  "yellow-bark-oak",
  "yellow-birch",
  "yellow-coneflower",
  "yellow-corydalis",
  "yellow-daisy",
  "yellow-fume-wort",
  "yellow-harlequin",
  "yellow-milkweed",
  "yellow-rocket",
  "yellow-wood",
  "zedoary"
];
const plantNamesFile = {
  plants
};
const GENERATED_KEY_RANDOM_SECTION_LENGTH = 3;
const MAX_PLANT_NAME_TRIES = 5;
const RANDOM_STRING_KEY_LENGTH = 8;
function generateRandomString(length, characters) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function generateGardenIdFromPlantName() {
  const plantName = plantNamesFile.plants[Math.floor(Math.random() * plantNamesFile.plants.length)];
  const randomSectionBeginningCharacter = generateRandomString(1, "0123456789");
  const randomSectionRest = generateRandomString(
    GENERATED_KEY_RANDOM_SECTION_LENGTH - 1,
    "abcdefghijklmnopqrstuvwxyz0123456789"
  );
  return plantName + "-" + randomSectionBeginningCharacter + randomSectionRest;
}
function generateGardenIdFromRandomString() {
  return generateRandomString(
    RANDOM_STRING_KEY_LENGTH,
    "abcdefghijklmnopqrstuvwxyz0123456789"
  );
}
async function generateGardenId() {
  for (let i = 0; i < MAX_PLANT_NAME_TRIES; i++) {
    const id = generateGardenIdFromPlantName();
    const existingGarden = await triplit.fetchOne(triplit.query("gardens").Id(id));
    if (existingGarden == null) {
      return id;
    }
  }
  for (let i = 0; i < MAX_PLANT_NAME_TRIES; i++) {
    const id = generateGardenIdFromRandomString();
    const existingGarden = await triplit.fetchOne(triplit.query("gardens").Id(id));
    if (existingGarden == null) {
      return id;
    }
  }
  return "";
}
function GardenCreateFormUserTagsInput($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    tagsInput = void 0,
    maxTags,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const {
    elements: { root, tag, input, deleteTrigger, edit },
    states: { tags }
  } = createTagsInput({
    unique: true,
    editable: true,
    addOnPaste: true,
    trim: true,
    maxTags,
    placeholder: "Enter a username",
    add(tag2) {
      tagsInput.push(tag2);
      return { id: tag2, value: tag2 };
    },
    update(tag2) {
      tagsInput = tagsInput.filter((username) => {
        return username !== tag2.id;
      });
      tagsInput.push(tag2.value);
      return { id: tag2.value, value: tag2.value };
    },
    remove(tag2) {
      tagsInput = tagsInput.filter((username) => {
        return username !== tag2.id;
      });
      return true;
    }
  });
  useQuery(triplit, userProfilesUsernameQuery.Select(["username"]).Vars({ usernames: [...tagsInput] }));
  const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$tags", tags));
  $$payload.out += `<div class="border-neutral-7 bg-neutral-1 flex flex-col items-start justify-center gap-2 rounded-md border text-sm"><div${spread_attributes(
    {
      ...store_get($$store_subs ??= {}, "$root", root),
      class: "bg-neutral-1 text-neutral-11 focus-within:ring-primary-6 flex w-full min-w-[280px] flex-row flex-wrap gap-2.5 rounded-md px-3 py-2 focus-within:ring"
    }
  )}><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let t = each_array[$$index];
    const __MELTUI_BUILDER_2__ = store_get($$store_subs ??= {}, "$edit", edit)(t);
    const __MELTUI_BUILDER_1__ = store_get($$store_subs ??= {}, "$deleteTrigger", deleteTrigger)(t);
    const __MELTUI_BUILDER_0__ = store_get($$store_subs ??= {}, "$tag", tag)(t);
    $$payload.out += `<div${spread_attributes(
      {
        ...__MELTUI_BUILDER_0__,
        class: "bg-neutral-2 text-neutral-11 flex items-center overflow-hidden rounded-md [word-break:break-word] data-[disabled]:hover:cursor-default data-[disabled]:focus:!outline-none data-[disabled]:focus:!ring-0"
      }
    )}><span class="flex items-center px-1.5">${escape_html(t.value)}</span> <!---->`;
    Root($$payload, {
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        Trigger($$payload2, {
          class: "pr-1.5",
          children: ($$payload3) => {
            {
              $$payload3.out += "<!--[1-->";
              Icon($$payload3, {
                icon: iconIds.defaultSpinnerIcon,
                class: "text-neutral-6 animate-spin",
                width: "1rem"
              });
            }
            $$payload3.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----> <!---->`;
        Popover_content($$payload2, {
          children: ($$payload3) => {
            {
              $$payload3.out += "<!--[1-->";
              $$payload3.out += `Verifying username...`;
            }
            $$payload3.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload.out += `<!----> <button${spread_attributes(
      {
        ...__MELTUI_BUILDER_1__,
        type: "button",
        class: "enabled:hover:bg-neutral-3 border-neutral-5 flex h-full items-center border-l px-1"
      }
    )}>`;
    Icon($$payload, { icon: iconIds.defaultClose, width: "1rem" });
    $$payload.out += `<!----></button></div> <div${spread_attributes(
      {
        ...__MELTUI_BUILDER_2__,
        class: "data-[invalid-edit]:focus:!ring-destructive-6 flex items-center overflow-hidden rounded-md px-1.5 [word-break:break-word]"
      }
    )}></div>`;
  }
  $$payload.out += `<!--]--> <input${spread_attributes(
    {
      ...store_get($$store_subs ??= {}, "$input", input),
      ...restProps,
      disabled: false,
      type: "text",
      class: "bg-neutral-1 text-neutral-11 data-[invalid]:text-destructive-6 w-full min-w-[4.5rem] shrink grow basis-0 border-0 outline-none focus:!ring-0"
    }
  )}></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  bind_props($$props, { tagsInput });
  pop();
}
function GardenCreateForm($$payload, $$props) {
  push();
  var $$store_subs;
  const visibilityOptions = [
    { value: "HIDDEN", label: "Hidden" },
    { value: "UNLISTED", label: "Unlisted" },
    { value: "PUBLIC", label: "Public" }
  ];
  const visibilitySelectTrigger = visibilityOptions.find((option) => option.value === store_get($$store_subs ??= {}, "$formData", formData).visibility) ?? { label: "Select a type" };
  let gardenCreateHandler = createCommandHandler(gardenCreate.mutation, {
    onSuccess: (data) => {
      goto("/gardens/" + data.id);
    }
  });
  const form = superForm(defaults$2(zod(gardenCreate.schema)), {
    SPA: true,
    validators: zod(gardenCreate.schema),
    onUpdate({ form: form2 }) {
      if (form2.valid) {
        gardenCreateHandler.execute(form2.data);
      }
    },
    onChange() {
      gardenCreateHandler.reset();
    }
  });
  const { form: formData, enhance } = form;
  let gardenIdGenerationHandler = createCommandHandler(generateGardenId, {
    onSuccess: (generatedId) => {
      store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).id = generatedId);
    }
  });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<form method="POST"><!---->`;
    Form_field($$payload2, {
      form,
      name: "id",
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        {
          let children = function($$payload4, { props }) {
            $$payload4.out += `<!---->`;
            Form_label($$payload4, {
              description: gardenFields.gardenDescriptionSchema.description,
              optional: false,
              children: ($$payload5) => {
                $$payload5.out += `<!---->ID`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <span class="flex"><!---->`;
            Input($$payload4, spread_props([
              props,
              {
                type: "text",
                placeholder: "lettuce123",
                class: "rounded-r-none",
                get value() {
                  return store_get($$store_subs ??= {}, "$formData", formData).id;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).id = $$value);
                  $$settled = false;
                }
              }
            ]));
            $$payload4.out += `<!----> <!---->`;
            Button($$payload4, {
              variant: "outline",
              onclick: () => {
                gardenIdGenerationHandler.execute();
              },
              type: "button",
              class: "bg-neutral-1 hover:bg-neutral-2 border-neutral-7 flex items-center rounded-l-none border-l-0",
              children: ($$payload5) => {
                Icon($$payload5, {
                  icon: iconIds.defaultRefreshIcon,
                  width: "1.5rem",
                  class: gardenIdGenerationHandler.isLoading ? "animate-spin" : "animate-none"
                });
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----></span>`;
          };
          Control($$payload3, { children });
        }
        $$payload3.out += `<!----> <!---->`;
        Form_description($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->Readable identifier, used in URLs.`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <!---->`;
        Form_field_errors($$payload3, {
          handlerErrors: gardenCreateHandler.errors?.fieldErrors?.id
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <!---->`;
    Form_field($$payload2, {
      form,
      name: "name",
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        {
          let children = function($$payload4, { props }) {
            $$payload4.out += `<!---->`;
            Form_label($$payload4, {
              description: gardenFields.gardenNameSchema.description,
              optional: false,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Name`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <!---->`;
            Input($$payload4, spread_props([
              props,
              {
                type: "text",
                placeholder: "Gardens of Adonis",
                get value() {
                  return store_get($$store_subs ??= {}, "$formData", formData).name;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).name = $$value);
                  $$settled = false;
                }
              }
            ]));
            $$payload4.out += `<!---->`;
          };
          Control($$payload3, { children });
        }
        $$payload3.out += `<!----> <!---->`;
        Form_field_errors($$payload3, {
          handlerErrors: gardenCreateHandler.errors?.fieldErrors?.name
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <!---->`;
    Form_field($$payload2, {
      form,
      name: "visibility",
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        {
          let children = function($$payload4, { props }) {
            $$payload4.out += `<!---->`;
            Form_label($$payload4, {
              description: gardenFields.gardenVisibilitySchema.description,
              optional: false,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Visibility`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <!---->`;
            Root$1($$payload4, spread_props([
              props,
              {
                type: "single",
                items: visibilityOptions,
                get value() {
                  return store_get($$store_subs ??= {}, "$formData", formData).visibility;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).visibility = $$value);
                  $$settled = false;
                },
                children: ($$payload5) => {
                  $$payload5.out += `<!---->`;
                  Select_trigger($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<div class="item-center flex"><span>${escape_html(visibilitySelectTrigger.label)}</span></div>`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> <!---->`;
                  Select_content($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->`;
                      Group($$payload6, {
                        children: ($$payload7) => {
                          const each_array = ensure_array_like(visibilityOptions);
                          $$payload7.out += `<!---->`;
                          Select_group_heading($$payload7, {
                            children: ($$payload8) => {
                              $$payload8.out += `<!---->Garden Visibility`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!----> <!--[-->`;
                          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                            let visibilityOption = each_array[$$index];
                            $$payload7.out += `<!---->`;
                            Select_item($$payload7, {
                              value: visibilityOption.value,
                              label: visibilityOption.label,
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(visibilityOption.label)}`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!---->`;
                          }
                          $$payload7.out += `<!--]-->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              }
            ]));
            $$payload4.out += `<!---->`;
          };
          Control($$payload3, { children });
        }
        $$payload3.out += `<!----> <!---->`;
        Form_description($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->Hidden gardens can only be viewed by members. Unlisted gardens can be viewed by
			anyone with a link. Public gardens are searchable.`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <!---->`;
        Form_field_errors($$payload3, {
          handlerErrors: gardenCreateHandler.errors?.fieldErrors?.visibility
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <!---->`;
    Form_field($$payload2, {
      form,
      name: "description",
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        {
          let children = function($$payload4, { props }) {
            $$payload4.out += `<!---->`;
            Form_label($$payload4, {
              description: gardenFields.gardenDescriptionSchema.description,
              optional: true,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Description`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <!---->`;
            Textarea($$payload4, spread_props([
              props,
              {
                get value() {
                  return store_get($$store_subs ??= {}, "$formData", formData).description;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).description = $$value);
                  $$settled = false;
                }
              }
            ]));
            $$payload4.out += `<!---->`;
          };
          Control($$payload3, { children });
        }
        $$payload3.out += `<!----> <!---->`;
        Form_field_errors($$payload3, {
          handlerErrors: gardenCreateHandler.errors?.fieldErrors?.description
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <!---->`;
    Form_field($$payload2, {
      form,
      name: "adminInvites",
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        {
          let children = function($$payload4, { props }) {
            $$payload4.out += `<!---->`;
            Form_label($$payload4, {
              description: gardenCreate.schema.shape.adminInvites.description,
              optional: true,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Admin Invites`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            GardenCreateFormUserTagsInput($$payload4, spread_props([
              props,
              {
                maxTags: gardenCreate.schema.shape.adminInvites._def.innerType._def.maxLength?.value,
                get tagsInput() {
                  return store_get($$store_subs ??= {}, "$formData", formData).adminInvites;
                },
                set tagsInput($$value) {
                  store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).adminInvites = $$value);
                  $$settled = false;
                }
              }
            ]));
            $$payload4.out += `<!---->`;
          };
          Control($$payload3, { children });
        }
        $$payload3.out += `<!----> <!---->`;
        Form_description($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->Admins have full control over the garden.`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <!---->`;
        Form_field_errors($$payload3, {
          handlerErrors: gardenCreateHandler.errors?.fieldErrors?.adminInvites
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <!---->`;
    Form_field($$payload2, {
      form,
      name: "editorInvites",
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        {
          let children = function($$payload4, { props }) {
            $$payload4.out += `<!---->`;
            Form_label($$payload4, {
              description: gardenCreate.schema.shape.editorInvites.description,
              optional: true,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Editor Invites`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            GardenCreateFormUserTagsInput($$payload4, spread_props([
              props,
              {
                maxTags: gardenCreate.schema.shape.editorInvites._def.innerType._def.maxLength?.value,
                get tagsInput() {
                  return store_get($$store_subs ??= {}, "$formData", formData).editorInvites;
                },
                set tagsInput($$value) {
                  store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).editorInvites = $$value);
                  $$settled = false;
                }
              }
            ]));
            $$payload4.out += `<!---->`;
          };
          Control($$payload3, { children });
        }
        $$payload3.out += `<!----> <!---->`;
        Form_description($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->Editors have limited write access but cannot change garden configuration.`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <!---->`;
        Form_field_errors($$payload3, {
          handlerErrors: gardenCreateHandler.errors?.fieldErrors?.editorInvites
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <!---->`;
    Form_field($$payload2, {
      form,
      name: "viewerInvites",
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        {
          let children = function($$payload4, { props }) {
            $$payload4.out += `<!---->`;
            Form_label($$payload4, {
              description: gardenCreate.schema.shape.viewerInvites.description,
              optional: true,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Viewer Invites`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            GardenCreateFormUserTagsInput($$payload4, spread_props([
              props,
              {
                maxTags: gardenCreate.schema.shape.viewerInvites._def.innerType._def.maxLength?.value,
                get tagsInput() {
                  return store_get($$store_subs ??= {}, "$formData", formData).viewerInvites;
                },
                set tagsInput($$value) {
                  store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).viewerInvites = $$value);
                  $$settled = false;
                }
              }
            ]));
            $$payload4.out += `<!---->`;
          };
          Control($$payload3, { children });
        }
        $$payload3.out += `<!----> <!---->`;
        Form_description($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->Viewers can make no changes but can view everything.`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <!---->`;
        Form_field_errors($$payload3, {
          handlerErrors: gardenCreateHandler.errors?.fieldErrors?.viewerInvites
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <!---->`;
    Form_button($$payload2, {
      disabled: false,
      loading: gardenCreateHandler.isLoading,
      variant: "default",
      class: "mt-4 w-full",
      children: ($$payload3) => {
        $$payload3.out += `<!---->Create`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></form>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function _page($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Create Garden - Verdagraph</title>`;
  });
  Card($$payload, {
    class: "4xl:w-1/3 m-auto mt-0 h-full w-full border-0 md:mt-12 md:h-auto md:w-3/4 md:border lg:w-1/2",
    children: ($$payload2) => {
      Card_header($$payload2, {
        children: ($$payload3) => {
          Card_title($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->Create a Garden`;
            },
            $$slots: { default: true }
          });
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Card_content($$payload2, {
        children: ($$payload3) => {
          GardenCreateForm($$payload3);
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
}
export {
  _page as default
};
