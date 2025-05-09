export function createToolbox(attributes) {
    /** Stores an array of active tools by their ID. */
    let activeToolIds = $state([]);
    /** Stores the last activated tool by its ID */
    let lastActivatedId = $state(undefined);
    /** Presents the attributes of the active tools. */
    const activeTools = $derived(attributes.filter((attr) => activeToolIds.includes(attr.id)));
    /** True if any tools are active. */
    const isActive = $derived(activeToolIds.length > 0);
    /**
     * Activates a tool.
     * @param id ID of the tool to activate.
     * @param options Used to configure initial data for tool. Not currently functional.
     */
    function activate(id
    // options?: Record<string, unknown>
    ) {
        if (!activeToolIds.includes(id)) {
            activeToolIds.push(id);
        }
        lastActivatedId = id;
    }
    /**
     * Deactivate a tool.
     * @param id ID of the tool to deactivate
     */
    function deactivate(id) {
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
    function isToolActive(id) {
        if (activeToolIds.includes(id)) {
            return true;
        }
        else {
            return false;
        }
    }
    return {
        /** Getters. */
        get lastActivatedId() {
            return lastActivatedId;
        },
        get activeTools() {
            return activeTools;
        },
        get isActive() {
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
