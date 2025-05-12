import { r as requireRole } from "./commands2.js";
import { W as WorkspaceCreateCommandSchema, P as PlantingAreaCreateCommandSchema, t as triplit, A as AppError } from "./auth.svelte.js";
function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}
function historySelect(items, date) {
  if (items.length === 0) {
    return null;
  }
  const time = date.getTime();
  const sortedItems = [...items].sort((a, b) => a.date.getTime() - b.date.getTime());
  if (time < sortedItems[0].date.getTime()) {
    return null;
  }
  if (time >= sortedItems[sortedItems.length - 1].date.getTime()) {
    return sortedItems[sortedItems.length - 1];
  }
  for (let i = 0; i < sortedItems.length - 1; i++) {
    const currentTime = sortedItems[i].date.getTime();
    const nextTime = sortedItems[i + 1].date.getTime();
    if (time >= currentTime && time < nextTime) {
      return sortedItems[i];
    }
  }
  return null;
}
function historySelectDay(items, date) {
  return [...items].find((item) => isSameDay(item.date, date)) || null;
}
function slugify(input) {
  input = input.replace(/^\s+|\s+$/g, "");
  input = input.toLowerCase();
  input = input.replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
  return input;
}
async function geometryCreate(gardenId, data, transaction) {
  const coordinateIds = [];
  if (data.linesCoordinates && data.type === "LINES") {
    for (const point of data.linesCoordinates) {
      const coordinate = await transaction.insert("coordinates", {
        gardenId,
        x: point.x,
        y: point.y
      });
      coordinateIds.push(coordinate.id);
    }
  }
  const geometry = {
    gardenId,
    type: data.type,
    date: data.date,
    scaleFactor: data.scaleFactor,
    rotation: data.rotation,
    rectangleLength: data.rectangleLength,
    rectangleWidth: data.rectangleWidth,
    polygonNumSides: data.polygonNumSides,
    polygonRadius: data.polygonRadius,
    ellipseLength: data.ellipseLength,
    ellipseWidth: data.ellipseWidth,
    linesCoordinateIds: new Set(coordinateIds),
    linesClosed: data.linesClosed
  };
  return await transaction.insert("geometries", geometry);
}
async function geometryUpdate(id, data) {
  const geometry = await triplit.fetchOne(triplit.query("geometries").Id(id));
  if (!geometry) {
    throw new AppError("Geometry does not exist.", {
      nonFormErrors: ["Failed to update object geometry."]
    });
  }
  if (data.delete) {
    await triplit.delete("geometries", id);
    return;
  }
  await triplit.transact(async (transaction) => {
    let existingCoordinateIds = [...geometry.linesCoordinateIds];
    if (data.linesCoordinates) {
      const newCoordinatesCount = data.linesCoordinates.length;
      const minLength = Math.min(existingCoordinateIds.length, newCoordinatesCount);
      for (let i = 0; i < minLength; i++) {
        const coordinateId = existingCoordinateIds[i];
        await transaction.update("coordinates", coordinateId, (coordinate) => {
          if (data.linesCoordinates) {
            coordinate.x = data.linesCoordinates[i].x;
            coordinate.y = data.linesCoordinates[i].y;
          }
        });
      }
      if (existingCoordinateIds.length > newCoordinatesCount) {
        const coordinatesToDelete = existingCoordinateIds.slice(newCoordinatesCount);
        for (const coordinateId of coordinatesToDelete) {
          await transaction.delete("coordinates", coordinateId);
        }
        existingCoordinateIds = existingCoordinateIds.slice(0, newCoordinatesCount);
      }
      if (newCoordinatesCount > existingCoordinateIds.length) {
        const newPoints = data.linesCoordinates.slice(existingCoordinateIds.length);
        for (const point of newPoints) {
          const coordinate = await transaction.insert("coordinates", {
            gardenId: geometry.gardenId,
            x: point.x,
            y: point.y
          });
          existingCoordinateIds.push(coordinate.id);
        }
      }
    }
    await transaction.update("geometries", geometry.id, (geometry2) => {
      if (data.type) {
        geometry2.type = data.type;
      }
      if (data.date) {
        geometry2.date = data.date;
      }
      if (data.scaleFactor) {
        geometry2.scaleFactor = data.scaleFactor;
      }
      if (data.rotation) {
        geometry2.rotation = data.rotation;
      }
      if (data.rectangleLength) {
        geometry2.rectangleLength = data.rectangleLength;
      }
      if (data.rectangleWidth) {
        geometry2.rectangleWidth = data.rectangleWidth;
      }
      if (data.polygonNumSides) {
        geometry2.polygonNumSides = data.polygonNumSides;
      }
      if (data.polygonRadius) {
        geometry2.polygonRadius = data.polygonRadius;
      }
      if (data.ellipseLength) {
        geometry2.ellipseLength = data.ellipseLength;
      }
      if (data.ellipseWidth) {
        geometry2.ellipseWidth = data.ellipseWidth;
      }
      if (data.linesCoordinates) {
        geometry2.linesCoordinateIds = new Set(existingCoordinateIds);
      }
      if (data.linesClosed) {
        geometry2.linesClosed = data.linesClosed;
      }
    });
  });
}
async function locationHistoryCreate(data, transaction) {
  const location = await transaction.insert("locations", {
    gardenId: data.gardenId,
    workspaceId: data.workspaceId,
    x: data.coordinate.x,
    y: data.coordinate.y,
    date: data.date
  });
  return await transaction.insert("locationHistories", {
    gardenId: data.gardenId,
    locationIds: /* @__PURE__ */ new Set([location.id]),
    workspaceIds: /* @__PURE__ */ new Set([data.workspaceId])
  });
}
async function locationUpdate(id, data) {
  const location = await triplit.fetchOne(triplit.query("locations").Id(id));
  if (!location) {
    throw new AppError("Location does not exist.", {
      nonFormErrors: ["Failed to update object location."]
    });
  }
  if (data.delete) {
    await triplit.delete("locations", id);
    return;
  }
  await triplit.update("locations", id, (location2) => {
    if (data.coordinate) {
      location2.x = data.coordinate.x;
      location2.y = data.coordinate.y;
    }
    if (data.date) {
      location2.date = data.date;
    }
    if (data.workspaceId) {
      location2.workspaceId = data.workspaceId;
    }
  });
}
async function locationHistoryUpdate(data) {
  const locationHistory = await triplit.fetchOne(
    triplit.query("locationHistories").Id(data.id).Include("locations")
  );
  if (!locationHistory) {
    throw new AppError("Location history does not exist.", {
      nonFormErrors: ["Failed to update object location."]
    });
  }
  const existingLocation = historySelectDay(locationHistory.locations, data.date);
  if (existingLocation) {
    await triplit.update("locations", existingLocation.id, (location) => {
      location.x = data.coordinate.x;
      location.y = data.coordinate.y;
    });
  } else {
    await triplit.transact(async (transaction) => {
      const location = await transaction.insert("locations", {
        gardenId: locationHistory.gardenId,
        workspaceId: data.workspaceId,
        x: data.coordinate.x,
        y: data.coordinate.y,
        date: data.date
      });
      await triplit.update(
        "locationHistories",
        locationHistory.id,
        (locationHistory2) => {
          locationHistory2.locationIds.add(location.id);
          if (!locationHistory2.workspaceIds.has(data.workspaceId)) {
            locationHistory2.workspaceIds.add(data.workspaceId);
          }
        }
      );
    });
  }
}
async function locationHistoryExtend(id, date) {
  const locationHistory = await triplit.fetchOne(
    triplit.query("locationHistories").Id(id).Include("locations")
  );
  if (!locationHistory) {
    throw new AppError("Location history does not exist.", {
      nonFormErrors: ["Failed to update object location."]
    });
  }
  const nearestLocation = historySelectDay(locationHistory.locations, date) || locationHistory.locations[locationHistory.locations.length - 1] || { x: 0, y: 0 };
  await triplit.transact(async (transaction) => {
    const location = await transaction.insert("locations", {
      gardenId: locationHistory.gardenId,
      workspaceId: nearestLocation.workspaceId,
      x: nearestLocation.x,
      y: nearestLocation.y,
      date
    });
    await transaction.update("locationHistories", id, (locationHistory2) => {
      locationHistory2.locationIds.add(location.id);
    });
  });
}
const workspaceCreate = {
  schema: WorkspaceCreateCommandSchema,
  mutation: async function(data) {
    await requireRole(data.gardenId, "WorkspaceCreate");
    const workspaceSlug = slugify(data.name);
    const existingWorkspace = await triplit.fetchOne(
      triplit.query("workspaces").Where([
        ["gardenId", "=", data.gardenId],
        ["slug", "=", workspaceSlug]
      ])
    );
    if (existingWorkspace) {
      throw new AppError("Workspace slug already exists.", {
        fieldErrors: { name: ["This workspace name already exists in this garden."] }
      });
    }
    return await triplit.insert("workspaces", {
      gardenId: data.gardenId,
      name: data.name,
      slug: workspaceSlug,
      description: data.description
    });
  }
};
const plantingAreaCreate = {
  schema: PlantingAreaCreateCommandSchema,
  mutation: async (data) => {
    const { garden } = await requireRole(data.gardenId, "PlantingAreaCreate");
    const workspace = await triplit.fetchOne(
      triplit.query("workspaces").Id(data.workspaceId)
    );
    if (workspace == null) {
      throw new AppError(`Failed to retrieve workspace ${data.workspaceId}`, {
        nonFormErrors: ["Failed to retrieve workspace."]
      });
    }
    await triplit.transact(async (transaction) => {
      const geometry = await geometryCreate(data.gardenId, data.geometry, transaction);
      const locationHistory = await locationHistoryCreate(data.location, transaction);
      await transaction.insert("plantingAreas", {
        gardenId: garden.id,
        name: data.name,
        description: data.description || "",
        geometryId: geometry.id,
        locationHistoryId: locationHistory.id,
        depth: data.depth
      });
    });
  }
};
const plantingAreaUpdate = {
  mutation: async function(id, data) {
    const plantingArea = await triplit.fetchOne(triplit.query("plantingAreas").Id(id));
    if (plantingArea == null) {
      throw new AppError(`Failed to retrieve planting area ${id}`, {
        nonFormErrors: ["Failed to retrieve planting area."]
      });
    }
    await triplit.update("plantingAreas", id, (plantingArea2) => {
      if (data.name) {
        plantingArea2.name = data.name;
      }
      if (data.description) {
        plantingArea2.description = data.description;
      }
      if (data.depth) {
        plantingArea2.depth = data.depth;
      }
    });
  }
};
export {
  locationHistoryExtend as a,
  locationUpdate as b,
  plantingAreaCreate as c,
  geometryUpdate as g,
  historySelect as h,
  locationHistoryUpdate as l,
  plantingAreaUpdate as p,
  workspaceCreate as w
};
