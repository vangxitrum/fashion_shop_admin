const ProtectedRoutes = {
    Orders: {
        name: 'Quản lý đơn hàng',
        path: '/don-hang',
        icon: 'ContainerOutlined',
        parentId: 0,
        id: 1,
    },

    Product: {
        name: 'Quản lý sản phẩm',
        path: '/san-pham',
        icon: 'ContainerOutlined',
        parentId: 0,
        id: 2,
    },
    Users: {
        name: 'Khách hàng',
        path: '/khach-hang',
        parentId: 0,
        id: 3,
    },
    Advise: {
        name: 'Tư vấn khách hàng',
        path: '/tu-van',
        parentId: 0,
        id: 4,
    },
};

export default ProtectedRoutes;
