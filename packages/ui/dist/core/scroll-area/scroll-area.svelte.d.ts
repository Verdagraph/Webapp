import { ScrollArea as ScrollAreaPrimitive, type WithoutChild } from 'bits-ui';
type $$ComponentProps = WithoutChild<ScrollAreaPrimitive.RootProps> & {
    orientation?: 'vertical' | 'horizontal' | 'both' | undefined;
    scrollbarXClasses?: string | undefined;
    scrollbarYClasses?: string | undefined;
};
declare const ScrollArea: import("svelte").Component<$$ComponentProps, {}, "ref">;
type ScrollArea = ReturnType<typeof ScrollArea>;
export default ScrollArea;
//# sourceMappingURL=scroll-area.svelte.d.ts.map