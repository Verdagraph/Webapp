import { a2 as current_component, Y as sanitize_props, N as spread_attributes, D as pop, A as push, O as clsx$1, P as bind_props, T as once, a3 as getAllContexts, J as spread_props, U as copy_payload, V as assign_payload, a4 as rest_props, a5 as fallback, I as ensure_array_like, R as element, Z as slot } from "./index.js";
import { h as html, y as box, i as isBrowser, x as noop, n as useRefById, R as executeCallbacks, T as isElement, u as useId, U as isSelectableInput, V as isElementHidden, W as composeHandlers, e as isHTMLElement, X as useFloatingContentState, z as mergeProps, k as createContext, E as getDataOpenClosed, f as getDataDisabled, K as getAriaExpanded, L as isElementOrSVGElement, G as getAriaOrientation, o as getAriaDisabled, Y as getAriaChecked, H as Floating_layer, N as SvelteSet, Z as watch } from "./floating-layer-anchor.js";
import { tv } from "tailwind-variants";
import { clsx } from "clsx";
import { webcrypto } from "node:crypto";
import { twMerge } from "tailwind-merge";
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
async function tick() {
}
function useDebounce$1(callback, wait = 250) {
  let context = null;
  function debounced(...args) {
    if (context) {
      if (context.timeout) {
        clearTimeout(context.timeout);
      }
    } else {
      let resolve;
      let reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      context = {
        timeout: null,
        runner: null,
        promise,
        resolve,
        reject
      };
    }
    context.runner = async () => {
      if (!context) return;
      const ctx = context;
      context = null;
      try {
        ctx.resolve(await callback.apply(this, args));
      } catch (error) {
        ctx.reject(error);
      }
    };
    context.timeout = setTimeout(context.runner, typeof wait === "function" ? wait() : wait);
    return context.promise;
  }
  debounced.cancel = async () => {
    if (!context || context.timeout === null) {
      await new Promise((resolve) => setTimeout(resolve, 0));
      if (!context || context.timeout === null) return;
    }
    clearTimeout(context.timeout);
    context.reject("Cancelled");
    context = null;
  };
  debounced.runScheduledNow = async () => {
    if (!context || !context.timeout) {
      await new Promise((resolve) => setTimeout(resolve, 0));
      if (!context || !context.timeout) return;
    }
    clearTimeout(context.timeout);
    context.timeout = null;
    await context.runner?.();
  };
  Object.defineProperty(debounced, "pending", {
    enumerable: true,
    get() {
      return !!context?.timeout;
    }
  });
  return debounced;
}
const iconIds = {
  formFieldDescriptionIcon: "material-symbols:info-outline-rounded",
  defaultSpinnerIcon: "humbleicons:spinner-earring",
  defaultRefreshIcon: "material-symbols:refresh-rounded",
  defaultClose: "mdi:close",
  chevronLeft: "material-symbols:chevron-left-rounded",
  chevronRight: "material-symbols:chevron-right-rounded",
  addIcon: "mdi:plus-circle-outline",
  startEditingIcon: "material-symbols:edit-outline",
  endEditingIcon: "material-symbols:edit-off-outline",
  deleteIcon: "material-symbols:delete-outline",
  searchIcon: "material-symbols:search",
  listIcon: "material-symbols:list-rounded",
  homeIcon: "material-symbols:home",
  /** Selection. */
  pointerSelectIcon: "mdi:cursor-default-outline",
  groupSelectIcon: "mdi:select-multiple",
  /* Navigation and UI. */
  gardenDrawerIcon: "material-symbols:menu-open-rounded",
  /* Workspaces */
  plantingAreaIcon: "fluent:plant-cattail-24-regular",
  rectangleIcon: "material-symbols:square-outline-rounded",
  polygonIcon: "material-symbols:pentagon-outline-rounded",
  ellipseIcon: "material-symbols:circle-outline",
  linesIcon: "ph:polygon",
  verdagraphTranslateIcon: "lucide:move",
  verdagraphLayoutIcon: "mdi:land-plots-circle-variant",
  verdagraphTreeIcon: "material-symbols:account-tree-rounded",
  /** TimelineSelector. */
  verdagraphMonthReverseIcon: "mdi:chevron-triple-left",
  verdagraphWeekReverseIcon: "mdi:chevron-double-left",
  verdagraphDayReverseIcon: "mdi:chevron-left",
  verdagraphDayForwardIcon: "mdi:chevron-right",
  verdagraphWeekForwardIcon: "mdi:chevron-double-right",
  verdagraphMonthForwardIcon: "mdi:chevron-triple-right",
  timelineSelectorTranslateIcon: "lucide:move-horizontal",
  timelineSelectorShrinkIcon: "uil:shrink"
};
const matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const stringToIcon = (value, validate, allowSimpleName, provider = "") => {
  const colonSeparated = value.split(":");
  if (value.slice(0, 1) === "@") {
    if (colonSeparated.length < 2 || colonSeparated.length > 3) {
      return null;
    }
    provider = colonSeparated.shift().slice(1);
  }
  if (colonSeparated.length > 3 || !colonSeparated.length) {
    return null;
  }
  if (colonSeparated.length > 1) {
    const name2 = colonSeparated.pop();
    const prefix = colonSeparated.pop();
    const result = {
      // Allow provider without '@': "provider:prefix:name"
      provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
      prefix,
      name: name2
    };
    return validate && !validateIconName(result) ? null : result;
  }
  const name = colonSeparated[0];
  const dashSeparated = name.split("-");
  if (dashSeparated.length > 1) {
    const result = {
      provider,
      prefix: dashSeparated.shift(),
      name: dashSeparated.join("-")
    };
    return validate && !validateIconName(result) ? null : result;
  }
  if (allowSimpleName && provider === "") {
    const result = {
      provider,
      prefix: "",
      name
    };
    return validate && !validateIconName(result, allowSimpleName) ? null : result;
  }
  return null;
};
const validateIconName = (icon, allowSimpleName) => {
  if (!icon) {
    return false;
  }
  return !!// Check prefix: cannot be empty, unless allowSimpleName is enabled
  // Check name: cannot be empty
  ((allowSimpleName && icon.prefix === "" || !!icon.prefix) && !!icon.name);
};
const defaultIconDimensions = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
);
const defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
const defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations
});
const defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps,
  body: "",
  hidden: false
});
function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) {
    result.hFlip = true;
  }
  if (!obj1.vFlip !== !obj2.vFlip) {
    result.vFlip = true;
  }
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) {
    result.rotate = rotate;
  }
  return result;
}
function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps) {
    if (key in defaultIconTransformations) {
      if (key in parent && !(key in result)) {
        result[key] = defaultIconTransformations[key];
      }
    } else if (key in child) {
      result[key] = child[key];
    } else if (key in parent) {
      result[key] = parent[key];
    }
  }
  return result;
}
function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons[name]) {
      return resolved[name] = [];
    }
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value) {
        resolved[name] = [parent].concat(value);
      }
    }
    return resolved[name];
  }
  Object.keys(icons).concat(Object.keys(aliases)).forEach(resolve);
  return resolved;
}
function internalGetIconData(data, name, tree) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse(name2) {
    currentProps = mergeIconData(
      icons[name2] || aliases[name2],
      currentProps
    );
  }
  parse(name);
  tree.forEach(parse);
  return mergeIconData(data, currentProps);
}
function parseIconSet(data, callback) {
  const names = [];
  if (typeof data !== "object" || typeof data.icons !== "object") {
    return names;
  }
  if (data.not_found instanceof Array) {
    data.not_found.forEach((name) => {
      callback(name, null);
      names.push(name);
    });
  }
  const tree = getIconsTree(data);
  for (const name in tree) {
    const item = tree[name];
    if (item) {
      callback(name, internalGetIconData(data, name, item));
      names.push(name);
    }
  }
  return names;
}
const optionalPropertyDefaults = {
  provider: "",
  aliases: {},
  not_found: {},
  ...defaultIconDimensions
};
function checkOptionalProps(item, defaults) {
  for (const prop in defaults) {
    if (prop in item && typeof item[prop] !== typeof defaults[prop]) {
      return false;
    }
  }
  return true;
}
function quicklyValidateIconSet(obj) {
  if (typeof obj !== "object" || obj === null) {
    return null;
  }
  const data = obj;
  if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") {
    return null;
  }
  if (!checkOptionalProps(obj, optionalPropertyDefaults)) {
    return null;
  }
  const icons = data.icons;
  for (const name in icons) {
    const icon = icons[name];
    if (
      // Name cannot be empty
      !name || // Must have body
      typeof icon.body !== "string" || // Check other props
      !checkOptionalProps(
        icon,
        defaultExtendedIconProps
      )
    ) {
      return null;
    }
  }
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  for (const name in aliases) {
    const icon = aliases[name];
    const parent = icon.parent;
    if (
      // Name cannot be empty
      !name || // Parent must be set and point to existing icon
      typeof parent !== "string" || !icons[parent] && !aliases[parent] || // Check other props
      !checkOptionalProps(
        icon,
        defaultExtendedIconProps
      )
    ) {
      return null;
    }
  }
  return data;
}
const dataStorage = /* @__PURE__ */ Object.create(null);
function newStorage(provider, prefix) {
  return {
    provider,
    prefix,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function getStorage(provider, prefix) {
  const providerStorage = dataStorage[provider] || (dataStorage[provider] = /* @__PURE__ */ Object.create(null));
  return providerStorage[prefix] || (providerStorage[prefix] = newStorage(provider, prefix));
}
function addIconSet(storage2, data) {
  if (!quicklyValidateIconSet(data)) {
    return [];
  }
  return parseIconSet(data, (name, icon) => {
    if (icon) {
      storage2.icons[name] = icon;
    } else {
      storage2.missing.add(name);
    }
  });
}
function addIconToStorage(storage2, name, icon) {
  try {
    if (typeof icon.body === "string") {
      storage2.icons[name] = { ...icon };
      return true;
    }
  } catch (err) {
  }
  return false;
}
let simpleNames = false;
function allowSimpleNames(allow) {
  if (typeof allow === "boolean") {
    simpleNames = allow;
  }
  return simpleNames;
}
function getIconData(name) {
  const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
  if (icon) {
    const storage2 = getStorage(icon.provider, icon.prefix);
    const iconName = icon.name;
    return storage2.icons[iconName] || (storage2.missing.has(iconName) ? null : void 0);
  }
}
function addIcon(name, data) {
  const icon = stringToIcon(name, true, simpleNames);
  if (!icon) {
    return false;
  }
  const storage2 = getStorage(icon.provider, icon.prefix);
  if (data) {
    return addIconToStorage(storage2, icon.name, data);
  } else {
    storage2.missing.add(icon.name);
    return true;
  }
}
function addCollection(data, provider) {
  if (typeof data !== "object") {
    return false;
  }
  if (typeof provider !== "string") {
    provider = data.provider || "";
  }
  if (simpleNames && !provider && !data.prefix) {
    let added = false;
    if (quicklyValidateIconSet(data)) {
      data.prefix = "";
      parseIconSet(data, (name, icon) => {
        if (addIcon(name, icon)) {
          added = true;
        }
      });
    }
    return added;
  }
  const prefix = data.prefix;
  if (!validateIconName({
    prefix,
    name: "a"
  })) {
    return false;
  }
  const storage2 = getStorage(provider, prefix);
  return !!addIconSet(storage2, data);
}
const defaultIconSizeCustomisations = Object.freeze({
  width: null,
  height: null
});
const defaultIconCustomisations = Object.freeze({
  // Dimensions
  ...defaultIconSizeCustomisations,
  // Transformations
  ...defaultIconTransformations
});
const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision || 100;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}
function splitSVGDefs(content, tag = "defs") {
  let defs = "";
  const index = content.indexOf("<" + tag);
  while (index >= 0) {
    const start = content.indexOf(">", index);
    const end = content.indexOf("</" + tag);
    if (start === -1 || end === -1) {
      break;
    }
    const endEnd = content.indexOf(">", end);
    if (endEnd === -1) {
      break;
    }
    defs += content.slice(start + 1, end).trim();
    content = content.slice(0, index).trim() + content.slice(endEnd + 1);
  }
  return {
    defs,
    content
  };
}
function mergeDefsAndContent(defs, content) {
  return defs ? "<defs>" + defs + "</defs>" + content : content;
}
function wrapSVGContent(body, start, end) {
  const split = splitSVGDefs(body);
  return mergeDefsAndContent(split.defs, start + split.content + end);
}
const isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box2 = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push(
          "translate(" + (box2.width + box2.left).toString() + " " + (0 - box2.top).toString() + ")"
        );
        transformations.push("scale(-1 1)");
        box2.top = box2.left = 0;
      }
    } else if (vFlip) {
      transformations.push(
        "translate(" + (0 - box2.left).toString() + " " + (box2.height + box2.top).toString() + ")"
      );
      transformations.push("scale(1 -1)");
      box2.top = box2.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box2.height / 2 + box2.top;
        transformations.unshift(
          "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
      case 2:
        transformations.unshift(
          "rotate(180 " + (box2.width / 2 + box2.left).toString() + " " + (box2.height / 2 + box2.top).toString() + ")"
        );
        break;
      case 3:
        tempValue = box2.width / 2 + box2.left;
        transformations.unshift(
          "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
    }
    if (rotation % 2 === 1) {
      if (box2.left !== box2.top) {
        tempValue = box2.left;
        box2.left = box2.top;
        box2.top = tempValue;
      }
      if (box2.width !== box2.height) {
        tempValue = box2.width;
        box2.width = box2.height;
        box2.height = tempValue;
      }
    }
    if (transformations.length) {
      body = wrapSVGContent(
        body,
        '<g transform="' + transformations.join(" ") + '">',
        "</g>"
      );
    }
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box2.width;
  const boxHeight = box2.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value)) {
      attributes[prop] = value.toString();
    }
  };
  setAttr("width", width);
  setAttr("height", height);
  const viewBox = [box2.left, box2.top, boxWidth, boxHeight];
  attributes.viewBox = viewBox.join(" ");
  return {
    attributes,
    viewBox,
    body
  };
}
const regex = /\sid="(\S+)"/g;
const randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let counter = 0;
function replaceIDs(body, prefix = randomPrefix) {
  const ids = [];
  let match;
  while (match = regex.exec(body)) {
    ids.push(match[1]);
  }
  if (!ids.length) {
    return body;
  }
  const suffix = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  ids.forEach((id) => {
    const newID = typeof prefix === "function" ? prefix(id) : prefix + (counter++).toString();
    const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"),
      "$1" + newID + suffix + "$3"
    );
  });
  body = body.replace(new RegExp(suffix, "g"), "");
  return body;
}
const storage = /* @__PURE__ */ Object.create(null);
function setAPIModule(provider, item) {
  storage[provider] = item;
}
function getAPIModule(provider) {
  return storage[provider] || storage[""];
}
function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string") {
    resources = [source.resources];
  } else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length) {
      return null;
    }
  }
  const result = {
    // API hosts
    resources,
    // Root path
    path: source.path || "/",
    // URL length limit
    maxURL: source.maxURL || 500,
    // Timeout before next host is used.
    rotate: source.rotate || 750,
    // Timeout before failing query.
    timeout: source.timeout || 5e3,
    // Randomise default API end point.
    random: source.random === true,
    // Start index
    index: source.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
  return result;
}
const configStorage = /* @__PURE__ */ Object.create(null);
const fallBackAPISources = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
];
const fallBackAPI = [];
while (fallBackAPISources.length > 0) {
  if (fallBackAPISources.length === 1) {
    fallBackAPI.push(fallBackAPISources.shift());
  } else {
    if (Math.random() > 0.5) {
      fallBackAPI.push(fallBackAPISources.shift());
    } else {
      fallBackAPI.push(fallBackAPISources.pop());
    }
  }
}
configStorage[""] = createAPIConfig({
  resources: ["https://api.iconify.design"].concat(fallBackAPI)
});
function addAPIProvider(provider, customConfig) {
  const config = createAPIConfig(customConfig);
  if (config === null) {
    return false;
  }
  configStorage[provider] = config;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
const detectFetch = () => {
  let callback;
  try {
    callback = fetch;
    if (typeof callback === "function") {
      return callback;
    }
  } catch (err) {
  }
};
let fetchModule = detectFetch();
function calculateMaxLength(provider, prefix) {
  const config = getAPIConfig(provider);
  if (!config) {
    return 0;
  }
  let result;
  if (!config.maxURL) {
    result = 0;
  } else {
    let maxHostLength = 0;
    config.resources.forEach((item) => {
      const host = item;
      maxHostLength = Math.max(maxHostLength, host.length);
    });
    const url = prefix + ".json?icons=";
    result = config.maxURL - maxHostLength - config.path.length - url.length;
  }
  return result;
}
function shouldAbort(status) {
  return status === 404;
}
const prepare = (provider, prefix, icons) => {
  const results = [];
  const maxLength = calculateMaxLength(provider, prefix);
  const type = "icons";
  let item = {
    type,
    provider,
    prefix,
    icons: []
  };
  let length = 0;
  icons.forEach((name, index) => {
    length += name.length + 1;
    if (length >= maxLength && index > 0) {
      results.push(item);
      item = {
        type,
        provider,
        prefix,
        icons: []
      };
      length = name.length;
    }
    item.icons.push(name);
  });
  results.push(item);
  return results;
};
function getPath(provider) {
  if (typeof provider === "string") {
    const config = getAPIConfig(provider);
    if (config) {
      return config.path;
    }
  }
  return "/";
}
const send = (host, params, callback) => {
  if (!fetchModule) {
    callback("abort", 424);
    return;
  }
  let path = getPath(params.provider);
  switch (params.type) {
    case "icons": {
      const prefix = params.prefix;
      const icons = params.icons;
      const iconsList = icons.join(",");
      const urlParams = new URLSearchParams({
        icons: iconsList
      });
      path += prefix + ".json?" + urlParams.toString();
      break;
    }
    case "custom": {
      const uri = params.uri;
      path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
      break;
    }
    default:
      callback("abort", 400);
      return;
  }
  let defaultError = 503;
  fetchModule(host + path).then((response) => {
    const status = response.status;
    if (status !== 200) {
      setTimeout(() => {
        callback(shouldAbort(status) ? "abort" : "next", status);
      });
      return;
    }
    defaultError = 501;
    return response.json();
  }).then((data) => {
    if (typeof data !== "object" || data === null) {
      setTimeout(() => {
        if (data === 404) {
          callback("abort", data);
        } else {
          callback("next", defaultError);
        }
      });
      return;
    }
    setTimeout(() => {
      callback("success", data);
    });
  }).catch(() => {
    callback("next", defaultError);
  });
};
const fetchAPIModule = {
  prepare,
  send
};
function sortIcons(icons) {
  const result = {
    loaded: [],
    missing: [],
    pending: []
  };
  const storage2 = /* @__PURE__ */ Object.create(null);
  icons.sort((a, b) => {
    if (a.provider !== b.provider) {
      return a.provider.localeCompare(b.provider);
    }
    if (a.prefix !== b.prefix) {
      return a.prefix.localeCompare(b.prefix);
    }
    return a.name.localeCompare(b.name);
  });
  let lastIcon = {
    provider: "",
    prefix: "",
    name: ""
  };
  icons.forEach((icon) => {
    if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider) {
      return;
    }
    lastIcon = icon;
    const provider = icon.provider;
    const prefix = icon.prefix;
    const name = icon.name;
    const providerStorage = storage2[provider] || (storage2[provider] = /* @__PURE__ */ Object.create(null));
    const localStorage2 = providerStorage[prefix] || (providerStorage[prefix] = getStorage(provider, prefix));
    let list;
    if (name in localStorage2.icons) {
      list = result.loaded;
    } else if (prefix === "" || localStorage2.missing.has(name)) {
      list = result.missing;
    } else {
      list = result.pending;
    }
    const item = {
      provider,
      prefix,
      name
    };
    list.push(item);
  });
  return result;
}
function removeCallback(storages, id) {
  storages.forEach((storage2) => {
    const items = storage2.loaderCallbacks;
    if (items) {
      storage2.loaderCallbacks = items.filter((row) => row.id !== id);
    }
  });
}
function updateCallbacks(storage2) {
  if (!storage2.pendingCallbacksFlag) {
    storage2.pendingCallbacksFlag = true;
    setTimeout(() => {
      storage2.pendingCallbacksFlag = false;
      const items = storage2.loaderCallbacks ? storage2.loaderCallbacks.slice(0) : [];
      if (!items.length) {
        return;
      }
      let hasPending = false;
      const provider = storage2.provider;
      const prefix = storage2.prefix;
      items.forEach((item) => {
        const icons = item.icons;
        const oldLength = icons.pending.length;
        icons.pending = icons.pending.filter((icon) => {
          if (icon.prefix !== prefix) {
            return true;
          }
          const name = icon.name;
          if (storage2.icons[name]) {
            icons.loaded.push({
              provider,
              prefix,
              name
            });
          } else if (storage2.missing.has(name)) {
            icons.missing.push({
              provider,
              prefix,
              name
            });
          } else {
            hasPending = true;
            return true;
          }
          return false;
        });
        if (icons.pending.length !== oldLength) {
          if (!hasPending) {
            removeCallback([storage2], item.id);
          }
          item.callback(
            icons.loaded.slice(0),
            icons.missing.slice(0),
            icons.pending.slice(0),
            item.abort
          );
        }
      });
    });
  }
}
let idCounter = 0;
function storeCallback(callback, icons, pendingSources) {
  const id = idCounter++;
  const abort = removeCallback.bind(null, pendingSources, id);
  if (!icons.pending.length) {
    return abort;
  }
  const item = {
    id,
    icons,
    callback,
    abort
  };
  pendingSources.forEach((storage2) => {
    (storage2.loaderCallbacks || (storage2.loaderCallbacks = [])).push(item);
  });
  return abort;
}
function listToIcons(list, validate = true, simpleNames2 = false) {
  const result = [];
  list.forEach((item) => {
    const icon = typeof item === "string" ? stringToIcon(item, validate, simpleNames2) : item;
    if (icon) {
      result.push(icon);
    }
  });
  return result;
}
var defaultConfig = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: false,
  dataAfterTimeout: false
};
function sendQuery(config, payload, query, done) {
  const resourcesCount = config.resources.length;
  const startIndex = config.random ? Math.floor(Math.random() * resourcesCount) : config.index;
  let resources;
  if (config.random) {
    let list = config.resources.slice(0);
    resources = [];
    while (list.length > 1) {
      const nextIndex = Math.floor(Math.random() * list.length);
      resources.push(list[nextIndex]);
      list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
    }
    resources = resources.concat(list);
  } else {
    resources = config.resources.slice(startIndex).concat(config.resources.slice(0, startIndex));
  }
  const startTime = Date.now();
  let status = "pending";
  let queriesSent = 0;
  let lastError;
  let timer = null;
  let queue = [];
  let doneCallbacks = [];
  if (typeof done === "function") {
    doneCallbacks.push(done);
  }
  function resetTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function abort() {
    if (status === "pending") {
      status = "aborted";
    }
    resetTimer();
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function subscribe(callback, overwrite) {
    if (overwrite) {
      doneCallbacks = [];
    }
    if (typeof callback === "function") {
      doneCallbacks.push(callback);
    }
  }
  function getQueryStatus() {
    return {
      startTime,
      payload,
      status,
      queriesSent,
      queriesPending: queue.length,
      subscribe,
      abort
    };
  }
  function failQuery() {
    status = "failed";
    doneCallbacks.forEach((callback) => {
      callback(void 0, lastError);
    });
  }
  function clearQueue() {
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function moduleResponse(item, response, data) {
    const isError = response !== "success";
    queue = queue.filter((queued) => queued !== item);
    switch (status) {
      case "pending":
        break;
      case "failed":
        if (isError || !config.dataAfterTimeout) {
          return;
        }
        break;
      default:
        return;
    }
    if (response === "abort") {
      lastError = data;
      failQuery();
      return;
    }
    if (isError) {
      lastError = data;
      if (!queue.length) {
        if (!resources.length) {
          failQuery();
        } else {
          execNext();
        }
      }
      return;
    }
    resetTimer();
    clearQueue();
    if (!config.random) {
      const index = config.resources.indexOf(item.resource);
      if (index !== -1 && index !== config.index) {
        config.index = index;
      }
    }
    status = "completed";
    doneCallbacks.forEach((callback) => {
      callback(data);
    });
  }
  function execNext() {
    if (status !== "pending") {
      return;
    }
    resetTimer();
    const resource = resources.shift();
    if (resource === void 0) {
      if (queue.length) {
        timer = setTimeout(() => {
          resetTimer();
          if (status === "pending") {
            clearQueue();
            failQuery();
          }
        }, config.timeout);
        return;
      }
      failQuery();
      return;
    }
    const item = {
      status: "pending",
      resource,
      callback: (status2, data) => {
        moduleResponse(item, status2, data);
      }
    };
    queue.push(item);
    queriesSent++;
    timer = setTimeout(execNext, config.rotate);
    query(resource, payload, item.callback);
  }
  setTimeout(execNext);
  return getQueryStatus;
}
function initRedundancy(cfg) {
  const config = {
    ...defaultConfig,
    ...cfg
  };
  let queries = [];
  function cleanup() {
    queries = queries.filter((item) => item().status === "pending");
  }
  function query(payload, queryCallback, doneCallback) {
    const query2 = sendQuery(
      config,
      payload,
      queryCallback,
      (data, error) => {
        cleanup();
        if (doneCallback) {
          doneCallback(data, error);
        }
      }
    );
    queries.push(query2);
    return query2;
  }
  function find(callback) {
    return queries.find((value) => {
      return callback(value);
    }) || null;
  }
  const instance = {
    query,
    find,
    setIndex: (index) => {
      config.index = index;
    },
    getIndex: () => config.index,
    cleanup
  };
  return instance;
}
function emptyCallback$1() {
}
const redundancyCache = /* @__PURE__ */ Object.create(null);
function getRedundancyCache(provider) {
  if (!redundancyCache[provider]) {
    const config = getAPIConfig(provider);
    if (!config) {
      return;
    }
    const redundancy = initRedundancy(config);
    const cachedReundancy = {
      config,
      redundancy
    };
    redundancyCache[provider] = cachedReundancy;
  }
  return redundancyCache[provider];
}
function sendAPIQuery(target, query, callback) {
  let redundancy;
  let send2;
  if (typeof target === "string") {
    const api = getAPIModule(target);
    if (!api) {
      callback(void 0, 424);
      return emptyCallback$1;
    }
    send2 = api.send;
    const cached = getRedundancyCache(target);
    if (cached) {
      redundancy = cached.redundancy;
    }
  } else {
    const config = createAPIConfig(target);
    if (config) {
      redundancy = initRedundancy(config);
      const moduleKey = target.resources ? target.resources[0] : "";
      const api = getAPIModule(moduleKey);
      if (api) {
        send2 = api.send;
      }
    }
  }
  if (!redundancy || !send2) {
    callback(void 0, 424);
    return emptyCallback$1;
  }
  return redundancy.query(query, send2, callback)().abort;
}
function emptyCallback() {
}
function loadedNewIcons(storage2) {
  if (!storage2.iconsLoaderFlag) {
    storage2.iconsLoaderFlag = true;
    setTimeout(() => {
      storage2.iconsLoaderFlag = false;
      updateCallbacks(storage2);
    });
  }
}
function checkIconNamesForAPI(icons) {
  const valid = [];
  const invalid = [];
  icons.forEach((name) => {
    (name.match(matchIconName) ? valid : invalid).push(name);
  });
  return {
    valid,
    invalid
  };
}
function parseLoaderResponse(storage2, icons, data) {
  function checkMissing() {
    const pending = storage2.pendingIcons;
    icons.forEach((name) => {
      if (pending) {
        pending.delete(name);
      }
      if (!storage2.icons[name]) {
        storage2.missing.add(name);
      }
    });
  }
  if (data && typeof data === "object") {
    try {
      const parsed = addIconSet(storage2, data);
      if (!parsed.length) {
        checkMissing();
        return;
      }
    } catch (err) {
      console.error(err);
    }
  }
  checkMissing();
  loadedNewIcons(storage2);
}
function parsePossiblyAsyncResponse(response, callback) {
  if (response instanceof Promise) {
    response.then((data) => {
      callback(data);
    }).catch(() => {
      callback(null);
    });
  } else {
    callback(response);
  }
}
function loadNewIcons(storage2, icons) {
  if (!storage2.iconsToLoad) {
    storage2.iconsToLoad = icons;
  } else {
    storage2.iconsToLoad = storage2.iconsToLoad.concat(icons).sort();
  }
  if (!storage2.iconsQueueFlag) {
    storage2.iconsQueueFlag = true;
    setTimeout(() => {
      storage2.iconsQueueFlag = false;
      const { provider, prefix } = storage2;
      const icons2 = storage2.iconsToLoad;
      delete storage2.iconsToLoad;
      if (!icons2 || !icons2.length) {
        return;
      }
      const customIconLoader = storage2.loadIcon;
      if (storage2.loadIcons && (icons2.length > 1 || !customIconLoader)) {
        parsePossiblyAsyncResponse(
          storage2.loadIcons(icons2, prefix, provider),
          (data) => {
            parseLoaderResponse(storage2, icons2, data);
          }
        );
        return;
      }
      if (customIconLoader) {
        icons2.forEach((name) => {
          const response = customIconLoader(name, prefix, provider);
          parsePossiblyAsyncResponse(response, (data) => {
            const iconSet = data ? {
              prefix,
              icons: {
                [name]: data
              }
            } : null;
            parseLoaderResponse(storage2, [name], iconSet);
          });
        });
        return;
      }
      const { valid, invalid } = checkIconNamesForAPI(icons2);
      if (invalid.length) {
        parseLoaderResponse(storage2, invalid, null);
      }
      if (!valid.length) {
        return;
      }
      const api = prefix.match(matchIconName) ? getAPIModule(provider) : null;
      if (!api) {
        parseLoaderResponse(storage2, valid, null);
        return;
      }
      const params = api.prepare(provider, prefix, valid);
      params.forEach((item) => {
        sendAPIQuery(provider, item, (data) => {
          parseLoaderResponse(storage2, item.icons, data);
        });
      });
    });
  }
}
const loadIcons = (icons, callback) => {
  const cleanedIcons = listToIcons(icons, true, allowSimpleNames());
  const sortedIcons = sortIcons(cleanedIcons);
  if (!sortedIcons.pending.length) {
    let callCallback = true;
    if (callback) {
      setTimeout(() => {
        if (callCallback) {
          callback(
            sortedIcons.loaded,
            sortedIcons.missing,
            sortedIcons.pending,
            emptyCallback
          );
        }
      });
    }
    return () => {
      callCallback = false;
    };
  }
  const newIcons = /* @__PURE__ */ Object.create(null);
  const sources = [];
  let lastProvider, lastPrefix;
  sortedIcons.pending.forEach((icon) => {
    const { provider, prefix } = icon;
    if (prefix === lastPrefix && provider === lastProvider) {
      return;
    }
    lastProvider = provider;
    lastPrefix = prefix;
    sources.push(getStorage(provider, prefix));
    const providerNewIcons = newIcons[provider] || (newIcons[provider] = /* @__PURE__ */ Object.create(null));
    if (!providerNewIcons[prefix]) {
      providerNewIcons[prefix] = [];
    }
  });
  sortedIcons.pending.forEach((icon) => {
    const { provider, prefix, name } = icon;
    const storage2 = getStorage(provider, prefix);
    const pendingQueue = storage2.pendingIcons || (storage2.pendingIcons = /* @__PURE__ */ new Set());
    if (!pendingQueue.has(name)) {
      pendingQueue.add(name);
      newIcons[provider][prefix].push(name);
    }
  });
  sources.forEach((storage2) => {
    const list = newIcons[storage2.provider][storage2.prefix];
    if (list.length) {
      loadNewIcons(storage2, list);
    }
  });
  return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
};
function mergeCustomisations(defaults, item) {
  const result = {
    ...defaults
  };
  for (const key in item) {
    const value = item[key];
    const valueType = typeof value;
    if (key in defaultIconSizeCustomisations) {
      if (value === null || value && (valueType === "string" || valueType === "number")) {
        result[key] = value;
      }
    } else if (valueType === typeof result[key]) {
      result[key] = key === "rotate" ? value % 4 : value;
    }
  }
  return result;
}
const separator = /[\s,]+/;
function flipFromString(custom, flip) {
  flip.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}
function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value2) {
    while (value2 < 0) {
      value2 += 4;
    }
    return value2 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num)) {
        return 0;
      }
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}
function iconToHTML(body, attributes) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes) {
    renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  }
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}
function encodeSVGforURL(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function svgToData(svg) {
  return "data:image/svg+xml," + encodeSVGforURL(svg);
}
function svgToURL(svg) {
  return 'url("' + svgToData(svg) + '")';
}
const defaultExtendedIconCustomisations = {
  ...defaultIconCustomisations,
  inline: false
};
const svgDefaults = {
  "xmlns": "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": true,
  "role": "img"
};
const commonProps = {
  display: "inline-block"
};
const monotoneProps = {
  "background-color": "currentColor"
};
const coloredProps = {
  "background-color": "transparent"
};
const propsToAdd = {
  image: "var(--svg)",
  repeat: "no-repeat",
  size: "100% 100%"
};
const propsToAddTo = {
  "-webkit-mask": monotoneProps,
  "mask": monotoneProps,
  "background": coloredProps
};
for (const prefix in propsToAddTo) {
  const list = propsToAddTo[prefix];
  for (const prop in propsToAdd) {
    list[prefix + "-" + prop] = propsToAdd[prop];
  }
}
function fixSize(value) {
  return value + (value.match(/^[-0-9.]+$/) ? "px" : "");
}
function render(icon, props) {
  const customisations = mergeCustomisations(defaultExtendedIconCustomisations, props);
  const mode = props.mode || "svg";
  const componentProps = mode === "svg" ? { ...svgDefaults } : {};
  if (icon.body.indexOf("xlink:") === -1) {
    delete componentProps["xmlns:xlink"];
  }
  let style = typeof props.style === "string" ? props.style : "";
  for (let key in props) {
    const value = props[key];
    if (value === void 0) {
      continue;
    }
    switch (key) {
      case "icon":
      case "style":
      case "onLoad":
      case "mode":
      case "ssr":
        break;
      case "inline":
      case "hFlip":
      case "vFlip":
        customisations[key] = value === true || value === "true" || value === 1;
        break;
      case "flip":
        if (typeof value === "string") {
          flipFromString(customisations, value);
        }
        break;
      case "color":
        style = style + (style.length > 0 && style.trim().slice(-1) !== ";" ? ";" : "") + "color: " + value + "; ";
        break;
      case "rotate":
        if (typeof value === "string") {
          customisations[key] = rotateFromString(value);
        } else if (typeof value === "number") {
          customisations[key] = value;
        }
        break;
      case "ariaHidden":
      case "aria-hidden":
        if (value !== true && value !== "true") {
          delete componentProps["aria-hidden"];
        }
        break;
      default:
        if (key.slice(0, 3) === "on:") {
          break;
        }
        if (defaultExtendedIconCustomisations[key] === void 0) {
          componentProps[key] = value;
        }
    }
  }
  const item = iconToSVG(icon, customisations);
  const renderAttribs = item.attributes;
  if (customisations.inline) {
    style = "vertical-align: -0.125em; " + style;
  }
  if (mode === "svg") {
    Object.assign(componentProps, renderAttribs);
    if (style !== "") {
      componentProps.style = style;
    }
    let localCounter = 0;
    let id = props.id;
    if (typeof id === "string") {
      id = id.replace(/-/g, "_");
    }
    return {
      svg: true,
      attributes: componentProps,
      body: replaceIDs(item.body, id ? () => id + "ID" + localCounter++ : "iconifySvelte")
    };
  }
  const { body, width, height } = icon;
  const useMask = mode === "mask" || (mode === "bg" ? false : body.indexOf("currentColor") !== -1);
  const html2 = iconToHTML(body, {
    ...renderAttribs,
    width: width + "",
    height: height + ""
  });
  const url = svgToURL(html2);
  const styles = {
    "--svg": url
  };
  const size = (prop) => {
    const value = renderAttribs[prop];
    if (value) {
      styles[prop] = fixSize(value);
    }
  };
  size("width");
  size("height");
  Object.assign(styles, commonProps, useMask ? monotoneProps : coloredProps);
  let customStyle = "";
  for (const key in styles) {
    customStyle += key + ": " + styles[key] + ";";
  }
  componentProps.style = customStyle + style;
  return {
    svg: false,
    attributes: componentProps
  };
}
allowSimpleNames(true);
setAPIModule("", fetchAPIModule);
if (typeof document !== "undefined" && typeof window !== "undefined") {
  const _window = window;
  if (_window.IconifyPreload !== void 0) {
    const preload = _window.IconifyPreload;
    const err = "Invalid IconifyPreload syntax.";
    if (typeof preload === "object" && preload !== null) {
      (preload instanceof Array ? preload : [preload]).forEach((item) => {
        try {
          if (
            // Check if item is an object and not null/array
            typeof item !== "object" || item === null || item instanceof Array || // Check for 'icons' and 'prefix'
            typeof item.icons !== "object" || typeof item.prefix !== "string" || // Add icon set
            !addCollection(item)
          ) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      });
    }
  }
  if (_window.IconifyProviders !== void 0) {
    const providers = _window.IconifyProviders;
    if (typeof providers === "object" && providers !== null) {
      for (let key in providers) {
        const err = "IconifyProviders[" + key + "] is invalid.";
        try {
          const value = providers[key];
          if (typeof value !== "object" || !value || value.resources === void 0) {
            continue;
          }
          if (!addAPIProvider(key, value)) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      }
    }
  }
}
function checkIconState(icon, state, mounted, callback, onload) {
  function abortLoading() {
    if (state.loading) {
      state.loading.abort();
      state.loading = null;
    }
  }
  if (typeof icon === "object" && icon !== null && typeof icon.body === "string") {
    state.name = "";
    abortLoading();
    return { data: { ...defaultIconProps, ...icon } };
  }
  let iconName;
  if (typeof icon !== "string" || (iconName = stringToIcon(icon, false, true)) === null) {
    abortLoading();
    return null;
  }
  const data = getIconData(iconName);
  if (!data) {
    if (mounted && (!state.loading || state.loading.name !== icon)) {
      abortLoading();
      state.name = "";
      state.loading = {
        name: icon,
        abort: loadIcons([iconName], callback)
      };
    }
    return null;
  }
  abortLoading();
  if (state.name !== icon) {
    state.name = icon;
    if (onload && !state.destroyed) {
      onload(icon);
    }
  }
  const classes = ["iconify"];
  if (iconName.prefix !== "") {
    classes.push("iconify--" + iconName.prefix);
  }
  if (iconName.provider !== "") {
    classes.push("iconify--" + iconName.provider);
  }
  return { data, classes };
}
function generateIcon(icon, props) {
  return icon ? render({
    ...defaultIconProps,
    ...icon
  }, props) : null;
}
function Icon$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push();
  const state = {
    // Last icon name
    name: "",
    // Loading status
    loading: null,
    // Destroyed status
    destroyed: false
  };
  let mounted = false;
  let data;
  const onLoad = (icon) => {
    if (typeof $$sanitized_props.onLoad === "function") {
      $$sanitized_props.onLoad(icon);
    }
  };
  function loaded() {
  }
  onDestroy(() => {
    state.destroyed = true;
    if (state.loading) {
      state.loading.abort();
      state.loading = null;
    }
  });
  {
    const isMounted = !!$$sanitized_props.ssr || mounted;
    const iconData = checkIconState($$sanitized_props.icon, state, isMounted, loaded, onLoad);
    data = iconData ? generateIcon(iconData.data, $$sanitized_props) : null;
    if (data && iconData.classes) {
      data.attributes["class"] = (typeof $$sanitized_props["class"] === "string" ? $$sanitized_props["class"] + " " : "") + iconData.classes.join(" ");
    }
  }
  if (data) {
    $$payload.out += "<!--[-->";
    if (data.svg) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<svg${spread_attributes({ ...data.attributes }, null, void 0, void 0, 3)}>${html(data.body)}</svg>`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<span${spread_attributes({ ...data.attributes })}></span>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = tv({
  base: "ring-offset-background focus-visible:ring-primary-7 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  variants: {
    variant: {
      default: "bg-primary-3 hover:bg-primary-4 active:bg-primary-5 border border-primary-7 text-primary-12",
      destructive: "bg-destructive-3 hover:bg-destructive-4 active:bg-destructive-5 border border-destructive-7 text-destructive-12",
      outline: "border-neutral-7 hover:bg-accent-3 active:bg-accent-4 hover:text-accent-12 border",
      secondary: "bg-secondary-3 hover:bg-secondary-4 active:bg-secondary-5 border border-secondary-7 text-secondary-12",
      accent: "bg-accent-3 hover:bg-accent-4 active:bg-accent-5 border border-accent-7 text-accent-12",
      ghost: "hover:bg-accent-3 active:bg-accent-4 hover:text-accent-12",
      link: "text-neutral-12 underline-offset-4 hover:underline hover:opacity-90"
    },
    size: {
      default: "h-10 px-4 py-2",
      xsm: "h-6 w-6 rounded-[8px] px-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10"
    }
  },
  defaultVariants: { variant: "default", size: "default" }
});
function Button($$payload, $$props) {
  push();
  let {
    class: className,
    variant = "default",
    size = "default",
    ref = null,
    href = void 0,
    type = "button",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  if (href) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<a${spread_attributes(
      {
        class: clsx$1(cn(buttonVariants({ variant, size }), className)),
        href,
        ...restProps
      }
    )}>`;
    children?.($$payload);
    $$payload.out += `<!----></a>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes(
      {
        class: clsx$1(cn(buttonVariants({ variant, size }), className)),
        type,
        ...restProps
      }
    )}>`;
    children?.($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function afterTick(fn) {
  tick().then(fn);
}
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
function useDebounce(callback, wait = 250) {
  let context = null;
  function debounced(...args) {
    if (context) {
      if (context.timeout) {
        clearTimeout(context.timeout);
      }
    } else {
      let resolve;
      let reject;
      let promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      context = { timeout: null, promise, resolve, reject };
    }
    context.timeout = setTimeout(
      async () => {
        if (!context) return;
        const ctx = context;
        context = null;
        try {
          ctx.resolve(await callback.apply(this, args));
        } catch (error) {
          ctx.reject(error);
        }
      },
      typeof wait === "function" ? wait() : wait
    );
    return context.promise;
  }
  debounced.cancel = async () => {
    if (!context || context.timeout === null) {
      await new Promise((resolve) => setTimeout(resolve, 0));
      if (!context || context.timeout === null) return;
    }
    clearTimeout(context.timeout);
    context.reject("Cancelled");
    context = null;
  };
  Object.defineProperty(debounced, "pending", {
    enumerable: true,
    get() {
      return !!context?.timeout;
    }
  });
  return debounced;
}
function isFunction$1(value) {
  return typeof value === "function";
}
function extract$1(value, defaultValue) {
  if (isFunction$1(value)) {
    const getter = value;
    return getter() ?? defaultValue ?? getter();
  }
  return value ?? defaultValue ?? value;
}
class IsMounted {
  #isMounted = false;
  constructor() {
  }
  get current() {
    return this.#isMounted;
  }
}
class IsFocusWithin {
  #node;
  #target = once(() => extract$1(this.#node));
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
const ARROW_DOWN = "ArrowDown";
const ARROW_LEFT = "ArrowLeft";
const ARROW_RIGHT = "ArrowRight";
const ARROW_UP = "ArrowUp";
const END = "End";
const ENTER = "Enter";
const ESCAPE = "Escape";
const HOME = "Home";
const PAGE_DOWN = "PageDown";
const PAGE_UP = "PageUp";
const SPACE = " ";
const TAB = "Tab";
function getElemDirection(elem) {
  const style = window.getComputedStyle(elem);
  const direction = style.getPropertyValue("direction");
  return direction;
}
function getNextKey(dir = "ltr", orientation = "horizontal") {
  return {
    horizontal: dir === "rtl" ? ARROW_LEFT : ARROW_RIGHT,
    vertical: ARROW_DOWN
  }[orientation];
}
function getPrevKey(dir = "ltr", orientation = "horizontal") {
  return {
    horizontal: dir === "rtl" ? ARROW_RIGHT : ARROW_LEFT,
    vertical: ARROW_UP
  }[orientation];
}
function getDirectionalKeys(dir = "ltr", orientation = "horizontal") {
  if (!["ltr", "rtl"].includes(dir))
    dir = "ltr";
  if (!["horizontal", "vertical"].includes(orientation))
    orientation = "horizontal";
  return {
    nextKey: getNextKey(dir, orientation),
    prevKey: getPrevKey(dir, orientation)
  };
}
function useRovingFocus(props) {
  const currentTabStopId = props.currentTabStopId ? props.currentTabStopId : box(null);
  function getCandidateNodes() {
    if (!isBrowser) return [];
    const node = document.getElementById(props.rootNodeId.current);
    if (!node) return [];
    if (props.candidateSelector) {
      const candidates = Array.from(node.querySelectorAll(props.candidateSelector));
      return candidates;
    } else {
      const candidates = Array.from(node.querySelectorAll(`[${props.candidateAttr}]:not([data-disabled])`));
      return candidates;
    }
  }
  function focusFirstCandidate() {
    const items = getCandidateNodes();
    if (!items.length) return;
    items[0]?.focus();
  }
  function handleKeydown(node, e, both = false) {
    const rootNode = document.getElementById(props.rootNodeId.current);
    if (!rootNode || !node) return;
    const items = getCandidateNodes();
    if (!items.length) return;
    const currentIndex = items.indexOf(node);
    const dir = getElemDirection(rootNode);
    const { nextKey, prevKey } = getDirectionalKeys(dir, props.orientation.current);
    const loop = props.loop.current;
    const keyToIndex = {
      [nextKey]: currentIndex + 1,
      [prevKey]: currentIndex - 1,
      [HOME]: 0,
      [END]: items.length - 1
    };
    if (both) {
      const altNextKey = nextKey === ARROW_DOWN ? ARROW_RIGHT : ARROW_DOWN;
      const altPrevKey = prevKey === ARROW_UP ? ARROW_LEFT : ARROW_UP;
      keyToIndex[altNextKey] = currentIndex + 1;
      keyToIndex[altPrevKey] = currentIndex - 1;
    }
    let itemIndex = keyToIndex[e.key];
    if (itemIndex === void 0) return;
    e.preventDefault();
    if (itemIndex < 0 && loop) {
      itemIndex = items.length - 1;
    } else if (itemIndex === items.length && loop) {
      itemIndex = 0;
    }
    const itemToFocus = items[itemIndex];
    if (!itemToFocus) return;
    itemToFocus.focus();
    currentTabStopId.current = itemToFocus.id;
    props.onCandidateFocus?.(itemToFocus);
    return itemToFocus;
  }
  function getTabIndex(node) {
    const items = getCandidateNodes();
    const anyActive = currentTabStopId.current !== null;
    if (node && !anyActive && items[0] === node) {
      currentTabStopId.current = node.id;
      return 0;
    } else if (node?.id === currentTabStopId.current) {
      return 0;
    }
    return -1;
  }
  return {
    setCurrentTabStopId(id) {
      currentTabStopId.current = id;
    },
    getTabIndex,
    handleKeydown,
    focusFirstCandidate,
    currentTabStopId
  };
}
function useStateMachine(initialState, machine) {
  const state = box(initialState);
  function reducer(event) {
    const nextState = machine[state.current][event];
    return nextState ?? state.current;
  }
  const dispatch = (event) => {
    state.current = reducer(event);
  };
  return { state, dispatch };
}
function usePresence(present, id) {
  const initialState = present.current ? "mounted" : "unmounted";
  const { state, dispatch } = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
    unmounted: { MOUNT: "mounted" }
  });
  const isPresentDerived = ["mounted", "unmountSuspended"].includes(state.current);
  return {
    get current() {
      return isPresentDerived;
    }
  };
}
function Presence_layer($$payload, $$props) {
  push();
  let { present, forceMount, presence, id } = $$props;
  const isPresent = usePresence(box.with(() => present), box.with(() => id));
  if (forceMount || present || isPresent.current) {
    $$payload.out += "<!--[-->";
    presence?.($$payload, { present: isPresent });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Portal($$payload, $$props) {
  push();
  let { to = "body", children, disabled } = $$props;
  getAllContexts();
  getTarget();
  function getTarget() {
    if (!isBrowser || disabled) return null;
    let localTarget = null;
    if (typeof to === "string") {
      localTarget = document.querySelector(to);
    } else if (to instanceof HTMLElement || to instanceof DocumentFragment) {
      localTarget = to;
    } else ;
    return localTarget;
  }
  if (disabled) {
    $$payload.out += "<!--[-->";
    children?.($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function addEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options));
  };
}
function createCustomEvent(eventName, options = { bubbles: true, cancelable: true }) {
  function dispatch(element2, detail) {
    const event = new CustomEvent(eventName, {
      ...options,
      detail
    });
    element2.dispatchEvent(event);
  }
  function listen(element2, callback) {
    const handler = (event) => {
      callback(event);
    };
    return addEventListener(element2, eventName, handler);
  }
  return [dispatch, listen];
}
function debounce(fn, wait = 500) {
  let timeout = null;
  const debounced = (...args) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(...args);
    }, wait);
  };
  debounced.destroy = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  return debounced;
}
function isOrContainsTarget(node, target) {
  return node === target || node.contains(target);
}
function getOwnerDocument(el) {
  return el?.ownerDocument ?? document;
}
globalThis.bitsDismissableLayers ??= /* @__PURE__ */ new Map();
class DismissibleLayerState {
  #interactOutsideProp;
  #behaviorType;
  #interceptedEvents = { pointerdown: false };
  #isResponsibleLayer = false;
  node = box(null);
  #documentObj = void 0;
  #enabled;
  #isFocusInsideDOMTree = false;
  #onFocusOutside;
  currNode = null;
  #isValidEventProp;
  #unsubClickListener = noop;
  constructor(props) {
    this.#enabled = props.enabled;
    this.#isValidEventProp = props.isValidEvent;
    useRefById({
      id: props.id,
      ref: this.node,
      deps: () => this.#enabled.current,
      onRefChange: (node) => {
        this.currNode = node;
      }
    });
    this.#behaviorType = props.interactOutsideBehavior;
    this.#interactOutsideProp = props.onInteractOutside;
    this.#onFocusOutside = props.onFocusOutside;
  }
  #handleFocus = (event) => {
    if (event.defaultPrevented) return;
    if (!this.currNode) return;
    afterTick(() => {
      if (!this.currNode || this.#isTargetWithinLayer(event.target)) return;
      if (event.target && !this.#isFocusInsideDOMTree) {
        this.#onFocusOutside.current?.(event);
      }
    });
  };
  #addEventListeners() {
    return executeCallbacks(
      /**
      * CAPTURE INTERACTION START
      * mark interaction-start event as intercepted.
      * mark responsible layer during interaction start
      * to avoid checking if is responsible layer during interaction end
      * when a new floating element may have been opened.
      */
      addEventListener(this.#documentObj, "pointerdown", executeCallbacks(this.#markInterceptedEvent, this.#markResponsibleLayer), true),
      /**
      * BUBBLE INTERACTION START
      * Mark interaction-start event as non-intercepted. Debounce `onInteractOutsideStart`
      * to avoid prematurely checking if other events were intercepted.
      */
      addEventListener(this.#documentObj, "pointerdown", executeCallbacks(this.#markNonInterceptedEvent, this.#handleInteractOutside)),
      /**
      * HANDLE FOCUS OUTSIDE
      */
      addEventListener(this.#documentObj, "focusin", this.#handleFocus)
    );
  }
  #handleDismiss = (e) => {
    let event = e;
    if (event.defaultPrevented) {
      event = createWrappedEvent(e);
    }
    this.#interactOutsideProp.current(e);
  };
  #handleInteractOutside = debounce(
    (e) => {
      if (!this.currNode) {
        this.#unsubClickListener();
        return;
      }
      const isEventValid = this.#isValidEventProp.current(e, this.currNode) || isValidEvent(e, this.currNode);
      if (!this.#isResponsibleLayer || this.#isAnyEventIntercepted() || !isEventValid) {
        this.#unsubClickListener();
        return;
      }
      let event = e;
      if (event.defaultPrevented) {
        event = createWrappedEvent(event);
      }
      if (this.#behaviorType.current !== "close" && this.#behaviorType.current !== "defer-otherwise-close") {
        this.#unsubClickListener();
        return;
      }
      if (e.pointerType === "touch") {
        this.#unsubClickListener();
        this.#unsubClickListener = addEventListener(this.#documentObj, "click", this.#handleDismiss, { once: true });
      } else {
        this.#interactOutsideProp.current(event);
      }
    },
    10
  );
  #markInterceptedEvent = (e) => {
    this.#interceptedEvents[e.type] = true;
  };
  #markNonInterceptedEvent = (e) => {
    this.#interceptedEvents[e.type] = false;
  };
  #markResponsibleLayer = () => {
    if (!this.node.current) return;
    this.#isResponsibleLayer = isResponsibleLayer(this.node.current);
  };
  #isTargetWithinLayer = (target) => {
    if (!this.node.current) return false;
    return isOrContainsTarget(this.node.current, target);
  };
  #resetState = debounce(
    () => {
      for (const eventType in this.#interceptedEvents) {
        this.#interceptedEvents[eventType] = false;
      }
      this.#isResponsibleLayer = false;
    },
    20
  );
  #isAnyEventIntercepted() {
    const i = Object.values(this.#interceptedEvents).some(Boolean);
    return i;
  }
  #onfocuscapture = () => {
    this.#isFocusInsideDOMTree = true;
  };
  #onblurcapture = () => {
    this.#isFocusInsideDOMTree = false;
  };
  props = {
    onfocuscapture: this.#onfocuscapture,
    onblurcapture: this.#onblurcapture
  };
}
function useDismissibleLayer(props) {
  return new DismissibleLayerState(props);
}
function getTopMostLayer(layersArr) {
  return layersArr.findLast(([_, { current: behaviorType }]) => behaviorType === "close" || behaviorType === "ignore");
}
function isResponsibleLayer(node) {
  const layersArr = [...globalThis.bitsDismissableLayers];
  const topMostLayer = getTopMostLayer(layersArr);
  if (topMostLayer) return topMostLayer[0].node.current === node;
  const [firstLayerNode] = layersArr[0];
  return firstLayerNode.node.current === node;
}
function isValidEvent(e, node) {
  if ("button" in e && e.button > 0) return false;
  const target = e.target;
  if (!isElement(target)) return false;
  const ownerDocument = getOwnerDocument(target);
  const isValid = ownerDocument.documentElement.contains(target) && !isOrContainsTarget(node, target);
  return isValid;
}
function createWrappedEvent(e) {
  const capturedCurrentTarget = e.currentTarget;
  const capturedTarget = e.target;
  let newEvent;
  if (e instanceof PointerEvent) {
    newEvent = new PointerEvent(e.type, e);
  } else {
    newEvent = new PointerEvent("pointerdown", e);
  }
  let isPrevented = false;
  const wrappedEvent = new Proxy(newEvent, {
    get: (target, prop) => {
      if (prop === "currentTarget") {
        return capturedCurrentTarget;
      }
      if (prop === "target") {
        return capturedTarget;
      }
      if (prop === "preventDefault") {
        return () => {
          isPrevented = true;
          if (typeof target.preventDefault === "function") {
            target.preventDefault();
          }
        };
      }
      if (prop === "defaultPrevented") {
        return isPrevented;
      }
      if (prop in target) {
        return target[prop];
      }
      return e[prop];
    }
  });
  return wrappedEvent;
}
function Dismissible_layer($$payload, $$props) {
  push();
  let {
    interactOutsideBehavior = "close",
    onInteractOutside = noop,
    onFocusOutside = noop,
    id,
    children,
    enabled,
    isValidEvent: isValidEvent2 = () => false
  } = $$props;
  const dismissibleLayerState = useDismissibleLayer({
    id: box.with(() => id),
    interactOutsideBehavior: box.with(() => interactOutsideBehavior),
    onInteractOutside: box.with(() => onInteractOutside),
    enabled: box.with(() => enabled),
    onFocusOutside: box.with(() => onFocusOutside),
    isValidEvent: box.with(() => isValidEvent2)
  });
  children?.($$payload, { props: dismissibleLayerState.props });
  $$payload.out += `<!---->`;
  pop();
}
globalThis.bitsEscapeLayers ??= /* @__PURE__ */ new Map();
class EscapeLayerState {
  #onEscapeProp;
  #behaviorType;
  #enabled;
  constructor(props) {
    this.#behaviorType = props.escapeKeydownBehavior;
    this.#onEscapeProp = props.onEscapeKeydown;
    this.#enabled = props.enabled;
  }
  #addEventListener = () => {
    return addEventListener(document, "keydown", this.#onkeydown, { passive: false });
  };
  #onkeydown = (e) => {
    if (e.key !== ESCAPE || !isResponsibleEscapeLayer(this)) return;
    const clonedEvent = new KeyboardEvent(e.type, e);
    e.preventDefault();
    const behaviorType = this.#behaviorType.current;
    if (behaviorType !== "close" && behaviorType !== "defer-otherwise-close") return;
    this.#onEscapeProp.current(clonedEvent);
  };
}
function useEscapeLayer(props) {
  return new EscapeLayerState(props);
}
function isResponsibleEscapeLayer(instance) {
  const layersArr = [...globalThis.bitsEscapeLayers];
  const topMostLayer = layersArr.findLast(([_, { current: behaviorType }]) => behaviorType === "close" || behaviorType === "ignore");
  if (topMostLayer) return topMostLayer[0] === instance;
  const [firstLayerNode] = layersArr[0];
  return firstLayerNode === instance;
}
function Escape_layer($$payload, $$props) {
  push();
  let {
    escapeKeydownBehavior = "close",
    onEscapeKeydown = noop,
    children,
    enabled
  } = $$props;
  useEscapeLayer({
    escapeKeydownBehavior: box.with(() => escapeKeydownBehavior),
    onEscapeKeydown: box.with(() => onEscapeKeydown),
    enabled: box.with(() => enabled)
  });
  children?.($$payload);
  $$payload.out += `<!---->`;
  pop();
}
function createFocusScopeAPI() {
  let paused = false;
  return {
    id: useId(),
    get paused() {
      return paused;
    },
    pause() {
      paused = true;
    },
    resume() {
      paused = false;
    }
  };
}
function focus(element2, { select = false } = {}) {
  if (!(element2 && element2.focus))
    return;
  const previouslyFocusedElement = document.activeElement;
  element2.focus({ preventScroll: true });
  if (element2 !== previouslyFocusedElement && isSelectableInput(element2) && select) {
    element2.select();
  }
}
function focusFirst(candidates, { select = false } = {}) {
  const previouslyFocusedElement = document.activeElement;
  for (const candidate of candidates) {
    focus(candidate, { select });
    if (document.activeElement !== previouslyFocusedElement) {
      return true;
    }
  }
}
function findVisible(elements, container) {
  for (const element2 of elements) {
    if (!isElementHidden(element2, container))
      return element2;
  }
}
function getTabbableCandidates(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    // eslint-disable-next-line ts/no-explicit-any
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode())
    nodes.push(walker.currentNode);
  return nodes;
}
function getTabbableEdges(container) {
  const candidates = getTabbableCandidates(container);
  const first2 = findVisible(candidates, container);
  const last2 = findVisible(candidates.reverse(), container);
  return [first2, last2];
}
function useFocusScope({
  id,
  loop,
  enabled,
  onOpenAutoFocus,
  onCloseAutoFocus,
  forceMount
}) {
  const focusScope = createFocusScopeAPI();
  const ref = box(null);
  useRefById({ id, ref, deps: () => enabled.current });
  function handleKeydown(e) {
    if (!enabled.current) return;
    if (!loop.current && !enabled.current) return;
    if (focusScope.paused) return;
    const isTabKey = e.key === TAB && !e.ctrlKey && !e.altKey && !e.metaKey;
    const focusedElement = document.activeElement;
    if (!(isTabKey && focusedElement)) return;
    const container = ref.current;
    if (!container) return;
    const [first2, last2] = getTabbableEdges(container);
    const hasTabbableElementsInside = first2 && last2;
    if (!hasTabbableElementsInside) {
      if (focusedElement === container) {
        e.preventDefault();
      }
    } else {
      if (!e.shiftKey && focusedElement === last2) {
        e.preventDefault();
        if (loop.current) focus(first2, { select: true });
      } else if (e.shiftKey && focusedElement === first2) {
        e.preventDefault();
        if (loop.current) focus(last2, { select: true });
      }
    }
  }
  const props = (() => ({
    id: id.current,
    tabindex: -1,
    onkeydown: handleKeydown
  }))();
  return {
    get props() {
      return props;
    }
  };
}
function Focus_scope($$payload, $$props) {
  push();
  let {
    id,
    trapFocus = false,
    loop = false,
    onCloseAutoFocus = noop,
    onOpenAutoFocus = noop,
    focusScope,
    forceMount = false
  } = $$props;
  const focusScopeState = useFocusScope({
    enabled: box.with(() => trapFocus),
    loop: box.with(() => loop),
    onCloseAutoFocus: box.with(() => onCloseAutoFocus),
    onOpenAutoFocus: box.with(() => onOpenAutoFocus),
    id: box.with(() => id),
    forceMount: box.with(() => forceMount)
  });
  focusScope?.($$payload, { props: focusScopeState.props });
  $$payload.out += `<!---->`;
  pop();
}
globalThis.bitsTextSelectionLayers ??= /* @__PURE__ */ new Map();
class TextSelectionLayerState {
  #id;
  #onPointerDownProp;
  #onPointerUpProp;
  #enabled;
  #unsubSelectionLock = noop;
  #ref = box(null);
  constructor(props) {
    this.#id = props.id;
    this.#enabled = props.preventOverflowTextSelection;
    this.#onPointerDownProp = props.onPointerDown;
    this.#onPointerUpProp = props.onPointerUp;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      deps: () => this.#enabled.current
    });
  }
  #addEventListeners() {
    return executeCallbacks(addEventListener(document, "pointerdown", this.#pointerdown), addEventListener(document, "pointerup", composeHandlers(this.#resetSelectionLock, this.#onPointerUpProp)));
  }
  #pointerdown = (e) => {
    const node = this.#ref.current;
    const target = e.target;
    if (!isHTMLElement(node) || !isHTMLElement(target) || !this.#enabled.current) return;
    if (!isHighestLayer(this) || !isOrContainsTarget(node, target)) return;
    this.#onPointerDownProp.current(e);
    if (e.defaultPrevented) return;
    this.#unsubSelectionLock = preventTextSelectionOverflow(node);
  };
  #resetSelectionLock = () => {
    this.#unsubSelectionLock();
    this.#unsubSelectionLock = noop;
  };
}
function useTextSelectionLayer(props) {
  return new TextSelectionLayerState(props);
}
const getUserSelect = (node) => node.style.userSelect || node.style.webkitUserSelect;
function preventTextSelectionOverflow(node) {
  const body = document.body;
  const originalBodyUserSelect = getUserSelect(body);
  const originalNodeUserSelect = getUserSelect(node);
  setUserSelect(body, "none");
  setUserSelect(node, "text");
  return () => {
    setUserSelect(body, originalBodyUserSelect);
    setUserSelect(node, originalNodeUserSelect);
  };
}
function setUserSelect(node, value) {
  node.style.userSelect = value;
  node.style.webkitUserSelect = value;
}
function isHighestLayer(instance) {
  const layersArr = [...globalThis.bitsTextSelectionLayers];
  if (!layersArr.length) return false;
  const highestLayer = layersArr.at(-1);
  if (!highestLayer) return false;
  return highestLayer[0] === instance;
}
function Text_selection_layer($$payload, $$props) {
  push();
  let {
    preventOverflowTextSelection = true,
    onPointerDown = noop,
    onPointerUp = noop,
    id,
    children,
    enabled
  } = $$props;
  useTextSelectionLayer({
    id: box.with(() => id),
    preventOverflowTextSelection: box.with(() => preventOverflowTextSelection),
    onPointerDown: box.with(() => onPointerDown),
    onPointerUp: box.with(() => onPointerUp),
    enabled: box.with(() => enabled)
  });
  children?.($$payload);
  $$payload.out += `<!---->`;
  pop();
}
function createSharedHook(factory) {
  let state = void 0;
  return (...args) => {
    return state;
  };
}
const useBodyLockStackCount = createSharedHook();
function useBodyScrollLock(initialState, restoreScrollDelay = () => null) {
  const id = useId();
  const countState = useBodyLockStackCount();
  restoreScrollDelay();
  countState.map.set(id, initialState ?? false);
  const locked = box.with(() => countState.map.get(id) ?? false, (v) => countState.map.set(id, v));
  return locked;
}
function Scroll_lock($$payload, $$props) {
  push();
  let {
    preventScroll = true,
    restoreScrollDelay = null
  } = $$props;
  useBodyScrollLock(preventScroll, () => restoreScrollDelay);
  pop();
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
function Floating_layer_content($$payload, $$props) {
  push();
  let {
    content,
    side = "bottom",
    sideOffset = 0,
    align = "center",
    alignOffset = 0,
    id,
    arrowPadding = 0,
    avoidCollisions = true,
    collisionBoundary = [],
    collisionPadding = 0,
    hideWhenDetached = false,
    onPlaced = () => {
    },
    sticky = "partial",
    updatePositionStrategy = "optimized",
    strategy = "fixed",
    dir = "ltr",
    style = {},
    wrapperId = useId(),
    customAnchor = null
  } = $$props;
  const contentState = useFloatingContentState({
    side: box.with(() => side),
    sideOffset: box.with(() => sideOffset),
    align: box.with(() => align),
    alignOffset: box.with(() => alignOffset),
    id: box.with(() => id),
    arrowPadding: box.with(() => arrowPadding),
    avoidCollisions: box.with(() => avoidCollisions),
    collisionBoundary: box.with(() => collisionBoundary),
    collisionPadding: box.with(() => collisionPadding),
    hideWhenDetached: box.with(() => hideWhenDetached),
    onPlaced: box.with(() => onPlaced),
    sticky: box.with(() => sticky),
    updatePositionStrategy: box.with(() => updatePositionStrategy),
    strategy: box.with(() => strategy),
    dir: box.with(() => dir),
    style: box.with(() => style),
    enabled: box.with(() => false),
    wrapperId: box.with(() => wrapperId),
    customAnchor: box.with(() => customAnchor)
  });
  const mergedProps = mergeProps(contentState.wrapperProps, { style: { pointerEvents: "auto" } });
  content?.($$payload, {
    props: contentState.props,
    wrapperProps: mergedProps
  });
  $$payload.out += `<!---->`;
  pop();
}
function Floating_layer_content_static($$payload, $$props) {
  push();
  let { content } = $$props;
  content?.($$payload, { props: {}, wrapperProps: {} });
  $$payload.out += `<!---->`;
  pop();
}
function Popper_content($$payload, $$props) {
  let {
    content,
    isStatic = false,
    onPlaced,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  if (isStatic) {
    $$payload.out += "<!--[-->";
    Floating_layer_content_static($$payload, { content });
  } else {
    $$payload.out += "<!--[!-->";
    Floating_layer_content($$payload, spread_props([{ content, onPlaced }, restProps]));
  }
  $$payload.out += `<!--]-->`;
}
function Popper_layer_inner($$payload, $$props) {
  push();
  let {
    popper,
    onEscapeKeydown,
    escapeKeydownBehavior,
    preventOverflowTextSelection,
    id,
    onPointerDown,
    onPointerUp,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    sticky,
    hideWhenDetached,
    updatePositionStrategy,
    strategy,
    dir,
    preventScroll,
    wrapperId,
    style,
    onPlaced,
    onInteractOutside,
    onCloseAutoFocus,
    onOpenAutoFocus,
    onFocusOutside,
    interactOutsideBehavior = "close",
    loop,
    trapFocus = true,
    isValidEvent: isValidEvent2 = () => false,
    customAnchor = null,
    isStatic = false,
    enabled,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  {
    let content = function($$payload2, { props: floatingProps, wrapperProps }) {
      if (restProps.forceMount && enabled) {
        $$payload2.out += "<!--[-->";
        Scroll_lock($$payload2, { preventScroll });
      } else if (!restProps.forceMount) {
        $$payload2.out += "<!--[1-->";
        Scroll_lock($$payload2, { preventScroll });
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      {
        let focusScope = function($$payload3, { props: focusScopeProps }) {
          Escape_layer($$payload3, {
            onEscapeKeydown,
            escapeKeydownBehavior,
            enabled,
            children: ($$payload4) => {
              {
                let children = function($$payload5, { props: dismissibleProps }) {
                  Text_selection_layer($$payload5, {
                    id,
                    preventOverflowTextSelection,
                    onPointerDown,
                    onPointerUp,
                    enabled,
                    children: ($$payload6) => {
                      popper?.($$payload6, {
                        props: mergeProps(restProps, floatingProps, dismissibleProps, focusScopeProps, { style: { pointerEvents: "auto" } }),
                        wrapperProps
                      });
                      $$payload6.out += `<!---->`;
                    }
                  });
                };
                Dismissible_layer($$payload4, {
                  id,
                  onInteractOutside,
                  onFocusOutside,
                  interactOutsideBehavior,
                  isValidEvent: isValidEvent2,
                  enabled,
                  children
                });
              }
            }
          });
        };
        Focus_scope($$payload2, {
          id,
          onOpenAutoFocus,
          onCloseAutoFocus,
          loop,
          trapFocus: enabled && trapFocus,
          forceMount: restProps.forceMount,
          focusScope
        });
      }
      $$payload2.out += `<!---->`;
    };
    Popper_content($$payload, {
      isStatic,
      id,
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      avoidCollisions,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      updatePositionStrategy,
      strategy,
      dir,
      wrapperId,
      style,
      onPlaced,
      customAnchor,
      content,
      $$slots: { content: true }
    });
  }
  pop();
}
function Popper_layer($$payload, $$props) {
  let {
    popper,
    present,
    onEscapeKeydown,
    escapeKeydownBehavior,
    preventOverflowTextSelection,
    id,
    onPointerDown,
    onPointerUp,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    sticky,
    hideWhenDetached,
    updatePositionStrategy,
    strategy,
    dir,
    preventScroll,
    wrapperId,
    style,
    onPlaced,
    onInteractOutside,
    onCloseAutoFocus,
    onOpenAutoFocus,
    onFocusOutside,
    interactOutsideBehavior = "close",
    loop,
    trapFocus = true,
    isValidEvent: isValidEvent2 = () => false,
    customAnchor = null,
    isStatic = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  {
    let presence = function($$payload2, { present: present2 }) {
      Popper_layer_inner($$payload2, spread_props([
        {
          popper,
          onEscapeKeydown,
          escapeKeydownBehavior,
          preventOverflowTextSelection,
          id,
          onPointerDown,
          onPointerUp,
          side,
          sideOffset,
          align,
          alignOffset,
          arrowPadding,
          avoidCollisions,
          collisionBoundary,
          collisionPadding,
          sticky,
          hideWhenDetached,
          updatePositionStrategy,
          strategy,
          dir,
          preventScroll,
          wrapperId,
          style,
          onPlaced,
          customAnchor,
          isStatic,
          enabled: present2.current,
          onInteractOutside,
          onCloseAutoFocus,
          onOpenAutoFocus,
          interactOutsideBehavior,
          loop,
          trapFocus,
          isValidEvent: isValidEvent2,
          onFocusOutside,
          forceMount: false
        },
        restProps
      ]));
    };
    Presence_layer($$payload, spread_props([
      { id, present },
      restProps,
      { presence, $$slots: { presence: true } }
    ]));
  }
}
function Popper_layer_force_mount($$payload, $$props) {
  let {
    popper,
    onEscapeKeydown,
    escapeKeydownBehavior,
    preventOverflowTextSelection,
    id,
    onPointerDown,
    onPointerUp,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    sticky,
    hideWhenDetached,
    updatePositionStrategy,
    strategy,
    dir,
    preventScroll,
    wrapperId,
    style,
    onPlaced,
    onInteractOutside,
    onCloseAutoFocus,
    onOpenAutoFocus,
    onFocusOutside,
    interactOutsideBehavior = "close",
    loop,
    trapFocus = true,
    isValidEvent: isValidEvent2 = () => false,
    customAnchor = null,
    isStatic = false,
    enabled,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  Popper_layer_inner($$payload, spread_props([
    {
      popper,
      onEscapeKeydown,
      escapeKeydownBehavior,
      preventOverflowTextSelection,
      id,
      onPointerDown,
      onPointerUp,
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      avoidCollisions,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      updatePositionStrategy,
      strategy,
      dir,
      preventScroll,
      wrapperId,
      style,
      onPlaced,
      customAnchor,
      isStatic,
      enabled,
      onInteractOutside,
      onCloseAutoFocus,
      onOpenAutoFocus,
      interactOutsideBehavior,
      loop,
      trapFocus,
      isValidEvent: isValidEvent2,
      onFocusOutside
    },
    restProps,
    { forceMount: true }
  ]));
}
function Mounted($$payload, $$props) {
  push();
  let { isMounted = false, onMountedChange = noop } = $$props;
  bind_props($$props, { isMounted });
  pop();
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
function Menu_group_heading($$payload, $$props) {
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
  const groupHeadingState = useMenuGroupHeading({
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
function Menu($$payload, $$props) {
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
function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}
function useResizeObserver(node, onResize) {
}
const SCROLL_AREA_ROOT_ATTR = "data-scroll-area-root";
const SCROLL_AREA_VIEWPORT_ATTR = "data-scroll-area-viewport";
const SCROLL_AREA_CORNER_ATTR = "data-scroll-area-corner";
const SCROLL_AREA_THUMB_ATTR = "data-scroll-area-thumb";
const SCROLL_AREA_SCROLLBAR_ATTR = "data-scroll-area-scrollbar";
class ScrollAreaRootState {
  #id;
  #ref;
  dir;
  type;
  scrollHideDelay;
  scrollAreaNode = null;
  viewportNode = null;
  contentNode = null;
  scrollbarXNode = null;
  scrollbarYNode = null;
  cornerWidth = 0;
  cornerHeight = 0;
  scrollbarXEnabled = false;
  scrollbarYEnabled = false;
  constructor(props) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.dir = props.dir;
    this.type = props.type;
    this.scrollHideDelay = props.scrollHideDelay;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        this.scrollAreaNode = node;
      }
    });
  }
  #props = once(() => ({
    id: this.#id.current,
    dir: this.dir.current,
    style: {
      position: "relative",
      "--bits-scroll-area-corner-height": `${this.cornerHeight}px`,
      "--bits-scroll-area-corner-width": `${this.cornerWidth}px`
    },
    [SCROLL_AREA_ROOT_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
}
class ScrollAreaViewportState {
  #id;
  #ref;
  #contentId = box(useId());
  #contentRef = box(null);
  root;
  constructor(props, root) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.root = root;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        this.root.viewportNode = node;
      }
    });
    useRefById({
      id: this.#contentId,
      ref: this.#contentRef,
      onRefChange: (node) => {
        this.root.contentNode = node;
      }
    });
  }
  #props = once(() => ({
    id: this.#id.current,
    style: {
      overflowX: this.root.scrollbarXEnabled ? "scroll" : "hidden",
      overflowY: this.root.scrollbarYEnabled ? "scroll" : "hidden"
    },
    [SCROLL_AREA_VIEWPORT_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
  #contentProps = once(() => ({
    id: this.#contentId.current,
    "data-scroll-area-content": "",
    /**
     * When horizontal scrollbar is visible: this element should be at least
     * as wide as its children for size calculations to work correctly.
     *
     * When horizontal scrollbar is NOT visible: this element's width should
     * be constrained by the parent container to enable `text-overflow: ellipsis`
     */
    style: {
      minWidth: this.root.scrollbarXEnabled ? "fit-content" : void 0
    }
  }));
  get contentProps() {
    return this.#contentProps();
  }
}
class ScrollAreaScrollbarState {
  ref;
  id;
  root;
  orientation;
  #isHorizontal = once(() => this.orientation.current === "horizontal");
  get isHorizontal() {
    return this.#isHorizontal();
  }
  hasThumb = false;
  constructor(props, root) {
    this.root = root;
    this.orientation = props.orientation;
    this.ref = props.ref;
    this.id = props.id;
  }
}
class ScrollAreaScrollbarHoverState {
  root;
  isVisible = false;
  scrollbar;
  constructor(scrollbar) {
    this.root = scrollbar.root;
    this.scrollbar = scrollbar;
  }
  #props = once(() => ({
    "data-state": this.isVisible ? "visible" : "hidden"
  }));
  get props() {
    return this.#props();
  }
}
class ScrollAreaScrollbarScrollState {
  orientation;
  root;
  scrollbar;
  machine = useStateMachine("hidden", {
    hidden: { SCROLL: "scrolling" },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: { SCROLL: "interacting", POINTER_LEAVE: "idle" },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  #isHidden = once(() => this.machine.state.current === "hidden");
  get isHidden() {
    return this.#isHidden();
  }
  constructor(scrollbar) {
    this.scrollbar = scrollbar;
    this.root = scrollbar.root;
    this.orientation = this.scrollbar.orientation;
    useDebounce(() => this.machine.dispatch("SCROLL_END"), 100);
    this.onpointerenter = this.onpointerenter.bind(this);
    this.onpointerleave = this.onpointerleave.bind(this);
  }
  onpointerenter(_) {
    this.machine.dispatch("POINTER_ENTER");
  }
  onpointerleave(_) {
    this.machine.dispatch("POINTER_LEAVE");
  }
  #props = once(() => ({
    "data-state": this.machine.state.current === "hidden" ? "hidden" : "visible",
    onpointerenter: this.onpointerenter,
    onpointerleave: this.onpointerleave
  }));
  get props() {
    return this.#props();
  }
}
class ScrollAreaScrollbarAutoState {
  scrollbar;
  root;
  isVisible = false;
  constructor(scrollbar) {
    this.scrollbar = scrollbar;
    this.root = scrollbar.root;
    useDebounce(
      () => {
        const viewportNode = this.root.viewportNode;
        if (!viewportNode) return;
        const isOverflowX = viewportNode.offsetWidth < viewportNode.scrollWidth;
        const isOverflowY = viewportNode.offsetHeight < viewportNode.scrollHeight;
        this.isVisible = this.scrollbar.isHorizontal ? isOverflowX : isOverflowY;
      },
      10
    );
  }
  #props = once(() => ({
    "data-state": this.isVisible ? "visible" : "hidden"
  }));
  get props() {
    return this.#props();
  }
}
class ScrollAreaScrollbarVisibleState {
  scrollbar;
  root;
  thumbNode = null;
  pointerOffset = 0;
  sizes = {
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  };
  #thumbRatio = once(() => getThumbRatio(this.sizes.viewport, this.sizes.content));
  get thumbRatio() {
    return this.#thumbRatio();
  }
  #hasThumb = once(() => Boolean(this.thumbRatio > 0 && this.thumbRatio < 1));
  get hasThumb() {
    return this.#hasThumb();
  }
  prevTransformStyle = "";
  constructor(scrollbar) {
    this.scrollbar = scrollbar;
    this.root = scrollbar.root;
  }
  setSizes(sizes) {
    this.sizes = sizes;
  }
  getScrollPosition(pointerPos, dir) {
    return getScrollPositionFromPointer({
      pointerPos,
      pointerOffset: this.pointerOffset,
      sizes: this.sizes,
      dir
    });
  }
  onThumbPointerUp() {
    this.pointerOffset = 0;
  }
  onThumbPointerDown(pointerPos) {
    this.pointerOffset = pointerPos;
  }
  xOnThumbPositionChange() {
    if (!(this.root.viewportNode && this.thumbNode)) return;
    const scrollPos = this.root.viewportNode.scrollLeft;
    const offset = getThumbOffsetFromScroll({
      scrollPos,
      sizes: this.sizes,
      dir: this.root.dir.current
    });
    const transformStyle = `translate3d(${offset}px, 0, 0)`;
    this.thumbNode.style.transform = transformStyle;
  }
  xOnWheelScroll(scrollPos) {
    if (!this.root.viewportNode) return;
    this.root.viewportNode.scrollLeft = scrollPos;
  }
  xOnDragScroll(pointerPos) {
    if (!this.root.viewportNode) return;
    this.root.viewportNode.scrollLeft = this.getScrollPosition(pointerPos, this.root.dir.current);
  }
  yOnThumbPositionChange() {
    if (!(this.root.viewportNode && this.thumbNode)) return;
    const scrollPos = this.root.viewportNode.scrollTop;
    const offset = getThumbOffsetFromScroll({ scrollPos, sizes: this.sizes });
    const transformStyle = `translate3d(0, ${offset}px, 0)`;
    this.thumbNode.style.transform = transformStyle;
  }
  yOnWheelScroll(scrollPos) {
    if (!this.root.viewportNode) return;
    this.root.viewportNode.scrollTop = scrollPos;
  }
  yOnDragScroll(pointerPos) {
    if (!this.root.viewportNode) return;
    this.root.viewportNode.scrollTop = this.getScrollPosition(pointerPos, this.root.dir.current);
  }
}
class ScrollAreaScrollbarXState {
  #id;
  #mounted;
  ref;
  scrollbarVis;
  root;
  computedStyle;
  constructor(props, scrollbarVis) {
    this.#mounted = props.mounted;
    this.scrollbarVis = scrollbarVis;
    this.#id = this.scrollbarVis.scrollbar.id;
    this.ref = this.scrollbarVis.scrollbar.ref;
    this.root = scrollbarVis.root;
    useRefById({
      id: this.#id,
      ref: this.ref,
      onRefChange: (node) => {
        this.root.scrollbarXNode = node;
      },
      deps: () => this.#mounted.current
    });
  }
  onThumbPointerDown = (pointerPos) => {
    this.scrollbarVis.onThumbPointerDown(pointerPos.x);
  };
  onDragScroll = (pointerPos) => {
    this.scrollbarVis.xOnDragScroll(pointerPos.x);
  };
  onThumbPointerUp = () => {
    this.scrollbarVis.onThumbPointerUp();
  };
  onThumbPositionChange = () => {
    this.scrollbarVis.xOnThumbPositionChange();
  };
  onWheelScroll = (e, maxScrollPos) => {
    if (!this.root.viewportNode) return;
    const scrollPos = this.root.viewportNode.scrollLeft + e.deltaX;
    this.scrollbarVis.xOnWheelScroll(scrollPos);
    if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
      e.preventDefault();
    }
  };
  onResize = () => {
    if (!(this.ref.current && this.root.viewportNode && this.computedStyle)) return;
    this.scrollbarVis.setSizes({
      content: this.root.viewportNode.scrollWidth,
      viewport: this.root.viewportNode.offsetWidth,
      scrollbar: {
        size: this.ref.current.clientWidth,
        paddingStart: toInt(this.computedStyle.paddingLeft),
        paddingEnd: toInt(this.computedStyle.paddingRight)
      }
    });
  };
  #thumbSize = once(() => {
    return getThumbSize(this.scrollbarVis.sizes);
  });
  get thumbSize() {
    return this.#thumbSize();
  }
  #props = once(() => ({
    id: this.#id.current,
    "data-orientation": "horizontal",
    style: {
      bottom: 0,
      left: this.root.dir.current === "rtl" ? "var(--bits-scroll-area-corner-width)" : 0,
      right: this.root.dir.current === "ltr" ? "var(--bits-scroll-area-corner-width)" : 0,
      "--bits-scroll-area-thumb-width": `${this.thumbSize}px`
    }
  }));
  get props() {
    return this.#props();
  }
}
class ScrollAreaScrollbarYState {
  #id;
  #mounted;
  ref;
  scrollbarVis;
  root;
  computedStyle;
  constructor(props, scrollbarVis) {
    this.#mounted = props.mounted;
    this.scrollbarVis = scrollbarVis;
    this.#id = this.scrollbarVis.scrollbar.id;
    this.ref = this.scrollbarVis.scrollbar.ref;
    this.root = scrollbarVis.root;
    useRefById({
      id: this.scrollbarVis.scrollbar.id,
      ref: this.scrollbarVis.scrollbar.ref,
      onRefChange: (node) => {
        this.root.scrollbarYNode = node;
      },
      deps: () => this.#mounted.current
    });
    this.onThumbPointerDown = this.onThumbPointerDown.bind(this);
    this.onDragScroll = this.onDragScroll.bind(this);
    this.onThumbPointerUp = this.onThumbPointerUp.bind(this);
    this.onThumbPositionChange = this.onThumbPositionChange.bind(this);
    this.onWheelScroll = this.onWheelScroll.bind(this);
    this.onResize = this.onResize.bind(this);
  }
  onThumbPointerDown(pointerPos) {
    this.scrollbarVis.onThumbPointerDown(pointerPos.y);
  }
  onDragScroll(pointerPos) {
    this.scrollbarVis.yOnDragScroll(pointerPos.y);
  }
  onThumbPointerUp() {
    this.scrollbarVis.onThumbPointerUp();
  }
  onThumbPositionChange() {
    this.scrollbarVis.yOnThumbPositionChange();
  }
  onWheelScroll(e, maxScrollPos) {
    if (!this.root.viewportNode) return;
    const scrollPos = this.root.viewportNode.scrollTop + e.deltaY;
    this.scrollbarVis.yOnWheelScroll(scrollPos);
    if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
      e.preventDefault();
    }
  }
  onResize() {
    if (!(this.ref.current && this.root.viewportNode && this.computedStyle)) return;
    this.scrollbarVis.setSizes({
      content: this.root.viewportNode.scrollHeight,
      viewport: this.root.viewportNode.offsetHeight,
      scrollbar: {
        size: this.ref.current.clientHeight,
        paddingStart: toInt(this.computedStyle.paddingTop),
        paddingEnd: toInt(this.computedStyle.paddingBottom)
      }
    });
  }
  #thumbSize = once(() => {
    return getThumbSize(this.scrollbarVis.sizes);
  });
  get thumbSize() {
    return this.#thumbSize();
  }
  #props = once(() => ({
    id: this.#id.current,
    "data-orientation": "vertical",
    style: {
      top: 0,
      right: this.root.dir.current === "ltr" ? 0 : void 0,
      left: this.root.dir.current === "rtl" ? 0 : void 0,
      bottom: "var(--bits-scroll-area-corner-height)",
      "--bits-scroll-area-thumb-height": `${this.thumbSize}px`
    }
  }));
  get props() {
    return this.#props();
  }
}
class ScrollAreaScrollbarSharedState {
  scrollbarState;
  root;
  scrollbarVis;
  rect = null;
  prevWebkitUserSelect = "";
  handleResize;
  handleThumbPositionChange;
  handleWheelScroll;
  handleThumbPointerDown;
  handleThumbPointerUp;
  #maxScrollPos = once(() => this.scrollbarVis.sizes.content - this.scrollbarVis.sizes.viewport);
  get maxScrollPos() {
    return this.#maxScrollPos();
  }
  constructor(scrollbarState) {
    this.scrollbarState = scrollbarState;
    this.root = scrollbarState.root;
    this.scrollbarVis = scrollbarState.scrollbarVis;
    this.handleResize = useDebounce(() => this.scrollbarState.onResize(), 10);
    this.handleThumbPositionChange = this.scrollbarState.onThumbPositionChange;
    this.handleWheelScroll = this.scrollbarState.onWheelScroll;
    this.handleThumbPointerDown = this.scrollbarState.onThumbPointerDown;
    this.handleThumbPointerUp = this.scrollbarState.onThumbPointerUp;
    useResizeObserver(() => this.scrollbarState.ref.current, this.handleResize);
    useResizeObserver(() => this.root.contentNode, this.handleResize);
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onpointermove = this.onpointermove.bind(this);
    this.onpointerup = this.onpointerup.bind(this);
  }
  handleDragScroll(e) {
    if (!this.rect) return;
    const x = e.clientX - this.rect.left;
    const y = e.clientY - this.rect.top;
    this.scrollbarState.onDragScroll({ x, y });
  }
  onpointerdown(e) {
    if (e.button !== 0) return;
    const target = e.target;
    target.setPointerCapture(e.pointerId);
    this.rect = this.scrollbarState.ref.current?.getBoundingClientRect() ?? null;
    this.prevWebkitUserSelect = document.body.style.webkitUserSelect;
    document.body.style.webkitUserSelect = "none";
    if (this.root.viewportNode) this.root.viewportNode.style.scrollBehavior = "auto";
    this.handleDragScroll(e);
  }
  onpointermove(e) {
    this.handleDragScroll(e);
  }
  onpointerup(e) {
    const target = e.target;
    if (target.hasPointerCapture(e.pointerId)) {
      target.releasePointerCapture(e.pointerId);
    }
    document.body.style.webkitUserSelect = this.prevWebkitUserSelect;
    if (this.root.viewportNode) this.root.viewportNode.style.scrollBehavior = "";
    this.rect = null;
  }
  #props = once(() => mergeProps({
    ...this.scrollbarState.props,
    style: {
      position: "absolute",
      ...this.scrollbarState.props.style
    },
    [SCROLL_AREA_SCROLLBAR_ATTR]: "",
    onpointerdown: this.onpointerdown,
    onpointermove: this.onpointermove,
    onpointerup: this.onpointerup
  }));
  get props() {
    return this.#props();
  }
}
class ScrollAreaThumbImplState {
  #id;
  #ref;
  #root;
  #scrollbarState;
  #removeUnlinkedScrollListener;
  #debounceScrollEnd = useDebounce(
    () => {
      if (this.#removeUnlinkedScrollListener) {
        this.#removeUnlinkedScrollListener();
        this.#removeUnlinkedScrollListener = void 0;
      }
    },
    100
  );
  #mounted;
  constructor(props, scrollbarState) {
    this.#root = scrollbarState.root;
    this.#scrollbarState = scrollbarState;
    this.#mounted = props.mounted;
    this.#id = props.id;
    this.#ref = props.ref;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        this.#scrollbarState.scrollbarVis.thumbNode = node;
      },
      deps: () => this.#mounted.current
    });
    this.onpointerdowncapture = this.onpointerdowncapture.bind(this);
    this.onpointerup = this.onpointerup.bind(this);
  }
  onpointerdowncapture(e) {
    const thumb = e.target;
    if (!thumb) return;
    const thumbRect = thumb.getBoundingClientRect();
    const x = e.clientX - thumbRect.left;
    const y = e.clientY - thumbRect.top;
    this.#scrollbarState.handleThumbPointerDown({ x, y });
  }
  onpointerup(_) {
    this.#scrollbarState.handleThumbPointerUp();
  }
  #props = once(() => ({
    id: this.#id.current,
    "data-state": this.#scrollbarState.scrollbarVis.hasThumb ? "visible" : "hidden",
    style: {
      width: "var(--bits-scroll-area-thumb-width)",
      height: "var(--bits-scroll-area-thumb-height)",
      transform: this.#scrollbarState.scrollbarVis.prevTransformStyle
    },
    onpointerdowncapture: this.onpointerdowncapture,
    onpointerup: this.onpointerup,
    [SCROLL_AREA_THUMB_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
}
class ScrollAreaCornerImplState {
  #id;
  #ref;
  #root;
  #width = 0;
  #height = 0;
  #hasSize = once(() => Boolean(this.#width && this.#height));
  get hasSize() {
    return this.#hasSize();
  }
  constructor(props, root) {
    this.#root = root;
    this.#id = props.id;
    this.#ref = props.ref;
    useRefById({ id: this.#id, ref: this.#ref });
  }
  #props = once(() => ({
    id: this.#id.current,
    style: {
      width: this.#width,
      height: this.#height,
      position: "absolute",
      right: this.#root.dir.current === "ltr" ? 0 : void 0,
      left: this.#root.dir.current === "rtl" ? 0 : void 0,
      bottom: 0
    },
    [SCROLL_AREA_CORNER_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
}
const [
  setScrollAreaRootContext,
  getScrollAreaRootContext
] = createContext("ScrollArea.Root");
const [
  setScrollAreaScrollbarContext,
  getScrollAreaScrollbarContext
] = createContext("ScrollArea.Scrollbar");
const [
  setScrollAreaScrollbarVisibleContext,
  getScrollAreaScrollbarVisibleContext
] = createContext("ScrollArea.ScrollbarVisible");
const [
  setScrollAreaScrollbarAxisContext,
  getScrollAreaScrollbarAxisContext
] = createContext("ScrollArea.ScrollbarAxis");
const [
  setScrollAreaScrollbarSharedContext,
  getScrollAreaScrollbarSharedContext
] = createContext("ScrollArea.ScrollbarShared");
function useScrollAreaRoot(props) {
  return setScrollAreaRootContext(new ScrollAreaRootState(props));
}
function useScrollAreaViewport(props) {
  return new ScrollAreaViewportState(props, getScrollAreaRootContext());
}
function useScrollAreaScrollbar(props) {
  return setScrollAreaScrollbarContext(new ScrollAreaScrollbarState(props, getScrollAreaRootContext()));
}
function useScrollAreaScrollbarVisible() {
  return setScrollAreaScrollbarVisibleContext(new ScrollAreaScrollbarVisibleState(getScrollAreaScrollbarContext()));
}
function useScrollAreaScrollbarAuto() {
  return new ScrollAreaScrollbarAutoState(getScrollAreaScrollbarContext());
}
function useScrollAreaScrollbarScroll() {
  return new ScrollAreaScrollbarScrollState(getScrollAreaScrollbarContext());
}
function useScrollAreaScrollbarHover() {
  return new ScrollAreaScrollbarHoverState(getScrollAreaScrollbarContext());
}
function useScrollAreaScrollbarX(props) {
  return setScrollAreaScrollbarAxisContext(new ScrollAreaScrollbarXState(props, getScrollAreaScrollbarVisibleContext()));
}
function useScrollAreaScrollbarY(props) {
  return setScrollAreaScrollbarAxisContext(new ScrollAreaScrollbarYState(props, getScrollAreaScrollbarVisibleContext()));
}
function useScrollAreaScrollbarShared() {
  return setScrollAreaScrollbarSharedContext(new ScrollAreaScrollbarSharedState(getScrollAreaScrollbarAxisContext()));
}
function useScrollAreaThumb(props) {
  return new ScrollAreaThumbImplState(props, getScrollAreaScrollbarSharedContext());
}
function useScrollAreaCorner(props) {
  return new ScrollAreaCornerImplState(props, getScrollAreaRootContext());
}
function toInt(value) {
  return value ? Number.parseInt(value, 10) : 0;
}
function getThumbRatio(viewportSize, contentSize) {
  const ratio = viewportSize / contentSize;
  return Number.isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes) {
  const ratio = getThumbRatio(sizes.viewport, sizes.content);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const thumbSize = (sizes.scrollbar.size - scrollbarPadding) * ratio;
  return Math.max(thumbSize, 18);
}
function getScrollPositionFromPointer({
  pointerPos,
  pointerOffset,
  sizes,
  dir = "ltr"
}) {
  const thumbSizePx = getThumbSize(sizes);
  const thumbCenter = thumbSizePx / 2;
  const offset = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset;
  const minPointerPos = sizes.scrollbar.paddingStart + offset;
  const maxPointerPos = sizes.scrollbar.size - sizes.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes.content - sizes.viewport;
  const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange);
  return interpolate(pointerPos);
}
function getThumbOffsetFromScroll({ scrollPos, sizes, dir = "ltr" }) {
  const thumbSizePx = getThumbSize(sizes);
  const scrollbarPadding = sizes.scrollbar.paddingStart + sizes.scrollbar.paddingEnd;
  const scrollbar = sizes.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes.content - sizes.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const scrollClampRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp(scrollPos, scrollClampRange[0], scrollClampRange[1]);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1]) return output[0];
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
  return scrollPos > 0 && scrollPos < maxScrollPos;
}
function Scroll_area$1($$payload, $$props) {
  push();
  let {
    ref = null,
    id = useId(),
    type = "hover",
    dir = "ltr",
    scrollHideDelay = 600,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = useScrollAreaRoot({
    type: box.with(() => type),
    dir: box.with(() => dir),
    scrollHideDelay: box.with(() => scrollHideDelay),
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
  bind_props($$props, { ref });
  pop();
}
function Scroll_area_viewport($$payload, $$props) {
  push();
  let {
    ref = null,
    id = useId(),
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const viewportState = useScrollAreaViewport({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, viewportState.props);
  const mergedContentProps = mergeProps({}, viewportState.contentProps);
  $$payload.out += `<div${spread_attributes({ ...mergedProps })}><div${spread_attributes({ ...mergedContentProps })}>`;
  children?.($$payload);
  $$payload.out += `<!----></div></div>`;
  bind_props($$props, { ref });
  pop();
}
function Scroll_area_scrollbar_shared($$payload, $$props) {
  push();
  let {
    child,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const scrollbarSharedState = useScrollAreaScrollbarShared();
  const mergedProps = mergeProps(restProps, scrollbarSharedState.props);
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
  pop();
}
function Scroll_area_scrollbar_x($$payload, $$props) {
  push();
  let { $$slots, $$events, ...restProps } = $$props;
  const isMounted = new IsMounted();
  const scrollbarXState = useScrollAreaScrollbarX({ mounted: box.with(() => isMounted.current) });
  const mergedProps = mergeProps(restProps, scrollbarXState.props);
  Scroll_area_scrollbar_shared($$payload, spread_props([mergedProps]));
  pop();
}
function Scroll_area_scrollbar_y($$payload, $$props) {
  push();
  let { $$slots, $$events, ...restProps } = $$props;
  const isMounted = new IsMounted();
  const scrollbarYState = useScrollAreaScrollbarY({ mounted: box.with(() => isMounted.current) });
  const mergedProps = mergeProps(restProps, scrollbarYState.props);
  Scroll_area_scrollbar_shared($$payload, spread_props([mergedProps]));
  pop();
}
function Scroll_area_scrollbar_visible($$payload, $$props) {
  push();
  let { $$slots, $$events, ...restProps } = $$props;
  const scrollbarVisibleState = useScrollAreaScrollbarVisible();
  if (scrollbarVisibleState.scrollbar.orientation.current === "horizontal") {
    $$payload.out += "<!--[-->";
    Scroll_area_scrollbar_x($$payload, spread_props([restProps]));
  } else {
    $$payload.out += "<!--[!-->";
    Scroll_area_scrollbar_y($$payload, spread_props([restProps]));
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Scroll_area_scrollbar_auto($$payload, $$props) {
  push();
  let {
    forceMount = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const scrollbarAutoState = useScrollAreaScrollbarAuto();
  const mergedProps = mergeProps(restProps, scrollbarAutoState.props);
  {
    let presence = function($$payload2) {
      Scroll_area_scrollbar_visible($$payload2, spread_props([mergedProps]));
    };
    Presence_layer($$payload, spread_props([
      {
        present: forceMount || scrollbarAutoState.isVisible
      },
      mergedProps,
      { presence, $$slots: { presence: true } }
    ]));
  }
  pop();
}
function Scroll_area_scrollbar_scroll($$payload, $$props) {
  push();
  let {
    forceMount = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const scrollbarScrollState = useScrollAreaScrollbarScroll();
  const mergedProps = mergeProps(restProps, scrollbarScrollState.props);
  {
    let presence = function($$payload2) {
      Scroll_area_scrollbar_visible($$payload2, spread_props([mergedProps]));
    };
    Presence_layer($$payload, spread_props([
      mergedProps,
      {
        present: forceMount || !scrollbarScrollState.isHidden,
        presence,
        $$slots: { presence: true }
      }
    ]));
  }
  pop();
}
function Scroll_area_scrollbar_hover($$payload, $$props) {
  push();
  let {
    forceMount = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const scrollbarHoverState = useScrollAreaScrollbarHover();
  const scrollbarAutoState = useScrollAreaScrollbarAuto();
  const mergedProps = mergeProps(restProps, scrollbarHoverState.props, scrollbarAutoState.props, {
    "data-state": scrollbarHoverState.isVisible ? "visible" : "hidden"
  });
  const present = forceMount || scrollbarHoverState.isVisible && scrollbarAutoState.isVisible;
  {
    let presence = function($$payload2) {
      Scroll_area_scrollbar_visible($$payload2, spread_props([mergedProps]));
    };
    Presence_layer($$payload, spread_props([
      mergedProps,
      {
        present,
        presence,
        $$slots: { presence: true }
      }
    ]));
  }
  pop();
}
function Scroll_area_scrollbar$1($$payload, $$props) {
  push();
  let {
    ref = null,
    id = useId(),
    orientation,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const scrollbarState = useScrollAreaScrollbar({
    orientation: box.with(() => orientation),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const type = scrollbarState.root.type.current;
  if (type === "hover") {
    $$payload.out += "<!--[-->";
    Scroll_area_scrollbar_hover($$payload, spread_props([restProps, { id }]));
  } else if (type === "scroll") {
    $$payload.out += "<!--[1-->";
    Scroll_area_scrollbar_scroll($$payload, spread_props([restProps, { id }]));
  } else if (type === "auto") {
    $$payload.out += "<!--[2-->";
    Scroll_area_scrollbar_auto($$payload, spread_props([restProps, { id }]));
  } else if (type === "always") {
    $$payload.out += "<!--[3-->";
    Scroll_area_scrollbar_visible($$payload, spread_props([restProps, { id }]));
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Scroll_area_thumb_impl($$payload, $$props) {
  push();
  let {
    ref = null,
    id,
    child,
    children,
    present,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const isMounted = new IsMounted();
  const thumbState = useScrollAreaThumb({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    mounted: box.with(() => isMounted.current)
  });
  const mergedProps = mergeProps(restProps, thumbState.props, { style: { hidden: !present } });
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
function Scroll_area_thumb($$payload, $$props) {
  push();
  let {
    id = useId(),
    ref = null,
    forceMount = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const scrollbarState = getScrollAreaScrollbarVisibleContext();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    {
      let presence = function($$payload3, { present }) {
        Scroll_area_thumb_impl($$payload3, spread_props([
          restProps,
          {
            id,
            present: present.current,
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            }
          }
        ]));
      };
      Presence_layer($$payload2, spread_props([
        { present: forceMount || scrollbarState.hasThumb },
        restProps,
        { id, presence, $$slots: { presence: true } }
      ]));
    }
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
function Scroll_area_corner_impl($$payload, $$props) {
  push();
  let {
    ref = null,
    id,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const cornerState = useScrollAreaCorner({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, cornerState.props);
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
function Scroll_area_corner($$payload, $$props) {
  push();
  let {
    ref = null,
    id = useId(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const scrollAreaState = getScrollAreaRootContext();
  const hasBothScrollbarsVisible = Boolean(scrollAreaState.scrollbarXNode && scrollAreaState.scrollbarYNode);
  const hasCorner = scrollAreaState.type.current !== "scroll" && hasBothScrollbarsVisible;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (hasCorner) {
      $$payload2.out += "<!--[-->";
      Scroll_area_corner_impl($$payload2, spread_props([
        restProps,
        {
          id,
          get ref() {
            return ref;
          },
          set ref($$value) {
            ref = $$value;
            $$settled = false;
          }
        }
      ]));
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
class LocalStore {
  _rune;
  _key = "";
  constructor(key, value) {
    this._key = key;
    this._rune = value;
  }
  get value() {
    return this._rune;
  }
  set value(newVal) {
    this._rune = newVal;
  }
  persist() {
    localStorage.setItem(this._key, this.serialize(this._rune));
  }
  serialize(value) {
    return JSON.stringify(value);
  }
  deserialize(item) {
    return JSON.parse(item);
  }
}
function localStore(key, value) {
  return new LocalStore(key, value);
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
      class: clsx$1(mergeClasses("lucide-icon", "lucide", name ? `lucide-${name}` : "", $$sanitized_props.class))
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
function Input($$payload, $$props) {
  push();
  let {
    ref = null,
    value = void 0,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<input${spread_attributes(
    {
      class: clsx$1(cn("border-neutral-7 bg-neutral-1 ring-offset-neutral-1 placeholder:text-neutral-11 focus-visible:ring-neutral-7 flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)),
      value,
      ...restProps
    }
  )}>`;
  bind_props($$props, { ref, value });
  pop();
}
function isFunction(value) {
  return typeof value === "function";
}
function isSvelteSet(value) {
  return value instanceof SvelteSet;
}
function isIterable(value) {
  return value !== null && typeof value === "object" && Symbol.iterator in value;
}
function isString(value) {
  return typeof value === "string";
}
function extract(value, defaultValue) {
  if (isFunction(value)) {
    const getter = value;
    const gotten = getter();
    return gotten ?? defaultValue ?? gotten;
  }
  return value ?? defaultValue ?? value;
}
function last(values) {
  let result;
  for (const value of values) {
    result = value;
  }
  return result;
}
function first(values) {
  let result;
  for (const value of values) {
    result = value;
    break;
  }
  return result;
}
function forEach(values, callback) {
  for (const value of values) {
    callback(value);
  }
}
function toSet(v) {
  if (v === void 0) return new SvelteSet();
  if (isSvelteSet(v)) return v;
  if (!isIterable(v)) return new SvelteSet([v]);
  return new SvelteSet(v);
}
function toSingle(v) {
  if (!isIterable(v) || v === void 0) return v;
  return last(v);
}
class SelectionState {
  #props;
  #internal_set = new SvelteSet();
  #isControlled = once(() => isSvelteSet(this.#props.value) || isFunction(this.#props.value));
  get isControlled() {
    return this.#isControlled();
  }
  #isMultiple = once(() => extract(this.#props.multiple, false));
  get isMultiple() {
    return this.#isMultiple();
  }
  constructor(props) {
    this.#props = props;
    if (this.isControlled) return;
    if (!isIterable(props.value) && props.value !== void 0) {
      this.#internal_set.add(props.value);
    } else if (isIterable(props.value)) {
      forEach(props.value, (v) => this.#internal_set.add(v));
    }
    watch(
      () => this.isMultiple,
      (isMultiple) => {
        if (isMultiple) return;
        const curr = this.current;
        this.#internal_set.clear();
        if (curr === void 0) return;
        this.#internal_set.add(curr);
      },
      { lazy: true }
    );
  }
  /**
   * Gets the current selection value(s)
   * @returns For multiple selection, returns a SvelteSet of values. For single selection, returns a single value or undefined.
   */
  get current() {
    let value;
    if (isFunction(this.#props.value)) {
      value = this.#props.value();
    } else if (isSvelteSet(this.#props.value)) {
      value = this.#props.value;
    } else {
      value = this.#internal_set;
    }
    if (this.isMultiple) {
      return toSet(value);
    }
    return toSingle(value);
  }
  /**
   * Manipulates the selection set through a callback
   * @param cb - Callback function that receives the selection set for manipulation
   * @internal
   */
  manipulate(cb) {
    const set = this.isControlled ? toSet(this.current) : this.#internal_set;
    cb(set);
    const newValue = this.isMultiple ? set : toSingle(set);
    this.onChange(newValue);
  }
  /**
   * Triggers the onChange callback with the current selection
   * @param value - The current selection value(s)
   * @internal
   */
  onChange(value) {
    if (!this.#props.onChange) return;
    this.#props.onChange(value);
  }
  /**
   * Sets the current selection value(s)
   * @param value - The new selection value(s)
   */
  set current(value) {
    this.onChange(value);
    if (this.isControlled) return;
    this.#internal_set.clear();
    if (isSvelteSet(value)) {
      value.forEach((v) => this.#internal_set.add(v));
    } else if (value !== void 0) {
      this.#internal_set.add(value);
    }
  }
  /**
   * Checks if an item is currently selected
   * @param item - The item to check
   * @returns True if the item is selected, false otherwise
   */
  has(item) {
    return toSet(this.current).has(item);
  }
  /**
   * Adds an item to the selection
   * For single selection, this replaces the current selection
   * For multiple selection, this adds to the current selection
   * @param value - The item to add
   */
  add(value) {
    this.manipulate((set) => {
      if (!this.isMultiple) {
        set.clear();
      }
      set.add(value);
    });
  }
  /**
   * Adds multiple items to the selection
   * For single selection, only the first item is selected
   * For multiple selection, all items are added to the selection
   * @param items - The items to add
   */
  addAll(items) {
    this.manipulate((set) => {
      if (!this.isMultiple) {
        set.clear();
        set.add(first(items));
      } else {
        forEach(items, (i) => set.add(i));
      }
    });
  }
  /**
   * Removes an item from the selection
   * @param value - The item to remove
   */
  delete(value) {
    this.manipulate((set) => {
      set.delete(value);
    });
  }
  /**
   * Removes multiple items from the selection
   * @param items - The items to remove
   */
  deleteAll(items) {
    this.manipulate((set) => forEach(items, set.delete));
  }
  /**
   * Clears all selections
   */
  clear() {
    this.manipulate((set) => set.clear());
  }
  /**
   * Gets the number of selected items
   * @returns The number of selected items
   */
  size() {
    return toSet(this.current).size;
  }
  /**
   * Toggles the selection state of an item
   * If the item is selected, it will be deselected
   * If the item is not selected, it will be selected
   * @param item - The item to toggle
   */
  toggle(item) {
    this.manipulate((set) => {
      if (set.has(item)) {
        set.delete(item);
      } else {
        this.add(item);
      }
    });
  }
  /**
   * Converts the current selection to a SvelteSet
   * @returns A SvelteSet containing the current selection
   */
  toSet() {
    return toSet(this.current);
  }
  /**
   * Converts the current selection to an array
   * @returns An array containing the current selection
   */
  toArray() {
    return Array.from(this.toSet());
  }
}
function dataAttr(value) {
  return value === true ? "" : value === false ? void 0 : value;
}
const urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
const POOL_SIZE_MULTIPLIER = 128;
let pool, poolOffset;
function fillPool(bytes) {
  if (!pool || pool.length < bytes) {
    pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER);
    webcrypto.getRandomValues(pool);
    poolOffset = 0;
  } else if (poolOffset + bytes > pool.length) {
    webcrypto.getRandomValues(pool);
    poolOffset = 0;
  }
  poolOffset += bytes;
}
function nanoid(size = 21) {
  fillPool(size |= 0);
  let id = "";
  for (let i = poolOffset - size; i < poolOffset; i++) {
    id += urlAlphabet[pool[i] & 63];
  }
  return id;
}
function keys(obj) {
  return Object.keys(obj);
}
function createDataIds(name, parts) {
  return parts.reduce((acc, part) => {
    acc[part] = `data-melt-${name}-${part}`;
    return acc;
  }, {});
}
function createIds(identifiers2) {
  const id = nanoid();
  return Object.keys(identifiers2).reduce((acc, key) => {
    acc[key] = `${key}-${id}`;
    return acc;
  }, {});
}
function createBuilderMetadata(name, parts) {
  const dataAttrs = createDataIds(name, parts);
  const dataSelectors = keys(dataAttrs).reduce((acc, key) => {
    acc[key] = `[${dataAttrs[key]}]`;
    return acc;
  }, {});
  return {
    dataAttrs,
    dataSelectors,
    createIds: () => createIds(dataAttrs)
  };
}
createBuilderMetadata("accordion", [
  "root",
  "item",
  "trigger",
  "heading",
  "content"
]);
createDataIds("avatar", ["image", "fallback"]);
createBuilderMetadata("collapsible", ["root", "trigger", "content"]);
createDataIds("pin-input", ["root", "input"]);
createDataIds("popover", ["trigger", "content"]);
createDataIds("progress", ["root", "progress"]);
createBuilderMetadata("radio-group", ["root", "item", "label", "hidden-input"]);
createDataIds("tabs", ["trigger", "content", "trigger-list"]);
createDataIds("toggle", ["trigger", "hidden-input"]);
createDataIds("slider", ["root", "track", "thumb", "range"]);
class Collection {
  source;
  defaultValue;
  constructor(source, defaultValue) {
    this.source = source;
    this.defaultValue = defaultValue;
  }
  getIterable() {
    if (!this.source) {
      return this.defaultValue !== void 0 ? this.defaultValue : [];
    }
    return typeof this.source === "function" ? this.source() : this.source;
  }
  *[Symbol.iterator]() {
    const iterable = this.getIterable();
    if (iterable) {
      yield* iterable;
    }
  }
  *keys() {
    const iterable = this.getIterable();
    if (iterable) {
      let index = 0;
      for (const _ of iterable) {
        yield index++;
      }
    }
  }
  *values() {
    const iterable = this.getIterable();
    if (iterable) {
      yield* iterable;
    }
  }
  *entries() {
    const iterable = this.getIterable();
    if (iterable) {
      let index = 0;
      for (const value of iterable) {
        yield [index++, value];
      }
    }
  }
  toArray() {
    const iterable = this.getIterable();
    return iterable ? Array.from(iterable) : [];
  }
  toSet() {
    const iterable = this.getIterable();
    return new Set(iterable);
  }
  size() {
    const iterable = this.getIterable();
    if (!iterable)
      return 0;
    let count = 0;
    for (const _ of iterable) {
      count++;
    }
    return count;
  }
  isEmpty() {
    const iterable = this.getIterable();
    if (!iterable)
      return true;
    for (const _ of iterable) {
      return false;
    }
    return true;
  }
  first() {
    const iterable = this.getIterable();
    if (!iterable)
      return void 0;
    for (const value of iterable) {
      return value;
    }
    return void 0;
  }
  last() {
    const iterable = this.getIterable();
    if (!iterable)
      return void 0;
    let lastValue;
    for (const value of iterable) {
      lastValue = value;
    }
    return lastValue;
  }
  find(predicate) {
    const iterable = this.getIterable();
    if (!iterable)
      return void 0;
    for (const value of iterable) {
      if (predicate(value)) {
        return value;
      }
    }
    return void 0;
  }
  some(predicate) {
    const iterable = this.getIterable();
    if (!iterable)
      return false;
    for (const value of iterable) {
      if (predicate(value)) {
        return true;
      }
    }
    return false;
  }
  every(predicate) {
    const iterable = this.getIterable();
    if (!iterable)
      return true;
    for (const value of iterable) {
      if (!predicate(value)) {
        return false;
      }
    }
    return true;
  }
}
function isMac() {
  return /mac/i.test(navigator.platform);
}
function isControlOrMeta(event) {
  return isMac() ? event.metaKey : event.ctrlKey;
}
const letterRegex = /^[a-zA-Z]$/;
function createTypeahead(args) {
  let value = "";
  const timeout = extract(args.timeout, 500);
  const debounceClear = useDebounce$1(
    () => {
      value = "";
    },
    () => timeout
  );
  function typeahead(letter) {
    if (!letterRegex.test(letter)) return;
    debounceClear();
    value += letter.toLowerCase();
    const isStartingTypeahead = value.length === 1;
    const items = args.getItems();
    const index = items.findIndex((item) => item.current);
    const itemsForTypeahead = items.filter((item) => {
      return item.value.toLowerCase().startsWith(value);
    }).map((item) => ({ item, index: items.indexOf(item) }));
    if (!itemsForTypeahead.length) return;
    const next2 = itemsForTypeahead.find((item) => {
      if (isStartingTypeahead) return item.index > index;
      return item.index >= index;
    }) ?? itemsForTypeahead[0];
    return next2?.item;
  }
  return typeahead;
}
const identifiers = createDataIds("tree", ["root", "item", "group"]);
class Tree {
  #props;
  /** The items contained in the tree */
  collection;
  #multiple = once(() => extract(this.#props.multiple, false));
  get multiple() {
    return this.#multiple();
  }
  #expandOnClick = once(() => extract(this.#props.expandOnClick, true));
  get expandOnClick() {
    return this.#expandOnClick();
  }
  #typeaheadTimeout = once(() => extract(this.#props.typeaheadTimeout, 500));
  get typeaheadTimeout() {
    return this.#typeaheadTimeout();
  }
  #typeahead = once(() => createTypeahead({
    timeout: this.#props.typeaheadTimeout,
    getItems: () => {
      const activeEl = document.activeElement;
      if (!isString(activeEl?.getAttribute(identifiers.item))) return [];
      const visibleChildren = getAllChildren(this, true);
      return visibleChildren.reduce(
        (acc, curr) => {
          if (!curr.el?.innerText) return acc;
          return [
            ...acc,
            {
              child: curr,
              value: curr.el.innerText,
              current: curr.el.id === activeEl.id
            }
          ];
        },
        []
      );
    }
  }));
  get typeahead() {
    return this.#typeahead();
  }
  #selected;
  #expanded;
  #id = crypto.randomUUID();
  /**
   * Creates a new Tree instance
   * @param props - Configuration props for the tree
   */
  constructor(props) {
    this.#props = props;
    this.collection = new Collection(props.items);
    this.#selected = new SelectionState({
      value: props.selected,
      onChange: props.onSelectedChange,
      multiple: props.multiple
    });
    this.#expanded = new SelectionState({
      value: props.expanded,
      onChange: props.onExpandedChange,
      multiple: true
    });
  }
  get items() {
    return [...this.collection];
  }
  /**
   * Currently selected item(s)
   * For multiple selection, returns a Set of IDs
   * For single selection, returns a single ID or undefined
   */
  get selected() {
    return this.#selected.current;
  }
  set selected(v) {
    this.#selected.current = v;
  }
  /**
   * Set of currently expanded item IDs
   */
  get expanded() {
    return this.#expanded.current;
  }
  set expanded(v) {
    this.#expanded.current = v;
  }
  /**
   * Checks if an item is currently selected
   * @param id - ID of the item to check
   */
  isSelected(id) {
    return this.#selected.has(id);
  }
  /**
   * Checks if an item is currently expanded
   * @param id - ID of the item to check
   */
  isExpanded(id) {
    return this.#expanded.has(id);
  }
  /**
   * Expands a specific item
   * @param id - ID of the item to expand
   */
  expand(id) {
    this.#expanded.add(id);
  }
  /**
   * Collapses a specific item
   * @param id - ID of the item to collapse
   */
  collapse(id) {
    this.#expanded.delete(id);
  }
  /**
   * Toggles the expanded state of an item
   * @param id - ID of the item to toggle
   */
  toggleExpand(id) {
    this.#expanded.toggle(id);
  }
  /**
   * Selects a specific item
   * @param id - ID of the item to select
   */
  select(id) {
    this.#selected.add(id);
  }
  /**
   * Deselects a specific item
   * @param id - ID of the item to deselect
   */
  deselect(id) {
    this.#selected.delete(id);
  }
  /**
   * Clears all current selections
   */
  clearSelection() {
    this.#selected.clear();
  }
  /**
   * Toggles the selected state of an item
   * @param id - ID of the item to toggle
   */
  toggleSelect(id) {
    this.#selected.toggle(id);
  }
  /**
   * Selects all visible items.
   * If all items are already selected, clears the selection.
   */
  selectAll() {
    const ids = getAllChildren(this, true).map((c) => c.id);
    const alreadySelected = ids.every((id) => this.#selected.has(id));
    if (alreadySelected) {
      this.clearSelection();
    } else {
      this.#selected.addAll(ids);
    }
  }
  /**
   * Gets the DOM ID for a specific tree item
   * @param id - ID of the item
   */
  getItemId(id) {
    return `melt-tree-${this.#id}-item--${id}`;
  }
  /**
   * Gets the DOM element for a specific tree item
   * @param id - ID of the item
   */
  getItemEl(id) {
    return document.getElementById(this.getItemId(id));
  }
  /**
   * Selects all items between the last selected item and the specified item
   * @param id - ID of the item to select until
   */
  selectUntil(id) {
    if (!this.#selected.size()) return this.select(id);
    const allChildren = getAllChildren(this);
    const to = allChildren.find((c) => c.id === id);
    if (!to) return;
    const from = allChildren.find((c) => c.id === first(this.#selected.toSet()));
    if (!from) return this.select(id);
    const fromIdx = allChildren.indexOf(from);
    const toIdx = allChildren.indexOf(to);
    const [start, end] = fromIdx < toIdx ? [from, to] : [to, from];
    let current = start;
    this.clearSelection();
    this.select(from.id);
    this.select(start.id);
    while (current.id !== end.id && current.next) {
      current = current.next;
      this.select(current.id);
    }
  }
  /**
   * Gets ARIA attributes for the root tree element
   */
  get root() {
    return { role: "tree", [identifiers.root]: "" };
  }
  /**
   * ARIA attributes for group elements
   */
  get group() {
    return { role: "group", [identifiers.group]: "" };
  }
  /**
   * Array of Child instances representing the top-level items
   */
  get children() {
    return [...this.collection].map((i) => new Child({
      tree: this,
      item: i,
      parent: this,
      selectedState: this.#selected
    }));
  }
}
function getAllChildren(treeOrChild, onlyVisible = false) {
  const children = !onlyVisible || treeOrChild instanceof Tree || treeOrChild.expanded ? treeOrChild.children : [];
  return children?.reduce(
    (acc, c) => {
      return [
        ...acc,
        c,
        ...getAllChildren(c, onlyVisible)
      ];
    },
    []
  ) || [];
}
class Child {
  #props;
  #tree = once(() => this.#props.tree);
  get tree() {
    return this.#tree();
  }
  #selectedState = once(() => this.#props.selectedState);
  get selectedState() {
    return this.#selectedState();
  }
  #item = once(() => this.#props.item);
  get item() {
    return this.#item();
  }
  #elId = once(() => this.tree.getItemId(this.item.id));
  get elId() {
    return this.#elId();
  }
  #id = once(() => this.item.id);
  get id() {
    return this.#id();
  }
  #parent = once(() => this.#props.parent);
  get parent() {
    return this.#parent();
  }
  /**
   * Creates a new Child instance
   * @param props - Configuration props for the child
   */
  constructor(props) {
    this.#props = props;
  }
  /** The DOM element representing this item */
  get el() {
    return document.getElementById(this.elId);
  }
  #selected = once(() => this.tree.isSelected(this.id));
  get selected() {
    return this.#selected();
  }
  #expanded = once(() => this.tree.isExpanded(this.id));
  get expanded() {
    return this.#expanded();
  }
  #canExpand = once(() => Boolean(this.item.children && this.item.children?.length > 0));
  get canExpand() {
    return this.#canExpand();
  }
  /** Collapses this item */
  collapse = () => this.tree.collapse(this.id);
  /** Expands this item */
  expand = () => this.tree.expand(this.id);
  /** Toggles the expanded state of this item */
  toggleExpand = () => this.tree.toggleExpand(this.id);
  /** Selects this item */
  select = () => this.tree.select(this.id);
  /** Deselects this item */
  deselect = () => this.tree.deselect(this.id);
  /** Toggles the selected state of this item */
  toggleSelect = () => this.tree.toggleSelect(this.id);
  /** Focuses this item's DOM element */
  focus = () => this.el?.focus();
  #idx = once(() => this.parent?.children?.findIndex((c) => c.id === this.id) ?? -1);
  get idx() {
    return this.#idx();
  }
  /** Gets all sibling items */
  get siblings() {
    return this.parent?.children ?? [];
  }
  /** Gets the previous sibling item */
  get previousSibling() {
    return this.siblings[this.idx - 1];
  }
  /** Gets the next sibling item */
  get nextSibling() {
    return this.siblings[this.idx + 1];
  }
  /** Gets the previous item in the tree (including parent/child relationships) */
  get previous() {
    let current = this.previousSibling;
    if (!current) return this.parent instanceof Child ? this.parent : void 0;
    while (current?.expanded) {
      current = last(current?.children ?? []);
    }
    return current;
  }
  /** Gets the next item in the tree (including parent/child relationships) */
  get next() {
    if (this.expanded) {
      return this.children?.[0];
    }
    if (this.nextSibling) {
      return this.nextSibling;
    }
    if (this.parent instanceof Child) {
      let p = this.parent;
      while (p && !p.nextSibling) {
        if (p.parent instanceof Tree) break;
        p = p.parent;
      }
      return p?.nextSibling;
    }
  }
  /** Gets the tabindex for this item's DOM element */
  get tabindex() {
    if (this.selectedState.size()) {
      return this.tree.isSelected(this.id) ? 0 : -1;
    }
    return this.parent instanceof Tree && this.idx === 0 ? 0 : -1;
  }
  /** Gets DOM and ARIA attributes for this item */
  get attrs() {
    return {
      id: this.elId,
      [identifiers.item]: "",
      "data-selected": dataAttr(this.selected),
      tabindex: this.tabindex,
      role: "treeitem",
      onclick: (e) => {
        e.stopPropagation();
        if (!isControlOrMeta(e) && !e.shiftKey) this.tree.clearSelection();
        if (this.tree.expandOnClick && this.canExpand && (!this.tree.multiple || !isControlOrMeta(e) && !e.shiftKey)) {
          this.toggleExpand();
        }
        if (isControlOrMeta(e)) this.toggleSelect();
        else this.tree.select(this.id);
        if (e.shiftKey) this.tree.selectUntil(this.id);
        this.focus();
      },
      onkeydown: (e) => {
        let shouldPrevent = true;
        switch (e.key) {
          case "ArrowLeft": {
            if (this.expanded) {
              this.collapse();
              break;
            }
            if (!(this.parent instanceof Child)) return;
            this.parent?.focus();
            break;
          }
          case "ArrowRight": {
            if (!this.canExpand) break;
            if (this.expanded) {
              this.children?.[0]?.focus();
              break;
            }
            this.expand();
            break;
          }
          case "ArrowUp": {
            this.previous?.focus();
            if (e.shiftKey) this.previous?.toggleSelect();
            break;
          }
          case "ArrowDown": {
            this.next?.focus();
            if (e.shiftKey) this.next?.toggleSelect();
            break;
          }
          case " ": {
            if (!this.tree.multiple) break;
            if (e.shiftKey) {
              this.tree.selectUntil(this.id);
              break;
            }
            this.toggleSelect();
            break;
          }
          case "Enter": {
            this.tree.clearSelection();
            this.select();
            break;
          }
          case "Home": {
            first(getAllChildren(this.tree))?.focus();
            break;
          }
          case "End": {
            last(getAllChildren(this.tree, true))?.focus();
            break;
          }
          case "*": {
            this.siblings.forEach((s) => s.expand());
            break;
          }
          default: {
            if (letterRegex.test(e.key)) {
              if (e.ctrlKey) {
                if (e.key === "a") {
                  this.tree.selectAll();
                }
                break;
              }
              const next2 = this.tree.typeahead(e.key);
              next2?.child.el?.focus();
              break;
            }
            shouldPrevent = false;
          }
        }
        if (shouldPrevent) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };
  }
  /** The item's sub-items, if any */
  get children() {
    return this.item.children?.map((i) => new Child({ ...this.#props, item: i, parent: this }));
  }
}
createBuilderMetadata("fileupload", ["dropzone", "input"]);
createBuilderMetadata("select", ["trigger", "content", "option"]);
function Scroll_area_scrollbar($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    orientation = "vertical",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Scroll_area_scrollbar$1($$payload2, spread_props([
      {
        orientation,
        class: cn("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-px", orientation === "horizontal" && "h-2.5 w-full border-t border-t-transparent p-px", className)
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
          $$payload3.out += `<!----> <!---->`;
          Scroll_area_thumb($$payload3, {
            class: cn("bg-neutral-6 relative rounded-full", orientation === "vertical" && "flex-1")
          });
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
function Scroll_area($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    orientation = "vertical",
    scrollbarXClasses = "",
    scrollbarYClasses = "",
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Scroll_area$1($$payload2, spread_props([
      restProps,
      {
        class: cn("relative overflow-hidden", className),
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        },
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          Scroll_area_viewport($$payload3, {
            class: "h-full w-full rounded-[inherit]",
            children: ($$payload4) => {
              children?.($$payload4);
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          if (orientation === "vertical" || orientation === "both") {
            $$payload3.out += "<!--[-->";
            Scroll_area_scrollbar($$payload3, {
              orientation: "vertical",
              class: scrollbarYClasses
            });
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> `;
          if (orientation === "horizontal" || orientation === "both") {
            $$payload3.out += "<!--[-->";
            Scroll_area_scrollbar($$payload3, {
              orientation: "horizontal",
              class: scrollbarXClasses
            });
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> <!---->`;
          Scroll_area_corner($$payload3, {});
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
export {
  Menu_group_heading as $,
  ARROW_DOWN as A,
  Button as B,
  useMenuCheckboxItem as C,
  useRovingFocus as D,
  ENTER as E,
  wrapArray as F,
  Menu as G,
  HOME as H,
  Icon$1 as I,
  useMenuDropdownTrigger as J,
  onDestroy as K,
  LocalStore as L,
  Mounted as M,
  localStore as N,
  Portal as O,
  PAGE_UP as P,
  iconIds as Q,
  Icon as R,
  SPACE as S,
  TAB as T,
  Input as U,
  buttonVariants as V,
  Tree as W,
  Scroll_area$1 as X,
  Scroll_area_viewport as Y,
  Scroll_area_scrollbar$1 as Z,
  Scroll_area_thumb as _,
  afterTick as a,
  Menu_radio_item as a0,
  Circle as a1,
  Menu_radio_group as a2,
  tick as a3,
  Scroll_area as a4,
  Presence_layer as a5,
  Focus_scope as a6,
  Escape_layer as a7,
  Dismissible_layer as a8,
  Text_selection_layer as a9,
  Scroll_lock as aa,
  ARROW_UP as b,
  cn as c,
  ARROW_LEFT as d,
  ARROW_RIGHT as e,
  chunk as f,
  boxAutoReset as g,
  getNextMatch as h,
  isValidIndex as i,
  PAGE_DOWN as j,
  END as k,
  forward as l,
  backward as m,
  next as n,
  Popper_layer_force_mount as o,
  prev as p,
  Popper_layer as q,
  useMenuSubmenu as r,
  useMenuItem as s,
  useMenuGroup as t,
  useDOMTypeahead as u,
  useMenuSeparator as v,
  useMenuContent as w,
  SUB_CLOSE_KEYS as x,
  dispatchMenuOpen as y,
  useMenuSubTrigger as z
};
