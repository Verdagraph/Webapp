import { TRIPLIT_UPDATE_DEFAULT_INTERVAL_MS } from '$data/triplit';

/**
 * Options to pass to the handler
 */
type HandlerOptions = {
	/** A function to call when the change starts. */
	onStart?: () => void;
	/** A function to call when the change is continuing. */
	onContinue?: () => void;
	/** A function to call when the change ends. */
	onEnd?: () => void;
};

/**
 * Creates a handler which tracks changes to a piece of data
 * and calls a commit function with that data on a set interval,
 * ensuring the data is eventually commited with an additional timeout.
 *
 * Used to commit changes to Triplit at a set interval to prevent
 * those changes from being commited to rapidly.
 *
 * @param commitFunc The function to call with the changed data to commit it.
 * @param interval The interval to commit the data.
 * @param options Options for the handler.
 * @returns A change handler object.
 */
export function createChangeHandler<TData extends unknown>(
	commitFunc: (newData: TData) => void,
	interval: number = TRIPLIT_UPDATE_DEFAULT_INTERVAL_MS,
	options?: HandlerOptions
) {
	/** The interval timeout for commiting the data. */
	let intervalId: NodeJS.Timeout | null = null;
	/** A fallback timeout in case the change is never ended by the calling context. */
	let timeoutId: NodeJS.Timeout | null = null;
	/** The data that is being changed. */
	let data: TData | null = $state(null);

	/**
	 * Begins the change by tracking the new data
	 * and setting the interval and timeout.
	 * @param newData The new data to set.
	 */
	function beginChange(newData: TData) {
		data = newData;
		intervalId = setInterval(commit, interval);
		timeoutId = setTimeout(timeout, interval * 1.5);

		if (options?.onStart) {
			options.onStart();
		}
	}

	/**
	 * Continues the change by tracking the new data
	 * and updating the timeout.
	 * @param newData
	 */
	function continueChange(newData: TData) {
		data = newData;

		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(timeout, interval * 1.5);
		}

		if (options?.onContinue) {
			options.onContinue();
		}
	}

	/**
	 * Ends the change by tracking the new data,
	 * comitting it, and clearing the interval and timeout.
	 * @param newData
	 */
	function endChange(newData: TData) {
		data = newData;
		commit();

		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}

		if (options?.onEnd) {
			options.onEnd();
		}
	}

	/**
	 * Commits the data.
	 */
	function commit() {
		if (!data) {
			return;
		}

		commitFunc(data);
		data = null;
	}

	/**
	 * The fallback timeout for if the change is
	 * never ended by the calling context.
	 * Commits the data and clears the interval and timeout.
	 */
	function timeout() {
		commit();

		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}

		if (options?.onEnd) {
			options.onEnd();
		}
	}

	/**
	 * Resets the data, interval, and timeout.
	 */
	function reset() {
		data = null;
		if (intervalId) {
			clearInterval(intervalId);
			intervalId = null;
		}
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}
	}

	/**
	 * Called by the calling context when the data is changed.
	 * @param changeOver If true, the change is over. For example,
	 * when using Konva drag events, there is the 'dragmove' and
	 * 'dragend' event. This is true for the 'dragend' event
	 * but not the 'dragmove' event.
	 * For inputs, the 'oninput' event would correspond to false
	 * and the 'onchange' or 'onblur' events would correspond to true.
	 * @param newData The new data to set.
	 */
	function change(changeOver: boolean, newData: TData) {
		/**
		 * The change is in progress and the interval is not set,
		 * meaning this is the first tick in the change.
		 * Set the interval callback.
		 */
		if (!changeOver && !intervalId) {
			beginChange(newData);

			/**
			 * The change is in progress and the interval has been set,
			 * meaning this is between the first and last tick of the change.
			 */
		} else if (!changeOver && intervalId) {
			continueChange(newData);

			/**
			 * The change has ended and the interval has been set,
			 * meaning this is the last tick in the change.
			 * End the interval callback.
			 */
		} else if (changeOver) {
			endChange(newData);
		}
	}

	return {
		get data() {
			return data;
		},
		change,
		reset
	};
}
export type ChangeHandler<TData> = ReturnType<typeof createChangeHandler<TData>>;
