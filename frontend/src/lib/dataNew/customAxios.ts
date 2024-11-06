import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';
import { goto } from '$app/navigation';
import { toast } from 'svelte-sonner';
import authentication from '$state/authentication.svelte';
import { ServerErrorResponse } from '@vdt-webapp/common/src/errors';

/** Static client configuration. */
export const AXIOS_INSTANCE = axios.create({
	baseURL: 'http://localhost:8000',
	withCredentials: true
});

/** Dynamic request configuration. */
AXIOS_INSTANCE.interceptors.request.use((config) => {
	//config.headers['X-CSRFToken'] = get(csrftoken);
	return config;
});

/** Dynamic response configuration. */
AXIOS_INSTANCE.interceptors.response.use(
	(response: AxiosResponse<any>) => {
		/** On success, return the data directly.*/
		return response.data;
	},
	(error: AxiosError<ServerErrorResponse>) => {
		if (!error.response) {
			return;
		}

		/** Handle authentication errors. */
		if (error.response.status === 401) {
			/** Update the client to acknowledge the lack of access. */
			authentication.removeAccess();

			/** If a refresh has already been attempted, prompt a login. */
			if (authentication.value.retriedRefreshFlag) {
				goto('login');

				/** Otherwise, attempt a refresh. */
			} else {
				authentication.value.retriedRefreshFlag = true;
				authentication.requestAccessRefresh();
			}

			/** Handle other errors. */
		} else {
			/**
			 * The backend may send errors meant to be displayed
			 * outside of a form under the extra.non_form_errors key.
			 * Display each of these in a toast.
			 */
			if (error.response.data.details?.nonFormErrors) {
				for (const errorMessage in error.response.data.details.nonFormErrors) {
						/** Toast */
						toast.error(errorMessage);
				}
			}
		}

		throw error;
	}
);

export const axiosClient = <Response>(
	config: AxiosRequestConfig
): Promise<Response> => {
	return AXIOS_INSTANCE({
		...config
	});
};
export default axiosClient;
