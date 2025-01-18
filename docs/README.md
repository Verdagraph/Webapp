# VerdanTech Conceptual Outline

The purpose of this folder is to define high-level, abstract designs of application features. Ideally, it should serve as a prototyping space common to developers and users.

## Feature Categories

Each subfolder represents a feature category. Obviously, most features overlap, so the categorization is intended to be loose and only assist in grouping together similar concepts in the application.

| Category                                               | Description                                                                                                                                                                        |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [App Shell](app-shell/README.md)                       | Wireframes of app-wide navigation UI.                                                                                                                                              |
| [Static Pages](static-pages/README.md)                 | Wireframes of website pages that are not part of the application, including the landing page, project description page, donation page, guides, etc.                                |
| [User](user/README.md)                                 | User management system including email management, password management, authentication, etc.                                                                                       |
| [Garden](gardens/README.md)                            | Gardens are containers for multiple Workspaces, as well as general environments for all other model state, and a space to connect Users.                                           |
| [Workspace](workspaces/README.md)                      | Workspaces are containers which give spatial context to objects such as plants, planting containers, devices, and other models.                                                    |
| [Cultivars](cultivars/README.md)                       | Cultivars are collections of attribute models defining the expected behaviours of plant species.                                                                                   |
| [Environment](environment/README.md)                   | Containers for climate and other environmental data.                                                                                                                               |
| [Plants](plants/README.md)                             | Plants are physical instances of plants with known locations in space and time, and a reference to a Cultivar.                                                                     |
| [Planner](planner/README.md)                           | Planner models are tools for describing past, present, and planned plant instances together as a structured plan, as well as generating plans based on constraints and objectives. |
| [Actions](actions/README.md)                           | Collections of outputs from the model state including lists of tasks to be performed.                                                                                              |
| [Devices, Controllers, and Sensors](devices/README.md) | Devices are containers of Controllers and Sensors, which are tools to interface Environment inputs and Actions outputs with external APIs.                                         |

## Document Types

Each subfolder contains one or more design documents. Currently, these documents can include:

- **models.md** - A markdown document containing specifications for domain models. A domain model is a conceptual model designed to be intuitive by mirroring ways the users think about the problem space the application is trying to solve. Model descriptions should roughly pseudocode the required attributes of the data model implementations, and contain general descriptions of the behaviours, including relationships with other models.
- **wireframes.md** - A markdown document containing descriptions of wireframes and the interactions between them.
- **wireframes/** - Wireframes are rough sketches of the user interface. Currently, the Excalidraw application is used for its ability to save editable files directly into PNG format. The recommended way to edit these files is to use the [Visual Studio extension](https://marketplace.visualstudio.com/items?itemName=pomdtr.excalidraw-editor) in VS Code or in the browser. For collaborative editing, the [web version](https://excalidraw.com/) can be used.

Within a document, the following metadata is accepted:

```
---
status: Whether the document is behind, matching, or ahead of the implementation.
---
```
