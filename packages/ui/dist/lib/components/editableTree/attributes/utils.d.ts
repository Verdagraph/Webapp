/**
 * Retrieves an oninput handler for an input.
 * @param onChange The callback function that handles the change.
 */
export declare function getOninputString<ElementT extends HTMLInputElement | HTMLTextAreaElement>(onChange: (newData: string) => void): (event: Event & {
    currentTarget: EventTarget & ElementT;
}) => void;
/**
 * Retrieves an oninput handler for an input.
 * @param onChange The callback function that handles the change.
 */
export declare function getOninputNumber<ElementT extends HTMLInputElement | HTMLTextAreaElement>(onChange: (newData: number) => void): (event: Event & {
    currentTarget: EventTarget & ElementT;
}) => void;
//# sourceMappingURL=utils.d.ts.map