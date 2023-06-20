import React, { useEffect } from 'react';
import { Button, Col, Layout, Row, Space, Typography } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { AccountProvider, useAccount } from './contexts/AccountContext';
import { OrdersList, AccountForm } from './components';
import { useGlobalsContext } from '../../contexts';
import { config } from '../../utils';
import { OrderStatusSelect } from './components';
const { Content } = Layout;
const { Title } = Typography;

const UserManagement = () => {
    const [accountState, accountActions] = useAccount();
    const { globalActions } = useGlobalsContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const { filters } = accountState;
    const { setFilters, toggleFormVisible } = accountActions;

    useEffect(() => {
        document.title = `Quản lý đơn hàng - ${config.companyName}`;
    }, []);

    useEffect(() => {
        handleParseParams();
    }, [searchParams]);

    useEffect(() => {
        if (accountState?.notifications) {
            globalActions.setNotification({
                type: accountState?.notifications?.type,
                title: accountState?.notifications?.title,
                message: accountState?.notifications?.message,
            });
        }
    }, [accountState?.notifications]);

    const handleParseParams = () => {
        let params: { [key: string]: any } = {};
        searchParams.forEach((value, key: keyof typeof params) => {
            params[key] = !isNaN(parseInt(value)) ? parseInt(value) : value;
        });

        // Check some require parameters
        if (!params['page']) {
            params['page'] = 1;
        }

        if (!params['pageSize']) {
            params['pageSize'] = 10;
        }

        setFilters(params);
    };

    const handleChange = (value: string) => {
        searchParams.set('status', value);
        setSearchParams(searchParams);
    };

    return (
        <Content className='tw-my-3 tw-mx-4 tw-bg-white tw-p-3 tw-rounded-lg'>
            <div className='tw-flex tw-flex-col tw-h-full tw-w-full'>
                <Row gutter={[12, 12]} className='tw-mb-4'>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <Title level={3}>Danh sách đơn hàng</Title>
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
                        </Space>
                    </Col>
                </Row>
                <div className='tw-flex-1'>
                    <OrdersList />
                </div>
            </div>
            <AccountForm />
        </Content>
    );
};

const Container: React.FC<any> = () => {
    return (
        <AccountProvider>
            <UserManagement />
        </AccountProvider>
    );
};
export default Container;
