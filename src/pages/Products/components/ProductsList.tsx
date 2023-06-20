import React from 'react';
import { Table, Dropdown, Space, Modal, Tag } from 'antd';
import { SettingOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { UserType } from 'src/types/Users';
import { withTableSize } from '../../../hocs';
import { useGlobalsContext } from '../../../contexts';
import { format3P } from 'src/utils';
const { confirm } = Modal;

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

const UsersList: React.FC<any> = ({
    loading,
    page,
    onPageChange,
    products,
    total,
    parrentSize,
    onShowDetail,
}: {
    loading: boolean;
    page: number;
    onPageChange: Function;
    products: any[];
    total: number;
    parrentSize?: any;
    onShowDetail: Function;
}) => {
    const { openNotification } = useGlobalsContext();

    const handleMenuClick = (props: any, id: any) => {
        let key = props.key || '';
        switch (key) {
            case 'delete': {
                confirm({
                    title: 'Bạn chắc chắn muốn xoá sản phẩm này ?',
                    icon: <ExclamationCircleFilled />,
                    content:
                        'Việc xoá sản phẩm có thể gây ra sai dữ liệu trong hệ thống. Bạn vẫn muốn xoá sản phẩm này ?',
                    okText: 'Xác nhận',
                    okType: 'danger',
                    cancelText: 'Huỷ',
                    onOk() { },
                    onCancel() { },
                });
                return;
            }
            case 'modify': {
                return;
            }
            case 'detail': {
                onShowDetail(id);
                return;
            }
            default:
                return;
        }
    };

    const columns: ColumnsType<UserType> = [
        {
            title: '#',
            dataIndex: 'photos',
            fixed: 'left',
            key: 'photos',
            width: '60px',
            render(value, record, index) {
                const isImage = Array.isArray(value) && value?.length > 0
                if (isImage) {
                    return <img src={value[0]} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                }
                return ""
            }
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            fixed: 'left',
            key: 'name',
        },
        {
            title: 'Thương hiệu',
            dataIndex: 'brand',
            key: 'brand',
            align: 'center',
            fixed: 'left',
        },
        {
            title: 'Danh mục',
            dataIndex: 'types',
            key: 'types',
            align: 'center',
            render(value, record, index) {
                if (value) {
                    return value?.map((type: string) => <Tag>{type}</Tag>);
                }
                return '';
            },
        },
        {
            title: 'Giá gốc',
            dataIndex: 'price',
            align: 'center',
            key: 'price',
            render(value, _record, _index) {
                return format3P(value) + ' đ';
            },
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discount_percent',
            key: 'discount_percent',
            align: 'center',
            render(value, record, index) {
                if (value) {
                    return value + ' %';
                }
                return '--';
            },
        },
        {
            title: '#',
            align: 'center',
            key: 'operation',
            fixed: 'right',
            width: 50,
            render: (_value, record, _index) => {
                return (
                    <Dropdown
                        menu={{
                            items: items,
                            onClick: (props) =>
                                handleMenuClick(props, record.id),
                        }}
                        trigger={['click']}
                    >
                        <a href='/' onClick={(e) => e.preventDefault()}>
                            <Space>
                                <SettingOutlined className='tw-text-lg' />
                            </Space>
                        </a>
                    </Dropdown>
                );
            },
        },
    ];
    return (
        <Table
            loading={loading}
            pagination={{
                current: page || 1,
                pageSize: 12,
                total: total,
                onChange(page) {
                    return onPageChange(page);
                },
                showTotal(total, range) {
                    return `${total} sản phẩm`;
                },
            }}
            columns={columns}
            className='tw-min-h-full'
            dataSource={products?.map((pro: any) => ({
                ...pro,
                key: pro.id,
            }))}
            scroll={{
                x: 1500,
                y: parrentSize?.height,
                scrollToFirstRowOnChange: true,
            }}
        />
    );
};

export default withTableSize(UsersList);
