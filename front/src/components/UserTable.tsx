import React, {FC, useState, useEffect} from 'react';
import {Table, Input, Space, Button, Checkbox, message, Select} from "antd";
import {observer} from "mobx-react-lite";
import {EditTwoTone} from '@ant-design/icons';
import ClipService from "../api/ClipService";
import UserService from "../services/UserService";
import {UserBase} from "../models/UserBase";
import StatisticsField from "../components/ui/usertable/StatisticsField";
import EmailField from "../components/ui/usertable/EmailField";

const UserTable: FC = () => {

    interface UserList extends UserBase {
        stat?: object,
        isActive: boolean, //@TODO: move to UserBase: isActive and password
        edit: boolean,
        password: string,
        datasets: string[],
    }

    const [users, setUsers] = useState<UserList[]>([])
    const [datasets, setDatasets] = useState<string[]>([])

    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const filterOptions = (selected: string[]) => {
        return datasets.filter(val => !selected.includes(val))
    }

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
                    isActive: user.isUserActive,
                    edit: false,
                    password: '',
                    datasets: [],
                })
            })
            setUsers(usersList)
        })

        ClipService.getDatasets().then(datasets => {
            setDatasets(datasets.data.datasets)
        })
    }, []);

    const updateUser = (userId:string) => {
        const user = users.find(user => user.id === userId)
        if (!user) return
        const {stat, ...updateFields} = user //remove unnecessary fields
        console.log(updateFields)
        UserService.updateUser(updateFields.email, updateFields.password, updateFields.isActive)
        message.success('Submit success!');
        toggleEdit(userId)
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

    const updateDatasets = (id: string, newDatasets: string[]) => {
        const newUsersState = users.map(user => {
            if (user.id === id) {
                user.datasets = newDatasets
            }
            return user
        })
        setUsers(newUsersState)
    }

    const columns = [
        {
            title: 'Edit',
            key: 'edit',
            render: (_: any, record: UserList) => ( //@Todo: move to ../components/ui/usertable
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
            render: (_: any, record: UserList) => EmailField(record),
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
                    value={record.datasets}
                    onChange={selected => updateDatasets(record.id, selected)}
                    style={{ width: '100%' }}
                    options={filterOptions(record.datasets).map((item) => ({
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
            render: (object: object) => StatisticsField(object)
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