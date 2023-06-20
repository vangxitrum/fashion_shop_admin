import { Drawer } from 'antd';

const Settings = () => {
    return (
        <Drawer
            title='Cài đặt website'
            open={false}
            placement='right'
            closable={true}
            // onClose={() => toggleDrawerVisible(false)}
        >
            Test
        </Drawer>
    );
};

export default Settings;
