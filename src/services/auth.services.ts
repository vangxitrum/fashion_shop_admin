import api from './api';
import { history } from '../utils';

const login = async (username: string, password: string) => {
    const response: {
        access_token: string;
        status: string | boolean;
    } = await api.post('/auth/sign-in', {
        email: username,
        password,
    });
    return response;
};

const logout = async (fallBackUrl: string | null = '') => {
    try {
        if (fallBackUrl?.trim() !== '') {
            history.navigate(`/dang-nhap?fallBackUrl=${fallBackUrl}`);
        } else {
            history.navigate(`/dang-nhap`);
        }
    } catch (error) {
        history.navigate(`/dang-nhap`);
    }
};

const AuthServices = {
    login,
    logout,
};

export default AuthServices;
