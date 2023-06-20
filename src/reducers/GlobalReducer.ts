import { NotificationType } from 'src/types/GlobalTypes';
import { GlobalContants } from '../constants';
const initialState = {};

interface GlobalStateType {
    notification: NotificationType;
    user: any;
}

const globalReducer = (
    state: Partial<GlobalStateType> = initialState,
    action: any
) => {
    switch (action.type) {
        case GlobalContants.SET_CURRENT_USER: {
            return {
                ...state,
                accessToken: action.payload.access_token,
                user: action.data.user,
            };
        }
        case GlobalContants.SET_NOTIFICATION: {
            return {
                ...state,
                notification: action.data,
            };
        }

        case GlobalContants.SET_CURRENT_BREAKPOINT: {
            return {
                ...state,
                currentBreakpoint: action.data.currentBreakpoint,
                isMobileView: action.data.isMobileView,
            };
        }

        case GlobalContants.TOGGLE_MOBILE_SIDEBAR: {
            return {
                ...state,
                mobileSidebarVisible: action.data,
            };
        }

        default:
            return state;
    }
};
export default globalReducer;
