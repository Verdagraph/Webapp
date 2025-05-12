import { skyDark, sky, mintDark, mint, limeDark, lime, yellowDark, yellow, amberDark, amber, orangeDark, orange, brownDark, brown, goldDark, gold, bronzeDark, bronze, grassDark, grass, greenDark, green, jadeDark, jade, tealDark, teal, cyanDark, cyan, blueDark, blue, indigoDark, indigo, irisDark, iris, violetDark, violet, purpleDark, purple, plumDark, plum, pinkDark, pink, crimsonDark, crimson, rubyDark, ruby, redDark, red, tomatoDark, tomato, sandDark, sand, oliveDark, olive, sageDark, sage, slateDark, slate, mauveDark, mauve, grayDark, gray } from "@radix-ui/colors";
import "clsx";
import { getLocalTimeZone, today } from "@internationalized/date";
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
const SvelteSet = globalThis.Set;
const SvelteMap = globalThis.Map;
class MediaQuery {
  current;
  /**
   * @param {string} query
   * @param {boolean} [matches]
   */
  constructor(query, matches = false) {
    this.current = matches;
  }
}
function createSubscriber(_) {
  return () => {
  };
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
const defaultWindow = void 0;
function getActiveElement(document) {
  let activeElement = document.activeElement;
  while (activeElement?.shadowRoot) {
    const node = activeElement.shadowRoot.activeElement;
    if (node === activeElement)
      break;
    else
      activeElement = node;
  }
  return activeElement;
}
class ActiveElement {
  #document;
  #subscribe;
  constructor(options = {}) {
    const {
      window = defaultWindow,
      document = window?.document
    } = options;
    if (window === void 0) return;
    this.#document = document;
    this.#subscribe = createSubscriber();
  }
  get current() {
    this.#subscribe?.();
    if (!this.#document) return null;
    return getActiveElement(this.#document);
  }
}
new ActiveElement();
function runWatcher(sources, flush, effect, options = {}) {
  const { lazy = false } = options;
}
function watch(sources, effect, options) {
  runWatcher(sources, "post", effect, options);
}
function watchPre(sources, effect, options) {
  runWatcher(sources, "pre", effect, options);
}
watch.pre = watchPre;
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
function calculateDeltaDays(current, prev) {
  return Math.round((current.toDate(getLocalTimeZone()).getTime() - prev.toDate(getLocalTimeZone()).getTime()) / msPerDay);
}
function getMonthString(monthNumber) {
  return monthStrings[monthNumber];
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
function createToolbox(attributes) {
  let activeToolIds = [];
  let lastActivatedId = void 0;
  const activeTools = attributes.filter((attr) => activeToolIds.includes(attr.id));
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
export {
  LocalStore as L,
  MediaQuery as M,
  SvelteSet as S,
  createToolbox as a,
  createTimelineSelection as b,
  createSubscriber as c,
  getMonthString as d,
  calculateDeltaDays as e,
  SvelteMap as f,
  getColor as g,
  localStore as l,
  watch as w
};
