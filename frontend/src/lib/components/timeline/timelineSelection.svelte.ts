import {
	today,
	getLocalTimeZone,
	type DateValue,
	type DateDuration
} from '@internationalized/date';
import { calculateDeltaDays } from './utils';

/** Default offset between selected day and the upper selection range. */
const defaultUpperSelectionOffset: DateDuration = { weeks: 3 };
/** Default offset between selected day lower selection range. */
const defaultLowerSelectionOffset: DateDuration = { weeks: 1 };
/** Default offset between upper and lower selection and range displayed on the slider. */
const defaultSliderDisplayOffset: DateDuration = {
	weeks: 2
};
/** Minimum offset between the focused day and the selection bounds. */
const minSelectOffset: DateDuration = { days: 1 };
/* Maximum offset between the focused day and the selection bounds. */
const maxSelectOffset: DateDuration = { years: 4 };

export function createTimelineSelection() {
	/**
	 * Selection.
	 */
	/** Controls the view of the Layout. */
	let focus: DateValue = $state(today(getLocalTimeZone()));
	/** Day which marks the start of the timeline selection. */
	let beginSelection: DateValue = $state(focus.subtract(defaultLowerSelectionOffset));
	/** Day which marks the end of the timeline selection. */
	let endSelection: DateValue = $state(focus.add(defaultUpperSelectionOffset));

	/**
	 * Slider properties.
	 */
	/** Day which marks the start of the timeline displayed on the slider graphic. */
	let beginSlider: DateValue = $state(
		beginSelection.subtract(defaultSliderDisplayOffset)
	);
	/** Day which marks the end of the timeline displayed on the slider graphic. */
	let endSlider: DateValue = $state(endSelection.add(defaultSliderDisplayOffset));
	/** The value the slider starts with. Is a reference point for other values. */
	const minSliderValue = 0;
	/** The last value in the slider. Defines the end of the visible range. */
	const maxSliderValue = $derived(calculateDeltaDays(endSlider, beginSlider));
	/** The values of the slider thumbs. */
	let sliderValue: Array<number> = $derived.by(() => {
		return [
			calculateDeltaDays(beginSelection, beginSlider),
			calculateDeltaDays(focus, beginSlider),
			calculateDeltaDays(endSelection, beginSlider)
		];
	});
	endSlider.day;
	/**
	 * Given a change in the focused day, move the selection along with it.
	 * @param newFocus The new focused day.
	 */
	function refocus(newFocus: DateValue) {
		/* Calculate the difference between two focused dates in days.  */
		const deltaDays = calculateDeltaDays(newFocus, focus);

		/** Apply delta to selection range. */
		beginSelection = beginSelection.add({
			days: deltaDays
		});
		endSelection = endSelection.add({
			days: deltaDays
		});
		beginSlider = beginSlider.add({
			days: deltaDays
		});
		endSlider = endSlider.add({
			days: deltaDays
		});

		/** Update focused day. */
		focus = newFocus;
	}

	/**
	 * Move the entire selection according to the translation.
	 * @param translation The time duration to translate the selection
	 */
	function translate(translation: DateDuration) {
		focus = focus.add(translation);
		beginSelection = beginSelection.add(translation);
		endSelection = endSelection.add(translation);
		beginSlider = beginSlider.add(translation);
		endSlider = endSlider.add(translation);
	}

	/**
	 * Given a slider thumb value, converts it to the equivalent DateValue
	 * @param sliderValue The slider value to convert.
	 * @returns The equivalent DateValue
	 */
	function sliderValueToDateValue(sliderValue: number): DateValue {
		return beginSlider.add({ days: sliderValue });
	}

	/**
	 * Updates the selection based on a change in the slider.
	 * @param newVal The new slider value.
	 */
	function updateSlider(newVal: number[]) {
		/** Drag the selection along with the focus. */
		if (newVal[1] != sliderValue[1]) {
			const deltaDays = newVal[1] - sliderValue[1];
			newVal[0] = Math.max(newVal[0] + deltaDays, minSliderValue);
			newVal[2] = Math.min(newVal[2] + deltaDays, maxSliderValue);
		}

		/** Move the slider range if the selection gets close to the edges. */
		//if (maxSliderValue - newVal[2] < 10) {
		//endSlider = endSlider.add({weeks: 1})
		//beginSlider = beginSlider.add({weeks: 1})
		//}
		//else if (newVal[0] - minSliderValue < 2) {
		//endSlider = endSlider.subtract({weeks: 1})
		//beginSlider = beginSlider.subtract({weeks: 1})
		//}

		/** Update the selection. */
		beginSelection = sliderValueToDateValue(newVal[0]);
		focus = sliderValueToDateValue(newVal[1]);
		endSelection = sliderValueToDateValue(newVal[2]);
	}
	return {
		get focus() {
			return focus;
		},
		get beginSelection() {
			return beginSelection;
		},
		get endSelection() {
			return endSelection;
		},
		get minSliderValue() {
			return minSliderValue;
		},
		get maxSliderValue() {
			return maxSliderValue;
		},
		get sliderValue() {
			return sliderValue;
		},
		set beginSelection(newVal) {
			beginSelection = newVal;
		},
		set endSelection(newVal) {
			endSelection = newVal;
		},
		minSelectOffset,
		maxSelectOffset,
		refocus,
		translate,
		sliderValueToDateValue,
		updateSlider
	};
}
export type TimelineSelection = ReturnType<typeof createTimelineSelection>;
