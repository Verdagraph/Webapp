import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { AppError, type ServerErrorResponse } from '@vdg-webapp/models';

import accessToken from '$state/accessToken.svelte';

/** Static client configuration. */
export const AXIOS_INSTANCE = axios.create({
	baseURL: 'http://localhost:8000',
	withCredentials: true
});

/** Dynamic request configuration. */
AXIOS_INSTANCE.interceptors.request.use((config) => {
	//config.headers['X-CSRFToken'] = get(csrftoken);
	if (accessToken.current) {
		config.headers['Authorization'] = accessToken.current;
	}
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
			throw new AppError('Axios error occurred without a response.', {
				nonFormErrors: ['Something unexpected happened with the server.']
			});
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
