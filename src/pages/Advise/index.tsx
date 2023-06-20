import React, { useEffect } from 'react';
import { Col, Layout, Row, Space, Typography, Button } from 'antd';
import {
    GrantPermissionForm,
    RoleGroupForm,
    RoleGroupList,
} from './components';
import { RoleGroupProvider, useRoleGroups } from './contexts/RoleGroupContext';
import { useSearchParams } from 'react-router-dom';
import { useGlobalsContext } from '../../contexts';
const { Content } = Layout;
const { Title, Text } = Typography;
const RoleGroup: React.FC<{}> = ({}) => {
    const [roleGroupsState, roleGroupsActions] = useRoleGroups();
    const { state, globalActions } = useGlobalsContext();
    const { getRoles, toggleFormVisible, getRoleGroups } = roleGroupsActions;

    useEffect(() => {
        document.title = 'Nhóm quyền - SMEPlus';
        getRoleGroups();
        getRoles();
    }, []);

    useEffect(() => {
        if (roleGroupsState?.notifications) {
            globalActions.setNotification({
                type: roleGroupsState?.notifications?.type,
                title: roleGroupsState?.notifications?.title,
                message: roleGroupsState?.notifications?.message,
            });
        }
    }, [roleGroupsState?.notifications]);

    return (
        <Content className='tw-my-3 tw-mx-4 tw-bg-white tw-p-3 tw-rounded-lg'>
            <div className='tw-flex tw-flex-col tw-h-full tw-w-full'>
                <Row gutter={[12, 12]} className='tw-mb-4'>
                    <Col span={24} md={{ span: 8 }}>
                        <Title level={3}>Danh sách nhóm quyền</Title>
                    </Col>
                    <Col span={24} md={{ span: 16 }}>
                        <Space
                            align='center'
                            className='tw-w-full tw-justify-end'
                        >
                            <Button
                                type='primary'
                                className='tw-bg-primary'
                                onClick={() => toggleFormVisible(true)}
                            >
                                Tạo mới
                            </Button>
                        </Space>
                    </Col>
                </Row>
                <RoleGroupList />
            </div>
            <RoleGroupForm />
            <GrantPermissionForm />
        </Content>
    );
};

const Container: React.FC<any> = () => {
    return (
        <RoleGroupProvider>
            <RoleGroup />
        </RoleGroupProvider>
    );
};
export default Container;
