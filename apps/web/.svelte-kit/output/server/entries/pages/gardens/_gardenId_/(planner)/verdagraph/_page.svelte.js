import { o as once, p as push, d as spread_attributes, b as bind_props, a as pop, m as ensure_array_like, q as attr_class, u as attr_style, n as escape_html, t as clsx, j as stringify, e as copy_payload, f as assign_payload, s as setContext, l as getContext, h as head } from "../../../../../../chunks/index2.js";
import "clsx";
import { I as Icon } from "../../../../../../chunks/Icon.js";
import { d as getMonthString, e as calculateDeltaDays, l as localStore, a as createToolbox, b as createTimelineSelection, g as getColor } from "../../../../../../chunks/tools.svelte.js";
import { i as isMobile } from "../../../../../../chunks/isMobile.svelte.js";
import { M as Menubar, a as Menu, b as Menubar_trigger, c as Menubar_content, G as Group$1, f as Menubar_checkbox_item, S as Sub, g as Menubar_sub_trigger, h as Menubar_sub_content, R as RadioGroup, i as Menubar_radio_item, e as Menubar_separator, d as Menubar_item } from "../../../../../../chunks/index6.js";
import { i as iconIds } from "../../../../../../chunks/icons.js";
import { getDayOfWeek, CalendarDate } from "@internationalized/date";
import { m as mode } from "../../../../../../chunks/theme.svelte.js";
import { i as baseTickClass, j as baseTickDayLabelClass, k as baseTickLineClass, t as tickLabelThreshold, l as tickLineWidth, e as Resizable_pane_group, P as Pane, f as Resizable_handle, a as Tree$1, g as TabToolbox, h as TimelineSelector } from "../../../../../../chunks/TabToolbox.js";
import { c as cn } from "../../../../../../chunks/shadcn.js";
import { S as Scroll_area } from "../../../../../../chunks/scroll-area.js";
import { R as Root, S as Select_trigger, a as Select_content, G as Group, b as Select_item } from "../../../../../../chunks/index7.js";
import { u as useRefById, e as useId, f as box, m as mergeProps } from "../../../../../../chunks/use-id.js";
import { u as useRovingFocus } from "../../../../../../chunks/use-roving-focus.svelte.js";
import { c as createContext } from "../../../../../../chunks/index3.js";
const ROOT_ATTR = "data-toolbar-root";
const ITEM_ATTR = "data-toolbar-item";
class ToolbarRootState {
  #id;
  #ref;
  orientation;
  #loop;
  rovingFocusGroup;
  constructor(props) {
    this.#id = props.id;
    this.orientation = props.orientation;
    this.#loop = props.loop;
    this.#ref = props.ref;
    useRefById({ id: this.#id, ref: this.#ref });
    this.rovingFocusGroup = useRovingFocus({
      orientation: this.orientation,
      loop: this.#loop,
      rootNodeId: this.#id,
      candidateAttr: ITEM_ATTR
    });
  }
  #props = once(() => ({
    id: this.#id.current,
    role: "toolbar",
    "data-orientation": this.orientation.current,
    [ROOT_ATTR]: ""
  }));
  get props() {
    return this.#props();
  }
}
const [setToolbarRootContext, getToolbarRootContext] = createContext("Toolbar.Root");
createContext("Toolbar.Group");
function useToolbarRoot(props) {
  return setToolbarRootContext(new ToolbarRootState(props));
}
function Toolbar$1($$payload, $$props) {
  push();
  let {
    ref = null,
    id = useId(),
    orientation = "horizontal",
    loop = true,
    child,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = useToolbarRoot({
    id: box.with(() => id),
    orientation: box.with(() => orientation),
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
function NoneditableSliderBar($$payload, $$props) {
  push();
  let { selection, width } = $$props;
  let tickWidth = width / (selection.sliderValue[2] - selection.sliderValue[0]);
  let tickLabelTranslate = tickWidth / 2 + tickLineWidth - 7;
  let ticks = Array.from(
    {
      length: selection.sliderValue[2] - selection.sliderValue[0] + 1
    },
    (_, index) => selection.sliderValue[0] + index
  );
  let numTicks = ticks.length;
  const each_array = ensure_array_like(ticks);
  $$payload.out += `<div class="relative flex h-8 w-full touch-none select-none"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let index = each_array[$$index];
    if (index >= 0 && index < selection.maxSliderValue) {
      $$payload.out += "<!--[-->";
      const dateValue = selection.sliderValueToDateValue(index);
      if (dateValue.month === 1 && dateValue.day === 1) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div${attr_class(clsx(cn(baseTickClass, "")))}${attr_style(`position: absolute; left: ${stringify((index - selection.sliderValue[0]) * (1 / numTicks) * 100)}%; translate: -50%`)}><span class="text-neutral-11 absolute -translate-y-[14px] text-sm">${escape_html(dateValue.year)}</span> <span${attr_class(clsx(cn(baseTickDayLabelClass, "")), void 0, { "hidden": tickWidth < tickLabelThreshold })}${attr_style(`transform: translateX(${stringify(tickLabelTranslate)}px)`)}>${escape_html(dateValue.day.toString().padStart(2, "0"))}</span> <span${attr_class(clsx(cn(baseTickLineClass, "h-[14px]")))}></span></div>`;
      } else if (dateValue.day === 1) {
        $$payload.out += "<!--[1-->";
        $$payload.out += `<div${attr_class(clsx(cn(baseTickClass, "")))}${attr_style(`position: absolute; left: ${stringify((index - selection.sliderValue[0]) * (1 / numTicks) * 100)}%; translate: -50%`)}><span class="text-neutral-11 absolute -translate-y-[14px] text-xs">${escape_html(getMonthString(dateValue.month))}</span> <span${attr_class(clsx(cn(baseTickDayLabelClass, "")), void 0, { "hidden": tickWidth < tickLabelThreshold })}${attr_style(`transform: translateX(${stringify(tickLabelTranslate)}px)`)}>${escape_html(dateValue.day.toString().padStart(2, "0"))}</span> <span${attr_class(clsx(cn(baseTickLineClass, "h-[14px]")))}></span></div>`;
      } else if (getDayOfWeek(dateValue, "en-US") === 0) {
        $$payload.out += "<!--[2-->";
        $$payload.out += `<div${attr_class(clsx(cn(baseTickClass, "")))}${attr_style(`position: absolute; left: ${stringify((index - selection.sliderValue[0]) * (1 / numTicks) * 100)}%; translate: -50%`)}><span${attr_class(clsx(cn(baseTickDayLabelClass, "text-neutral-11")), void 0, { "hidden": tickWidth < tickLabelThreshold })}${attr_style(`transform: translateX(${stringify(tickLabelTranslate)}px)`)}>${escape_html(dateValue.day.toString().padStart(2, "0"))}</span> <span${attr_class(clsx(cn(baseTickLineClass, "")))}></span></div>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<div${attr_class(clsx(cn(baseTickClass, "")))}${attr_style(`position: absolute; left: ${stringify((index - selection.sliderValue[0]) * (1 / numTicks) * 100)}%; translate: -50%`)}><span${attr_class(clsx(cn(baseTickDayLabelClass, "")), void 0, { "hidden": tickWidth < tickLabelThreshold })}${attr_style(`transform: translateX(${stringify(tickLabelTranslate)}px)`)}>${escape_html(dateValue.day.toString().padStart(2, "0"))}</span> <span${attr_class(clsx(cn(baseTickLineClass, "")))}></span></div>`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function RangeCalendarPane($$payload, $$props) {
  push();
  let { context, pane } = $$props;
  function calculateSectionLeft(sectionIndex) {
    return sectionIndex / (context.container.numSections + 1) * 100;
  }
  function calculateItemleft(startDate) {
    return calculateDeltaDays(startDate, context.timeline.beginSelection) / (context.container.numSections + 1) * 100;
  }
  function calculateItemWidth(endDate, startDate) {
    return Math.max(calculateDeltaDays(endDate, startDate) + 1, 0) / (context.container.numSections + 1) * 100;
  }
  function itemDepthToTopMargin(depth) {
    if (depth == 0) {
      return "mt-6";
    } else if (depth == 1) {
      return "mt-2";
    } else {
      return "mt-1";
    }
  }
  function calculateInfoPointLeft(itemStartDate, itemEndDate, infoPointDate) {
    return calculateDeltaDays(infoPointDate, itemStartDate) / (calculateDeltaDays(itemEndDate, itemStartDate) + 1) * 100;
  }
  let sectionWidthPx = context.container.width / (context.timeline.sliderValue[2] - context.timeline.sliderValue[0] + 1);
  function calendarItems($$payload2, items, depth = 0) {
    const each_array = ensure_array_like(items);
    $$payload2.out += `<!--[-->`;
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let item = each_array[$$index_1];
      const itemLeft = calculateItemleft(item.item.startDate);
      const itemWidth = calculateItemWidth(item.item.endDate, item.item.startDate);
      const roundedStart = item.item.startDate < context.timeline.beginSelection;
      const each_array_1 = ensure_array_like(item.item.infoPoints || []);
      $$payload2.out += `<li${spread_attributes({ ...item.attrs })}><div${attr_class(clsx(cn("relative flex flex-col rounded-sm border-2", roundedStart ? "rounded-l-none" : "", itemDepthToTopMargin(depth))))}${attr_style("", {
        left: `${stringify(itemLeft)}%`,
        height: `${stringify(context.container.sectionHeight)}px`,
        width: `${stringify(itemWidth)}%`,
        "background-color": item.item.fillColor,
        "border-color": item.item.borderColor
      })}><div class="flex h-[40%] w-full items-center"><span class="text-neutral-12 sticky left-0 flex items-center text-xs"><span class="text-neutral-12 ml-2">${escape_html(item.item.label)}</span> `;
      if (item.children?.length) {
        $$payload2.out += "<!--[-->";
        Icon($$payload2, {
          icon: iconIds.chevronRight,
          width: "1.25rem",
          class: cn("text-neutral-9 mx-1", item.expanded ? "rotate-90" : "")
        });
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<span class="bg-neutral-10 mx-2 h-[3px] w-[3px] rounded-lg"></span>`;
      }
      $$payload2.out += `<!--]--> <span class="text-neutral-11 mr-2 truncate">${escape_html(item.item.description || "")}</span></span></div> <div class="h-[1px] w-full"${attr_style("", { "background-color": item.item.borderColor })}></div> <div class="flex h-full w-full"><!--[-->`;
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let infoPointIcon = function($$payload3, icon) {
          if (icon) {
            $$payload3.out += "<!--[-->";
            Icon($$payload3, {
              color: item.item.borderColor,
              width: "1.25rem",
              icon,
              class: "mx-auto"
            });
          } else {
            $$payload3.out += "<!--[!-->";
            $$payload3.out += `<span class="mx-auto h-4 w-4 rounded-lg border"${attr_style("", {
              "background-color": item.item.itemColor,
              "border-color": item.item.borderColor
            })}></span>`;
          }
          $$payload3.out += `<!--]-->`;
        };
        let infoPoint = each_array_1[$$index];
        const infoPointLeft = calculateInfoPointLeft(item.item.startDate, item.item.endDate, infoPoint.date);
        $$payload2.out += `<div class="relative flex h-full items-center"${attr_style("", {
          left: `${stringify(infoPointLeft)}%`,
          width: `${stringify(sectionWidthPx)}px`
        })}>`;
        if (infoPoint.popup) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<div></div>`;
        } else {
          $$payload2.out += "<!--[!-->";
          infoPointIcon($$payload2, infoPoint.icon);
        }
        $$payload2.out += `<!--]--> <span class="text-neutral-12 hover: absolute ml-[30px] w-64 truncate text-xs underline underline-offset-[5px]"${attr_style("", { "text-decoration-color": item.item.borderColor })}>${escape_html(infoPoint.label)}</span></div>`;
      }
      $$payload2.out += `<!--]--></div></div> `;
      if (item.children?.length) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<ul${spread_attributes(
          {
            ...pane.tree.group,
            class: clsx(item.expanded ? "opacity-100" : "pointer-events-none h-0 opacity-0")
          }
        )}>`;
        calendarItems($$payload2, item.children, depth + 1);
        $$payload2.out += `<!----></ul>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--></li>`;
    }
    $$payload2.out += `<!--]-->`;
  }
  Scroll_area($$payload, {
    class: "h-full w-full",
    children: ($$payload2) => {
      const each_array_2 = ensure_array_like(context.container.sections);
      $$payload2.out += `<div class="relative h-full w-full overflow-hidden"><!--[-->`;
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let section = each_array_2[$$index_2];
        const tickLeft = calculateSectionLeft(section);
        const sectionEven = section % 2 == 0;
        $$payload2.out += `<div${attr_style("translate: -50%", { left: `${stringify(tickLeft)}%` })}${attr_class(`${stringify(sectionEven ? "bg-neutral-3" : "bg-neutral-2")} absolute h-full w-[2px]`)}></div>`;
      }
      $$payload2.out += `<!--]--> <ul${spread_attributes({ ...pane.tree.root })}>`;
      calendarItems($$payload2, pane.tree.children);
      $$payload2.out += `<!----></ul></div>`;
    },
    $$slots: { default: true }
  });
  pop();
}
function Toolbar_1($$payload, $$props) {
  push();
  let { context } = $$props;
  const viewSelectOptions = [
    { value: "plants", label: "Plants" },
    {
      value: "plantingWindows",
      label: "Planting Windows"
    },
    { value: "actions", label: "Actions" }
  ];
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Toolbar$1($$payload2, {
      class: "border-neutral-8 justify-center border-0 border-b md:justify-start",
      children: ($$payload3) => {
        $$payload3.out += `<!---->`;
        Root($$payload3, {
          type: "multiple",
          name: "calendarView",
          get value() {
            return context.config.value.viewPanesSelect;
          },
          set value($$value) {
            context.config.value.viewPanesSelect = $$value;
            $$settled = false;
          },
          children: ($$payload4) => {
            $$payload4.out += `<!---->`;
            Select_trigger($$payload4, {
              class: "w-1/4 rounded-none border-none",
              children: ($$payload5) => {
                $$payload5.out += `<!---->Panes`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> <!---->`;
            Select_content($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->`;
                Group($$payload5, {
                  children: ($$payload6) => {
                    const each_array = ensure_array_like(viewSelectOptions);
                    $$payload6.out += `<!--[-->`;
                    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                      let pane = each_array[$$index];
                      $$payload6.out += `<!---->`;
                      Select_item($$payload6, {
                        value: pane.value,
                        label: pane.label,
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->${escape_html(pane.label)}`;
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
  pop();
}
function RangeCalendar($$payload, $$props) {
  push();
  let { timeline, context } = $$props;
  $$payload.out += `<div class="flex h-full w-full flex-col"><div>`;
  Toolbar_1($$payload, { context });
  $$payload.out += `<!----></div> <div class="border-neutral-7 border-b">`;
  NoneditableSliderBar($$payload, {
    selection: timeline,
    width: context.container.width
  });
  $$payload.out += `<!----></div> <div class="flex-grow"><!---->`;
  Resizable_pane_group($$payload, {
    direction: "vertical",
    children: ($$payload2) => {
      if (context.config.value.viewPanesSelect.includes("plantingWindows")) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<!---->`;
        Pane($$payload2, {
          defaultSize: 1 / 3,
          minSize: 5,
          order: 0,
          children: ($$payload3) => {
            RangeCalendarPane($$payload3, {
              context,
              pane: context.getPane("plantingWindows")
            });
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
      if (context.config.value.viewPanesSelect.includes("plants")) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<!---->`;
        Pane($$payload2, {
          defaultSize: 1 / 3,
          minSize: 5,
          order: 1,
          children: ($$payload3) => {
            RangeCalendarPane($$payload3, { context, pane: context.getPane("plants") });
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
      if (context.config.value.viewPanesSelect.includes("actions")) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<!---->`;
        Pane($$payload2, {
          defaultSize: 1 / 3,
          minSize: 5,
          order: 2,
          children: ($$payload3) => {
            RangeCalendarPane($$payload3, { context, pane: context.getPane("actions") });
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
  $$payload.out += `<!----></div></div>`;
  pop();
}
const DEFAULT_SECTION_HEIGHT = 48;
function createCalendarContext(timeline, paneSpecs) {
  let config = localStore("verdagraphCalendarConfig", {
    viewPanesSelect: ["plants", "plantingWindows"],
    sectionHeight: 100
  });
  const container = createCalendarContainerContext(timeline, config);
  const panes = Object.fromEntries(paneSpecs.map((pane) => [
    pane.entityType,
    createCalendarPaneContext(pane)
  ]));
  function getPane(entityType) {
    return panes[entityType];
  }
  return {
    get config() {
      return config;
    },
    getPane,
    container,
    timeline,
    set config(newVal) {
      if (newVal.value.viewPanesSelect.length <= 1) {
        return;
      }
      config = newVal;
    }
  };
}
function createCalendarContainerContext(timeline, config) {
  let width = 0;
  const numSections = timeline.sliderValue[2] - timeline.sliderValue[0];
  const sectionHeight = DEFAULT_SECTION_HEIGHT * (config.value.sectionHeight / 100);
  const sections = Array.from({ length: numSections + 1 }, (_, index) => index);
  return {
    get width() {
      return width;
    },
    get numSections() {
      return numSections;
    },
    get sectionHeight() {
      return sectionHeight;
    },
    get sections() {
      return sections;
    },
    set width(newVal) {
      width = newVal;
    }
  };
}
function createCalendarPaneContext(spec) {
  let height = 0;
  const tree = new Tree$1({
    items: spec.items,
    expandOnClick: true,
    multiple: true
    //onSelectedChange: onSelectedChangeHandler
  });
  return {
    get height() {
      return height;
    },
    tree,
    set height(newVal) {
      height = newVal;
    }
  };
}
function DeleteForm($$payload) {
  $$payload.out += `<!---->delete`;
}
function GeneratorsForm($$payload) {
  $$payload.out += `<!---->generators`;
}
function GroupsForm($$payload) {
  $$payload.out += `<!---->plans`;
}
function LayoutConfigForm($$payload) {
}
function ObserveForm($$payload) {
  $$payload.out += `<!---->observe`;
}
function PatternsForm($$payload) {
  $$payload.out += `<!---->patterns`;
}
function PlantsCreateForm($$payload) {
  $$payload.out += `<!---->Add plants`;
}
function TranslateForm($$payload) {
  $$payload.out += `<!---->translate`;
}
const verdagraphTools = [
  {
    id: "plantsCreate",
    label: "Add Plants",
    ToolComponent: PlantsCreateForm
  },
  {
    id: "translate",
    label: "Translate",
    ToolComponent: TranslateForm
  },
  {
    id: "observe",
    label: "Observe",
    ToolComponent: ObserveForm
  },
  {
    id: "delete",
    label: "Delete",
    ToolComponent: DeleteForm
  },
  {
    id: "groups",
    label: "Plant Groups",
    ToolComponent: GroupsForm
  },
  {
    id: "patterns",
    label: "Patterns",
    ToolComponent: PatternsForm
  },
  {
    id: "generators",
    label: "Generators",
    ToolComponent: GeneratorsForm
  },
  {
    id: "layoutConfig",
    label: "Layout Config",
    ToolComponent: LayoutConfigForm
  }
];
const toolbox = createToolbox(verdagraphTools);
const verdagraphContextId = "verdagraphEditorContext";
const defaultTreeEnabled = isMobile() ? true : true;
const defaultContentPaneDirection = isMobile() ? "vertical" : "horizontal";
function createVerdagraphContext() {
  const timeline = createTimelineSelection();
  const config = localStore("verdagraphConfig", {
    treeEnabled: defaultTreeEnabled,
    calendarEnabled: true,
    layoutEnabled: true,
    contentPaneDirection: defaultContentPaneDirection
  });
  return {
    get treeEnabled() {
      return config.value.treeEnabled;
    },
    get calendarEnabled() {
      return config.value.calendarEnabled;
    },
    get layoutEnabled() {
      return config.value.layoutEnabled;
    },
    get contentPaneDirection() {
      return config.value.contentPaneDirection;
    },
    set treeEnabled(newVal) {
      if (newVal == false && config.value.layoutEnabled == false && config.value.calendarEnabled == false) {
        return;
      }
      config.value.treeEnabled = newVal;
    },
    set calendarEnabled(newVal) {
      if (newVal == false && config.value.treeEnabled == false && config.value.layoutEnabled == false) {
        return;
      }
      config.value.calendarEnabled = newVal;
    },
    set layoutEnabled(newVal) {
      if (newVal == false && config.value.treeEnabled == false && config.value.calendarEnabled == false) {
        return;
      }
      config.value.layoutEnabled = newVal;
    },
    set contentPaneDirection(newVal) {
      config.value.contentPaneDirection = newVal;
    },
    timeline
  };
}
function setVerdagraphContext() {
  return setContext(verdagraphContextId, createVerdagraphContext());
}
function getVerdagraphContext() {
  return getContext(verdagraphContextId);
}
function menuButton($$payload, label, iconId, onclick) {
  Menubar_item($$payload, {
    onclick,
    children: ($$payload2) => {
      $$payload2.out += `<div class="flex w-full items-center justify-between"><span>${escape_html(label)}</span> `;
      Icon($$payload2, { icon: iconId, width: "1rem" });
      $$payload2.out += `<!----></div>`;
    },
    $$slots: { default: true }
  });
}
function Toolbar($$payload, $$props) {
  push();
  const verdagraphContext = getVerdagraphContext();
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Menubar($$payload2, {
      class: "border-neutral-8 justify-center border-0 border-b md:justify-start",
      children: ($$payload3) => {
        Menu($$payload3, {
          children: ($$payload4) => {
            Menubar_trigger($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Select`;
              },
              $$slots: { default: true }
            });
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Menu($$payload3, {
          children: ($$payload4) => {
            Menubar_trigger($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Edit`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Menubar_content($$payload4, {
              children: ($$payload5) => {
                menuButton($$payload5, "Add", iconIds.verdagraphAddIcon, () => toolbox.activate("plantsCreate"));
                $$payload5.out += `<!----> `;
                menuButton($$payload5, "Translate", iconIds.verdagraphTranslateIcon, () => toolbox.activate("translate"));
                $$payload5.out += `<!----> `;
                menuButton($$payload5, "Delete", iconIds.verdagraphDeleteIcon, () => toolbox.activate("delete"));
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Menu($$payload3, {
          children: ($$payload4) => {
            Menubar_trigger($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Observe`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Menubar_content($$payload4, {
              children: ($$payload5) => {
                menuButton($$payload5, "Seed", iconIds.verdagraphRecordSeedIcon, () => toolbox.activate("observe"));
                $$payload5.out += `<!----> `;
                menuButton($$payload5, "Germination", iconIds.verdagraphRecorcGerminationicon, () => toolbox.activate("observe"));
                $$payload5.out += `<!----> `;
                menuButton($$payload5, "Harvest", iconIds.verdagraphRecordHarvestIcon, () => toolbox.activate("observe"));
                $$payload5.out += `<!----> `;
                menuButton($$payload5, "Expire", iconIds.verdagraphRecordExpireIcon, () => toolbox.activate("observe"));
                $$payload5.out += `<!----> `;
                menuButton($$payload5, "Transplant", iconIds.verdagraphRecordTransplantIcon, () => toolbox.activate("observe"));
                $$payload5.out += `<!----> `;
                menuButton($$payload5, "Note", iconIds.verdagraphRecordNoteIcon, () => toolbox.activate("observe"));
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Menu($$payload3, {
          children: ($$payload4) => {
            Menubar_trigger($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->Tools`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Menubar_content($$payload4, {
              children: ($$payload5) => {
                menuButton($$payload5, "Groups", iconIds.verdagraphGroupIcon, () => toolbox.activate("groups"));
                $$payload5.out += `<!----> `;
                menuButton($$payload5, "Patterns", iconIds.verdagraphPatternsIcon, () => toolbox.activate("patterns"));
                $$payload5.out += `<!----> `;
                menuButton($$payload5, "Generators", iconIds.verdagraphGeneratorsIcon, () => toolbox.activate("generators"));
                $$payload5.out += `<!---->`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!---->`;
          },
          $$slots: { default: true }
        });
        $$payload3.out += `<!----> `;
        Menu($$payload3, {
          children: ($$payload4) => {
            Menubar_trigger($$payload4, {
              children: ($$payload5) => {
                $$payload5.out += `<!---->View`;
              },
              $$slots: { default: true }
            });
            $$payload4.out += `<!----> `;
            Menubar_content($$payload4, {
              children: ($$payload5) => {
                Group$1($$payload5, {
                  children: ($$payload6) => {
                    Menubar_checkbox_item($$payload6, {
                      disabled: !verdagraphContext.treeEnabled && !verdagraphContext.calendarEnabled,
                      get checked() {
                        return verdagraphContext.layoutEnabled;
                      },
                      set checked($$value) {
                        verdagraphContext.layoutEnabled = $$value;
                        $$settled = false;
                      },
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
                    Menubar_checkbox_item($$payload6, {
                      disabled: !verdagraphContext.treeEnabled && !verdagraphContext.layoutEnabled,
                      get checked() {
                        return verdagraphContext.calendarEnabled;
                      },
                      set checked($$value) {
                        verdagraphContext.calendarEnabled = $$value;
                        $$settled = false;
                      },
                      children: ($$payload7) => {
                        $$payload7.out += `<div class="flex w-full items-center justify-between"><span>Calendar</span> `;
                        Icon($$payload7, {
                          icon: iconIds.verdagraphCalendarIcon,
                          width: "1rem"
                        });
                        $$payload7.out += `<!----></div>`;
                      },
                      $$slots: { default: true }
                    });
                    $$payload6.out += `<!----> `;
                    Menubar_checkbox_item($$payload6, {
                      disabled: !verdagraphContext.layoutEnabled && !verdagraphContext.calendarEnabled,
                      get checked() {
                        return verdagraphContext.treeEnabled;
                      },
                      set checked($$value) {
                        verdagraphContext.treeEnabled = $$value;
                        $$settled = false;
                      },
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
                    $$payload6.out += `<!----> `;
                    Sub($$payload6, {
                      children: ($$payload7) => {
                        Menubar_sub_trigger($$payload7, {
                          children: ($$payload8) => {
                            $$payload8.out += `<!---->Direction`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload7.out += `<!----> `;
                        Menubar_sub_content($$payload7, {
                          children: ($$payload8) => {
                            RadioGroup($$payload8, {
                              get value() {
                                return verdagraphContext.contentPaneDirection;
                              },
                              set value($$value) {
                                verdagraphContext.contentPaneDirection = $$value;
                                $$settled = false;
                              },
                              children: ($$payload9) => {
                                Menubar_radio_item($$payload9, {
                                  value: "horizontal",
                                  children: ($$payload10) => {
                                    $$payload10.out += `<!---->Horizontal`;
                                  },
                                  $$slots: { default: true }
                                });
                                $$payload9.out += `<!----> `;
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
                Menubar_separator($$payload5, {});
                $$payload5.out += `<!----> `;
                Menubar_item($$payload5, {
                  onclick: () => {
                    toolbox.activate("layoutConfig");
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
      },
      $$slots: { default: true }
    });
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
function Calendar($$payload, $$props) {
  push();
  const verdagraphContext = getVerdagraphContext();
  const calendarContext = createCalendarContext(verdagraphContext.timeline, [
    { entityType: "plants", items: () => [] },
    {
      entityType: "plantingWindows",
      items: () => {
        return [
          {
            id: "1",
            label: "Tomato",
            description: "Garden - Planting Window",
            startDate: new CalendarDate(2025, 2, 10),
            endDate: new CalendarDate(2025, 7, 30),
            fillColor: getColor("tomato", 4, mode.value),
            borderColor: getColor("tomato", 7, mode.value),
            itemColor: getColor("tomato", 5, mode.value),
            infoPoints: [
              {
                label: "this is really a mf label yes haha",
                date: new CalendarDate(2025, 2, 11),
                icon: iconIds.cultivarsIcon
              },
              {
                label: "also a label",
                date: new CalendarDate(2025, 2, 18)
              },
              {
                label: "also a label",
                date: new CalendarDate(2025, 2, 18)
              }
            ]
          },
          {
            id: "2",
            label: "Lettuce",
            description: "Planting Windows",
            startDate: new CalendarDate(2025, 2, 20),
            endDate: new CalendarDate(2025, 8, 30),
            fillColor: getColor("grass", 4, mode.value),
            borderColor: getColor("grass", 7, mode.value),
            itemColor: getColor("grass", 5, mode.value),
            children: [
              {
                id: "2a",
                label: "Lettuce",
                description: "Garden - Planting Window",
                startDate: new CalendarDate(2025, 2, 20),
                endDate: new CalendarDate(2025, 4, 28),
                fillColor: getColor("green", 4, mode.value),
                borderColor: getColor("green", 7, mode.value),
                itemColor: getColor("green", 5, mode.value)
              },
              {
                id: "2b",
                label: "Lettuce",
                description: "Environment 2 - Planting Window",
                startDate: new CalendarDate(2025, 2, 22),
                endDate: new CalendarDate(2025, 8, 30),
                fillColor: getColor("lime", 4, mode.value),
                borderColor: getColor("lime", 7, mode.value),
                itemColor: getColor("lime", 5, mode.value)
              }
            ]
          },
          {
            id: "3",
            label: "Beet",
            description: "Garden - Planting Window",
            startDate: new CalendarDate(2025, 2, 5),
            endDate: new CalendarDate(2025, 2, 23),
            fillColor: getColor("purple", 4, mode.value),
            borderColor: getColor("purple", 7, mode.value),
            itemColor: getColor("purple", 5, mode.value)
          }
        ];
      }
    },
    { entityType: "actions", items: () => [] }
  ]);
  RangeCalendar($$payload, {
    timeline: verdagraphContext.timeline,
    context: calendarContext
  });
  pop();
}
function Layout($$payload) {
  $$payload.out += `<!---->Layout`;
}
function Tree($$payload) {
  $$payload.out += `<!---->Tree`;
}
function Verdagraph($$payload, $$props) {
  push();
  const verdagraphContext = setVerdagraphContext();
  $$payload.out += `<div class="bg-neutral-1 flex h-full flex-col">`;
  Toolbar($$payload);
  $$payload.out += `<!----> <div class="overflow-none grow">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    Resizable_pane_group($$payload, {
      direction: verdagraphContext.contentPaneDirection,
      children: ($$payload2) => {
        if (verdagraphContext.layoutEnabled) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<!---->`;
          Pane($$payload2, {
            defaultSize: 30,
            minSize: 5,
            order: 0,
            children: ($$payload3) => {
              Layout($$payload3);
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
        if (verdagraphContext.calendarEnabled) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<!---->`;
          Pane($$payload2, {
            defaultSize: 30,
            minSize: 5,
            order: 1,
            children: ($$payload3) => {
              Calendar($$payload3);
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
        if (toolbox.isActive) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<!---->`;
          Pane($$payload2, {
            defaultSize: 15,
            minSize: 5,
            order: 2,
            children: ($$payload3) => {
              TabToolbox($$payload3, { toolbox });
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
        if (verdagraphContext.treeEnabled) {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<!---->`;
          Pane($$payload2, {
            defaultSize: 25,
            minSize: 5,
            order: 3,
            children: ($$payload3) => {
              Tree($$payload3);
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
  TimelineSelector($$payload, { selection: verdagraphContext.timeline });
  $$payload.out += `<!----></div></div>`;
  pop();
}
function _page($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Verdagraph - Verdagraph</title>`;
  });
  Verdagraph($$payload);
}
export {
  _page as default
};
