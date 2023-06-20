import React, { useRef, useState } from 'react';
import { theme, Input, InputRef, Tooltip } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import Icon from './Icon';

const SearchBar = () => {
    const { token } = theme.useToken();
    const [searchParams, setSearchParams] = useSearchParams();
    const inputRef = useRef<InputRef>(null);
    const [isCollapsed, toggleCollapse] = useState<boolean>(true);

    const handleSearch = () => {
        let searchText = inputRef.current?.input?.value || '';
        searchParams.set('keyword', searchText);
        searchParams.set('page', '1');
        setSearchParams(searchParams);
    };

    return (
        <div
            key='SearchOutlined'
            aria-hidden
            style={{}}
            onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
            className='tw-flex tw-justify-end tw-items-center'
        >
            <Input
                ref={inputRef}
                style={{
                    borderRadius: 50,
                    color: '##B5B5B5',
                    border: '1px solid #B5B5B5',
                    padding: '10px 20px',
                }}
                className={`tw-transition-all tw-duration-500 ${
                    isCollapsed
                        ? 'tw-w-0 !tw-border-none'
                        : 'tw-w-full tw-min-w-0 lg:tw-min-w-[550px] tw-origin-right'
                }`}
                prefix={
                    <Tooltip placement='bottomRight' title='Tìm kiếm'>
                        <Icon
                            name='SearchOutlined'
                            className={`tw-cursor-pointer hover:tw-scale-125 tw-font-bold tw-text-lg tw-transition-all tw-duration-200 ${
                                isCollapsed ? '-tw-m-1.5' : ''
                            }`}
                            style={{
                                color: '#333',
                            }}
                        />
                    </Tooltip>
                }
                onBlur={() => {
                    toggleCollapse(true);
                }}
                onFocus={() => toggleCollapse(false)}
                defaultValue={searchParams.get('keyword') || ''}
                placeholder='Tìm kiếm ...'
                type='input'
                bordered={false}
                onPressEnter={handleSearch}
            />
        </div>
    );
};

export default SearchBar;
