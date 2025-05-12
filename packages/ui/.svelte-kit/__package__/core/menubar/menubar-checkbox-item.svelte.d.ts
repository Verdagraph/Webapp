import { Menubar as MenubarPrimitive, type WithoutChildrenOrChild } from 'bits-ui';
import type { Snippet } from 'svelte';
type $$ComponentProps = WithoutChildrenOrChild<MenubarPrimitive.CheckboxItemProps> & {
    children?: Snippet;
};
declare const MenubarCheckboxItem: import("svelte").Component<$$ComponentProps, {}, "ref" | "checked" | "indeterminate">;
type MenubarCheckboxItem = ReturnType<typeof MenubarCheckboxItem>;
export default MenubarCheckboxItem;
//# sourceMappingURL=menubar-checkbox-item.svelte.d.ts.map