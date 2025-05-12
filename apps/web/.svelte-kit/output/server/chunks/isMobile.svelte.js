import "clsx";
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
  isMobile as i
};
