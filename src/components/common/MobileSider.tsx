import { useGlobalsContext } from '../../contexts';
import { Drawer, Image, Space } from 'antd';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { ProtectedRoutes } from '../../routes';
import Icon from './Icon';
import { useLocation, useNavigate } from 'react-router-dom';
import { config } from '../../utils';

type MenuItem = Required<MenuProps>['items'][number];
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

const MobileSider = () => {
    const { state, globalActions } = useGlobalsContext();
    const navigate = useNavigate();
    const { mobileSidebarVisible } = state;
    const { toggleMobileSiderVisible } = globalActions;
    const { pathname } = useLocation();
    const onClick: MenuProps['onClick'] = (e) => {
        navigate(e.key);
    };
    return (
        <Drawer
            open={mobileSidebarVisible}
            placement='left'
            onClose={() => toggleMobileSiderVisible(!mobileSidebarVisible)}
            key='mobile-sider-left'
            closable={false}
            bodyStyle={{ padding: 0 }}
        >
            <Space
                className='tw-p-4 tw-justify-center tw-w-full'
                align='center'
            >
                <Image
                    width={50}
                    src={`${config.publicUrl}/image/logo/logo.png`}
                    alt='logo'
                />
            </Space>
            <Menu
                defaultSelectedKeys={[pathname]}
                // openKeys={openKeys}
                // onOpenChange={onOpenChange}
                mode='inline'
                theme='light'
                items={menu}
                onClick={onClick}
            />
        </Drawer>
    );
};

export default MobileSider;
