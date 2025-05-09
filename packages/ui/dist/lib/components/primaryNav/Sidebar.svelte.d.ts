import type { PrimaryTabSpec } from './tabs.svelte';
type Props = {
    gardensTab: PrimaryTabSpec;
    gardenTabs: PrimaryTabSpec[];
    bottomTabs: PrimaryTabSpec[];
    profileTab: PrimaryTabSpec;
};
/** Large screens sidebar. */
declare const Sidebar: import("svelte").Component<Props, {}, "">;
type Sidebar = ReturnType<typeof Sidebar>;
export default Sidebar;
//# sourceMappingURL=Sidebar.svelte.d.ts.map