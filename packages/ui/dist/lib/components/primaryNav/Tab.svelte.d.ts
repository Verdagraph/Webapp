import type { PrimaryTabSpec } from './tabs.svelte';
import type { Snippet } from 'svelte';
type Props = {
    spec: PrimaryTabSpec;
    side: 'top' | 'right';
    iconSize: '2rem' | '3rem';
    flipped?: boolean;
    altIcon?: Snippet;
};
declare const Tab: import("svelte").Component<Props, {}, "">;
type Tab = ReturnType<typeof Tab>;
export default Tab;
//# sourceMappingURL=Tab.svelte.d.ts.map