import { Select } from 'antd';
import { useEffect, useState } from 'react';

const statusMenu = [
    {
        label: 'Hoat động',
        value: 'active',
    },
    {
        label: 'Ngừng hoạt động',
        value: 'inactive',
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

const StatusSelect = ({ value, onSelectionChange }: Props) => {
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

export default StatusSelect;
