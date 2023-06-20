import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, InputRef, Layout, Row, Space, Typography } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { DetailProduct, ProductForm, ProductsList } from './components';
import { useGlobalsContext } from '../../contexts';
import { OrderStatusSelect } from './components';
import { useProducts } from './hooks/useProducts';
const { Content } = Layout;
const { Title } = Typography;

const ProductDashboard = () => {
    const { globalActions } = useGlobalsContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState<any>({
        page: 1,
        page_size: 12,
    });
    const [isProductFormVisible, toggleProductFormVisible] =
        useState<boolean>(false);
    const [selectedProductId, setSelectedProductId] = useState<any>(null);
    const {
        data: products,
        isLoading,
        isFetching,
        error: productListError,
        total,
    } = useProducts(filters);
    const searchRef = useRef<InputRef>(null);

    const handleStartSearch = () => {
        setFilters((prevProductFilters: any) => ({
            ...prevProductFilters,
            name: searchRef.current?.input?.value.trim(),
        }));
    };

    useEffect(() => {
        document.title = `Quản lý sản phẩm`;
    }, []);

    useEffect(() => {
        if (productListError) {
            globalActions.setNotification({
                type: 'error',
                title: `Tải danh sách sản phẩm thất bại`,
                message: `${productListError}`,
            });
        }
    }, [productListError]);

    const handleChange = (value: string) => {
        searchParams.set('status', value);
        setSearchParams(searchParams);
    };

    const onShowDetail = (productId: any) => {
        setSelectedProductId(productId);
    };

    return (
        <Content className='tw-relative tw-my-3 tw-mx-4 tw-bg-white tw-p-3 tw-rounded-lg'>
            <div className='tw-flex tw-flex-col tw-h-full tw-w-full'>
                <Row gutter={[12, 12]} className='tw-mb-4'>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <Title className='tw-mb-0' level={3}>
                            Danh sách sản phẩm
                        </Title>
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 16 }}>
                        <Space
                            align='center'
                            className='tw-w-full tw-justify-end'
                        >
                            <OrderStatusSelect
                                value={filters.status}
                                onSelectionChange={handleChange}
                            />
                            <Button
                                onClick={() => toggleProductFormVisible(true)}
                                type='primary'
                            >
                                Tạo mới sản phẩm
                            </Button>
                        </Space>
                    </Col>
                </Row>
                <div className='tw-flex-1'>
                    <ProductsList
                        loading={isFetching || isLoading}
                        page={filters?.page}
                        onPageChange={(page: number) =>
                            setFilters((prevProductFilters: any) => ({
                                ...prevProductFilters,
                                page,
                            }))
                        }
                        products={products || []}
                        total={total || 0}
                        onShowDetail={onShowDetail}
                    />
                </div>
            </div>

            <ProductForm
                visible={isProductFormVisible}
                onClose={() => toggleProductFormVisible(false)}
                initData={null}
            />

            <DetailProduct
                productDetailId={selectedProductId}
                onClose={() => {
                    setSelectedProductId(null);
                }}
            />
        </Content>
    );
};

export default ProductDashboard;
