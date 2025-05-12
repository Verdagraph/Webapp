import type { EditableTreeContext } from './tree.svelte';
type Props = {
    /** The tree. */
    editableTree: EditableTreeContext;
    /** Field errors. */
    fieldErrors: Record<string, string[]>;
    /** If true the tree may be edited. */
    editing: boolean;
};
declare const EditableTree: import("svelte").Component<Props, {
    isMac: () => boolean;
    isControlOrMeta: (event: KeyboardEvent | MouseEvent) => boolean;
}, "">;
type EditableTree = ReturnType<typeof EditableTree>;
export default EditableTree;
//# sourceMappingURL=EditableTree.svelte.d.ts.map