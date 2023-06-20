import { Button, Col, Modal, Row, Space, Spin, Typography } from 'antd';
import { Icon } from 'src/components/common';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { format3P } from 'src/utils';
import { Fragment, useEffect, useState } from 'react';
import DetailProductTable from './DetailProductTable';
import { useGlobalsContext } from 'src/contexts';
import { SystemServices } from 'src/services';
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
        } catch (error) {}
    };

    const handleSaveInfo = () => {
        confirm({
            title: 'Chắc chắn muốn lưu thông tin ?',
            icon: <Icon name='ExclamationCircleFilled' />,
            okText: 'Xác nhận',
            okType: 'danger',
            cancelText: 'Huỷ',
            onOk() {},
            onCancel() {},
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
                            <Col span={16}>Info</Col>
                            <Col span={8}>Images</Col>
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
