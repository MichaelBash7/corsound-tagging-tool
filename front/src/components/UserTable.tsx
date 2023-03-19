import React, {FC, useState, useEffect} from 'react';
import {Table, Input, Space, Button, Typography, Checkbox, message, Select} from "antd";
import {observer} from "mobx-react-lite";
import {EditTwoTone} from '@ant-design/icons';
import ClipService from "../api/ClipService";
import UserService from "../services/UserService";
import {Link} from "react-router-dom";
import {UserBase} from "../models/UserBase";

const UserTable: FC = () => {

    const {Text} = Typography;

    interface UserList extends UserBase {
        stat?: object,
        isActive: boolean, //@TODO: move to UserBase
        edit: boolean,
        password: string,
    }

    const [users, setUsers] = useState<UserList[]>([])
    const [datasets, setDatasets] = useState<string[]>([])

    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const filteredOptions = datasets.filter((o) => !selectedItems.includes(o));

    const toggleEdit = (id: string) => {
        const newUsersState = users.map(user => {
            if (user.id === id) {
                user.edit = !user.edit
            }
            return user
        })
        setUsers(newUsersState)
    }

    async function getUsers() {
        try {
            return await UserService.fetchUsers();
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const usersList: Array<UserList> = []
        getUsers().then((apiUsers) => {
            if (!apiUsers) return
            apiUsers.data.map((user) => {
                usersList.push({
                    id: user._id,
                    email: user.email,
                    stat: {},
                    isActive: true,
                    edit: false,
                    password: '',
                })
            })
            setUsers(usersList)
        })

        ClipService.getDatasets().then(datasets => {
            setDatasets(datasets.data.datasets)
        })
    }, []);

    const renderDataCell = (data: any) => {
        if (!data) return
        let list = []
        for (const [k, v] of Object.entries(data)) {
            list.push(<Text><>{k}: {v}</></Text>)
        }
        return (<Space direction="vertical">{list}</Space>)
    }

    const updateUser = (id:string) => {
        const user = users.find(user => user.id === id)
        if (!user) return
        console.log({
            email: user.email,
            isActive: user.isActive,
            password: user.password,
        })
        // post 'user_update' .then
        message.success('Submit success!');
        toggleEdit(id)
    }
    const updateIsActive = (id: string) => {
        const newUsersState = users.map(user => {
            if (user.id === id) {
                user.isActive = !user.isActive
            }
            return user
        })
        setUsers(newUsersState)
    }

    const updatePassword = (id: string, newPassword: string) => {
        const newUsersState = users.map(user => {
            if (user.id === id) {
                user.password = newPassword
            }
            return user
        })
        setUsers(newUsersState)
    }

    const columns = [
        {
            title: 'Edit',
            key: 'edit',
            render: (_: any, record: any) => (
                <>
                    <EditTwoTone onClick={() => toggleEdit(record.id)} style={{cursor: 'pointer', lineHeight: '36px'}}/>
                    {record.edit &&
                        <Button
                            style={{background: '#198754', margin: '0 0 0 10px'}}
                            type="primary"
                            onClick={() => {updateUser(record.id)}}
                        >
                            Save
                        </Button>}
                </>
            ),
            width: 120,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 100,
            render: (_: any, record: UserList) => (
                <Space size="middle">
                    <Link to={"/admin/user/" + record.id}>{record.email}</Link>
                </Space>
            ),
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            render: (_: any, record: UserList) => (
                <Space size="middle">
                    <Checkbox value={record.id} onChange={(checkbox) => {
                        updateIsActive(checkbox.target.value)
                    }} checked={record.isActive} disabled={!record.edit}></Checkbox>
                </Space>
            ),
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
            render: (_: any, record: UserList) => (
                <Space size="middle">
                    <Input.Password
                        placeholder={record.edit ? 'update pass' : ''}
                        value={record.password}
                        disabled={!record.edit}
                        onChange={(input) => {updatePassword(record.id, input.target.value)}}
                    />
                </Space>
            ),
        },
        {
            title: 'Datasets',
            dataIndex: 'datasets',
            key: 'datasets',
            render: (_: any, record: UserList) => (
                <Select
                    mode="multiple"
                    disabled={!record.edit}
                    placeholder="Choose dataset"
                    value={selectedItems}
                    onChange={setSelectedItems}
                    style={{ width: '100%' }}
                    options={filteredOptions.map((item) => ({
                        value: item,
                        label: item,
                    }))}
                />
            ),
            width: 200,
        },
        {
            title: 'Statistics',
            dataIndex: 'stat',
            key: 'stat',
            render: (object: object) => renderDataCell(object)
        }
    ];

    const loadStat = () => {
        const usersWithStat = users
        usersWithStat.map((user, index) => {
            ClipService.getUserStat(user.email).then((res) => {
                if (res) {
                    usersWithStat[index].stat = res.data.reviewers[user.email]
                    setUsers([...usersWithStat])
                }
            }).catch((e) => console.log(`Error: ${e}`))
        })
    }

    return (
        <>
            <Space wrap>
                <Button type="primary" onClick={() => loadStat()}>Load statistics</Button>
            </Space>
            <Table
                dataSource={users}
                columns={columns}
                pagination={{pageSize: 50}}
                rowKey='id'
            />
        </>
    );
};

export default observer(UserTable);