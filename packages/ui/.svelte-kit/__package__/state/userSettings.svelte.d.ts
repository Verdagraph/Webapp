export type UnitSystem = 'metric' | 'imperial';
export type UnitAwareQuantity = 'distance' | 'temperature' | 'mass' | 'volume';
/**
 * Holds persisted user settings.
 */
declare function createSettingsContext(): {
    units: any;
};
export type SettingsContext = ReturnType<typeof createSettingsContext>;
export declare function setSettingsContext(): {
    units: any;
};
export declare function getSettingsContext(): {
    units: any;
};
export {};
//# sourceMappingURL=userSettings.svelte.d.ts.map