import React from 'react';
import { Avatar, Dropdown, Layout, Space, Typography, Image } from 'antd';
import type { MenuProps } from 'antd';
import AuthServices from '../../services/auth.services';
import { useAuth, useGlobalsContext } from '../../contexts';
import { Icon, SearchBar } from '../common';
import { config } from '../../utils';
const { Header } = Layout;
const { Text } = Typography;

const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
        case 'signout':
            AuthServices.logout();
            break;
        default:
            return;
    }
};

const CommonHeader: React.FC<{ children?: React.ReactNode }> = ({
    children,
}) => {
    const { authUser } = useAuth();
    const { state, globalActions } = useGlobalsContext();
    const { mobileSidebarVisible } = state;
    const { toggleMobileSiderVisible } = globalActions;
    const items: MenuProps['items'] = [
        {
            className: '!tw-text-red-600',
            label: 'Đăng xuất',
            key: 'signout',
            icon: <Icon name='LogoutOutlined' />,
        },
    ];

    return (
        <Header
            className=' tw-bg-white tw-h-16 rtl:tw-p-4 tw-flex tw-justify-between tw-gap-4'
            style={{ paddingInline: '24px' }}
        >
            <div className='tw-block lg:tw-hidden'>
                <Icon
                    name={
                        !mobileSidebarVisible
                            ? 'MenuUnfoldOutlined'
                            : 'MenuFoldOutlined'
                    }
                    onClick={() =>
                        toggleMobileSiderVisible(!mobileSidebarVisible)
                    }
                />
            </div>
            <div className='tw-flex-1 tw-flex tw-justify-between lg:tw-justify-end tw-items-center'>
                <div className='tw-inline-flex lg:tw-hidden'>
                    <Image
                        className=''
                        width={45}
                        src={`${config.publicUrl}/image/logo/logo.png`}
                        alt='logo'
                        preview={false}
                    />
                </div>
                <div className='w-1/3'>
                    <SearchBar />
                </div>
            </div>
            <Space size={16} align='center'>
                {/* <Avatar
                    shape='circle'
                    className='tw-flex tw-items-center tw-justify-center'
                    onClick={() => toggleDrawerVisible(true)}
                >
                    <Space>
                        <Icon
                            name='SettingOutlined'
                            className='tw-text-lg'
                            style={{ marginTop: '-1px' }}
                        />
                    </Space>
                </Avatar> */}
                {/* <Dropdown menu={{ items }}>
                    <Badge count={5}>
                        <Avatar shape='circle'>
                            <Icon name='BellOutlined' className='tw-text-lg' />
                        </Avatar>
                    </Badge>
                </Dropdown> */}
                <Dropdown trigger={['click']} menu={{ items, onClick }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space
                            className='!tw-gap-0 lg:!tw-gap-2'
                            align='center'
                        >
                            <Avatar
                                src={`${config.publicUrl}/image/common/default.png`}
                                onError={() => {
                                    return false;
                                }}
                            />
                            <Text className='tw-font-semibold tw-hidden lg:tw-inline'>
                                {authUser?.fullname}
                            </Text>
                            <Icon
                                name='DownOutlined'
                                className='tw-hidden lg:tw-inline'
                            />
                        </Space>
                    </a>
                </Dropdown>
            </Space>
        </Header>
    );
};

export default CommonHeader;
