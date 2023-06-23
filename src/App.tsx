import React, { Fragment, lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useGlobalsContext } from './contexts';
import { AuthenticationRoute, ProtectedRoutes } from './routes';
import { notification, Grid } from 'antd';
import { history } from './utils';
import type { NotificationType } from './types/GlobalTypes';

const { useBreakpoint } = Grid;

// Authenticataion
const SignIn = lazy(() => import('./pages/Authentication/SignIn'));
const Recover = lazy(() => import('./pages/Authentication/Recover'));
const Verify = lazy(() => import('./pages/Authentication/Verify'));

// Layouts
const Home = lazy(() => import('./layouts/Home'));

// Dashboard Pages
const OrderDashboard = lazy(() => import('./pages/Orders'));
const AdviseDashboard = lazy(() => import('./pages/Advise'));
const ProductDashboard = lazy(() => import('./pages/Products'));
// users
const UsersPages = lazy(() => import('./pages/Users'));
// Errors
const _404 = lazy(() => import('./pages/Errors/_404'));

function App() {
    const [api, contextHolder] = notification.useNotification();
    const { state, globalActions } = useGlobalsContext();
    const { setBreakpoint } = globalActions;
    const { notification: stateNotification, user } = state;
    const screens = useBreakpoint();
    history.location = useLocation();
    history.navigate = useNavigate();

    const openNotification = (params: NotificationType) => {
        api[params.type]({
            message: params.title,
            description: params.message,
            placement: params.placement,
            duration: params.duration || 3,
        });
    };

    const getDeviceBreakPoint = (screens: any) => {
        let theMaxBreakPoint = 'xs';
        let isMobileView = true;
        const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

        breakpoints.forEach((breakpoint) => {
            if (screens[breakpoint]) {
                theMaxBreakPoint = breakpoint;
            }
        });

        if (['lg', 'xl', 'xxl'].includes(theMaxBreakPoint)) {
            isMobileView = false;
        }
        setBreakpoint({
            currentBreakpoint: theMaxBreakPoint,
            isMobileView,
        });
    };

    useEffect(() => {
        if (stateNotification) {
            openNotification(stateNotification);
        }
    }, [stateNotification]);

    useEffect(() => {
        getDeviceBreakPoint(screens);
    }, [screens]);

    return (
        <Fragment>
            {contextHolder}
            <Suspense fallback={<h1>Loading</h1>}>
                <Routes>
                    <Route path='*' element={<_404 />} />
                    <Route
                        path={AuthenticationRoute.SignIn.path}
                        element={<SignIn />}
                    />
                    <Route
                        path={AuthenticationRoute.Recover.path}
                        element={<Recover />}
                    />
                    <Route
                        path={AuthenticationRoute.Verify.path}
                        element={<Verify />}
                    />

                    <Route path='/' element={<Home />}>
                        <Route index element={<OrderDashboard />} />
                        <Route
                            path={ProtectedRoutes.Orders.path}
                            element={<OrderDashboard />}
                        />
                        <Route
                            path={ProtectedRoutes.Advise.path}
                            element={<AdviseDashboard />}
                        />
                        <Route
                            path={ProtectedRoutes.Product.path}
                            element={<ProductDashboard />}
                        />
                        <Route
                            path={ProtectedRoutes.Users.path}
                            element={<UsersPages />}
                        />
                    </Route>
                </Routes>
            </Suspense>
        </Fragment>
    );
}

export default App;
