import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-form';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AuthenticationRoute } from '../..//routes';
export default () => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (data: Record<string, any>) => {
        console.log('data', data);
        setLoading(true);
    };

    return (
        <div className='tw-h-screen'>
            <LoginFormPage
                backgroundImageUrl='https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png'
                logo='https://smeplus.vn/wp-content/uploads/2022/12/logo-light.png'
                title='SMEPLUS'
                subTitle='Công Ty Giải Pháp Công Nghệ'
                loading={loading}
                onFinish={async (formData) => handleSubmit(formData)}
                submitter={{
                    render: (props: any, dom) => {
                        return (
                            <button
                                onClick={() => props.submit()}
                                className='tw-w-full tw-py-2 tw-font-bold tw-text-lg tw-text-white tw-rounded tw-bg-blue-400 enabled:tw-opacity-100  disabled:tw-opacity-40'
                                disabled={props.submitButtonProps.loading}
                            >
                                Gửi Email Khôi Phục
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
                </>
                <div
                    style={{
                        marginBlockEnd: 24,
                    }}
                >
                    <Link
                        className='tw-mb-6'
                        to={AuthenticationRoute.SignIn.path}
                    >
                        Quay lại trang đăng nhập
                    </Link>
                </div>
            </LoginFormPage>
        </div>
    );
};
