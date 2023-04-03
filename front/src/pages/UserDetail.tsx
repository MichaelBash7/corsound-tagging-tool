import React, {FC, useEffect, useState} from 'react';
import {Button, Layout, Space} from "antd";
import {useParams} from "react-router-dom";
import UserService from "../services/UserService";
import {UserBase} from "../models/UserBase";
import ClipService from "../api/ClipService";
import ClipList from "../components/ClipList";

const UserDetail: FC = () => {
    const params = useParams()
    const [clips, setClips] = useState([])
    const [email, setEmail] = useState('')
    const [buttonDisable, setButton] = useState(true)
    const [lastLoaded, setlastLoaded] = useState(0)

    const PER_PAGE = 20

    async function getUsers() { //@TODO move to userService
        try {
            return await UserService.fetchUsers();
        } catch (e) {
            console.log(e)
        }
    }
    const userId = params.id


    interface UserDetail extends UserBase {
        stat?: object,
        videos: Array<number>
    }

    const loadData = async ( email: string, lastItem = 0) => {
        ClipService.getUserVideos(email, PER_PAGE, lastLoaded).then(res => {
            if (!res) {
                console.log("No data loaded from API")
                return
            }

            setClips(lastItem ? clips.concat(res.data) : res.data)
            if (res.data.length === PER_PAGE) {
                setlastLoaded(lastLoaded + res.data.length)
                setButton(false)
            }
        }).catch((e) => console.log(`Error: ${e}`))
    }

    useEffect(() => {
        const usersList: Array<UserDetail> = []
        getUsers().then((apiUsers) => { //@TODO getUserById
            if (!apiUsers) {
                console.log('No users loaded')
                return
            }

            const user: any = apiUsers.data.find(element => element._id === params.id)
            setEmail(user.email) // @TODO pass email to loadMore func without state?
            loadData(user.email,0)
        })
        }, [])

    const loadMore = () => {
        setButton(true)
        loadData(email, lastLoaded).then(() => {
            setButton(false)
        })
    }

    return (
        <Layout.Content style={{height: '100vh'}}>
            <ClipList clips={clips} title={"User " + email} showResults={true}/>
            <Space wrap>
                <Button disabled={buttonDisable} type="primary" onClick={() => loadMore()}>Load next {PER_PAGE}</Button>
            </Space>
        </Layout.Content>
    )
}

export default UserDetail