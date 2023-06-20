import { Icon } from '../../../components/common';
import React, { useEffect, useState } from 'react';
import { Dropdown, Space, Table, Button, Modal } from 'antd';
import type { MenuProps } from 'antd';
import type { TableColumnsType } from 'antd';
import { withTableSize } from '../../../hocs';
import { useRoleGroups } from '../contexts/RoleGroupContext';

interface RoleType {
    key: React.Key;
    id: string;
    groupTypeName: string;
    groupName?: string;
    groupCode?: string;
    isParent: boolean;
    groupId: string;
    children?: RoleType[];
}

const { confirm } = Modal;

const items: MenuProps['items'] = [
    {
        key: 'grant_permission',
        label: 'Phân quyền',
        icon: <Icon name='KeyOutlined' />,
    },
    { key: 'modify', label: 'Chỉnh sửa', icon: <Icon name='FormOutlined' /> },
    {
        key: 'delete',
        label: 'Xoá',
        icon: <Icon name='DeleteOutlined' />,
        danger: true,
    },
];

const RoleGroupList: React.FC<any> = (props) => {
    const { parrentSize } = props;
    const [roleGroupsState, roleGroupsActions] = useRoleGroups();
    const { toggleFormVisible, deleteRole, togglePermissionFormVisible } =
        roleGroupsActions;
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        if (roleGroupsState?.roleGroups?.length && roleGroupsState?.roles) {
            const data: RoleType[] = [];
            roleGroupsState?.roleGroups.forEach(
                (role, index: typeof roleGroupsState.roleGroups) => {
                    data.push({
                        key: role.id,
                        id: role.id,
                        groupTypeName: role.name,
                        groupId: role.group_id,
                        isParent: true,
                        children: groupRole(
                            role.id,
                            role.name,
                            roleGroupsState?.roles
                        ),
                    });
                }
            );
            setData(data);
        }
    }, [roleGroupsState?.roleGroups, roleGroupsState?.roles]);

    const groupRole = (
        groupId: string,
        groupName: string,
        listRole: RoleType[] = []
    ) => {
        let matches = [];
        matches = listRole
            .filter((role: any) => role.group_id === groupId)
            .map((role: any, index) => {
                return {
                    key: index,
                    id: role.id,
                    groupTypeName: groupName,
                    groupName: role?.name,
                    groupCode: role?.code,
                    isParent: false,
                };
            });
        return matches.length ? matches : null;
    };

    const handleMenuClick = (props: any, id: any) => {
        let key = props.key || '';
        switch (key) {
            case 'grant_permission':
                const role = roleGroupsState?.roles.find(
                    (role: any) => role.id === id
                );
                togglePermissionFormVisible(true, {
                    roleName: role.name,
                    roleId: role.id,
                });
                return;
            case 'modify':
                const item = roleGroupsState.roles.find(
                    (screen: { id: string | number }) => screen?.id === id
                );
                if (item) {
                    toggleFormVisible(true, item);
                }
                return;
            case 'delete': {
                confirm({
                    title: 'Bạn chắc chắn muốn xoá màn hình này ?',
                    icon: <Icon name='ExclamationCircleFilled' />,
                    content: 'Sau khi xoá, màn hình sẽ không thể truy cập.',
                    okText: 'Xác nhận',
                    okType: 'danger',
                    cancelText: 'Huỷ',
                    onOk() {
                        deleteRole(id);
                    },
                    onCancel() {},
                });
                return;
            }
            default:
                return;
        }
    };

    const columnsTree: TableColumnsType<RoleType> = [
        {
            title: 'Loại nhóm',
            dataIndex: 'groupTypeName',
            key: 'groupTypeName',
            onCell(data, index) {
                if (data.isParent) {
                    return {
                        colSpan: 4,
                        className: 'tw-bg-gray-200 tw-font-semibold tw-text-sm',
                    };
                }
                return {};
            },
            render(value, record, index) {
                return record.isParent ? value : '';
            },
        },
        {
            title: 'Tên nhóm',
            dataIndex: 'groupName',
            key: 'groupName',
            onCell(data, index) {
                return {
                    colSpan: data.isParent ? 0 : 1,
                };
            },
        },
        {
            title: 'Mã nhóm',
            dataIndex: 'groupCode',
            key: 'groupCode',
            onCell(data, index) {
                return {
                    colSpan: data.isParent ? 0 : 1,
                };
            },
        },
        {
            title: '',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            onCell(data, index) {
                return {
                    colSpan: data.isParent ? 0 : 1,
                };
            },
            render: (value, record, index) => (
                <Space size='middle'>
                    <Dropdown
                        menu={{
                            items,
                            onClick: (props) =>
                                handleMenuClick(props, record.id),
                        }}
                        trigger={['click']}
                    >
                        <Button>
                            Thao tác <Icon name='DownOutlined' />
                        </Button>
                    </Dropdown>
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columnsTree}
            pagination={false}
            scroll={{ y: parrentSize?.height }}
            dataSource={data}
        />
    );
};

export default withTableSize(RoleGroupList);
