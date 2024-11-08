import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import axios from 'axios';
import { goto } from '$app/navigation';
import { toast } from 'svelte-sonner';
import authentication from '$state/authentication.svelte';
import { ServerErrorResponse } from '@vdt-webapp/common/src/errors';
import triplit from './triplit';
import accessToken from '$state/access.svelte';

/** Static client configuration. */
export const AXIOS_INSTANCE = axios.create({
	baseURL: 'http://localhost:8000',
	withCredentials: true
});

/** Dynamic request configuration. */
AXIOS_INSTANCE.interceptors.request.use((config) => {
	//config.headers['X-CSRFToken'] = get(csrftoken);
	config.headers['access'] = accessToken.value.token;
	return config;
});

/** Dynamic response configuration. */
AXIOS_INSTANCE.interceptors.response.use(
	(response: AxiosResponse<any>) => {
		/** Update the access token if it exists. */
		if (response.headers['access']) {
			const accessToken = response.headers['access'];
			triplit.updateToken(accessToken);
			accessToken.value = accessToken;
		}

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
