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
import { addPhotoProduct, deleteProductPhotos } from 'src/services/product.services';
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
        try {
        } catch (error) { }
    };

    const handleSaveInfo = () => {
        confirm({
            title: 'Chắc chắn muốn lưu thông tin ?',
            icon: <Icon name='ExclamationCircleFilled' />,
            okText: 'Xác nhận',
            okType: 'danger',
            cancelText: 'Huỷ',
            onOk() { },
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
                title: `Tải chi tiết sản phẩm thất bại`,
                message: `${err}`,
            });
        })
    }

    const onPhotoFile = (event) => {
        const datas = event.target.files
        addPhotoProduct(productDetailId, datas).then(res => {
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
                                        <input className='tw-h-8 !tw-outline-none tw-border tw-px-2 tw-rounded' placeholder='Tên sản phẩm' />
                                    </Col>
                                    <Col className='tw-flex tw-flex-col tw-pl-1'>
                                        <label className="tw-text-black tw-font-bold">Giá bán</label>
                                        <input className='tw-h-8 !tw-outline-none tw-border tw-px-2 tw-rounded' placeholder='Giá bán' type='number' />
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
                                    return <div key={"item-image" + index} className='tw-border tw-rounded-sm tw-w-16 tw-h-16 tw-mr-2 relative'>
                                        <div onClick={() => deletePhoto(item)} className='tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center tw-cursor-pointer hover:tw-shadow tw-rounded-full tw-absolute tw-bg-white'>
                                            <DeleteOutlined color='red' className='tw-text-red-500' />
                                        </div>
                                        <img className='tw-w-full tw-h-full tw-object-corver' src={item} />
                                    </div>
                                })}
                                <div className='tw-border tw-rounded-sm tw-w-16 tw-h-16 tw-mr-2 relative'>
                                    <label htmlFor='form-input-file-product' className='tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-cursor-pointer'>
                                        <PlusOutlined className='tw-text-xl tw-text-gray-500' />
                                    </label>
                                    <input onChange={onPhotoFile} multiple type='file' className=' tw-hidden' id='form-input-file-product' />
                                </div>
                            </Col>
                        </Row>
                        <DetailProductTable
                            detailInfo={info?.product_quantities || []}
                        />
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
