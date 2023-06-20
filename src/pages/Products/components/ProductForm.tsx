import React, { useEffect } from 'react';
import {
    Modal,
    Form,
    Input,
    Row,
    Col,
    Button,
    Typography,
    InputNumber,
} from 'antd';
import Select from 'antd/lib/select';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SystemServices } from 'src/services';
import { useGlobalsContext } from 'src/contexts';
const { Title } = Typography;
const { TextArea } = Input;

export default function ProductForm({
    visible,
    onClose,
    initData,
}: {
    visible: boolean;
    onClose: Function;
    initData: any;
}) {
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const { globalActions } = useGlobalsContext();

    const onCloseModal = () => {
        form.resetFields();
        onClose();
    };

    useEffect(() => {
        if (visible && form) {
            form.resetFields();
        } else {
            onCloseModal();
        }
    }, [visible, form]);

    const {
        mutate: createProduct,
        error: createProductError,
        isLoading: createProductLoading,
        isSuccess: createProductSuccess,
    } = useMutation({
        mutationFn: async (newAccount: any) => {
            try {
                const res = await SystemServices.createProduct(newAccount);
                return res.data;
            } catch (error) {
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products'],
            });
        },
    });

    useEffect(() => {
        if (createProductError) {
            globalActions.setNotification({
                type: 'error',
                title: `Không thể tạo mới sản phẩm!`,
                message: `${createProductError}`,
            });
        }
    }, [createProductError]);

    useEffect(() => {
        if (createProductSuccess) {
            globalActions.setNotification({
                type: 'success',
                title: `Thêm sản phẩm mới thành công!`,
            });
        }
    }, [createProductSuccess]);

    const handleSubmit = async (values: any) => {
        if (initData) {
        } else {
            console.log(values);
            const transformedParams = {
                brand: values?.brand || 'error',
                description: values?.description || '',
                discount_percent: values?.discount_percent || 0,
                gender: values?.gender || 'error',
                name: values?.name || 'error',
                price: values?.price || 0,
                types: values.types ? [values?.types] : ['error'],
            };
            createProduct(transformedParams);
        }
    };

    return (
        <Modal
            title={
                <Title level={3} className='tw-font-semibold'>
                    {initData ? 'Chỉnh sửa' : 'Thêm mới'} sản phẩm
                </Title>
            }
            open={visible}
            onCancel={onCloseModal}
            forceRender={true}
            footer={[
                <Button key='back' onClick={onCloseModal}>
                    Huỷ
                </Button>,
                <Button
                    key='submit'
                    className='tw-bg-blue-500'
                    type='primary'
                    loading={createProductLoading}
                    onClick={form.submit}
                >
                    Xác nhận
                </Button>,
            ]}
        >
            <Form
                initialValues={{
                    name: initData?.name || '',
                    gender: initData?.gender || '',
                    brand: initData?.brand || '',
                    types: initData?.types ? initData?.types[0] : '',
                    price: initData?.price || undefined,
                    discount_percent: initData?.discount_percent || 0,
                    description: initData?.description || '',
                }}
                form={form}
                onFinish={handleSubmit}
                layout='vertical'
            >
                <Row gutter={12}>
                    <Col span={16}>
                        <Form.Item
                            shouldUpdate={(prevValues, curValues) =>
                                prevValues.fullname !== curValues.fullname
                            }
                            name='name'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Tên sản phẩm
                                </label>
                            }
                            required
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên sản phẩm !!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            shouldUpdate={(prevValues, curValues) =>
                                prevValues.fullname !== curValues.fullname
                            }
                            name='gender'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Sản phẩm dành cho
                                </label>
                            }
                            required
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Vui lòng chọn loại giới tính của sản phẩm !!',
                                },
                            ]}
                        >
                            <Select
                                className='tw-w-full'
                                options={[
                                    {
                                        label: 'Đàn ông',
                                        value: 'MEN',
                                    },
                                    {
                                        label: 'Phụ nữ',
                                        value: 'WOMEN',
                                    },
                                    {
                                        label: 'Trẻ em',
                                        value: 'KID',
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={24} md={{ span: 12 }}>
                        <Form.Item
                            name='brand'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Thương hiệu
                                </label>
                            }
                            required
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Vui lòng nhập thương hiệu cho sản phẩm!!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={{ span: 12 }}>
                        <Form.Item
                            name='types'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Thể loại
                                </label>
                            }
                            required
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Vui lòng nhập thể loại cho sản phẩm!!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={{ span: 12 }}>
                        <Form.Item
                            name='price'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Giá tiền
                                </label>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập giá sản phẩm',
                                },
                            ]}
                        >
                            <InputNumber
                                min={0}
                                className='tw-w-full'
                                width={`100%`}
                                formatter={(value: any) =>
                                    `${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ','
                                    )
                                }
                                parser={(value: any) =>
                                    value!.replace(/\$\s?|(,*)/g, '')
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={{ span: 12 }}>
                        <Form.Item
                            name='discount_percent'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Giảm giá (%)
                                </label>
                            }
                        >
                            <InputNumber
                                min={0}
                                className='tw-w-full'
                                width={`100%`}
                                formatter={(value: any) => `${value} %`}
                                parser={(value: any) => value!.replace('%', '')}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={24}>
                        <Form.Item
                            name='description'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Mô tả
                                </label>
                            }
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
