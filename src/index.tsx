import ReactDOM from 'react-dom/client';
import App from './App';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import 'antd/dist/reset.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, GlobalProvider } from './contexts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ConfigProvider locale={viVN}>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <GlobalProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </GlobalProvider>
            </AuthProvider>
        </QueryClientProvider>
    </ConfigProvider>
);
