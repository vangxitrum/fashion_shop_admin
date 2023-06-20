import apiWithToken from './api';
import authHeader from './authHeader';

export const getCurrentUser = async () => {
    return apiWithToken.get('/users/me', {
        headers: {
            Authorization: authHeader(),
        },
    });
};

const UserServices = {
    getCurrentUser,
};

export default UserServices;
