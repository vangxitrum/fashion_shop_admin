import axios, { AxiosError } from 'axios';
import { config } from '../utils';
const instance = axios.create({
    baseURL: config.apiUrl,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

instance.interceptors.response.use(
    (res) => {
        return res.data;
    },
    async (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export default instance;
