import type { AxiosRequestConfig, AxiosError } from 'axios';
import axios from 'axios';
import { AppError, ServerErrorResponse } from '@vdg-webapp/common/src/errors';
import triplit from './triplit';

/** Static client configuration. */
export const AXIOS_INSTANCE = axios.create({
	baseURL: 'http://localhost:8000',
	withCredentials: true
});

/** Dynamic request configuration. */
AXIOS_INSTANCE.interceptors.request.use((config) => {
	//config.headers['X-CSRFToken'] = get(csrftoken);
	config.headers['Authorization'] = triplit.token;
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
