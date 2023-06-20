import axios, { AxiosError } from 'axios';
import AuthServices from './auth.services';
import { config } from '../utils';

const instance = axios.create({
    baseURL: config.apiUrl,
    headers: {
        Accept: 'multipart/form-data',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 1000 * 60 * 30
});
instance.interceptors.response.use(
    (res) => {
        return res.data;
    },
    async (error: AxiosError) => {
        // const originalConfig = error.config;
        const status = error.response?.status;
        if (status === 401) {
            const fallBackUrl =
                window.location.pathname + window.location.search;
            AuthServices.logout(fallBackUrl);
        }

        if (status === 404) {
            AuthServices.logout();
        }

        return Promise.reject(error.response?.data);
    }
);

export default instance;
