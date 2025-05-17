import "clsx";
import { p as push, n as escape_html, a as pop, c as spread_attributes, q as attr_class, d as bind_props, j as stringify, g as spread_props, m as ensure_array_like, e as copy_payload, f as assign_payload, x as store_mutate, v as store_get, w as unsubscribe_stores, s as setContext, l as getContext } from "./index2.js";
import "./client.js";
import { I as Input, F as Form_field, C as Control, a as Form_field_errors, b as Form_label, c as Form_button, s as superForm, z as zod, d as defaults } from "./zod.js";
import "./stringify.js";
import { c as plantingAreaCreate } from "./commands.js";
import { c as createCommandHandler } from "./commandHandler.svelte.js";
import { i as isMobile, S as SvelteSet } from "./isMobile.svelte.js";
import { L as LocalStore, l as localStore, g as getColor, c as createToolbox, a as createTimelineSelection } from "./tools.svelte.js";
import { c as derivedMode, B as Button } from "./button.js";
import "./use-id.js";
import Konva from "konva";
import { A as AppError, w as workspaceFields } from "./auth.svelte.js";
import { I as Icon } from "./Icon.js";
import { i as iconIds } from "./icons.js";
import { R as Root, T as Trigger, d as Popover_content } from "./index3.js";
import { R as Root$1, S as Select_trigger, a as Select_content, G as Group, b as Select_item } from "./index7.js";
import "./client2.js";
import { T as Textarea } from "./commands2.js";
import { S as Separator } from "./separator.js";
import { B as Button$1 } from "./button2.js";
function roundToDecimalPlaces(num, places) {
  const factor = 10 ** places;
  return Math.round(num * factor) / factor;
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
function createCanvasContext(canvasContextId, canvasWorkspaceId, mode, draggable = true, strokeScale = true) {
  const canvasId = canvasContextId;
  const workspaceId = canvasWorkspaceId;
  const container = createCanvasContainer(canvasId);
  const transform = createCanvasTransform(container, draggable, strokeScale);
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
      return workspaceId;
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
function FormInfoPopover($$payload, $$props) {
  push();
  let { description } = $$props;
  $$payload.out += `<!---->`;
  Root($$payload, {
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
          Group($$payload3, {
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
function createSelection() {
  const selection = new SvelteSet();
  const onSelectionChangeHandlers = [];
  function has(entityId) {
    return selection.has(entityId);
  }
  function select(entityId) {
    if (has(entityId)) return;
    selection.add(entityId);
    onSelectionChangeHandlers.forEach((handler) => handler([entityId], []));
  }
  function deselect(entityId) {
    if (!has(entityId)) return;
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
    has,
    select,
    deselect,
    reset,
    addSelectionChangeHandler
  };
}
function createSelectionManager(entityTypes) {
  let tool = "pointer";
  const selections = Object.fromEntries(entityTypes.map((entity) => [entity, createSelection()]));
  function get(entityType) {
    return selections[entityType].selection;
  }
  function has(entityType, entityId) {
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
    get,
    has,
    select,
    deselect,
    reset,
    resetAll,
    addSelectionChangeHandler
  };
}
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
const _rune = new LocalStore("userSettings", {
  units: {
    distance: "metric",
    temperature: "metric",
    mass: "metric",
    volume: "metric"
  }
});
const userSettings = {
  get value() {
    return _rune.value;
  },
  set value(newVal) {
    _rune.value = newVal;
  }
};
function PlantingAreaCreateForm($$payload, $$props) {
  push();
  var $$store_subs;
  const workspaceContext = getWorkspaceContext();
  const form = workspaceContext.plantingAreaCreateForm.form;
  const handler = workspaceContext.plantingAreaCreateForm.handler;
  const { form: formData, enhance } = form;
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
                initialUnitSystem: userSettings.value.units["distance"],
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
                  initialUnitSystem: userSettings.value.units["distance"],
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
                  initialUnitSystem: userSettings.value.units["distance"],
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
                  initialUnitSystem: userSettings.value.units["distance"],
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
                  initialUnitSystem: userSettings.value.units["distance"],
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
                  initialUnitSystem: userSettings.value.units["distance"],
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
                    initialUnitSystem: userSettings.value.units["distance"],
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
                initialUnitSystem: userSettings.value.units["distance"],
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
const toolbox = createToolbox(workspaceTools);
const workspaceContextId = "workspaceEditorContext";
const workspaceLayoutCanvasContextId = "workspaceLayoutCanvas";
const defaultTreeEnabled = isMobile() ? true : true;
const defaultContentPaneDirection = isMobile() ? "vertical" : "horizontal";
function createWorkspaceContext() {
  let activeWorkspaceId = null;
  let editing = false;
  const selections = createSelectionManager(["plantingArea", "environment"]);
  const config = localStore("workspaceConfig", {
    treeEnabled: defaultTreeEnabled,
    layoutEnabled: true,
    contentPaneDirection: defaultContentPaneDirection
  });
  const timelineSelection = createTimelineSelection();
  const plantingAreaCreateHandler = createCommandHandler(plantingAreaCreate.mutation, {
    onSuccess: () => {
      toolbox.deactivate("plantingAreaCreate");
    }
  });
  const plantingAreaCreateSuperform = superForm(defaults(zod(plantingAreaCreate.schema)), {
    SPA: true,
    dataType: "json",
    validators: zod(plantingAreaCreate.schema),
    onUpdate({ form }) {
      if (form.valid) {
        plantingAreaCreateHandler.execute(form.data);
      }
    },
    onChange() {
      plantingAreaCreateHandler.reset();
    }
  });
  function reset() {
    activeWorkspaceId = null;
    editing = false;
    selections.resetAll();
    plantingAreaCreateSuperform.reset();
    const canvas = getContext(workspaceLayoutCanvasContextId);
    if (canvas) {
      canvas.destroy();
      setContext(workspaceLayoutCanvasContextId, null);
    }
  }
  function setWorkspace(id) {
    reset();
    activeWorkspaceId = id;
    setContext(workspaceLayoutCanvasContextId, createCanvasContext(workspaceLayoutCanvasContextId, id));
  }
  return {
    get id() {
      return activeWorkspaceId;
    },
    get editing() {
      return editing;
    },
    get treeEnabled() {
      return config.value.treeEnabled;
    },
    get layoutEnabled() {
      return config.value.layoutEnabled;
    },
    get contentPaneDirection() {
      return config.value.contentPaneDirection;
    },
    get layoutCanvasContext() {
      return getContext(workspaceLayoutCanvasContextId);
    },
    set editing(newVal) {
      editing = newVal;
    },
    set treeEnabled(newVal) {
      if (newVal == false && config.value.layoutEnabled == false) {
        return;
      }
      config.value.treeEnabled = newVal;
    },
    set layoutEnabled(newVal) {
      if (newVal == false && config.value.treeEnabled == false) {
        return;
      }
      config.value.layoutEnabled = newVal;
    },
    set contentPaneDirection(newVal) {
      config.value.contentPaneDirection = newVal;
    },
    timelineSelection,
    selections,
    plantingAreaCreateForm: {
      handler: plantingAreaCreateHandler,
      form: plantingAreaCreateSuperform
    },
    reset,
    setWorkspace
  };
}
function setWorkspaceContext() {
  return setContext(workspaceContextId, createWorkspaceContext());
}
function getWorkspaceContext() {
  return getContext(workspaceContextId);
}
export {
  CoordinateInput as C,
  FormInfoPopover as F,
  GeometrySelect as G,
  UnitAwareInput as U,
  createUnitAwareValues as c,
  getWorkspaceContext as g,
  setWorkspaceContext as s,
  toolbox as t
};
