import { p as push, u as getContext, n as attr, m as pop, s as setContext, t as hasContext, x as spread_attributes, F as clsx, y as bind_props, C as ensure_array_like, G as element, z as spread_props, A as copy_payload, B as assign_payload, q as head, I as attr_class, D as escape_html } from "../../chunks/index.js";
import { o as onDestroy, I as Icon$1 } from "../../chunks/Icon.js";
import "clsx";
import { c as derivedMode } from "../../chunks/states.svelte.js";
import Konva from "konva";
import { skyDark, sky, mintDark, mint, limeDark, lime, yellowDark, yellow, amberDark, amber, orangeDark, orange, brownDark, brown, goldDark, gold, bronzeDark, bronze, grassDark, grass, greenDark, green, jadeDark, jade, tealDark, teal, cyanDark, cyan, blueDark, blue, indigoDark, indigo, irisDark, iris, violetDark, violet, purpleDark, purple, plumDark, plum, pinkDark, pink, crimsonDark, crimson, rubyDark, ruby, redDark, red, tomatoDark, tomato, sandDark, sand, oliveDark, olive, sageDark, sage, slateDark, slate, mauveDark, mauve, grayDark, gray } from "@radix-ui/colors";
import { Schema, or } from "@triplit/client";
import z$1, { z } from "zod";
import { c as cn, B as Button, e as env } from "../../chunks/env.js";
import { L as Logo } from "../../chunks/logo.js";
function Canvas($$payload, $$props) {
  push();
  let { canvasId, children } = $$props;
  const canvas = getContext(canvasId);
  $$payload.out += `<div class="relative h-full w-full"><div${attr("id", canvasId)} class="absolute left-[0.5px] top-0 h-full w-full">`;
  if (canvas.container.initialized) {
    $$payload.out += "<!--[-->";
    children($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="pointer-events-none absolute left-[0.5px] top-0 z-10 h-full w-full">`;
  $$payload.out += `<!----></div></div>`;
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
const MOBILE_BREAKPOINT = 768;
const isMobile = () => {
  return window.innerWidth < MOBILE_BREAKPOINT;
};
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
const sowToGermSchema = z.number().min(0, "May not be negative.").describe("The expected amount of days from starting a seed to its germination.");
const germToTransplantSchema = z.number().min(0, "May not be negative.").describe(
  "The expected amount of days from the germination of a seed to when it will be ready for transplant.             For cultivars which are not able to be transplanted, this value is unused."
);
const germToFirstHarvestSchema = z.number().min(0, "May not be negative.").describe(
  "The expected amount of days the germination of a seed to when it will be ready for a harvest."
);
const firstToLastHarvestSchema = z.number().min(0, "May not be negative.").describe(
  "The expected amount of days the first and last harvest of a plant.             For plants which only have one harvest, this value is zero."
);
const AnnualLifecycleUpdateCommandSchema = z.object({
  sowToGerm: sowToGermSchema.optional(),
  germToTransplant: germToTransplantSchema.optional(),
  germToFirstHarvest: germToFirstHarvestSchema.optional(),
  firstToLastHarvest: firstToLastHarvestSchema.optional()
}).describe(
  "The annual lifecycle defines the length of the stages of life for annual plants."
);
const AnnualLifeCycleProfile = Schema.Record({
  sowToGerm: Schema.Optional(Schema.Number()),
  germToTransplant: Schema.Optional(Schema.Number()),
  germToFirstHarvest: Schema.Optional(Schema.Number()),
  firstToLastHarvest: Schema.Optional(Schema.Number())
});
const lastFrostWindowOpenSchema = z.number().describe(
  "The amount of days between the last frost and the beginning of the planting window. 			Positive values indicate the window begins after the last frost date. 			For example, a value of -15 indicates the cultivar may be planted 15 days before the last frost date."
);
const lastFrostWindowCloseSchema = z.number().describe(
  "The amount of days between the last frost and the end of the planting window. 			Positive values indicate the window begins after the last frost date. 			For example, a value of 15 indicates the cultivar must be planted before 15 days after the last frost date."
);
const firstFrostWindowOpenSchema = z.number().describe(
  "The amount of days between the first frost and the beginning of the planting window. 			Positive values indicate the window begins after the first frost date. 			For example, a value of -15 indicates the cultivar may be planted 15 days before the first frost date."
);
const firstFrostWindowCloseSchema = z.number().describe(
  "The amount of days between the first frost and the end of the planting window. 			Positive values indicate the window begins after the first frost date. 			For example, a value of 15 indicates the cultivar must be planted before 15 days after the first frost date."
);
const FrostDatePlantingWindowsUpdateCommandSchema = z.object({
  lastFrostWindowOpen: lastFrostWindowOpenSchema.optional(),
  lastFrostWindowClose: lastFrostWindowCloseSchema.optional(),
  firstFrostWindowOpen: firstFrostWindowOpenSchema.optional(),
  firstFrostWindowClose: firstFrostWindowCloseSchema.optional()
}).describe(
  "A planting window defines a period of time within an environment that a cultivar should be planted. 		These attributes define an allowed planting window of time relative to the first and last frost dates. 		These planting windows are used for incdicating within the Verdagraph when plants are suggested to be planted."
);
const FrostDatePlantingWindowsProfile = Schema.Record({
  lastFrostWindowOpen: Schema.Optional(Schema.Number()),
  lastFrostWindowClose: Schema.Optional(Schema.Number()),
  firstFrostWindowOpen: Schema.Optional(Schema.Number()),
  firstFrostWindowClose: Schema.Optional(Schema.Number())
});
const transplantableSchema = z.boolean().describe(
  "Defines whether a plant may be started as a seed in one location and transplanted to another. 		Some plants, such as carrots, don't tolerate transplants, and so must be started directly."
);
const OriginUpdateCommandSchema = z.object({
  transplantable: transplantableSchema.optional()
}).describe("The origin refers to the method used to create plants.");
const OriginProfile = Schema.Record({
  transplantable: Schema.Optional(Schema.Boolean())
});
const CultivarAttributes = Schema.Record({
  annualLifeCycle: Schema.Optional(AnnualLifeCycleProfile),
  frostDatePlantingWindows: Schema.Optional(
    FrostDatePlantingWindowsProfile
  ),
  origin: Schema.Optional(OriginProfile)
});
z.object({
  annualLifeCycle: AnnualLifecycleUpdateCommandSchema.optional(),
  frostDatePlantingWindows: FrostDatePlantingWindowsUpdateCommandSchema.optional(),
  osrigin: OriginUpdateCommandSchema.optional()
});
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
const nameSchema = z$1.string().trim().min(2, "Must be at least 3 characters.").max(50, "May be at most 50 characters.").regex(
  /[0-9A-Za-z _-]+/,
  "Must contain only letters, numbers, spaces, underscores, and hyphens."
);
const descriptionSchema = z$1.string().max(1400, "May be at most 1400 characters.");
const commonFields = { nameSchema, descriptionSchema };
const usernameSchema = z$1.string().trim().min(3, "Must be at least 3 characters.").max(50, "May be at most 50 characters.").regex(
  /^[a-zA-Z0-9-_]*$/,
  "Must contain only letters, numbers, hyphens, and underscores."
).describe(
  "Unique username to identify yourself in the application. May be changed later."
);
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
const gardenDescriptionSchema = commonFields.descriptionSchema.describe(
  "Optional description."
);
const gardenVisibilitySchema = z$1.enum(GardenVisibilityEnumOptions);
const gardenMembershipRoleSchema = z$1.enum(GardenMembershipRoleEnumOptions);
const usernameInvitesListSchema = z$1.array(userFields.usernameSchema).max(10, "A maximum of 10 users can be invited at once.");
z$1.object({
  id: gardenIdSchema,
  name: gardenNameSchema,
  description: gardenDescriptionSchema.default(""),
  visibility: gardenVisibilitySchema.default("HIDDEN"),
  adminInvites: usernameInvitesListSchema.describe(
    "A list of usernames to invite as admins. A maximum of 10 users can be invited at once."
  ).default([]),
  editorInvites: usernameInvitesListSchema.describe(
    "A list of usernames to invite as editors. A maximum of 10 users can be invited at once."
  ).default([]),
  viewerInvites: usernameInvitesListSchema.describe(
    "A list of usernames to invite as viewers. A maximum of 10 users can be invited at once."
  ).default([])
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
const minimumAnnualTempSchema = z.number().describe(
  "The minimum temperature that is expected to occur within a year in the environment."
);
const maximumAnnualTempSchema = z.number().describe(
  "The maxmium temperature that is expected to occur within a year in the environment."
);
const AnnualTemperatureUpdateCommandSchema = z.object({
  minimum: minimumAnnualTempSchema.optional(),
  maximum: maximumAnnualTempSchema.optional()
}).describe("Defines the expected range of temperatures over a year.");
const AnnualTemperatureProfile = Schema.Record({
  minimum: Schema.Optional(Schema.Number()),
  maximum: Schema.Optional(Schema.Number())
});
const lastFrostDateSchema = z.date().describe(
  "The date within the environment when the last frost of the year is expected to occur."
);
const firstFrostDateSchema = z.date().describe(
  "The date within the environment when the first frost of the year is expected to occur."
);
const FrostDatesUpdateCommandSchema = z.object({
  lastFrostDate: lastFrostDateSchema.optional(),
  firstFrostDate: firstFrostDateSchema.optional()
}).describe(
  "Defines when the first and last frost are expected to occur within a year."
);
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
Schema.Collections({
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
const workspaceNameSchema = commonFields.nameSchema.describe(
  "Name of the workspace. Must be unique within a garden."
);
const workspaceDescriptionSchema = commonFields.descriptionSchema.describe(
  "Optional description."
);
const plantingAreaNameSchema = commonFields.nameSchema.describe(
  "The name of the planting area."
);
const plantingAreaDescriptionSchema = commonFields.descriptionSchema.describe(
  "Optional description."
);
const plantingAreaDepthSchema = z$1.number().min(0, "May not be negative").max(1e3, "May be at most 1000m.").describe("The depth of the planting area.");
const coordinateXSchema = z$1.number().min(-1e6, "Limited to 1 000 000 meters.").max(1e6, "Limited to 1 000 000 meters.").describe("The horizontal X component of the coordinate.");
const coordinateYSchema = z$1.number().min(-1e6, "Limited to 1 000 000 meters.").max(1e6, "Limited to 1 000 000 meters.").describe("The vertical Y component of the coordinate.");
const coordinateSchema = z$1.object({
  x: coordinateXSchema,
  y: coordinateYSchema
}).describe("A position relative to the origin of a workspace or a geometry.");
const locationDateSchema = z$1.date().describe("The date at which the location applies.");
const geometryTypeSchema = z$1.enum(GeometryTypeEnumOptions).describe(
  "Describes the type of geometry. Each type has a unique set of attributes associated with it."
);
const geometryDateSchema = z$1.date().describe("The date at which the geometry applies to the object.");
const geometryScaleFactorSchema = z$1.number().min(0.01, "Must be at least 1%.").max(100, "May be at most 10000%").describe(
  "Factor used to scale the geometry up or down. Must be within 1 and 1000 percent."
);
const geometryRotationSchema = z$1.number().min(-360, "Must be at least negative 360 degrees.").max(360, "May be at most 360 degrees.").describe(
  "The rotation of the geometry in degrees. Must be between 0 and 360 degrees."
);
const geometryRectangleLengthSchema = z$1.number().min(0.01, "May not be negative or zero.").max(1e3, "May be at most 1000m").describe("The horizontal, or x-axis length of the rectangle.");
const geometryRectangleWidthSchema = z$1.number().min(0.01, "May not be negative or zero.").max(1e3, "May be at most 1000m").describe("The vertical, or y-axis width of the rectangle.");
const geometryPolygonNumSidesSchema = z$1.number().min(3, "Must have at least 3 sides.").max(20, "May have at most 20 sides.").describe("The amount of sides the polygon has.");
const geometryPolygonRadiusSchema = z$1.number().min(0.01, "May not be negative or zero.").max(1e3, "May be at most 1000m").describe("The distance from the center to any vertex of the polygon.");
const geometryEllipseLengthSchema = z$1.number().min(0.01, "May not be negative or zero.").max(1e3, "May be at most 1000m.").describe("The horizontal, or x-axis diameter of the ellipse.");
const geometryEllipseWidthSchema = z$1.number().min(0.01, "May not be negative or zero.").max(1e3, "May be at most 1000m").describe(
  "The vertical, or y-axis diameter of the ellipse. Must be between 0 and 1000 meters."
);
const geometryLinesCoordinatesSchema = z$1.array(coordinateSchema).min(3, "Must have at least 3 points.").describe(
  "A list of coordinates relative to the position of the geometry which define an irregular polygonal."
);
const geometryLinesClosedSchema = z$1.boolean().describe("If true, the line segments form a closed shape.");
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
z$1.object({
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
const cultivarNameSchema = z.string().trim().min(3, "Must be at least 3 characters.").max(30, "May be at most 30 characters.").regex(
  /^[0-9A-Za-z _-]+$/,
  "Must contain only letters, numbers, spaces, hyphens, and underscores."
).describe("A common name of this plant species.");
const cultivarNamesSchema = z.array(cultivarNameSchema).min(1, "Must contain at least 1 name.").max(10, "May contain at most 10 names.").describe("A set of common names associated with this plant species.");
const cultivarAbbreviationSchema = z.string().trim().min(1, "Must be at least 1 character.").max(6, "May be at most 6 characters.").regex(/^[0-9A-Za-z]+$/, "Must contain only alphanumeric characters.").describe("A very short abbreviation for this plant species.");
const cultivarScientificNameSchema = z.string().trim().max(60, "May be at most 60 characters.").describe("The scientific name of this plant species.");
const cultivarDescriptionSchema = commonFields.descriptionSchema.describe(
  "Optional description."
);
const cultivarCollectionNameSchema = commonFields.descriptionSchema.describe(
  "The name of the collection."
);
const cultivarCollectionDescriptionSchema = commonFields.descriptionSchema.describe(
  "Optional description."
);
const cultivarCollectionVisibilitySchema = z.enum(CultivarCollectionVisibilityEnumOptions).describe(
  "Public collections may be viewed by anyone and are publicly searchable.             Unlisted collections may be viewed by anyone with the link.             Private collections may only be accessed by the creator or members of the associated garden."
);
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
const environmentNameSchema = commonFields.nameSchema.describe(
  "Name of the environment. Must be unique."
);
const environmentDescriptionSchema = commonFields.descriptionSchema.describe(
  "Optional description."
);
const environmentParentTypeSchema = z.enum(EnvironmentParentTypeEnumOptions);
z.object({
  gardenId: z.string(),
  parendId: z.string(),
  parentType: environmentParentTypeSchema.default("GARDEN"),
  name: environmentNameSchema,
  description: environmentDescriptionSchema.default("")
});
function EditableGeometryResizePoints($$payload, $$props) {
  push();
  let {
    canvasId,
    geometry,
    geometryGroup
  } = $$props;
  getContext(canvasId);
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
    geometry,
    editable
  } = $$props;
  const canvas = getContext(canvasId);
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
  getColor("brown", 10, canvas.mode.current);
  getColor("brown", 3, canvas.mode.current);
  getColor("brown", 11, canvas.mode.current);
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
  let canvas = getContext(canvasId);
  canvas.container.addLayer(plantingAreaLayerId);
  children($$payload);
  $$payload.out += `<!---->`;
  pop();
}
const EMBLA_CAROUSEL_CONTEXT = Symbol("EMBLA_CAROUSEL_CONTEXT");
function setEmblaContext(config) {
  setContext(EMBLA_CAROUSEL_CONTEXT, config);
  return config;
}
function getEmblaContext(name = "This component") {
  if (!hasContext(EMBLA_CAROUSEL_CONTEXT)) {
    throw new Error(`${name} must be used within a <Carousel.Root> component`);
  }
  return getContext(EMBLA_CAROUSEL_CONTEXT);
}
function Carousel_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const emblaCtx = getEmblaContext("<Carousel.Content/>");
  $$payload.out += `<div class="h-full w-full overflow-hidden"><div${spread_attributes(
    {
      class: clsx(cn("flex", emblaCtx.orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)),
      "data-embla-container": "",
      ...restProps
    }
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div></div>`;
  bind_props($$props, { ref });
  pop();
}
function Carousel_item($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const emblaCtx = getEmblaContext("<Carousel.Item/>");
  $$payload.out += `<div${spread_attributes(
    {
      role: "group",
      "aria-roledescription": "slide",
      class: clsx(cn("min-w-0 shrink-0 grow-0 basis-full", emblaCtx.orientation === "horizontal" ? "pl-4" : "pt-4", className)),
      "data-embla-slide": "",
      ...restProps
    }
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
/**
 * @license @lucide/svelte v0.510.0 - ISC
 *
 * ISC License
 * 
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 * 
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
  push();
  const {
    name,
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth = false,
    iconNode = [],
    children,
    $$slots,
    $$events,
    ...props
  } = $$props;
  const each_array = ensure_array_like(iconNode);
  $$payload.out += `<svg${spread_attributes(
    {
      ...defaultAttributes,
      ...props,
      width: size,
      height: size,
      stroke: color,
      "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      class: clsx([
        "lucide-icon lucide",
        name && `lucide-${name}`,
        props.class
      ])
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
  $$payload.out += `<!--]-->`;
  children?.($$payload);
  $$payload.out += `<!----></svg>`;
  pop();
}
function Arrow_right($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "M5 12h14" }],
    ["path", { "d": "m12 5 7 7-7 7" }]
  ];
  Icon($$payload, spread_props([
    { name: "arrow-right" },
    props,
    {
      iconNode,
      children: ($$payload2) => {
        props.children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function Carousel_next($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    variant = "outline",
    size = "icon",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const emblaCtx = getEmblaContext("<Carousel.Next/>");
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Button($$payload2, spread_props([
      {
        variant,
        size,
        class: cn("absolute size-8 touch-manipulation rounded-full", emblaCtx.orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", className),
        disabled: !emblaCtx.canScrollNext,
        onclick: emblaCtx.scrollNext,
        onkeydown: emblaCtx.handleKeyDown
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
          Arrow_right($$payload3, { class: "size-4" });
          $$payload3.out += `<!----> <span class="sr-only">Next slide</span>`;
        },
        $$slots: { default: true }
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
function Arrow_left($$payload, $$props) {
  push();
  let { $$slots, $$events, ...props } = $$props;
  const iconNode = [
    ["path", { "d": "m12 19-7-7 7-7" }],
    ["path", { "d": "M19 12H5" }]
  ];
  Icon($$payload, spread_props([
    { name: "arrow-left" },
    props,
    {
      iconNode,
      children: ($$payload2) => {
        props.children?.($$payload2);
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function Carousel_previous($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    variant = "outline",
    size = "icon",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const emblaCtx = getEmblaContext("<Carousel.Previous/>");
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Button($$payload2, spread_props([
      {
        variant,
        size,
        class: cn("absolute size-8 touch-manipulation rounded-full", emblaCtx.orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className),
        disabled: !emblaCtx.canScrollPrev,
        onclick: emblaCtx.scrollPrev,
        onkeydown: emblaCtx.handleKeyDown
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
          Arrow_left($$payload3, { class: "size-4" });
          $$payload3.out += `<!----> <span class="sr-only">Previous slide</span>`;
        },
        $$slots: { default: true }
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
function Carousel($$payload, $$props) {
  push();
  let {
    opts = {},
    plugins = [],
    setApi = () => {
    },
    orientation = "horizontal",
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let carouselState = {
    api: void 0,
    scrollPrev,
    scrollNext,
    orientation,
    canScrollNext: false,
    canScrollPrev: false,
    handleKeyDown,
    options: opts,
    plugins,
    onInit,
    scrollSnaps: [],
    selectedIndex: 0,
    scrollTo
  };
  setEmblaContext(carouselState);
  function scrollPrev() {
    carouselState.api?.scrollPrev();
  }
  function scrollNext() {
    carouselState.api?.scrollNext();
  }
  function scrollTo(index, jump) {
    carouselState.api?.scrollTo(index, jump);
  }
  function handleKeyDown(e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollNext();
    }
  }
  function onInit(event) {
    carouselState.api = event.detail;
    carouselState.scrollSnaps = carouselState.api.scrollSnapList();
  }
  $$payload.out += `<div${spread_attributes(
    {
      class: clsx(cn("relative", className)),
      role: "region",
      "aria-roledescription": "carousel",
      ...restProps
    }
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  pop();
}
function WorkspaceGeometry($$payload, $$props) {
  push();
  const canvas = createCanvasContext("workspaceGeometryCanvasId", "none", derivedMode, false, false);
  canvas.container.pixelsPerMeter = 1;
  const canvasId = canvas.canvasId;
  setContext(canvasId, canvas);
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  canvas.container.addResizeFunction(() => {
    canvas.transform.position = {
      x: canvas.container.width / 2,
      y: canvas.container.height / 2
    };
    canvas.container.stage?.getChildren().forEach((layer) => {
      layer.getChildren().forEach((shape) => {
        const rect = shape.getClientRect();
        const corners = [
          { x: rect.x, y: rect.y },
          // Top-left
          { x: rect.x + rect.width, y: rect.y },
          // Top-right
          { x: rect.x, y: rect.y + rect.height },
          // Bottom-left
          {
            x: rect.x + rect.width,
            y: rect.y + rect.height
          }
          // Bottom-right
        ];
        corners.forEach((corner) => {
          if (corner.x < minX) minX = corner.x;
          if (corner.y < minY) minY = corner.y;
          if (corner.x > maxX) maxX = corner.x;
          if (corner.y > maxY) maxY = corner.y;
        });
      });
    });
    const totalWidth = maxX - minX;
    const totalHeight = maxY - minY;
    console.log(totalWidth);
    console.log(totalHeight);
    canvas.transform.scaleFactor = {
      x: canvas.container.width / totalWidth - 0.3,
      y: canvas.container.width / totalWidth - 0.3
    };
  });
  const plantingAreaLayerId = "plantingAreas";
  function defaultGeometry(type) {
    return {
      type,
      rectangleLength: 100,
      rectangleWidth: 180,
      ellipseWidth: 100,
      ellipseLength: 180,
      polygonRadius: 29,
      polygonNumSides: 3,
      rotation: 0,
      scaleFactor: 1,
      linesClosed: true,
      linesCoordinates: [
        { x: 280, y: 0 },
        { x: 180, y: 0 },
        { x: 180, y: -100 },
        { x: -270, y: -100 },
        { x: -270, y: -160 },
        { x: 280, y: -160 }
      ]
    };
  }
  const examples2 = [
    {
      name: "Garden Bed 1",
      position: { x: -220, y: 50 },
      /** @ts-expect-error We don't need more than {x: , y: }*/
      geometry: defaultGeometry("RECTANGLE")
    },
    {
      name: "Garden Bed 2",
      position: { x: -50, y: 50 },
      /** @ts-expect-error We don't need more than {x: , y: }*/
      geometry: defaultGeometry("RECTANGLE")
    },
    {
      name: "Garden Bed 3",
      position: { x: 200, y: 100 },
      /** @ts-expect-error We don't need more than {x: , y: }*/
      geometry: defaultGeometry("ELLIPSE")
    },
    {
      name: "Garden Bed 4",
      position: { x: 0.5, y: 0.3 },
      /** @ts-expect-error We don't need more than {x: , y: }*/
      geometry: defaultGeometry("LINES"),
      labelTranslate: { x: 0, y: -100 }
    }
  ];
  Canvas($$payload, {
    canvasId,
    children: ($$payload2) => {
      PlantingAreas($$payload2, {
        canvasId,
        plantingAreaLayerId,
        children: ($$payload3) => {
          const each_array = ensure_array_like(examples2);
          $$payload3.out += `<!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let example = each_array[$$index];
            PlantingArea($$payload3, {
              canvasId,
              plantingAreaLayerId,
              name: example.name,
              showName: true,
              position: example.position,
              geometry: example.geometry,
              editable: false,
              labelTranslate: example.labelTranslate
            });
          }
          $$payload3.out += `<!--]-->`;
        }
      });
    }
  });
  pop();
}
const examples = [
  {
    name: "Planting Areas",
    description: "Garden beds, areas, and any geometry can be flexibly represented.",
    component: WorkspaceGeometry
  }
];
function LandingPageDemo($$payload) {
  Carousel($$payload, {
    class: "h-full w-full",
    children: ($$payload2) => {
      Carousel_content($$payload2, {
        class: "h-full w-full",
        children: ($$payload3) => {
          const each_array = ensure_array_like(examples);
          $$payload3.out += `<!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let example = each_array[$$index];
            Carousel_item($$payload3, {
              class: "h-full w-full",
              children: ($$payload4) => {
                example.component($$payload4, {});
              },
              $$slots: { default: true }
            });
          }
          $$payload3.out += `<!--]-->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> `;
      Carousel_previous($$payload2, {});
      $$payload2.out += `<!----> `;
      Carousel_next($$payload2, {});
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
}
function explainerSnippet($$payload, explainer) {
  const each_array = ensure_array_like(explainer.points);
  $$payload.out += `<div class="mt-8 flex justify-between"><div class="flex h-full flex-col"><h3 class="text-neutral-12 w-full text-lg font-semibold">${escape_html(explainer.title)}</h3> <ul class="mt-4 flex list-disc flex-col gap-4 rounded-lg p-4"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let point = each_array[$$index];
    $$payload.out += `<li class="text-neutral-11 text-sm">${escape_html(point)}</li>`;
  }
  $$payload.out += `<!--]--></ul></div> <div${attr_class(clsx(cn(explainer.iconContainerClass, "ml-6 flex items-center justify-center rounded-lg border p-4")))}>`;
  Icon$1($$payload, {
    icon: explainer.icon,
    width: "6rem",
    class: explainer.iconClass || ""
  });
  $$payload.out += `<!----></div></div>`;
}
function _page($$payload, $$props) {
  push();
  const explainers = [
    {
      title: "A garden productivity tool and agro-ecological model",
      points: [
        "Maximize the use of space by simulating plants throughout space and time",
        "Tune recommendations for starting plants to local environmental conditions",
        "Compare multiple plans against estimated metrics of yield and eco benefit"
      ],
      icon: "mdi:plant-outline",
      iconContainerClass: "bg-primary-8 border-primary-10",
      iconClass: "text-primary-1"
    },
    {
      title: "A community hub for the coordination of labour and the distribution of produce",
      points: [
        "Edit gardens with other users in real time",
        "Generate tasks and assign responsibilities",
        "Record harvests and notify subscribers"
      ],
      icon: "mdi:handshake-outline",
      iconContainerClass: "bg-secondary-8 border-secondary-10",
      iconClass: "text-secondary-1"
    },
    {
      title: "An interface for external devices to send data to and receive commands from",
      points: [
        "Use environmental data to inform planning and update the model",
        "Use the model to intelligently control outputs such as irrigation"
      ],
      icon: "ant-design:control-outlined",
      iconContainerClass: "bg-accent-8 border-accent-10",
      iconClass: "text-accent-1"
    }
  ];
  const developmentStatusClass = "bg-crimson-5 border-crimson-6 text-crimson-12";
  const each_array_1 = ensure_array_like(explainers);
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Verdagraph - Eco-modelling tools for collaboratively organized agriculture</title>`;
  });
  $$payload.out += `<div class="flex h-full w-full justify-center"><div class="flex w-11/12 flex-col md:w-5/6 lg:w-3/4 2xl:w-1/2"><div class="mt-12 flex w-full items-center justify-between"><h1 class="text-left text-3xl font-bold">Eco-modelling tools for collaboratively organized agriculture</h1> <div class="ml-8">`;
  Logo($$payload, { size: "8rem" });
  $$payload.out += `<!----></div></div> <div class="mt-8 flex justify-between gap-4">`;
  Button($$payload, {
    variant: "default",
    href: "/demo",
    class: "w-full",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Try the Demonstration`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Button($$payload, {
    variant: "default",
    href: env.APP_URL,
    class: "w-full",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Get Started`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div> <div class="border-neutral-6 bg-neutral-2 mt-6 aspect-video w-full rounded-lg border shadow-md">`;
  LandingPageDemo($$payload);
  $$payload.out += `<!----></div> <div class="mt-8 flex w-full flex-col gap-6"><div class="flex items-center justify-between"><h2 class="text-neutral-11 font-semibold">Project status:</h2> <div class="bg-neutral-6 mx-8 h-[1px] grow rounded-lg"></div> <span${attr_class(clsx(cn(developmentStatusClass, "rounded-lg border px-4 py-2 text-sm")))}>Early development</span></div> <div class="mt-4 flex flex-col gap-4">`;
  Button($$payload, {
    variant: "secondary",
    href: env.NEWSLETTER_URL,
    class: "w-full",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Join the newsletter for new features and progress updates`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div> <div class="bg-neutral-6 mt-4 h-[1px] grow rounded-lg"></div> <div class="mt-4 flex flex-col gap-8"><p class="text-neutral-11 italic">Verdagraph is a collection of open source tools that seek to empower the
					collaborative planning, tracking, and automation of agro-ecological systems.
					It currently consists of a garden productivity application and a smart
					irrigation controller.</p> <!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let explainer = each_array_1[$$index_1];
    explainerSnippet($$payload, explainer);
  }
  $$payload.out += `<!--]--></div></div> <div class="mt-12 flex justify-between gap-4">`;
  Button($$payload, {
    variant: "outline",
    href: "/about",
    class: "w-full",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Read More`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> `;
  Button($$payload, {
    variant: "outline",
    href: "/support",
    class: "w-full",
    children: ($$payload2) => {
      $$payload2.out += `<!---->Support the Project`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div></div></div>`;
  pop();
}
export {
  _page as default
};
