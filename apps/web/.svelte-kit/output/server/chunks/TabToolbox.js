import "clsx";
import { f as SvelteMap, S as SvelteSet, w as watch, d as getMonthString } from "./tools.svelte.js";
import { o as once, p as push, c as spread_attributes, d as bind_props, a as pop, m as escape_html, g as spread_props, e as copy_payload, f as assign_payload, q as clsx, l as ensure_array_like, z as sanitize_props, A as slot, s as setContext$1, j as hasContext, k as getContext$1, n as attr_class, u as attr_style, h as stringify } from "./index2.js";
import { webcrypto } from "node:crypto";
import { s as srOnlyStylesString, j as getDataReadonly, a as getDataDisabled, k as getDataInvalid, e as useId$1, u as useRefById, c as getAriaDisabled, l as getAriaHidden, n as getAriaReadonly, o as getDataSelected, p as getDataUnavailable, q as getAriaSelected, f as box, m as mergeProps, i as getAriaOrientation, g as getDataOrientation, r as getDisabled, t as getHidden } from "./use-id.js";
import { i as isValidIndex, c as chunk, I as Icon$1 } from "./index7.js";
import { c as cn } from "./shadcn.js";
import { i as iconIds } from "./icons.js";
import { b as buttonVariants, B as Button } from "./button2.js";
import { CalendarDateTime, CalendarDate, getLocalTimeZone, ZonedDateTime, parseZonedDateTime, parseDateTime, parseDate, toCalendar, getDayOfWeek, DateFormatter, startOfMonth, endOfMonth, isSameMonth, isSameDay, isToday } from "@internationalized/date";
import { v as isBrowser$1, k as isHTMLElement, a as afterTick, f as ARROW_DOWN, h as ARROW_UP, e as ARROW_LEFT, A as ARROW_RIGHT, E as ENTER, S as SPACE, c as createContext$1, n as noop$1, q as isElementOrSVGElement, H as HOME, j as END, r as Popper_layer_force_mount, s as Popper_layer, t as getFloatingContentCSSVars, R as Root$1, T as Trigger, d as Popover_content } from "./index3.js";
import { B as run } from "./utils.js";
import { I as Icon } from "./Icon.js";
import { u as useTooltipContent, R as Root$2, T as Trigger$1 } from "./index4.js";
import { I as IsMobile } from "./isMobile.svelte.js";
import { u as useRovingFocus } from "./use-roving-focus.svelte.js";
import { a as Scroll_area, b as Scroll_area_viewport, c as Scroll_area_scrollbar, d as Scroll_area_thumb } from "./scroll-area.js";
function addEventListener(target, event, handler, options) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler, options));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler, options));
  };
}
function initAnnouncer() {
  if (!isBrowser$1)
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
    if (!announcer || !isBrowser$1)
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
  const { defaultValue, defaultPlaceholder, granularity } = withDefaults;
  if (Array.isArray(defaultValue) && defaultValue.length) {
    return defaultValue[defaultValue.length - 1];
  }
  if (defaultValue && !Array.isArray(defaultValue)) {
    return defaultValue;
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
  readonly
}) {
  return {
    id,
    role: "application",
    "aria-label": fullCalendarLabel,
    "data-invalid": getDataInvalid(isInvalid),
    "data-disabled": getDataDisabled(disabled),
    "data-readonly": getDataReadonly(readonly)
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
  accessibleHeadingId = useId$1();
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
      return value.some((d) => isSameDay(d, date));
    } else if (!value) {
      return false;
    } else {
      return isSameDay(value, date);
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
    const readonly = this.readonly.current;
    if (readonly) return;
    const isDateDisabled = this.isDateDisabledProp.current;
    const isDateUnavailable = this.isDateUnavailableProp.current;
    if (isDateDisabled?.(date) || isDateUnavailable?.(date)) return;
    const prev = this.value.current;
    const multiple = this.type.current === "multiple";
    if (multiple) {
      if (Array.isArray(prev) || prev === void 0) {
        this.value.current = this.handleMultipleUpdate(prev, date);
      }
    } else {
      if (!Array.isArray(prev)) {
        const next = this.handleSingleUpdate(prev, date);
        if (!next) {
          this.announcer.announce("Selected date is now empty.", "polite", 5e3);
        } else {
          this.announcer.announce(`Selected Date: ${this.formatter.selectedDate(next, false)}`, "polite");
        }
        this.value.current = next;
        if (next !== void 0) {
          this.onDateSelect?.current?.();
        }
      }
    }
  }
  handleMultipleUpdate(prev, date) {
    if (!prev) return [date];
    if (!Array.isArray(prev)) {
      return;
    }
    const index = prev.findIndex((d) => isSameDay(d, date));
    const preventDeselect = this.preventDeselect.current;
    if (index === -1) {
      return [...prev, date];
    } else if (preventDeselect) {
      return prev;
    } else {
      const next = prev.filter((d) => !isSameDay(d, date));
      if (!next.length) {
        this.placeholder.current = date;
        return void 0;
      }
      return next;
    }
  }
  handleSingleUpdate(prev, date) {
    if (!prev) return date;
    const preventDeselect = this.preventDeselect.current;
    if (!preventDeselect && isSameDay(prev, date)) {
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
  #isFocusedDate = once(() => isSameDay(this.date.current, this.root.placeholder.current));
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
    id = useId$1(),
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
    readonly = false,
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
    const defaultValue = type === "single" ? "" : [];
    if (controlledValue) {
      onValueChange(defaultValue);
    } else {
      value = defaultValue;
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
    readonly: box.with(() => readonly),
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
    id = useId$1(),
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
    id = useId$1(),
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
    id = useId$1(),
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
    id = useId$1(),
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
    id = useId$1(),
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
    id = useId$1(),
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
    id = useId$1(),
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
    id = useId$1(),
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
    id = useId$1(),
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
    id = useId$1(),
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
    id = useId$1(),
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
    id = useId$1(),
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
    id = useId$1(),
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
    id = useId$1(),
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
    id = useId$1(),
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
    id = useId$1(),
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
    id = useId$1(),
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
    id = useId$1(),
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
    id = useId$1(),
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
    id = useId$1(),
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
    Root$1($$payload2, {
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
    let count2 = 0;
    for (const _ of iterable) {
      count2++;
    }
    return count2;
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
  const debounceClear = useDebounce(
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
    const next = itemsForTypeahead.find((item) => {
      if (isStartingTypeahead) return item.index > index;
      return item.index >= index;
    }) ?? itemsForTypeahead[0];
    return next?.item;
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
              const next = this.tree.typeahead(e.key);
              next?.child.el?.focus();
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
    const { callbacks, constraints, id: paneId } = paneData;
    const { collapsedSize = 0, collapsible } = constraints;
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
let count = 0;
function useId(prefix = "paneforge") {
  count++;
  return `${prefix}-${count}`;
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
    id = useId(),
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
    id: box.with(() => id ?? useId()),
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
    id = useId(),
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
    id = useId(),
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
  const isMobile = new IsMobile();
  function button($$payload2, tooltipDescription, iconId, variant, onclick) {
    $$payload2.out += `<!---->`;
    Root$2($$payload2, {
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        Trigger$1($$payload3, {
          children: ($$payload4) => {
            Button($$payload4, {
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
  Root$2($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Trigger$1($$payload2, {
        children: ($$payload3) => {
          DatePicker($$payload3, {
            value: selection.beginSelection,
            compact: isMobile.current,
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
  if (isMobile.current) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    Root$1($$payload, {
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
  Root$2($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Trigger$1($$payload2, {
        children: ($$payload3) => {
          DatePicker($$payload3, {
            value: selection.focus,
            compact: isMobile.current,
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
  if (isMobile.current) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    Root$1($$payload, {
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
  Root$2($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Trigger$1($$payload2, {
        children: ($$payload3) => {
          DatePicker($$payload3, {
            value: selection.endSelection,
            compact: isMobile.current,
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
                  Button($$payload5, {
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
export {
  DatePicker as D,
  Pane as P,
  Root as R,
  Tooltip_content as T,
  Tree as a,
  Tabs_list as b,
  Tabs_trigger as c,
  Tabs_content as d,
  Resizable_pane_group as e,
  Resizable_handle as f,
  TabToolbox as g,
  TimelineSelector as h,
  baseTickClass as i,
  baseTickDayLabelClass as j,
  baseTickLineClass as k,
  tickLineWidth as l,
  tickLabelThreshold as t
};
