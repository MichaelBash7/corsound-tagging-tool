import React, {FC, useContext, useState, useEffect} from 'react';
import {Context} from "../index";
import {Table, Popconfirm, Space, Button, Typography} from "antd";
import {observer} from "mobx-react-lite";
import {DeleteOutlined, EditTwoTone} from '@ant-design/icons';
import ClipService from "../api/ClipService";

const UserTable : FC = () => {

    const {store} = useContext(Context)
    const { Text } = Typography;

    type User = {
        id: number,
        login: string,
        data: object,
    }
    const dataSource = [
        {
            id: 1,
            login: 'arkady.krishtul@corsound.ai',
            data: {},
        },
        {
            id: 2,
            login: 'Mihaelbash@yandex.ru',
            data: {},
        },
    ]
    const [users, setUsers] = useState<Array<User>>(dataSource)
    const handleDelete = (id: number) => {
        console.log(id)
    }
    const handleEdit = (id: number) => {
        console.log(id)
    }

    const renderDataCell = (data: any) => {
        console.log(data.reviewed)
        let list = []
        for (const [k, v] of Object.entries(data)) {
            list.push(
                    <Text><>{k}: {v}</></Text>
            )
        }
            return (
                <Space direction="vertical">
                    {list}
                </Space>
            )

    }

    const columns = [
        // {
        //     title: 'Edit',
        //     key: 'edit',
        //     render: (_: any, record: any) => (
        //         <EditTwoTone value={record.id} />
        //     ),
        //     width: 50,
        // },
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
            title: 'Data',
            dataIndex: 'data',
            key: 'data',
            render: (object: object) => renderDataCell(object)
        },
        // {
        //     title: 'Del',
        //     key: 'delete',
        //     render: (_: any, record: any) => (
        //         <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
        //             <DeleteOutlined />
        //         </Popconfirm>
        //     ),
        //     width: 50,
        // },
    ];
    const addData = () => {
        const newUsers = users
        newUsers.map((user, index) => {
        //    if (Object.keys(user.data).length == 0) {
                 ClipService.getUserStat(user.login).then((res) => {
                    if (res) {
                        newUsers[index].data = res.data.reviewers[user.login]
                        setUsers([...newUsers])
                        console.log(newUsers)
                        //    user.data = res.data.reviewers[user.login]['reviewed']
                    }
                 }).catch((e) => `Error: ${e}`)
      //      }
        })
    }

    return (
        <>
         <Space wrap>
            <Button type="primary" onClick={() => addData()}>Load statistics</Button>
        </Space>
        <Table
            dataSource={users}
            columns={columns}
            pagination={{ pageSize: 50 }}
            rowKey='id'
        />
        </>
    );
};

export default observer (UserTable);