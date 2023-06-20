import { LockOutlined, UserOutlined } from '@ant-design/icons';
import AuthServices from '../../services/auth.services';
import {
    LoginFormPage,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-form';
import {
    Link,
    useLocation,
    useNavigate,
    useSearchParams,
} from 'react-router-dom';
import { useState } from 'react';
import { AuthenticationRoute } from '../..//routes';
import { notification } from 'antd';
import { config } from '../../utils';
import { Image } from 'antd';
export default () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [api, contextHolder] = notification.useNotification();
    const [searchParams] = useSearchParams();
    const { pathname, search } = useLocation();
    const navigate = useNavigate();

    const getFormData = (data: Record<string, any>) => {
        handleSubmit(data);
    };
    const handleSubmit = async (
        data:
            | {
                  username: string;
                  password: string;
              }
            | any
    ) => {
        setLoading(true);
        try {
            const res = await AuthServices.login(
                data?.username,
                data?.password
            );

            if (res.status === 'success' || res.status) {
                if (pathname !== AuthenticationRoute.SignIn.path) {
                    let url = pathname + search;
                    navigate(url);
                } else {
                    navigate('/');
                }
            }
        } catch (error: any) {
            api.error({
                message: 'Lỗi Đăng Nhập !!',
                description: 'Tên đăng nhập hoặc mật khẩu không chính xác !!',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='tw-h-screen'>
            {contextHolder}
            <LoginFormPage
                backgroundImageUrl='https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png'
                logo={<Image src={`${config.publicUrl}/image/logo/logo.png`} />}
                subTitle='Trung Tâm Hoa Kiểng'
                loading={loading}
                onFinish={async (formData) => getFormData(formData)}
                submitter={{
                    render: (props: any, dom) => {
                        return (
                            <button
                                onClick={() => props.submit()}
                                className='tw-w-full tw-py-2 tw-font-bold tw-text-lg tw-text-white tw-rounded tw-bg-blue-400 enabled:tw-opacity-100  disabled:tw-opacity-40'
                                disabled={props.submitButtonProps.loading}
                            >
                                Đăng Nhập
                            </button>
                        );
                    },
                }}
            >
                <>
                    <ProFormText
                        name='username'
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined className={'prefixIcon'} />,
                            autoComplete: 'username',
                        }}
                        placeholder={'Tên đăng nhập hoặc email...'}
                        rules={[
                            {
                                required: true,
                                message: 'Trên đăng nhập không được trống!!',
                            },
                        ]}
                    />
                    <ProFormText.Password
                        name='password'
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className={'prefixIcon'} />,
                            autoComplete: 'current-password',
                        }}
                        placeholder={'Mật khẩu'}
                        rules={[
                            {
                                required: true,
                                message: 'Mật khẩu không được trống!!',
                            },
                        ]}
                    />
                </>
                <div
                    style={{
                        marginBlockEnd: 24,
                    }}
                >
                    <ProFormCheckbox noStyle name='autoLogin'>
                        Ghi nhớ đăng nhập
                    </ProFormCheckbox>
                    <Link
                        to={AuthenticationRoute.Recover.path}
                        style={{
                            float: 'right',
                        }}
                    >
                        Quên mật khẩu?
                    </Link>
                </div>
            </LoginFormPage>
        </div>
    );
};
