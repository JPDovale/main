import axios, {
	type AxiosHeaders,
	type AxiosInstance,
	type AxiosRequestConfig,
} from "axios";
import type { Response } from "./responses/response";

const ENVIRONMENT = process.env.NODE_ENV ?? "production";

const apiConfig: AxiosInstance = axios.create({
	baseURL:
		ENVIRONMENT === "production"
			? "https://jpdovale.vercel.app/api"
			: "http://localhost:3000/api",
	withCredentials: true,
});

apiConfig.interceptors.response.use(
	(res) => res,
	(error) => {
		if (error.response?.data) {
			return Promise.resolve({
				message: error.response.data,
				status: error.response.status,
			});
		}

		const err = {
			message: "Não foi possível se conectar com o servidor!",
			status: 500,
		};
		return Promise.resolve(err);
	},
);

const connection = {
	setDefaultBearerToken: (token: string) => {
		apiConfig.defaults.headers.Authorization = `Bearer ${token}`;
	},

	get: <T>(url: string, config?: AxiosRequestConfig) =>
		apiConfig.get<unknown, Response<T, AxiosHeaders>>(url, config),

	post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
		apiConfig.post<unknown, Response<T, AxiosHeaders>>(url, data, config),

	put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
		apiConfig.put<unknown, Response<T, AxiosHeaders>>(url, data, config),

	patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
		apiConfig.patch<unknown, Response<T, AxiosHeaders>>(url, data, config),

	delete: <T>(url: string, config?: AxiosRequestConfig) =>
		apiConfig.delete<unknown, Response<T, AxiosHeaders>>(url, config),
};

export { apiConfig, connection };
