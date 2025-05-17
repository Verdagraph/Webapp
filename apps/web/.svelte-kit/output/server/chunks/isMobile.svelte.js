import "clsx";
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
      window: window2 = defaultWindow,
      document = window2?.document
    } = options;
    if (window2 === void 0) return;
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
const MOBILE_BREAKPOINT = 768;
const isMobile = () => {
  return window.innerWidth < MOBILE_BREAKPOINT;
};
class IsMobile {
  #current = false;
  constructor() {
  }
  get current() {
    return this.#current;
  }
}
export {
  IsMobile as I,
  MediaQuery as M,
  SvelteSet as S,
  SvelteMap as a,
  createSubscriber as c,
  isMobile as i,
  watch as w
};
