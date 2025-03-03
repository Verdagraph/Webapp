export {};
declare global {
	interface ArkEnv {
		meta(): {
			/** Displayed under form labels, whereas the arktype labels show on error. */
			details?: string;
		};
	}
}
