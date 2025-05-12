import { type GeometryType } from '@vdg-webapp/models';
type Props = {
    value: GeometryType;
    label?: string;
    onValueChange?: (value: GeometryType) => void;
};
declare const GeometrySelect: import("svelte").Component<Props, {}, "value" | "label">;
type GeometrySelect = ReturnType<typeof GeometrySelect>;
export default GeometrySelect;
//# sourceMappingURL=GeometrySelect.svelte.d.ts.map