import "clsx";
import { B as BROWSER, M as getContext$1, E as attr, D as pop, A as push, R as element$1, P as bind_props, N as spread_attributes, S as run, T as once, G as escape_html, J as spread_props, U as copy_payload, V as assign_payload, I as ensure_array_like, Q as attr_class, W as stringify, O as clsx, C as setContext$1, X as attr_style, Y as sanitize_props, Z as slot, K as hasContext, _ as store_mutate, $ as store_get, a0 as unsubscribe_stores } from "./index.js";
import { Schema, or } from "@triplit/client";
import z$1, { z, ZodFirstPartyTypeKind, ZodOptional } from "zod";
import { i as isBrowser$2, e as isHTMLElement, s as srOnlyStylesString, g as getDataReadonly, f as getDataDisabled, j as getDataInvalid, k as createContext$1, u as useId$2, n as useRefById, o as getAriaDisabled, p as getAriaHidden, q as getAriaReadonly, r as getDataSelected, v as getDataUnavailable, w as getAriaSelected, x as noop$1, y as box, z as mergeProps, A as styleToString, B as getRequired, C as getDisabled, D as srOnlyStyles, E as getDataOpenClosed, F as getDataOrientation, G as getAriaOrientation, H as Floating_layer, I as getFloatingContentCSSVars, J as Floating_layer_anchor, K as getAriaExpanded, L as isElementOrSVGElement, S as SvelteMap, M as getHidden, c as derivedMode, N as SvelteSet, O as getDefaultExportFromCjs } from "./floating-layer-anchor.js";
import { a as app, i as invalidateAll, b as applyAction, g as goto } from "./client.js";
import { i as get, w as writable, j as derived, k as readonly } from "./exports.js";
import { i as isValidIndex, a as afterTick, A as ARROW_DOWN, b as ARROW_UP, d as ARROW_LEFT, e as ARROW_RIGHT, E as ENTER, S as SPACE, f as chunk, g as boxAutoReset, h as getNextMatch, u as useDOMTypeahead, T as TAB, P as PAGE_UP, H as HOME, j as PAGE_DOWN, k as END, n as next, p as prev, l as forward, m as backward, o as Popper_layer_force_mount, q as Popper_layer, M as Mounted, r as useMenuSubmenu, s as useMenuItem, t as useMenuGroup, v as useMenuSeparator, w as useMenuContent, x as SUB_CLOSE_KEYS, y as dispatchMenuOpen, z as useMenuSubTrigger, C as useMenuCheckboxItem, D as useRovingFocus, F as wrapArray, G as Menu$1, J as useMenuDropdownTrigger, c as cn, B as Button$1, I as Icon, K as onDestroy, L as LocalStore, N as localStore, O as Portal, Q as iconIds, R as Icon$1, U as Input, V as buttonVariants, W as Tree$1, X as Scroll_area, Y as Scroll_area_viewport, Z as Scroll_area_scrollbar, _ as Scroll_area_thumb, $ as Menu_group_heading, a0 as Menu_radio_item, a1 as Circle, a2 as Menu_radio_group, a3 as tick, a4 as Scroll_area$1 } from "./circle.js";
import { U as UNDEFINED, N as NAN, P as POSITIVE_INFINITY, f as NEGATIVE_INFINITY, h as NEGATIVE_ZERO, j as decode64, H as HOLE, d as stringify$1 } from "./stringify.js";
import "./index2.js";
import { isAxiosError } from "axios";
import Konva from "konva";
import { skyDark, sky, mintDark, mint, limeDark, lime, yellowDark, yellow, amberDark, amber, orangeDark, orange, brownDark, brown, goldDark, gold, bronzeDark, bronze, grassDark, grass, greenDark, green, jadeDark, jade, tealDark, teal, cyanDark, cyan, blueDark, blue, indigoDark, indigo, irisDark, iris, violetDark, violet, purpleDark, purple, plumDark, plum, pinkDark, pink, crimsonDark, crimson, rubyDark, ruby, redDark, red, tomatoDark, tomato, sandDark, sand, oliveDark, olive, sageDark, sage, slateDark, slate, mauveDark, mauve, grayDark, gray } from "@radix-ui/colors";
import { p as page$1 } from "./index4.js";
import { CalendarDateTime, CalendarDate, getLocalTimeZone, ZonedDateTime, parseZonedDateTime, parseDateTime, parseDate, toCalendar, getDayOfWeek, DateFormatter, startOfMonth, endOfMonth, isSameMonth, isSameDay as isSameDay$1, isToday, fromDate, today } from "@internationalized/date";
import { R as Root$4, T as Trigger$2, C as Content } from "./index5.js";
import { u as useTooltipContent, R as Root$3, T as Trigger$1 } from "./index3.js";
function parse(serialized, revivers) {
  return unflatten(JSON.parse(serialized), revivers);
}
function unflatten(parsed, revivers) {
  if (typeof parsed === "number") return hydrate(parsed, true);
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("Invalid input");
  }
  const values = (
    /** @type {any[]} */
    parsed
  );
  const hydrated = Array(values.length);
  function hydrate(index, standalone = false) {
    if (index === UNDEFINED) return void 0;
    if (index === NAN) return NaN;
    if (index === POSITIVE_INFINITY) return Infinity;
    if (index === NEGATIVE_INFINITY) return -Infinity;
    if (index === NEGATIVE_ZERO) return -0;
    if (standalone) throw new Error(`Invalid input`);
    if (index in hydrated) return hydrated[index];
    const value = values[index];
    if (!value || typeof value !== "object") {
      hydrated[index] = value;
    } else if (Array.isArray(value)) {
      if (typeof value[0] === "string") {
        const type = value[0];
        const reviver = revivers?.[type];
        if (reviver) {
          return hydrated[index] = reviver(hydrate(value[1]));
        }
        switch (type) {
          case "Date":
            hydrated[index] = new Date(value[1]);
            break;
          case "Set":
            const set = /* @__PURE__ */ new Set();
            hydrated[index] = set;
            for (let i = 1; i < value.length; i += 1) {
              set.add(hydrate(value[i]));
            }
            break;
          case "Map":
            const map = /* @__PURE__ */ new Map();
            hydrated[index] = map;
            for (let i = 1; i < value.length; i += 2) {
              map.set(hydrate(value[i]), hydrate(value[i + 1]));
            }
            break;
          case "RegExp":
            hydrated[index] = new RegExp(value[1], value[2]);
            break;
          case "Object":
            hydrated[index] = Object(value[1]);
            break;
          case "BigInt":
            hydrated[index] = BigInt(value[1]);
            break;
          case "null":
            const obj = /* @__PURE__ */ Object.create(null);
            hydrated[index] = obj;
            for (let i = 1; i < value.length; i += 2) {
              obj[value[i]] = hydrate(value[i + 1]);
            }
            break;
          case "Int8Array":
          case "Uint8Array":
          case "Uint8ClampedArray":
          case "Int16Array":
          case "Uint16Array":
          case "Int32Array":
          case "Uint32Array":
          case "Float32Array":
          case "Float64Array":
          case "BigInt64Array":
          case "BigUint64Array": {
            const TypedArrayConstructor = globalThis[type];
            const base64 = value[1];
            const arraybuffer = decode64(base64);
            const typedArray = new TypedArrayConstructor(arraybuffer);
            hydrated[index] = typedArray;
            break;
          }
          case "ArrayBuffer": {
            const base64 = value[1];
            const arraybuffer = decode64(base64);
            hydrated[index] = arraybuffer;
            break;
          }
          default:
            throw new Error(`Unknown type ${type}`);
        }
      } else {
        const array = new Array(value.length);
        hydrated[index] = array;
        for (let i = 0; i < value.length; i += 1) {
          const n = value[i];
          if (n === HOLE) continue;
          array[i] = hydrate(n);
        }
      }
    } else {
      const object = {};
      hydrated[index] = object;
      for (const key in value) {
        const n = value[key];
        object[key] = hydrate(n);
      }
    }
    return hydrated[index];
  }
  return hydrate(0);
}
function fromStore(store) {
  if ("set" in store) {
    return {
      get current() {
        return get(store);
      },
      set current(v) {
        store.set(v);
      }
    };
  }
  return {
    get current() {
      return get(store);
    }
  };
}
const browser = BROWSER;
function Canvas($$payload, $$props) {
  push();
  let { canvasId, children, overlay } = $$props;
  const canvas = getContext$1(canvasId);
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
  let canvas = getContext$1(canvasId);
  canvas.gridManager.initialize();
  pop();
}
const colors = {
  /** Semantic colors. */
  neutral: {
    radixId: "olive",
    radixLightValue: olive,
    radixDarkValue: oliveDark
  },
  primary: {
    radixId: "grass",
    radixLightValue: grass,
    radixDarkValue: grassDark
  },
  secondary: {
    radixId: "teal",
    radixLightValue: teal,
    radixDarkValue: tealDark
  },
  accent: {
    radixId: "lime",
    radixLightValue: lime,
    radixDarkValue: limeDark
  },
  destructive: {
    radixId: "tomato",
    radixLightValue: tomato,
    radixDarkValue: tomatoDark
  },
  warning: {
    radixId: "amber",
    radixLightValue: amber,
    radixDarkValue: amberDark
  },
  success: {
    radixId: "mint",
    radixLightValue: mint,
    radixDarkValue: mintDark
  },
  /** Literal colors. */
  gray: {
    radixId: "gray",
    radixLightValue: gray,
    radixDarkValue: grayDark
  },
  mauve: {
    radixId: "mauve",
    radixLightValue: mauve,
    radixDarkValue: mauveDark
  },
  slate: {
    radixId: "slate",
    radixLightValue: slate,
    radixDarkValue: slateDark
  },
  sage: {
    radixId: "sage",
    radixLightValue: sage,
    radixDarkValue: sageDark
  },
  olive: {
    radixId: "olive",
    radixLightValue: olive,
    radixDarkValue: oliveDark
  },
  sand: {
    radixId: "sand",
    radixLightValue: sand,
    radixDarkValue: sandDark
  },
  tomato: {
    radixId: "tomato",
    radixLightValue: tomato,
    radixDarkValue: tomatoDark
  },
  red: {
    radixId: "red",
    radixLightValue: red,
    radixDarkValue: redDark
  },
  ruby: {
    radixId: "ruby",
    radixLightValue: ruby,
    radixDarkValue: rubyDark
  },
  crimson: {
    radixId: "crimson",
    radixLightValue: crimson,
    radixDarkValue: crimsonDark
  },
  pink: {
    radixId: "pink",
    radixLightValue: pink,
    radixDarkValue: pinkDark
  },
  plum: {
    radixId: "plum",
    radixLightValue: plum,
    radixDarkValue: plumDark
  },
  purple: {
    radixId: "purple",
    radixLightValue: purple,
    radixDarkValue: purpleDark
  },
  violet: {
    radixId: "violet",
    radixLightValue: violet,
    radixDarkValue: violetDark
  },
  iris: {
    radixId: "iris",
    radixLightValue: iris,
    radixDarkValue: irisDark
  },
  indigo: {
    radixId: "indigo",
    radixLightValue: indigo,
    radixDarkValue: indigoDark
  },
  blue: {
    radixId: "blue",
    radixLightValue: blue,
    radixDarkValue: blueDark
  },
  cyan: {
    radixId: "cyan",
    radixLightValue: cyan,
    radixDarkValue: cyanDark
  },
  teal: {
    radixId: "teal",
    radixLightValue: teal,
    radixDarkValue: tealDark
  },
  jade: {
    radixId: "jade",
    radixLightValue: jade,
    radixDarkValue: jadeDark
  },
  green: {
    radixId: "green",
    radixLightValue: green,
    radixDarkValue: greenDark
  },
  grass: {
    radixId: "grass",
    radixLightValue: grass,
    radixDarkValue: grassDark
  },
  bronze: {
    radixId: "bronze",
    radixLightValue: bronze,
    radixDarkValue: bronzeDark
  },
  gold: {
    radixId: "gold",
    radixLightValue: gold,
    radixDarkValue: goldDark
  },
  brown: {
    radixId: "brown",
    radixLightValue: brown,
    radixDarkValue: brownDark
  },
  orange: {
    radixId: "orange",
    radixLightValue: orange,
    radixDarkValue: orangeDark
  },
  amber: {
    radixId: "amber",
    radixLightValue: amber,
    radixDarkValue: amberDark
  },
  yellow: {
    radixId: "yellow",
    radixLightValue: yellow,
    radixDarkValue: yellowDark
  },
  lime: {
    radixId: "lime",
    radixLightValue: lime,
    radixDarkValue: limeDark
  },
  mint: {
    radixId: "mint",
    radixLightValue: mint,
    radixDarkValue: mintDark
  },
  sky: {
    radixId: "sky",
    radixLightValue: sky,
    radixDarkValue: skyDark
  }
};
function getColor(name, number, mode) {
  const colorId = `${colors[name].radixId}${number}`;
  if (mode == "light") {
    return colors[name].radixLightValue[colorId];
  } else if (mode == "dark") {
    return colors[name].radixDarkValue[colorId];
  } else {
    return colors[name].radixLightValue[colorId];
  }
}
function roundToDecimalPlaces(num, places) {
  const factor = 10 ** places;
  return Math.round(num * factor) / factor;
}
const isBrowser$1 = typeof document !== "undefined";
function clientWritable(initialValue) {
  const store = writable(initialValue);
  function set(value) {
    if (isBrowser$1) {
      store.set(value);
    }
  }
  function update(updater) {
    if (isBrowser$1) {
      store.update(updater);
    }
  }
  return {
    subscribe: store.subscribe,
    set,
    update
  };
}
let toastsCounter = 0;
function createToastState() {
  const toasts = clientWritable([]);
  const heights = clientWritable([]);
  function addToast(data) {
    toasts.update((prev2) => [data, ...prev2]);
  }
  function create(data) {
    const { message: message2, ...rest } = data;
    const id = typeof data?.id === "number" || data.id && data.id?.length > 0 ? data.id : toastsCounter++;
    const dismissable = data.dismissable === void 0 ? true : data.dismissable;
    const type = data.type === void 0 ? "default" : data.type;
    const $toasts = get(toasts);
    const alreadyExists = $toasts.find((toast2) => {
      return toast2.id === id;
    });
    if (alreadyExists) {
      toasts.update((prev2) => prev2.map((toast2) => {
        if (toast2.id === id) {
          return {
            ...toast2,
            ...data,
            id,
            title: message2,
            dismissable,
            type,
            updated: true
          };
        }
        return {
          ...toast2,
          updated: false
        };
      }));
    } else {
      addToast({ ...rest, id, title: message2, dismissable, type });
    }
    return id;
  }
  function dismiss(id) {
    if (id === void 0) {
      toasts.update((prev2) => prev2.map((toast2) => ({ ...toast2, dismiss: true })));
      return;
    }
    toasts.update((prev2) => prev2.map((toast2) => toast2.id === id ? { ...toast2, dismiss: true } : toast2));
    return id;
  }
  function remove(id) {
    if (id === void 0) {
      toasts.set([]);
      return;
    }
    toasts.update((prev2) => prev2.filter((toast2) => toast2.id !== id));
    return id;
  }
  function message(message2, data) {
    return create({ ...data, type: "default", message: message2 });
  }
  function error(message2, data) {
    return create({ ...data, type: "error", message: message2 });
  }
  function success(message2, data) {
    return create({ ...data, type: "success", message: message2 });
  }
  function info(message2, data) {
    return create({ ...data, type: "info", message: message2 });
  }
  function warning(message2, data) {
    return create({ ...data, type: "warning", message: message2 });
  }
  function loading(message2, data) {
    return create({ ...data, type: "loading", message: message2 });
  }
  function promise(promise2, data) {
    if (!data) {
      return;
    }
    let id = void 0;
    if (data.loading !== void 0) {
      id = create({
        ...data,
        promise: promise2,
        type: "loading",
        message: data.loading
      });
    }
    const p = promise2 instanceof Promise ? promise2 : promise2();
    let shouldDismiss = id !== void 0;
    p.then((response) => {
      if (response && typeof response.ok === "boolean" && !response.ok) {
        shouldDismiss = false;
        const message2 = typeof data.error === "function" ? (
          // @ts-expect-error: Incorrect response type
          data.error(`HTTP error! status: ${response.status}`)
        ) : data.error;
        create({ id, type: "error", message: message2 });
      } else if (data.success !== void 0) {
        shouldDismiss = false;
        const message2 = (
          // @ts-expect-error: TODO: Better function checking
          typeof data.success === "function" ? data.success(response) : data.success
        );
        create({ id, type: "success", message: message2 });
      }
    }).catch((error2) => {
      if (data.error !== void 0) {
        shouldDismiss = false;
        const message2 = (
          // @ts-expect-error: TODO: Better function checking
          typeof data.error === "function" ? data.error(error2) : data.error
        );
        create({ id, type: "error", message: message2 });
      }
    }).finally(() => {
      if (shouldDismiss) {
        dismiss(id);
        id = void 0;
      }
      data.finally?.();
    });
    return id;
  }
  function custom(component, data) {
    const id = data?.id || toastsCounter++;
    create({ component, id, ...data });
    return id;
  }
  function removeHeight(id) {
    heights.update((prev2) => prev2.filter((height) => height.toastId !== id));
  }
  function setHeight(data) {
    const exists = get(heights).find((el) => el.toastId === data.toastId);
    if (exists === void 0) {
      heights.update((prev2) => [data, ...prev2]);
      return;
    }
    heights.update((prev2) => prev2.map((el) => {
      if (el.toastId === data.toastId) {
        return data;
      } else {
        return el;
      }
    }));
  }
  function reset() {
    toasts.set([]);
    heights.set([]);
  }
  return {
    // methods
    create,
    addToast,
    dismiss,
    remove,
    message,
    error,
    success,
    info,
    warning,
    loading,
    promise,
    custom,
    removeHeight,
    setHeight,
    reset,
    // stores
    toasts,
    heights
  };
}
const toastState = createToastState();
function toastFunction(message, data) {
  return toastState.create({
    message,
    ...data
  });
}
const basicToast = toastFunction;
const toast = Object.assign(basicToast, {
  success: toastState.success,
  info: toastState.info,
  warning: toastState.warning,
  error: toastState.error,
  custom: toastState.custom,
  message: toastState.message,
  promise: toastState.promise,
  dismiss: toastState.dismiss,
  loading: toastState.loading
});
const sowToGermSchema = z.number().min(0, "May not be negative.").describe("The expected amount of days from starting a seed to its germination.");
const germToTransplantSchema = z.number().min(0, "May not be negative.").describe("The expected amount of days from the germination of a seed to when it will be ready for transplant.             For cultivars which are not able to be transplanted, this value is unused.");
const germToFirstHarvestSchema = z.number().min(0, "May not be negative.").describe("The expected amount of days the germination of a seed to when it will be ready for a harvest.");
const firstToLastHarvestSchema = z.number().min(0, "May not be negative.").describe("The expected amount of days the first and last harvest of a plant.             For plants which only have one harvest, this value is zero.");
const AnnualLifecycleUpdateCommandSchema = z.object({
  sowToGerm: sowToGermSchema.optional(),
  germToTransplant: germToTransplantSchema.optional(),
  germToFirstHarvest: germToFirstHarvestSchema.optional(),
  firstToLastHarvest: firstToLastHarvestSchema.optional()
}).describe("The annual lifecycle defines the length of the stages of life for annual plants.");
const AnnualLifeCycleProfile = Schema.Record({
  sowToGerm: Schema.Optional(Schema.Number()),
  germToTransplant: Schema.Optional(Schema.Number()),
  germToFirstHarvest: Schema.Optional(Schema.Number()),
  firstToLastHarvest: Schema.Optional(Schema.Number())
});
const lastFrostWindowOpenSchema = z.number().describe("The amount of days between the last frost and the beginning of the planting window. 			Positive values indicate the window begins after the last frost date. 			For example, a value of -15 indicates the cultivar may be planted 15 days before the last frost date.");
const lastFrostWindowCloseSchema = z.number().describe("The amount of days between the last frost and the end of the planting window. 			Positive values indicate the window begins after the last frost date. 			For example, a value of 15 indicates the cultivar must be planted before 15 days after the last frost date.");
const firstFrostWindowOpenSchema = z.number().describe("The amount of days between the first frost and the beginning of the planting window. 			Positive values indicate the window begins after the first frost date. 			For example, a value of -15 indicates the cultivar may be planted 15 days before the first frost date.");
const firstFrostWindowCloseSchema = z.number().describe("The amount of days between the first frost and the end of the planting window. 			Positive values indicate the window begins after the first frost date. 			For example, a value of 15 indicates the cultivar must be planted before 15 days after the first frost date.");
const FrostDatePlantingWindowsUpdateCommandSchema = z.object({
  lastFrostWindowOpen: lastFrostWindowOpenSchema.optional(),
  lastFrostWindowClose: lastFrostWindowCloseSchema.optional(),
  firstFrostWindowOpen: firstFrostWindowOpenSchema.optional(),
  firstFrostWindowClose: firstFrostWindowCloseSchema.optional()
}).describe("A planting window defines a period of time within an environment that a cultivar should be planted. 		These attributes define an allowed planting window of time relative to the first and last frost dates. 		These planting windows are used for incdicating within the Verdagraph when plants are suggested to be planted.");
const FrostDatePlantingWindowsProfile = Schema.Record({
  lastFrostWindowOpen: Schema.Optional(Schema.Number()),
  lastFrostWindowClose: Schema.Optional(Schema.Number()),
  firstFrostWindowOpen: Schema.Optional(Schema.Number()),
  firstFrostWindowClose: Schema.Optional(Schema.Number())
});
const transplantableSchema = z.boolean().describe("Defines whether a plant may be started as a seed in one location and transplanted to another. 		Some plants, such as carrots, don't tolerate transplants, and so must be started directly.");
const OriginUpdateCommandSchema = z.object({
  transplantable: transplantableSchema.optional()
}).describe("The origin refers to the method used to create plants.");
const OriginProfile = Schema.Record({
  transplantable: Schema.Optional(Schema.Boolean())
});
const CultivarAttributes = Schema.Record({
  annualLifeCycle: Schema.Optional(AnnualLifeCycleProfile),
  frostDatePlantingWindows: Schema.Optional(FrostDatePlantingWindowsProfile),
  origin: Schema.Optional(OriginProfile)
});
z.object({
  annualLifeCycle: AnnualLifecycleUpdateCommandSchema.optional(),
  frostDatePlantingWindows: FrostDatePlantingWindowsUpdateCommandSchema.optional(),
  osrigin: OriginUpdateCommandSchema.optional()
});
const roles = {
  anon: {
    match: {
      "x-triplit-token-type": "anon"
    }
  },
  user: {
    match: {
      type: "user",
      accountId: "$accountId",
      profileId: "$profileId",
      username: "$username"
    }
  }
};
const userSchema = Schema.Collections({
  /** User profiles. */
  profiles: {
    schema: Schema.Schema({
      id: Schema.Id(),
      /** Username. Unique and used within the app to search for users. */
      username: Schema.String(),
      /** Date of user creation. */
      createdAt: Schema.Date({ default: Schema.Default.now() })
    }),
    /** Profile objects can only be modified by the server but viewed by anyone. */
    permissions: {
      anon: {
        read: {
          filter: [true]
        }
      },
      user: {
        read: {
          filter: [true]
        }
      }
    }
  },
  /** User accounts. */
  accounts: {
    schema: Schema.Schema({
      id: Schema.Id(),
      /** The ID of the associated profile. */
      profileId: Schema.String(),
      /** Hashed password */
      passwordHash: Schema.String(),
      /** Primary email address. Only verified emails use this attribute. */
      verifiedEmail: Schema.String({ nullable: true }),
      /**
       * Secondary email. Used to avoid replacing primary email when switching emails.
       * Upon verification, should be nulled and used to set primaryEmail.
       */
      unverifiedEmail: Schema.Record({
        /** Address of the email. */
        address: Schema.String({ nullable: true, default: null }),
        /** JWT confirmation token which is sent to the user for verification. */
        token: Schema.String({ nullable: true, default: null })
      }),
      /** JWT confirmation key used to confirm a password reset. */
      passwordResetToken: Schema.String({ nullable: true, default: null }),
      /** Set to false for inactive users. */
      isActive: Schema.Boolean({ default: true })
    }),
    relationships: {
      profile: Schema.RelationById("profiles", "$profileId")
    },
    /** Accounts objects can only be modified by the server and viewed by the user. */
    permissions: {
      user: {
        read: { filter: [["id", "=", "$role.accountId"]] }
      }
    }
  }
});
const GardenVisibilityEnumOptions = ["HIDDEN", "UNLISTED", "PUBLIC"];
const GardenMembershipRoleEnumOptions = ["ADMIN", "EDITOR", "VIEWER"];
const GardenMembershipStatusEnumOptions = [
  "CREATED",
  "PENDING",
  "ACCEPTED"
];
const gardenSchema = Schema.Collections({
  ...userSchema,
  /** Garden schema. */
  gardens: {
    schema: Schema.Schema({
      /** URL-friendly shorthand - unique. */
      id: Schema.Id(),
      /** Non-unique name of the garden. */
      name: Schema.String(),
      /** Controls which non-users may view the garden. */
      visibility: Schema.String({ enum: [...GardenVisibilityEnumOptions] }),
      /** Optional description. */
      description: Schema.String({ nullable: true, default: null }),
      /** Set to false for inactive gardens. */
      isActive: Schema.Boolean({ default: true }),
      /**
       * User who created the garden.
       * Note that the creator has access through an admin membership.
       * If undefined, the original creator has left the garden.
       */
      creatorId: Schema.String({ nullable: true }),
      /** Set of users which have admin access. */
      adminIds: Schema.Set(Schema.String()),
      /** Set of users which have editing access. */
      editorIds: Schema.Set(Schema.String(), { default: Schema.Default.Set.empty() }),
      /** Set of users which have viewing access. */
      viewerIds: Schema.Set(Schema.String(), { default: Schema.Default.Set.empty() }),
      /** Date of garden creation. */
      createdAt: Schema.Date({ default: Schema.Default.now() })
    }),
    relationships: {
      creator: Schema.RelationById("profiles", "$creatorId"),
      adminMemberships: Schema.RelationMany("gardenMemberships", {
        where: [["userId", "in", "$adminIds"]]
      }),
      editorMemberships: Schema.RelationMany("gardenMemberships", {
        where: [["userId", "in", "$adminIds"]]
      }),
      viewerMemberships: Schema.RelationMany("gardenMemberships", {
        where: [["userId", "in", "$adminIds"]]
      })
    },
    permissions: {
      anon: {
        read: {
          /** Allow anonymous reads if the garden is not hidden. */
          filter: [["visibility", "!=", "HIDDEN"]]
        }
      },
      user: {
        read: {
          /** Allow reads if the garden is not hidden or the user is a member. */
          filter: [
            or([
              ["visibility", "!=", "HIDDEN"],
              ["adminIds", "has", "$role.profileId"],
              ["editorIds", "has", "$role.profileId"],
              ["viewerIds", "has", "$role.profileId"]
            ])
          ]
        },
        insert: {
          /** Allow new gardens to be created by creators. */
          filter: [["creatorId", "=", "$role.profileId"]]
        },
        update: {
          /** Restrict edit access to admins. */
          filter: [["adminIds", "has", "$role.profileId"]]
        }
      }
    }
  },
  /** Garden membership schema. */
  gardenMemberships: {
    schema: Schema.Schema({
      id: Schema.Id(),
      /** Garden the membership is in. */
      gardenId: Schema.String(),
      /** User who is the subject of the membership. */
      userId: Schema.String(),
      /** Role of the membership. */
      role: Schema.String({ enum: [...GardenMembershipRoleEnumOptions] }),
      /** User who created the membership. */
      inviterId: Schema.String({ nullable: true }),
      /** The acceptance status and acceptance date of the membership. */
      status: Schema.String({ enum: [...GardenMembershipStatusEnumOptions] }),
      acceptedAt: Schema.Date({ nullable: true, default: null }),
      /** Allows marking gardens as favorites in the menu. */
      favorite: Schema.Boolean({ default: false })
    }),
    relationships: {
      garden: Schema.RelationById("gardens", "$gardenId"),
      user: Schema.RelationById("profiles", "$userId"),
      inviter: Schema.RelationById("profiles", "$inviterId")
    },
    permissions: {
      anon: {
        read: {
          /** Allow anonymous reads if the garden is not hidden. */
          filter: [["garden.visibility", "!=", "HIDDEN"]]
        }
      },
      user: {
        read: {
          /** Allow reads if the garden is not hidden or the user is a member. */
          filter: [
            or([
              ["garden.visibility", "!=", "HIDDEN"],
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"],
              ["garden.viewerIds", "has", "$role.profileId"]
            ])
          ]
        },
        insert: {
          /** Allow new memberships to be created by admins. */
          filter: [["garden.adminIds", "has", "$role.profileId"]]
        },
        update: {
          /** Restrict membership updates to admins and subjects. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["userId", "=", "$role.profileId"]
            ])
          ]
        },
        delete: {
          /** Allow the membership to be revoked by an admin or deleted by the subject. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["userId", "=", "$role.accountId"]
            ])
          ]
        }
      }
    }
  }
});
const nameSchema = z$1.string().trim().min(2, "Must be at least 3 characters.").max(50, "May be at most 50 characters.").regex(/[0-9A-Za-z _-]+/, "Must contain only letters, numbers, spaces, underscores, and hyphens.");
const descriptionSchema = z$1.string().max(1400, "May be at most 1400 characters.");
const commonFields = { nameSchema, descriptionSchema };
const usernameSchema = z$1.string().trim().min(3, "Must be at least 3 characters.").max(50, "May be at most 50 characters.").regex(/^[a-zA-Z0-9-_]*$/, "Must contain only letters, numbers, hyphens, and underscores.").describe("Unique username to identify yourself in the application. May be changed later.");
const emailSchema = z$1.string().email("Must be a valid email address.").describe("Must be a valid email address.");
const passwordSchema = z$1.string().min(6, "Must be at least 6 characters.").max(255, "Must be at most 255 characters.").describe("Must be between 6 and 255 characters long.");
const userFields = { usernameSchema };
z$1.object({
  email: emailSchema,
  password: z$1.string()
});
z$1.object({
  email: emailSchema,
  password1: passwordSchema,
  password2: passwordSchema,
  username: usernameSchema
}).refine((data) => data.password1 == data.password2, {
  message: "Passwords must match",
  path: ["password2"]
});
z$1.object({
  newEmail: emailSchema.optional(),
  newPassword1: passwordSchema.optional(),
  newPassword2: passwordSchema.optional(),
  newUsername: usernameSchema.optional(),
  password: passwordSchema
}).refine((data) => data.newPassword1 == data.newPassword2, {
  message: "Passwords must match",
  path: ["newPassword2"]
});
z$1.object({
  email: emailSchema
});
z$1.object({
  token: z$1.string()
});
z$1.object({
  email: emailSchema
});
z$1.object({
  userId: z$1.string().nanoid(),
  token: z$1.string(),
  password1: passwordSchema,
  password2: passwordSchema
}).refine((data) => data.password1 == data.password2, {
  message: "Passwords must match",
  path: ["password2"]
});
const gardenIdSchema = z$1.string().trim().toLowerCase().min(4, "Must be at least 4 characters.").max(21, "May be at most 21 characters.").regex(/[0-9A-Za-z-]+/, "Must contain only alphanumeric characters and hyphens.").describe("Unique shorthand name for the garden used in URLs.");
const gardenNameSchema = commonFields.nameSchema.describe("Name of the garden.");
const gardenDescriptionSchema = commonFields.descriptionSchema.describe("Optional description.");
const gardenVisibilitySchema = z$1.enum(GardenVisibilityEnumOptions);
const gardenMembershipRoleSchema = z$1.enum(GardenMembershipRoleEnumOptions);
const usernameInvitesListSchema = z$1.array(userFields.usernameSchema).max(10, "A maximum of 10 users can be invited at once.");
z$1.object({
  id: gardenIdSchema,
  name: gardenNameSchema,
  description: gardenDescriptionSchema.default(""),
  visibility: gardenVisibilitySchema.default("HIDDEN"),
  adminInvites: usernameInvitesListSchema.describe("A list of usernames to invite as admins. A maximum of 10 users can be invited at once.").default([]),
  editorInvites: usernameInvitesListSchema.describe("A list of usernames to invite as editors. A maximum of 10 users can be invited at once.").default([]),
  viewerInvites: usernameInvitesListSchema.describe("A list of usernames to invite as viewers. A maximum of 10 users can be invited at once.").default([])
});
z$1.object({
  gardenId: z$1.string(),
  adminInvites: usernameInvitesListSchema.describe("A list of usernames to invite as admins.").default([]),
  editorInvites: usernameInvitesListSchema.describe("A list of usernames to invite as editors.").default([]),
  viewerInvites: usernameInvitesListSchema.describe("A list of usernames to invite as viewers.").default([])
});
z$1.object({
  gardenId: z$1.string()
});
z$1.object({
  gardenId: z$1.string()
});
z$1.object({
  gardenId: z$1.string(),
  profileId: z$1.string()
});
z$1.object({
  gardenId: z$1.string(),
  profileId: z$1.string(),
  newRole: gardenMembershipRoleSchema
});
const isUserAuthorized = (garden, profileId, role) => {
  switch (role) {
    case "ADMIN":
      if (garden.adminIds.has(profileId)) {
        return true;
      } else {
        return false;
      }
    case "EDITOR":
      if (garden.adminIds.has(profileId) || garden.editorIds.has(profileId)) {
        return true;
      } else {
        return false;
      }
    case "VIEWER":
      if (garden.adminIds.has(profileId) || garden.editorIds.has(profileId) || garden.viewerIds.has(profileId)) {
        return true;
      } else {
        return false;
      }
    default:
      return false;
  }
};
const GeometryTypeEnumOptions = [
  "RECTANGLE",
  "POLYGON",
  "ELLIPSE",
  "LINES"
];
const workspaceSchema = Schema.Collections({
  ...gardenSchema,
  /** Coordinate schema. */
  coordinates: {
    schema: Schema.Schema({
      id: Schema.Id(),
      /** Garden the entity is located within - required for access control. */
      gardenId: Schema.String(),
      /** The horizontal X component of the coordinate in meters. */
      x: Schema.Number(),
      /** The vertical Y component of the coordinate in meters. */
      y: Schema.Number(),
      /** The depth/altitude component of the coordinate in meters. */
      z: Schema.Number({ nullable: true, default: 0 }),
      /** Used to maintain ordering in sets of coordinates. */
      createdAt: Schema.Date({ default: Schema.Default.now() })
    }),
    relationships: {
      garden: Schema.RelationById("gardens", "$gardenId")
    },
    permissions: {
      anon: {
        read: {
          /** Allow anonymous reads if the garden is not hidden. */
          filter: [["garden.visibility", "!=", "HIDDEN"]]
        }
      },
      user: {
        read: {
          /** Allow reads if the garden is not hidden or the user is a member. */
          filter: [
            or([
              ["garden.visibility", "!=", "HIDDEN"],
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"],
              ["garden.viewerIds", "has", "$role.profileId"]
            ])
          ]
        },
        insert: {
          /** Allow new coordinates to be created by admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        },
        update: {
          /** Restrict coordinates updates to admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        },
        delete: {
          /** Restrict coordinates deletes to admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        }
      }
    }
  },
  /** Geometries schema. */
  geometries: {
    schema: Schema.Schema({
      id: Schema.Id(),
      /** Garden the entity is located within - required for access control. */
      gardenId: Schema.String(),
      /**
       * Describes the type of the geometry.
       * Each geometry object may be of any type. The type determines
       * which of the attributes objects is used in the application.
       * For example, if the type is 'ELLIPSE', only the ellipseAttribute
       * object is used and other attributes are ignored.
       */
      type: Schema.String({ enum: [...GeometryTypeEnumOptions] }),
      /** The date at which this geometry applies. */
      date: Schema.Date(),
      /** Scalar size multiplier. */
      scaleFactor: Schema.Number({ default: 1 }),
      /** Rotation of the geometry about its center or location, in degrees. */
      rotation: Schema.Number({ default: 0 }),
      /** Rectangular geometry attributes. */
      /** Horizontal length of the rectangle in meters. */
      rectangleLength: Schema.Number({ default: 1 }),
      /** Vertical width of the rectangle in meters. */
      rectangleWidth: Schema.Number({ default: 1 }),
      /** Polygon geometry attributes. */
      /** Number of sides to the polygon. */
      polygonNumSides: Schema.Number({ default: 3 }),
      /** Polygon radius. */
      polygonRadius: Schema.Number({ default: 1 }),
      /** Ellipe geometry attributes. */
      /** The length of the horizontal diameter in meters. */
      ellipseLength: Schema.Number({ default: 1 }),
      /** The width of the vertical diameter in meters. */
      ellipseWidth: Schema.Number({ default: 1 }),
      /** Lines geometry attributes. */
      /** A set of coordinates which describe an open or closed shape of line segments. */
      linesCoordinateIds: Schema.Set(Schema.String(), { default: Schema.Default.Set.empty() }),
      /** If true the lines form a closed shape. */
      linesClosed: Schema.Boolean({ default: true })
    }),
    relationships: {
      garden: Schema.RelationById("gardens", "$gardenId"),
      linesCoordinates: Schema.RelationMany("coordinates", {
        where: [["id", "in", "$linesCoordinateIds"]],
        order: [["createdAt", "ASC"]]
      })
    },
    permissions: {
      anon: {
        read: {
          /** Allow anonymous reads if the garden is not hidden. */
          filter: [["garden.visibility", "!=", "HIDDEN"]]
        }
      },
      user: {
        read: {
          /** Allow reads if the garden is not hidden or the user is a member. */
          filter: [
            or([
              ["garden.visibility", "!=", "HIDDEN"],
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"],
              ["garden.viewerIds", "has", "$role.profileId"]
            ])
          ]
        },
        insert: {
          /** Allow new geometries to be created by admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        },
        update: {
          /** Restrict geometry updates to admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        },
        delete: {
          /** Restrict geometry deletes to admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        }
      }
    }
  },
  /** GeometricHistory schema. */
  geometryHistories: {
    schema: Schema.Schema({
      id: Schema.Id(),
      /** Garden the entity is located within - required for access control. */
      gardenId: Schema.String(),
      /** A set of geometries which describe a history of geometric change. */
      geometryIds: Schema.Set(Schema.String())
    }),
    relationships: {
      garden: Schema.RelationById("gardens", "$gardenId"),
      geometries: Schema.RelationMany("geometries", {
        where: [["id", "in", "$geometryIds"]],
        order: [["date", "ASC"]]
      })
    },
    permissions: {
      anon: {
        read: {
          /** Allow anonymous reads if the garden is not hidden. */
          filter: [["garden.visibility", "!=", "HIDDEN"]]
        }
      },
      user: {
        read: {
          /** Allow reads if the garden is not hidden or the user is a member. */
          filter: [
            or([
              ["garden.visibility", "!=", "HIDDEN"],
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"],
              ["garden.viewerIds", "has", "$role.profileId"]
            ])
          ]
        },
        insert: {
          /** Allow new geometry history to be created by admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        },
        update: {
          /** Restrict geometry history updates to admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        },
        delete: {
          /** Restrict geometry histories deletes to admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        }
      }
    }
  },
  /** Location schema. */
  locations: {
    schema: Schema.Schema({
      id: Schema.Id(),
      /** Garden the entity is located within - required for access control. */
      gardenId: Schema.String(),
      /** The workspace the cordinate is located in. */
      workspaceId: Schema.String(),
      /** The horizontal X component of the location in meters. */
      x: Schema.Number(),
      /** The vertical Y component of the location in meters. */
      y: Schema.Number(),
      /** The depth/altitude component of the location in meters. */
      z: Schema.Number({ nullable: true, default: 0 }),
      /** The date at which the location applies. */
      date: Schema.Date()
    }),
    relationships: {
      garden: Schema.RelationById("gardens", "$gardenId"),
      workspace: Schema.RelationById("workspaces", "$workspaceId")
    },
    permissions: {
      anon: {
        read: {
          /** Allow anonymous reads if the garden is not hidden. */
          filter: [["garden.visibility", "!=", "HIDDEN"]]
        }
      },
      user: {
        read: {
          /** Allow reads if the garden is not hidden or the user is a member. */
          filter: [
            or([
              ["garden.visibility", "!=", "HIDDEN"],
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"],
              ["garden.viewerIds", "has", "$role.profileId"]
            ])
          ]
        },
        insert: {
          /** Allow new locations to be created by admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        },
        update: {
          /** Restrict locations updates to admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        },
        delete: {
          /** Restrict locations deletes to admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        }
      }
    }
  },
  /** Location history schema. */
  locationHistories: {
    schema: Schema.Schema({
      id: Schema.Id(),
      /** Garden the entity is located within - required for access control. */
      gardenId: Schema.String(),
      /** A set of locations which describe a history of locational change. */
      locationIds: Schema.Set(Schema.String()),
      /** Denormalized set of workspace IDs that are represented by the locations. */
      workspaceIds: Schema.Set(Schema.String())
    }),
    relationships: {
      garden: Schema.RelationById("gardens", "$gardenId"),
      locations: Schema.RelationMany("locations", {
        where: [["id", "in", "$locationIds"]],
        order: [["date", "ASC"]]
      })
    },
    permissions: {
      anon: {
        read: {
          /** Allow anonymous reads if the garden is not hidden. */
          filter: [["garden.visibility", "!=", "HIDDEN"]]
        }
      },
      user: {
        read: {
          /** Allow reads if the garden is not hidden or the user is a member. */
          filter: [
            or([
              ["garden.visibility", "!=", "HIDDEN"],
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"],
              ["garden.viewerIds", "has", "$role.profileId"]
            ])
          ]
        },
        insert: {
          /** Allow new location history to be created by admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        },
        update: {
          /** Restrict location history updates to admins. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        },
        delete: {
          /** Restrict location histories deletes to admins. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        }
      }
    }
  },
  /** Planting area schema. */
  plantingAreas: {
    schema: Schema.Schema({
      id: Schema.Id(),
      /** Garden the entity is located within - required for access control. */
      gardenId: Schema.String(),
      /** Name. */
      name: Schema.String(),
      /** The geometry of the planting area. */
      geometryId: Schema.String(),
      /** The location history of the planting area. */
      locationHistoryId: Schema.String(),
      /** The depth of the planting area in meters. Used to calculate volume. */
      depth: Schema.Number({ default: 0 }),
      /** Optional description. */
      description: Schema.String({ default: "" })
    }),
    relationships: {
      garden: Schema.RelationById("gardens", "$gardenId"),
      geometry: Schema.RelationById("geometries", "$geometryId"),
      locationHistory: Schema.RelationById("locationHistories", "$locationHistoryId")
    },
    permissions: {
      anon: {
        read: {
          /** Allow anonymous reads if the garden is not hidden. */
          filter: [["garden.visibility", "!=", "HIDDEN"]]
        }
      },
      user: {
        read: {
          /** Allow reads if the garden is not hidden or the user is a member. */
          filter: [
            or([
              ["garden.visibility", "!=", "HIDDEN"],
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"],
              ["garden.viewerIds", "has", "$role.profileId"]
            ])
          ]
        },
        insert: {
          /** Allow new planting areas to be created by admins. */
          filter: [["garden.adminIds", "has", "$role.profileId"]]
        },
        update: {
          /** Restrict planting area updates to admins. */
          filter: [["garden.adminIds", "has", "$role.profileId"]]
        },
        delete: {
          /** Restrict planting area deletes to admins. */
          filter: [["garden.adminIds", "has", "$role.profileId"]]
        }
      }
    }
  },
  /** Workspace schema. */
  workspaces: {
    schema: Schema.Schema({
      id: Schema.Id(),
      /** Garden the entity is located within. */
      gardenId: Schema.String(),
      /** Name of the workspace. */
      name: Schema.String(),
      /** URL-friendly shorthand of the name. */
      slug: Schema.String(),
      /** Optional description. */
      description: Schema.String({ default: "" })
    }),
    relationships: {
      garden: Schema.RelationById("gardens", "$gardenId")
    },
    permissions: {
      anon: {
        read: {
          /** Allow anonymous reads if the garden is not hidden. */
          filter: [["garden.visibility", "!=", "HIDDEN"]]
        }
      },
      user: {
        read: {
          /** Allow reads if the garden is not hidden or the user is a member. */
          filter: [
            or([
              ["garden.visibility", "!=", "HIDDEN"],
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"],
              ["garden.viewerIds", "has", "$role.profileId"]
            ])
          ]
        },
        insert: {
          /** Allow new workspaces to be created by admins. */
          filter: [["garden.adminIds", "has", "$role.profileId"]]
        },
        update: {
          /** Restrict workspace updates to admins. */
          filter: [["garden.adminIds", "has", "$role.profileId"]]
        },
        delete: {
          /** Restrict workspace deletes to admins. */
          filter: [["garden.adminIds", "has", "$role.profileId"]]
        }
      }
    }
  }
});
const minimumAnnualTempSchema = z.number().describe("The minimum temperature that is expected to occur within a year in the environment.");
const maximumAnnualTempSchema = z.number().describe("The maxmium temperature that is expected to occur within a year in the environment.");
const AnnualTemperatureUpdateCommandSchema = z.object({
  minimum: minimumAnnualTempSchema.optional(),
  maximum: maximumAnnualTempSchema.optional()
}).describe("Defines the expected range of temperatures over a year.");
const AnnualTemperatureProfile = Schema.Record({
  minimum: Schema.Optional(Schema.Number()),
  maximum: Schema.Optional(Schema.Number())
});
const lastFrostDateSchema = z.date().describe("The date within the environment when the last frost of the year is expected to occur.");
const firstFrostDateSchema = z.date().describe("The date within the environment when the first frost of the year is expected to occur.");
const FrostDatesUpdateCommandSchema = z.object({
  lastFrostDate: lastFrostDateSchema.optional(),
  firstFrostDate: firstFrostDateSchema.optional()
}).describe("Defines when the first and last frost are expected to occur within a year.");
const FrostDateProfile = Schema.Record({
  lastFrostDate: Schema.Optional(Schema.Date()),
  firstFrostDate: Schema.Optional(Schema.Date())
});
const EnvironmentAttributes = Schema.Record({
  frostDates: Schema.Optional(FrostDateProfile),
  annualTemperature: Schema.Optional(AnnualTemperatureProfile)
});
z.object({
  frostDates: FrostDatesUpdateCommandSchema.optional(),
  annualTemperature: AnnualTemperatureUpdateCommandSchema.optional()
});
const EnvironmentParentTypeEnumOptions = [
  "GARDEN",
  "WORKSPACE",
  "PLANTING_AREA",
  "INDEPENDENT"
];
const environmentSchema = Schema.Collections({
  ...workspaceSchema,
  /** Environment schema. */
  environments: {
    schema: Schema.Schema({
      id: Schema.Id(),
      /** Non-unique name of the environment. */
      name: Schema.String(),
      /** Optional description. */
      description: Schema.String({ default: "" }),
      /** Type of the parent entity of the environment. */
      parentType: Schema.String({
        enum: [...EnvironmentParentTypeEnumOptions],
        default: "GARDEN"
      }),
      /** Garden the environment exists in. Defined regardless of parentType. */
      gardenId: Schema.String(),
      /** The workspaces the environment applies to. Defined only if parentType = 'WORKSPACE'. */
      workspaceIds: Schema.Optional(Schema.Set(Schema.String())),
      /** The planting areas the environment applies to. Defined only if parentType = 'PLANTING_AREA'. */
      plantingAreaIds: Schema.Optional(Schema.Set(Schema.String())),
      /** The geometry the environment applies to. Defined only if parentType = 'INDEPENDENT'. */
      geometryHistoryId: Schema.Optional(Schema.String()),
      /** The locations the environment geometry exists at. Defined only if parentType = 'INDEPENDENT'. */
      locationHistoryId: Schema.Optional(Schema.String()),
      /**
       * If true, the environment will inherit the attributes of the environments
       * defined at higher levels, eg., that of a planting area in a workspace.
       */
      inherit: Schema.Boolean({ default: true }),
      attributes: EnvironmentAttributes
    }),
    relationships: {
      garden: Schema.RelationById("gardens", "$gardenId"),
      workspaces: Schema.RelationMany("workspaces", {
        where: [["id", "in", "$workspaceIds"]]
      }),
      plantingAreas: Schema.RelationMany("plantingAreas", {
        where: [["id", "in", "$plantingAreaIds"]]
      }),
      geometriHistory: Schema.RelationById("geometryHistories", "$geometryHistoryId"),
      locationHistory: Schema.RelationById("locationHistories", "$locationHistoryId")
    },
    permissions: {
      anon: {
        read: {
          /** Allow anonymous reads if the garden is not hidden. */
          filter: [["garden.visibility", "!=", "HIDDEN"]]
        }
      },
      user: {
        read: {
          /** Allow reads if the garden is not hidden or the user is a member. */
          filter: [
            or([
              ["garden.visibility", "!=", "HIDDEN"],
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"],
              ["garden.viewerIds", "has", "$role.profileId"]
            ])
          ]
        },
        insert: {
          /** Allow new environments to be created by admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        },
        update: {
          /** Restrict environment updates to admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        },
        delete: {
          /** Restrict environment deletes to admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        }
      }
    }
  }
});
const OriginEnumOptions = [
  "DIRECT_SEED",
  "SEED_TO_TRANSPLANT",
  "SEEDLING_TO_TRANSPLANT"
];
const HarvestQualityEnumOptions = [
  "COMPOST",
  "LOW",
  "MEDIUM",
  "HIGH",
  "PERFECT"
];
const plantSchema = Schema.Collections({
  ...environmentSchema,
  /** Harvest schema. */
  harvests: {
    schema: Schema.Schema({
      id: Schema.Id(),
      /** Garden the entity is located within - required for access control. */
      gardenId: Schema.String(),
      /** The date of the harvest. */
      date: Schema.Date(),
      /** The mass of the harvest in kilograms. */
      mass: Schema.Optional(Schema.Number()),
      /**
       * The number of units. This may differ in meaning depending on the plant.
       * For example, for carrots, it could mean the number of roots.
       * For lettuce, it could mean the number of leaves.
       */
      units: Schema.Optional(Schema.Number()),
      /** The quality of the harvest. */
      quality: Schema.Optional(Schema.String({ enum: [...HarvestQualityEnumOptions] })),
      /** Optional description. */
      description: Schema.String({ default: "" })
    }),
    relationships: {
      garden: Schema.RelationById("gardens", "$gardenId")
    },
    permissions: {
      anon: {
        read: {
          /** Allow anonymous reads if the garden is not hidden. */
          filter: [["garden.visibility", "!=", "HIDDEN"]]
        }
      },
      user: {
        read: {
          /** Allow reads if the garden is not hidden or the user is a member. */
          filter: [
            or([
              ["garden.visibility", "!=", "HIDDEN"],
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"],
              ["garden.viewerIds", "has", "$role.profileId"]
            ])
          ]
        },
        insert: {
          /** Allow new harvests to be created by admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        },
        update: {
          /** Restrict harvest updates to admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        },
        delete: {
          /** Restrict harvest deletes to admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        }
      }
    }
  },
  /** Lifespan schema. */
  lifespans: {
    schema: Schema.Schema({
      id: Schema.Id(),
      /** Garden the entity is located within - required for access control. */
      gardenId: Schema.String(),
      /** The origin of the lifespan. */
      origin: Schema.String({ enum: [...OriginEnumOptions] }),
      /** The geometries of the lifespan. */
      geometryHistoryId: Schema.Optional(Schema.String()),
      /** The locations of the lifespan& */
      locationHistoryId: Schema.Optional(Schema.String()),
      /** The dates of the lifespan. */
      dates: Schema.Record({
        /** The date at which the plant is seeded. */
        seedDate: Schema.Optional(Schema.Date()),
        /** The date at which the seed germinated. */
        germDate: Schema.Optional(Schema.Date()),
        /** The date at which the plant is removed from the space. */
        expiryDate: Schema.Optional(Schema.Date()),
        /**
         * This is defined only for biennial or perennial plants.
         * A set of dates which the plant became dormant until the following year.
         * For example, includes the dates a berry bush has stopped producing fruit and vegetation.
         */
        dormancyDates: Schema.Optional(Schema.Set(Schema.Date())),
        /**
         * This is defined only for biennial or perennial plants.
         * A set of dates which the plant exited dormancy for the year.
         * For example, includes the dates a berry bush has begun vegetative growth again.
         */
        growthDates: Schema.Optional(Schema.Set(Schema.Date()))
      }),
      /** A set of harvests over the lifespan. */
      harvestIds: Schema.Set(Schema.String())
    }),
    relationships: {
      garden: Schema.RelationById("gardens", "$gardenId"),
      geometryHistory: Schema.RelationById("geometryHistories", "$geometryHistoryId"),
      locationHistory: Schema.RelationById("locationHistories", "$locationHistoryId"),
      harvests: Schema.RelationMany("harvests", { where: [["id", "in", "$harvestIds"]] })
    },
    permissions: {
      anon: {
        read: {
          /** Allow anonymous reads if the garden is not hidden. */
          filter: [["garden.visibility", "!=", "HIDDEN"]]
        }
      },
      user: {
        read: {
          /** Allow reads if the garden is not hidden or the user is a member. */
          filter: [
            or([
              ["garden.visibility", "!=", "HIDDEN"],
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"],
              ["garden.viewerIds", "has", "$role.profileId"]
            ])
          ]
        },
        insert: {
          /** Allow new lifespans to be created by admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        },
        update: {
          /** Restrict lifespans updates to admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        },
        delete: {
          /** Restrict lifespans deletes to admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        }
      }
    }
  },
  /** Plant schema. */
  plants: {
    schema: Schema.Schema({
      id: Schema.Id(),
      /** Garden the entity is located within - required for access control. */
      gardenId: Schema.String(),
      /**
       * The name correlating with one of the common names specified by a cultivar.
       * Will match the plant with a cultivar in one of the garden's cultivar collections.
       */
      cultivarName: Schema.String(),
      /** A set of cultivar attributes to override those from the collections. */
      cultivarAttributes: CultivarAttributes,
      /** Lifespan attributes populated from the expected attributes based on the cultivar. */
      expectedLifespanId: Schema.String(),
      /** Lifespan attributes populated by observations of users. */
      recordedLifespanId: Schema.String(),
      /** If true, this plant entity represents multiple distinct plants which are managed together. */
      aggregate: Schema.Boolean({ default: false })
    }),
    relationships: {
      garden: Schema.RelationById("gardens", "$gardenId"),
      expectedLifespan: Schema.RelationById("lifespans", "$expectedLifespanId"),
      recordedLifespan: Schema.RelationById("lifespans", "$recordedLifespanId")
    },
    permissions: {
      anon: {
        read: {
          /** Allow anonymous reads if the garden is not hidden. */
          filter: [["garden.visibility", "!=", "HIDDEN"]]
        }
      },
      user: {
        read: {
          /** Allow reads if the garden is not hidden or the user is a member. */
          filter: [
            or([
              ["garden.visibility", "!=", "HIDDEN"],
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"],
              ["garden.viewerIds", "has", "$role.profileId"]
            ])
          ]
        },
        insert: {
          /** Allow new location history to be created by admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        },
        update: {
          /** Restrict location history updates to admins. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        },
        delete: {
          /** Restrict location histories deletes to admins. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        }
      }
    }
  },
  /** Plant groups. */
  plantGroups: {
    schema: Schema.Schema({
      id: Schema.Id(),
      /** Garden the entity is located within - required for access control. */
      gardenId: Schema.String(),
      /** Name. */
      name: Schema.String(),
      /** A set of plants contained with the group. */
      plantIds: Schema.Set(Schema.String()),
      /** Optional description. */
      description: Schema.String({ default: "" })
    }),
    relationships: {
      garden: Schema.RelationById("gardens", "$gardenId"),
      plants: Schema.RelationMany("plants", { where: [["id", "in", "$plantIds"]] })
    },
    permissions: {
      anon: {
        read: {
          /** Allow anonymous reads if the garden is not hidden. */
          filter: [["garden.visibility", "!=", "HIDDEN"]]
        }
      },
      user: {
        read: {
          /** Allow reads if the garden is not hidden or the user is a member. */
          filter: [
            or([
              ["garden.visibility", "!=", "HIDDEN"],
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"],
              ["garden.viewerIds", "has", "$role.profileId"]
            ])
          ]
        },
        insert: {
          /** Allow new location history to be created by admins and editors. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        },
        update: {
          /** Restrict location history updates to admins. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        },
        delete: {
          /** Restrict location histories deletes to admins. */
          filter: [
            or([
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"]
            ])
          ]
        }
      }
    }
  }
});
const workspaceNameSchema = commonFields.nameSchema.describe("Name of the workspace. Must be unique within a garden.");
const workspaceDescriptionSchema = commonFields.descriptionSchema.describe("Optional description.");
const plantingAreaNameSchema = commonFields.nameSchema.describe("The name of the planting area.");
const plantingAreaDescriptionSchema = commonFields.descriptionSchema.describe("Optional description.");
const plantingAreaDepthSchema = z$1.number().min(0, "May not be negative").max(1e3, "May be at most 1000m.").describe("The depth of the planting area.");
const coordinateXSchema = z$1.number().min(-1e6, "Limited to 1 000 000 meters.").max(1e6, "Limited to 1 000 000 meters.").describe("The horizontal X component of the coordinate.");
const coordinateYSchema = z$1.number().min(-1e6, "Limited to 1 000 000 meters.").max(1e6, "Limited to 1 000 000 meters.").describe("The vertical Y component of the coordinate.");
const coordinateSchema = z$1.object({
  x: coordinateXSchema,
  y: coordinateYSchema
}).describe("A position relative to the origin of a workspace or a geometry.");
const locationDateSchema = z$1.date().describe("The date at which the location applies.");
const geometryTypeSchema = z$1.enum(GeometryTypeEnumOptions).describe("Describes the type of geometry. Each type has a unique set of attributes associated with it.");
const geometryDateSchema = z$1.date().describe("The date at which the geometry applies to the object.");
const geometryScaleFactorSchema = z$1.number().min(0.01, "Must be at least 1%.").max(100, "May be at most 10000%").describe("Factor used to scale the geometry up or down. Must be within 1 and 1000 percent.");
const geometryRotationSchema = z$1.number().min(-360, "Must be at least negative 360 degrees.").max(360, "May be at most 360 degrees.").describe("The rotation of the geometry in degrees. Must be between 0 and 360 degrees.");
const geometryRectangleLengthSchema = z$1.number().min(0.01, "May not be negative or zero.").max(1e3, "May be at most 1000m").describe("The horizontal, or x-axis length of the rectangle.");
const geometryRectangleWidthSchema = z$1.number().min(0.01, "May not be negative or zero.").max(1e3, "May be at most 1000m").describe("The vertical, or y-axis width of the rectangle.");
const geometryPolygonNumSidesSchema = z$1.number().min(3, "Must have at least 3 sides.").max(20, "May have at most 20 sides.").describe("The amount of sides the polygon has.");
const geometryPolygonRadiusSchema = z$1.number().min(0.01, "May not be negative or zero.").max(1e3, "May be at most 1000m").describe("The distance from the center to any vertex of the polygon.");
const geometryEllipseLengthSchema = z$1.number().min(0.01, "May not be negative or zero.").max(1e3, "May be at most 1000m.").describe("The horizontal, or x-axis diameter of the ellipse.");
const geometryEllipseWidthSchema = z$1.number().min(0.01, "May not be negative or zero.").max(1e3, "May be at most 1000m").describe("The vertical, or y-axis diameter of the ellipse. Must be between 0 and 1000 meters.");
const geometryLinesCoordinatesSchema = z$1.array(coordinateSchema).min(3, "Must have at least 3 points.").describe("A list of coordinates relative to the position of the geometry which define an irregular polygonal.");
const geometryLinesClosedSchema = z$1.boolean().describe("If true, the line segments form a closed shape.");
const workspaceFields = {
  plantingAreaNameSchema,
  plantingAreaDescriptionSchema,
  plantingAreaDepthSchema,
  coordinateSchema,
  locationDateSchema,
  geometryTypeSchema,
  geometryDateSchema,
  geometryScaleFactorSchema,
  geometryRotationSchema,
  geometryRectangleLengthSchema,
  geometryRectangleWidthSchema,
  geometryPolygonNumSidesSchema,
  geometryPolygonRadiusSchema,
  geometryEllipseLengthSchema,
  geometryEllipseWidthSchema,
  geometryLinesClosedSchema
};
const LocationCreateCommandSchema = z$1.object({
  gardenId: z$1.string(),
  workspaceId: z$1.string(),
  coordinate: coordinateSchema,
  date: locationDateSchema
});
z$1.object({
  id: z$1.string(),
  workspaceId: z$1.string(),
  coordinate: coordinateSchema,
  date: locationDateSchema
});
z$1.object({
  coordinate: coordinateSchema.optional(),
  date: locationDateSchema.optional(),
  workspaceId: z$1.string().optional(),
  delete: z$1.boolean().optional()
});
const GeometryCreateCommandSchema = z$1.object({
  type: geometryTypeSchema.default("RECTANGLE"),
  date: geometryDateSchema,
  scaleFactor: geometryScaleFactorSchema.default(1),
  rotation: geometryRotationSchema.default(0),
  rectangleLength: geometryRectangleLengthSchema.default(1),
  rectangleWidth: geometryRectangleWidthSchema.default(1),
  polygonNumSides: geometryPolygonNumSidesSchema.default(3),
  polygonRadius: geometryPolygonRadiusSchema.default(1),
  ellipseLength: geometryEllipseLengthSchema.default(1),
  ellipseWidth: geometryEllipseWidthSchema.default(1),
  linesCoordinates: geometryLinesCoordinatesSchema.default([
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 0 }
  ]),
  linesClosed: geometryLinesClosedSchema.default(true)
});
z$1.object({
  type: geometryTypeSchema.optional(),
  date: geometryDateSchema.optional(),
  scaleFactor: geometryScaleFactorSchema.optional(),
  rotation: geometryRotationSchema.optional(),
  rectangleLength: geometryRectangleLengthSchema.optional(),
  rectangleWidth: geometryRectangleWidthSchema.optional(),
  polygonNumSides: geometryPolygonNumSidesSchema.optional(),
  polygonRadius: geometryPolygonRadiusSchema.optional(),
  ellipseLength: geometryEllipseLengthSchema.optional(),
  ellipseWidth: geometryEllipseWidthSchema.optional(),
  linesCoordinates: geometryLinesCoordinatesSchema.optional(),
  linesClosed: geometryLinesClosedSchema.optional(),
  delete: z$1.boolean().optional()
});
z$1.object({
  gardenId: z$1.string(),
  name: workspaceNameSchema,
  description: workspaceDescriptionSchema.optional()
});
z$1.object({
  name: workspaceNameSchema.optional(),
  description: workspaceDescriptionSchema.optional()
});
const PlantingAreaCreateCommandSchema = z$1.object({
  gardenId: z$1.string(),
  workspaceId: z$1.string(),
  name: plantingAreaNameSchema,
  description: plantingAreaDescriptionSchema.default(""),
  location: LocationCreateCommandSchema,
  geometry: GeometryCreateCommandSchema,
  depth: plantingAreaDepthSchema.default(0)
});
z$1.object({
  name: plantingAreaNameSchema.optional(),
  description: plantingAreaDescriptionSchema.optional(),
  depth: plantingAreaDepthSchema.optional()
});
function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}
function historySelect(items, date) {
  if (items.length === 0) {
    return null;
  }
  const time = date.getTime();
  const sortedItems = [...items].sort((a, b) => a.date.getTime() - b.date.getTime());
  if (time < sortedItems[0].date.getTime()) {
    return null;
  }
  if (time >= sortedItems[sortedItems.length - 1].date.getTime()) {
    return sortedItems[sortedItems.length - 1];
  }
  for (let i = 0; i < sortedItems.length - 1; i++) {
    const currentTime = sortedItems[i].date.getTime();
    const nextTime = sortedItems[i + 1].date.getTime();
    if (time >= currentTime && time < nextTime) {
      return sortedItems[i];
    }
  }
  return null;
}
function historySelectDay(items, date) {
  return [...items].find((item) => isSameDay(item.date, date)) || null;
}
class AppError extends Error {
  defaultMessage = "A failure has occurred.";
  details = {};
  constructor(message, errors) {
    if (message) {
      super(message);
    } else {
      super("");
      this.message = this.defaultMessage;
    }
    if (errors) {
      if (errors.fieldErrors) {
        this.details["fieldErrors"] = errors.fieldErrors;
      }
      if (errors.nonFieldErrors) {
        this.details["nonFieldErrors"] = errors.nonFieldErrors;
      }
      if (errors.nonFormErrors) {
        this.details["nonFormErrors"] = errors.nonFormErrors;
      }
    }
  }
}
async function geometryCreate(gardenId2, data, transaction) {
  const coordinateIds = [];
  if (data.linesCoordinates && data.type === "LINES") {
    for (const point of data.linesCoordinates) {
      const coordinate = await transaction.insert("coordinates", {
        gardenId: gardenId2,
        x: point.x,
        y: point.y
      });
      coordinateIds.push(coordinate.id);
    }
  }
  const geometry = {
    gardenId: gardenId2,
    type: data.type,
    date: data.date,
    scaleFactor: data.scaleFactor,
    rotation: data.rotation,
    rectangleLength: data.rectangleLength,
    rectangleWidth: data.rectangleWidth,
    polygonNumSides: data.polygonNumSides,
    polygonRadius: data.polygonRadius,
    ellipseLength: data.ellipseLength,
    ellipseWidth: data.ellipseWidth,
    linesCoordinateIds: new Set(coordinateIds),
    linesClosed: data.linesClosed
  };
  return await transaction.insert("geometries", geometry);
}
async function geometryUpdate(id, data, ctx) {
  const geometry = await ctx.triplit.fetchOne(ctx.triplit.query("geometries").Id(id));
  if (!geometry) {
    throw new AppError("Geometry does not exist.", {
      nonFormErrors: ["Failed to update object geometry."]
    });
  }
  if (data.delete) {
    await ctx.triplit.delete("geometries", id);
    return;
  }
  await ctx.triplit.transact(async (transaction) => {
    let existingCoordinateIds = [...geometry.linesCoordinateIds];
    if (data.linesCoordinates) {
      const newCoordinatesCount = data.linesCoordinates.length;
      const minLength = Math.min(existingCoordinateIds.length, newCoordinatesCount);
      for (let i = 0; i < minLength; i++) {
        const coordinateId = existingCoordinateIds[i];
        await transaction.update("coordinates", coordinateId, (coordinate) => {
          if (data.linesCoordinates) {
            coordinate.x = data.linesCoordinates[i].x;
            coordinate.y = data.linesCoordinates[i].y;
          }
        });
      }
      if (existingCoordinateIds.length > newCoordinatesCount) {
        const coordinatesToDelete = existingCoordinateIds.slice(newCoordinatesCount);
        for (const coordinateId of coordinatesToDelete) {
          await transaction.delete("coordinates", coordinateId);
        }
        existingCoordinateIds = existingCoordinateIds.slice(0, newCoordinatesCount);
      }
      if (newCoordinatesCount > existingCoordinateIds.length) {
        const newPoints = data.linesCoordinates.slice(existingCoordinateIds.length);
        for (const point of newPoints) {
          const coordinate = await transaction.insert("coordinates", {
            gardenId: geometry.gardenId,
            x: point.x,
            y: point.y
          });
          existingCoordinateIds.push(coordinate.id);
        }
      }
    }
    await transaction.update("geometries", geometry.id, (geometry2) => {
      if (data.type) {
        geometry2.type = data.type;
      }
      if (data.date) {
        geometry2.date = data.date;
      }
      if (data.scaleFactor) {
        geometry2.scaleFactor = data.scaleFactor;
      }
      if (data.rotation) {
        geometry2.rotation = data.rotation;
      }
      if (data.rectangleLength) {
        geometry2.rectangleLength = data.rectangleLength;
      }
      if (data.rectangleWidth) {
        geometry2.rectangleWidth = data.rectangleWidth;
      }
      if (data.polygonNumSides) {
        geometry2.polygonNumSides = data.polygonNumSides;
      }
      if (data.polygonRadius) {
        geometry2.polygonRadius = data.polygonRadius;
      }
      if (data.ellipseLength) {
        geometry2.ellipseLength = data.ellipseLength;
      }
      if (data.ellipseWidth) {
        geometry2.ellipseWidth = data.ellipseWidth;
      }
      if (data.linesCoordinates) {
        geometry2.linesCoordinateIds = new Set(existingCoordinateIds);
      }
      if (data.linesClosed) {
        geometry2.linesClosed = data.linesClosed;
      }
    });
  });
}
async function locationHistoryCreate(data, transaction) {
  const location2 = await transaction.insert("locations", {
    gardenId: data.gardenId,
    workspaceId: data.workspaceId,
    x: data.coordinate.x,
    y: data.coordinate.y,
    date: data.date
  });
  return await transaction.insert("locationHistories", {
    gardenId: data.gardenId,
    locationIds: /* @__PURE__ */ new Set([location2.id]),
    workspaceIds: /* @__PURE__ */ new Set([data.workspaceId])
  });
}
async function locationUpdate(id, data, ctx) {
  const location2 = await ctx.triplit.fetchOne(ctx.triplit.query("locations").Id(id));
  if (!location2) {
    throw new AppError("Location does not exist.", {
      nonFormErrors: ["Failed to update object location."]
    });
  }
  if (data.delete) {
    await ctx.triplit.delete("locations", id);
    return;
  }
  await ctx.triplit.update("locations", id, (location3) => {
    if (data.coordinate) {
      location3.x = data.coordinate.x;
      location3.y = data.coordinate.y;
    }
    if (data.date) {
      location3.date = data.date;
    }
    if (data.workspaceId) {
      location3.workspaceId = data.workspaceId;
    }
  });
}
async function locationHistoryUpdate(data, ctx) {
  const locationHistory = await ctx.triplit.fetchOne(ctx.triplit.query("locationHistories").Id(data.id).Include("locations"));
  if (!locationHistory) {
    throw new AppError("Location history does not exist.", {
      nonFormErrors: ["Failed to update object location."]
    });
  }
  const existingLocation = historySelectDay(locationHistory.locations, data.date);
  if (existingLocation) {
    await ctx.triplit.update("locations", existingLocation.id, (location2) => {
      location2.x = data.coordinate.x;
      location2.y = data.coordinate.y;
    });
  } else {
    await ctx.triplit.transact(async (transaction) => {
      const location2 = await transaction.insert("locations", {
        gardenId: locationHistory.gardenId,
        workspaceId: data.workspaceId,
        x: data.coordinate.x,
        y: data.coordinate.y,
        date: data.date
      });
      await transaction.update("locationHistories", locationHistory.id, (locationHistory2) => {
        locationHistory2.locationIds.add(location2.id);
        if (!locationHistory2.workspaceIds.has(data.workspaceId)) {
          locationHistory2.workspaceIds.add(data.workspaceId);
        }
      });
    });
  }
}
async function locationHistoryExtend(id, data, ctx) {
  const locationHistory = await ctx.triplit.fetchOne(ctx.triplit.query("locationHistories").Id(id).Include("locations"));
  if (!locationHistory) {
    throw new AppError("Location history does not exist.", {
      nonFormErrors: ["Failed to update object location."]
    });
  }
  const nearestLocation = historySelectDay(locationHistory.locations, data.date) || locationHistory.locations[locationHistory.locations.length - 1] || { x: 0, y: 0 };
  await ctx.triplit.transact(async (transaction) => {
    const location2 = await transaction.insert("locations", {
      gardenId: locationHistory.gardenId,
      workspaceId: nearestLocation.workspaceId,
      x: nearestLocation.x,
      y: nearestLocation.y,
      date: data.date
    });
    await transaction.update("locationHistories", id, (locationHistory2) => {
      locationHistory2.locationIds.add(location2.id);
    });
  });
}
async function plantingAreaCreate(data, ctx) {
  const { garden } = await ctx.requireRole(data.gardenId, "PlantingAreaCreate");
  const workspace = await ctx.triplit.fetchOne(ctx.triplit.query("workspaces").Id(data.workspaceId));
  if (workspace == null) {
    throw new AppError(`Failed to retrieve workspace ${data.workspaceId}`, {
      nonFormErrors: ["Failed to retrieve workspace."]
    });
  }
  await ctx.triplit.transact(async (transaction) => {
    const geometry = await geometryCreate(data.gardenId, data.geometry, transaction);
    const locationHistory = await locationHistoryCreate(data.location, transaction);
    await transaction.insert("plantingAreas", {
      gardenId: garden.id,
      name: data.name,
      description: data.description || "",
      geometryId: geometry.id,
      locationHistoryId: locationHistory.id,
      depth: data.depth
    });
  });
}
async function plantingAreaUpdate(id, data, ctx) {
  const plantingArea = await ctx.triplit.fetchOne(ctx.triplit.query("plantingAreas").Id(id));
  if (plantingArea == null) {
    throw new AppError(`Failed to retrieve planting area ${id}`, {
      nonFormErrors: ["Failed to retrieve planting area."]
    });
  }
  await ctx.triplit.update("plantingAreas", id, (plantingArea2) => {
    if (data.name) {
      plantingArea2.name = data.name;
    }
    if (data.description) {
      plantingArea2.description = data.description;
    }
    if (data.depth) {
      plantingArea2.depth = data.depth;
    }
  });
}
const CultivarCollectionVisibilityEnumOptions = [
  "HIDDEN",
  "UNLISTED",
  "PUBLIC"
];
Schema.Collections({
  ...environmentSchema,
  /** Collection schema. */
  cultivarCollections: {
    schema: Schema.Schema({
      /** URL-friendly shorthand - unique. */
      id: Schema.Id(),
      /** Non-unique name of the collection. */
      name: Schema.String(),
      /** Unique URL slug. */
      slug: Schema.String(),
      /** Visibility of the collection.  */
      visibility: Schema.String({ enum: [...CultivarCollectionVisibilityEnumOptions] }),
      /** If defined, the collection is owned by a user. */
      userId: Schema.String(),
      /** If defined, the colletcion is owned by a garden. Overrides user ownership. */
      gardenId: Schema.String(),
      /** Optional description. */
      description: Schema.String({ default: "" }),
      /** Optional parent collection to derive attributes from. */
      parentId: Schema.String({ nullable: true, default: null })
    }),
    relationships: {
      user: Schema.RelationById("profiles", "userId"),
      garden: Schema.RelationById("gardens", "$gardenId"),
      parent: Schema.RelationById("cultivarCollections", "$parentId")
    },
    permissions: {
      anon: {
        read: {
          /** Allow anonymous reads if the collection is not hidden. */
          filter: [["visibility", "!=", "HIDDEN"]]
        }
      },
      user: {
        read: {
          /** Allow reads if the collection is not hidden,
           *  the garden is defined and the user is a member,
           *  or the user is defined and the user is the owner. */
          filter: [
            or([
              ["visibility", "!=", "HIDDEN"],
              ["userId", "=", "$role.profileId"],
              ["garden.adminIds", "has", "$role.profileId"],
              ["garden.editorIds", "has", "$role.profileId"],
              ["garden.viewerIds", "has", "$role.profileId"]
            ])
          ]
        },
        insert: {
          /**
           * Allow new collections to be created:
           * if the garden is defined, the user must be an admin in the garden.
           * Otherwise, the user can create their own collections.
           */
          filter: [
            or([
              ["userId", "=", "$role.profileId"],
              ["garden.adminIds", "has", "$role.profileId"]
            ])
          ]
        },
        update: {
          /**
           * Allow collections to be update:
           * if the garden is defined, the user must be an admin in the garden.
           * Otherwise, the user can update their own collections.
           */
          filter: [
            or([
              ["userId", "=", "$role.profileId"],
              ["garden.adminIds", "has", "$role.profileId"]
            ])
          ]
        },
        delete: {
          /**
           * Allow collections to be deleted:
           * if the garden is defined, the user must be an admin in the garden.
           * Otherwise, the user can deleted their own collections.
           */
          filter: [
            or([
              ["userId", "=", "$role.profileId"],
              ["garden.adminIds", "has", "$role.profileId"]
            ])
          ]
        }
      }
    }
  },
  /** Cultivar schema. */
  cultivars: {
    schema: Schema.Schema({
      id: Schema.Id(),
      /** Collection the cultivar is in. */
      collectionId: Schema.String(),
      /** A list of common names. Used to match plants to cultivars. */
      names: Schema.Set(Schema.String()),
      /** Shorthand. */
      abbreviation: Schema.String(),
      /** Optional scientific name. */
      scientificName: Schema.Optional(Schema.String()),
      /** Optional description. */
      description: Schema.String({ default: "" }),
      /** Optional parent cultivar to derive attributes from. */
      parentId: Schema.String({ nullable: true, default: null }),
      /** Attributes which define this cultivar. */
      attributes: CultivarAttributes
    }),
    relationships: {
      collection: Schema.RelationById("cultivarCollections", "$collectionId"),
      parent: Schema.RelationById("cultivars", "$parentId")
    },
    permissions: {
      anon: {
        read: {
          /** Allow anonymous reads if the collection is not hidden. */
          filter: [["collection.visibility", "!=", "HIDDEN"]]
        }
      },
      user: {
        read: {
          /** Allow reads if the collection is not hidden,
           *  the garden is defined and the user is a member,
           *  or the user is defined and the user is the owner. */
          filter: [
            or([
              ["collection.visibility", "!=", "HIDDEN"],
              ["collection.userId", "=", "$role.profileId"],
              ["collection.garden.adminIds", "has", "$role.profileId"],
              ["collection.garden.editorIds", "has", "$role.profileId"],
              ["collection.garden.viewerIds", "has", "$role.profileId"]
            ])
          ]
        },
        insert: {
          /**
           * Allow new cultivars to be created:
           * if the garden is defined, the user must be an admin in the garden.
           * Otherwise, the user can create their own collections.
           */
          filter: [
            or([
              ["collection.userId", "=", "$role.profileId"],
              ["collection.garden.adminIds", "has", "$role.profileId"]
            ])
          ]
        },
        update: {
          /**
           * Allow cultivars to be update:
           * if the garden is defined, the user must be an admin in the garden.
           * Otherwise, the user can update their own collections.
           */
          filter: [
            or([
              ["collection.userId", "=", "$role.profileId"],
              ["collection.garden.adminIds", "has", "$role.profileId"]
            ])
          ]
        },
        delete: {
          /**
           * Allow cultivars to be deleted:
           * if the garden is defined, the user must be an admin in the garden.
           * Otherwise, the user can deleted their own collections.
           */
          filter: [
            or([
              ["collection.userId", "=", "$role.profileId"],
              ["collection.garden.adminIds", "has", "$role.profileId"]
            ])
          ]
        }
      }
    }
  }
});
const cultivarNameSchema = z.string().trim().min(3, "Must be at least 3 characters.").max(30, "May be at most 30 characters.").regex(/^[0-9A-Za-z _-]+$/, "Must contain only letters, numbers, spaces, hyphens, and underscores.").describe("A common name of this plant species.");
const cultivarNamesSchema = z.array(cultivarNameSchema).min(1, "Must contain at least 1 name.").max(10, "May contain at most 10 names.").describe("A set of common names associated with this plant species.");
const cultivarAbbreviationSchema = z.string().trim().min(1, "Must be at least 1 character.").max(6, "May be at most 6 characters.").regex(/^[0-9A-Za-z]+$/, "Must contain only alphanumeric characters.").describe("A very short abbreviation for this plant species.");
const cultivarScientificNameSchema = z.string().trim().max(60, "May be at most 60 characters.").describe("The scientific name of this plant species.");
const cultivarDescriptionSchema = commonFields.descriptionSchema.describe("Optional description.");
const cultivarCollectionNameSchema = commonFields.descriptionSchema.describe("The name of the collection.");
const cultivarCollectionDescriptionSchema = commonFields.descriptionSchema.describe("Optional description.");
const cultivarCollectionVisibilitySchema = z.enum(CultivarCollectionVisibilityEnumOptions).describe("Public collections may be viewed by anyone and are publicly searchable.             Unlisted collections may be viewed by anyone with the link.             Private collections may only be accessed by the creator or members of the associated garden.");
const cultivarCollectionTagSchema = z.string().trim().max(150, "Must be at most 150 characters.").regex(/^[0-9A-Za-z ]+$/, "Must contain only alphanumeric characters and spaces.").describe("A metadata tag.");
const cultivarCollectionTagsSchema = z.array(cultivarCollectionTagSchema).max(150, "Must contain at most 150 tags.").describe("A set of metadata tags.");
z.object({
  collectionId: z.string(),
  names: cultivarNamesSchema,
  abbreviation: cultivarAbbreviationSchema,
  scientificName: cultivarScientificNameSchema.optional(),
  description: cultivarDescriptionSchema.default(""),
  parentId: z.string().optional()
});
z.object({
  name: cultivarCollectionNameSchema,
  visibility: cultivarCollectionVisibilitySchema.default("HIDDEN"),
  description: cultivarCollectionDescriptionSchema.default(""),
  tags: cultivarCollectionTagsSchema.default([]),
  parentId: z.string().optional(),
  gardenId: z.string().optional(),
  userId: z.string().optional()
}).refine((data) => data.gardenId && data.parentId, {
  message: "A cultivar collection must be connected to a garden or a user..",
  path: ["gardenId", "userId"]
});
const environmentNameSchema = commonFields.nameSchema.describe("Name of the environment. Must be unique.");
const environmentDescriptionSchema = commonFields.descriptionSchema.describe("Optional description.");
const environmentParentTypeSchema = z.enum(EnvironmentParentTypeEnumOptions);
z.object({
  gardenId: z.string(),
  parendId: z.string(),
  parentType: environmentParentTypeSchema.default("GARDEN"),
  name: environmentNameSchema,
  description: environmentDescriptionSchema.default("")
});
function validateField(value, schema) {
  const parseResult = schema.safeParse(value);
  if (parseResult.success) {
    return;
  }
  return parseResult.error.issues.map((error) => error.message);
}
const CONTROLLER_CONTEXT_ID = "TriplitController";
function createController(triplit, getClient, disablePermissions = false) {
  const gardenQuery = triplit.query("gardens").Id("$query.id");
  async function getClientOrError() {
    const client = await getClient(triplit);
    if (client) {
      return client;
    }
    throw new AppError("Authentication failed.", {
      nonFormErrors: ["Authentication failed. A login is required."]
    });
  }
  async function requireRole(gardenId2, action) {
    const client = await getClientOrError();
    const garden = await triplit.fetchOne(gardenQuery.Vars({ id: gardenId2 }));
    if (garden == null) {
      throw new AppError("Garden key does not exist.", {
        nonFormErrors: ["Garden key does not exist."]
      });
    }
    const role = requiredRole(action);
    if (!isUserAuthorized(garden, client.profile.id, role)) {
      throw new AppError(`Requires ${role} access.`, {
        nonFormErrors: [`This action requires the ${role} role.`]
      });
    }
    return { client, garden };
  }
  return {
    triplit,
    getClient,
    disablePermissions,
    getClientOrError,
    requireRole
  };
}
const permissions = Object.freeze({
  /** Gardens. */
  MembershipCreate: "ADMIN",
  MembershipRevoke: "ADMIN",
  MembershipRoleChange: "ADMIN",
  /** Workspaces. */
  WorkspaceCreate: "ADMIN",
  WorkspaceUpdate: "ADMIN",
  WorkspaceEdit: "EDITOR",
  PlantingAreaCreate: "EDITOR"
});
function requiredRole(action) {
  return permissions[action];
}
function handleErrors(errors) {
  if (errors.nonFormErrors) {
    for (const errorMessage of errors.nonFormErrors) {
      toast.error(errorMessage);
    }
  }
}
function addEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options));
  };
}
class Previous {
  #previous;
  #curr;
  constructor(getter) {
  }
  get current() {
    return this.#previous;
  }
}
function Button($$payload, $$props) {
  push();
  let {
    href,
    type,
    children,
    ref = void 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  element$1(
    $$payload,
    href ? "a" : "button",
    () => {
      $$payload.out += `${spread_attributes(
        {
          type: href ? void 0 : type,
          href,
          tabindex: "0",
          ...restProps
        }
      )}`;
    },
    () => {
      children?.($$payload);
      $$payload.out += `<!---->`;
    }
  );
  bind_props($$props, { ref });
  pop();
}
function initAnnouncer() {
  if (!isBrowser$2)
    return null;
  let el = document.querySelector("[data-bits-announcer]");
  if (!isHTMLElement(el)) {
    const div = document.createElement("div");
    div.style.cssText = srOnlyStylesString;
    div.setAttribute("data-bits-announcer", "");
    div.appendChild(createLog("assertive"));
    div.appendChild(createLog("polite"));
    el = div;
    document.body.insertBefore(el, document.body.firstChild);
  }
  function createLog(kind) {
    const log = document.createElement("div");
    log.role = "log";
    log.ariaLive = kind;
    log.setAttribute("aria-relevant", "additions");
    return log;
  }
  function getLog(kind) {
    if (!isHTMLElement(el))
      return null;
    const log = el.querySelector(`[aria-live="${kind}"]`);
    if (!isHTMLElement(log))
      return null;
    return log;
  }
  return {
    getLog
  };
}
function getAnnouncer() {
  const announcer = initAnnouncer();
  function announce(value, kind = "assertive", timeout = 7500) {
    if (!announcer || !isBrowser$2)
      return;
    const log = announcer.getLog(kind);
    const content = document.createElement("div");
    if (typeof value === "number") {
      value = value.toString();
    } else if (value === null) {
      value = "Empty";
    } else {
      value = value.trim();
    }
    content.innerText = value;
    if (kind === "assertive") {
      log?.replaceChildren(content);
    } else {
      log?.appendChild(content);
    }
    return setTimeout(() => {
      content.remove();
    }, timeout);
  }
  return {
    announce
  };
}
const defaultDateDefaults = {
  defaultValue: void 0,
  defaultPlaceholder: void 0,
  granularity: "day"
};
function getDefaultDate(props) {
  const withDefaults = { ...defaultDateDefaults, ...props };
  const { defaultValue: defaultValue2, defaultPlaceholder, granularity } = withDefaults;
  if (Array.isArray(defaultValue2) && defaultValue2.length) {
    return defaultValue2[defaultValue2.length - 1];
  }
  if (defaultValue2 && !Array.isArray(defaultValue2)) {
    return defaultValue2;
  } else if (defaultPlaceholder) {
    return defaultPlaceholder;
  } else {
    const date = /* @__PURE__ */ new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const calendarDateTimeGranularities = ["hour", "minute", "second"];
    if (calendarDateTimeGranularities.includes(granularity ?? "day")) {
      return new CalendarDateTime(year, month, day, 0, 0, 0);
    }
    return new CalendarDate(year, month, day);
  }
}
function parseStringToDateValue(dateStr, referenceVal) {
  let dateValue;
  if (referenceVal instanceof ZonedDateTime) {
    dateValue = parseZonedDateTime(dateStr);
  } else if (referenceVal instanceof CalendarDateTime) {
    dateValue = parseDateTime(dateStr);
  } else {
    dateValue = parseDate(dateStr);
  }
  return dateValue.calendar !== referenceVal.calendar ? toCalendar(dateValue, referenceVal.calendar) : dateValue;
}
function toDate(dateValue, tz = getLocalTimeZone()) {
  if (dateValue instanceof ZonedDateTime) {
    return dateValue.toDate();
  } else {
    return dateValue.toDate(tz);
  }
}
function isCalendarDateTime(dateValue) {
  return dateValue instanceof CalendarDateTime;
}
function isZonedDateTime(dateValue) {
  return dateValue instanceof ZonedDateTime;
}
function hasTime(dateValue) {
  return isCalendarDateTime(dateValue) || isZonedDateTime(dateValue);
}
function getDaysInMonth(date) {
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  } else {
    return date.set({ day: 100 }).day;
  }
}
function isBefore(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) < 0;
}
function isAfter(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) > 0;
}
function getLastFirstDayOfWeek(date, firstDayOfWeek, locale) {
  const day = getDayOfWeek(date, locale);
  if (firstDayOfWeek > day) {
    return date.subtract({ days: day + 7 - firstDayOfWeek });
  }
  if (firstDayOfWeek === day) {
    return date;
  }
  return date.subtract({ days: day - firstDayOfWeek });
}
function getNextLastDayOfWeek(date, firstDayOfWeek, locale) {
  const day = getDayOfWeek(date, locale);
  const lastDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  if (day === lastDayOfWeek) {
    return date;
  }
  if (day > lastDayOfWeek) {
    return date.add({ days: 7 - day + lastDayOfWeek });
  }
  return date.add({ days: lastDayOfWeek - day });
}
const defaultPartOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
};
function createFormatter(initialLocale) {
  let locale = initialLocale;
  function setLocale(newLocale) {
    locale = newLocale;
  }
  function getLocale() {
    return locale;
  }
  function custom(date, options) {
    return new DateFormatter(locale, options).format(date);
  }
  function selectedDate(date, includeTime = true) {
    if (hasTime(date) && includeTime) {
      return custom(toDate(date), {
        dateStyle: "long",
        timeStyle: "long"
      });
    } else {
      return custom(toDate(date), {
        dateStyle: "long"
      });
    }
  }
  function fullMonthAndYear(date) {
    return new DateFormatter(locale, { month: "long", year: "numeric" }).format(date);
  }
  function fullMonth(date) {
    return new DateFormatter(locale, { month: "long" }).format(date);
  }
  function fullYear(date) {
    return new DateFormatter(locale, { year: "numeric" }).format(date);
  }
  function toParts(date, options) {
    if (isZonedDateTime(date)) {
      return new DateFormatter(locale, {
        ...options,
        timeZone: date.timeZone
      }).formatToParts(toDate(date));
    } else {
      return new DateFormatter(locale, options).formatToParts(toDate(date));
    }
  }
  function dayOfWeek(date, length = "narrow") {
    return new DateFormatter(locale, { weekday: length }).format(date);
  }
  function dayPeriod(date, hourCycle = void 0) {
    const parts = new DateFormatter(locale, {
      hour: "numeric",
      minute: "numeric",
      hourCycle: hourCycle === 24 ? "h23" : void 0
    }).formatToParts(date);
    const value = parts.find((p) => p.type === "dayPeriod")?.value;
    if (value === "PM") {
      return "PM";
    }
    return "AM";
  }
  function part(dateObj, type, options = {}) {
    const opts = { ...defaultPartOptions, ...options };
    const parts = toParts(dateObj, opts);
    const part2 = parts.find((p) => p.type === type);
    return part2 ? part2.value : "";
  }
  return {
    setLocale,
    getLocale,
    fullMonth,
    fullYear,
    fullMonthAndYear,
    toParts,
    custom,
    part,
    dayPeriod,
    selectedDate,
    dayOfWeek
  };
}
function isCalendarDayNode(node) {
  if (!isHTMLElement(node)) return false;
  if (!node.hasAttribute("data-bits-day")) return false;
  return true;
}
function getDaysBetween(start, end) {
  const days = [];
  let dCurrent = start.add({ days: 1 });
  const dEnd = end;
  while (dCurrent.compare(dEnd) < 0) {
    days.push(dCurrent);
    dCurrent = dCurrent.add({ days: 1 });
  }
  return days;
}
function createMonth(props) {
  const { dateObj, weekStartsOn, fixedWeeks, locale } = props;
  const daysInMonth = getDaysInMonth(dateObj);
  const datesArray = Array.from({ length: daysInMonth }, (_, i) => dateObj.set({ day: i + 1 }));
  const firstDayOfMonth = startOfMonth(dateObj);
  const lastDayOfMonth = endOfMonth(dateObj);
  const lastSunday = getLastFirstDayOfWeek(firstDayOfMonth, weekStartsOn, locale);
  const nextSaturday = getNextLastDayOfWeek(lastDayOfMonth, weekStartsOn, locale);
  const lastMonthDays = getDaysBetween(lastSunday.subtract({ days: 1 }), firstDayOfMonth);
  const nextMonthDays = getDaysBetween(lastDayOfMonth, nextSaturday.add({ days: 1 }));
  const totalDays = lastMonthDays.length + datesArray.length + nextMonthDays.length;
  if (fixedWeeks && totalDays < 42) {
    const extraDays = 42 - totalDays;
    let startFrom = nextMonthDays[nextMonthDays.length - 1];
    if (!startFrom) {
      startFrom = dateObj.add({ months: 1 }).set({ day: 1 });
    }
    let length = extraDays;
    if (nextMonthDays.length === 0) {
      length = extraDays - 1;
      nextMonthDays.push(startFrom);
    }
    const extraDaysArray = Array.from({ length }, (_, i) => {
      const incr = i + 1;
      return startFrom.add({ days: incr });
    });
    nextMonthDays.push(...extraDaysArray);
  }
  const allDays = lastMonthDays.concat(datesArray, nextMonthDays);
  const weeks = chunk(allDays, 7);
  return { value: dateObj, dates: allDays, weeks };
}
function createMonths(props) {
  const { numberOfMonths, dateObj, ...monthProps } = props;
  const months = [];
  if (!numberOfMonths || numberOfMonths === 1) {
    months.push(createMonth({ ...monthProps, dateObj }));
    return months;
  }
  months.push(createMonth({ ...monthProps, dateObj }));
  for (let i = 1; i < numberOfMonths; i++) {
    const nextMonth = dateObj.add({ months: i });
    months.push(createMonth({ ...monthProps, dateObj: nextMonth }));
  }
  return months;
}
function getSelectableCells(calendarNode) {
  if (!calendarNode) return [];
  const selectableSelector = `[data-bits-day]:not([data-disabled]):not([data-outside-visible-months])`;
  return Array.from(calendarNode.querySelectorAll(selectableSelector)).filter((el) => isHTMLElement(el));
}
function setPlaceholderToNodeValue(node, placeholder) {
  const cellValue = node.getAttribute("data-value");
  if (!cellValue) return;
  placeholder.current = parseStringToDateValue(cellValue, placeholder.current);
}
function shiftCalendarFocus({
  node,
  add,
  placeholder,
  calendarNode,
  isPrevButtonDisabled,
  isNextButtonDisabled,
  months,
  numberOfMonths
}) {
  const candidateCells = getSelectableCells(calendarNode);
  if (!candidateCells.length) return;
  const index = candidateCells.indexOf(node);
  const nextIndex = index + add;
  if (isValidIndex(nextIndex, candidateCells)) {
    const nextCell = candidateCells[nextIndex];
    setPlaceholderToNodeValue(nextCell, placeholder);
    return nextCell.focus();
  }
  if (nextIndex < 0) {
    if (isPrevButtonDisabled) return;
    const firstMonth = months[0]?.value;
    if (!firstMonth) return;
    placeholder.current = firstMonth.subtract({ months: numberOfMonths });
    afterTick(() => {
      const newCandidateCells = getSelectableCells(calendarNode);
      if (!newCandidateCells.length) return;
      const newIndex = newCandidateCells.length - Math.abs(nextIndex);
      if (isValidIndex(newIndex, newCandidateCells)) {
        const newCell = newCandidateCells[newIndex];
        setPlaceholderToNodeValue(newCell, placeholder);
        return newCell.focus();
      }
    });
  }
  if (nextIndex >= candidateCells.length) {
    if (isNextButtonDisabled) return;
    const firstMonth = months[0]?.value;
    if (!firstMonth) return;
    placeholder.current = firstMonth.add({ months: numberOfMonths });
    afterTick(() => {
      const newCandidateCells = getSelectableCells(calendarNode);
      if (!newCandidateCells.length) return;
      const newIndex = nextIndex - candidateCells.length;
      if (isValidIndex(newIndex, newCandidateCells)) {
        const nextCell = newCandidateCells[newIndex];
        return nextCell.focus();
      }
    });
  }
}
const ARROW_KEYS = [
  ARROW_DOWN,
  ARROW_UP,
  ARROW_LEFT,
  ARROW_RIGHT
];
const SELECT_KEYS = [ENTER, SPACE];
function handleCalendarKeydown({
  event,
  handleCellClick,
  shiftFocus,
  placeholderValue
}) {
  const currentCell = event.target;
  if (!isCalendarDayNode(currentCell)) return;
  if (!ARROW_KEYS.includes(event.key) && !SELECT_KEYS.includes(event.key)) return;
  event.preventDefault();
  const kbdFocusMap = {
    [ARROW_DOWN]: 7,
    [ARROW_UP]: -7,
    [ARROW_LEFT]: -1,
    [ARROW_RIGHT]: 1
  };
  if (ARROW_KEYS.includes(event.key)) {
    const add = kbdFocusMap[event.key];
    if (add !== void 0) {
      shiftFocus(currentCell, add);
    }
  }
  if (SELECT_KEYS.includes(event.key)) {
    const cellValue = currentCell.getAttribute("data-value");
    if (!cellValue) return;
    handleCellClick(event, parseStringToDateValue(cellValue, placeholderValue));
  }
}
function handleCalendarNextPage({
  months,
  setMonths,
  numberOfMonths,
  pagedNavigation,
  weekStartsOn,
  locale,
  fixedWeeks,
  setPlaceholder
}) {
  const firstMonth = months[0]?.value;
  if (!firstMonth) return;
  if (pagedNavigation) {
    setPlaceholder(firstMonth.add({ months: numberOfMonths }));
  } else {
    const newMonths = createMonths({
      dateObj: firstMonth.add({ months: 1 }),
      weekStartsOn,
      locale,
      fixedWeeks,
      numberOfMonths
    });
    setMonths(newMonths);
    const firstNewMonth = newMonths[0];
    if (!firstNewMonth) return;
    setPlaceholder(firstNewMonth.value.set({ day: 1 }));
  }
}
function handleCalendarPrevPage({
  months,
  setMonths,
  numberOfMonths,
  pagedNavigation,
  weekStartsOn,
  locale,
  fixedWeeks,
  setPlaceholder
}) {
  const firstMonth = months[0]?.value;
  if (!firstMonth) return;
  if (pagedNavigation) {
    setPlaceholder(firstMonth.subtract({ months: numberOfMonths }));
  } else {
    const newMonths = createMonths({
      dateObj: firstMonth.subtract({ months: 1 }),
      weekStartsOn,
      locale,
      fixedWeeks,
      numberOfMonths
    });
    setMonths(newMonths);
    const firstNewMonth = newMonths[0];
    if (!firstNewMonth) return;
    setPlaceholder(firstNewMonth.value.set({ day: 1 }));
  }
}
function getWeekdays({ months, formatter, weekdayFormat }) {
  if (!months.length) return [];
  const firstMonth = months[0];
  const firstWeek = firstMonth.weeks[0];
  if (!firstWeek) return [];
  return firstWeek.map((date) => formatter.dayOfWeek(toDate(date), weekdayFormat));
}
function useMonthViewOptionsSync(props) {
  const weekStartsOn = props.weekStartsOn.current;
  const locale = props.locale.current;
  const fixedWeeks = props.fixedWeeks.current;
  const numberOfMonths = props.numberOfMonths.current;
  run(() => {
    const placeholder = props.placeholder.current;
    if (!placeholder) return;
    const defaultMonthProps = {
      weekStartsOn,
      locale,
      fixedWeeks,
      numberOfMonths
    };
    props.setMonths(createMonths({ ...defaultMonthProps, dateObj: placeholder }));
  });
}
function useMonthViewPlaceholderSync({
  placeholder,
  getVisibleMonths,
  weekStartsOn,
  locale,
  fixedWeeks,
  numberOfMonths,
  setMonths
}) {
}
function getIsNextButtonDisabled({ maxValue, months, disabled }) {
  if (!maxValue || !months.length) return false;
  if (disabled) return true;
  const lastMonthInView = months[months.length - 1]?.value;
  if (!lastMonthInView) return false;
  const firstMonthOfNextPage = lastMonthInView.add({ months: 1 }).set({ day: 1 });
  return isAfter(firstMonthOfNextPage, maxValue);
}
function getIsPrevButtonDisabled({ minValue, months, disabled }) {
  if (!minValue || !months.length) return false;
  if (disabled) return true;
  const firstMonthInView = months[0]?.value;
  if (!firstMonthInView) return false;
  const lastMonthOfPrevPage = firstMonthInView.subtract({ months: 1 }).set({ day: 35 });
  return isBefore(lastMonthOfPrevPage, minValue);
}
function getCalendarHeadingValue({ months, locale, formatter }) {
  if (!months.length) return "";
  if (locale !== formatter.getLocale()) {
    formatter.setLocale(locale);
  }
  if (months.length === 1) {
    const month = toDate(months[0].value);
    return `${formatter.fullMonthAndYear(month)}`;
  }
  const startMonth = toDate(months[0].value);
  const endMonth = toDate(months[months.length - 1].value);
  const startMonthName = formatter.fullMonth(startMonth);
  const endMonthName = formatter.fullMonth(endMonth);
  const startMonthYear = formatter.fullYear(startMonth);
  const endMonthYear = formatter.fullYear(endMonth);
  const content = startMonthYear === endMonthYear ? `${startMonthName} - ${endMonthName} ${endMonthYear}` : `${startMonthName} ${startMonthYear} - ${endMonthName} ${endMonthYear}`;
  return content;
}
function getCalendarElementProps({
  fullCalendarLabel,
  id,
  isInvalid,
  disabled,
  readonly: readonly2
}) {
  return {
    id,
    role: "application",
    "aria-label": fullCalendarLabel,
    "data-invalid": getDataInvalid(isInvalid),
    "data-disabled": getDataDisabled(disabled),
    "data-readonly": getDataReadonly(readonly2)
  };
}
class CalendarRootState {
  ref;
  id;
  value;
  placeholder;
  preventDeselect;
  minValue;
  maxValue;
  disabled;
  pagedNavigation;
  weekStartsOn;
  weekdayFormat;
  isDateDisabledProp;
  isDateUnavailableProp;
  fixedWeeks;
  numberOfMonths;
  locale;
  calendarLabel;
  type;
  readonly;
  disableDaysOutsideMonth;
  onDateSelect;
  initialFocus;
  months = [];
  #visibleMonths = once(() => this.months.map((month) => month.value));
  get visibleMonths() {
    return this.#visibleMonths();
  }
  announcer;
  formatter;
  accessibleHeadingId = useId$2();
  constructor(props) {
    this.value = props.value;
    this.placeholder = props.placeholder;
    this.preventDeselect = props.preventDeselect;
    this.minValue = props.minValue;
    this.maxValue = props.maxValue;
    this.disabled = props.disabled;
    this.pagedNavigation = props.pagedNavigation;
    this.weekStartsOn = props.weekStartsOn;
    this.weekdayFormat = props.weekdayFormat;
    this.isDateDisabledProp = props.isDateDisabled;
    this.isDateUnavailableProp = props.isDateUnavailable;
    this.fixedWeeks = props.fixedWeeks;
    this.numberOfMonths = props.numberOfMonths;
    this.locale = props.locale;
    this.calendarLabel = props.calendarLabel;
    this.type = props.type;
    this.readonly = props.readonly;
    this.id = props.id;
    this.ref = props.ref;
    this.disableDaysOutsideMonth = props.disableDaysOutsideMonth;
    this.onDateSelect = props.onDateSelect;
    this.initialFocus = props.initialFocus;
    this.announcer = getAnnouncer();
    this.formatter = createFormatter(this.locale.current);
    this.setMonths = this.setMonths.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.prevYear = this.prevYear.bind(this);
    this.nextYear = this.nextYear.bind(this);
    this.setYear = this.setYear.bind(this);
    this.setMonth = this.setMonth.bind(this);
    this.isOutsideVisibleMonths = this.isOutsideVisibleMonths.bind(this);
    this.isDateDisabled = this.isDateDisabled.bind(this);
    this.isDateSelected = this.isDateSelected.bind(this);
    this.shiftFocus = this.shiftFocus.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleMultipleUpdate = this.handleMultipleUpdate.bind(this);
    this.handleSingleUpdate = this.handleSingleUpdate.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
    this.getBitsAttr = this.getBitsAttr.bind(this);
    useRefById({ id: this.id, ref: this.ref });
    this.months = createMonths({
      dateObj: this.placeholder.current,
      weekStartsOn: this.weekStartsOn.current,
      locale: this.locale.current,
      fixedWeeks: this.fixedWeeks.current,
      numberOfMonths: this.numberOfMonths.current
    });
    useMonthViewPlaceholderSync({
      placeholder: this.placeholder,
      getVisibleMonths: () => this.visibleMonths,
      weekStartsOn: this.weekStartsOn,
      locale: this.locale,
      fixedWeeks: this.fixedWeeks,
      numberOfMonths: this.numberOfMonths,
      setMonths: (months) => this.months = months
    });
    useMonthViewOptionsSync({
      fixedWeeks: this.fixedWeeks,
      locale: this.locale,
      numberOfMonths: this.numberOfMonths,
      placeholder: this.placeholder,
      setMonths: this.setMonths,
      weekStartsOn: this.weekStartsOn
    });
  }
  setMonths(months) {
    this.months = months;
  }
  #weekdays = once(() => {
    return getWeekdays({
      months: this.months,
      formatter: this.formatter,
      weekdayFormat: this.weekdayFormat.current
    });
  });
  get weekdays() {
    return this.#weekdays();
  }
  /**
   * Navigates to the next page of the calendar.
   */
  nextPage() {
    handleCalendarNextPage({
      fixedWeeks: this.fixedWeeks.current,
      locale: this.locale.current,
      numberOfMonths: this.numberOfMonths.current,
      pagedNavigation: this.pagedNavigation.current,
      setMonths: this.setMonths,
      setPlaceholder: (date) => this.placeholder.current = date,
      weekStartsOn: this.weekStartsOn.current,
      months: this.months
    });
  }
  /**
   * Navigates to the previous page of the calendar.
   */
  prevPage() {
    handleCalendarPrevPage({
      fixedWeeks: this.fixedWeeks.current,
      locale: this.locale.current,
      numberOfMonths: this.numberOfMonths.current,
      pagedNavigation: this.pagedNavigation.current,
      setMonths: this.setMonths,
      setPlaceholder: (date) => this.placeholder.current = date,
      weekStartsOn: this.weekStartsOn.current,
      months: this.months
    });
  }
  nextYear() {
    this.placeholder.current = this.placeholder.current.add({ years: 1 });
  }
  prevYear() {
    this.placeholder.current = this.placeholder.current.subtract({ years: 1 });
  }
  setYear(year) {
    this.placeholder.current = this.placeholder.current.set({ year });
  }
  setMonth(month) {
    this.placeholder.current = this.placeholder.current.set({ month });
  }
  #isNextButtonDisabled = once(() => {
    return getIsNextButtonDisabled({
      maxValue: this.maxValue.current,
      months: this.months,
      disabled: this.disabled.current
    });
  });
  get isNextButtonDisabled() {
    return this.#isNextButtonDisabled();
  }
  #isPrevButtonDisabled = once(() => {
    return getIsPrevButtonDisabled({
      minValue: this.minValue.current,
      months: this.months,
      disabled: this.disabled.current
    });
  });
  get isPrevButtonDisabled() {
    return this.#isPrevButtonDisabled();
  }
  #isInvalid = once(() => {
    const value = this.value.current;
    const isDateDisabled = this.isDateDisabledProp.current;
    const isDateUnavailable = this.isDateUnavailableProp.current;
    if (Array.isArray(value)) {
      if (!value.length) return false;
      for (const date of value) {
        if (isDateDisabled(date)) return true;
        if (isDateUnavailable(date)) return true;
      }
    } else {
      if (!value) return false;
      if (isDateDisabled(value)) return true;
      if (isDateUnavailable(value)) return true;
    }
    return false;
  });
  get isInvalid() {
    return this.#isInvalid();
  }
  #headingValue = once(() => {
    return getCalendarHeadingValue({
      months: this.months,
      formatter: this.formatter,
      locale: this.locale.current
    });
  });
  get headingValue() {
    return this.#headingValue();
  }
  #fullCalendarLabel = once(() => {
    return `${this.calendarLabel.current} ${this.headingValue}`;
  });
  get fullCalendarLabel() {
    return this.#fullCalendarLabel();
  }
  isOutsideVisibleMonths(date) {
    return !this.visibleMonths.some((month) => isSameMonth(date, month));
  }
  isDateDisabled(date) {
    if (this.isDateDisabledProp.current(date) || this.disabled.current) return true;
    const minValue = this.minValue.current;
    const maxValue = this.maxValue.current;
    if (minValue && isBefore(date, minValue)) return true;
    if (maxValue && isBefore(maxValue, date)) return true;
    return false;
  }
  isDateSelected(date) {
    const value = this.value.current;
    if (Array.isArray(value)) {
      return value.some((d) => isSameDay$1(d, date));
    } else if (!value) {
      return false;
    } else {
      return isSameDay$1(value, date);
    }
  }
  shiftFocus(node, add) {
    return shiftCalendarFocus({
      node,
      add,
      placeholder: this.placeholder,
      calendarNode: this.ref.current,
      isPrevButtonDisabled: this.isPrevButtonDisabled,
      isNextButtonDisabled: this.isNextButtonDisabled,
      months: this.months,
      numberOfMonths: this.numberOfMonths.current
    });
  }
  handleCellClick(_, date) {
    const readonly2 = this.readonly.current;
    if (readonly2) return;
    const isDateDisabled = this.isDateDisabledProp.current;
    const isDateUnavailable = this.isDateUnavailableProp.current;
    if (isDateDisabled?.(date) || isDateUnavailable?.(date)) return;
    const prev2 = this.value.current;
    const multiple = this.type.current === "multiple";
    if (multiple) {
      if (Array.isArray(prev2) || prev2 === void 0) {
        this.value.current = this.handleMultipleUpdate(prev2, date);
      }
    } else {
      if (!Array.isArray(prev2)) {
        const next2 = this.handleSingleUpdate(prev2, date);
        if (!next2) {
          this.announcer.announce("Selected date is now empty.", "polite", 5e3);
        } else {
          this.announcer.announce(`Selected Date: ${this.formatter.selectedDate(next2, false)}`, "polite");
        }
        this.value.current = next2;
        if (next2 !== void 0) {
          this.onDateSelect?.current?.();
        }
      }
    }
  }
  handleMultipleUpdate(prev2, date) {
    if (!prev2) return [date];
    if (!Array.isArray(prev2)) {
      return;
    }
    const index = prev2.findIndex((d) => isSameDay$1(d, date));
    const preventDeselect = this.preventDeselect.current;
    if (index === -1) {
      return [...prev2, date];
    } else if (preventDeselect) {
      return prev2;
    } else {
      const next2 = prev2.filter((d) => !isSameDay$1(d, date));
      if (!next2.length) {
        this.placeholder.current = date;
        return void 0;
      }
      return next2;
    }
  }
  handleSingleUpdate(prev2, date) {
    if (!prev2) return date;
    const preventDeselect = this.preventDeselect.current;
    if (!preventDeselect && isSameDay$1(prev2, date)) {
      this.placeholder.current = date;
      return void 0;
    }
    return date;
  }
  onkeydown(event) {
    handleCalendarKeydown({
      event,
      handleCellClick: this.handleCellClick,
      shiftFocus: this.shiftFocus,
      placeholderValue: this.placeholder.current
    });
  }
  #snippetProps = once(() => ({ months: this.months, weekdays: this.weekdays }));
  get snippetProps() {
    return this.#snippetProps();
  }
  getBitsAttr(part) {
    return `data-bits-calendar-${part}`;
  }
  #props = once(() => ({
    ...getCalendarElementProps({
      fullCalendarLabel: this.fullCalendarLabel,
      id: this.id.current,
      isInvalid: this.isInvalid,
      disabled: this.disabled.current,
      readonly: this.readonly.current
    }),
    [this.getBitsAttr("root")]: "",
    //
    onkeydown: this.onkeydown
  }));
  get props() {
    return this.#props();
  }
}
class CalendarHeadingState {
  root;
  id;
  ref;
  #headingValue = once(() => this.root.headingValue);
  get headingValue() {
    return this.#headingValue();
  }
  constructor(props, root) {
    this.root = root;
    this.id = props.id;
    this.ref = props.ref;
    useRefById({ id: this.id, ref: this.ref });
  }
  #props = once(() => ({
    id: this.id.current,
    "aria-hidden": getAriaHidden(true),
    "data-disabled": getDataDisabled(this.root.disabled.current),
    "data-readonly": getDataReadonly(this.root.readonly.current),
    [this.root.getBitsAttr("heading")]: ""
  }));
  get props() {
    return this.#props();
  }
}
class CalendarCellState {
  root;
  id;
  ref;
  date;
  month;
  #cellDate = once(() => toDate(this.date.current));
  get cellDate() {
    return this.#cellDate();
  }
  #isDisabled = once(() => this.root.isDateDisabled(this.date.current));
  get isDisabled() {
    return this.#isDisabled();
  }
  #isUnavailable = once(() => this.root.isDateUnavailableProp.current(this.date.current));
  get isUnavailable() {
    return this.#isUnavailable();
  }
  #isDateToday = once(() => isToday(this.date.current, getLocalTimeZone()));
  get isDateToday() {
    return this.#isDateToday();
  }
  #isOutsideMonth = once(() => !isSameMonth(this.date.current, this.month.current));
  get isOutsideMonth() {
    return this.#isOutsideMonth();
  }
  #isOutsideVisibleMonths = once(() => this.root.isOutsideVisibleMonths(this.date.current));
  get isOutsideVisibleMonths() {
    return this.#isOutsideVisibleMonths();
  }
  #isFocusedDate = once(() => isSameDay$1(this.date.current, this.root.placeholder.current));
  get isFocusedDate() {
    return this.#isFocusedDate();
  }
  #isSelectedDate = once(() => this.root.isDateSelected(this.date.current));
  get isSelectedDate() {
    return this.#isSelectedDate();
  }
  #labelText = once(() => this.root.formatter.custom(this.cellDate, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  }));
  get labelText() {
    return this.#labelText();
  }
  constructor(props, root) {
    this.root = root;
    this.id = props.id;
    this.ref = props.ref;
    this.date = props.date;
    this.month = props.month;
    useRefById({ id: this.id, ref: this.ref });
  }
  #snippetProps = once(() => ({
    disabled: this.isDisabled,
    unavailable: this.isUnavailable,
    selected: this.isSelectedDate
  }));
  get snippetProps() {
    return this.#snippetProps();
  }
  #ariaDisabled = once(() => {
    return this.isDisabled || this.isOutsideMonth && this.root.disableDaysOutsideMonth.current || this.isUnavailable;
  });
  get ariaDisabled() {
    return this.#ariaDisabled();
  }
  #sharedDataAttrs = once(() => ({
    "data-unavailable": getDataUnavailable(this.isUnavailable),
    "data-today": this.isDateToday ? "" : void 0,
    "data-outside-month": this.isOutsideMonth ? "" : void 0,
    "data-outside-visible-months": this.isOutsideVisibleMonths ? "" : void 0,
    "data-focused": this.isFocusedDate ? "" : void 0,
    "data-selected": getDataSelected(this.isSelectedDate),
    "data-value": this.date.current.toString(),
    "data-disabled": getDataDisabled(this.isDisabled || this.isOutsideMonth && this.root.disableDaysOutsideMonth.current)
  }));
  get sharedDataAttrs() {
    return this.#sharedDataAttrs();
  }
  #props = once(() => ({
    id: this.id.current,
    role: "gridcell",
    "aria-selected": getAriaSelected(this.isSelectedDate),
    "aria-disabled": getAriaDisabled(this.ariaDisabled),
    ...this.sharedDataAttrs,
    [this.root.getBitsAttr("cell")]: ""
  }));
  get props() {
    return this.#props();
  }
}
class CalendarDayState {
  cell;
  id;
  ref;
  constructor(props, cell) {
    this.cell = cell;
    this.id = props.id;
    this.ref = props.ref;
    this.onclick = this.onclick.bind(this);
    useRefById({ id: this.id, ref: this.ref });
  }
  #tabindex = once(() => this.cell.isFocusedDate ? 0 : this.cell.isOutsideMonth && this.cell.root.disableDaysOutsideMonth.current || this.cell.isDisabled ? void 0 : -1);
  onclick(e) {
    if (this.cell.isDisabled) return;
    this.cell.root.handleCellClick(e, this.cell.date.current);
  }
  #snippetProps = once(() => ({
    disabled: this.cell.isDisabled,
    unavailable: this.cell.isUnavailable,
    selected: this.cell.isSelectedDate,
    day: `${this.cell.date.current.day}`
  }));
  get snippetProps() {
    return this.#snippetProps();
  }
  #props = once(() => ({
    id: this.id.current,
    role: "button",
    "aria-label": this.cell.labelText,
    "aria-disabled": getAriaDisabled(this.cell.ariaDisabled),
    ...this.cell.sharedDataAttrs,
    tabindex: this.#tabindex(),
    [this.cell.root.getBitsAttr("day")]: "",
    // Shared logic for range calendar and calendar
    "data-bits-day": "",
    //
    onclick: this.onclick
  }));
  get props() {
    return this.#props();
  }
}
class CalendarNextButtonState {
  root;
  id;
  ref;
  #isDisabled = once(() => this.root.isNextButtonDisabled);
  get isDisabled() {
    return this.#isDisabled();
  }
  constructor(props, root) {
    this.root = root;
    this.id = props.id;
    this.ref = props.ref;
    this.onclick = this.onclick.bind(this);
    useRefById({ id: this.id, ref: this.ref });
  }
  onclick(_) {
    if (this.isDisabled) return;
    this.root.nextPage();
  }
  #props = once(() => ({
    id: this.id.current,
    role: "button",
    type: "button",
    "aria-label": "Next",
    "aria-disabled": getAriaDisabled(this.isDisabled),
    "data-disabled": getDataDisabled(this.isDisabled),
    disabled: this.isDisabled,
    [this.root.getBitsAttr("next-button")]: "",
    //
    onclick: this.onclick
  }));
  get props() {
    return this.#props();
  }
}
class CalendarPrevButtonState {
  root;
  id;
  ref;
  #isDisabled = once(() => this.root.isPrevButtonDisabled);
  get isDisabled() {
    return this.#isDisabled();
  }
  constructor(props, root) {
    this.root = root;
    this.id = props.id;
    this.ref = props.ref;
    this.onclick = this.onclick.bind(this);
    useRefById({ id: this.id, ref: this.ref });
  }
  onclick(_) {
    if (this.isDisabled) return;
    this.root.prevPage();
  }
  #props = once(() => ({
    id: this.id.current,
    role: "button",
    type: "button",
    "aria-label": "Previous",
    "aria-disabled": getAriaDisabled(this.isDisabled),
    "data-disabled": getDataDisabled(this.isDisabled),
    disabled: this.isDisabled,
    [this.root.getBitsAttr("prev-button")]: "",
    //
    onclick: this.onclick
  }));
  get props() {
    return this.#props();
  }
}
class CalendarGridState {
  root;
  id;
  ref;
  constructor(props, root) {
    this.root = root;
    this.id = props.id;
    this.ref = props.ref;
    useRefById({ id: this.id, ref: this.ref });
  }
  #props = once(() => ({
    id: this.id.current,
    tabindex: -1,
    role: "grid",
    "aria-readonly": getAriaReadonly(this.root.readonly.current),
    "aria-disabled": getAriaDisabled(this.root.disabled.current),
    "data-readonly": getDataReadonly(this.root.readonly.current),
    "data-disabled": getDataDisabled(this.root.disabled.current),
    [this.root.getBitsAttr("grid")]: ""
  }));
  get props() {
    return this.#props();
  }
}
class CalendarGridBodyState {
  root;
  id;
  ref;
  constructor(props, root) {
    this.root = root;
    this.id = props.id;
    this.ref = props.ref;
    useRefById({ id: this.id, ref: this.ref });
  }
  #props = once(() => ({
    id: this.id.current,
    "data-disabled": getDataDisabled(this.root.disabled.current),
    "data-readonly": getDataReadonly(this.root.readonly.current),
    [this.root.getBitsAttr("grid-body")]: ""
  }));
  get props() {
    return this.#props();
  }
}
class CalendarGridHeadState {
  root;
  id;
  ref;
  constructor(props, root) {
    this.root = root;
    this.id = props.id;
    this.ref = props.ref;
    useRefById({ id: this.id, ref: this.ref });
  }
  #props = once(() => ({
    id: this.id.current,
    "data-disabled": getDataDisabled(this.root.disabled.current),
    "data-readonly": getDataReadonly(this.root.readonly.current),
    [this.root.getBitsAttr("grid-head")]: ""
  }));
  get props() {
    return this.#props();
  }
}
class CalendarGridRowState {
  root;
  id;
  ref;
  constructor(props, root) {
    this.root = root;
    this.id = props.id;
    this.ref = props.ref;
    useRefById({ id: this.id, ref: this.ref });
  }
  #props = once(() => ({
    id: this.id.current,
    "data-disabled": getDataDisabled(this.root.disabled.current),
    "data-readonly": getDataReadonly(this.root.readonly.current),
    [this.root.getBitsAttr("grid-row")]: ""
  }));
  get props() {
    return this.#props();
  }
}
class CalendarHeadCellState {
  root;
  id;
  ref;
  constructor(props, root) {
    this.root = root;
    this.id = props.id;
    this.ref = props.ref;
    useRefById({ id: this.id, ref: this.ref });
  }
  #props = once(() => ({
    id: this.id.current,
    "data-disabled": getDataDisabled(this.root.disabled.current),
    "data-readonly": getDataReadonly(this.root.readonly.current),
    [this.root.getBitsAttr("head-cell")]: ""
  }));
  get props() {
    return this.#props();
  }
}
class CalendarHeaderState {
  root;
  id;
  ref;
  constructor(props, root) {
    this.root = root;
    this.id = props.id;
    this.ref = props.ref;
    useRefById({ id: this.id, ref: this.ref });
  }
  #props = once(() => ({
    id: this.id.current,
    "data-disabled": getDataDisabled(this.root.disabled.current),
    "data-readonly": getDataReadonly(this.root.readonly.current),
    [this.root.getBitsAttr("header")]: ""
  }));
  get props() {
    return this.#props();
  }
}
const [
  setCalendarRootContext,
  getCalendarRootContext
] = createContext$1(["Calendar.Root", "RangeCalendar.Root"], "Calendar.Root", false);
const [
  setCalendarCellContext,
  getCalendarCellContext
] = createContext$1("Calendar.Cell");
function useCalendarRoot(props) {
  return setCalendarRootContext(new CalendarRootState(props));
}
function useCalendarGrid(props) {
  const root = getCalendarRootContext();
  return new CalendarGridState(props, root);
}
function useCalendarCell(props) {
  const root = getCalendarRootContext();
  return setCalendarCellContext(new CalendarCellState(props, root));
}
function useCalendarNextButton(props) {
  const root = getCalendarRootContext();
  return new CalendarNextButtonState(props, root);
}
function useCalendarPrevButton(props) {
  const root = getCalendarRootContext();
  return new CalendarPrevButtonState(props, root);
}
function useCalendarDay(props) {
  const cell = getCalendarCellContext();
  return new CalendarDayState(props, cell);
}
function useCalendarGridBody(props) {
  const root = getCalendarRootContext();
  return new CalendarGridBodyState(props, root);
}
function useCalendarGridHead(props) {
  const root = getCalendarRootContext();
  return new CalendarGridHeadState(props, root);
}
function useCalendarGridRow(props) {
  const root = getCalendarRootContext();
  return new CalendarGridRowState(props, root);
}
function useCalendarHeadCell(props) {
  const root = getCalendarRootContext();
  return new CalendarHeadCellState(props, root);
}
function useCalendarHeader(props) {
  const root = getCalendarRootContext();
  return new CalendarHeaderState(props, root);
}
function useCalendarHeading(props) {
  const root = getCalendarRootContext();
  return new CalendarHeadingState(props, root);
}
function Calendar$1($$payload, $$props) {
  push();
  let {
    child,
    children,
    id = useId$2(),
    ref = null,
    value = void 0,
    onValueChange = noop$1,
    placeholder = void 0,
    onPlaceholderChange = noop$1,
    weekdayFormat = "narrow",
    weekStartsOn = 0,
    pagedNavigation = false,
    isDateDisabled = () => false,
    isDateUnavailable = () => false,
    fixedWeeks = false,
    numberOfMonths = 1,
    locale = "en",
    calendarLabel = "Event",
    disabled = false,
    readonly: readonly2 = false,
    minValue = void 0,
    maxValue = void 0,
    preventDeselect = false,
    type,
    disableDaysOutsideMonth = true,
    initialFocus = false,
    controlledValue = false,
    controlledPlaceholder = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  if (placeholder === void 0) {
    const defaultPlaceholder = getDefaultDate({
      defaultPlaceholder: void 0,
      defaultValue: value
    });
    if (controlledPlaceholder) {
      onPlaceholderChange(defaultPlaceholder);
    } else {
      placeholder = defaultPlaceholder;
    }
  }
  if (value === void 0) {
    const defaultValue2 = type === "single" ? "" : [];
    if (controlledValue) {
      onValueChange(defaultValue2);
    } else {
      value = defaultValue2;
    }
  }
  value === void 0 && (value = type === "single" ? void 0 : []);
  const rootState = useCalendarRoot({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    weekdayFormat: box.with(() => weekdayFormat),
    weekStartsOn: box.with(() => weekStartsOn),
    pagedNavigation: box.with(() => pagedNavigation),
    isDateDisabled: box.with(() => isDateDisabled),
    isDateUnavailable: box.with(() => isDateUnavailable),
    fixedWeeks: box.with(() => fixedWeeks),
    numberOfMonths: box.with(() => numberOfMonths),
    locale: box.with(() => locale),
    calendarLabel: box.with(() => calendarLabel),
    readonly: box.with(() => readonly2),
    disabled: box.with(() => disabled),
    minValue: box.with(() => minValue),
    maxValue: box.with(() => maxValue),
    disableDaysOutsideMonth: box.with(() => disableDaysOutsideMonth),
    initialFocus: box.with(() => initialFocus),
    placeholder: box.with(() => placeholder, (v) => {
      if (controlledPlaceholder) {
        onPlaceholderChange(v);
      } else {
        placeholder = v;
        onPlaceholderChange(v);
      }
    }),
    preventDeselect: box.with(() => preventDeselect),
    value: box.with(() => value, (v) => {
      if (controlledValue) {
        onValueChange(v);
      } else {
        value = v;
        onValueChange(v);
      }
    }),
    type: box.with(() => type)
  });
  const mergedProps = mergeProps(restProps, rootState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps, ...rootState.snippetProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload, rootState.snippetProps);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref, value, placeholder });
  pop();
}
function Calendar_day$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId$2(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const dayState = useCalendarDay({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, dayState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps, ...dayState.snippetProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    if (children) {
      $$payload.out += "<!--[-->";
      children?.($$payload, dayState.snippetProps);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `${escape_html(dayState.cell.date.current.day)}`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_grid$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId$2(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const gridState = useCalendarGrid({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, gridState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<table${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></table>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_grid_body$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId$2(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const gridBodyState = useCalendarGridBody({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, gridBodyState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<tbody${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></tbody>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_cell$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId$2(),
    date,
    month,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const cellState = useCalendarCell({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    date: box.with(() => date),
    month: box.with(() => month)
  });
  const mergedProps = mergeProps(restProps, cellState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps, ...cellState.snippetProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<td${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload, cellState.snippetProps);
    $$payload.out += `<!----></td>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_grid_head$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId$2(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const gridHeadState = useCalendarGridHead({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, gridHeadState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<thead${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></thead>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_head_cell$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId$2(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const headCellState = useCalendarHeadCell({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, headCellState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<th${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></th>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_grid_row$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId$2(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const gridRowState = useCalendarGridRow({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, gridRowState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<tr${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></tr>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_header$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId$2(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const headerState = useCalendarHeader({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, headerState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<header${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></header>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_heading$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId$2(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const headingState = useCalendarHeading({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, headingState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, {
      props: mergedProps,
      headingValue: headingState.headingValue
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    if (children) {
      $$payload.out += "<!--[-->";
      children?.($$payload, { headingValue: headingState.headingValue });
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `${escape_html(headingState.headingValue)}`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_next_button$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    id = useId$2(),
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const nextButtonState = useCalendarNextButton({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, nextButtonState.props);
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
function Calendar_prev_button$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    id = useId$2(),
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const prevButtonState = useCalendarPrevButton({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, prevButtonState.props);
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
  onAutoScroll = noop$1;
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
const [setSelectRootContext, getSelectRootContext] = createContext$1(["Select.Root", "Combobox.Root"]);
const [setSelectGroupContext, getSelectGroupContext] = createContext$1(["Select.Group", "Combobox.Group"]);
const [
  setSelectContentContext,
  getSelectContentContext
] = createContext$1(["Select.Content", "Combobox.Content"]);
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
const ROOT_ATTR$3 = "data-separator-root";
class SeparatorRootState {
  #id;
  #ref;
  #orientation;
  #decorative;
  constructor(props) {
    this.#orientation = props.orientation;
    this.#decorative = props.decorative;
    this.#id = props.id;
    this.#ref = props.ref;
    useRefById({ id: this.#id, ref: this.#ref });
  }
  #props = once(() => ({
    id: this.#id.current,
    role: this.#decorative.current ? "none" : "separator",
    "aria-orientation": getAriaOrientation(this.#orientation.current),
    "aria-hidden": getAriaHidden(this.#decorative.current),
    "data-orientation": getDataOrientation(this.#orientation.current),
    [ROOT_ATTR$3]: ""
  }));
  get props() {
    return this.#props();
  }
}
function useSeparatorRoot(props) {
  return new SeparatorRootState(props);
}
function Separator$1($$payload, $$props) {
  push();
  let {
    id = useId$2(),
    ref = null,
    child,
    children,
    decorative = false,
    orientation = "horizontal",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = useSeparatorRoot({
    ref: box.with(() => ref, (v) => ref = v),
    id: box.with(() => id),
    decorative: box.with(() => decorative),
    orientation: box.with(() => orientation)
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
function Select_content$1($$payload, $$props) {
  push();
  let {
    id = useId$2(),
    ref = null,
    forceMount = false,
    side = "bottom",
    onInteractOutside = noop$1,
    onEscapeKeydown = noop$1,
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
function Select_item$1($$payload, $$props) {
  push();
  let {
    id = useId$2(),
    ref = null,
    value,
    label = value,
    disabled = false,
    children,
    child,
    onHighlight = noop$1,
    onUnhighlight = noop$1,
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
    id = useId$2(),
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
    id = useId$2(),
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
    id = useId$2(),
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
    id = useId$2(),
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
function Menu_sub($$payload, $$props) {
  push();
  let {
    open = false,
    onOpenChange = noop$1,
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
    id = useId$2(),
    disabled = false,
    onSelect = noop$1,
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
    id = useId$2(),
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
function Menu_separator($$payload, $$props) {
  push();
  let {
    ref = null,
    id = useId$2(),
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
function Menu_sub_content($$payload, $$props) {
  push();
  let {
    id = useId$2(),
    ref = null,
    children,
    child,
    loop = true,
    onInteractOutside = noop$1,
    forceMount = false,
    onEscapeKeydown = noop$1,
    interactOutsideBehavior = "defer-otherwise-close",
    escapeKeydownBehavior = "defer-otherwise-close",
    onOpenAutoFocus: onOpenAutoFocusProp = noop$1,
    onCloseAutoFocus: onCloseAutoFocusProp = noop$1,
    onFocusOutside = noop$1,
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
    id = useId$2(),
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
    id = useId$2(),
    onCheckedChange = noop$1,
    disabled = false,
    onSelect = noop$1,
    controlledChecked = false,
    closeOnSelect = true,
    indeterminate = false,
    controlledIndeterminate = false,
    onIndeterminateChange = noop$1,
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
class PopoverRootState {
  open;
  contentNode = null;
  contentId = void 0;
  triggerNode = null;
  constructor(props) {
    this.open = props.open;
  }
  toggleOpen() {
    this.open.current = !this.open.current;
  }
  handleClose() {
    if (!this.open.current) return;
    this.open.current = false;
  }
}
class PopoverTriggerState {
  #id;
  #ref;
  #disabled;
  #root;
  constructor(props, root) {
    this.#id = props.id;
    this.#root = root;
    this.#ref = props.ref;
    this.#disabled = props.disabled;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        this.#root.triggerNode = node;
      }
    });
    this.onclick = this.onclick.bind(this);
    this.onpointerdown = this.onpointerdown.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
  }
  onclick(e) {
    if (this.#disabled.current) return;
    if (e.button !== 0) return;
    this.#root.toggleOpen();
  }
  onpointerdown(e) {
    if (this.#disabled.current) return;
    if (e.button !== 0) return;
    e.preventDefault();
  }
  onkeydown(e) {
    if (this.#disabled.current) return;
    if (!(e.key === ENTER || e.key === SPACE)) return;
    e.preventDefault();
    this.#root.toggleOpen();
  }
  #getAriaControls() {
    if (this.#root.open.current && this.#root.contentId) {
      return this.#root.contentId;
    }
    return void 0;
  }
  #props = once(() => ({
    id: this.#id.current,
    "aria-haspopup": "dialog",
    "aria-expanded": getAriaExpanded(this.#root.open.current),
    "data-state": getDataOpenClosed(this.#root.open.current),
    "aria-controls": this.#getAriaControls(),
    "data-popover-trigger": "",
    disabled: this.#disabled.current,
    //
    onpointerdown: this.onpointerdown,
    onkeydown: this.onkeydown,
    onclick: this.onclick
  }));
  get props() {
    return this.#props();
  }
}
class PopoverContentState {
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
    tabindex: -1,
    "data-state": getDataOpenClosed(this.root.open.current),
    "data-popover-content": "",
    style: { pointerEvents: "auto" }
  }));
  get props() {
    return this.#props();
  }
}
const [setPopoverRootContext, getPopoverRootContext] = createContext$1("Popover.Root");
function usePopoverRoot(props) {
  return setPopoverRootContext(new PopoverRootState(props));
}
function usePopoverTrigger(props) {
  return new PopoverTriggerState(props, getPopoverRootContext());
}
function usePopoverContent(props) {
  return new PopoverContentState(props, getPopoverRootContext());
}
function Popover_content$1($$payload, $$props) {
  push();
  let {
    child,
    children,
    ref = null,
    id = useId$2(),
    forceMount = false,
    onCloseAutoFocus = noop$1,
    onEscapeKeydown = noop$1,
    onInteractOutside = noop$1,
    trapFocus = true,
    preventScroll = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = usePopoverContent({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, contentState.props);
  function handleInteractOutside(e) {
    onInteractOutside(e);
    if (e.defaultPrevented) return;
    if (isHTMLElement(e.target) && e.target.closest("[data-popover-trigger")) return;
    contentState.root.handleClose();
  }
  function handleEscapeKeydown(e) {
    onEscapeKeydown(e);
    if (e.defaultPrevented) return;
    contentState.root.handleClose();
  }
  function handleCloseAutoFocus(e) {
    onCloseAutoFocus(e);
    if (e.defaultPrevented) return;
    e.preventDefault();
    contentState.root.triggerNode?.focus();
  }
  if (forceMount) {
    $$payload.out += "<!--[-->";
    {
      let popper = function($$payload2, { props, wrapperProps }) {
        const finalProps = mergeProps(props, {
          style: getFloatingContentCSSVars("popover")
        });
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
          enabled: contentState.root.open.current,
          id,
          onInteractOutside: handleInteractOutside,
          onEscapeKeydown: handleEscapeKeydown,
          onCloseAutoFocus: handleCloseAutoFocus,
          trapFocus,
          preventScroll,
          loop: true,
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
        const finalProps = mergeProps(props, {
          style: getFloatingContentCSSVars("popover")
        });
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
          present: contentState.root.open.current,
          id,
          onInteractOutside: handleInteractOutside,
          onEscapeKeydown: handleEscapeKeydown,
          onCloseAutoFocus: handleCloseAutoFocus,
          trapFocus,
          preventScroll,
          loop: true,
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
function Popover_trigger($$payload, $$props) {
  push();
  let {
    children,
    child,
    id = useId$2(),
    ref = null,
    type = "button",
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = usePopoverTrigger({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    disabled: box.with(() => Boolean(disabled))
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
const ROOT_ATTR$2 = "data-label-root";
class LabelRootState {
  #id;
  #ref;
  constructor(props) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.onmousedown = this.onmousedown.bind(this);
    useRefById({ id: this.#id, ref: this.#ref });
  }
  onmousedown(e) {
    if (e.detail > 1) e.preventDefault();
  }
  #props = once(() => ({
    [ROOT_ATTR$2]: "",
    onmousedown: this.onmousedown
  }));
  get props() {
    return this.#props();
  }
}
function setLabelRootState(props) {
  return new LabelRootState(props);
}
function Label$2($$payload, $$props) {
  push();
  let {
    children,
    child,
    id = useId$2(),
    ref = null,
    for: forProp,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = setLabelRootState({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, rootState.props, { for: forProp });
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<label${spread_attributes({ ...mergedProps, for: forProp })}>`;
    children?.($$payload);
    $$payload.out += `<!----></label>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
const ROOT_ATTR$1 = "data-menubar-root";
const TRIGGER_ATTR$1 = "data-menubar-trigger";
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
      candidateAttr: TRIGGER_ATTR$1,
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
    return Array.from(node.querySelectorAll(`[${TRIGGER_ATTR$1}]`));
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
    [ROOT_ATTR$1]: ""
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
    if (!isBrowser$2) return null;
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
    [TRIGGER_ATTR$1]: "",
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
const [setMenubarRootContext, getMenubarRootContext] = createContext$1("Menubar.Root");
const [setMenubarMenuContext, getMenubarMenuContext] = createContext$1("Menubar.Menu");
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
    id = useId$2(),
    children,
    child,
    ref = null,
    value = "",
    dir = "ltr",
    loop = true,
    onValueChange = noop$1,
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
    value = useId$2(),
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
    id = useId$2(),
    child,
    children,
    ref = null,
    loop = true,
    onInteractOutside = noop$1,
    onEscapeKeydown = noop$1,
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
    id = useId$2(),
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
    id = useId$2(),
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
function Popover($$payload, $$props) {
  push();
  let {
    open = false,
    onOpenChange = noop$1,
    controlledOpen = false,
    children
  } = $$props;
  usePopoverRoot({
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
function Select($$payload, $$props) {
  push();
  let {
    value = void 0,
    onValueChange = noop$1,
    name = "",
    disabled = false,
    type,
    open = false,
    onOpenChange = noop$1,
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
    const defaultValue2 = type === "single" ? "" : [];
    if (controlledValue) {
      onValueChange(defaultValue2);
    } else {
      value = defaultValue2;
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
    id = useId$2(),
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
function getRangeStyles(direction, min, max) {
  const styles = {
    position: "absolute"
  };
  if (direction === "lr") {
    styles.left = `${min}%`;
    styles.right = `${max}%`;
  } else if (direction === "rl") {
    styles.right = `${min}%`;
    styles.left = `${max}%`;
  } else if (direction === "bt") {
    styles.bottom = `${min}%`;
    styles.top = `${max}%`;
  } else {
    styles.top = `${min}%`;
    styles.bottom = `${max}%`;
  }
  return styles;
}
function getThumbStyles(direction, thumbPos) {
  const styles = {
    position: "absolute"
  };
  if (direction === "lr") {
    styles.left = `${thumbPos}%`;
    styles.translate = "-50% 0";
  } else if (direction === "rl") {
    styles.right = `${thumbPos}%`;
    styles.translate = "50% 0";
  } else if (direction === "bt") {
    styles.bottom = `${thumbPos}%`;
    styles.translate = "0 50%";
  } else {
    styles.top = `${thumbPos}%`;
    styles.translate = "0 -50%";
  }
  return styles;
}
function getTickStyles(direction, tickPosition, offsetPercentage) {
  const style = {
    position: "absolute"
  };
  if (direction === "lr") {
    style.left = `${tickPosition}%`;
    style.translate = `${offsetPercentage}% 0`;
  } else if (direction === "rl") {
    style.right = `${tickPosition}%`;
    style.translate = `${-offsetPercentage}% 0`;
  } else if (direction === "bt") {
    style.bottom = `${tickPosition}%`;
    style.translate = `0 ${-offsetPercentage}%`;
  } else {
    style.top = `${tickPosition}%`;
    style.translate = `0 ${offsetPercentage}%`;
  }
  return style;
}
function snapValueToStep(value, min, max, step) {
  const remainder = (value - (Number.isNaN(min) ? 0 : min)) % step;
  let snappedValue = Math.abs(remainder) * 2 >= step ? value + Math.sign(remainder) * (step - Math.abs(remainder)) : value - remainder;
  if (!Number.isNaN(min)) {
    if (snappedValue < min) {
      snappedValue = min;
    } else if (!Number.isNaN(max) && snappedValue > max) {
      snappedValue = min + Math.floor((max - min) / step) * step;
    }
  } else if (!Number.isNaN(max) && snappedValue > max) {
    snappedValue = Math.floor(max / step) * step;
  }
  const string = step.toString();
  const index = string.indexOf(".");
  const precision = index >= 0 ? string.length - index : 0;
  if (precision > 0) {
    const pow = 10 ** precision;
    snappedValue = Math.round(snappedValue * pow) / pow;
  }
  return snappedValue;
}
const SLIDER_ROOT_ATTR = "data-slider-root";
const SLIDER_THUMB_ATTR = "data-slider-thumb";
const SLIDER_RANGE_ATTR = "data-slider-range";
const SLIDER_TICK_ATTR = "data-slider-tick";
class SliderRootState {
  id;
  ref;
  value;
  disabled;
  orientation;
  min;
  max;
  step;
  dir;
  autoSort;
  activeThumb = null;
  isActive = false;
  currentThumbIdx = 0;
  #direction = once(() => {
    if (this.orientation.current === "horizontal") {
      return this.dir.current === "rtl" ? "rl" : "lr";
    } else {
      return this.dir.current === "rtl" ? "tb" : "bt";
    }
  });
  get direction() {
    return this.#direction();
  }
  onValueCommit;
  constructor(props) {
    this.id = props.id;
    this.ref = props.ref;
    this.disabled = props.disabled;
    this.orientation = props.orientation;
    this.min = props.min;
    this.max = props.max;
    this.step = props.step;
    this.dir = props.dir;
    this.autoSort = props.autoSort;
    this.value = props.value;
    this.onValueCommit = props.onValueCommit;
    useRefById({ id: this.id, ref: this.ref });
  }
  applyPosition({ clientXY, activeThumbIdx, start, end }) {
    const min = this.min.current;
    const max = this.max.current;
    const percent = (clientXY - start) / (end - start);
    const val = percent * (max - min) + min;
    if (val < min) {
      this.updateValue(min, activeThumbIdx);
    } else if (val > max) {
      this.updateValue(max, activeThumbIdx);
    } else {
      const step = this.step.current;
      const currStep = Math.floor((val - min) / step);
      const midpointOfCurrStep = min + currStep * step + step / 2;
      const midpointOfNextStep = min + (currStep + 1) * step + step / 2;
      const newValue = val >= midpointOfCurrStep && val < midpointOfNextStep ? (currStep + 1) * step + min : currStep * step + min;
      if (newValue <= max) {
        this.updateValue(newValue, activeThumbIdx);
      }
    }
  }
  #getClosestThumb = (e) => {
    const thumbs = this.getAllThumbs();
    if (!thumbs.length) return;
    for (const thumb of thumbs) {
      thumb.blur();
    }
    const distances = thumbs.map((thumb) => {
      if (this.orientation.current === "horizontal") {
        const { left, right } = thumb.getBoundingClientRect();
        return Math.abs(e.clientX - (left + right) / 2);
      } else {
        const { top, bottom } = thumb.getBoundingClientRect();
        return Math.abs(e.clientY - (top + bottom) / 2);
      }
    });
    const node = thumbs[distances.indexOf(Math.min(...distances))];
    const idx = thumbs.indexOf(node);
    return { node, idx };
  };
  handlePointerMove = (e) => {
    if (!this.isActive || this.disabled.current) return;
    e.preventDefault();
    e.stopPropagation();
    const sliderNode = this.ref.current;
    const activeThumb = this.activeThumb;
    if (!sliderNode || !activeThumb) return;
    activeThumb.node.focus();
    const { left, right, top, bottom } = sliderNode.getBoundingClientRect();
    const direction = this.direction;
    if (direction === "lr") {
      this.applyPosition({
        clientXY: e.clientX,
        activeThumbIdx: activeThumb.idx,
        start: left,
        end: right
      });
    } else if (direction === "rl") {
      this.applyPosition({
        clientXY: e.clientX,
        activeThumbIdx: activeThumb.idx,
        start: right,
        end: left
      });
    } else if (direction === "bt") {
      this.applyPosition({
        clientXY: e.clientY,
        activeThumbIdx: activeThumb.idx,
        start: bottom,
        end: top
      });
    } else if (direction === "tb") {
      this.applyPosition({
        clientXY: e.clientY,
        activeThumbIdx: activeThumb.idx,
        start: top,
        end: bottom
      });
    }
  };
  handlePointerDown = (e) => {
    if (e.button !== 0 || this.disabled.current) return;
    const sliderNode = this.ref.current;
    const closestThumb = this.#getClosestThumb(e);
    if (!closestThumb || !sliderNode) return;
    const target = e.target;
    if (!isElementOrSVGElement(target) || !sliderNode.contains(target)) return;
    e.preventDefault();
    this.activeThumb = closestThumb;
    closestThumb.node.focus();
    this.isActive = true;
    this.handlePointerMove(e);
  };
  handlePointerUp = () => {
    if (this.disabled.current) return;
    if (this.isActive) {
      this.onValueCommit.current(run(() => this.value.current));
    }
    this.isActive = false;
  };
  getPositionFromValue = (thumbValue) => {
    const min = this.min.current;
    const max = this.max.current;
    return (thumbValue - min) / (max - min) * 100;
  };
  getAllThumbs = () => {
    const node = this.ref.current;
    if (!node) return [];
    const thumbs = Array.from(node.querySelectorAll(`[${SLIDER_THUMB_ATTR}]`));
    return thumbs;
  };
  updateValue = (thumbValue, idx) => {
    const currValue = this.value.current;
    if (!currValue.length) {
      this.value.current.push(thumbValue);
      return;
    }
    const valueAtIndex = currValue[idx];
    if (valueAtIndex === thumbValue) return;
    const newValue = [...currValue];
    if (!isValidIndex(idx, newValue)) return;
    const direction = newValue[idx] > thumbValue ? -1 : 1;
    const swap = () => {
      const diffIndex = idx + direction;
      newValue[idx] = newValue[diffIndex];
      newValue[diffIndex] = thumbValue;
      const thumbs = this.getAllThumbs();
      if (!thumbs.length) return;
      thumbs[diffIndex]?.focus();
      this.activeThumb = { node: thumbs[diffIndex], idx: diffIndex };
    };
    if (this.autoSort.current && (direction === -1 && thumbValue < newValue[idx - 1] || direction === 1 && thumbValue > newValue[idx + 1])) {
      swap();
      this.value.current = newValue;
      return;
    }
    const min = this.min.current;
    const max = this.max.current;
    const step = this.step.current;
    newValue[idx] = snapValueToStep(thumbValue, min, max, step);
    this.value.current = newValue;
  };
  #thumbsPropsArr = once(() => {
    const currValue = this.value.current;
    return Array.from({ length: currValue.length || 1 }, (_, i) => {
      const currThumb = run(() => this.currentThumbIdx);
      if (currThumb < currValue.length) {
        run(() => {
          this.currentThumbIdx = currThumb + 1;
        });
      }
      const thumbValue = currValue[i];
      const thumbPosition = this.getPositionFromValue(thumbValue ?? 0);
      const style = getThumbStyles(this.direction, thumbPosition);
      return {
        role: "slider",
        "aria-valuemin": this.min.current,
        "aria-valuemax": this.max.current,
        "aria-valuenow": thumbValue,
        "aria-disabled": getAriaDisabled(this.disabled.current),
        "aria-orientation": getAriaOrientation(this.orientation.current),
        "data-value": thumbValue,
        tabindex: this.disabled.current ? -1 : 0,
        style,
        [SLIDER_THUMB_ATTR]: ""
      };
    });
  });
  get thumbsPropsArr() {
    return this.#thumbsPropsArr();
  }
  #thumbsRenderArr = once(() => {
    return this.thumbsPropsArr.map((_, i) => i);
  });
  get thumbsRenderArr() {
    return this.#thumbsRenderArr();
  }
  #ticksPropsArr = once(() => {
    const max = this.max.current;
    const min = this.min.current;
    const step = this.step.current;
    const difference = max - min;
    let count2 = Math.ceil(difference / step);
    if (difference % step == 0) {
      count2++;
    }
    const currValue = this.value.current;
    return Array.from({ length: count2 }, (_, i) => {
      const tickPosition = i * (step / difference) * 100;
      const isFirst = i === 0;
      const isLast = i === count2 - 1;
      const offsetPercentage = isFirst ? 0 : isLast ? -100 : -50;
      const style = getTickStyles(this.direction, tickPosition, offsetPercentage);
      const tickValue = min + i * step;
      const bounded = currValue.length === 1 ? tickValue <= currValue[0] : currValue[0] <= tickValue && tickValue <= currValue[currValue.length - 1];
      return {
        "data-disabled": getDataDisabled(this.disabled.current),
        "data-orientation": getDataOrientation(this.orientation.current),
        "data-bounded": bounded ? "" : void 0,
        "data-value": tickValue,
        style,
        [SLIDER_TICK_ATTR]: ""
      };
    });
  });
  get ticksPropsArr() {
    return this.#ticksPropsArr();
  }
  #ticksRenderArr = once(() => {
    return this.ticksPropsArr.map((_, i) => i);
  });
  get ticksRenderArr() {
    return this.#ticksRenderArr();
  }
  #snippetProps = once(() => ({
    ticks: this.ticksRenderArr,
    thumbs: this.thumbsRenderArr
  }));
  get snippetProps() {
    return this.#snippetProps();
  }
  #touchAction = once(() => {
    if (this.disabled.current) return void 0;
    return this.orientation.current === "horizontal" ? "pan-y" : "pan-x";
  });
  #props = once(() => ({
    id: this.id.current,
    "data-orientation": getDataOrientation(this.orientation.current),
    "data-disabled": getDataDisabled(this.disabled.current),
    style: { touchAction: this.#touchAction() },
    [SLIDER_ROOT_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
}
const VALID_SLIDER_KEYS = [
  ARROW_LEFT,
  ARROW_RIGHT,
  ARROW_UP,
  ARROW_DOWN,
  HOME,
  END
];
class SliderRangeState {
  #id;
  #ref;
  #root;
  constructor(props, root) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.#root = root;
    useRefById({ id: this.#id, ref: this.#ref });
  }
  #rangeStyles = once(() => {
    const value = this.#root.value.current;
    const min = value.length > 1 ? this.#root.getPositionFromValue(Math.min(...value) ?? 0) : 0;
    const max = 100 - this.#root.getPositionFromValue(Math.max(...value) ?? 0);
    return {
      position: "absolute",
      ...getRangeStyles(this.#root.direction, min, max)
    };
  });
  get rangeStyles() {
    return this.#rangeStyles();
  }
  #props = once(() => ({
    id: this.#id.current,
    "data-orientation": getDataOrientation(this.#root.orientation.current),
    "data-disabled": getDataDisabled(this.#root.disabled.current),
    style: this.rangeStyles,
    [SLIDER_RANGE_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
}
class SliderThumbState {
  #id;
  #ref;
  #index;
  #root;
  #isDisabled = once(() => this.#root.disabled.current || this.#root.disabled.current);
  constructor(props, root) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.#root = root;
    this.#index = props.index;
    useRefById({ id: this.#id, ref: this.#ref });
    this.onkeydown = this.onkeydown.bind(this);
  }
  #updateValue(newValue) {
    this.#root.updateValue(newValue, this.#index.current);
  }
  onkeydown(e) {
    if (this.#isDisabled()) return;
    const currNode = this.#ref.current;
    if (!currNode) return;
    const thumbs = this.#root.getAllThumbs();
    if (!thumbs.length) return;
    const idx = thumbs.indexOf(currNode);
    this.#root.currentThumbIdx = idx;
    if (!VALID_SLIDER_KEYS.includes(e.key)) return;
    e.preventDefault();
    const min = this.#root.min.current;
    const max = this.#root.max.current;
    const value = this.#root.value.current;
    const thumbValue = value[idx];
    const orientation = this.#root.orientation.current;
    const direction = this.#root.direction;
    const step = this.#root.step.current;
    switch (e.key) {
      case HOME:
        this.#updateValue(min);
        break;
      case END:
        this.#updateValue(max);
        break;
      case ARROW_LEFT:
        if (orientation !== "horizontal") break;
        if (e.metaKey) {
          const newValue = direction === "rl" ? max : min;
          this.#updateValue(newValue);
        } else if (direction === "rl" && thumbValue < max) {
          this.#updateValue(thumbValue + step);
        } else if (direction === "lr" && thumbValue > min) {
          this.#updateValue(thumbValue - step);
        }
        break;
      case ARROW_RIGHT:
        if (orientation !== "horizontal") break;
        if (e.metaKey) {
          const newValue = direction === "rl" ? min : max;
          this.#updateValue(newValue);
        } else if (direction === "rl" && thumbValue > min) {
          this.#updateValue(thumbValue - step);
        } else if (direction === "lr" && thumbValue < max) {
          this.#updateValue(thumbValue + step);
        }
        break;
      case ARROW_UP:
        if (e.metaKey) {
          const newValue = direction === "tb" ? min : max;
          this.#updateValue(newValue);
        } else if (direction === "tb" && thumbValue > min) {
          this.#updateValue(thumbValue - step);
        } else if (direction !== "tb" && thumbValue < max) {
          this.#updateValue(thumbValue + step);
        }
        break;
      case ARROW_DOWN:
        if (e.metaKey) {
          const newValue = direction === "tb" ? max : min;
          this.#updateValue(newValue);
        } else if (direction === "tb" && thumbValue < max) {
          this.#updateValue(thumbValue + step);
        } else if (direction !== "tb" && thumbValue > min) {
          this.#updateValue(thumbValue - step);
        }
        break;
    }
    this.#root.onValueCommit.current(this.#root.value.current);
  }
  #props = once(() => ({
    ...this.#root.thumbsPropsArr[this.#index.current],
    id: this.#id.current,
    onkeydown: this.onkeydown
  }));
  get props() {
    return this.#props();
  }
}
class SliderTickState {
  #id;
  #ref;
  #index;
  #root;
  constructor(props, root) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.#root = root;
    this.#index = props.index;
    useRefById({ id: this.#id, ref: this.#ref });
  }
  #props = once(() => ({
    ...this.#root.ticksPropsArr[this.#index.current],
    id: this.#id.current
  }));
  get props() {
    return this.#props();
  }
}
const [setSliderRootContext, getSliderRootContext] = createContext$1("Slider.Root");
function useSliderRoot(props) {
  return setSliderRootContext(new SliderRootState(props));
}
function useSliderRange(props) {
  return new SliderRangeState(props, getSliderRootContext());
}
function useSliderThumb(props) {
  return new SliderThumbState(props, getSliderRootContext());
}
function useSliderTick(props) {
  return new SliderTickState(props, getSliderRootContext());
}
function Slider($$payload, $$props) {
  push();
  let {
    children,
    child,
    id = useId$2(),
    ref = null,
    value = [],
    onValueChange = noop$1,
    onValueCommit = noop$1,
    disabled = false,
    min = 0,
    max = 100,
    step = 1,
    dir = "ltr",
    autoSort = true,
    orientation = "horizontal",
    controlledValue = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = useSliderRoot({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    value: box.with(() => value, (v) => {
      if (controlledValue) {
        onValueChange(v);
      } else {
        value = v;
        onValueChange(v);
      }
    }),
    onValueCommit: box.with(() => onValueCommit),
    disabled: box.with(() => disabled),
    min: box.with(() => min),
    max: box.with(() => max),
    step: box.with(() => step),
    dir: box.with(() => dir),
    autoSort: box.with(() => autoSort),
    orientation: box.with(() => orientation)
  });
  const mergedProps = mergeProps(restProps, rootState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps, ...rootState.snippetProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<span${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload, rootState.snippetProps);
    $$payload.out += `<!----></span>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref, value });
  pop();
}
function Slider_range($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId$2(),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rangeState = useSliderRange({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, rangeState.props);
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
function Slider_thumb($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId$2(),
    index,
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const thumbState = useSliderThumb({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    index: box.with(() => index),
    disabled: box.with(() => disabled)
  });
  const mergedProps = mergeProps(restProps, thumbState.props);
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
function Slider_tick($$payload, $$props) {
  push();
  let {
    children,
    child,
    ref = null,
    id = useId$2(),
    index,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const tickState = useSliderTick({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    index: box.with(() => index)
  });
  const mergedProps = mergeProps(restProps, tickState.props);
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
const ROOT_ATTR = "data-tabs-root";
const LIST_ATTR = "data-tabs-list";
const TRIGGER_ATTR = "data-tabs-trigger";
const CONTENT_ATTR = "data-tabs-content";
class TabsRootState {
  #id;
  ref;
  orientation;
  loop;
  activationMode;
  value;
  disabled;
  rovingFocusGroup;
  triggerIds = [];
  // holds the trigger ID for each value to associate it with the content
  valueToTriggerId = new SvelteMap();
  // holds the content ID for each value to associate it with the trigger
  valueToContentId = new SvelteMap();
  constructor(props) {
    this.#id = props.id;
    this.ref = props.ref;
    this.orientation = props.orientation;
    this.loop = props.loop;
    this.activationMode = props.activationMode;
    this.value = props.value;
    this.disabled = props.disabled;
    useRefById({ id: this.#id, ref: this.ref });
    this.rovingFocusGroup = useRovingFocus({
      candidateAttr: TRIGGER_ATTR,
      rootNodeId: this.#id,
      loop: this.loop,
      orientation: this.orientation
    });
  }
  registerTrigger(id, value) {
    this.triggerIds.push(id);
    this.valueToTriggerId.set(value, id);
    return () => {
      this.triggerIds = this.triggerIds.filter((triggerId) => triggerId !== id);
      this.valueToTriggerId.delete(value);
    };
  }
  registerContent(id, value) {
    this.valueToContentId.set(value, id);
    return () => {
      this.valueToContentId.delete(value);
    };
  }
  setValue(v) {
    this.value.current = v;
  }
  #props = once(() => ({
    id: this.#id.current,
    "data-orientation": getDataOrientation(this.orientation.current),
    [ROOT_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
}
class TabsListState {
  #id;
  #ref;
  #root;
  #isDisabled = once(() => this.#root.disabled.current);
  constructor(props, root) {
    this.#root = root;
    this.#id = props.id;
    this.#ref = props.ref;
    useRefById({ id: this.#id, ref: this.#ref });
  }
  #props = once(() => ({
    id: this.#id.current,
    role: "tablist",
    "aria-orientation": getAriaOrientation(this.#root.orientation.current),
    "data-orientation": getDataOrientation(this.#root.orientation.current),
    [LIST_ATTR]: "",
    "data-disabled": getDataDisabled(this.#isDisabled())
  }));
  get props() {
    return this.#props();
  }
}
class TabsTriggerState {
  #root;
  #id;
  #ref;
  #disabled;
  #value;
  #isActive = once(() => this.#root.value.current === this.#value.current);
  #isDisabled = once(() => this.#disabled.current || this.#root.disabled.current);
  #tabIndex = 0;
  #ariaControls = once(() => this.#root.valueToContentId.get(this.#value.current));
  constructor(props, root) {
    this.#root = root;
    this.#id = props.id;
    this.#ref = props.ref;
    this.#value = props.value;
    this.#disabled = props.disabled;
    useRefById({ id: this.#id, ref: this.#ref });
    this.onfocus = this.onfocus.bind(this);
    this.onclick = this.onclick.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
  }
  #activate() {
    if (this.#root.value.current === this.#value.current) return;
    this.#root.setValue(this.#value.current);
  }
  onfocus = (_) => {
    if (this.#root.activationMode.current !== "automatic" || this.#isDisabled()) return;
    this.#activate();
  };
  onclick = (_) => {
    if (this.#isDisabled()) return;
    this.#activate();
  };
  onkeydown = (e) => {
    if (this.#isDisabled()) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      this.#activate();
      return;
    }
    this.#root.rovingFocusGroup.handleKeydown(this.#ref.current, e);
  };
  #props = once(() => ({
    id: this.#id.current,
    role: "tab",
    "data-state": getTabDataState(this.#isActive()),
    "data-value": this.#value.current,
    "data-orientation": getDataOrientation(this.#root.orientation.current),
    "data-disabled": getDataDisabled(this.#isDisabled()),
    "aria-selected": getAriaSelected(this.#isActive()),
    "aria-controls": this.#ariaControls(),
    [TRIGGER_ATTR]: "",
    disabled: getDisabled(this.#isDisabled()),
    tabindex: this.#tabIndex,
    //
    onclick: this.onclick,
    onfocus: this.onfocus,
    onkeydown: this.onkeydown
  }));
  get props() {
    return this.#props();
  }
}
class TabsContentState {
  #root;
  #id;
  #ref;
  #value;
  #isActive = once(() => this.#root.value.current === this.#value.current);
  #ariaLabelledBy = once(() => this.#root.valueToTriggerId.get(this.#value.current));
  constructor(props, root) {
    this.#root = root;
    this.#value = props.value;
    this.#id = props.id;
    this.#ref = props.ref;
    useRefById({ id: this.#id, ref: this.#ref });
  }
  #props = once(() => ({
    id: this.#id.current,
    role: "tabpanel",
    hidden: getHidden(!this.#isActive()),
    tabindex: 0,
    "data-value": this.#value.current,
    "data-state": getTabDataState(this.#isActive()),
    "aria-labelledby": this.#ariaLabelledBy(),
    [CONTENT_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
}
const [setTabsRootContext, getTabsRootContext] = createContext$1("Tabs.Root");
function useTabsRoot(props) {
  return setTabsRootContext(new TabsRootState(props));
}
function useTabsTrigger(props) {
  return new TabsTriggerState(props, getTabsRootContext());
}
function useTabsList(props) {
  return new TabsListState(props, getTabsRootContext());
}
function useTabsContent(props) {
  return new TabsContentState(props, getTabsRootContext());
}
function getTabDataState(condition) {
  return condition ? "active" : "inactive";
}
function Tabs($$payload, $$props) {
  push();
  let {
    id = useId$2(),
    ref = null,
    value = "",
    onValueChange = noop$1,
    orientation = "horizontal",
    loop = true,
    activationMode = "automatic",
    disabled = false,
    controlledValue = false,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = useTabsRoot({
    id: box.with(() => id),
    value: box.with(() => value, (v) => {
      if (controlledValue) {
        onValueChange(v);
      } else {
        value = v;
        onValueChange(v);
      }
    }),
    orientation: box.with(() => orientation),
    loop: box.with(() => loop),
    activationMode: box.with(() => activationMode),
    disabled: box.with(() => disabled),
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
  bind_props($$props, { ref, value });
  pop();
}
function Tabs_content$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    id = useId$2(),
    ref = null,
    value,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = useTabsContent({
    value: box.with(() => value),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, contentState.props);
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
function Tabs_list$1($$payload, $$props) {
  push();
  let {
    child,
    children,
    id = useId$2(),
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const listState = useTabsList({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, listState.props);
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
function Tabs_trigger$1($$payload, $$props) {
  push();
  let {
    child,
    children,
    disabled = false,
    id = useId$2(),
    type = "button",
    value,
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = useTabsTrigger({
    id: box.with(() => id),
    disabled: box.with(() => disabled ?? false),
    value: box.with(() => value),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, triggerState.props, { type });
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
function Tooltip_content$1($$payload, $$props) {
  push();
  let {
    children,
    child,
    id = useId$2(),
    ref = null,
    side = "top",
    sideOffset = 0,
    align = "center",
    avoidCollisions = true,
    arrowPadding = 0,
    sticky = "partial",
    hideWhenDetached = false,
    collisionPadding = 0,
    onInteractOutside,
    onEscapeKeydown,
    forceMount = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = useTooltipContent({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const floatingProps = {
    side,
    sideOffset,
    align,
    avoidCollisions,
    arrowPadding,
    sticky,
    hideWhenDetached,
    collisionPadding
  };
  const mergedProps = mergeProps(restProps, floatingProps, contentState.props);
  function handleInteractOutside(e) {
    onInteractOutside?.(e);
    if (e.defaultPrevented) return;
    contentState.root.handleClose();
  }
  function handleEscapeKeydown(e) {
    onEscapeKeydown?.(e);
    if (e.defaultPrevented) return;
    contentState.root.handleClose();
  }
  if (forceMount) {
    $$payload.out += "<!--[-->";
    {
      let popper = function($$payload2, { props, wrapperProps }) {
        const mergedProps2 = mergeProps(props, {
          style: getFloatingContentCSSVars("tooltip")
        });
        if (child) {
          $$payload2.out += "<!--[-->";
          child($$payload2, {
            props: mergedProps2,
            wrapperProps,
            ...contentState.snippetProps
          });
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<div${spread_attributes({ ...wrapperProps })}><div${spread_attributes({ ...mergedProps2 })}>`;
          children?.($$payload2);
          $$payload2.out += `<!----></div></div>`;
        }
        $$payload2.out += `<!--]-->`;
      };
      Popper_layer_force_mount($$payload, spread_props([
        mergedProps,
        {
          enabled: contentState.root.open.current,
          id,
          onInteractOutside: handleInteractOutside,
          onEscapeKeydown: handleEscapeKeydown,
          onOpenAutoFocus: (e) => e.preventDefault(),
          onCloseAutoFocus: (e) => e.preventDefault(),
          trapFocus: false,
          loop: false,
          preventScroll: false,
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
        const mergedProps2 = mergeProps(props, {
          style: getFloatingContentCSSVars("tooltip")
        });
        if (child) {
          $$payload2.out += "<!--[-->";
          child($$payload2, {
            props: mergedProps2,
            wrapperProps,
            ...contentState.snippetProps
          });
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<div${spread_attributes({ ...wrapperProps })}><div${spread_attributes({ ...mergedProps2 })}>`;
          children?.($$payload2);
          $$payload2.out += `<!----></div></div>`;
        }
        $$payload2.out += `<!--]-->`;
      };
      Popper_layer($$payload, spread_props([
        mergedProps,
        {
          present: contentState.root.open.current,
          id,
          onInteractOutside: handleInteractOutside,
          onEscapeKeydown: handleEscapeKeydown,
          onOpenAutoFocus: (e) => e.preventDefault(),
          onCloseAutoFocus: (e) => e.preventDefault(),
          trapFocus: false,
          loop: false,
          preventScroll: false,
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
function Tooltip_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    sideOffset = 4,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Tooltip_content$1($$payload2, spread_props([
      {
        sideOffset,
        class: cn("bg-neutral-2 text-neutral-11 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 overflow-hidden rounded-md border px-3 py-1.5 text-sm shadow-md", className)
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
function TransformControls($$payload, $$props) {
  push();
  let { canvasId } = $$props;
  let canvas = getContext$1(canvasId);
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
    Root$3($$payload2, {
      delayDuration: 800,
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        Root$4($$payload3, {
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
                Trigger$2($$payload5, {
                  children: ($$payload6) => {
                    Button$1($$payload6, {
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
                Root$3($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Trigger$1($$payload6, {
                      children: ($$payload7) => {
                        Button$1($$payload7, {
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
                Root$3($$payload5, {
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
                Root$3($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Trigger$1($$payload6, {
                      children: ($$payload7) => {
                        Button$1($$payload7, {
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
                Root$3($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Trigger$1($$payload6, {
                      children: ($$payload7) => {
                        Button$1($$payload7, {
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
                Root$3($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Trigger$1($$payload6, {
                      children: ($$payload7) => {
                        Button$1($$payload7, {
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
                Root$3($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Trigger$1($$payload6, {
                      children: ($$payload7) => {
                        Button$1($$payload7, {
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
                Root$3($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Trigger$1($$payload6, {
                      children: ($$payload7) => {
                        Button$1($$payload7, {
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
                Root$3($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Trigger$1($$payload6, {
                      children: ($$payload7) => {
                        Button$1($$payload7, {
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
                Root$3($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Trigger$1($$payload6, {
                      children: ($$payload7) => {
                        Button$1($$payload7, {
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
                Root$3($$payload5, {
                  children: ($$payload6) => {
                    $$payload6.out += `<!---->`;
                    Trigger$1($$payload6, {
                      children: ($$payload7) => {
                        Button$1($$payload7, {
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
  getContext$1(canvasId);
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
    labelTranslate = { x: 0, y: 0 },
    // grid,
    onTranslate,
    onTransform: onTransformContainer,
    onClick
  } = $$props;
  const canvas = getContext$1(canvasId);
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
  selected ? getColor("accent", 8, canvas.mode.current) : getColor("brown", 10, canvas.mode.current);
  selected ? getColor("accent", 5, canvas.mode.current) : getColor("brown", 3, canvas.mode.current);
  selected ? getColor("accent", 11, canvas.mode.current) : getColor("brown", 11, canvas.mode.current);
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
  let canvas = getContext$1(canvasId);
  canvas.container.addLayer(plantingAreaLayerId);
  children($$payload);
  $$payload.out += `<!---->`;
  pop();
}
function createCanvasContainer(canvasId) {
  const containerId = canvasId;
  let pixelsPerMeter = 100;
  let stage = null;
  const layers = {};
  let initialized = false;
  let height = 0;
  let width = 0;
  const resizeFunctions = [
    /** Update the stage upon container resize. */
    () => {
      if (stage) {
        stage.width(width);
        stage.height(height);
      }
    }
  ];
  function addLayer(layerId) {
    if (!stage) {
      throw new AppError("Attempted to add a layer when the canvas is uninitialized.");
    }
    layers[layerId] = new Konva.Layer();
    stage.add(layers[layerId]);
    return layers[layerId];
  }
  function getLayer(layerId) {
    if (layers[layerId]) {
      return layers[layerId];
    }
    throw new AppError(`Attempted to retrieve layer '${layerId}' which does not exist.`);
  }
  function onResize() {
    resizeFunctions.forEach((func) => func());
  }
  function addResizeFunction(func) {
    resizeFunctions.push(func);
  }
  function initialize() {
    stage = new Konva.Stage({ container: containerId, width, height });
    initialized = true;
  }
  return {
    get containerId() {
      return containerId;
    },
    get stage() {
      return stage;
    },
    get pixelsPerMeter() {
      return pixelsPerMeter;
    },
    get initialized() {
      return initialized;
    },
    get width() {
      return width;
    },
    get height() {
      return height;
    },
    set width(newVal) {
      width = newVal;
    },
    set height(newVal) {
      height = newVal;
    },
    set pixelsPerMeter(newVal) {
      pixelsPerMeter = newVal;
    },
    initialize,
    addLayer,
    getLayer,
    onResize,
    addResizeFunction
  };
}
const isMobile = () => {
  {
    return false;
  }
};
class IsMobile {
  #current = false;
  constructor() {
  }
  get current() {
    return this.#current;
  }
}
const defaultButtonPosition = isMobile() ? "br" : "bl";
const minScaleFactor = 0.1;
const maxScaleFactor = 10;
function createCanvasTransform(container, draggable, strokeScale) {
  let scaleFactor = { x: 1, y: 1 };
  let position = { x: 0, y: 0 };
  const config = new LocalStore("layoutControls", {
    buttonsExpanded: true,
    buttonsPosition: defaultButtonPosition
  });
  function initialPosition() {
    return { x: 0, y: container.height };
  }
  function canvasXPos(modelPos) {
    return modelPos * container.pixelsPerMeter;
  }
  function modelXPos(canvasPos) {
    return canvasPos / container.pixelsPerMeter;
  }
  function canvasYPos(modelPos) {
    return -modelPos * container.pixelsPerMeter;
  }
  function modelYPos(canvasPos) {
    return -canvasPos / container.pixelsPerMeter;
  }
  function canvasDistance(modelDistance2) {
    return modelDistance2 * container.pixelsPerMeter;
  }
  function modelDistance(canvasDistance2) {
    return canvasDistance2 / container.pixelsPerMeter;
  }
  function reset() {
    scaleFactor = { x: 1, y: 1 };
    position = initialPosition();
  }
  function translate(translation) {
    position.x += translation.x;
    position.y += translation.y;
  }
  function addScale(scale) {
    if (scale === 0) {
      return;
    }
    if (scaleFactor.x <= minScaleFactor && scale < 0 || scaleFactor.x >= maxScaleFactor && scale > 0 || scaleFactor.y <= minScaleFactor && scale < 0 || scaleFactor.y >= maxScaleFactor && scale > 0) {
      return;
    }
    const preTransformedCenter = {
      x: container.width / 2,
      y: container.width / 2
    };
    const transformedCenter = {
      x: (preTransformedCenter.x - position.x) / scaleFactor.x,
      y: (preTransformedCenter.y - position.y) / scaleFactor.y
    };
    const newScaleFactor = {
      x: scale < 0 ? Math.max(scaleFactor.x + scale, minScaleFactor) : Math.min(scaleFactor.x + scale, maxScaleFactor),
      y: scale < 0 ? Math.max(scaleFactor.y + scale, minScaleFactor) : Math.min(scaleFactor.y + scale, maxScaleFactor)
    };
    scaleFactor = newScaleFactor;
    position = {
      x: preTransformedCenter.x - transformedCenter.x * scaleFactor.x,
      y: preTransformedCenter.y - transformedCenter.y * scaleFactor.y
    };
  }
  function addTransformFunction(func) {
  }
  function initialize() {
    if (!container.stage) {
      throw new AppError("Attempted to initialize canvas transform with uninitialized stage.");
    }
    position = initialPosition();
    container.stage.position(position);
    container.stage.draggable(draggable);
    container.stage.on("dragmove", () => {
      if (!container.stage) return;
      position = container.stage.position();
    });
  }
  return {
    get config() {
      return config.value;
    },
    get scaleFactor() {
      return scaleFactor;
    },
    set scaleFactor(newVal) {
      scaleFactor = newVal;
    },
    get position() {
      return position;
    },
    get strokeScale() {
      return strokeScale;
    },
    set config(newVal) {
      config.value = newVal;
    },
    set position(newVal) {
      position = newVal;
    },
    canvasXPos,
    modelXPos,
    canvasYPos,
    modelYPos,
    canvasDistance,
    modelDistance,
    translate,
    addScale,
    reset,
    addTransformFunction,
    initialize
  };
}
function roundUpToStep(number, step) {
  return Math.round(number / step) * step;
}
function roundDownToStep(number, step) {
  return Math.floor(number / step) * step;
}
function createCanvasGridManager(container, transform) {
  let gridlinesLayer = null;
  let backgroundGridlinesGroup = null;
  const config = localStore("layoutGridState", {
    snapToGrid: true,
    rightAngleConstraint: false,
    metersPerBackgroundGridline: 0.3048
  });
  const pixelsPerBackgroundGridline = container.pixelsPerMeter * config.value.metersPerBackgroundGridline;
  function initialize() {
    gridlinesLayer = container.addLayer("gridlines");
    backgroundGridlinesGroup = new Konva.Group();
    gridlinesLayer.add(backgroundGridlinesGroup);
    container.addResizeFunction(renderBackgroundGridlines);
    transform.addTransformFunction(renderBackgroundGridlines);
    renderBackgroundGridlines();
  }
  function snapToGrid(pos) {
    if (!config.value.snapToGrid) {
      return pos;
    }
    return {
      x: roundUpToStep(pos.x, pixelsPerBackgroundGridline / 2),
      y: roundUpToStep(pos.y, pixelsPerBackgroundGridline / 2)
    };
  }
  function renderBackgroundGridlines() {
    if (!gridlinesLayer || !backgroundGridlinesGroup) {
      return;
    }
    const viewableStartPosition = {
      x: -transform.position.x / transform.scaleFactor.x,
      y: -transform.position.y / transform.scaleFactor.y
    };
    const viewableEndPosition = {
      x: viewableStartPosition.x + container.width / transform.scaleFactor.x,
      y: viewableStartPosition.y + container.height / transform.scaleFactor.y
    };
    const startPosition = {
      x: roundDownToStep(viewableStartPosition.x, pixelsPerBackgroundGridline),
      y: roundDownToStep(viewableStartPosition.y, pixelsPerBackgroundGridline)
    };
    const endPosition = {
      x: roundUpToStep(viewableEndPosition.x + pixelsPerBackgroundGridline, pixelsPerBackgroundGridline),
      y: roundUpToStep(viewableEndPosition.y + pixelsPerBackgroundGridline, pixelsPerBackgroundGridline)
    };
    const numSegments = {
      x: Math.round((endPosition.y - startPosition.y) / pixelsPerBackgroundGridline),
      y: Math.round((endPosition.x - startPosition.x) / pixelsPerBackgroundGridline)
    };
    const gap = {
      x: pixelsPerBackgroundGridline,
      y: pixelsPerBackgroundGridline
    };
    backgroundGridlinesGroup.destroyChildren();
    for (let i = 0; i <= numSegments.x; i++) {
      const yPosition = startPosition.y + gap.x * i;
      let color = getColor("neutral", 3, derivedMode.current);
      let strokeWidth = 1;
      if (yPosition == 0) {
        color = getColor("neutral", 4, derivedMode.current);
        strokeWidth = 2;
      }
      backgroundGridlinesGroup.add(new Konva.Line({
        points: [
          startPosition.x,
          yPosition,
          endPosition.x,
          yPosition
        ],
        stroke: color,
        strokeWidth,
        strokeScaleEnabled: false
      }));
    }
    for (let i = 0; i <= numSegments.y; i++) {
      const xPosition = startPosition.x + gap.y * i;
      let color = getColor("neutral", 2, derivedMode.current);
      let strokeWidth = 1;
      if (xPosition == 0) {
        color = getColor("neutral", 3, derivedMode.current);
        strokeWidth = 2;
      }
      backgroundGridlinesGroup.add(new Konva.Line({
        points: [
          xPosition,
          startPosition.y,
          xPosition,
          endPosition.y
        ],
        stroke: color,
        strokeWidth,
        strokeScaleEnabled: false
      }));
    }
  }
  return {
    get config() {
      return config.value;
    },
    set config(newVal) {
      config.value = newVal;
    },
    initialize,
    snapToGrid
  };
}
function createSelectionGroup(container) {
  new Konva.Group();
  const selectTool = "pointer";
  container.stage?.on("mouseover", () => {
    setDocumentCursor();
  });
  container.stage?.on("mouseout", () => {
    document.body.style.cursor = "default";
  });
  function setDocumentCursor() {
    switch (selectTool) {
      case "pointer":
        document.body.style.cursor = "default";
        break;
      case "group":
        document.body.style.cursor = "crosshair";
        break;
      case "union":
        document.body.style.cursor = "crosshair";
        break;
      case "intersect":
        document.body.style.cursor = "crosshair";
        break;
    }
  }
  return { setDocumentCursor };
}
function createCanvasContext(canvasContextId, canvasWorkspaceId, mode, options = {}) {
  const canvasId = canvasContextId;
  const workspaceId2 = canvasWorkspaceId;
  const container = createCanvasContainer(canvasId);
  const transform = createCanvasTransform(container, options.draggable || true, options.strokeScale || true);
  const selectionGroup = createSelectionGroup(container);
  const gridManager = createCanvasGridManager(container, transform);
  function initialize() {
    container.initialize();
    transform.initialize();
  }
  function destroy() {
    if (container.stage) {
      container.stage.destroy();
    }
  }
  return {
    get canvasId() {
      return canvasId;
    },
    get workspaceId() {
      return workspaceId2;
    },
    transform,
    container,
    selectionGroup,
    gridManager,
    initialize,
    destroy,
    mode
  };
}
function setCanvasContext(canvasContextId, canvasWorkspaceId, mode, options = {}) {
  return setContext$1(canvasContextId, createCanvasContext(canvasContextId, canvasWorkspaceId, mode, options));
}
function getCanvasContext(canvasContextId) {
  return getContext$1(canvasContextId);
}
function resetCanvasContext(canvasContextId, canvasWorkspaceId, mode, options = {}) {
  const canvas = getContext$1(canvasContextId);
  if (canvas) {
    canvas.destroy();
  }
  return setContext$1(canvasContextId, createCanvasContext(canvasContextId, canvasWorkspaceId, mode, options));
}
function Popover_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    sideOffset = 4,
    align = "center",
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
        Popover_content$1($$payload3, spread_props([
          {
            sideOffset,
            align,
            class: cn("bg-neutral-3 text-neutral-11 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md outline-none", className)
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
const Root$2 = Popover;
const Trigger = Popover_trigger;
function FormErrorsPopover($$payload, $$props) {
  push();
  let { errors } = $$props;
  $$payload.out += `<!---->`;
  Root$2($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Trigger($$payload2, {
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
function FormInfoPopover($$payload, $$props) {
  push();
  let { description } = $$props;
  $$payload.out += `<!---->`;
  Root$2($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Trigger($$payload2, {
        class: "w-8",
        children: ($$payload3) => {
          Icon($$payload3, {
            icon: iconIds.formFieldDescriptionIcon,
            width: "1rem",
            class: "text-neutral-11 hover:text-neutral-10 ml-2"
          });
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Popover_content($$payload2, {
        class: "max-w-2xl",
        children: ($$payload3) => {
          $$payload3.out += `<!---->${escape_html(description)}`;
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
    Button$1($$payload, {
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
    Button$1($$payload, {
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
function Check($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "M20 6 9 17l-5-5" }]];
  Icon$1($$payload, spread_props([
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
function Minus($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "M5 12h14" }]];
  Icon$1($$payload, spread_props([
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
const units = {
  distance: {
    symbols: { metric: "m", imperial: "ft" },
    conversions: {
      metric: (meters) => {
        return meters * 3.280839895;
      },
      imperial: (feet) => {
        return feet * 0.3048;
      }
    }
  },
  temperature: {
    symbols: { metric: "°C", imperial: "°F" },
    conversions: {
      metric: (celsius) => {
        return celsius * (9 / 5) + 32;
      },
      imperial: (farenheight) => {
        return (farenheight - 32) * (5 / 9);
      }
    }
  },
  mass: {
    symbols: { metric: "kgs", imperial: "lbs" },
    conversions: {
      metric: (kilograms) => {
        return kilograms * 2.20462262185;
      },
      imperial: (pounds) => {
        return pounds * 0.45359237;
      }
    }
  },
  volume: {
    symbols: { metric: "L", imperial: "gal(US)" },
    conversions: {
      metric: (liters) => {
        return liters * 0.2641720524;
      },
      imperial: (gallons) => {
        return gallons * 3.785411784;
      }
    }
  }
};
function quantityToUnitSymbol(unitSystem, quantityType) {
  return units[quantityType].symbols[unitSystem];
}
function swapUnit(unitSystem) {
  return unitSystem === "metric" ? "imperial" : "metric";
}
function convertQuantity(quantity, unitSystem, quantityType) {
  return units[quantityType].conversions[unitSystem](quantity);
}
function convertQuantityToMetric(quantity, unitSystem, quantityType) {
  return unitSystem === "metric" ? quantity : convertQuantity(quantity, unitSystem, quantityType);
}
function createUnitAwareValues(quantityType, initialValuesMetric, initialUnitSystem = "metric", decimalPlaces = 2) {
  let unitSystem = initialUnitSystem;
  let displayValues = initialUnitSystem === "metric" ? initialValuesMetric : initialValuesMetric.map((value) => convertQuantity(value, "metric", quantityType));
  const metricValues = displayValues.map((value) => convertQuantityToMetric(value, unitSystem, quantityType));
  const unitSymbol = quantityToUnitSymbol(unitSystem, quantityType);
  function setDisplayValues(newVal) {
    const newDisplayValues = unitSystem === "metric" ? newVal : newVal.map((value) => roundToDecimalPlaces(convertQuantity(value, "metric", quantityType), decimalPlaces));
    newDisplayValues.forEach((value, index) => {
      if (value != displayValues[index]) {
        displayValues[index] = newDisplayValues[index];
      }
    });
  }
  function handleInput(event, index) {
    if (!(event.target instanceof HTMLInputElement) || !event.target.value) {
      return;
    }
    let newValue = parseFloat(event.target.value);
    if (!newValue) {
      newValue = 0;
    }
    displayValues[index] = newValue;
  }
  function swapUnits() {
    displayValues = displayValues.map((value) => roundToDecimalPlaces(convertQuantity(value, unitSystem, quantityType), decimalPlaces));
    unitSystem = swapUnit(unitSystem);
  }
  function metricToCurrentUnit(metricValue) {
    return unitSystem === "metric" ? metricValue : convertQuantity(metricValue, "metric", quantityType);
  }
  return {
    get unitSystem() {
      return unitSystem;
    },
    get displayValues() {
      return displayValues;
    },
    get metricValues() {
      return metricValues;
    },
    get unitSymbol() {
      return unitSymbol;
    },
    set displayValues(newVal) {
      displayValues = newVal;
    },
    setDisplayValues,
    handleInput,
    swapUnits,
    metricToCurrentUnit
  };
}
function CoordinateInput($$payload, $$props) {
  push();
  let {
    x = void 0,
    y = void 0,
    initialUnitSystem,
    onValueChange,
    decimalPlaces = 2,
    step = 0.01,
    min,
    max,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const unitAwareValues = createUnitAwareValues("distance", [x, y], initialUnitSystem, decimalPlaces);
  let unitAwareMin = (() => {
    if (min) {
      return unitAwareValues.metricToCurrentUnit(min);
    } else {
      return "";
    }
  })();
  let unitAwareMax = (() => {
    if (max) {
      return unitAwareValues.metricToCurrentUnit(max);
    } else {
      return "";
    }
  })();
  $$payload.out += `<div${spread_attributes(
    {
      ...restProps,
      class: "@container h-full w-full"
    }
  )}><div class="@xs:flex-row flex w-full grid-cols-3 grid-rows-2 flex-col justify-between"><div class="flex w-full"><span class="bg-neutral-2 border-neutral-7 border-r-neutral-5 @xs:rounded-bl-md @xs:border-b flex h-10 w-8 items-center justify-center rounded-l-md rounded-bl-none border border-b-0 border-r-0 px-3 text-sm">X</span> `;
  Input($$payload, {
    value: unitAwareValues.displayValues[0],
    type: "number",
    step,
    min: unitAwareMin,
    max: unitAwareMax,
    oninput: (event) => {
      unitAwareValues.handleInput(event, 0);
      x = unitAwareValues.metricValues[0];
      if (onValueChange) {
        onValueChange({
          x: unitAwareValues.metricValues[0],
          y: unitAwareValues.metricValues[1]
        });
      }
    },
    class: "@xs:border-b @xs:rounded-tr-none w-full rounded-l-none rounded-r-none rounded-tr-md border-b-0"
  });
  $$payload.out += `<!----></div> <div class="flex w-full"><span class="bg-neutral-2 border-neutral-7 @xs:border-x-neutral-5 @xs:border-b @xs:border-l-0 flex h-10 w-8 items-center justify-center rounded-none border border-b-0 border-r-0 px-3 text-sm">Y</span> `;
  Input($$payload, {
    value: unitAwareValues.displayValues[1],
    type: "number",
    step,
    min: unitAwareMin,
    max: unitAwareMax,
    oninput: (event) => {
      unitAwareValues.handleInput(event, 1);
      y = unitAwareValues.metricValues[1];
      if (onValueChange) {
        onValueChange({
          x: unitAwareValues.metricValues[0],
          y: unitAwareValues.metricValues[1]
        });
      }
    },
    class: "@xs:border-b rounded-l-none rounded-r-none border-b-0"
  });
  $$payload.out += `<!----></div> <span${attr_class(`border-x-neutral-7 @xs:border-x-neutral-5 bg-neutral-2 border-neutral-7 @xs:h-10 @xs:w-8 @xs:border-b @xs:border-l-0 flex h-8 w-full min-w-10 items-center justify-center border-x border-y border-b-0 px-3 ${stringify(unitAwareValues.unitSystem === "metric" ? "text-lg" : "text-md")} text-neutral-11`)}>${escape_html(unitAwareValues.unitSymbol)}</span> <!---->`;
  Button($$payload, {
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
  Button($$payload, {
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
function UnitAwareInput($$payload, $$props) {
  push();
  let {
    value: metricValue = void 0,
    quantityType,
    initialUnitSystem,
    oninput,
    decimalPlaces = 2,
    step = 0.01,
    min,
    max,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const unitAwareValues = createUnitAwareValues(quantityType, [metricValue], initialUnitSystem, decimalPlaces);
  let unitAwareMin = (() => {
    if (min) {
      return unitAwareValues.metricToCurrentUnit(min);
    } else {
      return "";
    }
  })();
  let unitAwareMax = (() => {
    if (max) {
      return unitAwareValues.metricToCurrentUnit(max);
    } else {
      return "";
    }
  })();
  $$payload.out += `<div class="flex w-full items-center justify-between gap-0">`;
  Input($$payload, spread_props([
    {
      value: unitAwareValues.displayValues[0],
      type: "number",
      step,
      min: unitAwareMin,
      max: unitAwareMax
    },
    restProps,
    {
      oninput: (event) => {
        unitAwareValues.handleInput(event, 0);
        metricValue = unitAwareValues.metricValues[0];
        if (oninput) {
          oninput(metricValue);
        }
      },
      class: "rounded-r-none border-r-0 "
    }
  ]));
  $$payload.out += `<!----> <span${attr_class(`border-x-neutral-5 bg-neutral-2 border-neutral-7 flex h-10 w-auto min-w-10 items-center justify-center border-y border-l px-3 ${stringify(unitAwareValues.unitSystem === "metric" && quantityType === "distance" ? "text-lg" : "text-md")} text-neutral-11`)}>${escape_html(unitAwareValues.unitSymbol)}</span> <!---->`;
  Button($$payload, {
    onclick: unitAwareValues.swapUnits,
    type: "button",
    class: "border-l-neutral-5 border-neutral-7 bg-neutral-2 hover:bg-neutral-3 h-10 rounded-r-md border px-2",
    children: ($$payload2) => {
      Icon($$payload2, {
        icon: "material-symbols:swap-horiz-rounded",
        width: "1rem"
      });
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div>`;
  bind_props($$props, { value: metricValue });
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
function Calendar($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M8 2v4" }],
    ["path", { "d": "M16 2v4" }],
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "4",
        "rx": "2"
      }
    ],
    ["path", { "d": "M3 10h18" }]
  ];
  Icon$1($$payload, spread_props([
    { name: "calendar" },
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
function Calendar_cell($$payload, $$props) {
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
    Calendar_cell$1($$payload2, spread_props([
      {
        class: cn("[&:has([data-selected])]:bg-accent-5 [&:has([data-selected][data-outside-month])]:bg-accent-5/50 relative size-9 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:rounded-md", className)
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
function Calendar_day($$payload, $$props) {
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
    Calendar_day$1($$payload2, spread_props([
      {
        class: cn(
          buttonVariants({ variant: "ghost" }),
          "size-9 p-0 font-normal",
          "[&[data-today]:not([data-selected])]:bg-accent-5 [&[data-today]:not([data-selected])]:text-accent-12",
          // Selected
          "data-[selected]:bg-primary-5 data-[selected]:text-primary-12 data-[selected]:hover:bg-primary-5 data-[selected]:hover:text-primary-12 data-[selected]:focus:bg-primary-5 data-[selected]:focus:text-primary-12 data-[selected]:opacity-100",
          // Disabled
          "data-[disabled]:text-neutral-11 data-[disabled]:opacity-50",
          // Unavailable
          "data-[unavailable]:text-destructive-12 data-[unavailable]:line-through",
          // Outside months
          "data-[outside-month]:text-neutral-11 [&[data-outside-month][data-selected]]:bg-accent-5/50 [&[data-outside-month][data-selected]]:text-neutral-11 data-[outside-month]:pointer-events-none data-[outside-month]:opacity-50 [&[data-outside-month][data-selected]]:opacity-30",
          className
        )
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
function Calendar_grid_body($$payload, $$props) {
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
    Calendar_grid_body$1($$payload2, spread_props([
      { class: cn(className) },
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
function Calendar_grid_head($$payload, $$props) {
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
    Calendar_grid_head$1($$payload2, spread_props([
      { class: cn(className) },
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
function Calendar_grid_row($$payload, $$props) {
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
    Calendar_grid_row$1($$payload2, spread_props([
      { class: cn("flex", className) },
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
function Calendar_grid($$payload, $$props) {
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
    Calendar_grid$1($$payload2, spread_props([
      {
        class: cn("w-full border-collapse space-y-1", className)
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
function Calendar_head_cell($$payload, $$props) {
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
    Calendar_head_cell$1($$payload2, spread_props([
      {
        class: cn("text-neutral-11 w-9 rounded-md text-[0.8rem] font-normal", className)
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
function Calendar_header($$payload, $$props) {
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
    Calendar_header$1($$payload2, spread_props([
      {
        class: cn("relative flex w-full items-center justify-between pt-1", className)
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
function Calendar_heading($$payload, $$props) {
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
    Calendar_heading$1($$payload2, spread_props([
      {
        class: cn("text-sm font-medium", className)
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
function Calendar_months($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      class: clsx(cn("mt-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0", className)),
      ...restProps
    }
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
function Fallback$1($$payload) {
  Icon($$payload, { icon: iconIds.chevronRight, width: "1rem" });
}
function Calendar_next_button($$payload, $$props) {
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
    Calendar_next_button$1($$payload2, spread_props([
      {
        class: cn(buttonVariants({ variant: "outline" }), "size-7 bg-transparent p-0 opacity-50 hover:opacity-100", className),
        children: children || Fallback$1
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
function Fallback($$payload) {
  Icon($$payload, { icon: iconIds.chevronLeft, width: "1rem" });
}
function Calendar_prev_button($$payload, $$props) {
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
    Calendar_prev_button$1($$payload2, spread_props([
      {
        class: cn(buttonVariants({ variant: "outline" }), "size-7 bg-transparent p-0 opacity-50 hover:opacity-100", className),
        children: children || Fallback
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
function Calendar_1($$payload, $$props) {
  push();
  let {
    ref = null,
    value = void 0,
    placeholder = void 0,
    class: className,
    weekdayFormat = "short",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    {
      let children = function($$payload3, { months, weekdays }) {
        $$payload3.out += `<!---->`;
        Calendar_header($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->`;
            Calendar_prev_button($$payload4, {});
            $$payload4.out += `<!----> <!---->`;
            Calendar_heading($$payload4, {});
            $$payload4.out += `<!----> <!---->`;
            Calendar_next_button($$payload4, {});
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <!---->`;
        Calendar_months($$payload3, {
          children: ($$payload4) => {
            const each_array = ensure_array_like(months);
            $$payload4.out += `<!--[-->`;
            for (let $$index_3 = 0, $$length = each_array.length; $$index_3 < $$length; $$index_3++) {
              let month = each_array[$$index_3];
              $$payload4.out += `<!---->`;
              Calendar_grid($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<!---->`;
                  Calendar_grid_head($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->`;
                      Calendar_grid_row($$payload6, {
                        class: "flex",
                        children: ($$payload7) => {
                          const each_array_1 = ensure_array_like(weekdays);
                          $$payload7.out += `<!--[-->`;
                          for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
                            let weekday = each_array_1[$$index];
                            $$payload7.out += `<!---->`;
                            Calendar_head_cell($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->${escape_html(weekday.slice(0, 2))}`;
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
                  $$payload5.out += `<!----> <!---->`;
                  Calendar_grid_body($$payload5, {
                    children: ($$payload6) => {
                      const each_array_2 = ensure_array_like(month.weeks);
                      $$payload6.out += `<!--[-->`;
                      for (let $$index_2 = 0, $$length2 = each_array_2.length; $$index_2 < $$length2; $$index_2++) {
                        let weekDates = each_array_2[$$index_2];
                        $$payload6.out += `<!---->`;
                        Calendar_grid_row($$payload6, {
                          class: "mt-2 w-full",
                          children: ($$payload7) => {
                            const each_array_3 = ensure_array_like(weekDates);
                            $$payload7.out += `<!--[-->`;
                            for (let $$index_1 = 0, $$length3 = each_array_3.length; $$index_1 < $$length3; $$index_1++) {
                              let date = each_array_3[$$index_1];
                              $$payload7.out += `<!---->`;
                              Calendar_cell($$payload7, {
                                date,
                                month: month.value,
                                children: ($$payload8) => {
                                  $$payload8.out += `<!---->`;
                                  Calendar_day($$payload8, {});
                                  $$payload8.out += `<!---->`;
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
                      }
                      $$payload6.out += `<!--]-->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
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
      };
      Calendar$1($$payload2, spread_props([
        {
          weekdayFormat,
          class: cn("p-3", className)
        },
        restProps,
        {
          get value() {
            return value;
          },
          set value($$value) {
            value = $$value;
            $$settled = false;
          },
          get ref() {
            return ref;
          },
          set ref($$value) {
            ref = $$value;
            $$settled = false;
          },
          get placeholder() {
            return placeholder;
          },
          set placeholder($$value) {
            placeholder = $$value;
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
  bind_props($$props, { ref, value, placeholder });
  pop();
}
function DatePicker($$payload, $$props) {
  push();
  let {
    value = void 0,
    compact = false,
    minValue,
    maxValue,
    onValueChange,
    disabled = false
  } = $$props;
  const df = new DateFormatter("en-US", {
    day: "2-digit",
    month: "short",
    year: "2-digit"
  });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Root$2($$payload2, {
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        Trigger($$payload3, {
          class: cn(
            buttonVariants({
              variant: "outline",
              class: "w-full justify-start text-left font-normal"
            }),
            !value && "text-muted-foreground",
            compact && "px-2 text-xs"
          ),
          children: ($$payload4) => {
            if (!compact) {
              $$payload4.out += "<!--[-->";
              Calendar($$payload4, {});
            } else {
              $$payload4.out += "<!--[!-->";
            }
            $$payload4.out += `<!--]--> ${escape_html(value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date")}`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <!---->`;
        Popover_content($$payload3, {
          class: "w-auto p-0",
          children: ($$payload4) => {
            Calendar_1($$payload4, {
              type: "single",
              onValueChange,
              minValue,
              maxValue,
              disabled,
              get value() {
                return value;
              },
              set value($$value) {
                value = $$value;
                $$settled = false;
              }
            });
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
  bind_props($$props, { value });
  pop();
}
function Date$1($$payload, $$props) {
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
    Button$1($$payload, {
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
    Button$1($$payload, {
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
function Chevron_down($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
  Icon$1($$payload, spread_props([
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
  Icon$1($$payload, spread_props([
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
function Separator($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    orientation = "horizontal",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Separator$1($$payload2, spread_props([
      {
        class: cn("bg-neutral-7 shrink-0", orientation === "horizontal" ? "h-[1px] w-full" : "min-h-full w-[1px]", className),
        orientation
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
const Root$1 = Select;
const Group$1 = Select_group;
function DynamicSelect($$payload, $$props) {
  push();
  let { value, editing, onChange } = $$props;
  const selectTrigger = value.options.find((option) => option.id === value.id) ?? { label: "Make a selection" };
  if (editing) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    Root$1($$payload, {
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
            Group$1($$payload3, {
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
function GeometrySelect($$payload, $$props) {
  push();
  let {
    value = void 0,
    label = void 0,
    onValueChange
  } = $$props;
  const geometryTypeOptions = [
    {
      value: "RECTANGLE",
      label: "Rectangle",
      icon: iconIds.rectangleIcon
    },
    {
      value: "POLYGON",
      label: "Polygon",
      icon: iconIds.polygonIcon
    },
    {
      value: "ELLIPSE",
      label: "Ellipse",
      icon: iconIds.ellipseIcon
    },
    {
      value: "LINES",
      label: "Lines",
      icon: iconIds.linesIcon
    }
  ];
  const geometryTypeSelectTrigger = geometryTypeOptions.find((option) => option.value === value) ?? { label: "Select a type", icon: null };
  $$payload.out += `<!---->`;
  Root$1($$payload, {
    type: "single",
    value,
    items: geometryTypeOptions,
    onValueChange: (value2) => {
      if (onValueChange) {
        onValueChange(value2);
      }
    },
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Select_trigger($$payload2, {
        class: "w-full",
        children: ($$payload3) => {
          $$payload3.out += `<div class="flex w-full items-center justify-between px-2"><span>${escape_html(geometryTypeSelectTrigger.label)}</span> `;
          if (geometryTypeSelectTrigger.icon) {
            $$payload3.out += "<!--[-->";
            Icon($$payload3, {
              icon: geometryTypeSelectTrigger.icon,
              width: "1.5rem",
              class: "text-neutral-11 ml-4"
            });
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--></div>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Select_content($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          Group$1($$payload3, {
            children: ($$payload4) => {
              const each_array = ensure_array_like(geometryTypeOptions);
              $$payload4.out += `<!--[-->`;
              for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                let option = each_array[$$index];
                $$payload4.out += `<!---->`;
                Select_item($$payload4, {
                  value: option.value,
                  label: option.label,
                  children: ($$payload5) => {
                    $$payload5.out += `<div class="flex w-full items-center justify-between px-2"><span>${escape_html(option.label)}</span> `;
                    if (option.icon) {
                      $$payload5.out += "<!--[-->";
                      Icon($$payload5, {
                        icon: option.icon,
                        width: "1rem",
                        class: "text-neutral-11 ml-4"
                      });
                    } else {
                      $$payload5.out += "<!--[!-->";
                    }
                    $$payload5.out += `<!--]--></div>`;
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
  bind_props($$props, { value, label });
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
function String$1($$payload, $$props) {
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
function Textarea($$payload, $$props) {
  push();
  let {
    ref = null,
    value = void 0,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<textarea${spread_attributes(
    {
      class: clsx(cn("border-neutral-7 bg-neutral-1 ring-offset-neutral-1 placeholder:text-neutral-11 focus-visible:ring-primary-6 flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)),
      ...restProps
    }
  )}>`;
  const $$body = escape_html(value);
  if ($$body) {
    $$payload.out += `${$$body}`;
  }
  $$payload.out += `</textarea>`;
  bind_props($$props, { ref, value });
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
  const workspaceId2 = locationBaseId + "workspace";
  const deleteId = locationBaseId + "delete";
  const dateItem = {
    id: dateId,
    label: "Date",
    description: workspaceFields.locationDateSchema.description,
    valueComponent: Date$1,
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
    id: workspaceId2,
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
  const locationItems = value.locationHistory.locations.map((location2, index) => {
    const numLocations = value.locationHistory?.locations.length;
    const includeDelete = numLocations && numLocations > 1 ? true : false;
    return locationTreeItem(locationHistoryBaseId, { location: location2, workspaces: value.workspaces, index }, { includeDelete }, { updateHandler: ctx.locationUpdateHandler, fieldErrors: ctx.fieldErrors });
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
function plantingAreaTreeItem(value, ctx) {
  const baseId = toTreeBaseId("plantingArea", value.plantingArea.id);
  const nameId = toTreeId(baseId, "name");
  const descriptionId = toTreeId(baseId, "description");
  const depthId = toTreeId(baseId, "depth");
  const geometryItem = geometryTreeItem(toTreeId(baseId, "geometry"), { geometry: value.plantingArea.geometry, index: 0 }, {
    includeIndex: false
  }, {
    updateHandler: ctx.geometryUpdateHandler,
    fieldErrors: ctx.fieldErrors
  });
  const locationHistoryItem = locationHistoryTreeItem(baseId, {
    locationHistory: value.plantingArea.locationHistory,
    workspaces: value.workspaces
  }, {
    locationUpdateHandler: ctx.locationUpdateHandler,
    onLocationHistoryExtend: ctx.locationHistoryExtendHandler,
    fieldErrors: ctx.fieldErrors
  });
  const nameItem = {
    id: nameId,
    label: "Name",
    description: workspaceFields.plantingAreaNameSchema.description,
    valueComponent: String$1,
    value: value.plantingArea.name,
    onChange: (newData) => {
      if (!fieldValid(nameId, newData, workspaceFields.plantingAreaNameSchema, ctx.fieldErrors)) {
        return;
      }
      ctx.plantingAreaUpdateHandler(value.plantingArea.id, { name: newData });
    }
  };
  const descriptionItem = {
    id: descriptionId,
    label: "Description",
    description: workspaceFields.plantingAreaDescriptionSchema.description,
    valueComponent: Textarea_1,
    value: value.plantingArea.description,
    onChange: (newData) => {
      if (!fieldValid(descriptionId, newData, workspaceFields.plantingAreaDescriptionSchema, ctx.fieldErrors)) {
        return;
      }
      ctx.plantingAreaUpdateHandler(value.plantingArea.id, {
        description: newData
      });
    }
  };
  const depthItem = {
    id: depthId,
    label: "Depth",
    description: workspaceFields.plantingAreaDepthSchema.description,
    valueComponent: Distance,
    value: value.plantingArea.depth,
    onChange: (newData) => {
      if (!fieldValid(depthId, newData, workspaceFields.plantingAreaDepthSchema, ctx.fieldErrors)) {
        return;
      }
      ctx.plantingAreaUpdateHandler(value.plantingArea.id, { depth: newData });
    }
  };
  return {
    id: baseId,
    label: value.plantingArea.name,
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
const msPerDay = 1e3 * 60 * 60 * 24;
const monthStrings = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec"
};
function calendarDateToUtc(date) {
  return date.toDate("UTC");
}
function calculateDeltaDays(current, prev2) {
  return Math.round((current.toDate(getLocalTimeZone()).getTime() - prev2.toDate(getLocalTimeZone()).getTime()) / msPerDay);
}
function getMonthString(monthNumber) {
  return monthStrings[monthNumber];
}
const tickLineWidth = 2;
const tickLabelThreshold = 16;
const baseTickClass = "self-end flex items-end h-[14px]";
const baseTickDayLabelClass = "absolute text-[9px] text-neutral-9 w-[14px] text-center";
const baseTickLineClass = `bg-neutral-7 h-[12px] w-[2px] rounded-t-lg`;
function assert(expectedCondition, message = "Assertion failed!") {
  if (!expectedCondition) {
    console.error(message);
    throw new Error(message);
  }
}
const PRECISION = 10;
function areNumbersAlmostEqual(actual, expected, fractionDigits = PRECISION) {
  return compareNumbersWithTolerance(actual, expected, fractionDigits) === 0;
}
function compareNumbersWithTolerance(actual, expected, fractionDigits = PRECISION) {
  const roundedActual = roundTo(actual, fractionDigits);
  const roundedExpected = roundTo(expected, fractionDigits);
  return Math.sign(roundedActual - roundedExpected);
}
function areArraysEqual(arrA, arrB) {
  if (arrA.length !== arrB.length)
    return false;
  for (let index = 0; index < arrA.length; index++) {
    if (arrA[index] !== arrB[index])
      return false;
  }
  return true;
}
function roundTo(value, decimals) {
  return Number.parseFloat(value.toFixed(decimals));
}
const isBrowser = typeof document !== "undefined";
function isKeyDown(event) {
  return event.type === "keydown";
}
function isMouseEvent(event) {
  return event.type.startsWith("mouse");
}
function isTouchEvent(event) {
  return event.type.startsWith("touch");
}
function resizePane({ paneConstraints: paneConstraintsArray, paneIndex, initialSize }) {
  const paneConstraints = paneConstraintsArray[paneIndex];
  assert(paneConstraints != null, "Pane constraints should not be null.");
  const { collapsedSize = 0, collapsible, maxSize = 100, minSize = 0 } = paneConstraints;
  let newSize = initialSize;
  if (compareNumbersWithTolerance(newSize, minSize) < 0) {
    newSize = getAdjustedSizeForCollapsible(newSize, collapsible, collapsedSize, minSize);
  }
  newSize = Math.min(maxSize, newSize);
  return Number.parseFloat(newSize.toFixed(PRECISION));
}
function getAdjustedSizeForCollapsible(size, collapsible, collapsedSize, minSize) {
  if (!collapsible)
    return minSize;
  const halfwayPoint = (collapsedSize + minSize) / 2;
  return compareNumbersWithTolerance(size, halfwayPoint) < 0 ? collapsedSize : minSize;
}
function noop() {
}
function getResizeHandleElementsForGroup(groupId) {
  if (!isBrowser)
    return [];
  return Array.from(document.querySelectorAll(`[data-pane-resizer-id][data-pane-group-id="${groupId}"]`));
}
function getResizeHandleElementIndex(groupId, id) {
  if (!isBrowser)
    return null;
  const handles = getResizeHandleElementsForGroup(groupId);
  const index = handles.findIndex((handle) => handle.getAttribute("data-pane-resizer-id") === id);
  return index ?? null;
}
function getPivotIndices(groupId, dragHandleId) {
  const index = getResizeHandleElementIndex(groupId, dragHandleId);
  return index != null ? [index, index + 1] : [-1, -1];
}
function paneDataHelper(paneDataArray, paneData, layout) {
  const paneConstraintsArray = paneDataArray.map((paneData2) => paneData2.constraints);
  const paneIndex = findPaneDataIndex(paneDataArray, paneData);
  const paneConstraints = paneConstraintsArray[paneIndex];
  const isLastPane = paneIndex === paneDataArray.length - 1;
  const pivotIndices = isLastPane ? [paneIndex - 1, paneIndex] : [paneIndex, paneIndex + 1];
  const paneSize = layout[paneIndex];
  return {
    ...paneConstraints,
    paneSize,
    pivotIndices
  };
}
function findPaneDataIndex(paneDataArray, paneData) {
  return paneDataArray.findIndex((prevPaneData) => prevPaneData.id === paneData.id);
}
function callPaneCallbacks(paneArray, layout, paneIdToLastNotifiedSizeMap) {
  for (let index = 0; index < layout.length - 1; index++) {
    const size = layout[index];
    const paneData = paneArray[index];
    assert(paneData);
    const { callbacks, constraints: constraints2, id: paneId } = paneData;
    const { collapsedSize = 0, collapsible } = constraints2;
    const lastNotifiedSize = paneIdToLastNotifiedSizeMap[paneId];
    if (!(lastNotifiedSize == null || size !== lastNotifiedSize))
      return;
    paneIdToLastNotifiedSizeMap[paneId] = size;
    const { onCollapse, onExpand, onResize } = callbacks;
    onResize?.(size, lastNotifiedSize);
    if (collapsible && (onCollapse || onExpand)) {
      if (onExpand && (lastNotifiedSize == null || lastNotifiedSize === collapsedSize) && size !== collapsedSize) {
        onExpand();
      }
      if (onCollapse && (lastNotifiedSize == null || lastNotifiedSize !== collapsedSize) && size === collapsedSize) {
        onCollapse();
      }
    }
  }
}
function getPaneGroupElement(id) {
  if (!isBrowser)
    return null;
  const element2 = document.querySelector(`[data-pane-group][data-pane-group-id="${id}"]`);
  if (element2) {
    return element2;
  }
  return null;
}
function getResizeHandleElement(id) {
  if (!isBrowser)
    return null;
  const element2 = document.querySelector(`[data-pane-resizer-id="${id}"]`);
  if (element2) {
    return element2;
  }
  return null;
}
function getDragOffsetPercentage(e, dragHandleId, dir, initialDragState) {
  const isHorizontal = dir === "horizontal";
  const handleElement = getResizeHandleElement(dragHandleId);
  assert(handleElement);
  const groupId = handleElement.getAttribute("data-pane-group-id");
  assert(groupId);
  const { initialCursorPosition } = initialDragState;
  const cursorPosition = getResizeEventCursorPosition(dir, e);
  const groupElement = getPaneGroupElement(groupId);
  assert(groupElement);
  const groupRect = groupElement.getBoundingClientRect();
  const groupSizeInPixels = isHorizontal ? groupRect.width : groupRect.height;
  const offsetPixels = cursorPosition - initialCursorPosition;
  const offsetPercentage = offsetPixels / groupSizeInPixels * 100;
  return offsetPercentage;
}
function getDeltaPercentage(e, dragHandleId, dir, initialDragState, keyboardResizeBy) {
  if (isKeyDown(e)) {
    const isHorizontal = dir === "horizontal";
    let delta = 0;
    if (e.shiftKey) {
      delta = 100;
    } else if (keyboardResizeBy != null) {
      delta = keyboardResizeBy;
    } else {
      delta = 10;
    }
    let movement = 0;
    switch (e.key) {
      case "ArrowDown":
        movement = isHorizontal ? 0 : delta;
        break;
      case "ArrowLeft":
        movement = isHorizontal ? -delta : 0;
        break;
      case "ArrowRight":
        movement = isHorizontal ? delta : 0;
        break;
      case "ArrowUp":
        movement = isHorizontal ? 0 : -delta;
        break;
      case "End":
        movement = 100;
        break;
      case "Home":
        movement = -100;
        break;
    }
    return movement;
  } else {
    if (initialDragState == null)
      return 0;
    return getDragOffsetPercentage(e, dragHandleId, dir, initialDragState);
  }
}
function getResizeEventCursorPosition(dir, e) {
  const isHorizontal = dir === "horizontal";
  if (isMouseEvent(e)) {
    return isHorizontal ? e.clientX : e.clientY;
  } else if (isTouchEvent(e)) {
    const firstTouch = e.touches[0];
    assert(firstTouch);
    return isHorizontal ? firstTouch.screenX : firstTouch.screenY;
  } else {
    throw new Error(`Unsupported event type "${e.type}"`);
  }
}
function getResizeHandlePaneIds(groupId, handleId, panesArray) {
  const handle = getResizeHandleElement(handleId);
  const handles = getResizeHandleElementsForGroup(groupId);
  const index = handle ? handles.indexOf(handle) : -1;
  const idBefore = panesArray[index]?.id ?? null;
  const idAfter = panesArray[index + 1]?.id ?? null;
  return [idBefore, idAfter];
}
let count$1 = 0;
function useId$1(prefix = "paneforge") {
  count$1++;
  return `${prefix}-${count$1}`;
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
function adjustLayoutByDelta({ delta, layout: prevLayout, paneConstraints: paneConstraintsArray, pivotIndices, trigger }) {
  if (areNumbersAlmostEqual(delta, 0))
    return prevLayout;
  const nextLayout = [...prevLayout];
  const [firstPivotIndex, secondPivotIndex] = pivotIndices;
  let deltaApplied = 0;
  {
    if (trigger === "keyboard") {
      {
        const index = delta < 0 ? secondPivotIndex : firstPivotIndex;
        const paneConstraints = paneConstraintsArray[index];
        assert(paneConstraints);
        if (paneConstraints.collapsible) {
          const prevSize = prevLayout[index];
          assert(prevSize != null);
          const paneConstraints2 = paneConstraintsArray[index];
          assert(paneConstraints2);
          const { collapsedSize = 0, minSize = 0 } = paneConstraints2;
          if (areNumbersAlmostEqual(prevSize, collapsedSize)) {
            const localDelta = minSize - prevSize;
            if (compareNumbersWithTolerance(localDelta, Math.abs(delta)) > 0) {
              delta = delta < 0 ? 0 - localDelta : localDelta;
            }
          }
        }
      }
      {
        const index = delta < 0 ? firstPivotIndex : secondPivotIndex;
        const paneConstraints = paneConstraintsArray[index];
        assert(paneConstraints);
        const { collapsible } = paneConstraints;
        if (collapsible) {
          const prevSize = prevLayout[index];
          assert(prevSize != null);
          const paneConstraints2 = paneConstraintsArray[index];
          assert(paneConstraints2);
          const { collapsedSize = 0, minSize = 0 } = paneConstraints2;
          if (areNumbersAlmostEqual(prevSize, minSize)) {
            const localDelta = prevSize - collapsedSize;
            if (compareNumbersWithTolerance(localDelta, Math.abs(delta)) > 0) {
              delta = delta < 0 ? 0 - localDelta : localDelta;
            }
          }
        }
      }
    }
  }
  {
    const increment = delta < 0 ? 1 : -1;
    let index = delta < 0 ? secondPivotIndex : firstPivotIndex;
    let maxAvailableDelta = 0;
    while (true) {
      const prevSize = prevLayout[index];
      assert(prevSize != null);
      const maxSafeSize = resizePane({
        paneConstraints: paneConstraintsArray,
        paneIndex: index,
        initialSize: 100
      });
      const delta2 = maxSafeSize - prevSize;
      maxAvailableDelta += delta2;
      index += increment;
      if (index < 0 || index >= paneConstraintsArray.length) {
        break;
      }
    }
    const minAbsDelta = Math.min(Math.abs(delta), Math.abs(maxAvailableDelta));
    delta = delta < 0 ? 0 - minAbsDelta : minAbsDelta;
  }
  {
    const pivotIndex = delta < 0 ? firstPivotIndex : secondPivotIndex;
    let index = pivotIndex;
    while (index >= 0 && index < paneConstraintsArray.length) {
      const deltaRemaining = Math.abs(delta) - Math.abs(deltaApplied);
      const prevSize = prevLayout[index];
      assert(prevSize != null);
      const unsafeSize = prevSize - deltaRemaining;
      const safeSize = resizePane({
        paneConstraints: paneConstraintsArray,
        paneIndex: index,
        initialSize: unsafeSize
      });
      if (!areNumbersAlmostEqual(prevSize, safeSize)) {
        deltaApplied += prevSize - safeSize;
        nextLayout[index] = safeSize;
        if (deltaApplied.toPrecision(3).localeCompare(Math.abs(delta).toPrecision(3), void 0, {
          numeric: true
        }) >= 0) {
          break;
        }
      }
      if (delta < 0) {
        index--;
      } else {
        index++;
      }
    }
  }
  if (areNumbersAlmostEqual(deltaApplied, 0)) {
    return prevLayout;
  }
  {
    const pivotIndex = delta < 0 ? secondPivotIndex : firstPivotIndex;
    const prevSize = prevLayout[pivotIndex];
    assert(prevSize != null);
    const unsafeSize = prevSize + deltaApplied;
    const safeSize = resizePane({
      paneConstraints: paneConstraintsArray,
      paneIndex: pivotIndex,
      initialSize: unsafeSize
    });
    nextLayout[pivotIndex] = safeSize;
    if (!areNumbersAlmostEqual(safeSize, unsafeSize)) {
      let deltaRemaining = unsafeSize - safeSize;
      const pivotIndex2 = delta < 0 ? secondPivotIndex : firstPivotIndex;
      let index = pivotIndex2;
      while (index >= 0 && index < paneConstraintsArray.length) {
        const prevSize2 = nextLayout[index];
        assert(prevSize2 != null);
        const unsafeSize2 = prevSize2 + deltaRemaining;
        const safeSize2 = resizePane({
          paneConstraints: paneConstraintsArray,
          paneIndex: index,
          initialSize: unsafeSize2
        });
        if (!areNumbersAlmostEqual(prevSize2, safeSize2)) {
          deltaRemaining -= safeSize2 - prevSize2;
          nextLayout[index] = safeSize2;
        }
        if (areNumbersAlmostEqual(deltaRemaining, 0))
          break;
        delta > 0 ? index-- : index++;
      }
    }
  }
  const totalSize = nextLayout.reduce((total, size) => size + total, 0);
  if (!areNumbersAlmostEqual(totalSize, 100))
    return prevLayout;
  return nextLayout;
}
let currentState = null;
let element = null;
function getCursorStyle(state) {
  switch (state) {
    case "horizontal":
      return "ew-resize";
    case "horizontal-max":
      return "w-resize";
    case "horizontal-min":
      return "e-resize";
    case "vertical":
      return "ns-resize";
    case "vertical-max":
      return "n-resize";
    case "vertical-min":
      return "s-resize";
  }
}
function resetGlobalCursorStyle() {
  if (element === null)
    return;
  document.head.removeChild(element);
  currentState = null;
  element = null;
}
function setGlobalCursorStyle(state) {
  if (currentState === state)
    return;
  currentState = state;
  const style = getCursorStyle(state);
  if (element === null) {
    element = document.createElement("style");
    document.head.appendChild(element);
  }
  element.innerHTML = `*{cursor: ${style}!important;}`;
}
function computePaneFlexBoxStyle({ defaultSize, dragState, layout, paneData, paneIndex, precision = 3 }) {
  const size = layout[paneIndex];
  let flexGrow;
  if (size == null) {
    flexGrow = defaultSize ?? "1";
  } else if (paneData.length === 1) {
    flexGrow = "1";
  } else {
    flexGrow = size.toPrecision(precision);
  }
  return {
    flexBasis: 0,
    flexGrow,
    flexShrink: 1,
    // Without this, pane sizes may be unintentionally overridden by their content
    overflow: "hidden",
    // Disable pointer events inside of a pane during resize
    // This avoid edge cases like nested iframes
    pointerEvents: dragState !== null ? "none" : void 0
  };
}
function initializeStorage(storageObject) {
  try {
    if (typeof localStorage === "undefined") {
      throw new TypeError("localStorage is not supported in this environment");
    }
    storageObject.getItem = (name) => localStorage.getItem(name);
    storageObject.setItem = (name, value) => localStorage.setItem(name, value);
  } catch (err) {
    console.error(err);
    storageObject.getItem = () => null;
    storageObject.setItem = () => {
    };
  }
}
const defaultStorage = {
  getItem: (name) => {
    initializeStorage(defaultStorage);
    return defaultStorage.getItem(name);
  },
  setItem: (name, value) => {
    initializeStorage(defaultStorage);
    defaultStorage.setItem(name, value);
  }
};
class PaneGroupState {
  id;
  #ref;
  #autoSaveId;
  direction;
  #keyboardResizeBy;
  #onLayout;
  #storage;
  dragState = null;
  layout = [];
  paneDataArray = [];
  paneDataArrayChanged = false;
  paneIdToLastNotifiedSizeMap = {};
  paneSizeBeforeCollapseMap = /* @__PURE__ */ new Map();
  prevDelta = 0;
  constructor(props) {
    this.id = props.id;
    this.#ref = props.ref;
    this.#autoSaveId = props.autoSaveId;
    this.direction = props.direction;
    this.#keyboardResizeBy = props.keyboardResizeBy;
    this.#onLayout = props.onLayout;
    this.#storage = props.storage;
    useRefById({ id: this.id, ref: this.#ref });
  }
  setLayout = (newLayout) => {
    this.layout = newLayout;
  };
  registerResizeHandle = (dragHandleId) => {
    return (e) => {
      e.preventDefault();
      const direction = this.direction.current;
      const dragState = this.dragState;
      const groupId = this.id.current;
      const keyboardResizeBy = this.#keyboardResizeBy.current;
      const prevLayout = this.layout;
      const paneDataArray = this.paneDataArray;
      const { initialLayout } = dragState ?? {};
      const pivotIndices = getPivotIndices(groupId, dragHandleId);
      let delta = getDeltaPercentage(e, dragHandleId, direction, dragState, keyboardResizeBy);
      if (delta === 0) return;
      const isHorizontal = direction === "horizontal";
      if (document.dir === "rtl" && isHorizontal) {
        delta = -delta;
      }
      const paneConstraints = paneDataArray.map((paneData) => paneData.constraints);
      const nextLayout = adjustLayoutByDelta({
        delta,
        layout: initialLayout ?? prevLayout,
        paneConstraints,
        pivotIndices,
        trigger: isKeyDown(e) ? "keyboard" : "mouse-or-touch"
      });
      const layoutChanged = !areArraysEqual(prevLayout, nextLayout);
      if (isMouseEvent(e) || isTouchEvent(e)) {
        const prevDelta = this.prevDelta;
        if (prevDelta !== delta) {
          this.prevDelta = delta;
          if (!layoutChanged) {
            if (isHorizontal) {
              setGlobalCursorStyle(delta < 0 ? "horizontal-min" : "horizontal-max");
            } else {
              setGlobalCursorStyle(delta < 0 ? "vertical-min" : "vertical-max");
            }
          } else {
            setGlobalCursorStyle(isHorizontal ? "horizontal" : "vertical");
          }
        }
      }
      if (layoutChanged) {
        this.setLayout(nextLayout);
        this.#onLayout.current?.(nextLayout);
        callPaneCallbacks(paneDataArray, nextLayout, this.paneIdToLastNotifiedSizeMap);
      }
    };
  };
  resizePane = (paneData, unsafePaneSize) => {
    const prevLayout = this.layout;
    const paneDataArray = this.paneDataArray;
    const paneConstraintsArr = paneDataArray.map((paneData2) => paneData2.constraints);
    const { paneSize, pivotIndices } = paneDataHelper(paneDataArray, paneData, prevLayout);
    assert(paneSize != null);
    const isLastPane = findPaneDataIndex(paneDataArray, paneData) === paneDataArray.length - 1;
    const delta = isLastPane ? paneSize - unsafePaneSize : unsafePaneSize - paneSize;
    const nextLayout = adjustLayoutByDelta({
      delta,
      layout: prevLayout,
      paneConstraints: paneConstraintsArr,
      pivotIndices,
      trigger: "imperative-api"
    });
    if (areArraysEqual(prevLayout, nextLayout)) return;
    this.setLayout(nextLayout);
    this.#onLayout.current?.(nextLayout);
    callPaneCallbacks(paneDataArray, nextLayout, this.paneIdToLastNotifiedSizeMap);
  };
  startDragging = (dragHandleId, e) => {
    const direction = this.direction.current;
    const layout = this.layout;
    const handleElement = getResizeHandleElement(dragHandleId);
    assert(handleElement);
    const initialCursorPosition = getResizeEventCursorPosition(direction, e);
    this.dragState = {
      dragHandleId,
      dragHandleRect: handleElement.getBoundingClientRect(),
      initialCursorPosition,
      initialLayout: layout
    };
  };
  stopDragging = () => {
    resetGlobalCursorStyle();
    this.dragState = null;
  };
  unregisterPane = (paneData) => {
    const paneDataArray = [...this.paneDataArray];
    const index = findPaneDataIndex(paneDataArray, paneData);
    if (index < 0) return;
    paneDataArray.splice(index, 1);
    delete this.paneIdToLastNotifiedSizeMap[paneData.id];
    this.paneDataArrayChanged = true;
  };
  isPaneCollapsed = (paneData) => {
    const paneDataArray = this.paneDataArray;
    const layout = this.layout;
    const { collapsedSize = 0, collapsible, paneSize } = paneDataHelper(paneDataArray, paneData, layout);
    return collapsible === true && paneSize === collapsedSize;
  };
  expandPane = (paneData) => {
    const prevLayout = this.layout;
    const paneDataArray = this.paneDataArray;
    if (!paneData.constraints.collapsible) return;
    const paneConstraintsArray = paneDataArray.map((paneData2) => paneData2.constraints);
    const {
      collapsedSize = 0,
      paneSize,
      minSize = 0,
      pivotIndices
    } = paneDataHelper(paneDataArray, paneData, prevLayout);
    if (paneSize !== collapsedSize) return;
    const prevPaneSize = this.paneSizeBeforeCollapseMap.get(paneData.id);
    const baseSize = prevPaneSize != null && prevPaneSize >= minSize ? prevPaneSize : minSize;
    const isLastPane = findPaneDataIndex(paneDataArray, paneData) === paneDataArray.length - 1;
    const delta = isLastPane ? paneSize - baseSize : baseSize - paneSize;
    const nextLayout = adjustLayoutByDelta({
      delta,
      layout: prevLayout,
      paneConstraints: paneConstraintsArray,
      pivotIndices,
      trigger: "imperative-api"
    });
    if (areArraysEqual(prevLayout, nextLayout)) return;
    this.setLayout(nextLayout);
    this.#onLayout.current?.(nextLayout);
    callPaneCallbacks(paneDataArray, nextLayout, this.paneIdToLastNotifiedSizeMap);
  };
  collapsePane = (paneData) => {
    const prevLayout = this.layout;
    const paneDataArray = this.paneDataArray;
    if (!paneData.constraints.collapsible) return;
    const paneConstraintsArray = paneDataArray.map((paneData2) => paneData2.constraints);
    const { collapsedSize = 0, paneSize, pivotIndices } = paneDataHelper(paneDataArray, paneData, prevLayout);
    assert(paneSize != null);
    if (paneSize === collapsedSize) return;
    this.paneSizeBeforeCollapseMap.set(paneData.id, paneSize);
    const isLastPane = findPaneDataIndex(paneDataArray, paneData) === paneDataArray.length - 1;
    const delta = isLastPane ? paneSize - collapsedSize : collapsedSize - paneSize;
    const nextLayout = adjustLayoutByDelta({
      delta,
      layout: prevLayout,
      paneConstraints: paneConstraintsArray,
      pivotIndices,
      trigger: "imperative-api"
    });
    if (areArraysEqual(prevLayout, nextLayout)) return;
    this.layout = nextLayout;
    this.#onLayout.current?.(nextLayout);
    callPaneCallbacks(paneDataArray, nextLayout, this.paneIdToLastNotifiedSizeMap);
  };
  getPaneSize = (paneData) => {
    const { paneSize } = paneDataHelper(this.paneDataArray, paneData, this.layout);
    return paneSize;
  };
  getPaneStyle = (paneData, defaultSize) => {
    const paneDataArray = this.paneDataArray;
    const layout = this.layout;
    const dragState = this.dragState;
    const paneIndex = findPaneDataIndex(paneDataArray, paneData);
    return computePaneFlexBoxStyle({
      defaultSize,
      dragState,
      layout,
      paneData: paneDataArray,
      paneIndex
    });
  };
  isPaneExpanded = (paneData) => {
    const { collapsedSize = 0, collapsible, paneSize } = paneDataHelper(this.paneDataArray, paneData, this.layout);
    return !collapsible || paneSize > collapsedSize;
  };
  registerPane = (paneData) => {
    const newPaneDataArray = [...this.paneDataArray, paneData];
    newPaneDataArray.sort((paneA, paneB) => {
      const orderA = paneA.order;
      const orderB = paneB.order;
      if (orderA == null && orderB == null) {
        return 0;
      } else if (orderA == null) {
        return -1;
      } else if (orderB == null) {
        return 1;
      } else {
        return orderA - orderB;
      }
    });
    this.paneDataArray = newPaneDataArray;
    this.paneDataArrayChanged = true;
  };
  #setResizeHandlerEventListeners = () => {
    const groupId = this.id.current;
    const handles = getResizeHandleElementsForGroup(groupId);
    const paneDataArray = this.paneDataArray;
    const unsubHandlers = handles.map((handle) => {
      const handleId = handle.getAttribute("data-pane-resizer-id");
      if (!handleId) return noop;
      const [idBefore, idAfter] = getResizeHandlePaneIds(groupId, handleId, paneDataArray);
      if (idBefore == null || idAfter == null) return noop;
      const onKeydown = (e) => {
        if (e.defaultPrevented || e.key !== "Enter") return;
        e.preventDefault();
        const paneDataArray2 = this.paneDataArray;
        const index = paneDataArray2.findIndex((paneData2) => paneData2.id === idBefore);
        if (index < 0) return;
        const paneData = paneDataArray2[index];
        assert(paneData);
        const layout = this.layout;
        const size = layout[index];
        const { collapsedSize = 0, collapsible, minSize = 0 } = paneData.constraints;
        if (!(size != null && collapsible)) return;
        const nextLayout = adjustLayoutByDelta({
          delta: areNumbersAlmostEqual(size, collapsedSize) ? minSize - size : collapsedSize - size,
          layout,
          paneConstraints: paneDataArray2.map((paneData2) => paneData2.constraints),
          pivotIndices: getPivotIndices(groupId, handleId),
          trigger: "keyboard"
        });
        if (layout !== nextLayout) {
          this.layout = nextLayout;
        }
      };
      const unsubListener = addEventListener(handle, "keydown", onKeydown);
      return () => {
        unsubListener();
      };
    });
    return () => {
      for (const unsub of unsubHandlers) {
        unsub();
      }
    };
  };
  #props = once(() => ({
    id: this.id.current,
    "data-pane-group": "",
    "data-direction": this.direction.current,
    "data-pane-group-id": this.id.current,
    style: {
      display: "flex",
      flexDirection: this.direction.current === "horizontal" ? "row" : "column",
      height: "100%",
      overflow: "hidden",
      width: "100%"
    }
  }));
  get props() {
    return this.#props();
  }
  createResizer = (props) => {
    return new PaneResizerState(props, this);
  };
  createPane = (props) => {
    return new PaneState(props, this);
  };
}
const resizeKeys = [
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "End",
  "Home"
];
class PaneResizerState {
  #id;
  #ref;
  #onDraggingChange;
  #disabled;
  #tabIndex;
  #group;
  #isDragging = once(() => this.#group.dragState?.dragHandleId === this.#id.current);
  #isFocused = false;
  resizeHandler = null;
  constructor(props, group) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.#group = group;
    this.#onDraggingChange = props.onDraggingChange;
    this.#disabled = props.disabled;
    this.#tabIndex = props.tabIndex;
    useRefById({ id: this.#id, ref: this.#ref });
  }
  #stopDraggingAndBlur = () => {
    const node = this.#ref.current;
    if (!node) return;
    node.blur();
    this.#group.stopDragging();
    this.#onDraggingChange.current(false);
  };
  #onkeydown = (e) => {
    if (this.#disabled.current || !this.resizeHandler || e.defaultPrevented) return;
    if (resizeKeys.includes(e.key)) {
      e.preventDefault();
      this.resizeHandler(e);
      return;
    }
    if (e.key !== "F6") return;
    e.preventDefault();
    const handles = getResizeHandleElementsForGroup(this.#group.id.current);
    const index = getResizeHandleElementIndex(this.#group.id.current, this.#id.current);
    if (index === null) return;
    let nextIndex = 0;
    if (e.shiftKey) {
      if (index > 0) {
        nextIndex = index - 1;
      } else {
        nextIndex = handles.length - 1;
      }
    } else {
      if (index + 1 < handles.length) {
        nextIndex = index + 1;
      } else {
        nextIndex = 0;
      }
    }
    const nextHandle = handles[nextIndex];
    nextHandle.focus();
  };
  #onblur = () => {
    this.#isFocused = false;
  };
  #onfocus = () => {
    this.#isFocused = true;
  };
  #onmousedown = (e) => {
    e.preventDefault();
    this.#group.startDragging(this.#id.current, e);
    this.#onDraggingChange.current(true);
  };
  #onmouseup = () => {
    this.#stopDraggingAndBlur();
  };
  #ontouchcancel = () => {
    this.#stopDraggingAndBlur();
  };
  #ontouchend = () => {
    this.#stopDraggingAndBlur();
  };
  #ontouchstart = (e) => {
    e.preventDefault();
    this.#group.startDragging(this.#id.current, e);
    this.#onDraggingChange.current(true);
  };
  #props = once(() => ({
    id: this.#id.current,
    role: "separator",
    "data-direction": this.#group.direction.current,
    "data-pane-group-id": this.#group.id.current,
    "data-active": this.#isDragging() ? "pointer" : this.#isFocused ? "keyboard" : void 0,
    "data-enabled": !this.#disabled.current,
    "data-pane-resizer-id": this.#id.current,
    "data-pane-resizer": "",
    tabIndex: this.#tabIndex.current,
    style: {
      cursor: getCursorStyle(this.#group.direction.current),
      touchAction: "none",
      userSelect: "none",
      "-webkit-user-select": "none",
      "-webkit-touch-callout": "none"
    },
    onkeydown: this.#onkeydown,
    onblur: this.#onblur,
    onfocus: this.#onfocus,
    onmousedown: this.#onmousedown,
    onmouseup: this.#onmouseup,
    ontouchcancel: this.#ontouchcancel,
    ontouchend: this.#ontouchend,
    ontouchstart: this.#ontouchstart
  }));
  get props() {
    return this.#props();
  }
}
class PaneState {
  #id;
  #ref;
  #collapsedSize;
  #collapsible;
  #defaultSize;
  #maxSize;
  #minSize;
  #order;
  #onCollapse;
  #onExpand;
  #onResize;
  #group;
  #paneData = once(() => ({
    callbacks: {
      onCollapse: this.#onCollapse.current,
      onExpand: this.#onExpand.current,
      onResize: this.#onResize.current
    },
    constraints: {
      collapsedSize: this.#collapsedSize.current,
      collapsible: this.#collapsible.current,
      defaultSize: this.#defaultSize.current,
      maxSize: this.#maxSize.current,
      minSize: this.#minSize.current
    },
    id: this.#id.current,
    idIsFromProps: false,
    order: this.#order.current
  }));
  pane = {
    collapse: () => {
      this.#group.collapsePane(this.#paneData());
    },
    expand: () => this.#group.expandPane(this.#paneData()),
    getSize: () => this.#group.getPaneSize(this.#paneData()),
    isCollapsed: () => this.#group.isPaneCollapsed(this.#paneData()),
    isExpanded: () => this.#group.isPaneExpanded(this.#paneData()),
    resize: (size) => this.#group.resizePane(this.#paneData(), size),
    getId: () => this.#id.current
  };
  constructor(props, group) {
    this.#id = props.id;
    this.#ref = props.ref;
    this.#collapsedSize = props.collapsedSize;
    this.#collapsible = props.collapsible;
    this.#defaultSize = props.defaultSize;
    this.#maxSize = props.maxSize;
    this.#minSize = props.minSize;
    this.#order = props.order;
    this.#onCollapse = props.onCollapse;
    this.#onExpand = props.onExpand;
    this.#onResize = props.onResize;
    this.#group = group;
    useRefById({ id: this.#id, ref: this.#ref });
  }
  #isCollapsed = once(() => this.#group.isPaneCollapsed(this.#paneData()));
  #props = once(() => ({
    id: this.#id.current,
    style: this.#group.getPaneStyle(this.#paneData(), this.#defaultSize.current),
    "data-pane": "",
    "data-pane-id": this.#id.current,
    "data-pane-group-id": this.#group.id.current,
    "data-collapsed": this.#isCollapsed() ? "" : void 0,
    "data-expanded": this.#isCollapsed() ? void 0 : ""
  }));
  get props() {
    return this.#props();
  }
}
const [setPaneGroupContext, getPaneGroupContext] = createContext("PaneGroup");
function usePaneGroup(props) {
  return setPaneGroupContext(new PaneGroupState(props));
}
function usePaneResizer(props) {
  return getPaneGroupContext().createResizer(props);
}
function usePane(props) {
  return getPaneGroupContext().createPane(props);
}
function Pane_group($$payload, $$props) {
  push();
  let {
    autoSaveId = null,
    direction,
    id = useId$1(),
    keyboardResizeBy = null,
    onLayoutChange = noop,
    storage = defaultStorage,
    ref = null,
    child,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const paneGroupState = usePaneGroup({
    id: box.with(() => id ?? useId$1()),
    ref: box.with(() => ref, (v) => ref = v),
    autoSaveId: box.with(() => autoSaveId),
    direction: box.with(() => direction),
    keyboardResizeBy: box.with(() => keyboardResizeBy),
    onLayout: box.with(() => onLayoutChange),
    storage: box.with(() => storage)
  });
  const getLayout = () => paneGroupState.layout;
  const setLayout = paneGroupState.setLayout;
  const getId = () => paneGroupState.id.current;
  const mergedProps = mergeProps(restProps, paneGroupState.props);
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
  bind_props($$props, { ref, getLayout, setLayout, getId });
  pop();
}
function Pane($$payload, $$props) {
  push();
  let {
    id = useId$1(),
    ref = null,
    collapsedSize,
    collapsible,
    defaultSize,
    maxSize,
    minSize,
    onCollapse = noop,
    onExpand = noop,
    onResize = noop,
    order,
    child,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const paneState = usePane({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    collapsedSize: box.with(() => collapsedSize),
    collapsible: box.with(() => collapsible),
    defaultSize: box.with(() => defaultSize),
    maxSize: box.with(() => maxSize),
    minSize: box.with(() => minSize),
    onCollapse: box.with(() => onCollapse),
    onExpand: box.with(() => onExpand),
    onResize: box.with(() => onResize),
    order: box.with(() => order)
  });
  const collapse = paneState.pane.collapse;
  const expand = paneState.pane.expand;
  const getSize = paneState.pane.getSize;
  const isCollapsed = paneState.pane.isCollapsed;
  const isExpanded = paneState.pane.isExpanded;
  const resize = paneState.pane.resize;
  const getId = paneState.pane.getId;
  const mergedProps = mergeProps(restProps, paneState.props);
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
  bind_props($$props, {
    ref,
    collapse,
    expand,
    getSize,
    isCollapsed,
    isExpanded,
    resize,
    getId
  });
  pop();
}
function Pane_resizer($$payload, $$props) {
  push();
  let {
    id = useId$1(),
    ref = null,
    disabled = false,
    onDraggingChange = noop,
    tabIndex = 0,
    child,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const resizerState = usePaneResizer({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    disabled: box.with(() => disabled),
    onDraggingChange: box.with(() => onDraggingChange),
    tabIndex: box.with(() => tabIndex)
  });
  const mergedProps = mergeProps(restProps, resizerState.props);
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
function Grip_vertical($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["circle", { "cx": "9", "cy": "12", "r": "1" }],
    ["circle", { "cx": "9", "cy": "5", "r": "1" }],
    ["circle", { "cx": "9", "cy": "19", "r": "1" }],
    [
      "circle",
      { "cx": "15", "cy": "12", "r": "1" }
    ],
    ["circle", { "cx": "15", "cy": "5", "r": "1" }],
    [
      "circle",
      { "cx": "15", "cy": "19", "r": "1" }
    ]
  ];
  Icon$1($$payload, spread_props([
    { name: "grip-vertical" },
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
function Resizable_handle($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    withHandle = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Pane_resizer($$payload2, spread_props([
      {
        class: cn("bg-neutral-6 focus-visible:ring-primary-6 relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 data-[direction=vertical]:h-px data-[direction=vertical]:w-full data-[direction=vertical]:after:left-0 data-[direction=vertical]:after:h-1 data-[direction=vertical]:after:w-full data-[direction=vertical]:after:-translate-y-1/2 data-[direction=vertical]:after:translate-x-0 [&[data-direction=vertical]>div]:rotate-90", className)
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
          if (withHandle) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<div class="bg-neutral-6 z-10 flex h-4 w-3 items-center justify-center rounded-sm border">`;
            Grip_vertical($$payload3, { class: "size-2.5" });
            $$payload3.out += `<!----></div>`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]-->`;
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
function Resizable_pane_group($$payload, $$props) {
  push();
  let {
    ref = null,
    this: paneGroup = void 0,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<!---->`;
  Pane_group($$payload, spread_props([
    {
      class: cn("flex h-full w-full data-[direction=vertical]:flex-col", className)
    },
    restProps
  ]));
  $$payload.out += `<!---->`;
  bind_props($$props, { ref, this: paneGroup });
  pop();
}
function DatePickerBar($$payload, $$props) {
  push();
  let { selection } = $$props;
  const isMobile2 = new IsMobile();
  function button($$payload2, tooltipDescription, iconId, variant, onclick) {
    $$payload2.out += `<!---->`;
    Root$3($$payload2, {
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        Trigger$1($$payload3, {
          children: ($$payload4) => {
            Button$1($$payload4, {
              variant,
              size: "xsm",
              class: "mx-1 flex h-fit items-center rounded-2xl p-0 outline outline-1",
              disabled: selection.disabled,
              onclick,
              children: ($$payload5) => {
                Icon($$payload5, { icon: iconId, width: "1rem", class: "m-1" });
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <!---->`;
        Tooltip_content($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->${escape_html(tooltipDescription)}`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!---->`;
  }
  function reverseButtons($$payload2) {
    button($$payload2, "Rewind selection one month", iconIds.verdagraphMonthReverseIcon, "default", () => selection.translate({ months: -1 }));
    $$payload2.out += `<!----> `;
    button($$payload2, "Rewind selection one week", iconIds.verdagraphWeekReverseIcon, "default", () => selection.translate({ weeks: -1 }));
    $$payload2.out += `<!----> `;
    button($$payload2, "Rewind selection one day", iconIds.verdagraphDayReverseIcon, "default", () => selection.translate({ days: -1 }));
    $$payload2.out += `<!---->`;
  }
  function forwardButtons($$payload2) {
    button($$payload2, "Forward selection one day", iconIds.verdagraphDayForwardIcon, "default", () => selection.translate({ days: 1 }));
    $$payload2.out += `<!----> `;
    button($$payload2, "Forward selection one week", iconIds.verdagraphWeekForwardIcon, "default", () => selection.translate({ weeks: 1 }));
    $$payload2.out += `<!----> `;
    button($$payload2, "Forward selection one month", iconIds.verdagraphMonthForwardIcon, "default", () => selection.translate({ months: 1 }));
    $$payload2.out += `<!---->`;
  }
  function resetRangeButton($$payload2) {
    button($$payload2, "Reset timeline range", iconIds.timelineSelectorShrinkIcon, "outline", () => selection.resetSliderRange());
  }
  function resetSelectionButton($$payload2) {
    button($$payload2, "Reset timeline selection", iconIds.homeIcon, "outline", () => selection.reset());
  }
  $$payload.out += `<div class="flex h-12 flex-row items-center justify-between px-2 py-2 md:px-4"><!---->`;
  Root$3($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Trigger$1($$payload2, {
        children: ($$payload3) => {
          DatePicker($$payload3, {
            value: selection.beginSelection,
            compact: isMobile2.current,
            onValueChange: (newVal) => {
              if (newVal) {
                selection.changeBeginSelection(newVal);
              }
            },
            minValue: selection.focus.subtract(selection.maxSelectOffset),
            maxValue: selection.focus.subtract(selection.minSelectOffset),
            disabled: selection.disabled
          });
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Tooltip_content($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<!---->Beginning date of timeline selection`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> <div class="flex flex-row items-center justify-center">`;
  if (isMobile2.current) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    Root$2($$payload, {
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        Trigger($$payload2, {
          class: "mx-1 flex h-fit items-center rounded-2xl p-0 outline outline-1 sm:mx-2 md:mx-4",
          children: ($$payload3) => {
            Icon($$payload3, {
              icon: iconIds.timelineSelectorTranslateIcon,
              width: "1rem",
              class: "m-1"
            });
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----> <!---->`;
        Popover_content($$payload2, {
          side: "top",
          class: "w-auto",
          children: ($$payload3) => {
            reverseButtons($$payload3);
            $$payload3.out += `<!----> `;
            forwardButtons($$payload3);
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
    $$payload.out += `<div class="flex"><div class="flex">`;
    reverseButtons($$payload);
    $$payload.out += `<!----></div> <div class="ml-1 md:ml-2 lg:ml-4">`;
    resetRangeButton($$payload);
    $$payload.out += `<!----></div></div>`;
  }
  $$payload.out += `<!--]--> <div class="md:md-2 mx-1 lg:mx-4"><!---->`;
  Root$3($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Trigger$1($$payload2, {
        children: ($$payload3) => {
          DatePicker($$payload3, {
            value: selection.focus,
            compact: isMobile2.current,
            onValueChange: (newDate) => {
              if (newDate) {
                selection.refocus(newDate);
              }
            },
            disabled: selection.disabled
          });
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Tooltip_content($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<!---->Focused date`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div> `;
  if (isMobile2.current) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    Root$2($$payload, {
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        Trigger($$payload2, {
          class: "mx-1 flex h-fit items-center rounded-2xl p-0 outline outline-1 sm:mx-2 md:mx-4",
          children: ($$payload3) => {
            Icon($$payload3, {
              icon: iconIds.defaultRefreshIcon,
              width: "1rem",
              class: "m-1"
            });
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!----> <!---->`;
        Popover_content($$payload2, {
          side: "top",
          class: "w-auto",
          children: ($$payload3) => {
            resetRangeButton($$payload3);
            $$payload3.out += `<!----> `;
            resetSelectionButton($$payload3);
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
    $$payload.out += `<div class="flex"><div class="mr-1 md:mr-2 lg:mr-4">`;
    resetSelectionButton($$payload);
    $$payload.out += `<!----></div> <div class="flex">`;
    forwardButtons($$payload);
    $$payload.out += `<!----></div></div>`;
  }
  $$payload.out += `<!--]--></div> <!---->`;
  Root$3($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Trigger$1($$payload2, {
        children: ($$payload3) => {
          DatePicker($$payload3, {
            value: selection.endSelection,
            compact: isMobile2.current,
            onValueChange: (newVal) => {
              if (newVal) {
                selection.changeEndSelection(newVal);
              }
            },
            minValue: selection.focus.add(selection.minSelectOffset),
            maxValue: selection.focus.add(selection.maxSelectOffset),
            disabled: selection.disabled
          });
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Tooltip_content($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<!---->Ending date of timeline selection`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div>`;
  pop();
}
function SliderBar($$payload, $$props) {
  push();
  let { selection, width } = $$props;
  let tickWidth = width / selection.maxSliderValue;
  let tickLabelTranslate = tickWidth / 2 + tickLineWidth - 7;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    var bind_get = () => selection.sliderValue;
    var bind_set = (newVal) => {
      selection.updateSlider(newVal);
    };
    $$payload2.out += `<!---->`;
    {
      let children = function($$payload3, { thumbs, ticks }) {
        const each_array = ensure_array_like(thumbs);
        const each_array_1 = ensure_array_like(ticks);
        $$payload3.out += `<span class="h-3 w-full cursor-pointer self-start"><!---->`;
        Slider_range($$payload3, { class: "bg-primary-8 h-3" });
        $$payload3.out += `<!----></span> <!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let index = each_array[$$index];
          $$payload3.out += `<!---->`;
          Slider_thumb($$payload3, {
            index,
            class: "focus-visible:ring-neutal-11 active:scale-98 bg-neutral-11 h-1/3 w-1 cursor-pointer self-start rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          });
          $$payload3.out += `<!---->`;
        }
        $$payload3.out += `<!--]--> <!--[-->`;
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let index = each_array_1[$$index_1];
          if (index >= 0 && index < selection.maxSliderValue) {
            $$payload3.out += "<!--[-->";
            const dateValue = selection.sliderValueToDateValue(index);
            if (dateValue.month === 1 && dateValue.day === 1) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<!---->`;
              {
                let child = function($$payload4, { props }) {
                  $$payload4.out += `<div${spread_attributes(
                    {
                      ...props,
                      class: clsx(cn(baseTickClass, ""))
                    }
                  )}><span class="text-neutral-11 absolute -translate-y-[14px] text-sm">${escape_html(dateValue.year)}</span> <span${attr_class(clsx(cn(baseTickDayLabelClass, "")), void 0, { "hidden": tickWidth < tickLabelThreshold })}${attr_style(`transform: translateX(${stringify(tickLabelTranslate)}px)`)}>${escape_html(dateValue.day.toString().padStart(2, "0"))}</span> <span${attr_class(clsx(cn(baseTickLineClass, "h-[14px]")))}></span></div>`;
                };
                Slider_tick($$payload3, { index, child, $$slots: { child: true } });
              }
              $$payload3.out += `<!---->`;
            } else if (dateValue.day === 1) {
              $$payload3.out += "<!--[1-->";
              $$payload3.out += `<!---->`;
              {
                let child = function($$payload4, { props }) {
                  $$payload4.out += `<div${spread_attributes(
                    {
                      ...props,
                      class: clsx(cn(baseTickClass, ""))
                    }
                  )}><span class="text-neutral-11 absolute -translate-y-[14px] text-xs">${escape_html(getMonthString(dateValue.month))}</span> <span${attr_class(clsx(cn(baseTickDayLabelClass, "")), void 0, { "hidden": tickWidth < tickLabelThreshold })}${attr_style(`transform: translateX(${stringify(tickLabelTranslate)}px)`)}>${escape_html(dateValue.day.toString().padStart(2, "0"))}</span> <span${attr_class(clsx(cn(baseTickLineClass, "h-[14px]")))}></span></div>`;
                };
                Slider_tick($$payload3, { index, child, $$slots: { child: true } });
              }
              $$payload3.out += `<!---->`;
            } else if (getDayOfWeek(dateValue, "en-US") === 0) {
              $$payload3.out += "<!--[2-->";
              $$payload3.out += `<!---->`;
              {
                let child = function($$payload4, { props }) {
                  $$payload4.out += `<div${spread_attributes(
                    {
                      ...props,
                      class: clsx(cn(baseTickClass, ""))
                    }
                  )}><span${attr_class(clsx(cn(baseTickDayLabelClass, "text-neutral-11")), void 0, { "hidden": tickWidth < tickLabelThreshold })}${attr_style(`transform: translateX(${stringify(tickLabelTranslate)}px)`)}>${escape_html(dateValue.day.toString().padStart(2, "0"))}</span> <span${attr_class(clsx(cn(baseTickLineClass, "")))}></span></div>`;
                };
                Slider_tick($$payload3, { index, child, $$slots: { child: true } });
              }
              $$payload3.out += `<!---->`;
            } else {
              $$payload3.out += "<!--[!-->";
              $$payload3.out += `<!---->`;
              {
                let child = function($$payload4, { props }) {
                  $$payload4.out += `<div${spread_attributes(
                    {
                      ...props,
                      class: clsx(cn(baseTickClass, ""))
                    }
                  )}><span${attr_class(clsx(cn(baseTickDayLabelClass, "")), void 0, { "hidden": tickWidth < tickLabelThreshold })}${attr_style(`transform: translateX(${stringify(tickLabelTranslate)}px)`)}>${escape_html(dateValue.day.toString().padStart(2, "0"))}</span> <span${attr_class(clsx(cn(baseTickLineClass, "")))}></span></div>`;
                };
                Slider_tick($$payload3, { index, child, $$slots: { child: true } });
              }
              $$payload3.out += `<!---->`;
            }
            $$payload3.out += `<!--]-->`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]-->`;
        }
        $$payload3.out += `<!--]-->`;
      };
      Slider($$payload2, {
        get value() {
          return bind_get();
        },
        set value($$value) {
          bind_set($$value);
        },
        min: selection.minSliderValue,
        max: selection.maxSliderValue,
        disabled: selection.disabled,
        class: "relative flex h-12 w-full touch-none select-none",
        children,
        $$slots: { default: true }
      });
    }
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
function TimelineSelector($$payload, $$props) {
  let { selection } = $$props;
  let width = 0;
  $$payload.out += `<div class="border-neutral-6 flex h-24 w-full flex-col border-t">`;
  DatePickerBar($$payload, { selection });
  $$payload.out += `<!----> `;
  SliderBar($$payload, { selection, width });
  $$payload.out += `<!----></div>`;
}
const defaultUpperSelectionOffset = { weeks: 3 };
const defaultLowerSelectionOffset = { weeks: 1 };
const defaultSliderDisplayOffset = { weeks: 2 };
const minSelectOffset = { days: 1 };
const maxSelectOffset = { years: 4 };
const translateRangeThreshold = 2;
function createTimelineSelection() {
  let disabled = false;
  let focus = today(getLocalTimeZone());
  let beginSelection = focus.subtract(defaultLowerSelectionOffset);
  let endSelection = focus.add(defaultUpperSelectionOffset);
  const focusUtc = calendarDateToUtc(focus);
  const beginSelectionUtc = calendarDateToUtc(beginSelection);
  const endSelectionUtc = calendarDateToUtc(endSelection);
  let beginSlider = beginSelection.subtract(defaultSliderDisplayOffset);
  let endSlider = endSelection.add(defaultSliderDisplayOffset);
  const minSliderValue = 0;
  const maxSliderValue = calculateDeltaDays(endSlider, beginSlider);
  const sliderValue = (() => {
    return [
      calculateDeltaDays(beginSelection, beginSlider),
      calculateDeltaDays(focus, beginSlider),
      calculateDeltaDays(endSelection, beginSlider)
    ];
  })();
  maxSliderValue - sliderValue[2] < translateRangeThreshold;
  sliderValue[0] - minSliderValue < translateRangeThreshold;
  function reset() {
    if (disabled) {
      return;
    }
    focus = today(getLocalTimeZone());
    beginSelection = focus.subtract(defaultLowerSelectionOffset);
    endSelection = focus.add(defaultUpperSelectionOffset);
    beginSlider = beginSelection.subtract(defaultSliderDisplayOffset);
    endSlider = endSelection.add(defaultSliderDisplayOffset);
  }
  function resetSliderRange() {
    if (disabled) {
      return;
    }
    beginSlider = beginSelection.subtract(defaultSliderDisplayOffset);
    endSlider = endSelection.add(defaultSliderDisplayOffset);
  }
  function refocus(newFocus) {
    if (disabled) {
      return;
    }
    const deltaDays = calculateDeltaDays(newFocus, focus);
    beginSelection = beginSelection.add({ days: deltaDays });
    endSelection = endSelection.add({ days: deltaDays });
    beginSlider = beginSlider.add({ days: deltaDays });
    endSlider = endSlider.add({ days: deltaDays });
    focus = newFocus;
  }
  function changeBeginSelection(newBeginSelection) {
    if (disabled) {
      return;
    }
    beginSelection = newBeginSelection;
    if (beginSlider > beginSelection) {
      beginSlider = beginSelection.subtract(defaultSliderDisplayOffset);
    }
  }
  function changeEndSelection(newEndSelection) {
    if (disabled) {
      return;
    }
    endSelection = newEndSelection;
    if (endSelection > endSlider) {
      endSlider = endSelection.add(defaultSliderDisplayOffset);
    }
  }
  function translate(translation) {
    if (disabled) {
      return;
    }
    focus = focus.add(translation);
    beginSelection = beginSelection.add(translation);
    endSelection = endSelection.add(translation);
    beginSlider = beginSlider.add(translation);
    endSlider = endSlider.add(translation);
  }
  function sliderValueToDateValue(sliderValue2) {
    return beginSlider.add({ days: sliderValue2 });
  }
  function updateSlider(newVal) {
    if (disabled) {
      return;
    }
    if (newVal[1] != sliderValue[1]) {
      const deltaDays = newVal[1] - sliderValue[1];
      newVal[0] = Math.max(newVal[0] + deltaDays, minSliderValue);
      newVal[2] = Math.min(newVal[2] + deltaDays, maxSliderValue);
    }
    beginSelection = sliderValueToDateValue(newVal[0]);
    focus = sliderValueToDateValue(newVal[1]);
    endSelection = sliderValueToDateValue(newVal[2]);
  }
  function disable() {
    disabled = true;
  }
  function enable() {
    disabled = false;
  }
  return {
    get focus() {
      return focus;
    },
    get beginSelection() {
      return beginSelection;
    },
    get endSelection() {
      return endSelection;
    },
    get focusUtc() {
      return focusUtc;
    },
    get beginSelectionUtc() {
      return beginSelectionUtc;
    },
    get endSelectionUtc() {
      return endSelectionUtc;
    },
    get minSliderValue() {
      return minSliderValue;
    },
    get maxSliderValue() {
      return maxSliderValue;
    },
    get sliderValue() {
      return sliderValue;
    },
    get disabled() {
      return disabled;
    },
    minSelectOffset,
    maxSelectOffset,
    reset,
    resetSliderRange,
    refocus,
    changeBeginSelection,
    changeEndSelection,
    translate,
    sliderValueToDateValue,
    updateSlider,
    disable,
    enable
  };
}
function createSelection() {
  const selection = new SvelteSet();
  const onSelectionChangeHandlers = [];
  function has2(entityId) {
    return selection.has(entityId);
  }
  function select(entityId) {
    if (has2(entityId)) return;
    selection.add(entityId);
    onSelectionChangeHandlers.forEach((handler) => handler([entityId], []));
  }
  function deselect(entityId) {
    if (!has2(entityId)) return;
    selection.delete(entityId);
    onSelectionChangeHandlers.forEach((handler) => handler([], [entityId]));
  }
  function reset() {
    const removedIds = [...selection];
    selection.clear();
    onSelectionChangeHandlers.forEach((handler) => handler([], removedIds));
  }
  function addSelectionChangeHandler(handler) {
    onSelectionChangeHandlers.push(handler);
  }
  return {
    get selection() {
      return selection;
    },
    has: has2,
    select,
    deselect,
    reset,
    addSelectionChangeHandler
  };
}
function createSelectionManager(entityTypes) {
  let tool = "pointer";
  const selections = Object.fromEntries(entityTypes.map((entity) => [entity, createSelection()]));
  function get3(entityType) {
    return selections[entityType].selection;
  }
  function has2(entityType, entityId) {
    return selections[entityType].has(entityId);
  }
  function select(entityType, entityId) {
    selections[entityType].select(entityId);
  }
  function deselect(entityType, entityId) {
    selections[entityType].deselect(entityId);
  }
  function reset(entityType) {
    selections[entityType].reset();
  }
  function resetAll() {
    Object.entries(selections).forEach(([, selection]) => {
      selection.reset();
    });
  }
  function addSelectionChangeHandler(entityType, handler) {
    selections[entityType].addSelectionChangeHandler(handler);
  }
  return {
    get tool() {
      return tool;
    },
    set tool(newVal) {
      tool = newVal;
    },
    get: get3,
    has: has2,
    select,
    deselect,
    reset,
    resetAll,
    addSelectionChangeHandler
  };
}
function createToolbox(attributes) {
  let activeToolIds = [];
  let lastActivatedId = void 0;
  const activeTools = attributes.filter((attr2) => activeToolIds.includes(attr2.id));
  const isActive = activeToolIds.length > 0;
  function activate(id) {
    if (!activeToolIds.includes(id)) {
      activeToolIds.push(id);
    }
    lastActivatedId = id;
  }
  function deactivate(id) {
    if (activeToolIds.includes(id)) {
      activeToolIds = activeToolIds.filter((item) => item !== id);
    }
    if (!isActive) {
      lastActivatedId = void 0;
    }
  }
  function isToolActive(id) {
    if (activeToolIds.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
  return {
    get lastActivatedId() {
      return lastActivatedId;
    },
    get activeTools() {
      return activeTools;
    },
    get isActive() {
      return isActive;
    },
    set lastActivatedId(newVal) {
      lastActivatedId = newVal;
    },
    activate,
    deactivate,
    isToolActive
  };
}
function Tabs_content($$payload, $$props) {
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
    Tabs_content$1($$payload2, spread_props([
      {
        class: cn("ring-offset-neutral-1 focus-visible:ring-neutral-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2", className)
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
function Tabs_list($$payload, $$props) {
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
    Tabs_list$1($$payload2, spread_props([
      {
        class: cn("bg-neutral-1 text-neutral-11 flex w-full items-center justify-center rounded-none", className)
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
function Tabs_trigger($$payload, $$props) {
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
    Tabs_trigger$1($$payload2, spread_props([
      {
        class: cn("ring-offset-neutral-1 focus-visible:ring-neutral-11 data-[state=active]:bg-neutral-2 data-[state=active]:text-neutral-11 inline-flex items-center justify-center whitespace-nowrap rounded-none px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ", className)
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
const Root = Tabs;
function TabToolbox($$payload, $$props) {
  push();
  let { toolbox } = $$props;
  let root = null;
  let list = null;
  let contentHeight = (() => {
    if (root && list) {
      return root.offsetHeight - list.offsetHeight;
    } else {
      return 0;
    }
  })();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Root($$payload2, {
      class: "bg-neutral-1 flex h-full flex-col",
      get ref() {
        return root;
      },
      set ref($$value) {
        root = $$value;
        $$settled = false;
      },
      get value() {
        return toolbox.lastActivatedId;
      },
      set value($$value) {
        toolbox.lastActivatedId = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        const each_array_1 = ensure_array_like(toolbox.activeTools);
        $$payload3.out += `<!---->`;
        Tabs_list($$payload3, {
          class: "h-8 shadow-none",
          get ref() {
            return list;
          },
          set ref($$value) {
            list = $$value;
            $$settled = false;
          },
          children: ($$payload4) => {
            const each_array = ensure_array_like(toolbox.activeTools);
            $$payload4.out += `<!--[-->`;
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let tool = each_array[$$index];
              $$payload4.out += `<!---->`;
              Tabs_trigger($$payload4, {
                value: tool.id,
                class: `border-neutral-5 text-neutral-11 flex w-full items-center justify-between border-b p-0 px-4 py-1 ${stringify(toolbox.lastActivatedId === tool.id ? "bg-neutral-2 hover:bg-neutral-3" : "bg-neutral-1 hover:bg-neutral-2")}`,
                children: ($$payload5) => {
                  $$payload5.out += `<span class="truncate">${escape_html(tool.label)}</span> `;
                  Button$1($$payload5, {
                    variant: "ghost",
                    class: "hover:bg-accent-5 h-auto rounded-md p-1",
                    onclick: () => toolbox.deactivate(tool.id),
                    children: ($$payload6) => {
                      Icon($$payload6, { icon: iconIds.defaultClose, width: "1rem" });
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            }
            $$payload4.out += `<!--]-->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <!--[-->`;
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let tool = each_array_1[$$index_1];
          $$payload3.out += `<!---->`;
          Tabs_content($$payload3, {
            value: tool.id,
            class: "mt-0 overflow-hidden",
            style: `height: ${stringify(contentHeight)}px`,
            children: ($$payload4) => {
              $$payload4.out += `<!---->`;
              Scroll_area($$payload4, {
                class: "relative h-full",
                children: ($$payload5) => {
                  $$payload5.out += `<!---->`;
                  Scroll_area_viewport($$payload5, {
                    class: "h-full max-h-full w-full",
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->`;
                      tool.ToolComponent($$payload6, {});
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> <!---->`;
                  Scroll_area_scrollbar($$payload5, {
                    orientation: "vertical",
                    class: "bg-neutral-2 hover:bg-dark-10 data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out-0 data-[state=visible]:fade-in-0 flex w-2.5 touch-none select-none rounded-none border-l border-l-transparent p-px transition-all duration-200 hover:w-3",
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->`;
                      Scroll_area_thumb($$payload6, { class: "bg-neutral-5 flex-1 rounded-full" });
                      $$payload6.out += `<!---->`;
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
        }
        $$payload3.out += `<!--]-->`;
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
function Chevron_right($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [["path", { "d": "m9 18 6-6-6-6" }]];
  Icon$1($$payload, spread_props([
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
function extractErrorArray(errors) {
  if (Array.isArray(errors))
    return errors;
  if (typeof errors === "object" && "_errors" in errors) {
    if (errors._errors !== void 0)
      return errors._errors;
  }
  return [];
}
function getValueAtPath(path, obj) {
  const keys = path.split(/[[\].]/).filter(Boolean);
  let value = obj;
  for (const key of keys) {
    if (typeof value !== "object" || value === null) {
      return void 0;
    }
    value = value[key];
  }
  return value;
}
function getAriaDescribedBy({ fieldErrorsId = void 0, descriptionId = void 0, errors }) {
  let describedBy = "";
  if (descriptionId) {
    describedBy += `${descriptionId} `;
  }
  if (errors.length && fieldErrorsId) {
    describedBy += fieldErrorsId;
  }
  return describedBy ? describedBy.trim() : void 0;
}
function getAriaRequired(constraints2) {
  if (!("required" in constraints2))
    return void 0;
  return constraints2.required ? "true" : void 0;
}
function getAriaInvalid(errors) {
  return errors && errors.length ? "true" : void 0;
}
function getDataFsError(errors) {
  return errors && errors.length ? "" : void 0;
}
class FormFieldState {
  #form;
  #name;
  #formErrors;
  #formConstraints;
  #formTainted;
  #formData;
  #_name = once(() => this.#name.current);
  get name() {
    return this.#_name();
  }
  #errors = once(() => extractErrorArray(getValueAtPath(this.#name.current, this.#formErrors.current)));
  get errors() {
    return this.#errors();
  }
  #constraints = once(() => getValueAtPath(this.#name.current, this.#formConstraints.current) ?? {});
  get constraints() {
    return this.#constraints();
  }
  #tainted = once(() => this.#formTainted.current ? getValueAtPath(this.#name.current, this.#formTainted.current) === true : false);
  get tainted() {
    return this.#tainted();
  }
  errorNode = null;
  descriptionNode = null;
  constructor(props) {
    this.#form = props.form;
    this.#name = props.name;
    this.#formErrors = fromStore(props.form.current.errors);
    this.#formConstraints = fromStore(props.form.current.constraints);
    this.#formTainted = fromStore(props.form.current.tainted);
    this.#formData = fromStore(props.form.current.form);
  }
  #snippetProps = once(() => ({
    value: this.#formData.current[this.#name.current],
    errors: this.errors,
    tainted: this.tainted,
    constraints: (
      // @ts-expect-error - this type is wonky
      this.#formConstraints.current[
        // eslint-disable-next-line ts/no-explicit-any
        this.#name.current
      ] ?? {}
    )
  }));
  get snippetProps() {
    return this.#snippetProps();
  }
}
class FieldErrorsState {
  #ref;
  #id;
  field;
  #errorAttr = once(() => getDataFsError(this.field.errors));
  constructor(props, field) {
    this.#ref = props.ref;
    this.#id = props.id;
    this.field = field;
    useRefById({
      id: this.#id,
      ref: this.#ref,
      onRefChange: (node) => {
        this.field.errorNode = node;
      }
    });
  }
  #snippetProps = once(() => ({
    errors: this.field.errors,
    errorProps: this.errorProps
  }));
  get snippetProps() {
    return this.#snippetProps();
  }
  #fieldErrorsProps = once(() => ({
    id: this.#id.current,
    "data-fs-error": this.#errorAttr(),
    "data-fs-field-errors": "",
    "aria-live": "assertive"
  }));
  get fieldErrorsProps() {
    return this.#fieldErrorsProps();
  }
  #errorProps = once(() => ({
    "data-fs-field-error": "",
    "data-fs-error": this.#errorAttr()
  }));
  get errorProps() {
    return this.#errorProps();
  }
}
class ControlState {
  id;
  field;
  constructor(props, field) {
    this.id = props.id;
    this.field = field;
  }
  #props = once(() => ({
    id: this.id.current,
    name: this.field.name,
    "data-fs-error": getDataFsError(this.field.errors),
    "aria-describedby": getAriaDescribedBy({
      fieldErrorsId: this.field.errorNode?.id,
      descriptionId: this.field.descriptionNode?.id,
      errors: this.field.errors
    }),
    "aria-invalid": getAriaInvalid(this.field.errors),
    "aria-required": getAriaRequired(this.field.constraints),
    "data-fs-control": ""
  }));
  get props() {
    return this.#props();
  }
}
class LabelState {
  #ref;
  #id;
  control;
  constructor(props, control) {
    this.#ref = props.ref;
    this.#id = props.id;
    this.control = control;
    useRefById({ id: this.#id, ref: this.#ref });
  }
  #props = once(() => ({
    id: this.#id.current,
    "data-fs-label": "",
    "data-fs-error": getDataFsError(this.control.field.errors),
    for: this.control.id.current
  }));
  get props() {
    return this.#props();
  }
}
const FORM_FIELD_CTX = Symbol.for("formsnap.form-field");
const FORM_CONTROL_CTX = Symbol.for("formsnap.form-control");
function useFormField(props) {
  return setContext$1(FORM_FIELD_CTX, new FormFieldState(props));
}
function getFormField() {
  return getContext$1(FORM_FIELD_CTX);
}
function useFieldErrors(props) {
  return new FieldErrorsState(props, getFormField());
}
function useControl(props) {
  return setContext$1(FORM_CONTROL_CTX, new ControlState(props, getFormField()));
}
function getFormControl() {
  return getContext$1(FORM_CONTROL_CTX);
}
function useLabel(props) {
  return new LabelState(props, getFormControl());
}
let count = 0;
function useId(prefix = "formsnap") {
  count++;
  return `${prefix}-${count}`;
}
function Field($$payload, $$props) {
  push();
  let { form, name, children } = $$props;
  const fieldState = useFormField({
    form: box.with(() => form),
    name: box.with(() => name)
  });
  children?.($$payload, fieldState.snippetProps);
  $$payload.out += `<!---->`;
  pop();
}
function Control$1($$payload, $$props) {
  push();
  let { id = useId(), children } = $$props;
  const controlState = useControl({ id: box.with(() => id) });
  children?.($$payload, { props: controlState.props });
  $$payload.out += `<!---->`;
  pop();
}
function Label$1($$payload, $$props) {
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
  const labelState = useLabel({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, labelState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<label${spread_attributes({ ...mergedProps })}>`;
    children?.($$payload);
    $$payload.out += `<!----></label>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Field_errors($$payload, $$props) {
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
  const fieldErrorsState = useFieldErrors({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, fieldErrorsState.fieldErrorsProps);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, {
      props: mergedProps,
      ...fieldErrorsState.snippetProps
    });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps })}>`;
    if (children) {
      $$payload.out += "<!--[-->";
      children($$payload, fieldErrorsState.snippetProps);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array = ensure_array_like(fieldErrorsState.field.errors);
      $$payload.out += `<!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let error = each_array[$$index];
        $$payload.out += `<div${spread_attributes({ ...fieldErrorsState.errorProps })}>${escape_html(error)}</div>`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Form_button($$payload, $$props) {
  push();
  let {
    ref = null,
    loading = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (loading) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<!---->`;
      Button$1($$payload2, spread_props([
        { type: "submit" },
        restProps,
        {
          children: ($$payload3) => {
            Icon($$payload3, {
              icon: iconIds.defaultSpinnerIcon,
              width: "1.5rem",
              class: "animate-spin"
            });
          },
          $$slots: { default: true }
        }
      ]));
      $$payload2.out += `<!---->`;
    } else {
      $$payload2.out += "<!--[!-->";
      $$payload2.out += `<!---->`;
      Button$1($$payload2, spread_props([
        { type: "submit" },
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
function Form_field_errors($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    errorClasses,
    children: childrenProp,
    handlerErrors,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    {
      let children = function($$payload3, { errors, errorProps }) {
        if (childrenProp) {
          $$payload3.out += "<!--[-->";
          childrenProp($$payload3, { errors, errorProps });
          $$payload3.out += `<!---->`;
        } else {
          $$payload3.out += "<!--[!-->";
          const each_array = ensure_array_like(errors);
          $$payload3.out += `<ul><!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let error = each_array[$$index];
            $$payload3.out += `<li${spread_attributes(
              {
                ...errorProps,
                class: clsx(cn(errorClasses, "border-destructive-7 bg-destructive-3 border-x p-2 first:rounded-t-sm first:border-t last:mb-4 last:rounded-b-sm last:border-b"))
              }
            )}>${escape_html(error)}</li>`;
          }
          $$payload3.out += `<!--]--> `;
          if (handlerErrors) {
            $$payload3.out += "<!--[-->";
            const each_array_1 = ensure_array_like(handlerErrors);
            $$payload3.out += `<!--[-->`;
            for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
              let error = each_array_1[$$index_1];
              $$payload3.out += `<li${spread_attributes(
                {
                  ...errorProps,
                  class: clsx(cn(errorClasses, "border-destructive-7 bg-destructive-3 border-x p-2 first:rounded-t-sm first:border-t last:mb-4 last:rounded-b-sm last:border-b"))
                }
              )}>${escape_html(error)}</li>`;
            }
            $$payload3.out += `<!--]-->`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--></ul>`;
        }
        $$payload3.out += `<!--]-->`;
      };
      Field_errors($$payload2, spread_props([
        {
          class: cn("text-destructive-11 text-sm font-medium", className)
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
function Form_field($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    form,
    name,
    children: childrenProp,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<!---->`;
  {
    let children = function($$payload2, { constraints: constraints2, errors, tainted, value }) {
      $$payload2.out += `<div${spread_attributes(
        {
          class: clsx(cn("space-y-4", className)),
          ...restProps
        }
      )}>`;
      childrenProp?.($$payload2, { constraints: constraints2, errors, tainted, value });
      $$payload2.out += `<!----></div>`;
    };
    Field($$payload, {
      form,
      name,
      children
    });
  }
  $$payload.out += `<!---->`;
  bind_props($$props, { ref });
  pop();
}
function Form_info_popover($$payload, $$props) {
  push();
  let { description } = $$props;
  $$payload.out += `<!---->`;
  Root$2($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Trigger($$payload2, {
        class: "w-8",
        children: ($$payload3) => {
          Icon($$payload3, {
            icon: iconIds.formFieldDescriptionIcon,
            width: "1rem",
            class: "text-neutral-11 hover:text-neutral-10 ml-2"
          });
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Popover_content($$payload2, {
        class: "max-w-2xl",
        children: ($$payload3) => {
          $$payload3.out += `<!---->${escape_html(description)}`;
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
function Label($$payload, $$props) {
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
    Label$2($$payload2, spread_props([
      {
        class: cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)
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
function Form_label($$payload, $$props) {
  push();
  let {
    ref = null,
    children,
    class: className,
    description,
    optional = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    {
      let child = function($$payload3, { props }) {
        Label($$payload3, spread_props([
          props,
          {
            class: cn("flex items-center justify-between", className),
            children: ($$payload4) => {
              $$payload4.out += `<div class="decoration-destructive-8 underline-offset-4 data-[fs-error]:underline data-[fs-error]:decoration-wavy">`;
              children?.($$payload4);
              $$payload4.out += `<!----></div> <div class="flex items-center">`;
              if (!optional) {
                $$payload4.out += "<!--[-->";
                $$payload4.out += `<span class="translate-y-[2px]">*</span>`;
              } else {
                $$payload4.out += "<!--[!-->";
              }
              $$payload4.out += `<!--]--> `;
              if (description) {
                $$payload4.out += "<!--[-->";
                Form_info_popover($$payload4, { description });
              } else {
                $$payload4.out += "<!--[!-->";
              }
              $$payload4.out += `<!--]--></div>`;
            },
            $$slots: { default: true }
          }
        ]));
      };
      Label$1($$payload2, spread_props([
        restProps,
        {
          get ref() {
            return ref;
          },
          set ref($$value) {
            ref = $$value;
            $$settled = false;
          },
          child,
          $$slots: { child: true }
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
const Control = Control$1;
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
function Menubar_group_heading($$payload, $$props) {
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
function createPaneSettings(id, initialEnabled, initialDirection) {
  const settings = localStore(id, {
    enabled: initialEnabled,
    direction: initialDirection
  });
  function isEnabled(pane) {
    return settings.value.enabled.includes(pane);
  }
  function enable(pane) {
    if (!settings.value.enabled.includes(pane)) {
      settings.value.enabled.push(pane);
    }
  }
  function disable(pane) {
    if (settings.value.enabled.includes(pane) && settings.value.enabled.length > 1) {
      settings.value.enabled = settings.value.enabled.filter((item) => item !== pane);
    }
  }
  function reset() {
    settings.value.enabled = [];
    initialEnabled.forEach((pane) => {
      settings.value.enabled.push(pane);
    });
  }
  return {
    get direction() {
      return settings.value.direction;
    },
    set direction(newVal) {
      settings.value.direction = newVal;
    },
    isEnabled,
    enable,
    disable,
    reset
  };
}
function getControllerContext() {
  return getContext$1(CONTROLLER_CONTEXT_ID);
}
const SETTINGS_CONTEXT_ID = "userSettingsContext";
function createSettingsContext() {
  const units2 = new LocalStore("unitSettings", {
    distance: "metric",
    temperature: "metric",
    mass: "metric",
    volume: "metric"
  });
  return {
    get units() {
      return units2.value;
    },
    set units(newVal) {
      units2.value = newVal;
    }
  };
}
function setSettingsContext() {
  return setContext$1(SETTINGS_CONTEXT_ID, createSettingsContext());
}
function getSettingsContext() {
  return getContext$1(SETTINGS_CONTEXT_ID);
}
function useQuery(client, query, options) {
  let results = void 0;
  let fetching = true;
  let fetchingLocal = true;
  let fetchingRemote = false;
  let error = void 0;
  return {
    get fetching() {
      return fetching;
    },
    get fetchingLocal() {
      return fetchingLocal;
    },
    get fetchingRemote() {
      return fetchingRemote;
    },
    get results() {
      return results;
    },
    get error() {
      return error;
    }
  };
}
const gardenContextKey = "gardenContext";
function createGardenContext(controller) {
  let id = "";
  useQuery(controller.triplit, controller.triplit.query("accounts").Id("$session.accountId").Include("profile"));
  useQuery(controller.triplit, controller.triplit.query("gardens").Id(id));
  const role = (() => {
    {
      return null;
    }
  })();
  function authorize(action) {
    if (controller.disablePermissions) {
      return true;
    }
    if (id === null || role === null) {
      return false;
    }
    const requiredRole$1 = requiredRole(action);
    if (requiredRole$1 === "ADMIN" && role === "ADMIN") {
      return true;
    } else if (requiredRole$1 === "EDITOR" && (role === "ADMIN" || role === "EDITOR")) {
      return true;
    } else if (requiredRole$1 === "VIEWER" && (role === "ADMIN" || role === "EDITOR" || role === "VIEWER")) {
      return true;
    } else {
      return false;
    }
  }
  return {
    get id() {
      return id;
    },
    get role() {
      return role;
    },
    set id(newVal) {
      id = newVal;
    },
    authorize
  };
}
function setGardenContext(controller) {
  return setContext$1(gardenContextKey, createGardenContext(controller));
}
function getGardenContext() {
  return getContext$1(gardenContextKey);
}
const getStores = () => {
  const stores$1 = getContext$1("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
const navigating = {
  subscribe(fn) {
    const store = getStores().navigating;
    return store.subscribe(fn);
  }
};
function setPath(parent, key, value) {
  parent[key] = value;
  return "skip";
}
function isInvalidPath(originalPath, pathData) {
  return pathData.value !== void 0 && typeof pathData.value !== "object" && pathData.path.length < originalPath.length;
}
function pathExists(obj, path, options = {}) {
  if (!options.modifier) {
    options.modifier = (pathData) => isInvalidPath(path, pathData) ? void 0 : pathData.value;
  }
  const exists = traversePath(obj, path, options.modifier);
  if (!exists)
    return void 0;
  if (options.value === void 0)
    return exists;
  return options.value(exists.value) ? exists : void 0;
}
function traversePath(obj, realPath, modifier) {
  if (!realPath.length)
    return void 0;
  const path = [realPath[0]];
  let parent = obj;
  while (parent && path.length < realPath.length) {
    const key2 = path[path.length - 1];
    const value = modifier ? modifier({
      parent,
      key: String(key2),
      value: parent[key2],
      path: path.map((p) => String(p)),
      isLeaf: false,
      set: (v) => setPath(parent, key2, v)
    }) : parent[key2];
    if (value === void 0)
      return void 0;
    else
      parent = value;
    path.push(realPath[path.length]);
  }
  if (!parent)
    return void 0;
  const key = realPath[realPath.length - 1];
  return {
    parent,
    key: String(key),
    value: parent[key],
    path: realPath.map((p) => String(p)),
    isLeaf: true,
    set: (v) => setPath(parent, key, v)
  };
}
function traversePaths(parent, modifier, path = []) {
  for (const key in parent) {
    const value = parent[key];
    const isLeaf = value === null || typeof value !== "object";
    const pathData = {
      parent,
      key,
      value,
      path: path.concat([key]),
      // path.map(String).concat([key])
      isLeaf,
      set: (v) => setPath(parent, key, v)
    };
    const status = modifier(pathData);
    if (status === "abort")
      return status;
    else if (status === "skip")
      continue;
    else if (!isLeaf) {
      const status2 = traversePaths(value, modifier, pathData.path);
      if (status2 === "abort")
        return status2;
    }
  }
}
function eqSet(xs, ys) {
  return xs === ys || xs.size === ys.size && [...xs].every((x) => ys.has(x));
}
function comparePaths(newObj, oldObj) {
  const diffPaths = /* @__PURE__ */ new Map();
  function builtInDiff(one, other) {
    if (one instanceof Date && other instanceof Date && one.getTime() !== other.getTime())
      return true;
    if (one instanceof Set && other instanceof Set && !eqSet(one, other))
      return true;
    if (one instanceof File && other instanceof File && one !== other)
      return true;
    return false;
  }
  function isBuiltin(data) {
    return data instanceof Date || data instanceof Set || data instanceof File;
  }
  function checkPath(data, compareTo) {
    const otherData = compareTo ? traversePath(compareTo, data.path) : void 0;
    function addDiff() {
      diffPaths.set(data.path.join(" "), data.path);
      return "skip";
    }
    if (isBuiltin(data.value)) {
      if (!isBuiltin(otherData?.value) || builtInDiff(data.value, otherData.value)) {
        return addDiff();
      }
    }
    if (data.isLeaf) {
      if (!otherData || data.value !== otherData.value) {
        addDiff();
      }
    }
  }
  traversePaths(newObj, (data) => checkPath(data, oldObj));
  traversePaths(oldObj, (data) => checkPath(data, newObj));
  const output = Array.from(diffPaths.values());
  output.sort((a, b) => a.length - b.length);
  return output;
}
function setPaths(obj, paths, value) {
  const isFunction = typeof value === "function";
  for (const path of paths) {
    const leaf = traversePath(obj, path, ({ parent, key, value: value2 }) => {
      if (value2 === void 0 || typeof value2 !== "object") {
        parent[key] = {};
      }
      return parent[key];
    });
    if (leaf)
      leaf.parent[leaf.key] = isFunction ? value(path, leaf) : value;
  }
}
function splitPath(path) {
  return path.toString().split(/[[\].]+/).filter((p) => p);
}
function mergePath(path) {
  return path.reduce((acc, next2) => {
    const key = String(next2);
    if (typeof next2 === "number" || /^\d+$/.test(key))
      acc += `[${key}]`;
    else if (!acc)
      acc += key;
    else
      acc += `.${key}`;
    return acc;
  }, "");
}
function clone$2(obj) {
  const type = {}.toString.call(obj).slice(8, -1);
  if (type == "Set") {
    return new Set([...obj].map((value) => clone$2(value)));
  }
  if (type == "Map") {
    return new Map([...obj].map((kv) => [clone$2(kv[0]), clone$2(kv[1])]));
  }
  if (type == "Date") {
    return new Date(obj.getTime());
  }
  if (type == "RegExp") {
    return RegExp(obj.source, obj.flags);
  }
  if (type == "Array" || type == "Object") {
    const result = type == "Object" ? Object.create(Object.getPrototypeOf(obj)) : [];
    for (const key in obj) {
      result[key] = clone$2(obj[key]);
    }
    return result;
  }
  return obj;
}
function clone$1(data) {
  return data && typeof data === "object" ? clone$2(data) : data;
}
function assertSchema(schema, path) {
  if (typeof schema === "boolean") {
    throw new SchemaError("Schema property cannot be defined as boolean.", path);
  }
}
const isObject = (obj) => {
  if (typeof obj === "object" && obj !== null) {
    if (typeof Object.getPrototypeOf === "function") {
      const prototype = Object.getPrototypeOf(obj);
      return prototype === Object.prototype || prototype === null;
    }
    return Object.prototype.toString.call(obj) === "[object Object]";
  }
  return false;
};
const merge$1 = (...objects) => objects.reduce((result, current) => {
  if (current === void 0) {
    return result;
  }
  if (Array.isArray(current)) {
    throw new TypeError("Arguments provided to ts-deepmerge must be objects, not arrays.");
  }
  Object.keys(current).forEach((key) => {
    if (["__proto__", "constructor", "prototype"].includes(key)) {
      return;
    }
    if (Array.isArray(result[key]) && Array.isArray(current[key])) {
      result[key] = merge$1.options.mergeArrays ? merge$1.options.uniqueArrayItems ? Array.from(new Set(result[key].concat(current[key]))) : [...result[key], ...current[key]] : current[key];
    } else if (isObject(result[key]) && isObject(current[key])) {
      result[key] = merge$1(result[key], current[key]);
    } else if (!isObject(result[key]) && isObject(current[key])) {
      result[key] = merge$1(current[key], void 0);
    } else {
      result[key] = current[key] === void 0 ? merge$1.options.allowUndefinedOverrides ? current[key] : result[key] : current[key];
    }
  });
  return result;
}, {});
const defaultOptions$2 = {
  allowUndefinedOverrides: true,
  mergeArrays: true,
  uniqueArrayItems: true
};
merge$1.options = defaultOptions$2;
merge$1.withOptions = (options, ...objects) => {
  merge$1.options = Object.assign(Object.assign({}, defaultOptions$2), options);
  const result = merge$1(...objects);
  merge$1.options = defaultOptions$2;
  return result;
};
const conversionFormatTypes = ["unix-time", "bigint", "any", "symbol", "set", "int64"];
function schemaInfo(schema, isOptional, path) {
  assertSchema(schema, path);
  const types = schemaTypes(schema, path);
  const array = schema.items && types.includes("array") ? (Array.isArray(schema.items) ? schema.items : [schema.items]).filter((s) => typeof s !== "boolean") : void 0;
  const additionalProperties = schema.additionalProperties && typeof schema.additionalProperties === "object" && types.includes("object") ? Object.fromEntries(Object.entries(schema.additionalProperties).filter(([, value]) => typeof value !== "boolean")) : void 0;
  const properties = schema.properties && types.includes("object") ? Object.fromEntries(Object.entries(schema.properties).filter(([, value]) => typeof value !== "boolean")) : void 0;
  const union = unionInfo(schema)?.filter((u) => u.type !== "null" && u.const !== null);
  const result = {
    types: types.filter((s) => s !== "null"),
    isOptional,
    isNullable: types.includes("null"),
    schema,
    union: union?.length ? union : void 0,
    array,
    properties,
    additionalProperties,
    required: schema.required
  };
  if (!schema.allOf || !schema.allOf.length) {
    return result;
  }
  return {
    ...merge$1.withOptions({ allowUndefinedOverrides: false }, result, ...schema.allOf.map((s) => schemaInfo(s, false, []))),
    schema
  };
}
function schemaTypes(schema, path) {
  assertSchema(schema, path);
  let types = schema.const === null ? ["null"] : [];
  if (schema.type) {
    types = Array.isArray(schema.type) ? schema.type : [schema.type];
  }
  if (schema.anyOf) {
    types = schema.anyOf.flatMap((s) => schemaTypes(s, path));
  }
  if (types.includes("array") && schema.uniqueItems) {
    const i = types.findIndex((t) => t != "array");
    types[i] = "set";
  } else if (schema.format && conversionFormatTypes.includes(schema.format)) {
    types.unshift(schema.format);
    if (schema.format == "unix-time" || schema.format == "int64") {
      const i = types.findIndex((t) => t == "integer");
      types.splice(i, 1);
    }
  }
  if (schema.const && schema.const !== null && typeof schema.const !== "function") {
    types.push(typeof schema.const);
  }
  return Array.from(new Set(types));
}
function unionInfo(schema) {
  if (!schema.anyOf || !schema.anyOf.length)
    return void 0;
  return schema.anyOf.filter((s) => typeof s !== "boolean");
}
function defaultValues(schema, isOptional = false, path = []) {
  return _defaultValues(schema, isOptional, path);
}
function _defaultValues(schema, isOptional, path) {
  if (!schema) {
    throw new SchemaError("Schema was undefined", path);
  }
  const info = schemaInfo(schema, isOptional, path);
  if (!info)
    return void 0;
  let objectDefaults = void 0;
  if ("default" in schema) {
    if (info.types.includes("object") && schema.default && typeof schema.default == "object" && !Array.isArray(schema.default)) {
      objectDefaults = schema.default;
    } else {
      if (info.types.length > 1) {
        if (info.types.includes("unix-time") && (info.types.includes("integer") || info.types.includes("number")))
          throw new SchemaError("Cannot resolve a default value with a union that includes a date and a number/integer.", path);
      }
      const [type] = info.types;
      return formatDefaultValue(type, schema.default);
    }
  }
  let _multiType;
  const isMultiTypeUnion = () => {
    if (!info.union || info.union.length < 2)
      return false;
    if (info.union.some((i) => i.enum))
      return true;
    if (!_multiType) {
      _multiType = new Set(info.types.map((i) => {
        return ["integer", "unix-time"].includes(i) ? "number" : i;
      }));
    }
    return _multiType.size > 1;
  };
  let output = void 0;
  if (!objectDefaults && info.union) {
    const singleDefault = info.union.filter((s) => typeof s !== "boolean" && s.default !== void 0);
    if (singleDefault.length == 1) {
      return _defaultValues(singleDefault[0], isOptional, path);
    } else if (singleDefault.length > 1) {
      throw new SchemaError("Only one default value can exist in a union, or set a default value for the whole union.", path);
    } else {
      if (info.isNullable)
        return null;
      if (info.isOptional)
        return void 0;
      if (isMultiTypeUnion()) {
        throw new SchemaError("Multi-type unions must have a default value, or exactly one of the union types must have.", path);
      }
      if (info.union.length && info.types[0] == "object") {
        if (output === void 0)
          output = {};
        output = info.union.length > 1 ? merge$1.withOptions({ allowUndefinedOverrides: true }, ...info.union.map((s) => _defaultValues(s, isOptional, path))) : _defaultValues(info.union[0], isOptional, path);
      }
    }
  }
  if (!objectDefaults) {
    if (info.isNullable)
      return null;
    if (info.isOptional)
      return void 0;
  }
  if (info.properties) {
    for (const [key, objSchema] of Object.entries(info.properties)) {
      assertSchema(objSchema, [...path, key]);
      const def = objectDefaults && objectDefaults[key] !== void 0 ? objectDefaults[key] : _defaultValues(objSchema, !info.required?.includes(key), [...path, key]);
      if (output === void 0)
        output = {};
      output[key] = def;
    }
  } else if (objectDefaults) {
    return objectDefaults;
  }
  if (schema.enum) {
    return schema.enum[0];
  }
  if (isMultiTypeUnion()) {
    throw new SchemaError("Default values cannot have more than one type.", path);
  } else if (info.types.length == 0) {
    return void 0;
  }
  const [formatType] = info.types;
  return output ?? defaultValue(formatType, schema.enum);
}
function formatDefaultValue(type, value) {
  switch (type) {
    case "set":
      return Array.isArray(value) ? new Set(value) : value;
    case "Date":
    case "date":
    case "unix-time":
      if (typeof value === "string" || typeof value === "number")
        return new Date(value);
      break;
    case "bigint":
      if (typeof value === "string" || typeof value === "number")
        return BigInt(value);
      break;
    case "symbol":
      if (typeof value === "string" || typeof value === "number")
        return Symbol(value);
      break;
  }
  return value;
}
function defaultValue(type, enumType) {
  switch (type) {
    case "string":
      return enumType && enumType.length > 0 ? enumType[0] : "";
    case "number":
    case "integer":
      return enumType && enumType.length > 0 ? enumType[0] : 0;
    case "boolean":
      return false;
    case "array":
      return [];
    case "object":
      return {};
    case "null":
      return null;
    case "Date":
    case "date":
    case "unix-time":
      return void 0;
    case "int64":
    case "bigint":
      return BigInt(0);
    case "set":
      return /* @__PURE__ */ new Set();
    case "symbol":
      return Symbol();
    case "undefined":
    case "any":
      return void 0;
    default:
      throw new SchemaError("Schema type or format not supported, requires explicit default value: " + type);
  }
}
class SuperFormError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, SuperFormError.prototype);
  }
}
class SchemaError extends SuperFormError {
  path;
  constructor(message, path) {
    super((path && path.length ? `[${Array.isArray(path) ? path.join(".") : path}] ` : "") + message);
    this.path = Array.isArray(path) ? path.join(".") : path;
    Object.setPrototypeOf(this, SchemaError.prototype);
  }
}
function mapErrors(errors, shape) {
  const output = {};
  function addFormLevelError(error) {
    if (!("_errors" in output))
      output._errors = [];
    if (!Array.isArray(output._errors)) {
      if (typeof output._errors === "string")
        output._errors = [output._errors];
      else
        throw new SuperFormError("Form-level error was not an array.");
    }
    output._errors.push(error.message);
  }
  for (const error of errors) {
    if (!error.path || error.path.length == 1 && !error.path[0]) {
      addFormLevelError(error);
      continue;
    }
    const isLastIndexNumeric = /^\d$/.test(String(error.path[error.path.length - 1]));
    const objectError = !isLastIndexNumeric && pathExists(shape, error.path.filter((p) => /\D/.test(String(p))))?.value;
    const leaf = traversePath(output, error.path, ({ value, parent: parent2, key: key2 }) => {
      if (value === void 0)
        parent2[key2] = {};
      return parent2[key2];
    });
    if (!leaf) {
      addFormLevelError(error);
      continue;
    }
    const { parent, key } = leaf;
    if (objectError) {
      if (!(key in parent))
        parent[key] = {};
      if (!("_errors" in parent[key]))
        parent[key]._errors = [error.message];
      else
        parent[key]._errors.push(error.message);
    } else {
      if (!(key in parent))
        parent[key] = [error.message];
      else
        parent[key].push(error.message);
    }
  }
  return output;
}
function updateErrors(New, Previous2, force) {
  if (force)
    return New;
  traversePaths(Previous2, (errors) => {
    if (!Array.isArray(errors.value))
      return;
    errors.set(void 0);
  });
  traversePaths(New, (error) => {
    if (!Array.isArray(error.value) && error.value !== void 0)
      return;
    setPaths(Previous2, [error.path], error.value);
  });
  return Previous2;
}
function flattenErrors(errors) {
  return _flattenErrors(errors, []);
}
function _flattenErrors(errors, path) {
  const entries = Object.entries(errors);
  return entries.filter(([, value]) => value !== void 0).flatMap(([key, messages]) => {
    if (Array.isArray(messages) && messages.length > 0) {
      const currPath = path.concat([key]);
      return { path: mergePath(currPath), messages };
    } else {
      return _flattenErrors(errors[key], path.concat([key]));
    }
  });
}
function cancelFlash(options) {
  if (!options.flashMessage || true)
    return;
}
function shouldSyncFlash(options) {
  if (!options.flashMessage || true)
    return false;
}
function deserialize(result) {
  const parsed = JSON.parse(result);
  if (parsed.data) {
    parsed.data = parse(parsed.data, app.decoders);
  }
  return parsed;
}
function clone(element2) {
  return (
    /** @type {T} */
    HTMLElement.prototype.cloneNode.call(element2)
  );
}
function enhance(form_element, submit = () => {
}) {
  const fallback_callback = async ({
    action,
    result,
    reset = true,
    invalidateAll: shouldInvalidateAll = true
  }) => {
    if (result.type === "success") {
      if (reset) {
        HTMLFormElement.prototype.reset.call(form_element);
      }
      if (shouldInvalidateAll) {
        await invalidateAll();
      }
    }
    if (location.origin + location.pathname === action.origin + action.pathname || result.type === "redirect" || result.type === "error") {
      await applyAction();
    }
  };
  async function handle_submit(event) {
    const method = event.submitter?.hasAttribute("formmethod") ? (
      /** @type {HTMLButtonElement | HTMLInputElement} */
      event.submitter.formMethod
    ) : clone(form_element).method;
    if (method !== "post") return;
    event.preventDefault();
    const action = new URL(
      // We can't do submitter.formAction directly because that property is always set
      event.submitter?.hasAttribute("formaction") ? (
        /** @type {HTMLButtonElement | HTMLInputElement} */
        event.submitter.formAction
      ) : clone(form_element).action
    );
    const enctype = event.submitter?.hasAttribute("formenctype") ? (
      /** @type {HTMLButtonElement | HTMLInputElement} */
      event.submitter.formEnctype
    ) : clone(form_element).enctype;
    const form_data = new FormData(form_element);
    const submitter_name = event.submitter?.getAttribute("name");
    if (submitter_name) {
      form_data.append(submitter_name, event.submitter?.getAttribute("value") ?? "");
    }
    const controller = new AbortController();
    let cancelled = false;
    const cancel = () => cancelled = true;
    const callback = await submit({
      action,
      cancel,
      controller,
      formData: form_data,
      formElement: form_element,
      submitter: event.submitter
    }) ?? fallback_callback;
    if (cancelled) return;
    let result;
    try {
      const headers = new Headers({
        accept: "application/json",
        "x-sveltekit-action": "true"
      });
      if (enctype !== "multipart/form-data") {
        headers.set(
          "Content-Type",
          /^(:?application\/x-www-form-urlencoded|text\/plain)$/.test(enctype) ? enctype : "application/x-www-form-urlencoded"
        );
      }
      const body = enctype === "multipart/form-data" ? form_data : new URLSearchParams(form_data);
      const response = await fetch(action, {
        method: "POST",
        headers,
        cache: "no-store",
        body,
        signal: controller.signal
      });
      result = deserialize(await response.text());
      if (result.type === "error") result.status = response.status;
    } catch (error) {
      if (
        /** @type {any} */
        error?.name === "AbortError"
      ) return;
      result = { type: "error", error };
    }
    await callback({
      action,
      formData: form_data,
      formElement: form_element,
      update: (opts) => fallback_callback({
        action,
        result,
        reset: opts?.reset,
        invalidateAll: opts?.invalidateAll
      }),
      // @ts-expect-error generic constraints stuff we don't care about
      result
    });
  }
  HTMLFormElement.prototype.addEventListener.call(form_element, "submit", handle_submit);
  return {
    destroy() {
      HTMLFormElement.prototype.removeEventListener.call(form_element, "submit", handle_submit);
    }
  };
}
const noCustomValidityDataAttribute = "noCustomValidity";
async function updateCustomValidity(validityEl, errors) {
  if ("setCustomValidity" in validityEl) {
    validityEl.setCustomValidity("");
  }
  if (noCustomValidityDataAttribute in validityEl.dataset)
    return;
  setCustomValidity(validityEl, errors);
}
function setCustomValidityForm(formElement, errors) {
  for (const el of formElement.querySelectorAll("input,select,textarea,button")) {
    if ("dataset" in el && noCustomValidityDataAttribute in el.dataset || !el.name) {
      continue;
    }
    const path = traversePath(errors, splitPath(el.name));
    const error = path && typeof path.value === "object" && "_errors" in path.value ? path.value._errors : path?.value;
    setCustomValidity(el, error);
    if (error)
      return;
  }
}
function setCustomValidity(el, errors) {
  if (!("setCustomValidity" in el))
    return;
  const message = errors && errors.length ? errors.join("\n") : "";
  el.setCustomValidity(message);
  if (message)
    el.reportValidity();
}
const isElementInViewport = (el, topOffset = 0) => {
  const rect = el.getBoundingClientRect();
  return rect.top >= topOffset && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
};
const scrollToAndCenter = (el, offset = 1.125, behavior = "smooth") => {
  const elementRect = el.getBoundingClientRect();
  const absoluteElementTop = elementRect.top + window.pageYOffset;
  const top = absoluteElementTop - window.innerHeight / (2 * offset);
  window.scrollTo({ left: 0, top, behavior });
};
const immediateInputTypes = ["checkbox", "radio", "range", "file"];
function inputInfo(el) {
  const immediate = !!el && (el instanceof HTMLSelectElement || el instanceof HTMLInputElement && immediateInputTypes.includes(el.type));
  const multiple = !!el && el instanceof HTMLSelectElement && el.multiple;
  const file = !!el && el instanceof HTMLInputElement && el.type == "file";
  return { immediate, multiple, file };
}
var FetchStatus;
(function(FetchStatus2) {
  FetchStatus2[FetchStatus2["Idle"] = 0] = "Idle";
  FetchStatus2[FetchStatus2["Submitting"] = 1] = "Submitting";
  FetchStatus2[FetchStatus2["Delayed"] = 2] = "Delayed";
  FetchStatus2[FetchStatus2["Timeout"] = 3] = "Timeout";
})(FetchStatus || (FetchStatus = {}));
const activeTimers = /* @__PURE__ */ new Set();
function Form(formElement, timers, options) {
  let state = FetchStatus.Idle;
  let delayedTimeout, timeoutTimeout;
  const Timers = activeTimers;
  function Timers_start() {
    Timers_clear();
    Timers_setState(state != FetchStatus.Delayed ? FetchStatus.Submitting : FetchStatus.Delayed);
    delayedTimeout = window.setTimeout(() => {
      if (delayedTimeout && state == FetchStatus.Submitting)
        Timers_setState(FetchStatus.Delayed);
    }, options.delayMs);
    timeoutTimeout = window.setTimeout(() => {
      if (timeoutTimeout && state == FetchStatus.Delayed)
        Timers_setState(FetchStatus.Timeout);
    }, options.timeoutMs);
    Timers.add(Timers_clear);
  }
  function Timers_clear() {
    clearTimeout(delayedTimeout);
    clearTimeout(timeoutTimeout);
    delayedTimeout = timeoutTimeout = 0;
    Timers.delete(Timers_clear);
    Timers_setState(FetchStatus.Idle);
  }
  function Timers_clearAll() {
    Timers.forEach((t) => t());
    Timers.clear();
  }
  function Timers_setState(s) {
    state = s;
    timers.submitting.set(state >= FetchStatus.Submitting);
    timers.delayed.set(state >= FetchStatus.Delayed);
    timers.timeout.set(state >= FetchStatus.Timeout);
  }
  const ErrorTextEvents = formElement;
  function ErrorTextEvents__selectText(e) {
    const target = e.target;
    if (options.selectErrorText)
      target.select();
  }
  function ErrorTextEvents_addErrorTextListeners() {
    if (!options.selectErrorText)
      return;
    ErrorTextEvents.querySelectorAll("input").forEach((el) => {
      el.addEventListener("invalid", ErrorTextEvents__selectText);
    });
  }
  function ErrorTextEvents_removeErrorTextListeners() {
    if (!options.selectErrorText)
      return;
    ErrorTextEvents.querySelectorAll("input").forEach((el) => el.removeEventListener("invalid", ErrorTextEvents__selectText));
  }
  const Form2 = formElement;
  {
    ErrorTextEvents_addErrorTextListeners();
    const completed = (opts) => {
      if (!opts.clearAll)
        Timers_clear();
      else
        Timers_clearAll();
      if (!opts.cancelled)
        setTimeout(() => scrollToFirstError(Form2, options), 1);
    };
    onDestroy(() => {
      ErrorTextEvents_removeErrorTextListeners();
      completed({ cancelled: true });
    });
    return {
      submitting() {
        Timers_start();
      },
      completed,
      scrollToFirstError() {
        setTimeout(() => scrollToFirstError(Form2, options), 1);
      },
      isSubmitting: () => state === FetchStatus.Submitting || state === FetchStatus.Delayed
    };
  }
}
const scrollToFirstError = async (Form2, options) => {
  if (options.scrollToError == "off")
    return;
  const selector = options.errorSelector;
  if (!selector)
    return;
  await tick();
  let el;
  el = Form2.querySelector(selector);
  if (!el)
    return;
  el = el.querySelector(selector) ?? el;
  const nav = options.stickyNavbar ? document.querySelector(options.stickyNavbar) : null;
  if (typeof options.scrollToError != "string") {
    el.scrollIntoView(options.scrollToError);
  } else if (!isElementInViewport(el, nav?.offsetHeight ?? 0)) {
    scrollToAndCenter(el, void 0, options.scrollToError);
  }
  function Form_shouldAutoFocus(userAgent) {
    if (typeof options.autoFocusOnError === "boolean")
      return options.autoFocusOnError;
    else
      return !/iPhone|iPad|iPod|Android/i.test(userAgent);
  }
  if (!Form_shouldAutoFocus(navigator.userAgent))
    return;
  let focusEl;
  focusEl = el;
  if (!["INPUT", "SELECT", "BUTTON", "TEXTAREA"].includes(focusEl.tagName)) {
    focusEl = focusEl.querySelector('input:not([type="hidden"]):not(.flatpickr-input), select, textarea');
  }
  if (focusEl) {
    try {
      focusEl.focus({ preventScroll: true });
      if (options.selectErrorText && focusEl.tagName == "INPUT") {
        focusEl.select();
      }
    } catch (err) {
    }
  }
};
function updateProxyField(obj, path, updater) {
  const output = traversePath(obj, path, ({ parent, key, value }) => {
    if (value === void 0)
      parent[key] = /\D/.test(key) ? {} : [];
    return parent[key];
  });
  if (output) {
    const newValue = updater(output.value);
    output.parent[output.key] = newValue;
  }
  return obj;
}
function superFieldProxy(superForm2, path, baseOptions) {
  const form = superForm2.form;
  const path2 = splitPath(path);
  const proxy = derived(form, ($form) => {
    const data = traversePath($form, path2);
    return data?.value;
  });
  return {
    subscribe(...params) {
      const unsub = proxy.subscribe(...params);
      return () => unsub();
    },
    update(upd, options) {
      form.update((data) => updateProxyField(data, path2, upd), options ?? baseOptions);
    },
    set(value, options) {
      form.update((data) => updateProxyField(data, path2, () => value), options ?? baseOptions);
    }
  };
}
function isSuperForm(form, options) {
  const isSuperForm2 = "form" in form;
  if (!isSuperForm2 && options?.taint !== void 0) {
    throw new SuperFormError("If options.taint is set, the whole superForm object must be used as a proxy.");
  }
  return isSuperForm2;
}
function fieldProxy(form, path, options) {
  const path2 = splitPath(path);
  if (isSuperForm(form, options)) {
    return superFieldProxy(form, path, options);
  }
  const proxy = derived(form, ($form) => {
    const data = traversePath($form, path2);
    return data?.value;
  });
  return {
    subscribe(...params) {
      const unsub = proxy.subscribe(...params);
      return () => unsub();
    },
    update(upd) {
      form.update((data) => updateProxyField(data, path2, upd));
    },
    set(value) {
      form.update((data) => updateProxyField(data, path2, () => value));
    }
  };
}
function schemaShape(schema, path = []) {
  const output = _schemaShape(schema, path);
  if (!output)
    throw new SchemaError("No shape could be created for schema.", path);
  return output;
}
function _schemaShape(schema, path) {
  assertSchema(schema, path);
  const info = schemaInfo(schema, false, path);
  if (info.array || info.union) {
    const arr = info.array || [];
    const union = info.union || [];
    return arr.concat(union).reduce((shape, next2) => {
      const nextShape = _schemaShape(next2, path);
      if (nextShape)
        shape = { ...shape ?? {}, ...nextShape };
      return shape;
    }, arr.length ? {} : void 0);
  }
  if (info.properties) {
    const output = {};
    for (const [key, prop] of Object.entries(info.properties)) {
      const shape = _schemaShape(prop, [...path, key]);
      if (shape)
        output[key] = shape;
    }
    return output;
  }
  return info.types.includes("array") || info.types.includes("object") ? {} : void 0;
}
function shapeFromObject(obj) {
  let output = {};
  const isArray = Array.isArray(obj);
  for (const [key, value] of Object.entries(obj)) {
    if (!value || typeof value !== "object")
      continue;
    if (isArray)
      output = { ...output, ...shapeFromObject(value) };
    else
      output[key] = shapeFromObject(value);
  }
  return output;
}
const formIds = /* @__PURE__ */ new WeakMap();
const initialForms = /* @__PURE__ */ new WeakMap();
const defaultOnError = (event) => {
  throw event.result.error;
};
const defaultFormOptions = {
  applyAction: true,
  invalidateAll: true,
  resetForm: true,
  autoFocusOnError: "detect",
  scrollToError: "smooth",
  errorSelector: '[aria-invalid="true"],[data-invalid]',
  selectErrorText: false,
  stickyNavbar: void 0,
  taintedMessage: false,
  onSubmit: void 0,
  onResult: void 0,
  onUpdate: void 0,
  onUpdated: void 0,
  onError: defaultOnError,
  dataType: "form",
  validators: void 0,
  customValidity: false,
  clearOnSubmit: "message",
  delayMs: 500,
  timeoutMs: 8e3,
  multipleSubmits: "prevent",
  SPA: void 0,
  validationMethod: "auto"
};
let LEGACY_MODE = false;
try {
  if (SUPERFORMS_LEGACY)
    LEGACY_MODE = true;
} catch {
}
let STORYBOOK_MODE = false;
try {
  if (globalThis.STORIES)
    STORYBOOK_MODE = true;
} catch {
}
function superForm(form, formOptions) {
  let initialForm;
  let options = formOptions ?? {};
  let initialValidator = void 0;
  {
    if (options.legacy ?? LEGACY_MODE) {
      if (options.resetForm === void 0)
        options.resetForm = false;
      if (options.taintedMessage === void 0)
        options.taintedMessage = true;
    }
    if (STORYBOOK_MODE) {
      if (options.applyAction === void 0)
        options.applyAction = false;
    }
    if (typeof options.SPA === "string") {
      if (options.invalidateAll === void 0)
        options.invalidateAll = false;
      if (options.applyAction === void 0)
        options.applyAction = false;
    }
    initialValidator = options.validators;
    options = {
      ...defaultFormOptions,
      ...options
    };
    if ((options.SPA === true || typeof options.SPA === "object") && options.validators === void 0) {
      console.warn("No validators set for superForm in SPA mode. Add a validation adapter to the validators option, or set it to false to disable this warning.");
    }
    if (!form) {
      throw new SuperFormError("No form data sent to superForm. Make sure the output from superValidate is used (usually data.form) and that it's not null or undefined. Alternatively, an object with default values for the form can also be used, but then constraints won't be available.");
    }
    if (Context_isValidationObject(form) === false) {
      form = {
        id: options.id ?? Math.random().toString(36).slice(2, 10),
        valid: false,
        posted: false,
        errors: {},
        data: form,
        shape: shapeFromObject(form)
      };
    }
    form = form;
    const _initialFormId = form.id = options.id ?? form.id;
    const _currentPage = get(page) ?? (STORYBOOK_MODE ? {} : void 0);
    if (!initialForms.has(form)) {
      initialForms.set(form, form);
    }
    initialForm = initialForms.get(form);
    if (_currentPage.form && typeof _currentPage.form === "object") {
      const postedData = _currentPage.form;
      for (const postedForm of Context_findValidationForms(postedData).reverse()) {
        if (postedForm.id == _initialFormId && !initialForms.has(postedForm)) {
          initialForms.set(postedData, postedData);
          const pageDataForm = form;
          form = postedForm;
          form.constraints = pageDataForm.constraints;
          form.shape = pageDataForm.shape;
          if (form.valid && options.resetForm && (options.resetForm === true || options.resetForm())) {
            form = clone$1(pageDataForm);
            form.message = clone$1(postedForm.message);
          }
          break;
        }
      }
    } else {
      form = clone$1(initialForm);
    }
    onDestroy(() => {
      Unsubscriptions_unsubscribe();
      NextChange_clear();
      EnhancedForm_destroy();
      for (const events of Object.values(formEvents)) {
        events.length = 0;
      }
      formIds.get(_currentPage)?.delete(_initialFormId);
    });
    if (options.dataType !== "json") {
      const checkForNestedData = (key, value) => {
        if (!value || typeof value !== "object")
          return;
        if (Array.isArray(value)) {
          if (value.length > 0)
            checkForNestedData(key, value[0]);
        } else if (!(value instanceof Date) && !(value instanceof File) && true) {
          throw new SuperFormError(`Object found in form field "${key}". Set the dataType option to "json" and add use:enhance to use nested data structures. More information: https://superforms.rocks/concepts/nested-data`);
        }
      };
      for (const [key, value] of Object.entries(form.data)) {
        checkForNestedData(key, value);
      }
    }
  }
  const __data = {
    formId: form.id,
    form: clone$1(form.data),
    constraints: form.constraints ?? {},
    posted: form.posted,
    errors: clone$1(form.errors),
    message: clone$1(form.message),
    tainted: void 0,
    valid: form.valid,
    submitting: false,
    shape: form.shape
  };
  const Data = __data;
  const FormId = writable(options.id ?? form.id);
  function Context_findValidationForms(data) {
    const forms = Object.values(data).filter((v) => Context_isValidationObject(v) !== false);
    return forms;
  }
  function Context_isValidationObject(object) {
    if (!object || typeof object !== "object")
      return false;
    if (!("valid" in object && "errors" in object && typeof object.valid === "boolean")) {
      return false;
    }
    return "id" in object && typeof object.id === "string" ? object.id : false;
  }
  const _formData = writable(form.data);
  const Form$1 = {
    subscribe: _formData.subscribe,
    set: (value, options2 = {}) => {
      const newData = clone$1(value);
      Tainted_update(newData, options2.taint ?? true);
      return _formData.set(newData);
    },
    update: (updater, options2 = {}) => {
      return _formData.update((value) => {
        const newData = updater(value);
        Tainted_update(newData, options2.taint ?? true);
        return newData;
      });
    }
  };
  function Form_isSPA() {
    return options.SPA === true || typeof options.SPA === "object";
  }
  function Form_resultStatus(defaultStatus) {
    if (defaultStatus > 400)
      return defaultStatus;
    return (typeof options.SPA === "boolean" || typeof options.SPA === "string" ? void 0 : options.SPA?.failStatus) || defaultStatus;
  }
  async function Form_validate(opts = {}) {
    const dataToValidate = opts.formData ?? Data.form;
    let errors = {};
    let status;
    const validator = opts.adapter ?? options.validators;
    if (typeof validator == "object") {
      if (validator != initialValidator && !("jsonSchema" in validator)) {
        throw new SuperFormError('Client validation adapter found in options.validators. A full adapter must be used when changing validators dynamically, for example "zod" instead of "zodClient".');
      }
      status = await /* @__PURE__ */ validator.validate(dataToValidate);
      if (!status.success) {
        errors = mapErrors(status.issues, validator.shape ?? Data.shape ?? {});
      } else if (opts.recheckValidData !== false) {
        return Form_validate({ ...opts, recheckValidData: false });
      }
    } else {
      status = { success: true, data: {} };
    }
    const data = { ...Data.form, ...dataToValidate, ...status.success ? status.data : {} };
    return {
      valid: status.success,
      posted: false,
      errors,
      data,
      constraints: Data.constraints,
      message: void 0,
      id: Data.formId,
      shape: Data.shape
    };
  }
  function Form__changeEvent(event) {
    if (!options.onChange || !event.paths.length || event.type == "blur")
      return;
    let changeEvent;
    const paths = event.paths.map(mergePath);
    if (event.type && event.paths.length == 1 && event.formElement && event.target instanceof Element) {
      changeEvent = {
        path: paths[0],
        paths,
        formElement: event.formElement,
        target: event.target,
        set(path, value, options2) {
          fieldProxy({ form: Form$1 }, path, options2).set(value);
        },
        get(path) {
          return get(fieldProxy(Form$1, path));
        }
      };
    } else {
      changeEvent = {
        paths,
        target: void 0,
        set(path, value, options2) {
          fieldProxy({ form: Form$1 }, path, options2).set(value);
        },
        get(path) {
          return get(fieldProxy(Form$1, path));
        }
      };
    }
    options.onChange(changeEvent);
  }
  async function Form_clientValidation(event, force = false, adapter) {
    if (event) {
      if (options.validators == "clear") {
        Errors.update(($errors) => {
          setPaths($errors, event.paths, void 0);
          return $errors;
        });
      }
      setTimeout(() => Form__changeEvent(event));
    }
    let skipValidation = false;
    if (!force) {
      if (options.validationMethod == "onsubmit" || options.validationMethod == "submit-only") {
        skipValidation = true;
      } else if (options.validationMethod == "onblur" && event?.type == "input")
        skipValidation = true;
      else if (options.validationMethod == "oninput" && event?.type == "blur")
        skipValidation = true;
    }
    if (skipValidation || !event || !options.validators || options.validators == "clear") {
      if (event?.paths) {
        const formElement = event?.formElement ?? EnhancedForm_get();
        if (formElement)
          Form__clearCustomValidity(formElement);
      }
      return;
    }
    const result = await Form_validate({ adapter });
    if (result.valid && (event.immediate || event.type != "input")) {
      Form$1.set(result.data, { taint: "ignore" });
    }
    await tick();
    Form__displayNewErrors(result.errors, event, force);
    return result;
  }
  function Form__clearCustomValidity(formElement) {
    const validity = /* @__PURE__ */ new Map();
    if (options.customValidity && formElement) {
      for (const el of formElement.querySelectorAll(`[name]`)) {
        if (typeof el.name !== "string" || !el.name.length)
          continue;
        const message = "validationMessage" in el ? String(el.validationMessage) : "";
        validity.set(el.name, { el, message });
        updateCustomValidity(el, void 0);
      }
    }
    return validity;
  }
  async function Form__displayNewErrors(errors, event, force) {
    const { type, immediate, multiple, paths } = event;
    const previous = Data.errors;
    const output = {};
    let validity = /* @__PURE__ */ new Map();
    const formElement = event.formElement ?? EnhancedForm_get();
    if (formElement)
      validity = Form__clearCustomValidity(formElement);
    traversePaths(errors, (error) => {
      if (!Array.isArray(error.value))
        return;
      const currentPath = [...error.path];
      if (currentPath[currentPath.length - 1] == "_errors") {
        currentPath.pop();
      }
      const joinedPath = currentPath.join(".");
      function addError() {
        setPaths(output, [error.path], error.value);
        if (options.customValidity && isEventError && validity.has(joinedPath)) {
          const { el, message } = validity.get(joinedPath);
          if (message != error.value) {
            setTimeout(() => updateCustomValidity(el, error.value));
            validity.clear();
          }
        }
      }
      if (force)
        return addError();
      const lastPath = error.path[error.path.length - 1];
      const isObjectError = lastPath == "_errors";
      const isEventError = error.value && paths.some((path) => {
        return isObjectError ? currentPath && path && currentPath.length > 0 && currentPath[0] == path[0] : joinedPath == path.join(".");
      });
      if (isEventError && options.validationMethod == "oninput")
        return addError();
      if (immediate && !multiple && isEventError)
        return addError();
      if (multiple) {
        const errorPath = pathExists(get(Errors), error.path.slice(0, -1));
        if (errorPath?.value && typeof errorPath?.value == "object") {
          for (const errors2 of Object.values(errorPath.value)) {
            if (Array.isArray(errors2)) {
              return addError();
            }
          }
        }
      }
      const previousError = pathExists(previous, error.path);
      if (previousError && previousError.key in previousError.parent) {
        return addError();
      }
      if (isObjectError) {
        if (options.validationMethod == "oninput" || type == "blur" && Tainted_hasBeenTainted(mergePath(error.path.slice(0, -1)))) {
          return addError();
        }
      } else {
        if (type == "blur" && isEventError) {
          return addError();
        }
      }
    });
    Errors.set(output);
  }
  function Form_set(data, options2 = {}) {
    if (options2.keepFiles) {
      traversePaths(Data.form, (info) => {
        if (info.value instanceof File || browser) {
          const dataPath = pathExists(data, info.path);
          if (!dataPath || !(dataPath.key in dataPath.parent)) {
            setPaths(data, [info.path], info.value);
          }
        }
      });
    }
    return Form$1.set(data, options2);
  }
  function Form_shouldReset(validForm, successActionResult) {
    return validForm && successActionResult && options.resetForm && (options.resetForm === true || options.resetForm());
  }
  function Form_capture(removeFilesfromData = true) {
    let data = Data.form;
    let tainted = Data.tainted;
    if (removeFilesfromData) {
      const removed = removeFiles(Data.form);
      data = removed.data;
      const paths = removed.paths;
      if (paths.length) {
        tainted = clone$1(tainted) ?? {};
        setPaths(tainted, paths, false);
      }
    }
    return {
      valid: Data.valid,
      posted: Data.posted,
      errors: Data.errors,
      data,
      constraints: Data.constraints,
      message: Data.message,
      id: Data.formId,
      tainted,
      shape: Data.shape
    };
  }
  async function Form_updateFromValidation(form2, successResult) {
    if (form2.valid && successResult && Form_shouldReset(form2.valid, successResult)) {
      Form_reset({ message: form2.message, posted: true });
    } else {
      rebind({
        form: form2,
        untaint: successResult,
        keepFiles: true,
        // Check if the form data should be used for updating, or if the invalidateAll load function should be used:
        pessimisticUpdate: options.invalidateAll == "force" || options.invalidateAll == "pessimistic"
      });
    }
    if (formEvents.onUpdated.length) {
      await tick();
    }
    for (const event of formEvents.onUpdated) {
      event({ form: form2 });
    }
  }
  function Form_reset(opts = {}) {
    if (opts.newState)
      initialForm.data = { ...initialForm.data, ...opts.newState };
    const resetData = clone$1(initialForm);
    resetData.data = { ...resetData.data, ...opts.data };
    if (opts.id !== void 0)
      resetData.id = opts.id;
    rebind({
      form: resetData,
      untaint: true,
      message: opts.message,
      keepFiles: false,
      posted: opts.posted,
      resetted: true
    });
  }
  async function Form_updateFromActionResult(result) {
    if (result.type == "error") {
      throw new SuperFormError(`ActionResult of type "${result.type}" cannot be passed to update function.`);
    }
    if (result.type == "redirect") {
      if (Form_shouldReset(true, true))
        Form_reset({ posted: true });
      return;
    }
    if (typeof result.data !== "object") {
      throw new SuperFormError("Non-object validation data returned from ActionResult.");
    }
    const forms = Context_findValidationForms(result.data);
    if (!forms.length) {
      throw new SuperFormError("No form data returned from ActionResult. Make sure you return { form } in the form actions.");
    }
    for (const newForm of forms) {
      if (newForm.id !== Data.formId)
        continue;
      await Form_updateFromValidation(newForm, result.status >= 200 && result.status < 300);
    }
  }
  const Message = writable(__data.message);
  const Constraints = writable(__data.constraints);
  const Posted = writable(__data.posted);
  const Shape = writable(__data.shape);
  const _errors = writable(form.errors);
  const Errors = {
    subscribe: _errors.subscribe,
    set(value, options2) {
      return _errors.set(updateErrors(value, Data.errors, options2?.force));
    },
    update(updater, options2) {
      return _errors.update((value) => {
        return updateErrors(updater(value), Data.errors, options2?.force);
      });
    },
    /**
     * To work with client-side validation, errors cannot be deleted but must
     * be set to undefined, to know where they existed before (tainted+error check in oninput)
     */
    clear: () => Errors.set({})
  };
  let NextChange = null;
  function NextChange_setHtmlEvent(event) {
    if (NextChange && event && Object.keys(event).length == 1 && event.paths?.length && NextChange.target && NextChange.target instanceof HTMLInputElement && NextChange.target.type.toLowerCase() == "file") {
      NextChange.paths = event.paths;
    } else {
      NextChange = event;
    }
    setTimeout(() => {
      Form_clientValidation(NextChange);
    }, 0);
  }
  function NextChange_additionalEventInformation(event, immediate, multiple, formElement, target) {
    if (NextChange === null) {
      NextChange = { paths: [] };
    }
    NextChange.type = event;
    NextChange.immediate = immediate;
    NextChange.multiple = multiple;
    NextChange.formElement = formElement;
    NextChange.target = target;
  }
  function NextChange_paths() {
    return NextChange?.paths ?? [];
  }
  function NextChange_clear() {
    NextChange = null;
  }
  const Tainted = {
    state: writable(),
    message: options.taintedMessage,
    clean: clone$1(form.data)
  };
  function Tainted_enable() {
    options.taintedMessage = Tainted.message;
  }
  function Tainted_currentState() {
    return Tainted.state;
  }
  function Tainted_hasBeenTainted(path) {
    if (!Data.tainted)
      return false;
    if (!path)
      return !!Data.tainted;
    const field = pathExists(Data.tainted, splitPath(path));
    return !!field && field.key in field.parent;
  }
  function Tainted_isTainted(path) {
    if (!arguments.length)
      return Tainted__isObjectTainted(Data.tainted);
    if (typeof path === "boolean")
      return path;
    if (typeof path === "object")
      return Tainted__isObjectTainted(path);
    if (!Data.tainted || path === void 0)
      return false;
    const field = pathExists(Data.tainted, splitPath(path));
    return Tainted__isObjectTainted(field?.value);
  }
  function Tainted__isObjectTainted(obj) {
    if (!obj)
      return false;
    if (typeof obj === "object") {
      for (const obj2 of Object.values(obj)) {
        if (Tainted__isObjectTainted(obj2))
          return true;
      }
    }
    return obj === true;
  }
  function Tainted_update(newData, taintOptions) {
    if (taintOptions == "ignore")
      return;
    const paths = comparePaths(newData, Data.form);
    const newTainted = comparePaths(newData, Tainted.clean).map((path) => path.join());
    if (paths.length) {
      if (taintOptions == "untaint-all" || taintOptions == "untaint-form") {
        Tainted.state.set(void 0);
      } else {
        Tainted.state.update((currentlyTainted) => {
          if (!currentlyTainted)
            currentlyTainted = {};
          setPaths(currentlyTainted, paths, (path, data) => {
            if (!newTainted.includes(path.join()))
              return void 0;
            const currentValue = traversePath(newData, path);
            const cleanPath = traversePath(Tainted.clean, path);
            const identical = currentValue && cleanPath && currentValue.value === cleanPath.value;
            const output = identical ? void 0 : taintOptions === true ? true : taintOptions === "untaint" ? void 0 : data.value;
            return output;
          });
          return currentlyTainted;
        });
      }
      NextChange_setHtmlEvent({ paths });
    }
  }
  function Tainted_set(tainted, newClean) {
    Tainted.state.set(tainted);
    if (newClean)
      Tainted.clean = newClean;
  }
  const Submitting = writable(false);
  const Delayed = writable(false);
  const Timeout = writable(false);
  const Unsubscriptions = [
    // eslint-disable-next-line dci-lint/private-role-access
    Tainted.state.subscribe((tainted) => __data.tainted = clone$1(tainted)),
    // eslint-disable-next-line dci-lint/private-role-access
    Form$1.subscribe((form2) => __data.form = clone$1(form2)),
    // eslint-disable-next-line dci-lint/private-role-access
    Errors.subscribe((errors) => __data.errors = clone$1(errors)),
    FormId.subscribe((id) => __data.formId = id),
    Constraints.subscribe((constraints2) => __data.constraints = constraints2),
    Posted.subscribe((posted) => __data.posted = posted),
    Message.subscribe((message) => __data.message = message),
    Submitting.subscribe((submitting) => __data.submitting = submitting),
    Shape.subscribe((shape) => __data.shape = shape)
  ];
  function Unsubscriptions_unsubscribe() {
    Unsubscriptions.forEach((unsub) => unsub());
  }
  let EnhancedForm;
  function EnhancedForm_get() {
    return EnhancedForm;
  }
  function EnhancedForm_setAction(action) {
    if (EnhancedForm)
      EnhancedForm.action = action;
  }
  function EnhancedForm_destroy() {
    if (EnhancedForm?.parentElement) {
      EnhancedForm.remove();
    }
    EnhancedForm = void 0;
  }
  const AllErrors = derived(Errors, ($errors) => $errors ? flattenErrors($errors) : []);
  options.taintedMessage = void 0;
  function rebind(opts) {
    const form2 = opts.form;
    const message = opts.message ?? form2.message;
    if (opts.untaint || opts.resetted) {
      Tainted_set(typeof opts.untaint === "boolean" ? void 0 : opts.untaint, form2.data);
    }
    if (!opts.pessimisticUpdate) {
      Form_set(form2.data, {
        taint: "ignore",
        keepFiles: opts.keepFiles
      });
    }
    Message.set(message);
    if (opts.resetted)
      Errors.update(() => ({}), { force: true });
    else
      Errors.set(form2.errors);
    FormId.set(form2.id);
    Posted.set(opts.posted ?? form2.posted);
    if (form2.constraints)
      Constraints.set(form2.constraints);
    if (form2.shape)
      Shape.set(form2.shape);
    __data.valid = form2.valid;
    if (options.flashMessage && shouldSyncFlash(options)) {
      const flash = options.flashMessage.module.getFlash(page);
      if (message && get(flash) === void 0) {
        flash.set(message);
      }
    }
  }
  const formEvents = {
    onSubmit: options.onSubmit ? [options.onSubmit] : [],
    onResult: options.onResult ? [options.onResult] : [],
    onUpdate: options.onUpdate ? [options.onUpdate] : [],
    onUpdated: options.onUpdated ? [options.onUpdated] : [],
    onError: options.onError ? [options.onError] : []
  };
  function superFormEnhance(FormElement, events) {
    if (options.SPA !== void 0 && FormElement.method == "get")
      FormElement.method = "post";
    if (typeof options.SPA === "string") {
      if (options.SPA.length && FormElement.action == document.location.href) {
        FormElement.action = options.SPA;
      }
    } else {
      EnhancedForm = FormElement;
    }
    if (events) {
      if (events.onError) {
        if (options.onError === "apply") {
          throw new SuperFormError('options.onError is set to "apply", cannot add any onError events.');
        } else if (events.onError === "apply") {
          throw new SuperFormError('Cannot add "apply" as onError event in use:enhance.');
        }
        formEvents.onError.push(events.onError);
      }
      if (events.onResult)
        formEvents.onResult.push(events.onResult);
      if (events.onSubmit)
        formEvents.onSubmit.push(events.onSubmit);
      if (events.onUpdate)
        formEvents.onUpdate.push(events.onUpdate);
      if (events.onUpdated)
        formEvents.onUpdated.push(events.onUpdated);
    }
    Tainted_enable();
    let lastInputChange;
    async function onInput(e) {
      const info = inputInfo(e.target);
      if (info.immediate && !info.file)
        await new Promise((r) => setTimeout(r, 0));
      lastInputChange = NextChange_paths();
      NextChange_additionalEventInformation("input", info.immediate, info.multiple, FormElement, e.target ?? void 0);
    }
    async function onBlur(e) {
      if (Data.submitting)
        return;
      if (!lastInputChange || NextChange_paths() != lastInputChange) {
        return;
      }
      const info = inputInfo(e.target);
      if (info.immediate && !info.file)
        await new Promise((r) => setTimeout(r, 0));
      Form_clientValidation({
        paths: lastInputChange,
        immediate: info.multiple,
        multiple: info.multiple,
        type: "blur",
        formElement: FormElement,
        target: e.target ?? void 0
      });
      lastInputChange = void 0;
    }
    FormElement.addEventListener("focusout", onBlur);
    FormElement.addEventListener("input", onInput);
    onDestroy(() => {
      FormElement.removeEventListener("focusout", onBlur);
      FormElement.removeEventListener("input", onInput);
    });
    const htmlForm = Form(FormElement, { submitting: Submitting, delayed: Delayed, timeout: Timeout }, options);
    let currentRequest;
    let customRequest = void 0;
    const enhanced = enhance(FormElement, async (submitParams) => {
      let jsonData = void 0;
      let validationAdapter = options.validators;
      const submit = {
        ...submitParams,
        jsonData(data) {
          if (options.dataType !== "json") {
            throw new SuperFormError("options.dataType must be set to 'json' to use jsonData.");
          }
          jsonData = data;
        },
        validators(adapter) {
          validationAdapter = adapter;
        },
        customRequest(request) {
          customRequest = request;
        }
      };
      const _submitCancel = submit.cancel;
      let cancelled = false;
      function clientValidationResult(validation) {
        const validationResult = { ...validation, posted: true };
        const status = validationResult.valid ? 200 : Form_resultStatus(400);
        const data = { form: validationResult };
        const result = validationResult.valid ? { type: "success", status, data } : { type: "failure", status, data };
        setTimeout(() => validationResponse({ result }), 0);
      }
      function clearOnSubmit() {
        switch (options.clearOnSubmit) {
          case "errors-and-message":
            Errors.clear();
            Message.set(void 0);
            break;
          case "errors":
            Errors.clear();
            break;
          case "message":
            Message.set(void 0);
            break;
        }
      }
      async function triggerOnError(result, status) {
        result.status = status;
        if (options.onError !== "apply") {
          const event = { result, message: Message, form };
          for (const onErrorEvent of formEvents.onError) {
            if (onErrorEvent !== "apply" && (onErrorEvent != defaultOnError || !options.flashMessage?.onError)) {
              await onErrorEvent(event);
            }
          }
        }
        if (options.flashMessage && options.flashMessage.onError) {
          await options.flashMessage.onError({
            result,
            flashMessage: options.flashMessage.module.getFlash(page)
          });
        }
        if (options.applyAction) {
          if (options.onError == "apply") {
            await applyAction();
          } else {
            await applyAction({
              status: Form_resultStatus(result.status)
            });
          }
        }
      }
      function cancel(opts = {
        resetTimers: true
      }) {
        cancelled = true;
        if (opts.resetTimers && htmlForm.isSubmitting()) {
          htmlForm.completed({ cancelled });
        }
        return _submitCancel();
      }
      submit.cancel = cancel;
      if (htmlForm.isSubmitting() && options.multipleSubmits == "prevent") {
        cancel({ resetTimers: false });
      } else {
        if (htmlForm.isSubmitting() && options.multipleSubmits == "abort") {
          if (currentRequest)
            currentRequest.abort();
        }
        htmlForm.submitting();
        currentRequest = submit.controller;
        for (const event of formEvents.onSubmit) {
          try {
            await event(submit);
          } catch (error) {
            cancel();
            triggerOnError({ type: "error", error }, 500);
          }
        }
      }
      if (cancelled && options.flashMessage)
        cancelFlash(options);
      if (!cancelled) {
        const noValidate = !Form_isSPA() && (FormElement.noValidate || (submit.submitter instanceof HTMLButtonElement || submit.submitter instanceof HTMLInputElement) && submit.submitter.formNoValidate);
        let validation = void 0;
        const validateForm = async () => {
          return await Form_validate({ adapter: validationAdapter });
        };
        clearOnSubmit();
        if (!noValidate) {
          validation = await validateForm();
          if (!validation.valid) {
            cancel({ resetTimers: false });
            clientValidationResult(validation);
          }
        }
        if (!cancelled) {
          if (options.flashMessage && (options.clearOnSubmit == "errors-and-message" || options.clearOnSubmit == "message") && shouldSyncFlash(options)) {
            options.flashMessage.module.getFlash(page).set(void 0);
          }
          const submitData = "formData" in submit ? submit.formData : submit.data;
          lastInputChange = void 0;
          if (Form_isSPA()) {
            if (!validation)
              validation = await validateForm();
            cancel({ resetTimers: false });
            clientValidationResult(validation);
          } else if (options.dataType === "json") {
            if (!validation)
              validation = await validateForm();
            const postData = clone$1(jsonData ?? validation.data);
            traversePaths(postData, (data) => {
              if (data.value instanceof File) {
                const key = "__superform_file_" + mergePath(data.path);
                submitData.append(key, data.value);
                return data.set(void 0);
              } else if (Array.isArray(data.value) && data.value.length && data.value.every((v) => v instanceof File)) {
                const key = "__superform_files_" + mergePath(data.path);
                for (const file of data.value) {
                  submitData.append(key, file);
                }
                return data.set(void 0);
              }
            });
            Object.keys(postData).forEach((key) => {
              if (typeof submitData.get(key) === "string") {
                submitData.delete(key);
              }
            });
            const transport = options.transport ? Object.fromEntries(Object.entries(options.transport).map(([k, v]) => [k, v.encode])) : void 0;
            const chunks = chunkSubstr(stringify$1(postData, transport), options.jsonChunkSize ?? 5e5);
            for (const chunk2 of chunks) {
              submitData.append("__superform_json", chunk2);
            }
          }
          if (!submitData.has("__superform_id")) {
            const id = Data.formId;
            if (id !== void 0)
              submitData.set("__superform_id", id);
          }
          if (typeof options.SPA === "string") {
            EnhancedForm_setAction(options.SPA);
          }
        }
      }
      function chunkSubstr(str, size) {
        const numChunks = Math.ceil(str.length / size);
        const chunks = new Array(numChunks);
        for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
          chunks[i] = str.substring(o, o + size);
        }
        return chunks;
      }
      async function validationResponse(event) {
        let cancelled2 = false;
        currentRequest = null;
        let result = "type" in event.result && "status" in event.result ? event.result : {
          type: "error",
          status: Form_resultStatus(parseInt(String(event.result.status)) || 500),
          error: event.result.error instanceof Error ? event.result.error : event.result
        };
        const cancel2 = () => cancelled2 = true;
        const data = {
          result,
          formEl: FormElement,
          formElement: FormElement,
          cancel: cancel2
        };
        const unsubCheckforNav = STORYBOOK_MODE || !Form_isSPA() ? () => {
        } : navigating.subscribe(($nav) => {
          if (!$nav || $nav.from?.route.id === $nav.to?.route.id)
            return;
          cancel2();
        });
        function setErrorResult(error, data2, status) {
          data2.result = {
            type: "error",
            error,
            status: Form_resultStatus(status)
          };
        }
        for (const event2 of formEvents.onResult) {
          try {
            await event2(data);
          } catch (error) {
            setErrorResult(error, data, Math.max(result.status ?? 500, 400));
          }
        }
        result = data.result;
        if (!cancelled2) {
          if ((result.type === "success" || result.type === "failure") && result.data) {
            const forms = Context_findValidationForms(result.data);
            if (!forms.length) {
              throw new SuperFormError("No form data returned from ActionResult. Make sure you return { form } in the form actions.");
            }
            for (const newForm of forms) {
              if (newForm.id !== Data.formId)
                continue;
              const data2 = {
                form: newForm,
                formEl: FormElement,
                formElement: FormElement,
                cancel: () => cancelled2 = true,
                result
              };
              for (const event2 of formEvents.onUpdate) {
                try {
                  await event2(data2);
                } catch (error) {
                  setErrorResult(error, data2, Math.max(result.status ?? 500, 400));
                }
              }
              result = data2.result;
              if (!cancelled2) {
                if (options.customValidity) {
                  setCustomValidityForm(FormElement, data2.form.errors);
                }
                if (Form_shouldReset(data2.form.valid, result.type == "success")) {
                  data2.formElement.querySelectorAll('input[type="file"]').forEach((e) => e.value = "");
                }
              }
            }
          }
          if (!cancelled2) {
            if (result.type !== "error") {
              if (result.type === "success" && options.invalidateAll) {
                await invalidateAll();
              }
              if (options.applyAction) {
                await applyAction();
              } else {
                await Form_updateFromActionResult(result);
              }
            } else {
              await triggerOnError(result, Math.max(result.status ?? 500, 400));
            }
          }
        }
        if (cancelled2 && options.flashMessage) {
          cancelFlash(options);
        }
        if (cancelled2 || result.type != "redirect") {
          htmlForm.completed({ cancelled: cancelled2 });
        } else if (STORYBOOK_MODE) {
          htmlForm.completed({ cancelled: cancelled2, clearAll: true });
        } else {
          const unsub = navigating.subscribe(($nav) => {
            if ($nav)
              return;
            setTimeout(() => {
              try {
                if (unsub)
                  unsub();
              } catch {
              }
            });
            if (htmlForm.isSubmitting()) {
              htmlForm.completed({ cancelled: cancelled2, clearAll: true });
            }
          });
        }
        unsubCheckforNav();
      }
      if (!cancelled && customRequest) {
        _submitCancel();
        const response = await customRequest(submitParams);
        let result;
        if (response instanceof Response) {
          result = deserialize(await response.text());
        } else if (response instanceof XMLHttpRequest) {
          result = deserialize(response.responseText);
        } else {
          result = response;
        }
        if (result.type === "error")
          result.status = response.status;
        validationResponse({ result });
      }
      return validationResponse;
    });
    return {
      destroy: () => {
        for (const [name, events2] of Object.entries(formEvents)) {
          formEvents[name] = events2.filter((e) => e === options[name]);
        }
        enhanced.destroy();
      }
    };
  }
  function removeFiles(formData) {
    const paths = [];
    traversePaths(formData, (data2) => {
      if (data2.value instanceof File) {
        paths.push(data2.path);
        return "skip";
      } else if (Array.isArray(data2.value) && data2.value.length && data2.value.every((d) => d instanceof File)) {
        paths.push(data2.path);
        return "skip";
      }
    });
    if (!paths.length)
      return { data: formData, paths };
    const data = clone$1(formData);
    setPaths(data, paths, (path) => pathExists(initialForm.data, path)?.value);
    return { data, paths };
  }
  return {
    form: Form$1,
    formId: FormId,
    errors: Errors,
    message: Message,
    constraints: Constraints,
    tainted: Tainted_currentState(),
    submitting: readonly(Submitting),
    delayed: readonly(Delayed),
    timeout: readonly(Timeout),
    options,
    capture: Form_capture,
    restore: (snapshot) => {
      rebind({ form: snapshot, untaint: snapshot.tainted ?? true });
    },
    async validate(path, opts = {}) {
      if (!options.validators) {
        throw new SuperFormError("options.validators must be set to use the validate method.");
      }
      if (opts.update === void 0)
        opts.update = true;
      if (opts.taint === void 0)
        opts.taint = false;
      if (typeof opts.errors == "string")
        opts.errors = [opts.errors];
      let data;
      const splittedPath = splitPath(path);
      if ("value" in opts) {
        if (opts.update === true || opts.update === "value") {
          Form$1.update(($form) => {
            setPaths($form, [splittedPath], opts.value);
            return $form;
          }, { taint: opts.taint });
          data = Data.form;
        } else {
          data = clone$1(Data.form);
          setPaths(data, [splittedPath], opts.value);
        }
      } else {
        data = Data.form;
      }
      const result = await Form_validate({ formData: data });
      const error = pathExists(result.errors, splittedPath);
      if (error && error.value && opts.errors) {
        error.value = opts.errors;
      }
      if (opts.update === true || opts.update == "errors") {
        Errors.update(($errors) => {
          setPaths($errors, [splittedPath], error?.value);
          return $errors;
        });
      }
      return error?.value;
    },
    async validateForm(opts = {}) {
      if (!options.validators && !opts.schema) {
        throw new SuperFormError("options.validators or the schema option must be set to use the validateForm method.");
      }
      const result = opts.update ? await Form_clientValidation({ paths: [] }, true, opts.schema) : Form_validate({ adapter: opts.schema });
      const enhancedForm = EnhancedForm_get();
      if (opts.update && enhancedForm) {
        setTimeout(() => {
          if (!enhancedForm)
            return;
          scrollToFirstError(enhancedForm, {
            ...options,
            scrollToError: opts.focusOnError === false ? "off" : options.scrollToError
          });
        }, 1);
      }
      return result || Form_validate({ adapter: opts.schema });
    },
    allErrors: AllErrors,
    posted: Posted,
    reset(options2) {
      return Form_reset({
        message: options2?.keepMessage ? Data.message : void 0,
        data: options2?.data,
        id: options2?.id,
        newState: options2?.newState
      });
    },
    submit(submitter) {
      const form2 = EnhancedForm_get() ? EnhancedForm_get() : submitter && submitter instanceof HTMLElement ? submitter.closest("form") : void 0;
      if (!form2) {
        throw new SuperFormError("use:enhance must be added to the form to use submit, or pass a HTMLElement inside the form (or the form itself) as an argument.");
      }
      if (!form2.requestSubmit) {
        return form2.submit();
      }
      const isSubmitButton = submitter && (submitter instanceof HTMLButtonElement && submitter.type == "submit" || submitter instanceof HTMLInputElement && ["submit", "image"].includes(submitter.type));
      form2.requestSubmit(isSubmitButton ? submitter : void 0);
    },
    isTainted: Tainted_isTainted,
    enhance: superFormEnhance
  };
}
function defaults(data, adapter, options) {
  if (data && "superFormValidationLibrary" in data) {
    options = adapter;
    adapter = data;
    data = null;
  }
  const validator = adapter;
  const optionDefaults = options?.defaults ?? validator.defaults;
  return {
    id: options?.id ?? validator.id ?? "",
    valid: false,
    posted: false,
    errors: {},
    data: { ...optionDefaults, ...data },
    constraints: validator.constraints,
    shape: validator.shape
  };
}
function constraints(schema) {
  return _constraints(schemaInfo(schema, false, []), []);
}
function merge(...constraints2) {
  const filtered = constraints2.filter((c) => !!c);
  if (!filtered.length)
    return void 0;
  if (filtered.length == 1)
    return filtered[0];
  return merge$1(...filtered);
}
function _constraints(info, path) {
  if (!info)
    return void 0;
  let output = void 0;
  if (info.union && info.union.length) {
    const infos = info.union.map((s) => schemaInfo(s, info.isOptional, path));
    const merged = infos.map((i) => _constraints(i, path));
    output = merge(output, ...merged);
    if (output && (info.isNullable || info.isOptional || infos.some((i) => i?.isNullable || i?.isOptional))) {
      delete output.required;
    }
  }
  if (info.array) {
    output = merge(output, ...info.array.map((i) => _constraints(schemaInfo(i, info.isOptional, path), path)));
  }
  if (info.properties) {
    const obj = {};
    for (const [key, prop] of Object.entries(info.properties)) {
      const propInfo = schemaInfo(prop, !info.required?.includes(key) || prop.default !== void 0, [key]);
      const propConstraint = _constraints(propInfo, [...path, key]);
      if (typeof propConstraint === "object" && Object.values(propConstraint).length > 0) {
        obj[key] = propConstraint;
      }
    }
    output = merge(output, obj);
  }
  return output ?? constraint(info);
}
function constraint(info) {
  const output = {};
  const schema = info.schema;
  const type = schema.type;
  const format = schema.format;
  if (type == "integer" && format == "unix-time") {
    const date = schema;
    if (date.minimum !== void 0)
      output.min = new Date(date.minimum).toISOString();
    if (date.maximum !== void 0)
      output.max = new Date(date.maximum).toISOString();
  } else if (type == "string") {
    const str = schema;
    const patterns = [
      str.pattern,
      ...str.allOf ? str.allOf.map((s) => typeof s == "boolean" ? void 0 : s.pattern) : []
    ].filter((s) => s !== void 0);
    if (patterns.length > 0)
      output.pattern = patterns[0];
    if (str.minLength !== void 0)
      output.minlength = str.minLength;
    if (str.maxLength !== void 0)
      output.maxlength = str.maxLength;
  } else if (type == "number" || type == "integer") {
    const num = schema;
    if (num.minimum !== void 0)
      output.min = num.minimum;
    else if (num.exclusiveMinimum !== void 0)
      output.min = num.exclusiveMinimum + (type == "integer" ? 1 : Number.MIN_VALUE);
    if (num.maximum !== void 0)
      output.max = num.maximum;
    else if (num.exclusiveMaximum !== void 0)
      output.max = num.exclusiveMaximum - (type == "integer" ? 1 : Number.MIN_VALUE);
    if (num.multipleOf !== void 0)
      output.step = num.multipleOf;
  } else if (type == "array") {
    const arr = schema;
    if (arr.minItems !== void 0)
      output.min = arr.minItems;
    if (arr.maxItems !== void 0)
      output.max = arr.maxItems;
  }
  if (!info.isNullable && !info.isOptional) {
    output.required = true;
  }
  return Object.keys(output).length > 0 ? output : void 0;
}
function schemaHash(schema) {
  return hashCode(_schemaHash(schemaInfo(schema, false, []), 0, []));
}
function _schemaHash(info, depth, path) {
  if (!info)
    return "";
  function tab() {
    return "  ".repeat(depth);
  }
  function mapSchemas(schemas) {
    return schemas.map((s) => _schemaHash(schemaInfo(s, info?.isOptional ?? false, path), depth + 1, path)).filter((s) => s).join("|");
  }
  function nullish() {
    const output = [];
    if (info?.isNullable)
      output.push("null");
    if (info?.isOptional)
      output.push("undefined");
    return !output.length ? "" : "|" + output.join("|");
  }
  if (info.union) {
    return "Union {\n  " + tab() + mapSchemas(info.union) + "\n" + tab() + "}" + nullish();
  }
  if (info.properties) {
    const output = [];
    for (const [key, prop] of Object.entries(info.properties)) {
      const propInfo = schemaInfo(prop, !info.required?.includes(key) || prop.default !== void 0, [key]);
      output.push(key + ": " + _schemaHash(propInfo, depth + 1, path));
    }
    return "Object {\n  " + tab() + output.join(",\n  ") + "\n" + tab() + "}" + nullish();
  }
  if (info.array) {
    return "Array[" + mapSchemas(info.array) + "]" + nullish();
  }
  return info.types.join("|") + nullish();
}
function hashCode(str) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  if (hash < 0)
    hash = hash >>> 0;
  return hash.toString(36);
}
// @__NO_SIDE_EFFECTS__
function createAdapter(adapter, jsonSchema) {
  if (!adapter || !("superFormValidationLibrary" in adapter)) {
    throw new SuperFormError('Superforms v2 requires a validation adapter for the schema. Import one of your choice from "sveltekit-superforms/adapters" and wrap the schema with it.');
  }
  if (!jsonSchema)
    jsonSchema = adapter.jsonSchema;
  return {
    ...adapter,
    constraints: adapter.constraints ?? constraints(jsonSchema),
    defaults: adapter.defaults ?? defaultValues(jsonSchema),
    shape: schemaShape(jsonSchema),
    id: schemaHash(jsonSchema)
  };
}
let legacyMode = false;
try {
  if (SUPERFORMS_LEGACY)
    legacyMode = true;
} catch {
}
function isPrimitive(value) {
  return typeof value !== "object" && typeof value !== "function" || value === null;
}
function MapTree() {
  this.childBranches = /* @__PURE__ */ new WeakMap();
  this.primitiveKeys = /* @__PURE__ */ new Map();
  this.hasValue = false;
  this.value = void 0;
}
MapTree.prototype.has = function has(key) {
  var keyObject = isPrimitive(key) ? this.primitiveKeys.get(key) : key;
  return keyObject ? this.childBranches.has(keyObject) : false;
};
MapTree.prototype.get = function get2(key) {
  var keyObject = isPrimitive(key) ? this.primitiveKeys.get(key) : key;
  return keyObject ? this.childBranches.get(keyObject) : void 0;
};
MapTree.prototype.resolveBranch = function resolveBranch(key) {
  if (this.has(key)) {
    return this.get(key);
  }
  var newBranch = new MapTree();
  var keyObject = this.createKey(key);
  this.childBranches.set(keyObject, newBranch);
  return newBranch;
};
MapTree.prototype.setValue = function setValue(value) {
  this.hasValue = true;
  return this.value = value;
};
MapTree.prototype.createKey = function createKey(key) {
  if (isPrimitive(key)) {
    var keyObject = {};
    this.primitiveKeys.set(key, keyObject);
    return keyObject;
  }
  return key;
};
MapTree.prototype.clear = function clear() {
  if (arguments.length === 0) {
    this.childBranches = /* @__PURE__ */ new WeakMap();
    this.primitiveKeys.clear();
    this.hasValue = false;
    this.value = void 0;
  } else if (arguments.length === 1) {
    var key = arguments[0];
    if (isPrimitive(key)) {
      var keyObject = this.primitiveKeys.get(key);
      if (keyObject) {
        this.childBranches.delete(keyObject);
        this.primitiveKeys.delete(key);
      }
    } else {
      this.childBranches.delete(key);
    }
  } else {
    var childKey = arguments[0];
    if (this.has(childKey)) {
      var childBranch = this.get(childKey);
      childBranch.clear.apply(childBranch, Array.prototype.slice.call(arguments, 1));
    }
  }
};
var memoize$1 = function memoize(fn) {
  var argsTree = new MapTree();
  function memoized() {
    var args = Array.prototype.slice.call(arguments);
    var argNode = args.reduce(function getBranch(parentBranch, arg) {
      return parentBranch.resolveBranch(arg);
    }, argsTree);
    if (argNode.hasValue) {
      return argNode.value;
    }
    var value = fn.apply(null, args);
    return argNode.setValue(value);
  }
  memoized.clear = argsTree.clear.bind(argsTree);
  return memoized;
};
var memoizeWeak = memoize$1;
const baseMemoize = /* @__PURE__ */ getDefaultExportFromCjs(memoizeWeak);
const memoize2 = baseMemoize;
const ignoreOverride = Symbol("Let zodToJsonSchema decide on which parser to use");
const defaultOptions$1 = {
  name: void 0,
  $refStrategy: "root",
  basePath: ["#"],
  effectStrategy: "input",
  pipeStrategy: "all",
  dateStrategy: "format:date-time",
  mapStrategy: "entries",
  removeAdditionalStrategy: "passthrough",
  allowedAdditionalProperties: true,
  rejectedAdditionalProperties: false,
  definitionPath: "definitions",
  target: "jsonSchema7",
  strictUnions: false,
  definitions: {},
  errorMessages: false,
  markdownDescription: false,
  patternStrategy: "escape",
  applyRegexFlags: false,
  emailStrategy: "format:email",
  base64Strategy: "contentEncoding:base64",
  nameStrategy: "ref"
};
const getDefaultOptions = (options) => typeof options === "string" ? {
  ...defaultOptions$1,
  name: options
} : {
  ...defaultOptions$1,
  ...options
};
const getRefs = (options) => {
  const _options = getDefaultOptions(options);
  const currentPath = _options.name !== void 0 ? [..._options.basePath, _options.definitionPath, _options.name] : _options.basePath;
  return {
    ..._options,
    currentPath,
    propertyPath: void 0,
    seen: new Map(Object.entries(_options.definitions).map(([name, def]) => [
      def._def,
      {
        def: def._def,
        path: [..._options.basePath, _options.definitionPath, name],
        // Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
        jsonSchema: void 0
      }
    ]))
  };
};
function addErrorMessage(res, key, errorMessage, refs) {
  if (!refs?.errorMessages)
    return;
  if (errorMessage) {
    res.errorMessage = {
      ...res.errorMessage,
      [key]: errorMessage
    };
  }
}
function setResponseValueAndErrors(res, key, value, errorMessage, refs) {
  res[key] = value;
  addErrorMessage(res, key, errorMessage, refs);
}
function parseAnyDef() {
  return {};
}
function parseArrayDef(def, refs) {
  const res = {
    type: "array"
  };
  if (def.type?._def && def.type?._def?.typeName !== ZodFirstPartyTypeKind.ZodAny) {
    res.items = parseDef(def.type._def, {
      ...refs,
      currentPath: [...refs.currentPath, "items"]
    });
  }
  if (def.minLength) {
    setResponseValueAndErrors(res, "minItems", def.minLength.value, def.minLength.message, refs);
  }
  if (def.maxLength) {
    setResponseValueAndErrors(res, "maxItems", def.maxLength.value, def.maxLength.message, refs);
  }
  if (def.exactLength) {
    setResponseValueAndErrors(res, "minItems", def.exactLength.value, def.exactLength.message, refs);
    setResponseValueAndErrors(res, "maxItems", def.exactLength.value, def.exactLength.message, refs);
  }
  return res;
}
function parseBigintDef(def, refs) {
  const res = {
    type: "integer",
    format: "int64"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}
function parseBooleanDef() {
  return {
    type: "boolean"
  };
}
function parseBrandedDef(_def, refs) {
  return parseDef(_def.type._def, refs);
}
const parseCatchDef = (def, refs) => {
  return parseDef(def.innerType._def, refs);
};
function parseDateDef(def, refs, overrideDateStrategy) {
  const strategy = overrideDateStrategy ?? refs.dateStrategy;
  if (Array.isArray(strategy)) {
    return {
      anyOf: strategy.map((item, i) => parseDateDef(def, refs, item))
    };
  }
  switch (strategy) {
    case "string":
    case "format:date-time":
      return {
        type: "string",
        format: "date-time"
      };
    case "format:date":
      return {
        type: "string",
        format: "date"
      };
    case "integer":
      return integerDateParser(def, refs);
  }
}
const integerDateParser = (def, refs) => {
  const res = {
    type: "integer",
    format: "unix-time"
  };
  if (refs.target === "openApi3") {
    return res;
  }
  for (const check of def.checks) {
    switch (check.kind) {
      case "min":
        setResponseValueAndErrors(
          res,
          "minimum",
          check.value,
          // This is in milliseconds
          check.message,
          refs
        );
        break;
      case "max":
        setResponseValueAndErrors(
          res,
          "maximum",
          check.value,
          // This is in milliseconds
          check.message,
          refs
        );
        break;
    }
  }
  return res;
};
function parseDefaultDef(_def, refs) {
  return {
    ...parseDef(_def.innerType._def, refs),
    default: _def.defaultValue()
  };
}
function parseEffectsDef(_def, refs) {
  return refs.effectStrategy === "input" ? parseDef(_def.schema._def, refs) : {};
}
function parseEnumDef(def) {
  return {
    type: "string",
    enum: Array.from(def.values)
  };
}
const isJsonSchema7AllOfType = (type) => {
  if ("type" in type && type.type === "string")
    return false;
  return "allOf" in type;
};
function parseIntersectionDef(def, refs) {
  const allOf = [
    parseDef(def.left._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "0"]
    }),
    parseDef(def.right._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "1"]
    })
  ].filter((x) => !!x);
  let unevaluatedProperties = refs.target === "jsonSchema2019-09" ? { unevaluatedProperties: false } : void 0;
  const mergedAllOf = [];
  allOf.forEach((schema) => {
    if (isJsonSchema7AllOfType(schema)) {
      mergedAllOf.push(...schema.allOf);
      if (schema.unevaluatedProperties === void 0) {
        unevaluatedProperties = void 0;
      }
    } else {
      let nestedSchema = schema;
      if ("additionalProperties" in schema && schema.additionalProperties === false) {
        const { additionalProperties, ...rest } = schema;
        nestedSchema = rest;
      } else {
        unevaluatedProperties = void 0;
      }
      mergedAllOf.push(nestedSchema);
    }
  });
  return mergedAllOf.length ? {
    allOf: mergedAllOf,
    ...unevaluatedProperties
  } : void 0;
}
function parseLiteralDef(def, refs) {
  const parsedType = typeof def.value;
  if (parsedType !== "bigint" && parsedType !== "number" && parsedType !== "boolean" && parsedType !== "string") {
    return {
      type: Array.isArray(def.value) ? "array" : "object"
    };
  }
  if (refs.target === "openApi3") {
    return {
      type: parsedType === "bigint" ? "integer" : parsedType,
      enum: [def.value]
    };
  }
  return {
    type: parsedType === "bigint" ? "integer" : parsedType,
    const: def.value
  };
}
let emojiRegex = void 0;
const zodPatterns = {
  /**
   * `c` was changed to `[cC]` to replicate /i flag
   */
  cuid: /^[cC][^\s-]{8,}$/,
  cuid2: /^[0-9a-z]+$/,
  ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
  /**
   * `a-z` was added to replicate /i flag
   */
  email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
  /**
   * Constructed a valid Unicode RegExp
   *
   * Lazily instantiate since this type of regex isn't supported
   * in all envs (e.g. React Native).
   *
   * See:
   * https://github.com/colinhacks/zod/issues/2433
   * Fix in Zod:
   * https://github.com/colinhacks/zod/commit/9340fd51e48576a75adc919bff65dbc4a5d4c99b
   */
  emoji: () => {
    if (emojiRegex === void 0) {
      emojiRegex = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u");
    }
    return emojiRegex;
  },
  /**
   * Unused
   */
  uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  /**
   * Unused
   */
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  /**
   * Unused
   */
  ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  nanoid: /^[a-zA-Z0-9_-]{21}$/,
  jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
};
function parseStringDef(def, refs) {
  const res = {
    type: "string"
  };
  if (def.checks) {
    for (const check of def.checks) {
      switch (check.kind) {
        case "min":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          break;
        case "max":
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "email":
          switch (refs.emailStrategy) {
            case "format:email":
              addFormat(res, "email", check.message, refs);
              break;
            case "format:idn-email":
              addFormat(res, "idn-email", check.message, refs);
              break;
            case "pattern:zod":
              addPattern(res, zodPatterns.email, check.message, refs);
              break;
          }
          break;
        case "url":
          addFormat(res, "uri", check.message, refs);
          break;
        case "uuid":
          addFormat(res, "uuid", check.message, refs);
          break;
        case "regex":
          addPattern(res, check.regex, check.message, refs);
          break;
        case "cuid":
          addPattern(res, zodPatterns.cuid, check.message, refs);
          break;
        case "cuid2":
          addPattern(res, zodPatterns.cuid2, check.message, refs);
          break;
        case "startsWith":
          addPattern(res, RegExp(`^${escapeLiteralCheckValue(check.value, refs)}`), check.message, refs);
          break;
        case "endsWith":
          addPattern(res, RegExp(`${escapeLiteralCheckValue(check.value, refs)}$`), check.message, refs);
          break;
        case "datetime":
          addFormat(res, "date-time", check.message, refs);
          break;
        case "date":
          addFormat(res, "date", check.message, refs);
          break;
        case "time":
          addFormat(res, "time", check.message, refs);
          break;
        case "duration":
          addFormat(res, "duration", check.message, refs);
          break;
        case "length":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "includes": {
          addPattern(res, RegExp(escapeLiteralCheckValue(check.value, refs)), check.message, refs);
          break;
        }
        case "ip": {
          if (check.version !== "v6") {
            addFormat(res, "ipv4", check.message, refs);
          }
          if (check.version !== "v4") {
            addFormat(res, "ipv6", check.message, refs);
          }
          break;
        }
        case "base64url":
          addPattern(res, zodPatterns.base64url, check.message, refs);
          break;
        case "jwt":
          addPattern(res, zodPatterns.jwt, check.message, refs);
          break;
        case "cidr": {
          if (check.version !== "v6") {
            addPattern(res, zodPatterns.ipv4Cidr, check.message, refs);
          }
          if (check.version !== "v4") {
            addPattern(res, zodPatterns.ipv6Cidr, check.message, refs);
          }
          break;
        }
        case "emoji":
          addPattern(res, zodPatterns.emoji(), check.message, refs);
          break;
        case "ulid": {
          addPattern(res, zodPatterns.ulid, check.message, refs);
          break;
        }
        case "base64": {
          switch (refs.base64Strategy) {
            case "format:binary": {
              addFormat(res, "binary", check.message, refs);
              break;
            }
            case "contentEncoding:base64": {
              setResponseValueAndErrors(res, "contentEncoding", "base64", check.message, refs);
              break;
            }
            case "pattern:zod": {
              addPattern(res, zodPatterns.base64, check.message, refs);
              break;
            }
          }
          break;
        }
        case "nanoid": {
          addPattern(res, zodPatterns.nanoid, check.message, refs);
        }
      }
    }
  }
  return res;
}
function escapeLiteralCheckValue(literal, refs) {
  return refs.patternStrategy === "escape" ? escapeNonAlphaNumeric(literal) : literal;
}
const ALPHA_NUMERIC = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function escapeNonAlphaNumeric(source) {
  let result = "";
  for (let i = 0; i < source.length; i++) {
    if (!ALPHA_NUMERIC.has(source[i])) {
      result += "\\";
    }
    result += source[i];
  }
  return result;
}
function addFormat(schema, value, message, refs) {
  if (schema.format || schema.anyOf?.some((x) => x.format)) {
    if (!schema.anyOf) {
      schema.anyOf = [];
    }
    if (schema.format) {
      schema.anyOf.push({
        format: schema.format,
        ...schema.errorMessage && refs.errorMessages && {
          errorMessage: { format: schema.errorMessage.format }
        }
      });
      delete schema.format;
      if (schema.errorMessage) {
        delete schema.errorMessage.format;
        if (Object.keys(schema.errorMessage).length === 0) {
          delete schema.errorMessage;
        }
      }
    }
    schema.anyOf.push({
      format: value,
      ...message && refs.errorMessages && { errorMessage: { format: message } }
    });
  } else {
    setResponseValueAndErrors(schema, "format", value, message, refs);
  }
}
function addPattern(schema, regex, message, refs) {
  if (schema.pattern || schema.allOf?.some((x) => x.pattern)) {
    if (!schema.allOf) {
      schema.allOf = [];
    }
    if (schema.pattern) {
      schema.allOf.push({
        pattern: schema.pattern,
        ...schema.errorMessage && refs.errorMessages && {
          errorMessage: { pattern: schema.errorMessage.pattern }
        }
      });
      delete schema.pattern;
      if (schema.errorMessage) {
        delete schema.errorMessage.pattern;
        if (Object.keys(schema.errorMessage).length === 0) {
          delete schema.errorMessage;
        }
      }
    }
    schema.allOf.push({
      pattern: stringifyRegExpWithFlags(regex, refs),
      ...message && refs.errorMessages && { errorMessage: { pattern: message } }
    });
  } else {
    setResponseValueAndErrors(schema, "pattern", stringifyRegExpWithFlags(regex, refs), message, refs);
  }
}
function stringifyRegExpWithFlags(regex, refs) {
  if (!refs.applyRegexFlags || !regex.flags) {
    return regex.source;
  }
  const flags = {
    i: regex.flags.includes("i"),
    m: regex.flags.includes("m"),
    s: regex.flags.includes("s")
    // `.` matches newlines
  };
  const source = flags.i ? regex.source.toLowerCase() : regex.source;
  let pattern = "";
  let isEscaped = false;
  let inCharGroup = false;
  let inCharRange = false;
  for (let i = 0; i < source.length; i++) {
    if (isEscaped) {
      pattern += source[i];
      isEscaped = false;
      continue;
    }
    if (flags.i) {
      if (inCharGroup) {
        if (source[i].match(/[a-z]/)) {
          if (inCharRange) {
            pattern += source[i];
            pattern += `${source[i - 2]}-${source[i]}`.toUpperCase();
            inCharRange = false;
          } else if (source[i + 1] === "-" && source[i + 2]?.match(/[a-z]/)) {
            pattern += source[i];
            inCharRange = true;
          } else {
            pattern += `${source[i]}${source[i].toUpperCase()}`;
          }
          continue;
        }
      } else if (source[i].match(/[a-z]/)) {
        pattern += `[${source[i]}${source[i].toUpperCase()}]`;
        continue;
      }
    }
    if (flags.m) {
      if (source[i] === "^") {
        pattern += `(^|(?<=[\r
]))`;
        continue;
      } else if (source[i] === "$") {
        pattern += `($|(?=[\r
]))`;
        continue;
      }
    }
    if (flags.s && source[i] === ".") {
      pattern += inCharGroup ? `${source[i]}\r
` : `[${source[i]}\r
]`;
      continue;
    }
    pattern += source[i];
    if (source[i] === "\\") {
      isEscaped = true;
    } else if (inCharGroup && source[i] === "]") {
      inCharGroup = false;
    } else if (!inCharGroup && source[i] === "[") {
      inCharGroup = true;
    }
  }
  try {
    new RegExp(pattern);
  } catch {
    console.warn(`Could not convert regex pattern at ${refs.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`);
    return regex.source;
  }
  return pattern;
}
function parseRecordDef(def, refs) {
  if (refs.target === "openAi") {
    console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead.");
  }
  if (refs.target === "openApi3" && def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum) {
    return {
      type: "object",
      required: def.keyType._def.values,
      properties: def.keyType._def.values.reduce((acc, key) => ({
        ...acc,
        [key]: parseDef(def.valueType._def, {
          ...refs,
          currentPath: [...refs.currentPath, "properties", key]
        }) ?? {}
      }), {}),
      additionalProperties: refs.rejectedAdditionalProperties
    };
  }
  const schema = {
    type: "object",
    additionalProperties: parseDef(def.valueType._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    }) ?? refs.allowedAdditionalProperties
  };
  if (refs.target === "openApi3") {
    return schema;
  }
  if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodString && def.keyType._def.checks?.length) {
    const { type, ...keyType } = parseStringDef(def.keyType._def, refs);
    return {
      ...schema,
      propertyNames: keyType
    };
  } else if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum) {
    return {
      ...schema,
      propertyNames: {
        enum: def.keyType._def.values
      }
    };
  } else if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodBranded && def.keyType._def.type._def.typeName === ZodFirstPartyTypeKind.ZodString && def.keyType._def.type._def.checks?.length) {
    const { type, ...keyType } = parseBrandedDef(def.keyType._def, refs);
    return {
      ...schema,
      propertyNames: keyType
    };
  }
  return schema;
}
function parseMapDef(def, refs) {
  if (refs.mapStrategy === "record") {
    return parseRecordDef(def, refs);
  }
  const keys = parseDef(def.keyType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "0"]
  }) || {};
  const values = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "1"]
  }) || {};
  return {
    type: "array",
    maxItems: 125,
    items: {
      type: "array",
      items: [keys, values],
      minItems: 2,
      maxItems: 2
    }
  };
}
function parseNativeEnumDef(def) {
  const object = def.values;
  const actualKeys = Object.keys(def.values).filter((key) => {
    return typeof object[object[key]] !== "number";
  });
  const actualValues = actualKeys.map((key) => object[key]);
  const parsedTypes = Array.from(new Set(actualValues.map((values) => typeof values)));
  return {
    type: parsedTypes.length === 1 ? parsedTypes[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: actualValues
  };
}
function parseNeverDef() {
  return {
    not: {}
  };
}
function parseNullDef(refs) {
  return refs.target === "openApi3" ? {
    enum: ["null"],
    nullable: true
  } : {
    type: "null"
  };
}
const primitiveMappings = {
  ZodString: "string",
  ZodNumber: "number",
  ZodBigInt: "integer",
  ZodBoolean: "boolean",
  ZodNull: "null"
};
function parseUnionDef(def, refs) {
  if (refs.target === "openApi3")
    return asAnyOf(def, refs);
  const options = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
  if (options.every((x) => x._def.typeName in primitiveMappings && (!x._def.checks || !x._def.checks.length))) {
    const types = options.reduce((types2, x) => {
      const type = primitiveMappings[x._def.typeName];
      return type && !types2.includes(type) ? [...types2, type] : types2;
    }, []);
    return {
      type: types.length > 1 ? types : types[0]
    };
  } else if (options.every((x) => x._def.typeName === "ZodLiteral" && !x.description)) {
    const types = options.reduce((acc, x) => {
      const type = typeof x._def.value;
      switch (type) {
        case "string":
        case "number":
        case "boolean":
          return [...acc, type];
        case "bigint":
          return [...acc, "integer"];
        case "object":
          if (x._def.value === null)
            return [...acc, "null"];
        case "symbol":
        case "undefined":
        case "function":
        default:
          return acc;
      }
    }, []);
    if (types.length === options.length) {
      const uniqueTypes = types.filter((x, i, a) => a.indexOf(x) === i);
      return {
        type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
        enum: options.reduce((acc, x) => {
          return acc.includes(x._def.value) ? acc : [...acc, x._def.value];
        }, [])
      };
    }
  } else if (options.every((x) => x._def.typeName === "ZodEnum")) {
    return {
      type: "string",
      enum: options.reduce((acc, x) => [
        ...acc,
        ...x._def.values.filter((x2) => !acc.includes(x2))
      ], [])
    };
  }
  return asAnyOf(def, refs);
}
const asAnyOf = (def, refs) => {
  const anyOf = (def.options instanceof Map ? Array.from(def.options.values()) : def.options).map((x, i) => parseDef(x._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", `${i}`]
  })).filter((x) => !!x && (!refs.strictUnions || typeof x === "object" && Object.keys(x).length > 0));
  return anyOf.length ? { anyOf } : void 0;
};
function parseNullableDef(def, refs) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(def.innerType._def.typeName) && (!def.innerType._def.checks || !def.innerType._def.checks.length)) {
    if (refs.target === "openApi3") {
      return {
        type: primitiveMappings[def.innerType._def.typeName],
        nullable: true
      };
    }
    return {
      type: [
        primitiveMappings[def.innerType._def.typeName],
        "null"
      ]
    };
  }
  if (refs.target === "openApi3") {
    const base2 = parseDef(def.innerType._def, {
      ...refs,
      currentPath: [...refs.currentPath]
    });
    if (base2 && "$ref" in base2)
      return { allOf: [base2], nullable: true };
    return base2 && { ...base2, nullable: true };
  }
  const base = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "0"]
  });
  return base && { anyOf: [base, { type: "null" }] };
}
function parseNumberDef(def, refs) {
  const res = {
    type: "number"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "int":
        res.type = "integer";
        addErrorMessage(res, "type", check.message, refs);
        break;
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}
function parseObjectDef(def, refs) {
  const forceOptionalIntoNullable = refs.target === "openAi";
  const result = {
    type: "object",
    properties: {}
  };
  const required = [];
  const shape = def.shape();
  for (const propName in shape) {
    let propDef = shape[propName];
    if (propDef === void 0 || propDef._def === void 0) {
      continue;
    }
    let propOptional = safeIsOptional(propDef);
    if (propOptional && forceOptionalIntoNullable) {
      if (propDef instanceof ZodOptional) {
        propDef = propDef._def.innerType;
      }
      if (!propDef.isNullable()) {
        propDef = propDef.nullable();
      }
      propOptional = false;
    }
    const parsedDef = parseDef(propDef._def, {
      ...refs,
      currentPath: [...refs.currentPath, "properties", propName],
      propertyPath: [...refs.currentPath, "properties", propName]
    });
    if (parsedDef === void 0) {
      continue;
    }
    result.properties[propName] = parsedDef;
    if (!propOptional) {
      required.push(propName);
    }
  }
  if (required.length) {
    result.required = required;
  }
  const additionalProperties = decideAdditionalProperties(def, refs);
  if (additionalProperties !== void 0) {
    result.additionalProperties = additionalProperties;
  }
  return result;
}
function decideAdditionalProperties(def, refs) {
  if (def.catchall._def.typeName !== "ZodNever") {
    return parseDef(def.catchall._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    });
  }
  switch (def.unknownKeys) {
    case "passthrough":
      return refs.allowedAdditionalProperties;
    case "strict":
      return refs.rejectedAdditionalProperties;
    case "strip":
      return refs.removeAdditionalStrategy === "strict" ? refs.allowedAdditionalProperties : refs.rejectedAdditionalProperties;
  }
}
function safeIsOptional(schema) {
  try {
    return schema.isOptional();
  } catch {
    return true;
  }
}
const parseOptionalDef = (def, refs) => {
  if (refs.currentPath.toString() === refs.propertyPath?.toString()) {
    return parseDef(def.innerType._def, refs);
  }
  const innerSchema = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "1"]
  });
  return innerSchema ? {
    anyOf: [
      {
        not: {}
      },
      innerSchema
    ]
  } : {};
};
const parsePipelineDef = (def, refs) => {
  if (refs.pipeStrategy === "input") {
    return parseDef(def.in._def, refs);
  } else if (refs.pipeStrategy === "output") {
    return parseDef(def.out._def, refs);
  }
  const a = parseDef(def.in._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", "0"]
  });
  const b = parseDef(def.out._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", a ? "1" : "0"]
  });
  return {
    allOf: [a, b].filter((x) => x !== void 0)
  };
};
function parsePromiseDef(def, refs) {
  return parseDef(def.type._def, refs);
}
function parseSetDef(def, refs) {
  const items = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items"]
  });
  const schema = {
    type: "array",
    uniqueItems: true,
    items
  };
  if (def.minSize) {
    setResponseValueAndErrors(schema, "minItems", def.minSize.value, def.minSize.message, refs);
  }
  if (def.maxSize) {
    setResponseValueAndErrors(schema, "maxItems", def.maxSize.value, def.maxSize.message, refs);
  }
  return schema;
}
function parseTupleDef(def, refs) {
  if (def.rest) {
    return {
      type: "array",
      minItems: def.items.length,
      items: def.items.map((x, i) => parseDef(x._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i}`]
      })).reduce((acc, x) => x === void 0 ? acc : [...acc, x], []),
      additionalItems: parseDef(def.rest._def, {
        ...refs,
        currentPath: [...refs.currentPath, "additionalItems"]
      })
    };
  } else {
    return {
      type: "array",
      minItems: def.items.length,
      maxItems: def.items.length,
      items: def.items.map((x, i) => parseDef(x._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i}`]
      })).reduce((acc, x) => x === void 0 ? acc : [...acc, x], [])
    };
  }
}
function parseUndefinedDef() {
  return {
    not: {}
  };
}
function parseUnknownDef() {
  return {};
}
const parseReadonlyDef = (def, refs) => {
  return parseDef(def.innerType._def, refs);
};
const selectParser = (def, typeName, refs) => {
  switch (typeName) {
    case ZodFirstPartyTypeKind.ZodString:
      return parseStringDef(def, refs);
    case ZodFirstPartyTypeKind.ZodNumber:
      return parseNumberDef(def, refs);
    case ZodFirstPartyTypeKind.ZodObject:
      return parseObjectDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBigInt:
      return parseBigintDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBoolean:
      return parseBooleanDef();
    case ZodFirstPartyTypeKind.ZodDate:
      return parseDateDef(def, refs);
    case ZodFirstPartyTypeKind.ZodUndefined:
      return parseUndefinedDef();
    case ZodFirstPartyTypeKind.ZodNull:
      return parseNullDef(refs);
    case ZodFirstPartyTypeKind.ZodArray:
      return parseArrayDef(def, refs);
    case ZodFirstPartyTypeKind.ZodUnion:
    case ZodFirstPartyTypeKind.ZodDiscriminatedUnion:
      return parseUnionDef(def, refs);
    case ZodFirstPartyTypeKind.ZodIntersection:
      return parseIntersectionDef(def, refs);
    case ZodFirstPartyTypeKind.ZodTuple:
      return parseTupleDef(def, refs);
    case ZodFirstPartyTypeKind.ZodRecord:
      return parseRecordDef(def, refs);
    case ZodFirstPartyTypeKind.ZodLiteral:
      return parseLiteralDef(def, refs);
    case ZodFirstPartyTypeKind.ZodEnum:
      return parseEnumDef(def);
    case ZodFirstPartyTypeKind.ZodNativeEnum:
      return parseNativeEnumDef(def);
    case ZodFirstPartyTypeKind.ZodNullable:
      return parseNullableDef(def, refs);
    case ZodFirstPartyTypeKind.ZodOptional:
      return parseOptionalDef(def, refs);
    case ZodFirstPartyTypeKind.ZodMap:
      return parseMapDef(def, refs);
    case ZodFirstPartyTypeKind.ZodSet:
      return parseSetDef(def, refs);
    case ZodFirstPartyTypeKind.ZodLazy:
      return () => def.getter()._def;
    case ZodFirstPartyTypeKind.ZodPromise:
      return parsePromiseDef(def, refs);
    case ZodFirstPartyTypeKind.ZodNaN:
    case ZodFirstPartyTypeKind.ZodNever:
      return parseNeverDef();
    case ZodFirstPartyTypeKind.ZodEffects:
      return parseEffectsDef(def, refs);
    case ZodFirstPartyTypeKind.ZodAny:
      return parseAnyDef();
    case ZodFirstPartyTypeKind.ZodUnknown:
      return parseUnknownDef();
    case ZodFirstPartyTypeKind.ZodDefault:
      return parseDefaultDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBranded:
      return parseBrandedDef(def, refs);
    case ZodFirstPartyTypeKind.ZodReadonly:
      return parseReadonlyDef(def, refs);
    case ZodFirstPartyTypeKind.ZodCatch:
      return parseCatchDef(def, refs);
    case ZodFirstPartyTypeKind.ZodPipeline:
      return parsePipelineDef(def, refs);
    case ZodFirstPartyTypeKind.ZodFunction:
    case ZodFirstPartyTypeKind.ZodVoid:
    case ZodFirstPartyTypeKind.ZodSymbol:
      return void 0;
    default:
      return /* @__PURE__ */ ((_) => void 0)();
  }
};
function parseDef(def, refs, forceResolution = false) {
  const seenItem = refs.seen.get(def);
  if (refs.override) {
    const overrideResult = refs.override?.(def, refs, seenItem, forceResolution);
    if (overrideResult !== ignoreOverride) {
      return overrideResult;
    }
  }
  if (seenItem && !forceResolution) {
    const seenSchema = get$ref(seenItem, refs);
    if (seenSchema !== void 0) {
      return seenSchema;
    }
  }
  const newItem = { def, path: refs.currentPath, jsonSchema: void 0 };
  refs.seen.set(def, newItem);
  const jsonSchemaOrGetter = selectParser(def, def.typeName, refs);
  const jsonSchema = typeof jsonSchemaOrGetter === "function" ? parseDef(jsonSchemaOrGetter(), refs) : jsonSchemaOrGetter;
  if (jsonSchema) {
    addMeta(def, refs, jsonSchema);
  }
  if (refs.postProcess) {
    const postProcessResult = refs.postProcess(jsonSchema, def, refs);
    newItem.jsonSchema = jsonSchema;
    return postProcessResult;
  }
  newItem.jsonSchema = jsonSchema;
  return jsonSchema;
}
const get$ref = (item, refs) => {
  switch (refs.$refStrategy) {
    case "root":
      return { $ref: item.path.join("/") };
    case "relative":
      return { $ref: getRelativePath(refs.currentPath, item.path) };
    case "none":
    case "seen": {
      if (item.path.length < refs.currentPath.length && item.path.every((value, index) => refs.currentPath[index] === value)) {
        console.warn(`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`);
        return {};
      }
      return refs.$refStrategy === "seen" ? {} : void 0;
    }
  }
};
const getRelativePath = (pathA, pathB) => {
  let i = 0;
  for (; i < pathA.length && i < pathB.length; i++) {
    if (pathA[i] !== pathB[i])
      break;
  }
  return [(pathA.length - i).toString(), ...pathB.slice(i)].join("/");
};
const addMeta = (def, refs, jsonSchema) => {
  if (def.description) {
    jsonSchema.description = def.description;
    if (refs.markdownDescription) {
      jsonSchema.markdownDescription = def.description;
    }
  }
  return jsonSchema;
};
const zodToJsonSchema = (schema, options) => {
  const refs = getRefs(options);
  const definitions = typeof options === "object" && options.definitions ? Object.entries(options.definitions).reduce((acc, [name2, schema2]) => ({
    ...acc,
    [name2]: parseDef(schema2._def, {
      ...refs,
      currentPath: [...refs.basePath, refs.definitionPath, name2]
    }, true) ?? {}
  }), {}) : void 0;
  const name = typeof options === "string" ? options : options?.nameStrategy === "title" ? void 0 : options?.name;
  const main = parseDef(schema._def, name === void 0 ? refs : {
    ...refs,
    currentPath: [...refs.basePath, refs.definitionPath, name]
  }, false) ?? {};
  const title = typeof options === "object" && options.name !== void 0 && options.nameStrategy === "title" ? options.name : void 0;
  if (title !== void 0) {
    main.title = title;
  }
  const combined = name === void 0 ? definitions ? {
    ...main,
    [refs.definitionPath]: definitions
  } : main : {
    $ref: [
      ...refs.$refStrategy === "relative" ? [] : refs.basePath,
      refs.definitionPath,
      name
    ].join("/"),
    [refs.definitionPath]: {
      ...definitions,
      [name]: main
    }
  };
  if (refs.target === "jsonSchema7") {
    combined.$schema = "http://json-schema.org/draft-07/schema#";
  } else if (refs.target === "jsonSchema2019-09" || refs.target === "openAi") {
    combined.$schema = "https://json-schema.org/draft/2019-09/schema#";
  }
  if (refs.target === "openAi" && ("anyOf" in combined || "oneOf" in combined || "allOf" in combined || "type" in combined && Array.isArray(combined.type))) {
    console.warn("Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property.");
  }
  return combined;
};
const defaultOptions = {
  dateStrategy: "integer",
  pipeStrategy: "output",
  $refStrategy: "none"
};
const zodToJSONSchema = /* @__NO_SIDE_EFFECTS__ */ (...params) => {
  params[1] = typeof params[1] == "object" ? { ...defaultOptions, ...params[1] } : defaultOptions;
  return zodToJsonSchema(...params);
};
async function validate(schema, data, errorMap) {
  const result = await schema.safeParseAsync(data, { errorMap });
  if (result.success) {
    return {
      data: result.data,
      success: true
    };
  }
  return {
    issues: result.error.issues.map(({ message, path }) => ({ message, path })),
    success: false
  };
}
function _zod(schema, options) {
  return /* @__PURE__ */ createAdapter({
    superFormValidationLibrary: "zod",
    validate: async (data) => {
      return validate(schema, data, options?.errorMap);
    },
    jsonSchema: options?.jsonSchema ?? /* @__PURE__ */ zodToJSONSchema(schema, options?.config),
    defaults: options?.defaults
  });
}
const zod = /* @__PURE__ */ memoize2(_zod);
function createCommandHandler(asyncFn, options) {
  let isLoading = false;
  let isError = false;
  let isSuccess = false;
  let result = null;
  let errors = null;
  function execute(...params) {
    reset();
    isLoading = true;
    asyncFn(...params).then((executionResult) => {
      isSuccess = true;
      result = executionResult;
      if (options?.onSuccess) {
        options.onSuccess(result);
      }
    }).catch((error) => {
      isError = true;
      errors = convertErrors(error);
      handleErrors(errors);
      if (options?.onError) {
        options.onError(errors);
      }
    }).finally(() => {
      isLoading = false;
    });
  }
  function reset() {
    isLoading = false;
    isError = false;
    isSuccess = false;
    result = null;
    errors = null;
  }
  return {
    get isLoading() {
      return isLoading;
    },
    get isSuccess() {
      return isSuccess;
    },
    get isError() {
      return isError;
    },
    get result() {
      return result;
    },
    get errors() {
      return errors;
    },
    get fieldErrors() {
      return errors?.fieldErrors;
    },
    get nonFieldErrors() {
      return errors?.nonFieldErrors;
    },
    get nonFormErrors() {
      return errors?.nonFormErrors;
    },
    execute,
    reset
  };
}
const convertErrors = (error) => {
  if (isAxiosError(error)) {
    const data = error?.response?.data;
    if (data && "details" in data && data.details) {
      return data.details;
    }
  }
  if (error instanceof AppError) {
    return error.details;
  }
  return { nonFormErrors: [error.message] };
};
function DeleteForm($$payload) {
  $$payload.out += `<!---->Delete selections`;
}
function EnvironmentCreateForm($$payload) {
  $$payload.out += `<!---->Add new environment`;
}
function ExpireForm($$payload) {
}
function LayoutConfigForm($$payload, $$props) {
  push();
  const workspaceContext = getWorkspaceContext();
  const layoutCanvas = workspaceContext.layoutCanvasContext;
  const buttonsPositionOptions = [
    { value: "tl", label: "Top Left" },
    { value: "tr", label: "Top Right" },
    { value: "bl", label: "Bottom Left" },
    { value: "br", label: "Bottom Right" }
  ];
  const currentButtonsPositionLabel = buttonsPositionOptions.find((option) => option.value === layoutCanvas.transform.config.buttonsPosition)?.label ?? "Select a corner";
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<div class="mx-4 mt-6 flex flex-col gap-4"><div class="flex flex-col gap-2"><div class="flex items-center justify-between"><span class="text-neutral-11">Controls Position</span> `;
    FormInfoPopover($$payload2, {
      description: "Controls the corner of the layout that the control buttons are positioned."
    });
    $$payload2.out += `<!----></div> <!---->`;
    Root$1($$payload2, {
      type: "single",
      get value() {
        return layoutCanvas.transform.config.buttonsPosition;
      },
      set value($$value) {
        layoutCanvas.transform.config.buttonsPosition = $$value;
        $$settled = false;
      },
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        Select_trigger($$payload3, {
          children: ($$payload4) => {
            $$payload4.out += `<!---->${escape_html(currentButtonsPositionLabel)}`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> <!---->`;
        Select_content($$payload3, {
          children: ($$payload4) => {
            const each_array = ensure_array_like(buttonsPositionOptions);
            $$payload4.out += `<!--[-->`;
            for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
              let option = each_array[$$index];
              $$payload4.out += `<!---->`;
              Select_item($$payload4, {
                value: option.value,
                children: ($$payload5) => {
                  $$payload5.out += `<!---->${escape_html(option.label)}`;
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
    $$payload2.out += `<!----></div></div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
function PlantingAreaCreateForm($$payload, $$props) {
  push();
  var $$store_subs;
  const settings = getSettingsContext();
  const workspaceContext = getWorkspaceContext();
  const form = workspaceContext.plantingAreaCreateForm.form;
  const handler = workspaceContext.plantingAreaCreateForm.handler;
  const { form: formData, enhance: enhance2 } = form;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<form method="POST" autocomplete="off" class="mx-4 mb-8 mt-4"><!---->`;
    Form_field($$payload2, {
      form,
      name: "name",
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        {
          let children = function($$payload4, { props }) {
            $$payload4.out += `<!---->`;
            Form_label($$payload4, {
              description: workspaceFields.plantingAreaNameSchema.description,
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
                placeholder: "Big Bed",
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
        Form_field_errors($$payload3, { handlerErrors: handler.fieldErrors?.name });
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
              description: workspaceFields.plantingAreaDescriptionSchema.description,
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
          handlerErrors: handler.fieldErrors?.description
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <!---->`;
    Form_field($$payload2, {
      form,
      name: "location",
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        {
          let children = function($$payload4, { props }) {
            $$payload4.out += `<!---->`;
            Form_label($$payload4, {
              description: workspaceFields.coordinateSchema.description,
              optional: false,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Position`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            CoordinateInput($$payload4, spread_props([
              props,
              {
                initialUnitSystem: settings.units["distance"],
                get x() {
                  return store_get($$store_subs ??= {}, "$formData", formData).location.coordinate.x;
                },
                set x($$value) {
                  store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).location.coordinate.x = $$value);
                  $$settled = false;
                },
                get y() {
                  return store_get($$store_subs ??= {}, "$formData", formData).location.coordinate.y;
                },
                set y($$value) {
                  store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).location.coordinate.y = $$value);
                  $$settled = false;
                }
              }
            ]));
            $$payload4.out += `<!---->`;
          };
          Control($$payload3, { children });
        }
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <fieldset><div class="my-2 flex items-center"><span class="text-neutral-11 mr-2">Geometry</span> <span class="w-full"><!---->`;
    Separator($$payload2, { class: "w-full" });
    $$payload2.out += `<!----></span></div> <!---->`;
    Form_field($$payload2, {
      form,
      name: "geometry.type",
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        {
          let children = function($$payload4, { props }) {
            $$payload4.out += `<!---->`;
            Form_label($$payload4, {
              description: workspaceFields.geometryTypeSchema.description,
              optional: false,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Type`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            GeometrySelect($$payload4, spread_props([
              props,
              {
                get value() {
                  return store_get($$store_subs ??= {}, "$formData", formData).geometry.type;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).geometry.type = $$value);
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
          handlerErrors: handler.fieldErrors?.["geometry.type"]
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> <!---->`;
    Form_field($$payload2, {
      form,
      name: "geometry.rotation",
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        {
          let children = function($$payload4, { props }) {
            $$payload4.out += `<!---->`;
            Form_label($$payload4, {
              description: workspaceFields.geometryRotationSchema.description,
              optional: true,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Rotation`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <!---->`;
            Input($$payload4, spread_props([
              props,
              {
                type: "number",
                get value() {
                  return store_get($$store_subs ??= {}, "$formData", formData).geometry.rotation;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).geometry.rotation = $$value);
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
          handlerErrors: handler.fieldErrors?.["geometry.rotation"]
        });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----> `;
    if (store_get($$store_subs ??= {}, "$formData", formData).geometry.type === "RECTANGLE") {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<!---->`;
      Form_field($$payload2, {
        form,
        name: "geometry.rectangleLength",
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          {
            let children = function($$payload4, { props }) {
              $$payload4.out += `<!---->`;
              Form_label($$payload4, {
                description: workspaceFields.geometryRectangleLengthSchema.description,
                optional: false,
                children: ($$payload5) => {
                  $$payload5.out += `<!---->Length`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              UnitAwareInput($$payload4, spread_props([
                props,
                {
                  min: 0,
                  quantityType: "distance",
                  initialUnitSystem: settings.units["distance"],
                  get value() {
                    return store_get($$store_subs ??= {}, "$formData", formData).geometry.rectangleLength;
                  },
                  set value($$value) {
                    store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).geometry.rectangleLength = $$value);
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
            handlerErrors: handler.fieldErrors?.["geometry.rectangleLength"]
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Form_field($$payload2, {
        form,
        name: "geometry.rectangleWidth",
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          {
            let children = function($$payload4, { props }) {
              $$payload4.out += `<!---->`;
              Form_label($$payload4, {
                description: workspaceFields.geometryRectangleWidthSchema.description,
                optional: false,
                children: ($$payload5) => {
                  $$payload5.out += `<!---->Width`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              UnitAwareInput($$payload4, spread_props([
                props,
                {
                  min: 0,
                  quantityType: "distance",
                  initialUnitSystem: settings.units["distance"],
                  get value() {
                    return store_get($$store_subs ??= {}, "$formData", formData).geometry.rectangleWidth;
                  },
                  set value($$value) {
                    store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).geometry.rectangleWidth = $$value);
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
            handlerErrors: handler.fieldErrors?.["geometry.rectangleWidth"]
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    } else if (store_get($$store_subs ??= {}, "$formData", formData).geometry.type === "POLYGON") {
      $$payload2.out += "<!--[1-->";
      $$payload2.out += `<!---->`;
      Form_field($$payload2, {
        form,
        name: "geometry.polygonNumSides",
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          {
            let children = function($$payload4, { props }) {
              $$payload4.out += `<!---->`;
              Form_label($$payload4, {
                description: workspaceFields.geometryPolygonNumSidesSchema.description,
                optional: false,
                children: ($$payload5) => {
                  $$payload5.out += `<!---->Side Count`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> <!---->`;
              Input($$payload4, spread_props([
                props,
                {
                  type: "number",
                  min: 3,
                  get value() {
                    return store_get($$store_subs ??= {}, "$formData", formData).geometry.polygonNumSides;
                  },
                  set value($$value) {
                    store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).geometry.polygonNumSides = $$value);
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
            handlerErrors: handler.fieldErrors?.["geometry.polygonNumSides"]
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Form_field($$payload2, {
        form,
        name: "geometry.polygonRadius",
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          {
            let children = function($$payload4, { props }) {
              $$payload4.out += `<!---->`;
              Form_label($$payload4, {
                description: workspaceFields.geometryPolygonRadiusSchema.description,
                optional: false,
                children: ($$payload5) => {
                  $$payload5.out += `<!---->Radius`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              UnitAwareInput($$payload4, spread_props([
                props,
                {
                  min: 0,
                  quantityType: "distance",
                  initialUnitSystem: settings.units["distance"],
                  get value() {
                    return store_get($$store_subs ??= {}, "$formData", formData).geometry.polygonRadius;
                  },
                  set value($$value) {
                    store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).geometry.polygonRadius = $$value);
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
            handlerErrors: handler.fieldErrors?.["geometry.polygonRadius"]
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    } else if (store_get($$store_subs ??= {}, "$formData", formData).geometry.type === "ELLIPSE") {
      $$payload2.out += "<!--[2-->";
      $$payload2.out += `<!---->`;
      Form_field($$payload2, {
        form,
        name: "geometry.ellipseLength",
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          {
            let children = function($$payload4, { props }) {
              $$payload4.out += `<!---->`;
              Form_label($$payload4, {
                description: workspaceFields.geometryEllipseLengthSchema.description,
                optional: false,
                children: ($$payload5) => {
                  $$payload5.out += `<!---->Length Diameter`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              UnitAwareInput($$payload4, spread_props([
                props,
                {
                  min: 0,
                  quantityType: "distance",
                  initialUnitSystem: settings.units["distance"],
                  get value() {
                    return store_get($$store_subs ??= {}, "$formData", formData).geometry.ellipseLength;
                  },
                  set value($$value) {
                    store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).geometry.ellipseLength = $$value);
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
            handlerErrors: handler.fieldErrors?.["geometry.ellipseLength"]
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Form_field($$payload2, {
        form,
        name: "geometry.ellipseWidth",
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          {
            let children = function($$payload4, { props }) {
              $$payload4.out += `<!---->`;
              Form_label($$payload4, {
                description: workspaceFields.geometryEllipseWidthSchema.description,
                optional: false,
                children: ($$payload5) => {
                  $$payload5.out += `<!---->Width Diameter`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              UnitAwareInput($$payload4, spread_props([
                props,
                {
                  min: 0,
                  quantityType: "distance",
                  initialUnitSystem: settings.units["distance"],
                  get value() {
                    return store_get($$store_subs ??= {}, "$formData", formData).geometry.ellipseWidth;
                  },
                  set value($$value) {
                    store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).geometry.ellipseWidth = $$value);
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
            handlerErrors: handler.fieldErrors?.["geometry.ellipseWidth"]
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    } else if (store_get($$store_subs ??= {}, "$formData", formData).geometry.type === "LINES") {
      $$payload2.out += "<!--[3-->";
      const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$formData", formData).geometry.linesCoordinates);
      $$payload2.out += `<!--[-->`;
      for (let index = 0, $$length = each_array.length; index < $$length; index++) {
        each_array[index];
        $$payload2.out += `<!---->`;
        Form_field($$payload2, {
          form,
          name: `geometry.linesCoordinates[${index}]`,
          children: ($$payload3) => {
            $$payload3.out += `<!---->`;
            {
              let children = function($$payload4, { props }) {
                $$payload4.out += `<!---->`;
                Form_label($$payload4, {
                  description: workspaceFields.coordinateSchema.description,
                  optional: false,
                  children: ($$payload5) => {
                    $$payload5.out += `<!---->Coordinate ${escape_html(index)}`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!----> `;
                CoordinateInput($$payload4, spread_props([
                  props,
                  {
                    initialUnitSystem: settings.units["distance"],
                    get x() {
                      return store_get($$store_subs ??= {}, "$formData", formData).geometry.linesCoordinates[index].x;
                    },
                    set x($$value) {
                      store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).geometry.linesCoordinates[index].x = $$value);
                      $$settled = false;
                    },
                    get y() {
                      return store_get($$store_subs ??= {}, "$formData", formData).geometry.linesCoordinates[index].y;
                    },
                    set y($$value) {
                      store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).geometry.linesCoordinates[index].y = $$value);
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
              handlerErrors: handler.fieldErrors?.[`geometry.linesCoordinates[${index}]`]
            });
            $$payload3.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload2.out += `<!---->`;
      }
      $$payload2.out += `<!--]--> <!---->`;
      Button$1($$payload2, {
        onclick: () => {
          store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).geometry.linesCoordinates = [
            ...store_get($$store_subs ??= {}, "$formData", formData).geometry.linesCoordinates,
            { x: 0, y: 0 }
          ]);
        },
        variant: "outline",
        class: "mb-4 flex w-full items-center justify-between",
        children: ($$payload3) => {
          $$payload3.out += `<span>Add Point</span> `;
          Icon($$payload3, { icon: iconIds.addIcon, width: "1.5rem" });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--></fieldset> <fieldset><div class="my-2 flex items-center"><span class="text-neutral-11 mr-2">Other</span> <span class="w-full"><!---->`;
    Separator($$payload2, { class: "w-full" });
    $$payload2.out += `<!----></span></div> <!---->`;
    Form_field($$payload2, {
      form,
      name: `depth`,
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        {
          let children = function($$payload4, { props }) {
            $$payload4.out += `<!---->`;
            Form_label($$payload4, {
              description: workspaceFields.plantingAreaDepthSchema.description,
              optional: true,
              children: ($$payload5) => {
                $$payload5.out += `<!---->Depth`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            UnitAwareInput($$payload4, spread_props([
              props,
              {
                min: 0,
                quantityType: "distance",
                initialUnitSystem: settings.units["distance"],
                get value() {
                  return store_get($$store_subs ??= {}, "$formData", formData).depth;
                },
                set value($$value) {
                  store_mutate($$store_subs ??= {}, "$formData", formData, store_get($$store_subs ??= {}, "$formData", formData).depth = $$value);
                  $$settled = false;
                }
              }
            ]));
            $$payload4.out += `<!---->`;
          };
          Control($$payload3, { children });
        }
        $$payload3.out += `<!----> <!---->`;
        Form_field_errors($$payload3, { handlerErrors: handler.fieldErrors?.["depth"] });
        $$payload3.out += `<!---->`;
      },
      $$slots: { default: true }
    });
    $$payload2.out += `<!----></fieldset> <!---->`;
    Form_button($$payload2, {
      disabled: false,
      loading: handler.isLoading,
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
function TranslateForm($$payload) {
  $$payload.out += `<!---->Translate`;
}
const workspaceTools = [
  {
    id: "plantingAreaCreate",
    label: "Add Planting Area",
    ToolComponent: PlantingAreaCreateForm
  },
  {
    id: "environmentCreate",
    label: "Add Environment",
    ToolComponent: EnvironmentCreateForm
  },
  {
    id: "translate",
    label: "Translate",
    ToolComponent: TranslateForm
  },
  {
    id: "expire",
    label: "Expire",
    ToolComponent: ExpireForm
  },
  {
    id: "delete",
    label: "Delete",
    ToolComponent: DeleteForm
  },
  {
    id: "layoutConfig",
    label: "Layout Config",
    ToolComponent: LayoutConfigForm
  }
];
function workspaceToolbox() {
  return createToolbox(workspaceTools);
}
const workspaceContextKey = "workspaceContext";
const defaultTreeEnabled = isMobile() ? true : true;
const defaultContentPaneDirection = isMobile() ? "vertical" : "horizontal";
function createWorkspaceContext(id) {
  const controller = getContext$1(CONTROLLER_CONTEXT_ID);
  let editing = false;
  let canvas = setCanvasContext("workspaceLayoutCanvas", id, derivedMode);
  const toolbox = workspaceToolbox();
  const paneSettings = createPaneSettings("workspacePaneSettings", defaultTreeEnabled ? ["tree", "layout"] : ["layout"], defaultContentPaneDirection);
  const selections = createSelectionManager(["plantingArea", "environment"]);
  const timelineSelection = createTimelineSelection();
  const plantingAreaCreateHandler = createCommandHandler(plantingAreaCreate, {
    onSuccess: () => {
      toolbox.deactivate("plantingAreaCreate");
    }
  });
  const plantingAreaCreateSuperform = superForm(defaults(zod(PlantingAreaCreateCommandSchema)), {
    SPA: true,
    dataType: "json",
    validators: zod(PlantingAreaCreateCommandSchema),
    onUpdate({ form }) {
      if (form.valid) {
        plantingAreaCreateHandler.execute(form.data, controller);
      }
    },
    onChange() {
      plantingAreaCreateHandler.reset();
    }
  });
  function reset() {
    editing = false;
    selections.resetAll();
    plantingAreaCreateSuperform.reset();
    canvas = resetCanvasContext("workspaceLayoutCanvas", id, derivedMode);
  }
  return {
    get id() {
      return id;
    },
    get editing() {
      return editing;
    },
    get layoutCanvasContext() {
      return getCanvasContext("workspaceLayoutCanvas");
    },
    /* Setters. */
    canvas,
    toolbox,
    paneSettings,
    set editing(newVal) {
      editing = newVal;
    },
    timelineSelection,
    selections,
    plantingAreaCreateForm: {
      handler: plantingAreaCreateHandler,
      form: plantingAreaCreateSuperform
    },
    reset
  };
}
function setWorkspaceContext(id) {
  return setContext$1(workspaceContextKey, createWorkspaceContext(id));
}
function getWorkspaceContext() {
  return getContext$1(workspaceContextKey);
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
  let { plantingAreaLayerId, plantingArea } = $$props;
  const controller = getControllerContext();
  const workspaceContext = getWorkspaceContext();
  const canvasContext = workspaceContext.layoutCanvasContext;
  const canvasId = canvasContext.canvasId;
  const translateCommandHandler = createCommandHandler(locationHistoryUpdate);
  const transformCommandHandler = createCommandHandler(geometryUpdate);
  let position = (() => {
    if (!plantingArea || !plantingArea.locationHistory) {
      return null;
    }
    const location2 = historySelect(plantingArea.locationHistory.locations, workspaceContext.timelineSelection.focusUtc);
    if (location2 && location2.workspaceId === workspaceContext.id) {
      return { x: location2.x, y: location2.y };
    } else {
      return null;
    }
  })();
  let editable = workspaceContext.editing && !workspaceContext.toolbox.isToolActive("plantingAreaCreate");
  let selected = workspaceContext.selections.has("plantingArea", plantingArea.id);
  function onTranslate(newPos) {
    if (!plantingArea || !workspaceContext.id) {
      return;
    }
    translateCommandHandler.execute(
      {
        id: plantingArea.locationHistoryId,
        workspaceId: workspaceContext.id,
        coordinate: {
          x: canvasContext.transform.modelXPos(newPos.x),
          y: canvasContext.transform.modelYPos(newPos.y)
        },
        date: workspaceContext.timelineSelection.focusUtc
      },
      controller
    );
  }
  function onTransform(newGeometry) {
    if (!plantingArea) {
      return;
    }
    transformCommandHandler.execute(plantingArea.geometryId, newGeometry, controller);
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
        if (workspaceContext.toolbox.isToolActive("plantingAreaCreate")) {
          return;
        }
        workspaceContext.selections.select("plantingArea", plantingArea.id);
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
  let { plantingAreas } = $$props;
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
          const each_array = ensure_array_like(plantingAreas);
          if (workspaceContext.toolbox.isToolActive("plantingAreaCreate")) {
            $$payload3.out += "<!--[-->";
            CreatePlantingAreaContainer($$payload3, { plantingAreaLayerId });
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> <!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let plantingArea = each_array[$$index];
            EditablePlantingAreaContainer($$payload3, { plantingArea, plantingAreaLayerId });
          }
          $$payload3.out += `<!--]-->`;
        }
      });
      $$payload2.out += `<!---->`;
    }
  });
  pop();
}
function Toolbar($$payload, $$props) {
  push();
  let {
    workspaces = [],
    plantingAreas = [],
    includeWorkspacesMenu = true
  } = $$props;
  const workspacesDropdownMaxItems = 10;
  const selectedPlantingAreas = plantingAreas.filter((plantingArea) => workspaceContext.selections.has("plantingArea", plantingArea.id));
  const gardenContext = getGardenContext();
  const workspaceContext = getWorkspaceContext();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Menubar($$payload2, {
      class: "border-neutral-8 justify-center border-0 border-b md:justify-start",
      children: ($$payload3) => {
        if (includeWorkspacesMenu) {
          $$payload3.out += "<!--[-->";
          $$payload3.out += `<!---->`;
          Menu($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->`;
              Menubar_trigger($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<!---->Workspaces`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> <!---->`;
              Menubar_content($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<!---->`;
                  Group($$payload5, {
                    children: ($$payload6) => {
                      if (workspaces.length > 0) {
                        $$payload6.out += "<!--[-->";
                        const each_array = ensure_array_like(Array.from(
                          {
                            length: Math.min(workspaces.length, workspacesDropdownMaxItems)
                          },
                          (_, i) => i
                        ));
                        $$payload6.out += `<!--[-->`;
                        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                          let index = each_array[$$index];
                          const workspace = workspaces[index];
                          $$payload6.out += `<!---->`;
                          Menubar_item($$payload6, {
                            children: ($$payload7) => {
                              $$payload7.out += `<!---->`;
                              Button($$payload7, {
                                onclick: () => {
                                  goto(`/gardens/${page$1.params.gardenId}/workspaces/${workspace.slug}`);
                                },
                                class: "text-light h-full w-full italic",
                                children: ($$payload8) => {
                                  $$payload8.out += `<!---->${escape_html(workspace.name)}`;
                                },
                                $$slots: { default: true }
                              });
                              $$payload7.out += `<!---->`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload6.out += `<!---->`;
                        }
                        $$payload6.out += `<!--]-->`;
                      } else {
                        $$payload6.out += "<!--[!-->";
                      }
                      $$payload6.out += `<!--]--> <!---->`;
                      Menubar_item($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->`;
                          Button($$payload7, {
                            href: `/gardens/${stringify(page$1.params.gardenId)}/workspaces`,
                            class: "flex h-full w-full justify-between",
                            children: ($$payload8) => {
                              $$payload8.out += `<span>See All</span> `;
                              Icon($$payload8, {
                                icon: iconIds.listIcon,
                                width: "1.25rem",
                                class: "text-neutral-10"
                              });
                              $$payload8.out += `<!---->`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!---->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  if (gardenContext.authorize("WorkspaceCreate")) {
                    $$payload5.out += "<!--[-->";
                    $$payload5.out += `<!---->`;
                    Menubar_separator($$payload5, {});
                    $$payload5.out += `<!----> <!---->`;
                    Menubar_item($$payload5, {
                      children: ($$payload6) => {
                        $$payload6.out += `<!---->`;
                        Button($$payload6, {
                          href: `//gardens/${stringify(page$1.params.gardenId)}/workspaces/create`,
                          class: "flex h-full w-full items-center justify-between",
                          children: ($$payload7) => {
                            $$payload7.out += `<span>Create Workspace</span> `;
                            Icon($$payload7, {
                              icon: iconIds.addIcon,
                              width: "1.25rem",
                              class: "text-neutral-10"
                            });
                            $$payload7.out += `<!---->`;
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
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]--> `;
        if (workspaceContext.id) {
          $$payload3.out += "<!--[-->";
          $$payload3.out += `<!---->`;
          Menu($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->`;
              Menubar_trigger($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<!---->Select`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> <!---->`;
              Menubar_content($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<!---->`;
                  Group($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->`;
                      Menubar_group_heading($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->Tools`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> <!---->`;
                      Menubar_item($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->`;
                          Button($$payload7, {
                            class: "flex h-full w-full items-center justify-between",
                            children: ($$payload8) => {
                              $$payload8.out += `<span>Pointer</span> `;
                              Icon($$payload8, {
                                icon: iconIds.pointerSelectIcon,
                                width: "1.25rem",
                                class: "text-neutral-10"
                              });
                              $$payload8.out += `<!---->`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!---->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> <!---->`;
                      Menubar_item($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->`;
                          Button($$payload7, {
                            class: "flex h-full w-full items-center justify-between",
                            children: ($$payload8) => {
                              $$payload8.out += `<span>Group</span> `;
                              Icon($$payload8, {
                                icon: iconIds.groupSelectIcon,
                                width: "1.25rem",
                                class: "text-neutral-10"
                              });
                              $$payload8.out += `<!---->`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!---->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> <!---->`;
                  Group($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->`;
                      Menubar_group_heading($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->Planting Areas`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> `;
                      if (selectedPlantingAreas.length > 0) {
                        $$payload6.out += "<!--[-->";
                        const each_array_1 = ensure_array_like(selectedPlantingAreas);
                        $$payload6.out += `<!--[-->`;
                        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                          let plantingArea = each_array_1[$$index_1];
                          $$payload6.out += `<!---->`;
                          Menubar_item($$payload6, {
                            class: "flex justify-between px-2",
                            children: ($$payload7) => {
                              $$payload7.out += `<span class="text-sm">${escape_html(plantingArea.name)}</span> <!---->`;
                              Button($$payload7, {
                                onclick: () => {
                                  workspaceContext.selections.deselect("plantingArea", plantingArea.id);
                                },
                                children: ($$payload8) => {
                                  Icon($$payload8, { icon: iconIds.defaultClose, width: "1.25rem" });
                                },
                                $$slots: { default: true }
                              });
                              $$payload7.out += `<!---->`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload6.out += `<!---->`;
                        }
                        $$payload6.out += `<!--]-->`;
                      } else {
                        $$payload6.out += "<!--[!-->";
                        $$payload6.out += `<!---->`;
                        Menubar_item($$payload6, {
                          children: ($$payload7) => {
                            $$payload7.out += `<span class="italic">None</span>`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload6.out += `<!---->`;
                      }
                      $$payload6.out += `<!--]-->`;
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
          $$payload3.out += `<!----> `;
          if (gardenContext.authorize("WorkspaceEdit")) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<!---->`;
            Menu($$payload3, {
              children: ($$payload4) => {
                $$payload4.out += `<!---->`;
                Menubar_trigger($$payload4, {
                  children: ($$payload5) => {
                    $$payload5.out += `<!---->Edit`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!----> <!---->`;
                Menubar_content($$payload4, {
                  children: ($$payload5) => {
                    if (workspaceContext.editing) {
                      $$payload5.out += "<!--[-->";
                      $$payload5.out += `<!---->`;
                      Menubar_item($$payload5, {
                        children: ($$payload6) => {
                          $$payload6.out += `<!---->`;
                          Button($$payload6, {
                            class: "flex h-full w-full items-center justify-start",
                            onclick: () => {
                              workspaceContext.editing = false;
                            },
                            children: ($$payload7) => {
                              Icon($$payload7, {
                                icon: iconIds.endEditingIcon,
                                width: "1.25rem",
                                class: "text-neutral-11 mr-2"
                              });
                              $$payload7.out += `<!----> <span>End Editing</span>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload6.out += `<!---->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload5.out += `<!----> <!---->`;
                      Menubar_item($$payload5, {
                        children: ($$payload6) => {
                          $$payload6.out += `<!---->`;
                          Button($$payload6, {
                            class: "flex h-full w-full items-center justify-start",
                            onclick: () => {
                              workspaceContext.toolbox.activate("translate");
                            },
                            children: ($$payload7) => {
                              Icon($$payload7, {
                                icon: iconIds.verdagraphTranslateIcon,
                                width: "1.25rem",
                                class: "text-neutral-11 mr-2"
                              });
                              $$payload7.out += `<!----> <span>Translate</span>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload6.out += `<!---->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload5.out += `<!----> <!---->`;
                      Menubar_item($$payload5, {
                        class: "flex items-center justify-start",
                        children: ($$payload6) => {
                          Icon($$payload6, {
                            icon: iconIds.deleteIcon,
                            width: "1.25rem",
                            class: "text-neutral-11 mr-2"
                          });
                          $$payload6.out += `<!----> <span>Delete</span>`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload5.out += `<!---->`;
                    } else {
                      $$payload5.out += "<!--[!-->";
                      $$payload5.out += `<!---->`;
                      Menubar_item($$payload5, {
                        children: ($$payload6) => {
                          $$payload6.out += `<!---->`;
                          Button($$payload6, {
                            class: "flex h-full w-full items-center justify-start",
                            onclick: () => {
                              workspaceContext.editing = true;
                            },
                            children: ($$payload7) => {
                              Icon($$payload7, {
                                icon: iconIds.startEditingIcon,
                                width: "1.25rem",
                                class: "text-neutral-11 mr-2"
                              });
                              $$payload7.out += `<!----> <span>Start Editing</span>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload6.out += `<!---->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload5.out += `<!---->`;
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
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> `;
          if (workspaceContext.editing) {
            $$payload3.out += "<!--[-->";
            $$payload3.out += `<!---->`;
            Menu($$payload3, {
              children: ($$payload4) => {
                $$payload4.out += `<!---->`;
                Menubar_trigger($$payload4, {
                  children: ($$payload5) => {
                    $$payload5.out += `<!---->Add`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!----> <!---->`;
                Menubar_content($$payload4, {
                  children: ($$payload5) => {
                    $$payload5.out += `<!---->`;
                    Menubar_item($$payload5, {
                      children: ($$payload6) => {
                        $$payload6.out += `<!---->`;
                        Button($$payload6, {
                          class: "flex h-full w-full items-center justify-between",
                          onclick: () => {
                            workspaceContext.toolbox.activate("plantingAreaCreate");
                          },
                          children: ($$payload7) => {
                            Icon($$payload7, {
                              icon: iconIds.plantingAreaIcon,
                              width: "1.25rem",
                              class: "text-neutral-11"
                            });
                            $$payload7.out += `<!----> <span>Add Planting Area</span>`;
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
                });
                $$payload4.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload3.out += `<!---->`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> <!---->`;
          Menu($$payload3, {
            children: ($$payload4) => {
              $$payload4.out += `<!---->`;
              Menubar_trigger($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<!---->View`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> <!---->`;
              Menubar_content($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<!---->`;
                  Group($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->`;
                      Menubar_checkbox_item($$payload6, {
                        checked: workspaceContext.paneSettings.isEnabled("tree"),
                        onCheckedChange: (newVal) => {
                          if (newVal) {
                            workspaceContext.paneSettings.enable("tree");
                          } else {
                            workspaceContext.paneSettings.disable("tree");
                          }
                        },
                        disabled: !workspaceContext.paneSettings.isEnabled("layout"),
                        children: ($$payload7) => {
                          $$payload7.out += `<div class="flex w-full items-center justify-between"><span>Tree</span> `;
                          Icon($$payload7, {
                            icon: iconIds.verdagraphTreeIcon,
                            width: "1rem"
                          });
                          $$payload7.out += `<!----></div>`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> <!---->`;
                      Menubar_checkbox_item($$payload6, {
                        checked: workspaceContext.paneSettings.isEnabled("layout"),
                        onCheckedChange: (newVal) => {
                          if (newVal) {
                            workspaceContext.paneSettings.enable("layout");
                          } else {
                            workspaceContext.paneSettings.disable("layout");
                          }
                        },
                        disabled: !workspaceContext.paneSettings.isEnabled("tree"),
                        children: ($$payload7) => {
                          $$payload7.out += `<div class="flex w-full items-center justify-between"><span>Layout</span> `;
                          Icon($$payload7, {
                            icon: iconIds.verdagraphLayoutIcon,
                            width: "1rem"
                          });
                          $$payload7.out += `<!----></div>`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> `;
                      if (workspaceContext.paneSettings.isEnabled("layout") && workspaceContext.paneSettings.isEnabled("tree")) {
                        $$payload6.out += "<!--[-->";
                        $$payload6.out += `<!---->`;
                        Sub($$payload6, {
                          children: ($$payload7) => {
                            $$payload7.out += `<!---->`;
                            Menubar_sub_trigger($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->Direction`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!----> <!---->`;
                            Menubar_sub_content($$payload7, {
                              children: ($$payload8) => {
                                $$payload8.out += `<!---->`;
                                RadioGroup($$payload8, {
                                  get value() {
                                    return workspaceContext.paneSettings.direction;
                                  },
                                  set value($$value) {
                                    workspaceContext.paneSettings.direction = $$value;
                                    $$settled = false;
                                  },
                                  children: ($$payload9) => {
                                    $$payload9.out += `<!---->`;
                                    Menubar_radio_item($$payload9, {
                                      value: "horizontal",
                                      children: ($$payload10) => {
                                        $$payload10.out += `<!---->Horizontal`;
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$payload9.out += `<!----> <!---->`;
                                    Menubar_radio_item($$payload9, {
                                      value: "vertical",
                                      children: ($$payload10) => {
                                        $$payload10.out += `<!---->Vertical`;
                                      },
                                      $$slots: { default: true }
                                    });
                                    $$payload9.out += `<!---->`;
                                  },
                                  $$slots: { default: true }
                                });
                                $$payload8.out += `<!---->`;
                              },
                              $$slots: { default: true }
                            });
                            $$payload7.out += `<!---->`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload6.out += `<!---->`;
                      } else {
                        $$payload6.out += "<!--[!-->";
                      }
                      $$payload6.out += `<!--]-->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> <!---->`;
                  Menubar_separator($$payload5, {});
                  $$payload5.out += `<!----> <!---->`;
                  Menubar_item($$payload5, {
                    onclick: () => {
                      workspaceContext.toolbox.activate("layoutConfig");
                    },
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Layout Config`;
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
        } else {
          $$payload3.out += "<!--[!-->";
        }
        $$payload3.out += `<!--]-->`;
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
function PlantingAreaTree($$payload, $$props) {
  push();
  let { plantingAreas = [], workspacesInGarden = [] } = $$props;
  const controller = getControllerContext();
  const workspaceContext = getWorkspaceContext();
  const fieldErrors = {};
  const plantingAreaUpdateCommandHandler = createCommandHandler(plantingAreaUpdate);
  const geometryUpdateCommandHandler = createCommandHandler(geometryUpdate);
  const locationUpdateCommandHandler = createCommandHandler(locationUpdate);
  const locationHistoryExtendCommandHandler = createCommandHandler(locationHistoryExtend);
  let items = plantingAreas.map((plantingArea) => {
    return plantingAreaTreeItem({ plantingArea, workspaces: workspacesInGarden }, {
      fieldErrors,
      plantingAreaUpdateHandler: (id, data) => {
        plantingAreaUpdateCommandHandler.execute(id, data, controller);
      },
      geometryUpdateHandler: (id, data) => {
        geometryUpdateCommandHandler.execute(id, data, controller);
      },
      locationUpdateHandler: (id, data) => {
        locationUpdateCommandHandler.execute(id, data, controller);
      },
      locationHistoryExtendHandler: (id) => {
        locationHistoryExtendCommandHandler.execute(
          id,
          {
            date: workspaceContext.timelineSelection.focusUtc
          },
          controller
        );
      }
    });
  });
  const editableTree = createEditableTree(() => items, {
    /** Synchronize changes in the tree selection with the workspace context. */
    plantingArea: {
      add: (id) => {
        workspaceContext.selections.select("plantingArea", id);
      },
      remove: (id) => {
        workspaceContext.selections.deselect("plantingArea", id);
      }
    }
  });
  workspaceContext.selections.addSelectionChangeHandler("plantingArea", (addedIds, removedIds) => {
    addedIds.forEach((id) => {
      editableTree.tree.select(toTreeId("plantingArea", id));
    });
    removedIds.forEach((id) => {
      editableTree.tree.deselect(toTreeId("plantingArea", id));
    });
  });
  if (plantingAreas.length === 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span class="p-2 italic">No planting areas.</span>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<!---->`;
    Scroll_area$1($$payload, {
      class: "w-full px-2",
      children: ($$payload2) => {
        EditableTree($$payload2, {
          editableTree,
          fieldErrors,
          editing: workspaceContext.editing
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
  let { plantingAreas, workspacesInGarden } = $$props;
  $$payload.out += `<!---->`;
  Root($$payload, {
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
        class: "mt-0 h-full overflow-clip",
        children: ($$payload3) => {
          PlantingAreaTree($$payload3, { plantingAreas, workspacesInGarden });
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
}
function WorkspaceEditor($$payload, $$props) {
  push();
  let { gardenId: gardenId2, includeWorkspacesMenu = true } = $$props;
  const controller = getControllerContext();
  const workspaceContext = getWorkspaceContext();
  useQuery(controller.triplit, controller.triplit.query("plantingAreas").Where("locationHistory.workspaceIds", "has", workspaceContext.id).Include("geometry", (rel) => rel("geometry").Include("linesCoordinates")).Include("locationHistory", (rel) => rel("locationHistory").Include("locations")));
  const plantingAreas = [];
  useQuery(controller.triplit, controller.triplit.query("workspaces").Where(["gardenId", "=", gardenId2]));
  const workspacesInGarden = [];
  $$payload.out += `<div class="flex h-full w-full flex-col">`;
  Toolbar($$payload, {
    workspaces: workspacesInGarden,
    plantingAreas,
    includeWorkspacesMenu
  });
  $$payload.out += `<!----> <div class="h-full grow overflow-hidden">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    Resizable_pane_group($$payload, {
      direction: workspaceContext.paneSettings.direction,
      children: ($$payload2) => {
        if (workspaceContext.paneSettings.isEnabled("layout")) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<!---->`;
          Pane($$payload2, {
            defaultSize: 70,
            order: 1,
            minSize: 10,
            children: ($$payload3) => {
              $$payload3.out += `<!---->`;
              {
                Layout($$payload3, { plantingAreas });
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
        if (workspaceContext.toolbox.isActive) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<!---->`;
          Pane($$payload2, {
            defaultSize: 20,
            order: 2,
            minSize: 10,
            children: ($$payload3) => {
              TabToolbox($$payload3, { toolbox: workspaceContext.toolbox });
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
        if (workspaceContext.paneSettings.isEnabled("tree")) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<!---->`;
          Pane($$payload2, {
            defaultSize: 30,
            order: 3,
            minSize: 10,
            children: ($$payload3) => {
              Tree($$payload3, { plantingAreas, workspacesInGarden });
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
function addToDate(date, days = 0, months = 0, years = 0) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  newDate.setMonth(newDate.getMonth() + months);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
}
const user = {
  account: {
    id: "defaultUserAccount",
    profileId: "defaultUser",
    passwordHash: "password",
    unverifiedEmail: {},
    isActive: true
  },
  profile: { id: "defaultUser", username: "Demo User", createdAt: /* @__PURE__ */ new Date() }
};
const earlyDate = new Date(2025, 1, 1);
const currentDay = /* @__PURE__ */ new Date();
const gardenId = "garden";
const workspaceId = "workspace";
function seed() {
  return {
    profiles: [user.profile],
    accounts: [user.account],
    gardens: [
      {
        id: gardenId,
        name: "Garden",
        visibility: "PUBLIC",
        adminIds: [user.profile.id]
      }
    ],
    workspaces: [
      {
        id: workspaceId,
        gardenId,
        name: "Workspace",
        slug: "workspace"
      }
    ],
    plantingAreas: [
      {
        gardenId,
        name: "Cedar 1",
        geometryId: "rectangle1",
        locationHistoryId: "rectangle1",
        description: ""
      },
      {
        gardenId,
        name: "Cedar 2",
        geometryId: "rectangle2",
        locationHistoryId: "rectangle2",
        description: ""
      },
      {
        gardenId,
        name: "Metal 1",
        geometryId: "ellipse1",
        locationHistoryId: "ellipse1",
        description: ""
      },
      {
        gardenId,
        name: "Metal 2",
        geometryId: "ellipse2",
        locationHistoryId: "ellipse2",
        description: ""
      },
      {
        gardenId,
        name: "Hexagonal Pot",
        geometryId: "polygon1",
        locationHistoryId: "polygon1",
        description: ""
      },
      {
        gardenId,
        name: "Corner",
        geometryId: "lines1",
        locationHistoryId: "lines1",
        description: ""
      }
    ],
    geometries: [
      {
        gardenId,
        id: "rectangle1",
        type: "RECTANGLE",
        date: earlyDate,
        rectangleLength: 1,
        rectangleWidth: 1 + 1 / 2
      },
      {
        gardenId,
        id: "rectangle2",
        type: "RECTANGLE",
        date: earlyDate,
        rectangleLength: 1,
        rectangleWidth: 1 + 1 / 2
      },
      {
        gardenId,
        id: "ellipse1",
        type: "ELLIPSE",
        date: earlyDate,
        ellipseLength: 1,
        ellipseWidth: 1 + 1 / 2,
        rotation: 90
      },
      {
        gardenId,
        id: "ellipse2",
        type: "ELLIPSE",
        date: earlyDate,
        ellipseLength: 1,
        ellipseWidth: 1 + 1 / 2
      },
      {
        gardenId,
        id: "polygon1",
        type: "POLYGON",
        date: earlyDate,
        polygonNumSides: 6,
        polygonRadius: 1 / 4
      },
      {
        gardenId,
        id: "lines1",
        type: "LINES",
        date: earlyDate,
        linesClosed: true,
        linesCoordinateIds: [
          "lines1coord1",
          "lines1coord2",
          "lines1coord3",
          "lines1coord4",
          "lines1coord5",
          "lines1coord6"
        ]
      }
    ],
    coordinates: [
      {
        gardenId,
        id: "lines1coord1",
        x: 0,
        y: 0
      },
      {
        gardenId,
        id: "lines1coord2",
        x: 0,
        y: 1
      },
      {
        gardenId,
        id: "lines1coord3",
        x: 1 / 2,
        y: 1
      },
      {
        gardenId,
        id: "lines1coord4",
        x: 1 / 2,
        y: 1 / 2
      },
      {
        gardenId,
        id: "lines1coord5",
        x: 1,
        y: 1 / 2
      },
      {
        gardenId,
        id: "lines1coord6",
        x: 1,
        y: 0
      }
    ],
    locationHistories: [
      {
        gardenId,
        workspaceIds: [workspaceId],
        id: "rectangle1",
        locationIds: ["rectangle1pos1"]
      },
      {
        gardenId,
        workspaceIds: [workspaceId],
        id: "rectangle2",
        locationIds: ["rectangle2pos1"]
      },
      {
        gardenId,
        workspaceIds: [workspaceId],
        id: "ellipse1",
        locationIds: ["ellipse1pos1"]
      },
      {
        gardenId,
        workspaceIds: [workspaceId],
        id: "ellipse2",
        locationIds: ["ellipse2pos1"]
      },
      {
        gardenId,
        workspaceIds: [workspaceId],
        id: "polygon1",
        locationIds: ["polygon1pos1", "polygon1pos2", "polygon1pos3"]
      },
      {
        gardenId,
        workspaceIds: [workspaceId],
        id: "lines1",
        locationIds: ["lines1pos1"]
      }
    ],
    locations: [
      {
        gardenId,
        workspaceId,
        id: "rectangle1pos1",
        date: earlyDate,
        x: 1 + 1 / 2,
        y: 3 + 1 / 2
      },
      {
        gardenId,
        workspaceId,
        id: "rectangle2pos1",
        date: earlyDate,
        x: 3,
        y: 3 + 1 / 2
      },
      {
        gardenId,
        workspaceId,
        id: "ellipse1pos1",
        date: earlyDate,
        x: 5,
        y: 4 + 1 / 2
      },
      {
        gardenId,
        workspaceId,
        id: "ellipse2pos1",
        date: earlyDate,
        x: 6 + 1 / 2,
        y: 3
      },
      {
        gardenId,
        workspaceId,
        id: "polygon1pos1",
        date: earlyDate,
        x: 4 + 1 / 2,
        y: 2
      },
      {
        gardenId,
        workspaceId,
        id: "polygon1pos2",
        date: addToDate(currentDay, -3),
        x: 4,
        y: 2
      },
      {
        gardenId,
        workspaceId,
        id: "polygon1pos3",
        date: addToDate(currentDay, 3),
        x: 6 + 1 / 2,
        y: 5
      },
      {
        gardenId,
        workspaceId,
        id: "lines1pos1",
        date: earlyDate,
        x: 1,
        y: 1
      }
    ]
  };
}
function WorkspaceEditor_1($$payload, $$props) {
  push();
  const controller = getContext$1(CONTROLLER_CONTEXT_ID);
  const workspace = setWorkspaceContext(workspaceId);
  workspace.editing = true;
  const garden = setGardenContext(controller);
  garden.id = gardenId;
  WorkspaceEditor($$payload, { gardenId, includeWorkspacesMenu: false });
  pop();
}
const workspaceDemo = {
  id: "workspace-editor",
  title: "Workspace Editor",
  description: "The workspace editor allows editing workspaces, planting areas, and environments.",
  component: WorkspaceEditor_1,
  seed
};
const demos = [workspaceDemo];
export {
  CONTROLLER_CONTEXT_ID as C,
  Popover_content as P,
  Root$2 as R,
  Trigger as T,
  createController as c,
  demos as d,
  plantSchema as p,
  roles as r,
  setSettingsContext as s,
  user as u
};
