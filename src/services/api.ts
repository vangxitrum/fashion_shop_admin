import axios, { AxiosError } from 'axios';
import { config } from '../utils';
import authHeader from './authHeader';
import { AuthServices } from '.';
axios.defaults.withCredentials = true;
const instance = axios.create({
    baseURL: config.apiUrl,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: authHeader(),
    },
});

instance.interceptors.response.use(
    (res) => {
        return res.data;
    },
    async (error: AxiosError) => {
        const status = error.response?.status;
        const errorData: any = error.response?.data;

        if (status === 401) {
            AuthServices.logout();
        }

        if (status === 404) {
            return Promise.reject({
                message: 'Không tồn tại !',
            });
        }

        if (status === 500) {
            return Promise.reject({
                message: 'Server đã xảy ra lỗi !!',
            });
        }

        return Promise.reject(errorData?.error);
    }
);

export default instance;
