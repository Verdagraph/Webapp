import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';
import { goto } from '$app/navigation';
import { ServerErrorResponse } from '@vdt-webapp/common/src/errors';
import auth from '$state/auth.svelte';

/** Static client configuration. */
export const AXIOS_INSTANCE = axios.create({
	baseURL: 'http://localhost:8000',
	withCredentials: true
});

/** Dynamic request configuration. */
AXIOS_INSTANCE.interceptors.request.use((config) => {
	//config.headers['X-CSRFToken'] = get(csrftoken);
	config.headers['access'] = auth.token;
	return config;
});

/** Dynamic response configuration. */
AXIOS_INSTANCE.interceptors.response.use(
	(response) => {
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
			auth.removeAccess();

			/** If a refresh has already been attempted, prompt a login. */
			if (auth.retriedRefreshFlag) {
				goto('login');

				/** Otherwise, attempt a refresh. */
			} else {
				auth.retriedRefreshFlag = true;
				auth.refreshAccess();
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
