/**
 * Ideally, we would position the tick day label between the two
 * ticks using flex. But, the tick divs aren't the width between ticks
 * but just a point width.
 * So, translate the tick labels so they are in between ticks.
 * Calculate the width of a tick, divide in half, add the tick width,
 * and add approximately half the day label's width.
 */
export declare const tickLineWidth = 2;
/** The minimum amount of pixels that will allow the tick day labels to show. */
export declare const tickLabelThreshold = 16;
export declare const baseTickClass = "self-end flex items-end h-[14px]";
export declare const baseTickDayLabelClass = "absolute text-[9px] text-neutral-9 w-[14px] text-center";
export declare const baseTickLineClass = "bg-neutral-7 h-[12px] w-[2px] rounded-t-lg";
//# sourceMappingURL=common.d.ts.map