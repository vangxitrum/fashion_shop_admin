import instance from './api';
import authHeader from './authHeader';

export const getProductList = (params: any) => {
    return instance.get('/products/', {
        params,
        headers: {
            Authorization: authHeader(),
        },
    });
};
