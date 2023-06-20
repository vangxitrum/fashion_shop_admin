import { GlobalContants } from '../constants';
import { NotificationType } from 'src/types/GlobalTypes';
import React, { useContext, useReducer } from 'react';
import { GlobalReducer } from '../reducers';
import { UserServices } from 'src/services';

/**
 * Globals Context wrap all the App.
 * Includes some global state, multiple used state, setting state for app.
 *
 */
export const GlobalContext = React.createContext<any>(null);

export function useGlobalsContext() {
    const globalContext = useContext(GlobalContext);
    if (!globalContext) {
        throw new Error(
            'globalContext has to be used within NotifcationProvider'
        );
    }
    return globalContext;
}

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(GlobalReducer, {});

    const getCurrentUser = async () => {
        try {
            const res = await UserServices.getCurrentUser();
            dispatch({
                type: GlobalContants.SET_CURRENT_USER,
                data: res.data,
            });
        } catch (error) {}
    };

    const setNotification = (params: NotificationType) => {
        dispatch({
            type: GlobalContants.SET_NOTIFICATION,
            data: params,
        });
    };

    const setBreakpoint = (params: any) => {
        dispatch({
            type: GlobalContants.SET_CURRENT_BREAKPOINT,
            data: params,
        });
    };

    const toggleMobileSiderVisible = (status: boolean) => {
        dispatch({
            type: GlobalContants.TOGGLE_MOBILE_SIDEBAR,
            data: status,
        });
    };

    const globalActions = {
        setNotification,
        setBreakpoint,
        toggleMobileSiderVisible,
        getCurrentUser,
    };

    return (
        <GlobalContext.Provider value={{ state, globalActions }}>
            {children}
        </GlobalContext.Provider>
    );
};
