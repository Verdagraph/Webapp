import "clsx";
let _theme = "light";
const mode = {
  get value() {
    return _theme;
  },
  set value(newVal) {
    _theme = newVal;
  }
};
export {
  mode as m
};
