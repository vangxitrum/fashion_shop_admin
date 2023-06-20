import { Select } from 'antd';
import { useEffect, useState } from 'react';

const statusMenu = [
    {
        label: 'Đang chờ',
        value: 'waiting',
    },
    {
        label: 'Đã duyệt',
        value: 'approved',
    },
    {
        label: 'Tất cả',
        value: 'all',
    },
];

interface Props {
    value: string;
    onSelectionChange?: (value: string) => void;
}

const OrderStatusSelect = ({ value, onSelectionChange }: Props) => {
    const [current, setCurrent] = useState<string>('');

    useEffect(() => {
        if (value) {
            setCurrent(value);
        } else {
            setCurrent('all');
        }
    }, [value]);

    const onChange = (value: string) => {
        if (onSelectionChange) {
            onSelectionChange(value);
        }
    };

    return (
        <Select
            style={{ width: 170 }}
            value={current}
            options={statusMenu}
            onChange={onChange}
        />
    );
};

export default OrderStatusSelect;
