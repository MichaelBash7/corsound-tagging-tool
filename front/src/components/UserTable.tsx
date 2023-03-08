import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {Table, Popconfirm} from "antd";
import {observer} from "mobx-react-lite";
import {DeleteOutlined, EditTwoTone} from '@ant-design/icons';

const UserTable : FC = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)

    const handleDelete = (id: number) => {
        console.log(id)
    }
    const handleEdit = (id: number) => {
        console.log(id)
    }

    const dataSource = [
        {
            id: '1',
            login: 'Mike',
        },
        {
            id: '2',
            login: 'John',
        }
    ];

    const columns = [
        {
            title: 'Edit',
            key: 'edit',
            render: (_: any, record: any) => (
                <EditTwoTone value={record.id} />
            ),
            width: 50,
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 100,
        },
        {
            title: 'Login',
            dataIndex: 'login',
            key: 'login',
        },
        {
            title: 'Del',
            key: 'delete',
            render: (_: any, record: any) => (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                    <DeleteOutlined />
                </Popconfirm>
            ),
            width: 50,
        },
    ];

    return (
        <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 50 }} />
    );
};

export default observer (UserTable);