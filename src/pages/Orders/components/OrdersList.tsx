import React, { useEffect, useState } from 'react';
import { Table, Dropdown, Space, Modal, Typography } from 'antd';
import {
    SettingOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleFilled,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { UserType } from 'src/types/Users';
import { useAccount } from '../contexts/AccountContext';
import { Icon } from '../../../components/common';
import { withTableSize } from '../../../hocs';
import moment from 'moment';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGlobalsContext } from '../../../contexts';
import { SystemServices } from '../../../services';
const { Text } = Typography;
const { confirm } = Modal;

const items: MenuProps['items'] = [
    {
        label: 'Chỉnh sửa',
        key: 'modify',
    },
    {
        label: 'Xoá tài khoản',
        key: 'delete',
        danger: true,
    },
    {
        type: 'divider',
    },
];

const UsersList: React.FC<any> = (props) => {
    const [accountState, AccountActions] = useAccount();
    const [data, setData] = useState<UserType[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { toggleFormVisible, setAccounts, setTotal, deleteAccount } =
        AccountActions;
    const { openNotification } = useGlobalsContext();
    const { parrentSize } = props;
    const page = accountState?.filters?.page || 1,
        pageSize = accountState?.filters?.pageSize || 50,
        totalAccounts = accountState?.totalAccounts || 0;

    const handleMenuClick = (props: any, id: any) => {
        let key = props.key || '';
        switch (key) {
            case 'deactivate':
                confirm({
                    title: 'Bạn chắc chắn muốn vô hiệu hóa tài khoản này ?',
                    icon: <Icon name='ExclamationCircleFilled' />,
                    content:
                        'Tài khoản bị vô hiệu hóa sẽ không thể thao tác trong hệ thống cho tới khi được kích hoạt lại.',
                    okText: 'Xác nhận',
                    okType: 'danger',
                    cancelText: 'Huỷ',
                    onOk() {},
                    onCancel() {},
                });
                return;
            case 'activate': {
                confirm({
                    title: 'Bạn chắc chắn muốn kích hoạt tài khoản này ?',
                    icon: <ExclamationCircleFilled />,
                    content:
                        'Sau khi kích hoạt, tài khoản có thể hoạt động trong hệ thống.',
                    okText: 'Xác nhận',
                    okType: 'danger',
                    cancelText: 'Huỷ',
                    onOk() {},
                    onCancel() {},
                });
                return;
            }
            case 'delete': {
                confirm({
                    title: 'Bạn chắc chắn muốn xoá tài khoản này ?',
                    icon: <ExclamationCircleFilled />,
                    content:
                        'Thao tác này sẽ xoá vĩnh viễn tài khoản khỏi hệ thống.',
                    okText: 'Xác nhận',
                    okType: 'danger',
                    cancelText: 'Huỷ',
                    onOk() {
                        deleteAccount(id);
                    },
                    onCancel() {},
                });
                return;
            }
            case 'modify': {
                const item = accountState.accounts.find(
                    (account: { id: string | number }) => account?.id === id
                );
                toggleFormVisible(true, item);
                return;
            }
            default:
                return;
        }
    };

    const columns: ColumnsType<UserType> = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'fullname',
            fixed: 'left',
            responsive: ['lg', 'xxl'],
            key: 'fullname',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'username',
            key: 'username',
            responsive: ['lg', 'xl', 'xxl'],
            fixed: 'left',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'created_at',
            key: 'created_at',
            render(value, record, index) {
                return (
                    <Space direction='vertical'>
                        <span>{record.created_by || 'Administrator'}</span>
                        <span>
                            {moment(value).isValid()
                                ? moment(value).format('DD/MM/YYYY')
                                : ''}
                        </span>
                    </Space>
                );
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: '3',
            align: 'center',
            render(value, record, index) {
                return (
                    <Space>
                        {value === 'active' ? (
                            <CheckCircleOutlined className='tw-text-green-600 tw-text-lg' />
                        ) : (
                            <CloseCircleOutlined className='tw-text-red-600 tw-text-lg' />
                        )}
                    </Space>
                );
            },
        },
        {
            title: '#',
            align: 'center',
            key: 'operation',
            fixed: 'right',
            width: 50,
            render: (value, record, index) => {
                let menuItems: any[] = [...items];
                if (record.status === 'active') {
                    menuItems.push({
                        label: 'Vô hiệu hóa',
                        key: 'deactivate',
                    });
                } else {
                    menuItems.push({
                        label: 'Kích hoạt',
                        key: 'activate',
                    });
                }

                return (
                    <Dropdown
                        menu={{
                            items: menuItems,
                            onClick: (props) =>
                                handleMenuClick(props, record.id),
                        }}
                        trigger={['click']}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <SettingOutlined className='tw-text-lg' />
                            </Space>
                        </a>
                    </Dropdown>
                );
            },
        },
    ];

    useEffect(() => {
        if (accountState?.accounts) {
            let temp: UserType[] = [];
            accountState?.accounts.forEach((employee: any, index: string) => {
                temp.push({
                    key: index,
                    id: employee?.id,
                    address: employee?.address,
                    fullname: employee?.fullname,
                    username: employee?.username,
                    email: employee?.email,
                    status: employee?.status,
                    phone_number: employee?.phone_number,
                    avatar: employee?.avatar,
                    created_at: employee?.created_at,
                    created_by: employee?.created_by,
                    updated_at: employee?.updated_at,
                    updated_by: employee?.updated_by,
                });
            });
            setData(temp);
        }
    }, [accountState]);
    return (
        <Table
            loading={accountState?.loading}
            pagination={{
                position: ['bottomRight'],
                pageSize: pageSize,
                total: totalAccounts,
                current: page,
                onChange(page, pageSize) {
                    searchParams.set('page', page.toString());
                    searchParams.set('pageSize', pageSize.toString());
                    setSearchParams(searchParams);
                },
                showTotal(total, range) {
                    return (
                        <Space>
                            <Text>Tổng cộng: {total} tài khoản</Text>
                        </Space>
                    );
                },
            }}
            columns={columns}
            className='tw-min-h-full'
            dataSource={data}
            scroll={{
                x: 1500,
                y: parrentSize?.height,
                scrollToFirstRowOnChange: true,
            }}
            onRow={(record, index) => {
                return {
                    onDoubleClick(e) {},
                };
            }}
        />
    );
};

export default withTableSize(UsersList);
