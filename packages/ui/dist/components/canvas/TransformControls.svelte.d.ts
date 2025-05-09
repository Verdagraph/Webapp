/** Props. */
type Props = {
	canvasId: string;
};
/**
 * Renders a toolbar for manipulating the canvas above the canvas.
 * Note that pointer events must be enabled on each button individually,
 * this is because they are disabled on the overlay container div to allow
 * the events to hit the canvas underneath.
 */
declare const TransformControls: import('svelte').Component<Props, {}, ''>;
type TransformControls = ReturnType<typeof TransformControls>;
export default TransformControls;
//# sourceMappingURL=TransformControls.svelte.d.ts.map
