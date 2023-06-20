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


export const getListBrand = () => {
    return instance.get("products/brands", {
        headers: {
            Authorization: authHeader(),
        },
    })
}

export const deleteProductPhotos = (photo_url: string, product_id: string) => {
    return instance.delete(`product_photo?photo_url=${photo_url}&product_id=${product_id}`, {
        headers: {
            Authorization: authHeader(),
        },
    })
}

export const addPhotoProduct = (id: string, files: any[]) => {
    const formData = new FormData()
    files.map(item => {
        formData.append('photo_files', item)
    })
    return instance.post(`product_photos/upload/${id}`, formData, {
        headers: {
            Authorization: authHeader(),
            'Content-Type': 'multipart/form-data'
        },
    })
}