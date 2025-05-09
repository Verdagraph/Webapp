import type { PrimaryTabSpec } from './tabs.svelte';
type Props = {
    gardensTab: PrimaryTabSpec;
    gardenTabs: PrimaryTabSpec[];
    traitsTab: PrimaryTabSpec;
    resourcesTab: PrimaryTabSpec;
    profileTab: PrimaryTabSpec;
};
/** Small screens bottom bar. */
declare const Bottombar: import("svelte").Component<Props, {}, "">;
type Bottombar = ReturnType<typeof Bottombar>;
export default Bottombar;
//# sourceMappingURL=Bottombar.svelte.d.ts.map