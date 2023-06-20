import React, { useEffect, useMemo, useState } from 'react';
import {
    Modal,
    Input,
    Row,
    Col,
    Button,
    Typography,
    Space,
    Checkbox,
    Table,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRoleGroups } from '../contexts/RoleGroupContext';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import ButtonGroup from 'antd/es/button/button-group';
import { Icon } from '../../../components/common';
import { SystemServices } from '../../../services';
import type { TableRowSelection } from 'antd/es/table/interface';
import { useGlobalsContext } from '../../../contexts';
const { Title } = Typography;

interface Permission {
    key: string;
    name: string;
    read: boolean | 0 | 1;
    create: boolean | 0 | 1;
    update: boolean | 0 | 1;
    delete: boolean | 0 | 1;
    verify: boolean | 0 | 1;
}

interface Screen {
    key: string;
    name: string;
    slug: string;
    isChecked: boolean;
}

export default function GrantPermission() {
    const [roleGroupsState, roleGroupsActions] = useRoleGroups();
    const [showAddScreenView, setShowAddScreenView] = useState<boolean>(false);
    const [permissions, setPermissions] = useState<any[]>([]);
    const [screens, setScreens] = useState<any[]>([]);
    const { openNotification } = useGlobalsContext();

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const { togglePermissionFormVisible } = roleGroupsActions;

    // handle select row
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    // handle close modal
    const onCloseModal = () => {
        togglePermissionFormVisible(false);
        setShowAddScreenView(false);
    };

    const rowSelection: TableRowSelection<Screen> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columnsPermission: ColumnsType<Permission> = [
        {
            title: 'Tên màn hình',
            dataIndex: 'screen_name',
            key: 'screen_name',
        },
        {
            title: 'Xem',
            dataIndex: 'read',
            key: 'read',
            align: 'center',
            render(value, record, index) {
                return (
                    <Checkbox
                        defaultChecked={value}
                        checked={value}
                        onChange={(e: CheckboxChangeEvent) => {}}
                    />
                );
            },
        },
        {
            title: 'Tạo mới',
            dataIndex: 'create',
            key: 'create',
            align: 'center',
            render(value, record, index) {
                return (
                    <Checkbox
                        checked={value}
                        onChange={(e: CheckboxChangeEvent) => {}}
                    />
                );
            },
        },
        {
            title: 'Chỉnh sửa / Cập nhật',
            dataIndex: 'update',
            key: 'update',
            align: 'center',
            render(value, record, index) {
                return (
                    <Checkbox
                        checked={value}
                        onChange={(e: CheckboxChangeEvent) => {}}
                    />
                );
            },
        },
        {
            title: 'Xoá',
            dataIndex: 'delete',
            key: 'delete',
            align: 'center',
            render(value, record, index) {
                return (
                    <Checkbox
                        checked={value}
                        onChange={(e: CheckboxChangeEvent) => {}}
                    />
                );
            },
        },
        {
            title: 'Phê duyệt',
            dataIndex: 'verify',
            align: 'center',
            key: 'verify',
            render(value, record, index) {
                return (
                    <Checkbox
                        checked={value}
                        onChange={(e: CheckboxChangeEvent) => {}}
                    />
                );
            },
        },
    ];

    const columnsSelectScreen: ColumnsType<Screen> = [
        {
            title: 'Tên màn hình',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Slug',
            dataIndex: 'alias',
            key: 'alias',
            align: 'center',
        },
    ];

    return (
        <Modal
            width={'80%'}
            title={
                <Title level={3} className='tw-font-semibold'>
                    Phân quyền nhóm{' '}
                    {`${roleGroupsState?.permissionsFormData?.roleName}`}
                </Title>
            }
            open={roleGroupsState?.isPermissionFormVisible}
            onCancel={onCloseModal}
            footer={null}
            forceRender={true}
        >
            <Row gutter={[12, 12]}>
                <Col span={24}>
                    <Space>
                        {showAddScreenView ? (
                            <ButtonGroup className='tw-gap-1'>
                                <Button
                                    className='tw-bg-gray-400 tw-text-white
                                    '
                                    type='default'
                                    onClick={() => setShowAddScreenView(false)}
                                >
                                    Đóng
                                </Button>
                                <Button
                                    type='default'
                                    className='tw-bg-green-500 tw-text-white'
                                >
                                    Đồng ý
                                </Button>
                            </ButtonGroup>
                        ) : (
                            <Button
                                type='primary'
                                className='tw-bg-primary'
                                onClick={() => setShowAddScreenView(true)}
                            >
                                Thêm màn hình
                            </Button>
                        )}
                    </Space>
                </Col>
                <Col span={12}>
                    <Input
                        prefix={<Icon name='AppstoreOutlined' />}
                        size='large'
                        placeholder='Tìm kiếm tên màn hình ...'
                    />
                </Col>
                <Col span={24}>
                    {showAddScreenView ? (
                        <Table
                            rowSelection={rowSelection}
                            columns={columnsSelectScreen}
                            pagination={{
                                pageSize: 5,
                                showTotal(total, range) {
                                    return (
                                        <span>Tổng cộng: {total} màn hình</span>
                                    );
                                },
                            }}
                            dataSource={screens}
                        />
                    ) : (
                        <Table
                            columns={columnsPermission}
                            dataSource={permissions}
                            pagination={{
                                pageSize: 5,
                                showTotal(total, range) {
                                    return (
                                        <span>Tổng cộng: {total} màn hình</span>
                                    );
                                },
                            }}
                        />
                    )}
                </Col>
            </Row>
        </Modal>
    );
}
