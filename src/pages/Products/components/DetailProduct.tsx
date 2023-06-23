import { Button, Col, Modal, Row, Space, Spin, Typography } from 'antd';
import { Icon } from 'src/components/common';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { format3P } from 'src/utils';
import { Fragment, useEffect, useState } from 'react';
import DetailProductTable from './DetailProductTable';
import { useGlobalsContext } from 'src/contexts';
import { SystemServices } from 'src/services';
import SelectBrand from './SelectBrand'
import SelectGender from './SelectGender';
import {
    DeleteOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { addPhotoProduct, deleteProductPhotos, updateProduct } from 'src/services/product.services';
const { confirm } = Modal;
const { Text, Title } = Typography;
const items: MenuProps['items'] = [
    {
        label: 'Xem chi tiết',
        key: 'detail',
    },
    {
        label: 'Chỉnh sửa nhanh',
        key: 'modify',
    },
    {
        label: 'Xoá sản phẩm',
        key: 'delete',
        danger: true,
    },
    {
        type: 'divider',
    },
];
const DetailProduct = ({
    productDetailId,
    onClose,
}: {
    productDetailId: any;
    onClose: Function;
}) => {
    const [isQuantityFormVisible, toggleQuantityFormVisible] =
        useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const { globalActions } = useGlobalsContext();
    const [info, setInfo] = useState<any>(null);

    const saveData = async () => {
        const dataForm = {
            "brand": info.brand,
            "description": info.description,
            "discount_percent": info.discount_percent,
            "gender": info.gender,
            "id": productDetailId,
            "name": info.name,
            "price": info.price,
            "product_quantities": info.product_quantities.map((item, index) => {
                return {
                    "color": item.color,
                    "detail_id": item.detail_id,
                    "id": item.id,
                    "quantity": parseInt(item.quantity),
                    "size": item.size
                }
            }),
            "tags": info.tags,
            "types": info.types
        }
        updateProduct(dataForm).then(res => {
            onClose()
            globalActions.setNotification({
                type: 'success',
                title: `Cập nhật sản phẩm thành công`,
                message: `Cập nhật sản phẩm thành công`,
            });
        }).catch(err => {
            globalActions.setNotification({
                type: 'error',
                title: `Cập nhật sản phẩm thất bại`,
                message: `${err}`,
            });
        })
    };

    const handleSaveInfo = () => {
        confirm({
            title: 'Chắc chắn muốn lưu thông tin ?',
            icon: <Icon name='ExclamationCircleFilled' />,
            okText: 'Xác nhận',
            okType: 'danger',
            cancelText: 'Huỷ',
            onOk() { saveData() },
            onCancel() { },
        });
    };

    const getProductInfomation = async (productId: any) => {
        try {
            setLoading(true);
            const res: any = await SystemServices.getProductInfo(productId);
            setInfo(res.data);
        } catch (error) {
            console.log('error', error);
            globalActions.setNotification({
                type: 'error',
                title: `Tải chi tiết sản phẩm thất bại`,
                message: `${error}`,
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (productDetailId) {
            getProductInfomation(productDetailId);
        } else {
            setLoading(true);
        }
    }, [productDetailId]);

    const deletePhoto = (item) => {
        deleteProductPhotos(item, productDetailId).then(res => {
            setInfo(prev => {
                const photos = prev.photos.filter(i => i !== item)
                return { ...prev, photos }
            })
            globalActions.setNotification({
                type: 'success',
                title: `Đã xóa hình ảnh thành công`,
            });
        }).catch(err => {
            globalActions.setNotification({
                type: 'error',
                title: `Xóa sản phẩm thất bại`,
                message: `${err}`,
            });
        })
    }

    const onPhotoFile = ({
        currentTarget: { files },
    }: React.ChangeEvent<HTMLInputElement>) => {
        const datas = []
        for (let index = 0; index < files.length; index++) {
            datas.push(files[index])
        }
        addPhotoProduct(productDetailId, datas).then(res => {
            setInfo(prev => ({ ...prev, photos: res.data }))
            globalActions.setNotification({
                type: 'success',
                title: `Tải hình ảnh thành công`,
                message: `Bạn đã thêm thành công ${datas?.length} hình`,
            });
        }).catch(error => {
            globalActions.setNotification({
                type: 'error',
                title: `Tải chi tiết sản phẩm thất bại`,
                message: `${error}`,
            });
        })
    }

    if (!productDetailId) return null;

    return (
        <Fragment>
            <div className='tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full tw-bg-white tw-p-3 tw-rounded-lg tw-z-10'>
                {loading ? (
                    <div className='tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center'>
                        <Spin
                            tip='Đang tải thông tin sản phẩm ...'
                            size='large'
                        ></Spin>
                    </div>
                ) : (
                    <div className='tw-overflow-y-auto tw-w-full tw-overflow-x-hidden'>
                        <Row gutter={24}>
                            <Col span={24}>
                                <div className='tw-flex tw-items-center tw-justify-between tw-w-full'>
                                    <Title level={3}>
                                        <Icon
                                            name='LeftOutlined'
                                            className='tw-cursor-pointer'
                                            onClick={() => onClose()}
                                        />
                                        Thông tin chung
                                    </Title>
                                    <Space>
                                        <Button
                                            type='primary'
                                            onClick={() => handleSaveInfo()}
                                        >
                                            Lưu
                                        </Button>
                                    </Space>
                                </div>
                            </Col>
                            <Col span={12}>
                                <Row className='tw-mb-2'>
                                    <Col className='tw-flex tw-flex-col tw-pr-1'>
                                        <label className="tw-text-black tw-font-bold">Tên sản phẩm</label>
                                        <input value={info.name || ""} onChange={e => setInfo(prev => ({ ...prev, name: e.target.value }))} className='tw-h-8 !tw-outline-none tw-border tw-px-2 tw-rounded' placeholder='Tên sản phẩm' />
                                    </Col>
                                    <Col className='tw-flex tw-flex-col tw-pl-1'>
                                        <label className="tw-text-black tw-font-bold">Giá bán</label>
                                        <input value={info.price || ""} onChange={e => setInfo(prev => ({ ...prev, price: e.target.value }))} className='tw-h-8 !tw-outline-none tw-border tw-px-2 tw-rounded' placeholder='Giá bán' type='number' />
                                    </Col>
                                </Row>
                                <Row className='tw-flex'>
                                    <Col className='tw-flex tw-flex-col tw-pr-1 '>
                                        <label className="tw-text-black tw-font-bold">Thương hiệu</label>
                                        <SelectBrand value={info.brand} onSelect={val => setInfo(prev => ({ ...prev, brand: val }))} />
                                    </Col>
                                    <Col className='tw-flex tw-flex-col tw-pl-1'>
                                        <label className="tw-text-black tw-font-bold">Giới tính</label>
                                        <SelectGender value={info.gender} onSelect={val => setInfo(prev => ({ ...prev, gender: val }))} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={8} className='tw-flex tw-flex-row tw-flex-wrap'>
                                {info?.photos?.map((item, index) => {
                                    return <div key={"item-image" + index} className='tw-border tw-rounded-sm tw-w-16 tw-h-16 tw-mr-2 relative tw-mb-2'>
                                        <div onClick={() => deletePhoto(item)} className='tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-shadow tw-rounded-full tw-absolute tw-bg-white'>
                                            <DeleteOutlined color='red' className='tw-text-red-500' />
                                        </div>
                                        <img className='tw-w-full tw-h-full tw-object-corver' src={item} />
                                    </div>
                                })}
                                <div className='tw-border tw-rounded-sm tw-w-16 tw-h-16 tw-mr-2 relative tw-mb-2'>
                                    <label htmlFor='form-input-file-product' className='tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-cursor-pointer'>
                                        <PlusOutlined className='tw-text-xl tw-text-gray-500' />
                                    </label>
                                    <input onChange={onPhotoFile} multiple type='file' className=' tw-hidden' id='form-input-file-product' />
                                </div>
                            </Col>
                        </Row>
                        <DetailProductTable
                            detailInfo={info?.product_quantities || []}
                            onChangeData={(data) => {
                                setInfo(prev => ({ ...prev, product_quantities: data }))
                            }}
                        />
                        <div>
                            <label className=' tw-font-bold'>Mô tả</label>
                            <textarea value={info.description || ""} onChange={e => setInfo(prev => ({ ...prev, description: e.target.value }))} placeholder='Mô tả' className=' tw-border tw-w-full !tw-outline-none tw-p-2 tw-rounded' rows={5} />
                        </div>
                        <div className='tw-flex tw-flex-row tw-flex-wrap'>
                            {["HOT", "SALE", "NEW"].map((item, index) => {
                                const active = info.tags && info.tags.find(i => i === item)
                                return (
                                    <div
                                        onClick={() => {
                                            if (active) {
                                                setInfo(prev => {
                                                    const tags = prev.tags.filter(i => i !== item)
                                                    return {
                                                        ...prev,
                                                        tags: tags
                                                    }
                                                })
                                            } else {
                                                setInfo(prev => ({ ...prev, tags: Array.isArray(prev.tags) ? [...prev.tags, item] : [item] }))
                                            }
                                        }}
                                        key={`item-tags-${index}`} className={`tw-px-4 tw-py-2 tw-border tw-rounded tw-mr-2 ${active ? " tw-bg-blue-400 tw-text-white tw-cursor-pointer" : ""}`}>
                                        <span>{item}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='tw-mt-2 tw-flex tw-flex-col'>
                            <label className='tw-font-bold'>Nhập loại sản phẩm</label>
                            <input
                                className='tw-border tw-px-2  tw-h-8 tw-rounded'
                                placeholder='Nhập loại' value={info.types[0] || ""} onChange={e => setInfo(prev => ({ ...prev, types: [e.target.value] }))} />
                        </div>
                    </div>
                )}
            </div>
            <Modal
                title='Tạo mới chi tiết sản phẩmm'
                open={isQuantityFormVisible}
                onCancel={() => toggleQuantityFormVisible(false)}
            ></Modal>
        </Fragment>
    );
};

export default DetailProduct;
