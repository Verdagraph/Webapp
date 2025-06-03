import { a1 as noop$1, Q as attr_class, I as ensure_array_like, $ as store_get, N as spread_attributes, W as stringify, a0 as unsubscribe_stores, D as pop, A as push } from "./index.js";
import { j as derived, i as get, w as writable, r as readable } from "./exports.js";
import "clsx";
import { N as Nav, d as Tree_1 } from "./Nav.js";
import { h as html } from "./floating-layer-anchor.js";
import { a4 as Scroll_area } from "./circle.js";
import { R as Root, T as Trigger, C as Content } from "./index5.js";
var has = Object.prototype.hasOwnProperty;
function find(iter, tar, key) {
  for (key of iter.keys()) {
    if (dequal(key, tar)) return key;
  }
}
function dequal(foo, bar) {
  var ctor, len, tmp;
  if (foo === bar) return true;
  if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
    if (ctor === Date) return foo.getTime() === bar.getTime();
    if (ctor === RegExp) return foo.toString() === bar.toString();
    if (ctor === Array) {
      if ((len = foo.length) === bar.length) {
        while (len-- && dequal(foo[len], bar[len])) ;
      }
      return len === -1;
    }
    if (ctor === Set) {
      if (foo.size !== bar.size) {
        return false;
      }
      for (len of foo) {
        tmp = len;
        if (tmp && typeof tmp === "object") {
          tmp = find(bar, tmp);
          if (!tmp) return false;
        }
        if (!bar.has(tmp)) return false;
      }
      return true;
    }
    if (ctor === Map) {
      if (foo.size !== bar.size) {
        return false;
      }
      for (len of foo) {
        tmp = len[0];
        if (tmp && typeof tmp === "object") {
          tmp = find(bar, tmp);
          if (!tmp) return false;
        }
        if (!dequal(len[1], bar.get(tmp))) {
          return false;
        }
      }
      return true;
    }
    if (ctor === ArrayBuffer) {
      foo = new Uint8Array(foo);
      bar = new Uint8Array(bar);
    } else if (ctor === DataView) {
      if ((len = foo.byteLength) === bar.byteLength) {
        while (len-- && foo.getInt8(len) === bar.getInt8(len)) ;
      }
      return len === -1;
    }
    if (ArrayBuffer.isView(foo)) {
      if ((len = foo.byteLength) === bar.byteLength) {
        while (len-- && foo[len] === bar[len]) ;
      }
      return len === -1;
    }
    if (!ctor || typeof foo === "object") {
      len = 0;
      for (ctor in foo) {
        if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
        if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
      }
      return Object.keys(bar).length === len;
    }
  }
  return foo !== foo && bar !== bar;
}
function styleToString(style) {
  return Object.keys(style).reduce((str, key) => {
    if (style[key] === void 0)
      return str;
    return str + `${key}:${style[key]};`;
  }, "");
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
function makeElement(name, args) {
  const { stores, action, returned } = args ?? {};
  const derivedStore = (() => {
    if (stores && returned) {
      return derived(stores, (values) => {
        const result = returned(values);
        if (isFunctionWithParams(result)) {
          const fn = (...args2) => {
            return hiddenAction(removeUndefined({
              ...result(...args2),
              [`data-melt-${name}`]: "",
              action: action ?? noop
            }));
          };
          fn.action = action ?? noop;
          return fn;
        }
        return hiddenAction(removeUndefined({
          ...result,
          [`data-melt-${name}`]: "",
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
            [`data-melt-${name}`]: "",
            action: action ?? noop
          }));
        };
        resultFn.action = action ?? noop;
        return lightable(resultFn);
      }
      return lightable(hiddenAction(removeUndefined({
        ...result,
        [`data-melt-${name}`]: "",
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
  const name = (part) => part ? `${prefix}-${part}` : prefix;
  const attribute = (part) => `data-melt-${prefix}${part ? `-${part}` : ""}`;
  const selector = (part) => `[data-melt-${prefix}${part ? `-${part}` : ""}]`;
  const getEl = (part) => document.querySelector(selector(part));
  return {
    name,
    attribute,
    selector,
    getEl
  };
}
function isHTMLElement(element) {
  return element instanceof HTMLElement;
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
const safeOnMount = (fn) => {
  try {
    noop$1(fn);
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
({
  disabled: readable(false),
  required: readable(false),
  name: readable(void 0),
  type: readable(void 0)
});
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
const defaults = {
  exclude: ["h1"],
  scrollOffset: 0,
  scrollBehaviour: "smooth",
  activeType: "lowest"
};
function createTableOfContents(args) {
  const argsWithDefaults = { ...defaults, ...args };
  const { selector, exclude, activeType, rootMargin, scrollBehaviour, scrollOffset, headingFilterFn, scrollFn } = argsWithDefaults;
  const { name } = createElHelpers("table-of-contents");
  const possibleHeadings = ["h1", "h2", "h3", "h4", "h5", "h6"];
  let headingsList = [];
  let elementsList = [];
  let elementHeadingLU = {};
  let headingParentsLU = {};
  const activeParentIdxs = withGet.writable([]);
  const visibleElementIdxs = withGet.writable([]);
  let elementTarget = null;
  let mutationObserver = null;
  let observer = null;
  const observer_threshold = 0.01;
  const activeHeadingIdxs = withGet(writable([]));
  const headingsTree = withGet(writable([]));
  function generateInitialLists(elementTarget2) {
    let headingsList2 = [];
    let elementsList2 = [];
    const includedHeadings = possibleHeadings.filter((h) => !exclude.includes(h));
    const targetHeaders = elementTarget2?.querySelectorAll(includedHeadings.join(", "));
    targetHeaders?.forEach((el) => {
      if (!el.id) {
        const uniqueID = el.innerText.replaceAll(/[^a-zA-Z0-9 ]/g, "").replaceAll(" ", "-").toLowerCase();
        el.id = `${uniqueID}`;
      }
      headingsList2.push(el);
    });
    headingsList2 = [...headingsList2];
    if (headingFilterFn) {
      headingsList2 = headingsList2.filter((heading) => headingFilterFn(heading));
    }
    elementsList2 = [].slice.call(elementTarget2?.getElementsByTagName("*"));
    elementsList2 = elementsList2.filter((el) => includedHeadings.includes(el.nodeName.toLowerCase()) || el.children.length === 0);
    elementsList2.splice(0, elementsList2.indexOf(headingsList2[0]));
    return {
      headingsList: headingsList2,
      elementsList: elementsList2
    };
  }
  function createTree(arr, startIndex = 0) {
    const tree = [];
    let i = 0;
    while (i < arr.length) {
      const node = {
        title: arr[i].innerText,
        index: startIndex + i,
        id: arr[i].id,
        node: arr[i],
        children: []
      };
      let j = i + 1;
      while (j < arr.length && parseInt(arr[j].tagName.charAt(1)) > parseInt(arr[i].tagName.charAt(1))) {
        j++;
      }
      node.children = createTree(arr.slice(i + 1, j), startIndex + i + 1);
      tree.push(node);
      i = j;
    }
    return tree;
  }
  function scrollToTargetAdjusted(selector2) {
    const element = document.getElementById(selector2);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - scrollOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: scrollBehaviour
      });
    }
  }
  const shouldHighlightParents = activeType === "highest-parents" || activeType === "lowest-parents" || activeType === "all-parents";
  function handleElementObservation(entries) {
    for (let i = 0; i < entries.length; i++) {
      const el_idx = elementsList.indexOf(entries[i].target);
      const toc_idx = elementHeadingLU[el_idx];
      let tempVisibleElementIdxs = visibleElementIdxs.get();
      if (entries[i].intersectionRatio >= observer_threshold) {
        if (tempVisibleElementIdxs.indexOf(el_idx) === -1) {
          tempVisibleElementIdxs = [...tempVisibleElementIdxs, el_idx];
          visibleElementIdxs.set(tempVisibleElementIdxs);
          if (shouldHighlightParents && headingParentsLU[toc_idx]) {
            activeParentIdxs.update((prev) => {
              return [...prev, ...headingParentsLU[toc_idx]];
            });
          }
        }
      } else {
        tempVisibleElementIdxs = tempVisibleElementIdxs.filter((item2) => item2 !== el_idx);
        visibleElementIdxs.set(tempVisibleElementIdxs);
        if (shouldHighlightParents && headingParentsLU[toc_idx]) {
          activeParentIdxs.update((prev) => {
            const newArr = [...prev];
            headingParentsLU[toc_idx]?.forEach((parent) => {
              const index = newArr.indexOf(parent);
              newArr.splice(index, 1);
            });
            return newArr;
          });
        }
      }
    }
    const allActiveHeaderIdxs = Array.from(new Set(visibleElementIdxs.get().map((idx) => elementHeadingLU[idx])));
    let activeHeaderIdxs;
    if (allActiveHeaderIdxs.length === 0) {
      activeHeaderIdxs = [];
    } else {
      switch (activeType) {
        case "highest":
          activeHeaderIdxs = [Math.min(...allActiveHeaderIdxs)];
          break;
        case "lowest":
          activeHeaderIdxs = [Math.max(...allActiveHeaderIdxs)];
          break;
        case "all":
          activeHeaderIdxs = allActiveHeaderIdxs;
          break;
        case "all-parents": {
          const parentIdxs = allActiveHeaderIdxs.flatMap((idx) => headingParentsLU[idx] ?? []);
          activeHeaderIdxs = [...allActiveHeaderIdxs, ...parentIdxs];
          break;
        }
        default: {
          const activeHeaderIdx = activeType === "highest-parents" ? Math.min(...allActiveHeaderIdxs) : Math.max(...allActiveHeaderIdxs);
          if (headingParentsLU[activeHeaderIdx]) {
            activeHeaderIdxs = [...headingParentsLU[activeHeaderIdx], activeHeaderIdx];
          } else {
            activeHeaderIdxs = [activeHeaderIdx];
          }
        }
      }
    }
    activeHeadingIdxs.set(activeHeaderIdxs);
  }
  function initialization() {
    observer?.disconnect();
    headingsList.forEach((h, i) => {
      headingParentsLU[i] = null;
      let current_heading = h.tagName;
      let parents = [];
      for (let j = i - 1; j >= 0; j--) {
        if (headingsList[j].tagName < current_heading) {
          current_heading = headingsList[j].tagName;
          parents = [...parents, j];
        }
      }
      headingParentsLU[i] = parents.length > 0 ? parents : null;
      const startIndex = elementsList.indexOf(headingsList[i]);
      const endIndex = i !== headingsList.length - 1 ? elementsList.indexOf(headingsList[i + 1]) : elementsList.length;
      for (let j = startIndex; j < endIndex; j++) {
        elementHeadingLU[j] = i;
      }
    });
    headingsTree.set(createTree(headingsList));
    if (activeType !== "none") {
      observer = new IntersectionObserver(handleElementObservation, {
        root: null,
        threshold: observer_threshold,
        rootMargin
      });
      elementsList.forEach((el) => observer?.observe(el));
    }
  }
  function mutationHandler() {
    const newElementTarget = document.querySelector(selector);
    if (!newElementTarget)
      return;
    const { headingsList: newHeadingsList, elementsList: newElementsList } = generateInitialLists(newElementTarget);
    if (dequal(headingsList, newHeadingsList))
      return;
    headingsList = newHeadingsList;
    elementsList = newElementsList;
    headingParentsLU = {};
    elementHeadingLU = {};
    initialization();
  }
  safeOnMount(() => {
    elementTarget = document.querySelector(selector);
    if (!elementTarget)
      return;
    ({ headingsList, elementsList } = generateInitialLists(elementTarget));
    initialization();
    mutationObserver = new MutationObserver(mutationHandler);
    mutationObserver.observe(elementTarget, { childList: true, subtree: true });
    return () => {
      observer?.disconnect();
      mutationObserver?.disconnect();
    };
  });
  const item = makeElement(name("item"), {
    stores: activeHeadingIdxs,
    returned: ($activeHeadingIdxs) => {
      return (id) => {
        const idx = headingsList.findIndex((heading) => heading.id === id);
        const active = $activeHeadingIdxs.includes(idx);
        return {
          "data-id": id,
          "data-active": active ? "" : void 0
        };
      };
    },
    action: (node) => {
      const id = node.getAttribute("data-id");
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        e.preventDefault();
        if (scrollFn) {
          scrollFn(`${id}`);
        } else {
          scrollToTargetAdjusted(`${id}`);
        }
        if (id) {
          history.pushState({}, "", `#${id}`);
        }
      }));
      return {
        destroy: unsub
      };
    }
  });
  const isActive = derived(activeHeadingIdxs, ($activeHeadingIdxs) => {
    return (headingId) => {
      const idx = headingsList.findIndex((heading) => heading.id === headingId);
      return $activeHeadingIdxs.includes(idx);
    };
  });
  return {
    elements: {
      item
    },
    states: {
      activeHeadingIdxs,
      headingsTree
    },
    helpers: {
      isActive
    }
  };
}
function TableOfContents($$payload, $$props) {
  push();
  var $$store_subs;
  let {
    tree = [],
    activeHeadingIdxs,
    item,
    level = 1
  } = $$props;
  $$payload.out += `<ul${attr_class(`m-0 list-none ${stringify(level !== 1 ? "pl-4" : "")}`)}>`;
  if (tree && tree.length) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(tree);
    $$payload.out += `<!--[-->`;
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let heading = each_array[i];
      const __MELTUI_BUILDER_0__ = store_get($$store_subs ??= {}, "$item", item)(heading.id);
      $$payload.out += `<li class="mt-0 pt-2"><a${spread_attributes(
        {
          href: `#${stringify(heading.id)}`,
          ...__MELTUI_BUILDER_0__,
          class: "hover:text-neutral-11 data-[active]:text-neutral-11 text-neutral-10 inline-flex items-center justify-center gap-1 no-underline transition-colors"
        }
      )}>${html(heading.node.innerHTML)}</a> `;
      if (heading.children && heading.children.length) {
        $$payload.out += "<!--[-->";
        TableOfContents($$payload, {
          tree: heading.children,
          level: level + 1,
          activeHeadingIdxs,
          item
        });
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></li>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></ul>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function MainContentContainer($$payload, $$props) {
  push();
  var $$store_subs;
  let { children } = $$props;
  const {
    elements: { item },
    states: { activeHeadingIdxs, headingsTree }
  } = createTableOfContents({
    selector: "#content-container",
    exclude: ["h1"],
    activeType: "all",
    headingFilterFn: (heading) => !heading.hasAttribute("data-toc-ignore")
  });
  $$payload.out += `<div class="flex w-full flex-col">`;
  Nav($$payload);
  $$payload.out += `<!----> <div class="mx-auto mb-12 mt-0 flex flex-row justify-center gap-8 px-0 md:mt-12"><div class="sticky top-20 hidden h-full md:block">`;
  Tree_1($$payload, {});
  $$payload.out += `<!----></div> <div><div class="sticky top-14 z-50"><!---->`;
  Root($$payload, {
    class: "bg-neutral-2 border-neutral-6 mb-4 flex w-full flex-col border px-8 py-4 md:hidden",
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Trigger($$payload2, {
        class: "text-neutral-11 font-semibold",
        children: ($$payload3) => {
          $$payload3.out += `<!---->On This Page`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Content($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          {
            TableOfContents($$payload3, {
              tree: store_get($$store_subs ??= {}, "$headingsTree", headingsTree),
              activeHeadingIdxs: store_get($$store_subs ??= {}, "$activeHeadingIdxs", activeHeadingIdxs),
              item
            });
          }
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div> <div id="content-container" class="prose dark:prose-invert px-2 md:px-0"><!---->`;
  Scroll_area($$payload, {
    class: "h-full",
    children: ($$payload2) => {
      children($$payload2);
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></div> <div class="sticky top-20 hidden h-full w-[200px] md:block"><p class="text-neutral-11 font-semibold">On This Page</p> <nav><!---->`;
  {
    TableOfContents($$payload, {
      tree: store_get($$store_subs ??= {}, "$headingsTree", headingsTree),
      activeHeadingIdxs: store_get($$store_subs ??= {}, "$activeHeadingIdxs", activeHeadingIdxs),
      item
    });
  }
  $$payload.out += `<!----></nav></div></div></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  MainContentContainer as M
};
