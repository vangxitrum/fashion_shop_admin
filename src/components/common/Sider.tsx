import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { ProtectedRoutes } from '../../routes';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from './Icon';
import { config } from '../../utils';
import { useGlobalsContext } from '../../contexts';

type MenuItem = Required<MenuProps>['items'][number];
const { Sider } = Layout;

function getItem(
    id: number,
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
): MenuItem {
    return {
        id,
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const menu: MenuItem[] = [];
const subMenuKeys: string[] = [];

Object.values(ProtectedRoutes).forEach((route: any) => {
    let parentId = route.parentId;
    let isParentExist: any = menu.find((route: any) => route.id === parentId);
    let icon = route?.icon ? <Icon name={route?.icon} /> : null;
    if (isParentExist) {
        isParentExist.children = isParentExist.children
            ? [
                  ...isParentExist.children,
                  getItem(route.id, route.name, route.path, icon),
              ]
            : [getItem(route.id, route.name, route.path, icon)];
    } else {
        subMenuKeys.push(route.path);
        menu.push(getItem(route.id, route.name, route.path, icon));
    }

    return menu;
});

const CommonSider: React.FC<{}> = ({}) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { state } = useGlobalsContext();
    const [openKeys, setOpenKeys] = useState([subMenuKeys[0]]);
    const [collapsedWidth, setCollapseWidth] = useState<number>(80);
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const currentPathName = '/' + pathname.split('/')[1];

    useEffect(() => {
        if (state.userScreens) {
            console.log('state.userScreens', state.userScreens);
        }
    }, [state.userScreens]);

    const onClick: MenuProps['onClick'] = (e) => {
        navigate(e.key);
    };
    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const lastestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (subMenuKeys.indexOf(lastestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(lastestOpenKey ? [lastestOpenKey] : []);
        }
    };

    if (state.isMobileView) return null;
    return (
        <Sider
            width={250}
            theme='dark'
            collapsed={collapsed}
            collapsible
            breakpoint='md'
            collapsedWidth={collapsedWidth}
            onBreakpoint={(broken) => {
                if (broken) {
                    setCollapseWidth(0);
                } else {
                    setCollapseWidth(80);
                }
            }}
            onCollapse={(collapsed, type) => {
                setCollapsed(collapsed);
            }}
        >
            <div className='tw-text-center'>
                <img
                    className='tw-inline-flex tw-mx-auto tw-my-3'
                    width={56}
                    src={`${config.publicUrl}/image/logo/logo.png`}
                    alt='logo'
                />
            </div>
            <Menu
                selectedKeys={[currentPathName]}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                mode='inline'
                theme='dark'
                items={menu}
                onClick={onClick}
            />
        </Sider>
    );
};

export default CommonSider;
