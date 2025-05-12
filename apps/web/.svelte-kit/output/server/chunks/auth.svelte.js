import "clsx";
import { D as DEV } from "./utils.js";
import { w as writable, g as get } from "./index.js";
import { Schema, or, TriplitClient } from "@triplit/client";
import z$1, { z } from "zod";
import axios from "axios";
const browser = DEV;
const isBrowser = typeof document !== "undefined";
function clientWritable(initialValue) {
  const store = writable(initialValue);
  function set(value) {
    if (isBrowser) {
      store.set(value);
    }
  }
  function update(updater) {
    if (isBrowser) {
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
    toasts.update((prev) => [data, ...prev]);
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
      toasts.update((prev) => prev.map((toast2) => {
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
      toasts.update((prev) => prev.map((toast2) => ({ ...toast2, dismiss: true })));
      return;
    }
    toasts.update((prev) => prev.map((toast2) => toast2.id === id ? { ...toast2, dismiss: true } : toast2));
    return id;
  }
  function remove(id) {
    if (id === void 0) {
      toasts.set([]);
      return;
    }
    toasts.update((prev) => prev.filter((toast2) => toast2.id !== id));
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
    heights.update((prev) => prev.filter((height) => height.toastId !== id));
  }
  function setHeight(data) {
    const exists = get(heights).find((el) => el.toastId === data.toastId);
    if (exists === void 0) {
      heights.update((prev) => [data, ...prev]);
      return;
    }
    heights.update((prev) => prev.map((el) => {
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
const userFields = { usernameSchema, emailSchema, passwordSchema };
const UserLoginCommandSchema = z$1.object({
  email: emailSchema,
  password: z$1.string()
});
const UserCreateCommandSchema = z$1.object({
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
const UserRequestEmailConfirmationCommandSchema = z$1.object({
  email: emailSchema
});
z$1.object({
  token: z$1.string()
});
const UserRequestPasswordResetCommandSchema = z$1.object({
  email: emailSchema
});
const UserConfirmPasswordResetCommandSchema = z$1.object({
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
const gardenFields = {
  gardenNameSchema,
  gardenDescriptionSchema,
  gardenVisibilitySchema
};
const GardenCreateCommandSchema = z$1.object({
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
const workspaceFields = {
  workspaceNameSchema,
  workspaceDescriptionSchema,
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
const WorkspaceCreateCommandSchema = z$1.object({
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
const schema = plantSchema;
function handleErrors(errors) {
  if (errors.nonFormErrors) {
    for (const errorMessage of errors.nonFormErrors) {
      toast.error(errorMessage);
    }
  }
}
const AXIOS_INSTANCE = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true
});
AXIOS_INSTANCE.interceptors.request.use((config) => {
  config.headers["Authorization"] = triplit.token;
  return config;
});
AXIOS_INSTANCE.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (!error.response) {
      throw new AppError("Axios error occurred without a response.", {
        nonFormErrors: ["Something unexpected happened with the server."]
      });
    }
    throw error;
  }
);
const axiosClient = (config) => {
  return AXIOS_INSTANCE({
    ...config
  });
};
const userLoginOp = (userLoginOpBody) => {
  return axiosClient({
    url: `/users/login`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: userLoginOpBody
  });
};
const userRefreshOp = () => {
  return axiosClient({ url: `/users/refresh`, method: "POST" });
};
const userCreateOp = (userCreateOpBody) => {
  return axiosClient({
    url: `/users/create`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: userCreateOpBody
  });
};
const userRequestEmailConfirmationOp = (userRequestEmailConfirmationOpBody) => {
  return axiosClient({
    url: `/users/requestEmailConfirmationOp`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: userRequestEmailConfirmationOpBody
  });
};
const userConfirmEmailOp = (userConfirmEmailOpBody) => {
  return axiosClient({
    url: `/users/confirmEmail`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: userConfirmEmailOpBody
  });
};
const userRequestPasswordResetOp = (userRequestPasswordResetOpBody) => {
  return axiosClient({
    url: `/users/requestPasswordReset`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: userRequestPasswordResetOpBody
  });
};
const userConfirmPasswordResetOp = (userConfirmPasswordResetOpBody) => {
  return axiosClient({
    url: `/users/confirmPasswordReset`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: userConfirmPasswordResetOpBody
  });
};
const userLogin = {
  schema: UserLoginCommandSchema,
  mutation: async function(data) {
    if (triplit.token != null && triplit.token != TRIPLIT_ANON_TOKEN) {
      throw new AppError(
        "Current token does not match anon token - already logged in.",
        { nonFormErrors: ["Already logged in."] }
      );
    }
    const token = await userLoginOp(data);
    await triplit.endSession();
    await triplit.startSession(token);
    auth.updateAuth();
    return token;
  }
};
const userRefresh = {
  mutation: async function() {
    const token = await userRefreshOp();
    auth.updateAuth();
    return token;
  }
};
const getClient = async () => {
  if (!auth.isAuthenticated) {
    return null;
  }
  const account = await triplit.fetchOne(
    triplit.query("accounts").Id("$session.accountId").Include("profile")
  );
  if (!account || !account.profile) {
    return null;
  }
  return { account, profile: account.profile };
};
const getClientOrError = async () => {
  const client = await getClient();
  if (client) {
    return client;
  }
  throw new AppError("Authentication failed.", {
    nonFormErrors: ["Authentication failed. A login is required."]
  });
};
const TRIPLIT_ANON_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4LXRyaXBsaXQtdG9rZW4tdHlwZSI6ImFub24iLCJ4LXRyaXBsaXQtcHJvamVjdC1pZCI6ImxvY2FsLXByb2plY3QtaWQifQ.9xYxsdR7ecDQ251Iv6oF7GrjBXAe1WcXY849g-soXVU";
const TRIPLIT_SERVER_URL = "http://localhost:6543";
const triplit = new TriplitClient({
  schema,
  roles,
  /** Anonymous token. */
  token: TRIPLIT_ANON_TOKEN,
  serverUrl: TRIPLIT_SERVER_URL,
  autoConnect: browser,
  refreshOptions: {
    refreshHandler: async () => {
      const token = await userRefresh.mutation();
      if (token) {
        return token;
      } else {
        throw new Error("Failed to refresh access token.");
      }
    }
  },
  onSessionError: (type) => {
    triplit.endSession();
    triplit.clear();
    if (type === "TOKEN_EXPIRED" || type === "UNAUTHORIZED" || type === "ROLES_MISMATCH") {
      const error = new AppError(`Triplit session error of type ${type}.`, {
        nonFormErrors: ["Authentication error. Log in again."]
      });
      handleErrors(error.details);
      throw error;
    } else if (type === "SCHEMA_MISMATCH") {
      const error = new AppError(`Triplit session error of type ${type}.`, {
        nonFormErrors: [
          "Failed to synchronize data structures with the server. Please refresh the application."
        ]
      });
      handleErrors(error.details);
      throw error;
    }
  }
});
let _isAuthenticated = false;
function updateAuth() {
  if (!triplit.token || triplit.token === TRIPLIT_ANON_TOKEN) {
    _isAuthenticated = false;
  } else {
    _isAuthenticated = true;
  }
}
const auth = {
  get isAuthenticated() {
    return _isAuthenticated;
  },
  updateAuth
};
export {
  AppError as A,
  GardenCreateCommandSchema as G,
  PlantingAreaCreateCommandSchema as P,
  UserRequestPasswordResetCommandSchema as U,
  WorkspaceCreateCommandSchema as W,
  auth as a,
  gardenFields as b,
  getClientOrError as c,
  userFields as d,
  browser as e,
  UserConfirmPasswordResetCommandSchema as f,
  getClient as g,
  UserCreateCommandSchema as h,
  UserRequestEmailConfirmationCommandSchema as i,
  userRequestPasswordResetOp as j,
  userConfirmPasswordResetOp as k,
  userCreateOp as l,
  userRequestEmailConfirmationOp as m,
  userConfirmEmailOp as n,
  handleErrors as o,
  triplit as t,
  userLogin as u,
  workspaceFields as w
};
