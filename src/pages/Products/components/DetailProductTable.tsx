import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import {
    Button,
    Form,
    Input,
    Popconfirm,
    Table,
    Row,
    Col,
    Typography,
    Space,
    Select,
    InputNumber,
} from 'antd';
import type { FormInstance } from 'antd/es/form';

const { Title } = Typography;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
    key: string;
    name: string;
    age: string;
    address: string;
}

interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (
            editing &&
            dataIndex.toString() !== 'size' &&
            dataIndex.toString() !== 'price'
        ) {
            inputRef.current!.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `Vui lòng nhập ${title}.`,
                    },
                ]}
            >
                {dataIndex.toString() === 'size' ? (
                    <Select
                        options={[
                            {
                                value: 'X',
                                label: 'X',
                            },
                            {
                                value: 'L',
                                label: 'L',
                            },
                            {
                                value: 'XL',
                                label: 'XL',
                            },
                            {
                                value: 'XXL',
                                label: 'XXL',
                            },
                            {
                                value: 'XXXL',
                                label: 'XXXL',
                            },
                        ]}
                        onChange={save}
                    />
                ) : dataIndex.toString() === 'price' ? (
                    <InputNumber className='tw-w-full' min={0} onBlur={save} />
                ) : (
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                )}
            </Form.Item>
        ) : (
            <div
                className='editable-cell-value-wrap'
                style={{ paddingRight: 24 }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
    key: React.Key;
    name: string;
    age: string;
    address: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const DetailProductTable = ({ detailInfo }: { detailInfo: any[] }) => {
    const [dataSource, setDataSource] = useState<DataType[]>(detailInfo || []);

    const [count, setCount] = useState(2);

    const handleDelete = (key: React.Key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };

    const defaultColumns: (ColumnTypes[number] & {
        editable?: boolean;
        dataIndex: string;
    })[] = [
        {
            title: 'Size - Kích thước',
            dataIndex: 'size',
            key: 'size',
            editable: true,
        },
        {
            title: 'Color - Màu sắc',
            dataIndex: 'color',
            key: 'color',
            editable: true,
        },
        {
            title: 'Quantity - Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            editable: true,
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price',
            editable: true,
        },
        {
            title: '#',
            dataIndex: '#',
            width: 120,

            align: 'center',
            render: (_, record: { key: React.Key }) =>
                dataSource.length >= 1 ? (
                    <Popconfirm
                        title='Xoá chi tiết này?'
                        onConfirm={() => handleDelete(record.key)}
                    >
                        <Button danger>Xoá</Button>
                    </Popconfirm>
                ) : null,
        },
    ];

    const handleAdd = () => {
        const newData: DataType = {
            key: count,
            name: `Edward King ${count}`,
            age: '32',
            address: `London, Park Lane no. ${count}`,
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const handleSave = (row: any) => {
        console.log('row', row);
        if (row?.id) {
            console.log('update old');
        } else {
            console.log('create new');
        }
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    return (
        <Row gutter={24}>
            <Col span={24}>
                <div className='tw-flex tw-items-center tw-justify-between tw-w-full'>
                    <Title level={4}>Chi tiết tồn kho</Title>
                    <Space>
                        <Button type='primary' onClick={handleAdd}>
                            Thêm mới
                        </Button>
                    </Space>
                </div>
            </Col>
            <Col span={24}>
                <div className='tw-w-full'>
                    <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataSource}
                        columns={columns as ColumnTypes}
                    />
                </div>
            </Col>
        </Row>
    );
};

export default DetailProductTable;
