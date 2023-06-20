import React, { useState } from 'react';
import { Layout } from 'antd';
import {
    CommonSider,
    CommonHeader,
    Settings,
    MobileSider,
} from '../components/common';
import { Outlet, useLocation } from 'react-router-dom';
import { useGlobalsContext } from '../contexts';

const Home = () => {
    const { state } = useGlobalsContext();
    return (
        <Layout
            hasSider
            className='tw-h-screen tw-w-screen tw-overflow-hidden'
            id='root-layout'
        >
            <CommonSider />
            {state.isMobileView ? <MobileSider /> : null}
            <Layout className='tw-flex-1'>
                <CommonHeader />
                <Outlet />
            </Layout>
            <Settings />
        </Layout>
    );
};

export default Home;
