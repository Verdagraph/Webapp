import type { Command as CommandPrimitive, Dialog as DialogPrimitive, WithoutChildrenOrChild } from 'bits-ui';
import type { Snippet } from 'svelte';
type $$ComponentProps = WithoutChildrenOrChild<DialogPrimitive.RootProps> & WithoutChildrenOrChild<CommandPrimitive.RootProps> & {
    children: Snippet;
};
declare const CommandDialog: import("svelte").Component<$$ComponentProps, {}, "ref" | "value" | "open">;
type CommandDialog = ReturnType<typeof CommandDialog>;
export default CommandDialog;
//# sourceMappingURL=command-dialog.svelte.d.ts.map