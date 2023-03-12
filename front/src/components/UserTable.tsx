import React, {FC, useState, useEffect} from 'react';
import {Table, Popconfirm, Space, Button, Typography} from "antd";
import {observer} from "mobx-react-lite";
import {DeleteOutlined, EditTwoTone} from '@ant-design/icons';
import ClipService from "../api/ClipService";
import UserService from "../services/UserService";

const UserTable: FC = () => {

    const {Text} = Typography;

    type User = {
        id: string,
        email: string,
        stat?: object,
        videos: Array<number>
    }

    const [users, setUsers] = useState<Array<User>>([])
    const handleDelete = (id: number) => {
        console.log(id)
    }
    const handleEdit = (id: number) => {
        console.log(id)
    }

    async function getUsers() {
        try {
            return await UserService.fetchUsers();
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const usersList: Array<User> = []
        getUsers().then((apiUsers) => {
            if (!apiUsers) return
            apiUsers.data.map((user) => {
                usersList.push({
                    id: user._id,
                    email: user.email,
                    stat: {},
                    videos: []
                })
            })
            setUsers(usersList)
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

    const renderVideosCell = (data: any) => {
        if (!data) return
        return (<Space direction="vertical">{data.join(' ')}</Space>)
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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Statistics',
            dataIndex: 'stat',
            key: 'stat',
            render: (object: object) => renderDataCell(object)
        },
        {
            title: 'Videos',
            dataIndex: 'videos',
            key: 'videos',
            render: (object: object) => renderVideosCell(object)
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
    const loadVideoIds = () => {
        const usersWithVideos = users
        usersWithVideos.map((user, index) => {
            ClipService.getUserVideos(user.email, 200).then((res) => {
                if (res) {
                    let userVideos: number[] = []
                    res.data.map((userData: any) => {
                        userVideos.push(parseInt(userData.videoId))
                    })
                   usersWithVideos[index].videos = userVideos
                   setUsers([...usersWithVideos])
                }
            }).catch((e) => console.log(`Error: ${e}`))
        })
    }

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
                <Button type="primary" onClick={() => loadVideoIds()}>Load video id's</Button>
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