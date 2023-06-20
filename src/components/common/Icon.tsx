// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import * as AntdIcons from '@ant-design/icons';

interface IconType {
    name: string;
    spin?: boolean;
    style?: any;
    className?: string;
    onClick?: Function;
}
const Icon: React.FC<IconType> = ({
    name,
    spin,
    style = {},
    className,
    ...props
}) => {
    const Component = AntdIcons[name] || AntdIcons['QuestionCircleOutlined'];
    return (
        <Component spin={spin} style={style} className={className} {...props} />
    );
};

export default Icon;
