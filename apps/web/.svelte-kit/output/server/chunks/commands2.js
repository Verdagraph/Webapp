import { p as push, c as spread_attributes, t as clsx, n as escape_html, d as bind_props, a as pop } from "./index2.js";
import { c as cn } from "./shadcn.js";
import { G as GardenCreateCommandSchema, c as getClientOrError, t as triplit, A as AppError } from "./auth.svelte.js";
import { r as requiredRole } from "./permissions.js";
import { u as userProfilesUsernameQuery } from "./queries3.js";
import { g as gardenQuery } from "./queries.js";
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
async function requireRole(gardenId, action) {
  const client = await getClientOrError();
  const garden = await triplit.fetchOne(gardenQuery.Vars({ id: gardenId }));
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
async function getNewMembershipIdsFromUsernames(usernames, garden) {
  if (!usernames) {
    return /* @__PURE__ */ new Set();
  }
  const profiles = await triplit.fetch(userProfilesUsernameQuery.Vars({ usernames }));
  return new Set(
    profiles.filter((profile) => garden === void 0).map((profile) => profile.id)
  );
}
const gardenCreate = {
  schema: GardenCreateCommandSchema,
  mutation: async function(data) {
    const client = await getClientOrError();
    const existingGarden = await triplit.fetchOne(gardenQuery.Vars({ id: data.id }));
    if (existingGarden) {
      throw new AppError("Garden ID already exists.", {
        fieldErrors: { id: ["Key already exists."] }
      });
    }
    const adminIds = await getNewMembershipIdsFromUsernames(data.adminInvites);
    const editorIds = await getNewMembershipIdsFromUsernames(data.editorInvites);
    const viewerIds = await getNewMembershipIdsFromUsernames(data.viewerInvites);
    adminIds.add(client.profile.id);
    let garden = null;
    await triplit.transact(async (transaction) => {
      garden = await transaction.insert("gardens", {
        id: data.id,
        name: data.name,
        visibility: data.visibility,
        description: data.description,
        creatorId: client.profile.id,
        adminIds,
        editorIds,
        viewerIds
      });
      await transaction.insert("gardenMemberships", {
        gardenId: garden.id,
        userId: client.profile.id,
        role: "ADMIN",
        inviterId: null,
        status: "ACCEPTED"
      });
      for (const userId in adminIds) {
        if (userId === client.profile.id) {
          continue;
        }
        await transaction.insert("gardenMemberships", {
          gardenId: garden.id,
          userId,
          role: "ADMIN",
          inviterId: client.profile.id,
          status: "CREATED"
        });
      }
      for (const userId in editorIds) {
        await transaction.insert("gardenMemberships", {
          gardenId: garden.id,
          userId,
          role: "EDITOR",
          inviterId: client.profile.id,
          status: "CREATED"
        });
      }
      for (const userId in viewerIds) {
        await transaction.insert("gardenMemberships", {
          gardenId: garden.id,
          userId,
          role: "VIEWER",
          inviterId: client.profile.id,
          status: "CREATED"
        });
      }
      await transaction.insert("workspaces", {
        gardenId: garden.id,
        name: "Default",
        slug: "default"
      });
      await transaction.insert("environments", {
        gardenId: garden.id,
        name: "Garden",
        parentType: "GARDEN",
        attributes: {}
      });
    });
    if (garden == null) {
      throw new AppError("Failed to create garden.");
    }
    return garden;
  }
};
export {
  Textarea as T,
  gardenCreate as g,
  requireRole as r
};
