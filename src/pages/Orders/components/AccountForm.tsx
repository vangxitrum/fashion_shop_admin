import React, { useEffect } from 'react';
import { useAccount } from '../contexts/AccountContext';
import { Modal, Form, Input, Row, Col, Select, Button, Typography } from 'antd';
const { Title } = Typography;
export default function UserForm() {
    const [form] = Form.useForm();
    const [accountState, accountActions] = useAccount();
    const { toggleFormVisible, createAccount, updateAccount } = accountActions;

    const loading = accountState?.addLoading || accountState?.updateLoading;

    useEffect(() => {
        if (accountState?.isFormVisible) {
            form.resetFields();
        } else {
            onCloseModal();
        }
    }, [accountState?.isFormVisible]);

    const handleSubmit = async (values: any) => {
        if (accountState?.formData?.id) {
            updateAccount({
                id: accountState?.formData?.id,
                ...values,
                accounttypeid: values.accounttypeid || null,
            });
        } else {
            createAccount(values);
        }
    };

    const onCloseModal = () => {
        form.resetFields();
        toggleFormVisible(false);
    };
    return (
        <Modal
            title={
                <Title level={3} className='tw-font-semibold'>
                    {accountState?.formData ? 'Chỉnh sửa' : 'Thêm mới'} tài
                    khoản
                </Title>
            }
            open={accountState?.isFormVisible}
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
                    loading={loading}
                    onClick={form.submit}
                >
                    Xác nhận
                </Button>,
            ]}
        >
            <Form
                initialValues={{
                    fullname: accountState?.formData?.fullname,
                    username: accountState?.formData?.username,
                    address: accountState?.formData?.address,
                    email: accountState?.formData?.email,
                    phone_number: accountState?.formData?.phone_number,
                    status:
                        accountState?.formData?.status === 'active'
                            ? 'active'
                            : 'inactive',
                    note: accountState?.formData?.ghi_chu,
                }}
                form={form}
                onFinish={handleSubmit}
                layout='vertical'
            >
                <Row gutter={12}>
                    <Col span={24} md={{ span: 12 }}>
                        <Form.Item
                            shouldUpdate={(prevValues, curValues) =>
                                prevValues.fullname !== curValues.fullname
                            }
                            name='fullname'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Tên nhân viên
                                </label>
                            }
                            required
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Tên nhân viên không được trống !!',
                                },
                            ]}
                        >
                            <Input placeholder='Tran Van A...' />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={{ span: 12 }}>
                        <Form.Item
                            name='username'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Tên tài khoản
                                </label>
                            }
                            required
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Tên tài khoản không được trống !!',
                                },
                            ]}
                        >
                            <Input placeholder='atranvan ...' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={24} md={{ span: 12 }}>
                        <Form.Item
                            name='email'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Email
                                </label>
                            }
                            required
                            rules={[
                                {
                                    type: 'email',
                                },
                                {
                                    required: true,
                                    message:
                                        'Địa chỉ email không được trống !!',
                                },
                            ]}
                        >
                            <Input placeholder='abc@blabla...' type='email' />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={{ span: 12 }}>
                        <Form.Item
                            name='phone_number'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Số điện thoại
                                </label>
                            }
                            rules={[{}]}
                        >
                            <Input type='number' placeholder='0123456789' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={24} md={{ span: 12 }}>
                        <Form.Item
                            name='address'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Địa chỉ
                                </label>
                            }
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={{ span: 12 }}>
                        <Form.Item
                            name='status'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Trạng thái
                                </label>
                            }
                        >
                            <Select
                                placeholder='Trạng thái'
                                options={[
                                    {
                                        value: 'active',
                                        label: 'Hoạt động',
                                    },
                                    {
                                        value: 'inactive',
                                        label: 'Ngừng hoạt động',
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
