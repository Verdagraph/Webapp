# Frontend Documentation

Frontend documentation still underway and is contained within this readme.

## Notes

### Directory structure

The usual convention is followed, with the routes folder containing the `+page.svelte` and other route-related files, and the `lib` folder containing everything else. In general, components are put in `routes` if they are related to just one route and don't need to be shared among routes.

Within the `lib` folder, the `codegen` folder contains all automatically generated code for interacting with the server, the `data` folder contains the mutations used to update the database, the `components` contain all shared Svelte components, with the `ui` subfolder reserved for components initially generated using Shadcn-svelte. The `state` folder contains all shared runes and other Svelte state management.

### Npm commands

None yet that aren't given by default.
