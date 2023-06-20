import api from './apiWithoutToken';
import tokenApi from './api';
import authHeader from './authHeader';
const getOrders = (params: any) => {
    return api.get('/products', {
        params,
    });
};

// Products API
const getProducts = (params: any) => {
    return api.get('/products', {
        params,
    });
};

const getProductInfo = (productId: any) => {
    return api.get(`/product/${productId}`);
};
const createProduct = (params: any) => {
    return api.put('/product', params);
};

const SystemServices = {
    getOrders,
    getProducts,
    getProductInfo,
    createProduct,
};
export default SystemServices;
