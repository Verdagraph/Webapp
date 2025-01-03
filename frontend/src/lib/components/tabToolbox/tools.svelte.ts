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

export function createToolbox<ToolId extends string>(
	attributes: ToolAttributes<ToolId>
): {
	lastActivatedId: ToolId | undefined;
	activeTools: ToolAttributeType<ToolId>[];
	isActive: boolean;
	activate: (id: ToolId, options?: Record<string, any>) => void;
	deactivate: (id: ToolId) => void;
	isToolActive: (id: ToolId) => boolean;
} {
	/** Stores an array of active tools by their ID. */
	let activeToolIds = $state<Array<ToolId>>([]);
	/** Stores the last activated tool by its ID */
	let lastActivatedId = $state<ToolId | undefined>(undefined);
	/** Presents the attributes of the active tools. */
	let activeTools = $derived<ToolAttributeType<ToolId>[]>(
		attributes.filter((attr) => activeToolIds.includes(attr.id))
	);
	/** True if any tools are active. */
	let isActive = $derived<boolean>(activeToolIds.length > 0);

	/**
	 * Activates a tool.
	 * @param id ID of the tool to activate.
	 * @param options Used to configure initial data for tool. Not currently functional.
	 */
	function activate(id: ToolId, options?: Record<string, any>) {
		if (!activeToolIds.includes(id)) {
			activeToolIds.push(id);
		}
		lastActivatedId = id;
	}

	/**
	 * Deactivate a tool.
	 * @param id ID of the tool to deactivate
	 */
	function deactivate(id: ToolId) {
		if (activeToolIds.includes(id)) {
			activeToolIds = activeToolIds.filter((item) => item !== id);
		}
		if (!isActive) {
			lastActivatedId = undefined;
		}
	}

	/**
	 * Checks if a tool is active.
	 * @param id The tool ID.
	 * @returns True if the tool is active.
	 */
	function isToolActive(id: ToolId): boolean {
		if (activeToolIds.includes(id)) {
			return true;
		} else {
			return false;
		}
	}

	return {
		/** Getters. */
		get lastActivatedId(): ToolId | undefined {
			return lastActivatedId;
		},
		get activeTools(): ToolAttributeType<ToolId>[] {
			return activeTools;
		},
		get isActive(): boolean {
			return isActive;
		},
		set lastActivatedId(newVal) {
			lastActivatedId = newVal;
		},
		activate,
		deactivate,
		isToolActive
	};
}
export default createToolbox;
