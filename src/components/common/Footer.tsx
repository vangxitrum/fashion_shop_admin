import React from 'react';
import { Col, Layout, Row, Space, Typography } from 'antd';

const { Title } = Typography;
const { Footer } = Layout;
const CommonFooter: React.FC<{ children?: any }> = ({ children }) => {
    return (
        <Footer style={{ paddingInline: '24px' }} className='tw-py-3'>
            <Row gutter={[0, 12]}>
                <Col span={24} order={1} lg={{ span: 12, order: 0 }}>
                    <Title className='tw-text-center lg:tw-text-left' level={5}>
                        Bản quyền thuộc về SMEPlus
                    </Title>
                </Col>
                <Col span={24} order={0} lg={{ span: 12, order: 1 }}>
                    <Space className='tw-justify-end tw-w-full'>
                        {children}
                    </Space>
                </Col>
            </Row>
        </Footer>
    );
};

export default CommonFooter;
