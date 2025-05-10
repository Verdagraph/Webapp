import {
	DropdownMenu as DropdownMenuPrimitive,
	type WithoutChildrenOrChild
} from 'bits-ui';
import type { Snippet } from 'svelte';
type $$ComponentProps =
	WithoutChildrenOrChild<DropdownMenuPrimitive.CheckboxItemProps> & {
		children?: Snippet;
	};
declare const DropdownMenuCheckboxItem: import('svelte').Component<
	$$ComponentProps,
	{},
	'ref' | 'checked' | 'indeterminate'
>;
type DropdownMenuCheckboxItem = ReturnType<typeof DropdownMenuCheckboxItem>;
export default DropdownMenuCheckboxItem;
//# sourceMappingURL=dropdown-menu-checkbox-item.svelte.d.ts.map
