import type { Component } from 'svelte';
/**
 * Describes a type of tool, for example 'ItemCreateForm',
 * and a component which is the content of that tool.
 */
type ToolAttributeType<ToolId extends string> = {
	id: ToolId;
	label: string;
	ToolComponent: Component;
};
/**
 * An array of tools which characterizes a toolbox.
 */
export type ToolAttributes<ToolId extends string> =
	readonly ToolAttributeType<ToolId>[];
export declare function createToolbox<ToolId extends string>(
	attributes: ToolAttributes<ToolId>
): {
	lastActivatedId: ToolId | undefined;
	activeTools: ToolAttributeType<ToolId>[];
	isActive: boolean;
	activate: (id: ToolId, options?: Record<string, unknown>) => void;
	deactivate: (id: ToolId) => void;
	isToolActive: (id: ToolId) => boolean;
};
export default createToolbox;
//# sourceMappingURL=tools.svelte.d.ts.map
