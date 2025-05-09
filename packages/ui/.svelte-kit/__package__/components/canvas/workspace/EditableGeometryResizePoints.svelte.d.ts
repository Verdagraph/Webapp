import type { Geometry, GeometryUpdateCommand } from '@vdg-webapp/models';
import Konva from 'konva';
type Props = {
    /** The ID of the canvas. */
    canvasId: string;
    geometry: Omit<Geometry, 'id' | 'gardenId' | 'linesCoordinateIds'>;
    /** A konva group already made that stores the geometry's shapes. */
    geometryGroup: Konva.Group;
    /** Colors to make the points. */
    strokeColor: string;
    fillColor: string;
    /** Called when the geometry is transformed in the canvas. */
    onTransform?: (
    /** The updated geometry attributes after transformation. */
    newGeometry: GeometryUpdateCommand, 
    /** If true, the transform has ended. */
    transformOver: boolean) => void;
};
declare const EditableGeometryResizePoints: import("svelte").Component<Props, {}, "">;
type EditableGeometryResizePoints = ReturnType<typeof EditableGeometryResizePoints>;
export default EditableGeometryResizePoints;
//# sourceMappingURL=EditableGeometryResizePoints.svelte.d.ts.map