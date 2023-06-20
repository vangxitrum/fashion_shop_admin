import React, { useEffect } from 'react';
import { Modal, Form, Input, Row, Col, Select, Button, Typography } from 'antd';
import { useRoleGroups } from '../contexts/RoleGroupContext';
const { Title } = Typography;
export default function RoleGroupForm() {
    const [form] = Form.useForm();
    const [roleGroupsState, roleGroupsActions] = useRoleGroups();
    const { toggleFormVisible, createRole, updateAccount } = roleGroupsActions;

    useEffect(() => {
        if (roleGroupsState?.isFormVisible) {
            form.resetFields();
        } else {
            onCloseModal();
        }
    }, [roleGroupsState?.isFormVisible]);

    const handleSubmit = async (values: any) => {
        if (roleGroupsState?.formData?.id) {
            updateAccount({
                userId: roleGroupsState?.formData?.id,
                ...values,
            });
        } else {
            createRole(values);
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
                    {roleGroupsState?.formData ? 'Chỉnh sửa' : 'Thêm mới'} nhóm
                    quyền
                </Title>
            }
            open={roleGroupsState?.isFormVisible}
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
                    loading={roleGroupsState?.loading}
                    onClick={form.submit}
                >
                    Xác nhận
                </Button>,
            ]}
        >
            <Form
                initialValues={{
                    name: roleGroupsState?.formData?.name,
                    code: roleGroupsState?.formData?.code,
                    group_id: roleGroupsState?.formData?.group_id,
                    status:
                        roleGroupsState?.formData?.status === 'active'
                            ? 'active'
                            : 'inactive',
                }}
                form={form}
                onFinish={handleSubmit}
                layout='vertical'
            >
                <Row gutter={12}>
                    <Col span={24}>
                        <Form.Item
                            shouldUpdate={(prevValues, curValues) =>
                                prevValues.name !== curValues.name
                            }
                            name='name'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Tên nhóm
                                </label>
                            }
                            required
                            rules={[
                                {
                                    required: true,
                                    message: 'Tên nhóm không được trống !!',
                                },
                            ]}
                        >
                            <Input placeholder='Tên nhóm ...' />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name='group_id'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Loại nhóm
                                </label>
                            }
                            required
                            rules={[
                                {
                                    required: true,
                                    message: 'Loại nhóm không được trống !!',
                                },
                            ]}
                        >
                            <Select
                                loading={roleGroupsState?.roleGroupsLoading}
                                placeholder='Chọn nhóm quyền...'
                                options={roleGroupsState?.roleGroups?.map(
                                    (roleGroup: any) => ({
                                        label: roleGroup?.name,
                                        value: roleGroup?.id,
                                    })
                                )}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={24}>
                        <Form.Item
                            name='code'
                            label={
                                <label className='tw-font-semibold tw-text-sm'>
                                    Mã nhóm
                                </label>
                            }
                        >
                            <Input placeholder='CODE...' type='code' />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
